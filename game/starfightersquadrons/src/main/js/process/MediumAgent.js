define(["Difficulty", "Maneuver", "ManeuverComputer", "PlayFormat", "RangeRuler", "ShipAction", "process/Action", "process/AttackDice", "process/DefenseDice", "process/ModifyAttackDiceAction", "process/ModifyDefenseDiceAction", "process/Reducer", "process/Selector", "process/SimpleAgent", "process/TargetLock"],
   function(Difficulty, Maneuver, ManeuverComputer, PlayFormat, RangeRuler, ShipAction, Action, AttackDice, DefenseDice, ModifyAttackDiceAction, ModifyDefenseDiceAction, Reducer, Selector, SimpleAgent, TargetLock)
   {
      "use strict";

      function MediumAgent(name, teamKey)
      {
         InputValidator.validateNotEmpty("name", name);
         InputValidator.validateNotNull("teamKey", teamKey);

         this.name = function()
         {
            return name;
         };

         this.teamKey = function()
         {
            return teamKey;
         };

         this.cloneStore = function(store, attacker, attackerPosition, defender, defenderPosition)
         {
            var newStore = Redux.createStore(Reducer.root);

            var newAttacker = attacker.newInstance(newStore, attacker.agent());
            newStore.dispatch(Action.placeToken(attackerPosition, newAttacker));
            newStore.dispatch(Action.addFocusCount(newAttacker, attacker.focusCount()));
            newStore.dispatch(Action.setActiveToken(newAttacker));
            var newDefender = defender.newInstance(newStore, defender.agent());
            newStore.dispatch(Action.placeToken(defenderPosition, newDefender));
            newStore.dispatch(Action.addEvadeCount(newDefender, defender.evadeCount()));
            newStore.dispatch(Action.addFocusCount(newDefender, defender.focusCount()));
            var newAttackDice = AttackDice.get(store, attacker.id());
            newStore.dispatch(Action.setTokenAttackDice(newAttacker.id(), newAttackDice.values()));
            var newDefenseDice = DefenseDice.get(store, attacker.id());
            newStore.dispatch(Action.setTokenDefenseDice(newAttacker.id(), newDefenseDice.values()));

            var oldTargetLocks = store.getState().targetLocks;
            var oldTargetLock = TargetLock.getFirst(store, attacker.id(), defender.id());
            if (oldTargetLock !== undefined)
            {
               var newTargetLock = new TargetLock(newStore, newAttacker.id(), newDefender.id());
            }

            return newStore;
         };
      }

      // Create a prototype object that inherits from the prototype of SimpleAgent.
      MediumAgent.prototype = Vizzini.inherit(SimpleAgent.prototype);

      // Now add properties to the prototype. These properties override the properties
      // of the same name from SimpleAgent.prototype.
      Vizzini.extend(MediumAgent.prototype,
      {
         getModifyAttackDiceAction: function(store, adjudicator, attacker, defender, callback)
         {
            // Maximize the hits and critical hits.
            var attackerPosition = Selector.position(store.getState(), attacker.id());
            var defenderPosition = Selector.position(store.getState(), defender.id());
            var bestModification;
            var bestHits;
            var bestFocusTokens;
            var modifications = SimpleAgent.prototype.determineValidModifyAttackDiceActions.call(this, store, attacker, defender);

            if (modifications.length === 1)
            {
               bestModification = modifications[0];
            }
            else if (modifications.length > 1)
            {
               modifications.forEach(function(modification)
               {
                  var mockStore = this.cloneStore(store, attacker, attackerPosition, defender, defenderPosition);
                  var mockAttacker = Selector.token(mockStore.getState(), 1);
                  var mockDefender = Selector.token(mockStore.getState(), 2);
                  var mockAttackDice = AttackDice.get(mockStore, mockAttacker.id());
                  var modificationKey = modification.modificationKey();
                  var pilotKey = modification.pilotKey();
                  var upgradeKey = modification.upgradeKey();
                  var mod = new ModifyAttackDiceAction(mockStore, mockAttacker, mockDefender, modificationKey, pilotKey, upgradeKey);
                  mod.doIt();
                  mockAttackDice = AttackDice.get(mockStore, mockAttacker.id());
                  var hits = mockAttackDice.hitCount() + mockAttackDice.criticalHitCount();
                  var focusTokens = mockAttacker.focusCount();

                  if (bestHits === undefined || hits > bestHits)
                  {
                     bestModification = modification;
                     bestHits = hits;
                     bestFocusTokens = focusTokens;
                  }
                  else if (hits === bestHits && (bestFocusTokens === undefined || focusTokens > bestFocusTokens))
                  {
                     bestModification = modification;
                     bestFocusTokens = focusTokens;
                  }
               }, this);
            }

            callback(bestModification);
         },

         getModifyDefenseDiceAction: function(store, adjudicator, attacker, defender, callback)
         {
            // Maximize the evades.
            var attackerPosition = Selector.position(store.getState(), attacker.id());
            var defenderPosition = Selector.position(store.getState(), defender.id());
            var bestModification;
            var bestEvades;
            var bestEvadeTokens;
            var modifications = SimpleAgent.prototype.determineValidModifyDefenseDiceActions.call(this, store, attacker, defender);

            if (modifications.length === 1)
            {
               bestModification = modifications[0];
            }
            else if (modifications.length > 1)
            {
               modifications.forEach(function(modification)
               {
                  var mockStore = this.cloneStore(store, attacker, attackerPosition, defender, defenderPosition);
                  var mockAttacker = Selector.token(mockStore.getState(), 1);
                  var mockDefender = Selector.token(mockStore.getState(), 2);
                  var mockDefenseDice = DefenseDice.get(mockStore, mockAttacker.id());
                  var modificationKey = modification.modificationKey();
                  var pilotKey = modification.pilotKey();
                  var upgradeKey = modification.upgradeKey();
                  var mod = new ModifyDefenseDiceAction(mockStore, mockAttacker, mockDefender, modificationKey, pilotKey, upgradeKey);
                  mod.doIt();
                  mockDefenseDice = DefenseDice.get(mockStore, mockAttacker.id());
                  var evades = mockDefenseDice.evadeCount();
                  var evadeTokens = mockDefender.evadeCount();

                  if (bestEvades === undefined || evades > bestEvades)
                  {
                     bestModification = modification;
                     bestEvades = evades;
                     bestEvadeTokens = evadeTokens;
                  }
                  else if (evades === bestEvades && (bestEvadeTokens === undefined || evadeTokens > bestEvadeTokens))
                  {
                     bestModification = modification;
                     bestEvadeTokens = evadeTokens;
                  }
               }, this);
            }

            callback(bestModification);
         },

         getPlanningAction: function(environment, adjudicator, callback)
         {
            InputValidator.validateNotNull("environment", environment);
            InputValidator.validateNotNull("adjudicator", adjudicator);
            InputValidator.validateNotNull("callback", callback);

            var team = this.teamKey();
            var tokens = environment.getTokensForTeam(team);
            var defenders = environment.getDefenders(team);
            var tokenToManeuver = {};
            var store = environment.store();

            tokens.forEach(function(token)
            {
               var fromPosition = environment.getPositionFor(token);
               var shipBase = token.pilot().shipTeam.ship.shipBase;
               var maneuverKeys = token.maneuverKeys();
               LOGGER.trace("maneuverKeys.length = " + maneuverKeys.length + " for " + token);

               // Find the maneuvers which keep the ship on the battlefield.
               var validManeuvers = [];
               var closestManeuver;
               var minDistance;

               // Find the maneuvers which take the ship within range of a defender.
               var validManeuversR1 = [];
               var validManeuversR2 = [];
               var validManeuversR3 = [];

               maneuverKeys.forEach(function(maneuverKey)
               {
                  var maneuver = Maneuver.properties[maneuverKey];
                  var toPosition = ManeuverComputer.computeToPosition(environment.playFormatKey(), maneuver,
                     fromPosition, shipBase);

                  if (toPosition &&
                     PlayFormat.isPathInPlayArea(environment.playFormatKey(), ManeuverComputer.computePolygon(
                        shipBase, toPosition.x(), toPosition.y(), toPosition.heading())))
                  {
                     validManeuvers.push(maneuverKey);
                     var weapon = token.primaryWeapon();

                     if (weapon)
                     {
                        for (var i = 0; i < defenders.length; i++)
                        {
                           var defender = defenders[i];
                           var defenderPosition = environment.getPositionFor(defender);

                           // Save the maneuver which has the minimum distance.
                           var distance = toPosition.computeDistance(defenderPosition);

                           if (!minDistance || distance < minDistance)
                           {
                              closestManeuver = maneuverKey;
                              minDistance = distance;
                           }

                           if (weapon.isDefenderTargetable(token, toPosition, defender, defenderPosition))
                           {
                              var range = RangeRuler.getRange(token, toPosition, defender, defenderPosition);

                              if (range === RangeRuler.ONE)
                              {
                                 validManeuversR1.push(maneuverKey);
                              }
                              else if (range === RangeRuler.TWO)
                              {
                                 validManeuversR2.push(maneuverKey);
                              }
                              else if (range === RangeRuler.THREE)
                              {
                                 validManeuversR3.push(maneuverKey);
                              }
                           }
                        }
                     }
                  }
               });

               var myManeuver;

               if (token.isStressed())
               {
                  // Choose a green maneuver.
                  var greenManeuvers = validManeuvers.filter(function(maneuverKey)
                  {
                     return Maneuver.properties[maneuverKey].difficultyKey === Difficulty.GREEN;
                  });

                  myManeuver = greenManeuvers.vizziniRandomElement();
               }

               if (!myManeuver)
               {
                  LOGGER.trace("validManeuversR1.length = " + validManeuversR1.length + " for " + token);
                  myManeuver = validManeuversR1.vizziniRandomElement();
               }

               if (!myManeuver)
               {
                  LOGGER.trace("validManeuversR2.length = " + validManeuversR2.length + " for " + token);
                  myManeuver = validManeuversR2.vizziniRandomElement();
               }

               if (!myManeuver)
               {
                  LOGGER.trace("validManeuversR3.length = " + validManeuversR3.length + " for " + token);
                  myManeuver = validManeuversR3.vizziniRandomElement();
               }

               if (!myManeuver && closestManeuver)
               {
                  LOGGER.trace("closestManeuver = " + closestManeuver + " for " + token);
                  myManeuver = closestManeuver;
               }

               if (!myManeuver)
               {
                  LOGGER.trace("validManeuvers.length = " + validManeuvers.length + " for " + token);
                  myManeuver = validManeuvers.vizziniRandomElement();
               }

               LOGGER.trace("0 myManeuver = " + myManeuver + " for " + token);

               if (!myManeuver)
               {
                  // The ship fled the battlefield.
                  myManeuver = maneuverKeys.vizziniRandomElement();
                  LOGGER.trace("1 myManeuver = " + myManeuver + " for " + token);
               }

               tokenToManeuver[token] = myManeuver;
            });

            callback(tokenToManeuver);
         },

         getShipAction: function(environment, adjudicator, token, callback)
         {
            var answer;

            var store = environment.store();
            var shipActions = SimpleAgent.prototype.determineValidShipActions.call(this, environment, adjudicator, token);
            var targetLocks = shipActions.filter(function(shipAction)
            {
               return shipAction.defender;
            });

            if (TargetLock.getByAttacker(store, token.id()).length === 0 && targetLocks.length > 0)
            {
               answer = targetLocks.vizziniRandomElement();
            }
            else if (token.focusCount() === 0 && shipActions.includes(ShipAction.FOCUS))
            {
               answer = ShipAction.FOCUS;
            }
            else if (token.evadeCount() === 0 && shipActions.includes(ShipAction.EVADE))
            {
               answer = ShipAction.EVADE;
            }
            else
            {
               answer = shipActions.vizziniRandomElement();
            }

            LOGGER.debug("shipAction for " + token.name() + ": " + answer);

            callback(answer);
         },

         toString: function()
         {
            return this.name() + ", MediumAgent, " + this.teamKey();
         },
      });

      return MediumAgent;
   });

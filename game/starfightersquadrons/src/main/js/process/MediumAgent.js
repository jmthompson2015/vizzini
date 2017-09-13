define(["Ability", "Difficulty", "Maneuver", "ManeuverComputer", "RangeRuler", "ShipAction",
  "process/Action", "process/AttackDice", "process/CombatAction", "process/DefenseDice", "process/Reducer", "process/Selector", "process/SimpleAgent", "process/TargetLock"],
   function(Ability, Difficulty, Maneuver, ManeuverComputer, RangeRuler, ShipAction,
      Action, AttackDice, CombatAction, DefenseDice, Reducer, Selector, SimpleAgent, TargetLock)
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
            var oldTargetLock = TargetLock.getFirst(store, attacker, defender);
            if (oldTargetLock !== undefined)
            {
               var newTargetLock = TargetLock.newInstance(newStore, newAttacker, newDefender);
            }

            var oldCombatAction = Selector.combatAction(store.getState(), attacker);
            var newCombatAction = new CombatAction(newStore, newAttacker, oldCombatAction.weapon(), newDefender, function() {});
            newStore.dispatch(Action.setTokenCombatAction(newAttacker, newCombatAction));

            return newStore;
         };
      }

      // Create a prototype object that inherits from the prototype of SimpleAgent.
      MediumAgent.prototype = Vizzini.inherit(SimpleAgent.prototype);

      // Now add properties to the prototype. These properties override the properties
      // of the same name from SimpleAgent.prototype.
      Vizzini.extend(MediumAgent.prototype,
      {
         chooseWeaponAndDefender: function(environment, adjudicator, attacker, callback, weaponIn)
         {
            InputValidator.validateNotNull("environment", environment);
            InputValidator.validateNotNull("adjudicator", adjudicator);
            InputValidator.validateNotNull("attacker", attacker);
            InputValidator.validateNotNull("callback", callback);
            // weaponIn optional.

            var weapon, defender;
            var attackerPosition = environment.getPositionFor(attacker);

            if (attackerPosition)
            {
               var choices = environment.createWeaponToRangeToDefenders(attacker, weaponIn);

               if (choices.length > 0)
               {
                  // Choose strongest weapon.
                  var weaponData, maxWeaponStrength;

                  choices.forEach(function(myWeaponData)
                  {
                     var weaponValue = myWeaponData.weapon.weaponValue();

                     if (maxWeaponStrength === undefined || weaponValue > maxWeaponStrength)
                     {
                        weaponData = myWeaponData;
                        weapon = myWeaponData.weapon;
                        maxWeaponStrength = weaponValue;
                     }
                     else if (weaponValue === maxWeaponStrength && (myWeaponData.weapon.upgrade() === undefined || myWeaponData.weapon.upgrade().isImplemented) && Math.random() >= 0.5)
                     {
                        weaponData = myWeaponData;
                        weapon = myWeaponData.weapon;
                        maxWeaponStrength = weaponValue;
                     }
                  });

                  // Choose weakest defender.
                  var rangeToDefenders = weaponData.rangeToDefenders;
                  var minHullShield;

                  rangeToDefenders.forEach(function(rangeData)
                  {
                     var defenders = rangeData.defenders;

                     defenders.forEach(function(myDefender)
                     {
                        var hullShield = myDefender.hullValue() + myDefender.shieldValue();

                        if (minHullShield === undefined || hullShield < minHullShield)
                        {
                           defender = myDefender;
                           minHullShield = hullShield;
                        }
                     });
                  });
               }
            }

            callback(weapon, defender);
         },

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
                  var mod = new Ability(modification.source(), modification.sourceKey(), modification.type(), modification.abilityKey());
                  var consequent = mod.consequent();
                  var callback = function() {};
                  consequent(mockStore, mockAttacker, callback);
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

            var isAccepted = (bestModification !== undefined && bestModification !== null);

            callback(bestModification, isAccepted);
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
                  var mod = new Ability(modification.source(), modification.sourceKey(), modification.type(), modification.abilityKey());
                  var consequent = mod.consequent();
                  var callback = function() {};
                  consequent(mockStore, mockAttacker, callback);
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

            var isAccepted = (bestModification !== undefined && bestModification !== null);

            callback(bestModification, isAccepted);
         },

         getPlanningAction: function(environment, adjudicator, callback)
         {
            InputValidator.validateNotNull("environment", environment);
            InputValidator.validateNotNull("adjudicator", adjudicator);
            InputValidator.validateNotNull("callback", callback);

            var team = this.teamKey();
            var tokens = environment.getTokensForTeam(team);
            var defenders = environment.getDefenders(tokens[0]);
            var tokenToManeuver = {};
            var playFormatKey = environment.playFormatKey();

            tokens.forEach(function(token)
            {
               var fromPosition = environment.getPositionFor(token);
               var shipBase = token.pilot().shipTeam.ship.shipBase;

               // Find the maneuvers which keep the ship on the battlefield.
               var validManeuvers = SimpleAgent.prototype.determineValidManeuvers.call(this, environment, token);
               var closestManeuver;
               var minDistance;

               // Find the maneuvers which take the ship within range of a defender.
               var validManeuversR1 = [];
               var validManeuversR2 = [];
               var validManeuversR3 = [];

               validManeuvers.forEach(function(maneuverKey)
               {
                  var maneuver = Maneuver.properties[maneuverKey];
                  var toPosition = ManeuverComputer.computeToPosition(playFormatKey, maneuver, fromPosition, shipBase);
                  var weapon = token.primaryWeapon();

                  if (weapon)
                  {
                     var firingArc = weapon.primaryFiringArc();

                     for (var i = 0; i < defenders.length; i++)
                     {
                        var defender = defenders[i];
                        var defenderPosition = environment.getPositionFor(defender);

                        if (weapon.isDefenderInFiringArc(toPosition, firingArc, defender, defenderPosition))
                        {
                           // Save the maneuver which has the minimum distance.
                           var distance = toPosition.computeDistance(defenderPosition);

                           if (!minDistance || distance < minDistance)
                           {
                              closestManeuver = maneuverKey;
                              minDistance = distance;
                           }
                        }

                        if (weapon.isDefenderTargetable(token, toPosition, defender, defenderPosition))
                        {
                           var range = RangeRuler.getRange(token, toPosition, defender, defenderPosition);

                           switch (range)
                           {
                              case RangeRuler.ONE:
                                 validManeuversR1.push(maneuverKey);
                                 break;
                              case RangeRuler.TWO:
                                 validManeuversR2.push(maneuverKey);
                                 break;
                              case RangeRuler.THREE:
                                 validManeuversR3.push(maneuverKey);
                                 break;
                           }
                        }
                     }
                  }
               }, this);

               var myManeuver;

               if (token.isStressed())
               {
                  // Choose an easy maneuver.
                  var easyManeuvers = validManeuvers.filter(function(maneuverKey)
                  {
                     return Maneuver.properties[maneuverKey].difficultyKey === Difficulty.EASY;
                  });

                  var intersection = easyManeuvers.vizziniIntersect(validManeuversR1);
                  myManeuver = intersection.vizziniRandomElement();

                  if (myManeuver === undefined)
                  {
                     intersection = easyManeuvers.vizziniIntersect(validManeuversR2);
                     myManeuver = intersection.vizziniRandomElement();

                     if (myManeuver === undefined)
                     {
                        intersection = easyManeuvers.vizziniIntersect(validManeuversR3);
                        myManeuver = intersection.vizziniRandomElement();

                        if (myManeuver === undefined)
                        {
                           myManeuver = easyManeuvers.vizziniRandomElement();
                        }
                     }
                  }
               }

               if (myManeuver === undefined)
               {
                  myManeuver = validManeuversR1.vizziniRandomElement();

                  if (myManeuver === undefined)
                  {
                     myManeuver = validManeuversR2.vizziniRandomElement();

                     if (myManeuver === undefined)
                     {
                        myManeuver = validManeuversR3.vizziniRandomElement();

                        if (myManeuver === undefined)
                        {
                           myManeuver = closestManeuver;

                           if (myManeuver === undefined)
                           {
                              myManeuver = validManeuvers.vizziniRandomElement();

                              if (myManeuver === undefined)
                              {
                                 // The ship fled the battlefield.
                                 var maneuverKeys = token.maneuverKeys();
                                 myManeuver = maneuverKeys.vizziniRandomElement();
                              }
                           }
                        }
                     }
                  }
               }

               tokenToManeuver[token] = myManeuver;
            }, this);

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

            if (TargetLock.getByAttacker(store, token).length === 0 && targetLocks.length > 0)
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

            var isAccepted = (answer !== undefined);

            callback(answer, isAccepted);
         },

         toString: function()
         {
            return this.name() + ", MediumAgent, " + this.teamKey();
         },
      });

      return MediumAgent;
   });

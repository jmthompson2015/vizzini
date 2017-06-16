/*
 * Provides upgrade abilities for the Activation Phase.
 */
define(["Bearing", "Difficulty", "Maneuver", "Phase", "Position", "ShipAction", "UpgradeCard", "process/Action", "process/DefenseDice", "process/ManeuverAction", "process/Selector", "process/ShipActionAction", "process/TargetLock"],
   function(Bearing, Difficulty, Maneuver, Phase, Position, ShipAction, UpgradeCard, Action, DefenseDice, ManeuverAction, Selector, ShipActionAction, TargetLock)
   {
      "use strict";
      var UpgradeAbility2 = {};

      ////////////////////////////////////////////////////////////////////////
      UpgradeAbility2[Phase.ACTIVATION_REVEAL_DIAL] = {};

      UpgradeAbility2[Phase.ACTIVATION_REVEAL_DIAL][UpgradeCard.ADRENALINE_RUSH] = {
         // When you reveal a red maneuver, you may discard this card to treat that maneuver as a white maneuver until the end of the Activation phase.
         condition: function(store, token)
         {
            var activeToken = getActiveToken(store);
            var maneuver = getManeuver(token);
            return token === activeToken && maneuver.difficultyKey === Difficulty.HARD;
         },
         consequent: function(store, token, callback)
         {
            discardUpgrade(token, UpgradeCard.ADRENALINE_RUSH);

            var oldManeuver = getManeuver(token);
            var newManeuverKey = Maneuver.find(oldManeuver.bearingKey, oldManeuver.speed, Difficulty.STANDARD);
            if (newManeuverKey === undefined)
            {
               throw "Can't find white maneuver for oldManeuver = " + oldManeuver;
            }
            var newManeuver = Maneuver.properties[newManeuverKey];
            store.dispatch(Action.setTokenManeuver(token, newManeuver));
            if (callback !== undefined) callback();
         },
      };

      UpgradeAbility2[Phase.ACTIVATION_REVEAL_DIAL][UpgradeCard.BB_8] = {
         // When you reveal a green maneuver, you may perform a free barrel roll action.
         condition: function(store, token)
         {
            var activeToken = getActiveToken(store);
            var maneuver = getManeuver(token);
            return token === activeToken && maneuver.difficultyKey === Difficulty.EASY;
         },
         consequent: function(store, token, callback)
         {
            var agent = token.agent();
            var environment = store.getState().environment;
            var adjudicator = store.getState().adjudicator;
            var shipActions0 = [ShipAction.BARREL_ROLL];
            var that = this;
            var finishCallback = function(shipActionAction)
            {
               that.finishConsequent(shipActionAction, callback);
            };
            agent.getShipAction(environment, adjudicator, token, finishCallback, shipActions0);

            // Wait for agent to respond.
         },
         finishConsequent: function(shipActionAction, callback)
         {
            if (shipActionAction)
            {
               shipActionAction.doIt();
            }
            if (callback !== undefined) callback();
         },
      };

      UpgradeAbility2[Phase.ACTIVATION_REVEAL_DIAL][UpgradeCard.INERTIAL_DAMPENERS] = {
         // When you reveal your maneuver, you may discard this card to instead perform a white Stationary 0 maneuver. Then receive 1 stress token.
         condition: function(store, token)
         {
            var activeToken = getActiveToken(store);
            return token === activeToken;
         },
         consequent: function(store, token, callback)
         {
            discardUpgrade(token, UpgradeCard.INERTIAL_DAMPENERS);

            var newManeuver = Maneuver.properties[Maneuver.STATIONARY_0_STANDARD];
            store.dispatch(Action.setTokenManeuver(token, newManeuver));
            token.receiveStress();
            if (callback !== undefined) callback();
         },
      };

      UpgradeAbility2[Phase.ACTIVATION_REVEAL_DIAL][UpgradeCard.MANEUVERING_FINS] = {
         // When you reveal a turn maneuver (left or right), you may rotate your dial to the corresponding bank maneuver (left or right) of the same speed.
         condition: function(store, token)
         {
            var activeToken = getActiveToken(store);
            var maneuver = getManeuver(token);
            return token === activeToken && [Bearing.TURN_LEFT, Bearing.TURN_RIGHT].includes(maneuver.bearingKey);
         },
         consequent: function(store, token, callback)
         {
            var environment = store.getState().environment;
            var oldManeuver = getManeuver(token);
            var newBearingKey;
            switch (oldManeuver.bearingKey)
            {
               case Bearing.TURN_LEFT:
                  newBearingKey = Bearing.BANK_LEFT;
                  break;
               case Bearing.TURN_RIGHT:
                  newBearingKey = Bearing.BANK_RIGHT;
                  break;
            }
            var newManeuverKey = findManeuverByBearingSpeed(token, newBearingKey, oldManeuver.speed);
            var newManeuver = Maneuver.properties[newManeuverKey];
            store.dispatch(Action.setTokenManeuver(token, newManeuver));
            if (callback !== undefined) callback();
         },
      };

      ////////////////////////////////////////////////////////////////////////
      UpgradeAbility2[Phase.ACTIVATION_CLEAN_UP] = {};

      UpgradeAbility2[Phase.ACTIVATION_CLEAN_UP][UpgradeCard.LIGHTNING_REFLEXES] = {
         // After you execute a white or green maneuver on your dial, you may discard this card to rotate your ship 180˚. Then receive 1 stress token after the "Check Pilot Stress" step.
         condition: function(store, token)
         {
            var activeToken = getActiveToken(store);
            var maneuver = getManeuver(token);
            return token === activeToken && [Difficulty.STANDARD, Difficulty.EASY].includes(maneuver.difficultyKey);
         },
         consequent: function(store, token, callback)
         {
            discardUpgrade(token, UpgradeCard.LIGHTNING_REFLEXES);

            var environment = store.getState().environment;
            var fromPosition = environment.getPositionFor(token);
            var toPosition = new Position(fromPosition.x(), fromPosition.y(), fromPosition.heading() + 180);
            store.dispatch(Action.moveToken(fromPosition, toPosition));
            token.receiveStress();
            if (callback !== undefined) callback();
         },
      };

      UpgradeAbility2[Phase.ACTIVATION_CLEAN_UP][UpgradeCard.TARGETING_ASTROMECH] = {
         // After you execute a red maneuver, you may acquire a target lock.
         condition: function(store, token)
         {
            var activeToken = getActiveToken(store);
            var maneuver = getManeuver(token);
            var environment = store.getState().environment;
            var defenders = environment.getDefendersInRange(token);
            return token === activeToken && maneuver !== undefined && maneuver.difficultyKey === Difficulty.HARD && defenders !== undefined && defenders.length > 0;
         },
         consequent: function(store, token, callback)
         {
            var agent = token.agent();
            var environment = store.getState().environment;
            var adjudicator = store.getState().adjudicator;
            var shipActions0 = [ShipAction.TARGET_LOCK];
            var that = this;
            var finishCallback = function(shipActionAction)
            {
               that.finishConsequent(shipActionAction, callback);
            };
            agent.getShipAction(environment, adjudicator, token, finishCallback, shipActions0);

            // Wait for agent to respond.
         },
         finishConsequent: function(shipActionAction, callback)
         {
            if (shipActionAction)
            {
               shipActionAction.doIt();
            }
            if (callback !== undefined) callback();
         },
      };

      UpgradeAbility2[Phase.ACTIVATION_CLEAN_UP][UpgradeCard.TIE_X7] = {
         // Your upgrade bar loses the Cannon and Missile upgrade icons. After executing a 3-, 4-, or 5-speed maneuver, you may assign 1 evade token to your ship.
         condition: function(store, token)
         {
            var activeToken = getActiveToken(store);
            var maneuver = getManeuver(token);
            return token === activeToken && [3, 4, 5].includes(maneuver.speed);
         },
         consequent: function(store, token, callback)
         {
            store.dispatch(Action.addEvadeCount(token));
            if (callback !== undefined) callback();
         },
      };

      ////////////////////////////////////////////////////////////////////////
      UpgradeAbility2[Phase.ACTIVATION_GAIN_ENERGY] = {};

      UpgradeAbility2[Phase.ACTIVATION_GAIN_ENERGY][UpgradeCard.ENGINEERING_TEAM] = {
         // During the Activation phase, when you reveal a Straight maneuver, gain 1 additional energy during the "Gain Energy" step.
         condition: function(store, token)
         {
            var activeToken = getActiveToken(store);
            var maneuver = getManeuver(token);
            return token === activeToken && maneuver !== undefined && maneuver.bearingKey === Bearing.STRAIGHT;
         },
         consequent: function(store, token, callback)
         {
            store.dispatch(Action.addEnergyCount(token));
            if (callback !== undefined) callback();
         },
      };

      UpgradeAbility2[Phase.ACTIVATION_GAIN_ENERGY][UpgradeCard.TIBANNA_GAS_SUPPLIES] = {
         // You may discard this card to gain 3 energy.
         condition: function(store, token)
         {
            var activeToken = getActiveToken(store);
            return token === activeToken;
         },
         consequent: function(store, token, callback)
         {
            discardUpgrade(token, UpgradeCard.TIBANNA_GAS_SUPPLIES);

            store.dispatch(Action.addEnergyCount(token, 3));
            if (callback !== undefined) callback();
         },
      };

      ////////////////////////////////////////////////////////////////////////
      UpgradeAbility2[Phase.ACTIVATION_PERFORM_ACTION] = {};

      UpgradeAbility2[Phase.ACTIVATION_PERFORM_ACTION][UpgradeCard.CLOAKING_DEVICE] = {
         // Action: Until the end of the round, increase your primary weapon value by 1 and decrease your agility value by 1.
         condition: function(store, token)
         {
            var activeToken = getActiveToken(store);
            return token === activeToken;
         },
         consequent: function(store, token, callback)
         {
            // FIXME can't resolve ShipActionAction for some reason?
            // var shipActionAction = new ShipActionAction.Cloak(store, token);
            // shipActionAction.doIt();
            store.dispatch(Action.addCloakCount(token));
            if (callback !== undefined) callback();
         },
      };

      UpgradeAbility2[Phase.ACTIVATION_PERFORM_ACTION][UpgradeCard.EXPERT_HANDLING] = {
         // Action: Perform a free barrel roll action. If you do not have the Barrel Roll action icon, receive 1 stress token. You may then remove 1 enemy Target Lock from your ship.
         condition: function(store, token)
         {
            var activeToken = getActiveToken(store);
            return token === activeToken;
         },
         consequent: function(store, token, callback)
         {
            var agent = token.agent();
            var environment = store.getState().environment;
            var adjudicator = store.getState().adjudicator;
            var shipActions0 = [ShipAction.BARREL_ROLL];
            var that = this;
            var finishCallback = function(shipActionAction)
            {
               that.finishConsequent(token, shipActionAction, callback);
            };
            agent.getShipAction(environment, adjudicator, token, finishCallback, shipActions0);

            // Wait for agent to respond.
         },
         finishConsequent: function(token, shipActionAction, callback)
         {
            if (shipActionAction)
            {
               shipActionAction.doIt();
            }
            var hasBarrelRoll = token.shipActions().includes(ShipAction.BARREL_ROLL);
            if (!hasBarrelRoll)
            {
               token.receiveStress();
            }
            // FIXME: removing the *first* enemy target lock.
            var defenderTargetLocks = TargetLock.getByDefender(token.store(), token.id());
            if (defenderTargetLocks.length > 0)
            {
               defenderTargetLocks[0].delete();
            }
            if (callback !== undefined) callback();
         },
      };

      UpgradeAbility2[Phase.ACTIVATION_PERFORM_ACTION][UpgradeCard.EXPOSE] = {
         // Action: Until the end of the round, increase your primary weapon value by 1 and decrease your agility value by 1.
         condition: function(store, token)
         {
            var activeToken = getActiveToken(store);
            return token === activeToken;
         },
         consequent: function(store, token, callback)
         {
            if (callback !== undefined) callback();
         },
      };

      UpgradeAbility2[Phase.ACTIVATION_PERFORM_ACTION][UpgradeCard.LANDO_CALRISSIAN] = {
         // Action: Roll 2 defense dice. For each Focus result, assign 1 Focus token to your ship. For each Evade result, assign 1 Evade token to your ship.
         condition: function(store, token)
         {
            var activeToken = getActiveToken(store);
            return token === activeToken;
         },
         consequent: function(store, token, callback)
         {
            var defenseDice = new DefenseDice(store, token.id(), 2);
            if (defenseDice.focusCount() > 0)
            {
               store.dispatch(Action.addFocusCount(token, defenseDice.focusCount()));
            }
            if (defenseDice.evadeCount() > 0)
            {
               store.dispatch(Action.addEvadeCount(token, defenseDice.evadeCount()));
            }
            if (callback !== undefined) callback();
         },
      };

      UpgradeAbility2[Phase.ACTIVATION_PERFORM_ACTION][UpgradeCard.LEEBO] = {
         // Action: Perform a free boost action. Then receive 1 ion token.
         condition: function(store, token)
         {
            var activeToken = getActiveToken(store);
            return token === activeToken;
         },
         consequent: function(store, token, callback)
         {
            var agent = token.agent();
            var environment = store.getState().environment;
            var adjudicator = store.getState().adjudicator;
            var shipActions0 = [ShipAction.BOOST];
            var that = this;
            var finishCallback = function(shipActionAction)
            {
               that.finishConsequent(shipActionAction, callback);
            };
            agent.getShipAction(environment, adjudicator, token, finishCallback, shipActions0);

            // Wait for agent to respond.
         },
         finishConsequent: function(shipActionAction, callback)
         {
            if (shipActionAction)
            {
               shipActionAction.doIt();
            }
            store.dispatch(Action.addIonCount(token));
            if (callback !== undefined) callback();
         },
      };

      UpgradeAbility2[Phase.ACTIVATION_PERFORM_ACTION][UpgradeCard.MARKSMANSHIP] = {
         // Action: When attacking this round, you may change 1 of your Focus results to a Critical Hit result and all of your other Focus results to Hit results.
         condition: function(store, token)
         {
            var activeToken = getActiveToken(store);
            return token === activeToken;
         },
         consequent: function(store, token, callback)
         {
            if (callback !== undefined) callback();
         },
      };

      UpgradeAbility2[Phase.ACTIVATION_PERFORM_ACTION][UpgradeCard.R2_F2] = {
         // Action: Increase your agility value by 1 until the end of this game round.
         condition: function(store, token)
         {
            var activeToken = getActiveToken(store);
            return token === activeToken;
         },
         consequent: function(store, token, callback)
         {
            if (callback !== undefined) callback();
         },
      };

      UpgradeAbility2[Phase.ACTIVATION_PERFORM_ACTION][UpgradeCard.R5_D8] = {
         // Action: Roll 1 defense die. On an Evade or Focus result, discard 1 of your facedown Damage cards.
         condition: function(store, token)
         {
            var activeToken = getActiveToken(store);
            return token === activeToken && token.damages().length > 0;
         },
         consequent: function(store, token, callback)
         {
            var defenseDice = new DefenseDice(1);
            if (defenseDice.evadeCount() === 1 || defenseDice.focusCount() === 1)
            {
               var damageKey = token.damages()[0];
               store.dispatch(Action.removeTokenDamage(token.id(), damageKey));
            }
            if (callback !== undefined) callback();
         },
      };

      UpgradeAbility2[Phase.ACTIVATION_PERFORM_ACTION][UpgradeCard.RAGE] = {
         // Action: Assign 1 focus token to your ship and receive 2 stress tokens. Until the end of the round, when attacking, you may reroll up to 3 attack dice.
         condition: function(store, token)
         {
            var activeToken = getActiveToken(store);
            return token === activeToken;
         },
         consequent: function(store, token, callback)
         {
            store.dispatch(Action.addFocusCount(token));
            token.receiveStress();
            token.receiveStress();
            if (callback !== undefined) callback();
         },
      };

      UpgradeAbility2[Phase.ACTIVATION_PERFORM_ACTION][UpgradeCard.REAR_ADMIRAL_CHIRANEAU] = {
         // Action: Execute a white (1 forward) maneuver.
         condition: function(store, token)
         {
            var activeToken = getActiveToken(store);
            return token === activeToken;
         },
         consequent: function(store, token, callback)
         {
            var environment = store.getState().environment;
            var maneuverKey = Maneuver.STRAIGHT_1_STANDARD;
            var maneuverAction = new ManeuverAction(environment, token, maneuverKey);
            maneuverAction.doIt();
            if (callback !== undefined) callback();
         },
      };

      ////////////////////////////////////////////////////////////////////////
      function discardUpgrade(token, upgradeKey)
      {
         InputValidator.validateNotNull("token", token);
         InputValidator.validateNotNull("upgradeKey", upgradeKey);

         token.discardUpgrade(upgradeKey);
      }

      function findManeuverByBearingSpeed(token, bearing, speed)
      {
         InputValidator.validateNotNull("token", token);
         InputValidator.validateNotNull("bearing", bearing);
         InputValidator.validateNotNull("speed", speed);

         var answer;
         var maneuverKeys = token.pilot().shipTeam.ship.maneuverKeys;

         for (var i = 0; i < maneuverKeys.length; i++)
         {
            var maneuverKey = maneuverKeys[i];
            var maneuver = Maneuver.properties[maneuverKey];

            if (maneuver.bearingKey === bearing && maneuver.speed === speed)
            {
               answer = maneuverKey;
               break;
            }
         }

         return answer;
      }

      function getActivationAction(token)
      {
         InputValidator.validateNotNull("token", token);

         return token.activationAction();
      }

      function getActiveToken(store)
      {
         InputValidator.validateNotNull("store", store);

         return Selector.activeToken(store.getState());
      }

      function getManeuver(token)
      {
         InputValidator.validateNotNull("token", token);

         var activationAction = getActivationAction(token);
         return (activationAction !== undefined ? activationAction.maneuver() : undefined);
      }

      function getManeuverKey(token)
      {
         InputValidator.validateNotNull("token", token);

         var activationAction = getActivationAction(token);
         return (activationAction !== undefined ? activationAction.maneuverKey() : undefined);
      }

      UpgradeAbility2.toString = function()
      {
         return "UpgradeAbility2";
      };

      if (Object.freeze)
      {
         Object.freeze(UpgradeAbility2);
      }

      return UpgradeAbility2;
   });

/*
 * Provides upgrade abilities for the Activation Phase.
 */
"use strict";

define(["Ability", "Bearing", "Difficulty", "Maneuver", "Phase", "Position", "ShipAction", "UpgradeCard",
  "process/Action", "process/ActivationAction", "process/DefenseDice", "process/EnvironmentAction", "process/ManeuverAction", "process/Selector", "process/ShipActionAbility", "process/TargetLock", "process/TokenAction"],
   function(Ability, Bearing, Difficulty, Maneuver, Phase, Position, ShipAction, UpgradeCard,
      Action, ActivationAction, DefenseDice, EnvironmentAction, ManeuverAction, Selector, ShipActionAbility, TargetLock, TokenAction)
   {
      var UpgradeAbility2 = {};

      ////////////////////////////////////////////////////////////////////////
      UpgradeAbility2[Phase.ACTIVATION_REVEAL_DIAL] = {};

      UpgradeAbility2[Phase.ACTIVATION_REVEAL_DIAL][UpgradeCard.ADRENALINE_RUSH] = {
         // When you reveal a red maneuver, you may discard this card to treat that maneuver as a white maneuver until the end of the Activation phase.
         condition: function(store, token)
         {
            var maneuver = getManeuver(token);
            return isActiveToken(store, token) && maneuver.difficultyKey === Difficulty.HARD;
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
            callback();
         },
      };

      UpgradeAbility2[Phase.ACTIVATION_REVEAL_DIAL][UpgradeCard.BB_8] = {
         // When you reveal a green maneuver, you may perform a free barrel roll action.
         condition: function(store, token)
         {
            var maneuver = getManeuver(token);
            return isActiveToken(store, token) && maneuver.difficultyKey === Difficulty.EASY;
         },
         consequent: function(store, token, callback)
         {
            var agent = token.agent();
            var environment = store.getState().environment;
            var adjudicator = store.getState().adjudicator;
            var shipActions0 = [ShipAction.BARREL_ROLL];
            var that = this;
            var finishCallback = function(shipActionAbility)
            {
               that.finishConsequent(store, token, shipActionAbility, callback);
            };
            agent.getShipAction(environment, adjudicator, token, finishCallback, shipActions0);

            // Wait for agent to respond.
         },
         finishConsequent: function(store, token, shipActionAbility, callback)
         {
            if (shipActionAbility)
            {
               var consequent = shipActionAbility.consequent();
               consequent(store, token, callback, shipActionAbility.context());
            }
            else
            {
               callback();
            }
         },
      };

      UpgradeAbility2[Phase.ACTIVATION_REVEAL_DIAL][UpgradeCard.INERTIAL_DAMPENERS] = {
         // When you reveal your maneuver, you may discard this card to instead perform a white Stationary 0 maneuver. Then receive 1 stress token.
         condition: function(store, token)
         {
            return isActiveToken(store, token);
         },
         consequent: function(store, token, callback)
         {
            discardUpgrade(token, UpgradeCard.INERTIAL_DAMPENERS);

            var newManeuver = Maneuver.properties[Maneuver.STATIONARY_0_STANDARD];
            store.dispatch(Action.setTokenManeuver(token, newManeuver));
            token.receiveStress();
            callback();
         },
      };

      UpgradeAbility2[Phase.ACTIVATION_REVEAL_DIAL][UpgradeCard.MANEUVERING_FINS] = {
         // When you reveal a turn maneuver (left or right), you may rotate your dial to the corresponding bank maneuver (left or right) of the same speed.
         condition: function(store, token)
         {
            var maneuver = getManeuver(token);
            return isActiveToken(store, token) && [Bearing.TURN_LEFT, Bearing.TURN_RIGHT].includes(maneuver.bearingKey);
         },
         consequent: function(store, token, callback)
         {
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
            callback();
         },
      };

      ////////////////////////////////////////////////////////////////////////
      UpgradeAbility2[Phase.ACTIVATION_CLEAN_UP] = {};

      UpgradeAbility2[Phase.ACTIVATION_CLEAN_UP][UpgradeCard.LIGHTNING_REFLEXES] = {
         // After you execute a white or green maneuver on your dial, you may discard this card to rotate your ship 180˚. Then receive 1 stress token after the "Check Pilot Stress" step.
         condition: function(store, token)
         {
            var maneuver = getManeuver(token);
            return isActiveToken(store, token) && [Difficulty.STANDARD, Difficulty.EASY].includes(maneuver.difficultyKey);
         },
         consequent: function(store, token, callback)
         {
            discardUpgrade(token, UpgradeCard.LIGHTNING_REFLEXES);

            var environment = store.getState().environment;
            var fromPosition = environment.getPositionFor(token);
            var toPosition = new Position(fromPosition.x(), fromPosition.y(), fromPosition.heading() + 180);
            environment.moveToken(fromPosition, toPosition);
            token.receiveStress();
            callback();
         },
      };

      UpgradeAbility2[Phase.ACTIVATION_CLEAN_UP][UpgradeCard.TARGETING_ASTROMECH] = {
         // After you execute a red maneuver, you may acquire a target lock.
         condition: function(store, token)
         {
            var maneuver = getManeuver(token);
            var environment = store.getState().environment;
            var defenders = environment.getDefendersInRange(token);
            return isActiveToken(store, token) && maneuver !== undefined && maneuver.difficultyKey === Difficulty.HARD && defenders !== undefined && defenders.length > 0;
         },
         consequent: function(store, token, callback)
         {
            var agent = token.agent();
            var environment = store.getState().environment;
            var adjudicator = store.getState().adjudicator;
            var shipActions0 = [ShipAction.TARGET_LOCK];
            var that = this;
            var finishCallback = function(shipActionAbility)
            {
               that.finishConsequent(store, token, shipActionAbility, callback);
            };
            agent.getShipAction(environment, adjudicator, token, finishCallback, shipActions0);

            // Wait for agent to respond.
         },
         finishConsequent: function(store, token, shipActionAbility, callback)
         {
            if (shipActionAbility)
            {
               var consequent = shipActionAbility.consequent();
               consequent(store, token, callback, shipActionAbility.context());
            }
            else
            {
               callback();
            }
         },
      };

      UpgradeAbility2[Phase.ACTIVATION_CLEAN_UP][UpgradeCard.TIE_X7] = {
         // Your upgrade bar loses the Cannon and Missile upgrade icons. After executing a 3-, 4-, or 5-speed maneuver, you may assign 1 evade token to your ship.
         condition: function(store, token)
         {
            var maneuver = getManeuver(token);
            return isActiveToken(store, token) && [3, 4, 5].includes(maneuver.speed);
         },
         consequent: function(store, token, callback)
         {
            store.dispatch(TokenAction.addEvadeCount(token));
            callback();
         },
      };

      ////////////////////////////////////////////////////////////////////////
      UpgradeAbility2[Phase.ACTIVATION_GAIN_ENERGY] = {};

      UpgradeAbility2[Phase.ACTIVATION_GAIN_ENERGY][UpgradeCard.ENGINEERING_TEAM] = {
         // During the Activation phase, when you reveal a Straight maneuver, gain 1 additional energy during the "Gain Energy" step.
         condition: function(store, token)
         {
            var maneuver = getManeuver(token);
            return isActiveToken(store, token) && maneuver !== undefined && maneuver.bearingKey === Bearing.STRAIGHT;
         },
         consequent: function(store, token, callback)
         {
            store.dispatch(TokenAction.addEnergyCount(token));
            callback();
         },
      };

      UpgradeAbility2[Phase.ACTIVATION_GAIN_ENERGY][UpgradeCard.TIBANNA_GAS_SUPPLIES] = {
         // You may discard this card to gain 3 energy.
         condition: function(store, token)
         {
            return isActiveToken(store, token);
         },
         consequent: function(store, token, callback)
         {
            discardUpgrade(token, UpgradeCard.TIBANNA_GAS_SUPPLIES);

            store.dispatch(TokenAction.addEnergyCount(token, 3));
            callback();
         },
      };

      ////////////////////////////////////////////////////////////////////////
      UpgradeAbility2[Phase.ACTIVATION_PERFORM_ACTION] = {};

      UpgradeAbility2[Phase.ACTIVATION_PERFORM_ACTION][UpgradeCard.CLOAKING_DEVICE] = {
         // Action: Until the end of the round, increase your primary weapon value by 1 and decrease your agility value by 1.
         condition: function(store, token)
         {
            return isActiveToken(store, token);
         },
         consequent: function(store, token, callback)
         {
            var ability = new Ability(ShipAction, ShipAction.CLOAK, ShipActionAbility, ShipActionAbility.ABILITY_KEY);
            ability.consequent(store, token, callback);
         },
      };

      UpgradeAbility2[Phase.ACTIVATION_PERFORM_ACTION][UpgradeCard.EXPERT_HANDLING] = {
         // Action: Perform a free barrel roll action. If you do not have the Barrel Roll action icon, receive 1 stress token. You may then remove 1 enemy Target Lock from your ship.
         condition: function(store, token)
         {
            return isActiveToken(store, token);
         },
         consequent: function(store, token, callback)
         {
            var agent = token.agent();
            var environment = store.getState().environment;
            var adjudicator = store.getState().adjudicator;
            var shipActions0 = [ShipAction.BARREL_ROLL];
            var that = this;
            var finishCallback = function(shipActionAbility)
            {
               that.finishConsequent(store, token, shipActionAbility, callback);
            };
            agent.getShipAction(environment, adjudicator, token, finishCallback, shipActions0);

            // Wait for agent to respond.
         },
         finishConsequent: function(store, token, shipActionAbility, callback)
         {
            var hasBarrelRoll = token.shipActions().includes(ShipAction.BARREL_ROLL);
            if (!hasBarrelRoll)
            {
               token.receiveStress();
            }
            // FIXME: removing the *first* enemy target lock.
            var defenderTargetLocks = TargetLock.getByDefender(token.store(), token);
            if (defenderTargetLocks.length > 0)
            {
               defenderTargetLocks[0].delete();
            }
            if (shipActionAbility)
            {
               var consequent = shipActionAbility.consequent();
               consequent(store, token, callback, shipActionAbility.context());
            }
            else
            {
               callback();
            }
         },
      };

      UpgradeAbility2[Phase.ACTIVATION_PERFORM_ACTION][UpgradeCard.EXPOSE] = {
         // Action: Until the end of the round, increase your primary weapon value by 1 and decrease your agility value by 1.
         condition: function(store, token)
         {
            return isActiveToken(store, token);
         },
         consequent: function(store, token, callback)
         {
            callback();
         },
      };

      UpgradeAbility2[Phase.ACTIVATION_PERFORM_ACTION][UpgradeCard.LANDO_CALRISSIAN] = {
         // Action: Roll 2 defense dice. For each Focus result, assign 1 Focus token to your ship. For each Evade result, assign 1 Evade token to your ship.
         condition: function(store, token)
         {
            return isActiveToken(store, token);
         },
         consequent: function(store, token, callback)
         {
            var defenseDice = new DefenseDice(store, token.id(), 2);
            if (defenseDice.focusCount() > 0)
            {
               store.dispatch(TokenAction.addFocusCount(token, defenseDice.focusCount()));
            }
            if (defenseDice.evadeCount() > 0)
            {
               store.dispatch(TokenAction.addEvadeCount(token, defenseDice.evadeCount()));
            }
            callback();
         },
      };

      UpgradeAbility2[Phase.ACTIVATION_PERFORM_ACTION][UpgradeCard.LEEBO] = {
         // Action: Perform a free boost action. Then receive 1 ion token.
         condition: function(store, token)
         {
            return isActiveToken(store, token);
         },
         consequent: function(store, token, callback)
         {
            var agent = token.agent();
            var environment = store.getState().environment;
            var adjudicator = store.getState().adjudicator;
            var shipActions0 = [ShipAction.BOOST];
            var that = this;
            var finishCallback = function(shipActionAbility)
            {
               that.finishConsequent(store, token, shipActionAbility, callback);
            };
            agent.getShipAction(environment, adjudicator, token, finishCallback, shipActions0);

            // Wait for agent to respond.
         },
         finishConsequent: function(store, token, shipActionAbility, callback)
         {
            store.dispatch(TokenAction.addIonCount(token));
            if (shipActionAbility)
            {
               var consequent = shipActionAbility.consequent();
               consequent(store, token, callback, shipActionAbility.context());
            }
            else
            {
               callback();
            }
         },
      };

      UpgradeAbility2[Phase.ACTIVATION_PERFORM_ACTION][UpgradeCard.MARKSMANSHIP] = {
         // Action: When attacking this round, you may change 1 of your Focus results to a Critical Hit result and all of your other Focus results to Hit results.
         condition: function(store, token)
         {
            return isActiveToken(store, token);
         },
         consequent: function(store, token, callback)
         {
            callback();
         },
      };

      UpgradeAbility2[Phase.ACTIVATION_PERFORM_ACTION][UpgradeCard.R2_F2] = {
         // Action: Increase your agility value by 1 until the end of this game round.
         condition: function(store, token)
         {
            return isActiveToken(store, token);
         },
         consequent: function(store, token, callback)
         {
            callback();
         },
      };

      UpgradeAbility2[Phase.ACTIVATION_PERFORM_ACTION][UpgradeCard.R5_D8] = {
         // Action: Roll 1 defense die. On an Evade or Focus result, discard 1 of your facedown Damage cards.
         condition: function(store, token)
         {
            return isActiveToken(store, token) && token.damageKeys().size > 0;
         },
         consequent: function(store, token, callback)
         {
            var defenseDice = new DefenseDice(1);
            if (defenseDice.evadeCount() === 1 || defenseDice.focusCount() === 1)
            {
               var damageKey = token.damageKeys().get(0);
               store.dispatch(TokenAction.removeTokenDamage(token.id(), damageKey));
            }
            callback();
         },
      };

      UpgradeAbility2[Phase.ACTIVATION_PERFORM_ACTION][UpgradeCard.RAGE] = {
         // Action: Assign 1 focus token to your ship and receive 2 stress tokens. Until the end of the round, when attacking, you may reroll up to 3 attack dice.
         condition: function(store, token)
         {
            return isActiveToken(store, token);
         },
         consequent: function(store, token, callback)
         {
            store.dispatch(TokenAction.addFocusCount(token));
            token.receiveStress();
            token.receiveStress();
            callback();
         },
      };

      UpgradeAbility2[Phase.ACTIVATION_PERFORM_ACTION][UpgradeCard.REAR_ADMIRAL_CHIRANEAU] = {
         // Action: Execute a white (1 forward) maneuver.
         condition: function(store, token)
         {
            return isActiveToken(store, token);
         },
         consequent: function(store, token, callback)
         {
            var environment = store.getState().environment;
            var maneuverKey = Maneuver.STRAIGHT_1_STANDARD;
            var maneuverAction = new ManeuverAction(environment.store(), token.id(), maneuverKey);
            maneuverAction.doIt();
            callback();
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

         return ActivationAction.get(token.store(), token.id());
      }

      function getActiveToken(store)
      {
         InputValidator.validateNotNull("store", store);

         var environment = store.getState().environment;

         return environment.activeToken();
      }

      function getManeuver(token)
      {
         InputValidator.validateNotNull("token", token);

         var activationAction = getActivationAction(token);
         return (activationAction !== undefined ? activationAction.maneuver() : undefined);
      }

      function isActiveToken(store, token)
      {
         var activeToken = getActiveToken(store);

         return token.equals(activeToken);
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

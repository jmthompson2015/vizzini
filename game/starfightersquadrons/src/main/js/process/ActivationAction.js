define(["DamageCard", "Difficulty", "Event", "Maneuver", "Phase", "Pilot", "UpgradeCard", "process/Action", "process/DamageAbility2", "process/ManeuverAction", "process/PilotAbility2", "process/Selector", "process/UpgradeAbility2"],
   function(DamageCard, Difficulty, Event, Maneuver, Phase, Pilot, UpgradeCard, Action, DamageAbility2, ManeuverAction, PilotAbility2, Selector, UpgradeAbility2)
   {
      "use strict";

      function ActivationAction(store, token, callback, delayIn)
      {
         InputValidator.validateNotNull("store", store);
         InputValidator.validateNotNull("token", token);
         InputValidator.validateNotNull("callback", callback);
         // delayIn optional.

         var delay = (delayIn !== undefined ? delayIn : 1000);

         this.store = function()
         {
            return store;
         };

         this.token = function()
         {
            return token;
         };

         this.callback = function()
         {
            return callback;
         };

         this.maneuverKey = function()
         {
            var answer;
            var maneuver = this.maneuver();

            if (maneuver !== undefined)
            {
               answer = maneuver.value;
            }

            return answer;
         };

         this.delay = function()
         {
            return delay;
         };
      }

      ActivationAction.prototype.doIt = function()
      {
         LOGGER.trace("ActivationAction.doIt() start");

         var token = this.token();
         var store = token.store();
         store.dispatch(Action.setTokenActivationAction(token, this));

         this.revealDial();

         LOGGER.trace("ActivationAction.doIt() end");
      };

      ActivationAction.prototype.revealDial = function()
      {
         LOGGER.trace("ActivationAction.revealDial() start");

         this.environment().phase(Phase.ACTIVATION_REVEAL_DIAL);

         var token = this.token();
         var agent = token.agent();
         var phaseKey = this.environment().phase();
         var damageAbilities = token.usableDamageAbilities(DamageAbility2, phaseKey);
         var pilotAbilities = token.usablePilotAbilities(PilotAbility2, phaseKey);
         var upgradeAbilities = token.usableUpgradeAbilities(UpgradeAbility2, phaseKey);
         agent.chooseAbility(this.environment(), damageAbilities, pilotAbilities, upgradeAbilities, this.finishRevealDial.bind(this));

         // Wait for agent to respond.

         LOGGER.trace("ActivationAction.revealDial() end");
      };

      ActivationAction.prototype.finishRevealDial = function(ability, isAccepted)
      {
         LOGGER.trace("ActivationAction.finishRevealDial() start");
         LOGGER.debug("ActivationAction.finishRevealDial() ability = " + ability + " isAccepted ? " + isAccepted);

         this.finish(ability, isAccepted, this.revealDial.bind(this), this.setTemplate.bind(this));
         LOGGER.debug("ActivationAction.finishRevealDial() maneuverKey = " + this.maneuverKey());

         LOGGER.trace("ActivationAction.finishRevealDial() end");
      };

      ActivationAction.prototype.setTemplate = function()
      {
         LOGGER.trace("ActivationAction.setTemplate() start");

         this.environment().phase(Phase.ACTIVATION_SET_TEMPLATE);

         this.executeManeuver();

         LOGGER.trace("ActivationAction.setTemplate() end");
      };

      ActivationAction.prototype.executeManeuver = function()
      {
         LOGGER.trace("ActivationAction.executeManeuver() start");

         this.environment().phase(Phase.ACTIVATION_EXECUTE_MANEUVER);

         var environment = this.environment();
         var token = this.token();
         var maneuverKey = this.maneuverKey();
         var parentToken = token;

         if (token.parent && token.pilot().value.endsWith("fore"))
         {
            parentToken = token.parent;
         }

         if (maneuverKey)
         {
            var fromPosition = environment.getPositionFor(parentToken);

            if (fromPosition)
            {
               var maneuverAction = new ManeuverAction(environment, parentToken, maneuverKey);
               maneuverAction.doIt();
               var store = this.store();
               store.dispatch(Action.setEvent(Event.AFTER_EXECUTE_MANEUVER, parentToken, this.finishExecuteManeuver.bind(this)));
            }
            else
            {
               this.checkPilotStress();
            }
         }
         else
         {
            this.checkPilotStress();
         }

         LOGGER.trace("ActivationAction.executeManeuver() end");
      };

      ActivationAction.prototype.finishExecuteManeuver = function()
      {
         LOGGER.trace("ActivationAction.finishExecuteManeuver() start");

         this.checkPilotStress();

         LOGGER.trace("ActivationAction.finishExecuteManeuver() end");
      };

      ActivationAction.prototype.checkPilotStress = function()
      {
         LOGGER.trace("ActivationAction.checkPilotStress() start");

         this.environment().phase(Phase.ACTIVATION_CHECK_PILOT_STRESS);

         var maneuverKey = this.maneuverKey();

         if (maneuverKey)
         {
            var maneuver = Maneuver.properties[maneuverKey];

            if (maneuver)
            {
               var difficultyKey = maneuver.difficultyKey;
               LOGGER.trace("difficultyKey = " + difficultyKey);

               if (difficultyKey === Difficulty.EASY)
               {
                  this.token().removeStress();
               }
               else if (difficultyKey === Difficulty.HARD)
               {
                  this.token().receiveStress();
               }
            }
         }

         setTimeout(this.cleanUp.bind(this), this.delay());

         LOGGER.trace("ActivationAction.checkPilotStress() end");
      };

      ActivationAction.prototype.cleanUp = function()
      {
         LOGGER.trace("ActivationAction.cleanUp() start");

         this.environment().phase(Phase.ACTIVATION_CLEAN_UP);

         var token = this.token();
         var agent = token.agent();
         var phaseKey = this.environment().phase();
         var damageAbilities = token.usableDamageAbilities(DamageAbility2, phaseKey);
         var pilotAbilities = token.usablePilotAbilities(PilotAbility2, phaseKey);
         var upgradeAbilities = token.usableUpgradeAbilities(UpgradeAbility2, phaseKey);
         agent.chooseAbility(this.environment(), damageAbilities, pilotAbilities, upgradeAbilities, this.finishCleanUp.bind(this));

         // Wait for agent to respond.

         LOGGER.trace("ActivationAction.cleanUp() end");
      };

      ActivationAction.prototype.finishCleanUp = function(ability, isAccepted)
      {
         LOGGER.trace("ActivationAction.finishCleanUp() start");
         LOGGER.debug("ActivationAction.finishCleanUp() ability = " + ability + " isAccepted ? " + isAccepted);

         this.finish(ability, isAccepted, this.cleanUp.bind(this), this.gainEnergy.bind(this));

         LOGGER.trace("ActivationAction.finishCleanUp() end");
      };

      ActivationAction.prototype.gainEnergy = function()
      {
         LOGGER.trace("ActivationAction.gainEnergy() start");

         this.environment().phase(Phase.ACTIVATION_GAIN_ENERGY);

         var token = this.token();

         if (token.isHuge() || (token.parent && token.parent.isHuge()))
         {
            var maneuverKey = this.maneuverKey();

            if (maneuverKey !== undefined)
            {
               var maneuver = Maneuver.properties[maneuverKey];

               if (maneuver && maneuver.energy !== undefined)
               {
                  // Gain energy up to the energy limit.
                  var energyLimit = token.energyValue();
                  var diff = energyLimit - token.energyCount();

                  if (diff > 0)
                  {
                     var value = Math.min(diff, maneuver.energy);
                     var store = token.store();
                     store.dispatch(Action.addEnergyCount(token, value));
                  }
               }
            }
         }

         var agent = token.agent();
         var phaseKey = this.environment().phase();
         var damageAbilities = token.usableDamageAbilities(DamageAbility2, phaseKey);
         var pilotAbilities = token.usablePilotAbilities(PilotAbility2, phaseKey);
         var upgradeAbilities = token.usableUpgradeAbilities(UpgradeAbility2, phaseKey);
         agent.chooseAbility(this.environment(), damageAbilities, pilotAbilities, upgradeAbilities, this.finishGainEnergy.bind(this));

         // Wait for agent to respond.

         LOGGER.trace("ActivationAction.gainEnergy() end");
      };

      ActivationAction.prototype.finishGainEnergy = function(ability, isAccepted)
      {
         LOGGER.trace("ActivationAction.finishGainEnergy() start");
         LOGGER.debug("ActivationAction.finishGainEnergy() ability = " + ability + " isAccepted ? " + isAccepted);

         this.finish(ability, isAccepted, this.gainEnergy.bind(this), this.allocateEnergy.bind(this));

         LOGGER.trace("ActivationAction.finishGainEnergy() end");
      };

      ActivationAction.prototype.allocateEnergy = function()
      {
         LOGGER.trace("ActivationAction.allocateEnergy() start");

         this.environment().phase(Phase.ACTIVATION_ALLOCATE_ENERGY);

         var token = this.token();

         if (token.isHuge() || (token.parent && token.parent.isHuge()))
         {
            // FIXME: implement allocateEnergy()
         }

         this.useEnergy();

         LOGGER.trace("ActivationAction.allocateEnergy() end");
      };

      ActivationAction.prototype.useEnergy = function()
      {
         LOGGER.trace("ActivationAction.useEnergy() start");

         this.environment().phase(Phase.ACTIVATION_USE_ENERGY);

         var token = this.token();

         if (token.isHuge() || (token.parent && token.parent.isHuge()))
         {
            // FIXME: implement useEnergy()
         }

         this.performAction();

         LOGGER.trace("ActivationAction.useEnergy() end");
      };

      ActivationAction.prototype.performAction = function()
      {
         LOGGER.trace("ActivationAction.performAction() start");

         this.environment().phase(Phase.ACTIVATION_PERFORM_ACTION);

         var environment = this.environment();
         var adjudicator = this.adjudicator();
         var token = this.token();
         var agent = token.agent();

         LOGGER.debug("adjudicator.canSelectShipAction(token) ? " + adjudicator.canSelectShipAction(token));

         if (adjudicator.canSelectShipAction(token))
         {
            agent.getShipAction(environment, adjudicator, token, this.finishPerformAction.bind(this));

            // Wait for agent to respond.
         }
         else
         {
            setTimeout(this.finishPerformAction.bind(this), this.delay());
         }

         LOGGER.trace("ActivationAction.performAction() end");
      };

      ActivationAction.prototype.finishPerformAction = function(shipActionAction)
      {
         LOGGER.trace("ActivationAction.finishPerformAction() start");

         var environment = this.environment();
         var myDelay = 0;

         if (shipActionAction !== undefined)
         {
            var token = this.token();
            var fromPosition = environment.getPositionFor(token);

            if (fromPosition)
            {
               environment.phase(Phase.ACTIVATION_PERFORM_ACTION);
               shipActionAction.doIt(function() {});
               myDelay = this.delay();
            }
         }

         setTimeout(this.callback(), myDelay);

         LOGGER.trace("ActivationAction.finishPerformAction() end");
      };

      ////////////////////////////////////////////////////////////////////////
      ActivationAction.prototype.adjudicator = function()
      {
         var store = this.store();
         return Selector.adjudicator(store.getState());
      };

      ActivationAction.prototype.environment = function()
      {
         var store = this.store();
         return Selector.environment(store.getState());
      };

      ActivationAction.prototype.maneuver = function()
      {
         var store = this.store();
         var token = this.token();
         return Selector.maneuver(store.getState(), token);
      };

      ActivationAction.prototype.finish = function(ability, isAccepted, backFunction, forwardFunction)
      {
         InputValidator.validateNotNull("backFunction", backFunction);
         InputValidator.validateNotNull("forwardFunction", forwardFunction);

         if (ability && isAccepted)
         {
            var store = this.store();
            var token = this.token();
            switch (ability.source())
            {
               case DamageCard:
                  store.dispatch(Action.addTokenUsedDamage(token, ability.sourceKey()));
                  break;
               case Pilot:
                  store.dispatch(Action.addTokenUsedPilot(token, ability.sourceKey()));
                  break;
               case UpgradeCard:
                  store.dispatch(Action.addTokenUsedUpgrade(token, ability.sourceKey()));
                  break;
               default:
                  throw "Unknown source: " + source + " " + (typeof source);
            }
            var consequent = ability.consequent();
            consequent(store, token, backFunction);
         }
         else
         {
            forwardFunction();
         }
      };

      return ActivationAction;
   });

define(["DamageCard", "Phase", "Pilot", "ShipAction", "UpgradeCard",
  "process/Action", "process/DamageAbility1", "process/DamageAbility2", "process/DamageAbility3", "process/DamageAbility4", "process/PilotAbility1", "process/PilotAbility2", "process/PilotAbility3", "process/PilotAbility4", "process/Observer", "process/UpgradeAbility1", "process/UpgradeAbility2", "process/UpgradeAbility3", "process/UpgradeAbility4"],
   function(DamageCard, Phase, Pilot, ShipAction, UpgradeCard,
      Action, DamageAbility1, DamageAbility2, DamageAbility3, DamageAbility4, PilotAbility1, PilotAbility2, PilotAbility3, PilotAbility4, Observer, UpgradeAbility1, UpgradeAbility2, UpgradeAbility3, UpgradeAbility4)
   {
      "use strict";

      function PhaseObserver(store)
      {
         InputValidator.validateNotNull("store", store);

         this.store = function()
         {
            return store;
         };

         this.select = function(state)
         {
            return state.phaseQueue;
         };

         var unsubscribe = Observer.observeStore(store, this.select, this.onChange.bind(this));
      }

      //////////////////////////////////////////////////////////////////////////
      // Behavior methods.

      PhaseObserver.prototype.onChange = function(phaseQueue)
      {
         LOGGER.trace("PhaseObserver.onChange() start");

         if (phaseQueue.size > 0)
         {
            var store = this.store();
            store.dispatch(Action.dequeuePhase());
            var phaseData = store.getState().phaseData;

            LOGGER.debug("phaseData = " + JSON.stringify(phaseData));

            if (phaseData !== undefined)
            {
               this.chooseAbility(phaseData);
            }
         }

         LOGGER.trace("PhaseObserver.onChange() end");
      };

      PhaseObserver.prototype.chooseAbility = function(phaseData)
      {
         LOGGER.trace("PhaseObserver.chooseAbility() start");

         InputValidator.validateNotNull("phaseData", phaseData);

         var phaseKey = phaseData.get("phaseKey");
         var token = phaseData.get("phaseToken");

         if (token !== undefined)
         {
            var store = this.store();
            var environment = store.getState().environment;
            var agent = token.agent();
            var that = this;
            var agentCallback = function(ability, isAccepted)
            {
               that.finishChooseAbility(phaseData, ability, isAccepted);
            };

            if (phaseKey === Phase.ACTIVATION_PERFORM_ACTION)
            {
               var adjudicator = store.getState().adjudicator;
               agent.getShipAction(environment, adjudicator, token, agentCallback);
            }
            else
            {
               var abilityTypes = PhaseObserver.abilityTypes(phaseKey);

               var damageAbilities, pilotAbilities, upgradeAbilities;

               if (phaseKey.startsWith("combat"))
               {
                  damageAbilities = (token.usableAttackerDamageAbilities !== undefined ? token.usableAttackerDamageAbilities(abilityTypes[0], phaseKey) : []);
                  pilotAbilities = (token.usableAttackerPilotAbilities !== undefined ? token.usableAttackerPilotAbilities(abilityTypes[1], phaseKey) : []);
                  upgradeAbilities = (token.usableAttackerUpgradeAbilities !== undefined ? token.usableAttackerUpgradeAbilities(abilityTypes[2], phaseKey) : []);
               }
               else
               {
                  damageAbilities = (token.usableDamageAbilities !== undefined ? token.usableDamageAbilities(abilityTypes[0], phaseKey) : []);
                  pilotAbilities = (token.usablePilotAbilities !== undefined ? token.usablePilotAbilities(abilityTypes[1], phaseKey) : []);
                  upgradeAbilities = (token.usableUpgradeAbilities !== undefined ? token.usableUpgradeAbilities(abilityTypes[2], phaseKey) : []);
               }

               if (damageAbilities.length > 0 || pilotAbilities.length > 0 || upgradeAbilities.length > 0)
               {
                  agent.chooseAbility(environment, damageAbilities, pilotAbilities, upgradeAbilities, agentCallback);
               }
               else
               {
                  this.finishOnChange(phaseData);
               }
            }
         }
         else
         {
            this.finishOnChange(phaseData);
         }

         LOGGER.trace("PhaseObserver.chooseAbility() end");
      };

      PhaseObserver.prototype.finishChooseAbility = function(phaseData, ability, isAccepted)
      {
         LOGGER.trace("PhaseObserver.finishChooseAbility() start");

         InputValidator.validateNotNull("phaseData", phaseData);
         // ability optional.
         // isAccepted optional.

         LOGGER.debug("PhaseObserver.finishChooseAbility() ability = " + ability + " isAccepted ? " + isAccepted);

         var that = this;
         var backFunction = function()
         {
            that.chooseAbility(phaseData);
         };
         var forwardFunction = function()
         {
            that.finishOnChange(phaseData);
         };

         this.finish(phaseData, ability, isAccepted, backFunction, forwardFunction);

         LOGGER.trace("PhaseObserver.finishChooseAbility() end");
      };

      PhaseObserver.prototype.finish = function(phaseData, ability, isAccepted, backFunction, forwardFunction)
      {
         LOGGER.trace("PhaseObserver.finish() start");

         InputValidator.validateNotNull("phaseData", phaseData);
         // ability optional.
         // isAccepted optional.
         InputValidator.validateNotNull("backFunction", backFunction);
         InputValidator.validateNotNull("forwardFunction", forwardFunction);

         if (ability !== undefined && isAccepted === true)
         {
            var store = this.store();
            var token = phaseData.get("phaseToken");
            var phaseKey = phaseData.get("phaseKey");
            var phaseContext = phaseData.get("phaseContext");

            if (phaseKey.startsWith("combat"))
            {
               switch (ability.source())
               {
                  case DamageCard:
                     store.dispatch(Action.addAttackerUsedDamage(token, ability.sourceKey()));
                     break;
                  case Pilot:
                     store.dispatch(Action.addAttackerUsedPilot(token, ability.sourceKey()));
                     break;
                  case ShipAction:
                     // FIXME
                     break;
                  case UpgradeCard:
                     store.dispatch(Action.addAttackerUsedUpgrade(token, ability.sourceKey()));
                     break;
                  default:
                     throw "Unknown source: " + ability.source() + " " + (typeof ability.source());
               }
            }
            else
            {
               switch (ability.source())
               {
                  case DamageCard:
                     store.dispatch(Action.addTokenUsedDamage(token, ability.sourceKey()));
                     break;
                  case Pilot:
                     store.dispatch(Action.addTokenUsedPilot(token, ability.sourceKey()));
                     break;
                  case ShipAction:
                     // FIXME
                     break;
                  case UpgradeCard:
                     store.dispatch(Action.addTokenUsedUpgrade(token, ability.sourceKey()));
                     break;
                  default:
                     throw "Unknown source: " + ability.source() + " " + (typeof ability.source());
               }
            }

            var myCallback = (ability.source() === ShipAction ? forwardFunction : backFunction);
            var consequent = ability.consequent();
            consequent(store, token, myCallback, ability.context());
         }
         else
         {
            forwardFunction();
         }

         LOGGER.trace("PhaseObserver.finish() end");
      };

      PhaseObserver.prototype.finishOnChange = function(phaseData)
      {
         LOGGER.trace("PhaseObserver.finishOnChange() start");

         InputValidator.validateNotNull("phaseData", phaseData);

         var store = this.store();
         store.dispatch(Action.clearPhase());

         var callback = phaseData.get("phaseCallback");

         if (callback !== undefined)
         {
            callback(phaseData);
         }

         LOGGER.trace("PhaseObserver.finishOnChange() end");
      };

      //////////////////////////////////////////////////////////////////////////
      // Utility methods.

      PhaseObserver.abilityTypes = function(phaseKey)
      {
         InputValidator.validateNotNull("phaseKey", phaseKey);

         var answer;

         if (phaseKey.startsWith("planning"))
         {
            answer = [DamageAbility1, PilotAbility1, UpgradeAbility1];
         }
         else if (phaseKey.startsWith("activation"))
         {
            answer = [DamageAbility2, PilotAbility2, UpgradeAbility2];
         }
         else if (phaseKey.startsWith("combat"))
         {
            answer = [DamageAbility3, PilotAbility3, UpgradeAbility3];
         }
         else if (phaseKey.startsWith("end"))
         {
            answer = [DamageAbility4, PilotAbility4, UpgradeAbility4];
         }

         return answer;
      };

      if (Object.freeze)
      {
         Object.freeze(PhaseObserver);
      }

      return PhaseObserver;
   });

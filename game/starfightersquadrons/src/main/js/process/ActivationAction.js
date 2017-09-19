define(["Difficulty", "Event", "Maneuver", "Phase", "process/Action", "process/ManeuverAction", "process/TokenAction"],
   function(Difficulty, Event, Maneuver, Phase, Action, ManeuverAction, TokenAction)
   {
      "use strict";

      function ActivationAction(store, tokenId, callback, delayIn, isNewIn)
      {
         InputValidator.validateNotNull("store", store);
         InputValidator.validateIsNumber("tokenId", tokenId);
         InputValidator.validateNotNull("callback", callback);
         // delayIn optional. default: 1000 ms
         // isNew optional. default: true

         var delay = (delayIn !== undefined ? delayIn : 1000);
         var isNew = (isNewIn !== undefined ? isNewIn : true);

         this.store = function()
         {
            return store;
         };

         this.tokenId = function()
         {
            return tokenId;
         };

         this.callback = function()
         {
            return callback;
         };

         this.delay = function()
         {
            return delay;
         };

         if (isNew)
         {
            this._save();
         }
      }

      //////////////////////////////////////////////////////////////////////////
      // Accessor methods.

      ActivationAction.prototype.adjudicator = function()
      {
         var store = this.store();

         return store.getState().adjudicator;
      };

      ActivationAction.prototype.environment = function()
      {
         var store = this.store();

         return store.getState().environment;
      };

      ActivationAction.prototype.maneuver = function()
      {
         var store = this.store();
         var tokenId = this.tokenId();

         return store.getState().tokenIdToManeuver[tokenId];
      };

      ActivationAction.prototype.maneuverKey = function()
      {
         var maneuver = this.maneuver();

         return (maneuver !== undefined ? maneuver.value : undefined);
      };

      ActivationAction.prototype.token = function()
      {
         var environment = this.environment();
         var tokenId = this.tokenId();

         return environment.getTokenById(tokenId);
      };

      ActivationAction.prototype.toString = function()
      {
         return "ActivationAction tokenId=" + this.tokenId() + ", delay=" + this.delay();
      };

      //////////////////////////////////////////////////////////////////////////
      // Behavior methods.

      ActivationAction.prototype.doIt = function()
      {
         LOGGER.trace("ActivationAction.doIt() start");

         this.revealDial();

         LOGGER.trace("ActivationAction.doIt() end");
      };

      ActivationAction.prototype.revealDial = function()
      {
         LOGGER.trace("ActivationAction.revealDial() start");

         var store = this.store();
         var token = this.token();
         store.dispatch(Action.enqueuePhase(Phase.ACTIVATION_REVEAL_DIAL, token, this.setTemplate.bind(this)));

         LOGGER.trace("ActivationAction.revealDial() end");
      };

      ActivationAction.prototype.setTemplate = function()
      {
         LOGGER.trace("ActivationAction.setTemplate() start");

         var store = this.store();
         store.dispatch(Action.enqueuePhase(Phase.ACTIVATION_SET_TEMPLATE, this.token(), this.executeManeuver.bind(this)));

         LOGGER.trace("ActivationAction.setTemplate() end");
      };

      ActivationAction.prototype.executeManeuver = function()
      {
         LOGGER.trace("ActivationAction.executeManeuver() start");

         var store = this.store();
         store.dispatch(Action.enqueuePhase(Phase.ACTIVATION_EXECUTE_MANEUVER, this.token(), this.finishExecuteManeuver.bind(this)));

         LOGGER.trace("ActivationAction.executeManeuver() end");
      };

      ActivationAction.prototype.finishExecuteManeuver = function()
      {
         LOGGER.trace("ActivationAction.finishExecuteManeuver() start");

         var store = this.store();
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
               var maneuverAction = new ManeuverAction(environment.store(), parentToken.id(), maneuverKey);
               maneuverAction.doIt();
               store.dispatch(Action.enqueueEvent(Event.AFTER_EXECUTE_MANEUVER, parentToken, this.checkPilotStress.bind(this)));
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

         LOGGER.trace("ActivationAction.finishExecuteManeuver() end");
      };

      ActivationAction.prototype.checkPilotStress = function()
      {
         LOGGER.trace("ActivationAction.checkPilotStress() start");

         var store = this.store();
         var token = this.token();
         store.dispatch(Action.enqueuePhase(Phase.ACTIVATION_CHECK_PILOT_STRESS, token, this.finishCheckPilotStress.bind(this)));

         LOGGER.trace("ActivationAction.checkPilotStress() end");
      };

      ActivationAction.prototype.finishCheckPilotStress = function()
      {
         LOGGER.trace("ActivationAction.finishCheckPilotStress() start");

         var maneuver = this.maneuver();

         if (maneuver)
         {
            var difficultyKey = maneuver.difficultyKey;
            LOGGER.trace("difficultyKey = " + difficultyKey);
            var token = this.token();

            if (token)
            {
               if (difficultyKey === Difficulty.EASY)
               {
                  token.removeStress();
               }
               else if (difficultyKey === Difficulty.HARD)
               {
                  token.receiveStress();
               }

               setTimeout(this.cleanUp.bind(this), this.delay());
            }
            else
            {
               setTimeout(this.callback(), this.delay());
            }
         }
         else
         {
            setTimeout(this.callback(), this.delay());
         }

         LOGGER.trace("ActivationAction.finishCheckPilotStress() end");
      };

      ActivationAction.prototype.cleanUp = function()
      {
         LOGGER.trace("ActivationAction.cleanUp() start");

         var store = this.store();
         var token = this.token();
         store.dispatch(Action.enqueuePhase(Phase.ACTIVATION_CLEAN_UP, token, this.gainEnergy.bind(this)));

         LOGGER.trace("ActivationAction.cleanUp() end");
      };

      ActivationAction.prototype.gainEnergy = function()
      {
         LOGGER.trace("ActivationAction.gainEnergy() start");

         var store = this.store();
         var token = this.token();
         store.dispatch(Action.enqueuePhase(Phase.ACTIVATION_GAIN_ENERGY, token, this.finishGainEnergy.bind(this)));

         LOGGER.trace("ActivationAction.gainEnergy() end");
      };

      ActivationAction.prototype.finishGainEnergy = function()
      {
         LOGGER.trace("ActivationAction.finishGainEnergy() start");

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
                     var store = this.store();
                     var value = Math.min(diff, maneuver.energy);
                     store.dispatch(TokenAction.addEnergyCount(token, value));
                  }
               }
            }
         }

         this.allocateEnergy();

         LOGGER.trace("ActivationAction.finishGainEnergy() end");
      };

      ActivationAction.prototype.allocateEnergy = function()
      {
         LOGGER.trace("ActivationAction.allocateEnergy() start");

         var store = this.store();
         store.dispatch(Action.enqueuePhase(Phase.ACTIVATION_ALLOCATE_ENERGY, this.token(), this.finishAllocateEnergy.bind(this)));

         LOGGER.trace("ActivationAction.allocateEnergy() end");
      };

      ActivationAction.prototype.finishAllocateEnergy = function()
      {
         LOGGER.trace("ActivationAction.finishAllocateEnergy() start");

         var token = this.token();

         if (token.isHuge() || (token.parent && token.parent.isHuge()))
         {
            // FIXME: implement finishAllocateEnergy()
         }

         this.useEnergy();

         LOGGER.trace("ActivationAction.finishAllocateEnergy() end");
      };

      ActivationAction.prototype.useEnergy = function()
      {
         LOGGER.trace("ActivationAction.useEnergy() start");

         var store = this.store();
         store.dispatch(Action.enqueuePhase(Phase.ACTIVATION_USE_ENERGY, this.token(), this.finishUseEnergy.bind(this)));

         LOGGER.trace("ActivationAction.useEnergy() end");
      };

      ActivationAction.prototype.finishUseEnergy = function()
      {
         LOGGER.trace("ActivationAction.finishUseEnergy() start");

         var token = this.token();

         if (token.isHuge() || (token.parent && token.parent.isHuge()))
         {
            // FIXME: implement finishUseEnergy()
         }

         this.performAction();

         LOGGER.trace("ActivationAction.finishUseEnergy() end");
      };

      ActivationAction.prototype.performAction = function()
      {
         LOGGER.trace("ActivationAction.performAction() start");

         var store = this.store();
         store.dispatch(Action.enqueuePhase(Phase.ACTIVATION_PERFORM_ACTION, this.token(), this.finishPerformAction.bind(this)));

         LOGGER.trace("ActivationAction.performAction() end");
      };

      ActivationAction.prototype.finishPerformAction = function()
      {
         LOGGER.trace("ActivationAction.finishPerformAction() start");

         var store = this.store();
         var token = this.token();

         if (token)
         {
            store.dispatch(TokenAction.clearTokenUsedAbilities(token));
         }

         setTimeout(this.callback(), this.delay());

         LOGGER.trace("ActivationAction.finishPerformAction() end");
      };

      //////////////////////////////////////////////////////////////////////////
      // Mutator methods.

      ActivationAction.prototype._save = function()
      {
         var store = this.store();
         var tokenId = this.tokenId();
         var callback = this.callback();
         var delay = this.delay();

         var values = Immutable.Map(
         {
            tokenId: tokenId,
            callback: callback,
            delay: delay,
         });

         store.dispatch(Action.setTokenActivationAction(tokenId, values));
      };

      //////////////////////////////////////////////////////////////////////////
      // Utility methods.

      ActivationAction.get = function(store, tokenId)
      {
         InputValidator.validateNotNull("store", store);
         InputValidator.validateIsNumber("tokenId", tokenId);

         var values = store.getState().tokenIdToActivationAction[tokenId];

         var answer;

         if (values !== undefined)
         {
            var callback = values.get("callback");
            var delay = values.get("delay");
            var isNew = false;

            answer = new ActivationAction(store, tokenId, callback, delay, isNew);
         }

         return answer;
      };

      return ActivationAction;
   });

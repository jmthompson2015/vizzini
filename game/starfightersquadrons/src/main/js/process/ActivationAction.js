define(["Difficulty", "Event", "Maneuver", "Phase", "process/Action", "process/ManeuverAction", "process/Selector"],
   function(Difficulty, Event, Maneuver, Phase, Action, ManeuverAction, Selector)
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
         var store = this.store();
         var tokenId = this.tokenId();

         return Selector.token(store.getState(), tokenId);
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
         store.dispatch(Action.enqueuePhase(Phase.ACTIVATION_SET_TEMPLATE, this.token()));

         this.executeManeuver();

         LOGGER.trace("ActivationAction.setTemplate() end");
      };

      ActivationAction.prototype.executeManeuver = function()
      {
         LOGGER.trace("ActivationAction.executeManeuver() start");

         var store = this.store();
         store.dispatch(Action.enqueuePhase(Phase.ACTIVATION_EXECUTE_MANEUVER, this.token()));

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
               store.dispatch(Action.enqueueEvent(Event.AFTER_EXECUTE_MANEUVER, parentToken, this.finishExecuteManeuver.bind(this)));
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

         var store = this.store();
         var token = this.token();
         store.dispatch(Action.enqueuePhase(Phase.ACTIVATION_CHECK_PILOT_STRESS, token));

         var maneuver = this.maneuver();

         if (maneuver)
         {
            var difficultyKey = maneuver.difficultyKey;
            LOGGER.trace("difficultyKey = " + difficultyKey);

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

         LOGGER.trace("ActivationAction.checkPilotStress() end");
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
         store.dispatch(Action.enqueuePhase(Phase.ACTIVATION_GAIN_ENERGY, token));

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
                     store.dispatch(Action.addEnergyCount(token, value));
                  }
               }
            }
         }

         this.allocateEnergy();

         LOGGER.trace("ActivationAction.gainEnergy() end");
      };

      ActivationAction.prototype.allocateEnergy = function()
      {
         LOGGER.trace("ActivationAction.allocateEnergy() start");

         var store = this.store();
         store.dispatch(Action.enqueuePhase(Phase.ACTIVATION_ALLOCATE_ENERGY, this.token()));

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

         var store = this.store();
         store.dispatch(Action.enqueuePhase(Phase.ACTIVATION_USE_ENERGY, this.token()));

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

         var store = this.store();
         store.dispatch(Action.enqueuePhase(Phase.ACTIVATION_PERFORM_ACTION, this.token()));

         var environment = this.environment();
         var adjudicator = this.adjudicator();
         var token = this.token();
         var agent = token.agent();

         LOGGER.debug("adjudicator.canSelectShipAction(token) ? " + adjudicator.canSelectShipAction(token));

         if (adjudicator.canSelectShipAction(token))
         {
            agent.getShipAction(environment, adjudicator, token, this.executeShipAction.bind(this));

            // Wait for agent to respond.
         }
         else
         {
            setTimeout(this.executeShipAction.bind(this), this.delay());
         }

         LOGGER.trace("ActivationAction.performAction() end");
      };

      ActivationAction.prototype.executeShipAction = function(shipActionAction)
      {
         LOGGER.trace("ActivationAction.executeShipAction() start");
         LOGGER.trace("shipActionAction = " + shipActionAction);

         if (shipActionAction !== undefined)
         {
            var environment = this.environment();
            var token = this.token();
            var fromPosition = environment.getPositionFor(token);

            if (fromPosition)
            {
               var store = this.store();
               store.dispatch(Action.enqueuePhase(Phase.ACTIVATION_PERFORM_ACTION, token));
               shipActionAction.doIt(this.finishPerformAction.bind(this));
            }
         }
         else
         {
            this.finishPerformAction();
         }

         LOGGER.trace("ActivationAction.executeShipAction() end");
      };

      ActivationAction.prototype.finishPerformAction = function()
      {
         LOGGER.trace("ActivationAction.finishPerformAction() start");

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

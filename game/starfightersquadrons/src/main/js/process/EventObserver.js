define(["process/Action", "process/DamageAbility0", "process/PilotAbility0", "process/Observer", "process/UpgradeAbility0"],
   function(Action, DamageAbility0, PilotAbility0, Observer, UpgradeAbility0)
   {
      "use strict";

      function EventObserver(store)
      {
         InputValidator.validateNotNull("store", store);

         this.store = function()
         {
            return store;
         };

         this.select = function(state)
         {
            return state.eventQueue;
         };

         var unsubscribe = Observer.observeStore(store, this.select, this.onChange.bind(this));
      }

      EventObserver.prototype.onChange = function(eventQueue)
      {
         LOGGER.trace("EventObserver.onChange() start");

         if (eventQueue.size > 0)
         {
            var store = this.store();
            store.dispatch(Action.dequeueEvent());
            var eventData = store.getState().eventData;

            LOGGER.debug("eventData = " + JSON.stringify(eventData));

            if (eventData !== undefined)
            {
               this.chooseAbility(eventData);
            }
         }

         LOGGER.trace("EventObserver.onChange() end");
      };

      EventObserver.prototype.chooseAbility = function(eventData)
      {
         LOGGER.trace("EventObserver.chooseAbility() start");

         InputValidator.validateNotNull("eventData", eventData);

         var eventKey = eventData.get("eventKey");
         var token = eventData.get("eventToken");

         var damageAbilities = (token.usableDamageAbilities !== undefined ? token.usableDamageAbilities(DamageAbility0, eventKey) : []);
         var pilotAbilities = (token.usablePilotAbilities !== undefined ? token.usablePilotAbilities(PilotAbility0, eventKey) : []);
         var upgradeAbilities = (token.usableUpgradeAbilities !== undefined ? token.usableUpgradeAbilities(UpgradeAbility0, eventKey) : []);

         if (damageAbilities.length > 0 || pilotAbilities.length > 0 || upgradeAbilities.length > 0)
         {
            var that = this;
            var agentCallback = function(ability, isAccepted)
            {
               that.finishChooseAbility(eventData, ability, isAccepted);
            };
            var store = this.store();
            var environment = store.getState().environment;
            var agent = token.agent();
            agent.chooseAbility(environment, damageAbilities, pilotAbilities, upgradeAbilities, agentCallback);
         }
         else
         {
            this.finishOnChange(eventData);
         }

         LOGGER.trace("EventObserver.chooseAbility() end");
      };

      EventObserver.prototype.finishChooseAbility = function(eventData, ability, isAccepted)
      {
         LOGGER.trace("EventObserver.finishChooseAbility() start");

         InputValidator.validateNotNull("eventData", eventData);
         // ability optional.
         // isAccepted optional.

         LOGGER.debug("ActivationAction.finishRevealDial() ability = " + ability + " isAccepted ? " + isAccepted);

         var that = this;
         var backFunction = function()
         {
            that.chooseAbility(eventData);
         };
         var forwardFunction = function()
         {
            that.finishOnChange(eventData);
         };

         this.finish(eventData, ability, isAccepted, backFunction, forwardFunction);

         LOGGER.trace("EventObserver.finishChooseAbility() end");
      };

      EventObserver.prototype.finish = function(eventData, ability, isAccepted, backFunction, forwardFunction)
      {
         InputValidator.validateNotNull("eventData", eventData);
         // ability optional.
         // isAccepted optional.
         InputValidator.validateNotNull("backFunction", backFunction);
         InputValidator.validateNotNull("forwardFunction", forwardFunction);

         if (ability !== undefined && isAccepted === true)
         {
            var store = this.store();
            var token = eventData.get("eventToken");

            if (ability.sourceObject().oncePerRound)
            {
               store.dispatch(Action.addTokenUsedPerRoundAbility(token, ability));
            }
            else
            {
               store.dispatch(Action.addTokenUsedAbility(token, ability));
            }

            var consequent = ability.consequent();
            consequent(store, token, backFunction);
         }
         else
         {
            forwardFunction();
         }
      };

      EventObserver.prototype.finishOnChange = function(eventData)
      {
         LOGGER.trace("EventObserver.finishOnChange() start");

         InputValidator.validateNotNull("eventData", eventData);

         var store = this.store();
         store.dispatch(Action.clearEvent());

         var callback = eventData.get("eventCallback");

         if (callback !== undefined)
         {
            callback(eventData);
         }

         LOGGER.trace("EventObserver.finishOnChange() end");
      };

      if (Object.freeze)
      {
         Object.freeze(EventObserver);
      }

      return EventObserver;
   });

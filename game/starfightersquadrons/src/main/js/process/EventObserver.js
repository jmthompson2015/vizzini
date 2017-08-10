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
               var eventKey = eventData.get("eventKey");
               var token = eventData.get("eventToken");
               var queue = [];

               if (token.usableDamageAbilities)
               {
                  queue = queue.concat(token.usableDamageAbilities(DamageAbility0, eventKey));
               }

               if (token.usablePilotAbilities)
               {
                  queue = queue.concat(token.usablePilotAbilities(PilotAbility0, eventKey));
               }

               if (token.usableUpgradeAbilities)
               {
                  queue = queue.concat(token.usableUpgradeAbilities(UpgradeAbility0, eventKey));
               }

               if (queue.length > 0)
               {
                  this.processAbilityQueue(eventData, queue);
               }
               else
               {
                  this.finishOnChange(eventData);
               }
            }
         }

         LOGGER.trace("EventObserver.onChange() end");
      };

      EventObserver.prototype.processAbilityQueue = function(eventData, queue)
      {
         LOGGER.trace("EventObserver.processAbilityQueue() start");

         InputValidator.validateNotNull("eventData", eventData);
         InputValidator.validateNotNull("queue", queue);

         if (queue.length === 0)
         {
            setTimeout(this.finishOnChange(eventData), 10);
         }
         else
         {
            var store = this.store();
            var token = eventData.get("eventToken");
            var ability = queue.shift();
            var that = this;
            var myCallback = function()
            {
               that.processAbilityQueue(eventData, queue);
            };

            if (ability.conditionPasses(store, token))
            {
               var consequent = ability.consequent();
               consequent(store, token, myCallback);
               var usedAbilities = ability.usedAbilities(token);

               if (usedAbilities !== undefined)
               {
                  usedAbilities.push(ability.abilityKey);
               }
            }
            else
            {
               myCallback();
            }
         }

         LOGGER.trace("EventObserver.processAbilityQueue() end");
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

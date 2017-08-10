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

         var unsubscribe = Observer.observeStore(store, this.select, this.onChange.bind(this), false);
      }

      EventObserver.prototype.onChange = function(eventQueue)
      {
         LOGGER.trace("EventObserver.onChange() start");

         if (eventQueue.size > 0)
         {
            var store = this.store();
            store.dispatch(Action.dequeueEvent());
            var eventData = store.getState().eventData;

            if (eventData !== undefined)
            {
               var eventKey = eventData.get("eventKey");
               var token = eventData.get("eventToken");
               var callback = eventData.get("eventCallback");

               if (eventKey !== undefined && token !== undefined)
               {
                  var queue = [];

                  if (token.usableDamageAbilities)
                  {
                     queue.vizziniAddAll(token.usableDamageAbilities(DamageAbility0, eventKey));
                  }

                  if (token.usablePilotAbilities)
                  {
                     queue.vizziniAddAll(token.usablePilotAbilities(PilotAbility0, eventKey));
                  }

                  if (token.usableUpgradeAbilities)
                  {
                     queue.vizziniAddAll(token.usableUpgradeAbilities(UpgradeAbility0, eventKey));
                  }

                  if (queue.length > 0)
                  {
                     this.processAbilityQueue(store, token, queue, callback);
                  }
                  else
                  {
                     this.finishOnChange(store, callback);
                  }
               }
            }
         }

         LOGGER.trace("EventObserver.onChange() end");
      };

      EventObserver.prototype.processAbilityQueue = function(store, token, queue, callback)
      {
         LOGGER.trace("EventObserver.processAbilityQueue() start");

         InputValidator.validateNotNull("store", store);
         InputValidator.validateNotNull("token", token);
         InputValidator.validateNotNull("queue", queue);
         // callback optional.

         if (queue.length === 0)
         {
            setTimeout(this.finishOnChange(store, callback), 10);
         }
         else
         {
            var ability = queue.shift();
            var that = this;
            var myCallback = function()
            {
               that.processAbilityQueue(store, token, queue, callback);
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

      EventObserver.prototype.finishOnChange = function(store, callback)
      {
         LOGGER.trace("EventObserver.finishOnChange() start");

         InputValidator.validateNotNull("store", store);
         // callback optional.

         store.dispatch(Action.clearEvent());

         if (callback)
         {
            callback();
         }

         LOGGER.trace("EventObserver.finishOnChange() end");
      };

      if (Object.freeze)
      {
         Object.freeze(EventObserver);
      }

      return EventObserver;
   });

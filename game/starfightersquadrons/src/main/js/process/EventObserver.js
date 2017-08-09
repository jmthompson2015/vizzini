define(["process/Action", "process/DamageAbility0", "process/PilotAbility0", "process/Observer", "process/UpgradeAbility0"],
   function(Action, DamageAbility0, PilotAbility0, Observer, UpgradeAbility0)
   {
      "use strict";

      function EventObserver(store)
      {
         InputValidator.validateNotNull("store", store);

         this.onChange = function(eventQueue)
         {
            LOGGER.trace("EventObserver.onChange() start");

            if (eventQueue.size > 0)
            {
               store.dispatch(Action.dequeueEvent());
               var eventData = store.getState().eventData;

               if (eventData !== undefined)
               {
                  var eventKey = eventData.eventKey;
                  var token = eventData.eventToken;
                  var callback = eventData.eventCallback;

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
                        this.performAbilities(eventKey, token, queue, callback);
                     }
                     else
                     {
                        this.finishOnChange(queue, callback);
                     }
                  }
               }
            }

            LOGGER.trace("EventObserver.onChange() end");
         };

         this.finishOnChange = function(queue, callback)
         {
            LOGGER.trace("EventObserver.finishOnChange() start");

            InputValidator.validateNotNull("queue", queue);

            if (queue.length === 0)
            {
               store.dispatch(Action.clearEvent());

               if (callback)
               {
                  callback();
               }
            }

            LOGGER.trace("EventObserver.finishOnChange() end");
         };

         this.performAbilities = function(eventKey, token, queue, callback)
         {
            LOGGER.trace("EventObserver.performAbilities() start");

            InputValidator.validateNotNull("eventKey", eventKey);
            InputValidator.validateNotNull("token", token);

            this.processAbilityQueue(queue, store, token, callback);

            LOGGER.trace("EventObserver.performAbilities() end");
         };

         this.processAbilityQueue = function(queue, store, token, callback)
         {
            LOGGER.trace("EventObserver.processAbilityQueue() start");

            if (queue.length === 0)
            {
               setTimeout(this.finishOnChange(queue, callback), 10);
            }
            else
            {
               var ability = queue.shift();
               var that = this;
               var myCallback = function()
               {
                  that.processAbilityQueue(queue, store, token, callback);
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

         this.select = function(state)
         {
            return state.eventQueue;
         };

         var unsubscribe = Observer.observeStore(store, this.select, this.onChange.bind(this), false);
      }

      if (Object.freeze)
      {
         Object.freeze(EventObserver);
      }

      return EventObserver;
   });

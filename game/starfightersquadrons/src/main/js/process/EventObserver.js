define(["process/Action", "process/DamageAbility0", "process/PilotAbility0", "process/Observer", "process/UpgradeAbility0"],
    function(Action, DamageAbility0, PilotAbility0, Observer, UpgradeAbility0)
    {
        "use strict";

        function EventObserver(store)
        {
            InputValidator.validateNotNull("store", store);

            this.onChange = function(eventKey)
            {
                LOGGER.trace("EventObserver.onChange() start");

                var token = store.getState().eventToken;
                var callback = store.getState().eventCallback;

                if (eventKey && token)
                {
                    var queue = [];

                    if (token.unusedDamageAbilities)
                    {
                        queue.vizziniAddAll(token.unusedDamageAbilities(DamageAbility0, eventKey));
                    }

                    if (token.unusedPilotAbilities)
                    {
                        queue.vizziniAddAll(token.unusedPilotAbilities(PilotAbility0, eventKey));
                    }

                    if (token.unusedUpgradeAbilities)
                    {
                        queue.vizziniAddAll(token.unusedUpgradeAbilities(UpgradeAbility0, eventKey));
                    }

                    this.performAbilities(eventKey, token, queue, callback);
                }

                LOGGER.trace("EventObserver.onChange() end");
            };

            this.finishOnChange = function(queue, callback)
            {
                LOGGER.trace("EventObserver.finishOnChange() start");

                InputValidator.validateNotNull("queue", queue);

                if (queue.length === 0)
                {
                    if (callback)
                    {
                        callback();
                    }

                    store.dispatch(Action.clearEvent());
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
                return state.eventKey;
            };

            var unsubscribe = Observer.observeStore(store, this.select, this.onChange.bind(this), false);
        }

        if (Object.freeze)
        {
            Object.freeze(EventObserver);
        }

        return EventObserver;
    });

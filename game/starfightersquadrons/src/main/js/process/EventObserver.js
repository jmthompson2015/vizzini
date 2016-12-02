define(["DamageCard", "UpgradeCard", "process/Action", "process/DamageAbility0", "process/PilotAbility0", "process/Observer", "process/UpgradeAbility0"],
    function(DamageCard, UpgradeCard, Action, DamageAbility0, PilotAbility0, Observer, UpgradeAbility0)
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
                    var damageQueue = (token.criticalDamages ? token.criticalDamages().slice() : []);
                    var pilotQueue = [token.pilotKey()];
                    var upgradeQueue = (token.upgradeKeys ? token.upgradeKeys().slice() : []);

                    this.performDamageAbilities(eventKey, token, damageQueue, pilotQueue, upgradeQueue, callback);
                    this.performPilotAbilities(eventKey, token, damageQueue, pilotQueue, upgradeQueue, callback);
                    this.performUpgradeAbilities(eventKey, token, damageQueue, pilotQueue, upgradeQueue, callback);
                }

                LOGGER.trace("EventObserver.onChange() end");
            };

            this.finishOnChange = function(damageQueue, pilotQueue, upgradeQueue, callback)
            {
                LOGGER.trace("EventObserver.finishOnChange() start");

                InputValidator.validateNotNull("upgradeQueue", upgradeQueue);

                if (damageQueue.length === 0 && pilotQueue.length === 0 && upgradeQueue.length === 0)
                {
                    if (callback)
                    {
                        callback();
                    }

                    store.dispatch(Action.clearEvent());
                }

                LOGGER.trace("EventObserver.finishOnChange() end");
            };

            this.performDamageAbilities = function(eventKey, token, damageQueue, pilotQueue, upgradeQueue, callback)
            {
                LOGGER.trace("EventObserver.performDamageAbilities() start");

                InputValidator.validateNotNull("eventKey", eventKey);
                InputValidator.validateNotNull("token", token);

                var abilities = DamageAbility0[eventKey];

                if (abilities !== undefined)
                {
                    var usedAbilities = token.activationState().usedDamages();
                    this.processAbilityQueue(damageQueue, pilotQueue, upgradeQueue, damageQueue, store, token, abilities, usedAbilities, callback);
                }
                else
                {
                    this.finishOnChange(damageQueue, pilotQueue, upgradeQueue, callback);
                }

                LOGGER.trace("EventObserver.performDamageAbilities() end");
            };

            this.performPilotAbilities = function(eventKey, token, damageQueue, pilotQueue, upgradeQueue, callback)
            {
                LOGGER.trace("EventObserver.performPilotAbilities() start");

                InputValidator.validateNotNull("eventKey", eventKey);
                InputValidator.validateNotNull("token", token);

                var abilities = PilotAbility0[eventKey];

                if (abilities !== undefined)
                {
                    var usedAbilities = token.activationState().usedPilots();
                    this.processAbilityQueue(damageQueue, pilotQueue, upgradeQueue, pilotQueue, store, token, abilities, usedAbilities, callback);
                }
                else
                {
                    this.finishOnChange(damageQueue, pilotQueue, upgradeQueue, callback);
                }

                LOGGER.trace("EventObserver.performPilotAbilities() end");
            };

            this.performUpgradeAbilities = function(eventKey, token, damageQueue, pilotQueue, upgradeQueue, callback)
            {
                LOGGER.trace("EventObserver.performUpgradeAbilities() start");

                InputValidator.validateNotNull("eventKey", eventKey);
                InputValidator.validateNotNull("token", token);

                var abilities = UpgradeAbility0[eventKey];

                if (abilities !== undefined)
                {
                    var usedAbilities = token.activationState().usedUpgrades();
                    this.processAbilityQueue(damageQueue, pilotQueue, upgradeQueue, upgradeQueue, store, token, abilities, usedAbilities, callback);
                }
                else
                {
                    this.finishOnChange(damageQueue, pilotQueue, upgradeQueue, callback);
                }

                LOGGER.trace("EventObserver.performUpgradeAbilities() end");
            };

            this.processAbilityQueue = function(damageQueue, pilotQueue, upgradeQueue, queue, store, token, abilities, usedAbilities, callback)
            {
                LOGGER.trace("EventObserver.processAbilityQueue() start");

                if (queue.length === 0)
                {
                    setTimeout(this.finishOnChange(damageQueue, pilotQueue, upgradeQueue, callback), 10);
                }
                else
                {
                    var abilityKey = queue.shift();
                    var ability = abilities[abilityKey];
                    var that = this;
                    var myCallback = function()
                    {
                        that.processAbilityQueue(damageQueue, pilotQueue, upgradeQueue, queue, store, token, abilities, usedAbilities, callback);
                    };

                    if (ability !== undefined && ability.condition(store, token))
                    {
                        ability.consequent(store, token, myCallback);
                        usedAbilities.push(abilityKey);
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

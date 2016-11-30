define(["DamageCard", "UpgradeCard", "process/Action", "process/DamageAbility0", "process/PilotAbility0", "process/Observer", "process/UpgradeAbility0"],
    function(DamageCard, UpgradeCard, Action, DamageAbility0, PilotAbility0, Observer, UpgradeAbility0)
    {
        "use strict";

        function EventObserver(store)
        {
            InputValidator.validateNotNull("store", store);

            this.onChange = function(eventKey)
            {
                var token = store.getState().eventToken;

                if (eventKey && token)
                {
                    this.performDamageAbilities(eventKey, token);
                    this.performPilotAbilities(eventKey, token);
                    this.performUpgradeAbilities(eventKey, token);
                }

                store.dispatch(Action.clearEvent());
            };

            this.performDamageAbilities = function(eventKey, token)
            {
                var abilities = DamageAbility0[eventKey];

                if (abilities !== undefined)
                {
                    if (token.criticalDamages)
                    {
                        token.criticalDamages().forEach(function(damageKey)
                        {
                            var ability = abilities[damageKey];
                            var damage = DamageCard.properties[damageKey];

                            if (ability !== undefined && !damage.agentInput)
                            {
                                if (ability.condition(store, token))
                                {
                                    ability.consequent(store, token);
                                }
                            }
                        });
                    }
                }
            };

            this.performPilotAbilities = function(eventKey, token)
            {
                var abilities = PilotAbility0[eventKey];

                if (abilities !== undefined)
                {
                    var pilotKey = token.pilotKey();
                    var pilot = token.pilot();
                    var ability = abilities[pilotKey];

                    if (ability !== undefined && !pilot.agentInput)
                    {
                        if (ability.condition(store, token))
                        {
                            ability.consequent(store, token);
                        }
                    }
                }
            };

            this.performUpgradeAbilities = function(eventKey, token)
            {
                var abilities = UpgradeAbility0[eventKey];

                if (abilities !== undefined)
                {
                    if (token.upgradeKeys)
                    {
                        token.upgradeKeys().forEach(function(upgradeKey)
                        {
                            var ability = abilities[upgradeKey];
                            var upgrade = UpgradeCard.properties[upgradeKey];

                            if (ability !== undefined && !upgrade.agentInput)
                            {
                                if (ability.condition(store, token))
                                {
                                    ability.consequent(store, token);
                                }
                            }
                        });
                    }
                }
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

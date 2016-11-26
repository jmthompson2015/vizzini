define(["DamageCard", "UpgradeCard", "process/DamageAbility0", "process/PilotAbility0", "process/Observer", "process/UpgradeAbility0"],
    function(DamageCard, UpgradeCard, DamageAbility0, PilotAbility0, Observer, UpgradeAbility0)
    {
        "use strict";

        function EventObserver(store)
        {
            InputValidator.validateNotNull("store", store);

            this.onChange = function(eventKey)
            {
                this.performDamageAbilities(eventKey);
                this.performPilotAbilities(eventKey);
                this.performUpgradeAbilities(eventKey);
            };

            this.performDamageAbilities = function(eventKey)
            {
                var abilities = DamageAbility0[eventKey];

                if (abilities !== undefined)
                {
                    var tokens = Object.values(store.getState().tokens);

                    tokens.forEach(function(token)
                    {
                        if (token.criticalDamages())
                        {
                            token.criticalDamages().forEach(function(damageKey)
                            {
                                var ability = abilities[damageKey];
                                var damage = DamageCard.properties[damageKey];

                                if (ability !== undefined && !damage.agentInput)
                                {
                                    if (ability.condition && ability.consequent)
                                    {
                                        if (ability.condition(store, token))
                                        {
                                            ability.consequent(store, token);
                                        }
                                    }
                                    else
                                    {
                                        ability(store, token);
                                    }
                                }
                            });
                        }
                    });
                }
            };

            this.performPilotAbilities = function(eventKey)
            {
                var abilities = PilotAbility0[eventKey];

                if (abilities !== undefined)
                {
                    var tokens = Object.values(store.getState().tokens);

                    tokens.forEach(function(token)
                    {
                        var pilotKey = token.pilotKey();
                        var pilot = token.pilot();
                        var ability = abilities[pilotKey];

                        if (ability !== undefined && !pilot.agentInput)
                        {
                            if (ability.condition && ability.consequent)
                            {
                                if (ability.condition(store, token))
                                {
                                    ability.consequent(store, token);
                                }
                            }
                            else
                            {
                                ability(store, token);
                            }
                        }
                    });
                }
            };

            this.performUpgradeAbilities = function(eventKey)
            {
                var abilities = UpgradeAbility0[eventKey];

                if (abilities !== undefined)
                {
                    var tokens = Object.values(store.getState().tokens);

                    tokens.forEach(function(token)
                    {
                        if (token.upgradeKeys)
                        {
                            token.upgradeKeys().forEach(function(upgradeKey)
                            {
                                var ability = abilities[upgradeKey];
                                var upgrade = UpgradeCard.properties[upgradeKey];

                                if (ability !== undefined && !upgrade.agentInput)
                                {
                                    if (ability.condition && ability.consequent)
                                    {
                                        if (ability.condition(store, token))
                                        {
                                            ability.consequent(store, token);
                                        }
                                    }
                                    else
                                    {
                                        ability(store, token);
                                    }
                                }
                            });
                        }
                    });
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

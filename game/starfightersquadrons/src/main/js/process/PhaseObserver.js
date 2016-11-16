define(["UpgradeCard", "process/PilotAbility1", "process/PilotAbility2", "process/PilotAbility3", "process/PilotAbility4", "process/Observer", "process/UpgradeAbility1", "process/UpgradeAbility2", "process/UpgradeAbility3", "process/UpgradeAbility4"],
    function(UpgradeCard, PilotAbility1, PilotAbility2, PilotAbility3, PilotAbility4, Observer, UpgradeAbility1, UpgradeAbility2, UpgradeAbility3, UpgradeAbility4)
    {
        "use strict";

        function PhaseObserver(store)
        {
            InputValidator.validateNotNull("store", store);

            this.onChange = function(phaseKey)
            {
                this.performPilotAbilities(phaseKey);
                this.performUpgradeAbilities(phaseKey);
            };

            this.performPilotAbilities = function(phaseKey)
            {
                [PilotAbility1, PilotAbility2, PilotAbility3, PilotAbility4].forEach(function(pilotAbility)
                {
                    var abilities = pilotAbility[phaseKey];

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
                                ability(store, token);
                            }
                        });
                    }
                });
            };

            this.performUpgradeAbilities = function(phaseKey)
            {
                [UpgradeAbility1, UpgradeAbility2, UpgradeAbility3, UpgradeAbility4].forEach(function(upgradeAbility)
                {
                    var abilities = upgradeAbility[phaseKey];

                    if (abilities !== undefined)
                    {
                        var tokens = Object.values(store.getState().tokens);

                        tokens.forEach(function(token)
                        {
                            token.upgradeKeys().forEach(function(upgradeKey)
                            {
                                var ability = abilities[upgradeKey];
                                var upgrade = UpgradeCard.properties[upgradeKey];

                                if (ability !== undefined && !upgrade.agentInput)
                                {
                                    ability(store, token);
                                }
                            });
                        });
                    }
                });
            };

            this.select = function(state)
            {
                return state.phaseKey;
            };

            var unsubscribe = Observer.observeStore(store, this.select, this.onChange.bind(this), false);
        }

        if (Object.freeze)
        {
            Object.freeze(PhaseObserver);
        }

        return PhaseObserver;
    });

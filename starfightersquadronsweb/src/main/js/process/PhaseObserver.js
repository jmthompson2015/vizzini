define(["process/Observer", "process/UpgradeAbility1", "process/UpgradeAbility2", "process/UpgradeAbility3", "process/UpgradeAbility4"],
    function(Observer, UpgradeAbility1, UpgradeAbility2, UpgradeAbility3, UpgradeAbility4)
    {
        "use strict";

        function PhaseObserver(store)
        {
            InputValidator.validateNotNull("store", store);

            this.onChange = function(phaseKey)
            {
              [UpgradeAbility1, UpgradeAbility2, UpgradeAbility3, UpgradeAbility4].forEach(function(upgradeAbility)
                {
                    var upgradeAbilities = upgradeAbility[phaseKey];

                    if (upgradeAbilities !== undefined)
                    {
                        var tokens = Object.values(store.getState().tokens);

                        tokens.forEach(function(token)
                        {
                            token.upgradeKeys().forEach(function(upgradeKey)
                            {
                                var upgradeAbility = upgradeAbilities[upgradeKey];

                                if (upgradeAbility !== undefined)
                                {
                                    upgradeAbility(store, token);
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

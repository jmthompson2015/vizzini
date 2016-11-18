define(["UpgradeCard", "process/Action"],
    function(UpgradeCard, Action)
    {
        "use strict";

        function ModifyDefenseDiceAction(environment, defender, defenseDice, modificationKey, pilotKey, upgradeKey)
        {
            InputValidator.validateNotNull("environment", environment);
            InputValidator.validateNotNull("defender", defender);
            InputValidator.validateNotNull("defenseDice", defenseDice);
            InputValidator.validateNotNull("modificationKey", modificationKey);
            // pilotKey optional.
            // upgradeKey optional.

            this.environment = function()
            {
                return environment;
            };

            this.defender = function()
            {
                return defender;
            };

            this.defenseDice = function()
            {
                return defenseDice;
            };

            this.modificationKey = function()
            {
                return modificationKey;
            };

            this.pilotKey = function()
            {
                return pilotKey;
            };

            this.upgradeKey = function()
            {
                return upgradeKey;
            };

            this.doIt = function()
            {
                var store = environment.store();

                if (modificationKey === ModifyDefenseDiceAction.Modification.SPEND_FOCUS)
                {
                    defenseDice.spendFocusToken();
                    store.dispatch(Action.addFocusCount(defender, -1));

                    if (defender.isUpgradedWith(UpgradeCard.RECON_SPECIALIST))
                    {
                        store.dispatch(Action.addFocusCount(defender));
                    }
                }
                else if (modificationKey === ModifyDefenseDiceAction.Modification.SPEND_EVADE)
                {
                    defenseDice.spendEvadeToken();
                    store.dispatch(Action.addEvadeCount(defender, -1));
                }
                else if (modificationKey === ModifyDefenseDiceAction.Modification.USE_PILOT)
                {
                    var pilotAbility = PilotAbility3[Phase.COMBAT_MODIFY_DEFENSE_DICE][pilotKey];

                    if (pilotAbility && pilotAbility.consequent)
                    {
                        pilotAbility.consequent(store, defender);
                    }
                }
                else if (modificationKey === ModifyDefenseDiceAction.Modification.USE_UPGRADE)
                {
                    var upgradeAbility = UpgradeAbility3[Phase.COMBAT_MODIFY_DEFENSE_DICE][upgradeKey];

                    if (upgradeAbility && upgradeAbility.consequent)
                    {
                        upgradeAbility.consequent(store, defender);
                    }
                }
                else
                {
                    throw "Unknown modificationKey: " + modificationKey;
                }
            };
        }

        ModifyDefenseDiceAction.Modification = {
            SPEND_EVADE: "spendEvade",
            SPEND_FOCUS: "spendFocus",
            USE_PILOT: "usePilot",
            USE_UPGRADE: "useUpgrade",
            properties:
            {
                "spendEvade":
                {
                    name: "Spend an Evade token",
                    value: "spendEvade",
                },
                "spendFocus":
                {
                    name: "Spend a Focus token",
                    value: "spendFocus",
                },
                "usePilot":
                {
                    name: "Use Pilot",
                    value: "usePilot",
                },
                "useUpgrade":
                {
                    name: "Use Upgrade",
                    value: "useUpgrade",
                },
            },
        };

        ModifyDefenseDiceAction.prototype.toString = function()
        {
            return "ModifyDefenseDiceAction modificationKey=" + this.modificationKey() + ",upgradeKey=" + this.upgradeKey();
        };

        return ModifyDefenseDiceAction;
    });

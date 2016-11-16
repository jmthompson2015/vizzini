define(["Phase", "UpgradeCard", "process/Action", "process/UpgradeAbility3"],
    function(Phase, UpgradeCard, Action, UpgradeAbility3)
    {
        "use strict";

        function ModifyAttackDiceAction(environment, attacker, attackDice, defender, modificationKey, upgradeKey)
        {
            InputValidator.validateNotNull("environment", environment);
            InputValidator.validateNotNull("attacker", attacker);
            InputValidator.validateNotNull("attackDice", attackDice);
            InputValidator.validateNotNull("defender", defender);
            InputValidator.validateNotNull("modificationKey", modificationKey);
            // upgradeKey optional.

            this.environment = function()
            {
                return environment;
            };

            this.attacker = function()
            {
                return attacker;
            };

            this.attackDice = function()
            {
                return attackDice;
            };

            this.defender = function()
            {
                return defender;
            };

            this.modificationKey = function()
            {
                return modificationKey;
            };

            this.upgradeKey = function()
            {
                return upgradeKey;
            };

            this.doIt = function()
            {
                var store = environment.store();

                if (modificationKey === ModifyAttackDiceAction.Modification.SPEND_TARGET_LOCK)
                {
                    attackDice.spendTargetLock();
                    var targetLock = attacker.findTargetLockByDefender(defender);
                    attacker.removeAttackerTargetLock(targetLock);
                }
                else if (modificationKey === ModifyAttackDiceAction.Modification.SPEND_FOCUS)
                {
                    attackDice.spendFocusToken();
                    store.dispatch(Action.addFocusCount(attacker, -1));

                    if (attacker.isUpgradedWith(UpgradeCard.RECON_SPECIALIST))
                    {
                        store.dispatch(Action.addFocusCount(attacker));
                    }
                }
                else if (modificationKey === ModifyAttackDiceAction.Modification.USE_UPGRADE)
                {
                    var upgradeAbility = UpgradeAbility3[Phase.COMBAT_MODIFY_ATTACK_DICE][upgradeKey];

                    if (upgradeAbility && upgradeAbility.consequent)
                    {
                        upgradeAbility.consequent(store, attacker);
                    }
                }
                else
                {
                    throw "Unknown modificationKey: " + modificationKey;
                }
            };
        }

        ModifyAttackDiceAction.Modification = {
            SPEND_FOCUS: "spendFocus",
            SPEND_TARGET_LOCK: "spendTargetLock",
            USE_UPGRADE: "useUpgrade",
            properties:
            {
                "spendFocus":
                {
                    name: "Spend a Focus token",
                },
                "spendTargetLock":
                {
                    name: "Spend Target Lock tokens",
                },
                "useUpgrade":
                {
                    name: "Use Upgrade",
                },
            },
        };

        ModifyAttackDiceAction.prototype.toString = function()
        {
            return "ModifyAttackDiceAction modificationKey=" + this.modificationKey() + ",upgradeKey=" + this.upgradeKey();
        };

        return ModifyAttackDiceAction;
    });

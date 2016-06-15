define([ "UpgradeCard", "process/Action" ], function(UpgradeCard, Action)
{
    "use strict";
    function ModifyDefenseDiceAction(environment, defender, defenseDice, modification)
    {
        InputValidator.validateNotNull("environment", environment);
        InputValidator.validateNotNull("defender", defender);
        InputValidator.validateNotNull("defenseDice", defenseDice);
        InputValidator.validateNotNull("modification", modification);

        this.getEnvironment = function()
        {
            return environment;
        };

        this.getDefender = function()
        {
            return defender;
        };

        this.getDefenseDice = function()
        {
            return defenseDice;
        };

        this.getModification = function()
        {
            return modification;
        };

        this.doIt = function()
        {
            var store = environment.store();

            if (modification === ModifyDefenseDiceAction.Modification.SPEND_FOCUS)
            {
                defenseDice.spendFocusToken();
                store.dispatch(Action.addFocusCount(defender.id(), -1));

                if (defender.isUpgradedWith(UpgradeCard.RECON_SPECIALIST))
                {
                    store.dispatch(Action.addFocusCount(defender.id()));
                }
            }
            else if (modification === ModifyDefenseDiceAction.Modification.SPEND_EVADE)
            {
                defenseDice.spendEvadeToken();
                store.dispatch(Action.addEvadeCount(defender.id(), -1));
            }
            else
            {
                throw "Unknown modification: " + modification;
            }
        };
    }

    ModifyDefenseDiceAction.Modification =
    {
        SPEND_EVADE: "spendEvade",
        SPEND_FOCUS: "spendFocus",
        properties:
        {
            "spendEvade":
            {
                name: "Spend an Evade token",
            },
            "spendFocus":
            {
                name: "Spend a Focus token",
            }
        },
    };

    ModifyDefenseDiceAction.prototype.toString = function()
    {
        return "ModifyDefenseDiceAction modification=" + this.getModification();
    };

    return ModifyDefenseDiceAction;
});

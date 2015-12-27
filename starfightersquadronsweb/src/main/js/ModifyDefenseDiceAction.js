/*
 * Provides an action to modify the defense dice.
 */
define([ "UpgradeCard" ], function(UpgradeCard)
{
    function ModifyDefenseDiceAction(environment, defender, defenseDice, modification)
    {
        InputValidator.validateNotNull("environment", environment);
        InputValidator.validateNotNull("defender", defender);
        InputValidator.validateNotNull("defenseDice", defenseDice);
        InputValidator.validateNotNull("modification", modification);

        this.getEnvironment = function()
        {
            return environment;
        }

        this.getDefender = function()
        {
            return defender;
        }

        this.getDefenseDice = function()
        {
            return defenseDice;
        }

        this.getModification = function()
        {
            return modification;
        }

        this.doIt = function()
        {
            if (modification === ModifyDefenseDiceAction.Modification.SPEND_FOCUS)
            {
                defenseDice.spendFocusToken();
                defender.focus().decrease();

                if (defender.isUpgradedWith(UpgradeCard.RECON_SPECIALIST))
                {
                    defender.focus().increase();
                }
            }
            else if (modification === ModifyDefenseDiceAction.Modification.SPEND_EVADE)
            {
                defenseDice.spendEvadeToken();
                defender.evade().decrease();
            }
            else
            {
                throw "Unknown modification: " + modification;
            }
        }
    }

    /*
     * Provides an enumeration of possible modifications.
     */
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
    }

    ModifyDefenseDiceAction.prototype.toString = function()
    {
        return "ModifyDefenseDiceAction modification=" + this.getModification();
    }

    return ModifyDefenseDiceAction;
});

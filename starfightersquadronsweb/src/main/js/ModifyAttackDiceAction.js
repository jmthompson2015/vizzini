/*
 * Provides an action to modify the attack dice.
 */
define(function()
{
    function ModifyAttackDiceAction(environment, attacker, attackDice, defender, modification)
    {
        InputValidator.validateNotNull("environment", environment);
        InputValidator.validateNotNull("attacker", attacker);
        InputValidator.validateNotNull("attackDice", attackDice);
        InputValidator.validateNotNull("defender", defender);
        InputValidator.validateNotNull("modification", modification);

        this.getEnvironment = function()
        {
            return environment;
        }

        this.getAttacker = function()
        {
            return attacker;
        }

        this.getAttackDice = function()
        {
            return attackDice;
        }

        this.getDefender = function()
        {
            return defender;
        }

        this.getModification = function()
        {
            return modification;
        }

        this.doIt = function()
        {
            if (modification === ModifyAttackDiceAction.Modification.SPEND_TARGET_LOCK)
            {
                attackDice.spendTargetLock();
                var targetLock = attacker.findTargetLockByDefender(defender);
                attacker.removeAttackerTargetLock(targetLock);
                defender.removeDefenderTargetLock(targetLock);
            }
            else if (modification === ModifyAttackDiceAction.Modification.SPEND_FOCUS)
            {
                attackDice.spendFocusToken();
                attacker.decreaseFocusCount();
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
    ModifyAttackDiceAction.Modification =
    {
        SPEND_FOCUS: "spendFocus",
        SPEND_TARGET_LOCK: "spendTargetLock",
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
        },
    }

    ModifyAttackDiceAction.prototype.toString = function()
    {
        return "ModifyAttackDiceAction modification=" + this.getModification();
    }

    return ModifyAttackDiceAction;
});

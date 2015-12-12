/*
 * Provides an action to modify the attack dice.
 */
function ModifyAttackDiceAction(environment, attacker, attackDice, modification)
{
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

    this.getModification = function()
    {
        return modification;
    }

    this.doIt = function()
    {
        if (modification === ModifyAttackDiceAction.Modification.SPEND_TARGET_LOCK)
        {
            // TODO: implement Target Lock
            // final int size = attackDice.size();
            //
            // for (int i = 0; i < size; i++)
            // {
            // final Value value = attackDice.getValue(i);
            //
            // if ((value == Value.BLANK) || (value == Value.FOCUS))
            // {
            // attackDice.reroll(i);
            // LOGGER.debug(i + " spend target lock: rerolled " + value + " to " + attackDice.getValue(i));
            // }
            // }
            //
            // final TargetLock targetLock = attacker.getAttackerTargetLock();
            // TargetLock.freeInstance(targetLock);
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

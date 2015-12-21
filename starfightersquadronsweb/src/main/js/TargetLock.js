/*
 * Provides a target lock.
 */
define(function()
{
    function TargetLock(attacker, defender)
    {
        InputValidator.validateNotNull("attacker", attacker);
        InputValidator.validateNotNull("defender", defender);

        var id = TargetLock.nextId();

        this.getId = function()
        {
            return id;
        }

        this.getAttacker = function()
        {
            return attacker;
        }

        this.getDefender = function()
        {
            return defender;
        }
    }

    TargetLock.nextIdValue = 0;

    TargetLock.nextId = function()
    {
        return String.fromCharCode(65 + TargetLock.nextIdValue++);
    }

    TargetLock.resetNextId = function()
    {
        TargetLock.nextIdValue = 0;
    }

    return TargetLock;
});

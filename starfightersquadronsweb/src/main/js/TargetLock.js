define(function()
{
    function TargetLock(attacker, defender)
    {
        InputValidator.validateNotNull("attacker", attacker);
        InputValidator.validateNotNull("defender", defender);

        var id = TargetLock.nextId();

        this.id = function()
        {
            return id;
        }

        this.attacker = function()
        {
            return attacker;
        }

        this.defender = function()
        {
            return defender;
        }
    }

    TargetLock.nextIdValue = 0;
    TargetLock.isDoubling = false;

    TargetLock.nextId = function()
    {
        var letter = String.fromCharCode(65 + TargetLock.nextIdValue);
        var answer = (TargetLock.isDoubling ? letter + letter : letter);

        TargetLock.nextIdValue++;

        if (TargetLock.nextIdValue >= 26)
        {
            TargetLock.isDoubling = !TargetLock.isDoubling;
            TargetLock.nextIdValue = 0;
        }

        return answer;
    }

    TargetLock.resetNextId = function()
    {
        TargetLock.nextIdValue = 0;
    }

    return TargetLock;
});

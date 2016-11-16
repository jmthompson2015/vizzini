define([ "process/Action" ], function(Action)
{
    "use strict";
    function TargetLock(store, attacker, defender)
    {
        InputValidator.validateNotNull("store", store);
        InputValidator.validateNotNull("attacker", attacker);
        InputValidator.validateNotNull("defender", defender);

        var isDoubling = (store.getState().nextTargetLockId > 25);
        var offset = store.getState().nextTargetLockId - (isDoubling ? 26 : 0);
        var letter = String.fromCharCode(65 + offset);
        var id = (isDoubling ? letter + letter : letter);
        store.dispatch(Action.incrementNextTargetLockId());

        this.store = function()
        {
            return store;
        };

        this.id = function()
        {
            return id;
        };

        this.attacker = function()
        {
            return attacker;
        };

        this.defender = function()
        {
            return defender;
        };
    }

    return TargetLock;
});

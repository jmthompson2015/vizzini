define(function()
{
    var Event = {
        ACQUIRE_TARGET_LOCK: "acquireTargetLock",
        ACTION_PERFORMED: "actionPerformed",
        AFTER_EXECUTE_MANEUVER: "afterExecuteManeuver",
        RECEIVE_CRITICAL_DAMAGE: "receiveCriticalDamage",
        RECEIVE_DAMAGE: "receiveDamage",
        RECEIVE_FOCUS: "receiveFocus",
        RECEIVE_STRESS: "receiveStress",
        REMOVE_STRESS: "removeStress",
        SHIP_DESTROYED: "shipDestroyed",
        SPEND_FOCUS: "spendFocus",
        SPEND_TARGET_LOCK: "spendTargetLock",

        properties:
        {
            "acquireTargetLock":
            {
                name: "Acquire Target Lock",
                value: "acquireTargetLock",
            },
            "actionPerformed":
            {
                name: "Action Performed",
                value: "actionPerformed",
            },
            "afterExecuteManeuver":
            {
                name: "After Execute Maneuver",
                value: "afterExecuteManeuver",
            },
            "receiveCriticalDamage":
            {
                name: "Receive Critical Damage",
                value: "receiveCriticalDamage",
            },
            "receiveDamage":
            {
                name: "Receive Damage",
                value: "receiveDamage",
            },
            "receiveFocus":
            {
                name: "Receive Focus",
                value: "receiveFocus",
            },
            "receiveStress":
            {
                name: "Receive Stress",
                value: "receiveStress",
            },
            "removeStress":
            {
                name: "Remove Stress",
                value: "removeStress",
            },
            "shipDestroyed":
            {
                name: "Ship Destroyed",
                value: "shipDestroyed",
            },
            "spendFocus":
            {
                name: "Spend Focus",
                value: "spendFocus",
            },
            "spendTargetLock":
            {
                name: "Spend Target Lock",
                value: "spendTargetLock",
            },
        },

        values: function()
        {
            return Object.getOwnPropertyNames(Event.properties);
        },
    };

    if (Object.freeze)
    {
        Object.freeze(Event);
    }

    return Event;
});

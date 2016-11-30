define(function()
{
    var Event = {
        ACTION_PERFORMED: "actionPerformed",
        AFTER_EXECUTE_MANEUVER: "afterExecuteManeuver",
        EVADE_ACTION_PERFORMED: "evadeActionPerformed",
        FOCUS_ACTION_PERFORMED: "focusActionPerformed",
        RECEIVE_CRITICAL_DAMAGE: "receiveCriticalDamage",
        RECEIVE_DAMAGE: "receiveDamage",
        RECEIVE_FOCUS: "receiveFocus",
        RECEIVE_STRESS: "receiveStress",
        REMOVE_STRESS: "removeStress",
        SHIP_DESTROYED: "shipDestroyed",
        SPEND_FOCUS: "spendFocus",
        SPEND_TARGET_LOCK: "spendTargetLock",
        TARGET_LOCK_ACQUIRED: "targetLockAcquired",

        properties:
        {
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
            "evadeActionPerformed":
            {
                name: "Evade Action Performed",
                value: "evadeActionPerformed",
            },
            "focusActionPerformed":
            {
                name: "Focus Action Performed",
                value: "focusActionPerformed",
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
            "targetLockAcquired":
            {
                name: "Target Lock Acquired",
                value: "targetLockAcquired",
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

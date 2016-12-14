define(function()
{
    var Event = {
        AFTER_EXECUTE_MANEUVER: "afterExecuteManeuver",
        EVADE_ACTION_PERFORMED: "evadeActionPerformed",
        FOCUS_ACTION_PERFORMED: "focusActionPerformed",
        RECEIVE_CRITICAL_DAMAGE: "receiveCriticalDamage",
        RECEIVE_DAMAGE: "receiveDamage",
        RECEIVE_STRESS: "receiveStress",
        RECOVER_SHIELD: "recoverShield",
        REMOVE_SHIELD: "removeShield",
        REMOVE_STRESS: "removeStress",
        TARGET_LOCK_ACQUIRED: "targetLockAcquired",

        properties:
        {
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
            "receiveStress":
            {
                name: "Receive Stress",
                value: "receiveStress",
            },
            "recoverShield":
            {
                name: "Recover Shield",
                value: "recoverShield",
            },
            "removeShield":
            {
                name: "Remove Shield",
                value: "removeShield",
            },
            "removeStress":
            {
                name: "Remove Stress",
                value: "removeStress",
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

    Event.createData = function(eventKey, eventToken, eventCallback)
    {
        InputValidator.validateNotNull("eventKey", eventKey);
        InputValidator.validateNotNull("eventToken", eventToken);
        // eventCallback optional.

        return (
        {
            eventKey: eventKey,
            eventToken: eventToken,
            eventCallback: eventCallback,
        });
    };

    if (Object.freeze)
    {
        Object.freeze(Event);
    }

    return Event;
});

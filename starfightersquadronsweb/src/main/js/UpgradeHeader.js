define(function()
{
    var UpgradeHeader =
    {
        ACTION: "action",
        ATTACK: "attack",
        ATTACK_FOCUS: "attackFocus",
        ATTACK_TARGET_LOCK: "attackTargetLock",

        properties:
        {
            "action":
            {
                name: "Action",
                value: "action",
            },
            "attack":
            {
                name: "Attack",
                value: "attack",
            },
            "attackFocus":
            {
                name: "Attack (Focus)",
                value: "attackFocus",
            },
            "attackTargetLock":
            {
                name: "Attack (Target Lock)",
                value: "attackTargetLock",
            },
        },

        values: function()
        {
            return Object.getOwnPropertyNames(UpgradeHeader.properties);
        },
    }

    if (Object.freeze)
    {
        Object.freeze(UpgradeHeader);
    };

    return UpgradeHeader;
});

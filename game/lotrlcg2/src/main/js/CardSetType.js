define(function()
{
    "use strict";
    var CardSetType =
    {
        ADVENTURE_PACK: "adventurePack",
        CORE: "core",
        DELUXE: "deluxe",
        SAGA: "saga",

        properties:
        {
            "adventurePack":
            {
                name: "Adventure Pack",
                value: "adventurePack",
            },
            "core":
            {
                name: "Core",
                value: "core",
            },
            "deluxe":
            {
                name: "Deluxe",
                value: "deluxe",
            },
            "saga":
            {
                name: "Saga",
                value: "saga",
            },
        },

        values: function()
        {
            return Object.getOwnPropertyNames(CardSetType.properties);
        },
    };

    if (Object.freeze)
    {
        Object.freeze(CardSetType);
    }

    return CardSetType;
});

define(function()
{
    "use strict";
    var GameMode =
    {
        EASY: "easy", // grey border
        STANDARD: "standard", // gold border
        NIGHTMARE: "nightmare",

        properties:
        {
            "easy":
            {
                name: "Easy",
                value: "easy",
            },
            "standard":
            {
                name: "Standard",
                value: "standard",
            },
            "nightmare":
            {
                name: "Nightmare",
                value: "nightmare",
            },
        },

        values: function()
        {
            return Object.getOwnPropertyNames(GameMode.properties);
        },
    };

    if (Object.freeze)
    {
        Object.freeze(GameMode);
    }

    return GameMode;
});

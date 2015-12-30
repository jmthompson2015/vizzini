/*
 * Provides an enumeration of difficulties.
 */
define(function()
{
    var Difficulty =
    {
        EASY: "easy",
        STANDARD: "standard",
        HARD: "hard",

        properties:
        {
            "easy":
            {
                name: "Easy",
            },
            "standard":
            {
                name: "Standard",
            },
            "hard":
            {
                name: "Hard",
            },
        },

        values: function()
        {
            return Object.getOwnPropertyNames(Difficulty.properties);
        },
    }

    if (Object.freeze)
    {
        Object.freeze(Difficulty);
    };

    return Difficulty;
});

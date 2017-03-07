define(function()
{
    var Difficulty = {
        EASY: "easy",
        MEDIUM: "medium",
        HARD: "hard",
        DEVIOUS: "devious",
        DIABOLICAL: "diabolical",
        IMPOSSIBLE: "impossible",

        properties:
        {
            "easy":
            {
                name: "Easy",
                value: "easy",
            },
            "medium":
            {
                name: "Medium",
                value: "medium",
            },
            "hard":
            {
                name: "Hard",
                value: "hard",
            },
            "devious":
            {
                name: "Devious",
                value: "devious",
            },
            "diabolical":
            {
                name: "Diabolical",
                value: "diabolical",
            },
            "impossible":
            {
                name: "Impossible",
                value: "impossible",
            },
        },

        values: function()
        {
            return Object.getOwnPropertyNames(Difficulty.properties);
        },
    };

    if (Object.freeze)
    {
        Object.freeze(Difficulty);
    }

    return Difficulty;
});

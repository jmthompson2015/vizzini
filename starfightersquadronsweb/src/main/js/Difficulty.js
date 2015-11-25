/*
 * Provides an enumeration of difficulties.
 */
var Difficulty =
{
    EASY: "easy",
    STANDARD: "standard",
    HARD: "hard",

    values: function()
    {
        return [ "easy", "standard", "hard" ];
    },
}

if (Object.freeze)
{
    Object.freeze(Difficulty);
};

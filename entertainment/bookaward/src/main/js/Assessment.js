define(function()
{
    "use strict";
    var Assessment = {
        POSSIBLE_PICK: "possiblePick",
        NONE: "none",
        NOT_ENOUGH_COPIES: "notEnoughCopies",
        NOT_INTERESTED: "notInterested",

        properties:
        {
            "possiblePick":
            {
                name: "Possible pick",
                value: "possiblePick",
            },
            "none":
            {
                name: "",
                value: "none",
            },
            "notEnoughCopies":
            {
                name: "Not enough copies",
                value: "notEnoughCopies",
            },
            "notInterested":
            {
                name: "Not interested",
                value: "notInterested",
            },
        },

        values: function()
        {
            return Object.getOwnPropertyNames(Assessment.properties);
        },
    };

    if (Object.freeze)
    {
        Object.freeze(Assessment);
    }

    return Assessment;
});

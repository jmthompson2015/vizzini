define(function()
{
    "use strict";
    var PlayFormat =
    {
        STANDARD: "standard",
        CINEMATIC: "cinematic",
        EPIC: "epic",
        properties:
        {
            "standard":
            {
                name: "Standard",
                value: "standard",
            },
            "cinematic":
            {
                name: "Cinematic",
                value: "cinematic",
            },
            "epic":
            {
                name: "Epic",
                value: "epic",
            },
        },

        values: function()
        {
            return Object.getOwnPropertyNames(PlayFormat.properties);
        },
    };

    if (Object.freeze)
    {
        Object.freeze(PlayFormat);
    }

    return PlayFormat;
});

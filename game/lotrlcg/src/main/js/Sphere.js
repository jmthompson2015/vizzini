define(function()
{
    "use strict";
    var Sphere =
    {
        BAGGINS: "baggins",
        FELLOWSHIP: "fellowship",
        LEADERSHIP: "leadership",
        LORE: "lore",
        NEUTRAL:"neutral",
        SPIRIT: "spirit",
        TACTICS: "tactics",

        properties:
        {
            "baggins":
            {
                name: "Baggins",
                value: "baggins",
            },
            "fellowship":
            {
                name: "Fellowship",
                value: "fellowship",
            },
            "leadership":
            {
                name: "Leadership",
                value: "leadership",
            },
            "lore":
            {
                name: "Lore",
                value: "lore",
            },
            "neutral":
            {
                name: "Neutral",
                value: "neutral",
            },
            "spirit":
            {
                name: "Spirit",
                value: "spirit",
            },
            "tactics":
            {
                name: "Tactics",
                value: "tactics",
            },
        },

        values: function()
        {
            return Object.getOwnPropertyNames(Sphere.properties);
        },
    };

    if (Object.freeze)
    {
        Object.freeze(Sphere);
    }

    return Sphere;
});

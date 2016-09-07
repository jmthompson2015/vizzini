define(function()
{
    "use strict";
    var Segment =
    {
        ONE: "one",
        TWO: "two",
        THREE: "three",
        FOUR: "four",
        FIVE: "five",
        SIX: "six",

        properties:
        {
            "one":
            {
                name: "Segment 1",
                disguise: "a lump of Jethryk on the planet Ribos",
                number: 1,
                value: "one",
            },
            "two":
            {
                name: "Segment 2",
                disguise: "the planet Calufrax, shrunk to miniature size by the space-hopping pirate planet Zanak",
                number: 2,
                value: "two",
            },
            "three":
            {
                name: "Segment 3",
                disguise: "the Great Seal of Diplos, which has been stolen by a criminal of that planet",
                number: 3,
                value: "three",
            },
            "four":
            {
                name: "Segment 4",
                disguise: "part of a statue on the planet Tara",
                number: 4,
                value: "four",
            },
            "five":
            {
                name: "Segment 5",
                disguise: "has been consumed by the squid Kroll, causing it to turn into a gigantic monster",
                number: 5,
                value: "five",
            },
            "six":
            {
                name: "Segment 6",
                disguise: "a female humanoid - Princess Astra",
                number: 6,
                value: "six",
            },
        },

        values: function()
        {
            return Object.getOwnPropertyNames(Segment.properties);
        },
    };

    if (Object.freeze)
    {
        Object.freeze(Segment);
    }

    return Segment;
});

define([ "CardSet" ], function(CardSet)
{
    "use strict";
    var EncounterSet =
    {
        DOL_GULDUR_ORCS: "dolGuldurOrcs",
        PASSAGE_THROUGH_MIRKWOOD: "passageThroughMirkwood",
        SPIDERS_OF_MIRKWOOD: "spidersOfMirkwood",
        WILDERLANDS: "wilderlands",

        properties:
        {
            "dolGuldurOrcs":
            {
                name: "Dol Guldur Orcs",
                cardSet: CardSet.CORE,
                value: "dolGuldurOrcs",
            },
            "passageThroughMirkwood":
            {
                name: "Passage Through Mirkwood",
                cardSet: CardSet.CORE,
                value: "passageThroughMirkwood",
            },
            "spidersOfMirkwood":
            {
                name: "Spiders of Mirkwood",
                cardSet: CardSet.CORE,
                value: "spidersOfMirkwood",
            },
            "wilderlands":
            {
                name: "Wilderlands",
                cardSet: CardSet.CORE,
                value: "wilderlands",
            },
        },

        values: function()
        {
            return Object.getOwnPropertyNames(EncounterSet.properties);
        },
    };

    if (Object.freeze)
    {
        Object.freeze(EncounterSet);
    }

    return EncounterSet;
});

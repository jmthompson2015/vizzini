define([ "CardSetType" ], function(CardSetType)
{
    "use strict";
    var CardSet =
    {
        CORE: "core",
        DWARROWDELF: "dwarrowdelf",
        KHAZAD_DUM: "khazadDum",
        ON_THE_DOORSTEP: "onTheDoorstep",
        OVER_HILL_AND_UNDER_HILL: "overHillAndUnderHill",
        SHADOWS_OF_MIRKWOOD: "shadowsOfMirkwood",
        THE_GREY_HAVENS: "theGreyHavens",
        THE_TREASON_OF_SARUMAN: "theTreasonOfSaruman",

        properties:
        {
            "core":
            {
                name: "Core",
                typeKey: CardSetType.CORE,
                value: "core",
            },
            "dwarrowdelf":
            {
                name: "Dwarrowdelf",
                typeKey: CardSetType.CYCLE,
                value: "dwarrowdelf",
            },
            "khazadDum":
            {
                name: "Khazad-Dûm",
                typeKey: CardSetType.DELUXE,
                value: "khazadDum",
            },
            "onTheDoorstep":
            {
                name: "On the Doorstep",
                typeKey: CardSetType.SAGA,
                value: "onTheDoorstep",
            },
            "overHillAndUnderHill":
            {
                name: "Over Hill and Under Hill",
                typeKey: CardSetType.SAGA,
                value: "overHillAndUnderHill",
            },
            "shadowsOfMirkwood":
            {
                name: "Shadows of Mirkwood",
                shortName: "SoM",
                typeKey: CardSetType.CYCLE,
                value: "shadowsOfMirkwood",
            },
            "theGreyHavens":
            {
                name: "The Grey Havens",
                typeKey: CardSetType.DELUXE,
                value: "theGreyHavens",
            },
            "theTreasonOfSaruman":
            {
                name: "The Treason of Saruman",
                typeKey: CardSetType.SAGA,
                value: "theTreasonOfSaruman",
            },
        },

        values: function()
        {
            return Object.getOwnPropertyNames(CardSet.properties);
        },
    };

    CardSet.values().forEach(function(cardKey)
    {
        var card = CardSet.properties[cardKey];
        card.type = CardSetType.properties[card.typeKey];
    });

    if (Object.freeze)
    {
        Object.freeze(CardSet);
    }

    return CardSet;
});

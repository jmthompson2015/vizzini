define([ "CardSetType" ], function(CardSetType)
{
    "use strict";
    var CardSet =
    {
        AGAINST_THE_SHADOW: "againstTheShadow",
        ANGMAR_AWAKENED: "angmarAwakened",
        CORE: "core",
        DWARROWDELF: "dwarrowdelf",
        HEIRS_OF_NUMENOR: "heirsOfNumenor",
        KHAZAD_DUM: "khazadDum",
        ON_THE_DOORSTEP: "onTheDoorstep",
        OVER_HILL_AND_UNDER_HILL: "overHillAndUnderHill",
        SHADOWS_OF_MIRKWOOD: "shadowsOfMirkwood",
        THE_GREY_HAVENS: "theGreyHavens",
        THE_LOST_REALM: "theLostRealm",
        THE_RING_MAKER: "theRingMaker",
        THE_TREASON_OF_SARUMAN: "theTreasonOfSaruman",
        THE_VOICE_OF_ISENGARD: "theVoiceOfIsengard",

        properties:
        {
            "againstTheShadow":
            {
                name: "Against the Shadow",
                typeKey: CardSetType.CYCLE,
                value: "againstTheShadow",
            },
            "angmarAwakened":
            {
                name: "Angmar Awakened",
                typeKey: CardSetType.CYCLE,
                value: "angmarAwakened",
            },
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
            "heirsOfNumenor":
            {
                name: "Heirs of Númenor",
                shortName: "HoN",
                typeKey: CardSetType.DELUXE,
                value: "heirsOfNumenor",
            },
            "khazadDum":
            {
                name: "Khazad-Dûm",
                shortName: "KD",
                typeKey: CardSetType.DELUXE,
                value: "khazadDum",
            },
            "onTheDoorstep":
            {
                name: "On the Doorstep",
                shortName: "OtD",
                typeKey: CardSetType.SAGA,
                value: "onTheDoorstep",
            },
            "overHillAndUnderHill":
            {
                name: "Over Hill and Under Hill",
                shortName: "OHaUH",
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
                shortName: "MEC47",
                typeKey: CardSetType.DELUXE,
                value: "theGreyHavens",
            },
            "theLostRealm":
            {
                name: "The Lost Realm",
                shortName: "MEC38",
                typeKey: CardSetType.DELUXE,
                value: "theLostRealm",
            },
            "theRingMaker":
            {
                name: "The Ring-Maker",
                typeKey: CardSetType.CYCLE,
                value: "theRingMaker",
            },
            "theTreasonOfSaruman":
            {
                name: "The Treason of Saruman",
                shortName: "MEC45",
                typeKey: CardSetType.SAGA,
                value: "theTreasonOfSaruman",
            },
            "theVoiceOfIsengard":
            {
                name: "The Voice of Isengard",
                shortName: "VoI",
                typeKey: CardSetType.DELUXE,
                value: "theVoiceOfIsengard",
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

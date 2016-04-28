define([ "CardSet", "CardSetType" ], function(CardSet, CardSetType)
{
    "use strict";
    var CardSubset =
    {
        ATS1_THE_STEWARDS_FEAR: "ats1TheStewardsFear",
        ATS2_THE_DRUADAN_FOREST: "ats2TheDruadanForest",
        ATS3_ENCOUNTER_AT_AMON_DIN: "ats3EncounterAtAmonDin",
        ATS4_ASSAULT_ON_OSGILIATH: "ats4AssaultOnOsgiliath",
        ATS5_THE_BLOOD_OF_GONDOR: "ats5TheBloodOfGondor",
        ATS6_THE_MORGUL_VALE: "ats6TheMorgulVale",
        D1_THE_REDHORN_GATE: "d1TheRedhornGate",
        D2_ROAD_TO_RIVENDELL: "d2RoadToRivendell",
        D3_THE_WATCHER_IN_THE_WATER: "d3TheWatcherInTheWater",
        D4_THE_LONG_DARK: "d4TheLongDark",
        D5_FOUNDATIONS_OF_STONE: "d5FoundationsOfStone",
        D6_SHADOW_AND_FLAME: "d6ShadowAndFlame",
        SOM1_THE_HUNT_FOR_GOLLUM: "som1TheHuntForGollum",
        SOM2_CONFLICT_AT_THE_CARROCK: "som2ConflictAtTheCarrock",
        SOM3_A_JOURNEY_TO_RHOSGOBEL: "som3AJourneyToRhosgobel",
        SOM4_THE_HILLS_OF_EMYN_MUIL: "som4TheHillsOfEmynMuil",
        SOM5_THE_DEAD_MARSHES: "som5TheDeadMarshes",
        SOM6_RETURN_TO_MIRKWOOD: "som6ReturnToMirkwood",

        properties:
        {
            "ats1TheStewardsFear":
            {
                name: "The Steward's Fear",
                shortName: "TSF",
                cardSetKey: CardSet.HEIRS_OF_NUMENOR,
                number: 1,
                value: "ats1TheStewardsFear",
            },
            "ats2TheDruadanForest":
            {
                name: "The Drúadan Forest",
                shortName: "TDF",
                cardSetKey: CardSet.HEIRS_OF_NUMENOR,
                number: 2,
                value: "ats2TheDruadanForest",
            },
            "ats3EncounterAtAmonDin":
            {
                name: "Encounter at Amon Dîn",
                shortName: "EaAD",
                cardSetKey: CardSet.HEIRS_OF_NUMENOR,
                number: 3,
                value: "ats3EncounterAtAmonDin",
            },
            "ats4AssaultOnOsgiliath":
            {
                name: "Assault on Osgiliath",
                shortName: "AoO",
                cardSetKey: CardSet.HEIRS_OF_NUMENOR,
                number: 4,
                value: "ats4AssaultOnOsgiliath",
            },
            "ats5TheBloodOfGondor":
            {
                name: "The Blood of Gondor",
                shortName: "TBoG",
                cardSetKey: CardSet.HEIRS_OF_NUMENOR,
                number: 5,
                value: "ats5TheBloodOfGondor",
            },
            "ats6TheMorgulVale":
            {
                name: "The Morgul Vale",
                shortName: "TMV",
                cardSetKey: CardSet.HEIRS_OF_NUMENOR,
                number: 6,
                value: "ats6TheMorgulVale",
            },
            "d1TheRedhornGate":
            {
                name: "The Redhorn Gate",
                shortName: "TRG",
                cardSetKey: CardSet.DWARROWDELF,
                number: 1,
                value: "d1TheRedhornGate",
            },
            "d2RoadToRivendell":
            {
                name: "Road To Rivendell",
                shortName: "RtR",
                cardSetKey: CardSet.DWARROWDELF,
                number: 2,
                value: "d2RoadToRivendell",
            },
            "d3TheWatcherInTheWater":
            {
                name: "The Watcher in the Water",
                shortName: "TWitW",
                cardSetKey: CardSet.DWARROWDELF,
                number: 3,
                value: "d3TheWatcherInTheWater",
            },
            "d4TheLongDark":
            {
                name: "The Long Dark",
                shortName: "TLD",
                cardSetKey: CardSet.DWARROWDELF,
                number: 4,
                value: "d4TheLongDark",
            },
            "d5FoundationsOfStone":
            {
                name: "Foundations of Stone",
                shortName: "FoS",
                cardSetKey: CardSet.DWARROWDELF,
                number: 5,
                value: "d5FoundationsOfStone",
            },
            "d6ShadowAndFlame":
            {
                name: "Shadow and Flame",
                shortName: "SaF",
                cardSetKey: CardSet.DWARROWDELF,
                number: 6,
                value: "d6ShadowAndFlame",
            },
            "som1TheHuntForGollum":
            {
                name: "The Hunt for Gollum",
                shortName: "thfg",
                cardSetKey: CardSet.SHADOWS_OF_MIRKWOOD,
                number: 1,
                value: "som1TheHuntForGollum",
            },
            "som2ConflictAtTheCarrock":
            {
                name: "Conflict at the Carrock",
                shortName: "CatC",
                cardSetKey: CardSet.SHADOWS_OF_MIRKWOOD,
                number: 2,
                value: "som2ConflictAtTheCarrock",
            },
            "som3AJourneyToRhosgobel":
            {
                name: "A Journey to Rhosgobel",
                shortName: "AJtR",
                cardSetKey: CardSet.SHADOWS_OF_MIRKWOOD,
                number: 3,
                value: "som3AJourneyToRhosgobel",
            },
            "som4TheHillsOfEmynMuil":
            {
                name: "The Hills of Emyn Muil",
                shortName: "THoEM",
                cardSetKey: CardSet.SHADOWS_OF_MIRKWOOD,
                number: 4,
                value: "som4TheHillsOfEmynMuil",
            },
            "som5TheDeadMarshes":
            {
                name: "The Dead Marshes",
                shortName: "TDM",
                cardSetKey: CardSet.SHADOWS_OF_MIRKWOOD,
                number: 5,
                value: "som5TheDeadMarshes",
            },
            "som6ReturnToMirkwood":
            {
                name: "Return to Mirkwood",
                shortName: "RtM",
                cardSetKey: CardSet.SHADOWS_OF_MIRKWOOD,
                number: 6,
                value: "som6ReturnToMirkwood",
            },
        },

        values: function()
        {
            return Object.getOwnPropertyNames(CardSubset.properties);
        },
    };

    CardSubset.values().forEach(function(cardKey)
    {
        var card = CardSubset.properties[cardKey];
        card.cardSet = CardSet.properties[card.cardSetKey];
        card.typeKey = CardSetType.ADVENTURE_PACK;
        card.type = CardSetType.properties[card.typeKey];
    });

    if (Object.freeze)
    {
        Object.freeze(CardSubset);
    }

    return CardSubset;
});

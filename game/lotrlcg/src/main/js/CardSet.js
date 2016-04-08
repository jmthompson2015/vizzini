define([ "CardSetType" ], function(CardSetType)
{
    "use strict";
    var CardSet =
    {
        CORE: "core",
        D1_THE_REDHORN_GATE: "d1TheRedhornGate",
        D2_ROAD_TO_RIVENDELL: "d2RoadToRivendell",
        D3_THE_WATCHER_IN_THE_WATER: "d3TheWatcherInTheWater",
        D4_THE_LONG_DARK: "d4TheLongDark",
        D5_FOUNDATIONS_OF_STONE: "d5FoundationsOfStone",
        D6_SHADOW_AND_FLAME: "d6ShadowAndFlame",
        KHAZAD_DUM: "khazadDum",
        ON_THE_DOORSTEP: "onTheDoorstep",
        OVER_HILL_AND_UNDER_HILL: "overHillAndUnderHill",
        SOM1_THE_HUNT_FOR_GOLLUM: "som1TheHuntForGollum",
        SOM2_CONFLICT_AT_THE_CARROCK: "som2ConflictAtTheCarrock",
        SOM3_A_JOURNEY_TO_RHOSGOBEL: "som3AJourneyToRhosgobel",
        SOM4_THE_HILLS_OF_EMYN_MUIL: "som4TheHillsOfEmynMuil",
        SOM5_THE_DEAD_MARSHES: "som5TheDeadMarshes",
        SOM6_RETURN_TO_MIRKWOOD: "som6ReturnToMirkwood",
        THE_GREY_HAVENS: "theGreyHavens",
        THE_TREASON_OF_SARUMAN: "theTreasonOfSaruman",

        properties:
        {
            "core":
            {
                name: "Core",
                type: CardSetType.CORE,
                value: "core",
            },
            "d1TheRedhornGate":
            {
                name: "Dwarrowdelf: 1 The Redhorn Gate",
                type: CardSetType.ADVENTURE_PACK,
                value: "d1TheRedhornGate",
            },
            "d2RoadToRivendell":
            {
                name: "Dwarrowdelf: 2 Road To Rivendell",
                type: CardSetType.ADVENTURE_PACK,
                value: "d2RoadToRivendell",
            },
            "d3TheWatcherInTheWater":
            {
                name: "Dwarrowdelf: 3 The Watcher in the Water",
                type: CardSetType.ADVENTURE_PACK,
                value: "d3TheWatcherInTheWater",
            },
            "d4TheLongDark":
            {
                name: "Dwarrowdelf: 4 The Long Dark",
                type: CardSetType.ADVENTURE_PACK,
                value: "d4TheLongDark",
            },
            "d5FoundationsOfStone":
            {
                name: "Dwarrowdelf: 5 Foundations of Stone",
                type: CardSetType.ADVENTURE_PACK,
                value: "d5FoundationsOfStone",
            },
            "d6ShadowAndFlame":
            {
                name: "Dwarrowdelf: 6 Shadow and Flame",
                type: CardSetType.ADVENTURE_PACK,
                value: "d6ShadowAndFlame",
            },
            "khazadDum":
            {
                name: "Khazad-Dûm",
                type: CardSetType.DELUXE,
                value: "khazadDum",
            },
            "onTheDoorstep":
            {
                name: "On the Doorstep",
                type: CardSetType.SAGA,
                value: "onTheDoorstep",
            },
            "overHillAndUnderHill":
            {
                name: "Over Hill and Under Hill",
                type: CardSetType.SAGA,
                value: "overHillAndUnderHill",
            },
            "som1TheHuntForGollum":
            {
                name: "Shadows of Mirkwood: 1 The Hunt for Gollum",
                shortName:"thfg",
                type: CardSetType.ADVENTURE_PACK,
                value: "som1TheHuntForGollum",
            },
            "som2ConflictAtTheCarrock":
            {
                name: "Shadows of Mirkwood: 2 Conflict at the Carrock",
                type: CardSetType.ADVENTURE_PACK,
                value: "som2ConflictAtTheCarrock",
            },
            "som3AJourneyToRhosgobel":
            {
                name: "Shadows of Mirkwood: 3 A Journey to Rhosgobel",
                type: CardSetType.ADVENTURE_PACK,
                value: "som3AJourneyToRhosgobel",
            },
            "som4TheHillsOfEmynMuil":
            {
                name: "Shadows of Mirkwood: 4 The Hills of Emyn Muil",
                type: CardSetType.ADVENTURE_PACK,
                value: "som4TheHillsOfEmynMuil",
            },
            "som5TheDeadMarshes":
            {
                name: "Shadows of Mirkwood: 5 The Dead Marshes",
                type: CardSetType.ADVENTURE_PACK,
                value: "som5TheDeadMarshes",
            },
            "som6ReturnToMirkwood":
            {
                name: "Shadows of Mirkwood: 6 Return to Mirkwood",
                type: CardSetType.ADVENTURE_PACK,
                value: "som6ReturnToMirkwood",
            },
            "theGreyHavens":
            {
                name: "The Grey Havens",
                type: CardSetType.DELUXE,
                value: "theGreyHavens",
            },
            "theTreasonOfSaruman":
            {
                name: "The Treason of Saruman",
                type: CardSetType.SAGA,
                value: "theTreasonOfSaruman",
            },
        },

        values: function()
        {
            return Object.getOwnPropertyNames(CardSet.properties);
        },
    };

    if (Object.freeze)
    {
        Object.freeze(CardSet);
    }

    return CardSet;
});

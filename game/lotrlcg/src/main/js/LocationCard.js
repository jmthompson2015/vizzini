define([ "CardType", "EncounterSet", "GameMode", "Trait" ], function(CardType, EncounterSet, GameMode, Trait)
{
    "use strict";
    var LocationCard =
    {
        ENCHANTED_STREAM: "enchantedStream",
        FOREST_GATE: "forestGate",
        GREAT_FOREST_WEB: "greatForestWeb",
        MOUNTAINS_OF_MIRKWOOD: "mountainsOfMirkwood",
        NECROMANCERS_PASS: "necromancersPass",
        OLD_FOREST_ROAD: "oldForestRoad",

        properties:
        {
            "enchantedStream":
            {
                name: "Enchanted Stream",
                threat: 2,
                questPoints: 2,
                traits: [ Trait.FOREST ],
                encounterSet: EncounterSet.DOL_GULDUR_ORCS,
                gameMode: GameMode.EASY,
                value: "enchantedStream",
            },
            "forestGate":
            {
                name: "Forest Gate",
                threat: 2,
                questPoints: 4,
                traits: [ Trait.FOREST ],
                encounterSet: EncounterSet.PASSAGE_THROUGH_MIRKWOOD,
                gameMode: GameMode.EASY,
                value: "forestGate",
            },
            "greatForestWeb":
            {
                name: "Great Forest Web",
                threat: 2,
                questPoints: 2,
                traits: [ Trait.FOREST ],
                encounterSet: EncounterSet.SPIDERS_OF_MIRKWOOD,
                gameMode: GameMode.EASY,
                value: "greatForestWeb",
            },
            "mountainsOfMirkwood":
            {
                name: "Mountains of Mirkwood",
                threat: 2,
                questPoints: 3,
                traits: [ Trait.FOREST, Trait.MOUNTAIN ],
                encounterSet: EncounterSet.SPIDERS_OF_MIRKWOOD,
                gameMode: GameMode.EASY,
                value: "mountainsOfMirkwood",
            },
            "necromancersPass":
            {
                name: "Necromancer's Pass",
                threat: 3,
                questPoints: 2,
                traits: [ Trait.STRONGHOLD, Trait.DOL_GULDUR ],
                encounterSet: EncounterSet.DOL_GULDUR_ORCS,
                gameMode: GameMode.STANDARD,
                value: "necromancersPass",
            },
            "oldForestRoad":
            {
                name: "Old Forest Road",
                threat: 1,
                questPoints: 3,
                traits: [ Trait.FOREST ],
                encounterSet: EncounterSet.PASSAGE_THROUGH_MIRKWOOD,
                gameMode: GameMode.EASY,
                value: "oldForestRoad",
            },
        },

        values: function()
        {
            return Object.getOwnPropertyNames(LocationCard.properties);
        },
    };

    LocationCard.values().forEach(function(cardKey)
    {
        var card = LocationCard.properties[cardKey];
        card.cardType = CardType.LOCATION;
    });

    if (Object.freeze)
    {
        Object.freeze(LocationCard);
    }

    return LocationCard;
});

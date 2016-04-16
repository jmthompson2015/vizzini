define([ "CardType", "EncounterSet", "GameMode", "ImageNameCreator", "Trait" ], function(CardType, EncounterSet,
        GameMode, ImageNameCreator, Trait)
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
                traitKeys: [ Trait.FOREST ],
                encounterSetKey: EncounterSet.DOL_GULDUR_ORCS,
                gameModeKey: GameMode.EASY,
                value: "enchantedStream",
            },
            "forestGate":
            {
                name: "Forest Gate",
                threat: 2,
                questPoints: 4,
                traitKeys: [ Trait.FOREST ],
                encounterSetKey: EncounterSet.PASSAGE_THROUGH_MIRKWOOD,
                gameModeKey: GameMode.EASY,
                value: "forestGate",
            },
            "greatForestWeb":
            {
                name: "Great Forest Web",
                threat: 2,
                questPoints: 2,
                traitKeys: [ Trait.FOREST ],
                encounterSetKey: EncounterSet.SPIDERS_OF_MIRKWOOD,
                gameModeKey: GameMode.EASY,
                value: "greatForestWeb",
            },
            "mountainsOfMirkwood":
            {
                name: "Mountains of Mirkwood",
                threat: 2,
                questPoints: 3,
                traitKeys: [ Trait.FOREST, Trait.MOUNTAIN ],
                encounterSetKey: EncounterSet.SPIDERS_OF_MIRKWOOD,
                gameModeKey: GameMode.EASY,
                // This image is missing from cardgamedb.com
                image: "http://talesfromthecards.files.wordpress.com/2013/03/mountains-of-mirkwood.jpg?w=200&h=279",
                value: "mountainsOfMirkwood",
            },
            "necromancersPass":
            {
                name: "Necromancer's Pass",
                threat: 3,
                questPoints: 2,
                traitKeys: [ Trait.STRONGHOLD, Trait.DOL_GULDUR ],
                encounterSetKey: EncounterSet.DOL_GULDUR_ORCS,
                gameModeKey: GameMode.STANDARD,
                value: "necromancersPass",
            },
            "oldForestRoad":
            {
                name: "Old Forest Road",
                threat: 1,
                questPoints: 3,
                traitKeys: [ Trait.FOREST ],
                encounterSetKey: EncounterSet.PASSAGE_THROUGH_MIRKWOOD,
                gameModeKey: GameMode.EASY,
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
        card.cardTypeKey = CardType.LOCATION;
        card.cardType = CardType.properties[card.cardTypeKey];
        card.encounterSet = EncounterSet.properties[card.encounterSetKey];
        card.gameMode = GameMode.properties[card.gameModeKey];

        if (!card.image)
        {
            card.image = ImageNameCreator.create(card);
        }
    });

    if (Object.freeze)
    {
        Object.freeze(LocationCard);
    }

    return LocationCard;
});

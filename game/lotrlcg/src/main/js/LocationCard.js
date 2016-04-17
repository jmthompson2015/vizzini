define([ "CardType", "EncounterSet", "GameMode", "ImageNameCreator", "Trait" ], function(CardType, EncounterSet,
        GameMode, ImageNameCreator, Trait)
{
    "use strict";
    var LocationCard =
    {
        BANKS_OF_THE_ANDUIN: "banksOfTheAnduin",
        ENCHANTED_STREAM: "enchantedStream",
        FOREST_GATE: "forestGate",
        GLADDEN_FIELDS: "gladdenFields",
        GREAT_FOREST_WEB: "greatForestWeb",
        MOUNTAINS_OF_MIRKWOOD: "mountainsOfMirkwood",
        NECROMANCERS_PASS: "necromancersPass",
        OLD_FOREST_ROAD: "oldForestRoad",
        RIVER_NINGLOR: "riverNinglor",
        THE_EAST_BANK: "theEastBank",
        THE_EAVES_OF_MIRKWOOD: "theEavesOfMirkwood",
        THE_OLD_FORD: "theOldFord",
        THE_WEST_BANK: "theWestBank",

        properties:
        {
            "banksOfTheAnduin":
            {
                name: "Banks of the Anduin",
                threat: 1,
                questPoints: 3,
                traitKeys: [ Trait.RIVERLAND ],
                encounterSetKey: EncounterSet.JOURNEY_DOWN_THE_ANDUIN,
                gameModeKey: GameMode.EASY,
                value: "banksOfTheAnduin",
            },
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
            "gladdenFields":
            {
                name: "Gladden Fields",
                threat: 3,
                questPoints: 3,
                traitKeys: [ Trait.MARSHLAND ],
                encounterSetKey: EncounterSet.JOURNEY_DOWN_THE_ANDUIN,
                gameModeKey: GameMode.EASY,
                value: "gladdenFields",
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
            "riverNinglor":
            {
                name: "River Ninglor",
                threat: 2,
                questPoints: 4,
                traitKeys: [ Trait.RIVERLAND ],
                encounterSetKey: EncounterSet.THE_HUNT_FOR_GOLLUM,
                gameModeKey: GameMode.EASY,
                value: "riverNinglor",
            },
            "theEastBank":
            {
                name: "The East Bank",
                threat: 3,
                questPoints: 3,
                traitKeys: [ Trait.RIVERLAND ],
                encounterSetKey: EncounterSet.THE_HUNT_FOR_GOLLUM,
                gameModeKey: GameMode.EASY,
                value: "theEastBank",
            },
            "theEavesOfMirkwood":
            {
                name: "The Eaves of Mirkwood",
                threat: 2,
                questPoints: 2,
                traitKeys: [ Trait.FOREST ],
                encounterSetKey: EncounterSet.THE_HUNT_FOR_GOLLUM,
                gameModeKey: GameMode.EASY,
                value: "theEavesOfMirkwood",
            },
            "theOldFord":
            {
                name: "The Old Ford",
                threat: undefined,
                questPoints: 2,
                traitKeys: [ Trait.RIVERLAND ],
                encounterSetKey: EncounterSet.THE_HUNT_FOR_GOLLUM,
                gameModeKey: GameMode.STANDARD,
                value: "theOldFord",
            },
            "theWestBank":
            {
                name: "The West Bank",
                threat: 3,
                questPoints: 3,
                traitKeys: [ Trait.RIVERLAND ],
                encounterSetKey: EncounterSet.THE_HUNT_FOR_GOLLUM,
                gameModeKey: GameMode.EASY,
                value: "theWestBank",
            },
        },

        values: function()
        {
            return Object.getOwnPropertyNames(LocationCard.properties);
        },

        valuesByEncounterSet: function(encounterSetKey)
        {
            InputValidator.validateNotNull("encounterSetKey", encounterSetKey);

            var values = LocationCard.values();

            return values.filter(function(cardKey)
            {
                var card = LocationCard.properties[cardKey];

                return card.scenarioKey === scenarioKey;
            });
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

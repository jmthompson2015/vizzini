define([ "CardType", "EncounterSet", "GameMode", "ImageNameCreator", "Trait" ], function(CardType, EncounterSet,
        GameMode, ImageNameCreator, Trait)
{
    "use strict";
    var EnemyCard =
    {
        BLACK_FOREST_BATS: "blackForestBats",
        CHIEFTAN_UFTHAK: "chieftanUfthak",
        DOL_GULDUR_BEASTMASTER: "dolGuldurBeastmaster",
        DOL_GULDUR_ORCS: "dolGuldurOrcs",
        EAST_BIGHT_PATROL: "eastBightPatrol",
        FOREST_SPIDER: "forestSpider",
        GOBLIN_SNIPER: "goblinSniper",
        HUMMERHORNS: "hummerhorns",
        KING_SPIDER: "kingSpider",
        UNGOLIANTS_SPAWN: "ungoliantsSpawn",

        properties:
        {
            "blackForestBats":
            {
                name: "Black Forest Bats",
                engagementCost: 15,
                threat: 1,
                attack: 1,
                defense: 0,
                hitPoints: 2,
                traitKeys: [ Trait.CREATURE ],
                encounterSetKey: EncounterSet.PASSAGE_THROUGH_MIRKWOOD,
                gameModeKey: GameMode.EASY,
                value: "blackForestBats",
            },
            "chieftanUfthak":
            {
                name: "Chieftan Ufthak",
                engagementCost: 35,
                threat: 2,
                attack: 3,
                defense: 3,
                hitPoints: 6,
                traitKeys: [ Trait.DOL_GULDUR, Trait.ORC ],
                encounterSetKey: EncounterSet.DOL_GULDUR_ORCS,
                gameModeKey: GameMode.STANDARD,
                value: "chieftanUfthak",
            },
            "dolGuldurBeastmaster":
            {
                name: "Dol Guldur Beastmaster",
                engagementCost: 35,
                threat: 2,
                attack: 3,
                defense: 1,
                hitPoints: 5,
                traitKeys: [ Trait.DOL_GULDUR, Trait.ORC ],
                encounterSetKey: EncounterSet.DOL_GULDUR_ORCS,
                gameModeKey: GameMode.STANDARD,
                value: "dolGuldurBeastmaster",
            },
            "dolGuldurOrcs":
            {
                name: "Dol Guldur Orcs",
                engagementCost: 10,
                threat: 2,
                attack: 2,
                defense: 0,
                hitPoints: 3,
                traitKeys: [ Trait.DOL_GULDUR, Trait.ORC ],
                encounterSetKey: EncounterSet.DOL_GULDUR_ORCS,
                gameModeKey: GameMode.EASY,
                value: "dolGuldurOrcs",
            },
            "eastBightPatrol":
            {
                name: "East Bight Patrol",
                engagementCost: 5,
                threat: 3,
                attack: 3,
                defense: 1,
                hitPoints: 2,
                traitKeys: [ Trait.GOBLIN, Trait.ORC ],
                encounterSetKey: EncounterSet.PASSAGE_THROUGH_MIRKWOOD,
                gameModeKey: GameMode.EASY,
                value: "eastBightPatrol",
            },
            "forestSpider":
            {
                name: "Forest Spider",
                engagementCost: 25,
                threat: 2,
                attack: 2,
                defense: 1,
                hitPoints: 4,
                traitKeys: [ Trait.CREATURE, Trait.SPIDER ],
                encounterSetKey: EncounterSet.PASSAGE_THROUGH_MIRKWOOD,
                gameModeKey: GameMode.EASY,
                value: "forestSpider",
            },
            "goblinSniper":
            {
                name: "Goblin Sniper",
                engagementCost: 48,
                threat: 2,
                attack: 2,
                defense: 0,
                hitPoints: 2,
                traitKeys: [ Trait.GOBLIN, Trait.ORC ],
                encounterSetKey: EncounterSet.WILDERLANDS,
                gameModeKey: GameMode.STANDARD,
                value: "goblinSniper",
            },
            "hummerhorns":
            {
                name: "Hummerhorns",
                engagementCost: 40,
                threat: 1,
                attack: 2,
                defense: 0,
                hitPoints: 3,
                traitKeys: [ Trait.CREATURE, Trait.INSECT ],
                encounterSetKey: EncounterSet.SPIDERS_OF_MIRKWOOD,
                gameModeKey: GameMode.STANDARD,
                value: "hummerhorns",
            },
            "kingSpider":
            {
                name: "King Spider",
                engagementCost: 20,
                threat: 2,
                attack: 3,
                defense: 1,
                hitPoints: 3,
                traitKeys: [ Trait.CREATURE, Trait.SPIDER ],
                encounterSetKey: EncounterSet.SPIDERS_OF_MIRKWOOD,
                gameModeKey: GameMode.EASY,
                value: "kingSpider",
            },
            "ungoliantsSpawn":
            {
                name: "Ungoliant's Spawn",
                engagementCost: 32,
                threat: 3,
                attack: 5,
                defense: 2,
                hitPoints: 9,
                traitKeys: [ Trait.CREATURE, Trait.SPIDER ],
                encounterSetKey: EncounterSet.SPIDERS_OF_MIRKWOOD,
                gameModeKey: GameMode.EASY,
                value: "ungoliantsSpawn",
            },
        },

        values: function()
        {
            return Object.getOwnPropertyNames(EnemyCard.properties);
        },
    };

    EnemyCard.values().forEach(function(cardKey)
    {
        var card = EnemyCard.properties[cardKey];
        card.cardTypeKey = CardType.ENEMY;
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
        Object.freeze(EnemyCard);
    }

    return EnemyCard;
});

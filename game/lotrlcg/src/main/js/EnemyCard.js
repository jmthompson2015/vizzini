define([ "CardType", "EncounterSet", "GameMode", "Trait" ], function(CardType, EncounterSet, GameMode, Trait)
{
    "use strict";
    var EnemyCard =
    {
        BLACK_FOREST_BATS: "blackForestBats",
        CHIEFTAIN_UFTHAK: "chieftainUfthak",
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
                traits: [ Trait.CREATURE ],
                encounterSet: EncounterSet.PASSAGE_THROUGH_MIRKWOOD,
                gameMode: GameMode.EASY,
                value: "blackForestBats",
            },
            "chieftainUfthak":
            {
                name: "Chieftain Ufthak",
                engagementCost: 35,
                threat: 2,
                attack: 3,
                defense: 3,
                hitPoints: 6,
                traits: [ Trait.DOL_GULDUR, Trait.ORC ],
                encounterSet: EncounterSet.DOL_GULDUR_ORCS,
                gameMode: GameMode.STANDARD,
                value: "chieftainUfthak",
            },
            "dolGuldurBeastmaster":
            {
                name: "Dol Guldur Beastmaster",
                engagementCost: 35,
                threat: 2,
                attack: 3,
                defense: 1,
                hitPoints: 5,
                traits: [ Trait.DOL_GULDUR, Trait.ORC ],
                encounterSet: EncounterSet.DOL_GULDUR_ORCS,
                gameMode: GameMode.STANDARD,
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
                traits: [ Trait.DOL_GULDUR, Trait.ORC ],
                encounterSet: EncounterSet.DOL_GULDUR_ORCS,
                gameMode: GameMode.EASY,
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
                traits: [ Trait.GOBLIN, Trait.ORC ],
                encounterSet: EncounterSet.PASSAGE_THROUGH_MIRKWOOD,
                gameMode: GameMode.EASY,
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
                traits: [ Trait.CREATURE, Trait.SPIDER ],
                encounterSet: EncounterSet.PASSAGE_THROUGH_MIRKWOOD,
                gameMode: GameMode.EASY,
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
                traits: [ Trait.GOBLIN, Trait.ORC ],
                // set: CardSet.CORE,
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
                traits: [ Trait.CREATURE, Trait.INSECT ],
                encounterSet: EncounterSet.SPIDERS_OF_MIRKWOOD,
                gameMode: GameMode.STANDARD,
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
                traits: [ Trait.CREATURE, Trait.SPIDER ],
                encounterSet: EncounterSet.SPIDERS_OF_MIRKWOOD,
                gameMode: GameMode.EASY,
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
                traits: [ Trait.CREATURE, Trait.SPIDER ],
                encounterSet: EncounterSet.SPIDERS_OF_MIRKWOOD,
                gameMode: GameMode.EASY,
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
        card.cardType = CardType.ENEMY;
    });

    if (Object.freeze)
    {
        Object.freeze(EnemyCard);
    }

    return EnemyCard;
});

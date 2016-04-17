define([ "EnemyCard", "LocationCard", "ObjectiveCard", "QuestCard", "TreacheryCard", "game/CardInstance",
        "game/ScenarioDeck" ], function(EnemyCard, LocationCard, ObjectiveCard, QuestCard, TreacheryCard, CardInstance,
        ScenarioDeck)
{
    "use strict";
    var DeckBuilders = [];

    var CoreSetPassageThroughMirkwoodDeckBuilder = new ScenarioDeckBuilder("Passage Through Mirkwood (Core #1)", 2011,
            "Passage Through Mirkwood", function()
            {
                var questTokens = [];
                addQuest(questTokens, QuestCard.PTM1A_FLIES_AND_SPIDERS);
                addQuest(questTokens, QuestCard.PTM1B_FLIES_AND_SPIDERS);
                addQuest(questTokens, QuestCard.PTM2A_A_FORK_IN_THE_ROAD);
                addQuest(questTokens, QuestCard.PTM2B_A_FORK_IN_THE_ROAD);
                addQuest(questTokens, QuestCard.PTM3A_A_CHOSEN_PATH);
                addQuest(questTokens, QuestCard.PTM3B1_BEORNS_PATH);

                var encounterTokens = [];
                addEnemy(encounterTokens, EnemyCard.BLACK_FOREST_BATS, 1);
                addEnemy(encounterTokens, EnemyCard.CHIEFTAN_UFTHAK, 1);
                addEnemy(encounterTokens, EnemyCard.DOL_GULDUR_BEASTMASTER, 2);
                addEnemy(encounterTokens, EnemyCard.DOL_GULDUR_ORCS, 3);
                addEnemy(encounterTokens, EnemyCard.EAST_BIGHT_PATROL, 1);
                addEnemy(encounterTokens, EnemyCard.FOREST_SPIDER, 4);
                addEnemy(encounterTokens, EnemyCard.HUMMERHORNS, 1);
                addEnemy(encounterTokens, EnemyCard.KING_SPIDER, 2);
                addEnemy(encounterTokens, EnemyCard.UNGOLIANTS_SPAWN, 1);

                addLocation(encounterTokens, LocationCard.ENCHANTED_STREAM, 2);
                addLocation(encounterTokens, LocationCard.FOREST_GATE, 2);
                addLocation(encounterTokens, LocationCard.GREAT_FOREST_WEB, 2);
                addLocation(encounterTokens, LocationCard.MOUNTAINS_OF_MIRKWOOD, 3);
                addLocation(encounterTokens, LocationCard.NECROMANCERS_PASS, 2);
                addLocation(encounterTokens, LocationCard.OLD_FOREST_ROAD, 2);

                addTreachery(encounterTokens, TreacheryCard.CAUGHT_IN_A_WEB, 2);
                addTreachery(encounterTokens, TreacheryCard.DRIVEN_BY_SHADOW, 1);
                addTreachery(encounterTokens, TreacheryCard.EYES_OF_THE_FOREST, 1);
                addTreachery(encounterTokens, TreacheryCard.THE_NECROMANCERS_REACH, 3);

                return new ScenarioDeck(questTokens, encounterTokens);
            });
    DeckBuilders.push(CoreSetPassageThroughMirkwoodDeckBuilder);

    var TheHuntForGollumDeckBuilder = new ScenarioDeckBuilder("The Hunt for Gollum", 2011, "The Hunt for Gollum",
            function()
            {
                var questTokens = [];
                addQuest(questTokens, QuestCard.THFG1A_THE_HUNT_BEGINS);
                addQuest(questTokens, QuestCard.THFG1B_THE_HUNT_BEGINS);
                addQuest(questTokens, QuestCard.THFG2A_A_NEW_TERROR_ABROAD);
                addQuest(questTokens, QuestCard.THFG2B_A_NEW_TERROR_ABROAD);
                addQuest(questTokens, QuestCard.THFG3A_ON_THE_TRAIL);
                addQuest(questTokens, QuestCard.THFG3B_ON_THE_TRAIL);

                var encounterTokens = [];
                addEnemy(encounterTokens, EnemyCard.EASTERN_CROWS, 3);
                addEnemy(encounterTokens, EnemyCard.MISTY_MOUNTAIN_GOBLINS, 3);
                addEnemy(encounterTokens, EnemyCard.GOBLINTOWN_SCAVENGERS, 2);
                addEnemy(encounterTokens, EnemyCard.HUNTERS_FROM_MORDOR, 5);

                addLocation(encounterTokens, LocationCard.RIVER_NINGLOR, 2);
                addLocation(encounterTokens, LocationCard.THE_EAST_BANK, 2);
                addLocation(encounterTokens, LocationCard.THE_EAVES_OF_MIRKWOOD, 3);
                addLocation(encounterTokens, LocationCard.THE_OLD_FORD, 2);
                addLocation(encounterTokens, LocationCard.THE_WEST_BANK, 2);
                addLocation(encounterTokens, LocationCard.BANKS_OF_THE_ANDUIN, 2);
                addLocation(encounterTokens, LocationCard.GLADDEN_FIELDS, 3);

                addObjective(encounterTokens, ObjectiveCard.SIGNS_OF_GOLLUM, 4);

                addTreachery(encounterTokens, TreacheryCard.FALSE_LEAD, 2);
                addTreachery(encounterTokens, TreacheryCard.FLOODING, 2);
                addTreachery(encounterTokens, TreacheryCard.OLD_WIVES_TALES, 3);
                addTreachery(encounterTokens, TreacheryCard.MASSING_AT_NIGHT, 1);
                addTreachery(encounterTokens, TreacheryCard.EVIL_STORM, 3);
                addTreachery(encounterTokens, TreacheryCard.PURSUED_BY_SHADOW, 2);
                addTreachery(encounterTokens, TreacheryCard.TREACHEROUS_FOG, 2);

                return new ScenarioDeck(questTokens, encounterTokens);
            });
    DeckBuilders.push(TheHuntForGollumDeckBuilder);

    function ScenarioDeckBuilder(name, year, description, buildFunction)
    {
        InputValidator.validateNotNull("name", name);
        InputValidator.validateNotNull("year", year);
        InputValidator.validateNotNull("description", description);
        InputValidator.validateNotNull("buildFunction", buildFunction);

        this.name = function()
        {
            return name;
        };

        this.year = function()
        {
            return year;
        };

        this.description = function()
        {
            return description;
        };

        this.buildDeck = function()
        {
            return buildFunction();
        };
    }

    function addEnemy(array, cardKey, count)
    {
        InputValidator.validateNotNull("cardKey", cardKey);

        for (var i = 0; i < count; i++)
        {
            array.push(CardInstance.enemy(cardKey));
        }
    }

    function addLocation(array, cardKey, count)
    {
        InputValidator.validateNotNull("cardKey", cardKey);

        for (var i = 0; i < count; i++)
        {
            array.push(CardInstance.location(cardKey));
        }
    }

    function addObjective(array, cardKey, count)
    {
        InputValidator.validateNotNull("cardKey", cardKey);

        for (var i = 0; i < count; i++)
        {
            array.push(CardInstance.objective(cardKey));
        }
    }

    function addQuest(array, cardKey)
    {
        InputValidator.validateNotNull("cardKey", cardKey);

        array.push(CardInstance.quest(cardKey));
    }

    function addTreachery(array, cardKey, count)
    {
        InputValidator.validateNotNull("cardKey", cardKey);

        for (var i = 0; i < count; i++)
        {
            array.push(CardInstance.treachery(cardKey));
        }
    }

    return (
    {
        CoreSetPassageThroughMirkwoodDeckBuilder: CoreSetPassageThroughMirkwoodDeckBuilder,
        TheHuntForGollumDeckBuilder: TheHuntForGollumDeckBuilder,
        DeckBuilders: DeckBuilders,
        ScenarioDeckBuilder: ScenarioDeckBuilder,
    });
});

define([ "EnemyCard", "LocationCard", "QuestCard", "TreacheryCard", "game/CardInstance", "game/ScenarioDeck" ],
        function(EnemyCard, LocationCard, QuestCard, TreacheryCard, CardInstance, ScenarioDeck)
        {
            "use strict";
            var DeckBuilders = [];

            var CoreSetPassageThroughMirkwoodDeckBuilder = new ScenarioDeckBuilder(
                    "Passage Through Mirkwood (Core #1)", 2011, "Passage Through Mirkwood", function()
                    {
                        var questTokens = [];
                        addQuest(questTokens, QuestCard.FLIES_AND_SPIDERS);
                        addQuest(questTokens, QuestCard.A_FORK_IN_THE_ROAD);
                        addQuest(questTokens, QuestCard.A_CHOSEN_PATH_BEORNS_PATH);
                        addQuest(questTokens, QuestCard.A_CHOSEN_PATH_DONT_LEAVE_THE_PATH);

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
                DeckBuilders: DeckBuilders,
                ScenarioDeckBuilder: ScenarioDeckBuilder,
            });
        });

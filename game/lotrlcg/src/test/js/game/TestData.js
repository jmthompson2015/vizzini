define([ "AllyCard", "CardSet", "EnemyCard", "HeroCard", "LocationCard", "QuestCard", "Sphere", "game/Agent",
        "game/CardInstance", "game/Reducer", "game/Store" ], function(AllyCard, CardSet, EnemyCard, HeroCard,
        LocationCard, QuestCard, Sphere, Agent, CardInstance, Reducer, Store)
{
    var TestData =
    {
        createAgent0: function(cardInstances)
        {
            InputValidator.validateNotNull("cardInstances", cardInstances);

            var id = 0;
            var name = "Aaron";
            var threatLevel = 28;
            var hero0 = CardInstance.hero(HeroCard.ARAGORN_LEADERSHIP);
            var hero1 = CardInstance.hero(HeroCard.THEODRED);
            var hero2 = CardInstance.hero(HeroCard.DENETHOR);
            cardInstances[hero0.id] = hero0;
            cardInstances[hero1.id] = hero1;
            cardInstances[hero2.id] = hero2;
            var heroIds = [];
            heroIds.push(hero0.id);
            heroIds.push(hero1.id);
            heroIds.push(hero2.id);
            var playerCardIds = [];
            AllyCard.values().forEach(
                    function(cardKey)
                    {
                        var card = AllyCard.properties[cardKey];
                        if (card.cardSetKey === CardSet.CORE &&
                                ([ Sphere.LEADERSHIP, Sphere.LORE, Sphere.NEUTRAL ].vizziniContains(card.sphereKey)))
                        {
                            var playerCard = CardInstance.ally(cardKey);
                            cardInstances[playerCard.id] = playerCard;
                            playerCardIds.push(playerCard.id);
                        }
                    });
            var agent = Agent.create(id, name, threatLevel, heroIds, playerCardIds);

            var enemyCard = CardInstance.enemy(EnemyCard.FOREST_SPIDER);
            cardInstances[enemyCard.id] = enemyCard;
            agent.engagementAreaIds.push(enemyCard.id);

            // Deal 6 cards.
            for (var i = 0; i < 6; i++)
            {
                var cardId = playerCardIds.shift();
                agent.handIds.push(cardId);
            }

            return agent;
        },

        createAgent1: function(cardInstances)
        {
            InputValidator.validateNotNull("cardInstances", cardInstances);

            var id = 1;
            var name = "Bruce";
            var threatLevel = 29;
            var hero0 = CardInstance.hero(HeroCard.GIMLI);
            var hero1 = CardInstance.hero(HeroCard.THALIN);
            var hero2 = CardInstance.hero(HeroCard.EOWYN);
            cardInstances[hero0.id] = hero0;
            cardInstances[hero1.id] = hero1;
            cardInstances[hero2.id] = hero2;
            var heroIds = [];
            heroIds.push(hero0.id);
            heroIds.push(hero1.id);
            heroIds.push(hero2.id);

            var playerCardIds = [];
            AllyCard.values().forEach(
                    function(cardKey)
                    {
                        var card = AllyCard.properties[cardKey];
                        if (card.cardSetKey === CardSet.CORE &&
                                ([ Sphere.SPIRIT, Sphere.TACTICS, Sphere.NEUTRAL ].vizziniContains(card.sphereKey)))
                        {
                            var playerCard = CardInstance.ally(cardKey);
                            cardInstances[playerCard.id] = playerCard;
                            playerCardIds.push(playerCard.id);
                        }
                    });
            playerCardIds.vizziniShuffle();
            var agent = Agent.create(id, name, threatLevel, heroIds, playerCardIds);

            var enemyCard = CardInstance.enemy(EnemyCard.FOREST_SPIDER);
            cardInstances[enemyCard.id] = enemyCard;
            agent.engagementAreaIds.push(enemyCard.id);

            // Deal 6 cards.
            for (var i = 0; i < 6; i++)
            {
                var cardId = playerCardIds.shift();
                agent.handIds.push(cardId);
            }

            return agent;
        },

        createPopulatedStore: function()
        {
            var store = TestData.mockStore();
            var state = store.getState();
            var cardInstances = state.cardInstances;

            var activeLocation = CardInstance.location(LocationCard.OLD_FOREST_ROAD);
            cardInstances[activeLocation.id] = activeLocation;
            state.activeLocationId = activeLocation.id;

            var questDeckIds = state.questDeckIds;
            var questDeck0 = CardInstance.quest(QuestCard.FLIES_AND_SPIDERS);
            cardInstances[questDeck0.id] = questDeck0;
            questDeckIds.push(questDeck0.id);
            var questDeck1 = CardInstance.quest(QuestCard.A_FORK_IN_THE_ROAD);
            cardInstances[questDeck1.id] = questDeck1;
            questDeckIds.push(questDeck1.id);
            var questDeck2 = CardInstance.quest(QuestCard.A_CHOSEN_PATH_BEORNS_PATH);
            cardInstances[questDeck2.id] = questDeck2;
            questDeckIds.push(questDeck2.id);
            state.activeQuestId = questDeckIds.shift();

            var encounterDeckIds = state.encounterDeckIds;
            var encounterDeck0 = CardInstance.enemy(EnemyCard.DOL_GULDUR_ORCS);
            cardInstances[encounterDeck0.id] = encounterDeck0;
            encounterDeckIds.push(encounterDeck0.id);
            var encounterDeck1 = CardInstance.location(LocationCard.OLD_FOREST_ROAD);
            cardInstances[encounterDeck1.id] = encounterDeck1;
            encounterDeckIds.push(encounterDeck1.id);
            var encounterDeck2 = CardInstance.enemy(EnemyCard.HUMMERHORNS);
            cardInstances[encounterDeck2.id] = encounterDeck2;
            encounterDeckIds.push(encounterDeck2.id);

            var stagingAreaIds = state.stagingAreaIds;
            var stagingArea0 = CardInstance.enemy(EnemyCard.FOREST_SPIDER);
            cardInstances[stagingArea0.id] = stagingArea0;
            stagingAreaIds.push(stagingArea0.id);
            var stagingArea1 = CardInstance.location(LocationCard.FOREST_GATE);
            cardInstances[stagingArea1.id] = stagingArea1;
            stagingAreaIds.push(stagingArea1.id);
            var stagingArea2 = CardInstance.enemy(EnemyCard.DOL_GULDUR_BEASTMASTER);
            cardInstances[stagingArea2.id] = stagingArea2;
            stagingAreaIds.push(stagingArea2.id);

            var agents = state.agents;
            var agentIds = state.agentIds;
            var agent0 = TestData.createAgent0(cardInstances);
            LOGGER.info("agent0 = " + agent0.id + " " + agent0.name);
            var agent1 = TestData.createAgent1(cardInstances);
            LOGGER.info("agent1 = " + agent1.id + " " + agent1.name);
            agents[agent0.id] = agent0;
            agents[agent1.id] = agent1;
            agentIds.push(agent0.id);
            agentIds.push(agent1.id);

            state.firstAgentId = agent0.id;

            return store;
        },

        mockStore: function()
        {
            var state = Store.InitialState();

            // var store =
            // {
            // getState: function()
            // {
            // return state;
            // },
            // }
            var store = Redux.createStore(Reducer.root);

            return store;
        },
    };

    return TestData;
});

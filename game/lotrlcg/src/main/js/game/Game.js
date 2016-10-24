define([ "game/Action", "game/Adjudicator", "game/Agent", "game/Engine", "game/PlayerDeckBuilder",
        "game/ScenarioDeckBuilder" ], function(Action, Adjudicator, Agent, Engine, PlayerDeckBuilder,
        ScenarioDeckBuilder)
{
    "use strict";
    function Game(store)
    {
        InputValidator.validateNotNull("store", store);

        // FIXME: use a new game dialog
        // Setup.
        // 1. Shuffle Decks
        var playerDeck0 = PlayerDeckBuilder.BeornsPath1DeckBuilder.buildDeck();
        var playerDeck1 = PlayerDeckBuilder.BeornsPath2DeckBuilder.buildDeck();
        var heroes0 = playerDeck0.heroInstances();
        var heroes1 = playerDeck1.heroInstances();
        var playerCards0 = playerDeck0.playerInstances();
        var playerCards1 = playerDeck1.playerInstances();

        store.dispatch(Action.addCardInstances(heroes0));
        store.dispatch(Action.addCardInstances(heroes1));
        store.dispatch(Action.addCardInstances(playerCards0));
        store.dispatch(Action.addCardInstances(playerCards1));

        var scenarioDeck = ScenarioDeckBuilder.CoreSetPassageThroughMirkwoodDeckBuilder.buildDeck();
        var questDeck = scenarioDeck.questInstances();
        var encounterDeck = scenarioDeck.encounterInstances();

        store.dispatch(Action.addCardInstances(questDeck));
        store.dispatch(Action.addCardInstances(encounterDeck));

        playerCards0.vizziniShuffle();
        playerCards1.vizziniShuffle();
        encounterDeck.vizziniShuffle();

        var questIds = questDeck.map(function(cardInstance)
        {
            return cardInstance.id;
        });
        store.dispatch(Action.setQuestDeckIds(questIds));
        var encounterIds = encounterDeck.map(function(cardInstance)
        {
            return cardInstance.id;
        });
        store.dispatch(Action.setEncounterDeckIds(encounterIds));

        // 2. Place Heroes and Set Initial Threat Levels
        var heroIds0 = mapIds(heroes0);
        var heroIds1 = mapIds(heroes1);
        var playerCardIds0 = mapIds(playerCards0);
        var playerCardIds1 = mapIds(playerCards1);
        var threatLevel0 = reduceThreat(heroes0);
        var threatLevel1 = reduceThreat(heroes1);
        var agents = [];
        agents.push(Agent.create(0, "Aaron", threatLevel0, heroIds0, playerCardIds0));
        agents.push(Agent.create(1, "Bruce", threatLevel1, heroIds1, playerCardIds1));
        store.dispatch(Action.setAgents(agents));

        // 3. Setup Token Bank
        // 4. Determine First Player
        store.dispatch(Action.setFirstPlayer(agents[0]));

        // 5. Draw Setup Hand
        agents.forEach(function(agent)
        {
            for (var i = 0; i < 6; i++)
            {
                store.dispatch(Action.drawPlayerCard(agent));
            }
        });

        // 6. Set Quest Cards
        store.dispatch(Action.drawQuestCard());

        // 7. Follow Scenario Setup Instructions

        var adjudicator = new Adjudicator();
        var engine = new Engine(store, adjudicator);

        this.adjudicator = function()
        {
            return adjudicator;
        };

        this.store = function()
        {
            return store;
        };

        this.engine = function()
        {
            return engine;
        };

        function mapIds(cardInstances)
        {
            return cardInstances.map(function(cardInstance)
            {
                return cardInstance.id;
            });
        }

        function reduceThreat(cardInstances)
        {
            return cardInstances.reduce(function(previous, cardInstance)
            {
                return previous + cardInstance.card.threatCost;
            }, 0);
        }
    }

    Game.prototype.start = function()
    {
        var engine = this.engine();

        setTimeout(function()
        {
            engine.performResourcePhase();
        }, 0);
    };

    return Game;
});

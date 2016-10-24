define([ "AllyCard", "HeroCard", "LocationCard", "Phase", "game/Action", "game/CardInstance", "game/Reducer",
        "game/Selector", "../../../test/js/game/TestData" ], function(AllyCard, HeroCard, LocationCard, Phase, Action,
        CardInstance, Reducer, Selector, TestData)
{
    "use strict";
    QUnit.module("Reducer");

    QUnit.test("addCardInstances()", function(assert)
    {
        // Setup.
        var store = TestData.mockStore();
        var cardInstance = CardInstance.hero(HeroCard.ARAGORN_CORE);
        var cardInstances = [];
        cardInstances.push(cardInstance);
        var state0 = store.getState();
        assert.equal(Object.getOwnPropertyNames(state0.cardInstances).length, 0);

        // Run.
        store.dispatch(Action.addCardInstances(cardInstances));
        var result = store.getState();

        // Verify.
        assert.ok(result);
        assert.ok(result !== state0);
        assert.equal(Object.getOwnPropertyNames(result.cardInstances).length, 1);
    });

    QUnit.test("addProgress()", function(assert)
    {
        // Setup.
        var store = TestData.mockStore();
        var cardInstance = CardInstance.location(LocationCard.OLD_FOREST_ROAD);
        store.dispatch(Action.addCardInstances([ cardInstance ]));
        var state0 = store.getState();
        assert.equal(Object.getOwnPropertyNames(state0.cardInstances).length, 1);
        assert.equal(cardInstance.progressCount, 0);

        // Run.
        store.dispatch(Action.addProgress(cardInstance));
        var result = store.getState();

        // Verify.
        assert.ok(result);
        assert.ok(result !== state0);
        assert.equal(result.cardInstances[cardInstance.id].progressCount, 1);
    });

    QUnit.test("addProgress() 3", function(assert)
    {
        // Setup.
        var store = TestData.mockStore();
        var cardInstance = CardInstance.location(LocationCard.OLD_FOREST_ROAD);
        store.dispatch(Action.addCardInstances([ cardInstance ]));
        var state0 = store.getState();
        assert.equal(Object.getOwnPropertyNames(state0.cardInstances).length, 1);
        assert.equal(cardInstance.progressCount, 0);

        // Run.
        store.dispatch(Action.addProgress(cardInstance, 3));
        var result = store.getState();

        // Verify.
        assert.ok(result);
        assert.ok(result !== state0);
        assert.equal(result.cardInstances[cardInstance.id].progressCount, 3);
    });

    QUnit.test("addProgress() -3", function(assert)
    {
        // Setup.
        var store = TestData.mockStore();
        var cardInstance = CardInstance.location(LocationCard.OLD_FOREST_ROAD);
        store.dispatch(Action.addCardInstances([ cardInstance ]));
        var state0 = store.getState();
        assert.equal(Object.getOwnPropertyNames(state0.cardInstances).length, 1);
        store.dispatch(Action.addProgress(cardInstance));
        assert.equal(store.getState().cardInstances[cardInstance.id].progressCount, 1);

        // Run.
        store.dispatch(Action.addProgress(cardInstance, -3));
        var result = store.getState();

        // Verify.
        assert.ok(result);
        assert.ok(result !== state0);
        assert.equal(result.cardInstances[cardInstance.id].progressCount, 0);
    });

    QUnit.test("addResources()", function(assert)
    {
        // Setup.
        var store = TestData.mockStore();
        var cardInstance = CardInstance.hero(HeroCard.ARAGORN_CORE);
        store.dispatch(Action.addCardInstances([ cardInstance ]));
        var state0 = store.getState();
        assert.equal(Object.getOwnPropertyNames(state0.cardInstances).length, 1);
        assert.equal(cardInstance.resourceCount, 0);

        // Run.
        store.dispatch(Action.addResources(cardInstance));
        var result = store.getState();

        // Verify.
        assert.ok(result);
        assert.ok(result !== state0);
        assert.equal(result.cardInstances[cardInstance.id].resourceCount, 1);
    });

    QUnit.test("addResources() 3", function(assert)
    {
        // Setup.
        var store = TestData.mockStore();
        var cardInstance = CardInstance.hero(HeroCard.ARAGORN_CORE);
        store.dispatch(Action.addCardInstances([ cardInstance ]));
        var state0 = store.getState();
        assert.equal(Object.getOwnPropertyNames(state0.cardInstances).length, 1);
        assert.equal(cardInstance.resourceCount, 0);

        // Run.
        store.dispatch(Action.addResources(cardInstance, 3));
        var result = store.getState();

        // Verify.
        assert.ok(result);
        assert.ok(result !== state0);
        assert.equal(result.cardInstances[cardInstance.id].resourceCount, 3);
    });

    QUnit.test("addResources() -3", function(assert)
    {
        // Setup.
        var store = TestData.mockStore();
        var cardInstance = CardInstance.hero(HeroCard.ARAGORN_CORE);
        store.dispatch(Action.addCardInstances([ cardInstance ]));
        var state0 = store.getState();
        assert.equal(Object.getOwnPropertyNames(state0.cardInstances).length, 1);
        store.dispatch(Action.addResources(cardInstance));
        assert.equal(store.getState().cardInstances[cardInstance.id].resourceCount, 1);

        // Run.
        store.dispatch(Action.addResources(cardInstance, -3));
        var result = store.getState();

        // Verify.
        assert.ok(result);
        assert.ok(result !== state0);
        assert.equal(result.cardInstances[cardInstance.id].resourceCount, 0);
    });

    QUnit.test("addThreatLevel()", function(assert)
    {
        // Setup.
        var store = TestData.createPopulatedStore();
        var state0 = store.getState();
        var agent = state0.agents[state0.agentIds[0]];
        assert.ok(agent);
        assert.equal(agent.threatLevel, 28);

        // Run.
        store.dispatch(Action.addThreatLevel(agent));
        var result = store.getState().agents[agent.id];

        // Verify.
        assert.ok(result);
        assert.equal(result.threatLevel, 29);
    });

    QUnit.test("addToPlayArea()", function(assert)
    {
        // Setup.
        var store = TestData.createPopulatedStore();
        var state0 = store.getState();
        var agent = state0.agents[state0.agentIds[0]];
        assert.ok(agent);
        var cardInstance = CardInstance.ally(AllyCard.FARAMIR);
        assert.equal(agent.playAreaIds.length, 3);

        // Run.
        store.dispatch(Action.addToPlayArea(agent, cardInstance));
        var result = store.getState().agents[agent.id];

        // Verify.
        assert.ok(result);
        assert.equal(result.playAreaIds.length, 4);
    });

    QUnit.test("addWounds()", function(assert)
    {
        // Setup.
        var store = TestData.mockStore();
        var cardInstance = CardInstance.hero(HeroCard.ARAGORN_CORE);
        store.dispatch(Action.addCardInstances([ cardInstance ]));
        var state0 = store.getState();
        assert.equal(Object.getOwnPropertyNames(state0.cardInstances).length, 1);
        assert.equal(cardInstance.woundCount, 0);

        // Run.
        store.dispatch(Action.addWounds(cardInstance));
        var result = store.getState();

        // Verify.
        assert.ok(result);
        assert.ok(result !== state0);
        assert.equal(result.cardInstances[cardInstance.id].woundCount, 1);
    });

    QUnit.test("addWounds() 3", function(assert)
    {
        // Setup.
        var store = TestData.mockStore();
        var cardInstance = CardInstance.hero(HeroCard.ARAGORN_CORE);
        store.dispatch(Action.addCardInstances([ cardInstance ]));
        var state0 = store.getState();
        assert.equal(Object.getOwnPropertyNames(state0.cardInstances).length, 1);
        assert.equal(cardInstance.woundCount, 0);

        // Run.
        store.dispatch(Action.addWounds(cardInstance, 3));
        var result = store.getState();

        // Verify.
        assert.ok(result);
        assert.ok(result !== state0);
        assert.equal(result.cardInstances[cardInstance.id].woundCount, 3);
    });

    QUnit.test("addWounds() -3", function(assert)
    {
        // Setup.
        var store = TestData.mockStore();
        var cardInstance = CardInstance.hero(HeroCard.ARAGORN_CORE);
        store.dispatch(Action.addCardInstances([ cardInstance ]));
        var state0 = store.getState();
        assert.equal(Object.getOwnPropertyNames(state0.cardInstances).length, 1);
        store.dispatch(Action.addWounds(cardInstance));
        assert.equal(store.getState().cardInstances[cardInstance.id].woundCount, 1);

        // Run.
        store.dispatch(Action.addWounds(cardInstance, -3));
        var result = store.getState();

        // Verify.
        assert.ok(result);
        assert.ok(result !== state0);
        assert.equal(result.cardInstances[cardInstance.id].woundCount, 0);
    });

    QUnit.test("discardEngagedCard()", function(assert)
    {
        // Setup.
        var store = TestData.createPopulatedStore();
        var state0 = store.getState();
        var agent = state0.agents[state0.agentIds[0]];
        assert.ok(agent);
        var cardInstance = state0.cardInstances[agent.engagementAreaIds[0]];
        assert.ok(cardInstance);
        assert.equal(agent.engagementAreaIds.length, 1);
        assert.equal(state0.encounterDiscardIds.length, 0);

        // Run.
        store.dispatch(Action.discardEngagedCard(agent, cardInstance));
        var result = store.getState().agents[agent.id];

        // Verify.
        assert.ok(result);
        assert.equal(result.engagementAreaIds.length, 0);
        assert.equal(store.getState().encounterDiscardIds.length, 1);
    });

    QUnit.test("discardPlayerCard()", function(assert)
    {
        // Setup.
        var store = TestData.createPopulatedStore();
        var state0 = store.getState();
        var agent = state0.agents[state0.agentIds[0]];
        assert.ok(agent);
        var cardInstance = state0.cardInstances[agent.playAreaIds[0]];
        assert.equal(agent.playAreaIds.length, 3);
        assert.equal(agent.playerDiscardIds.length, 0);

        // Run.
        store.dispatch(Action.discardPlayerCard(agent, cardInstance));
        var result = store.getState().agents[agent.id];

        // Verify.
        assert.ok(result);
        assert.equal(result.playAreaIds.length, 2);
        assert.equal(result.playerDiscardIds.length, 1);
    });

    QUnit.test("drawEncounterCard()", function(assert)
    {
        // Setup.
        var store = TestData.createPopulatedStore();
        var state0 = store.getState();
        assert.equal(state0.encounterDeckIds.length, 3);
        assert.equal(state0.stagingAreaIds.length, 3);

        // Run.
        store.dispatch(Action.drawEncounterCard());
        var result = store.getState();

        // Verify.
        assert.ok(result);
        assert.equal(result.encounterDeckIds.length, 2);
        assert.equal(result.stagingAreaIds.length, 4);
    });

    QUnit.test("drawPlayerCard()", function(assert)
    {
        // Setup.
        var store = TestData.createPopulatedStore();
        var state0 = store.getState();
        var agent = state0.agents[state0.agentIds[0]];
        assert.ok(agent);
        assert.equal(agent.playerCardIds.length, 13);
        assert.equal(agent.handIds.length, 6);

        // Run.
        store.dispatch(Action.drawPlayerCard(agent));
        var result = store.getState().agents[agent.id];

        // Verify.
        assert.ok(result);
        assert.equal(result.playerCardIds.length, 12);
        assert.equal(result.handIds.length, 7);
    });

    QUnit.test("drawQuestCard()", function(assert)
    {
        // Setup.
        CardInstance.resetNextId();
        var store = TestData.createPopulatedStore();
        var state0 = store.getState();
        assert.equal(state0.questDeckIds.length, 2);
        assert.equal(state0.questDiscardIds.length, 0);
        assert.equal(state0.activeQuestId, 2);

        // Run.
        store.dispatch(Action.drawQuestCard());
        var result = store.getState();

        // Verify.
        assert.ok(result);
        assert.equal(result.questDeckIds.length, 1);
        assert.equal(result.questDiscardIds.length, 1);
        assert.equal(result.activeQuestId, 3);
    });

    QUnit.test("eliminatePlayer()", function(assert)
    {
        // Setup.
        var store = TestData.createPopulatedStore();
        var state0 = store.getState();
        var agent = state0.agents[state0.agentIds[0]];
        assert.ok(agent);
        assert.equal(state0.agentIds.length, 2);
        assert.equal(state0.firstAgentId, state0.agentIds[0]);

        // Run.
        store.dispatch(Action.eliminatePlayer(agent));
        var result = store.getState();

        // Verify.
        assert.ok(result);
        assert.equal(result.agentIds.length, 1);
        assert.equal(result.firstAgentId, result.agentIds[0]);
    });

    QUnit.test("engageEnemy()", function(assert)
    {
        // Setup.
        CardInstance.resetNextId();
        var store = TestData.createPopulatedStore();
        var state0 = store.getState();
        var agent = state0.agents[state0.agentIds[0]];
        assert.ok(agent);
        var enemyInstance = Selector.enemies(state0, state0.stagingAreaIds)[0];
        assert.equal(state0.stagingAreaIds.length, 3);
        assert.equal(agent.engagementAreaIds.length, 1);

        // Run.
        store.dispatch(Action.engageEnemy(agent, enemyInstance));
        var result = store.getState();

        // Verify.
        assert.ok(result);
        assert.equal(result.stagingAreaIds.length, 2);
        assert.equal(agent.id, 0);
        var agent2 = result.agents[agent.id];
        assert.ok(agent2);
        assert.equal(agent2.engagementAreaIds.length, 2);
    });

    QUnit.test("incrementFirstPlayer()", function(assert)
    {
        // Setup.
        var store = TestData.createPopulatedStore();
        var state0 = store.getState();
        var agent = state0.agents[state0.agentIds[0]];
        assert.ok(agent);
        assert.equal(state0.firstAgentId, state0.agentIds[0]);
        assert.equal(state0.agents[state0.firstAgentId].name, "Aaron");

        // Run.
        store.dispatch(Action.incrementFirstPlayer());
        var result = store.getState();

        // Verify.
        assert.ok(result);
        assert.equal(result.firstAgentId, result.agentIds[1]);
        assert.equal(result.agents[result.firstAgentId].name, "Bruce");

        // Run.
        store.dispatch(Action.incrementFirstPlayer());
        var result = store.getState();

        // Verify.
        assert.ok(result);
        assert.equal(result.firstAgentId, result.agentIds[0]);
        assert.equal(result.agents[result.firstAgentId].name, "Aaron");
    });

    QUnit.test("incrementRound()", function(assert)
    {
        // Setup.
        var store = TestData.mockStore();
        var state0 = store.getState();
        assert.equal(state0.round, 0);

        // Run.
        store.dispatch(Action.incrementRound());
        var result = store.getState();

        // Verify.
        assert.ok(result);
        assert.ok(result !== state0);
        assert.equal(result.round, 1);
    });

    QUnit.test("removeFromHand()", function(assert)
    {
        // Setup.
        var store = TestData.createPopulatedStore();
        var state0 = store.getState();
        var agent = state0.agents[state0.agentIds[0]];
        assert.ok(agent);
        assert.equal(agent.handIds.length, 6);
        var cardInstance = state0.cardInstances[agent.handIds[0]];

        // Run.
        store.dispatch(Action.removeFromHand(agent, cardInstance));
        var result = store.getState().agents[agent.id];

        // Verify.
        assert.ok(result);
        assert.equal(result.handIds.length, 5);
    });

    QUnit.test("setActiveLocation()", function(assert)
    {
        // Setup.
        CardInstance.resetNextId();
        var store = TestData.createPopulatedStore();
        var state0 = store.getState();
        var agent = state0.agents[state0.agentIds[0]];
        assert.ok(agent);
        assert.equal(state0.stagingAreaIds.length, 3);
        assert.equal(state0.activeLocationId, 1);
        var cardInstance = Selector.locations(state0, state0.stagingAreaIds)[0];
        var activeLocation = state0.cardInstances[state0.activeLocationId];

        // Run.
        store.dispatch(Action.setActiveLocation(cardInstance));
        var result = store.getState();

        // Verify.
        assert.ok(result);
        var activeLocation = result.cardInstances[result.activeLocationId];
        assert.equal(result.stagingAreaIds.length, 2);
        assert.equal(result.activeLocationId, 9);
    });

    QUnit.test("setExhausted()", function(assert)
    {
        // Setup.
        var store = TestData.mockStore();
        var cardInstance = CardInstance.hero(HeroCard.ARAGORN_CORE);
        store.dispatch(Action.addCardInstances([ cardInstance ]));
        var state0 = store.getState();
        assert.equal(cardInstance.isExhausted, false);

        // Run.
        store.dispatch(Action.setExhausted(cardInstance, true));
        var result = store.getState().cardInstances[cardInstance.id];

        // Verify.
        assert.ok(result);
        assert.equal(result.isExhausted, true);
    });

    QUnit.test("setPhase()", function(assert)
    {
        // Setup.
        var store = TestData.mockStore();
        var state0 = store.getState();
        assert.equal(state0.phaseKey, Phase.SETUP);

        // Run.
        store.dispatch(Action.setPhase(Phase.ENCOUNTER_PLAYER_ENGAGEMENT));
        var result = store.getState();

        // Verify.
        assert.ok(result);
        assert.ok(result !== state0);
        assert.equal(result.phaseKey, Phase.ENCOUNTER_PLAYER_ENGAGEMENT);
    });

    QUnit.test("setQuesting()", function(assert)
    {
        // Setup.
        var store = TestData.mockStore();
        var cardInstance = CardInstance.hero(HeroCard.ARAGORN_CORE);
        store.dispatch(Action.addCardInstances([ cardInstance ]));
        var state0 = store.getState();
        assert.equal(cardInstance.isQuesting, false);

        // Run.
        store.dispatch(Action.setQuesting(cardInstance, true));
        var result = store.getState().cardInstances[cardInstance.id];

        // Verify.
        assert.ok(result);
        assert.equal(result.isQuesting, true);
    });
});

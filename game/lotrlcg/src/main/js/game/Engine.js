define([ "Phase", "game/Action", "game/CombatAttackTask", "game/CombatDefendTask", "game/PlanningTask",
        "game/QuestTask", "game/RefreshTask", "game/ResourceTask", "game/Selector" ], function(Phase, Action,
        CombatAttackTask, CombatDefendTask, PlanningTask, QuestTask, RefreshTask, ResourceTask, Selector)
{
    "use strict";
    function Engine(store, adjudicator)
    {
        InputValidator.validateNotNull("store", store);
        InputValidator.validateNotNull("adjudicator", adjudicator);

        this.adjudicator = function()
        {
            return adjudicator;
        };

        var that = this;

        var planningQueue = [];
        var questQueue = [];
        var questers = [];
        var encounterQueue = [];
        var combatQueue = [];

        this.performResourcePhase = function()
        {
            if (!isGameOver())
            {
                LOGGER.trace("Engine.performResourcePhase() start");

                store.dispatch(Action.setPhase(Phase.RESOURCE_START));
                var task = new ResourceTask(store);
                task.doIt();
                store.dispatch(Action.setPhase(Phase.RESOURCE_END));

                LOGGER.trace("Engine.performResourcePhase() end");

                this.performPlanningPhase();
            }
        };

        this.performPlanningPhase = function()
        {
            if (!isGameOver())
            {
                LOGGER.trace("Engine.performPlanningPhase() start");
                store.dispatch(Action.setPhase(Phase.PLANNING_START));
                planningQueue = agents();
                this.processPlanningQueue();
            }
        };

        this.performQuestPhase = function()
        {
            if (!isGameOver())
            {
                LOGGER.trace("Engine.performQuestPhase() start");
                store.dispatch(Action.setPhase(Phase.QUEST_START));
                questers = [];
                questQueue = agents();
                this.processQuestQueue();
            }
        };

        this.performTravelPhase = function()
        {
            if (!isGameOver())
            {
                LOGGER.trace("Engine.performTravelPhase() start");
                store.dispatch(Action.setPhase(Phase.TRAVEL_START));

                var state = store.getState();

                if (state.activeLocationId === undefined)
                {
                    // var firstPlayer = environment.firstPlayer();
                    // environment.activeAgent(firstPlayer);
                    // firstPlayer.travelAction(environment, adjudicator, this.setLocation.bind(this));
                    var firstPlayer = state.agents[state.firstAgentId];
                    store.dispatch(Action.setActiveAgent(firstPlayer));
                    firstPlayer.behavior.travelAction(store, adjudicator, this.setLocation.bind(this));
                }
                else
                {
                    // environment.phase(Phase.TRAVEL_END);
                    store.dispatch(Action.setPhase(Phase.TRAVEL_END));
                    this.performEncounterPhase();
                }

                LOGGER.trace("Engine.performTravelPhase() end");
            }
        };

        this.performEncounterPhase = function()
        {
            if (!isGameOver())
            {
                LOGGER.trace("Engine.performEncounterPhase() start");
                store.dispatch(Action.setPhase(Phase.ENCOUNTER_START));
                encounterQueue = agents();
                this.processEncounterQueue();
            }
        };

        this.performCombatPhase = function()
        {
            if (!isGameOver())
            {
                LOGGER.trace("Engine.performCombatPhase() start");
                this.performCombatDefendPhase();
            }
        };

        this.performCombatDefendPhase = function()
        {
            if (!isGameOver())
            {
                LOGGER.trace("Engine.performCombatDefendPhase() start");
                // environment.phase(Phase.COMBAT_DEFEND_START);
                store.dispatch(Action.setPhase(Phase.COMBAT_DEFEND_START));
                // combatQueue = environment.agents().slice();
                combatQueue = agents();
                LOGGER.info("combatQueue.length = " + combatQueue.length);
                this.processCombatDefendQueue();
            }
        };

        this.performCombatAttackPhase = function()
        {
            if (!isGameOver())
            {
                LOGGER.trace("Engine.performCombatAttackPhase() start");
                // environment.phase(Phase.COMBAT_ATTACK_START);
                store.dispatch(Action.setPhase(Phase.COMBAT_ATTACK_START));
                // combatQueue = environment.agents().slice();
                combatQueue = agents();
                this.processCombatAttackQueue();
            }
        };

        this.performRefreshPhase = function()
        {
            if (!isGameOver())
            {
                LOGGER.trace("Engine.performRefreshPhase() start");

                store.dispatch(Action.setPhase(Phase.REFRESH_START));
                var task = new RefreshTask(store);
                task.doIt();
                // environment.phase(Phase.REFRESH_END);
                store.dispatch(Action.setPhase(Phase.REFRESH_END));

                LOGGER.trace("Engine.performRefreshPhase() end");
                this.performResourcePhase();
            }
        };

        this.processPlanningQueue = function()
        {
            LOGGER.trace("Engine.processPlanningQueue() start");

            if (planningQueue.length === 0)
            {
                store.dispatch(Action.setActiveAgent(null));
                store.dispatch(Action.setPhase(Phase.PLANNING_END));
                LOGGER.trace("Engine.processPlanningQueue() done");
                this.performQuestPhase();
            }
            else
            {
                // Players may play ally and attachment cards.
                var agent = planningQueue.shift();
                store.dispatch(Action.setActiveAgent(agent));
                agent.behavior.planningAction(store, agent, adjudicator, this.playCards.bind(this));
            }
        };

        this.processQuestQueue = function()
        {
            LOGGER.trace("Engine.processQuestQueue() start");

            if (questQueue.length === 0)
            {
                LOGGER.debug("questers.length = " + questers.length);
                // var questAction = new QuestAction(environment, adjudicator, questers);
                // questAction.doIt();
                var task = new QuestTask(store, adjudicator, questers);
                task.doIt();

                store.dispatch(Action.setActiveAgent(null));
                store.dispatch(Action.setPhase(Phase.QUEST_END));
                LOGGER.trace("Engine.processQuestQueue() done");
                this.performTravelPhase();
            }
            else
            {
                // Players commit characters to quest.
                store.dispatch(Action.setPhase(Phase.QUEST_COMMIT_CHARACTERS));
                var agent = questQueue.shift();
                store.dispatch(Action.setActiveAgent(agent));
                agent.behavior.questAction(store, agent, adjudicator, this.setQuesters.bind(this));
            }
        };

        this.processEncounterQueue = function()
        {
            if (encounterQueue.length === 0)
            {
                store.dispatch(Action.setActiveAgent(null));
                store.dispatch(Action.setPhase(Phase.ENCOUNTER_END));
                LOGGER.trace("Engine.processEncounterQueue() done");
                this.performCombatDefendPhase();
            }
            else
            {
                // Enemies engage players.
                store.dispatch(Action.setPhase(Phase.ENCOUNTER_ENGAGEMENT_CHECKS));
                var agent = encounterQueue.shift();
                store.dispatch(Action.setActiveAgent(agent));
                agent.behavior.encounterAction(store, agent, adjudicator, this.enemyEngages.bind(this));
            }
        };

        this.processCombatDefendQueue = function()
        {
            LOGGER.trace("Engine.processCombatDefendQueue() start");

            if (combatQueue.length === 0)
            {
                store.dispatch(Action.setActiveAgent(null));
                store.dispatch(Action.setPhase(Phase.COMBAT_DEFEND_END));
                LOGGER.trace("Engine.processCombatDefendQueue() done");
                this.performCombatAttackPhase();
            }
            else
            {
                var agent = combatQueue.shift();
                store.dispatch(Action.setActiveAgent(agent));
                agent.behavior.combatDefendAction(store, agent, adjudicator, this.setDefenders.bind(this));
            }
        };

        this.processCombatAttackQueue = function()
        {
            LOGGER.trace("Engine.processCombatAttackQueue() start");

            if (combatQueue.length === 0)
            {
                // environment.activeAgent(null);
                store.dispatch(Action.setActiveAgent(null));
                store.dispatch(Action.setPhase(Phase.COMBAT_ATTACK_END));
                store.dispatch(Action.setPhase(Phase.COMBAT_END));
                LOGGER.trace("Engine.processCombatAttackQueue() done");
                // environment.phase(Phase.COMBAT_ATTACK_END);
                // environment.phase(Phase.COMBAT_END);
                this.performRefreshPhase();
            }
            else
            {
                var agent = combatQueue.shift();
                store.dispatch(Action.setActiveAgent(agent));
                agent.behavior.combatAttackAction(store, agent, adjudicator, this.setAttackers.bind(this));
            }
        };

        this.enemyEngages = function(newEnemy)
        {
            LOGGER.trace("Engine.enemyEngages() start");

            if (newEnemy)
            {
                // environment.stagingArea().vizziniRemove(newEnemy);
                // var agent = environment.activeAgent();
                var state = store.getState();
                var agent = state.agents[state.activeAgentId];
                // environment.agentData(agent).engagementArea().push(newEnemy);
                store.dispatch(Action.engageEnemy(agent, newEnemy));
            }

            this.processEncounterQueue();
        };

        this.playCards = function(cards)
        {
            InputValidator.validateNotNull("cards", cards);

            LOGGER.trace("Engine.playCards() start");
            LOGGER.debug("cards = " + cards);

            if (cards.length > 0)
            {
                var state = store.getState();
                var agent = state.agents[state.activeAgentId];
                var task = new PlanningTask(store, adjudicator, agent, cards, this.processPlanningQueue.bind(this));
                task.doIt();
            }
            else
            {
                this.processPlanningQueue();
            }
        };

        this.setAttackers = function(enemyIdToAttackers)
        {
            InputValidator.validateNotNull("enemyIdToAttackers", enemyIdToAttackers);

            LOGGER.trace("Engine.setAttackers() start");

            // var agent = environment.activeAgent();
            var state = store.getState();
            var agent = state.agents[state.activeAgentId];
            var task = new CombatAttackTask(store, adjudicator, agent, enemyIdToAttackers,
                    this.processCombatAttackQueue.bind(this));
            task.doIt();
        };

        this.setDefenders = function(enemyIdToDefender)
        {
            InputValidator.validateNotNull("enemyIdToDefender", enemyIdToDefender);

            LOGGER.trace("Engine.setDefenders() start");

            // var agent = environment.activeAgent();
            var state = store.getState();
            var agent = state.agents[state.activeAgentId];
            var task = new CombatDefendTask(store, adjudicator, agent, enemyIdToDefender, this.processCombatDefendQueue
                    .bind(this));
            task.doIt();
        };

        this.setLocation = function(newLocation)
        {
            LOGGER.trace("Engine.setLocation() start");

            if (newLocation)
            {
                // environment.activeLocation(newLocation);
                store.dispatch(Action.setActiveLocation(newLocation));
            }

            // environment.phase(Phase.TRAVEL_END);
            store.dispatch(Action.setPhase(Phase.TRAVEL_END));
            LOGGER.trace("Engine.setLocation() end");

            this.performEncounterPhase();
        };

        this.setQuesters = function(newQuesters)
        {
            LOGGER.trace("Engine.setQuesters() start");
            newQuesters.forEach(function(cardInstance)
            {
                cardInstance.isQuesting = true;
                cardInstance.isExhausted = true;
            });

            questers.vizziniAddAll(newQuesters);
            this.processQuestQueue();
        };

        function agents()
        {
            var state = store.getState();

            // FIXME: reorder using firstAgentId

            return Selector.resolveAgentIds(state, state.agentIds);
        }

        function isGameOver()
        {
            var answer = adjudicator.isGameOver(store);

            if (answer)
            {
                LOGGER.debug("adjudicator.isGameOver() ? " + adjudicator.isGameOver(store));
                processGameOver();
            }

            return answer;
        }

        function processGameOver()
        {
            var winner = adjudicator.determineWinner(store);
            LOGGER.debug("winner = " + winner);

            // that.trigger(Engine.WINNER_EVENT, winner);
            // store.dispatch(Action.setWinner(winner));

            return winner;
        }
    }

    return Engine;
});

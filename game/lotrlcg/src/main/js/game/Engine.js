define([ "Phase", "game/Environment", "game/QuestAction", "game/RefreshAction", "game/ResourceAction" ], function(
        Phase, Environment, QuestAction, RefreshAction, ResourceAction)
{
    "use strict";
    function Engine(environment, adjudicator)
    {
        InputValidator.validateNotNull("environment", environment);
        InputValidator.validateNotNull("adjudicator", adjudicator);

        this.environment = function()
        {
            return environment;
        };

        this.adjudicator = function()
        {
            return adjudicator;
        };

        var that = this;

        environment.bind(Environment.PHASE_EVENT, function(phase)
        {
            if (adjudicator.isGameOver(environment))
            {
                LOGGER.debug("adjudicator.isGameOver() ? " + adjudicator.isGameOver(environment));
                processGameOver();
            }
            else
            {
                var delay = 1000;

                switch (phase)
                {
                case Phase.RESOURCE_START:
                    that.performResourcePhase();
                    break;
                case Phase.RESOURCE_END:
                    setTimeout(function()
                    {
                        environment.phase(Phase.PLANNING_START);
                    }, delay);
                    break;
                case Phase.PLANNING_START:
                    that.performPlanningPhase();
                    break;
                case Phase.PLANNING_END:
                    setTimeout(function()
                    {
                        environment.phase(Phase.QUEST_START);
                    }, delay);
                    break;
                case Phase.QUEST_START:
                    that.performQuestPhase();
                    break;
                case Phase.QUEST_END:
                    setTimeout(function()
                    {
                        environment.phase(Phase.TRAVEL_START);
                    }, delay);
                    break;
                case Phase.TRAVEL_START:
                    that.performTravelPhase();
                    break;
                case Phase.TRAVEL_END:
                    setTimeout(function()
                    {
                        environment.phase(Phase.ENCOUNTER_START);
                    }, delay);
                    break;
                case Phase.ENCOUNTER_START:
                    that.performEncounterPhase();
                    break;
                case Phase.ENCOUNTER_END:
                    setTimeout(function()
                    {
                        environment.phase(Phase.COMBAT_START);
                    }, delay);
                    break;
                case Phase.COMBAT_START:
                    that.performCombatPhase();
                    break;
                case Phase.COMBAT_END:
                    setTimeout(function()
                    {
                        environment.phase(Phase.REFRESH_START);
                    }, delay);
                    break;
                case Phase.REFRESH_START:
                    that.performRefreshPhase();
                    break;
                case Phase.REFRESH_END:
                    setTimeout(function()
                    {
                        environment.phase(Phase.RESOURCE_START);
                    }, delay);
                    break;
                }
            }
        });

        var planningQueue = [];
        var questQueue = [];
        var questers = [];
        var encounterQueue = [];
        var combatQueue = [];

        this.performResourcePhase = function()
        {
            LOGGER.trace("Engine.performResourcePhase() start");

            var resourceAction = new ResourceAction(environment);
            resourceAction.doIt();
            environment.phase(Phase.RESOURCE_END);

            LOGGER.trace("Engine.performResourcePhase() end");
        };

        this.performPlanningPhase = function()
        {
            LOGGER.trace("Engine.performPlanningPhase() start");
            planningQueue = environment.agents().slice();
            this.processPlanningQueue();
        };

        this.performQuestPhase = function()
        {
            LOGGER.trace("Engine.performQuestPhase() start");
            questers = [];
            questQueue = environment.agents().slice();
            this.processQuestQueue();
        };

        this.performTravelPhase = function()
        {
            LOGGER.trace("Engine.performTravelPhase() start");

            if (!environment.activeLocation())
            {
                var firstPlayer = environment.firstPlayer();
                environment.activeAgent(firstPlayer);
                firstPlayer.travelAction(environment, adjudicator, this.setLocation.bind(this));
            }
            else
            {
                environment.phase(Phase.TRAVEL_END);
            }

            LOGGER.trace("Engine.performTravelPhase() end");
        };

        this.performEncounterPhase = function()
        {
            LOGGER.trace("Engine.performEncounterPhase() start");
            encounterQueue = environment.agents().slice();
            this.processEncounterQueue();
        };

        this.performCombatPhase = function()
        {
            LOGGER.trace("Engine.performCombatPhase() start");
            combatQueue = environment.agents().slice();
            this.processCombatQueue();
        };

        this.performRefreshPhase = function()
        {
            LOGGER.trace("Engine.performRefreshPhase() start");

            var refreshAction = new RefreshAction(environment);
            refreshAction.doIt();
            environment.phase(Phase.REFRESH_END);

            LOGGER.trace("Engine.performRefreshPhase() end");
        };

        this.processPlanningQueue = function()
        {
            environment.phase(Phase.PLANNING_END);
        };

        this.processQuestQueue = function()
        {
            LOGGER.trace("Engine.processQuestQueue() start");

            if (questQueue.length === 0)
            {
                LOGGER.debug("questers.length = " + questers.length);
                var questAction = new QuestAction(environment, adjudicator, questers, this.performTravelPhase
                        .bind(this));
                questAction.doIt();

                environment.activeAgent(null);
                LOGGER.trace("Engine.processQuestQueue() done");
                environment.phase(Phase.QUEST_END);
                return;
            }

            // Players commit characters to quest.
            var agent = questQueue.shift();
            environment.activeAgent(agent);
            agent.questAction(environment, adjudicator, this.setQuesters.bind(this));
        };

        this.processEncounterQueue = function()
        {
            if (encounterQueue.length === 0)
            {
                environment.activeAgent(null);
                LOGGER.trace("Engine.processEncounterQueue() done");
                environment.phase(Phase.ENCOUNTER_END);
                return;
            }

            // Enemies engage players.
            var agent = encounterQueue.shift();
            environment.activeAgent(agent);
            agent.encounterAction(environment, adjudicator, this.enemyEngages.bind(this));
        };

        this.processCombatQueue = function()
        {
            environment.phase(Phase.COMBAT_END);
        };

        this.enemyEngages = function(newEnemy)
        {
            LOGGER.trace("Engine.enemyEngages() start");

            if (newEnemy)
            {
                environment.stagingArea().vizziniRemove(newEnemy);
                var agent = environment.activeAgent();
                environment.agentData(agent).engagementArea().push(newEnemy);
            }

            this.processEncounterQueue();
        };

        this.setLocation = function(newLocation)
        {
            LOGGER.trace("Engine.setLocation() start");

            if (newLocation)
            {
                environment.activeLocation(newLocation);
            }

            environment.phase(Phase.TRAVEL_END);
        };

        this.setQuesters = function(newQuesters)
        {
            LOGGER.trace("Engine.setQuesters() start");
            newQuesters.forEach(function(token)
            {
                token.questerState().isQuesting(true);
                token.exhaustState().isExhausted(true);
            });

            questers.vizziniAddAll(newQuesters);
            this.processQuestQueue();
        };

        function processGameOver()
        {
            var winner = adjudicator.determineWinner(environment);

            that.trigger(Engine.WINNER_EVENT, winner);

            return winner;
        }
    }

    Engine.WINNER_EVENT = "winner";

    MicroEvent.mixin(Engine);

    return Engine;
});

define([ "Phase" ], function(Phase)
{
    "use strict";
    function QuestAction(environment, adjudicator, questers)
    {
        InputValidator.validateNotNull("environment", environment);
        InputValidator.validateNotNull("adjudicator", adjudicator);
        InputValidator.validateNotNull("questers", questers);

        this.environment = function()
        {
            return environment;
        };

        this.adjudicator = function()
        {
            return adjudicator;
        };

        this.questers = function()
        {
            return questers;
        };
    }

    QuestAction.prototype.doIt = function()
    {
        LOGGER.trace("QuestAction.doIt() start");

        this.revealOneCardPerPlayer();
        this.resolveQuest();

        LOGGER.trace("QuestAction.doIt() end");
    };

    QuestAction.prototype.revealOneCardPerPlayer = function()
    {
        // Reveal 1 card per player from the encounter deck.
        var environment = this.environment();
        environment.phase(Phase.QUEST_REVEAL_ENCOUNTER_CARDS);
        var stagingArea = environment.stagingArea();
        var scenarioDeck = environment.scenarioDeck();
        var agents = environment.agents();

        agents.forEach(function(agent)
        {
            var token = scenarioDeck.draw();
            stagingArea.push(token);
        });

        LOGGER.trace("staging area = " + stagingArea);
    };

    QuestAction.prototype.resolveQuest = function()
    {
        // Resolve questing.
        var environment = this.environment();
        environment.phase(Phase.QUEST_RESOLVE);
        var questers = this.questers();
        var questSum = 0;

        questers.forEach(function(token)
        {
            questSum += token.card().willpower;
            token.exhaustState().isExhausted(true);
        });

        var stagingAreaThreat = environment.stagingAreaThreat();
        LOGGER.debug("questSum = " + questSum + " stagingAreaThreat = " + stagingAreaThreat);
        var diff;

        if (questSum > stagingAreaThreat)
        {
            diff = questSum - stagingAreaThreat;
            var activeLocation = environment.activeLocation();
            LOGGER.trace("activeLocation = " + activeLocation);
            var i;

            if (activeLocation)
            {
                var diff2 = activeLocation.card().questPoints - activeLocation.questState().progress().count();

                if (diff < diff2)
                {
                    // activeLocation is not explored.
                    activeLocation.questState().progress().increase(diff);
                    diff = 0;
                }
                else
                {
                    // activeLocation is explored.
                    diff -= diff2;
                    environment.activeLocation(null);
                }
            }

            if (diff > 0)
            {
                // Put overflow progress on the quest card.
                var activeQuest = environment.activeQuest();
                var diff3 = activeQuest.card().questPoints - activeQuest.questState().progress().count();

                if (diff < diff3)
                {
                    // activeQuest is not finished.
                    activeQuest.questState().progress().increase(diff);
                }
                else
                {
                    // activeQuest is finished.
                    environment.nextQuest();
                }
            }
        }
        else if (questSum < stagingAreaThreat)
        {
            diff = stagingAreaThreat - questSum;

            agents.forEach(function(agent)
            {
                environment.addToThreatLevel(agent, diff);
            });
        }
    };

    return QuestAction;
});

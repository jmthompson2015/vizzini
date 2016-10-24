define([ "Phase", "game/Action" ], function(Phase, Action)
{
    "use strict";
    function QuestTask(store, adjudicator, questers)
    {
        InputValidator.validateNotNull("store", store);
        InputValidator.validateNotNull("adjudicator", adjudicator);
        InputValidator.validateNotNull("questers", questers);

        this.store = function()
        {
            return store;
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

    QuestTask.prototype.doIt = function()
    {
        LOGGER.trace("QuestTask.doIt() start");

        this.revealOneCardPerPlayer();
        this.resolveQuest();

        LOGGER.trace("QuestTask.doIt() end");
    };

    QuestTask.prototype.revealOneCardPerPlayer = function()
    {
        // Reveal 1 card per player from the encounter deck.
        var store = this.store();
        var state = store.getState();
        store.dispatch(Action.setPhase(Phase.QUEST_REVEAL_ENCOUNTER_CARDS));
        var agentIds = state.agentIds;

        agentIds.forEach(function(agentId)
        {
            store.dispatch(Action.drawEncounterCard());
        });
    };

    QuestTask.prototype.resolveQuest = function()
    {
        // Resolve questing.
        var store = this.store();
        var state = store.getState();
        store.dispatch(Action.setPhase(Phase.QUEST_RESOLVE));
        var questers = this.questers();
        var questSum = 0;

        questers.forEach(function(cardInstance)
        {
            questSum += cardInstance.card.willpower;
            cardInstance.isExhausted = true;
        });

        var stagingAreaThreat = this.stagingAreaThreat(state);
        LOGGER.debug("questSum = " + questSum + " stagingAreaThreat = " + stagingAreaThreat);
        var diff;

        if (questSum > stagingAreaThreat)
        {
            diff = questSum - stagingAreaThreat;
            var activeLocation = state.cardInstances[state.activeLocationId];
            LOGGER.trace("activeLocation = " + activeLocation);
            var i;

            if (activeLocation)
            {
                var diff2 = activeLocation.card.questPoints - activeLocation.progressCount;

                if (diff < diff2)
                {
                    // activeLocation is not explored.
                    store.dispatch(Action.addProgress(activeLocation, diff));
                    diff = 0;
                }
                else
                {
                    // activeLocation is explored.
                    diff -= diff2;
                    store.dispatch(Action.setActiveLocation(null));
                }
            }

            if (diff > 0)
            {
                // Put overflow progress on the quest card.
                var activeQuest = state.cardInstances[state.activeQuestId];
                var diff3 = activeQuest.card.questPoints - activeQuest.progressCount;

                if (diff < diff3)
                {
                    // activeQuest is not finished.
                    store.dispatch(Action.addProgress(activeQuest, diff));
                }
                else
                {
                    // activeQuest is finished.
                    store.dispatch(Action.drawQuestCard());
                }
            }
        }
        else if (questSum < stagingAreaThreat)
        {
            diff = stagingAreaThreat - questSum;

            agents.forEach(function(agent)
            {
                store.dispatch(Action.addThreatLevel(agent, diff));

                if (agent.threatLevel >= 50)
                {
                    store.dispatch(Action.eliminatePlayer(agent));
                }
            });
        }
    };

    QuestTask.prototype.stagingAreaThreat = function(state)
    {
        return state.stagingAreaIds.reduce(function(previous, id)
        {
            var cardInstance = state.cardInstances[id];
            return previous + cardInstance.card.threat;
        }, 0);
    };

    return QuestTask;
});

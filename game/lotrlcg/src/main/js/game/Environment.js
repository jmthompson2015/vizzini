define([ "CardType", "Phase", "game/Count" ], function(CardType, Phase, Count)
{
    "use strict";
    function Environment(agents, playerDecks, scenarioDeck)
    {
        InputValidator.validateNotNull("agents", agents);
        InputValidator.validateNotNull("playerDecks", playerDecks);
        InputValidator.validateNotNull("scenarioDeck", scenarioDeck);

        this.playerDecks = function()
        {
            return playerDecks;
        };

        this.scenarioDeck = function()
        {
            return scenarioDeck;
        };

        var that = this;
        var activeAgent;
        var activeLocation;
        var activeQuest;
        var agentToData = {};
        var firstPlayer;
        var phase;
        var stagingArea = [];

        var round = new Count();

        round.bind(Count.EVENT, function()
        {
            LOGGER.info("Round: " + round.count());
            that.trigger(Environment.ROUND_EVENT, round);
        });

        this.activeAgent = function(newValue)
        {
            if (newValue !== undefined)
            {
                activeAgent = newValue;
                LOGGER.info("Active Agent: " + (activeAgent ? activeAgent.name() : activeAgent));
                that.trigger(Environment.ACTIVE_AGENT_EVENT, activeAgent);
            }

            return activeAgent;
        };

        this.activeLocation = function(newValue)
        {
            if (newValue !== undefined)
            {
                activeLocation = newValue;
                LOGGER.info("Active Location: " + activeLocation.card().name);
                that.trigger(Environment.ACTIVE_LOCATION_EVENT, activeLocation);
            }

            return activeLocation;
        };

        this.activeQuest = function(newValue)
        {
            if (newValue !== undefined)
            {
                activeQuest = newValue;
                LOGGER.info("Active Quest: " + activeQuest.card().sequence + " " + activeQuest.card().name);
                that.trigger(Environment.ACTIVE_QUEST_EVENT, activeQuest);
            }

            return activeQuest;
        };

        this.agentToData = function()
        {
            return agentToData;
        };

        this.agents = function()
        {
            var answer;

            if (agents.length === 1 || !activeAgent)
            {
                answer = agents;
            }
            else
            {
                var index = agents.indexOf(activeAgent);
                answer = agents.slice(index, agents.length);
                answer.vizziniAddAll(agents.slice(0, index));
            }

            return answer;
        };

        this.firstPlayer = function(newValue)
        {
            if (newValue !== undefined)
            {
                firstPlayer = newValue;
                LOGGER.info("First Player: " + firstPlayer);
                that.trigger(Environment.FIRST_PLAYER_EVENT, firstPlayer);
            }

            return firstPlayer;
        };

        this.phase = function(newValue)
        {
            if (newValue !== undefined)
            {
                phase = newValue;

                LOGGER.info("Phase: " + Phase.properties[phase].name);
                this.trigger(Environment.PHASE_EVENT, phase);
            }

            return phase;
        };

        this.round = function()
        {
            return round;
        };

        this.stagingArea = function()
        {
            return stagingArea;
        };
    }

    Environment.ACTIVE_AGENT_EVENT = "activeAgent";
    Environment.ACTIVE_LOCATION_EVENT = "activeLocation";
    Environment.ACTIVE_QUEST_EVENT = "activeQuest";
    Environment.FIRST_PLAYER_EVENT = "firstPlayer";
    Environment.PHASE_EVENT = "phase";
    Environment.ROUND_EVENT = "round";

    Environment.prototype.addToThreatLevel = function(agent, value)
    {
        InputValidator.validateNotNull("agent", agent);
        InputValidator.validateIsNumber("value", value);

        var data = this.agentData(agent);
        data.threatLevel(data.threatLevel() + value);
    };

    Environment.prototype.agentData = function(agent)
    {
        InputValidator.validateNotNull("agent", agent);

        return this.agentToData()[agent];
    };

    Environment.prototype.allies = function(agent)
    {
        InputValidator.validateNotNull("agent", agent);

        var playArea = this.agentData(agent).playArea();

        return playArea.filter(function(token)
        {
            return token.card().cardType === CardType.ALLY;
        });
    };

    Environment.prototype.characters = function(agent)
    {
        InputValidator.validateNotNull("agent", agent);

        var playArea = this.agentData(agent).playArea();

        return playArea.filter(function(token)
        {
            var cardType = token.card().cardType;
            return cardType === CardType.ALLY || cardType === CardType.HERO;
        });
    };

    Environment.prototype.enemies = function()
    {
        var stagingArea = this.stagingArea();

        return stagingArea.filter(function(token)
        {
            return token.card().cardType === CardType.ENEMY;
        });
    };

    Environment.prototype.heroes = function(agent)
    {
        InputValidator.validateNotNull("agent", agent);

        var playArea = this.agentData(agent).playArea();

        return playArea.filter(function(token)
        {
            return token.card().cardType === CardType.HERO;
        });
    };

    Environment.prototype.locations = function()
    {
        var stagingArea = this.stagingArea();

        return stagingArea.filter(function(token)
        {
            return token.card().cardType === CardType.LOCATION;
        });
    };

    Environment.prototype.nextQuest = function()
    {
        // Advance to the next quest card.
        var scenarioDeck = this.scenarioDeck();
        var questTokens = scenarioDeck.questTokens();
        var index = questTokens.indexOf(this.activeQuest());

        if (index + 1 < questTokens.length)
        {
            this.activeQuest(questTokens[index + 1]);
        }
        else
        {
            // Done.
        }
    };

    Environment.prototype.stagingAreaThreat = function()
    {
        var answer = 0;
        var stagingArea = this.stagingArea();

        stagingArea.forEach(function(token)
        {
            var cardType = token.card().cardType;

            if ([ CardType.ENEMY, CardType.LOCATION ].vizziniContains(cardType))
            {
                LOGGER.trace(token + " threat = " + token.card().threat);
                answer += token.card().threat;
            }
        });

        return answer;
    };

    Environment.prototype.threatLevel = function(agent)
    {
        InputValidator.validateNotNull("agent", agent);

        return this.agentData(agent).threatLevel();
    };

    function AgentData(playerDeck)
    {
        this.playerDeck = function()
        {
            return playerDeck;
        };

        var engagementArea = [];
        var hand = [];
        var playArea = [];
        var threatLevel = 0;

        this.engagementArea = function()
        {
            return engagementArea;
        };

        this.hand = function()
        {
            return hand;
        };

        this.playArea = function()
        {
            return playArea;
        };

        this.threatLevel = function(newValue)
        {
            if (newValue !== undefined)
            {
                threatLevel = newValue;
            }

            return threatLevel;
        };
    }

    Environment.prototype.setup = function()
    {
        var i, j, agent, playerDeck;
        var agents = this.agents();
        var agentToData = this.agentToData();
        var playerDecks = this.playerDecks();

        for (i = 0; i < agents.length; i++)
        {
            agent = agents[i];
            agentToData[agent] = new AgentData(playerDecks[i]);
        }

        // 1. Shuffle Decks
        var scenarioDeck = this.scenarioDeck();
        scenarioDeck.shuffle();

        for (i = 0; i < agents.length; i++)
        {
            agent = agents[i];
            playerDeck = this.agentData(agent).playerDeck();
            playerDeck.shuffle();
        }

        // 2. Place Heroes and Set Initial Threat Levels
        for (i = 0; i < agents.length; i++)
        {
            agent = agents[i];
            var data = this.agentData(agent);
            playerDeck = data.playerDeck();
            var heroTokens = playerDeck.heroTokens();
            var sum = 0;
            var playArea = data.playArea();

            for (j = 0; j < heroTokens.length; j++)
            {
                sum += heroTokens[j].card().threatCost;
                playArea.push(heroTokens[j]);
            }

            data.threatLevel(sum);
        }

        // 3. Setup Token Bank

        // 4. Determine First Player
        this.firstPlayer(agents[0]);

        // 5. Draw Setup Hand
        for (i = 0; i < agents.length; i++)
        {
            agent = agents[i];
            var hand = this.agentData(agent).hand();
            playerDeck = this.agentData(agent).playerDeck();

            for (j = 0; j < 6; j++)
            {
                hand.push(playerDeck.draw());
            }

            LOGGER.trace("hand " + i + " = " + hand);
        }

        // 6. Set Quest Cards
        this.activeQuest(scenarioDeck.questTokens()[0]);

        // 7. Follow Scenario Setup Instruction
    };

    MicroEvent.mixin(Environment);

    return Environment;
});

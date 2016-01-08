define([ "Environment", "MediumAgent", "SimpleAgent", "SquadBuilder", "Team", "ui/HumanAgent" ], function(Environment,
        MediumAgent, SimpleAgent, SquadBuilder, Team, HumanAgent)
{
    "use strict";
    var EnvironmentFactory = {};

    EnvironmentFactory.createCoreSetEnvironment = function(computerAgentType0, computerAgentType1)
    {
        var type0 = (computerAgentType0 ? computerAgentType0 : "SimpleAgent");
        var type1 = (computerAgentType1 ? computerAgentType1 : "SimpleAgent");

        // Create initial agents and tokens.
        var firstAgent;

        switch (type0)
        {
        case "SimpleAgent":
            firstAgent = new SimpleAgent("First Agent", Team.IMPERIAL);
            break;
        case "MediumAgent":
            firstAgent = new MediumAgent("First Agent", Team.IMPERIAL);
            break;
        case "HumanAgent":
            firstAgent = new HumanAgent("First Agent", Team.IMPERIAL);
            break;
        default:
            throw "Unknown computerAgentType: " + computerAgentType;
        }

        var firstSquad = SquadBuilder.CoreSetImperialSquadBuilder.buildSquad(firstAgent);

        var secondAgent;

        switch (type1)
        {
        case "SimpleAgent":
            secondAgent = new SimpleAgent("Second Agent", Team.REBEL);
            break;
        case "MediumAgent":
            secondAgent = new MediumAgent("Second Agent", Team.REBEL);
            break;
        case "HumanAgent":
            secondAgent = new HumanAgent("Second Agent", Team.REBEL);
            break;
        default:
            throw "Unknown computerAgentType: " + computerAgentType;
        }

        var secondSquad = SquadBuilder.CoreSetRebelSquadBuilder.buildSquad(secondAgent);

        var answer = new Environment(firstAgent.teamKey(), secondAgent.teamKey());

        answer.placeInitialTokens(firstAgent, firstSquad, secondAgent, secondSquad);

        return answer;
    };

    return EnvironmentFactory;
});

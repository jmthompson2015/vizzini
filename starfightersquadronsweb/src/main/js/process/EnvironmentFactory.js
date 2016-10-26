define(["process/Environment", "process/MediumAgent", "process/SimpleAgent", "process/SquadBuilder", "Team", "process/Reducer", "process/ui/HumanAgent"],
    function(Environment, MediumAgent, SimpleAgent, SquadBuilder, Team, Reducer, HumanAgent)
    {
        "use strict";
        var EnvironmentFactory = {};

        EnvironmentFactory.createCoreSetEnvironment = function(store, computerAgentType0, computerAgentType1)
        {
            var myStore = (store ? store : Redux.createStore(Reducer.root));
            var type0 = (computerAgentType0 ? computerAgentType0 : "SimpleAgent");
            var type1 = (computerAgentType1 ? computerAgentType1 : "SimpleAgent");

            // Create initial agents and tokens.
            var firstAgent = EnvironmentFactory.createAgent(type0, "First Agent", Team.IMPERIAL);
            var firstSquad = SquadBuilder.CoreSetImperialSquadBuilder.buildSquad(firstAgent);

            var secondAgent = EnvironmentFactory.createAgent(type1, "Second Agent", Team.REBEL);
            var secondSquad = SquadBuilder.CoreSetRebelSquadBuilder.buildSquad(secondAgent);

            var answer = new Environment(myStore, firstAgent.teamKey(), secondAgent.teamKey());

            answer.placeInitialTokens(firstAgent, firstSquad, secondAgent, secondSquad);

            return answer;
        };

        EnvironmentFactory.createTFACoreSetEnvironment = function(store, computerAgentType0, computerAgentType1)
        {
            var myStore = (store ? store : Redux.createStore(Reducer.root));
            var type0 = (computerAgentType0 ? computerAgentType0 : "SimpleAgent");
            var type1 = (computerAgentType1 ? computerAgentType1 : "SimpleAgent");

            // Create initial agents and tokens.
            var firstAgent = EnvironmentFactory.createAgent(type0, "First Agent", Team.FIRST_ORDER);
            var firstSquad = SquadBuilder.CoreSetFirstOrderSquadBuilder.buildSquad(firstAgent);

            var secondAgent = EnvironmentFactory.createAgent(type1, "Second Agent", Team.RESISTANCE);
            var secondSquad = SquadBuilder.CoreSetResistanceSquadBuilder.buildSquad(secondAgent);

            var answer = new Environment(myStore, firstAgent.teamKey(), secondAgent.teamKey());

            answer.placeInitialTokens(firstAgent, firstSquad, secondAgent, secondSquad);

            return answer;
        };

        EnvironmentFactory.createHugeShipEnvironment = function(store, computerAgentType0, computerAgentType1)
        {
            var myStore = (store ? store : Redux.createStore(Reducer.root));
            var type0 = (computerAgentType0 ? computerAgentType0 : "SimpleAgent");
            var type1 = (computerAgentType1 ? computerAgentType1 : "SimpleAgent");

            // Create initial agents and tokens.
            var firstAgent = EnvironmentFactory.createAgent(type0, "First Agent", Team.IMPERIAL);
            var firstSquad = SquadBuilder.HugeShipImperialSquadBuilder.buildSquad(firstAgent);

            var secondAgent = EnvironmentFactory.createAgent(type1, "Second Agent", Team.REBEL);
            var secondSquad = SquadBuilder.HugeShipRebelSquadBuilder.buildSquad(secondAgent);

            var answer = new Environment(myStore, firstAgent.teamKey(), secondAgent.teamKey());

            answer.placeInitialTokens(firstAgent, firstSquad, secondAgent, secondSquad);

            return answer;
        };

        EnvironmentFactory.createAgent = function(type, name, teamKey)
        {
            var answer;

            switch (type)
            {
                case "SimpleAgent":
                    answer = new SimpleAgent(name, teamKey);
                    break;
                case "MediumAgent":
                    answer = new MediumAgent(name, teamKey);
                    break;
                case "HumanAgent":
                    answer = new HumanAgent(name, teamKey);
                    break;
                default:
                    throw "Unknown computerAgentType: " + computerAgentType;
            }

            return answer;
        };

        return EnvironmentFactory;
    });

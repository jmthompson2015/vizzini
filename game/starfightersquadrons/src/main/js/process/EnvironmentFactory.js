define(["Team", "process/Environment", "process/MediumAgent", "process/Reducer", "process/SimpleAgent", "process/SquadBuilder", "process/ui/HumanAgent"],
   function(Team, Environment, MediumAgent, Reducer, SimpleAgent, SquadBuilder, HumanAgent)
   {
      "use strict";
      var EnvironmentFactory = {};

      EnvironmentFactory.createCoreSetEnvironment = function(store, computerAgentType0, computerAgentType1, imageBase)
      {
         var myStore = (store ? store : Redux.createStore(Reducer.root));
         var type0 = (computerAgentType0 ? computerAgentType0 : "SimpleAgent");
         var type1 = (computerAgentType1 ? computerAgentType1 : "SimpleAgent");
         var myImageBase = (imageBase ? imageBase : "../../../main/resources/images/");

         // Create initial agents and tokens.
         var firstAgent = EnvironmentFactory.createAgent(type0, "First Agent", Team.IMPERIAL, myImageBase);
         var firstSquad = SquadBuilder.CoreSetImperialSquadBuilder.buildSquad(firstAgent);

         var secondAgent = EnvironmentFactory.createAgent(type1, "Second Agent", Team.REBEL, myImageBase);
         var secondSquad = SquadBuilder.CoreSetRebelSquadBuilder.buildSquad(secondAgent);

         var answer = new Environment(myStore, firstAgent.teamKey(), secondAgent.teamKey());

         answer.placeInitialTokens(firstAgent, firstSquad, secondAgent, secondSquad);

         return answer;
      };

      EnvironmentFactory.createTFACoreSetEnvironment = function(store, computerAgentType0, computerAgentType1, imageBase)
      {
         var myStore = (store ? store : Redux.createStore(Reducer.root));
         var type0 = (computerAgentType0 ? computerAgentType0 : "SimpleAgent");
         var type1 = (computerAgentType1 ? computerAgentType1 : "SimpleAgent");
         var myImageBase = (imageBase ? imageBase : "../../../main/resources/images/");

         // Create initial agents and tokens.
         var firstAgent = EnvironmentFactory.createAgent(type0, "First Agent", Team.FIRST_ORDER, myImageBase);
         var firstSquad = SquadBuilder.CoreSetFirstOrderSquadBuilder.buildSquad(firstAgent);

         var secondAgent = EnvironmentFactory.createAgent(type1, "Second Agent", Team.RESISTANCE, myImageBase);
         var secondSquad = SquadBuilder.CoreSetResistanceSquadBuilder.buildSquad(secondAgent);

         var answer = new Environment(myStore, firstAgent.teamKey(), secondAgent.teamKey());

         answer.placeInitialTokens(firstAgent, firstSquad, secondAgent, secondSquad);

         return answer;
      };

      EnvironmentFactory.createHugeShipEnvironment = function(store, computerAgentType0, computerAgentType1, imageBase)
      {
         var myStore = (store ? store : Redux.createStore(Reducer.root));
         var type0 = (computerAgentType0 ? computerAgentType0 : "SimpleAgent");
         var type1 = (computerAgentType1 ? computerAgentType1 : "SimpleAgent");
         var myImageBase = (imageBase ? imageBase : "../../../main/resources/images/");

         // Create initial agents and tokens.
         var firstAgent = EnvironmentFactory.createAgent(type0, "First Agent", Team.IMPERIAL, myImageBase);
         var firstSquad = SquadBuilder.HugeShipImperialSquadBuilder.buildSquad(firstAgent);

         var secondAgent = EnvironmentFactory.createAgent(type1, "Second Agent", Team.REBEL, myImageBase);
         var secondSquad = SquadBuilder.HugeShipRebelSquadBuilder.buildSquad(secondAgent);

         var answer = new Environment(myStore, firstAgent.teamKey(), secondAgent.teamKey());

         answer.placeInitialTokens(firstAgent, firstSquad, secondAgent, secondSquad);

         return answer;
      };

      EnvironmentFactory.createAgent = function(type, name, teamKey, imageBase)
      {
         InputValidator.validateNotNull("type", type);
         InputValidator.validateNotNull("name", name);
         InputValidator.validateNotNull("teamKey", teamKey);
         InputValidator.validateNotNull("imageBase", imageBase);

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
               answer = new HumanAgent(name, teamKey, imageBase);
               break;
            default:
               throw "Unknown computerAgentType: " + computerAgentType;
         }

         return answer;
      };

      return EnvironmentFactory;
   });

define(["Team", "process/Environment", "process/EventObserver", "process/MediumAgent", "process/PhaseObserver", "process/Reducer", "process/SimpleAgent", "process/SquadBuilder", "process/ui/HumanAgent"],
   function(Team, Environment, EventObserver, MediumAgent, PhaseObserver, Reducer, SimpleAgent, SquadBuilder, HumanAgent)
   {
      "use strict";
      var EnvironmentFactory = {};

      EnvironmentFactory.createCoreSetEnvironment = function(store, computerAgentType0, computerAgentType1, iconBase, imageBase)
      {
         var myStore = (store ? store : Redux.createStore(Reducer.root));
         var type0 = (computerAgentType0 ? computerAgentType0 : "SimpleAgent");
         var type1 = (computerAgentType1 ? computerAgentType1 : "SimpleAgent");
         var myIconBase = (iconBase ? iconBase : "../../../main/resources/icons/");
         var myImageBase = (imageBase ? imageBase : "../../../main/resources/images/");

         // Create initial agents and tokens.
         var firstAgent = EnvironmentFactory.createAgent(type0, "First Agent", Team.IMPERIAL, myIconBase, myImageBase);
         var firstSquad = SquadBuilder.CoreSetImperialSquadBuilder.buildSquad(firstAgent);

         var secondAgent = EnvironmentFactory.createAgent(type1, "Second Agent", Team.REBEL, myIconBase, myImageBase);
         var secondSquad = SquadBuilder.CoreSetRebelSquadBuilder.buildSquad(secondAgent);

         var answer = new Environment(myStore, firstAgent.teamKey(), secondAgent.teamKey());

         new EventObserver(myStore);
         new PhaseObserver(myStore);
         answer.placeInitialTokens(firstAgent, firstSquad, secondAgent, secondSquad);

         return answer;
      };

      EnvironmentFactory.createTFACoreSetEnvironment = function(store, computerAgentType0, computerAgentType1, iconBase, imageBase)
      {
         var myStore = (store ? store : Redux.createStore(Reducer.root));
         var type0 = (computerAgentType0 ? computerAgentType0 : "SimpleAgent");
         var type1 = (computerAgentType1 ? computerAgentType1 : "SimpleAgent");
         var myIconBase = (iconBase ? iconBase : "../../../main/resources/icons/");
         var myImageBase = (imageBase ? imageBase : "../../../main/resources/images/");

         // Create initial agents and tokens.
         var firstAgent = EnvironmentFactory.createAgent(type0, "First Agent", Team.FIRST_ORDER, myIconBase, myImageBase);
         var firstSquad = SquadBuilder.CoreSetFirstOrderSquadBuilder.buildSquad(firstAgent);

         var secondAgent = EnvironmentFactory.createAgent(type1, "Second Agent", Team.RESISTANCE, myIconBase, myImageBase);
         var secondSquad = SquadBuilder.CoreSetResistanceSquadBuilder.buildSquad(secondAgent);

         var answer = new Environment(myStore, firstAgent.teamKey(), secondAgent.teamKey());

         new EventObserver(myStore);
         new PhaseObserver(myStore);
         answer.placeInitialTokens(firstAgent, firstSquad, secondAgent, secondSquad);

         return answer;
      };

      EnvironmentFactory.createHugeShipEnvironment = function(store, computerAgentType0, computerAgentType1, iconBase, imageBase)
      {
         var myStore = (store ? store : Redux.createStore(Reducer.root));
         var type0 = (computerAgentType0 ? computerAgentType0 : "SimpleAgent");
         var type1 = (computerAgentType1 ? computerAgentType1 : "SimpleAgent");
         var myIconBase = (iconBase ? iconBase : "../../../main/resources/icons/");
         var myImageBase = (imageBase ? imageBase : "../../../main/resources/images/");

         // Create initial agents and tokens.
         var firstAgent = EnvironmentFactory.createAgent(type0, "First Agent", Team.IMPERIAL, myIconBase, myImageBase);
         var firstSquad = SquadBuilder.HugeShipImperialSquadBuilder.buildSquad(firstAgent);

         var secondAgent = EnvironmentFactory.createAgent(type1, "Second Agent", Team.REBEL, myIconBase, myImageBase);
         var secondSquad = SquadBuilder.HugeShipRebelSquadBuilder.buildSquad(secondAgent);

         var answer = new Environment(myStore, firstAgent.teamKey(), secondAgent.teamKey());

         new EventObserver(myStore);
         new PhaseObserver(myStore);
         answer.placeInitialTokens(firstAgent, firstSquad, secondAgent, secondSquad);

         return answer;
      };

      EnvironmentFactory.createAgent = function(type, name, teamKey, iconBase, imageBase)
      {
         InputValidator.validateNotNull("type", type);
         InputValidator.validateNotNull("name", name);
         InputValidator.validateNotNull("teamKey", teamKey);
         InputValidator.validateNotNull("iconBase", iconBase);
         InputValidator.validateNotNull("imageBase", imageBase);

         var inputAreaId = "inputArea";
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
               answer = new HumanAgent(name, teamKey, inputAreaId, iconBase, imageBase);
               break;
            default:
               throw "Unknown computerAgentType: " + computerAgentType;
         }

         return answer;
      };

      return EnvironmentFactory;
   });

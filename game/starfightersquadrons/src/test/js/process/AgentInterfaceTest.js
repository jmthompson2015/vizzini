define(["process/MediumAgent", "process/SimpleAgent", "Team", "process/ui/HumanAgent"],
   function(MediumAgent, SimpleAgent, Team, HumanAgent)
   {
      "use strict";
      QUnit.module("AgentInterface");

      QUnit.test("Agent interface", function(assert)
      {
         // Setup.
         var name = "myAgent";
         var team = Team.IMPERIAL;
         var inputAreaId = "firstPilotInputArea";
         var iconBase = "../resources/icons/";
         var imageBase = "../resources/images/";

         var agent0 = new SimpleAgent(name + "0", team);
         var agent1 = new MediumAgent(name + "1", team);
         var agent2 = new HumanAgent(name + "2", team, inputAreaId, iconBase, imageBase);
         var agents = [agent0, agent1, agent2];

         // Run / Verify.
         for (var i = 0; i < agents.length; i++)
         {
            var agent = agents[i];

            // Verify the functions exist.
            assert.ok(agent.name, agent.name() + ".name");
            assert.ok(agent.teamKey, agent.name() + ".teamKey");

            if (i === 2)
            {
               assert.ok(agent.inputAreaId, agent.name() + ".inputAreaId");
               assert.ok(agent.imageBase, agent.name() + ".imageBase");
            }

            assert.ok(agent.getPlanningAction, agent.name() + ".getPlanningAction");
            assert.ok(agent.getDecloakAction, agent.name() + ".getDecloakAction");
            assert.ok(agent.getShipAction, agent.name() + ".getShipAction");
            assert.ok(agent.chooseWeaponAndDefender, agent.name() + ".chooseWeaponAndDefender");
            assert.ok(agent.getModifyAttackDiceAction, agent.name() + ".getModifyAttackDiceAction");
            assert.ok(agent.getModifyDefenseDiceAction, agent.name() + ".getModifyDefenseDiceAction");
            assert.ok(agent.dealDamage, agent.name() + ".dealDamage");
         }
      });
   });

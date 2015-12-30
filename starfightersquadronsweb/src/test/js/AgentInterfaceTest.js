define([ "MediumAgent", "SimpleAgent", "Team", "ui/HumanAgent" ], function(MediumAgent, SimpleAgent, Team, HumanAgent)
{
    QUnit.module("AgentInterface");

    QUnit.test("Agent interface", function(assert)
    {
        // Setup.
        var name = "myAgent";
        var team = Team.IMPERIAL;

        var agent0 = new SimpleAgent(name + "0", team);
        var agent1 = new MediumAgent(name + "1", team);
        var agent2 = new HumanAgent(name + "2", team);
        var agents = [ agent0, agent1, agent2 ];

        // Run / Verify.
        for (var i = 0; i < agents.length; i++)
        {
            var agent = agents[i];

            // Verify the functions exist.
            assert.ok(agent.name, agent.name() + ".name");
            assert.ok(agent.team, agent.name() + ".team");
            assert.ok(agent.getPlanningAction, agent.name() + ".getPlanningAction");
            assert.ok(agent.getShipAction, agent.name() + ".getShipAction");
            assert.ok(agent.chooseWeaponAndDefender, agent.name() + ".chooseWeaponAndDefender");
            assert.ok(agent.getModifyAttackDiceAction, agent.name() + ".getModifyAttackDiceAction");
            assert.ok(agent.getModifyDefenseDiceAction, agent.name() + ".getModifyDefenseDiceAction");
            assert.ok(agent.dealDamage, agent.name() + ".dealDamage");
        }
    });
});

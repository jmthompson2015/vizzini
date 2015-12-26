define([ "MediumAgent", "SimpleAgent", "SquadBuilder", "Team", "ui/HumanAgent" ], function(MediumAgent, SimpleAgent,
        SquadBuilder, Team, HumanAgent)
{
    QUnit.module("AgentInterface");

    QUnit.test("Agent interface", function(assert)
    {
        // Setup.
        var name = "myAgent";
        var team = Team.IMPERIAL;
        var squadBuilder = SquadBuilder.CoreSetImperialSquadBuilder;

        var agent0 = new SimpleAgent(name + "0", team, squadBuilder);
        var agent1 = new MediumAgent(name + "1", team, squadBuilder);
        var agent2 = new HumanAgent(name + "2", team, squadBuilder);
        var agents = [ agent0, agent1, agent2 ];

        // Run / Verify.
        for (var i = 0; i < agents.length; i++)
        {
            var agent = agents[i];

            // Verify the functions exist.
            assert.ok(agent.buildSquad, (typeof agent) + ".buildSquad");
            assert.ok(agent.name, agent.name() + ".getName");
            assert.ok(agent.team, agent.name() + ".getTeam");
            assert.ok(agent.squadBuilder, agent.name() + ".getSquadBuilder");
            assert.ok(agent.getPlanningAction, agent.name() + ".getPlanningAction");
            assert.ok(agent.getShipAction, agent.name() + ".getShipAction");
            assert.ok(agent.chooseWeaponAndDefender, agent.name() + ".chooseWeaponAndDefender");
            assert.ok(agent.getModifyAttackDiceAction, agent.name() + ".getModifyAttackDiceAction");
            assert.ok(agent.getModifyDefenseDiceAction, agent.name() + ".getModifyDefenseDiceAction");
            assert.ok(agent.dealDamage, agent.name() + ".dealDamage");
        }
    });
});

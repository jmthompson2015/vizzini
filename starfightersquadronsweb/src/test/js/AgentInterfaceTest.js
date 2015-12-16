define([ "MediumAgent", "SimpleAgent", "SquadBuilder", "Team", "ui/HumanAgent" ], function(
        MediumAgent, SimpleAgent, SquadBuilder, Team, HumanAgent)
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
            assert.ok(agent.getName, agent.getName() + ".getName");
            assert.ok(agent.getTeam, agent.getName() + ".getTeam");
            assert.ok(agent.getSquadBuilder, agent.getName() + ".getSquadBuilder");
            assert.ok(agent.getPlanningAction, agent.getName() + ".getPlanningAction");
            assert.ok(agent.getShipAction, agent.getName() + ".getShipAction");
            assert.ok(agent.chooseWeaponAndDefender, agent.getName() + ".chooseWeaponAndDefender");
            assert.ok(agent.getModifyAttackDiceAction, agent.getName() + ".getModifyAttackDiceAction");
            assert.ok(agent.getModifyDefenseDiceAction, agent.getName() + ".getModifyDefenseDiceAction");
        }
    });
});

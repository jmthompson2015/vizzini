define([ "Adjudicator", "Environment" ], function(Adjudicator, Environment)
{
    QUnit.module("Adjudicator");

    QUnit.test("canAttack() yes", function(assert)
    {
        // Setup.
        var environment = Environment.createCoreSetEnvironment();
        var adjudicator = new Adjudicator();
        var attacker = environment.tokens()[0];

        // Run / Verify.
        assert.ok(adjudicator.canAttack(attacker));
    });

    QUnit.test("canSelectShipAction() yes", function(assert)
    {
        // Setup.
        var environment = Environment.createCoreSetEnvironment();
        var adjudicator = new Adjudicator();
        var attacker = environment.tokens()[0];

        // Run / Verify.
        assert.ok(adjudicator.canSelectShipAction(attacker));
    });

    QUnit.test("determineWinner()", function(assert)
    {
        // Setup.
        var environment = Environment.createCoreSetEnvironment();
        var adjudicator = new Adjudicator();

        // Run / Verify.
        assert.ok(!adjudicator.determineWinner(environment));
    });

    QUnit.test("isGameOver()", function(assert)
    {
        // Setup.
        var environment = Environment.createCoreSetEnvironment();
        var adjudicator = new Adjudicator();

        // Run / Verify.
        assert.ok(!adjudicator.isGameOver(environment));
    });
});

define([ "DamageCard", "DamageDealer", "Environment", "Pilot", "Token", "UpgradeCard" ], function(DamageCard,
        DamageDealer, Environment, Pilot, Token, UpgradeCard)
{
    QUnit.module("DamageDealer");

    QUnit.test("DamageDealer()", function(assert)
    {
        // Setup.
        var environment = Environment.createCoreSetEnvironment();
        var hitCount = 2;
        var criticalHitCount = 3;
        var defender = environment.getTokens()[0]; // TIE Fighter
        var evadeCount = 1;

        // Run.
        var damageDealer = new DamageDealer(environment, hitCount, criticalHitCount, defender, evadeCount);

        // Verify.
        assert.equal(damageDealer.getHits(), 1);
        assert.equal(damageDealer.getCriticalHits(), 3);
        assert.equal(damageDealer.getRemainingEvades(), 0);
    });

    QUnit.test("dealDamage()", function(assert)
    {
        // Setup.
        var environment = Environment.createCoreSetEnvironment();
        var hitCount = 2;
        var criticalHitCount = 3;
        var defender = environment.getTokens()[0]; // TIE Fighter
        var evadeCount = 1;
        var damageDealer = new DamageDealer(environment, hitCount, criticalHitCount, defender, evadeCount);
        assert.equal(defender.getDamageCount(), 0);
        assert.equal(defender.getCriticalDamageCount(), 0);

        // Run.
        damageDealer.dealDamage();

        // Verify.
        assert.equal(defender.getDamageCount(), 1);
        assert.equal(defender.getCriticalDamageCount(), 3);
    });

    QUnit.test("dealDamage() shields", function(assert)
    {
        // Setup.
        var environment = Environment.createCoreSetEnvironment();
        var hitCount = 2;
        var criticalHitCount = 3;
        var defender = environment.getTokens()[2]; // X-Wing
        var evadeCount = 1;
        var damageDealer = new DamageDealer(environment, hitCount, criticalHitCount, defender, evadeCount);
        assert.equal(defender.getDamageCount(), 0);
        assert.equal(defender.getCriticalDamageCount(), 0);

        // Run.
        damageDealer.dealDamage();

        // Verify.
        assert.equal(defender.getDamageCount(), 0);
        assert.equal(defender.getCriticalDamageCount(), 2);
    });

    QUnit.test("dealDamage() Determination", function(assert)
    {
        // Setup.
        var environment = Environment.createCoreSetEnvironment();
        var hitCount = 2;
        var criticalHitCount = 1;
        var rebelAgent = environment.getTokens()[2].getAgent();
        var defender = new Token(Pilot.LUKE_SKYWALKER, rebelAgent, UpgradeCard.DETERMINATION);
        var evadeCount = 0;
        var damageDealer = new DamageDealer(environment, hitCount, criticalHitCount, defender, evadeCount);
        assert.equal(defender.getDamageCount(), 0);
        assert.equal(defender.getCriticalDamageCount(), 0);

        // Run.
        damageDealer.dealDamage();

        // Verify.
        assert.equal(defender.getDamageCount(), 0);
        var criticalDamages = defender.getCriticalDamages();
        if (criticalDamages.length === 0)
        {
            assert.equal(defender.getCriticalDamageCount(), 0);
        }
        else
        {
            var damage = criticalDamages[0];
            var trait = DamageCard.properties[damage].trait;
            LOGGER.debug("trait = " + trait);
            assert.ok(trait !== DamageCard.Trait.PILOT);
            assert.equal(trait, DamageCard.Trait.SHIP);
            assert.equal(defender.getCriticalDamageCount(), 1);
        }
    });

    QUnit.test("dealDamage() Chewbacca", function(assert)
    {
        // Setup.
        var environment = Environment.createCoreSetEnvironment();
        var hitCount = 2;
        var criticalHitCount = 3;
        var rebelAgent = environment.getTokens()[2].getAgent();
        var defender = new Token(Pilot.CHEWBACCA, rebelAgent);
        defender.decreaseShieldCount();
        defender.decreaseShieldCount();
        defender.decreaseShieldCount(); // two shields remaining
        var evadeCount = 1;
        var damageDealer = new DamageDealer(environment, hitCount, criticalHitCount, defender, evadeCount);
        assert.equal(defender.getDamageCount(), 0);
        assert.equal(defender.getCriticalDamageCount(), 0);

        // Run.
        damageDealer.dealDamage();

        // Verify.
        assert.equal(defender.getDamageCount(), 2);
        assert.equal(defender.getCriticalDamageCount(), 0);
    });
});

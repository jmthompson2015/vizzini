define([ "Environment", "Position", "RangeRuler", "ui/WeaponAndDefenderChooser" ], function(Environment, Position,
        RangeRuler, WeaponAndDefenderChooser)
{
    QUnit.module("WeaponAndDefenderChooser");

    QUnit.test("createRangeAndTokens() none", function(assert)
    {
        // Setup.
        var environment = Environment.createCoreSetEnvironment();
        var attackerPosition = new Position(458, 895, -90);
        var attacker = environment.getTokenAt(attackerPosition);
        var weapon = attacker.primaryWeapon();

        // Run.
        var result = WeaponAndDefenderChooser.createRangeAndTokens(environment, attacker, attackerPosition, weapon);

        // Verify.
        assert.ok(result);
        assert.equal(result.length, 0);
    });

    QUnit.test("createRangeAndTokens() one", function(assert)
    {
        // Setup.
        var environment = Environment.createCoreSetEnvironment();
        var attackerPosition = new Position(458, 895, -90);
        var attacker = environment.getTokenAt(attackerPosition);
        environment.removeToken(attackerPosition);
        attackerPosition = new Position(300, 70, -90);
        environment.placeToken(attackerPosition, attacker);
        var weapon = attacker.primaryWeapon();

        // Run.
        var result = WeaponAndDefenderChooser.createRangeAndTokens(environment, attacker, attackerPosition, weapon);

        // Verify.
        assert.ok(result);
        assert.equal(result.length, 1);
        {
            var rangeAndTokens = result[0];
            assert.ok(rangeAndTokens);
            assert.equal(rangeAndTokens.range, RangeRuler.ONE);
            var tokens = rangeAndTokens.tokens;
            assert.ok(tokens);
            assert.equal(tokens.length, 1);
        }
    });

    QUnit.test("createWeaponAndRangeAndTokens() one", function(assert)
    {
        // Setup.
        var environment = Environment.createCoreSetEnvironment();
        var attackerPosition = new Position(458, 895, -90);
        var attacker = environment.getTokenAt(attackerPosition);
        environment.removeToken(attackerPosition);
        attackerPosition = new Position(300, 70, -90);
        environment.placeToken(attackerPosition, attacker);
        var weapon = attacker.primaryWeapon();

        // Run.
        var result = WeaponAndDefenderChooser.createWeaponAndRangeAndTokens(environment, attacker);

        // Verify.
        assert.ok(result);
        assert.equal(result.length, 1);
        {
            var weaponAndRangeAndTokens = result[0];
            var weapon = weaponAndRangeAndTokens.weapon;
            assert.equal(weapon, attacker.primaryWeapon());

            var rangeAndTokensArray = weaponAndRangeAndTokens.rangeAndTokens;
            assert.ok(rangeAndTokensArray);
            assert.equal(rangeAndTokensArray.length, 1);

            var rangeAndTokens = rangeAndTokensArray[0];
            assert.equal(rangeAndTokens.range, RangeRuler.ONE);

            var tokens = rangeAndTokens.tokens;
            assert.ok(tokens);
            assert.equal(tokens.length, 1);
        }
    });
});

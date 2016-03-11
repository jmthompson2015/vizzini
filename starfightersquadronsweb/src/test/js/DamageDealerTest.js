define([ "DamageCard", "DamageCardTrait", "DamageDealer", "EnvironmentFactory", "Pilot", "Token", "UpgradeCard" ],
        function(DamageCard, DamageCardTrait, DamageDealer, EnvironmentFactory, Pilot, Token, UpgradeCard)
        {
            "use strict";
            QUnit.module("DamageDealer");

            QUnit.test("DamageDealer()", function(assert)
            {
                // Setup.
                var environment = EnvironmentFactory.createCoreSetEnvironment();
                var hitCount = 2;
                var criticalHitCount = 3;
                var defender = environment.tokens()[0]; // TIE Fighter
                var evadeCount = 1;

                // Run.
                var damageDealer = new DamageDealer(environment, hitCount, criticalHitCount, defender, evadeCount);

                // Verify.
                assert.equal(damageDealer.hits(), 1);
                assert.equal(damageDealer.criticalHits(), 3);
                assert.equal(damageDealer.remainingEvades(), 0);
            });

            QUnit.test("dealDamage()", function(assert)
            {
                // Setup.
                var environment = EnvironmentFactory.createCoreSetEnvironment();
                var hitCount = 2;
                var criticalHitCount = 3;
                var defender = environment.tokens()[0]; // TIE Fighter
                var evadeCount = 1;
                var damageDealer = new DamageDealer(environment, hitCount, criticalHitCount, defender, evadeCount);
                assert.equal(defender.damageCount(), 0);
                assert.equal(defender.criticalDamageCount(), 0);

                // Run.
                damageDealer.dealDamage();

                // Verify.
                assert.equal(defender.damageCount(), 1);
                assert.equal(defender.criticalDamageCount(), 3);
            });

            QUnit.test("dealDamage() shields", function(assert)
            {
                // Setup.
                var environment = EnvironmentFactory.createCoreSetEnvironment();
                var hitCount = 2;
                var criticalHitCount = 3;
                var defender = environment.tokens()[2]; // X-Wing
                var evadeCount = 1;
                var damageDealer = new DamageDealer(environment, hitCount, criticalHitCount, defender, evadeCount);
                assert.equal(defender.damageCount(), 0);
                assert.equal(defender.criticalDamageCount(), 0);

                // Run.
                damageDealer.dealDamage();

                // Verify.
                assert.equal(defender.damageCount(), 0);
                assert.equal(defender.criticalDamageCount(), 2);
            });

            QUnit.test("dealDamage() Determination", function(assert)
            {
                // Setup.
                var environment = EnvironmentFactory.createCoreSetEnvironment();
                var hitCount = 2;
                var criticalHitCount = 1;
                var rebelAgent = environment.tokens()[2].agent();
                var defender = new Token(Pilot.LUKE_SKYWALKER, rebelAgent, [UpgradeCard.DETERMINATION]);
                var evadeCount = 0;
                var damageDealer = new DamageDealer(environment, hitCount, criticalHitCount, defender, evadeCount);
                assert.equal(defender.damageCount(), 0);
                assert.equal(defender.criticalDamageCount(), 0);

                // Run.
                damageDealer.dealDamage();

                // Verify.
                assert.equal(defender.damageCount(), 0);
                var criticalDamages = defender.criticalDamages();
                if (criticalDamages.length === 0)
                {
                    assert.equal(defender.criticalDamageCount(), 0);
                }
                else
                {
                    var damage = criticalDamages[0];
                    var trait = DamageCard.properties[damage].trait;
                    LOGGER.debug("trait = " + trait);
                    assert.ok(trait !== DamageCardTrait.PILOT);
                    assert.equal(trait, DamageCardTrait.SHIP);
                    assert.equal(defender.criticalDamageCount(), 1);
                }
            });

            QUnit.test("dealDamage() Chewbacca", function(assert)
            {
                // Setup.
                var environment = EnvironmentFactory.createCoreSetEnvironment();
                var hitCount = 2;
                var criticalHitCount = 3;
                var rebelAgent = environment.tokens()[2].agent();
                var defender = new Token(Pilot.CHEWBACCA, rebelAgent);
                defender.shield().decrease();
                defender.shield().decrease();
                defender.shield().decrease(); // two shields remaining
                var evadeCount = 1;
                var damageDealer = new DamageDealer(environment, hitCount, criticalHitCount, defender, evadeCount);
                assert.equal(defender.damageCount(), 0);
                assert.equal(defender.criticalDamageCount(), 0);

                // Run.
                damageDealer.dealDamage();

                // Verify.
                assert.equal(defender.damageCount(), 2);
                assert.equal(defender.criticalDamageCount(), 0);
            });
        });

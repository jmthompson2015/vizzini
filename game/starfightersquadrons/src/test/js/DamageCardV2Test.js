define(["DamageCardV2", "DamageCardTrait"],
    function(DamageCardV2, DamageCardTrait)
    {
        "use strict";
        QUnit.module("DamageCardV2");

        QUnit
            .test(
                "DamageCardV2 properties Blinded Pilot",
                function(assert)
                {
                    var damage = DamageCardV2.BLINDED_PILOT;
                    var properties = DamageCardV2.properties[damage];
                    assert.equal(properties.name, "Blinded Pilot");
                    assert.equal(properties.trait, DamageCardTrait.PILOT);
                    assert
                        .equal(
                            properties.description,
                            "You cannot perform attacks. After your next opportunity to attack (even if there was no target for an attack), flip this card facedown.");
                    assert.ok(!properties.hasAction);
                    assert.ok(!properties.actionDescription);
                    assert.equal(properties.value, damage);
                });

        QUnit
            .test(
                "DamageCardV2 properties Console Fire",
                function(assert)
                {
                    var damage = DamageCardV2.CONSOLE_FIRE;
                    var properties = DamageCardV2.properties[damage];
                    assert.equal(properties.name, "Console Fire");
                    assert.equal(properties.trait, DamageCardTrait.SHIP);
                    assert
                        .equal(
                            properties.description,
                            "At the start of each Combat phase, roll 1 attack die. On a Hit result, suffer 1 damage.");
                    assert.ok(properties.hasAction);
                    assert.equal(properties.value, damage);
                });

        QUnit.test("keys and values", function(assert)
        {
            // Setup.

            // Run.
            var result = DamageCardV2.values();
            var ownPropertyNames = Object.getOwnPropertyNames(DamageCardV2);

            // Verify.
            ownPropertyNames.forEach(function(key)
            {
                var key2 = DamageCardV2[key];

                if (key !== "properties" && typeof key2 === "string")
                {
                    assert.ok(DamageCardV2.properties[key2], "Missing value for key = " + key);
                }
            });

            result.forEach(function(value)
            {
                var p = ownPropertyNames.filter(function(key)
                {
                    return DamageCardV2[key] === value;
                });

                assert.equal(p.length, 1, "Missing key for value = " + value);
            });
        });

        QUnit.test("DamageCardV2.values()", function(assert)
        {
            var values = DamageCardV2.values();
            assert.equal(values.length, 14);
            assert.ok(!values[-1]);
            assert.equal(values[0], DamageCardV2.BLINDED_PILOT);
            assert.equal(values[13], DamageCardV2.WEAPONS_FAILURE);
            assert.ok(!values[14]);
        });

        QUnit.test("DamageCardV2.createDeck()", function(assert)
        {
            var deck = DamageCardV2.createDeck();
            assert.equal(deck.length, 33);
            assert.ok(!deck[-1]);
            assert.ok(deck[0]);
            assert.ok(deck[32]);
            assert.ok(!deck[33]);

            // Count each damage card type.
            var damageToCount = {};
            var damage;
            for (var i = 0; i < deck.length; i++)
            {
                damage = deck[i];

                if (damageToCount[damage])
                {
                    damageToCount[damage] += 1;
                }
                else
                {
                    damageToCount[damage] = 1;
                }
            }

            // Verify.
            for (damage in damageToCount)
            {
                if (damage === DamageCardV2.DIRECT_HIT)
                {
                    assert.equal(damageToCount[damage], 7);
                }
                else
                {
                    assert.equal(damageToCount[damage], 2);
                }
            }
        });
    });

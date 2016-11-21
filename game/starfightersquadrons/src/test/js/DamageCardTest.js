define(["DamageCard", "DamageCardTrait"],
    function(DamageCard, DamageCardTrait)
    {
        "use strict";
        QUnit.module("DamageCard");

        QUnit.test("DamageCard properties Blinded Pilot", function(assert)
        {
            var damage = DamageCard.BLINDED_PILOT;
            var properties = DamageCard.properties[damage];
            assert.equal(properties.name, "Blinded Pilot");
            assert.equal(properties.trait, DamageCardTrait.PILOT);
            assert.equal(properties.description,
                "The next time you attack, do not roll any attack dice. Then flip this card facedown.");
            assert.ok(!properties.hasAction);
            assert.ok(!properties.actionDescription);
            assert.ok(!properties.actionShipState);
            assert.equal(properties.value, damage);
        });

        QUnit.test("DamageCard properties Console Fire", function(assert)
        {
            var damage = DamageCard.CONSOLE_FIRE;
            var properties = DamageCard.properties[damage];
            assert.equal(properties.name, "Console Fire");
            assert.equal(properties.trait, DamageCardTrait.SHIP);
            assert.equal(properties.description,
                "At the start of each Combat phase, roll 1 attack die. On a Hit result, suffer 1 damage.");
            assert.ok(properties.hasAction);
            assert.equal(properties.actionDescription, "Flip this card facedown.");
            assert.equal(properties.value, damage);
        });

        QUnit.test("keys and values", function(assert)
        {
            // Setup.

            // Run.
            var result = DamageCard.values();
            var ownPropertyNames = Object.getOwnPropertyNames(DamageCard);

            // Verify.
            ownPropertyNames.forEach(function(key)
            {
                var key2 = DamageCard[key];

                if (key !== "properties" && typeof key2 === "string")
                {
                    assert.ok(DamageCard.properties[key2], "Missing value for key = " + key);
                }
            });

            result.forEach(function(value)
            {
                var p = ownPropertyNames.filter(function(key)
                {
                    return DamageCard[key] === value;
                });

                assert.equal(p.length, 1, "Missing key for value = " + value);
            });
        });

        QUnit.test("DamageCard.values()", function(assert)
        {
            var values = DamageCard.values();
            assert.equal(values.length, 14);
            assert.ok(!values[-1]);
            assert.equal(values[0], DamageCard.BLINDED_PILOT);
            assert.equal(values[13], DamageCard.WEAPON_MALFUNCTION);
            assert.ok(!values[14]);
        });

        QUnit.test("DamageCard.createDeck()", function(assert)
        {
            var deck = DamageCard.createDeck();
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
                if (damage === DamageCard.DIRECT_HIT)
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

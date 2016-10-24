define([ "DamageCardTrait" ], function(DamageCardTrait)
{
    "use strict";
    QUnit.module("DamageCardTrait");

    QUnit.test("keys and values", function(assert)
    {
        // Setup.

        // Run.
        var result = DamageCardTrait.values();
        var ownPropertyNames = Object.getOwnPropertyNames(DamageCardTrait);

        // Verify.
        ownPropertyNames.forEach(function(key)
        {
            var key2 = DamageCardTrait[key];
            
            if (key !== "properties" && typeof key2 === "string")
            {
                assert.ok(DamageCardTrait.properties[key2], "Missing value for key = " + key);
            }
        });

        result.forEach(function(value)
        {
            var p = ownPropertyNames.filter(function(key)
            {
                return DamageCardTrait[key] === value;
            });

            assert.equal(p.length, 1, "Missing key for value = " + value);
        });
    });

    QUnit.test("DamageCardTrait.values()", function(assert)
    {
        var values = DamageCardTrait.values();
        assert.equal(values.length, 2);
        assert.equal(values[0], "pilot");
        assert.equal(values[1], "ship");
    });
});

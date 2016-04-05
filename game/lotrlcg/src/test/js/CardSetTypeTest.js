define([ "CardSetType" ], function(CardSetType)
{
    "use strict";
    QUnit.module("CardSetType");

    QUnit.test("CardSetType properties Core", function(assert)
    {
        var type = CardSetType.CORE;
        var properties = CardSetType.properties[type];
        assert.equal(properties.name, "Core");
        assert.equal(properties.value, "core");
    });

    QUnit.test("keys and values", function(assert)
    {
        // Setup.

        // Run.
        var result = CardSetType.values();
        var ownPropertyNames = Object.getOwnPropertyNames(CardSetType);

        // Verify.
        ownPropertyNames.forEach(function(key)
        {
            var key2 = CardSetType[key];

            if (key !== "properties" && typeof key2 === "string")
            {
                assert.ok(CardSetType.properties[key2], "Missing value for key = " + key);
            }
        });

        result.forEach(function(value)
        {
            var p = ownPropertyNames.filter(function(key)
            {
                return CardSetType[key] === value;
            });

            assert.equal(p.length, 1, "Missing key for value = " + value);
        });
    });

    QUnit.test("CardSetType.values()", function(assert)
    {
        // Run.
        var result = CardSetType.values();

        // Verify.
        assert.ok(result);
        assert.equal(result.length, 4);
        var i = 0;
        assert.equal(result[i++], CardSetType.ADVENTURE_PACK);
        assert.equal(result[i++], CardSetType.CORE);
        assert.equal(result[i++], CardSetType.DELUXE);
        assert.equal(result[i++], CardSetType.SAGA);
    });
});

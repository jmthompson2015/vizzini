define([ "UpgradeType" ], function(UpgradeType)
{
    "use strict";
    QUnit.module("UpgradeType");

    QUnit.test("UpgradeType", function(assert)
    {
        var properties = Object.getOwnPropertyNames(UpgradeType);
        var values = UpgradeType.values();
        assert.equal(properties.length - 1 - // properties
        1, // values
        values.length);
    });

    QUnit.test("UpgradeType properties Astromech", function(assert)
    {
        var type = UpgradeType.ASTROMECH;
        var properties = UpgradeType.properties[type];
        assert.equal(properties.name, "Astromech");
        assert.equal(properties.value, "astromech");
    });

    QUnit.test("UpgradeType.values()", function(assert)
    {
        var result = UpgradeType.values();
        assert.ok(result);
        assert.equal(result.length, 17);
        assert.equal(result[0], UpgradeType.ASTROMECH);
        assert.equal(result[16], UpgradeType.TURRET);
    });
});

define([ "UpgradeHeader" ], function(UpgradeHeader)
{
    "use strict";
    QUnit.module("UpgradeHeader");

    QUnit.test("UpgradeHeader", function(assert)
    {
        var properties = Object.getOwnPropertyNames(UpgradeHeader);
        var values = UpgradeHeader.values();
        assert.equal(properties.length - 1 - // properties
        1, // values
        values.length);
    });

    QUnit.test("UpgradeHeader properties Attack (Focus)", function(assert)
    {
        var type = UpgradeHeader.ATTACK_FOCUS;
        var properties = UpgradeHeader.properties[type];
        assert.equal(properties.name, "Attack (Focus)");
        assert.equal(properties.value, "attackFocus");
    });

    QUnit.test("UpgradeHeader.values()", function(assert)
    {
        var result = UpgradeHeader.values();
        assert.ok(result);
        assert.equal(result.length, 5);
        var i=0;
        assert.equal(result[i++], UpgradeHeader.ACTION);
        assert.equal(result[i++], UpgradeHeader.ATTACK);
        assert.equal(result[i++], UpgradeHeader.ATTACK_ENERGY);
        assert.equal(result[i++], UpgradeHeader.ATTACK_FOCUS);
        assert.equal(result[i++], UpgradeHeader.ATTACK_TARGET_LOCK);
    });
});

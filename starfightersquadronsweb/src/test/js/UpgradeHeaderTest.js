define([ "UpgradeHeader" ], function(UpgradeHeader)
{
    QUnit.module("UpgradeHeader");
    
    QUnit.test("UpgradeHeader", function(assert)
    {
        var properties = Object.getOwnPropertyNames(UpgradeHeader);
        var values = UpgradeHeader.values();
        assert.equal(properties.length - 1 // properties
        - 1, // values
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
        assert.equal(result.length, 4);
        assert.equal(result[0], UpgradeHeader.ACTION);
        assert.equal(result[1], UpgradeHeader.ATTACK);
        assert.equal(result[2], UpgradeHeader.ATTACK_FOCUS);
        assert.equal(result[3], UpgradeHeader.ATTACK_TARGET_LOCK);
    });
});

define([ "ShipBase" ], function(ShipBase)
{
    QUnit.module("ShipBase");

    QUnit.test("ShipBase properties Large", function(assert)
    {
        var shipBase = ShipBase.LARGE;
        var properties = ShipBase.properties[shipBase];
        assert.equal(properties.width, 80);
        assert.equal(properties.height, 80);
    });

    QUnit.test("ShipBase properties Standard", function(assert)
    {
        var shipBase = ShipBase.STANDARD;
        var properties = ShipBase.properties[shipBase];
        assert.equal(properties.width, 40);
        assert.equal(properties.height, 40);
    });
});

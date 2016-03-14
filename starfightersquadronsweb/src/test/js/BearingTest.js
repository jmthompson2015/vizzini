define([ "Bearing" ], function(Bearing)
{
    "use strict";
    QUnit.module("Bearing");

    QUnit.test("Bearing properties Straight", function(assert)
    {
        var bearing = Bearing.STRAIGHT;
        var properties = Bearing.properties[bearing];
        assert.equal(properties.name, "Straight");
        assert.equal(properties.headingChange, 0);
        assert.ok(!properties.isBank);
        assert.ok(!properties.isTurn);
        assert.equal(properties.value, bearing);
    });

    QUnit.test("Bearing properties Huge Bank Left", function(assert)
    {
        var bearing = Bearing.HUGE_BANK_LEFT;
        var properties = Bearing.properties[bearing];
        assert.equal(properties.name, "Huge Bank Left");
        assert.equal(properties.headingChange, -30);
        assert.ok(properties.isBank);
        assert.ok(!properties.isTurn);
        assert.equal(properties.value, bearing);
    });

    QUnit.test("isBank()", function(assert)
    {
        assert.ok(!Bearing.properties[Bearing.TURN_LEFT].isBank);
        assert.ok(Bearing.properties[Bearing.BANK_LEFT].isBank);
        assert.ok(!Bearing.properties[Bearing.STRAIGHT].isBank);
        assert.ok(Bearing.properties[Bearing.BANK_RIGHT].isBank);
        assert.ok(!Bearing.properties[Bearing.TURN_RIGHT].isBank);
        assert.ok(!Bearing.properties[Bearing.KOIOGRAN_TURN].isBank);
        assert.ok(!Bearing.properties[Bearing.BARREL_ROLL_LEFT].isBank);
        assert.ok(!Bearing.properties[Bearing.BARREL_ROLL_RIGHT].isBank);
        assert.ok(!Bearing.properties[Bearing.SEGNORS_LOOP_LEFT].isBank);
        assert.ok(!Bearing.properties[Bearing.SEGNORS_LOOP_RIGHT].isBank);
    });

    QUnit.test("isTurn()", function(assert)
    {
        assert.ok(Bearing.properties[Bearing.TURN_LEFT].isTurn);
        assert.ok(!Bearing.properties[Bearing.BANK_LEFT].isTurn);
        assert.ok(!Bearing.properties[Bearing.STRAIGHT].isTurn);
        assert.ok(!Bearing.properties[Bearing.BANK_RIGHT].isTurn);
        assert.ok(Bearing.properties[Bearing.TURN_RIGHT].isTurn);
        assert.ok(!Bearing.properties[Bearing.KOIOGRAN_TURN].isTurn);
        assert.ok(!Bearing.properties[Bearing.BARREL_ROLL_LEFT].isTurn);
        assert.ok(!Bearing.properties[Bearing.BARREL_ROLL_RIGHT].isTurn);
        assert.ok(!Bearing.properties[Bearing.SEGNORS_LOOP_LEFT].isTurn);
        assert.ok(!Bearing.properties[Bearing.SEGNORS_LOOP_RIGHT].isTurn);
    });

    QUnit.test("values()", function(assert)
    {
        // Run.
        var result = Bearing.values();

        // Verify.
        assert.ok(result);
        assert.equal(result.length, 14);
        var i = 0;
        assert.equal(result[i++], Bearing.HUGE_BANK_LEFT);
        assert.equal(result[i++], Bearing.TURN_LEFT);
        assert.equal(result[i++], Bearing.BANK_LEFT);
        assert.equal(result[i++], Bearing.STRAIGHT);
        assert.equal(result[i++], Bearing.BANK_RIGHT);
        assert.equal(result[i++], Bearing.TURN_RIGHT);
        assert.equal(result[i++], Bearing.HUGE_BANK_RIGHT);
        assert.equal(result[i++], Bearing.BARREL_ROLL_LEFT);
        assert.equal(result[i++], Bearing.SEGNORS_LOOP_LEFT);
        assert.equal(result[i++], Bearing.TALLON_ROLL_LEFT);
        assert.equal(result[i++], Bearing.KOIOGRAN_TURN);
        assert.equal(result[i++], Bearing.BARREL_ROLL_RIGHT);
        assert.equal(result[i++], Bearing.SEGNORS_LOOP_RIGHT);
        assert.equal(result[i++], Bearing.TALLON_ROLL_RIGHT);
    });
});

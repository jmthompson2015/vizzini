define([ "Team" ], function(Team)
{
    "use strict";
    QUnit.module("Team");

    QUnit.test("Team properties Imperial", function(assert)
    {
        var team = Team.IMPERIAL;
        var properties = Team.properties[team];
        assert.equal(properties.name, "Imperial");
        assert.equal(properties.description, "Imperial team");
        assert.equal(properties.value, "imperial");
    });

    QUnit.test("Team properties Rebel", function(assert)
    {
        var team = Team.REBEL;
        var properties = Team.properties[team];
        assert.equal(properties.name, "Rebel");
        assert.equal(properties.description, "Rebel team");
        assert.equal(properties.value, "rebel");
    });

    QUnit.test("Team properties Scum", function(assert)
    {
        var team = Team.SCUM;
        var properties = Team.properties[team];
        assert.equal(properties.name, "Scum & Villainy");
        assert.equal(properties.description, "Scum & Villainy team");
        assert.equal(properties.value, "scum");
    });

    QUnit.test("Team.values()", function(assert)
    {
        var result = Team.values();
        assert.ok(result);
        assert.equal(result.length, 5);
        var i = 0;
        assert.equal(result[i++], Team.FIRST_ORDER);
        assert.equal(result[i++], Team.IMPERIAL);
        assert.equal(result[i++], Team.REBEL);
        assert.equal(result[i++], Team.RESISTANCE);
        assert.equal(result[i++], Team.SCUM);
    });
});

define([ "Team" ], function(Team)
{
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
        assert.ok(Team.values);
        assert.equal(Team.values.length, 3);
        assert.equal(Team.values[0], Team.IMPERIAL);
        assert.equal(Team.values[1], Team.REBEL);
        assert.equal(Team.values[2], Team.SCUM);
    });
});

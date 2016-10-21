define(["pilotstats/InitialState"], function(InitialState)
{
    "use strict";
    QUnit.module("InitialState");

    QUnit.test("InitialState()", function(assert)
    {
        // Run.
        var result = new InitialState();

        // Verify.
        assert.ok(result.filters);
        assert.equal(Object.getOwnPropertyNames(result.filters).length, 14);
        assert.ok(result.pilotData);
        assert.equal(result.pilotData.length, 186);
        assert.ok(result.filteredPilotData);
        assert.equal(result.filteredPilotData.length, 186);
    });
});

define([ "Difficulty" ], function(Difficulty)
{
    QUnit.module("Difficulty");

    QUnit.test("values()", function(assert)
    {
        // Run.
        var result = Difficulty.values();

        // Verify.
        assert.ok(result);
        assert.equal(result.length, 3);
        assert.equal(result[0], Difficulty.EASY);
        assert.equal(result[1], Difficulty.STANDARD);
        assert.equal(result[2], Difficulty.HARD);
    });
});

define(["SudokuWiki"], function(SudokuWiki)
{
    "use strict";
    QUnit.module("SudokuWiki");

    QUnit.test("SudokuWiki properties Unsolvable #28", function(assert)
    {
        var key = SudokuWiki.UNSOLVABLE_28;
        var properties = SudokuWiki.properties[key];
        assert.equal(properties.name, "Unsolvable #28");
        assert.equal(properties.grid, "6....894.9....61...7..4....2..61..........2...89..2.......6...5.......3.8....16..");
        assert.equal(properties.value, key);
    });

    QUnit.test("keys and values", function(assert)
    {
        // Setup.

        // Run.
        var result = SudokuWiki.values();
        var ownPropertyNames = Object.getOwnPropertyNames(SudokuWiki);

        // Verify.
        ownPropertyNames.forEach(function(key)
        {
            var key2 = SudokuWiki[key];

            if (key !== "properties" && typeof key2 === "string")
            {
                assert.ok(SudokuWiki.properties[key2], "Missing value for key = " + key);
            }
        });

        result.forEach(function(value)
        {
            var p = ownPropertyNames.filter(function(key)
            {
                return SudokuWiki[key] === value;
            });

            assert.equal(p.length, 1, "Missing key for value = " + value);
        });
    });

    QUnit.test("values()", function(assert)
    {
        // Run.
        var result = SudokuWiki.values();

        // Verify.
        assert.ok(result);
        var length = 4;
        assert.equal(result.length, length);
        assert.equal(result[0], "escargot");
        assert.equal(result[length - 1], "unsolvable28");

        var properties = Object.getOwnPropertyNames(SudokuWiki);
        var count = properties.length - 1 - // properties
            1; // values
        assert.equal(result.length, count);
    });
});

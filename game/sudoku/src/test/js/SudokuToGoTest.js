define(["SudokuToGo"], function(SudokuToGo)
{
    "use strict";
    QUnit.module("SudokuToGo");

    QUnit.test("SudokuToGo properties Easy 1", function(assert)
    {
        var key = SudokuToGo.EASY_1;
        var properties = SudokuToGo.properties[key];
        assert.equal(properties.name, "Easy 1");
        assert.equal(properties.grid, "..6..8.74..5...1.99.74.16.5.3.1...46.........16...9.2.2.36.54.87.4...9..68.9..3..");
        assert.equal(properties.value, key);
    });

    QUnit.test("keys and values", function(assert)
    {
        // Setup.

        // Run.
        var result = SudokuToGo.values();
        var ownPropertyNames = Object.getOwnPropertyNames(SudokuToGo);

        // Verify.
        ownPropertyNames.forEach(function(key)
        {
            var key2 = SudokuToGo[key];

            if (key !== "properties" && typeof key2 === "string")
            {
                assert.ok(SudokuToGo.properties[key2], "Missing value for key = " + key);
            }
        });

        result.forEach(function(value)
        {
            var p = ownPropertyNames.filter(function(key)
            {
                return SudokuToGo[key] === value;
            });

            assert.equal(p.length, 1, "Missing key for value = " + value);
        });
    });

    QUnit.test("values()", function(assert)
    {
        // Run.
        var result = SudokuToGo.values();

        // Verify.
        assert.ok(result);
        var length = 8;
        assert.equal(result.length, length);
        assert.equal(result[0], "easy1");
        assert.equal(result[length - 1], "diabolical87");

        var properties = Object.getOwnPropertyNames(SudokuToGo);
        var count = properties.length - 1 - // properties
            1; // values
        assert.equal(result.length, count);
    });
});

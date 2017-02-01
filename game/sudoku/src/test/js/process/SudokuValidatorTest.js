define(["GridFactory", "SudokuToGo", "Unit", "process/SudokuValidator"],
    function(GridFactory, SudokuToGo, Unit, SudokuValidator)
    {
        "use strict";
        QUnit.module("SudokuValidator");

        QUnit.test("countValidUnits() blocks", function(assert)
        {
            // Setup.
            var grid = "123......" + // row A
                "456......" + // row B
                "789......" + // row C
                "...231..." + // row D
                "...564..." + // row E
                "...897..." + // row F
                "........." + // row G
                "........." + // row H
                "........."; // row I
            var unit = new Unit(Math.sqrt(grid.length));
            var units = unit.BLOCKS;

            // Run / Verify.
            assert.equal(SudokuValidator.countValidUnits(grid, units), 2);
        });

        QUnit.test("countValidUnits() columns", function(assert)
        {
            // Setup.
            var grid = "1..2....." + // row A
                "2..3....." + // row B
                "3..4....." + // row C
                "4..5....." + // row D
                "5..6....." + // row E
                "6..7....." + // row F
                "7..8....." + // row G
                "8..9....." + // row H
                "9..1....."; // row I
            var unit = new Unit(Math.sqrt(grid.length));
            var units = unit.COLUMNS;

            // Run / Verify.
            assert.equal(SudokuValidator.countValidUnits(grid, units), 2);
        });

        QUnit.test("countValidUnits() rows", function(assert)
        {
            // Setup.
            var grid = "123456789" + // row A
                "........." + // row B
                "........." + // row C
                "234567891" + // row D
                "........." + // row E
                "........." + // row F
                "........." + // row G
                "........." + // row H
                "........."; // row I
            var unit = new Unit(Math.sqrt(grid.length));
            var units = unit.ROWS;

            // Run / Verify.
            assert.equal(SudokuValidator.countValidUnits(grid, units), 2);
        });

        QUnit.test("isUnitValid() block", function(assert)
        {
            // Setup.
            var grid = "123......" + // row A
                "456......" + // row B
                "789......" + // row C
                "........." + // row D
                "........." + // row E
                "........." + // row F
                "........." + // row G
                "........." + // row H
                "........."; // row I
            var unit = new Unit(Math.sqrt(grid.length));

            // Run / Verify.
            assert.ok(SudokuValidator.isUnitValid(grid, unit.BLOCKS[0]));

            for (var i = 1; i < 9; i++)
            {
                assert.ok(!SudokuValidator.isUnitValid(grid, unit.BLOCKS[i]));
            }
        });

        QUnit.test("isUnitValid() column", function(assert)
        {
            // Setup.
            var grid = "1........" + // row A
                "2........" + // row B
                "3........" + // row C
                "4........" + // row D
                "5........" + // row E
                "6........" + // row F
                "7........" + // row G
                "8........" + // row H
                "9........"; // row I
            var unit = new Unit(Math.sqrt(grid.length));

            // Run / Verify.
            assert.ok(SudokuValidator.isUnitValid(grid, unit.COLUMNS[0]));

            for (var i = 1; i < 9; i++)
            {
                assert.ok(!SudokuValidator.isUnitValid(grid, unit.COLUMNS[i]));
            }
        });

        QUnit.test("isUnitValid() row", function(assert)
        {
            // Setup.
            var grid = "123456789" + // row A
                "........." + // row B
                "........." + // row C
                "........." + // row D
                "........." + // row E
                "........." + // row F
                "........." + // row G
                "........." + // row H
                "........."; // row I
            var unit = new Unit(Math.sqrt(grid.length));

            // Run / Verify.
            assert.ok(SudokuValidator.isUnitValid(grid, unit.ROWS[0]));

            for (var i = 1; i < 9; i++)
            {
                assert.ok(!SudokuValidator.isUnitValid(grid, unit.ROWS[i]));
            }
        });

        QUnit.test("isUnitsValid() blocks", function(assert)
        {
            // Setup.
            var grid = GridFactory.createDefaultSolution();
            var unit = new Unit(Math.sqrt(grid.length));
            var units = unit.BLOCKS;

            // Run / Verify.
            assert.ok(SudokuValidator.isUnitsValid(grid, units));
        });

        QUnit.test("isUnitsValid() columns", function(assert)
        {
            // Setup.
            var grid = GridFactory.createDefaultSolution();
            var unit = new Unit(Math.sqrt(grid.length));
            var units = unit.COLUMNS;

            // Run / Verify.
            assert.ok(SudokuValidator.isUnitsValid(grid, units));
        });

        QUnit.test("isUnitsValid() rows", function(assert)
        {
            // Setup.
            var grid = GridFactory.createDefaultSolution();
            var unit = new Unit(Math.sqrt(grid.length));
            var units = unit.ROWS;

            // Run / Verify.
            assert.ok(SudokuValidator.isUnitsValid(grid, units));
        });

        QUnit.test("isValid()", function(assert)
        {
            assert.ok(SudokuValidator.isValid(GridFactory.createDefaultSolution()));
            assert.ok(SudokuValidator.isValid(SudokuToGo.createEasy1Solution()));
            assert.ok(SudokuValidator.isValid(SudokuToGo.createDiabolical86Solution()));
        });
    });

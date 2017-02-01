define(["GridFactory", "Unit", "process/SudokuGenerator", "process/SudokuValidator"],
    function(GridFactory, Unit, SudokuGenerator, SudokuValidator)
    {
        "use strict";
        QUnit.module("SudokuGenerator");

        QUnit.test("generate()", function(assert)
        {
            // Setup.

            // Run.
            var result = SudokuGenerator.generate();

            // Verify.
            assert.ok(result);
            // LOGGER.info("result = " + result);
            assert.ok(SudokuValidator.isValid(result));
            // assert.equal(result, "");
        });

        QUnit.test("swapUnits() column", function(assert)
        {
            // Setup.
            var grid = GridFactory.createDefaultSolution();
            var unit = new Unit();
            var unit0 = unit.COLUMNS[0];
            var unit1 = unit.COLUMNS[1];

            // Run.
            var result = SudokuGenerator.swapUnits(grid, unit0, unit1);

            // Verify.
            assert.ok(result);
            // LOGGER.info("grid   = " + grid);
            // LOGGER.info("result = " + result);
            assert.ok(SudokuValidator.isValid(result));
            assert.equal(result, "213456789546789123879123456324567891657891234981234567435678912768912345192345678");
        });

        QUnit.test("swapUnits() row", function(assert)
        {
            // Setup.
            var grid = GridFactory.createDefaultSolution();
            var unit = new Unit();
            var unit0 = unit.ROWS[0];
            var unit1 = unit.ROWS[1];

            // Run.
            var result = SudokuGenerator.swapUnits(grid, unit0, unit1);

            // Verify.
            assert.ok(result);
            // LOGGER.info("grid   = " + grid);
            // LOGGER.info("result = " + result);
            assert.ok(SudokuValidator.isValid(result));
            assert.equal(result, "456789123123456789789123456234567891567891234891234567345678912678912345912345678");
        });
    });

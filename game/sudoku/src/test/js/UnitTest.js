define(["Unit"], function(Unit)
{
    "use strict";
    QUnit.module("Unit");

    QUnit.test("cellNameToBlock()", function(assert)
    {
        // Setup.
        var unit = new Unit();

        // Run / Verify.
        assert.equal(unit.cellNameToBlock("A1"), 0);
        assert.equal(unit.cellNameToBlock("A9"), 2);
        assert.equal(unit.cellNameToBlock("B2"), 0);
        assert.equal(unit.cellNameToBlock("B5"), 1);
        assert.equal(unit.cellNameToBlock("C3"), 0);
        assert.equal(unit.cellNameToBlock("D4"), 4);
        assert.equal(unit.cellNameToBlock("E5"), 4);
        assert.equal(unit.cellNameToBlock("F6"), 4);
        assert.equal(unit.cellNameToBlock("G7"), 8);
        assert.equal(unit.cellNameToBlock("H5"), 7);
        assert.equal(unit.cellNameToBlock("H8"), 8);
        assert.equal(unit.cellNameToBlock("J1"), 6);
        assert.equal(unit.cellNameToBlock("J9"), 8);
    });

    QUnit.test("cellNameToColumn()", function(assert)
    {
        // Setup.
        var unit = new Unit();

        // Run / Verify.
        assert.equal(unit.cellNameToColumn("A1"), 0);
        assert.equal(unit.cellNameToColumn("A2"), 1);
        assert.equal(unit.cellNameToColumn("B1"), 0);
        assert.equal(unit.cellNameToColumn("J9"), 8);
    });

    QUnit.test("cellNameToIndex()", function(assert)
    {
        // Setup.
        var unit = new Unit();

        // Run / Verify.
        assert.equal(unit.cellNameToIndex("A1"), 0);
        assert.equal(unit.cellNameToIndex("A2"), 1);
        assert.equal(unit.cellNameToIndex("B1"), 9);
        assert.equal(unit.cellNameToIndex("J9"), 80);
    });

    QUnit.test("cellNameToRow()", function(assert)
    {
        // Setup.
        var unit = new Unit();

        // Run / Verify.
        assert.equal(unit.cellNameToRow("A1"), 0);
        assert.equal(unit.cellNameToRow("A2"), 0);
        assert.equal(unit.cellNameToRow("B1"), 1);
        assert.equal(unit.cellNameToRow("J9"), 8);
    });

    QUnit.test("coordinatesToIndex()", function(assert)
    {
        // Setup.
        var unit = new Unit();

        // Run / Verify.
        assert.equal(unit.coordinatesToIndex(0, 0), 0);
        assert.equal(unit.coordinatesToIndex(1, 0), 1);
        assert.equal(unit.coordinatesToIndex(8, 8), 80);
    });

    QUnit.test("getBlockPeers() A1", function(assert)
    {
        // Setup.
        var unit = new Unit();

        // Run.
        var result = unit.getBlockPeers(0);

        // Verify.
        assert.ok(result);
        assert.ok(Array.isArray(result));
        assert.equal(result.length, 8);
        var i = 0;
        assert.equal(result[i++], 1);
        assert.equal(result[i++], 2);
        assert.equal(result[i++], 9);
        assert.equal(result[i++], 10);
        assert.equal(result[i++], 11);
        assert.equal(result[i++], 18);
        assert.equal(result[i++], 19);
        assert.equal(result[i++], 20);
    });

    QUnit.test("getColumnPeers() A1", function(assert)
    {
        // Setup.
        var unit = new Unit();

        // Run.
        var result = unit.getColumnPeers(0);

        // Verify.
        assert.ok(result);
        assert.ok(Array.isArray(result));
        assert.equal(result.length, 8);

        for (var i = 1; i < unit.N; i++)
        {
            assert.equal(result[i - 1], 9 * i);
        }
    });

    QUnit.test("getPeers() A1", function(assert)
    {
        // Setup.
        var unit = new Unit();

        // Run.
        var result = unit.getPeers(0);

        // Verify.
        assert.ok(result);
        assert.ok(Array.isArray(result));
        assert.equal(result.length, 20);
        var i = 0;
        assert.equal(result[i++], 1);
        assert.equal(result[i++], 2);
        assert.equal(result[i++], 3);
        assert.equal(result[i++], 4);
        assert.equal(result[i++], 5);
        assert.equal(result[i++], 6);
        assert.equal(result[i++], 7);
        assert.equal(result[i++], 8);
        assert.equal(result[i++], 9);
        assert.equal(result[i++], 10);
        assert.equal(result[i++], 11);
        assert.equal(result[i++], 18);
        assert.equal(result[i++], 19);
        assert.equal(result[i++], 20);
        assert.equal(result[i++], 27);
        assert.equal(result[i++], 36);
        assert.equal(result[i++], 45);
        assert.equal(result[i++], 54);
        assert.equal(result[i++], 63);
        assert.equal(result[i++], 72);
    });

    QUnit.test("getPeers() E5", function(assert)
    {
        // Setup.
        var unit = new Unit();

        // Run.
        var result = unit.getPeers(40);

        // Verify.
        assert.ok(result);
        assert.ok(Array.isArray(result));
        assert.equal(result.length, 20);
        var i = 0;
        assert.equal(result[i++], 4);
        assert.equal(result[i++], 13);
        assert.equal(result[i++], 22);
        assert.equal(result[i++], 30);
        assert.equal(result[i++], 31);
        assert.equal(result[i++], 32);
        assert.equal(result[i++], 36);
        assert.equal(result[i++], 37);
        assert.equal(result[i++], 38);
        assert.equal(result[i++], 39);
        assert.equal(result[i++], 41);
        assert.equal(result[i++], 42);
        assert.equal(result[i++], 43);
        assert.equal(result[i++], 44);
        assert.equal(result[i++], 48);
        assert.equal(result[i++], 49);
        assert.equal(result[i++], 50);
        assert.equal(result[i++], 58);
        assert.equal(result[i++], 67);
        assert.equal(result[i++], 76);
    });

    QUnit.test("getRowPeers() A1", function(assert)
    {
        // Setup.
        var unit = new Unit();

        // Run.
        var result = unit.getRowPeers(0);

        // Verify.
        assert.ok(result);
        assert.ok(Array.isArray(result));
        assert.equal(result.length, 8);

        for (var i = 1; i < unit.N; i++)
        {
            assert.equal(result[i - 1], i);
        }
    });

    QUnit.test("indexToBlock()", function(assert)
    {
        // Setup.
        var unit = new Unit();

        // Run / Verify.
        assert.equal(unit.indexToBlock(0), 0);
        assert.equal(unit.indexToBlock(1), 0);
        assert.equal(unit.indexToBlock(3), 1);
        assert.equal(unit.indexToBlock(27), 3);
        assert.equal(unit.indexToBlock(47), 3);
        assert.equal(unit.indexToBlock(30), 4);
        assert.equal(unit.indexToBlock(50), 4);
        assert.equal(unit.indexToBlock(33), 5);
        assert.equal(unit.indexToBlock(53), 5);
        assert.equal(unit.indexToBlock(80), 8);
    });

    QUnit.test("indexToCellName()", function(assert)
    {
        // Setup.
        var unit = new Unit();

        // Run / Verify.
        assert.equal(unit.indexToCellName(0), "A1");
        assert.equal(unit.indexToCellName(1), "A2");
        assert.equal(unit.indexToCellName(79), "J8");
        assert.equal(unit.indexToCellName(80), "J9");
    });

    QUnit.test("indexToColumn()", function(assert)
    {
        // Setup.
        var unit = new Unit();

        // Run / Verify.
        assert.equal(unit.indexToColumn(0), 0);
        assert.equal(unit.indexToColumn(1), 1);
        assert.equal(unit.indexToColumn(80), 8);
    });

    QUnit.test("indexToRow()", function(assert)
    {
        // Setup.
        var unit = new Unit();

        // Run / Verify.
        assert.equal(unit.indexToRow(0), 0);
        assert.equal(unit.indexToRow(1), 0);
        assert.equal(unit.indexToColumn(80), 8);
    });

    QUnit.test("verify rows, columns, and blocks", function(assert)
    {
        // Setup.
        var unit = new Unit();

        // Run.

        // Verify.
        assert.equal(unit.ROWS[0][0], 0);
        assert.equal(unit.ROWS[0][8], 8);
        assert.equal(unit.ROWS[8][0], 72);
        assert.equal(unit.ROWS[8][8], 80);
        validateLengths(unit.ROWS);

        assert.equal(unit.COLUMNS[0][0], 0, "column 0, 0");
        assert.equal(unit.COLUMNS[0][8], 72, "column 0, 8");
        assert.equal(unit.COLUMNS[8][0], 8, "column 8, 0");
        assert.equal(unit.COLUMNS[8][8], 80, "column 8, 8");
        validateLengths(unit.COLUMNS);

        assert.equal(unit.BLOCKS[0][0], 0, "block 0, 0");
        assert.equal(unit.BLOCKS[0][8], 20, "block 0, 8");
        assert.equal(unit.BLOCKS[1][0], 3, "block 1, 0");
        assert.equal(unit.BLOCKS[1][8], 23, "block 1, 8");
        assert.equal(unit.BLOCKS[2][0], 6, "block 2, 0");
        assert.equal(unit.BLOCKS[2][8], 26, "block 2, 8");
        assert.equal(unit.BLOCKS[4][0], 30, "block 4, 0");
        assert.equal(unit.BLOCKS[4][8], 50, "block 4, 8");
        assert.equal(unit.BLOCKS[6][8], 74, "block 6, 8");
        assert.equal(unit.BLOCKS[8][0], 60, "block 8, 0");
        assert.equal(unit.BLOCKS[8][8], 80, "block 8, 8");
        validateLengths(unit.BLOCKS);

        function validateLengths(unit)
        {
            assert.equal(unit.length, 9);

            for (var i = 0; i < 9; i++)
            {
                assert.equal(unit[i].length, 9);
            }
        }
    });
});

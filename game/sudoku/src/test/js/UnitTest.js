define(["Unit"], function(Unit)
{
    "use strict";
    QUnit.module("Unit");

    QUnit.test("cellNameToBlock()", function(assert)
    {
        assert.equal(Unit.cellNameToBlock("A1"), 0);
        assert.equal(Unit.cellNameToBlock("A9"), 2);
        assert.equal(Unit.cellNameToBlock("B2"), 0);
        assert.equal(Unit.cellNameToBlock("B5"), 1);
        assert.equal(Unit.cellNameToBlock("C3"), 0);
        assert.equal(Unit.cellNameToBlock("D4"), 4);
        assert.equal(Unit.cellNameToBlock("E5"), 4);
        assert.equal(Unit.cellNameToBlock("F6"), 4);
        assert.equal(Unit.cellNameToBlock("G7"), 8);
        assert.equal(Unit.cellNameToBlock("H5"), 7);
        assert.equal(Unit.cellNameToBlock("H8"), 8);
        assert.equal(Unit.cellNameToBlock("J1"), 6);
        assert.equal(Unit.cellNameToBlock("J9"), 8);
    });

    QUnit.test("cellNameToColumn()", function(assert)
    {
        assert.equal(Unit.cellNameToColumn("A1"), 0);
        assert.equal(Unit.cellNameToColumn("A2"), 1);
        assert.equal(Unit.cellNameToColumn("B1"), 0);
        assert.equal(Unit.cellNameToColumn("J9"), 8);
    });

    QUnit.test("cellNameToIndex()", function(assert)
    {
        assert.equal(Unit.cellNameToIndex("A1"), 0);
        assert.equal(Unit.cellNameToIndex("A2"), 1);
        assert.equal(Unit.cellNameToIndex("B1"), 9);
        assert.equal(Unit.cellNameToIndex("J9"), 80);
    });

    QUnit.test("cellNameToRow()", function(assert)
    {
        assert.equal(Unit.cellNameToRow("A1"), 0);
        assert.equal(Unit.cellNameToRow("A2"), 0);
        assert.equal(Unit.cellNameToRow("B1"), 1);
        assert.equal(Unit.cellNameToRow("J9"), 8);
    });

    QUnit.test("coordinatesToIndex()", function(assert)
    {
        assert.equal(Unit.coordinatesToIndex(0, 0), 0);
        assert.equal(Unit.coordinatesToIndex(1, 0), 1);
        assert.equal(Unit.coordinatesToIndex(8, 8), 80);
    });

    QUnit.test("getBlockPeers() A1", function(assert)
    {
        // Run.
        var result = Unit.getBlockPeers(0);

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
        // Run.
        var result = Unit.getColumnPeers(0);

        // Verify.
        assert.ok(result);
        assert.ok(Array.isArray(result));
        assert.equal(result.length, 8);

        for (var i = 1; i < Unit.N; i++)
        {
            assert.equal(result[i - 1], 9 * i);
        }
    });

    QUnit.test("getPeers() A1", function(assert)
    {
        // Run.
        var result = Unit.getPeers(0);

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
        // Run.
        var result = Unit.getPeers(40);

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
        // Run.
        var result = Unit.getRowPeers(0);

        // Verify.
        assert.ok(result);
        assert.ok(Array.isArray(result));
        assert.equal(result.length, 8);

        for (var i = 1; i < Unit.N; i++)
        {
            assert.equal(result[i - 1], i);
        }
    });

    QUnit.test("indexToBlock()", function(assert)
    {
        assert.equal(Unit.indexToBlock(0), 0);
        assert.equal(Unit.indexToBlock(1), 0);
        assert.equal(Unit.indexToBlock(3), 1);
        assert.equal(Unit.indexToBlock(27), 3);
        assert.equal(Unit.indexToBlock(47), 3);
        assert.equal(Unit.indexToBlock(30), 4);
        assert.equal(Unit.indexToBlock(50), 4);
        assert.equal(Unit.indexToBlock(33), 5);
        assert.equal(Unit.indexToBlock(53), 5);
        assert.equal(Unit.indexToBlock(80), 8);
    });

    QUnit.test("indexToCellName()", function(assert)
    {
        assert.equal(Unit.indexToCellName(0), "A1");
        assert.equal(Unit.indexToCellName(1), "A2");
        assert.equal(Unit.indexToCellName(79), "J8");
        assert.equal(Unit.indexToCellName(80), "J9");
    });

    QUnit.test("indexToColumn()", function(assert)
    {
        assert.equal(Unit.indexToColumn(0), 0);
        assert.equal(Unit.indexToColumn(1), 1);
        assert.equal(Unit.indexToColumn(80), 8);
    });

    QUnit.test("indexToRow()", function(assert)
    {
        assert.equal(Unit.indexToRow(0), 0);
        assert.equal(Unit.indexToRow(1), 0);
        assert.equal(Unit.indexToColumn(80), 8);
    });

    QUnit.test("verify rows, columns, and blocks", function(assert)
    {
        // Setup.

        // Run.

        // Verify.
        assert.equal(Unit.ROWS[0][0], 0);
        assert.equal(Unit.ROWS[0][8], 8);
        assert.equal(Unit.ROWS[8][0], 72);
        assert.equal(Unit.ROWS[8][8], 80);
        validateLengths(Unit.ROWS);

        assert.equal(Unit.COLUMNS[0][0], 0, "column 0, 0");
        assert.equal(Unit.COLUMNS[0][8], 72, "column 0, 8");
        assert.equal(Unit.COLUMNS[8][0], 8, "column 8, 0");
        assert.equal(Unit.COLUMNS[8][8], 80, "column 8, 8");
        validateLengths(Unit.COLUMNS);

        assert.equal(Unit.BLOCKS[0][0], 0, "block 0, 0");
        assert.equal(Unit.BLOCKS[0][8], 20, "block 0, 8");
        assert.equal(Unit.BLOCKS[1][0], 3, "block 1, 0");
        assert.equal(Unit.BLOCKS[1][8], 23, "block 1, 8");
        assert.equal(Unit.BLOCKS[2][0], 6, "block 2, 0");
        assert.equal(Unit.BLOCKS[2][8], 26, "block 2, 8");
        assert.equal(Unit.BLOCKS[4][0], 30, "block 4, 0");
        assert.equal(Unit.BLOCKS[4][8], 50, "block 4, 8");
        assert.equal(Unit.BLOCKS[6][8], 74, "block 6, 8");
        assert.equal(Unit.BLOCKS[8][0], 60, "block 8, 0");
        assert.equal(Unit.BLOCKS[8][8], 80, "block 8, 8");
        validateLengths(Unit.BLOCKS);

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

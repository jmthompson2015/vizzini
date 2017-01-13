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
        assert.equal(Unit.cellNameToBlock("I1"), 6);
        assert.equal(Unit.cellNameToBlock("I9"), 8);
    });

    QUnit.test("cellNameToColumn()", function(assert)
    {
        assert.equal(Unit.cellNameToColumn("A1"), 0);
        assert.equal(Unit.cellNameToColumn("A2"), 1);
        assert.equal(Unit.cellNameToColumn("B1"), 0);
        assert.equal(Unit.cellNameToColumn("I9"), 8);
    });

    QUnit.test("cellNameToIndex()", function(assert)
    {
        assert.equal(Unit.cellNameToIndex("A1"), 0);
        assert.equal(Unit.cellNameToIndex("A2"), 1);
        assert.equal(Unit.cellNameToIndex("B1"), 9);
        assert.equal(Unit.cellNameToIndex("I9"), 80);
    });

    QUnit.test("cellNameToRow()", function(assert)
    {
        assert.equal(Unit.cellNameToRow("A1"), 0);
        assert.equal(Unit.cellNameToRow("A2"), 0);
        assert.equal(Unit.cellNameToRow("B1"), 1);
        assert.equal(Unit.cellNameToRow("I9"), 8);
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
        var result = Unit.getBlockPeers("A1");

        // Verify.
        assert.ok(result);
        assert.ok(Array.isArray(result));
        assert.equal(result.length, 8);
        var i = 0;
        assert.equal(result[i++], "A2");
        assert.equal(result[i++], "A3");
        assert.equal(result[i++], "B1");
        assert.equal(result[i++], "B2");
        assert.equal(result[i++], "B3");
        assert.equal(result[i++], "C1");
        assert.equal(result[i++], "C2");
        assert.equal(result[i++], "C3");
    });

    QUnit.test("getColumnPeers() A1", function(assert)
    {
        // Run.
        var result = Unit.getColumnPeers("A1");

        // Verify.
        assert.ok(result);
        assert.ok(Array.isArray(result));
        assert.equal(result.length, 8);
        var i = 0;
        assert.equal(result[i++], "B1");
        assert.equal(result[i++], "C1");
        assert.equal(result[i++], "D1");
        assert.equal(result[i++], "E1");
        assert.equal(result[i++], "F1");
        assert.equal(result[i++], "G1");
        assert.equal(result[i++], "H1");
        assert.equal(result[i++], "I1");
    });

    QUnit.test("getPeers() A1", function(assert)
    {
        // Run.
        var result = Unit.getPeers("A1");

        // Verify.
        assert.ok(result);
        assert.ok(Array.isArray(result));
        assert.equal(result.length, 20);
        var i = 0;
        assert.equal(result[i++], "A2");
        assert.equal(result[i++], "A3");
        assert.equal(result[i++], "A4");
        assert.equal(result[i++], "A5");
        assert.equal(result[i++], "A6");
        assert.equal(result[i++], "A7");
        assert.equal(result[i++], "A8");
        assert.equal(result[i++], "A9");
        assert.equal(result[i++], "B1");
        assert.equal(result[i++], "B2");
        assert.equal(result[i++], "B3");
        assert.equal(result[i++], "C1");
        assert.equal(result[i++], "C2");
        assert.equal(result[i++], "C3");
        assert.equal(result[i++], "D1");
        assert.equal(result[i++], "E1");
        assert.equal(result[i++], "F1");
        assert.equal(result[i++], "G1");
        assert.equal(result[i++], "H1");
        assert.equal(result[i++], "I1");
    });

    QUnit.test("getPeers() E5", function(assert)
    {
        // Run.
        var result = Unit.getPeers("E5");

        // Verify.
        assert.ok(result);
        assert.ok(Array.isArray(result));
        assert.equal(result.length, 20);
        var i = 0;
        assert.equal(result[i++], "A5");
        assert.equal(result[i++], "B5");
        assert.equal(result[i++], "C5");
        assert.equal(result[i++], "D4");
        assert.equal(result[i++], "D5");
        assert.equal(result[i++], "D6");
        assert.equal(result[i++], "E1");
        assert.equal(result[i++], "E2");
        assert.equal(result[i++], "E3");
        assert.equal(result[i++], "E4");
        assert.equal(result[i++], "E6");
        assert.equal(result[i++], "E7");
        assert.equal(result[i++], "E8");
        assert.equal(result[i++], "E9");
        assert.equal(result[i++], "F4");
        assert.equal(result[i++], "F5");
        assert.equal(result[i++], "F6");
        assert.equal(result[i++], "G5");
        assert.equal(result[i++], "H5");
        assert.equal(result[i++], "I5");
    });

    QUnit.test("getRowPeers() A1", function(assert)
    {
        // Run.
        var result = Unit.getRowPeers("A1");

        // Verify.
        assert.ok(result);
        assert.ok(Array.isArray(result));
        assert.equal(result.length, 8);
        var i = 0;
        assert.equal(result[i++], "A2");
        assert.equal(result[i++], "A3");
        assert.equal(result[i++], "A4");
        assert.equal(result[i++], "A5");
        assert.equal(result[i++], "A6");
        assert.equal(result[i++], "A7");
        assert.equal(result[i++], "A8");
        assert.equal(result[i++], "A9");
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
        assert.equal(Unit.indexToCellName(79), "I8");
        assert.equal(Unit.indexToCellName(80), "I9");
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
        assert.equal(Unit.ROWS[0][0], "A1");
        assert.equal(Unit.ROWS[0][8], "A9");
        assert.equal(Unit.ROWS[8][0], "I1");
        assert.equal(Unit.ROWS[8][8], "I9");
        validateLengths(Unit.ROWS);

        assert.equal(Unit.COLUMNS[0][0], "A1", "column 0, 0");
        assert.equal(Unit.COLUMNS[0][8], "I1", "column 0, 8");
        assert.equal(Unit.COLUMNS[8][0], "A9", "column 8, 0");
        assert.equal(Unit.COLUMNS[8][8], "I9", "column 8, 8");
        validateLengths(Unit.COLUMNS);

        assert.equal(Unit.BLOCKS[0][0], "A1", "block 0, 0");
        assert.equal(Unit.BLOCKS[0][8], "C3", "block 0, 8");
        assert.equal(Unit.BLOCKS[1][0], "A4", "block 1, 0");
        assert.equal(Unit.BLOCKS[1][8], "C6", "block 1, 8");
        assert.equal(Unit.BLOCKS[2][0], "A7", "block 2, 0");
        assert.equal(Unit.BLOCKS[2][8], "C9", "block 2, 8");
        assert.equal(Unit.BLOCKS[4][0], "D4", "block 4, 0");
        assert.equal(Unit.BLOCKS[4][8], "F6", "block 4, 8");
        assert.equal(Unit.BLOCKS[6][8], "I3", "block 6, 8");
        assert.equal(Unit.BLOCKS[8][0], "G7", "block 8, 0");
        assert.equal(Unit.BLOCKS[8][8], "I9", "block 8, 8");
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

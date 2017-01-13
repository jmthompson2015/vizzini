/*
 * Provides unit definitions for Sudoku.
 *
 * <pre>
 *         1  2  3    4  5  6    7  8  9
 *         0  1  2    3  4  5    6  7  8
 * A - 0 - 00 01 02 | 03 04 05 | 06 07 08
 * B - 1 - 09 10 11 | 12 13 14 | 15 16 17
 * C - 2 - 18 19 20 | 21 22 23 | 24 25 26
 *         ---------+----------+---------
 * D - 3 - 27 28 29 | 30 31 32 | 33 34 35
 * E - 4 - 36 37 38 | 39 40 41 | 42 43 44
 * F - 5 - 45 46 47 | 48 49 50 | 51 52 53
 *         ---------+----------+---------
 * G - 6 - 54 55 56 | 57 58 59 | 60 61 62
 * H - 7 - 63 64 65 | 66 67 68 | 69 70 71
 * I - 8 - 72 73 74 | 75 76 77 | 78 79 80
 *
 * Blocks:
 * 0 | 1 | 2
 * --+---+--
 * 3 | 4 | 5
 * --+---+--
 * 6 | 7 | 8
 * </pre>
 */
define(function()
{
    var Unit = {
        SIZE: 9,
        ROW_NAMES: ["A", "B", "C", "D", "E", "F", "G", "H", "I"],
        ROWS: [],
        COLUMNS: [],
        BLOCKS: [],
        CELL_NAME_TO_INDEX:
        {},
        INDEX_TO_CELL_NAME:
        {},

        cellNameToBlock: function(cellName)
        {
            InputValidator.validateNotEmpty("cellName", cellName);

            var c = Math.floor(this.cellNameToColumn(cellName) / 3);
            var r = Math.floor(this.cellNameToRow(cellName) / 3);

            return (r * 3) + c;
        },

        cellNameToColumn: function(cellName)
        {
            InputValidator.validateNotEmpty("cellName", cellName);

            return parseInt(cellName[1]) - 1;
        },

        cellNameToRow: function(cellName)
        {
            InputValidator.validateNotEmpty("cellName", cellName);

            return this.ROW_NAMES.indexOf(cellName[0]);
        },

        cellNameToIndex: function(cellName)
        {
            InputValidator.validateNotEmpty("cellName", cellName);

            return this.CELL_NAME_TO_INDEX[cellName];
        },

        coordinatesToIndex: function(column, row)
        {
            InputValidator.validateNotNull("column", column);
            InputValidator.validateNotNull("row", row);

            return (row * Unit.SIZE) + column;
        },

        getBlockPeers: function(cellName)
        {
            InputValidator.validateNotEmpty("cellName", cellName);

            var block = this.cellNameToBlock(cellName);
            var unit = this.BLOCKS[block];

            return this.getUnitPeers(cellName, unit);
        },

        getColumnPeers: function(cellName)
        {
            InputValidator.validateNotEmpty("cellName", cellName);

            var column = this.cellNameToColumn(cellName);
            var unit = this.COLUMNS[column];

            return this.getUnitPeers(cellName, unit);
        },

        getPeers: function(cellName)
        {
            InputValidator.validateNotEmpty("cellName", cellName);

            var rowPeers = this.getRowPeers(cellName);
            var columnPeers = this.getColumnPeers(cellName);
            var blockPeers = this.getBlockPeers(cellName);

            var answer = rowPeers.concat(columnPeers);

            blockPeers.forEach(function(peer)
            {
                if (!answer.vizziniContains(peer))
                {
                    answer.push(peer);
                }
            });

            answer.sort();

            return answer;
        },

        getRowPeers: function(cellName)
        {
            InputValidator.validateNotEmpty("cellName", cellName);

            var row = this.cellNameToRow(cellName);
            var unit = this.ROWS[row];

            return this.getUnitPeers(cellName, unit);
        },

        getUnitPeers: function(cellName, unit)
        {
            InputValidator.validateNotEmpty("cellName", cellName);
            InputValidator.validateNotNull("unit", unit);

            var answer = unit.slice();

            answer.vizziniRemove(cellName);

            return answer;
        },

        indexToBlock: function(index)
        {
            InputValidator.validateNotNull("index", index);

            var answer = -1;
            var cellName = this.indexToCellName(index);

            for (var i = 0; i < this.BLOCKS.length; i++)
            {
                var block = this.BLOCKS[i];

                if (block.vizziniContains(cellName))
                {
                    answer = i;
                    break;
                }
            }

            return answer;
        },

        indexToCellName: function(index)
        {
            InputValidator.validateNotNull("index", index);

            return this.INDEX_TO_CELL_NAME[index];
        },

        indexToColumn: function(index)
        {
            InputValidator.validateNotNull("index", index);

            return index % Unit.SIZE;
        },

        indexToRow: function(index)
        {
            InputValidator.validateNotNull("index", index);

            return Math.floor(index / Unit.SIZE);
        },
    };

    var i, j;

    // Initialize maps.
    for (i = 0; i < 81; i++)
    {
        var row = Unit.indexToRow(i);
        var column = Unit.indexToColumn(i) + 1;
        var cellName = Unit.ROW_NAMES[row] + column;
        Unit.CELL_NAME_TO_INDEX[cellName] = i;
        Unit.INDEX_TO_CELL_NAME[i] = cellName;
    }

    // Initialize rows.
    for (j = 0; j < Unit.SIZE; j++)
    {
        Unit.ROWS[j] = [];

        for (i = 0; i < Unit.SIZE; i++)
        {
            Unit.ROWS[j][i] = Unit.indexToCellName((j * Unit.SIZE) + i);
        }
    }

    // Initialize columns.
    for (j = 0; j < Unit.SIZE; j++)
    {
        Unit.COLUMNS[j] = [];

        for (i = 0; i < Unit.SIZE; i++)
        {
            Unit.COLUMNS[j][i] = Unit.indexToCellName((i * Unit.SIZE) + j);
        }
    }

    // Initialize blocks.
    var start0 = Unit.SIZE / 3; // 3
    var start1 = 2 * Unit.SIZE / 3; // 6

    for (j = 0; j < Unit.SIZE; j++)
    {
        Unit.BLOCKS[j] = [];
        var offset = start1 * (j % start0);

        for (i = 0; i < start0; i++)
        {
            Unit.BLOCKS[j][i] = Unit.indexToCellName((j * Unit.SIZE) + i - offset);
            Unit.BLOCKS[j][i + start0] = Unit.indexToCellName((j * Unit.SIZE) + i + Unit.SIZE - offset);
            Unit.BLOCKS[j][i + start1] = Unit.indexToCellName((j * Unit.SIZE) + i + (2 * Unit.SIZE) - offset);
        }
    }

    if (Object.freeze)
    {
        Object.freeze(Unit);
    }

    return Unit;
});

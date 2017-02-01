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
 * J - 8 - 72 73 74 | 75 76 77 | 78 79 80
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
        N: 9,
        ROW_NAMES: ["A", "B", "C", "D", "E", "F", "G", "H", "J"],
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

        cellNameToIndex: function(cellName)
        {
            InputValidator.validateNotEmpty("cellName", cellName);

            return this.CELL_NAME_TO_INDEX[cellName];
        },

        cellNameToRow: function(cellName)
        {
            InputValidator.validateNotEmpty("cellName", cellName);

            return this.ROW_NAMES.indexOf(cellName[0]);
        },

        coordinatesToIndex: function(column, row)
        {
            InputValidator.validateNotNull("column", column);
            InputValidator.validateNotNull("row", row);

            return (row * Unit.N) + column;
        },

        getBlockPeers: function(index)
        {
            InputValidator.validateIsNumber("index", index);

            var block = this.indexToBlock(index);
            var unit = this.BLOCKS[block];

            return this.getUnitPeers(index, unit);
        },

        getColumnPeers: function(index)
        {
            InputValidator.validateIsNumber("index", index);

            var column = this.indexToColumn(index);
            var unit = this.COLUMNS[column];

            return this.getUnitPeers(index, unit);
        },

        getPeers: function(index)
        {
            InputValidator.validateIsNumber("index", index);

            var rowPeers = this.getRowPeers(index);
            var columnPeers = this.getColumnPeers(index);
            var blockPeers = this.getBlockPeers(index);

            var answer = rowPeers.concat(columnPeers);

            blockPeers.forEach(function(peer)
            {
                if (!answer.vizziniContains(peer))
                {
                    answer.push(peer);
                }
            });

            answer.sort(function(a, b)
            {
                return a - b;
            });

            return answer;
        },

        getRowPeers: function(index)
        {
            InputValidator.validateIsNumber("index", index);

            var row = this.indexToRow(index);
            var unit = this.ROWS[row];

            return this.getUnitPeers(index, unit);
        },

        getUnitPeers: function(index, unit)
        {
            InputValidator.validateIsNumber("index", index);
            InputValidator.validateNotNull("unit", unit);

            var answer = unit.slice();

            answer.vizziniRemove(index);

            return answer;
        },

        indexToBlock: function(index)
        {
            InputValidator.validateNotNull("index", index);

            var answer = -1;

            for (var i = 0; i < this.BLOCKS.length; i++)
            {
                var block = this.BLOCKS[i];

                if (block.vizziniContains(index))
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

            return index % Unit.N;
        },

        indexToRow: function(index)
        {
            InputValidator.validateNotNull("index", index);

            return Math.floor(index / Unit.N);
        },
    };

    var i, j;

    // Initialize maps.
    for (i = 0; i < Unit.N * Unit.N; i++)
    {
        var row = Unit.indexToRow(i);
        var column = Unit.indexToColumn(i) + 1;
        var cellName = Unit.ROW_NAMES[row] + column;
        Unit.CELL_NAME_TO_INDEX[cellName] = i;
        Unit.INDEX_TO_CELL_NAME[i] = cellName;
    }

    // Initialize rows.
    for (j = 0; j < Unit.N; j++)
    {
        Unit.ROWS[j] = [];

        for (i = 0; i < Unit.N; i++)
        {
            Unit.ROWS[j][i] = (j * Unit.N) + i;
        }
    }

    // Initialize columns.
    for (j = 0; j < Unit.N; j++)
    {
        Unit.COLUMNS[j] = [];

        for (i = 0; i < Unit.N; i++)
        {
            Unit.COLUMNS[j][i] = (i * Unit.N) + j;
        }
    }

    // Initialize blocks.
    var start0 = Unit.N / 3; // 3
    var start1 = 2 * Unit.N / 3; // 6

    for (j = 0; j < Unit.N; j++)
    {
        Unit.BLOCKS[j] = [];
        var offset = start1 * (j % start0);

        for (i = 0; i < start0; i++)
        {
            Unit.BLOCKS[j][i] = (j * Unit.N) + i - offset;
            Unit.BLOCKS[j][i + start0] = (j * Unit.N) + i + Unit.N - offset;
            Unit.BLOCKS[j][i + start1] = (j * Unit.N) + i + (2 * Unit.N) - offset;
        }
    }

    if (Object.freeze)
    {
        Object.freeze(Unit);
    }

    return Unit;
});

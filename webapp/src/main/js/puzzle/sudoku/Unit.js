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
var Unit =
{
    ROW_NAMES: [ "A", "B", "C", "D", "E", "F", "G", "H", "I" ],
    ROWS: [],
    COLUMNS: [],
    BLOCKS: [],
    CELL_NAME_TO_INDEX: {},
    INDEX_TO_CELL_NAME: {},

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

        return (row * 9) + column;
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

        return index % 9;
    },

    indexToRow: function(index)
    {
        InputValidator.validateNotNull("index", index);

        return Math.floor(index / 9);
    },
}

// Initialize maps.
{
    for (var i = 0; i < 81; i++)
    {
        var row = Unit.indexToRow(i);
        var column = Unit.indexToColumn(i) + 1;
        var cellName = Unit.ROW_NAMES[row] + column;
        Unit.CELL_NAME_TO_INDEX[cellName] = i;
        Unit.INDEX_TO_CELL_NAME[i] = cellName;
    }
}

// Initialize rows.
{
    for (var j = 0; j < 9; j++)
    {
        Unit.ROWS[j] = [];

        for (var i = 0; i < 9; i++)
        {
            Unit.ROWS[j][i] = Unit.indexToCellName((j * 9) + i);
        }
    }
}

// Initialize columns.
{
    for (var j = 0; j < 9; j++)
    {
        Unit.COLUMNS[j] = [];

        for (var i = 0; i < 9; i++)
        {
            Unit.COLUMNS[j][i] = Unit.indexToCellName((i * 9) + j);
        }
    }
}

// Initialize blocks.
{
    for (var j = 0; j < 9; j++)
    {
        Unit.BLOCKS[j] = [];
        var offset = 6 * (j % 3);

        for (var i = 0; i < 3; i++)
        {
            Unit.BLOCKS[j][i] = Unit.indexToCellName((j * 9) + i - offset);
            Unit.BLOCKS[j][i + 3] = Unit.indexToCellName((j * 9) + i + 9
                    - offset);
            Unit.BLOCKS[j][i + 6] = Unit.indexToCellName((j * 9) + i + 18
                    - offset);
        }
    }
}

if (Object.freeze)
{
    Object.freeze(Unit)
};

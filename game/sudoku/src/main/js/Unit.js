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
    "use strict";

    function Unit(NIn)
    {
        this.N = (NIn !== undefined ? NIn : 9);
        this.ROW_NAMES = ["A", "B", "C", "D", "E", "F", "G", "H", "J"];
        this.ROWS = [];
        this.COLUMNS = [];
        this.BLOCKS = [];
        this.CELL_NAME_TO_INDEX = {};
        this.INDEX_TO_CELL_NAME = {};

        var i, j;

        // Initialize maps.
        for (i = 0; i < this.N * this.N; i++)
        {
            var row = this.indexToRow(i);
            var column = this.indexToColumn(i) + 1;
            var cellName = this.ROW_NAMES[row] + column;
            this.CELL_NAME_TO_INDEX[cellName] = i;
            this.INDEX_TO_CELL_NAME[i] = cellName;
        }

        // Initialize rows.
        for (j = 0; j < this.N; j++)
        {
            this.ROWS[j] = [];

            for (i = 0; i < this.N; i++)
            {
                this.ROWS[j][i] = (j * this.N) + i;
            }
        }

        // Initialize columns.
        for (j = 0; j < this.N; j++)
        {
            this.COLUMNS[j] = [];

            for (i = 0; i < this.N; i++)
            {
                this.COLUMNS[j][i] = (i * this.N) + j;
            }
        }

        // Initialize blocks.
        var start0 = this.N / 3; // 3
        var start1 = 2 * this.N / 3; // 6

        for (j = 0; j < this.N; j++)
        {
            this.BLOCKS[j] = [];
            var offset = start1 * (j % start0);

            for (i = 0; i < start0; i++)
            {
                this.BLOCKS[j][i] = (j * this.N) + i - offset;
                this.BLOCKS[j][i + start0] = (j * this.N) + i + this.N - offset;
                this.BLOCKS[j][i + start1] = (j * this.N) + i + (2 * this.N) - offset;
            }
        }
    }

    Unit.prototype.cellNameToBlock = function(cellName)
    {
        InputValidator.validateNotEmpty("cellName", cellName);

        var c = Math.floor(this.cellNameToColumn(cellName) / 3);
        var r = Math.floor(this.cellNameToRow(cellName) / 3);

        return (r * 3) + c;
    };

    Unit.prototype.cellNameToColumn = function(cellName)
    {
        InputValidator.validateNotEmpty("cellName", cellName);

        return parseInt(cellName[1]) - 1;
    };

    Unit.prototype.cellNameToIndex = function(cellName)
    {
        InputValidator.validateNotEmpty("cellName", cellName);

        return this.CELL_NAME_TO_INDEX[cellName];
    };

    Unit.prototype.cellNameToRow = function(cellName)
    {
        InputValidator.validateNotEmpty("cellName", cellName);

        return this.ROW_NAMES.indexOf(cellName[0]);
    };

    Unit.prototype.coordinatesToIndex = function(column, row)
    {
        InputValidator.validateNotNull("column", column);
        InputValidator.validateNotNull("row", row);

        return (row * this.N) + column;
    };

    Unit.prototype.getBlockPeers = function(index)
    {
        InputValidator.validateIsNumber("index", index);

        var block = this.indexToBlock(index);
        var unit = this.BLOCKS[block];

        return this.getUnitPeers(index, unit);
    };

    Unit.prototype.getColumnPeers = function(index)
    {
        InputValidator.validateIsNumber("index", index);

        var column = this.indexToColumn(index);
        var unit = this.COLUMNS[column];

        return this.getUnitPeers(index, unit);
    };

    Unit.prototype.getPeers = function(index)
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
    };

    Unit.prototype.getRowPeers = function(index)
    {
        InputValidator.validateIsNumber("index", index);

        var row = this.indexToRow(index);
        var unit = this.ROWS[row];

        return this.getUnitPeers(index, unit);
    };

    Unit.prototype.getUnitPeers = function(index, unit)
    {
        InputValidator.validateIsNumber("index", index);
        InputValidator.validateNotNull("unit", unit);

        var answer = unit.slice();

        answer.vizziniRemove(index);

        return answer;
    };

    Unit.prototype.indexToBlock = function(index)
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
    };

    Unit.prototype.indexToCellName = function(index)
    {
        InputValidator.validateNotNull("index", index);

        return this.INDEX_TO_CELL_NAME[index];
    };

    Unit.prototype.indexToColumn = function(index)
    {
        InputValidator.validateNotNull("index", index);

        return index % this.N;
    };

    Unit.prototype.indexToRow = function(index)
    {
        InputValidator.validateNotNull("index", index);

        return Math.floor(index / this.N);
    };

    if (Object.freeze)
    {
        Object.freeze(Unit);
    }

    return Unit;
});

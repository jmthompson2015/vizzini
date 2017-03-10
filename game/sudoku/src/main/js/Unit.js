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
        var N = (NIn !== undefined ? NIn : 9);
        var n;
        this.ROW_NAMES = ["A", "B", "C", "D", "E", "F", "G", "H", "J"];
        this.ROWS = [];
        this.COLUMNS = [];
        this.BLOCKS = [];
        this.CELL_NAME_TO_INDEX = {};
        this.INDEX_TO_CELL_NAME = {};
        this.INDEX_TO_PEERS = {};
        this.UNITS = {};
        this.PEERS = {};

        this.N = function()
        {
            return N;
        };

        this.n = function()
        {
            if (n === undefined)
            {
                n = Math.sqrt(this.N());
            }

            return n;
        };

        var that = this;

        function initializeBlocks()
        {
            var n = that.n();
            var start0 = N / n; // 3
            var start1 = 2 * N / n; // 6

            for (var j = 0; j < N; j++)
            {
                var blockj = [];
                var offset = start1 * (j % start0);

                for (var i = 0; i < start0; i++)
                {
                    blockj[i] = (j * N) + i - offset;
                    blockj[i + start0] = (j * N) + i + N - offset;
                    blockj[i + start1] = (j * N) + i + (2 * N) - offset;
                }

                that.BLOCKS.push(blockj);
            }
        }

        function initializeColumns()
        {
            for (var j = 0; j < N; j++)
            {
                var columnj = [];

                for (var i = 0; i < N; i++)
                {
                    columnj.push((i * N) + j);
                }

                that.COLUMNS.push(columnj);
            }
        }

        function initializeMaps()
        {
            // Initialize maps.
            for (var i = 0; i < N * N; i++)
            {
                var row = that.indexToRow(i);
                var column = that.indexToColumn(i) + 1;
                var cellName = that.ROW_NAMES[row] + column;
                that.CELL_NAME_TO_INDEX[cellName] = i;
                that.INDEX_TO_CELL_NAME[i] = cellName;
            }
        }

        function initializePeers()
        {
            for (var i = 0; i < N * N; i++)
            {
                var units = that.UNITS[i];
                var block = that.BLOCKS[units[0]].slice();
                block.splice(block.indexOf(i), 1);
                var column = that.COLUMNS[units[1]].slice();
                column.splice(column.indexOf(i), 1);
                var row = that.ROWS[units[2]].slice();
                row.splice(row.indexOf(i), 1);

                column = filter1(block, column);
                row = filter2(block, column, row);

                that.PEERS[i] = block.concat(column, row);

                that.PEERS[i].sort(function(a, b)
                {
                    return a - b;
                });
            }

            function filter1(block, column)
            {
                return column.filter(function(item)
                {
                    return block.indexOf(item) < 0;
                });
            }

            function filter2(block, column, row)
            {
                return row.filter(function(item)
                {
                    return block.indexOf(item) < 0 && column.indexOf(item) < 0;
                });
            }
        }

        function initializeRows()
        {
            for (var j = 0; j < N; j++)
            {
                var rowj = [];

                for (var i = 0; i < N; i++)
                {
                    rowj.push((j * N) + i);
                }

                that.ROWS.push(rowj);
            }
        }

        function initializeUnits()
        {
            for (var i = 0; i < N * N; i++)
            {
                that.UNITS[i] = [];

                for (var b = 0; b < that.BLOCKS.length; b++)
                {
                    if (that.BLOCKS[b].includes(i))
                    {
                        that.UNITS[i].push(b);
                        break;
                    }
                }

                for (var c = 0; c < that.COLUMNS.length; c++)
                {
                    if (that.COLUMNS[c].includes(i))
                    {
                        that.UNITS[i].push(c);
                        break;
                    }
                }

                for (var r = 0; r < that.ROWS.length; r++)
                {
                    if (that.ROWS[r].includes(i))
                    {
                        that.UNITS[i].push(r);
                        break;
                    }
                }
            }
        }

        initializeBlocks();
        initializeColumns();
        initializeRows();

        initializeUnits();
        initializePeers();

        initializeMaps();
    }

    Unit.prototype.cellNameToIndex = function(cellName)
    {
        InputValidator.validateNotEmpty("cellName", cellName);

        return this.CELL_NAME_TO_INDEX[cellName];
    };

    Unit.prototype.coordinatesToIndex = function(column, row)
    {
        InputValidator.validateNotNull("column", column);
        InputValidator.validateNotNull("row", row);

        return (row * this.N()) + column;
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

        return this.PEERS[index];
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

        return this.UNITS[index][0];
    };

    Unit.prototype.indexToCellName = function(index)
    {
        InputValidator.validateNotNull("index", index);

        return this.INDEX_TO_CELL_NAME[index];
    };

    Unit.prototype.indexToColumn = function(index)
    {
        InputValidator.validateNotNull("index", index);

        return this.UNITS[index][1];
    };

    Unit.prototype.indexToRow = function(index)
    {
        InputValidator.validateNotNull("index", index);

        return this.UNITS[index][2];
    };

    Unit.prototype.indexToUnits = function(index)
    {
        InputValidator.validateNotNull("index", index);

        return this.UNITS[index];
    };

    if (Object.freeze)
    {
        Object.freeze(Unit);
    }

    return Unit;
});

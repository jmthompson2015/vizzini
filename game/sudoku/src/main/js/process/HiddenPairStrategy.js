/*
 * @see http://www.sudokuwiki.org/Strategy_Families
 */
define(["process/Move"],
    function(Move)
    {
        "use strict";
        var HiddenPairStrategy = {

            allCandidates: [1, 2, 3, 4, 5, 6, 7, 8, 9],

            findDualCandidatesUnitCell: function(puzzle, unit)
            {
                var answer;
                var N = puzzle.N();

                var valueToIndices = [];

                for (var v = 1; v <= N; v++)
                {
                    valueToIndices[v] = puzzle.candidateIndicesInUnit(v, unit, 2);
                }

                for (var v0 = 1; v0 < N && answer === undefined; v0++)
                {
                    var indices0 = valueToIndices[v0];

                    if (indices0.length === 2)
                    {
                        var cell00 = puzzle.get(indices0[0]);
                        var cell01 = puzzle.get(indices0[1]);

                        for (var v1 = v0 + 1; v1 <= N && answer === undefined; v1++)
                        {
                            var indices1 = valueToIndices[v1];

                            if (indices1.length === 2 && indices0[0] === indices1[0] && indices0[1] === indices1[1] &&
                                (cell00.candidates().length > 2 || cell01.candidates().length > 2))
                            {
                                var candidates = this.allCandidates.slice();
                                candidates.vizziniRemove(v0);
                                candidates.vizziniRemove(v1);
                                answer = new Move.BatchRemoveCandidates(puzzle, indices0, candidates, "hidden pair");
                                break;
                            }
                        }
                    }
                }

                return answer;
            },

            getMove: function(puzzle)
            {
                var answer;
                var N = puzzle.N();
                var puzzleUnit = puzzle.unit();
                var unit;

                // Look for dual candidates in a block.
                for (var b = 0; b < N && answer === undefined; b++)
                {
                    unit = puzzleUnit.BLOCKS[b];
                    answer = this.findDualCandidatesUnitCell(puzzle, unit);
                }

                if (answer === undefined)
                {
                    // Look for dual candidates in a column.
                    for (var c = 0; c < N && answer === undefined; c++)
                    {
                        unit = puzzleUnit.COLUMNS[c];
                        answer = this.findDualCandidatesUnitCell(puzzle, unit);
                    }
                }

                if (answer === undefined)
                {
                    // Look for dual candidates in a row.
                    for (var r = 0; r < N && answer === undefined; r++)
                    {
                        unit = puzzleUnit.ROWS[r];
                        answer = this.findDualCandidatesUnitCell(puzzle, unit);
                    }
                }

                return answer;
            },
        };

        return HiddenPairStrategy;
    });

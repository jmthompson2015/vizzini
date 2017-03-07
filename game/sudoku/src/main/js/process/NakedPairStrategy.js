/*
 * @see http://www.sudokuwiki.org/Strategy_Families
 */
define(["process/Move"],
    function(Move)
    {
        "use strict";
        var NakedPairStrategy = {

            findNakedPairMove: function(puzzle, index, peers)
            {
                InputValidator.validateNotNull("puzzle", puzzle);
                InputValidator.validateIsNumber("index", index);
                InputValidator.validateNotNull("peers", peers);

                var answer;
                var cell = puzzle.get(index);

                if (cell.isCandidates === true)
                {
                    for (var j = 0; j < peers.length && answer === undefined; j++)
                    {
                        var peerIndex = peers[j];
                        var myCell = puzzle.get(peerIndex);

                        if (peerIndex > index && (myCell.isCandidates === true) && (cell.candidates().toString() === myCell.candidates().toString()))
                        {
                            // Find the other peers which contains the pair's candidates.
                            var otherPeers = peers.slice();
                            otherPeers.vizziniRemove(peerIndex);
                            var candidatePeers = otherPeers.filter(filterOtherPeers);

                            if (candidatePeers.length > 0)
                            {
                                answer = new Move.BatchRemoveCandidates(puzzle, candidatePeers, cell.candidates(), "naked pair");
                            }
                        }
                    }
                }

                return answer;

                function filterOtherPeers(index)
                {
                    var myCell = puzzle.get(index);
                    var candidate0 = cell.candidates().get(0);
                    var candidate1 = cell.candidates().get(1);
                    return (myCell.isCandidates === true) && (myCell.candidates().includes(candidate0) || myCell.candidates().includes(candidate1));
                }
            },

            getMove: function(puzzle)
            {
                InputValidator.validateNotNull("puzzle", puzzle);

                var indices = puzzle.findCellsWithCandidateLength(2);

                var answer;

                for (var i = 0; i < indices.length && answer === undefined; i++)
                {
                    var index = indices[i];

                    var peers = puzzle.unit().getBlockPeers(index);
                    answer = this.findNakedPairMove(puzzle, index, peers);

                    if (answer === undefined)
                    {
                        peers = puzzle.unit().getColumnPeers(index);
                        answer = this.findNakedPairMove(puzzle, index, peers);
                    }

                    if (answer === undefined)
                    {
                        peers = puzzle.unit().getRowPeers(index);
                        answer = this.findNakedPairMove(puzzle, index, peers);
                    }
                }

                return answer;
            },
        };

        return NakedPairStrategy;
    });

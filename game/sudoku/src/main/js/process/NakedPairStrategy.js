/*
 * @see http://www.sudokuwiki.org/Strategy_Families
 */
define(["process/Move"],
    function(Move)
    {
        "use strict";
        var NakedPairStrategy = {

            filterOtherPeers: function(puzzle, cell, otherPeers)
            {
                var answer = [];
                var length = otherPeers.length;

                for (var k = 0; k < length; k++)
                {
                    var myIndex = otherPeers[k];
                    var myPeer = puzzle.get(myIndex);
                    var candidate0 = cell.candidates()[0];
                    var candidate1 = cell.candidates()[1];

                    if ((myPeer.isCandidates === true) &&
                        (myPeer.candidates().includes(candidate0) || myPeer.candidates().includes(candidate1)))
                    {
                        answer.push(myIndex);
                    }
                }

                return answer;
            },

            findNakedPairMove: function(puzzle, index, peers)
            {
                InputValidator.validateNotNull("puzzle", puzzle);
                InputValidator.validateIsNumber("index", index);
                InputValidator.validateNotNull("peers", peers);

                var answer;
                var cell = puzzle.get(index);

                if (cell.isCandidates === true)
                {
                    var length = peers.length;

                    for (var j = 0; j < length && answer === undefined; j++)
                    {
                        var peerIndex = peers[j];
                        var myCell = puzzle.get(peerIndex);

                        if (peerIndex > index && (myCell.isCandidates === true) && (cell.candidates().toString() === myCell.candidates().toString()))
                        {
                            // Find the other peers which contains the pair's candidates.
                            var otherPeers = peers.slice();
                            otherPeers.vizziniRemove(peerIndex);
                            var candidatePeers = this.filterOtherPeers(puzzle, cell, otherPeers);

                            if (candidatePeers.length > 0)
                            {
                                answer = new Move.BatchRemoveCandidates(puzzle, candidatePeers, cell.candidates(), "naked pair");
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
                var indices = puzzle.findCellsWithCandidateLength(2);
                var length = indices.length;
                var puzzleUnit = puzzle.unit();

                for (var i = 0; i < length && answer === undefined; i++)
                {
                    var index = indices[i];

                    var peers = puzzleUnit.getBlockPeers(index);
                    answer = this.findNakedPairMove(puzzle, index, peers);

                    if (answer === undefined)
                    {
                        peers = puzzleUnit.getColumnPeers(index);
                        answer = this.findNakedPairMove(puzzle, index, peers);
                    }

                    if (answer === undefined)
                    {
                        peers = puzzleUnit.getRowPeers(index);
                        answer = this.findNakedPairMove(puzzle, index, peers);
                    }
                }

                return answer;
            },
        };

        return NakedPairStrategy;
    });

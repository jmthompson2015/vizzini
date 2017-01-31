define(["GridFactory", "PuzzleFormat"],
    function(GridFactory, PuzzleFormat)
    {
        "use strict";

        function InitialState()
        {
            this.isConstantSelected = false;
            this.puzzle = undefined;
            this.conflictIndices = [];
            this.sameCandidateIndices = [];
            this.sameValueIndices = [];
            this.selectedIndex = undefined;
            this.selectedValue = undefined;

            // Initialize.
            var grid = GridFactory.createEmpty();
            this.puzzle = PuzzleFormat.parse(grid);
        }

        if (Object.freeze)
        {
            Object.freeze(InitialState);
        }

        return InitialState;
    });

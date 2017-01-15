define(["Unit"],
    function(Unit)
    {
        "use strict";

        function InitialState()
        {
            this.isConstantSelected = false;
            this.n = 3;
            this.puzzle = [];
            this.conflictIndices = [];
            this.sameCandidateIndices = [];
            this.sameValueIndices = [];
            this.selectedIndex = undefined;
            this.selectedValue = undefined;

            // Initialize.
            var N = this.n * this.n;
            for (var i = 0; i < (N * N); i++)
            {
                this.puzzle[i] = Unit.DEFAULT_CELL.slice();
            }
        }

        if (Object.freeze)
        {
            Object.freeze(InitialState);
        }

        return InitialState;
    });

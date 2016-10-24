define(function()
{
    "use strict";
    function Adjudicator()
    {
        this.determineWinner = function(store)
        {
            InputValidator.validateNotNull("store", store);

            var answer;

            return answer;
        };

        this.isGameOver = function(store)
        {
            InputValidator.validateNotNull("store", store);

            var answer = false;
            var state = store.getState();

            if (state.agentIds.length === 0)
            {
                answer = true;
            }
            else if (state.round >= 10)
            {
                answer = true;
            }

            return answer;
        };
    }

    return Adjudicator;
});

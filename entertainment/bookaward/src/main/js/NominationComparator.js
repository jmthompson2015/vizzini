define(function()
{
    "use strict";
    var NominationComparator = {
        compare: function(a, b)
        {
            InputValidator.validateNotNull("a", a);
            InputValidator.validateNotNull("b", b);

            var answer = 0;
            var aString = a.toString();
            var bString = b.toString();

            if (aString < bString)
            {
                answer = -1;
            }
            else if (aString > bString)
            {
                answer = 1;
            }

            if (answer === 0)
            {
                var aWinner = a.isWinner();
                var bWinner = b.isWinner();

                if (aWinner !== bWinner)
                {
                    if (aWinner && !bWinner)
                    {
                        answer = -1;
                    }
                    else if (!aWinner && bWinner)
                    {
                        answer = 1;
                    }
                }
            }

            return answer;
        },

        equals: function(a, b)
        {
            InputValidator.validateNotNull("a", a);
            InputValidator.validateNotNull("b", b);

            return a.award() === b.award() && a.category() === b.category() &&
                a.year() === b.year() && a.isWinner() === b.isWinner();
        },
    };

    return NominationComparator;
});

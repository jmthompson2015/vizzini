define(function()
{
    "use strict";
    var BookComparator = {
        compare: function(a, b)
        {
            InputValidator.validateNotNull("a", a);
            InputValidator.validateNotNull("b", b);

            var answer = 0;
            var aString = BookComparator.prepareName(a.toString());
            var bString = BookComparator.prepareName(b.toString());

            if (aString < bString)
            {
                answer = -1;
            }
            else if (aString > bString)
            {
                answer = 1;
            }

            return answer;
        },

        equals: function(a, b)
        {
            InputValidator.validateNotNull("a", a);
            InputValidator.validateNotNull("b", b);

            return a.title() === b.title() && a.author() === b.author();
        },
    };

    BookComparator.prepareName = function(string)
    {
        InputValidator.validateNotNull("string", string);

        var answer = string;

        answer = (answer.startsWith("A ") ? answer.replace("A ", "") : answer);
        answer = (answer.startsWith("The ") ? answer.replace("The ", "") : answer);

        return answer;
    };

    return BookComparator;
});

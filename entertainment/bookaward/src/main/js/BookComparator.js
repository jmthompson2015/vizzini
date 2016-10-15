define(function()
{
    "use strict";
    var BookComparator = {
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

            return answer;
        },

        equals: function(a, b)
        {
            InputValidator.validateNotNull("a", a);
            InputValidator.validateNotNull("b", b);

            return a.title() === b.title() && a.author() === b.author();
        },
    };

    return BookComparator;
});

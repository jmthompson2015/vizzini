define(function()
{
    "use strict";
    var Selector = {};

    Selector.findById = function(array, id)
    {
        InputValidator.validateNotNull("array", array);
        InputValidator.validateNotNull("id", id);

        var answer;

        for (var i = 0; i < array.length; i++)
        {
            var element = array[i];

            if (element.id === id)
            {
                answer = element;
                break;
            }
        }

        return answer;
    };

    return Selector;
});

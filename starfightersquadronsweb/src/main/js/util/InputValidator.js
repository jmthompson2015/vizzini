/*
 * Provides methods for input validation.
 */
var InputValidator =
{
    EMPTY: " is null or empty.",
    NULL: " is null.",
    UNDEFINED: " is undefined.",

    isArray: function(object)
    {
        return Array.isArray(object);
    },

    isNumber: function(n)
    {
        return !isNaN(parseFloat(n)) && isFinite(n);
    },

    validateNotEmpty: function(objectName, object)
    {
        if (InputValidator.isArray(object))
        {
            if (object.length == 0)
            {
                // Empty array.
                console.log(new Error().stack);
                throw objectName + InputValidator.EMPTY;
            }
        }
        else if (InputValidator.isNumber(object))
        {
            // Valid.
        }
        else if (object === true || object === false)
        {
            // Valid.
        }
        else
        {
            if (!object)
            {
                console.log(new Error().stack);
                throw objectName + InputValidator.EMPTY;
            }
        }
    },

    validateNotNull: function(objectName, object)
    {
        if (object === undefined)
        {
            console.log(new Error().stack);
            throw objectName + InputValidator.UNDEFINED;
        }

        if (object === null)
        {
            console.log(new Error().stack);
            throw objectName + InputValidator.NULL;
        }
    }
}

/*
 * Provides utility methods for arrays.
 * 
 * @see http://modernweb.com/2013/12/23/45-useful-javascript-tips-tricks-and-best-practices/
 */
Array.Vizzini =
{
    // add: use
    // array.push(element);
    // or
    // array[array.length] = element;
    // Note: This function modifies array.

    // Note: This function modifies array1.
    // Array.prototype.push.apply(array1, array2);
    // array1 now contains array2 also.
    // @see http://stackoverflow.com/questions/351409/appending-to-array
    addAll: function(array1, array2)
    {
        Array.prototype.push.apply(array1, array2);
    },

    contains: function(array, element)
    {
        var i = array.length;
        while (i--)
        {
            if (array[i] === element) { return true; }
        }
        return false;
    },

    containsUsingEquals: function(array, element, equalsFunction)
    {
        var i = array.length;
        while (i--)
        {
            if (equalsFunction(array[i], element)) { return true; }
        }
        return false;
    },

    equals: function(a, b)
    {
        if (a === b) { return true; }
        if (a == null || b == null) { return false; }
        if (a.length != b.length) { return false; }

        for (var i = 0; i < a.length; ++i)
        {
            if (a[i] !== b[i]) { return false; }
        }

        return true;
    },

    randomElement: function(array)
    {
        return array[Math.floor(Math.random() * array.length)];
    },

    // Note: This function modifies array.
    remove: function(array, element)
    {
        var index = array.indexOf(element);
        if (index >= 0)
        {
            array.splice(index, 1);
        }
    },

    // Note: This function modifies array.
    shuffle: function(array)
    {
        array.sort(function()
        {
            return Math.random() - 0.5;
        });
    },
}

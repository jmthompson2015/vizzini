/*
 * @see JavaScript: The Definitive Guide, David Flanagan
 */

var Vizzini = {}

// Define an extend function that copies the properties of its second and
// subsequent arguments onto its first argument.
// We work around an IE bug here: in many versions of IE, the for/in loop
// won't enumerate an enumerable property of o if the prototype of o has
// a non-enumerable property by the same name. This means that properties
// like toString are not handled correctly unless we explicitly check for them.
// var extend = (function()
Vizzini.extend = (function()
{
    // Assign the return value of this function
    // First check for the presence of the bug before patching it.
    for ( var p in
    { toString: null })
    {
        // If we get here, then the for/in loop works correctly and we return
        // a simple version of the extend() function
        return function extend(o)
        {
            for (var i = 1; i < arguments.length; i++)
            {
                var source = arguments[i];
                for ( var prop in source)
                    o[prop] = source[prop];
            }

            return o;
        };
    }

    // If we get here, it means that the for/in loop did not enumerate
    // the toString property of the test object. So return a version
    // of the extend() function that explicitly tests for the non-enumerable
    // properties of Object.prototype.
    return function patched_extend(o)
    {
        for (var i = 1; i < arguments.length; i++)
        {
            var source = arguments[i];

            // Copy all the enumerable properties
            for ( var prop in source)
            {
                o[prop] = source[prop];
            }

            // And now check the special-case properties
            for (var j = 0; j < protoprops.length; j++)
            {
                prop = protoprops[j];
                if (source.hasOwnProperty(prop))
                    o[prop] = source[prop];
            }
        }

        return o;
    };

    // This is the list of special-case properties we check for
    var protoprops = [ "toString", "valueOf", "constructor", "hasOwnProperty",
            "isPrototypeOf", "propertyIsEnumerable", "toLocaleString" ];
}());

// inherit() returns a newly created object that inherits properties from the
// prototype object p. It uses the ECMAScript 5 function Object.create() if
// it is defined, and otherwise falls back to an older technique.
Vizzini.inherit = function(p)
{
    // p must be a non-null object
    if (p == null) { throw TypeError(); }

    // If Object.create() is defined...
    if (Object.create)
    {
        // then just use it.
        return Object.create(p);
    }

    // Otherwise do some more type checking
    var t = typeof p;
    if (t !== "object" && t !== "function") { throw TypeError(); }

    // Define a dummy constructor function.
    function f()
    {};

    // Set its prototype property to p.
    f.prototype = p;

    // Use f() to create an "heir" of p.
    return new f();
}

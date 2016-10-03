"use strict";

// Object.values polyfill
if (!Object.values)
{
    Object.values = function values(obj)
    {
        return Object.keys(obj).reduce(function(v, k)
        {
            return v.concat(typeof k === 'string' && obj.propertyIsEnumerable(k) ? [ obj[k] ] : []);
        }, []);
    };
}

/*
 * @see <a href="http://stackoverflow.com/questions/4994201/is-object-empty">Is object empty?</a>
 */
Object.vizziniIsEmpty = function(obj)
{
    // null and undefined are "empty"
    if (obj === null) { return true; }

    // Assume if it has a length property with a non-zero value that that
    // property is correct.
    if (obj.length > 0) { return false; }
    if (obj.length === 0) { return true; }

    // Otherwise, does it have any properties of its own? Note that this doesn't
    // handle toString and valueOf enumeration bugs in IE < 9
    if (Object.getOwnPropertyNames(obj).length > 0) { return false; }

    return true;
};

Object.vizziniMerge = function(a, b)
{
    InputValidator.validateNotNull("a", a);
    InputValidator.validateNotNull("b", b);

    var keys = Object.keys(b);

    keys.forEach(function(key)
    {
        a[key] = b[key];
    });
};

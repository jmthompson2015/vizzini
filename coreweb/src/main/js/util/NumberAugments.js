/*
 * Provides utility methods for Number.
 */

Number.vizziniIsInteger = function(value)
{
    return typeof value === "number" && isFinite(value)
            && Math.floor(value) === value;
}

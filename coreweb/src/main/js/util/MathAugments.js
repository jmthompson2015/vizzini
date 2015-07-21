/*
 * Provides utility methods for Math.
 */

Math.vizziniRandomIntFromRange = function(min, max)
{
    var value = Math.vizziniRandomRealFromRange(min, max);

    return Math.floor(value);
}

Math.vizziniRandomRealFromRange = function(min, max)
{
    return Math.random() * (max - min) + min;
}

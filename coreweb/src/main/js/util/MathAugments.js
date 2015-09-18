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

Math.vizziniRound2 = function(value)
{
    var factor = 100.0;

    return Math.round(factor * value) / factor;
}

Math.vizziniRound4 = function(value)
{
    var factor = 10000.0;

    return Math.round(factor * value) / factor;
}

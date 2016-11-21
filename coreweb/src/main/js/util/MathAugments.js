/*
 * Provides utility methods for Math.
 */

/* jshint -W097 */
"use strict";

/*
 * @param number The number to format.
 * @param digits The number of digits to appear after the decimal point. (optional)
 */
Math.vizziniFormat = function(number, digits)
{
    var answer = number;

    if (number !== undefined && typeof number === "number" && !isNaN(number))
    {
        answer = number.toFixed(digits);
    }

    return answer;
};

Math.vizziniRandomBoolean = function()
{
    return (Math.random() < 0.5);
};

Math.vizziniRandomIntFromRange = function(min, max)
{
    var value = Math.vizziniRandomRealFromRange(min, max);

    return Math.floor(value);
};

Math.vizziniRandomRealFromRange = function(min, max)
{
    return Math.random() * (max - min) + min;
};

/*
 * @param number The number to round.
 *
 * @param digits The number of digits to appear after the decimal point.
 */
Math.vizziniRound = function(number, digits)
{
    var factor = Math.pow(10.0, digits);

    return Math.round(factor * number) / factor;
};

Math.vizziniRound2 = function(value)
{
    console.warn("Deprecated: Math.vizziniRound2(value); use Math.vizziniRound(number, digits) instead.");
    var factor = 100.0;

    return Math.round(factor * value) / factor;
};

Math.vizziniRound4 = function(value)
{
    console.warn("Deprecated: Math.vizziniRound4(value); use Math.vizziniRound(number, digits) instead.");
    var factor = 10000.0;

    return Math.round(factor * value) / factor;
};

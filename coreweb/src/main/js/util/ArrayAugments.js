/*
 * Provides utility methods for arrays.
 *
 * @see http://modernweb.com/2013/12/23/45-useful-javascript-tips-tricks-and-best-practices/
 */

/* jshint -W097 */
"use strict";

// add: use
// array.push(element);
// or
// array[array.length] = element;
// Note: This function modifies array.
// Note: This function modifies array.
// this now contains array2 also.
// @see http://stackoverflow.com/questions/351409/appending-to-array
Array.prototype.vizziniAddAll = function(array2)
{
    Array.prototype.push.apply(this, array2);
};

Array.prototype.vizziniContains = function(element)
{
    var i = this.length;
    while (i--)
    {
        if (this[i] === element)
        {
            return true;
        }
    }
    return false;
};

Array.prototype.vizziniContainsUsingArrayEquals = function(element)
{
    return this.vizziniContainsUsingEquals(element, function(a, b)
    {
        return a.vizziniEquals(b);
    });
};

Array.prototype.vizziniContainsUsingEquals = function(element, equalsFunction)
{
    var i = this.length;
    while (i--)
    {
        if (equalsFunction(this[i], element))
        {
            return true;
        }
    }
    return false;
};

Array.prototype.vizziniEquals = function(b)
{
    if (this === b)
    {
        return true;
    }
    if (b === null)
    {
        return false;
    }
    if (this.length != b.length)
    {
        return false;
    }

    for (var i = 0; i < this.length; i++)
    {
        if (this[i] !== b[i])
        {
            return false;
        }
    }

    return true;
};

Array.prototype.vizziniIntersect = function(array2)
{
    // Assumptions:
    // - input is not necessarily sorted
    // - an element only appears once in this and/or array2
    var answer = [];

    for (var i = 0; i < this.length; i++)
    {
        var n = this[i];

        if (array2.indexOf(n) >= 0)
        {
            answer.push(n);
        }
    }

    return answer;
};

Array.prototype.vizziniRandomElement = function()
{
    return this[Math.floor(Math.random() * this.length)];
};

// Note: This function modifies array.
Array.prototype.vizziniRemove = function(element)
{
    var index = this.indexOf(element);
    if (index >= 0)
    {
        this.splice(index, 1);
    }
};

// Note: This function modifies array.
Array.prototype.vizziniShuffle = function()
{
    this.sort(function()
    {
        return Math.random() - 0.5;
    });
};

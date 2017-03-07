"use strict";

// String.endsWith polyfill.
if (!String.prototype.endsWith)
{
    String.prototype.endsWith = function(searchString, position)
    {
        var subjectString = this.toString();
        if (position === undefined || position > subjectString.length)
        {
            position = subjectString.length;
        }
        position -= searchString.length;
        var lastIndex = subjectString.indexOf(searchString, position);
        return lastIndex !== -1 && lastIndex === position;
    };
}

// String.startsWith polyfill.
if (!String.prototype.startsWith)
{
    String.prototype.startsWith = function(searchString, position)
    {
        position = position || 0;
        return this.indexOf(searchString, position) === position;
    };
}

if (!String.pad)
{
    /*
     * @param n Number. (required)
     *
     * @param width Desired padded width. (required)
     *
     * @param z Pad character. (optional; default '0')
     */
    String.pad = function(n, width, z)
    {
        z = z || '0';
        n = n + '';
        return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
    };
}

String.prototype.vizziniReplaceAt = function(index, character)
{
    return this.substr(0, index) + character + this.substr(index + character.length);
};

String.prototype.vizziniReplaceAll = function(search, replacement)
{
    LOGGER.warn("Deprecated: use String.replace(regexp, newSubStr) e.g. bearing.replace(/B/g, \"_b\")");
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

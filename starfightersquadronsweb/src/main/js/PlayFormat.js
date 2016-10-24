define(function()
{
    "use strict";
    var PlayFormat =
    {
        STANDARD: "standard",
        CINEMATIC: "cinematic",
        EPIC: "epic",
        properties:
        {
            "standard":
            {
                name: "Standard",
                value: "standard",
                width: 915, // mm
                height: 915, // mm
            },
            "cinematic":
            {
                name: "Cinematic",
                value: "cinematic",
                width: 1830, // mm
                height: 915, // mm
            },
            "epic":
            {
                name: "Epic",
                value: "epic",
                width: 1830, // mm
                height: 915, // mm
            },
        },

        values: function()
        {
            return Object.getOwnPropertyNames(PlayFormat.properties);
        },
    };

    PlayFormat.isPathInPlayArea = function(playFormatKey, path)
    {
        InputValidator.validateNotNull("playFormatKey", playFormatKey);
        InputValidator.validateNotNull("path", path);

        var answer = true;
        var points = path.points();

        for (var i = 0; i < points.length; i += 2)
        {
            if (!PlayFormat.isPointInPlayArea(playFormatKey, points[i], points[i + 1]))
            {
                answer = false;
                break;
            }
        }

        return answer;
    };

    PlayFormat.isPointInPlayArea = function(playFormatKey, xIn, yIn)
    {
        InputValidator.validateNotNull("playFormatKey", playFormatKey);
        InputValidator.validateNotNull("xIn", xIn);
        InputValidator.validateNotNull("yIn", yIn);

        var playFormat = PlayFormat.properties[playFormatKey];
        var x = Math.round(xIn);
        var y = Math.round(yIn);

        return ((0 <= x) && (x < playFormat.width)) && ((0 <= y) && (y < playFormat.height));
    };

    if (Object.freeze)
    {
        Object.freeze(PlayFormat);
    }

    return PlayFormat;
});

define(function()
{
    "use strict";
    var FiringArc =
    {
        FORWARD: "forward",
        AFT: "aft",
        FULL_AFT: "fullAft",

        properties:
        {
            "forward":
            {
                name: "Forward",
                isInFiringArc: function(bearing)
                {
                    return (315 <= bearing) || (bearing <= 45);
                },
                value: "forward",
            },
            "aft":
            {
                name: "Aft",
                isInFiringArc: function(bearing)
                {
                    return (135 <= bearing) && (bearing <= 225);
                },
                value: "aft",
            },
            "fullAft":
            {
                name: "Full Aft",
                isInFiringArc: function(bearing)
                {
                    return (90 <= bearing) && (bearing <= 270);
                },
                value: "fullAft",
            },
        },

        values: function()
        {
            return Object.getOwnPropertyNames(FiringArc.properties);
        },
    };

    if (Object.freeze)
    {
        Object.freeze(FiringArc);
    }

    return FiringArc;
});

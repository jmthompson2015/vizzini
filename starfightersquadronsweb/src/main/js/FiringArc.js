define(function()
{
    "use strict";
    var FiringArc =
    {
        FORWARD: "forward",
        FORWARD_AND_AFT: "forwardAndAft",
        FORWARD_AND_FULL_AFT: "forwardAndFullAft",
        TURRET: "turret",

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
            "forwardAndAft":
            {
                name: "Forward and Aft",
                isInFiringArc: function(bearing)
                {
                    return ((315 <= bearing) || (bearing <= 45)) || ((135 <= bearing) && (bearing <= 225));
                },
                value: "forwardAndAft",
            },
            "forwardAndFullAft":
            {
                name: "Forward and Full Aft",
                isInFiringArc: function(bearing)
                {
                    return ((315 <= bearing) || (bearing <= 45)) || ((90 <= bearing) && (bearing <= 270));
                },
                value: "forwardAndFullAft",
            },
            "turret":
            {
                name: "Turret",
                isInFiringArc: function(bearing)
                {
                    return true;
                },
                value: "turret",
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

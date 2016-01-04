define(function()
{
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
                isInFiringArc: function(bearing)
                {
                    return (315 <= bearing) || (bearing <= 45);
                },
                value: "forward",
            },
            "forwardAndAft":
            {
                isInFiringArc: function(bearing)
                {
                    return ((315 <= bearing) || (bearing <= 45)) || ((135 <= bearing) && (bearing <= 225));
                },
                value: "forwardAndAft",
            },
            "forwardAndFullAft":
            {
                isInFiringArc: function(bearing)
                {
                    return ((315 <= bearing) || (bearing <= 45)) || ((90 <= bearing) && (bearing <= 270));
                },
                value: "forwardAndFullAft",
            },
            "turret":
            {
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
    };

    return FiringArc;
});

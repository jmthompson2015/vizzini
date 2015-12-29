define(function()
{
    var FiringArc =
    {
        FORWARD: "forward",
        FORWARD_AND_AFT: "forwardAndAft",
        FORWARD_AND_FULL_AFT: "forwardAndFullAft",

        properties:
        {
            "forward":
            {
                isInFiringArc: function(bearing)
                {
                    return (315 <= bearing) || (bearing <= 45);
                },
            },
            "forwardAndAft":
            {
                isInFiringArc: function(bearing)
                {
                    return ((315 <= bearing) || (bearing <= 45)) || ((135 <= bearing) && (bearing <= 225));
                },
            },
            "forwardAndFullAft":
            {
                isInFiringArc: function(bearing)
                {
                    return ((315 <= bearing) || (bearing <= 45)) || ((90 <= bearing) && (bearing <= 270));
                },
            },
        }
    };

    if (Object.freeze)
    {
        Object.freeze(FiringArc);
    };

    return FiringArc;
});

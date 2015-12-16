/*
 * Provides an enumeration of firing arcs for Starfighter Squadrons.
 */
define(function()
{
    var FiringArc =
    {
        FORWARD: "forward",
        FORWARD_AND_AFT: "forwardAndAft",
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
        }
    };

    if (Object.freeze)
    {
        Object.freeze(FiringArc);
    };

    return FiringArc;
});

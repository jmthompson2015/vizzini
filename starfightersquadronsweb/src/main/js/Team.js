/*
 * Provides an enumeration of teams for Starfighter Squadrons.
 *  
 * @see <a href="http://stijndewitt.wordpress.com/2014/01/26/enums-in-javascript/">Enums in JavaScript</a>
 */
define(function()
{
    var Team =
    {
        IMPERIAL: "imperial",
        REBEL: "rebel",
        SCUM: "scum",
        properties:
        {
            "imperial":
            {
                name: "Imperial",
                description: "Imperial team",
                value: "imperial",
            },
            "rebel":
            {
                name: "Rebel",
                description: "Rebel team",
                value: "rebel",
            },
            "scum":
            {
                name: "Scum & Villainy",
                description: "Scum & Villainy team",
                value: "scum",
            },
        },
        values: [ "imperial", "rebel", "scum" ]
    };

    if (Object.freeze)
    {
        Object.freeze(Team)
    };

    return Team;
});

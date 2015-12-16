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
                color: "rgb(0, 255, 0)",
                value: "imperial",
            },
            "rebel":
            {
                name: "Rebel",
                description: "Rebel team",
                color: "red",
                value: "rebel",
            },
            "scum":
            {
                name: "Scum & Villainy",
                description: "Scum & Villainy team",
                color: "rgb(255, 215, 0)",
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

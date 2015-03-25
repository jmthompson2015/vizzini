/*
 * Provides an enumeration of teams for Starfighter Squadrons.
 *  
 * @see <a href="http://stijndewitt.wordpress.com/2014/01/26/enums-in-javascript/">Enums in JavaScript</a>
 */
var Team =
{
    IMPERIAL: "imperial",
    REBEL: "rebel",
    properties:
    {
        "imperial":
        {
            name: "Imperial",
            description: "Imperial team",
            value: "imperial",
            opposite: "rebel"
        },
        "rebel":
        {
            name: "Rebel",
            description: "Rebel team",
            value: "rebel",
            opposite: "imperial"
        }
    },
    values: [ "imperial", "rebel" ]
};

if (Object.freeze)
{
    Object.freeze(Team)
};

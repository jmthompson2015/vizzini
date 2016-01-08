/*
 * Provides an enumeration of teams for Starfighter Squadrons.
 *  
 * @see <a href="http://stijndewitt.wordpress.com/2014/01/26/enums-in-javascript/">Enums in JavaScript</a>
 */
define(function()
{
    "use strict";
    var Team =
    {
        FIRST_ORDER: "firstOrder",
        IMPERIAL: "imperial",
        REBEL: "rebel",
        RESISTANCE: "resistance",
        SCUM: "scum",
        properties:
        {
            "firstOrder":
            {
                name: "First Order",
                shortName: "FirstOrder",
                description: "First Order team",
                color: "rgb(0, 255, 0)",
                value: "firstOrder",
            },
            "imperial":
            {
                name: "Imperial",
                shortName: "Imperial",
                description: "Imperial team",
                color: "rgb(0, 255, 0)",
                value: "imperial",
            },
            "rebel":
            {
                name: "Rebel",
                shortName: "Rebel",
                description: "Rebel team",
                color: "red",
                value: "rebel",
            },
            "resistance":
            {
                name: "Resistance",
                shortName: "Resistance",
                description: "Resistance team",
                color: "red",
                value: "resistance",
            },
            "scum":
            {
                name: "Scum & Villainy",
                shortName: "Scum",
                description: "Scum & Villainy team",
                color: "rgb(255, 215, 0)",
                value: "scum",
            },
        },

        values: function()
        {
            return Object.getOwnPropertyNames(Team.properties);
        },
    };

    if (Object.freeze)
    {
        Object.freeze(Team);
    }

    return Team;
});

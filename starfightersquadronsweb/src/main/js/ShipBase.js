/*
 * Provides an enumeration of ship bases for Starfighter Squadrons.
 */
define(function()
{
    var ShipBase =
    {
        STANDARD: "standard",
        LARGE: "large",
        HUGE1: "huge1",
        HUGE2: "huge2",
        properties:
        {
            "standard":
            {
                width: 40,
                height: 40,
            },
            "large":
            {
                width: 80,
                height: 80,
            },
            "huge1":
            {
                width: 195,
                height: 80,
            },
            "huge2":
            {
                width: 225,
                height: 80,
            }
        },

        values: function()
        {
            return Object.getOwnPropertyNames(ShipBase.properties);
        },
    };

    if (Object.freeze)
    {
        Object.freeze(ShipBase);
    };

    return ShipBase;
});

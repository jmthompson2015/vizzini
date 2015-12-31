/*
 * Provides an enumeration of ship bases for Starfighter Squadrons.
 */
define(function()
{
    var ShipBase =
    {
        SMALL: "small",
        LARGE: "large",
        HUGE1: "huge1",
        HUGE2: "huge2",
        properties:
        {
            "small":
            {
                name: "Small ship",
                width: 40,
                height: 40,
            },
            "large":
            {
                name: "Large ship",
                width: 80,
                height: 80,
            },
            "huge1":
            {
                name: "Huge ship",
                width: 195,
                height: 80,
            },
            "huge2":
            {
                name: "Huge ship",
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

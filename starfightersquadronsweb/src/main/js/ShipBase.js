define(function()
{
    "use strict";
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
                // GR-75 Medium Transport
                name: "Huge ship",
                width: 192,
                height: 80,
            },
            "huge2":
            {
                // CR90 Corvette
                name: "Huge ship",
                width: 224,
                height: 80,
            }
        },

        values: function()
        {
            return Object.getOwnPropertyNames(ShipBase.properties);
        },
    };

    ShipBase.isHuge = function(shipBaseKey)
    {
        InputValidator.validateNotNull("shipBaseKey", shipBaseKey);

        return shipBaseKey === ShipBase.HUGE1 || shipBaseKey === ShipBase.HUGE2;
    };

    if (Object.freeze)
    {
        Object.freeze(ShipBase);
    }

    return ShipBase;
});

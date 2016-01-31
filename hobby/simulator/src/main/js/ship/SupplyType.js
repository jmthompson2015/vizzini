define(function()
{
    "use strict";
    var SupplyType =
    {
        DATA: "data",
        FUEL: "fuel",
        POWER: "power",

        properties:
        {
            "data":
            {
                name: "Data",
            },
            "fuel":
            {
                name: "Fuel",
            },
            "power":
            {
                name: "Power",
            },
        },

        values: function()
        {
            return Object.getOwnPropertyNames(SupplyType.properties);
        },
    };

    if (Object.freeze)
    {
        Object.freeze(SupplyType);
    }

    return SupplyType;
});

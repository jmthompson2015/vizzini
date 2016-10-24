define(function()
{
    "use strict";
    var Content =
    {
        EMPTY: "empty",
        FOOD: "food",
        FOOTPRINT: "footprint",

        properties:
        {
            "empty":
            {
                name: "Empty",
                value: "empty",
            },
            "food":
            {
                name: "Food",
                value: "food",
            },
            "footprint":
            {
                name: "Footprint",
                value: "footprint",
            },
        },

        values: function()
        {
            return Object.getOwnPropertyNames(Content.properties);
        },
    };

    if (Object.freeze)
    {
        Object.freeze(Content);
    }

    return Content;
});

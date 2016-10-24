define(function()
{
    "use strict";
    var BodyType =
    {
        STAR: "star",
        PLANET: "planet",
        DWARF_PLANET: "dwarfPlanet",
        MOON: "moon",

        properties:
        {
            "star":
            {
                name: "Star",
                sortOrder: 0,
            },
            "planet":
            {
                name: "Planet",
                sortOrder: 1,
            },
            "dwarfPlanet":
            {
                name: "Dwarf Planet",
                sortOrder: 2,
            },
            "moon":
            {
                name: "Moon",
                sortOrder: 3,
            },
        },

        values: function()
        {
            return Object.getOwnPropertyNames(BodyType.properties);
        },
    };

    if (Object.freeze)
    {
        Object.freeze(BodyType);
    }

    return BodyType;
});

/*
 * Provides an enumeration of body types.
 */
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
}

/*
 * Provides an enumeration of the major solar system bodies.
 */
var Body =
{
    // Stars.
    SOL: "sol",

    // Planets.
    MERCURY: "mercury",
    VENUS: "venus",
    EARTH: "earth",
    MARS: "mars",
    JUPITER: "jupiter",
    SATURN: "saturn",
    URANUS: "uranus",
    NEPTUNE: "neptune",

    // Dwarf planets. The International Astronomical Union (IAU) currently
    // recognizes five dwarf planets.
    CERES: "ceres",
    PLUTO: "pluto",
    HAUMEA: "haumea",
    MAKEMAKE: "makemake",
    ERIS: "eris",

    // Moons. Nineteen moons are known to be massive enough to have relaxed into
    // a rounded shape under their own gravity.
    LUNA: "luna",
    IO: "io",
    EUROPA: "europa",
    GANYMEDE: "ganymede",
    CALLISTO: "callisto",
    MIMAS: "mimas",
    ENCELADUS: "enceladus",
    TETHYS: "tethys",
    DIONE: "dione",
    RHEA: "rhea",
    TITAN: "titan",
    IAPETUS: "iapetus",
    ARIEL: "ariel",
    UMBRIEL: "umbriel",
    TITANIA: "titania",
    OBERON: "oberon",
    MIRANDA: "miranda",
    TRITON: "triton",
    CHARON: "charon",

    // Other moons.
    PHOBOS: "phobos",
    DEIMOS: "deimos",

    properties:
    {
        // Stars.
        "sol":
        {
            name: "Sol",
            type: BodyType.STAR,
            id: "10",
            parent: undefined,
        },

        // Planets.
        "mercury":
        {
            name: "Mercury",
            type: BodyType.PLANET,
            id: "199",
            parent: "sol",
        },
        "venus":
        {
            name: "Venus",
            type: BodyType.PLANET,
            id: "299",
            parent: "sol",
        },
        "earth":
        {
            name: "Earth",
            type: BodyType.PLANET,
            id: "399",
            parent: "sol",
        },
        "mars":
        {
            name: "Mars",
            type: BodyType.PLANET,
            id: "499",
            parent: "sol",
        },
        "jupiter":
        {
            name: "Jupiter",
            type: BodyType.PLANET,
            id: "599",
            parent: "sol",
            mass: 1898.13E+24, // kg
            radius: 71492, // km
        },
        "saturn":
        {
            name: "Saturn",
            type: BodyType.PLANET,
            id: "699",
            parent: "sol",
            mass: 5.68319E+26, // kg
            radius: 60268, // km
        },
        "uranus":
        {
            name: "Uranus",
            type: BodyType.PLANET,
            id: "799",
            parent: "sol",
            mass: 86.8103E+24, // kg
            radius: 25559, // km
        },
        "neptune":
        {
            name: "Neptune",
            type: BodyType.PLANET,
            id: "899",
            parent: "sol",
            mass: 102.41E+24, // kg
            radius: 24766, // km
        },

        // Dwarf planets.
        "ceres":
        {
            name: "Ceres",
            type: BodyType.DWARF_PLANET,
            id: "Ceres",
            parent: "sol",
            mass: 9.393E+20, // kg
            radius: 473, // km
        },
        "pluto":
        {
            name: "Pluto",
            type: BodyType.DWARF_PLANET,
            id: "999",
            parent: "sol",
            mass: 1.303E+22, // kg
            radius: 1187, // km
        },
        "haumea":
        {
            name: "Haumea",
            type: BodyType.DWARF_PLANET,
            id: "Haumea",
            parent: "sol",
            mass: 4.006E+21, // kg
            radius: 620, // km
        },
        "makemake":
        {
            name: "Makemake",
            type: BodyType.DWARF_PLANET,
            id: "Makemake",
            parent: "sol",
            mass: 2E+21, // kg
            radius: 715, // km
        },
        "eris":
        {
            name: "Eris",
            type: BodyType.DWARF_PLANET,
            id: "Eris",
            parent: "sol",
            mass: 1.66E+22, // kg
            radius: 1163, // km
        },

        // Moons.
        "luna":
        {
            name: "Luna",
            type: BodyType.MOON,
            id: "301",
            parent: "earth",
        },
        "phobos":
        {
            name: "Phobos",
            type: BodyType.MOON,
            id: "401",
            parent: "mars",
        },
        "deimos":
        {
            name: "Deimos",
            type: BodyType.MOON,
            id: "402",
            parent: "mars",
        },
        "io":
        {
            name: "Io",
            type: BodyType.MOON,
            id: "501",
            parent: "jupiter",
        },
        "europa":
        {
            name: "Europa",
            type: BodyType.MOON,
            id: "502",
            parent: "jupiter",
        },
        "ganymede":
        {
            name: "Ganymede",
            type: BodyType.MOON,
            id: "503",
            parent: "jupiter",
        },
        "callisto":
        {
            name: "Callisto",
            type: BodyType.MOON,
            id: "504",
            parent: "jupiter",
        },
        "mimas":
        {
            name: "Mimas",
            type: BodyType.MOON,
            id: "601",
            parent: "saturn",
        },
        "enceladus":
        {
            name: "Enceladus",
            type: BodyType.MOON,
            id: "602",
            parent: "saturn",
        },
        "tethys":
        {
            name: "Tethys",
            type: BodyType.MOON,
            id: "603",
            parent: "saturn",
        },
        "dione":
        {
            name: "Dione",
            type: BodyType.MOON,
            id: "604",
            parent: "saturn",
        },
        "rhea":
        {
            name: "Rhea",
            type: BodyType.MOON,
            id: "605",
            parent: "saturn",
        },
        "titan":
        {
            name: "Titan",
            type: BodyType.MOON,
            id: "606",
            parent: "saturn",
        },
        "iapetus":
        {
            name: "Iapetus",
            type: BodyType.MOON,
            id: "607",
            parent: "saturn",
        },
        "ariel":
        {
            name: "Ariel",
            type: BodyType.MOON,
            id: "701",
            parent: "uranus",
        },
        "umbriel":
        {
            name: "Umbriel",
            type: BodyType.MOON,
            id: "702",
            parent: "uranus",
        },
        "titania":
        {
            name: "Titania",
            type: BodyType.MOON,
            id: "703",
            parent: "uranus",
        },
        "oberon":
        {
            name: "Oberon",
            type: BodyType.MOON,
            id: "704",
            parent: "uranus",
        },
        "miranda":
        {
            name: "Miranda",
            type: BodyType.MOON,
            id: "705",
            parent: "uranus",
        },
        "triton":
        {
            name: "Triton",
            type: BodyType.MOON,
            id: "801",
            parent: "neptune",
        },
        "charon":
        {
            name: "Charon",
            type: BodyType.MOON,
            id: "901",
            parent: "pluto",
        },
    },

    values: function()
    {
        return Object.getOwnPropertyNames(Body.properties);
    },

    valuesByType: function(type)
    {
        InputValidator.validateNotNull("type", type);

        return this.values().filter(function(body)
        {
            return Body.properties[body].type === type;
        });
    },
}

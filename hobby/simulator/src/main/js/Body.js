/*
 * @see https://en.wikipedia.org/wiki/Axial_tilt#Solar_System_bodies
 */
define([ "BodyType", "Constants", "Quaternion", "Vector" ], function(BodyType, Constants, Quaternion, Vector)
{
    "use strict";
    var Body =
    {
        // Star.
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
                mass: 1.988544e+30, // kg
                radius: 6.9630e+05, // km
                northPole: Quaternion.newInstanceRADec(286.13, 63.87).preMultiply(Vector.X_AXIS).unit(),
                rotationRate: 360.0 / (25.38 * Constants.DAYS_TO_SECONDS), // deg/sec
                value: "sol",
            },

            // Planets.
            "mercury":
            {
                name: "Mercury",
                type: BodyType.PLANET,
                id: "199",
                parent: "sol",
                mass: 3.3020e+23, // kg
                radius: 2.4400e+03, // km
                northPole: Quaternion.newInstanceRADec(281.01, 61.42).preMultiply(Vector.X_AXIS).unit(),
                rotationRate: 360.0 / (58.646 * Constants.DAYS_TO_SECONDS), // deg/sec
                value: "mercury",
            },
            "venus":
            {
                name: "Venus",
                type: BodyType.PLANET,
                id: "299",
                parent: "sol",
                mass: 4.8685e+24, // kg
                radius: 6.0518e+03, // km
                northPole: Quaternion.newInstanceRADec(92.76, -67.16).preMultiply(Vector.X_AXIS).unit(),
                rotationRate: 360.0 / (243.025 * Constants.DAYS_TO_SECONDS), // deg/sec
                value: "venus",
            },
            "earth":
            {
                name: "Earth",
                type: BodyType.PLANET,
                id: "399",
                parent: "sol",
                mass: 5.97219E+24, // kg
                equatorialRadius: 6378.14, // km
                polarRadius: 6356.752, // km
                rotationRate: 360.0 / (0.99726968 * Constants.DAYS_TO_SECONDS), // deg/sec
                value: "earth",
            },
            "mars":
            {
                name: "Mars",
                type: BodyType.PLANET,
                id: "499",
                parent: "sol",
                mass: 6.4185e+23, // kg
                radius: 3389.9, // km
                northPole: Quaternion.newInstanceRADec(317.68, 52.89).preMultiply(Vector.X_AXIS).unit(),
                rotationRate: 360.0 / (1.025957 * Constants.DAYS_TO_SECONDS), // deg/sec
                value: "mars",
            },
            "jupiter":
            {
                name: "Jupiter",
                type: BodyType.PLANET,
                id: "599",
                parent: "sol",
                mass: 1.89813e+27, // kg
                equatorialRadius: 71492, // km
                polarRadius: 66854, // km
                northPole: Quaternion.newInstanceRADec(268.05, 64.49).preMultiply(Vector.X_AXIS).unit(),
                rotationRate: 360.0 / (9 * Constants.HOURS_TO_SECONDS + 55 * Constants.MINUTES_TO_SECONDS + 29.685), // deg/sec
                value: "jupiter",
            },
            "saturn":
            {
                name: "Saturn",
                type: BodyType.PLANET,
                id: "699",
                parent: "sol",
                mass: 5.6832e+26, // kg
                equatorialRadius: 60268, // km
                polarRadius: 54364, // km
                northPole: Quaternion.newInstanceRADec(40.60, 83.54).preMultiply(Vector.X_AXIS).unit(),
                rotationRate: 360.0 / (10 * Constants.HOURS_TO_SECONDS + 39 * Constants.MINUTES_TO_SECONDS + 22.4), // deg/sec
                // @see https://en.wikipedia.org/wiki/Rings_of_Saturn
                ringInnerRadius: 60268 + 7000, // km
                ringOuterRadius: 60268 + 80000, // km
                value: "saturn",
            },
            "uranus":
            {
                name: "Uranus",
                type: BodyType.PLANET,
                id: "799",
                parent: "sol",
                mass: 8.68103e+25, // kg
                equatorialRadius: 25559, // km
                polarRadius: 24973, // km
                value: "uranus",
            },
            "neptune":
            {
                name: "Neptune",
                type: BodyType.PLANET,
                id: "899",
                parent: "sol",
                mass: 1.0241e+26, // kg
                equatorialRadius: 24766, // km
                polarRadius: 24342, // km
                value: "neptune",
            },

            // Dwarf planets.
            "ceres":
            {
                name: "Ceres",
                type: BodyType.DWARF_PLANET,
                id: "Ceres",
                parent: "sol",
                mass: 9.3930e+20, // kg
                radius: 4.7300e+02, // km
                value: "ceres",
            },
            "pluto":
            {
                name: "Pluto",
                type: BodyType.DWARF_PLANET,
                id: "999",
                parent: "sol",
                mass: 1.3030e+22, // kg
                radius: 1.1870e+03, // km
                value: "pluto",
            },
            "haumea":
            {
                name: "Haumea",
                type: BodyType.DWARF_PLANET,
                id: "Haumea",
                parent: "sol",
                mass: 4.0060e+21, // kg
                radius: 6.2000e+02, // km
                value: "haumea",
            },
            "makemake":
            {
                name: "Makemake",
                type: BodyType.DWARF_PLANET,
                id: "Makemake",
                parent: "sol",
                mass: 2.0000e+21, // kg
                radius: 7.1500e+02, // km
                value: "makemake",
            },
            "eris":
            {
                name: "Eris",
                type: BodyType.DWARF_PLANET,
                id: "Eris",
                parent: "sol",
                mass: 1.6600e+22, // kg
                radius: 1.1630e+03, // km
                value: "eris",
            },

            // Moons.
            "luna":
            {
                name: "Luna",
                type: BodyType.MOON,
                id: "301",
                parent: "earth",
                mass: 7.3490e+22, // kg
                radius: 1.7375e+03, // km
                rotationRate: 360.0 / (27.321661 * Constants.DAYS_TO_SECONDS), // deg/sec
                value: "luna",
            },
            "phobos":
            {
                name: "Phobos",
                type: BodyType.MOON,
                id: "401",
                parent: "mars",
                mass: 1.0800e+16, // kg
                radiusX: 13.1, // km
                radiusY: 11.1, // km
                radiusZ: 9.3, // km
                rotationRate: 360.0 / (0.319 * Constants.DAYS_TO_SECONDS), // deg/sec
                value: "phobos",
            },
            "deimos":
            {
                name: "Deimos",
                type: BodyType.MOON,
                id: "402",
                parent: "mars",
                mass: 1.80e+15, // kg
                radiusX: 7.8, // km
                radiusY: 6.0, // km
                radiusZ: 5.1, // km
                rotationRate: 360.0 / (1.263 * Constants.DAYS_TO_SECONDS), // deg/sec
                value: "deimos",
            },
            "io":
            {
                name: "Io",
                type: BodyType.MOON,
                id: "501",
                parent: "jupiter",
                mass: 8.9330e+22, // kg
                radius: 1.8213e+03, // km
                rotationRate: 360.0 / (1.769138 * Constants.DAYS_TO_SECONDS), // deg/sec
                value: "io",
            },
            "europa":
            {
                name: "Europa",
                type: BodyType.MOON,
                id: "502",
                parent: "jupiter",
                mass: 4.7970e+22, // kg
                radius: 1.5650e+03, // km
                rotationRate: 360.0 / (3.551810 * Constants.DAYS_TO_SECONDS), // deg/sec
                value: "europa",
            },
            "ganymede":
            {
                name: "Ganymede",
                type: BodyType.MOON,
                id: "503",
                parent: "jupiter",
                mass: 1.4820e+23, // kg
                radius: 2.6340e+03, // km
                rotationRate: 360.0 / (7.154553 * Constants.DAYS_TO_SECONDS), // deg/sec
                value: "ganymede",
            },
            "callisto":
            {
                name: "Callisto",
                type: BodyType.MOON,
                id: "504",
                parent: "jupiter",
                mass: 1.0760e+23, // kg
                radius: 2.4030e+03, // km
                rotationRate: 360.0 / (16.689018 * Constants.DAYS_TO_SECONDS), // deg/sec
                value: "callisto",
            },
            "mimas":
            {
                name: "Mimas",
                type: BodyType.MOON,
                id: "601",
                parent: "saturn",
                mass: 3.7500e+22, // kg
                radius: 1.9880e+02, // km
                rotationRate: 360.0 / (0.9424218 * Constants.DAYS_TO_SECONDS), // deg/sec
                value: "mimas",
            },
            "enceladus":
            {
                name: "Enceladus",
                type: BodyType.MOON,
                id: "602",
                parent: "saturn",
                mass: 1.0805e+23, // kg
                radius: 2.5230e+02, // km
                rotationRate: 360.0 / (1.370218 * Constants.DAYS_TO_SECONDS), // deg/sec
                value: "enceladus",
            },
            "tethys":
            {
                name: "Tethys",
                type: BodyType.MOON,
                id: "603",
                parent: "saturn",
                mass: 6.1760e+23, // kg
                radius: 5.3630e+02, // km
                rotationRate: 360.0 / (1.888 * Constants.DAYS_TO_SECONDS), // deg/sec
                value: "tethys",
            },
            "dione":
            {
                name: "Dione",
                type: BodyType.MOON,
                id: "604",
                parent: "saturn",
                mass: 1.09572e+24, // kg
                radius: 5.6250e+02, // km
                rotationRate: 360.0 / (2.736915 * Constants.DAYS_TO_SECONDS), // deg/sec
                value: "dione",
            },
            "rhea":
            {
                name: "Rhea",
                type: BodyType.MOON,
                id: "605",
                parent: "saturn",
                mass: 2.3090e+24, // kg
                radius: 7.6450e+02, // km
                rotationRate: 360.0 / (4.518 * Constants.DAYS_TO_SECONDS), // deg/sec
                value: "rhea",
            },
            "titan":
            {
                name: "Titan",
                type: BodyType.MOON,
                id: "606",
                parent: "saturn",
                mass: 1.3455e+26, // kg
                radius: 2.5755e+03, // km
                rotationRate: 360.0 / (15.945421 * Constants.DAYS_TO_SECONDS), // deg/sec
                value: "titan",
            },
            "iapetus":
            {
                name: "Iapetus",
                type: BodyType.MOON,
                id: "608",
                parent: "saturn",
                mass: 180.59e+22, // kg
                radius: 734.5, // km
                rotationRate: 360.0 / (79.33 * Constants.DAYS_TO_SECONDS), // deg/sec
                value: "iapetus",
            },
            "ariel":
            {
                name: "Ariel",
                type: BodyType.MOON,
                id: "701",
                parent: "uranus",
                mass: 1.3530e+21, // kg
                radius: 5.8110e+02, // km
                value: "ariel",
            },
            "umbriel":
            {
                name: "Umbriel",
                type: BodyType.MOON,
                id: "702",
                parent: "uranus",
                mass: 1.1720e+21, // kg
                radius: 5.8470e+02, // km
                value: "umbriel",
            },
            "titania":
            {
                name: "Titania",
                type: BodyType.MOON,
                id: "703",
                parent: "uranus",
                mass: 3.5270e+21, // kg
                radius: 7.8890e+02, // km
                value: "titania",
            },
            "oberon":
            {
                name: "Oberon",
                type: BodyType.MOON,
                id: "704",
                parent: "uranus",
                mass: 3.0140e+21, // kg
                radius: 7.6140e+02, // km
                value: "oberon",
            },
            "miranda":
            {
                name: "Miranda",
                type: BodyType.MOON,
                id: "705",
                parent: "uranus",
                mass: 6.5900e+19, // kg
                radius: 2.4000e+02, // km
                value: "miranda",
            },
            "triton":
            {
                name: "Triton",
                type: BodyType.MOON,
                id: "801",
                parent: "neptune",
                mass: 2.1470e+22, // kg
                radius: 1.3526e+03, // km
                value: "triton",
            },
            "charon":
            {
                name: "Charon",
                type: BodyType.MOON,
                id: "901",
                parent: "pluto",
                mass: 1.5300e+21, // kg
                radius: 6.0500e+02, // km
                value: "charon",
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
    };

    Body.values().forEach(function(bodyKey)
    {
        var body = Body.properties[bodyKey];

        if (!body.maxRadius)
        {
            if (body.ringOuterRadius)
            {
                body.maxRadius = body.ringOuterRadius;
            }
            else if (body.radiusX && body.radiusY && body.radiusZ)
            {
                body.maxRadius = Math.max(body.radiusX, Math.max(body.radiusY, body.radiusZ));
            }
            else if (body.equatorialRadius && body.polarRadius)
            {
                body.maxRadius = Math.max(body.equatorialRadius, body.polarRadius);
            }
            else if (body.radius)
            {
                body.maxRadius = body.radius;
            }
            else
            {
                throw "Unknown radius for body: " + body.value;
            }
        }

        if (!body.northPole)
        {
            body.northPole = Vector.Z_AXIS;
        }
    });

    if (Object.freeze)
    {
        Object.freeze(Body);
    }

    return Body;
});

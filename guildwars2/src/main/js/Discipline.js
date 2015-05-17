/*
 * Provides an enumeration of disciplines.
 *  
 * @see <a href="http://stijndewitt.wordpress.com/2014/01/26/enums-in-javascript/">Enums in JavaScript</a>
 */
var Discipline =
{
    ARMORSMITH: "armorsmith",
    ARTIFICER: "artificer",
    COOK: "cook",
    HUNTSMAN: "huntsman",
    JEWELER: "jeweler",
    LEATHERWORKER: "leatherworker",
    TAILOR: "tailor",
    WEAPONSMITH: "weaponsmith",
    properties:
    {
        "armorsmith":
        {
            id: 4,
            name: "Armorsmith",
        },
        "artificer":
        {
            id: 2,
            name: "Artificer",
        },
        "cook":
        {
            id: 8,
            name: "Cook",
        },
        "huntsman":
        {
            id: 1,
            name: "Huntsman",
        },
        "jeweler":
        {
            id: 7,
            name: "Jeweler",
        },
        "leatherworker":
        {
            id: 5,
            name: "Leatherworker",
        },
        "tailor":
        {
            id: 6,
            name: "Tailor",
        },
        "weaponsmith":
        {
            id: 3,
            name: "Weaponsmith",
        },
    },
    values: [ "armorsmith", "artificer", "cook", "huntsman", "jeweler",
            "leatherworker", "tailor", "weaponsmith", ],
};

Discipline.findById = function(id)
{
    var answer;

    if (Number.isInteger(id))
    {
        var values = Discipline.values;
        var properties = Discipline.properties;

        for (var i = 0; i < values.length; i++)
        {
            var value = values[i];

            if (properties[value].id === id)
            {
                answer = value;
                break;
            }
        }
    }

    return answer;
}

if (Object.freeze)
{
    Object.freeze(Discipline)
};

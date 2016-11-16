/*
 * Provides an enumeration of rarities.
 *  
 * @see <a href="http://stijndewitt.wordpress.com/2014/01/26/enums-in-javascript/">Enums in JavaScript</a>
 */
var Rarity =
{
    JUNK: "junk",
    COMMON: "common",
    FINE: "fine",
    MASTERWORK: "masterwork",
    RARE: "rare",
    EXOTIC: "exotic",
    ASCENDED: "ascended",
    LEGENDARY: "legendary",
    properties:
    {
        "junk":
        {
            id: 0,
            name: "Junk",
        },
        "common":
        {
            id: 1,
            name: "Common",
        },
        "fine":
        {
            id: 2,
            name: "Fine",
        },
        "masterwork":
        {
            id: 3,
            name: "Masterwork",
        },
        "rare":
        {
            id: 4,
            name: "Rare",
        },
        "exotic":
        {
            id: 5,
            name: "Exotic",
        },
        "ascended":
        {
            id: 6,
            name: "Ascended",
        },
        "legendary":
        {
            id: 7,
            name: "Legendary",
        },
    },
    values: [ "junk", "common", "fine", "masterwork", "rare", "exotic",
            "ascended", "legendary", ],
};

Rarity.findById = function(id)
{
    var answer;

    if (Number.isInteger(id))
    {
        var values = Rarity.values;
        var properties = Rarity.properties;

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
    Object.freeze(Rarity)
};

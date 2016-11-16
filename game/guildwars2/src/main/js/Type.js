/*
 * Provides an enumeration of types.
 *  
 * @see <a href="http://stijndewitt.wordpress.com/2014/01/26/enums-in-javascript/">Enums in JavaScript</a>
 */
var Type =
{
    ARMOR: "armor",
    BACK: "back",
    BAG: "bag",
    CONSUMABLE: "consumable",
    CONTAINER: "container",
    CRAFTING_MATERIAL: "craftingMaterial",
    GATHERING: "gathering",
    GIZMO: "gizmo",
    MINI: "mini",
    TOOL: "tool",
    TRINKET: "trinket",
    TROPHY: "trophy",
    UPGRADE_COMPONENT: "upgradeComponent",
    WEAPON: "weapon",
    properties:
    {
        "armor":
        {
            id: 0,
            name: "Armor",
        },
        "back":
        {
            id: 19,
            name: "Back",
        },
        "bag":
        {
            id: 2,
            name: "Bag",
        },
        "consumable":
        {
            id: 3,
            name: "Consumable",
        },
        "container":
        {
            id: 4,
            name: "Container",
        },
        "craftingMaterial":
        {
            id: 5,
            name: "Crafting Material",
        },
        "gathering":
        {
            id: 6,
            name: "Gathering",
        },
        "gizmo":
        {
            id: 7,
            name: "Gizmo",
        },
        "mini":
        {
            id: 11,
            name: "Mini",
        },
        "tool":
        {
            id: 13,
            name: "Tool",
        },
        "trinket":
        {
            id: 15,
            name: "Trinket",
        },
        "trophy":
        {
            id: 16,
            name: "Trophy",
        },
        "upgradeComponent":
        {
            id: 17,
            name: "Upgrade Component",
        },
        "weapon":
        {
            id: 18,
            name: "Weapon",
        },
    },
    values: [ "armor", "back", "bag", "consumable", "container",
            "craftingMaterial", "gathering", "gizmo", "mini", "tool",
            "trinket", "trophy", "upgradeComponent", "weapon", ],
};

Type.findById = function(id)
{
    var answer;

    if (Number.isInteger(id))
    {
        var values = Type.values;
        var properties = Type.properties;

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
    Object.freeze(Type)
};

define(function()
{
    "use strict";
    var Direction =
    {
        NORTH: "north",
        EAST: "east",
        SOUTH: "south",
        WEST: "west",

        properties:
        {
            "north":
            {
                name: "North",
                dx: 0,
                dy: -1,
                left: function()
                {
                    return Direction.WEST;
                },
                right: function()
                {
                    return Direction.EAST;
                },
                value: "north",
            },
            "east":
            {
                name: "East",
                dx: 1,
                dy: 0,
                left: function()
                {
                    return Direction.NORTH;
                },
                right: function()
                {
                    return Direction.SOUTH;
                },
                value: "east",
            },
            "south":
            {
                name: "South",
                dx: 0,
                dy: 1,
                left: function()
                {
                    return Direction.EAST;
                },
                right: function()
                {
                    return Direction.WEST;
                },
                value: "south",
            },
            "west":
            {
                name: "West",
                dx: -1,
                dy: 0,
                left: function()
                {
                    return Direction.SOUTH;
                },
                right: function()
                {
                    return Direction.NORTH;
                },
                value: "west",
            },
        },

        values: function()
        {
            return Object.getOwnPropertyNames(Direction.properties);
        },
    };

    if (Object.freeze)
    {
        Object.freeze(Direction);
    }

    return Direction;
});

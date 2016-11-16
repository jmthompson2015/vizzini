define(function()
{
    "use strict";
    var DamageCardTrait =
    {
        PILOT: "pilot",
        SHIP: "ship",
        properties:
        {
            "pilot":
            {
                name: "Pilot",
            },
            "ship":
            {
                name: "Ship",
            },
        },

        values: function()
        {
            return [ DamageCardTrait.PILOT, DamageCardTrait.SHIP ];
        },
    };

    return DamageCardTrait;
});

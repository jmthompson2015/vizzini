define(function()
{
    "use strict";
    var DamageCardTrait =
    {
        PILOT: "pilot",
        SHIP: "ship",

        values: function()
        {
            return [ DamageCardTrait.PILOT, DamageCardTrait.SHIP ];
        },
    };

    return DamageCardTrait;
});

/*
 * Provides damage abilities for the Planning Phase.
 */
define(function()
{
    "use strict";
    var DamageAbility1 = {};

    DamageAbility1.toString = function()
    {
        return "DamageAbility1";
    };

    if (Object.freeze)
    {
        Object.freeze(DamageAbility1);
    }

    return DamageAbility1;
});

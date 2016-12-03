/*
 * Provides upgrade abilities for the Planning Phase.
 */
define(function()
{
    "use strict";
    var UpgradeAbility1 = {};

    UpgradeAbility1.toString = function()
    {
        return "UpgradeAbility1";
    };

    if (Object.freeze)
    {
        Object.freeze(UpgradeAbility1);
    }

    return UpgradeAbility1;
});

/*
 * Provides pilot abilities for the Planning Phase.
 */
define(function()
{
    "use strict";
    var PilotAbility1 = {};

    PilotAbility1.toString = function()
    {
        return "PilotAbility1";
    };

    if (Object.freeze)
    {
        Object.freeze(PilotAbility1);
    }

    return PilotAbility1;
});

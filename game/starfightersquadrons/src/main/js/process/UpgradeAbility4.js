/*
 * Provides upgrade abilities for the End Phase.
 */
define(["Phase", "UpgradeCard", "process/Action"], function(Phase, UpgradeCard, Action)
{
    "use strict";
    var UpgradeAbility4 = {};

    UpgradeAbility4[Phase.END_START] = {};

    UpgradeAbility4[Phase.END_START][UpgradeCard.QUANTUM_STORM] = {
        // At the start of the End phase, if you have 1 or fewer energy tokens, gain 1 energy token.
        condition: function(store, token)
        {
            return token.energyCount() <= 1;
        },
        consequent: function(store, token)
        {
            store.dispatch(Action.addEnergyCount(token));
        },
    };

    UpgradeAbility4.toString = function()
    {
        return "UpgradeAbility4";
    };

    if (Object.freeze)
    {
        Object.freeze(UpgradeAbility4);
    }

    return UpgradeAbility4;
});

/*
 * Provides upgrade abilities for the End Phase.
 */
define(["Phase", "UpgradeCard", "process/Action"], function(Phase, UpgradeCard, Action)
{
    "use strict";
    var UpgradeAbility4 = {};

    UpgradeAbility4[Phase.END_START] = {};

    UpgradeAbility4[Phase.END_START][UpgradeCard.QUANTUM_STORM] = function(store, token)
    {
        var attacker = Selector.activeToken(store.getState());

        if (attacker === token)
        {
            if (token.energyCount() <= 1)
            {
                store.dispatch(Action.addEnergyCount(token));
            }
        }
    };

    if (Object.freeze)
    {
        Object.freeze(UpgradeAbility4);
    }

    return UpgradeAbility4;
});

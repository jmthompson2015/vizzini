/*
 * Provides pilot abilities for the Combat Phase.
 */
define(["Phase", "Pilot"],
    function(Phase, Pilot)
    {
        "use strict";
        var PilotAbility3 = {};

        ////////////////////////////////////////////////////////////////////////
        PilotAbility3[Phase.COMBAT_ROLL_ATTACK_DICE] = {};

        PilotAbility3[Phase.COMBAT_ROLL_ATTACK_DICE][Pilot.COLONEL_VESSERY] = {
            condition: function(store, token)
            {
                var defender = token.combatState().combatAction().defender();
                var targetLocks = Selector.defenderTargetLocks(store.getState(), defender);
                return targetLocks.length > 0;
            },
            consequent: function(store, token)
            {
                action(store, token, function()
                {
                    var defender = attacker.combatState().combatAction().defender();
                    var targetLock = new TargetLock(store, attacker, defender);
                    attacker.addAttackerTargetLock(targetLock);
                });
            },
        };

        function action(store, token, pilotFunction)
        {
            InputValidator.validateNotNull("store", store);
            InputValidator.validateNotNull("token", token);
            InputValidator.validateNotNull("pilotFunction", pilotFunction);

            var activeToken = Selector.activeToken(store.getState());

            if (activeToken === token)
            {
                pilotFunction(store, activeToken);
            }
        }

        if (Object.freeze)
        {
            Object.freeze(PilotAbility3);
        }

        return PilotAbility3;
    });

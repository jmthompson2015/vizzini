/*
 * Provides damage abilities for the Combat Phase.
 */
define(["AttackDice", "DamageCard", "DamageCardV2", "Phase"],
    function(AttackDice, DamageCard, DamageCardV2, Phase)
    {
        "use strict";
        var DamageAbility3 = {};

        ////////////////////////////////////////////////////////////////////////
        DamageAbility3[Phase.COMBAT_START] = {};

        DamageAbility3[Phase.COMBAT_START][DamageCard.CONSOLE_FIRE] = {
            // At the start of each Combat phase, roll 1 attack die. On a Hit result, suffer 1 damage.
            condition: function(store, token)
            {
                var activeToken = getActiveToken(store);
                return token === activeToken;
            },
            consequent: function(store, token)
            {
                var attackDice = new AttackDice(1);
                if (attackDice.hitCount() === 1)
                {
                    var environment = store.getState().environment;
                    token.addDamage(environment.drawDamage());
                }
            },
        };

        DamageAbility3[Phase.COMBAT_START][DamageCardV2.CONSOLE_FIRE] = {
            // At the start of each Combat phase, roll 1 attack die. On a Hit result, suffer 1 damage.
            condition: function(store, token)
            {
                var activeToken = getActiveToken(store);
                return token === activeToken;
            },
            consequent: function(store, token)
            {
                var attackDice = new AttackDice(1);
                if (attackDice.hitCount() === 1)
                {
                    var environment = store.getState().environment;
                    token.addDamage(environment.drawDamage());
                }
            },
        };

        ////////////////////////////////////////////////////////////////////////
        function getActiveToken(store)
        {
            InputValidator.validateNotNull("store", store);

            return Selector.activeToken(store.getState());
        }

        if (Object.freeze)
        {
            Object.freeze(DamageAbility3);
        }

        return DamageAbility3;
    });

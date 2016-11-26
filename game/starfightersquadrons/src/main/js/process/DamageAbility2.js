/*
 * Provides damage abilities for the Activation Phase.
 */
define(["DamageCard", "DamageCardV2", "Phase", "process/Action", "process/Selector"],
    function(DamageCard, DamageCardV2, Phase, Action, Selector)
    {
        "use strict";
        var DamageAbility2 = {};

        ////////////////////////////////////////////////////////////////////////
        DamageAbility2[Phase.ACTIVATION_PERFORM_ACTION] = {};

        DamageAbility2[Phase.ACTIVATION_PERFORM_ACTION][DamageCard.CONSOLE_FIRE] = {
            // Action: Flip this card facedown.
            condition: function(store, token)
            {
                var activeToken = getActiveToken(store);
                return token === activeToken;
            },
            consequent: function(store, token)
            {
                flipCardFacedown(store, token, DamageCard.CONSOLE_FIRE);
            },
        };

        DamageAbility2[Phase.ACTIVATION_PERFORM_ACTION][DamageCardV2.CONSOLE_FIRE] = {
            // Action: Flip this card facedown.
            condition: function(store, token)
            {
                var activeToken = getActiveToken(store);
                return token === activeToken;
            },
            consequent: function(store, token)
            {
                flipCardFacedown(store, token, DamageCardV2.CONSOLE_FIRE);
            },
        };

        DamageAbility2[Phase.ACTIVATION_PERFORM_ACTION][DamageCard.DAMAGED_SENSOR_ARRAY] = {
            // Action: Roll 1 attack die. On a Hit result, flip this card facedown.
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
                    flipCardFacedown(store, token, DamageCard.DAMAGED_SENSOR_ARRAY);
                }
            },
        };

        DamageAbility2[Phase.ACTIVATION_PERFORM_ACTION][DamageCardV2.DAMAGED_SENSOR_ARRAY] = {
            // Action: Roll 1 attack die. On a Hit or Critical Hit result, flip this card facedown.
            condition: function(store, token)
            {
                var activeToken = getActiveToken(store);
                return token === activeToken;
            },
            consequent: function(store, token)
            {
                var attackDice = new AttackDice(1);
                if (attackDice.hitCount() === 1 || attackDice.criticalHitCount() === 1)
                {
                    flipCardFacedown(store, token, DamageCardV2.DAMAGED_SENSOR_ARRAY);
                }
            },
        };

        DamageAbility2[Phase.ACTIVATION_PERFORM_ACTION][DamageCardV2.LOOSE_STABILIZER] = {
            // Action: Flip this card facedown.
            condition: function(store, token)
            {
                var activeToken = getActiveToken(store);
                return token === activeToken;
            },
            consequent: function(store, token)
            {
                flipCardFacedown(store, token, DamageCardV2.LOOSE_STABILIZER);
            },
        };

        DamageAbility2[Phase.ACTIVATION_PERFORM_ACTION][DamageCardV2.MAJOR_HULL_BREACH] = {
            // Action: Flip this card facedown.
            condition: function(store, token)
            {
                var activeToken = getActiveToken(store);
                return token === activeToken;
            },
            consequent: function(store, token)
            {
                flipCardFacedown(store, token, DamageCardV2.MAJOR_HULL_BREACH);
            },
        };

        DamageAbility2[Phase.ACTIVATION_PERFORM_ACTION][DamageCard.STRUCTURAL_DAMAGE] = {
            // Action: Roll 1 attack die. On a Hit result, flip this card facedown.
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
                    flipCardFacedown(store, token, DamageCard.STRUCTURAL_DAMAGE);
                }
            },
        };

        DamageAbility2[Phase.ACTIVATION_PERFORM_ACTION][DamageCardV2.STRUCTURAL_DAMAGE] = {
            // Action: Roll 1 attack die. On a Hit or Critical Hit result, flip this card facedown.
            condition: function(store, token)
            {
                var activeToken = getActiveToken(store);
                return token === activeToken;
            },
            consequent: function(store, token)
            {
                var attackDice = new AttackDice(1);
                if (attackDice.hitCount() === 1 || attackDice.criticalHitCount() === 1)
                {
                    flipCardFacedown(store, token, DamageCardV2.STRUCTURAL_DAMAGE);
                }
            },
        };

        DamageAbility2[Phase.ACTIVATION_PERFORM_ACTION][DamageCard.WEAPON_MALFUNCTION] = {
            // Action: Roll 1 attack die. On a Hit or Critical Hit result, flip this card facedown.
            condition: function(store, token)
            {
                var activeToken = getActiveToken(store);
                return token === activeToken;
            },
            consequent: function(store, token)
            {
                var attackDice = new AttackDice(1);
                if (attackDice.hitCount() === 1 || attackDice.criticalHitCount() === 1)
                {
                    flipCardFacedown(store, token, DamageCard.WEAPON_MALFUNCTION);
                }
            },
        };

        DamageAbility2[Phase.ACTIVATION_PERFORM_ACTION][DamageCardV2.WEAPONS_FAILURE] = {
            // Action: Roll 1 attack die. On a Hit or Critical Hit result, flip this card facedown.
            condition: function(store, token)
            {
                var activeToken = getActiveToken(store);
                return token === activeToken;
            },
            consequent: function(store, token)
            {
                var attackDice = new AttackDice(1);
                if (attackDice.hitCount() === 1 || attackDice.criticalHitCount() === 1)
                {
                    flipCardFacedown(store, token, DamageCardV2.WEAPONS_FAILURE);
                }
            },
        };

        ////////////////////////////////////////////////////////////////////////
        function flipCardFacedown(store, token, damageKey)
        {
            store.dispatch(Action.removeTokenCriticalDamage(token, damageKey));
            store.dispatch(Action.addTokenDamage(token.id(), damageKey));
        }

        function getActiveToken(store)
        {
            InputValidator.validateNotNull("store", store);

            return Selector.activeToken(store.getState());
        }

        if (Object.freeze)
        {
            Object.freeze(DamageAbility2);
        }

        return DamageAbility2;
    });

/*
 * Provides damage abilities for Events.
 */
define(["AttackDice", "DamageCard", "DamageCardV2", "Event", "process/Action"],
    function(AttackDice, DamageCard, DamageCardV2, Event, Action)
    {
        "use strict";
        var DamageAbility0 = {};

        ////////////////////////////////////////////////////////////////////////
        DamageAbility0[Event.RECEIVE_CRITICAL_DAMAGE] = {};

        DamageAbility0[Event.RECEIVE_CRITICAL_DAMAGE][DamageCardV2.MAJOR_EXPLOSION] = {
            // Roll 1 attack die. On a Hit result, suffer 1 critical damage. Then flip this card facedown.
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
                    token.addCriticalDamage(environment.drawDamage());
                }
                flipCardFacedown(store, token, DamageCard.MAJOR_EXPLOSION);
            },
        };

        DamageAbility0[Event.RECEIVE_CRITICAL_DAMAGE][DamageCard.MINOR_EXPLOSION] = {
            // Immediately roll 1 attack die. On a Hit result, suffer 1 damage. Then flip this card facedown.
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
                flipCardFacedown(store, token, DamageCard.MINOR_EXPLOSION);
            },
        };

        DamageAbility0[Event.RECEIVE_CRITICAL_DAMAGE][DamageCard.THRUST_CONTROL_FIRE] = {
            // Immediately receive 1 stress token. Then flip this card facedown.
            condition: function(store, token)
            {
                var activeToken = getActiveToken(store);
                return token === activeToken;
            },
            consequent: function(store, token)
            {
                store.dispatch(Action.addStressCount(token));
                flipCardFacedown(store, token, DamageCard.THRUST_CONTROL_FIRE);
            },
        };

        DamageAbility0[Event.RECEIVE_CRITICAL_DAMAGE][DamageCardV2.THRUST_CONTROL_FIRE] = {
            // Receive 1 stress token. Then flip this card facedown.
            condition: function(store, token)
            {
                var activeToken = getActiveToken(store);
                return token === activeToken;
            },
            consequent: function(store, token)
            {
                store.dispatch(Action.addStressCount(token));
                flipCardFacedown(store, token, DamageCardV2.THRUST_CONTROL_FIRE);
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
            Object.freeze(DamageAbility0);
        }

        return DamageAbility0;
    });

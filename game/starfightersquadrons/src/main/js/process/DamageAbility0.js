/*
 * Provides damage abilities for Events.
 */
define(["AttackDice", "DamageCard", "DamageCardV2", "Difficulty", "Event", "Maneuver", "process/Action"],
    function(AttackDice, DamageCard, DamageCardV2, Difficulty, Event, Maneuver, Action)
    {
        "use strict";
        var DamageAbility0 = {};

        ////////////////////////////////////////////////////////////////////////
        DamageAbility0[Event.AFTER_EXECUTE_MANEUVER] = {};

        DamageAbility0[Event.AFTER_EXECUTE_MANEUVER][DamageCard.MINOR_HULL_BREACH] = {
            // After executing a red maneuver, roll 1 attack die. On a Hit result, suffer 1 damage.
            condition: function(store, token)
            {
                var eventToken = getEventToken(store);
                var maneuver = getManeuver(token);
                return token === eventToken && maneuver !== undefined && maneuver.difficultyKey === Difficulty.HARD;
            },
            consequent: function(store, token)
            {
                var attackDice = new AttackDice(1);
                if (attackDice.hitCount() === 1)
                {
                    var environment = store.getState().environment;
                    token.receiveDamage(environment.drawDamage());
                }
            },
        };

        ////////////////////////////////////////////////////////////////////////
        DamageAbility0[Event.RECEIVE_CRITICAL_DAMAGE] = {};

        DamageAbility0[Event.RECEIVE_CRITICAL_DAMAGE][DamageCardV2.MAJOR_EXPLOSION] = {
            // Roll 1 attack die. On a Hit result, suffer 1 critical damage. Then flip this card facedown.
            condition: function(store, token)
            {
                var eventToken = getEventToken(store);
                return token === eventToken;
            },
            consequent: function(store, token)
            {
                var attackDice = new AttackDice(1);
                if (attackDice.hitCount() === 1)
                {
                    var environment = store.getState().environment;
                    token.receiveCriticalDamage(environment.drawDamage());
                }
                flipCardFacedown(store, token, DamageCardV2.MAJOR_EXPLOSION);
            },
        };

        DamageAbility0[Event.RECEIVE_CRITICAL_DAMAGE][DamageCard.MINOR_EXPLOSION] = {
            // Immediately roll 1 attack die. On a Hit result, suffer 1 damage. Then flip this card facedown.
            condition: function(store, token)
            {
                var eventToken = getEventToken(store);
                return token === eventToken;
            },
            consequent: function(store, token)
            {
                var attackDice = new AttackDice(1);
                if (attackDice.hitCount() === 1)
                {
                    var environment = store.getState().environment;
                    if (environment)
                    {
                        token.receiveDamage(environment.drawDamage());
                    }
                }
                flipCardFacedown(store, token, DamageCard.MINOR_EXPLOSION);
            },
        };

        DamageAbility0[Event.RECEIVE_CRITICAL_DAMAGE][DamageCard.THRUST_CONTROL_FIRE] = {
            // Immediately receive 1 stress token. Then flip this card facedown.
            condition: function(store, token)
            {
                var eventToken = getEventToken(store);
                return token === eventToken;
            },
            consequent: function(store, token)
            {
                token.receiveStress();
                flipCardFacedown(store, token, DamageCard.THRUST_CONTROL_FIRE);
            },
        };

        DamageAbility0[Event.RECEIVE_CRITICAL_DAMAGE][DamageCardV2.THRUST_CONTROL_FIRE] = {
            // Receive 1 stress token. Then flip this card facedown.
            condition: function(store, token)
            {
                var eventToken = getEventToken(store);
                return token === eventToken;
            },
            consequent: function(store, token)
            {
                token.receiveStress();
                flipCardFacedown(store, token, DamageCardV2.THRUST_CONTROL_FIRE);
            },
        };

        ////////////////////////////////////////////////////////////////////////
        function flipCardFacedown(store, token, damageKey)
        {
            InputValidator.validateNotNull("store", store);
            InputValidator.validateNotNull("token", token);
            InputValidator.validateNotNull("damageKey", damageKey);

            store.dispatch(Action.removeTokenCriticalDamage(token, damageKey));
            store.dispatch(Action.addTokenDamage(token.id(), damageKey));
        }

        function getActivationAction(token)
        {
            InputValidator.validateNotNull("token", token);

            return token.activationState().activationAction();
        }

        function getEventToken(store)
        {
            InputValidator.validateNotNull("store", store);

            return store.getState().eventToken;
        }

        function getManeuver(token)
        {
            InputValidator.validateNotNull("token", token);

            var maneuverKey = getManeuverKey(token);
            return Maneuver.properties[maneuverKey];
        }

        function getManeuverKey(token)
        {
            InputValidator.validateNotNull("token", token);

            var answer;
            var activationAction = getActivationAction(token);

            if (activationAction)
            {
                answer = activationAction.maneuverKey();
            }

            return answer;
        }

        DamageAbility0.toString = function()
        {
            return "DamageAbility0";
        };

        if (Object.freeze)
        {
            Object.freeze(DamageAbility0);
        }

        return DamageAbility0;
    });

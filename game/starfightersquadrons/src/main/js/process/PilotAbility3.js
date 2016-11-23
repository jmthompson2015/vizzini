/*
 * Provides pilot abilities for the Combat Phase.
 */
define(["AttackDice", "DefenseDice", "Phase", "Pilot", "RangeRuler", "process/Action", "process/Selector"],
    function(AttackDice, DefenseDice, Phase, Pilot, RangeRuler, Action, Selector)
    {
        "use strict";
        var PilotAbility3 = {};

        ////////////////////////////////////////////////////////////////////////
        PilotAbility3[Phase.COMBAT_START] = {};

        PilotAbility3[Phase.COMBAT_START][Pilot.GURI] = {
            // At the start of the Combat phase, if you are at Range 1 of an enemy ship, you may assign 1 focus token to your ship.
            condition: function(store, token)
            {
                var environment = store.getState().environment;
                var enemies = environment.getUnfriendlyTokensAtRange(token, RangeRuler.ONE);
                return enemies.length > 0;
            },
            consequent: function(store, token)
            {
                store.dispatch(Action.addFocusCount(token));
            },
        };

        ////////////////////////////////////////////////////////////////////////
        PilotAbility3[Phase.COMBAT_ROLL_ATTACK_DICE] = {};

        PilotAbility3[Phase.COMBAT_ROLL_ATTACK_DICE][Pilot.COLONEL_VESSERY] = {
            // When attacking, immediately after you roll attack dice, you may acquire a target lock on the defender if it already has a red target lock token.
            condition: function(store, token)
            {
                var attacker = getActiveToken(store);
                var defender = getDefender(attacker);
                var targetLocks = Selector.defenderTargetLocks(store.getState(), defender);
                return token === attacker && targetLocks.length > 0;
            },
            consequent: function(store, token)
            {
                var defender = getDefender(token);
                var targetLock = new TargetLock(store, token, defender);
                token.addAttackerTargetLock(targetLock);
            },
        };

        ////////////////////////////////////////////////////////////////////////
        PilotAbility3[Phase.COMBAT_MODIFY_ATTACK_DICE] = {};

        PilotAbility3[Phase.COMBAT_MODIFY_ATTACK_DICE][Pilot.POE_DAMERON] = {
            // While attacking or defending, if you have a Focus token, you may change 1 of your Focus results to a Hit or Evade result.
            condition: function(store, token)
            {
                var attacker = getActiveToken(store);
                var attackDice = getAttackDice(attacker);
                LOGGER.info("Poe Dameron modify attack dice condition ? " + (token === attacker && token.focusCount() > 0 && attackDice.focusCount() > 0));
                return token === attacker && token.focusCount() > 0 && attackDice.focusCount() > 0;
            },
            consequent: function(store, token)
            {
                var attacker = getActiveToken(store);
                var attackDice = getAttackDice(attacker);
                attackDice.changeOneToValue(AttackDice.Value.FOCUS, AttackDice.Value.HIT);
            },
        };

        ////////////////////////////////////////////////////////////////////////
        PilotAbility3[Phase.COMBAT_MODIFY_DEFENSE_DICE] = {};

        PilotAbility3[Phase.COMBAT_MODIFY_DEFENSE_DICE][Pilot.LUKE_SKYWALKER] = {
            // When defending, you may change 1 of your Focus results to an Evade result.
            condition: function(store, token)
            {
                var attacker = getActiveToken(store);
                var defender = getDefender(attacker);
                var defenseDice = getDefenseDice(attacker);
                return token === defender && defenseDice.focusCount() > 0;
            },
            consequent: function(store, token)
            {
                var attacker = getActiveToken(store);
                var defenseDice = getDefenseDice(attacker);
                defenseDice.changeOneToValue(DefenseDice.Value.FOCUS, DefenseDice.Value.EVADE);
            },
        };

        PilotAbility3[Phase.COMBAT_MODIFY_DEFENSE_DICE][Pilot.POE_DAMERON] = {
            // While attacking or defending, if you have a Focus token, you may change 1 of your Focus results to a Hit or Evade result.
            condition: function(store, token)
            {
                var attacker = getActiveToken(store);
                var defender = getDefender(attacker);
                var defenseDice = getDefenseDice(attacker);
                LOGGER.info("Poe Dameron modify defense dice condition ? " + (token === defender && token.focusCount() > 0 && defenseDice.focusCount() > 0));
                LOGGER.info("token = " + token);
                LOGGER.info("defender = " + defender);
                LOGGER.info("token === defender ? " + (token === defender));
                LOGGER.info("token.focusCount() = " + token.focusCount());
                LOGGER.info("defenseDice.focusCount() = " + defenseDice.focusCount());
                return token === defender && token.focusCount() > 0 && defenseDice.focusCount() > 0;
            },
            consequent: function(store, token)
            {
                var attacker = getActiveToken(store);
                var defender = getDefender(attacker);
                var defenseDice = getDefenseDice(attacker);
                defenseDice.changeOneToValue(DefenseDice.Value.FOCUS, DefenseDice.Value.EVADE);
            },
        };

        ////////////////////////////////////////////////////////////////////////
        PilotAbility3[Phase.COMBAT_DEAL_DAMAGE] = {};

        PilotAbility3[Phase.COMBAT_DEAL_DAMAGE][Pilot.WHISPER] = {
            // After you perform an attack that hits, you may assign 1 focus token to your ship.
            condition: function(store, token)
            {
                var attacker = getActiveToken(store);
                return token === attacker && isDefenderHit(attacker);
            },
            consequent: function(store, token)
            {
                store.dispatch(Action.addFocusCount(token));
            },
        };

        ////////////////////////////////////////////////////////////////////////
        PilotAbility3[Phase.COMBAT_AFTER_DEAL_DAMAGE] = {};

        PilotAbility3[Phase.COMBAT_AFTER_DEAL_DAMAGE][Pilot.IG_88A] = {
            // After you perform an attack that destroys the defender, you may recover 1 shield.
            condition: function(store, token)
            {
                var attacker = getActiveToken(store);
                var defender = getDefender(attacker);
                return token === attacker && defender.isDestroyed();
            },
            consequent: function(store, token)
            {
                token.recoverShield();
            },
        };

        PilotAbility3[Phase.COMBAT_AFTER_DEAL_DAMAGE][Pilot.LAETIN_ASHERA] = {
            // After you defend against an attack, if the attack did not hit, you may assign 1 evade token to your ship.
            condition: function(store, token)
            {
                var attacker = getActiveToken(store);
                var defender = getDefender(attacker);
                return token === defender && !isDefenderHit(attacker);
            },
            consequent: function(store, token)
            {
                store.dispatch(Action.addEvadeCount(token));
            },
        };

        ////////////////////////////////////////////////////////////////////////
        function getActiveToken(store)
        {
            InputValidator.validateNotNull("store", store);

            return Selector.activeToken(store.getState());
        }

        function getAttackDice(attacker)
        {
            InputValidator.validateNotNull("attacker", attacker);

            return attacker.combatState().attackDice();
        }

        function getDefender(attacker)
        {
            InputValidator.validateNotNull("attacker", attacker);

            return attacker.combatState().combatAction().defender();
        }

        function getDefenseDice(attacker)
        {
            InputValidator.validateNotNull("attacker", attacker);

            return attacker.combatState().defenseDice();
        }

        function isDefenderHit(attacker)
        {
            InputValidator.validateNotNull("attacker", attacker);

            return attacker.combatState().isDefenderHit();
        }

        if (Object.freeze)
        {
            Object.freeze(PilotAbility3);
        }

        return PilotAbility3;
    });

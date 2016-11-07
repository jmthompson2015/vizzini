define(["AttackDice", "Phase", "RangeRuler", "UpgradeCard", "process/Action", "process/Selector", "process/TargetLock"],
    function(AttackDice, Phase, RangeRuler, UpgradeCard, Action, Selector, TargetLock)
    {
        "use strict";
        var UpgradeAbility = {};

        UpgradeAbility[Phase.COMBAT_DECLARE_TARGET] = {};

        UpgradeAbility[Phase.COMBAT_DECLARE_TARGET][UpgradeCard.BLASTER_TURRET] = function(store, token)
        {
            combat(store, token, UpgradeCard.BLASTER_TURRET, function(store, attacker)
            {
                // Spend 1 Focus token to perform this attack.
                spendFocusToken(store, attacker);
            });
        };

        UpgradeAbility[Phase.COMBAT_DECLARE_TARGET][UpgradeCard.HOT_SHOT_BLASTER] = function(store, token)
        {
            combat(store, token, UpgradeCard.HOT_SHOT_BLASTER, function(store, attacker)
            {
                // Discard this card to attack 1 ship (even a ship outside your firing arc).
                discardUpgrade(attacker);
            });
        };

        UpgradeAbility[Phase.COMBAT_MODIFY_ATTACK_DICE] = {};

        UpgradeAbility[Phase.COMBAT_MODIFY_ATTACK_DICE][UpgradeCard.ADVANCED_PROTON_TORPEDOES] = function(store, token)
        {
            combat(store, token, UpgradeCard.ADVANCED_PROTON_TORPEDOES, function(store, attacker)
            {
                spendTargetLockAndDiscardUpgrade(attacker);

                // You may change up to 3 of your blank results to Focus results.
                var attackDice = attacker.combatState().attackDice();
                attackDice.changeOneToValue(AttackDice.Value.BLANK, AttackDice.Value.FOCUS);
                attackDice.changeOneToValue(AttackDice.Value.BLANK, AttackDice.Value.FOCUS);
                attackDice.changeOneToValue(AttackDice.Value.BLANK, AttackDice.Value.FOCUS);
            });
        };

        UpgradeAbility[Phase.COMBAT_MODIFY_ATTACK_DICE][UpgradeCard.CLUSTER_MISSILES] = function(store, token)
        {
            combat(store, token, UpgradeCard.CLUSTER_MISSILES, function(store, attacker)
            {
                spendTargetLockAndDiscardUpgrade(attacker);
            });
        };

        UpgradeAbility[Phase.COMBAT_MODIFY_ATTACK_DICE][UpgradeCard.CONCUSSION_MISSILES] = function(store, token)
        {
            combat(store, token, UpgradeCard.CONCUSSION_MISSILES, function(store, attacker)
            {
                spendTargetLockAndDiscardUpgrade(attacker);

                // You may change 1 of your blank results to a Hit result.
                var attackDice = attacker.combatState().attackDice();
                attackDice.changeOneToValue(AttackDice.Value.BLANK, AttackDice.Value.HIT);
            });
        };

        UpgradeAbility[Phase.COMBAT_MODIFY_ATTACK_DICE][UpgradeCard.HEAVY_LASER_CANNON] = function(store, token)
        {
            combat(store, token, UpgradeCard.HEAVY_LASER_CANNON, function(store, attacker)
            {
                // Immediately after rolling your attack dice, you must change all of your Critical Hit results to Hit results.
                var attackDice = attacker.combatState().attackDice();
                attackDice.changeAllToValue(AttackDice.Value.CRITICAL_HIT, AttackDice.Value.HIT);
            });
        };

        UpgradeAbility[Phase.COMBAT_MODIFY_ATTACK_DICE][UpgradeCard.MANGLER_CANNON] = function(store, token)
        {
            combat(store, token, UpgradeCard.MANGLER_CANNON, function(store, attacker)
            {
                // When attacking, you may change 1 of your Hit results to a Critical Hit result.
                var attackDice = attacker.combatState().attackDice();
                attackDice.changeOneToValue(AttackDice.Value.HIT, AttackDice.Value.CRITICAL_HIT);
            });
        };

        UpgradeAbility[Phase.COMBAT_MODIFY_ATTACK_DICE][UpgradeCard.PROTON_ROCKETS] = function(store, token)
        {
            combat(store, token, UpgradeCard.PROTON_ROCKETS, function(store, attacker)
            {
                discardUpgrade(attacker);

                // You may roll additional attack dice equal to your agility value, to a maximum of 3 additional dice.
            });
        };

        UpgradeAbility[Phase.COMBAT_MODIFY_ATTACK_DICE][UpgradeCard.PROTON_TORPEDOES] = function(store, token)
        {
            combat(store, token, UpgradeCard.PROTON_TORPEDOES, function(store, attacker)
            {
                spendTargetLockAndDiscardUpgrade(attacker);

                // You may change 1 of your Focus results to a Critical Hit result.
                var attackDice = attacker.combatState().attackDice();
                attackDice.changeOneToValue(AttackDice.Value.FOCUS, AttackDice.Value.CRITICAL_HIT);
            });
        };

        UpgradeAbility[Phase.COMBAT_DEAL_DAMAGE] = {};

        UpgradeAbility[Phase.COMBAT_DEAL_DAMAGE][UpgradeCard.ADVANCED_HOMING_MISSILES] = function(store, token)
        {
            combat(store, token, UpgradeCard.ADVANCED_HOMING_MISSILES, function(store, attacker)
            {
                discardUpgrade(attacker);

                // If this attack hits, deal 1 faceup Damage card to the defender. Then cancel all dice results.
                if (attacker.combatState().isDefenderHit())
                {
                    var defender = attacker.combatState().combatAction().defender();
                    var environment = store.getState().environment;
                    defender.addCriticalDamage(environment.drawDamage());
                }
            });
        };

        UpgradeAbility[Phase.COMBAT_DEAL_DAMAGE][UpgradeCard.ION_PULSE_MISSILES] = function(store, token)
        {
            combat(store, token, UpgradeCard.ION_PULSE_MISSILES, function(store, attacker)
            {
                discardUpgrade(attacker);

                // If this attack hits, each other ship at Range 1 of the defender suffers 1 damage.
                if (attacker.combatState().isDefenderHit())
                {
                    var defender = attacker.combatState().combatAction().defender();
                    var environment = store.getState().environment;
                    defender.addDamage(environment.drawDamage());
                    store.dispatch(Action.addIonCount(defender, 2));
                }
            });
        };

        UpgradeAbility[Phase.COMBAT_DEAL_DAMAGE][UpgradeCard.XX_23_S_THREAD_TRACERS] = function(store, token)
        {
            combat(store, token, UpgradeCard.XX_23_S_THREAD_TRACERS, function(store, attacker)
            {
                discardUpgrade(attacker);

                if (attacker.combatState().isDefenderHit())
                {
                    // Each friendly ship at Range 1-2 of you may acquire a target lock on the defender.
                    var defender = attacker.combatState().combatAction().defender();
                    var defenderPosition = attacker.combatState().combatAction().defenderPosition();
                    [RangeRuler.ONE, RangeRuler.TWO].forEach(function(rangeKey)
                    {
                        var environment = store.getState().environment;

                        environment.getFriendlyTokensAtRange(attacker, rangeKey).forEach(function(token)
                        {
                            var tokenPosition = environment.getPositionFor(token);
                            var myRangeKey = RangeRuler.getRange(token, tokenPosition, defender, defenderPosition);

                            if (RangeRuler.STANDARD_RANGES.vizziniContains(myRangeKey))
                            {
                                var targetLock = new TargetLock(store, token, defender);
                                token.addAttackerTargetLock(targetLock);
                            }
                        });
                    });
                }
            });
        };

        UpgradeAbility[Phase.COMBAT_AFTER_DEAL_DAMAGE] = {};

        UpgradeAbility[Phase.COMBAT_AFTER_DEAL_DAMAGE][UpgradeCard.ASSAULT_MISSILES] = function(store, token)
        {
            combat(store, token, UpgradeCard.ASSAULT_MISSILES, function(store, attacker)
            {
                spendTargetLockAndDiscardUpgrade(attacker);

                // If this attack hits, each other ship at Range 1 of the defender suffers 1 damage.
                if (attacker.combatState().isDefenderHit())
                {
                    var environment = store.getState().environment;
                    var defender = attacker.combatState().combatAction().defender();
                    environment.getTokensAtRange(defender, RangeRuler.ONE).forEach(function(token)
                    {
                        token.addDamage(environment.drawDamage());
                    });
                }
            });
        };

        UpgradeAbility[Phase.COMBAT_AFTER_DEAL_DAMAGE][UpgradeCard.FLECHETTE_CANNON] = function(store, token)
        {
            combat(store, token, UpgradeCard.FLECHETTE_CANNON, function(store, attacker)
            {
                // If this attack hits, the defender suffers 1 damage and, if the defender is not stressed, it also receives 1 stress token.
                if (attacker.combatState().isDefenderHit())
                {
                    var environment = store.getState().environment;
                    var defender = attacker.combatState().combatAction().defender();
                    defender.addDamage(environment.drawDamage());

                    if (!defender.isStressed())
                    {
                        defender.receiveStress();
                    }
                }
            });
        };

        UpgradeAbility[Phase.COMBAT_AFTER_DEAL_DAMAGE][UpgradeCard.FLECHETTE_TORPEDOES] = function(store, token)
        {
            combat(store, token, UpgradeCard.FLECHETTE_TORPEDOES, function(store, attacker)
            {
                spendTargetLockAndDiscardUpgrade(attacker);

                // After you perform this attack, the defender receives 1 stress token if its hull value is "4" or lower.
                var defender = attacker.combatState().combatAction().defender();

                if (defender.hullValue() <= 4)
                {
                    defender.receiveStress();
                }
            });
        };

        UpgradeAbility[Phase.COMBAT_AFTER_DEAL_DAMAGE][UpgradeCard.ION_CANNON] = function(store, token)
        {
            combat(store, token, UpgradeCard.ION_CANNON, function(store, attacker)
            {
                // If this attack hits, the defender suffers 1 damage and receives 1 ion token.
                if (attacker.combatState().isDefenderHit())
                {
                    var environment = store.getState().environment;
                    var defender = attacker.combatState().combatAction().defender();
                    defender.addDamage(environment.drawDamage());
                    store.dispatch(Action.addIonCount(defender));
                }
            });
        };

        UpgradeAbility[Phase.COMBAT_AFTER_DEAL_DAMAGE][UpgradeCard.ION_CANNON_TURRET] = function(store, token)
        {
            combat(store, token, UpgradeCard.ION_CANNON_TURRET, function(store, attacker)
            {
                // If this attack hits the target ship, the ship suffers 1 damage and receives 1 ion token.
                if (attacker.combatState().isDefenderHit())
                {
                    var environment = store.getState().environment;
                    var defender = attacker.combatState().combatAction().defender();
                    defender.addDamage(environment.drawDamage());
                    store.dispatch(Action.addIonCount(defender));
                }
            });
        };

        UpgradeAbility[Phase.COMBAT_AFTER_DEAL_DAMAGE][UpgradeCard.ION_TORPEDOES] = function(store, token)
        {
            combat(store, token, UpgradeCard.ION_TORPEDOES, function(store, attacker)
            {
                spendTargetLockAndDiscardUpgrade(attacker);

                // If this attack hits, the defender and each ship at Range 1 of it receives 1 ion token.
                if (attacker.combatState().isDefenderHit())
                {
                    var environment = store.getState().environment;
                    var defender = attacker.combatState().combatAction().defender();
                    store.dispatch(Action.addIonCount(defender));
                    environment.getTokensAtRange(defender, RangeRuler.ONE).forEach(function(token)
                    {
                        store.dispatch(Action.addIonCount(token));
                    });
                }
            });
        };

        UpgradeAbility[Phase.COMBAT_AFTER_DEAL_DAMAGE][UpgradeCard.PLASMA_TORPEDOES] = function(store, token)
        {
            combat(store, token, UpgradeCard.PLASMA_TORPEDOES, function(store, attacker)
            {
                spendTargetLockAndDiscardUpgrade(attacker);

                // If this attack hits, after dealing damage, remove 1 shield token from the defender.
                if (attacker.combatState().isDefenderHit())
                {
                    var defender = attacker.combatState().combatAction().defender();
                    store.dispatch(Action.addShieldCount(defender, -1));
                }
            });
        };

        UpgradeAbility[Phase.COMBAT_AFTER_DEAL_DAMAGE][UpgradeCard.TRACTOR_BEAM] = function(store, token)
        {
            combat(store, token, UpgradeCard.TRACTOR_BEAM, function(store, attacker)
            {
                // If this attack hits, the defender receives 1 tractor beam token.
                if (attacker.combatState().isDefenderHit())
                {
                    var defender = attacker.combatState().combatAction().defender();
                    store.dispatch(Action.addTractorBeamCount(defender));
                }
            });
        };

        UpgradeAbility[Phase.COMBAT_AFTER_DEAL_DAMAGE][UpgradeCard.TWIN_LASER_TURRET] = function(store, token)
        {
            combat(store, token, UpgradeCard.TWIN_LASER_TURRET, function(store, attacker)
            {
                // Each time this attack hits, the defender suffers 1 damage.
                if (attacker.combatState().isDefenderHit())
                {
                    var environment = store.getState().environment;
                    var defender = attacker.combatState().combatAction().defender();
                    defender.addDamage(environment.drawDamage());
                }
            });
        };

        function combat(store, token, upgradeKeyIn, upgradeFunction)
        {
            InputValidator.validateNotNull("store", store);
            InputValidator.validateNotNull("token", token);
            InputValidator.validateNotNull("upgradeKeyIn", upgradeKeyIn);

            var attacker = Selector.activeToken(store.getState());

            if (attacker === token)
            {
                var combatState = attacker.combatState();
                var combatAction = combatState.combatAction();
                var weapon = combatAction.weapon();

                if (weapon.upgradeKey() === upgradeKeyIn)
                {
                    if (upgradeFunction)
                    {
                        upgradeFunction(store, attacker);
                    }
                }
            }
        }

        function discardUpgrade(attacker)
        {
            var combatAction = attacker.combatState().combatAction();
            var weapon = combatAction.weapon();
            var upgradeKey = weapon.upgradeKey();
            attacker.discardUpgrade(upgradeKey);
        }

        function spendFocusToken(store, attacker)
        {
            store.dispatch(Action.addFocusCount(attacker, -1));
        }

        function spendTargetLock(attacker, defender)
        {
            var targetLock = attacker.findTargetLockByDefender(defender);
            attacker.removeAttackerTargetLock(targetLock);
        }

        function spendTargetLockAndDiscardUpgrade(attacker)
        {
            var combatAction = attacker.combatState().combatAction();
            var defender = combatAction.defender();
            spendTargetLock(attacker, defender);
            discardUpgrade(attacker);
        }

        if (Object.freeze)
        {
            Object.freeze(UpgradeAbility);
        }

        return UpgradeAbility;
    });

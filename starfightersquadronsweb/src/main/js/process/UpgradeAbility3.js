/*
 * Provides upgrade abilities for the Combat Phase.
 */
define(["AttackDice", "Phase", "RangeRuler", "UpgradeCard", "process/Action", "process/Selector", "process/TargetLock"],
    function(AttackDice, Phase, RangeRuler, UpgradeCard, Action, Selector, TargetLock)
    {
        "use strict";
        var UpgradeAbility3 = {};

        UpgradeAbility3[Phase.COMBAT_DECLARE_TARGET] = {};

        UpgradeAbility3[Phase.COMBAT_DECLARE_TARGET][UpgradeCard.BLASTER_TURRET] = function(store, token)
        {
            attack(store, token, UpgradeCard.BLASTER_TURRET, function(store, attacker)
            {
                // Spend 1 Focus token to perform this attack.
                spendFocusToken(store, attacker);
            });
        };

        UpgradeAbility3[Phase.COMBAT_DECLARE_TARGET][UpgradeCard.HOT_SHOT_BLASTER] = function(store, token)
        {
            attack(store, token, UpgradeCard.HOT_SHOT_BLASTER, function(store, attacker)
            {
                // Discard this card to attack 1 ship (even a ship outside your firing arc).
                discardUpgrade(attacker);
            });
        };

        UpgradeAbility3[Phase.COMBAT_MODIFY_ATTACK_DICE] = {};

        UpgradeAbility3[Phase.COMBAT_MODIFY_ATTACK_DICE][UpgradeCard.ADVANCED_PROTON_TORPEDOES] = function(store, token)
        {
            attack(store, token, UpgradeCard.ADVANCED_PROTON_TORPEDOES, function(store, attacker)
            {
                spendTargetLockAndDiscardUpgrade(attacker);

                // You may change up to 3 of your blank results to Focus results.
                var attackDice = attacker.combatState().attackDice();
                attackDice.changeOneToValue(AttackDice.Value.BLANK, AttackDice.Value.FOCUS);
                attackDice.changeOneToValue(AttackDice.Value.BLANK, AttackDice.Value.FOCUS);
                attackDice.changeOneToValue(AttackDice.Value.BLANK, AttackDice.Value.FOCUS);
            });
        };

        UpgradeAbility3[Phase.COMBAT_MODIFY_ATTACK_DICE][UpgradeCard.CALCULATION] = {
            // When attacking, you may spend a Focus token to change 1 of your Focus results to a Critical Hit result.
            condition: function(store, token)
            {
                var attackDice = token.combatState().attackDice();
                return token.focusCount() > 0 && attackDice.focusCount() > 0;
            },
            consequent: function(store, token)
            {
                action(store, token, function(store, attacker)
                {
                    spendFocusToken(store, attacker);
                    var attackDice = attacker.combatState().attackDice();
                    attackDice.changeOneToValue(AttackDice.Value.FOCUS, AttackDice.Value.CRITICAL_HIT);
                });
            },
        };

        UpgradeAbility3[Phase.COMBAT_MODIFY_ATTACK_DICE][UpgradeCard.CLUSTER_MISSILES] = function(store, token)
        {
            attack(store, token, UpgradeCard.CLUSTER_MISSILES, function(store, attacker)
            {
                spendTargetLockAndDiscardUpgrade(attacker);
            });
        };

        UpgradeAbility3[Phase.COMBAT_MODIFY_ATTACK_DICE][UpgradeCard.CONCUSSION_MISSILES] = function(store, token)
        {
            attack(store, token, UpgradeCard.CONCUSSION_MISSILES, function(store, attacker)
            {
                spendTargetLockAndDiscardUpgrade(attacker);

                // You may change 1 of your blank results to a Hit result.
                var attackDice = attacker.combatState().attackDice();
                attackDice.changeOneToValue(AttackDice.Value.BLANK, AttackDice.Value.HIT);
            });
        };

        UpgradeAbility3[Phase.COMBAT_MODIFY_ATTACK_DICE][UpgradeCard.DENGAR] = function(store, token)
        {
            attack(store, token, UpgradeCard.DENGAR, function(store, attacker)
            {
                // When attacking, you may reroll 1 attack die. If the defender is a unique pilot, you may instead reroll up to 2 attack dice.
                var attackDice = attacker.combatState().attackDice();
                var defender = attacker.combatState().combatAction().defender();
                var count = (defender.isUnique() ? 2 : 1);
                attackDice.rerollBlankAndFocus(count);
            });
        };

        UpgradeAbility3[Phase.COMBAT_MODIFY_ATTACK_DICE][UpgradeCard.EZRA_BRIDGER] = function(store, token)
        {
            attack(store, token, UpgradeCard.EZRA_BRIDGER, function(store, attacker)
            {
                // When attacking, if you are stressed, you may change 1 of your Focus results to a Critical Hit result.
                if (attacker.isStressed())
                {
                    var attackDice = attacker.combatState().attackDice();
                    attackDice.changeOneToValue(AttackDice.Value.FOCUS, AttackDice.Value.CRITICAL_HIT);
                }
            });
        };

        UpgradeAbility3[Phase.COMBAT_MODIFY_ATTACK_DICE][UpgradeCard.HAN_SOLO] = {
            // When attacking, if you have a Target Lock on the defender, you may spend that Target Lock to change all of your Focus results to Hit results.
            condition: function(store, token)
            {
                var defender = token.combatState().combatAction().defender();
                var targetLock = token.findTargetLockByDefender(defender);
                var attackDice = token.combatState().attackDice();
                return targetLock !== undefined && attackDice.focusCount() > 0;
            },
            consequent: function(store, token)
            {
                action(store, token, function(store, attacker)
                {
                    var defender = attacker.combatState().combatAction().defender();
                    spendTargetLock(attacker, defender);
                    var attackDice = attacker.combatState().attackDice();
                    attackDice.changeAllToValue(AttackDice.Value.FOCUS, AttackDice.Value.HIT);
                });
            },
        };

        UpgradeAbility3[Phase.COMBAT_MODIFY_ATTACK_DICE][UpgradeCard.HEAVY_LASER_CANNON] = function(store, token)
        {
            attack(store, token, UpgradeCard.HEAVY_LASER_CANNON, function(store, attacker)
            {
                // Immediately after rolling your attack dice, you must change all of your Critical Hit results to Hit results.
                var attackDice = attacker.combatState().attackDice();
                attackDice.changeAllToValue(AttackDice.Value.CRITICAL_HIT, AttackDice.Value.HIT);
            });
        };

        UpgradeAbility3[Phase.COMBAT_MODIFY_ATTACK_DICE][UpgradeCard.MANGLER_CANNON] = function(store, token)
        {
            attack(store, token, UpgradeCard.MANGLER_CANNON, function(store, attacker)
            {
                // When attacking, you may change 1 of your Hit results to a Critical Hit result.
                var attackDice = attacker.combatState().attackDice();
                attackDice.changeOneToValue(AttackDice.Value.HIT, AttackDice.Value.CRITICAL_HIT);
            });
        };

        UpgradeAbility3[Phase.COMBAT_MODIFY_ATTACK_DICE][UpgradeCard.MERCENARY_COPILOT] = function(store, token)
        {
            attack(store, token, UpgradeCard.MERCENARY_COPILOT, function(store, attacker)
            {
                // When attacking at Range 3, you may change 1 of your Hit results to a Critical Hit result.
                if (attacker.combatState().rangeKey() === RangeRuler.THREE)
                {
                    var attackDice = attacker.combatState().attackDice();
                    attackDice.changeOneToValue(AttackDice.Value.HIT, AttackDice.Value.CRITICAL_HIT);
                }
            });
        };

        UpgradeAbility3[Phase.COMBAT_MODIFY_ATTACK_DICE][UpgradeCard.OPPORTUNIST] = {
            // When attacking, if the defender does not have any Focus or Evade tokens, you may receive 1 stress token to roll 1 additional attack die. You cannot use this ability if you have any stress tokens.
            condition: function(store, token)
            {
                var defender = token.combatState().combatAction().defender();
                return token.stressCount() === 0 && defender.evadeCount() === 0 && defender.focusCount() === 0;
            },
            consequent: function(store, token)
            {
                action(store, token, function(store, attacker)
                {
                    attacker.receiveStress();
                    var attackDice = attacker.combatState().attackDice();
                    attackDice.addDie();
                });
            },
        };

        UpgradeAbility3[Phase.COMBAT_MODIFY_ATTACK_DICE][UpgradeCard.PREDATOR] = function(store, token)
        {
            attack(store, token, UpgradeCard.PREDATOR, function(store, attacker)
            {
                // When attacking, you may reroll 1 attack die. If the defender's pilot skill value if "2" or lower, you may instead reroll up to 2 attack dice.
                var attackDice = attacker.combatState().attackDice();
                var defender = attacker.combatState().combatAction().defender();
                var count = (defender.pilotSkillValue() <= 2 ? 2 : 1);
                attackDice.rerollBlankAndFocus(count);
            });
        };

        UpgradeAbility3[Phase.COMBAT_MODIFY_ATTACK_DICE][UpgradeCard.PROTON_ROCKETS] = function(store, token)
        {
            attack(store, token, UpgradeCard.PROTON_ROCKETS, function(store, attacker)
            {
                discardUpgrade(attacker);

                // You may roll additional attack dice equal to your agility value, to a maximum of 3 additional dice.
            });
        };

        UpgradeAbility3[Phase.COMBAT_MODIFY_ATTACK_DICE][UpgradeCard.PROTON_TORPEDOES] = function(store, token)
        {
            attack(store, token, UpgradeCard.PROTON_TORPEDOES, function(store, attacker)
            {
                spendTargetLockAndDiscardUpgrade(attacker);

                // You may change 1 of your Focus results to a Critical Hit result.
                var attackDice = attacker.combatState().attackDice();
                attackDice.changeOneToValue(AttackDice.Value.FOCUS, AttackDice.Value.CRITICAL_HIT);
            });
        };

        UpgradeAbility3[Phase.COMBAT_MODIFY_ATTACK_DICE][UpgradeCard.WEAPONS_GUIDANCE] = {
            // When attacking, you may spend a focus token to change 1 of your blank results to a Hit result.
            condition: function(store, token)
            {
                var attackDice = token.combatState().attackDice();
                return token.focusCount() > 0 && attackDice.blankCount() > 0;
            },
            consequent: function(store, token)
            {
                action(store, token, function(store, attacker)
                {
                    spendFocusToken(store, attacker);
                    var attackDice = attacker.combatState().attackDice();
                    attackDice.changeOneToValue(AttackDice.Value.BLANK, AttackDice.Value.HIT);
                });
            },
        };

        UpgradeAbility3[Phase.COMBAT_MODIFY_ATTACK_DICE][UpgradeCard.WIRED] = function(store, token)
        {
            attack(store, token, UpgradeCard.WIRED, function(store, attacker)
            {
                // When attacking or defending, if you are stressed, you may reroll 1 or more of your Focus results.
                if (attacker.isStressed())
                {
                    var attackDice = attacker.combatState().attackDice();
                    attackDice.rerollAllFocus();
                }
            });
        };

        UpgradeAbility3[Phase.COMBAT_MODIFY_DEFENSE_DICE] = {};

        UpgradeAbility3[Phase.COMBAT_MODIFY_DEFENSE_DICE][UpgradeCard.FLIGHT_INSTRUCTOR] = function(store, token)
        {
            defend(store, token, UpgradeCard.FLIGHT_INSTRUCTOR, function(store, attacker, defender)
            {
                // When defending, you may reroll 1 of your Focus results. If the attacker's pilot skill value is "2" or lower, you may reroll 1 of your blank results instead.
                var defenseDice = attacker.combatState().defenseDice();

                if (attacker.pilotSkillValue() <= 2)
                {
                    defenseDice.rerollBlank();
                }
                else
                {
                    defenseDice.rerollFocus();
                }
            });
        };

        UpgradeAbility3[Phase.COMBAT_MODIFY_DEFENSE_DICE][UpgradeCard.JUKE] = function(store, token)
        {
            defend(store, token, UpgradeCard.JUKE, function(store, attacker, defender)
            {
                // When attacking, if you have an Evade token, you may change 1 of the defender's Evade results to a Focus result.
                if (defender.evadeCount() > 0)
                {
                    var defenseDice = attacker.combatState().defenseDice();
                    defenseDice.changeOneToValue(AttackDice.Value.EVADE, AttackDice.Value.FOCUS);
                }
            });
        };

        UpgradeAbility3[Phase.COMBAT_MODIFY_DEFENSE_DICE][UpgradeCard.WIRED] = function(store, token)
        {
            defend(store, token, UpgradeCard.WIRED, function(store, attacker, defender)
            {
                // When attacking or defending, if you are stressed, you may reroll 1 or more of your Focus results.
                if (defender.isStressed())
                {
                    var defenseDice = attacker.combatState().defenseDice();
                    defenseDice.rerollAllFocus();
                }
            });
        };

        UpgradeAbility3[Phase.COMBAT_DEAL_DAMAGE] = {};

        UpgradeAbility3[Phase.COMBAT_DEAL_DAMAGE][UpgradeCard.ADVANCED_HOMING_MISSILES] = function(store, token)
        {
            attack(store, token, UpgradeCard.ADVANCED_HOMING_MISSILES, function(store, attacker)
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

        UpgradeAbility3[Phase.COMBAT_DEAL_DAMAGE][UpgradeCard.ION_PULSE_MISSILES] = function(store, token)
        {
            attack(store, token, UpgradeCard.ION_PULSE_MISSILES, function(store, attacker)
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

        UpgradeAbility3[Phase.COMBAT_DEAL_DAMAGE][UpgradeCard.XX_23_S_THREAD_TRACERS] = function(store, token)
        {
            attack(store, token, UpgradeCard.XX_23_S_THREAD_TRACERS, function(store, attacker)
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

        UpgradeAbility3[Phase.COMBAT_AFTER_DEAL_DAMAGE] = {};

        UpgradeAbility3[Phase.COMBAT_AFTER_DEAL_DAMAGE][UpgradeCard.ASSAULT_MISSILES] = function(store, token)
        {
            attack(store, token, UpgradeCard.ASSAULT_MISSILES, function(store, attacker)
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

        UpgradeAbility3[Phase.COMBAT_AFTER_DEAL_DAMAGE][UpgradeCard.DEAD_MANS_SWITCH] = function(store, token)
        {
            defend(store, token, UpgradeCard.DEAD_MANS_SWITCH, function(store, attacker, defender)
            {
                // When you are destroyed, each ship at Range 1 suffers 1 damage.
                if (defender.isDestroyed())
                {
                    var environment = store.getState().environment;

                    environment.getTokensAtRange(defender, RangeRuler.ONE).forEach(function(token)
                    {
                        token.addDamage(environment.drawDamage());
                    });
                }
            });
        };

        UpgradeAbility3[Phase.COMBAT_AFTER_DEAL_DAMAGE][UpgradeCard.FLECHETTE_CANNON] = function(store, token)
        {
            attack(store, token, UpgradeCard.FLECHETTE_CANNON, function(store, attacker)
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

        UpgradeAbility3[Phase.COMBAT_AFTER_DEAL_DAMAGE][UpgradeCard.FLECHETTE_TORPEDOES] = function(store, token)
        {
            attack(store, token, UpgradeCard.FLECHETTE_TORPEDOES, function(store, attacker)
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

        UpgradeAbility3[Phase.COMBAT_AFTER_DEAL_DAMAGE][UpgradeCard.ION_CANNON] = function(store, token)
        {
            attack(store, token, UpgradeCard.ION_CANNON, function(store, attacker)
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

        UpgradeAbility3[Phase.COMBAT_AFTER_DEAL_DAMAGE][UpgradeCard.ION_CANNON_TURRET] = function(store, token)
        {
            attack(store, token, UpgradeCard.ION_CANNON_TURRET, function(store, attacker)
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

        UpgradeAbility3[Phase.COMBAT_AFTER_DEAL_DAMAGE][UpgradeCard.ION_TORPEDOES] = function(store, token)
        {
            attack(store, token, UpgradeCard.ION_TORPEDOES, function(store, attacker)
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

        UpgradeAbility3[Phase.COMBAT_AFTER_DEAL_DAMAGE][UpgradeCard.PLASMA_TORPEDOES] = function(store, token)
        {
            attack(store, token, UpgradeCard.PLASMA_TORPEDOES, function(store, attacker)
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

        UpgradeAbility3[Phase.COMBAT_AFTER_DEAL_DAMAGE][UpgradeCard.REINFORCED_DEFLECTORS] = function(store, token)
        {
            defend(store, token, UpgradeCard.REINFORCED_DEFLECTORS, function(store, attacker, defender)
            {
                // After you suffer 3 or more damage from an attack, recover 1 shield (up to your shield value).
                var damageDealer = attacker.combatState().damageDealer();

                if (damageDealer.hits() + damageDealer.criticalHits() >= 3)
                {
                    defender.recoverShield();
                }
            });
        };

        UpgradeAbility3[Phase.COMBAT_AFTER_DEAL_DAMAGE][UpgradeCard.TRACTOR_BEAM] = function(store, token)
        {
            attack(store, token, UpgradeCard.TRACTOR_BEAM, function(store, attacker)
            {
                // If this attack hits, the defender receives 1 tractor beam token.
                if (attacker.combatState().isDefenderHit())
                {
                    var defender = attacker.combatState().combatAction().defender();
                    store.dispatch(Action.addTractorBeamCount(defender));
                }
            });
        };

        UpgradeAbility3[Phase.COMBAT_AFTER_DEAL_DAMAGE][UpgradeCard.TWIN_LASER_TURRET] = function(store, token)
        {
            attack(store, token, UpgradeCard.TWIN_LASER_TURRET, function(store, attacker)
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

        UpgradeAbility3[Phase.COMBAT_END] = {};

        UpgradeAbility3[Phase.COMBAT_END][UpgradeCard.MARA_JADE] = function(store, token)
        {
            // At the end of the Combat phase, each enemy ship at Range 1 that does not have a stress token receives 1 stress token.
            if (token.isUpgradedWith(UpgradeCard.MARA_JADE))
            {
                environment.getUnfriendlyTokensAtRange(token, RangeRuler.ONE).forEach(function(enemy)
                {
                    if (!enemy.isStressed())
                    {
                        enemy.receiveStress();
                    }
                });
            }
        };

        function action(store, token, upgradeFunction)
        {
            InputValidator.validateNotNull("store", store);
            InputValidator.validateNotNull("token", token);
            InputValidator.validateNotNull("upgradeFunction", upgradeFunction);

            var activeToken = Selector.activeToken(store.getState());

            if (activeToken === token)
            {
                upgradeFunction(store, activeToken);
            }
        }

        function attack(store, token, upgradeKeyIn, upgradeFunction)
        {
            InputValidator.validateNotNull("store", store);
            InputValidator.validateNotNull("token", token);
            InputValidator.validateNotNull("upgradeKeyIn", upgradeKeyIn);
            InputValidator.validateNotNull("upgradeFunction", upgradeFunction);

            var attacker = Selector.activeToken(store.getState());

            if (attacker === token)
            {
                var combatState = attacker.combatState();
                var combatAction = combatState.combatAction();
                var weapon = combatAction.weapon();

                if (weapon.upgradeKey() === upgradeKeyIn)
                {
                    upgradeFunction(store, attacker);
                }
            }
        }

        function defend(store, token, upgradeKeyIn, upgradeFunction)
        {
            InputValidator.validateNotNull("store", store);
            InputValidator.validateNotNull("token", token);
            InputValidator.validateNotNull("upgradeKeyIn", upgradeKeyIn);
            InputValidator.validateNotNull("upgradeFunction", upgradeFunction);

            var attacker = Selector.activeToken(store.getState());
            var defender = attacker.combatState().combatAction().defender();

            if (defender === token)
            {
                if (defender.isUpgradedWith(upgradeKeyIn))
                {
                    upgradeFunction(store, attacker, defender);
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
            Object.freeze(UpgradeAbility3);
        }

        return UpgradeAbility3;
    });

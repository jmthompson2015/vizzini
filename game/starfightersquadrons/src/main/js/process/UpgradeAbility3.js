/*
 * Provides upgrade abilities for the Combat Phase.
 */
define(["AttackDice", "Phase", "RangeRuler", "UpgradeCard", "UpgradeType", "process/Action", "process/Selector", "process/TargetLock"],
    function(AttackDice, Phase, RangeRuler, UpgradeCard, UpgradeType, Action, Selector, TargetLock)
    {
        "use strict";
        var UpgradeAbility3 = {};

        ////////////////////////////////////////////////////////////////////////
        UpgradeAbility3[Phase.COMBAT_DECLARE_TARGET] = {};

        UpgradeAbility3[Phase.COMBAT_DECLARE_TARGET][UpgradeCard.BLASTER_TURRET] = function(store, token)
        {
            // Spend 1 Focus token to perform this attack against 1 ship (even a ship outside your firing arc).
            attack(store, token, UpgradeCard.BLASTER_TURRET, function(store, attacker)
            {
                spendFocusToken(store, attacker);
            });
        };

        UpgradeAbility3[Phase.COMBAT_DECLARE_TARGET][UpgradeCard.HOT_SHOT_BLASTER] = function(store, token)
        {
            // Discard this card to attack 1 ship (even a ship outside your firing arc).
            attack(store, token, UpgradeCard.HOT_SHOT_BLASTER, function(store, attacker)
            {
                discardUpgrade(attacker);
            });
        };

        ////////////////////////////////////////////////////////////////////////
        UpgradeAbility3[Phase.COMBAT_MODIFY_ATTACK_DICE] = {};

        UpgradeAbility3[Phase.COMBAT_MODIFY_ATTACK_DICE][UpgradeCard.ADVANCED_PROTON_TORPEDOES] = function(store, token)
        {
            // Spend your Target Lock and discard this card to perform this attack. You may change up to 3 of your blank results to Focus results.
            attack(store, token, UpgradeCard.ADVANCED_PROTON_TORPEDOES, function(store, attacker)
            {
                spendTargetLockAndDiscardUpgrade(attacker);

                var attackDice = getAttackDice(attacker);
                attackDice.changeOneToValue(AttackDice.Value.BLANK, AttackDice.Value.FOCUS);
                attackDice.changeOneToValue(AttackDice.Value.BLANK, AttackDice.Value.FOCUS);
                attackDice.changeOneToValue(AttackDice.Value.BLANK, AttackDice.Value.FOCUS);
            });
        };

        UpgradeAbility3[Phase.COMBAT_MODIFY_ATTACK_DICE][UpgradeCard.CALCULATION] = {
            // When attacking, you may spend a Focus token to change 1 of your Focus results to a Critical Hit result.
            condition: function(store, token)
            {
                var attacker = getActiveToken(store);
                var attackDice = getAttackDice(attacker);
                return token === attacker && token.focusCount() > 0 && attackDice.focusCount() > 0;
            },
            consequent: function(store, token)
            {
                spendFocusToken(store, token);
                var attackDice = getAttackDice(token);
                attackDice.changeOneToValue(AttackDice.Value.FOCUS, AttackDice.Value.CRITICAL_HIT);
            },
        };

        UpgradeAbility3[Phase.COMBAT_MODIFY_ATTACK_DICE][UpgradeCard.CLUSTER_MISSILES] = function(store, token)
        {
            // Spend your Target Lock and discard this card to perform this attack twice.
            attack(store, token, UpgradeCard.CLUSTER_MISSILES, function(store, attacker)
            {
                spendTargetLockAndDiscardUpgrade(attacker);
            });
        };

        UpgradeAbility3[Phase.COMBAT_MODIFY_ATTACK_DICE][UpgradeCard.CONCUSSION_MISSILES] = function(store, token)
        {
            // Spend your Target Lock and discard this card to perform this attack. You may change 1 of your blank results to a Hit result.
            attack(store, token, UpgradeCard.CONCUSSION_MISSILES, function(store, attacker)
            {
                spendTargetLockAndDiscardUpgrade(attacker);

                var attackDice = getAttackDice(attacker);
                attackDice.changeOneToValue(AttackDice.Value.BLANK, AttackDice.Value.HIT);
            });
        };

        UpgradeAbility3[Phase.COMBAT_MODIFY_ATTACK_DICE][UpgradeCard.DENGAR] = {
            // When attacking, you may reroll 1 attack die. If the defender is a unique pilot, you may instead reroll up to 2 attack dice.
            condition: function(store, token)
            {
                var attacker = getActiveToken(store);
                return token === attacker;
            },
            consequent: function(store, token)
            {
                var attackDice = getAttackDice(token);
                var defender = getDefender(token);
                var count = (defender.pilot().isUnique ? 2 : 1);
                attackDice.rerollBlankAndFocus(count);
            },
        };

        UpgradeAbility3[Phase.COMBAT_MODIFY_ATTACK_DICE][UpgradeCard.EZRA_BRIDGER] = {
            // When attacking, if you are stressed, you may change 1 of your Focus results to a Critical Hit result.
            condition: function(store, token)
            {
                var attacker = getActiveToken(store);
                var attackDice = getAttackDice(attacker);
                return token === attacker && token.isStressed() && attackDice.focusCount() > 0;
            },
            consequent: function(store, token)
            {
                var attackDice = getAttackDice(token);
                attackDice.changeOneToValue(AttackDice.Value.FOCUS, AttackDice.Value.CRITICAL_HIT);
            },
        };

        UpgradeAbility3[Phase.COMBAT_MODIFY_ATTACK_DICE][UpgradeCard.GUIDANCE_CHIPS] = {
            // Once per round, when attacking with a Torpedo or Missile secondary weapon, you may change 1 die result to a Hit result (or a Critical result if your primary weapon value is "3" or higher).
            condition: function(store, token)
            {
                var upgradeKey = UpgradeCard.GUIDANCE_CHIPS;
                var attacker = getActiveToken(store);
                var attackDice = getAttackDice(attacker);
                var weapon = getWeapon(attacker);
                var isTorpedoOrMissile = (weapon.upgrade() !== undefined) && [UpgradeType.TORPEDO, UpgradeType.MISSILE].vizziniContains(weapon.upgrade().type);
                return !usedThisRound(store, token, upgradeKey) && token === attacker && isTorpedoOrMissile &&
                    (attackDice.blankCount() > 0 || attackDice.focusCount() > 0);
            },
            consequent: function(store, token)
            {
                var attackDice = getAttackDice(token);
                var weapon = getWeapon(token);
                var oldValue = (attackDice.blankCount() > 0 ? AttackDice.Value.BLANK : AttackDice.Value.FOCUS);
                var newValue = (weapon.weaponValue() >= 3 ? AttackDice.Value.CRITICAL_HIT : AttackDice.Value.HIT);
                attackDice.changeOneToValue(oldValue, newValue);
                store.dispatch(Action.addTokenUpgradePerRound(token.id(), UpgradeCard.GUIDANCE_CHIPS));
            },
        };

        UpgradeAbility3[Phase.COMBAT_MODIFY_ATTACK_DICE][UpgradeCard.GUNNERY_TEAM] = {
            // Once per round, when attacking with a secondary weapon, you may spend 1 energy to change 1 of your blank results to a Hit result.
            condition: function(store, token)
            {
                var upgradeKey = UpgradeCard.GUNNERY_TEAM;
                var attacker = getActiveToken(store);
                var weapon = getWeapon(attacker);
                var attackDice = getAttackDice(attacker);
                return !usedThisRound(store, token, upgradeKey) && token === attacker &&
                    !weapon.isPrimary() && token.energyCount() > 0 && attackDice.blankCount() > 0;
            },
            consequent: function(store, token)
            {
                var attackDice = getAttackDice(token);
                attackDice.changeOneToValue(AttackDice.Value.BLANK, AttackDice.Value.HIT);
                store.dispatch(Action.addTokenUpgradePerRound(token.id(), UpgradeCard.GUNNERY_TEAM));
            },
        };

        UpgradeAbility3[Phase.COMBAT_MODIFY_ATTACK_DICE][UpgradeCard.HAN_SOLO] = {
            // When attacking, if you have a Target Lock on the defender, you may spend that Target Lock to change all of your Focus results to Hit results.
            condition: function(store, token)
            {
                var attacker = getActiveToken(store);
                var defender = getDefender(attacker);
                var targetLock = token.findTargetLockByDefender(defender);
                var attackDice = getAttackDice(attacker);
                return token === attacker && targetLock !== undefined && attackDice.focusCount() > 0;
            },
            consequent: function(store, token)
            {
                var defender = getDefender(token);
                spendTargetLock(token, defender);
                var attackDice = getAttackDice(token);
                attackDice.changeAllToValue(AttackDice.Value.FOCUS, AttackDice.Value.HIT);
            },
        };

        UpgradeAbility3[Phase.COMBAT_MODIFY_ATTACK_DICE][UpgradeCard.HEAVY_LASER_CANNON] = function(store, token)
        {
            // Attack 1 ship. Immediately after rolling your attack dice, you must change all of your Critical Hit results to Hit results.
            attack(store, token, UpgradeCard.HEAVY_LASER_CANNON, function(store, attacker)
            {
                var attackDice = getAttackDice(attacker);
                attackDice.changeAllToValue(AttackDice.Value.CRITICAL_HIT, AttackDice.Value.HIT);
            });
        };

        UpgradeAbility3[Phase.COMBAT_MODIFY_ATTACK_DICE][UpgradeCard.MANGLER_CANNON] = function(store, token)
        {
            // Attack 1 ship. When attacking, you may change 1 of your Hit results to a Critical Hit result.
            attack(store, token, UpgradeCard.MANGLER_CANNON, function(store, attacker)
            {
                var attackDice = getAttackDice(attacker);
                attackDice.changeOneToValue(AttackDice.Value.HIT, AttackDice.Value.CRITICAL_HIT);
            });
        };

        UpgradeAbility3[Phase.COMBAT_MODIFY_ATTACK_DICE][UpgradeCard.MERCENARY_COPILOT] = {
            // When attacking at Range 3, you may change 1 of your Hit results to a Critical Hit result.
            condition: function(store, token)
            {
                var attacker = getActiveToken(store);
                var defender = getDefender(attacker);
                var rangeKey = getRangeKey(attacker);
                var attackDice = getAttackDice(attacker);
                return token === attacker && rangeKey === RangeRuler.THREE && attackDice.hitCount() > 0;
            },
            consequent: function(store, token)
            {
                var attackDice = getAttackDice(token);
                attackDice.changeOneToValue(AttackDice.Value.HIT, AttackDice.Value.CRITICAL_HIT);
            }
        };

        UpgradeAbility3[Phase.COMBAT_MODIFY_ATTACK_DICE][UpgradeCard.OPPORTUNIST] = {
            // When attacking, if the defender does not have any Focus or Evade tokens, you may receive 1 stress token to roll 1 additional attack die. You cannot use this ability if you have any stress tokens.
            condition: function(store, token)
            {
                var attacker = getActiveToken(store);
                var defender = getDefender(attacker);
                return token === attacker && token.stressCount() === 0 && defender.evadeCount() === 0 && defender.focusCount() === 0;
            },
            consequent: function(store, token)
            {
                token.receiveStress();
                var attackDice = getAttackDice(token);
                attackDice.addDie();
            },
        };

        UpgradeAbility3[Phase.COMBAT_MODIFY_ATTACK_DICE][UpgradeCard.PREDATOR] = {
            // When attacking, you may reroll 1 attack die. If the defender's pilot skill value if "2" or lower, you may instead reroll up to 2 attack dice.
            condition: function(store, token)
            {
                var attacker = getActiveToken(store);
                var defender = getDefender(attacker);
                return token === attacker && token.stressCount() === 0 && defender.evadeCount() === 0 && defender.focusCount() === 0;
            },
            consequent: function(store, token)
            {
                var defender = getDefender(token);
                var attackDice = getAttackDice(token);
                var count = (defender.pilotSkillValue() <= 2 ? 2 : 1);
                attackDice.rerollBlankAndFocus(count);
            }
        };

        UpgradeAbility3[Phase.COMBAT_MODIFY_ATTACK_DICE][UpgradeCard.PROTON_ROCKETS] = function(store, token)
        {
            // Discard this card to perform this attack. You may roll additional attack dice equal to your agility value, to a maximum of 3 additional dice.
            attack(store, token, UpgradeCard.PROTON_ROCKETS, function(store, attacker)
            {
                discardUpgrade(attacker);
            });
        };

        UpgradeAbility3[Phase.COMBAT_MODIFY_ATTACK_DICE][UpgradeCard.PROTON_TORPEDOES] = function(store, token)
        {
            // Spend your Target Lock and discard this card to perform this attack. You may change 1 of your Focus results to a Critical Hit result.
            attack(store, token, UpgradeCard.PROTON_TORPEDOES, function(store, attacker)
            {
                spendTargetLockAndDiscardUpgrade(attacker);

                var attackDice = getAttackDice(attacker);
                attackDice.changeOneToValue(AttackDice.Value.FOCUS, AttackDice.Value.CRITICAL_HIT);
            });
        };

        UpgradeAbility3[Phase.COMBAT_MODIFY_ATTACK_DICE][UpgradeCard.WEAPONS_GUIDANCE] = {
            // When attacking, you may spend a focus token to change 1 of your blank results to a Hit result.
            condition: function(store, token)
            {
                var attacker = getActiveToken(store);
                var attackDice = getAttackDice(attacker);
                return token === attacker && token.focusCount() > 0 && attackDice.blankCount() > 0;
            },
            consequent: function(store, token)
            {
                spendFocusToken(store, token);

                var attackDice = getAttackDice(token);
                attackDice.changeOneToValue(AttackDice.Value.BLANK, AttackDice.Value.HIT);
            },
        };

        UpgradeAbility3[Phase.COMBAT_MODIFY_ATTACK_DICE][UpgradeCard.WIRED] = {
            // When attacking or defending, if you are stressed, you may reroll 1 or more of your Focus results.
            condition: function(store, token)
            {
                var attacker = getActiveToken(store);
                var attackDice = getAttackDice(attacker);
                return token === attacker && token.isStressed() && attackDice.focusCount() > 0;
            },
            consequent: function(store, token)
            {
                var attackDice = getAttackDice(token);
                attackDice.rerollAllFocus();
            },
        };

        ////////////////////////////////////////////////////////////////////////
        UpgradeAbility3[Phase.COMBAT_MODIFY_DEFENSE_DICE] = {};

        UpgradeAbility3[Phase.COMBAT_MODIFY_DEFENSE_DICE][UpgradeCard.FLIGHT_INSTRUCTOR] = {
            // When defending, you may reroll 1 of your Focus results. If the attacker's pilot skill value is "2" or lower, you may reroll 1 of your blank results instead.
            condition: function(store, token)
            {
                var attacker = getActiveToken(store);
                var pilotSkill = attacker.pilotSkillValue();
                var defender = getDefender(attacker);
                var defenseDice = getDefenseDice(attacker);
                return token === defender && ((pilotSkill <= 2 && defenseDice.blankCount() > 0) ||
                    (pilotSkill > 2 && defenseDice.focusCount() > 0));
            },
            consequent: function(store, token)
            {
                var attacker = getActiveToken(store);
                var defenseDice = getDefenseDice(attacker);

                if (attacker.pilotSkillValue() <= 2)
                {
                    defenseDice.rerollBlank();
                }
                else
                {
                    defenseDice.rerollFocus();
                }
            },
        };

        UpgradeAbility3[Phase.COMBAT_MODIFY_DEFENSE_DICE][UpgradeCard.JUKE] = {
            // When attacking, if you have an Evade token, you may change 1 of the defender's Evade results to a Focus result.
            condition: function(store, token)
            {
                var attacker = getActiveToken(store);
                var defenseDice = getDefenseDice(attacker);
                return token === attacker && token.evadeCount() > 0 && defenseDice.evadeCount() > 0;
            },
            consequent: function(store, token)
            {
                var defenseDice = getDefenseDice(token);
                defenseDice.changeOneToValue(AttackDice.Value.EVADE, AttackDice.Value.FOCUS);
            },
        };

        UpgradeAbility3[Phase.COMBAT_MODIFY_DEFENSE_DICE][UpgradeCard.WIRED] = {
            // When attacking or defending, if you are stressed, you may reroll 1 or more of your Focus results.
            condition: function(store, token)
            {
                var attacker = getActiveToken(store);
                var defender = getDefender(attacker);
                var defenseDice = getDefenseDice(attacker);
                return token === defender && token.isStressed() && defenseDice.focusCount() > 0;
            },
            consequent: function(store, token)
            {
                var attacker = getActiveToken(store);
                var defenseDice = getDefenseDice(attacker);
                defenseDice.rerollAllFocus();
            },
        };

        ////////////////////////////////////////////////////////////////////////
        UpgradeAbility3[Phase.COMBAT_DEAL_DAMAGE] = {};

        UpgradeAbility3[Phase.COMBAT_DEAL_DAMAGE][UpgradeCard.ADVANCED_HOMING_MISSILES] = function(store, token)
        {
            // Discard this card to perform this attack. If this attack hits, deal 1 faceup Damage card to the defender. Then cancel all dice results.
            attack(store, token, UpgradeCard.ADVANCED_HOMING_MISSILES, function(store, attacker)
            {
                discardUpgrade(attacker);

                if (isDefenderHit(attacker))
                {
                    var defender = getDefender(attacker);
                    var environment = store.getState().environment;
                    defender.addCriticalDamage(environment.drawDamage());
                }
            });
        };

        UpgradeAbility3[Phase.COMBAT_DEAL_DAMAGE][UpgradeCard.ION_PULSE_MISSILES] = function(store, token)
        {
            // Spend your Target Lock and discard this card to perform this attack. If this attack hits, the defender suffers 1 damage and receives 2 ion tokens. Then cancel all dice results.
            attack(store, token, UpgradeCard.ION_PULSE_MISSILES, function(store, attacker)
            {
                discardUpgrade(attacker);

                if (isDefenderHit(attacker))
                {
                    var defender = getDefender(attacker);
                    var environment = store.getState().environment;
                    defender.addDamage(environment.drawDamage());
                    store.dispatch(Action.addIonCount(defender, 2));
                }
            });
        };

        UpgradeAbility3[Phase.COMBAT_DEAL_DAMAGE][UpgradeCard.XX_23_S_THREAD_TRACERS] = function(store, token)
        {
            // Discard this card to perform this attack. If this attack hits, each friendly ship at Range 1-2 of you may acquire a target lock on the defender. Then cancel all dice results.
            attack(store, token, UpgradeCard.XX_23_S_THREAD_TRACERS, function(store, attacker)
            {
                discardUpgrade(attacker);

                if (isDefenderHit(attacker))
                {
                    // Each friendly ship at Range 1-2 of you may acquire a target lock on the defender.
                    var defender = getDefender(attacker);
                    var defenderPosition = getDefenderPosition(attacker);
                    var environment = store.getState().environment;
                    [RangeRuler.ONE, RangeRuler.TWO].forEach(function(rangeKey)
                    {
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

        ////////////////////////////////////////////////////////////////////////
        UpgradeAbility3[Phase.COMBAT_AFTER_DEAL_DAMAGE] = {};

        UpgradeAbility3[Phase.COMBAT_AFTER_DEAL_DAMAGE][UpgradeCard.ASSAULT_MISSILES] = function(store, token)
        {
            // Spend your Target Lock and discard this card to perform this attack. If this attack hits, each other ship at Range 1 of the defender suffers 1 damage.
            attack(store, token, UpgradeCard.ASSAULT_MISSILES, function(store, attacker)
            {
                spendTargetLockAndDiscardUpgrade(attacker);

                if (isDefenderHit(attacker))
                {
                    var environment = store.getState().environment;
                    var defender = getDefender(attacker);
                    environment.getTokensAtRange(defender, RangeRuler.ONE).forEach(function(token)
                    {
                        token.addDamage(environment.drawDamage());
                    });
                }
            });
        };

        UpgradeAbility3[Phase.COMBAT_AFTER_DEAL_DAMAGE][UpgradeCard.DEAD_MANS_SWITCH] = {
            // When you are destroyed, each ship at Range 1 suffers 1 damage.
            condition: function(store, token)
            {
                return token.isDestroyed();
            },
            consequent: function(store, token)
            {
                var environment = store.getState().environment;

                environment.getTokensAtRange(defender, RangeRuler.ONE).forEach(function(myToken)
                {
                    myToken.addDamage(environment.drawDamage());
                });
            },
        };

        UpgradeAbility3[Phase.COMBAT_AFTER_DEAL_DAMAGE][UpgradeCard.FLECHETTE_CANNON] = function(store, token)
        {
            // Attack 1 ship. If this attack hits, the defender suffers 1 damage and, if the defender is not stressed, it also receives 1 stress token. Then cancel all dice results.
            attack(store, token, UpgradeCard.FLECHETTE_CANNON, function(store, attacker)
            {
                if (isDefenderHit(attacker))
                {
                    var environment = store.getState().environment;
                    var defender = getDefender(attacker);
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
            // Discard this card and spend your Target Lock to perform this attack. After you perform this attack, the defender receives 1 stress token if its hull value is "4" or lower.
            attack(store, token, UpgradeCard.FLECHETTE_TORPEDOES, function(store, attacker)
            {
                spendTargetLockAndDiscardUpgrade(attacker);

                var defender = getDefender(attacker);

                if (defender.hullValue() <= 4)
                {
                    defender.receiveStress();
                }
            });
        };

        UpgradeAbility3[Phase.COMBAT_AFTER_DEAL_DAMAGE][UpgradeCard.ION_CANNON] = function(store, token)
        {
            // Attack 1 ship. If this attack hits, the defender suffers 1 damage and receives 1 ion token. Then cancel all dice results.
            attack(store, token, UpgradeCard.ION_CANNON, function(store, attacker)
            {
                if (isDefenderHit(attacker))
                {
                    var environment = store.getState().environment;
                    var defender = getDefender(attacker);
                    defender.addDamage(environment.drawDamage());
                    store.dispatch(Action.addIonCount(defender));
                }
            });
        };

        UpgradeAbility3[Phase.COMBAT_AFTER_DEAL_DAMAGE][UpgradeCard.ION_CANNON_TURRET] = function(store, token)
        {
            // Attack 1 ship (even a ship outside your firing arc). If this attack hits the target ship, the ship suffers 1 damage and receives 1 ion token. Then cancel all dice results.
            attack(store, token, UpgradeCard.ION_CANNON_TURRET, function(store, attacker)
            {
                if (isDefenderHit(attacker))
                {
                    var environment = store.getState().environment;
                    var defender = getDefender(attacker);
                    defender.addDamage(environment.drawDamage());
                    store.dispatch(Action.addIonCount(defender));
                }
            });
        };

        UpgradeAbility3[Phase.COMBAT_AFTER_DEAL_DAMAGE][UpgradeCard.ION_TORPEDOES] = function(store, token)
        {
            // Spend your Target Lock and discard this card to perform this attack. If this attack hits, the defender and each ship at Range 1 of it receives 1 ion token.
            attack(store, token, UpgradeCard.ION_TORPEDOES, function(store, attacker)
            {
                spendTargetLockAndDiscardUpgrade(attacker);

                if (isDefenderHit(attacker))
                {
                    var environment = store.getState().environment;
                    var defender = getDefender(attacker);
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
            // Spend your Target Lock and discard this card to perform this attack. If this attack hits, after dealing damage, remove 1 shield token from the defender.
            attack(store, token, UpgradeCard.PLASMA_TORPEDOES, function(store, attacker)
            {
                spendTargetLockAndDiscardUpgrade(attacker);

                if (isDefenderHit(attacker))
                {
                    var defender = getDefender(attacker);
                    store.dispatch(Action.addShieldCount(defender, -1));
                }
            });
        };

        UpgradeAbility3[Phase.COMBAT_AFTER_DEAL_DAMAGE][UpgradeCard.REINFORCED_DEFLECTORS] = {
            // After you suffer 3 or more damage from an attack, recover 1 shield (up to your shield value).
            condition: function(store, token)
            {
                var attacker = getActiveToken(store);
                var defender = getDefender(attacker);
                var damageDealer = getDamageDealer(attacker);
                return token === defender && damageDealer.hits() + damageDealer.criticalHits() >= 3;
            },
            consequent: function(store, token)
            {
                var attacker = getActiveToken(store);
                var defender = getDefender(attacker);
                defender.recoverShield();
            },
        };

        UpgradeAbility3[Phase.COMBAT_AFTER_DEAL_DAMAGE][UpgradeCard.TRACTOR_BEAM] = function(store, token)
        {
            // Attack 1 ship. If this attack hits, the defender receives 1 tractor beam token. Then cancel all dice results.
            attack(store, token, UpgradeCard.TRACTOR_BEAM, function(store, attacker)
            {
                if (isDefenderHit(attacker))
                {
                    var defender = getDefender(attacker);
                    store.dispatch(Action.addTractorBeamCount(defender));
                }
            });
        };

        UpgradeAbility3[Phase.COMBAT_AFTER_DEAL_DAMAGE][UpgradeCard.TWIN_LASER_TURRET] = function(store, token)
        {
            // Perform this attack twice (even against a ship outside your firing arc). Each time this attack hits, the defender suffers 1 damage. Then cancel all dice results.
            attack(store, token, UpgradeCard.TWIN_LASER_TURRET, function(store, attacker)
            {
                if (isDefenderHit(attacker))
                {
                    var environment = store.getState().environment;
                    var defender = getDefender(attacker);
                    defender.addDamage(environment.drawDamage());
                }
            });
        };

        ////////////////////////////////////////////////////////////////////////
        UpgradeAbility3[Phase.COMBAT_END] = {};

        UpgradeAbility3[Phase.COMBAT_END][UpgradeCard.MARA_JADE] = {
            // At the end of the Combat phase, each enemy ship at Range 1 that does not have a stress token receives 1 stress token.
            condition: function(store, token)
            {
                return true;
            },
            consequent: function(store, token)
            {
                var environment = store.getState().environment;
                environment.getUnfriendlyTokensAtRange(token, RangeRuler.ONE).forEach(function(enemy)
                {
                    if (!enemy.isStressed())
                    {
                        enemy.receiveStress();
                    }
                });
            },
        };

        function attack(store, token, upgradeKeyIn, upgradeFunction)
        {
            InputValidator.validateNotNull("store", store);
            InputValidator.validateNotNull("token", token);
            InputValidator.validateNotNull("upgradeKeyIn", upgradeKeyIn);
            InputValidator.validateNotNull("upgradeFunction", upgradeFunction);

            var attacker = Selector.activeToken(store.getState());

            if (attacker === token)
            {
                var weapon = getWeapon(attacker);

                if (weapon.upgradeKey() === upgradeKeyIn)
                {
                    upgradeFunction(store, attacker);
                }
            }
        }

        function discardUpgrade(attacker)
        {
            InputValidator.validateNotNull("attacker", attacker);

            var weapon = getWeapon(attacker);
            var upgradeKey = weapon.upgradeKey();
            attacker.discardUpgrade(upgradeKey);
        }

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

        function getDamageDealer(attacker)
        {
            InputValidator.validateNotNull("attacker", attacker);

            return attacker.combatState().damageDealer();
        }

        function getDefender(attacker)
        {
            InputValidator.validateNotNull("attacker", attacker);

            return attacker.combatState().combatAction().defender();
        }

        function getDefenderPosition(attacker)
        {
            InputValidator.validateNotNull("attacker", attacker);

            return attacker.combatState().combatAction().defenderPosition();
        }

        function getDefenseDice(attacker)
        {
            InputValidator.validateNotNull("attacker", attacker);

            return attacker.combatState().defenseDice();
        }

        function getRangeKey(attacker)
        {
            InputValidator.validateNotNull("attacker", attacker);

            return attacker.combatState().rangeKey();
        }

        function getWeapon(attacker)
        {
            InputValidator.validateNotNull("attacker", attacker);

            return attacker.combatState().combatAction().weapon();
        }

        function isDefenderHit(attacker)
        {
            InputValidator.validateNotNull("attacker", attacker);

            return attacker.combatState().isDefenderHit();
        }

        function spendFocusToken(store, attacker)
        {
            InputValidator.validateNotNull("store", store);
            InputValidator.validateNotNull("attacker", attacker);

            store.dispatch(Action.addFocusCount(attacker, -1));
        }

        function spendTargetLock(attacker, defender)
        {
            InputValidator.validateNotNull("attacker", attacker);
            InputValidator.validateNotNull("defender", defender);

            var targetLock = attacker.findTargetLockByDefender(defender);
            attacker.removeAttackerTargetLock(targetLock);
        }

        function spendTargetLockAndDiscardUpgrade(attacker)
        {
            InputValidator.validateNotNull("attacker", attacker);

            var defender = getDefender(attacker);
            spendTargetLock(attacker, defender);
            discardUpgrade(attacker);
        }

        function usedThisRound(store, token, upgradeKey)
        {
            InputValidator.validateNotNull("store", store);
            InputValidator.validateNotNull("token", token);
            InputValidator.validateNotNull("upgradeKey", upgradeKey);

            return Selector.tokenToUpgradePerRound(store.getState(), token.id(), upgradeKey) > 0;
        }

        if (Object.freeze)
        {
            Object.freeze(UpgradeAbility3);
        }

        return UpgradeAbility3;
    });

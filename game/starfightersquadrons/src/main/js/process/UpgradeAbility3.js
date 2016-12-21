/*
 * Provides upgrade abilities for the Combat Phase.
 */
define(["AttackDice", "DefenseDice", "Phase", "RangeRuler", "ShipAction", "UpgradeCard", "UpgradeType", "process/Action", "process/Selector", "process/ShipActionAction", "process/TargetLock"],
    function(AttackDice, DefenseDice, Phase, RangeRuler, ShipAction, UpgradeCard, UpgradeType, Action, Selector, ShipActionAction, TargetLock)
    {
        "use strict";
        var UpgradeAbility3 = {};

        ////////////////////////////////////////////////////////////////////////
        UpgradeAbility3[Phase.COMBAT_DECLARE_TARGET] = {};

        UpgradeAbility3[Phase.COMBAT_DECLARE_TARGET][UpgradeCard.BLASTER_TURRET] = {
            // Spend 1 Focus token to perform this attack against 1 ship (even a ship outside your firing arc).
            condition: function(store, token)
            {
                var attacker = getActiveToken(store);
                var weapon = getWeapon(attacker);
                var upgradeKey = UpgradeCard.BLASTER_TURRET;
                return token === attacker && weapon.upgradeKey() === upgradeKey;
            },
            consequent: function(store, token, callback)
            {
                var attacker = getActiveToken(store);
                spendFocusToken(store, attacker);
                callback();
            },
        };

        UpgradeAbility3[Phase.COMBAT_DECLARE_TARGET][UpgradeCard.HOT_SHOT_BLASTER] = {
            // Discard this card to attack 1 ship (even a ship outside your firing arc).
            condition: function(store, token)
            {
                var attacker = getActiveToken(store);
                var weapon = getWeapon(attacker);
                var upgradeKey = UpgradeCard.HOT_SHOT_BLASTER;
                return token === attacker && weapon.upgradeKey() === upgradeKey;
            },
            consequent: function(store, token, callback)
            {
                var attacker = getActiveToken(store);
                discardUpgrade(attacker);
                callback();
            },
        };

        UpgradeAbility3[Phase.COMBAT_DECLARE_TARGET][UpgradeCard.R3_A2] = {
            // When you declare the target of your attack, if the defender is inside your firing arc, you may receive 1 stress token to cause the defender to receive 1 stress token.
            condition: function(store, token)
            {
                var upgradeKey = UpgradeCard.R3_A2;
                var attacker = getActiveToken(store);
                var weapon = getWeapon(attacker);
                var attackerPosition = getAttackerPosition(attacker);
                var firingArc = weapon.primaryFiringArc();
                var defender = getDefender(attacker);
                var defenderPosition = getDefenderPosition(attacker);
                var isDefenderInFiringArc = weapon.isDefenderInFiringArc(attackerPosition, firingArc, defender, defenderPosition);
                return token === attacker && isDefenderInFiringArc;
            },
            consequent: function(store, token, callback)
            {
                var attacker = getActiveToken(store);
                var defender = getDefender(attacker);
                attacker.receiveStress();
                defender.receiveStress();
                callback();
            },
        };

        UpgradeAbility3[Phase.COMBAT_DECLARE_TARGET][UpgradeCard.REBEL_CAPTIVE] = {
            // Once per round, the first ship that declares you as the target of an attack immediately receives 1 stress token.
            condition: function(store, token)
            {
                var upgradeKey = UpgradeCard.REBEL_CAPTIVE;
                var attacker = getActiveToken(store);
                var defender = getDefender(attacker);
                return !usedThisRound(store, token, upgradeKey) && token === defender;
            },
            consequent: function(store, token, callback)
            {
                var attacker = getActiveToken(store);
                attacker.receiveStress();
                store.dispatch(Action.addTokenUpgradePerRound(token, UpgradeCard.REBEL_CAPTIVE));
                callback();
            },
        };

        ////////////////////////////////////////////////////////////////////////
        UpgradeAbility3[Phase.COMBAT_MODIFY_ATTACK_DICE] = {};

        UpgradeAbility3[Phase.COMBAT_MODIFY_ATTACK_DICE][UpgradeCard.ADVANCED_PROTON_TORPEDOES] = {
            // Spend your Target Lock and discard this card to perform this attack. You may change up to 3 of your blank results to Focus results.
            condition: function(store, token)
            {
                var attacker = getActiveToken(store);
                var weapon = getWeapon(attacker);
                var upgradeKey = UpgradeCard.ADVANCED_PROTON_TORPEDOES;
                return token === attacker && weapon.upgradeKey() === upgradeKey;
            },
            consequent: function(store, token, callback)
            {
                var attacker = getActiveToken(store);
                spendTargetLockAndDiscardUpgrade(attacker);
                var attackDice = getAttackDice(attacker);
                attackDice.changeOneToValue(AttackDice.Value.BLANK, AttackDice.Value.FOCUS);
                attackDice.changeOneToValue(AttackDice.Value.BLANK, AttackDice.Value.FOCUS);
                attackDice.changeOneToValue(AttackDice.Value.BLANK, AttackDice.Value.FOCUS);
                callback();
            },
        };

        UpgradeAbility3[Phase.COMBAT_MODIFY_ATTACK_DICE][UpgradeCard.CALCULATION] = {
            // When attacking, you may spend a Focus token to change 1 of your Focus results to a Critical Hit result.
            condition: function(store, token)
            {
                var attacker = getActiveToken(store);
                var attackDice = getAttackDice(attacker);
                return token === attacker && token.focusCount() > 0 && attackDice.focusCount() > 0;
            },
            consequent: function(store, token, callback)
            {
                spendFocusToken(store, token);
                var attackDice = getAttackDice(token);
                attackDice.changeOneToValue(AttackDice.Value.FOCUS, AttackDice.Value.CRITICAL_HIT);
                callback();
            },
        };

        UpgradeAbility3[Phase.COMBAT_MODIFY_ATTACK_DICE][UpgradeCard.CLUSTER_MISSILES] = {
            // Spend your Target Lock and discard this card to perform this attack twice.
            condition: function(store, token)
            {
                var attacker = getActiveToken(store);
                var weapon = getWeapon(attacker);
                var upgradeKey = UpgradeCard.CLUSTER_MISSILES;
                return token === attacker && weapon.upgradeKey() === upgradeKey;
            },
            consequent: function(store, token, callback)
            {
                var attacker = getActiveToken(store);
                spendTargetLockAndDiscardUpgrade(attacker);
                callback();
            },
        };

        UpgradeAbility3[Phase.COMBAT_MODIFY_ATTACK_DICE][UpgradeCard.CONCUSSION_MISSILES] = {
            // Spend your Target Lock and discard this card to perform this attack. You may change 1 of your blank results to a Hit result.
            condition: function(store, token)
            {
                var attacker = getActiveToken(store);
                var weapon = getWeapon(attacker);
                var upgradeKey = UpgradeCard.CONCUSSION_MISSILES;
                return token === attacker && weapon.upgradeKey() === upgradeKey;
            },
            consequent: function(store, token, callback)
            {
                var attacker = getActiveToken(store);
                spendTargetLockAndDiscardUpgrade(attacker);
                var attackDice = getAttackDice(attacker);
                attackDice.changeOneToValue(AttackDice.Value.BLANK, AttackDice.Value.HIT);
                callback();
            },
        };

        UpgradeAbility3[Phase.COMBAT_MODIFY_ATTACK_DICE][UpgradeCard.DENGAR] = {
            // When attacking, you may reroll 1 attack die. If the defender is a unique pilot, you may instead reroll up to 2 attack dice.
            condition: function(store, token)
            {
                var attacker = getActiveToken(store);
                return token === attacker;
            },
            consequent: function(store, token, callback)
            {
                var attackDice = getAttackDice(token);
                var defender = getDefender(token);
                var count = (defender.pilot().isUnique ? 2 : 1);
                attackDice.rerollBlankAndFocus(count);
                callback();
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
            consequent: function(store, token, callback)
            {
                var attackDice = getAttackDice(token);
                attackDice.changeOneToValue(AttackDice.Value.FOCUS, AttackDice.Value.CRITICAL_HIT);
                callback();
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
            consequent: function(store, token, callback)
            {
                var attackDice = getAttackDice(token);
                var weapon = getWeapon(token);
                var oldValue = (attackDice.blankCount() > 0 ? AttackDice.Value.BLANK : AttackDice.Value.FOCUS);
                var newValue = (weapon.weaponValue() >= 3 ? AttackDice.Value.CRITICAL_HIT : AttackDice.Value.HIT);
                attackDice.changeOneToValue(oldValue, newValue);
                store.dispatch(Action.addTokenUpgradePerRound(token, UpgradeCard.GUIDANCE_CHIPS));
                callback();
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
            consequent: function(store, token, callback)
            {
                var attackDice = getAttackDice(token);
                attackDice.changeOneToValue(AttackDice.Value.BLANK, AttackDice.Value.HIT);
                store.dispatch(Action.addTokenUpgradePerRound(token, UpgradeCard.GUNNERY_TEAM));
                callback();
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
            consequent: function(store, token, callback)
            {
                var defender = getDefender(token);
                spendTargetLock(token, defender);
                var attackDice = getAttackDice(token);
                attackDice.changeAllToValue(AttackDice.Value.FOCUS, AttackDice.Value.HIT);
                callback();
            },
        };

        UpgradeAbility3[Phase.COMBAT_MODIFY_ATTACK_DICE][UpgradeCard.HEAVY_LASER_CANNON] = {
            // Attack 1 ship. Immediately after rolling your attack dice, you must change all of your Critical Hit results to Hit results.
            condition: function(store, token)
            {
                var attacker = getActiveToken(store);
                var weapon = getWeapon(token);
                var attackDice = getAttackDice(token);
                if (token === attacker && weapon.upgradeKey() === UpgradeCard.HEAVY_LASER_CANNON && attackDice.criticalHitCount() > 0)
                {
                    attackDice.changeAllToValue(AttackDice.Value.CRITICAL_HIT, AttackDice.Value.HIT);
                }
                return false;
            },
            consequent: function(store, token, callback)
            {
                callback();
            },
        };

        UpgradeAbility3[Phase.COMBAT_MODIFY_ATTACK_DICE][UpgradeCard.LONE_WOLF] = {
            // When attacking or defending, if there are no friendly ships at Range 1-2, you may reroll 1 of your blank results.
            condition: function(store, token)
            {
                var attacker = getActiveToken(store);
                var environment = store.getState().environment;
                var rangeOneTokens = environment.getTokensAtRange(token, RangeRuler.ONE);
                var rangeTwoTokens = environment.getTokensAtRange(token, RangeRuler.TWO);
                var attackDice = getAttackDice(attacker);
                return token === attacker && rangeOneTokens.length === 0 && rangeTwoTokens === 0 && attackDice.blankCount() > 0;
            },
            consequent: function(store, token, callback)
            {
                var attackDice = getAttackDice(token);
                attackDice.rerollBlank();
                callback();
            },
        };

        UpgradeAbility3[Phase.COMBAT_MODIFY_ATTACK_DICE][UpgradeCard.MANGLER_CANNON] = {
            // Attack 1 ship. When attacking, you may change 1 of your Hit results to a Critical Hit result.
            condition: function(store, token)
            {
                var attacker = getActiveToken(store);
                var weapon = getWeapon(attacker);
                var upgradeKey = UpgradeCard.MANGLER_CANNON;
                return token === attacker && weapon.upgradeKey() === upgradeKey;
            },
            consequent: function(store, token, callback)
            {
                var attacker = getActiveToken(store);
                var attackDice = getAttackDice(attacker);
                attackDice.changeOneToValue(AttackDice.Value.HIT, AttackDice.Value.CRITICAL_HIT);
                callback();
            },
        };

        UpgradeAbility3[Phase.COMBAT_MODIFY_ATTACK_DICE][UpgradeCard.MARKSMANSHIP] = {
            // Action: When attacking this round, you may change 1 of your Focus results to a Critical Hit result and all of your other Focus results to Hit results.
            condition: function(store, token)
            {
                var attacker = getActiveToken(store);
                var marksmanshipUsed = Selector.usedUpgrades(store.getState(), token).vizziniContains(UpgradeCard.MARKSMANSHIP);
                var attackDice = getAttackDice(token);
                return token === attacker && marksmanshipUsed && attackDice.focusCount() > 0;
            },
            consequent: function(store, token, callback)
            {
                var attackDice = getAttackDice(token);
                attackDice.changeOneToValue(AttackDice.Value.FOCUS, AttackDice.Value.CRITICAL_HIT);
                attackDice.changeAllToValue(AttackDice.Value.FOCUS, AttackDice.Value.HIT);
                callback();
            }
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
            consequent: function(store, token, callback)
            {
                var attackDice = getAttackDice(token);
                attackDice.changeOneToValue(AttackDice.Value.HIT, AttackDice.Value.CRITICAL_HIT);
                callback();
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
            consequent: function(store, token, callback)
            {
                token.receiveStress();
                var attackDice = getAttackDice(token);
                attackDice.addDie();
                callback();
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
            consequent: function(store, token, callback)
            {
                var defender = getDefender(token);
                var attackDice = getAttackDice(token);
                var count = (defender.pilotSkillValue() <= 2 ? 2 : 1);
                attackDice.rerollBlankAndFocus(count);
                callback();
            }
        };

        UpgradeAbility3[Phase.COMBAT_MODIFY_ATTACK_DICE][UpgradeCard.PROTON_ROCKETS] = {
            // Discard this card to perform this attack. You may roll additional attack dice equal to your agility value, to a maximum of 3 additional dice.
            condition: function(store, token)
            {
                var attacker = getActiveToken(store);
                var weapon = getWeapon(attacker);
                var upgradeKey = UpgradeCard.PROTON_ROCKETS;
                return token === attacker && weapon.upgradeKey() === upgradeKey;
            },
            consequent: function(store, token, callback)
            {
                var attacker = getActiveToken(store);
                discardUpgrade(attacker);
                callback();
            },
        };

        UpgradeAbility3[Phase.COMBAT_MODIFY_ATTACK_DICE][UpgradeCard.PROTON_TORPEDOES] = {
            // Spend your Target Lock and discard this card to perform this attack. You may change 1 of your Focus results to a Critical Hit result.
            condition: function(store, token)
            {
                var attacker = getActiveToken(store);
                var weapon = getWeapon(attacker);
                var upgradeKey = UpgradeCard.PROTON_TORPEDOES;
                return token === attacker && weapon.upgradeKey() === upgradeKey;
            },
            consequent: function(store, token, callback)
            {
                var attacker = getActiveToken(store);
                spendTargetLockAndDiscardUpgrade(attacker);
                var attackDice = getAttackDice(attacker);
                attackDice.changeOneToValue(AttackDice.Value.FOCUS, AttackDice.Value.CRITICAL_HIT);
                callback();
            },
        };

        UpgradeAbility3[Phase.COMBAT_MODIFY_ATTACK_DICE][UpgradeCard.RAGE] = {
            // Action: Assign 1 focus token to your ship and receive 2 stress tokens. Until the end of the round, when attacking, you may reroll up to 3 attack dice.
            condition: function(store, token)
            {
                var attacker = getActiveToken(store);
                var attackDice = getAttackDice(token);
                return token === attacker && (attackDice.blankCount() + attackDice.focusCount() > 0);
            },
            consequent: function(store, token, callback)
            {
                var attackDice = getAttackDice(token);
                var count = Math.min(3, attackDice.blankCount() + attackDice.focusCount());
                attackDice.rerollBlankAndFocus(count);
                callback();
            }
        };

        UpgradeAbility3[Phase.COMBAT_MODIFY_ATTACK_DICE][UpgradeCard.WEAPONS_GUIDANCE] = {
            // When attacking, you may spend a focus token to change 1 of your blank results to a Hit result.
            condition: function(store, token)
            {
                var attacker = getActiveToken(store);
                var attackDice = getAttackDice(attacker);
                return token === attacker && token.focusCount() > 0 && attackDice.blankCount() > 0;
            },
            consequent: function(store, token, callback)
            {
                spendFocusToken(store, token);

                var attackDice = getAttackDice(token);
                attackDice.changeOneToValue(AttackDice.Value.BLANK, AttackDice.Value.HIT);
                callback();
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
            consequent: function(store, token, callback)
            {
                var attackDice = getAttackDice(token);
                attackDice.rerollAllFocus();
                callback();
            },
        };

        ////////////////////////////////////////////////////////////////////////
        UpgradeAbility3[Phase.COMBAT_MODIFY_DEFENSE_DICE] = {};

        UpgradeAbility3[Phase.COMBAT_MODIFY_DEFENSE_DICE][UpgradeCard.AUTOTHRUSTERS] = {
            // When defending, if you are beyond Range 2 or outside the attacker's firing arc, you may change 1 of your blank results to an Evade result. You can equip this card only if you have the Boost action icon.
            condition: function(store, token)
            {
                var attacker = getActiveToken(store);
                var defender = getDefender(attacker);
                var rangeKey = getRangeKey(attacker);
                var defenseDice = getDefenseDice(attacker);
                var isBeyondRange2 = ![RangeRuler.ONE, RangeRuler.TWO].vizziniContains(rangeKey);
                var isOutsideFiringArc = !isInFiringArc(attacker);
                return token === defender && (isBeyondRange2 || isOutsideFiringArc) && defenseDice.blankCount() > 0;
            },
            consequent: function(store, token, callback)
            {
                var attacker = getActiveToken(store);
                var defenseDice = getDefenseDice(attacker);
                defenseDice.changeOneToValue(DefenseDice.Value.BLANK, DefenseDice.Value.EVADE);
                callback();
            },
        };

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
            consequent: function(store, token, callback)
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
                callback();
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
            consequent: function(store, token, callback)
            {
                var defenseDice = getDefenseDice(token);
                defenseDice.changeOneToValue(DefenseDice.Value.EVADE, DefenseDice.Value.FOCUS);
                callback();
            },
        };

        UpgradeAbility3[Phase.COMBAT_MODIFY_DEFENSE_DICE][UpgradeCard.LONE_WOLF] = {
            // When attacking or defending, if there are no friendly ships at Range 1-2, you may reroll 1 of your blank results.
            condition: function(store, token)
            {
                var attacker = getActiveToken(store);
                var defender = getDefender(attacker);
                var environment = store.getState().environment;
                var rangeOneTokens = environment.getTokensAtRange(token, RangeRuler.ONE);
                var rangeTwoTokens = environment.getTokensAtRange(token, RangeRuler.TWO);
                var defenseDice = getDefenseDice(attacker);
                return token === defender && rangeOneTokens.length === 0 && rangeTwoTokens.length === 0 && defenseDice.blankCount() > 0;
            },
            consequent: function(store, token, callback)
            {
                var attacker = getActiveToken(store);
                var defenseDice = getDefenseDice(attacker);
                defenseDice.rerollBlank();
                callback();
            },
        };

        UpgradeAbility3[Phase.COMBAT_MODIFY_DEFENSE_DICE][UpgradeCard.SENSOR_JAMMER] = {
            // When defending, you may change 1 of the attacker's Hit results to a Focus result. The attacker cannot reroll the die with the changed result.
            condition: function(store, token)
            {
                var attacker = getActiveToken(store);
                var defender = getDefender(attacker);
                var attackDice = getAttackDice(attacker);
                return token === defender && attackDice.hitCount() > 0;
            },
            consequent: function(store, token, callback)
            {
                var attacker = getActiveToken(store);
                var attackDice = getAttackDice(attacker);
                attackDice.changeOneToValue(AttackDice.Value.HIT, AttackDice.Value.FOCUS);
                callback();
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
            consequent: function(store, token, callback)
            {
                var attacker = getActiveToken(store);
                var defenseDice = getDefenseDice(attacker);
                defenseDice.rerollAllFocus();
                callback();
            },
        };

        ////////////////////////////////////////////////////////////////////////
        UpgradeAbility3[Phase.COMBAT_DEAL_DAMAGE] = {};

        UpgradeAbility3[Phase.COMBAT_DEAL_DAMAGE][UpgradeCard.ADVANCED_HOMING_MISSILES] = {
            // Discard this card to perform this attack. If this attack hits, deal 1 faceup Damage card to the defender. Then cancel all dice results.
            condition: function(store, token)
            {
                var attacker = getActiveToken(store);
                var weapon = getWeapon(attacker);
                var upgradeKey = UpgradeCard.ADVANCED_HOMING_MISSILES;
                return token === attacker && weapon.upgradeKey() === upgradeKey;
            },
            consequent: function(store, token, callback)
            {
                var attacker = getActiveToken(store);
                discardUpgrade(attacker);
                if (isDefenderHit(attacker))
                {
                    var defender = getDefender(attacker);
                    var environment = store.getState().environment;
                    defender.receiveCriticalDamage(environment.drawDamage());
                }
                callback();
            },
        };

        UpgradeAbility3[Phase.COMBAT_DEAL_DAMAGE][UpgradeCard.ION_PULSE_MISSILES] = {
            // Spend your Target Lock and discard this card to perform this attack. If this attack hits, the defender suffers 1 damage and receives 2 ion tokens. Then cancel all dice results.
            condition: function(store, token)
            {
                var attacker = getActiveToken(store);
                var weapon = getWeapon(attacker);
                var upgradeKey = UpgradeCard.ION_PULSE_MISSILES;
                return token === attacker && weapon.upgradeKey() === upgradeKey;
            },
            consequent: function(store, token, callback)
            {
                var attacker = getActiveToken(store);
                discardUpgrade(attacker);
                if (isDefenderHit(attacker))
                {
                    var defender = getDefender(attacker);
                    var environment = store.getState().environment;
                    defender.receiveDamage(environment.drawDamage());
                    store.dispatch(Action.addIonCount(defender, 2));
                }
                callback();
            },
        };

        UpgradeAbility3[Phase.COMBAT_DEAL_DAMAGE][UpgradeCard.XX_23_S_THREAD_TRACERS] = {
            // Discard this card to perform this attack. If this attack hits, each friendly ship at Range 1-2 of you may acquire a target lock on the defender. Then cancel all dice results.
            condition: function(store, token)
            {
                var attacker = getActiveToken(store);
                var weapon = getWeapon(attacker);
                var upgradeKey = UpgradeCard.XX_23_S_THREAD_TRACERS;
                return token === attacker && weapon.upgradeKey() === upgradeKey;
            },
            consequent: function(store, token, callback)
            {
                var attacker = getActiveToken(store);
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
                callback();
            },
        };

        ////////////////////////////////////////////////////////////////////////
        UpgradeAbility3[Phase.COMBAT_AFTER_DEAL_DAMAGE] = {};

        UpgradeAbility3[Phase.COMBAT_AFTER_DEAL_DAMAGE][UpgradeCard.ADVANCED_CLOAKING_DEVICE] = {
            // After you perform an attack, you may perform a free cloak action.
            condition: function(store, token)
            {
                var attacker = getActiveToken(store);
                var combatAction = getCombatAction(token);
                return token === attacker && combatAction !== undefined;
            },
            consequent: function(store, token, callback)
            {
                var shipActionAction = new ShipActionAction.Cloak(store, token);
                shipActionAction.doIt();
                callback();
            },
        };

        UpgradeAbility3[Phase.COMBAT_AFTER_DEAL_DAMAGE][UpgradeCard.ASSAULT_MISSILES] = {
            // Spend your Target Lock and discard this card to perform this attack. If this attack hits, each other ship at Range 1 of the defender suffers 1 damage.
            condition: function(store, token)
            {
                var attacker = getActiveToken(store);
                var weapon = getWeapon(attacker);
                var upgradeKey = UpgradeCard.ASSAULT_MISSILES;
                return token === attacker && weapon.upgradeKey() === upgradeKey;
            },
            consequent: function(store, token, callback)
            {
                var attacker = getActiveToken(store);
                spendTargetLockAndDiscardUpgrade(attacker);
                if (isDefenderHit(attacker))
                {
                    var environment = store.getState().environment;
                    var defender = getDefender(attacker);
                    environment.getTokensAtRange(defender, RangeRuler.ONE).forEach(function(token)
                    {
                        token.receiveDamage(environment.drawDamage());
                    });
                }
                callback();
            },
        };

        UpgradeAbility3[Phase.COMBAT_AFTER_DEAL_DAMAGE][UpgradeCard.BOSSK] = {
            // After you perform an attack that does not hit, if you are not stressed, you must receive 1 Stress token. Then assign 1 Focus token to your ship and acquire a Target Lock on the defender.
            condition: function(store, token)
            {
                var attacker = getActiveToken(store);
                return token === attacker && !isDefenderHit(attacker);
            },
            consequent: function(store, token, callback)
            {
                if (!token.isStressed())
                {
                    token.receiveStress();
                }

                store.dispatch(Action.addFocusCount(token));
                var defender = getDefender(token);
                var targetLock = new TargetLock(store, token, defender);
                token.addAttackerTargetLock(targetLock);
                callback();
            },
        };

        UpgradeAbility3[Phase.COMBAT_AFTER_DEAL_DAMAGE][UpgradeCard.DEAD_MANS_SWITCH] = {
            // When you are destroyed, each ship at Range 1 suffers 1 damage.
            condition: function(store, token)
            {
                return token.isDestroyed();
            },
            consequent: function(store, token, callback)
            {
                var environment = store.getState().environment;

                environment.getTokensAtRange(defender, RangeRuler.ONE).forEach(function(myToken)
                {
                    myToken.receiveDamage(environment.drawDamage());
                });
                callback();
            },
        };

        UpgradeAbility3[Phase.COMBAT_AFTER_DEAL_DAMAGE][UpgradeCard.FIRE_CONTROL_SYSTEM] = {
            // After you perform an attack, you may acquire a Target Lock on the defender.
            condition: function(store, token)
            {
                var attacker = getActiveToken(store);
                var combatAction = getCombatAction(token);
                return token === attacker && combatAction !== undefined;
            },
            consequent: function(store, token, callback)
            {
                var attacker = getActiveToken(store);
                var defender = getDefender(attacker);
                var targetLock = new TargetLock(store, attacker, defender);
                attacker.addAttackerTargetLock(targetLock);
                callback();
            },
        };

        UpgradeAbility3[Phase.COMBAT_AFTER_DEAL_DAMAGE][UpgradeCard.FLECHETTE_CANNON] = {
            // Attack 1 ship. If this attack hits, the defender suffers 1 damage and, if the defender is not stressed, it also receives 1 stress token. Then cancel all dice results.
            condition: function(store, token)
            {
                var attacker = getActiveToken(store);
                var weapon = getWeapon(attacker);
                var upgradeKey = UpgradeCard.FLECHETTE_CANNON;
                return token === attacker && weapon.upgradeKey() === upgradeKey;
            },
            consequent: function(store, token, callback)
            {
                var attacker = getActiveToken(store);
                if (isDefenderHit(attacker))
                {
                    var environment = store.getState().environment;
                    var defender = getDefender(attacker);
                    defender.receiveDamage(environment.drawDamage());

                    if (!defender.isStressed())
                    {
                        defender.receiveStress();
                    }
                }
                callback();
            },
        };

        UpgradeAbility3[Phase.COMBAT_AFTER_DEAL_DAMAGE][UpgradeCard.FLECHETTE_TORPEDOES] = {
            // Discard this card and spend your Target Lock to perform this attack. After you perform this attack, the defender receives 1 stress token if its hull value is "4" or lower.
            condition: function(store, token)
            {
                var attacker = getActiveToken(store);
                var weapon = getWeapon(attacker);
                var upgradeKey = UpgradeCard.FLECHETTE_TORPEDOES;
                return token === attacker && weapon.upgradeKey() === upgradeKey;
            },
            consequent: function(store, token, callback)
            {
                var attacker = getActiveToken(store);
                spendTargetLockAndDiscardUpgrade(attacker);
                var defender = getDefender(attacker);
                if (defender.hullValue() <= 4)
                {
                    defender.receiveStress();
                }
                callback();
            },
        };

        UpgradeAbility3[Phase.COMBAT_AFTER_DEAL_DAMAGE][UpgradeCard.IMPETUOUS] = {
            // 	After you perform an attack that destroys an enemy ship, you may acquire a target lock.
            condition: function(store, token)
            {
                var attacker = getActiveToken(store);
                var defender = getDefender(token);
                return token === attacker && defender.isDestroyed();
            },
            consequent: function(store, token, callback)
            {
                var agent = token.agent();
                var environment = store.getState().environment;
                var adjudicator = store.getState().adjudicator;
                var shipActions0 = [ShipAction.TARGET_LOCK];
                var that = this;
                var finishCallback = function(shipActionAction)
                {
                    that.finishConsequent(shipActionAction, callback);
                };
                agent.getShipAction(environment, adjudicator, token, finishCallback, shipActions0);

                // Wait for agent to respond.
            },
            finishConsequent: function(shipActionAction, callback)
            {
                if (shipActionAction)
                {
                    shipActionAction.doIt();
                }
                callback();
            },
        };

        UpgradeAbility3[Phase.COMBAT_AFTER_DEAL_DAMAGE][UpgradeCard.ION_CANNON] = {
            // Attack 1 ship. If this attack hits, the defender suffers 1 damage and receives 1 ion token. Then cancel all dice results.
            condition: function(store, token)
            {
                var attacker = getActiveToken(store);
                var weapon = getWeapon(attacker);
                var upgradeKey = UpgradeCard.ION_CANNON;
                return token === attacker && weapon.upgradeKey() === upgradeKey;
            },
            consequent: function(store, token, callback)
            {
                var attacker = getActiveToken(store);
                if (isDefenderHit(attacker))
                {
                    var environment = store.getState().environment;
                    var defender = getDefender(attacker);
                    defender.receiveDamage(environment.drawDamage());
                    store.dispatch(Action.addIonCount(defender));
                }
                callback();
            },
        };

        UpgradeAbility3[Phase.COMBAT_AFTER_DEAL_DAMAGE][UpgradeCard.ION_CANNON_TURRET] = {
            // Attack 1 ship (even a ship outside your firing arc). If this attack hits the target ship, the ship suffers 1 damage and receives 1 ion token. Then cancel all dice results.
            condition: function(store, token)
            {
                var attacker = getActiveToken(store);
                var weapon = getWeapon(attacker);
                var upgradeKey = UpgradeCard.ION_CANNON_TURRET;
                return token === attacker && weapon.upgradeKey() === upgradeKey;
            },
            consequent: function(store, token, callback)
            {
                var attacker = getActiveToken(store);
                if (isDefenderHit(attacker))
                {
                    var environment = store.getState().environment;
                    var defender = getDefender(attacker);
                    defender.receiveDamage(environment.drawDamage());
                    store.dispatch(Action.addIonCount(defender));
                }
                callback();
            },
        };

        UpgradeAbility3[Phase.COMBAT_AFTER_DEAL_DAMAGE][UpgradeCard.ION_TORPEDOES] = {
            // Spend your Target Lock and discard this card to perform this attack. If this attack hits, the defender and each ship at Range 1 of it receives 1 ion token.
            condition: function(store, token)
            {
                var attacker = getActiveToken(store);
                var weapon = getWeapon(attacker);
                var upgradeKey = UpgradeCard.ION_TORPEDOES;
                return token === attacker && weapon.upgradeKey() === upgradeKey;
            },
            consequent: function(store, token, callback)
            {
                var attacker = getActiveToken(store);
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
                callback();
            },
        };

        UpgradeAbility3[Phase.COMBAT_AFTER_DEAL_DAMAGE][UpgradeCard.PLASMA_TORPEDOES] = {
            // Spend your Target Lock and discard this card to perform this attack. If this attack hits, after dealing damage, remove 1 shield token from the defender.
            condition: function(store, token)
            {
                var attacker = getActiveToken(store);
                var weapon = getWeapon(attacker);
                var upgradeKey = UpgradeCard.PLASMA_TORPEDOES;
                return token === attacker && weapon.upgradeKey() === upgradeKey;
            },
            consequent: function(store, token, callback)
            {
                var attacker = getActiveToken(store);
                spendTargetLockAndDiscardUpgrade(attacker);
                if (isDefenderHit(attacker))
                {
                    var defender = getDefender(attacker);
                    defender.removeShield();
                }
                callback();
            },
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
            consequent: function(store, token, callback)
            {
                var attacker = getActiveToken(store);
                var defender = getDefender(attacker);
                defender.recoverShield();
                callback();
            },
        };

        UpgradeAbility3[Phase.COMBAT_AFTER_DEAL_DAMAGE][UpgradeCard.STEALTH_DEVICE] = {
            // Increase your agility value by 1. If you are hit by an attack, discard this card.
            condition: function(store, token)
            {
                var attacker = getActiveToken(store);
                var defender = getDefender(attacker);
                return token === defender && isDefenderHit(attacker);
            },
            consequent: function(store, token, callback)
            {
                discardUpgrade(token, UpgradeCard.STEALTH_DEVICE);
                callback();
            },
        };

        UpgradeAbility3[Phase.COMBAT_AFTER_DEAL_DAMAGE][UpgradeCard.TACTICIAN] = {
            // After you perform an attack against a ship inside your firing arc at Range 2, that ship receives 1 stress token.
            condition: function(store, token)
            {
                var attacker = getActiveToken(store);
                var inFiringArc = isInFiringArc(attacker);
                var rangeKey = getRangeKey(attacker);
                return token === attacker && inFiringArc && rangeKey === RangeRuler.TWO;
            },
            consequent: function(store, token, callback)
            {
                var defender = getDefender(token);
                defender.receiveStress();
                callback();
            },
        };

        UpgradeAbility3[Phase.COMBAT_AFTER_DEAL_DAMAGE][UpgradeCard.TRACTOR_BEAM] = {
            // Attack 1 ship. If this attack hits, the defender receives 1 tractor beam token. Then cancel all dice results.
            condition: function(store, token)
            {
                var attacker = getActiveToken(store);
                var weapon = getWeapon(attacker);
                var upgradeKey = UpgradeCard.TRACTOR_BEAM;
                return token === attacker && weapon.upgradeKey() === upgradeKey;
            },
            consequent: function(store, token, callback)
            {
                var attacker = getActiveToken(store);
                if (isDefenderHit(attacker))
                {
                    var defender = getDefender(attacker);
                    store.dispatch(Action.addTractorBeamCount(defender));
                }
                callback();
            },
        };

        UpgradeAbility3[Phase.COMBAT_AFTER_DEAL_DAMAGE][UpgradeCard.TWIN_LASER_TURRET] = {
            // Perform this attack twice (even against a ship outside your firing arc). Each time this attack hits, the defender suffers 1 damage. Then cancel all dice results.
            condition: function(store, token)
            {
                var attacker = getActiveToken(store);
                var weapon = getWeapon(attacker);
                var upgradeKey = UpgradeCard.TWIN_LASER_TURRET;
                return token === attacker && weapon.upgradeKey() === upgradeKey;
            },
            consequent: function(store, token, callback)
            {
                var attacker = getActiveToken(store);
                if (isDefenderHit(attacker))
                {
                    var environment = store.getState().environment;
                    var defender = getDefender(attacker);
                    defender.receiveDamage(environment.drawDamage());
                }
                callback();
            },
        };

        ////////////////////////////////////////////////////////////////////////
        UpgradeAbility3[Phase.COMBAT_END] = {};

        UpgradeAbility3[Phase.COMBAT_END][UpgradeCard.MARA_JADE] = {
            // At the end of the Combat phase, each enemy ship at Range 1 that does not have a stress token receives 1 stress token.
            condition: function(store, token)
            {
                return true;
            },
            consequent: function(store, token, callback)
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

        ////////////////////////////////////////////////////////////////////////
        function discardUpgrade(token, upgradeKey)
        {
            InputValidator.validateNotNull("token", token);
            // upgradeKey optional.

            var myUpgradeKey = (upgradeKey === undefined ? getWeapon(token).upgradeKey() : upgradeKey);
            token.discardUpgrade(myUpgradeKey);
        }

        function getActiveToken(store)
        {
            InputValidator.validateNotNull("store", store);

            return Selector.activeToken(store.getState());
        }

        function getAttackDice(attacker)
        {
            InputValidator.validateNotNull("attacker", attacker);

            return getCombatState(attacker).attackDice();
        }

        function getAttackerPosition(attacker)
        {
            InputValidator.validateNotNull("attacker", attacker);

            return getCombatAction(attacker).attackerPosition();
        }

        function getCombatAction(attacker)
        {
            InputValidator.validateNotNull("attacker", attacker);

            var answer;
            var combatState = getCombatState(attacker);

            if (combatState)
            {
                answer = combatState.combatAction();
            }

            return answer;
        }

        function getCombatState(attacker)
        {
            InputValidator.validateNotNull("attacker", attacker);

            return attacker.combatState();
        }

        function getDamageDealer(attacker)
        {
            InputValidator.validateNotNull("attacker", attacker);

            return getCombatState(attacker).damageDealer();
        }

        function getDefender(attacker)
        {
            InputValidator.validateNotNull("attacker", attacker);

            return getCombatAction(attacker).defender();
        }

        function getDefenderPosition(attacker)
        {
            InputValidator.validateNotNull("attacker", attacker);

            return getCombatAction(attacker).defenderPosition();
        }

        function getDefenseDice(attacker)
        {
            InputValidator.validateNotNull("attacker", attacker);

            return getCombatState(attacker).defenseDice();
        }

        function getRangeKey(attacker)
        {
            InputValidator.validateNotNull("attacker", attacker);

            return getCombatState(attacker).rangeKey();
        }

        function getWeapon(attacker)
        {
            InputValidator.validateNotNull("attacker", attacker);

            return getCombatAction(attacker).weapon();
        }

        function isDefenderHit(attacker)
        {
            InputValidator.validateNotNull("attacker", attacker);

            return getCombatState(attacker).isDefenderHit();
        }

        function isInFiringArc(attacker)
        {
            InputValidator.validateNotNull("attacker", attacker);

            return getCombatState(attacker).isInFiringArc();
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

        UpgradeAbility3.toString = function()
        {
            return "UpgradeAbility3";
        };

        if (Object.freeze)
        {
            Object.freeze(UpgradeAbility3);
        }

        return UpgradeAbility3;
    });

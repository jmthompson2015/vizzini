/*
 * Provides upgrade abilities for the Combat Phase.
 */
"use strict";

define(["Ability", "Phase", "RangeRuler", "ShipAction", "UpgradeCard", "UpgradeType",
  "process/Action", "process/AttackDice", "process/CombatAction", "process/DefenseDice", "process/Selector", "process/ShipActionAbility", "process/TargetLock", "process/TokenAction"],
   function(Ability, Phase, RangeRuler, ShipAction, UpgradeCard, UpgradeType,
      Action, AttackDice, CombatAction, DefenseDice, Selector, ShipActionAbility, TargetLock, TokenAction)
   {
      var UpgradeAbility3 = {};

      ////////////////////////////////////////////////////////////////////////
      UpgradeAbility3[Phase.COMBAT_START] = {};

      UpgradeAbility3[Phase.COMBAT_START][UpgradeCard.YSANNE_ISARD] = {
         // At the start of the Combat phase, if you have no shields and at least 1 Damage card assigned to your ship, you may perform a free evade action.
         condition: function(store, token)
         {
            return token.shieldCount() === 0 && (token.damageCount() + token.criticalDamageCount() > 0);
         },
         consequent: function(store, token, callback)
         {
            var ability = new Ability(ShipAction, ShipAction.EVADE, ShipActionAbility, ShipActionAbility.ABILITY_KEY);
            var consequent = ability.consequent();
            consequent(store, token, callback);
         },
      };

      ////////////////////////////////////////////////////////////////////////
      UpgradeAbility3[Phase.COMBAT_DECLARE_TARGET] = {};

      UpgradeAbility3[Phase.COMBAT_DECLARE_TARGET][UpgradeCard.BLASTER_TURRET] = {
         // Spend 1 Focus token to perform this attack against 1 ship (even a ship outside your firing arc).
         condition: function(store, token)
         {
            var attacker = getActiveToken(store);
            var weapon = getWeapon(attacker);
            var upgradeKey = UpgradeCard.BLASTER_TURRET;
            return isActiveToken(store, token) && weapon.upgradeKey() === upgradeKey;
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
            return isActiveToken(store, token) && weapon.upgradeKey() === upgradeKey;
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
            var attacker = getActiveToken(store);
            var weapon = getWeapon(attacker);
            var attackerPosition = getAttackerPosition(attacker);
            var firingArc = weapon.primaryFiringArc();
            var defender = getDefender(attacker);
            var defenderPosition = getDefenderPosition(attacker);
            var isDefenderInFiringArc = weapon.isDefenderInFiringArc(attackerPosition, firingArc, defender, defenderPosition);
            return isActiveToken(store, token) && isDefenderInFiringArc;
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
            return token.equals(defender) && !token.isPerRoundAbilityUsed(UpgradeCard, upgradeKey);
         },
         consequent: function(store, token, callback)
         {
            var attacker = getActiveToken(store);
            attacker.receiveStress();
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
            var defender = getDefender(attacker);
            var targetLock = TargetLock.getFirst(store, token, defender);
            return isActiveToken(store, token) && weapon.upgradeKey() === upgradeKey && targetLock !== undefined;
         },
         consequent: function(store, token, callback)
         {
            var attacker = getActiveToken(store);
            spendTargetLockAndDiscardUpgrade(store, attacker);
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
            return isActiveToken(store, token) && token.focusCount() > 0 && attackDice.focusCount() > 0;
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
            var defender = getDefender(attacker);
            var targetLock = TargetLock.getFirst(store, token, defender);
            return isActiveToken(store, token) && weapon.upgradeKey() === upgradeKey && targetLock !== undefined;
         },
         consequent: function(store, token, callback)
         {
            var attacker = getActiveToken(store);
            spendTargetLockAndDiscardUpgrade(store, attacker);
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
            var defender = getDefender(attacker);
            var targetLock = TargetLock.getFirst(store, token, defender);
            return isActiveToken(store, token) && weapon.upgradeKey() === upgradeKey && targetLock !== undefined;
         },
         consequent: function(store, token, callback)
         {
            var attacker = getActiveToken(store);
            spendTargetLockAndDiscardUpgrade(store, attacker);
            var attackDice = getAttackDice(attacker);
            attackDice.changeOneToValue(AttackDice.Value.BLANK, AttackDice.Value.HIT);
            callback();
         },
      };

      UpgradeAbility3[Phase.COMBAT_MODIFY_ATTACK_DICE][UpgradeCard.DENGAR] = {
         // When attacking, you may reroll 1 attack die. If the defender is a unique pilot, you may instead reroll up to 2 attack dice.
         condition: function(store, token)
         {
            return isActiveToken(store, token);
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

      UpgradeAbility3[Phase.COMBAT_MODIFY_ATTACK_DICE][UpgradeCard.EXPERTISE] = {
         // When attacking, if you are not stressed, you may change all of your focus results to hit results.
         condition: function(store, token)
         {
            var attacker = getActiveToken(store);
            var attackDice = getAttackDice(attacker);
            return isActiveToken(store, token) && !token.isStressed() && attackDice.focusCount() > 0;
         },
         consequent: function(store, token, callback)
         {
            var attackDice = getAttackDice(token);
            attackDice.changeAllToValue(AttackDice.Value.FOCUS, AttackDice.Value.HIT);
            callback();
         },
      };

      UpgradeAbility3[Phase.COMBAT_MODIFY_ATTACK_DICE][UpgradeCard.EZRA_BRIDGER] = {
         // When attacking, if you are stressed, you may change 1 of your Focus results to a Critical Hit result.
         condition: function(store, token)
         {
            var attacker = getActiveToken(store);
            var attackDice = getAttackDice(attacker);
            return isActiveToken(store, token) && token.isStressed() && attackDice.focusCount() > 0;
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
            var isTorpedoOrMissile = (weapon.upgrade() !== undefined) && [UpgradeType.TORPEDO, UpgradeType.MISSILE].includes(weapon.upgrade().type);
            return isActiveToken(store, token) && isTorpedoOrMissile && (attackDice.blankCount() > 0 || attackDice.focusCount() > 0) && !token.isPerRoundAbilityUsed(UpgradeCard, upgradeKey);
         },
         consequent: function(store, token, callback)
         {
            var attackDice = getAttackDice(token);
            var weapon = getWeapon(token);
            var oldValue = (attackDice.blankCount() > 0 ? AttackDice.Value.BLANK : AttackDice.Value.FOCUS);
            var newValue = (weapon.weaponValue() >= 3 ? AttackDice.Value.CRITICAL_HIT : AttackDice.Value.HIT);
            attackDice.changeOneToValue(oldValue, newValue);
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
            return isActiveToken(store, token) && !weapon.isPrimary() && token.energyCount() > 0 && attackDice.blankCount() > 0 && !token.isPerRoundAbilityUsed(UpgradeCard, upgradeKey);
         },
         consequent: function(store, token, callback)
         {
            var attackDice = getAttackDice(token);
            attackDice.changeOneToValue(AttackDice.Value.BLANK, AttackDice.Value.HIT);
            callback();
         },
      };

      UpgradeAbility3[Phase.COMBAT_MODIFY_ATTACK_DICE][UpgradeCard.HAN_SOLO] = {
         // When attacking, if you have a Target Lock on the defender, you may spend that Target Lock to change all of your Focus results to Hit results.
         condition: function(store, token)
         {
            var attacker = getActiveToken(store);
            var defender = getDefender(attacker);
            var targetLock = TargetLock.getFirst(store, token, defender);
            var attackDice = getAttackDice(attacker);
            return isActiveToken(store, token) && targetLock !== undefined && attackDice.focusCount() > 0;
         },
         consequent: function(store, token, callback)
         {
            var defender = getDefender(token);
            spendTargetLock(store, token, defender);
            var attackDice = getAttackDice(token);
            attackDice.changeAllToValue(AttackDice.Value.FOCUS, AttackDice.Value.HIT);
            callback();
         },
      };

      UpgradeAbility3[Phase.COMBAT_MODIFY_ATTACK_DICE][UpgradeCard.HEAVY_LASER_CANNON] = {
         // Attack 1 ship. Immediately after rolling your attack dice, you must change all of your Critical Hit results to Hit results.
         condition: function(store, token)
         {
            var weapon = getWeapon(token);
            var attackDice = getAttackDice(token);
            if (isActiveToken(store, token) && weapon.upgradeKey() === UpgradeCard.HEAVY_LASER_CANNON && attackDice.criticalHitCount() > 0)
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

      UpgradeAbility3[Phase.COMBAT_MODIFY_ATTACK_DICE][UpgradeCard.JESS_PAVA] = {
         // When attacking or defending, you may reroll 1 of your dice for each other friendly ship at Range 1.
         condition: function(store, token)
         {
            var attacker = getActiveToken(store);
            var attackDice = getAttackDice(token);
            var environment = getEnvironment(store);
            var friendlyCount = environment.getFriendlyTokensAtRange(attacker, RangeRuler.ONE).length;
            return isActiveToken(store, token) && (attackDice.blankCount() > 0 || attackDice.focusCount() > 0) && friendlyCount > 0;
         },
         consequent: function(store, token, callback)
         {
            var attackDice = getAttackDice(token);
            var environment = getEnvironment(store);
            var friendlyCount = environment.getFriendlyTokensAtRange(token, RangeRuler.ONE).length;
            attackDice.rerollBlankAndFocus(friendlyCount);
            callback();
         },
      };

      UpgradeAbility3[Phase.COMBAT_MODIFY_ATTACK_DICE][UpgradeCard.LONE_WOLF] = {
         // When attacking or defending, if there are no friendly ships at Range 1-2, you may reroll 1 of your blank results.
         condition: function(store, token)
         {
            var attacker = getActiveToken(store);
            var environment = store.getState().environment;
            var rangeOneTokens = environment.getFriendlyTokensAtRange(token, RangeRuler.ONE);
            var rangeTwoTokens = environment.getFriendlyTokensAtRange(token, RangeRuler.TWO);
            var attackDice = getAttackDice(attacker);
            return isActiveToken(store, token) && rangeOneTokens.length === 0 && rangeTwoTokens === 0 && attackDice.blankCount() > 0;
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
            var attackDice = getAttackDice(attacker);
            return isActiveToken(store, token) && weapon.upgradeKey() === upgradeKey && attackDice.hitCount() > 0 && !attacker.isAbilityUsed(UpgradeCard, upgradeKey);
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
            var attackDice = getAttackDice(token);
            return isActiveToken(store, token) && attackDice.focusCount() > 0 && attacker.isPerRoundAbilityUsed(UpgradeCard, UpgradeCard.MARKSMANSHIP);
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
            var rangeKey = getRangeKey(attacker);
            var attackDice = getAttackDice(attacker);
            return isActiveToken(store, token) && rangeKey === RangeRuler.THREE && attackDice.hitCount() > 0;
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
            return isActiveToken(store, token) && token.stressCount() === 0 && defender.evadeCount() === 0 && defender.focusCount() === 0;
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
         // When attacking, you may reroll 1 attack die. If the defender's pilot skill value is "2" or lower, you may instead reroll up to 2 attack dice.
         condition: function(store, token)
         {
            var upgradeKey = UpgradeCard.PREDATOR;
            var attacker = getActiveToken(store);
            var attackDice = getAttackDice(token);
            return isActiveToken(store, token) && (attackDice.blankCount() > 0 || attackDice.focusCount() > 0) && !attacker.isAbilityUsed(UpgradeCard, upgradeKey);
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
            return isActiveToken(store, token) && weapon.upgradeKey() === upgradeKey && token.upgradeKeys().includes(upgradeKey);
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
            var defender = getDefender(attacker);
            var targetLock = (defender ? TargetLock.getFirst(store, token, defender) : undefined);
            return isActiveToken(store, token) && weapon.upgradeKey() === upgradeKey && defender && targetLock !== undefined;
         },
         consequent: function(store, token, callback)
         {
            var attacker = getActiveToken(store);
            spendTargetLockAndDiscardUpgrade(store, attacker);
            var attackDice = getAttackDice(attacker);
            attackDice.changeOneToValue(AttackDice.Value.FOCUS, AttackDice.Value.CRITICAL_HIT);
            callback();
         },
      };

      UpgradeAbility3[Phase.COMBAT_MODIFY_ATTACK_DICE][UpgradeCard.RAGE] = {
         // Action: Assign 1 focus token to your ship and receive 2 stress tokens. Until the end of the round, when attacking, you may reroll up to 3 attack dice.
         condition: function(store, token)
         {
            var attackDice = getAttackDice(token);
            return isActiveToken(store, token) && (attackDice.blankCount() + attackDice.focusCount() > 0);
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
            return isActiveToken(store, token) && token.focusCount() > 0 && attackDice.blankCount() > 0;
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
            return isActiveToken(store, token) && token.isStressed() && attackDice.focusCount() > 0;
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
            var isBeyondRange2 = ![RangeRuler.ONE, RangeRuler.TWO].includes(rangeKey);
            var isOutsideFiringArc = !isInFiringArc(attacker);
            return token.equals(defender) && (isBeyondRange2 || isOutsideFiringArc) && defenseDice.blankCount() > 0;
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
            return token.equals(defender) && ((pilotSkill <= 2 && defenseDice.blankCount() > 0) || (pilotSkill > 2 && defenseDice.focusCount() > 0));
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

      UpgradeAbility3[Phase.COMBAT_MODIFY_DEFENSE_DICE][UpgradeCard.JESS_PAVA] = {
         // When attacking or defending, you may reroll 1 of your dice for each other friendly ship at Range 1.
         condition: function(store, token)
         {
            var attacker = getActiveToken(store);
            var defender = getDefender(attacker);
            var defenseDice = getDefenseDice(attacker);
            var environment = getEnvironment(store);
            var friendlyCount = environment.getFriendlyTokensAtRange(defender, RangeRuler.ONE).length;
            return token.equals(defender) && (defenseDice.blankCount() > 0 || defenseDice.focusCount() > 0) && friendlyCount > 0;
         },
         consequent: function(store, token, callback)
         {
            var attacker = getActiveToken(store);
            var defenseDice = getDefenseDice(attacker);
            var environment = getEnvironment(store);
            var friendlyCount = environment.getFriendlyTokensAtRange(token, RangeRuler.ONE).length;
            defenseDice.rerollBlankAndFocus(friendlyCount);
            callback();
         },
      };

      UpgradeAbility3[Phase.COMBAT_MODIFY_DEFENSE_DICE][UpgradeCard.JUKE] = {
         // When attacking, if you have an Evade token, you may change 1 of the defender's Evade results to a Focus result.
         condition: function(store, token)
         {
            var attacker = getActiveToken(store);
            var defenseDice = getDefenseDice(attacker);
            return isActiveToken(store, token) && token.evadeCount() > 0 && defenseDice.evadeCount() > 0;
         },
         consequent: function(store, token, callback)
         {
            var attacker = getActiveToken(store);
            var defenseDice = getDefenseDice(attacker);
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
            var rangeOneTokens = environment.getFriendlyTokensAtRange(token, RangeRuler.ONE);
            var rangeTwoTokens = environment.getFriendlyTokensAtRange(token, RangeRuler.TWO);
            var defenseDice = getDefenseDice(attacker);
            return token.equals(defender) && rangeOneTokens.length === 0 && rangeTwoTokens.length === 0 && defenseDice.blankCount() > 0;
         },
         consequent: function(store, token, callback)
         {
            var attacker = getActiveToken(store);
            var defender = getDefender(attacker);
            var defenseDice = getDefenseDice(attacker);
            defenseDice.rerollBlank();
            store.dispatch(TokenAction.addTokenUsedAbility(defender, new Ability(UpgradeCard, UpgradeCard.LONE_WOLF, UpgradeAbility3, Phase.COMBAT_MODIFY_DEFENSE_DICE)));
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
            return token.equals(defender) && attackDice.hitCount() > 0;
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
            return token.equals(defender) && token.isStressed() && defenseDice.focusCount() > 0;
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
            return isActiveToken(store, token) && weapon && weapon.upgradeKey() === upgradeKey;
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
            var defender = getDefender(attacker);
            var targetLock = TargetLock.getFirst(store, token, defender);
            return isActiveToken(store, token) && weapon.upgradeKey() === upgradeKey && targetLock !== undefined;
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
               store.dispatch(TokenAction.addIonCount(defender, 2));
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
            return isActiveToken(store, token) && weapon.upgradeKey() === upgradeKey;
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

                     if (RangeRuler.STANDARD_RANGES.includes(myRangeKey))
                     {
                        TargetLock.newInstance(store, token, defender);
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
            var combatAction = getCombatAction(token);
            return isActiveToken(store, token) && combatAction !== undefined;
         },
         consequent: function(store, token, callback)
         {
            var ability = new Ability(ShipAction, ShipAction.CLOAK, ShipActionAbility, ShipActionAbility.ABILITY_KEY);
            var consequent = ability.consequent();
            consequent(store, token, callback);
         },
      };

      UpgradeAbility3[Phase.COMBAT_AFTER_DEAL_DAMAGE][UpgradeCard.ASSAULT_MISSILES] = {
         // Spend your Target Lock and discard this card to perform this attack. If this attack hits, each other ship at Range 1 of the defender suffers 1 damage.
         condition: function(store, token)
         {
            var attacker = getActiveToken(store);
            var weapon = getWeapon(attacker);
            var upgradeKey = UpgradeCard.ASSAULT_MISSILES;
            var defender = getDefender(attacker);
            var targetLock = TargetLock.getFirst(store, token, defender);
            return isActiveToken(store, token) && weapon.upgradeKey() === upgradeKey && targetLock !== undefined;
         },
         consequent: function(store, token, callback)
         {
            var attacker = getActiveToken(store);
            spendTargetLockAndDiscardUpgrade(store, attacker);
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
            return isActiveToken(store, token) && !isDefenderHit(attacker);
         },
         consequent: function(store, token, callback)
         {
            if (!token.isStressed())
            {
               token.receiveStress();
            }

            store.dispatch(TokenAction.addFocusCount(token));
            var defender = getDefender(token);
            TargetLock.newInstance(store, token, defender, callback);
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
            var defender = getDefender(token);

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
            var combatAction = getCombatAction(token);
            return isActiveToken(store, token) && combatAction !== undefined;
         },
         consequent: function(store, token, callback)
         {
            var attacker = getActiveToken(store);
            var defender = getDefender(attacker);
            TargetLock.newInstance(store, attacker, defender, callback);
         },
      };

      UpgradeAbility3[Phase.COMBAT_AFTER_DEAL_DAMAGE][UpgradeCard.FLECHETTE_CANNON] = {
         // Attack 1 ship. If this attack hits, the defender suffers 1 damage and, if the defender is not stressed, it also receives 1 stress token. Then cancel all dice results.
         condition: function(store, token)
         {
            var attacker = getActiveToken(store);
            var weapon = getWeapon(attacker);
            var upgradeKey = UpgradeCard.FLECHETTE_CANNON;
            return isActiveToken(store, token) && weapon.upgradeKey() === upgradeKey;
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
            var defender = getDefender(attacker);
            var targetLock = TargetLock.getFirst(store, token, defender);
            return isActiveToken(store, token) && weapon.upgradeKey() === upgradeKey && targetLock !== undefined;
         },
         consequent: function(store, token, callback)
         {
            var attacker = getActiveToken(store);
            spendTargetLockAndDiscardUpgrade(store, attacker);
            var defender = getDefender(attacker);
            if (defender.hullValue() <= 4)
            {
               defender.receiveStress();
            }
            callback();
         },
      };

      UpgradeAbility3[Phase.COMBAT_AFTER_DEAL_DAMAGE][UpgradeCard.GUNNER] = {
         // After you perform an attack that does not hit, you may immediately perform a primary weapon attack. You cannot perform another attack this round.
         condition: function(store, token)
         {
            var upgradeKey = UpgradeCard.GUNNER;
            var attacker = getActiveToken(store);
            var attackerPosition = getAttackerPosition(attacker);
            var defender = getDefender(attacker);
            var defenderPosition = getDefenderPosition(attacker);
            var weapon = attacker.primaryWeapon();
            return isActiveToken(store, token) && !isDefenderHit(attacker) && !attacker.isPerRoundAbilityUsed(UpgradeCard, upgradeKey) && weapon && weapon.isDefenderTargetable(attacker, attackerPosition, defender, defenderPosition);
         },
         consequent: function(store, token, callback)
         {
            var agent = token.agent();
            var environment = getEnvironment(store);
            var adjudicator = getAdjudicator(store);
            var weapon = token.primaryWeapon();
            var that = this;
            var finishCallback = function(weapon, defender)
            {
               that.finishConsequent(store, token, weapon, defender, callback);
            };
            agent.chooseWeaponAndDefender(environment, adjudicator, token, finishCallback, weapon);
         },
         finishConsequent: function(store, token, weapon, defender, callback)
         {
            if (defender)
            {
               var delay = getCombatAction(token).delay();
               var combatAction = new CombatAction(store, token, weapon, defender, callback, delay);
               combatAction.doIt();
            }
            else
            {
               callback();
            }
         },
      };

      UpgradeAbility3[Phase.COMBAT_AFTER_DEAL_DAMAGE][UpgradeCard.IMPETUOUS] = {
         // 	After you perform an attack that destroys an enemy ship, you may acquire a target lock.
         condition: function(store, token)
         {
            var defender = getDefender(token);
            return isActiveToken(store, token) && defender.isDestroyed();
         },
         consequent: function(store, token, callback)
         {
            var agent = token.agent();
            var environment = store.getState().environment;
            var adjudicator = store.getState().adjudicator;
            var shipActions0 = [ShipAction.TARGET_LOCK];
            var that = this;
            var finishCallback = function(shipActionAbility)
            {
               that.finishConsequent(store, token, shipActionAbility, callback);
            };
            agent.getShipAction(environment, adjudicator, token, finishCallback, shipActions0);

            // Wait for agent to respond.
         },
         finishConsequent: function(store, token, shipActionAbility, callback)
         {
            if (shipActionAbility)
            {
               var consequent = shipActionAbility.consequent();
               consequent(store, token, callback, shipActionAbility.context());
            }
            else
            {
               callback();
            }
         },
      };

      UpgradeAbility3[Phase.COMBAT_AFTER_DEAL_DAMAGE][UpgradeCard.ION_CANNON] = {
         // Attack 1 ship. If this attack hits, the defender suffers 1 damage and receives 1 ion token. Then cancel all dice results.
         condition: function(store, token)
         {
            var attacker = getActiveToken(store);
            var weapon = getWeapon(attacker);
            var upgradeKey = UpgradeCard.ION_CANNON;
            return isActiveToken(store, token) && weapon.upgradeKey() === upgradeKey;
         },
         consequent: function(store, token, callback)
         {
            var attacker = getActiveToken(store);
            if (isDefenderHit(attacker))
            {
               var environment = store.getState().environment;
               var defender = getDefender(attacker);
               defender.receiveDamage(environment.drawDamage());
               store.dispatch(TokenAction.addIonCount(defender));
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
            return isActiveToken(store, token) && weapon.upgradeKey() === upgradeKey;
         },
         consequent: function(store, token, callback)
         {
            var attacker = getActiveToken(store);
            if (isDefenderHit(attacker))
            {
               var environment = store.getState().environment;
               var defender = getDefender(attacker);
               defender.receiveDamage(environment.drawDamage());
               store.dispatch(TokenAction.addIonCount(defender));
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
            var defender = getDefender(attacker);
            var targetLock = TargetLock.getFirst(store, token, defender);
            return isActiveToken(store, token) && weapon.upgradeKey() === upgradeKey && targetLock !== undefined;
         },
         consequent: function(store, token, callback)
         {
            var attacker = getActiveToken(store);
            spendTargetLockAndDiscardUpgrade(store, attacker);
            if (isDefenderHit(attacker))
            {
               var environment = store.getState().environment;
               var defender = getDefender(attacker);
               store.dispatch(TokenAction.addIonCount(defender));
               environment.getTokensAtRange(defender, RangeRuler.ONE).forEach(function(token)
               {
                  store.dispatch(TokenAction.addIonCount(token));
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
            var defender = getDefender(attacker);
            var targetLock = TargetLock.getFirst(store, token, defender);
            return isActiveToken(store, token) && weapon.upgradeKey() === upgradeKey && targetLock !== undefined;
         },
         consequent: function(store, token, callback)
         {
            var attacker = getActiveToken(store);
            spendTargetLockAndDiscardUpgrade(store, attacker);
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
            return token.equals(defender) && damageDealer.hits() + damageDealer.criticalHits() >= 3;
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
            return token.equals(defender) && isDefenderHit(attacker);
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
            return isActiveToken(store, token) && inFiringArc && rangeKey === RangeRuler.TWO;
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
            return isActiveToken(store, token) && weapon.upgradeKey() === upgradeKey;
         },
         consequent: function(store, token, callback)
         {
            var attacker = getActiveToken(store);
            if (isDefenderHit(attacker))
            {
               var defender = getDefender(attacker);
               store.dispatch(TokenAction.addTractorBeamCount(defender));
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
            return isActiveToken(store, token) && weapon.upgradeKey() === upgradeKey;
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
            var upgradeKey = UpgradeCard.MARA_JADE;
            var environment = getEnvironment(store);
            var enemies = environment.getUnfriendlyTokensAtRange(token, RangeRuler.ONE);
            return enemies.length > 0 && !token.isAbilityUsed(UpgradeCard, upgradeKey);
         },
         consequent: function(store, token, callback)
         {
            var environment = getEnvironment(store);
            var enemies = environment.getUnfriendlyTokensAtRange(token, RangeRuler.ONE);
            enemies.forEach(function(enemy)
            {
               if (!enemy.isStressed())
               {
                  enemy.receiveStress();
               }
            });
            callback();
         },
      };

      UpgradeAbility3[Phase.COMBAT_END][UpgradeCard.R5_P9] = {
         // At the end of the Combat phase, you may spend 1 of your focus tokens to recover 1 shield (up to your shield value).
         condition: function(store, token)
         {
            return token.focusCount() > 0 && token.shieldCount() < token.shieldValue();
         },
         consequent: function(store, token, callback)
         {
            spendFocusToken(store, token);
            token.recoverShield();
            callback();
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

         var environment = store.getState().environment;

         return environment.activeToken();
      }

      function getAttackDice(attacker)
      {
         InputValidator.validateNotNull("attacker", attacker);

         var store = attacker.store();
         var combatAction = getCombatAction(attacker);
         var attackDiceClass = (combatAction ? combatAction.attackDiceClass() : AttackDice);

         return attackDiceClass.get(store, attacker.id());
      }

      function getAdjudicator(store)
      {
         InputValidator.validateNotNull("store", store);

         return Selector.adjudicator(store.getState());
      }

      function getAttackerPosition(attacker)
      {
         InputValidator.validateNotNull("attacker", attacker);

         var combatAction = getCombatAction(attacker);

         return (combatAction ? combatAction.attackerPosition() : undefined);
      }

      function getCombatAction(attacker)
      {
         InputValidator.validateNotNull("attacker", attacker);

         return Selector.combatAction(attacker.store().getState(), attacker);
      }

      function getDamageDealer(attacker)
      {
         InputValidator.validateNotNull("attacker", attacker);

         var store = attacker.store();

         return Selector.damageDealer(store.getState(), attacker);
      }

      function getDefender(attacker)
      {
         InputValidator.validateNotNull("attacker", attacker);

         var combatAction = getCombatAction(attacker);

         return (combatAction ? combatAction.defender() : undefined);
      }

      function getDefenderPosition(attacker)
      {
         InputValidator.validateNotNull("attacker", attacker);

         var combatAction = getCombatAction(attacker);

         return (combatAction ? combatAction.defenderPosition() : undefined);
      }

      function getDefenseDice(attacker)
      {
         InputValidator.validateNotNull("attacker", attacker);

         var store = attacker.store();
         var combatAction = getCombatAction(attacker);
         var defenseDiceClass = (combatAction ? combatAction.defenseDiceClass() : DefenseDice);

         return defenseDiceClass.get(store, attacker.id());
      }

      function getEnvironment(store)
      {
         InputValidator.validateNotNull("store", store);

         return Selector.environment(store.getState());
      }

      function getRangeKey(attacker)
      {
         InputValidator.validateNotNull("attacker", attacker);

         var store = attacker.store();

         return Selector.rangeKey(store.getState(), attacker);
      }

      function getWeapon(attacker)
      {
         InputValidator.validateNotNull("attacker", attacker);

         var combatAction = getCombatAction(attacker);

         return (combatAction ? combatAction.weapon() : undefined);
      }

      function isActiveToken(store, token)
      {
         var activeToken = getActiveToken(store);

         return token.equals(activeToken);
      }

      function isDefenderHit(attacker)
      {
         InputValidator.validateNotNull("attacker", attacker);

         var store = attacker.store();

         return Selector.isDefenderHit(store.getState(), attacker);
      }

      function isInFiringArc(attacker)
      {
         InputValidator.validateNotNull("attacker", attacker);

         var store = attacker.store();

         return Selector.isInFiringArc(store.getState(), attacker);
      }

      function spendFocusToken(store, attacker)
      {
         InputValidator.validateNotNull("store", store);
         InputValidator.validateNotNull("attacker", attacker);

         store.dispatch(TokenAction.addFocusCount(attacker, -1));
      }

      function spendTargetLock(store, attacker, defender)
      {
         InputValidator.validateNotNull("store", store);
         InputValidator.validateNotNull("attacker", attacker);
         InputValidator.validateNotNull("defender", defender);

         var targetLock = TargetLock.getFirst(store, attacker, defender);
         targetLock.delete();
      }

      function spendTargetLockAndDiscardUpgrade(store, attacker)
      {
         InputValidator.validateNotNull("store", store);
         InputValidator.validateNotNull("attacker", attacker);

         var defender = getDefender(attacker);
         spendTargetLock(store, attacker, defender);
         discardUpgrade(attacker);
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

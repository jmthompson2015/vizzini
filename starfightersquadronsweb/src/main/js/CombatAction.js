define([ "AttackDice", "DamageDealer", "DefenseDice", "Phase", "RangeRuler", "ShipDestroyedAction", "UpgradeCard" ],
        function(AttackDice, DamageDealer, DefenseDice, Phase, RangeRuler, ShipDestroyedAction, UpgradeCard)
        {
            "use strict";
            function CombatAction(environment, adjudicator, attacker, attackerPosition, weapon, defender,
                    defenderPosition, callback)
            {
                InputValidator.validateNotNull("environment", environment);
                InputValidator.validateNotNull("adjudicator", adjudicator);
                InputValidator.validateNotNull("attacker", attacker);
                InputValidator.validateNotNull("attackerPosition", attackerPosition);
                InputValidator.validateNotNull("weapon", weapon);
                InputValidator.validateNotNull("defender", defender);
                InputValidator.validateNotNull("defenderPosition", defenderPosition);

                this.environment = function()
                {
                    return environment;
                };

                this.adjudicator = function()
                {
                    return adjudicator;
                };

                this.attacker = function()
                {
                    return attacker;
                };

                this.attackerPosition = function()
                {
                    return attackerPosition;
                };

                this.weapon = function()
                {
                    return weapon;
                };

                this.defender = function()
                {
                    return defender;
                };

                this.defenderPosition = function()
                {
                    return defenderPosition;
                };

                this.doIt = function()
                {
                    var upgrade = weapon.upgrade();

                    if (upgrade)
                    {
                        if (upgrade.spendFocus)
                        {
                            attacker.focus().decrease();
                        }

                        if (upgrade.spendTargetLock)
                        {
                            var targetLock = attacker.findTargetLockByDefender(defender);
                            attacker.removeAttackerTargetLock(targetLock);
                            defender.removeDefenderTargetLock(targetLock);
                        }

                        if (upgrade.discardThisCard)
                        {
                            attacker.discardUpgrade(weapon.upgradeKey());
                        }
                    }

                    var range = RangeRuler.getRange(attacker, attackerPosition, defender, defenderPosition);
                    attacker.combatState().range(range);

                    if (range)
                    {
                        attacker.combatState().combatAction(this);

                        // Roll attack dice.
                        var attackDiceCount = attacker.computeAttackDiceCount(environment, weapon, defender, range);
                        var attackDice = new AttackDice(attackDiceCount);

                        if (weapon.upgradeKey() === UpgradeCard.ADVANCED_PROTON_TORPEDOES)
                        {
                            attackDice.changeOneToValue(AttackDice.Value.BLANK, AttackDice.Value.FOCUS);
                            attackDice.changeOneToValue(AttackDice.Value.BLANK, AttackDice.Value.FOCUS);
                            attackDice.changeOneToValue(AttackDice.Value.BLANK, AttackDice.Value.FOCUS);
                        }
                        else if (weapon.upgradeKey() === UpgradeCard.CONCUSSION_MISSILES)
                        {
                            attackDice.changeOneToValue(AttackDice.Value.BLANK, AttackDice.Value.HIT);
                        }
                        else if (weapon.upgradeKey() === UpgradeCard.HEAVY_LASER_CANNON)
                        {
                            attackDice.changeAllToValue(AttackDice.Value.CRITICAL_HIT, AttackDice.Value.HIT);
                        }
                        else if (weapon.upgradeKey() === UpgradeCard.MANGLER_CANNON)
                        {
                            attackDice.changeOneToValue(AttackDice.Value.HIT, AttackDice.Value.CRITICAL_HIT);
                        }
                        else if (weapon.upgradeKey() === UpgradeCard.PROTON_TORPEDOES)
                        {
                            attackDice.changeOneToValue(AttackDice.Value.FOCUS, AttackDice.Value.CRITICAL_HIT);
                        }

                        attacker.combatState().attackDice(attackDice);
                        environment.phase(Phase.COMBAT_ROLL_ATTACK_DICE);

                        // Modify attack dice.
                        var agent = attacker.agent();
                        agent.getModifyAttackDiceAction(environment, adjudicator, attacker, attackDice, defender,
                                finishModifyAttackDice);
                    }
                };

                function finishModifyAttackDice(attackAction)
                {
                    LOGGER.debug("CombatAction.finishModifyAttackDice() attackAction = " + attackAction);

                    if (attackAction)
                    {
                        attackAction.doIt();
                    }

                    environment.phase(Phase.COMBAT_MODIFY_ATTACK_DICE);
                    var attackDice = attacker.combatState().attackDice();

                    // Roll defense dice.
                    var range = attacker.combatState().range();
                    var defenderDiceCount = defender.computeDefenseDiceCount(weapon, range);
                    var defenseDice = new DefenseDice(defenderDiceCount);
                    attacker.combatState().defenseDice(defenseDice);
                    environment.phase(Phase.COMBAT_ROLL_DEFENSE_DICE);

                    // Modify defense dice.
                    var defenderAgent = defender.agent();
                    defenderAgent.getModifyDefenseDiceAction(environment, adjudicator, attacker, attackDice, defender,
                            defenseDice, finishModifyDefenseDice);
                }

                function finishModifyDefenseDice(defenseAction)
                {
                    LOGGER.debug("defenseAction = " + defenseAction);

                    if (defenseAction)
                    {
                        defenseAction.doIt();
                    }

                    environment.phase(Phase.COMBAT_MODIFY_DEFENSE_DICE);
                    var defenseDice = attacker.combatState().defenseDice();

                    // Compare results.
                    // Deal damage.
                    var attackDice = attacker.combatState().attackDice();
                    var damageDealer = new DamageDealer(environment, attackDice.hitCount(), attackDice
                            .criticalHitCount(), defender, defenseDice.evadeCount());

                    var attackerAgent = attacker.agent();
                    attackerAgent.dealDamage(environment, adjudicator, attacker, attackDice, defender, defenseDice,
                            damageDealer, function()
                            {
                                finishDealDamage(damageDealer);
                            });

                    var defenderAgent = defender.agent();
                    defenderAgent.dealDamage(environment, adjudicator, attacker, attackDice, defender, defenseDice,
                            damageDealer, function()
                            {
                                finishDealDamage(damageDealer);
                            });

                    environment.phase(Phase.COMBAT_DEAL_DAMAGE);
                }

                function finishDealDamage(damageDealer)
                {
                    var isDefenderHit = (damageDealer.hits() + damageDealer.criticalHits() > 0);
                    attacker.combatState().isDefenderHit(isDefenderHit);

                    if (isDefenderHit)
                    {
                        if (weapon.upgradeKey() === UpgradeCard.ADVANCED_HOMING_MISSILES)
                        {
                            defender.addCriticalDamage(environment.drawDamage());
                        }
                        else if (weapon.upgradeKey() === UpgradeCard.FLECHETTE_CANNON)
                        {
                            defender.addDamage(environment.drawDamage());
                            if (!defender.isStressed())
                            {
                                defender.stress().increase()
                            };
                        }
                        else if (weapon.upgradeKey() === UpgradeCard.ION_CANNON ||
                                weapon.upgradeKey() === UpgradeCard.ION_CANNON_TURRET)
                        {
                            defender.addDamage(environment.drawDamage());
                            defender.ion().increase();
                        }
                        else if (weapon.upgradeKey() === UpgradeCard.ION_PULSE_MISSILES)
                        {
                            defender.addDamage(environment.drawDamage());
                            defender.ion().increase();
                            defender.ion().increase();
                        }
                        else
                        {
                            damageDealer.dealDamage();
                        }

                        if (weapon.upgradeKey() === UpgradeCard.FLECHETTE_TORPEDOES && defender.hullValue() <= 4)
                        {
                            defender.stress().increase()
                        }
                        else if (weapon.upgradeKey() === UpgradeCard.PLASMA_TORPEDOES)
                        {
                            defender.shield().decrease()
                        }
                    }

                    if (defender.isDestroyed())
                    {
                        var shipDestroyedAction = new ShipDestroyedAction(environment, defender, defenderPosition);
                        shipDestroyedAction.doIt();
                        var delay = 1500;
                        setTimeout(function()
                        {
                            if (callback)
                            {
                                callback();
                            }
                        }, delay);
                    }
                    else
                    {
                        if (callback)
                        {
                            callback();
                        }
                    }
                }
            }

            return CombatAction;
        });

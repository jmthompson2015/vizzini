define(
        [ "AttackDice", "DamageDealer", "DefenseDice", "Phase", "Pilot", "RangeRuler", "ShipDestroyedAction",
                "TargetLock", "UpgradeCard" ],
        function(AttackDice, DamageDealer, DefenseDice, Phase, Pilot, RangeRuler, ShipDestroyedAction, TargetLock,
                UpgradeCard)
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

                var that = this;

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

                var executionCount = 0;

                this.executionCount = function()
                {
                    return executionCount;
                };

                this.doIt = function()
                {
                    executionCount++;
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

                            if (targetLock)
                            {
                                attacker.removeAttackerTargetLock(targetLock);
                                defender.removeDefenderTargetLock(targetLock);
                            }
                        }

                        if (upgrade.discardThisCard)
                        {
                            attacker.discardUpgrade(weapon.upgradeKey());
                        }
                    }

                    var range = RangeRuler.getRange(attacker, attackerPosition, defender, defenderPosition);
                    attacker.combatState().range(range);

                    if (weapon.ranges().vizziniContains(range))
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

                        if (attacker.pilotKey() === Pilot.POE_DAMERON && attacker.focus().count() > 0)
                        {
                            attackDice.changeOneToValue(AttackDice.Value.FOCUS, AttackDice.Value.HIT);
                        }

                        if (attacker.isUpgradedWith(UpgradeCard.LONE_WOLF) && attackDice.blankCount() > 0)
                        {
                            var tokens1 = environment.getFriendlyTokensAtRange(attacker, RangeRuler.ONE);
                            var tokens2 = environment.getFriendlyTokensAtRange(attacker, RangeRuler.TWO);

                            if (tokens1.length === 0 && tokens2.length === 0)
                            {
                                attackDice.rerollBlank();
                            }
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

                    if (defender.pilotKey() === Pilot.LUKE_SKYWALKER && defenseDice.focusCount() > 0)
                    {
                        defenseDice.changeOneToValue(DefenseDice.Value.FOCUS, DefenseDice.Value.EVADE);
                    }

                    if (defender.pilotKey() === Pilot.POE_DAMERON && defender.focus().count() > 0)
                    {
                        defenseDice.changeOneToValue(DefenseDice.Value.FOCUS, DefenseDice.Value.EVADE);
                    }

                    if (defender.isUpgradedWith(UpgradeCard.AUTOTHRUSTERS) && defenseDice.blankCount() > 0)
                    {
                        var isBeyondRange2 = (range === undefined || range === RangeRuler.THREE);
                        var isOutsideFiringArc = !weapon.isDefenderInFiringArc(attackerPosition, weapon
                                .primaryFiringArc(), defender, defenderPosition);

                        if (isBeyondRange2 || isOutsideFiringArc)
                        {
                            defenseDice.changeOneToValue(DefenseDice.Value.BLANK, DefenseDice.Value.EVADE);
                        }
                    }

                    if (defender.isUpgradedWith(UpgradeCard.LONE_WOLF) && defenseDice.blankCount() > 0)
                    {
                        var tokens1 = environment.getFriendlyTokensAtRange(defender, RangeRuler.ONE);
                        var tokens2 = environment.getFriendlyTokensAtRange(defender, RangeRuler.TWO);

                        if (tokens1.length === 0 && tokens2.length === 0)
                        {
                            defenseDice.rerollBlank();
                        }
                    }

                    if (defender.reinforce().count() > 0)
                    {
                        // Add one evade result.
                        defenseDice.spendEvadeToken();
                    }

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

                    // Four possibilities:
                    // computer vs computer: call finishDealDamage() once
                    // computer vs human: call finishDealDamage() once
                    // human vs computer: call finishDealDamage() once
                    // human vs human: call finishDealDamage() once
                    var attackerAgent = attacker.agent();
                    var defenderAgent = defender.agent();
                    var attackerIsComputerAgent = attackerAgent.isComputerAgent();
                    var defenderIsComputerAgent = defenderAgent.isComputerAgent();
                    var callbackFunction = function()
                    {
                        finishDealDamage(damageDealer);
                    };

                    if (attackerIsComputerAgent && defenderIsComputerAgent)
                    {
                        // Both computer agents.
                        setTimeout(callbackFunction, 1000);
                    }
                    else if (attackerIsComputerAgent && !defenderIsComputerAgent)
                    {
                        defenderAgent.dealDamage(environment, adjudicator, attacker, attackDice, defender, defenseDice,
                                damageDealer, callbackFunction);
                    }
                    else if (!attackerIsComputerAgent && defenderIsComputerAgent)
                    {
                        attackerAgent.dealDamage(environment, adjudicator, attacker, attackDice, defender, defenseDice,
                                damageDealer, callbackFunction);
                    }
                    else if (!attackerIsComputerAgent && !defenderIsComputerAgent)
                    {
                        // Both human agents.
                        attackerAgent.dealDamage(environment, adjudicator, attacker, attackDice, defender, defenseDice,
                                damageDealer, callbackFunction);
                    }

                    environment.phase(Phase.COMBAT_DEAL_DAMAGE);
                }

                function finishDealDamage(damageDealer)
                {
                    LOGGER.trace("CombatAction.finishDealDamage() start");

                    var isDefenderHit = (damageDealer.hits() + damageDealer.criticalHits() > 0);
                    attacker.combatState().isDefenderHit(isDefenderHit);
                    LOGGER.debug("isDefenderHit ? " + isDefenderHit);

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
                                defender.receiveStress();
                            }
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
                        else if (weapon.upgradeKey() === UpgradeCard.TWIN_LASER_TURRET)
                        {
                            defender.addDamage(environment.drawDamage());
                        }
                        else
                        {
                            damageDealer.dealDamage();
                        }

                        if (attacker.pilotKey() === Pilot.WHISPER)
                        {
                            attacker.focus().increase();
                        }

                        if (weapon.upgradeKey() === UpgradeCard.ASSAULT_MISSILES)
                        {
                            environment.getTokensAtRange(defender, RangeRuler.ONE).forEach(function(token)
                            {
                                token.addDamage(environment.drawDamage());
                            });
                        }
                        else if (weapon.upgradeKey() === UpgradeCard.FLECHETTE_TORPEDOES && defender.hullValue() <= 4)
                        {
                            defender.receiveStress();
                        }
                        else if (weapon.upgradeKey() === UpgradeCard.ION_TORPEDOES)
                        {
                            environment.getTokensAtRange(defender, RangeRuler.ONE).forEach(function(token)
                            {
                                token.ion().increase();
                            });
                        }
                        else if (weapon.upgradeKey() === UpgradeCard.PLASMA_TORPEDOES)
                        {
                            defender.shield().decrease();
                        }

                        if (defender.isUpgradedWith(UpgradeCard.STEALTH_DEVICE))
                        {
                            defender.upgradeKeys().vizziniRemove(UpgradeCard.STEALTH_DEVICE);
                        }
                    }
                    else
                    {
                        // Defender not hit.
                        if (attacker.isUpgradedWith(UpgradeCard.BOSSK))
                        {
                            if (!attacker.isStressed())
                            {
                                attacker.receiveStress();
                            }

                            attacker.focus().increase();
                            var targetLock = new TargetLock(attacker, defender);
                            attacker.addAttackerTargetLock(targetLock);
                            defender.addDefenderTargetLock(targetLock);
                        }
                    }

                    if (attacker.isUpgradedWith(UpgradeCard.TACTICIAN) &&
                            attacker.combatState().range() === RangeRuler.TWO)
                    {
                        var firingArc = attacker.pilot().shipTeam.ship.primaryFiringArc;

                        if (weapon.isDefenderInFiringArc(attackerPosition, firingArc, defender, defenderPosition))
                        {
                            defender.receiveStress();
                        }
                    }

                    var myDefender, myDefenderPosition;

                    if (defender.parent !== undefined)
                    {
                        myDefender = defender.parent;
                        myDefenderPosition = environment.getPositionFor(myDefender);
                    }
                    else
                    {
                        myDefender = defender;
                        myDefenderPosition = defenderPosition;
                    }

                    if (myDefender.isDestroyed())
                    {
                        if (attacker.pilotKey() === Pilot.IG_88A)
                        {
                            attacker.recoverShield();
                        }

                        var shipDestroyedAction = new ShipDestroyedAction(environment, myDefender, myDefenderPosition);
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
                        if ((weapon.upgradeKey() === UpgradeCard.CLUSTER_MISSILES || weapon.upgradeKey() === UpgradeCard.TWIN_LASER_TURRET) &&
                                executionCount < 2)
                        {
                            that.doIt();
                        }
                        else
                        {
                            if (callback)
                            {
                                callback();
                            }
                        }
                    }

                    LOGGER.trace("CombatAction.finishDealDamage() end");
                }
            }

            return CombatAction;
        });

define([ "AttackDice", "DamageDealer", "DefenseDice", "Phase", "RangeRuler", "ShipDestroyedAction", "UpgradeCard" ],
        function(AttackDice, DamageDealer, DefenseDice, Phase, RangeRuler, ShipDestroyedAction, UpgradeCard)
        {
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
                }

                this.adjudicator = function()
                {
                    return adjudicator;
                }

                this.attacker = function()
                {
                    return attacker;
                }

                this.attackerPosition = function()
                {
                    return attackerPosition;
                }

                this.weapon = function()
                {
                    return weapon;
                }

                this.defender = function()
                {
                    return defender;
                }

                this.defenderPosition = function()
                {
                    return defenderPosition;
                }

                this.doIt = function()
                {
                    attacker.combatState().weapon(weapon);

                    LOGGER.trace("attackerPosition = " + attackerPosition);
                    LOGGER.trace("defenderPosition = " + defenderPosition);
                    var range = RangeRuler.getRange(attacker, attackerPosition, defender, defenderPosition);
                    LOGGER.trace("range = " + range);
                    attacker.combatState().range(range);

                    if (range)
                    {
                        LOGGER.trace("attacker = " + attacker);
                        LOGGER.trace("defender = " + defender);
                        attacker.combatState().combatAction(this);

                        // Roll attack dice.
                        var attackDiceCount = attacker.computeAttackDiceCount(environment, weapon, range);
                        var attackDice = new AttackDice(attackDiceCount);

                        if (weapon.upgradeKey() === UpgradeCard.HEAVY_LASER_CANNON)
                        {
                            attackDice.changeAllToValue(AttackDice.Value.CRITICAL_HIT, AttackDice.Value.HIT);
                        }
                        else if (weapon.upgradeKey() === UpgradeCard.MANGLER_CANNON)
                        {
                            attackDice.changeOneToValue(AttackDice.Value.HIT, AttackDice.Value.CRITICAL_HIT);
                        }

                        attacker.combatState().attackDice(attackDice);
                        environment.phase(Phase.COMBAT_ROLL_ATTACK_DICE);

                        // Modify attack dice.
                        var agent = attacker.agent();
                        agent.getModifyAttackDiceAction(environment, adjudicator, attacker, attackDice, defender,
                                finishModifyAttackDice);
                    }
                }

                function finishModifyAttackDice(attackAction)
                {
                    LOGGER.info("CombatAction.finishModifyAttackDice() attackAction = " + attackAction);

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
                    var beforeDamage = defender.damageCount() + defender.criticalDamageCount();
                    LOGGER.trace("beforeDamage = " + beforeDamage);
                    var attackDice = attacker.combatState().attackDice();
                    var damageDealer = new DamageDealer(environment, attackDice.hitCount(), attackDice
                            .criticalHitCount(), defender, defenseDice.evadeCount());

                    var attackerAgent = attacker.agent();
                    attackerAgent.dealDamage(environment, adjudicator, attacker, attackDice, defender, defenseDice,
                            damageDealer, function()
                            {
                                finishDealDamage(damageDealer, beforeDamage);
                            });

                    var defenderAgent = defender.agent();
                    defenderAgent.dealDamage(environment, adjudicator, attacker, attackDice, defender, defenseDice,
                            damageDealer, function()
                            {
                                finishDealDamage(damageDealer, beforeDamage);
                            });

                    environment.phase(Phase.COMBAT_DEAL_DAMAGE);
                }

                function finishDealDamage(damageDealer, beforeDamage)
                {
                    damageDealer.dealDamage();
                    var afterDamage = defender.damageCount() + defender.criticalDamageCount();
                    LOGGER.trace("afterDamage = " + afterDamage);
                    var isDefenderHit = afterDamage > beforeDamage;
                    attacker.combatState().isDefenderHit(isDefenderHit);

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

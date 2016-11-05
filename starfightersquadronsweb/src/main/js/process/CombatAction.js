define(["AttackDice", "DefenseDice", "Phase", "Pilot", "RangeRuler", "UpgradeCard", "process/Action", "process/DamageDealer", "process/ShipDestroyedAction", "process/TargetLock"],
    function(AttackDice, DefenseDice, Phase, Pilot, RangeRuler, UpgradeCard, Action, DamageDealer, ShipDestroyedAction, TargetLock)
    {
        "use strict";

        function CombatAction(environment, adjudicator, attacker, attackerPosition, weapon, defender,
            defenderPosition, callback, attackDiceClassIn, defenseDiceClassIn)
        {
            InputValidator.validateNotNull("environment", environment);
            InputValidator.validateNotNull("adjudicator", adjudicator);
            InputValidator.validateNotNull("attacker", attacker);
            InputValidator.validateNotNull("attackerPosition", attackerPosition);
            InputValidator.validateNotNull("weapon", weapon);
            InputValidator.validateNotNull("defender", defender);
            InputValidator.validateNotNull("defenderPosition", defenderPosition);
            InputValidator.validateNotNull("callback", callback);

            var that = this;
            var attackDiceClass = (attackDiceClassIn ? attackDiceClassIn : AttackDice);
            var defenseDiceClass = (defenseDiceClassIn ? defenseDiceClassIn : DefenseDice);

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

            this.callback = function()
            {
                return callback;
            };

            this.attackDiceClass = function()
            {
                return attackDiceClass;
            };

            this.defenseDiceClass = function()
            {
                return defenseDiceClass;
            };

            var executionCount = 0;

            this.executionCount = function(value)
            {
                if (value !== undefined)
                {
                    executionCount = value;
                }

                return executionCount;
            };
        }

        CombatAction.prototype.doIt = function()
        {
            LOGGER.trace("CombatAction.doIt() start");

            this.executionCount(this.executionCount() + 1);
            var attacker = this.attacker();
            attacker.combatState().combatAction(this);

            this.declareTarget();

            LOGGER.trace("CombatAction.doIt() end");
        };

        CombatAction.prototype.declareTarget = function()
        {
            LOGGER.trace("CombatAction.declareTarget() start");

            this.environment().phase(Phase.COMBAT_DECLARE_TARGET);

            var attacker = this.attacker();
            var attackerPosition = this.attackerPosition();
            var defender = this.defender();
            var defenderPosition = this.defenderPosition();

            var rangeKey = RangeRuler.getRange(attacker, attackerPosition, defender, defenderPosition);
            if (rangeKey === undefined)
            {
                throw "Defender out of range. attacker: " + attacker + " defender: " + defender;
            }
            attacker.combatState().rangeKey(rangeKey);

            this.rollAttackDice();

            LOGGER.trace("CombatAction.declareTarget() end");
        };

        CombatAction.prototype.rollAttackDice = function()
        {
            LOGGER.trace("CombatAction.rollAttackDice() start");

            this.environment().phase(Phase.COMBAT_ROLL_ATTACK_DICE);

            var environment = this.environment();
            var attacker = this.attacker();
            var defender = this.defender();
            var weapon = this.weapon();
            var rangeKey = attacker.combatState().rangeKey();
            var attackDiceCount = attacker.computeAttackDiceCount(environment, weapon, defender, rangeKey);
            var attackDiceClass = this.attackDiceClass();
            var attackDice = new attackDiceClass(attackDiceCount);
            attacker.combatState().attackDice(attackDice);

            this.modifyAttackDice();

            LOGGER.trace("CombatAction.rollAttackDice() end");
        };

        CombatAction.prototype.modifyAttackDice = function()
        {
            LOGGER.trace("CombatAction.modifyAttackDice() start");

            this.environment().phase(Phase.COMBAT_MODIFY_ATTACK_DICE);

            var environment = this.environment();
            var adjudicator = this.adjudicator();
            var attacker = this.attacker();
            var weapon = this.weapon();
            var attackDice = attacker.combatState().attackDice();
            var defender = this.defender();
            var agent = attacker.agent();

            if (attacker.pilotKey() === Pilot.POE_DAMERON && attacker.focusCount() > 0)
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

            agent.getModifyAttackDiceAction(environment, adjudicator, attacker, attackDice, defender, this.finishModifyAttackDice.bind(this));

            LOGGER.trace("CombatAction.modifyAttackDice() end");
        };

        CombatAction.prototype.finishModifyAttackDice = function(modifyAttackDiceAction)
        {
            LOGGER.trace("CombatAction.finishModifyAttackDice() start");

            LOGGER.debug("CombatAction.finishModifyAttackDice() modifyAttackDiceAction = " + modifyAttackDiceAction);

            if (modifyAttackDiceAction)
            {
                modifyAttackDiceAction.doIt();
            }

            this.rollDefenseDice();

            LOGGER.trace("CombatAction.finishModifyAttackDice() end");
        };

        CombatAction.prototype.rollDefenseDice = function()
        {
            LOGGER.trace("CombatAction.rollDefenseDice() start");

            this.environment().phase(Phase.COMBAT_ROLL_DEFENSE_DICE);

            var attacker = this.attacker();
            var defender = this.defender();
            var weapon = this.weapon();
            var rangeKey = attacker.combatState().rangeKey();
            var defenderDiceCount = defender.computeDefenseDiceCount(weapon, rangeKey);
            var defenseDiceClass = this.defenseDiceClass();
            var defenseDice = new defenseDiceClass(defenderDiceCount);
            attacker.combatState().defenseDice(defenseDice);

            this.modifyDefenseDice();

            LOGGER.trace("CombatAction.rollDefenseDice() end");
        };

        CombatAction.prototype.modifyDefenseDice = function()
        {
            LOGGER.trace("CombatAction.modifyDefenseDice() start");

            this.environment().phase(Phase.COMBAT_MODIFY_DEFENSE_DICE);

            var environment = this.environment();
            var adjudicator = this.adjudicator();
            var attacker = this.attacker();
            var attackDice = attacker.combatState().attackDice();
            var weapon = this.weapon();
            var attackerPosition = this.attackerPosition();
            var defender = this.defender();
            var defenderAgent = defender.agent();
            var defenseDice = attacker.combatState().defenseDice();
            var defenderPosition = this.defenderPosition();
            var rangeKey = attacker.combatState().rangeKey();

            if (defender.pilotKey() === Pilot.LUKE_SKYWALKER && defenseDice.focusCount() > 0)
            {
                defenseDice.changeOneToValue(DefenseDice.Value.FOCUS, DefenseDice.Value.EVADE);
            }

            if (defender.pilotKey() === Pilot.POE_DAMERON && defender.focusCount() > 0)
            {
                defenseDice.changeOneToValue(DefenseDice.Value.FOCUS, DefenseDice.Value.EVADE);
            }

            if (defender.isUpgradedWith(UpgradeCard.AUTOTHRUSTERS) && defenseDice.blankCount() > 0)
            {
                var isBeyondRange2 = (rangeKey === undefined || rangeKey === RangeRuler.THREE);
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

            if (defender.reinforceCount() > 0)
            {
                // Add one evade result.
                defenseDice.spendEvadeToken();
            }

            defenderAgent.getModifyDefenseDiceAction(environment, adjudicator, attacker, attackDice, defender, defenseDice, this.finishModifyDefenseDice.bind(this));

            LOGGER.trace("CombatAction.modifyDefenseDice() end");
        };

        CombatAction.prototype.finishModifyDefenseDice = function(modifyDefenseDiceAction)
        {
            LOGGER.trace("CombatAction.finishModifyDefenseDice() start");

            LOGGER.debug("CombatAction.finishModifyDefenseDice() modifyDefenseDiceAction = " + modifyDefenseDiceAction);

            if (modifyDefenseDiceAction)
            {
                modifyDefenseDiceAction.doIt();
            }

            this.compareResults();

            LOGGER.trace("CombatAction.finishModifyDefenseDice() end");
        };

        CombatAction.prototype.compareResults = function()
        {
            LOGGER.trace("CombatAction.compareResults() start");

            this.environment().phase(Phase.COMBAT_COMPARE_RESULTS);

            var environment = this.environment();
            var attacker = this.attacker();
            var defender = this.defender();
            var attackDice = attacker.combatState().attackDice();
            var defenseDice = attacker.combatState().defenseDice();
            var damageDealer = new DamageDealer(environment, attackDice.hitCount(), attackDice.criticalHitCount(), defender, defenseDice.evadeCount());
            attacker.combatState().damageDealer(damageDealer);
            var isDefenderHit = (damageDealer.hits() + damageDealer.criticalHits() > 0);
            attacker.combatState().isDefenderHit(isDefenderHit);

            this.notifyDamage();

            LOGGER.trace("CombatAction.compareResults() end");
        };

        CombatAction.prototype.notifyDamage = function()
        {
            LOGGER.trace("CombatAction.dealDamage() start");

            this.environment().phase(Phase.COMBAT_NOTIFY_DAMAGE);

            var environment = this.environment();
            var adjudicator = this.adjudicator();
            var attacker = this.attacker();
            var defender = this.defender();
            var attackerAgent = attacker.agent();
            var defenderAgent = defender.agent();
            var attackerIsComputerAgent = attackerAgent.isComputerAgent();
            var defenderIsComputerAgent = defenderAgent.isComputerAgent();
            var attackDice = attacker.combatState().attackDice();
            var defenseDice = attacker.combatState().defenseDice();
            var damageDealer = attacker.combatState().damageDealer();
            var callback = this.dealDamage.bind(this);

            // Four possibilities:
            // computer vs computer: call dealDamage() once
            // computer vs human: call dealDamage() once
            // human vs computer: call dealDamage() once
            // human vs human: call dealDamage() once

            if (attackerIsComputerAgent && defenderIsComputerAgent)
            {
                // Both computer agents.
                setTimeout(callback, 1000);
            }
            else if (attackerIsComputerAgent && !defenderIsComputerAgent)
            {
                defenderAgent.dealDamage(environment, adjudicator, attacker, attackDice, defender, defenseDice, damageDealer, callback);
            }
            else if (!attackerIsComputerAgent && defenderIsComputerAgent)
            {
                attackerAgent.dealDamage(environment, adjudicator, attacker, attackDice, defender, defenseDice, damageDealer, callback);
            }
            else if (!attackerIsComputerAgent && !defenderIsComputerAgent)
            {
                // Both human agents.
                attackerAgent.dealDamage(environment, adjudicator, attacker, attackDice, defender, defenseDice, damageDealer, callback);
            }
        };

        CombatAction.prototype.dealDamage = function()
        {
            LOGGER.trace("CombatAction.dealDamage() start");

            this.environment().phase(Phase.COMBAT_DEAL_DAMAGE);

            var attacker = this.attacker();
            var damageDealer = attacker.combatState().damageDealer();
            var environment = this.environment();
            var weapon = this.weapon();
            var attackerPosition = this.attackerPosition();
            var defender = this.defender();
            var defenderPosition = this.defenderPosition();
            var store = environment.store();
            var isDefenderHit = attacker.combatState().isDefenderHit();

            if (isDefenderHit)
            {
                if (!weapon.upgrade() || weapon.upgrade().cancelAllDiceResults !== true)
                {
                    damageDealer.dealDamage();

                    if (attacker.pilotKey() === Pilot.WHISPER)
                    {
                        store.dispatch(Action.addFocusCount(attacker));
                    }

                    if (defender.isUpgradedWith(UpgradeCard.STEALTH_DEVICE))
                    {
                        defender.upgradeKeys().vizziniRemove(UpgradeCard.STEALTH_DEVICE);
                    }
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

                    store.dispatch(Action.addFocusCount(attacker));
                    var targetLock = new TargetLock(store, attacker, defender);
                    attacker.addAttackerTargetLock(targetLock);
                }
            }

            if (attacker.isUpgradedWith(UpgradeCard.TACTICIAN) && attacker.combatState().rangeKey() === RangeRuler.TWO)
            {
                var firingArc = attacker.pilot().shipTeam.ship.primaryFiringArc;

                if (weapon.isDefenderInFiringArc(attackerPosition, firingArc, defender, defenderPosition))
                {
                    defender.receiveStress();
                }
            }

            this.afterDealDamage();

            LOGGER.trace("CombatAction.dealDamage() end");
        };

        CombatAction.prototype.afterDealDamage = function()
        {
            LOGGER.trace("CombatAction.afterDealDamage() start");

            this.environment().phase(Phase.COMBAT_AFTER_DEAL_DAMAGE);

            var environment = this.environment();
            var attacker = this.attacker();
            var weapon = this.weapon();
            var defender = this.defender();
            var defenderPosition = this.defenderPosition();
            var callback = this.callback();
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
                    callback();
                }, delay);
            }
            else
            {
                if ([UpgradeCard.CLUSTER_MISSILES, UpgradeCard.TWIN_LASER_TURRET].vizziniContains(weapon.upgradeKey()) && this.executionCount() < 2)
                {
                    this.doIt();
                }
                else
                {
                    callback();
                }
            }

            LOGGER.trace("CombatAction.afterDealDamage() end");
        };

        return CombatAction;
    });

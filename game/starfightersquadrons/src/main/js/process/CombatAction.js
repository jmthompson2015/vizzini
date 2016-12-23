define(["AttackDice", "DamageCard", "DefenseDice", "Phase", "Pilot", "RangeRuler", "UpgradeCard", "process/Action", "process/DamageAbility3", "process/DamageDealer", "process/PilotAbility3", "process/Selector", "process/ShipDestroyedAction", "process/UpgradeAbility3"],
    function(AttackDice, DamageCard, DefenseDice, Phase, Pilot, RangeRuler, UpgradeCard, Action, DamageAbility3, DamageDealer, PilotAbility3, Selector, ShipDestroyedAction, UpgradeAbility3)
    {
        "use strict";

        function CombatAction(store, attacker, weapon, defender, callback, attackDiceClassIn, defenseDiceClassIn)
        {
            InputValidator.validateNotNull("store", store);
            InputValidator.validateNotNull("attacker", attacker);
            InputValidator.validateNotNull("weapon", weapon);
            InputValidator.validateNotNull("defender", defender);
            InputValidator.validateNotNull("callback", callback);
            // attackDiceClassIn optional.
            // defenseDiceClassIn optional.

            var attackDiceClass = (attackDiceClassIn ? attackDiceClassIn : AttackDice);
            var defenseDiceClass = (defenseDiceClassIn ? defenseDiceClassIn : DefenseDice);

            this.store = function()
            {
                return store;
            };

            this.attacker = function()
            {
                return attacker;
            };

            this.weapon = function()
            {
                return weapon;
            };

            this.defender = function()
            {
                return defender;
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

        CombatAction.prototype.PERFORM_ATTACK_TWICE_UPGRADES = [UpgradeCard.CLUSTER_MISSILES, UpgradeCard.TWIN_LASER_TURRET];

        CombatAction.prototype.doIt = function()
        {
            LOGGER.trace("CombatAction.doIt() start");

            this.executionCount(this.executionCount() + 1);
            var store = this.store();
            var attacker = this.attacker();
            store.dispatch(Action.setTokenCombatAction(attacker, this));

            this.declareTarget();

            LOGGER.trace("CombatAction.doIt() end");
        };

        CombatAction.prototype.declareTarget = function()
        {
            LOGGER.trace("CombatAction.declareTarget() start");

            this.environment().phase(Phase.COMBAT_DECLARE_TARGET);

            var attacker = this.attacker();
            var attackerPosition = this.attackerPosition();
            var weapon = this.weapon();
            var defender = this.defender();
            var defenderPosition = this.defenderPosition();

            var rangeKey = RangeRuler.getRange(attacker, attackerPosition, defender, defenderPosition);
            if (rangeKey === undefined)
            {
                throw "Defender out of range. attacker: " + attacker + " defender: " + defender;
            }
            attacker.combatState().rangeKey(rangeKey);

            var firingArc = weapon.primaryFiringArc();
            var isInFiringArc = weapon.isDefenderInFiringArc(attackerPosition, firingArc, defender, defenderPosition);
            attacker.combatState().isInFiringArc(isInFiringArc);

            this.declareTarget2();

            LOGGER.trace("CombatAction.declareTarget() end");
        };

        CombatAction.prototype.declareTarget2 = function()
        {
            LOGGER.trace("CombatAction.declareTarget2() start");

            var attacker = this.attacker();
            var agent = attacker.agent();
            var phaseKey = this.environment().phase();
            var damageAbilities = attacker.usableAttackerDamageAbilities(DamageAbility3, phaseKey);
            var pilotAbilities = attacker.usableAttackerPilotAbilities(PilotAbility3, phaseKey);
            var upgradeAbilities = attacker.usableAttackerUpgradeAbilities(UpgradeAbility3, phaseKey);
            agent.chooseAbility(this.environment(), damageAbilities, pilotAbilities, upgradeAbilities, this.finishDeclareTarget.bind(this));

            // Wait for agent to respond.

            LOGGER.trace("CombatAction.declareTarget2() end");
        };

        CombatAction.prototype.environment = function()
        {
            var store = this.store();
            return Selector.environment(store.getState());
        };

        CombatAction.prototype.finishDeclareTarget = function(ability, isAccepted)
        {
            LOGGER.trace("CombatAction.finishDeclareTarget() start");
            LOGGER.debug("CombatAction.finishDeclareTarget() ability = " + ability + " isAccepted ? " + isAccepted);

            this.finish(ability, isAccepted, this.declareTarget2.bind(this), this.rollAttackDice.bind(this));

            LOGGER.trace("CombatAction.finishDeclareTarget() end");
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
            var attackDice = attacker.combatState().attackDice();
            var defender = this.defender();
            var agent = attacker.agent();

            agent.getModifyAttackDiceAction(environment, adjudicator, attacker, attackDice, defender, this.finishModifyAttackDice.bind(this));

            LOGGER.trace("CombatAction.modifyAttackDice() end");
        };

        CombatAction.prototype.finishModifyAttackDice = function(modifyAttackDiceAction)
        {
            LOGGER.trace("CombatAction.finishModifyAttackDice() start");

            LOGGER.debug("CombatAction.finishModifyAttackDice() modifyAttackDiceAction = " + modifyAttackDiceAction + " " + (typeof modifyAttackDiceAction));

            if (modifyAttackDiceAction && modifyAttackDiceAction.doIt)
            {
                modifyAttackDiceAction.doIt();

                if (modifyAttackDiceAction.upgradeKey())
                {
                    var attacker = modifyAttackDiceAction.attacker();
                    var store = this.store();
                    store.dispatch(Action.addAttackerUsedUpgrade(attacker, modifyAttackDiceAction.upgradeKey()));
                }

                this.modifyAttackDice();
            }
            else
            {
                this.rollDefenseDice();
            }

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
            var defenderDiceCount = defender.computeDefenseDiceCount(this.environment(), attacker, weapon, rangeKey);
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
            var defender = this.defender();
            var defenderAgent = defender.agent();
            var defenseDice = attacker.combatState().defenseDice();

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

            LOGGER.debug("CombatAction.finishModifyDefenseDice() modifyDefenseDiceAction = " + modifyDefenseDiceAction + " " + (typeof modifyDefenseDiceAction));

            if (modifyDefenseDiceAction && modifyDefenseDiceAction.doIt)
            {
                modifyDefenseDiceAction.doIt();

                if (modifyDefenseDiceAction.upgradeKey())
                {
                    var attacker = this.attacker();
                    var store = this.store();
                    store.dispatch(Action.addDefenderUsedUpgrade(attacker, modifyDefenseDiceAction.upgradeKey()));
                }
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
            if (attacker.pilotKey() === Pilot.LIEUTENANT_BLOUNT)
            {
                isDefenderHit = true;
            }
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
            var weapon = this.weapon();
            var isDefenderHit = attacker.combatState().isDefenderHit();

            if (isDefenderHit)
            {
                if (!weapon.upgrade() || weapon.upgrade().cancelAllDiceResults !== true)
                {
                    damageDealer.dealDamage();
                }
            }

            this.dealDamage2();

            LOGGER.trace("CombatAction.dealDamage() end");
        };

        CombatAction.prototype.dealDamage2 = function()
        {
            LOGGER.trace("CombatAction.declareTarget2() start");

            var attacker = this.attacker();
            var agent = attacker.agent();
            var phaseKey = this.environment().phase();
            var damageAbilities = attacker.usableAttackerDamageAbilities(DamageAbility3, phaseKey);
            var pilotAbilities = attacker.usableAttackerPilotAbilities(PilotAbility3, phaseKey);
            var upgradeAbilities = attacker.usableAttackerUpgradeAbilities(UpgradeAbility3, phaseKey);
            agent.chooseAbility(this.environment(), damageAbilities, pilotAbilities, upgradeAbilities, this.finishDealDamage.bind(this));

            // Wait for agent to respond.

            LOGGER.trace("CombatAction.declareTarget2() end");
        };

        CombatAction.prototype.finishDealDamage = function(ability, isAccepted)
        {
            LOGGER.trace("CombatAction.finishDealDamage() start");
            LOGGER.debug("CombatAction.finishDealDamage() ability = " + ability + " isAccepted ? " + isAccepted);

            this.finish(ability, isAccepted, this.dealDamage2.bind(this), this.afterDealDamage.bind(this));

            LOGGER.trace("CombatAction.finishDealDamage() end");
        };

        CombatAction.prototype.afterDealDamage = function()
        {
            LOGGER.trace("CombatAction.afterDealDamage() start");

            this.environment().phase(Phase.COMBAT_AFTER_DEAL_DAMAGE);

            var attacker = this.attacker();
            var agent = attacker.agent();
            var phaseKey = this.environment().phase();
            var damageAbilities = attacker.usableAttackerDamageAbilities(DamageAbility3, phaseKey);
            var pilotAbilities = attacker.usableAttackerPilotAbilities(PilotAbility3, phaseKey);
            var upgradeAbilities = attacker.usableAttackerUpgradeAbilities(UpgradeAbility3, phaseKey);
            agent.chooseAbility(this.environment(), damageAbilities, pilotAbilities, upgradeAbilities, this.afterDealDamage2.bind(this));

            // Wait for agent to respond.

            LOGGER.trace("CombatAction.afterDealDamage() end");
        };

        CombatAction.prototype.afterDealDamage2 = function(ability, isAccepted)
        {
            LOGGER.trace("CombatAction.afterDealDamage2() start");
            LOGGER.debug("CombatAction.afterDealDamage2() ability = " + ability + " isAccepted ? " + isAccepted);

            this.finish(ability, isAccepted, this.afterDealDamage.bind(this), this.finishAfterDealDamage.bind(this));

            LOGGER.trace("CombatAction.afterDealDamage2() end");
        };

        CombatAction.prototype.finishAfterDealDamage = function()
        {
            LOGGER.trace("CombatAction.finishAfterDealDamage() start");

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
                if (this.PERFORM_ATTACK_TWICE_UPGRADES.vizziniContains(weapon.upgradeKey()) && this.executionCount() < 2)
                {
                    var store = this.store();
                    store.dispatch(Action.removeAttackerUsedUpgrade(attacker, weapon.upgradeKey()));
                    this.doIt();
                }
                else
                {
                    callback();
                }
            }

            LOGGER.trace("CombatAction.finishAfterDealDamage() end");
        };

        ////////////////////////////////////////////////////////////////////////
        CombatAction.prototype.adjudicator = function()
        {
            var store = this.store();
            return Selector.adjudicator(store.getState());
        };

        CombatAction.prototype.attackerPosition = function()
        {
            var environment = this.environment();
            var attacker = this.attacker();
            return environment.getPositionFor(attacker);
        };

        CombatAction.prototype.defenderPosition = function()
        {
            var environment = this.environment();
            var defender = this.defender();
            return environment.getPositionFor(defender);
        };

        CombatAction.prototype.finish = function(ability, isAccepted, backFunction, forwardFunction)
        {
            InputValidator.validateNotNull("backFunction", backFunction);
            InputValidator.validateNotNull("forwardFunction", forwardFunction);

            LOGGER.debug("CombatAction.finish() ability = " + ability);
            LOGGER.debug("CombatAction.finish() isAccepted ? " + isAccepted);

            if (ability && isAccepted)
            {
                var store = this.store();
                var attacker = this.attacker();

                if (ability.isDamage())
                {
                    store.dispatch(Action.addAttackerUsedDamage(attacker, ability.sourceKey()));
                }
                else if (ability.isPilot())
                {
                    store.dispatch(Action.addAttackerUsedPilot(attacker, ability.sourceKey()));
                }
                else if (ability.isUpgrade())
                {
                    store.dispatch(Action.addAttackerUsedUpgrade(attacker, ability.sourceKey()));
                }
                else
                {
                    throw "Unknown source: " + source + " " + (typeof source);
                }

                var consequent = ability.consequent();
                consequent(store, attacker, backFunction);
            }
            else
            {
                forwardFunction();
            }
        };

        return CombatAction;
    });

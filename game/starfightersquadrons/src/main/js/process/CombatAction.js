define(["process/AttackDice", "process/DefenseDice", "Phase", "Pilot", "RangeRuler", "UpgradeCard", "process/Action", "process/DamageDealer", "process/Selector", "process/ShipDestroyedAction"],
   function(AttackDice, DefenseDice, Phase, Pilot, RangeRuler, UpgradeCard, Action, DamageDealer, Selector, ShipDestroyedAction)
   {
      "use strict";

      function CombatAction(store, attacker, weapon, defender, callback, delayIn, attackDiceClassIn, defenseDiceClassIn)
      {
         InputValidator.validateNotNull("store", store);
         InputValidator.validateNotNull("attacker", attacker);
         InputValidator.validateNotNull("weapon", weapon);
         InputValidator.validateNotNull("defender", defender);
         InputValidator.validateNotNull("callback", callback);
         // delayIn optional.
         // attackDiceClassIn optional.
         // defenseDiceClassIn optional.

         var delay = (delayIn !== undefined ? delayIn : 1000);
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

         this.delay = function()
         {
            return delay;
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

         this.environment().phase(Phase.COMBAT_DECLARE_TARGET, this.attacker());

         var store = this.store();
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
         store.dispatch(Action.setTokenRange(attacker, rangeKey));

         var firingArc = weapon.primaryFiringArc();
         var isInFiringArc = weapon.isDefenderInFiringArc(attackerPosition, firingArc, defender, defenderPosition);
         store.dispatch(Action.setTokenInFiringArc(attacker, isInFiringArc));

         this.rollAttackDice();

         LOGGER.trace("CombatAction.declareTarget() end");
      };

      CombatAction.prototype.environment = function()
      {
         var store = this.store();
         return Selector.environment(store.getState());
      };

      CombatAction.prototype.rollAttackDice = function()
      {
         LOGGER.trace("CombatAction.rollAttackDice() start");

         this.environment().phase(Phase.COMBAT_ROLL_ATTACK_DICE, this.attacker());

         var store = this.store();
         var environment = this.environment();
         var attacker = this.attacker();
         var defender = this.defender();
         var weapon = this.weapon();
         var rangeKey = Selector.rangeKey(store.getState(), attacker);
         var attackDiceCount = attacker.computeAttackDiceCount(environment, weapon, defender, rangeKey);
         var attackDiceClass = this.attackDiceClass();
         var attackDice = new attackDiceClass(store, attacker.id(), attackDiceCount);

         this.modifyAttackDice();

         LOGGER.trace("CombatAction.rollAttackDice() end");
      };

      CombatAction.prototype.modifyAttackDice = function()
      {
         LOGGER.trace("CombatAction.modifyAttackDice() start");

         this.environment().phase(Phase.COMBAT_MODIFY_ATTACK_DICE, this.attacker());

         var store = this.store();
         var environment = this.environment();
         var adjudicator = this.adjudicator();
         var attacker = this.attacker();
         var attackDice = AttackDice.get(store, attacker.id());
         var defender = this.defender();
         var agent = attacker.agent();

         agent.getModifyAttackDiceAction(store, adjudicator, attacker, defender, this.finishModifyAttackDice.bind(this));

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

         this.environment().phase(Phase.COMBAT_ROLL_DEFENSE_DICE, this.attacker());

         var store = this.store();
         var attacker = this.attacker();
         var defender = this.defender();
         var weapon = this.weapon();
         var rangeKey = Selector.rangeKey(store.getState(), attacker);
         var defenderDiceCount = defender.computeDefenseDiceCount(this.environment(), attacker, weapon, rangeKey);
         var defenseDiceClass = this.defenseDiceClass();
         var defenseDice = new defenseDiceClass(store, attacker.id(), defenderDiceCount);

         this.modifyDefenseDice();

         LOGGER.trace("CombatAction.rollDefenseDice() end");
      };

      CombatAction.prototype.modifyDefenseDice = function()
      {
         LOGGER.trace("CombatAction.modifyDefenseDice() start");

         this.environment().phase(Phase.COMBAT_MODIFY_DEFENSE_DICE, this.attacker());

         var store = this.store();
         var environment = this.environment();
         var adjudicator = this.adjudicator();
         var attacker = this.attacker();
         var attackDice = AttackDice.get(store, attacker.id());
         var defender = this.defender();
         var defenderAgent = defender.agent();
         var defenseDice = DefenseDice.get(store, attacker.id());

         if (defender.reinforceCount() > 0)
         {
            // Add one evade result.
            defenseDice.spendEvadeToken();
         }

         defenderAgent.getModifyDefenseDiceAction(store, adjudicator, attacker, defender, this.finishModifyDefenseDice.bind(this));

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

         this.environment().phase(Phase.COMBAT_COMPARE_RESULTS, this.attacker());

         var store = this.store();
         var environment = this.environment();
         var attacker = this.attacker();
         var defender = this.defender();
         var attackDice = AttackDice.get(store, attacker.id());
         var defenseDice = DefenseDice.get(store, attacker.id());
         var damageDealer = new DamageDealer(environment, attackDice.hitCount(), attackDice.criticalHitCount(), defender, defenseDice.evadeCount());
         store.dispatch(Action.setTokenDamageDealer(attacker, damageDealer));
         var isDefenderHit = (damageDealer.hits() + damageDealer.criticalHits() > 0);
         if (attacker.pilotKey() === Pilot.LIEUTENANT_BLOUNT)
         {
            isDefenderHit = true;
         }
         store.dispatch(Action.setTokenDefenderHit(attacker, isDefenderHit));

         this.notifyDamage();

         LOGGER.trace("CombatAction.compareResults() end");
      };

      CombatAction.prototype.notifyDamage = function()
      {
         LOGGER.trace("CombatAction.dealDamage() start");

         this.environment().phase(Phase.COMBAT_NOTIFY_DAMAGE, this.attacker());

         var store = this.store();
         var environment = this.environment();
         var adjudicator = this.adjudicator();
         var attacker = this.attacker();
         var defender = this.defender();
         var attackerAgent = attacker.agent();
         var defenderAgent = defender.agent();
         var attackerIsComputerAgent = attackerAgent.isComputerAgent();
         var defenderIsComputerAgent = defenderAgent.isComputerAgent();
         var attackDice = AttackDice.get(store, attacker.id());
         var defenseDice = DefenseDice.get(store, attacker.id());
         var damageDealer = Selector.damageDealer(store.getState(), attacker);
         var callback = this.dealDamage.bind(this);

         // Four possibilities:
         // computer vs computer: call dealDamage() once
         // computer vs human: call dealDamage() once
         // human vs computer: call dealDamage() once
         // human vs human: call dealDamage() once

         if (attackerIsComputerAgent && defenderIsComputerAgent)
         {
            // Both computer agents.
            setTimeout(callback, this.delay());
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

         this.environment().phase(Phase.COMBAT_DEAL_DAMAGE, this.attacker());

         var store = this.store();
         var attacker = this.attacker();
         var damageDealer = Selector.damageDealer(store.getState(), attacker);
         var weapon = this.weapon();
         var isDefenderHit = Selector.isDefenderHit(store.getState(), attacker);

         if (isDefenderHit)
         {
            if (!weapon.upgrade() || weapon.upgrade().cancelAllDiceResults !== true)
            {
               damageDealer.dealDamage();
            }
         }

         this.afterDealDamage();

         LOGGER.trace("CombatAction.dealDamage() end");
      };

      CombatAction.prototype.afterDealDamage = function()
      {
         LOGGER.trace("CombatAction.afterDealDamage() start");

         this.environment().phase(Phase.COMBAT_AFTER_DEAL_DAMAGE, this.attacker(), this.finishAfterDealDamage.bind(this));

         LOGGER.trace("CombatAction.afterDealDamage() end");
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
            if (this.PERFORM_ATTACK_TWICE_UPGRADES.includes(weapon.upgradeKey()) && this.executionCount() < 2)
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

      return CombatAction;
   });

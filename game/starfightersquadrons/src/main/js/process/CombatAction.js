define(["Phase", "Pilot", "RangeRuler", "UpgradeCard",
  "process/Action", "process/AttackDice", "process/DamageDealer", "process/DefenseDice", "process/Selector", "process/ShipDestroyedAction", "process/TokenAction"],
   function(Phase, Pilot, RangeRuler, UpgradeCard,
      Action, AttackDice, DamageDealer, DefenseDice, Selector, ShipDestroyedAction, TokenAction)
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

         if (attacker === defender)
         {
            throw "ERROR: attacker === defender when creating CombatAction " + attacker;
         }

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

      //////////////////////////////////////////////////////////////////////////
      // Accessor methods.

      CombatAction.prototype.PERFORM_ATTACK_TWICE_UPGRADES = [UpgradeCard.CLUSTER_MISSILES, UpgradeCard.TWIN_LASER_TURRET];

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

      CombatAction.prototype.environment = function()
      {
         var store = this.store();
         return Selector.environment(store.getState());
      };

      //////////////////////////////////////////////////////////////////////////
      // Behavior methods.

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

         var store = this.store();
         store.dispatch(Action.enqueuePhase(Phase.COMBAT_DECLARE_TARGET, this.attacker(), this.finishDeclareTarget.bind(this)));

         LOGGER.trace("CombatAction.declareTarget() end");
      };

      CombatAction.prototype.finishDeclareTarget = function()
      {
         LOGGER.trace("CombatAction.finishDeclareTarget() start");

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

         LOGGER.trace("CombatAction.finishDeclareTarget() end");
      };

      CombatAction.prototype.rollAttackDice = function()
      {
         LOGGER.trace("CombatAction.rollAttackDice() start");

         var store = this.store();
         store.dispatch(Action.enqueuePhase(Phase.COMBAT_ROLL_ATTACK_DICE, this.attacker(), this.finishRollAttackDice.bind(this)));

         LOGGER.trace("CombatAction.rollAttackDice() end");
      };

      CombatAction.prototype.finishRollAttackDice = function()
      {
         LOGGER.trace("CombatAction.finishRollAttackDice() start");

         var store = this.store();
         var environment = this.environment();
         var attacker = this.attacker();
         var defender = this.defender();
         var weapon = this.weapon();
         var rangeKey = Selector.rangeKey(store.getState(), attacker);
         var attackDiceCount = attacker.computeAttackDiceCount(environment, weapon, defender, rangeKey);
         var attackDiceClass = this.attackDiceClass();
         var attackDice = new attackDiceClass(store, attacker.id(), attackDiceCount);

         var phaseContext = {
            defender: defender,
         };
         store.dispatch(Action.enqueuePhase(Phase.COMBAT_MODIFY_ATTACK_DICE, attacker, this.rollDefenseDice.bind(this), phaseContext));

         LOGGER.trace("CombatAction.finishRollAttackDice() end");
      };

      CombatAction.prototype.rollDefenseDice = function()
      {
         LOGGER.trace("CombatAction.rollDefenseDice() start");

         var store = this.store();
         store.dispatch(Action.enqueuePhase(Phase.COMBAT_ROLL_DEFENSE_DICE, this.attacker(), this.finishRollDefenseDice.bind(this)));

         LOGGER.trace("CombatAction.rollDefenseDice() end");
      };

      CombatAction.prototype.finishRollDefenseDice = function()
      {
         LOGGER.trace("CombatAction.finishRollDefenseDice() start");

         var store = this.store();
         var attacker = this.attacker();
         var defender = this.defender();
         var weapon = this.weapon();
         var rangeKey = Selector.rangeKey(store.getState(), attacker);
         var defenderDiceCount = defender.computeDefenseDiceCount(this.environment(), attacker, weapon, rangeKey);
         var defenseDiceClass = this.defenseDiceClass();
         var defenseDice = new defenseDiceClass(store, attacker.id(), defenderDiceCount);

         this.modifyDefenseDice();

         LOGGER.trace("CombatAction.finishRollDefenseDice() end");
      };

      CombatAction.prototype.modifyDefenseDice = function()
      {
         LOGGER.trace("CombatAction.modifyDefenseDice() start");

         var store = this.store();
         var defender = this.defender();
         var phaseContext = {
            defender: defender,
         };
         store.dispatch(Action.enqueuePhase(Phase.COMBAT_MODIFY_DEFENSE_DICE, this.attacker(), this.compareResults.bind(this), phaseContext));

         LOGGER.trace("CombatAction.modifyDefenseDice() end");
      };

      CombatAction.prototype.compareResults = function()
      {
         LOGGER.trace("CombatAction.compareResults() start");

         var store = this.store();
         store.dispatch(Action.enqueuePhase(Phase.COMBAT_COMPARE_RESULTS, this.attacker(), this.finishCompareResults.bind(this)));

         LOGGER.trace("CombatAction.compareResults() end");
      };

      CombatAction.prototype.finishCompareResults = function()
      {
         LOGGER.trace("CombatAction.finishCompareResults() start");

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

         LOGGER.trace("CombatAction.finishCompareResults() end");
      };

      CombatAction.prototype.notifyDamage = function()
      {
         LOGGER.trace("CombatAction.dealDamage() start");

         var store = this.store();
         store.dispatch(Action.enqueuePhase(Phase.COMBAT_NOTIFY_DAMAGE, this.attacker(), this.finishNotifyDamage.bind(this)));
      };

      CombatAction.prototype.finishNotifyDamage = function()
      {
         LOGGER.trace("CombatAction.finishNotifyDamage() start");

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

         LOGGER.trace("CombatAction.finishNotifyDamage() end");
      };

      CombatAction.prototype.dealDamage = function()
      {
         LOGGER.trace("CombatAction.dealDamage() start");

         var store = this.store();
         store.dispatch(Action.enqueuePhase(Phase.COMBAT_DEAL_DAMAGE, this.attacker(), this.finishDealDamage.bind(this)));

         LOGGER.trace("CombatAction.dealDamage() end");
      };

      CombatAction.prototype.finishDealDamage = function()
      {
         LOGGER.trace("CombatAction.finishDealDamage() start");

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

         LOGGER.trace("CombatAction.finishDealDamage() end");
      };

      CombatAction.prototype.afterDealDamage = function()
      {
         LOGGER.trace("CombatAction.afterDealDamage() start");

         var store = this.store();
         store.dispatch(Action.enqueuePhase(Phase.COMBAT_AFTER_DEAL_DAMAGE, this.attacker(), this.finishAfterDealDamage.bind(this)));

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

         var store = this.store();
         store.dispatch(TokenAction.clearTokenUsedAbilities(attacker));
         store.dispatch(TokenAction.clearTokenUsedAbilities(defender));

         if (myDefender.isDestroyed())
         {
            var shipDestroyedAction = new ShipDestroyedAction(environment, myDefender, myDefenderPosition);
            shipDestroyedAction.doIt();
            var delay = 1.5 * this.delay();
            setTimeout(function()
            {
               callback();
            }, delay);
         }
         else
         {
            if (this.PERFORM_ATTACK_TWICE_UPGRADES.includes(weapon.upgradeKey()) && this.executionCount() < 2)
            {
               this.doIt();
            }
            else
            {
               callback();
            }
         }

         LOGGER.trace("CombatAction.finishAfterDealDamage() end");
      };

      return CombatAction;
   });

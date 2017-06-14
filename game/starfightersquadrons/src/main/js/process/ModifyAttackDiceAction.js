define(["Phase", "process/Action", "process/AttackDice", "process/PilotAbility3", "process/UpgradeAbility3"],
   function(Phase, Action, AttackDice, PilotAbility3, UpgradeAbility3)
   {
      "use strict";

      function ModifyAttackDiceAction(store, attacker, defender, modificationKey, pilotKey, upgradeKey)
      {
         InputValidator.validateNotNull("store", store);
         InputValidator.validateNotNull("attacker", attacker);
         InputValidator.validateNotNull("defender", defender);
         InputValidator.validateNotNull("modificationKey", modificationKey);
         // pilotKey optional.
         // upgradeKey optional.

         this.store = function()
         {
            return store;
         };

         this.attacker = function()
         {
            return attacker;
         };

         this.defender = function()
         {
            return defender;
         };

         this.modificationKey = function()
         {
            return modificationKey;
         };

         this.pilotKey = function()
         {
            return pilotKey;
         };

         this.upgradeKey = function()
         {
            return upgradeKey;
         };

         this.attackDice = function()
         {
            return AttackDice.get(store, attacker.id());
         };

         this.doIt = function()
         {
            var attackDice = this.attackDice();

            if (modificationKey === ModifyAttackDiceAction.Modification.SPEND_TARGET_LOCK)
            {
               attackDice.spendTargetLock();
               var targetLock = attacker.findTargetLockByDefender(defender);
               attacker.removeAttackerTargetLock(targetLock);
            }
            else if (modificationKey === ModifyAttackDiceAction.Modification.SPEND_FOCUS)
            {
               attackDice.spendFocusToken();
               store.dispatch(Action.addFocusCount(attacker, -1));
            }
            else if (modificationKey === ModifyAttackDiceAction.Modification.USE_PILOT)
            {
               var pilotAbility = PilotAbility3[Phase.COMBAT_MODIFY_ATTACK_DICE][pilotKey];

               if (pilotAbility !== undefined)
               {
                  pilotAbility.consequent(store, attacker);
               }
            }
            else if (modificationKey === ModifyAttackDiceAction.Modification.USE_UPGRADE)
            {
               var upgradeAbility = UpgradeAbility3[Phase.COMBAT_MODIFY_ATTACK_DICE][upgradeKey];

               if (upgradeAbility !== undefined)
               {
                  upgradeAbility.consequent(store, attacker);
               }
            }
            else
            {
               throw "Unknown modificationKey: " + modificationKey;
            }
         };
      }

      ModifyAttackDiceAction.Modification = {
         SPEND_FOCUS: "spendFocus",
         SPEND_TARGET_LOCK: "spendTargetLock",
         USE_PILOT: "usePilot",
         USE_UPGRADE: "useUpgrade",
         properties:
         {
            "spendFocus":
            {
               name: "Spend a Focus token",
               value: "spendFocus",
            },
            "spendTargetLock":
            {
               name: "Spend Target Lock tokens",
               value: "spendTargetLock",
            },
            "usePilot":
            {
               name: "Use Pilot",
               value: "usePilot",
            },
            "useUpgrade":
            {
               name: "Use Upgrade",
               value: "useUpgrade",
            },
         },
      };

      ModifyAttackDiceAction.prototype.toString = function()
      {
         return "ModifyAttackDiceAction modificationKey=" + this.modificationKey() + ", pilotKey=" + this.pilotKey() + ", upgradeKey=" + this.upgradeKey();
      };

      return ModifyAttackDiceAction;
   });

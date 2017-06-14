define(["Phase", "process/Action", "process/DefenseDice", "process/PilotAbility3", "process/UpgradeAbility3"],
   function(Phase, Action, DefenseDice, PilotAbility3, UpgradeAbility3)
   {
      "use strict";

      function ModifyDefenseDiceAction(store, attacker, defender, modificationKey, pilotKey, upgradeKey)
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

         this.defenseDice = function()
         {
            return DefenseDice.get(store, attacker.id());
         };

         this.doIt = function()
         {
            var defenseDice = this.defenseDice();

            if (modificationKey === ModifyDefenseDiceAction.Modification.SPEND_FOCUS)
            {
               defenseDice.spendFocusToken();
               store.dispatch(Action.addFocusCount(defender, -1));
            }
            else if (modificationKey === ModifyDefenseDiceAction.Modification.SPEND_EVADE)
            {
               defenseDice.spendEvadeToken();
               store.dispatch(Action.addEvadeCount(defender, -1));
            }
            else if (modificationKey === ModifyDefenseDiceAction.Modification.USE_PILOT)
            {
               var pilotAbility = PilotAbility3[Phase.COMBAT_MODIFY_DEFENSE_DICE][pilotKey];

               if (pilotAbility && pilotAbility.consequent)
               {
                  pilotAbility.consequent(store, defender, function() {});
               }
            }
            else if (modificationKey === ModifyDefenseDiceAction.Modification.USE_UPGRADE)
            {
               var upgradeAbility = UpgradeAbility3[Phase.COMBAT_MODIFY_DEFENSE_DICE][upgradeKey];

               if (upgradeAbility && upgradeAbility.consequent)
               {
                  upgradeAbility.consequent(store, defender, function() {});
               }
            }
            else
            {
               throw "Unknown modificationKey: " + modificationKey;
            }
         };
      }

      ModifyDefenseDiceAction.Modification = {
         SPEND_EVADE: "spendEvade",
         SPEND_FOCUS: "spendFocus",
         USE_PILOT: "usePilot",
         USE_UPGRADE: "useUpgrade",
         properties:
         {
            "spendEvade":
            {
               name: "Spend an Evade token",
               value: "spendEvade",
            },
            "spendFocus":
            {
               name: "Spend a Focus token",
               value: "spendFocus",
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

      ModifyDefenseDiceAction.prototype.toString = function()
      {
         return "ModifyDefenseDiceAction modificationKey=" + this.modificationKey() + ", pilotKey=" + this.pilotKey() + ", upgradeKey=" + this.upgradeKey();
      };

      return ModifyDefenseDiceAction;
   });

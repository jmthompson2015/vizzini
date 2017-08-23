define(function()
{
   "use strict";
   var DiceModification = {
      ATTACK_SPEND_FOCUS: "attackSpendFocus",
      ATTACK_SPEND_TARGET_LOCK: "attackSpendTargetLock",
      DEFENSE_SPEND_EVADE: "defenseSpendEvade",
      DEFENSE_SPEND_FOCUS: "defenseSpendFocus",

      properties:
      {
         "attackSpendFocus":
         {
            name: "Spend a Focus token",
            value: "attackSpendFocus",
         },
         "attackSpendTargetLock":
         {
            name: "Spend Target Lock tokens",
            value: "attackSpendTargetLock",
         },
         "defenseSpendEvade":
         {
            name: "Spend an Evade token",
            value: "defenseSpendEvade",
         },
         "defenseSpendFocus":
         {
            name: "Spend a Focus token",
            value: "defenseSpendFocus",
         },
      },

      values: function()
      {
         return Object.getOwnPropertyNames(DiceModification.properties);
      },
   };

   if (Object.freeze)
   {
      Object.freeze(DiceModification);
   }

   return DiceModification;
});

define(["process/AttackDice"],
   function(AttackDice)
   {
      "use strict";

      function MockAttackDice(store, attackerId)
      {
         InputValidator.validateNotNull("store", store);
         InputValidator.validateIsNumber("attackerId", attackerId);

         var values = [AttackDice.Value.BLANK, AttackDice.Value.CRITICAL_HIT, AttackDice.Value.FOCUS, AttackDice.Value.HIT];
         var answer = new AttackDice(store, attackerId, values);

         answer.rerollAllBlank = function() {};

         answer.rerollAllFocus = function() {};

         answer.rerollBlank = function(count) {};

         answer.rerollBlankAndFocus = function(count) {};

         answer.rerollFocus = function(count) {};

         answer.rerollType = function(type, count) {};

         return answer;
      }

      return MockAttackDice;
   });

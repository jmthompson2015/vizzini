define(["process/DefenseDice"],
   function(DefenseDice)
   {
      "use strict";

      function MockDefenseDice(store, attackerId)
      {
         InputValidator.validateNotNull("store", store);
         InputValidator.validateIsNumber("attackerId", attackerId);

         var values = [DefenseDice.Value.BLANK, DefenseDice.Value.EVADE, DefenseDice.Value.FOCUS];
         var answer = new DefenseDice(store, attackerId, values);

         answer.rerollAllFocus = function() {};

         answer.rerollBlank = function(count) {};

         answer.rerollBlankAndFocus = function(count) {};

         answer.rerollFocus = function(count) {};

         answer.rerollType = function(type, count) {};

         return answer;
      }

      return MockDefenseDice;
   });

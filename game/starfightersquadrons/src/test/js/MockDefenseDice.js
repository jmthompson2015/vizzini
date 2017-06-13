define(["process/DefenseDice"], function(DefenseDice)
{
   "use strict";

   function MockDefenseDice()
   {
      var values;

      rerollAll();

      this.blankCount = function()
      {
         return valueCount(DefenseDice.Value.BLANK);
      };

      this.changeOneToValue = function(oldValue, newValue)
      {
         for (var i = 0; i < values.length; i++)
         {
            var value = values[i];

            if (value === oldValue)
            {
               values[i] = newValue;
               break;
            }
         }
      };

      this.evadeCount = function()
      {
         return valueCount(DefenseDice.Value.EVADE);
      };

      this.focusCount = function()
      {
         return valueCount(DefenseDice.Value.FOCUS);
      };

      this.rerollBlank = function() {};

      this.size = function()
      {
         return values.length;
      };

      this.sortedValues = function()
      {
         var answer = values.slice();

         answer.sort(function(die0, die1)
         {
            var value0 = DefenseDice.Value.properties[die0].sortOrder;
            var value1 = DefenseDice.Value.properties[die1].sortOrder;

            return value0 - value1;
         });

         return answer;
      };

      this.spendEvadeToken = function()
      {
         // Add an evade result.
         values.push(DefenseDice.Value.EVADE);
      };

      this.spendFocusToken = function()
      {
         // Change all focus results to evades.
         changeAllToValue(DefenseDice.Value.FOCUS, DefenseDice.Value.EVADE);
      };

      this.toString = function()
      {
         return "size = " + values.length + ", values = " + values;
      };

      this.value = function(index)
      {
         return values[index];
      };

      this.values = function()
      {
         return values;
      };

      function changeAllToValue(oldValue, newValue)
      {
         values.forEach(function(value, i)
         {
            if (value === oldValue)
            {
               values[i] = newValue;
            }
         });
      }

      function rerollAll()
      {
         values = [];

         values.push(DefenseDice.Value.BLANK);
         values.push(DefenseDice.Value.EVADE);
         values.push(DefenseDice.Value.FOCUS);
      }

      function valueCount(target)
      {
         return values.reduce(function(previousValue, currentValue)
         {
            return previousValue + (currentValue === target ? 1 : 0);
         }, 0);
      }
   }

   return MockDefenseDice;
});

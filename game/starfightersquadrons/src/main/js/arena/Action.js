define(function()
{
   "use strict";
   var Action = {};

   Action.ADD_LOSE_COUNT = "addLoseCount";
   Action.ADD_TIE_COUNT = "addTieCount";
   Action.ADD_WIN_COUNT = "addWinCount";

   Action.addLoseCount = function(squadBuilder)
   {
      InputValidator.validateNotNull("squadBuilder", squadBuilder);

      return (
      {
         type: Action.ADD_LOSE_COUNT,
         squadBuilder: squadBuilder,
      });
   };

   Action.addTieCount = function(squadBuilder)
   {
      InputValidator.validateNotNull("squadBuilder", squadBuilder);

      return (
      {
         type: Action.ADD_TIE_COUNT,
         squadBuilder: squadBuilder,
      });
   };

   Action.addWinCount = function(squadBuilder)
   {
      InputValidator.validateNotNull("squadBuilder", squadBuilder);

      return (
      {
         type: Action.ADD_WIN_COUNT,
         squadBuilder: squadBuilder,
      });
   };

   return Action;
});

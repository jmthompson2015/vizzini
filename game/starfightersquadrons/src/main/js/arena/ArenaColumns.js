define(function()
{
   "use strict";
   var ArenaColumns = [
      {
         key: "factionKey",
         label: "Faction",
      },
      {
         key: "squadBuilder",
         label: "Squad",
         className: "textCell",
      },
      {
         key: "winCount",
         label: "Win",
         className: "numberCell",
      },
      {
         key: "loseCount",
         label: "Lose",
         className: "numberCell",
      },
      {
         key: "tieCount",
         label: "Tie",
         className: "numberCell",
      },
   ];

   return ArenaColumns;
});

define(["process/SquadBuilder"],
   function(SquadBuilder)
   {
      "use strict";

      function InitialState()
      {
         this.squadBuilders = [];
         this.sbToWinCount = {};
         this.sbToLoseCount = {};
         this.sbToTieCount = {};

         // FIXME
         // this.squadBuilders = SquadBuilder.SquadBuilders.slice();

         for (var i = 0; i < 10; i++)
         {
            this.squadBuilders.push(SquadBuilder.SquadBuilders[i]);
         }

         this.squadBuilders.forEach(function(squadBuilder)
         {
            this.sbToWinCount[squadBuilder] = 0;
            this.sbToLoseCount[squadBuilder] = 0;
            this.sbToTieCount[squadBuilder] = 0;
         }, this);
      }

      return InitialState;
   });

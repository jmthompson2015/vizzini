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
         this.squadBuilders.push(SquadBuilder.SquadBuilders[0]);
         this.squadBuilders.push(SquadBuilder.SquadBuilders[1]);
         this.squadBuilders.push(SquadBuilder.SquadBuilders[2]);
         this.squadBuilders.push(SquadBuilder.SquadBuilders[3]);
         //  this.squadBuilders.push(SquadBuilder.SquadBuilders[4]);
         this.squadBuilders.push(SquadBuilder.findByNameAndYear("JMT", 2017));

         this.squadBuilders.forEach(function(squadBuilder)
         {
            this.sbToWinCount[squadBuilder] = 0;
            this.sbToLoseCount[squadBuilder] = 0;
            this.sbToTieCount[squadBuilder] = 0;
         }, this);
      }

      return InitialState;
   });

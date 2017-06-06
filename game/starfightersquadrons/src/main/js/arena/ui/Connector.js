define(["arena/ArenaData"],
   function(ArenaData)
   {
      "use strict";
      var Connector = {};

      Connector.ArenaTable = {
         mapStateToProps: function(state, ownProps)
         {
            var arenaData = [];

            state.squadBuilders.forEach(function(squadBuilder)
            {
               var key = squadBuilder.toString();
               var winCount = state.sbToWinCount[key];
               var loseCount = state.sbToLoseCount[key];
               var tieCount = state.sbToTieCount[key];
               arenaData.push(ArenaData.createArenaData(squadBuilder, winCount, loseCount, tieCount));
            });

            return (
            {
               rowData: arenaData,
            });
         },
      };

      return Connector;
   });

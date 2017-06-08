define(function()
{
   "use strict";
   var Connector = {};

   Connector.FilterUI = {
      mapStateToProps: function(state, ownProps)
      {
         return (
         {
            filters: state.filters,
         });
      }
   };

   Connector.SquadTable = {
      mapStateToProps: function(state, ownProps)
      {
         return (
         {
            filters: state.filters,
            rowData: state.filteredSquadData,
         });
      },
   };

   return Connector;
});

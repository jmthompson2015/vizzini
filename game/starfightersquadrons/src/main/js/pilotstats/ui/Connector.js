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

   Connector.PilotTable = {
      mapStateToProps: function(state, ownProps)
      {
         return (
         {
            isFilterShown: state.isFilterShown,
            filters: state.filters,
            rowData: state.filteredPilotData,
         });
      },
   };

   return Connector;
});

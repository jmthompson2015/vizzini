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

   Connector.AbilityTable = {
      mapStateToProps: function(state, ownProps)
      {
         return (
         {
            isFilterShown: state.isFilterShown,
            filters: state.filters,
            rowData: state.filteredAbilityData,
         });
      },
   };

   return Connector;
});

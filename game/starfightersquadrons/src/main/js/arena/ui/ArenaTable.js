define(["Team", "arena/ArenaColumns", "process/ui/FactionUI", "../../../../../../../coreweb/src/main/js/ui/DataTable"],
   function(Team, ArenaColumns, FactionUI, DataTable)
   {
      "use strict";

      var cellFunctions = {
         "factionKey": function(data)
         {
            var faction = Team.properties[data.factionKey];
            return React.createElement(FactionUI,
            {
               faction: faction,
               isSmall: true,
            });
         },
         "squadBuilder": function(data)
         {
            return data.squadBuilder.toString();
         },
      };

      var ArenaTable = React.createClass(
      {
         propTypes:
         {
            rowData: PropTypes.array.isRequired,
         },

         render: function()
         {
            var rowData = this.props.rowData;

            var table = React.createElement(DataTable,
            {
               columns: ArenaColumns,
               rowData: rowData,
               cellFunctions: cellFunctions,
            });

            var rows = [];
            rows.push(React.DOM.tr(
            {
               key: rows.length,
            }, React.DOM.td(
            {}, table)));

            return React.DOM.table(
            {}, React.DOM.tbody(
            {}, rows));
         },
      });

      return ArenaTable;
   });

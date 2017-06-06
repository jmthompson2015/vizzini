define(["arena/ArenaColumns", "../../../../../../../coreweb/src/main/js/ui/DataTable"],
   function(ArenaColumns, DataTable)
   {
      "use strict";

      var cellFunctions = {
         "squadBuilder": function(data)
         {
            return data.squadBuilder.toString();
         },
      };

      var ArenaTable = React.createClass(
      {
         propTypes:
         {
            rowData: React.PropTypes.array.isRequired,
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

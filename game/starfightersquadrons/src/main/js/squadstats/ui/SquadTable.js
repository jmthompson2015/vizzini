define(["Team", "squadstats/SquadColumns", "squadstats/ui/Connector", "squadstats/ui/FilterUI", "process/ui/FactionUI", "../../../../../../../coreweb/src/main/js/ui/DataTable"],
   function(Team, SquadColumns, Connector, FilterUI, FactionUI, DataTable)
   {
      "use strict";

      function createImageLink(src, href)
      {
         var image = React.DOM.img(
         {
            className: "imageBlock",
            src: src,
         });

         return React.DOM.a(
         {
            href: href,
            target: "_blank",
         }, image);
      }

      var cellFunctions = {
         "factionKey": function(data)
         {
            var faction = Team.properties[data.factionKey];
            return React.createElement(FactionUI,
            {
               faction: faction,
               imageBase: imageBase,
               isSmall: true,
            });
         },
         "ratioPrimaryWeaponAgility": function(data)
         {
            var value = data.ratioPrimaryWeaponAgility;
            return Math.vizziniFormat(value, 2);
         },
         "ratioSumStatsSquadPointCost": function(data)
         {
            var value = data.ratioSumStatsSquadPointCost;
            return Math.vizziniFormat(value, 4);
         },
      };

      var SquadTable = React.createClass(
      {
         contextTypes:
         {
            store: PropTypes.object.isRequired,
         },

         propTypes:
         {
            filters: PropTypes.object.isRequired,
            rowData: PropTypes.array.isRequired,
         },

         render: function()
         {
            var myRowData = [];

            this.props.rowData.forEach(function(pilot)
            {
               if (pilot.fore || pilot.aft)
               {
                  myRowData.push(pilot.fore);
                  myRowData.push(pilot.aft);
               }
               else
               {
                  myRowData.push(pilot);
               }
            });

            var connector = ReactRedux.connect(Connector.FilterUI.mapStateToProps)(FilterUI);
            var filterUI = React.createElement(ReactRedux.Provider,
            {
               store: this.context.store,
            }, React.createElement(connector));

            var table = React.createElement(DataTable,
            {
               columns: SquadColumns,
               rowData: myRowData,
               cellFunctions: cellFunctions,
            });

            var rows = [];
            rows.push(React.DOM.tr(
            {
               key: rows.length,
            }, React.DOM.td(
            {}, filterUI)));
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

      return SquadTable;
   });

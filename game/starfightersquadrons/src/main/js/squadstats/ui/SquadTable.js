define(["Team", "squadstats/Action", "squadstats/SquadColumns", "squadstats/ui/Connector", "squadstats/ui/FilterUI", "process/ui/FactionUI", "../../../../../../../coreweb/src/main/js/ui/DataTable"],
   function(Team, Action, SquadColumns, Connector, FilterUI, FactionUI, DataTable)
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
            isFilterShown: PropTypes.bool.isRequired,
            filters: PropTypes.object.isRequired,
            rowData: PropTypes.array.isRequired,
         },

         render: function()
         {
            var filterShownButton = React.DOM.button(
            {
               onClick: this.toggleFilterShownActionPerformed,
            }, (this.props.isFilterShown ? "Hide Filter" : "Show Filter"));

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
               className: "alignLeft",
            }, React.DOM.td(
            {}, filterShownButton)));

            if (this.props.isFilterShown)
            {
               var connector = ReactRedux.connect(Connector.FilterUI.mapStateToProps)(FilterUI);
               var filterUI = React.createElement(ReactRedux.Provider,
               {
                  store: this.context.store,
               }, React.createElement(connector));

               rows.push(React.DOM.tr(
               {
                  key: rows.length,
               }, React.DOM.td(
               {}, filterUI)));
            }

            rows.push(React.DOM.tr(
            {
               key: rows.length,
            }, React.DOM.td(
            {}, table)));

            return React.DOM.table(
            {}, React.DOM.tbody(
            {}, rows));
         },

         toggleFilterShownActionPerformed: function(event)
         {
            LOGGER.trace("SquadTable.toggleFilterShownActionPerformed() start");
            this.context.store.dispatch(Action.toggleFilterShown());
            LOGGER.trace("SquadTable.toggleFilterShownActionPerformed() end");
         },
      });

      return SquadTable;
   });

define(["Ship", "Team", "pilotstats/Action", "pilotstats/PilotColumns",
  "pilotstats/ui/Connector", "pilotstats/ui/FilterUI", "process/ui/FactionUI", "process/ui/ImplementedImage", "process/ui/ShipSilhouetteUI", "../../../../../../../coreweb/src/main/js/ui/DataTable"],
   function(Ship, Team, Action, PilotColumns,
      Connector, FilterUI, FactionUI, ImplementedImage, ShipSilhouetteUI, DataTable)
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
         "pilotName": function(data)
         {
            var src = "../resources/icons/Wikipedia16.png";
            var searchString = data.pilotName.replace(/ /g, "_");
            var href = "http://xwing-miniatures.wikia.com/wiki/" + searchString;
            var link = createImageLink(src, href);
            return React.DOM.span(
            {
               className: "textImageLink",
            }, data.pilotName, link);
         },
         "shipKey": function(data)
         {
            var src = "../resources/icons/Wikipedia16.png";
            var href = data.shipWikiUrl;
            if (!href)
            {
               var searchString = data.shipName + "_Expansion_Pack";
               searchString = searchString.replace(/ /g, "_");
               href = "http://xwing-miniatures.wikia.com/wiki/" + searchString;
            }
            var link = createImageLink(src, href);
            var silhouette = React.createElement(ShipSilhouetteUI,
            {
               ship: Ship.properties[data.shipKey],
               imageBase: imageBase,
               showName: true,
            });
            return React.DOM.span(
            {
               className: "textImageLink",
            }, silhouette, link);
         },
         "description": function(data)
         {
            var answer = data.description;
            if (data.isFlavorText)
            {
               answer = React.DOM.span(
               {
                  className: "flavorText",
               }, data.description);
            }
            return answer;
         },
         "isImplemented": function(data)
         {
            return React.createElement(ImplementedImage,
            {
               iconBase: iconBase,
               isImplemented: data.isImplemented,
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

      var PilotTable = React.createClass(
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
               columns: PilotColumns,
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
            LOGGER.trace("PilotTable.toggleFilterShownActionPerformed() start");
            this.context.store.dispatch(Action.toggleFilterShown());
            LOGGER.trace("PilotTable.toggleFilterShownActionPerformed() end");
         },
      });

      return PilotTable;
   });

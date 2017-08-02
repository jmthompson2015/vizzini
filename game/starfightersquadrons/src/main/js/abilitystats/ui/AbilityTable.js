define(["DamageCardTrait", "Event", "Phase", "Team", "UpgradeType", "abilitystats/AbilityColumns", "abilitystats/Action", "abilitystats/ui/Connector", "abilitystats/ui/FilterUI", "process/ui/FactionUI", "process/ui/UpgradeTypeUI", "../../../../../../../coreweb/src/main/js/ui/DataTable"],
   function(DamageCardTrait, Event, Phase, Team, UpgradeType, AbilityColumns, Action, Connector, FilterUI, FactionUI, UpgradeTypeUI, DataTable)
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

      var valueFunctions = {
         "name": function(data)
         {
            var answer = data.name;
            answer = answer.replace(/\"/, "");
            return answer;
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
         "event": function(data)
         {
            if (data.event)
            {
               var key = data.event.substring(data.event.indexOf(".") + 1);

               if (data.event.startsWith("Event"))
               {
                  var event = Event.properties[key];
                  if (event === undefined)
                  {
                     LOGGER.warn("Missing event for key = " + key);
                  }
                  return "Event" + String.pad(Event.values().indexOf(event.value), 2);
               }
               else if (data.event.startsWith("Phase"))
               {
                  var phase = Phase.properties[key];
                  if (phase === undefined)
                  {
                     LOGGER.warn("Missing phase for key = " + key);
                  }
                  return "Phase" + String.pad(Phase.values().indexOf(phase.value), 2);
               }
            }
            else
            {
               return data.event;
            }
         },
      };

      var cellFunctions = {
         "type": function(data)
         {
            var answer = data.type;
            if (DamageCardTrait.properties[data.type])
            {
               answer = DamageCardTrait.properties[data.type].name;
            }
            else if (Team.properties[data.type])
            {
               answer = React.createElement(FactionUI,
               {
                  faction: Team.properties[data.type],
                  imageBase: imageBase,
                  isSmall: true,
               });
            }
            else if (UpgradeType.properties[data.type])
            {
               answer = React.createElement(UpgradeTypeUI,
               {
                  upgradeType: UpgradeType.properties[data.type],
                  imageBase: imageBase,
               });
            }
            return answer;
         },
         "name": function(data)
         {
            var src = "../resources/icons/Wikipedia16.png";
            var searchString = data.name.replace(/ /g, "_");
            var href = "http://xwing-miniatures.wikia.com/wiki/" + searchString;
            var link = createImageLink(src, href);
            return React.DOM.span(
            {
               className: "textImageLink",
            }, data.name, link);
         },
         "event": function(data)
         {
            return data.event;
         },
         "isImplemented": function(data)
         {
            var implementedName = (data.isImplemented ? "accept" : "delete");
            var fileString = iconBase + implementedName + ".png";
            return React.DOM.img(
            {
               className: "isImplementedImage",
               src: fileString,
               title: data.isImplemented,
               value: implementedName,
            });
         },
      };

      var AbilityTable = React.createClass(
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
               columns: AbilityColumns,
               rowData: myRowData,
               cellFunctions: cellFunctions,
               valueFunctions: valueFunctions,
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
            LOGGER.trace("AbilityTable.toggleFilterShownActionPerformed() start");
            this.context.store.dispatch(Action.toggleFilterShown());
            LOGGER.trace("AbilityTable.toggleFilterShownActionPerformed() end");
         },
      });

      return AbilityTable;
   });

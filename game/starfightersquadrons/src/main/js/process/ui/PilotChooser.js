define(["Pilot", "process/ui/FactionUI"],
   function(Pilot, FactionUI)
   {
      "use strict";

      var PilotChooser = React.createClass(
      {
         propTypes:
         {
            imageBase: PropTypes.string.isRequired,
            onChange: PropTypes.func.isRequired,
            ship: PropTypes.object.isRequired,
            team: PropTypes.object.isRequired,

            index: PropTypes.number,
            initialPilot: PropTypes.object,
         },

         getInitialState: function()
         {
            var initialPilot = this.props.initialPilot;
            var pilotKey = (initialPilot !== undefined ? initialPilot.value : undefined);

            return (
            {
               pilotKey: pilotKey,
            });
         },

         PILOT_PROMPT: "Select a pilot",

         render: function()
         {
            var ship = this.props.ship;
            var team = this.props.team;
            var values = Pilot.valuesByShipAndTeam(ship.value, team.value);
            values.unshift(this.PILOT_PROMPT);

            var labelFunction = function(value)
            {
               var pilot = Pilot.properties[value];
               if (pilot && pilot.fore)
               {
                  return (pilot ? pilot.name + " [" + (pilot.fore.squadPointCost + pilot.aft.squadPointCost) + "]" : value);
               }
               else
               {
                  return (pilot ? pilot.name + " [" + pilot.squadPointCost + "]" : value);
               }
            };

            var pilotKey = this.state.pilotKey;
            var select = React.createElement(Select,
            {
               values: values,
               labelFunction: labelFunction,
               initialSelectedValue: pilotKey,
               onChange: this.pilotChanged,
               clientProps:
               {
                  "data-index": this.props.index,
               }
            });

            var pilot = Pilot.properties[pilotKey];

            if (pilot)
            {
               var image = React.createElement(FactionUI,
               {
                  faction: team,
                  isSmall: true,
               });

               return React.DOM.span(
               {}, image, select);
            }
            else
            {
               return select;
            }
         },

         pilotChanged: function(event)
         {
            var pilotKey = event.currentTarget.value;
            var index = parseInt(event.currentTarget.dataset.index);

            this.setState(
            {
               pilotKey: pilotKey,
            });

            var pilot = Pilot.properties[pilotKey];
            this.props.onChange(event, pilot, index);
         },
      });

      return PilotChooser;
   });

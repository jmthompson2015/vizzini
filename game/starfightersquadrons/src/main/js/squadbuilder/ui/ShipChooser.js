define(["Ship", "ShipTeam", "process/ui/ShipSilhouetteUI"],
   function(Ship, ShipTeam, ShipSilhouetteUI)
   {
      "use strict";

      var ShipChooser = React.createClass(
      {
         propTypes:
         {
            imageBase: PropTypes.string.isRequired,
            onChange: PropTypes.func.isRequired,
            team: PropTypes.object.isRequired,

            index: PropTypes.number,
            initialShip: PropTypes.object,
         },

         getInitialState: function()
         {
            var initialShip = this.props.initialShip;
            var shipKey = (initialShip !== undefined ? initialShip.value : undefined);

            return (
            {
               shipKey: shipKey,
            });
         },

         SHIP_PROMPT: "Select a ship",

         render: function()
         {
            var team = this.props.team;
            var values = ShipTeam.shipValuesByTeam(team.value);
            values.unshift(this.SHIP_PROMPT);

            var labelFunction = function(value)
            {
               var ship = Ship.properties[value];
               return (ship ? ship.name : value);
            };

            var shipKey = this.state.shipKey;
            var select = React.createElement(Select,
            {
               values: values,
               labelFunction: labelFunction,
               initialSelectedValue: shipKey,
               onChange: this.shipChanged,
               clientProps:
               {
                  "data-index": this.props.index,
               }
            });

            var ship = Ship.properties[shipKey];

            if (ship)
            {
               var image = React.createElement(ShipSilhouetteUI,
               {
                  ship: ship,
                  imageBase: this.props.imageBase,
               });

               return React.DOM.span(
               {}, image, select);
            }
            else
            {
               return select;
            }
         },

         shipChanged: function(event)
         {
            var shipKey = event.currentTarget.value;
            var index = parseInt(event.currentTarget.dataset.index);

            this.setState(
            {
               shipKey: shipKey,
            });

            var ship = Ship.properties[shipKey];
            this.props.onChange(event, ship, index);
         },
      });

      return ShipChooser;
   });

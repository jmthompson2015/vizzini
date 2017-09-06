define(["Maneuver", "Pilot", "Position", "ShipTeam",
  "process/ui/ManeuverChooser", "process/ui/ShipActionPanel", "process/ui/ShipSilhouetteUI", "process/ui/ShipUI"],
   function(Maneuver, Pilot, Position, ShipTeam,
      ManeuverChooser, ShipActionPanel, ShipSilhouetteUI, ShipUI)
   {
      "use strict";

      var ShipCardUI = React.createClass(
      {
         propTypes:
         {
            agent: PropTypes.object.isRequired,
            imageBase: PropTypes.string.isRequired,
            shipTeam: PropTypes.object.isRequired,
         },

         render: function()
         {
            var agent = this.props.agent;
            var shipTeam = this.props.shipTeam;
            var imageBase = this.props.imageBase;
            var imageBase2 = imageBase + "ship/";

            var cell0, cell1, cell2, cell3;

            var filename = imageBase2 + shipTeam.image;
            var shipTeamKey = shipTeam.value;
            var pilotKey = Pilot.valuesByShipTeam(shipTeamKey)[0];

            var images = [];
            images.push(this.createShipImage(shipTeamKey));

            if (shipTeamKey === ShipTeam.IMPERIAL_TIE_BOMBER)
            {
               images.push(this.createShipImage(ShipTeam.IMPERIAL_TIE_BOMBER_V2));
            }
            else if (shipTeamKey === ShipTeam.IMPERIAL_TIE_DEFENDER)
            {
               images.push(this.createShipImage(ShipTeam.IMPERIAL_TIE_DEFENDER_V2));
            }
            else if (shipTeamKey === ShipTeam.IMPERIAL_TIE_INTERCEPTOR)
            {
               images.push(this.createShipImage(ShipTeam.IMPERIAL_TIE_INTERCEPTOR_V2));
               images.push(this.createShipImage(ShipTeam.IMPERIAL_TIE_INTERCEPTOR_V3));
            }
            else if (shipTeamKey === ShipTeam.REBEL_A_WING)
            {
               images.push(this.createShipImage(ShipTeam.REBEL_A_WING_V2));
            }
            else if (shipTeamKey === ShipTeam.REBEL_B_WING)
            {
               images.push(this.createShipImage(ShipTeam.REBEL_B_WING_V2));
            }
            else if (shipTeamKey === ShipTeam.SCUM_M3_A_INTERCEPTOR)
            {
               images.push(this.createShipImage(ShipTeam.SCUM_M3_A_INTERCEPTOR_V2));
            }
            else if (shipTeamKey === ShipTeam.RESISTANCE_T_70_X_WING)
            {
               images.push(this.createShipImage(ShipTeam.RESISTANCE_T_70_X_WING_V2));
            }

            var silhouette = React.createElement(ShipSilhouetteUI,
            {
               ship: shipTeam.ship,
               imageBase: imageBase,
               showName: true,
            });

            var shipActionPanel0, shipActionPanel1;

            if (shipTeamKey === ShipTeam.IMPERIAL_RAIDER_CLASS_CORVETTE ||
               shipTeamKey === ShipTeam.REBEL_CR90_CORVETTE)
            {
               shipActionPanel0 = React.createElement(ShipActionPanel,
               {
                  imageBase: imageBase,
                  shipActionKeys: shipTeam.ship.fore.shipActionKeys,
               });
               shipActionPanel1 = React.createElement(ShipActionPanel,
               {
                  imageBase: imageBase,
                  shipActionKeys: shipTeam.ship.aft.shipActionKeys,
               });
            }
            else
            {
               shipActionPanel0 = React.createElement(ShipActionPanel,
               {
                  imageBase: imageBase,
                  shipActionKeys: shipTeam.ship.shipActionKeys,
               });
            }

            var maneuverKeys = shipTeam.ship.maneuverKeys;
            var maneuvers = maneuverKeys.map(function(maneuverKey)
            {
               return Maneuver.properties[maneuverKey];
            });
            var chooser = React.createElement(ManeuverChooser,
            {
               imageBase: imageBase,
               isEditable: false,
               shipName: shipTeam.ship.name,
               maneuvers: maneuvers,
            });

            cell0 = React.DOM.td(
            {
               key: "image" + shipTeamKey,
               className: "galleryCell",
            }, images);
            cell1 = React.DOM.td(
            {
               key: "name" + shipTeamKey,
               className: "galleryCell"
            }, silhouette);

            if (shipActionPanel1 !== undefined)
            {
               cell2 = React.DOM.td(
               {
                  key: "actions" + shipTeamKey,
                  className: "galleryCell colorWhite"
               }, React.DOM.table(
               {
                  className: "alignCenter",
               }, React.DOM.tbody(
               {}, React.DOM.tr(
                  {}, React.DOM.td(
                  {}, "Fore"), React.DOM
                  .td(
                  {}, shipActionPanel0)), React.DOM.tr(
                  {}, React.DOM.td(
                  {}, "Aft"),
                  React.DOM.td(
                  {}, shipActionPanel1)))));
            }
            else
            {
               cell2 = React.DOM.td(
               {
                  key: "actions" + shipTeamKey,
                  className: "galleryCell"
               }, shipActionPanel0);
            }

            cell3 = React.DOM.td(
            {
               key: "maneuvers" + shipTeamKey,
               className: "galleryCell alignBottom"
            }, chooser);

            var rows = [];
            rows.push(React.DOM.tr(
            {
               key: rows.length,
            }, cell0));
            rows.push(React.DOM.tr(
            {
               key: rows.length,
               className: "galleryShipName"
            }, cell1));
            rows.push(React.DOM.tr(
            {
               key: rows.length,
            }, cell2));
            rows.push(React.DOM.tr(
            {
               key: rows.length,
            }, cell3));

            return React.DOM.table(
            {
               key: this.props.myKey,
               className: "galleryTable",
            }, React.DOM.tbody(
            {}, rows));
         },

         createShipImage: function(shipTeamKey)
         {
            var shipTeam = ShipTeam.properties[shipTeamKey];
            var shipBase = shipTeam.ship.shipBase;
            var position = new Position(shipBase.width / 2, shipBase.height / 2, 0);

            return React.createElement(ShipUI,
            {
               key: shipTeamKey + shipBase.value + position.toString(),
               canvasId: shipTeam.name,
               imageBase: this.props.imageBase,
               position: position,
               shipTeam: shipTeam,
            });
         },
      });

      return ShipCardUI;
   });

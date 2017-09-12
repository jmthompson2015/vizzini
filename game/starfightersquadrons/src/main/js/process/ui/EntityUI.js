define(["DamageCard", "DiceModification", "Maneuver", "Pilot", "Ship", "ShipAction", "UpgradeCard",
  "process/ui/FactionUI", "process/ui/ImplementedImage", "process/ui/ShipActionUI", "process/ui/ShipSilhouetteUI", "process/ui/UpgradeTypeUI"],
   function(DamageCard, DiceModification, Maneuver, Pilot, Ship, ShipAction, UpgradeCard,
      FactionUI, ImplementedImage, ShipActionUI, ShipSilhouetteUI, UpgradeTypeUI)
   {
      var EntityUI = React.createClass(
      {
         render: function()
         {
            var showIcon = this.props.showIcon;
            var showLabel = this.props.showLabel;
            var showImplemented = this.props.showImplemented;
            var cells = [];

            if (showIcon)
            {
               var icon = this.createIcon();
               cells.push(React.DOM.div(
               {
                  key: "iconPanel",
                  className: "iconPanel",
               }, icon));
            }

            if (showLabel)
            {
               var label = this.createLabel();
               cells.push(React.DOM.div(
               {
                  key: "labelPanel",
                  className: "labelPanel",
               }, label));
            }

            if (showImplemented)
            {
               var implementedImage = this.createImplementedImage();
               cells.push(React.DOM.div(
               {
                  key: "implementedPanel",
                  className: "implementedPanel",
               }, implementedImage));
            }

            return React.DOM.div(
            {
               className: this.props.panelClass,
            }, cells);
         },

         createIcon: function()
         {
            var entity = this.props.entity;
            var imageBase = this.props.imageBase;
            var type = entity.vizziniType;
            var key = "iconCell";
            var className = "icon";
            var answer;

            switch (type)
            {
               case DamageCard:
                  var filename = imageBase + "pilotCard/CriticalDamage24.jpg";
                  answer = React.DOM.img(
                  {
                     key: key,
                     className: className,
                     src: filename,
                     title: "Critical Damage",
                  });
                  break;
               case DiceModification:
                  answer = React.createElement(ShipActionUI,
                  {
                     key: key,
                     className: className,
                     imageBase: imageBase,
                     shipAction: entity.shipAction,
                  });
                  break;
               case Pilot:
                  answer = React.createElement(FactionUI,
                  {
                     key: key,
                     className: className,
                     faction: entity.shipTeam.team,
                     imageBase: imageBase,
                     isSmall: true,
                  });
                  break;
               case Ship:
                  answer = React.createElement(ShipSilhouetteUI,
                  {
                     key: key,
                     className: className,
                     imageBase: imageBase,
                     ship: entity,
                  });
                  break;
               case ShipAction:
                  answer = React.createElement(ShipActionUI,
                  {
                     key: key,
                     className: className,
                     imageBase: imageBase,
                     shipAction: entity,
                  });
                  break;
               case UpgradeCard:
                  answer = React.createElement(UpgradeTypeUI,
                  {
                     key: key,
                     className: className,
                     imageBase: imageBase,
                     upgradeType: entity.type,
                  });
                  break;
               default:
                  throw "EntityUI: Unknown entity type: " + type;
            }

            return answer;
         },

         createImplementedImage: function()
         {
            var answer;
            var entity = this.props.entity;
            var type = entity.vizziniType;

            switch (type)
            {
               case DamageCard:
               case DiceModification:
               case Pilot:
               case ShipAction:
               case UpgradeCard:
                  var isImplemented = (entity.isImplemented !== undefined ? entity.isImplemented : false);
                  answer = React.createElement(ImplementedImage,
                  {
                     key: "implementedCell",
                     className: "implemented",
                     iconBase: this.props.iconBase,
                     isImplemented: isImplemented,
                  });
                  break;
               case Ship:
                  break;
               default:
                  throw "EntityUI: Unknown entity type: " + type;
            }

            return answer;
         },

         createLabel: function()
         {
            var entity = this.props.entity;
            var type = entity.vizziniType;
            var title = this.createTitle();
            var name;

            switch (type)
            {
               case DamageCard:
               case DiceModification:
               case Ship:
                  name = entity.name;
                  break;
               case ShipAction:
                  var context = this.props.context;
                  name = this.createShipActionLabel(entity, context);
                  break;
               case Pilot:
                  name = (entity.parent ? entity.name : type.getName(entity.value));
                  break;
               case UpgradeCard:
                  name = type.getName(entity.value);
                  break;
               default:
                  throw "EntityUI: Unknown entity type: " + type;
            }

            return React.DOM.span(
            {
               key: "labelCell",
               className: "label",
               title: title,
            }, name);
         },

         createShipActionLabel: function(shipAction, context)
         {
            var answer;
            var maneuverKey = (context !== undefined ? context.maneuverKey : undefined);
            var maneuver = (maneuverKey !== undefined ? Maneuver.properties[maneuverKey] : undefined);
            var token = (context !== undefined ? context.token : undefined);
            var defender = (context !== undefined ? context.defender : undefined);

            switch (shipAction.value)
            {
               case ShipAction.BARREL_ROLL:
                  answer = maneuver.bearing.name;
                  break;
               case ShipAction.BOOST:
                  var parts = maneuver.bearing.name.split(" ");
                  answer = "Boost " + parts[parts.length - 1];
                  break;
               case ShipAction.COORDINATE:
                  answer = "Coordinate: " + token.name();
                  break;
               case ShipAction.DECLOAK:
                  answer = "Decloak: " + maneuver.bearing.name + " " + maneuver.speed;
                  break;
               case ShipAction.JAM:
                  answer = "Jam: " + defender.name();
                  break;
               case ShipAction.RECOVER:
                  answer = "Recover" + (token.parent !== undefined ? ": " + token.name() : "");
                  break;
               case ShipAction.REINFORCE:
                  answer = "Reinforce" + (token.parent !== undefined ? ": " + token.name() : "");
                  break;
               case ShipAction.SLAM:
                  answer = "SLAM: " + maneuver.bearing.name + " " + maneuver.speed;
                  break;
               case ShipAction.TARGET_LOCK:
                  answer = "Target Lock: " + defender.name();
                  break;
               default:
                  answer = shipAction.name;
            }

            return answer;
         },

         createTitle: function()
         {
            var answer = "";
            var entity = this.props.entity;
            var type = entity.vizziniType;

            switch (type)
            {
               case DamageCard:
                  answer = entity.description;
                  if (entity.hasAction)
                  {
                     answer += " Action: ";
                     answer += entity.actionDescription;
                  }
                  break;
               case DiceModification:
               case Pilot:
                  answer = entity.description;
                  break;
               case UpgradeCard:
                  if (entity.header)
                  {
                     answer = entity.header.name + ": ";
                  }
                  answer += entity.description;
                  break;
               case Ship:
               case ShipAction:
                  break;
               default:
                  throw "EntityUI: Unknown entity type: " + type;
            }

            return answer;
         }
      });

      EntityUI.propTypes = {
         entity: PropTypes.object.isRequired,
         iconBase: PropTypes.string.isRequired,
         imageBase: PropTypes.string.isRequired,

         context: PropTypes.object,
         panelClass: PropTypes.string,
         showIcon: PropTypes.bool,
         showLabel: PropTypes.bool,
         showImplemented: PropTypes.bool,
      };

      EntityUI.defaultProps = {
         panelClass: "entityUI",
         showIcon: true,
         showLabel: true,
         showImplemented: true,
      };

      return EntityUI;
   });

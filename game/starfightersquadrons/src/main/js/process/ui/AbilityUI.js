define(["Maneuver", "ShipAction", "process/ui/FactionUI", "process/ui/ShipActionUI", "process/ui/UpgradeTypeUI"],
   function(Maneuver, ShipAction, FactionUI, ShipActionUI, UpgradeTypeUI)
   {
      var AbilityUI = {};

      AbilityUI.Damage = React.createClass(
      {
         propTypes:
         {
            damage: PropTypes.object.isRequired,
            imageBase: PropTypes.string.isRequired,

            // default: damage value
            myKey: PropTypes.string,
         },

         render: function()
         {
            var damage = this.props.damage;
            var imageBase = this.props.imageBase;

            var myKey = (this.props.myKey !== undefined ? this.props.myKey : damage.value);
            var filename = imageBase + "pilotCard/CriticalDamage24.jpg";
            var icon = React.DOM.img(
            {
               src: filename,
               className: "damageAbilityUIImage",
               title: "Critical Damage",
            });

            var title = damage.description;

            if (damage.hasAction)
            {
               title += " Action: ";
               title += damage.actionDescription;
            }

            var label = React.DOM.span(
            {
               title: title,
            }, damage.name);

            return React.DOM.span(
            {
               key: myKey,
            }, icon, " ", label);
         },
      });

      AbilityUI.Pilot = React.createClass(
      {
         propTypes:
         {
            pilot: PropTypes.object.isRequired,
            imageBase: PropTypes.string.isRequired,

            // default: pilot value
            myKey: PropTypes.string,
         },

         render: function()
         {
            var pilot = this.props.pilot;
            var imageBase = this.props.imageBase;

            var myKey = (this.props.myKey !== undefined ? this.props.myKey : pilot.value);
            var icon = React.createElement(FactionUI,
            {
               faction: pilot.shipTeam.team,
               imageBase: imageBase,
               isSmall: true,
            });

            var title = pilot.description;

            var label = React.DOM.span(
            {
               title: pilot.description,
            }, pilot.name);

            return React.DOM.span(
            {
               key: myKey,
               className: this.props.panelClass,
               style: this.props.panelStyle,
            }, icon, " ", label);
         },
      });

      AbilityUI.ShipAction = React.createClass(
      {
         propTypes:
         {
            shipAction: PropTypes.object.isRequired,
            imageBase: PropTypes.string.isRequired,

            context: PropTypes.object,
            // default: shipAction value
            myKey: PropTypes.string,
         },

         render: function()
         {
            var shipAction = this.props.shipAction;
            var context = this.props.context;
            var imageBase = this.props.imageBase;

            var myKey = (this.props.myKey !== undefined ? this.props.myKey : shipAction.value);
            var icon = React.createElement(ShipActionUI,
            {
               shipAction: shipAction,
               imageBase: imageBase,
            });

            var title = (shipAction.description !== undefined ? shipAction.description : "");

            var labelString = createLabelString();
            var label = React.DOM.span(
            {
               title: title,
            }, labelString);

            return React.DOM.span(
            {
               key: myKey,
               className: this.props.panelClass,
               style: this.props.panelStyle,
            }, icon, " ", label);

            function createLabelString()
            {
               var answer;
               var maneuverKey = (context !== undefined ? context.maneuverKey : undefined);
               var maneuver = (maneuverKey !== undefined ? Maneuver.properties[maneuverKey] : undefined);
               var token = (context !== undefined ? context.token : undefined);
               var defender = (context !== undefined ? context.defender : undefined);

               switch (shipAction.value)
               {
                  case ShipAction.BARREL_ROLL:
                     answer = Maneuver.properties[maneuverKey].bearing.name;
                     break;
                  case ShipAction.BOOST:
                     var parts = Maneuver.properties[maneuverKey].bearing.name.split(" ");
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
            }
         },
      });

      AbilityUI.Upgrade = React.createClass(
      {
         propTypes:
         {
            upgrade: PropTypes.object.isRequired,
            imageBase: PropTypes.string.isRequired,

            // default: upgrade value
            myKey: PropTypes.string,
         },

         render: function()
         {
            var upgrade = this.props.upgrade;
            var imageBase = this.props.imageBase;

            var myKey = (this.props.myKey !== undefined ? this.props.myKey : upgrade.value);
            var icon = React.createElement(UpgradeTypeUI,
            {
               upgradeType: upgrade.type,
               imageBase: imageBase,
            });

            var title = "";

            if (upgrade.header)
            {
               title = upgrade.header.name + ": ";
            }

            title += upgrade.description;

            var label = React.DOM.span(
            {
               title: title,
            }, upgrade.name);

            return React.DOM.span(
            {
               key: myKey,
               className: this.props.panelClass,
               style: this.props.panelStyle,
            }, icon, " ", label);
         },
      });

      return AbilityUI;
   });

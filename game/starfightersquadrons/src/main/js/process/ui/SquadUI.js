define(["ShipState", "Team", "UpgradeCard",
  "process/ui/EntityUI", "process/ui/ImplementedImage", "process/ui/ShipStateUI",
  "squadbuilder/SquadColumns"],
   function(ShipState, Team, UpgradeCard,
      EntityUI, ImplementedImage, ShipStateUI,
      SquadColumns)
   {
      "use strict";
      var SquadUI = React.createClass(
      {
         propTypes:
         {
            iconBase: PropTypes.string.isRequired,
            imageBase: PropTypes.string.isRequired,
            squad: PropTypes.object.isRequired,
         },

         render: function()
         {
            LOGGER.trace("SquadUI.render()");

            var imageBase = this.props.imageBase;
            var squad = this.props.squad;
            var team = Team.properties[squad.factionKey()];
            var tokens = squad.tokens();
            var rows = [];
            rows.push(this.createHeaderRow("row" + rows.length));

            tokens.forEach(function(token, i)
            {
               var pilot = token.pilot();
               var ship = pilot.shipTeam.ship;
               rows.push(this.createShipRow(ship, i, "row" + rows.length));

               var upgradeKeys;

               if (pilot.fore)
               {
                  rows.push(this.createPilotRow(ship, pilot.fore, i, "row" + rows.length));
                  upgradeKeys = token.tokenFore().upgradeKeys();

                  upgradeKeys.forEach(function(upgradeKey, j)
                  {
                     var upgradeCard = UpgradeCard.properties[upgradeKey];
                     rows.push(this.createUpgradeTypeRow(upgradeCard, j, "row" + rows.length));
                  }, this);

                  rows.push(this.createPilotRow(ship, pilot.aft, i, "row" + rows.length));
                  upgradeKeys = token.tokenAft().upgradeKeys();

                  upgradeKeys.forEach(function(upgradeKey, j)
                  {
                     var upgradeCard = UpgradeCard.properties[upgradeKey];
                     rows.push(this.createUpgradeTypeRow(upgradeCard, j, "row" + rows.length));
                  }, this);
               }
               else
               {
                  rows.push(this.createPilotRow(ship, pilot, i, "row" + rows.length));
                  upgradeKeys = token.upgradeKeys();

                  upgradeKeys.forEach(function(upgradeKey, j)
                  {
                     var upgradeCard = UpgradeCard.properties[upgradeKey];
                     rows.push(this.createUpgradeTypeRow(upgradeCard, j, "row" + rows.length));
                  }, this);
               }
            }, this);

            rows.push(this.createFooterRow("row" + rows.length));

            var squadUI = React.DOM.table(
            {
               className: "squadUI",
            }, React.DOM.tbody(
            {}, rows));

            LOGGER.trace("SquadUI.render() end");

            return squadUI;
         },

         createCell: function(key, className, value)
         {
            return React.DOM.td(
            {
               key: key,
               className: className,
            }, (value !== undefined ? value : ""));
         },

         createFooterRow: function(key)
         {
            var cells = [];
            var squad = this.props.squad;

            SquadColumns.forEach(function(column)
            {
               var value = 0;
               var className = "squadUISum";

               switch (column.key)
               {
                  case "pilot":
                     value = "Totals";
                     className += " alignRight";
                     break;
                  case "isImplemented":
                     value = undefined;
                     break;
                  default:
                     if (squad)
                     {
                        var valueFunction = squad[column.key];
                        value = valueFunction.apply(squad);
                     }
                     className += " alignRight";
               }

               cells.push(this.createCell("footerCell" + cells.length, className, value));
            }, this);

            return React.DOM.tr(
            {
               key: key,
            }, cells);
         },

         createHeaderCell: function(key, className, value)
         {
            return React.DOM.th(
            {
               key: key,
               className: className,
            }, (value !== undefined ? value : ""));
         },

         createHeaderRow: function(key)
         {
            var cells = [];
            var squad = this.props.squad;
            var team = Team.properties[squad.factionKey()];

            SquadColumns.forEach(function(column)
            {
               var value, className;

               switch (column.key)
               {
                  case "pilot":
                  case "isImplemented":
                  case "pilotSkillValue":
                  case "squadPointCost":
                     value = column.label;
                     break;
                  default:
                     var shipStateKey = column.key.substring(0, column.key.length - "Value".length);
                     value = React.createElement(ShipStateUI,
                     {
                        faction: team,
                        imageBase: this.props.imageBase,
                        shipState: ShipState.properties[shipStateKey],
                     });
                     className = "alignCenter";
               }
               cells.push(this.createHeaderCell("headerCell" + cells.length, className, value));
            }, this);

            return React.DOM.tr(
            {
               key: key,
            }, cells);
         },

         createPilotRow: function(ship, pilot, index, rowKey)
         {
            InputValidator.validateNotNull("ship", ship);
            InputValidator.validateNotNull("pilot", pilot);
            InputValidator.validateIsNumber("index", index);
            InputValidator.validateNotNull("rowKey", rowKey);

            var team = (pilot ? pilot.shipTeam.team : this.props.team);
            var pilotUI = React.createElement(EntityUI,
            {
               entity: pilot,
               iconBase: this.props.iconBase,
               imageBase: this.props.imageBase,
               showImplemented: false,
            });

            var cells = [];
            var isImplemented = (pilot ? (pilot.isImplemented === true) : undefined);

            SquadColumns.forEach(function(column)
            {
               var value;

               switch (column.key)
               {
                  case "pilot":
                     value = pilotUI;
                     break;
                  case "isImplemented":
                     value = React.createElement(ImplementedImage,
                     {
                        iconBase: this.props.iconBase,
                        isImplemented: isImplemented,
                     });
                     break;
                  default:
                     if (!ship.fore)
                     {
                        value = (pilot[column.key] !== undefined ? pilot[column.key] : ship[column.key]);
                     }
                     else if (ship.fore && !pilot.parent)
                     {
                        value = (pilot[column.key] !== undefined ? pilot[column.key] : ship.fore[column.key]);
                     }
                     else
                     {
                        var myShip;
                        if (pilot.value.endsWith(".fore"))
                        {
                           myShip = ship.fore;
                        }
                        else if (pilot.value.endsWith(".aft"))
                        {
                           myShip = ship.aft;
                        }
                        value = (pilot[column.key] !== undefined ? pilot[column.key] : myShip[column.key]);
                     }
               }

               cells.push(this.createCell("pilotCell" + cells.length + (pilot ? pilot.value : ""), column.className, value));
            }, this);

            return React.DOM.tr(
            {
               key: rowKey,
            }, cells);
         },

         createShipRow: function(ship, index, rowKey)
         {
            InputValidator.validateNotNull("ship", ship);
            InputValidator.validateIsNumber("index", index);
            InputValidator.validateNotNull("rowKey", rowKey);

            var shipUI = React.createElement(EntityUI,
            {
               entity: ship,
               iconBase: this.props.iconBase,
               imageBase: this.props.imageBase,
               showImplemented: false,
            });

            var cells = [];

            SquadColumns.forEach(function(column)
            {
               var value;

               switch (column.key)
               {
                  case "pilot":
                     value = shipUI;
                     break;
               }

               cells.push(this.createCell("shipCell" + cells.length + (ship ? ship.value : ""), "backgroundMedium " + column.className, value));
            }, this);

            return React.DOM.tr(
            {
               key: rowKey,
            }, cells);
         },

         createUpgradeTypeRow: function(upgradeCard, upgradeIndex, rowKey)
         {
            InputValidator.validateNotNull("upgradeCard", upgradeCard);
            InputValidator.validateIsNumber("upgradeIndex", upgradeIndex);
            InputValidator.validateNotNull("rowKey", rowKey);

            var upgradeUI = React.createElement(EntityUI,
            {
               entity: upgradeCard,
               iconBase: this.props.iconBase,
               imageBase: this.props.imageBase,
               showImplemented: false,
            });

            var cells = [];
            var isImplemented = (upgradeCard ? (upgradeCard.isImplemented === true) : undefined);

            SquadColumns.forEach(function(column)
            {
               var value;

               switch (column.key)
               {
                  case "pilot":
                     value = upgradeUI;
                     break;
                  case "isImplemented":
                     value = React.createElement(ImplementedImage,
                     {
                        iconBase: this.props.iconBase,
                        isImplemented: isImplemented,
                     });
                     break;
                  default:
                     value = (upgradeCard && upgradeCard[column.key] !== undefined ? upgradeCard[column.key] : undefined);
               }
               cells.push(this.createCell("upgradeCell" + cells.length + upgradeCard.value, column.className, value));
            }, this);

            return React.DOM.tr(
            {
               key: rowKey,
            }, cells);
         },
      });

      return SquadUI;
   });

define(["Count", "DamageCard", "ShipState", "UpgradeCard",
  "process/TargetLock",
  "process/ui/EntityUI", "process/ui/FactionUI", "process/ui/LabeledImage", "process/ui/ShipStateUI"],
   function(Count, DamageCard, ShipState, UpgradeCard,
      TargetLock,
      EntityUI, FactionUI, LabeledImage, ShipStateUI)
   {
      "use strict";
      var PilotCardCompactUI = React.createClass(
      {
         propTypes:
         {
            iconBase: PropTypes.string.isRequired,
            imageBase: PropTypes.string.isRequired,
            token: PropTypes.object.isRequired,
         },

         render: function()
         {
            var token = this.props.token;
            var myToken, myTokenAft;

            if (token.tokenFore && token.tokenAft)
            {
               myToken = token.tokenFore();
               myTokenAft = token.tokenAft();
            }
            else
            {
               myToken = token;
            }

            var rows = [];

            var colSpan0 = (myTokenAft ? 2 : 1);
            var cell1 = createCell(React.DOM.div(
            {
               className: "pilotCardStatsTable",
            }, this.createStatsPanel(myToken)), "statsPanel0", "pilotCardStatsPanel");
            var cell2 = createCell(this.createUpgradesPanel(myToken), "upgradesPanel0", "pilotCardUpgradesPanel");
            var cell3 = createCell(React.DOM.div(
            {
               className: "pilotCardTokensTable",
            }, this.createTokensPanel(myToken)), "tokensPanel0", "pilotCardTokensPanel");
            var cell4 = createCell(this.createCriticalDamagesPanel(myToken), "damagesPanel0", "pilotCardCriticalDamagesPanel");

            rows.push(React.DOM.tr(
            {
               key: "nameRow",
            }, React.DOM.td(
            {
               colSpan: colSpan0,
            }, this.createNamePanel(token, myToken, myTokenAft))));

            if (myTokenAft)
            {
               var cell11 = createCell(React.DOM.div(
               {
                  className: "pilotCardStatsTable",
               }, this.createStatsPanel(myTokenAft)), "statsPanel1", "pilotCardStatsPanel");
               var cell22 = createCell(this.createUpgradesPanel(myTokenAft), "upgradesPanel1", "pilotCardUpgradesPanel");
               var cell44 = createCell(this.createCriticalDamagesPanel(myTokenAft), "damagesPanel1", "pilotCardCriticalDamagesPanel");
               var cell33 = createCell(React.DOM.div(
               {
                  className: "pilotCardTokensTable",
               }, this.createTokensPanel(myTokenAft)), "tokensPanel1", "pilotCardTokensPanel");

               rows.push(createRow([cell1, cell11], "statsRow"));
               rows.push(createRow([cell2, cell22], "upgradeRow"));
               rows.push(createRow([cell3, cell33], "tokenRow"));
               rows.push(createRow([cell4, cell44], "damageRow"));
            }
            else
            {
               rows.push(createRow(cell1, "statsRow"));
               rows.push(createRow(cell2, "upgradeRow"));
               rows.push(createRow(cell3, "tokenRow"));
               rows.push(createRow(cell4, "damageRow"));
            }

            var key = "mainTable" + token.id();

            return createTable(rows, key, "pilotCard");
         },

         createCriticalDamagesPanel: function(token, key, className)
         {
            return React.createElement(CriticalDamagesPanel,
            {
               key: key,
               className: className,
               iconBase: this.props.iconBase,
               imageBase: this.props.imageBase,
               token: token,
            });
         },

         createNamePanel: function(token, myToken, myTokenAft)
         {
            var state = token.store().getState();

            return React.createElement(NamePanel,
            {
               pilotSkillValue: myToken.pilotSkillValue(),
               pilotName: token.pilotName(),
               pilotDescription: (token.pilot().isFlavorText ? undefined : token.pilot().description),
               shipName: (myTokenAft ? myToken.ship().name : token.shipName()),
               team: token.pilot().shipTeam.team,
               pilotAftSkillValue: (myTokenAft ? myTokenAft.pilotSkillValue() : undefined),
               shipAftName: (myTokenAft ? myTokenAft.ship().name : undefined),
               imageBase: this.props.imageBase,
            });
         },

         createStatsPanel: function(token)
         {
            return React.createElement(StatsPanel,
            {
               imageBase: this.props.imageBase,
               token: token,
            });
         },

         createTokensPanel: function(token)
         {
            return React.createElement(TokensPanel,
            {
               imageBase: this.props.imageBase,
               token: token,
            });
         },

         createUpgradesPanel: function(token)
         {
            return React.createElement(UpgradesPanel,
            {
               iconBase: this.props.iconBase,
               imageBase: this.props.imageBase,
               token: token,
            });
         },
      });

      var CriticalDamagesPanel = React.createClass(
      {
         propTypes:
         {
            iconBase: PropTypes.string.isRequired,
            imageBase: PropTypes.string.isRequired,
            token: PropTypes.object.isRequired,
         },

         render: function()
         {
            var token = this.props.token;

            var rows = [];

            token.criticalDamageKeys().forEach(function(damageKey, i)
            {
               var damage = DamageCard.properties[damageKey];
               var element = React.createElement(EntityUI,
               {
                  entity: damage,
                  iconBase: this.props.iconBase,
                  imageBase: this.props.imageBase,
               });
               var cellKey = damage.value + i;
               var className = "pilotCardCriticalDamageCell";
               var cell = createCell(element, cellKey, className);
               var rowKey = cellKey;
               rows.push(createRow(cell, rowKey));
            }, this);

            return createTable(rows, "damagesTable", "pilotCardCriticalDamagesTable");
         }
      });

      var NamePanel = React.createClass(
      {
         propTypes:
         {
            imageBase: PropTypes.string.isRequired,
            pilotSkillValue: PropTypes.number.isRequired,
            pilotName: PropTypes.string.isRequired,
            shipName: PropTypes.string.isRequired,
            team: PropTypes.object.isRequired,

            pilotAftSkillValue: PropTypes.number,
            pilotDescription: PropTypes.string,
            shipAftName: PropTypes.string,
         },

         render: function()
         {
            var rows = [];
            var cells = [];

            var image = React.createElement(ShipStateUI,
            {
               shipState: ShipState.properties[ShipState.PILOT_SKILL],
               faction: this.props.team,
               imageBase: this.props.imageBase,
               label: String(this.props.pilotSkillValue),
               labelClass: "pilotSkillValue",
               showOne: true,
            });
            var description = (this.props.pilotDescription ? this.props.pilotDescription : "Name");

            cells.push(React.DOM.td(
            {
               key: cells.length,
               rowSpan: 2,
            }, image));
            cells.push(React.DOM.td(
            {
               key: cells.length,
               title: description,
               className: "pilotCardNameCell",
               colSpan: (this.props.shipAftName ? 2 : 1),
            }, this.props.pilotName));

            if (this.props.pilotAftSkillValue)
            {
               image = React.createElement(ShipStateUI,
               {
                  shipState: ShipState.properties[ShipState.PILOT_SKILL],
                  faction: this.props.team,
                  imageBase: this.props.imageBase,
                  label: String(this.props.pilotAftSkillValue),
                  labelClass: "pilotSkillValue",
               });
               cells.push(React.DOM.td(
               {
                  key: cells.length,
                  rowSpan: 2,
               }, image));
            }

            var factionImage = React.createElement(FactionUI,
            {
               faction: this.props.team,
            });
            cells.push(React.DOM.td(
            {
               key: cells.length,
               rowSpan: 2,
            }, factionImage));
            rows.push(createRow(cells, rows.length));

            cells = [];
            if (this.props.shipAftName)
            {
               cells.push(createCell(this.props.shipName, cells.length, "pilotCardNameCell", "Ship"));
               cells.push(createCell(this.props.shipAftName, cells.length, "pilotCardNameCell", "Ship"));
            }
            else
            {
               cells.push(createCell(this.props.shipName, cells.length, "pilotCardNameCell", "Ship"));
            }
            rows.push(createRow(cells, rows.length));

            return createTable(rows, "nameTable", "pilotCardNameTable");
         },
      });

      var StatsPanel = React.createClass(
      {
         propTypes:
         {
            imageBase: PropTypes.string.isRequired,
            token: PropTypes.object.isRequired,
         },

         render: function()
         {
            var myToken = this.props.token;
            var store = myToken.store();
            var faction = myToken.pilot().shipTeam.team;
            var cells = [];
            var shipStateKeys = [ShipState.PRIMARY_WEAPON, ShipState.ENERGY, ShipState.AGILITY, ShipState.HULL, ShipState.SHIELD];

            shipStateKeys.forEach(function(shipStateKey)
            {
               var shipStateValue = myToken.value(shipStateKey);
               if (shipStateKey === ShipState.PRIMARY_WEAPON && myToken.ship().isPrimaryWeaponTurret)
               {
                  shipStateKey = ShipState.TURRET_WEAPON;
               }
               if (![undefined, null].includes(shipStateValue))
               {
                  var shipState = ShipState.properties[shipStateKey];
                  var image = React.createElement(ShipStateUI,
                  {
                     shipState: shipState,
                     faction: faction,
                     imageBase: this.props.imageBase,
                  });
                  var className = shipState.value + "Value";
                  cells.push(createCell(image, shipState.value + "0", className, shipState.name));
                  cells.push(createCell(shipStateValue, shipState.value + "1", className, shipState.name));
               }
            }, this);

            var row = createRow(cells);

            return createTable(row, "statsTable", "pilotCardStatsTable");
         },
      });

      var TokensPanel = React.createClass(
      {
         propTypes:
         {
            imageBase: PropTypes.string.isRequired,
            token: PropTypes.object.isRequired,
         },

         render: function()
         {
            var myToken = this.props.token;
            var store = myToken.store();
            var attackerTargetLocks = TargetLock.getByAttacker(store, myToken);
            var defenderTargetLocks = TargetLock.getByDefender(store, myToken);

            var cells = [];
            var countKeys = Count.values();

            countKeys.forEach(function(countKey)
            {
               var countValue = myToken.count(countKey);
               if (countValue !== undefined && countValue > 0)
               {
                  var count = Count.properties[countKey];
                  var element = React.createElement(LabeledImage,
                  {
                     image: count.image,
                     imageBase: this.props.imageBase,
                     label: String(countValue),
                     labelClass: "lightImageText",
                     title: count.name,
                  });
                  cells.push(createCell(element, count.value + countValue));
               }
            }, this);

            attackerTargetLocks.forEach(function(targetLock)
            {
               var title = "Target Lock to " + targetLock.defender().name();
               var element = React.createElement(LabeledImage,
               {
                  image: "token/AttackerTargetLock32.png",
                  imageBase: this.props.imageBase,
                  label: targetLock.id(),
                  labelClass: "lightImageText",
                  title: title,
                  width: 38,
               });
               var key = "attackerTargetLock" + targetLock.attacker() + targetLock.defender();
               cells.push(createCell(element, key));
            }, this);

            defenderTargetLocks.forEach(function(targetLock)
            {
               var title = "Target Lock from " + targetLock.attacker().name();
               var element = React.createElement(LabeledImage,
               {
                  image: "token/DefenderTargetLock32.png",
                  imageBase: this.props.imageBase,
                  label: targetLock.id(),
                  labelClass: "lightImageText",
                  title: title,
                  width: 38,
               });
               var key = "defenderTargetLock" + targetLock.attacker() + targetLock.defender();
               cells.push(createCell(element, key));
            }, this);

            if (myToken.damageCount() > 0)
            {
               var element = React.createElement(LabeledImage,
               {
                  image: "pilotCard/Damage32.jpg",
                  imageBase: this.props.imageBase,
                  label: String(myToken.damageCount()),
                  labelClass: "darkImageText",
                  title: "Damage",
               });
               cells.push(createCell(element, "damageCell" + myToken.damageCount()));
            }

            var row = createRow(cells);

            return createTable(row, "tokensTable", "pilotCardTokensTable");
         },
      });

      var UpgradesPanel = React.createClass(
      {
         propTypes:
         {
            iconBase: PropTypes.string.isRequired,
            imageBase: PropTypes.string.isRequired,
            token: PropTypes.object.isRequired,
         },

         render: function()
         {
            var token = this.props.token;

            var rows = [];
            var upgradeKeys = token.upgradeKeys();

            upgradeKeys.forEach(function(upgradeKey, i)
            {
               var upgrade = UpgradeCard.properties[upgradeKey];
               var element = React.createElement(EntityUI,
               {
                  entity: upgrade,
                  iconBase: this.props.iconBase,
                  imageBase: this.props.imageBase,
               });
               var cellKey = upgrade.value + i;
               var cell = React.DOM.div(
               {
                  key: cellKey,
                  className: "pilotCardUpgradeCell",
               }, element);
               rows.push(cell);
            }, this);

            var scrollClass = (upgradeKeys.size > 2 ? " height48 overflowYScroll" : "");

            return React.DOM.div(
            {
               key: "upgradesTable",
               className: "pilotCardUpgradesTable" + scrollClass,
            }, rows);
         }
      });

      function createCell(value, key, className, title)
      {
         return React.DOM.td(
         {
            key: key,
            className: className,
            title: title,
         }, (value !== undefined ? value : ""));
      }

      function createRow(cells, key)
      {
         return React.DOM.tr(
         {
            key: key,
         }, cells);
      }

      function createTable(rows, key, className)
      {
         return React.DOM.table(
         {
            className: className,
         }, React.DOM.tbody(
         {}, rows));
      }

      return PilotCardCompactUI;
   });

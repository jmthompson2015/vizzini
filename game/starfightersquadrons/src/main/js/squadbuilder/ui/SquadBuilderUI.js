define(["Pilot", "ShipState", "ShipTeam", "UpgradeCard", "UpgradeType", "UpgradeTypeComparator",
  "process/Reducer", "process/SimpleAgent", "process/Squad", "process/TokenFactory",
  "process/ui/FactionUI", "process/ui/ImplementedImage", "process/ui/ShipStateUI",
  "squadbuilder/Action", "squadbuilder/DisplayItemType", "squadbuilder/Reducer", "squadbuilder/SquadColumns",
  "squadbuilder/ui/Connector", "squadbuilder/ui/PilotCardImage", "squadbuilder/ui/PilotChooser", "squadbuilder/ui/ShipCardUI", "squadbuilder/ui/ShipChooser", "squadbuilder/ui/UpgradeCardImage", "squadbuilder/ui/UpgradeChooser"],
   function(Pilot, ShipState, ShipTeam, UpgradeCard, UpgradeType, UpgradeTypeComparator,
      DelegateReducer, SimpleAgent, Squad, TokenFactory,
      FactionUI, ImplementedImage, ShipStateUI,
      Action, DisplayItemType, Reducer, SquadColumns,
      Connector, PilotCardImage, PilotChooser, ShipCardUI, ShipChooser, UpgradeCardImage, UpgradeChooser)
   {
      "use strict";
      var SquadBuilderUI = React.createClass(
      {
         propTypes:
         {
            iconBase: PropTypes.string.isRequired,
            imageBase: PropTypes.string.isRequired,
            team: PropTypes.object.isRequired,

            onChange: PropTypes.func,
         },

         getInitialState: function()
         {
            LOGGER.trace("SquadBuilderUI.getInitialState()");

            var store = Redux.createStore(Reducer.root);
            var delegateStore = Redux.createStore(DelegateReducer.root);
            store.dispatch(Action.initialize(delegateStore, this.props.imageBase, this.props.team));

            return (
            {
               store: store,
            });
         },

         render: function()
         {
            LOGGER.trace("SquadBuilderUI.render()");

            var imageBase = this.props.imageBase;
            var team = this.props.team;
            var store = this.state.store;
            var ships = store.getState().ships;
            var pilots = store.getState().pilots;
            var rows = [];
            rows.push(this.createHeaderRow("row" + rows.length));

            ships.forEach(function(ship, i)
            {
               rows.push(this.createShipRow(ship, i, "row" + rows.length));

               var pilot = pilots.get(i);
               var upgradeTypeKeys;

               if (pilot && pilot.fore)
               {
                  rows.push(this.createPilotRow(ship, pilot.fore, i, "row" + rows.length));
                  upgradeTypeKeys = this.upgradeTypeKeys(pilot.fore);

                  upgradeTypeKeys.forEach(function(upgradeTypeKey, j)
                  {
                     var upgradeType = UpgradeType.properties[upgradeTypeKey];
                     rows.push(this.createUpgradeTypeRow(pilot.fore, upgradeType, j, "row" + rows.length));
                  }, this);

                  rows.push(this.createPilotRow(ship, pilot.aft, i, "row" + rows.length));
                  upgradeTypeKeys = this.upgradeTypeKeys(pilot.aft);

                  upgradeTypeKeys.forEach(function(upgradeTypeKey, j)
                  {
                     var upgradeType = UpgradeType.properties[upgradeTypeKey];
                     rows.push(this.createUpgradeTypeRow(pilot.aft, upgradeType, j, "row" + rows.length));
                  }, this);
               }
               else
               {
                  rows.push(this.createPilotRow(ship, pilot, i, "row" + rows.length));

                  if (pilot)
                  {
                     upgradeTypeKeys = this.upgradeTypeKeys(pilot);

                     upgradeTypeKeys.forEach(function(upgradeTypeKey, j)
                     {
                        var upgradeType = UpgradeType.properties[upgradeTypeKey];
                        rows.push(this.createUpgradeTypeRow(pilot, upgradeType, j, "row" + rows.length));
                     }, this);
                  }
               }
            }, this);

            // Put in an empty ship row.
            rows.push(this.createShipRow(undefined, ships.size, "row" + rows.length));
            rows.push(this.createFooterRow("row" + rows.length));

            var squadUI = React.DOM.table(
            {
               className: "squadUI",
            }, React.DOM.tbody(
            {}, rows));

            if (store.getState().displayItem !== undefined)
            {
               return React.DOM.div(
               {
                  className: "squadBuilderUI",
               }, squadUI, this.createDisplayItemUI());
            }
            else
            {
               return squadUI;
            }

            LOGGER.trace("SquadBuilderUI.render() end");
         },

         createCell: function(key, className, value, onMouseEnter, onMouseLeave)
         {
            return React.DOM.td(
            {
               key: key,
               className: className,
               onMouseEnter: onMouseEnter,
               onMouseLeave: onMouseLeave,
            }, (value !== undefined ? value : ""));
         },

         createDisplayItemUI: function()
         {
            var answer;
            var store = this.state.store;
            var displayItem = store.getState().displayItem;
            var displayItemType = store.getState().displayItemType;

            if (displayItem.parent)
            {
               displayItem = displayItem.parent;
            }

            var connector, agent;

            if (displayItem)
            {
               switch (displayItemType)
               {
                  case DisplayItemType.SHIP:
                     var team = this.props.team;
                     var shipTeamKeys = ShipTeam.valuesByShipAndTeam(displayItem.value, team.value);
                     var shipTeamKey = (shipTeamKeys.length > 0 ? shipTeamKeys[0] : undefined);
                     agent = new SimpleAgent("dummy", team.value);

                     connector = ReactRedux.connect(Connector.ShipCardUI.mapStateToProps)(ShipCardUI);
                     answer = React.createElement(ReactRedux.Provider,
                     {
                        store: store,
                     }, React.createElement(connector,
                     {
                        key: "shipCard" + displayItem.value,
                        className: "shipCardUI",

                        agent: agent,
                        shipTeam: ShipTeam.properties[shipTeamKey],
                     }));
                     break;
                  case DisplayItemType.PILOT:
                     connector = ReactRedux.connect(Connector.PilotCardImage.mapStateToProps)(PilotCardImage);
                     answer = React.createElement(ReactRedux.Provider,
                     {
                        store: store,
                     }, React.createElement(connector,
                     {
                        key: "pilotCard" + displayItem.value,
                        className: "pilotCardImage",
                        pilot: displayItem,
                     }));
                     break;
                  case DisplayItemType.UPGRADE:
                     connector = ReactRedux.connect(Connector.UpgradeCardImage.mapStateToProps)(UpgradeCardImage);
                     answer = React.createElement(ReactRedux.Provider,
                     {
                        store: store,
                     }, React.createElement(connector,
                     {
                        key: "upgradeCard" + displayItem.value,
                        className: "upgradeCardImage",
                        upgrade: displayItem,
                     }));
                     break;
               }
            }

            return answer;
         },

         createFooterRow: function(key)
         {
            var cells = [];
            var store = this.state.store;
            var squad = store.getState().squad;

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
                     var connector = ReactRedux.connect(Connector.ShipStateUI.mapStateToProps)(ShipStateUI);
                     value = React.createElement(ReactRedux.Provider,
                        {
                           store: this.state.store,
                        },
                        React.createElement(connector,
                        {
                           shipState: ShipState.properties[shipStateKey],
                        }));
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
            InputValidator.validateIsNumber("index", index);
            InputValidator.validateNotNull("rowKey", rowKey);

            var imageBase = this.props.imageBase;
            var team = (pilot ? pilot.shipTeam.team : this.props.team);

            var connector, pilotChooser, onMouseEnter;
            var that = this;
            var store = this.state.store;

            if (pilot && pilot.parent)
            {
               connector = ReactRedux.connect(Connector.FactionUI.mapStateToProps)(FactionUI);
               var image = React.createElement(ReactRedux.Provider,
               {
                  store: store,
               }, React.createElement(connector,
               {
                  faction: team,
               }));

               pilotChooser = React.DOM.span(
               {}, image, " ", pilot.name);

               onMouseEnter = function()
               {
                  LOGGER.debug("onMouseEnter() pilot = " + pilot);

                  if (pilot)
                  {
                     store.dispatch(Action.setDisplayItem(pilot, DisplayItemType.PILOT));

                     // FIXME
                     that.forceUpdate();
                  }
               };
            }
            else
            {
               if (ship)
               {
                  connector = ReactRedux.connect(Connector.PilotChooser.mapStateToProps)(PilotChooser);
                  pilotChooser = React.createElement(ReactRedux.Provider,
                  {
                     store: store,
                  }, React.createElement(connector,
                  {
                     onChange: this.pilotChanged,
                     initialPilot: pilot,
                     ship: ship,
                     team: team,
                     index: index,
                  }));

                  onMouseEnter = function()
                  {
                     LOGGER.debug("onMouseEnter() pilot = " + pilot);

                     if (pilot)
                     {
                        store.dispatch(Action.setDisplayItem(pilot, DisplayItemType.PILOT));

                        // FIXME
                        that.forceUpdate();
                     }
                  };
               }
            }

            var cells = [];
            var isImplemented = (pilot ? (pilot.isImplemented === true) : undefined);

            SquadColumns.forEach(function(column)
            {
               var value, mouseFunction;

               switch (column.key)
               {
                  case "pilot":
                     value = pilotChooser;
                     mouseFunction = onMouseEnter;
                     break;
                  case "isImplemented":
                     value = React.createElement(ImplementedImage,
                     {
                        iconBase: this.props.iconBase,
                        isImplemented: isImplemented,
                     });
                     break;
                  default:
                     if (ship && pilot)
                     {
                        if (!ship.fore)
                        {
                           value = (pilot && pilot[column.key] !== undefined ? pilot[column.key] : ship[column.key]);
                        }
                        else if (ship.fore && !pilot.parent)
                        {
                           value = (pilot && pilot[column.key] !== undefined ? pilot[column.key] : ship.fore[column.key]);
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
                           value = (pilot && pilot[column.key] !== undefined ? pilot[column.key] : myShip[column.key]);
                        }
                     }
               }

               cells.push(this.createCell("pilotCell" + cells.length + (pilot ? pilot.value : ""), column.className, value, mouseFunction));
            }, this);

            return React.DOM.tr(
            {
               key: rowKey,
            }, cells);
         },

         createShipRow: function(ship, index, rowKey)
         {
            InputValidator.validateIsNumber("index", index);
            InputValidator.validateNotNull("rowKey", rowKey);

            var store = this.state.store;
            var imageBase = this.props.imageBase;
            var connector = ReactRedux.connect(Connector.ShipChooser.mapStateToProps)(ShipChooser);
            var shipChooser = React.createElement(ReactRedux.Provider,
            {
               store: store,
            }, React.createElement(connector,
            {
               initialShip: ship,
               onChange: this.shipChanged,
               index: index,
            }));

            var that = this;
            var onMouseEnter = function()
            {
               LOGGER.debug("onMouseEnter() ship = " + ship);

               if (ship)
               {
                  store.dispatch(Action.setDisplayItem(ship, DisplayItemType.SHIP));

                  // FIXME
                  that.forceUpdate();
               }
            };

            var cells = [];

            SquadColumns.forEach(function(column)
            {
               var value, mouseFunction;

               switch (column.key)
               {
                  case "pilot":
                     value = shipChooser;
                     mouseFunction = onMouseEnter;
                     break;
               }

               cells.push(this.createCell("shipCell" + cells.length + (ship ? ship.value : ""), "backgroundMedium " + column.className, value, mouseFunction));
            }, this);

            return React.DOM.tr(
            {
               key: rowKey,
            }, cells);
         },

         createSquad: function()
         {
            var factionKey = this.props.team.value;
            var name = "name";
            var year = 2017;
            var description = "description";
            var store = this.state.store;
            var pilots = store.getState().pilots;
            var tokens = [];

            if (pilots.size > 0)
            {
               var agent = new SimpleAgent("dummy", pilots.get(0).shipTeam.teamKey);

               pilots.forEach(function(pilot, i)
               {
                  if (pilot)
                  {
                     // Ignore child pilots.
                     if (!pilot.parent)
                     {
                        var myPilot = (pilot.fore ? pilot.fore : pilot);
                        var upgrades = store.getState().pilotKeyToUpgrades.get(myPilot.value);
                        var upgradeKeys = [];
                        upgrades.forEach(function(upgrade)
                        {
                           if (upgrade)
                           {
                              upgradeKeys.push(upgrade.value);
                           }
                        });

                        var upgradeKeysAft;
                        myPilot = (pilot.aft ? pilot.aft : undefined);

                        if (myPilot)
                        {
                           upgrades = store.getState().pilotKeyToUpgrades.get(myPilot.value);
                           upgradeKeysAft = [];
                           upgrades.forEach(function(upgrade)
                           {
                              if (upgrade)
                              {
                                 upgradeKeysAft.push(upgrade.value);
                              }
                           });
                        }

                        tokens.push(TokenFactory.create(store.getState().delegateStore, pilot.value, agent, upgradeKeys, upgradeKeysAft));
                     }
                  }
               });
            }

            var answer = new Squad(factionKey, name, year, description, tokens);
            store.dispatch(Action.setSquad(answer));

            return answer;
         },

         createUpgradeTypeRow: function(pilot, upgradeType, upgradeIndex, rowKey)
         {
            InputValidator.validateNotNull("pilot", pilot);
            InputValidator.validateNotNull("upgradeType", upgradeType);
            InputValidator.validateIsNumber("upgradeIndex", upgradeIndex);
            InputValidator.validateNotNull("rowKey", rowKey);

            var store = this.state.store;
            var upgradeCards = store.getState().pilotKeyToUpgrades.get(pilot.value);
            var upgradeCard = upgradeCards.get(upgradeIndex);

            var connector = ReactRedux.connect(Connector.UpgradeChooser.mapStateToProps)(UpgradeChooser);
            var upgradeChooser = React.createElement(ReactRedux.Provider,
            {
               store: store,
            }, React.createElement(connector,
            {
               index: upgradeIndex,
               initialUpgrade: upgradeCard,
               onChange: this.upgradeChanged,
               pilot: pilot,
               upgradeType: upgradeType,
            }));

            var that = this;
            var onMouseEnter = function()
            {
               LOGGER.debug("onMouseEnter() upgradeCard = " + upgradeCard);

               if (upgradeCard)
               {
                  store.dispatch(Action.setDisplayItem(upgradeCard, DisplayItemType.UPGRADE));

                  // FIXME
                  that.forceUpdate();
               }
            };

            var cells = [];
            var isImplemented = (upgradeCard ? (upgradeCard.isImplemented === true) : undefined);

            SquadColumns.forEach(function(column)
            {
               var value, mouseFunction;

               switch (column.key)
               {
                  case "pilot":
                     value = upgradeChooser;
                     mouseFunction = onMouseEnter;
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
               cells.push(this.createCell("upgradeCell" + cells.length + upgradeType.value, column.className, value, mouseFunction));
            }, this);

            return React.DOM.tr(
            {
               key: rowKey,
            }, cells);
         },

         pilotChanged: function(event, pilot, index)
         {
            LOGGER.debug("SquadBuilderUI.pilotChanged() pilot = " + pilot + " index = " + index);

            var store = this.state.store;
            store.dispatch(Action.setPilot(pilot, index));
            var squad = this.createSquad();

            if (this.props.onChange)
            {
               this.props.onChange(squad);
            }

            // FIXME
            this.forceUpdate();
         },

         shipChanged: function(event, ship, index)
         {
            LOGGER.debug("SquadBuilderUI.shipChanged() ship = " + ship + " index = " + index);

            var store = this.state.store;
            store.dispatch(Action.setShip(ship, index));

            if (ship)
            {
               var team = this.props.team;
               var values = Pilot.valuesByShipAndTeam(ship.value, team.value);
               var pilotKey = values[0];
               var pilot = Pilot.properties[pilotKey];
               store.dispatch(Action.setPilot(pilot, index));

               if (pilot.fore)
               {
                  store.dispatch(Action.setPilot(pilot.fore, 100 + index));
                  store.dispatch(Action.setPilot(pilot.aft, 200 + index));
               }
            }

            var squad = this.createSquad();

            if (this.props.onChange)
            {
               this.props.onChange(squad);
            }

            // FIXME
            this.forceUpdate();
         },

         upgradeChanged: function(event, pilot, upgrade, index)
         {
            LOGGER.debug("SquadBuilderUI.upgradeChanged() pilot = " + pilot + " upgrade = " + upgrade + " index = " + index);

            var store = this.state.store;
            store.dispatch(Action.setPilotUpgrade(pilot, upgrade, index));
            var squad = this.createSquad();

            if (this.props.onChange)
            {
               this.props.onChange(squad);
            }

            // FIXME
            this.forceUpdate();
         },

         upgradeTypeKeys: function(pilot)
         {
            InputValidator.validateNotNull("pilot", pilot);

            var answer = pilot.upgradeTypeKeys.slice();

            answer.unshift(UpgradeType.TITLE);
            answer.push(UpgradeType.MODIFICATION);

            var store = this.state.store;
            var upgrades = store.getState().pilotKeyToUpgrades.get(pilot.value);
            var upgradeKeys = upgrades.map(function(upgrade)
            {
               return (upgrade ? upgrade.value : undefined);
            });

            if (upgradeKeys.includes(UpgradeCard.A_WING_TEST_PILOT))
            {
               answer.push(UpgradeType.ELITE);
            }

            if (upgradeKeys.includes(UpgradeCard.ANDRASTA))
            {
               answer.push(UpgradeType.BOMB);
               answer.push(UpgradeType.BOMB);
            }

            if (upgradeKeys.includes(UpgradeCard.BOMB_LOADOUT))
            {
               answer.push(UpgradeType.BOMB);
            }

            if (upgradeKeys.includes(UpgradeCard.B_WING_E2))
            {
               answer.push(UpgradeType.CREW);
            }

            if (upgradeKeys.includes(UpgradeCard.MERCHANT_ONE))
            {
               answer.push(UpgradeType.CREW);
               answer.push(UpgradeType.TEAM);
               answer.vizziniRemove(UpgradeType.CARGO);
            }

            if (upgradeKeys.includes(UpgradeCard.R2_D6))
            {
               answer.push(UpgradeType.ELITE);
            }

            if (upgradeKeys.includes(UpgradeCard.SABINE_WREN))
            {
               answer.push(UpgradeType.BOMB);
            }

            if (upgradeKeys.includes(UpgradeCard.SLAVE_I))
            {
               answer.push(UpgradeType.TORPEDO);
            }

            if (upgradeKeys.includes(UpgradeCard.SMUGGLING_COMPARTMENT))
            {
               answer.push(UpgradeType.ILLICIT);
               answer.push(UpgradeType.MODIFICATION);
            }

            if (upgradeKeys.includes(UpgradeCard.TANTIVE_IV))
            {
               answer.push(UpgradeType.CREW);
               answer.push(UpgradeType.TEAM);
            }

            if (upgradeKeys.includes(UpgradeCard.TIE_SHUTTLE))
            {
               answer = this.vizziniRemoveAll(answer, UpgradeType.TORPEDO);
               answer = this.vizziniRemoveAll(answer, UpgradeType.MISSILE);
               answer = this.vizziniRemoveAll(answer, UpgradeType.BOMB);
               answer.push(UpgradeType.CREW);
               answer.push(UpgradeType.CREW);
            }

            if (upgradeKeys.includes(UpgradeCard.TIE_X1))
            {
               answer.push(UpgradeType.SYSTEM);
            }

            if (upgradeKeys.includes(UpgradeCard.TIE_X7))
            {
               answer.vizziniRemove(UpgradeType.CANNON);
               answer.vizziniRemove(UpgradeType.MISSILE);
            }

            if (upgradeKeys.includes(UpgradeCard.VIRAGO))
            {
               answer.push(UpgradeType.SYSTEM);
               answer.push(UpgradeType.ILLICIT);
            }

            answer.sort(UpgradeTypeComparator);

            return answer;
         },

         vizziniRemoveAll: function(array, removeElement)
         {
            InputValidator.validateNotNull("array", array);
            InputValidator.validateNotNull("removeElement", removeElement);

            return answer.filter(function(element)
            {
               return element !== removeElement;
            });
         }
      });

      return SquadBuilderUI;
   });

define(["ShipState", "UpgradeType", "process/TargetLock", "process/ui/FactionUI", "process/ui/LabeledImage", "process/ui/ShipActionPanel", "process/ui/ShipSilhouetteUI", "process/ui/ShipStateUI", "process/ui/UpgradeTypeUI"],
   function(ShipState, UpgradeType, TargetLock, FactionUI, LabeledImage, ShipActionPanel, ShipSilhouetteUI, ShipStateUI, UpgradeTypeUI)
   {
      "use strict";
      var PilotCardUI = React.createClass(
      {
         propTypes:
         {
            initialToken: PropTypes.object.isRequired,
            imageBase: PropTypes.string.isRequired,
         },

         getInitialState: function()
         {
            return (
            {
               token: this.props.initialToken,
            });
         },

         render: function()
         {
            InputValidator.validateNotNull("initialToken", this.props.initialToken);

            return this.renderLarge();
         },

         renderLarge: function()
         {
            var token = this.state.token;
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
            rows.push(React.DOM.tr(
            {
               key: rows.length,
            }, this.createNamePanel(token, myToken, myTokenAft)));

            rows.push(React.DOM.tr(
            {
               key: rows.length,
            }, this.createInnerPanel(token, myToken, myTokenAft)));

            rows.push(React.DOM.tr(
            {
               key: rows.length,
            }, this.createLowerPanel(token, myToken, myTokenAft)));

            rows.push(React.DOM.tr(
            {
               key: rows.length,
            }, this.createTokensPanel(token, myToken, myTokenAft)));

            return React.DOM.table(
            {
               key: token.id(),
               className: "pilotCard",
            }, React.DOM.tbody(
            {}, rows));
         },

         createInnerPanel: function(token, myToken, myTokenAft)
         {
            var rows = [];
            var cells = [];
            var element = React.createElement(StatsPanel,
            {
               token: myToken,
               imageBase: this.props.imageBase,
            });
            cells.push(React.DOM.td(
            {
               key: cells.length,
               rowSpan: 2,
            }, element));

            cells.push(React.createElement(DescriptionPanel,
            {
               key: cells.length,
               pilot: myToken.pilot(),
               myKey: String(cells.length),
            }));

            if (myTokenAft)
            {
               cells.push(React.createElement(DescriptionPanel,
               {
                  key: cells.length,
                  pilot: myTokenAft.pilot(),
                  myKey: String(cells.length),
               }));

               element = React.createElement(StatsPanel,
               {
                  token: myTokenAft,
                  imageBase: this.props.imageBase,
               });
               cells.push(React.DOM.td(
               {
                  key: cells.length,
                  rowSpan: 2,
               }, element));
            }

            rows.push(React.DOM.tr(
            {
               key: rows.length,
            }, cells));

            cells = [];
            element = React.createElement(ShipActionPanel,
            {
               shipActionKeys: myToken.ship().shipActionKeys,
               imageBase: this.props.imageBase,
            });
            cells.push(React.DOM.td(
            {
               key: cells.length,
            }, element));

            if (myTokenAft)
            {
               cells.push(React.DOM.td(
               {
                  key: cells.length,
               }, React.createElement(ShipActionPanel,
               {
                  shipActionKeys: myTokenAft.ship().shipActionKeys,
                  imageBase: this.props.imageBase,
               })));
            }

            rows.push(React.DOM.tr(
            {
               key: rows.length,
            }, cells));

            var table = React.DOM.table(
            {}, React.DOM.tbody(
            {}, rows));

            return React.DOM.td(
            {}, table);
         },

         createLowerPanel: function(token, myToken, myTokenAft)
         {
            var cells = [];
            var element = React.createElement(ShipSilhouetteUI,
            {
               ship: myToken.pilot().shipTeam.ship,
               imageBase: this.props.imageBase,
            });
            cells.push(React.DOM.td(
            {
               key: cells.length,
               className: "pilotCardUISilhouetteCell"
            }, element));

            element = React.createElement(UpgradePanel,
            {
               imageBase: this.props.imageBase,
               upgradeTypes: myToken.upgradeTypeKeys().map(function(upgradeTypeKey)
               {
                  return UpgradeType.properties[upgradeTypeKey];
               }),
            });
            cells.push(React.DOM.td(
            {
               key: cells.length,
               className: "pilotCardUIUpgradeCell"
            }, element));

            cells.push(React.DOM.td(
            {
               key: cells.length,
               className: "pilotCardUISquadPointCost",
               title: "Squad Point cost"
            }, myToken.pilot().squadPointCost));

            if (myTokenAft)
            {
               element = React.createElement(UpgradePanel,
               {
                  imageBase: this.props.imageBase,
                  upgradeTypes: myTokenAft.upgradeTypeKeys().map(function(upgradeTypeKey)
                  {
                     return UpgradeType.properties[upgradeTypeKey];
                  }),
               });
               cells.push(React.DOM.td(
               {
                  key: cells.length,
                  className: "pilotCardUIUpgradeCell"
               }, element));

               cells.push(React.DOM.td(
               {
                  key: cells.length,
                  className: "pilotCardUISquadPointCost",
                  title: "Squad Point cost"
               }, myTokenAft.pilot().squadPointCost));
            }

            var row = React.DOM.tr(
            {}, cells);
            var table = React.DOM.table(
            {
               className: "pilotCardUIUpgradeSquadCost"
            }, React.DOM.tbody(
            {}, row));

            return React.DOM.td(
            {}, table);
         },

         createNamePanel: function(token, myToken, myTokenAft)
         {
            var element = React.createElement(NamePanel,
            {
               pilotSkillValue: myToken.pilotSkillValue(),
               pilotName: token.pilotName(),
               shipName: (myTokenAft ? myToken.ship().name : token.shipName()),
               team: token.pilot().shipTeam.team,
               pilotAftSkillValue: (myTokenAft ? myTokenAft.pilotSkillValue() : undefined),
               shipAftName: (myTokenAft ? myTokenAft.ship().name : undefined),
               imageBase: this.props.imageBase,
            });

            return React.DOM.td(
            {}, element);
         },

         createTokensPanel: function(token, myToken, myTokenAft)
         {
            var answer;
            var element0 = React.createElement(TokensPanel,
            {
               imageBase: this.props.imageBase,
               token: myToken,
            });

            if (myTokenAft)
            {
               var element1 = React.createElement(TokensPanel,
               {
                  imageBase: this.props.imageBase,
                  token: myTokenAft,
               });
               var table = React.DOM.table(
               {
                  className: "pilotCardUITokensTable",
               }, React.DOM.tbody(
               {}, React.DOM.tr(
               {}, React.DOM.td(
               {
                  key: "tokens0",
               }, element0), React.DOM.td(
               {
                  key: "tokens1",
               }, element1))));

               answer = React.DOM.td(
               {
                  className: "pilotCardUITokensPanel",
               }, table);
            }
            else
            {
               answer = React.DOM.td(
               {}, element0);
            }

            return answer;
         },

         tokenChanged: function()
         {
            LOGGER.trace(this.state.token.name() + " token change event");
            this.setState(
            {
               token: this.state.token
            });
         },
      });

      var DescriptionPanel = React.createClass(
      {
         propTypes:
         {
            pilot: PropTypes.object.isRequired,
            myKey: PropTypes.string.isRequired,
         },

         render: function()
         {
            var pilot = this.props.pilot;
            var myKey = this.props.myKey;

            var pilotDescription = pilot.description;
            var pilotDescriptionClassName = "pilotCardUIDescription" + (pilot.isFlavorText ? " flavorText" : "");

            return React.DOM.td(
            {
               key: myKey,
               className: pilotDescriptionClassName,
            }, pilotDescription);
         },
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
            cells.push(React.DOM.td(
            {
               key: cells.length,
               rowSpan: 2,
            }, image));
            cells.push(React.DOM.td(
            {
               key: cells.length,
               title: "Name",
               className: "namePanel",
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

            cells.push(React.DOM.td(
            {
               key: cells.length,
               rowSpan: 2,
            }, React.createElement(FactionUI,
            {
               faction: this.props.team,
               imageBase: this.props.imageBase,
            })));
            rows.push(React.DOM.tr(
            {
               key: rows.length,
            }, cells));

            cells = [];
            if (this.props.shipAftName)
            {
               cells.push(React.DOM.td(
               {
                  key: cells.length,
                  title: "Ship",
                  className: "namePanel",
               }, this.props.shipName));
               cells.push(React.DOM.td(
               {
                  key: cells.length,
                  title: "Ship",
                  className: "namePanel"
               }, this.props.shipAftName));
            }
            else
            {
               cells.push(React.DOM.td(
               {
                  key: cells.length,
                  title: "Ship",
                  className: "namePanel",
               }, this.props.shipName));
            }
            rows.push(React.DOM.tr(
            {
               key: rows.length,
            }, cells));

            return React.DOM.table(
            {
               className: "nameTable"
            }, React.DOM.tbody(
            {}, rows));
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
            return this.renderLarge();
         },

         renderLarge: function()
         {
            var myToken = this.props.token;

            var faction = myToken.pilot().shipTeam.team;
            var primaryWeaponValue = myToken.primaryWeaponValue();
            var energyLimit = myToken.energyValue();
            var agilityValue = myToken.agilityValue();
            var hullValue = myToken.hullValue();
            var shieldValue = myToken.shieldValue();

            var rows = [];
            var cells = [];
            var image;

            if (primaryWeaponValue !== undefined)
            {
               var shipStateKey;
               if (myToken.ship().isPrimaryWeaponTurret)
               {
                  shipStateKey = ShipState.TURRET_WEAPON;
               }
               else
               {
                  shipStateKey = ShipState.PRIMARY_WEAPON;
               }
               image = React.createElement(ShipStateUI,
               {
                  shipState: ShipState.properties[shipStateKey],
                  faction: faction,
                  imageBase: this.props.imageBase,
               });
               cells.push(React.DOM.td(
               {
                  key: cells.length,
                  className: 'primaryWeaponValue',
                  title: 'Primary Weapon'
               }, image));
               cells.push(React.DOM.td(
               {
                  key: cells.length,
                  className: 'primaryWeaponValue',
                  title: 'Primary Weapon'
               }, primaryWeaponValue));
               rows.push(React.DOM.tr(
               {
                  key: rows.length,
               }, cells));
            }

            if (energyLimit !== undefined)
            {
               cells = [];
               image = React.createElement(ShipStateUI,
               {
                  shipState: ShipState.properties[ShipState.ENERGY],
                  faction: faction,
                  imageBase: this.props.imageBase,
               });
               cells.push(React.DOM.td(
               {
                  key: cells.length,
                  className: 'energyValue',
                  title: 'Energy'
               }, image));
               cells.push(React.DOM.td(
               {
                  key: cells.length,
                  className: 'energyValue',
                  title: 'Energy'
               }, energyLimit));
               rows.push(React.DOM.tr(
               {
                  key: rows.length,
               }, cells));
            }

            cells = [];
            var image1 = React.createElement(ShipStateUI,
            {
               shipState: ShipState.properties[ShipState.AGILITY],
               faction: faction,
               imageBase: this.props.imageBase,
            });
            cells.push(React.DOM.td(
            {
               key: cells.length,
               className: 'agilityValue',
               title: 'Agility'
            }, image1));
            cells.push(React.DOM.td(
            {
               key: cells.length,
               className: 'agilityValue',
               title: 'Agility'
            }, agilityValue));
            rows.push(React.DOM.tr(
            {
               key: rows.length,
            }, cells));

            cells = [];
            var image2 = React.createElement(ShipStateUI,
            {
               shipState: ShipState.properties[ShipState.HULL],
               faction: faction,
               imageBase: this.props.imageBase,
            });
            cells.push(React.DOM.td(
            {
               key: cells.length,
               className: 'hullValue',
               title: 'Hull'
            }, image2));
            cells.push(React.DOM.td(
            {
               key: cells.length,
               className: 'hullValue',
               title: 'Hull'
            }, hullValue));
            rows.push(React.DOM.tr(
            {
               key: rows.length,
            }, cells));

            cells = [];
            var image3 = React.createElement(ShipStateUI,
            {
               shipState: ShipState.properties[ShipState.SHIELD],
               faction: faction,
               imageBase: this.props.imageBase,
            });
            cells.push(React.DOM.td(
            {
               key: cells.length,
               className: 'shieldValue',
               title: 'Shield'
            }, image3));
            cells.push(React.DOM.td(
            {
               key: cells.length,
               className: 'shieldValue',
               title: 'Shield'
            }, shieldValue));
            rows.push(React.DOM.tr(
            {
               key: rows.length,
            }, cells));

            return React.DOM.table(
            {
               className: "statsTable"
            }, React.DOM.tbody(
            {}, rows));
         },
      });

      var UpgradePanel = React.createClass(
      {
         propTypes:
         {
            imageBase: PropTypes.string.isRequired,
            upgradeTypes: PropTypes.array.isRequired,
         },

         render: function()
         {
            var upgradeTypes = this.props.upgradeTypes;
            var cells = [];

            for (var i = 0; i < upgradeTypes.length; i++)
            {
               var upgradeType = upgradeTypes[i];
               var img = React.createElement(UpgradeTypeUI,
               {
                  upgradeType: upgradeType,
                  imageBase: this.props.imageBase,
               });
               cells.push(React.DOM.td(
               {
                  key: i,
               }, img));
            }

            var row = React.DOM.tr(
            {}, cells);
            return React.DOM.table(
            {
               className: "pilotCardUIUpgrades"
            }, React.DOM.tbody(
            {}, row));
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
            InputValidator.validateNotNull("token", this.props.token);

            var myToken = this.props.token;
            var store = myToken.store();
            var attackerTargetLocks = TargetLock.getByAttacker(store, myToken);
            var defenderTargetLocks = TargetLock.getByDefender(store, myToken);

            var cells = [];
            var element = React.createElement(LabeledImage,
            {
               image: "token/CloakToken32.png",
               imageBase: this.props.imageBase,
               label: String(myToken.cloakCount()),
               labelClass: "lightImageText",
               title: "Cloak",
               width: 36,
            });
            cells.push(React.DOM.td(
            {
               key: cells.length,
            }, element));

            element = React.createElement(LabeledImage,
            {
               image: "token/EnergyToken32.png",
               imageBase: this.props.imageBase,
               label: String(myToken.energyCount()),
               labelClass: "lightImageText",
               title: "Energy",
            });
            cells.push(React.DOM.td(
            {
               key: cells.length,
            }, element));

            element = React.createElement(LabeledImage,
            {
               image: "token/EvadeToken32.png",
               imageBase: this.props.imageBase,
               label: String(myToken.evadeCount()),
               labelClass: "lightImageText",
               title: "Evade",
            });
            cells.push(React.DOM.td(
            {
               key: cells.length,
            }, element));

            element = React.createElement(LabeledImage,
            {
               image: "token/FocusToken32.png",
               imageBase: this.props.imageBase,
               label: String(myToken.focusCount()),
               labelClass: "lightImageText",
               title: "Focus",
            });
            cells.push(React.DOM.td(
            {
               key: cells.length,
            }, element));

            element = React.createElement(LabeledImage,
            {
               image: "token/IonToken32.png",
               imageBase: this.props.imageBase,
               label: String(myToken.ionCount()),
               labelClass: "lightImageText",
               title: "Ion",
            });
            cells.push(React.DOM.td(
            {
               key: cells.length,
            }, element));

            element = React.createElement(LabeledImage,
            {
               image: "token/ReinforceToken32.png",
               imageBase: this.props.imageBase,
               label: String(myToken.reinforceCount()),
               labelClass: "lightImageText",
               title: "Reinforce",
            });
            cells.push(React.DOM.td(
            {
               key: cells.length,
            }, element));

            element = React.createElement(LabeledImage,
            {
               image: "token/ShieldToken32.png",
               imageBase: this.props.imageBase,
               label: String(myToken.shieldCount()),
               labelClass: "lightImageText",
               title: "Shield",
            });
            cells.push(React.DOM.td(
            {
               key: cells.length,
            }, element));

            element = React.createElement(LabeledImage,
            {
               image: "token/StressToken32.png",
               imageBase: this.props.imageBase,
               label: String(myToken.stressCount()),
               labelClass: "lightImageText",
               title: "Stress",
            });
            cells.push(React.DOM.td(
            {
               key: cells.length,
            }, element));

            element = React.createElement(LabeledImage,
            {
               image: "token/TractorBeamToken32.png",
               imageBase: this.props.imageBase,
               label: String(myToken.tractorBeamCount()),
               labelClass: "lightImageText",
               title: "Tractor Beam",
            });
            cells.push(React.DOM.td(
            {
               key: cells.length,
            }, element));

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
               cells.push(React.DOM.td(
               {
                  key: cells.length,
               }, element));
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
               cells.push(React.DOM.td(
               {
                  key: cells.length,
               }, element));
            }, this);

            element = React.createElement(LabeledImage,
            {
               image: "token/WeaponsDisabledToken32.png",
               imageBase: this.props.imageBase,
               label: String(myToken.weaponsDisabledCount()),
               labelClass: "lightImageText",
               title: "Weapons Disabled",
            });
            cells.push(React.DOM.td(
            {
               key: cells.length,
            }, element));

            element = React.createElement(LabeledImage,
            {
               image: "pilotCard/Damage32.jpg",
               imageBase: this.props.imageBase,
               label: String(myToken.damageCount()),
               labelClass: "darkImageText",
               title: "Damage",
            });
            cells.push(React.DOM.td(
            {
               key: cells.length,
            }, element));

            element = React.createElement(LabeledImage,
            {
               image: "pilotCard/CriticalDamage32.jpg",
               imageBase: this.props.imageBase,
               label: String(myToken.criticalDamageCount()),
               labelClass: "darkImageText",
               title: "Critical Damage",
            });
            cells.push(React.DOM.td(
            {
               key: cells.length,
            }, element));

            var row = React.DOM.tr(
            {}, cells);
            var table = React.DOM.table(
            {
               className: "tokensTable"
            }, React.DOM.tbody(
            {}, row));
            return React.DOM.div(
            {
               className: "tokensPanel"
            }, table);
         },
      });

      return PilotCardUI;
   });

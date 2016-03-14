define([ "DualToken", "ui/FactionUI", "ui/LabeledImage", "ui/ShipActionPanel", "ui/ShipSilhouetteUI", "ui/ShipStateUI",
        "ui/UpgradeTypeUI" ], function(DualToken, FactionUI, LabeledImage, ShipActionPanel, ShipSilhouetteUI,
        ShipStateUI, UpgradeTypeUI)
{
    "use strict";
    var PilotCardUI = React.createClass(
    {
        getInitialState: function()
        {
            return (
            {
                token: this.props.initialToken,
            });
        },

        componentDidMount: function()
        {
            this.state.token.bind("change", this.tokenChanged);

            if (this.state.token instanceof DualToken)
            {
                this.state.token.tokenFore().bind("change", this.tokenChanged);
                this.state.token.tokenAft().bind("change", this.tokenChanged);
            }
        },

        componentWillUnmount: function()
        {
            this.state.token.unbind("change", this.tokenChanged);

            if (this.state.token instanceof DualToken)
            {
                this.state.token.tokenFore().unbind("change", this.tokenChanged);
                this.state.token.tokenAft().unbind("change", this.tokenChanged);
            }
        },

        render: function()
        {
            InputValidator.validateNotNull("initialToken", this.props.initialToken);

            if (this.props.isCompact)
            {
                return this.renderCompact();
            }
            else
            {
                return this.renderLarge();
            }
        },

        renderCompact: function()
        {
            var token = this.state.token;
            var myToken, myTokenAft;

            if (token instanceof DualToken)
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

            var element = React.createElement(StatsPanel,
            {
                token: myToken,
                isCompact: true,
            });
            var cell = React.DOM.td({}, element);
            rows.push(React.DOM.tr(
            {
                key: rows.length,
            }, cell));

            if (myTokenAft)
            {
                element = React.createElement(StatsPanel,
                {
                    token: myTokenAft,
                    isCompact: true,
                });
                cell = React.DOM.td({}, element);

                rows.push(React.DOM.tr(
                {
                    key: rows.length,
                }, cell));
            }

            rows.push(React.DOM.tr(
            {
                key: rows.length,
            }, this.createTokensPanel(token, myToken, myTokenAft)));

            return React.DOM.table(
            {
                className: "pilotCard"
            }, rows);
        },

        renderLarge: function()
        {
            var token = this.state.token;
            var myToken, myTokenAft;

            if (token instanceof DualToken)
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
                className: "pilotCard",
            }, rows);
        },

        createInnerPanel: function(token, myToken, myTokenAft)
        {
            var rows = [];
            var cells = [];
            var element = React.createElement(StatsPanel,
            {
                token: myToken,
                isCompact: this.props.isCompact,
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
                myKey: cells.length,
            }));

            if (myTokenAft)
            {
                cells.push(React.createElement(DescriptionPanel,
                {
                    key: cells.length,
                    pilot: myTokenAft.pilot(),
                    myKey: cells.length,
                }));

                element = React.createElement(StatsPanel,
                {
                    token: myTokenAft,
                    isCompact: this.props.isCompact,
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
                })));
            }

            rows.push(React.DOM.tr(
            {
                key: rows.length,
            }, cells));

            var table = React.DOM.table({}, rows);

            return React.DOM.td({}, table);
        },

        createLowerPanel: function(token, myToken, myTokenAft)
        {
            var cells = [];
            var element = React.createElement(ShipSilhouetteUI,
            {
                shipKey: myToken.pilot().shipTeam.shipKey,
            });
            cells.push(React.DOM.td(
            {
                key: cells.length,
                className: "pilotCardUISilhouetteCell"
            }, element));

            element = React.createElement(UpgradePanel,
            {
                upgradeTypes: myToken.upgradeTypeKeys(),
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
                    upgradeTypes: myTokenAft.upgradeTypeKeys(),
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

            var row = React.DOM.tr({}, cells);
            var table = React.DOM.table(
            {
                className: "pilotCardUIUpgradeSquadCost"
            }, row);

            return React.DOM.td({}, table);
        },

        createNamePanel: function(token, myToken, myTokenAft)
        {
            var element = React.createElement(NamePanel,
            {
                pilotSkillValue: myToken.pilotSkillValue(),
                pilotName: token.pilotName(),
                shipName: token.shipName(),
                team: token.agent().teamKey(),
                pilotAftSkillValue: (myTokenAft ? myTokenAft.pilotSkillValue() : undefined),
            });

            return React.DOM.td({}, element);
        },

        createTokensPanel: function(token, myToken, myTokenAft)
        {
            var answer;
            var element0 = React.createElement(TokensPanel,
            {
                token: myToken,
            });

            if (myTokenAft)
            {
                var element1 = React.createElement(TokensPanel,
                {
                    token: myTokenAft,
                });
                answer = React.DOM.td(
                {
                    className: "center fullWidth",
                },
                // FIXME: don't use an embedded table
                React.DOM.table(
                {
                    className: "center fullWidth",
                }, React.DOM.tr(
                {
                    className: "center fullWidth",
                }, React.DOM.td(
                {
                    key: "tokens0",
                    className: "center fullWidth",
                }, element0), React.DOM.td(
                {
                    key: "tokens1",
                    className: "center fullWidth",
                }, element1))));
            }
            else
            {
                answer = React.DOM.td({}, element0);
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
        render: function()
        {
            InputValidator.validateNotNull("pilot", this.props.pilot);
            InputValidator.validateNotNull("myKey", this.props.myKey);

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
        render: function()
        {
            InputValidator.validateNotNull("pilotSkillValue", this.props.pilotSkillValue);
            InputValidator.validateNotNull("pilotName", this.props.pilotName);
            InputValidator.validateNotNull("shipName", this.props.shipName);
            InputValidator.validateNotNull("team", this.props.team);

            var rows = [];
            var cells = [];
            var image = React.createElement(ShipStateUI,
            {
                shipStateKey: "Skill",
                factionKey: this.props.team,
                label: this.props.pilotSkillValue,
                labelClass: "pilotSkillValue",
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
                className: "namePanel"
            }, this.props.pilotName));

            if (this.props.pilotAftSkillValue)
            {
                image = React.createElement(ShipStateUI,
                {
                    shipStateKey: "Skill",
                    factionKey: this.props.team,
                    label: this.props.pilotAftSkillValue,
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
                factionKey: this.props.team,
            })));
            rows.push(React.DOM.tr(
            {
                key: rows.length,
            }, cells));

            cells = [];
            cells.push(React.DOM.td(
            {
                key: cells.length,
                title: "Ship",
                className: "namePanel"
            }, this.props.shipName));

            rows.push(React.DOM.tr(
            {
                key: rows.length,
            }, cells));

            return React.DOM.table(
            {
                className: "nameTable"
            }, rows);
        },
    });

    var StatsPanel = React.createClass(
    {
        render: function()
        {
            var isCompact = this.props.isCompact;

            if (isCompact)
            {
                return this.renderCompact();
            }
            else
            {
                return this.renderLarge();
            }
        },

        renderCompact: function()
        {
            InputValidator.validateNotNull("token", this.props.token);

            var myToken = this.props.token;

            var factionKey = myToken.pilot().shipTeam.teamKey;
            var primaryWeaponValue = myToken.primaryWeaponValue();
            var energyValue = myToken.energyValue();
            var agilityValue = myToken.agilityValue();
            var hullValue = myToken.hullValue();
            var shieldValue = myToken.shieldValue();

            var cells = [];
            var image;

            if (primaryWeaponValue)
            {
                image = React.createElement(ShipStateUI,
                {
                    shipStateKey: "Weapon",
                    factionKey: factionKey,
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
            }

            if (energyValue)
            {
                image = React.createElement(ShipStateUI,
                {
                    shipStateKey: "Energy",
                    factionKey: factionKey,
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
                }, energyValue));
            }

            var image1 = React.createElement(ShipStateUI,
            {
                shipStateKey: "Agility",
                factionKey: factionKey,
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

            var image2 = React.createElement(ShipStateUI,
            {
                shipStateKey: "Hull",
                factionKey: factionKey,
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

            var image3 = React.createElement(ShipStateUI,
            {
                shipStateKey: "Shield",
                factionKey: factionKey,
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

            var row = React.DOM.tr({}, cells);

            return React.DOM.table(
            {
                className: "statsTable"
            }, row);
        },

        renderLarge: function()
        {
            InputValidator.validateNotNull("token", this.props.token);

            var myToken = this.props.token;

            var factionKey = myToken.pilot().shipTeam.teamKey;
            var primaryWeaponValue = myToken.primaryWeaponValue();
            var energyValue = myToken.energyValue();
            var agilityValue = myToken.agilityValue();
            var hullValue = myToken.hullValue();
            var shieldValue = myToken.shieldValue();

            var rows = [];
            var cells = [];
            var image;

            if (primaryWeaponValue)
            {
                image = React.createElement(ShipStateUI,
                {
                    shipStateKey: "Weapon",
                    factionKey: factionKey,
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

            if (energyValue)
            {
                cells = [];
                image = React.createElement(ShipStateUI,
                {
                    shipStateKey: "Energy",
                    factionKey: factionKey,
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
                }, energyValue));
                rows.push(React.DOM.tr(
                {
                    key: rows.length,
                }, cells));
            }

            cells = [];
            var image1 = React.createElement(ShipStateUI,
            {
                shipStateKey: "Agility",
                factionKey: factionKey,
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
                shipStateKey: "Hull",
                factionKey: factionKey,
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
                shipStateKey: "Shield",
                factionKey: factionKey,
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
            }, rows);
        },
    });

    var UpgradePanel = React.createClass(
    {
        render: function()
        {
            InputValidator.validateNotNull("upgradeTypes", this.props.upgradeTypes);

            var upgradeTypes = this.props.upgradeTypes;
            var cells = [];

            for (var i = 0; i < upgradeTypes.length; i++)
            {
                var upgradeType = upgradeTypes[i];
                var img = React.createElement(UpgradeTypeUI,
                {
                    upgradeTypeKey: upgradeType,
                });
                cells.push(React.DOM.td(
                {
                    key: i,
                }, img));
            }

            var row = React.DOM.tr({}, cells);
            return React.DOM.table(
            {
                className: "pilotCardUIUpgrades"
            }, row);
        },
    });

    var TokensPanel = React.createClass(
    {
        render: function()
        {
            InputValidator.validateNotNull("token", this.props.token);

            var myToken = this.props.token;

            var cloakCount = myToken.cloak().count();
            var energyCount = myToken.energy().count();
            var evadeCount = myToken.evade().count();
            var focusCount = myToken.focus().count();
            var ionCount = myToken.ion().count();
            var shieldCount = myToken.shield().count();
            var stressCount = myToken.stress().count();
            var weaponsDisabledCount = myToken.weaponsDisabled().count();
            var attackerTargetLocks = myToken.attackerTargetLocks();
            var defenderTargetLocks = myToken.defenderTargetLocks();
            var damageCount = myToken.damageCount();
            var criticalDamageCount = myToken.criticalDamageCount();

            var cells = [];
            var element = React.createElement(LabeledImage,
            {
                image: "token/CloakToken32.png",
                label: cloakCount,
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
                label: energyCount,
                labelClass: "mediumImageText",
                title: "Energy",
            });
            cells.push(React.DOM.td(
            {
                key: cells.length,
            }, element));

            element = React.createElement(LabeledImage,
            {
                image: "token/EvadeToken32.png",
                label: evadeCount,
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
                label: focusCount,
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
                label: ionCount,
                labelClass: "lightImageText",
                title: "Ion",
            });
            cells.push(React.DOM.td(
            {
                key: cells.length,
            }, element));

            element = React.createElement(LabeledImage,
            {
                image: "token/ShieldToken32.png",
                label: shieldCount,
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
                label: stressCount,
                labelClass: "lightImageText",
                title: "Stress",
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
                    label: targetLock.id(),
                    labelClass: "lightImageText",
                    title: title,
                    width: 38,
                });
                cells.push(React.DOM.td(
                {
                    key: cells.length,
                }, element));
            });

            defenderTargetLocks.forEach(function(targetLock)
            {
                var title = "Target Lock from " + targetLock.attacker().name();
                var element = React.createElement(LabeledImage,
                {
                    image: "token/DefenderTargetLock32.png",
                    label: targetLock.id(),
                    labelClass: "lightImageText",
                    title: title,
                    width: 38,
                });
                cells.push(React.DOM.td(
                {
                    key: cells.length,
                }, element));
            });

            element = React.createElement(LabeledImage,
            {
                image: "token/WeaponsDisabledToken32.png",
                label: weaponsDisabledCount,
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
                label: damageCount,
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
                label: criticalDamageCount,
                labelClass: "darkImageText",
                title: "Critical Damage",
            });
            cells.push(React.DOM.td(
            {
                key: cells.length,
            }, element));

            var row = React.DOM.tr({}, cells);
            var table = React.DOM.table(
            {
                className: "tokensTable"
            }, row);
            return React.DOM.div(
            {
                className: "tokensPanel"
            }, table);
        },
    });

    return PilotCardUI;
});

define([ "ShipAction", "ui/FactionUI", "ui/LabeledImage", "ui/ShipActionUI", "ui/ShipSilhouetteUI", "ui/ShipStateUI",
        "ui/UpgradeTypeUI" ], function(ShipAction, FactionUI, LabeledImage, ShipActionUI, ShipSilhouetteUI,
        ShipStateUI, UpgradeTypeUI)
{
    "use strict";
    var PilotCardUI = React.createClass(
    {
        getInitialState: function()
        {
            return (
            {
                token: this.props.initialToken
            });
        },

        componentDidMount: function()
        {
            this.state.token.bind("change", this.tokenChanged);
        },

        componentWillUnmount: function()
        {
            this.state.token.unbind("change", this.tokenChanged);
        },

        render: function()
        {
            InputValidator.validateNotNull("initialToken property", this.props.initialToken);
            InputValidator.validateNotNull("isCompact property", this.props.isCompact);

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
            var myToken = this.state.token;

            var rows = [];

            var element0 = React.createElement(NamePanel,
            {
                pilotSkillValue: myToken.pilotSkillValue(),
                pilotName: myToken.pilotName(),
                shipName: myToken.shipName(),
                team: myToken.pilot().shipTeam.teamKey,
            });
            var cell0 = React.DOM.td({}, element0);
            rows.push(React.DOM.tr(
            {
                key: 0
            }, cell0));

            var element1 = React.createElement(StatsPanel,
            {
                isCompact: true,
                factionKey: myToken.pilot().shipTeam.teamKey,
                primaryWeaponValue: myToken.primaryWeaponValue(),
                agilityValue: myToken.agilityValue(),
                hullValue: myToken.hullValue(),
                shieldValue: myToken.shieldValue(),
            });
            var cell1 = React.DOM.td({}, element1);
            rows.push(React.DOM.tr(
            {
                key: 1
            }, cell1));

            var element2 = React.createElement(TokensPanel,
            {
                cloakCount: myToken.cloak().count(),
                evadeCount: myToken.evade().count(),
                focusCount: myToken.focus().count(),
                ionCount: myToken.ion().count(),
                shieldCount: myToken.shield().count(),
                stressCount: myToken.stress().count(),
                weaponsDisabledCount: myToken.weaponsDisabled().count(),
                attackerTargetLocks: myToken.attackerTargetLocks(),
                defenderTargetLocks: myToken.defenderTargetLocks(),
                damageCount: myToken.damageCount(),
                criticalDamageCount: myToken.criticalDamageCount(),
            });
            var cell2 = React.DOM.td({}, element2);
            rows.push(React.DOM.tr(
            {
                key: 2
            }, cell2));

            return React.DOM.table(
            {
                className: "pilotCard"
            }, rows);
        },

        renderLarge: function()
        {
            var myToken = this.state.token;
            var pilot = myToken.pilot();
            var ship = pilot.shipTeam.ship;
            var pilotDescription = pilot.description;
            var pilotDescriptionClassName = "pilotCardUIDescription" + (pilot.isFlavorText ? " flavorText" : "");
            var pilotCost = pilot.squadPointCost;
            var prefix = myToken.toString();
            var shipActionKeys = ship.shipActionKeys;
            var upgradeTypeKeys = myToken.upgradeTypeKeys();
            var rows = [];

            var element00 = React.createElement(NamePanel,
            {
                pilotSkillValue: myToken.pilotSkillValue(),
                pilotName: myToken.pilotName(),
                shipName: myToken.shipName(),
                team: pilot.shipTeam.teamKey,
            });
            var cell00 = React.DOM.td({}, element00);
            rows.push(React.DOM.tr(
            {
                key: rows.length,
            }, cell00));

            var innerCells10 = [];
            var element100 = React.createElement(StatsPanel,
            {
                isCompact: false,
                factionKey: myToken.pilot().shipTeam.teamKey,
                primaryWeaponValue: myToken.primaryWeaponValue(),
                agilityValue: myToken.agilityValue(),
                hullValue: myToken.hullValue(),
                shieldValue: myToken.shieldValue(),
            });
            innerCells10.push(React.DOM.td(
            {
                key: 0,
                rowSpan: 2
            }, element100));
            innerCells10.push(React.DOM.td(
            {
                key: 1,
                className: pilotDescriptionClassName
            }, pilotDescription));

            var element101 = React.createElement(ShipActionPanel,
            {
                shipActions: shipActionKeys
            });
            var innerCell11 = React.DOM.td({}, element101);

            var innerRows1 = [];
            innerRows1.push(React.DOM.tr(
            {
                key: 0
            }, innerCells10));
            innerRows1.push(React.DOM.tr(
            {
                key: 1
            }, innerCell11));

            var innerTable1 = React.DOM.table({}, innerRows1);
            var cell10 = React.DOM.td({}, innerTable1);
            rows.push(React.DOM.tr(
            {
                key: rows.length,
            }, cell10));

            var innerCells20 = [];
            var element201 = React.createElement(UpgradePanel,
            {
                upgradeTypes: upgradeTypeKeys
            });
            innerCells20.push(React.DOM.td(
            {
                key: innerCells20.length,
                className: "pilotCardUISilhouetteCell"
            }, React.createElement(ShipSilhouetteUI,
            {
                shipKey: pilot.shipTeam.shipKey,
            })));
            innerCells20.push(React.DOM.td(
            {
                key: innerCells20.length,
                className: "pilotCardUIUpgradeCell"
            }, element201));
            innerCells20.push(React.DOM.td(
            {
                key: innerCells20.length,
                className: "pilotCardUISquadPointCost",
                title: "Squad Point cost"
            }, pilotCost));
            var innerRow2 = React.DOM.tr({}, innerCells20);
            var innerTable2 = React.DOM.table(
            {
                className: "pilotCardUIUpgradeSquadCost"
            }, innerRow2);
            var cell20 = React.DOM.td({}, innerTable2);
            rows.push(React.DOM.tr(
            {
                key: rows.length,
            }, cell20));

            var element30 = React.createElement(TokensPanel,
            {
                token: myToken,
                cloakCount: myToken.cloak().count(),
                evadeCount: myToken.evade().count(),
                focusCount: myToken.focus().count(),
                ionCount: myToken.ion().count(),
                shieldCount: myToken.shield().count(),
                stressCount: myToken.stress().count(),
                weaponsDisabledCount: myToken.weaponsDisabled().count(),
                attackerTargetLocks: myToken.attackerTargetLocks(),
                defenderTargetLocks: myToken.defenderTargetLocks(),
                damageCount: myToken.damageCount(),
                criticalDamageCount: myToken.criticalDamageCount(),
            });
            var cell30 = React.DOM.td({}, element30);
            rows.push(React.DOM.tr(
            {
                key: 3
            }, cell30));

            return React.DOM.table(
            {
                className: "pilotCard"
            }, rows);
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

    var NamePanel = React.createClass(
    {
        render: function()
        {
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
            var cells = [];
            var image0 = React.createElement(ShipStateUI,
            {
                shipStateKey: "Weapon",
                factionKey: this.props.factionKey,
            });
            cells.push(React.DOM.td(
            {
                key: cells.length,
                className: 'primaryWeaponValue',
                title: 'Primary Weapon'
            }, image0));
            cells.push(React.DOM.td(
            {
                key: cells.length,
                className: 'primaryWeaponValue',
                title: 'Primary Weapon'
            }, this.props.primaryWeaponValue));

            var image1 = React.createElement(ShipStateUI,
            {
                shipStateKey: "Agility",
                factionKey: this.props.factionKey,
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
            }, this.props.agilityValue));

            var image2 = React.createElement(ShipStateUI,
            {
                shipStateKey: "Hull",
                factionKey: this.props.factionKey,
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
            }, this.props.hullValue));

            var image3 = React.createElement(ShipStateUI,
            {
                shipStateKey: "Shield",
                factionKey: this.props.factionKey,
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
            }, this.props.shieldValue));

            var row = React.DOM.tr({}, cells);

            return React.DOM.table(
            {
                className: "statsTable"
            }, row);
        },

        renderLarge: function()
        {
            var rows = [];
            var cells = [];
            var image0 = React.createElement(ShipStateUI,
            {
                shipStateKey: "Weapon",
                factionKey: this.props.factionKey,
            });
            cells.push(React.DOM.td(
            {
                key: cells.length,
                className: 'primaryWeaponValue',
                title: 'Primary Weapon'
            }, image0));
            cells.push(React.DOM.td(
            {
                key: cells.length,
                className: 'primaryWeaponValue',
                title: 'Primary Weapon'
            }, this.props.primaryWeaponValue));
            rows.push(React.DOM.tr(
            {
                key: rows.length,
            }, cells));

            cells = [];
            var image1 = React.createElement(ShipStateUI,
            {
                shipStateKey: "Agility",
                factionKey: this.props.factionKey,
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
            }, this.props.agilityValue));
            rows.push(React.DOM.tr(
            {
                key: rows.length,
            }, cells));

            cells = [];
            var image2 = React.createElement(ShipStateUI,
            {
                shipStateKey: "Hull",
                factionKey: this.props.factionKey,
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
            }, this.props.hullValue));
            rows.push(React.DOM.tr(
            {
                key: rows.length,
            }, cells));

            cells = [];
            var image3 = React.createElement(ShipStateUI,
            {
                shipStateKey: "Shield",
                factionKey: this.props.factionKey,
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
            }, this.props.shieldValue));
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

    var ShipActionPanel = React.createClass(
    {
        excludes: [ ShipAction.BARREL_ROLL_RIGHT, ShipAction.BOOST_STRAIGHT, ShipAction.BOOST_RIGHT ],

        render: function()
        {
            var shipActions = this.props.shipActions;
            var cells = [];

            for (var i = 0; i < shipActions.length; i++)
            {
                var shipAction = shipActions[i];

                if (!this.excludes.vizziniContains(shipAction))
                {
                    var myActionKey = shipAction;

                    if (shipAction === ShipAction.BARREL_ROLL_LEFT)
                    {
                        myActionKey = ShipAction.BARREL_ROLL;
                    }
                    else if (shipAction === ShipAction.BOOST_LEFT)
                    {
                        myActionKey = ShipAction.BOOST;
                    }

                    var img = React.createElement(ShipActionUI,
                    {
                        shipActionKey: myActionKey,
                    });

                    cells.push(React.DOM.td(
                    {
                        key: i,
                        className: "pilotCardUIShipActionCell"
                    }, img));
                }
            }

            var row = React.DOM.tr(
            {
                className: "pilotCardUIShipActions"
            }, cells);
            return React.DOM.table(
            {
                className: "pilotCardUIShipActions"
            }, row);
        },
    });

    var UpgradePanel = React.createClass(
    {
        render: function()
        {
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
            var element0 = React.createElement(LabeledImage,
            {
                image: "token/CloakToken32.png",
                label: this.props.cloakCount,
                labelClass: "labelImageText",
                title: "Cloak",
                width: 36,
            });
            var element1 = React.createElement(LabeledImage,
            {
                image: "token/EvadeToken32.png",
                label: this.props.evadeCount,
                labelClass: "labelImageText",
                title: "Evade",
            });
            var element2 = React.createElement(LabeledImage,
            {
                image: "token/FocusToken32.png",
                label: this.props.focusCount,
                labelClass: "labelImageText",
                title: "Focus",
            });
            var element3 = React.createElement(LabeledImage,
            {
                image: "token/IonToken32.png",
                label: this.props.ionCount,
                labelClass: "labelImageText",
                title: "Ion",
            });
            var element4 = React.createElement(LabeledImage,
            {
                image: "token/ShieldToken32.png",
                label: this.props.shieldCount,
                labelClass: "labelImageText",
                title: "Shield",
            });
            var element5 = React.createElement(LabeledImage,
            {
                image: "token/StressToken32.png",
                label: this.props.stressCount,
                labelClass: "labelImageText",
                title: "Stress",
            });
            var element6 = React.createElement(LabeledImage,
            {
                image: "token/WeaponsDisabledToken32.png",
                label: this.props.weaponsDisabledCount,
                labelClass: "labelImageText",
                title: "Weapons Disabled",
            });
            var element7 = React.createElement(LabeledImage,
            {
                image: "pilotCard/Damage32.jpg",
                label: this.props.damageCount,
                labelClass: "damageImageText",
                title: "Damage",
            });
            var element8 = React.createElement(LabeledImage,
            {
                image: "pilotCard/CriticalDamage32.jpg",
                label: this.props.criticalDamageCount,
                labelClass: "damageImageText",
                title: "Critical Damage",
            });

            var cells = [];
            cells.push(React.DOM.td(
            {
                key: cells.length,
            }, element0));
            cells.push(React.DOM.td(
            {
                key: cells.length,
            }, element1));
            cells.push(React.DOM.td(
            {
                key: cells.length,
            }, element2));
            cells.push(React.DOM.td(
            {
                key: cells.length,
            }, element3));
            cells.push(React.DOM.td(
            {
                key: cells.length,
            }, element4));
            cells.push(React.DOM.td(
            {
                key: cells.length,
            }, element5));

            this.props.attackerTargetLocks.forEach(function(targetLock)
            {
                var title = "Target Lock to " + targetLock.defender().name();
                var element = React.createElement(LabeledImage,
                {
                    image: "token/AttackerTargetLock32.png",
                    label: targetLock.id(),
                    labelClass: "labelImageText",
                    title: title,
                    width: 38,
                });
                cells.push(React.DOM.td(
                {
                    key: cells.length,
                }, element));
            });

            this.props.defenderTargetLocks.forEach(function(targetLock)
            {
                var title = "Target Lock from " + targetLock.attacker().name();
                var element = React.createElement(LabeledImage,
                {
                    image: "token/DefenderTargetLock32.png",
                    label: targetLock.id(),
                    labelClass: "labelImageText",
                    title: title,
                    width: 38,
                });
                cells.push(React.DOM.td(
                {
                    key: cells.length,
                }, element));
            });

            cells.push(React.DOM.td(
            {
                key: cells.length,
            }, element6));
            cells.push(React.DOM.td(
            {
                key: cells.length,
            }, element7));
            cells.push(React.DOM.td(
            {
                key: cells.length,
            }, element8));

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

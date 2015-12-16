/*
 * Provides a token user interface for Starfighter Squadrons.
 * 
 * @param initialToken Initial token. (required)
 * @param isCompact Flag indicating whether to use a compact layout. (optional, default true)
 */
define([ "Pilot", "Ship", "ShipAction", "Team", "ui/UpgradeCardUI" ], function(Pilot, Ship, ShipAction, Team,
        UpgradeCardUI)
{
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

            var element0 = React.createElement(PilotCardUI.NamePanel,
            {
                pilotSkillValue: myToken.getPilotSkillValue(),
                pilotName: myToken.getPilotName(),
                shipName: myToken.getShipName(),
                team: myToken.getTeam(),
            });
            var cell0 = React.DOM.td({}, element0);
            rows.push(React.DOM.tr(
            {
                key: 0
            }, cell0));

            var element1 = React.createElement(PilotCardUI.StatsPanel,
            {
                isCompact: true,
                primaryWeaponValue: myToken.getPrimaryWeaponValue(),
                agilityValue: myToken.getAgilityValue(),
                hullValue: myToken.getHullValue(),
                shieldValue: myToken.getShieldValue(),
            });
            var cell1 = React.DOM.td({}, element1);
            rows.push(React.DOM.tr(
            {
                key: 1
            }, cell1));

            var element2 = React.createElement(PilotCardUI.TokensPanel,
            {
                cloakCount: myToken.getCloakCount(),
                evadeCount: myToken.getEvadeCount(),
                focusCount: myToken.getFocusCount(),
                ionCount: myToken.getIonCount(),
                shieldCount: myToken.getShieldCount(),
                stressCount: myToken.getStressCount(),
                damageCount: myToken.getDamageCount(),
                criticalDamageCount: myToken.getCriticalDamageCount(),
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
            var pilotProps = Pilot.properties[myToken.getPilot()];
            var shipProps = Ship.properties[myToken.getShip()];
            var pilotDescription = pilotProps.description;
            var pilotCost = pilotProps.squadPointCost;
            var prefix = myToken.toString();
            var shipActions = shipProps.shipActions;
            var upgradeTypes = pilotProps.upgradeTypes;
            var rows = [];

            var element00 = React.createElement(PilotCardUI.NamePanel,
            {
                pilotSkillValue: myToken.getPilotSkillValue(),
                pilotName: myToken.getPilotName(),
                shipName: myToken.getShipName(),
                team: myToken.getTeam(),
            });
            var cell00 = React.DOM.td({}, element00);
            rows.push(React.DOM.tr(
            {
                key: 0
            }, cell00));

            var innerCells10 = [];
            var element100 = React.createElement(PilotCardUI.StatsPanel,
            {
                isCompact: false,
                primaryWeaponValue: myToken.getPrimaryWeaponValue(),
                agilityValue: myToken.getAgilityValue(),
                hullValue: myToken.getHullValue(),
                shieldValue: myToken.getShieldValue(),
            });
            innerCells10.push(React.DOM.td(
            {
                key: 0,
                rowSpan: 2
            }, element100));
            innerCells10.push(React.DOM.td(
            {
                key: 1,
                className: "pilotCardUIDescription"
            }, pilotDescription));

            var element101 = React.createElement(PilotCardUI.ShipActionPanel,
            {
                shipActions: shipActions
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
                key: 1
            }, cell10));

            var innerCells20 = [];
            var element200 = React.createElement(PilotCardUI.UpgradePanel,
            {
                upgradeTypes: upgradeTypes
            });
            innerCells20.push(React.DOM.td(
            {
                key: 0,
                className: "pilotCardUIUpgradeCell"
            }, element200));
            innerCells20.push(React.DOM.td(
            {
                key: 1,
                className: "pilotCardUISquadPointCost",
                title: "Squad Point cost"
            }, pilotCost));
            innerRow2 = React.DOM.tr({}, innerCells20);
            var innerTable2 = React.DOM.table(
            {
                className: "pilotCardUIUpgradeSquadCost"
            }, innerRow2);
            var cell20 = React.DOM.td({}, innerTable2);
            rows.push(React.DOM.tr(
            {
                key: 2
            }, cell20));

            var element30 = React.createElement(PilotCardUI.TokensPanel,
            {
                cloakCount: myToken.getCloakCount(),
                evadeCount: myToken.getEvadeCount(),
                focusCount: myToken.getFocusCount(),
                ionCount: myToken.getIonCount(),
                shieldCount: myToken.getShieldCount(),
                stressCount: myToken.getStressCount(),
                damageCount: myToken.getDamageCount(),
                criticalDamageCount: myToken.getCriticalDamageCount(),
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
            LOGGER.info(this.state.token.getName() + " token change event");
            this.setState(
            {
                token: this.state.token
            });
        },
    });

    PilotCardUI.createActionImage = function(shipAction)
    {
        InputValidator.validateNotNull("shipAction", shipAction);

        var actionName0 = ShipAction.properties[shipAction].displayName;
        var actionName = actionName0.replace(" ", "");
        var fileString = imageBase + "pilotCard/" + actionName + "24.png";

        return React.DOM.img(
        {
            className: "pilotCardUIImage",
            src: fileString,
            title: actionName0
        });
    }

    PilotCardUI.NamePanel = React.createClass(
    {
        render: function()
        {
            var titleString = Team.properties[this.props.team].name + " Faction";
            var teamName = Team.properties[this.props.team].shortName;
            var fileString = imageBase + teamName + "Icon24.png";

            var cells0 = [];
            cells0.push(React.DOM.td(
            {
                key: 0,
                title: "Pilot Skill",
                className: "namePanel pilotSkillValue",
                rowSpan: 2
            }, this.props.pilotSkillValue));
            cells0.push(React.DOM.td(
            {
                key: 1,
                title: "Name",
                className: "namePanel"
            }, this.props.pilotName));
            var image = React.DOM.img(
            {
                title: titleString,
                src: fileString
            });
            cells0.push(React.DOM.td(
            {
                key: 2,
                className: "namePanel",
                rowSpan: 2
            }, image));

            var cell1 = React.DOM.td(
            {
                title: "Ship",
                className: "namePanel"
            }, this.props.shipName);

            var rows = [];
            rows.push(React.DOM.tr(
            {
                key: 0
            }, cells0));
            rows.push(React.DOM.tr(
            {
                key: 1
            }, cell1));

            return React.DOM.table(
            {
                className: "nameTable"
            }, rows);
        },
    });

    PilotCardUI.StatsPanel = React.createClass(
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
            var image0 = React.DOM.img(
            {
                src: imageBase + "pilotCard/WeaponIcon24.jpg",
            });
            cells.push(React.DOM.td(
            {
                key: 0,
                className: 'primaryWeaponValue',
                title: 'Primary Weapon'
            }, image0));
            cells.push(React.DOM.td(
            {
                key: 1,
                className: 'primaryWeaponValue',
                title: 'Primary Weapon'
            }, this.props.primaryWeaponValue));

            var image1 = React.DOM.img(
            {
                src: imageBase + "pilotCard/AgilityIcon24.jpg",
            });
            cells.push(React.DOM.td(
            {
                key: 2,
                className: 'agilityValue',
                title: 'Agility'
            }, image1));
            cells.push(React.DOM.td(
            {
                key: 3,
                className: 'agilityValue',
                title: 'Agility'
            }, this.props.agilityValue));

            var image2 = React.DOM.img(
            {
                src: imageBase + "pilotCard/HullIcon24.jpg",
            });
            cells.push(React.DOM.td(
            {
                key: 4,
                className: 'hullValue',
                title: 'Hull'
            }, image2));
            cells.push(React.DOM.td(
            {
                key: 5,
                className: 'hullValue',
                title: 'Hull'
            }, this.props.hullValue));

            var image3 = React.DOM.img(
            {
                src: imageBase + "pilotCard/ShieldIcon24.jpg",
            });
            cells.push(React.DOM.td(
            {
                key: 6,
                className: 'shieldValue',
                title: 'Shield'
            }, image3));
            cells.push(React.DOM.td(
            {
                key: 7,
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
            var cells0 = [];
            var image0 = React.DOM.img(
            {
                src: imageBase + "pilotCard/WeaponIcon24.jpg",
            });
            cells0.push(React.DOM.td(
            {
                key: 0,
                className: 'primaryWeaponValue',
                title: 'Primary Weapon'
            }, image0));
            cells0.push(React.DOM.td(
            {
                key: 1,
                className: 'primaryWeaponValue',
                title: 'Primary Weapon'
            }, this.props.primaryWeaponValue));
            rows.push(React.DOM.tr(
            {
                key: 0
            }, cells0));

            var cells1 = [];
            var image1 = React.DOM.img(
            {
                src: imageBase + "pilotCard/AgilityIcon24.jpg",
            });
            cells1.push(React.DOM.td(
            {
                key: 2,
                className: 'agilityValue',
                title: 'Agility'
            }, image1));
            cells1.push(React.DOM.td(
            {
                key: 3,
                className: 'agilityValue',
                title: 'Agility'
            }, this.props.agilityValue));
            rows.push(React.DOM.tr(
            {
                key: 1
            }, cells1));

            var cells2 = [];
            var image2 = React.DOM.img(
            {
                src: imageBase + "pilotCard/HullIcon24.jpg",
            });
            cells2.push(React.DOM.td(
            {
                key: 4,
                className: 'hullValue',
                title: 'Hull'
            }, image2));
            cells2.push(React.DOM.td(
            {
                key: 5,
                className: 'hullValue',
                title: 'Hull'
            }, this.props.hullValue));
            rows.push(React.DOM.tr(
            {
                key: 2
            }, cells2));

            var cells3 = [];
            var image3 = React.DOM.img(
            {
                src: imageBase + "pilotCard/ShieldIcon24.jpg",
            });
            cells3.push(React.DOM.td(
            {
                key: 6,
                className: 'shieldValue',
                title: 'Shield'
            }, image3));
            cells3.push(React.DOM.td(
            {
                key: 7,
                className: 'shieldValue',
                title: 'Shield'
            }, this.props.shieldValue));
            rows.push(React.DOM.tr(
            {
                key: 3
            }, cells3));

            return React.DOM.table(
            {
                className: "statsTable"
            }, rows);
        },
    });

    PilotCardUI.ShipActionPanel = React.createClass(
    {
        render: function()
        {
            var shipActions = this.props.shipActions;
            var cells = [];

            for (var i = 0; i < shipActions.length; i++)
            {
                var shipAction = shipActions[i];
                var img = PilotCardUI.createActionImage(shipAction);
                cells.push(React.DOM.td(
                {
                    key: i,
                    className: "pilotCardUIShipActionCell"
                }, img));
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

    PilotCardUI.UpgradePanel = React.createClass(
    {
        render: function()
        {
            var upgradeTypes = this.props.upgradeTypes;
            var cells = [];

            for (var i = 0; i < upgradeTypes.length; i++)
            {
                var upgradeType = upgradeTypes[i];
                var img = UpgradeCardUI.createUpgradeImage(upgradeType);
                cells.push(React.DOM.td(
                {
                    key: i
                }, img));
            }

            var row = React.DOM.tr({}, cells);
            return React.DOM.table(
            {
                className: "pilotCardUIUpgrades"
            }, row);
        },
    });

    PilotCardUI.CountToken = React.createClass(
    {
        render: function()
        {
            var divStyle =
            {
                backgroundImage: 'url(' + this.props.path + ')',
                width: this.props.width,
            };

            var answer;

            if (this.props.count == 0)
            {
                answer = React.DOM.span();
            }
            else if (this.props.count == 1)
            {
                answer = React.DOM.div(
                {
                    title: this.props.title,
                    className: 'countTokenBox',
                    style: divStyle
                });
            }
            else
            {
                var paragraph = React.DOM.p(
                {
                    className: this.props.numberClass
                }, this.props.count);
                return React.DOM.div(
                {
                    title: this.props.title,
                    className: 'countTokenBox',
                    style: divStyle
                }, paragraph);
            }

            return answer;
        },
    });

    PilotCardUI.TokensPanel = React.createClass(
    {
        render: function()
        {
            var element0 = React.createElement(PilotCardUI.CountToken,
            {
                title: "Cloak",
                width: "36",
                numberClass: "countTokenText",
                path: imageBase + "token/CloakToken32.png",
                count: this.props.cloakCount
            });
            var element1 = React.createElement(PilotCardUI.CountToken,
            {
                title: "Evade",
                width: "32",
                numberClass: "countTokenText",
                path: imageBase + "token/EvadeToken32.png",
                count: this.props.evadeCount
            });
            var element2 = React.createElement(PilotCardUI.CountToken,
            {
                title: "Focus",
                width: "32",
                numberClass: "countTokenText",
                path: imageBase + "token/FocusToken32.png",
                count: this.props.focusCount
            });
            var element3 = React.createElement(PilotCardUI.CountToken,
            {
                title: "Ion",
                width: "32",
                numberClass: "countTokenText",
                path: imageBase + "token/IonToken32.png",
                count: this.props.ionCount
            });
            var element4 = React.createElement(PilotCardUI.CountToken,
            {
                title: "Shield",
                width: "32",
                numberClass: "countTokenText",
                path: imageBase + "token/ShieldToken32.png",
                count: this.props.shieldCount
            });
            var element5 = React.createElement(PilotCardUI.CountToken,
            {
                title: "Stress",
                width: "32",
                numberClass: "countTokenText",
                path: imageBase + "token/StressToken32.png",
                count: this.props.stressCount
            });
            var element6 = React.createElement(PilotCardUI.CountToken,
            {
                title: "Damage",
                width: "32",
                numberClass: "damageCount",
                path: imageBase + "pilotCard/Damage32.jpg",
                count: this.props.damageCount
            });
            var element7 = React.createElement(PilotCardUI.CountToken,
            {
                title: "Critical Damage",
                width: "32",
                numberClass: "damageCount",
                path: imageBase + "pilotCard/CriticalDamage32.jpg",
                count: this.props.criticalDamageCount
            });

            var cells = [];
            cells.push(React.DOM.td(
            {
                key: 0
            }, element0));
            cells.push(React.DOM.td(
            {
                key: 1
            }, element1));
            cells.push(React.DOM.td(
            {
                key: 2
            }, element2));
            cells.push(React.DOM.td(
            {
                key: 3
            }, element3));
            cells.push(React.DOM.td(
            {
                key: 4
            }, element4));
            cells.push(React.DOM.td(
            {
                key: 5
            }, element5));
            cells.push(React.DOM.td(
            {
                key: 6
            }, element6));
            cells.push(React.DOM.td(
            {
                key: 7
            }, element7));

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

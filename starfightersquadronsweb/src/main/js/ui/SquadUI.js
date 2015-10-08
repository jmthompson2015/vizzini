/*
 * Provides a user interface for a starfighter squadron.
 * 
 * @param squad Squad.
 * @param removeFunction Called after an item is removed.
 */
var SquadUI = React.createClass(
{
    getInitialState: function()
    {
        return (
        {
            selected: []
        });
    },

    render: function()
    {
        var that = this;
        var checkAll = React.DOM.input(
        {
            type: "checkbox",
            onChange: this.selectAllActionPerformed
        });

        var headerCells = [];
        headerCells.push(React.DOM.th(
        {
            key: 0
        }, checkAll));
        headerCells.push(React.DOM.th(
        {
            key: 1
        }, "Pilot"));
        headerCells.push(React.DOM.th(
        {
            key: 2
        }, "Ship"));
        headerCells.push(React.DOM.th(
        {
            key: 3
        }, "Pilot Skill"));
        headerCells.push(React.DOM.th(
        {
            key: 4
        }, "Primary Weapon"));
        headerCells.push(React.DOM.th(
        {
            key: 5
        }, "Agility"));
        headerCells.push(React.DOM.th(
        {
            key: 6
        }, "Hull"));
        headerCells.push(React.DOM.th(
        {
            key: 7
        }, "Shield"));
        headerCells.push(React.DOM.th(
        {
            key: 8
        }, "Squad Points"));
        var header = React.DOM.tr(
        {
            key: -1
        }, headerCells);

        var rows = [];

        var squad = this.props.squad;
        var pilotSkillSum = 0;
        var primaryWeaponSum = 0;
        var agilitySum = 0;
        var hullSum = 0;
        var shieldSum = 0;
        var squadPointsSum = 0;

        for (var i = 0; i < squad.length; i++)
        {
            var token = squad[i];
            var isChecked = this.state.selected.vizziniContains(token);
            var pilot = token.getPilot();
            var pilotProps = Pilot.properties[pilot];
            var shipState = pilotProps.shipState;

            pilotSkillSum += shipState.getPilotSkillValue();
            primaryWeaponSum += shipState.getPrimaryWeaponValue();
            agilitySum += shipState.getAgilityValue();
            hullSum += shipState.getHullValue();
            shieldSum += shipState.getShieldValue();
            squadPointsSum += pilotProps.squadPointCost;

            var cells = [];
            var input = React.DOM.input(
            {
                type: "checkbox",
                checked: isChecked,
                onChange: that.setSelected.bind(this, token)
            });
            cells.push(React.DOM.td(
            {
                key: 0
            }, input));
            cells.push(React.DOM.td(
            {
                key: 1,
                className: "squadUIPilotName"
            }, pilotProps.name));
            cells.push(React.DOM.td(
            {
                key: 2,
                className: "squadUIPilotName"
            }, ShipTeam.properties[pilotProps.shipTeam].name));
            cells.push(React.DOM.td(
            {
                key: 3
            }, shipState.getPilotSkillValue()));
            cells.push(React.DOM.td(
            {
                key: 4
            }, shipState.getPrimaryWeaponValue()));
            cells.push(React.DOM.td(
            {
                key: 5
            }, shipState.getAgilityValue()));
            cells.push(React.DOM.td(
            {
                key: 6
            }, shipState.getHullValue()));
            cells.push(React.DOM.td(
            {
                key: 7
            }, shipState.getShieldValue()));
            cells.push(React.DOM.td(
            {
                key: 8
            }, pilotProps.squadPointCost));
            rows.push(React.DOM.tr(
            {
                key: token.getId()
            }, cells));

            var upgrades = token.getUpgrades();

            if (upgrades.length > 0)
            {
                for (var j = 0; j < upgrades.length; j++)
                {
                    var upgrade = upgrades[j];
                    var upgradeProps = UpgradeCard.properties[upgrade];

                    squadPointsSum += upgradeProps.squadPointCost;

                    var cells = [];
                    cells.push(React.DOM.td(
                    {
                        key: 0
                    }, " "));
                    var image = UpgradeCardUI.createUpgradeImage(
                            upgradeProps.type, 0);
                    var spacer = React.DOM.span(
                    {
                        key: 1
                    }, " ");
                    var name = React.DOM.span(
                    {
                        key: 2
                    }, upgradeProps.name);
                    cells.push(React.DOM.td(
                    {
                        key: 1,
                        className: "squadUIPilotName"
                    }, [ image, spacer, name ]));
                    cells.push(React.DOM.td(
                    {
                        key: 2
                    }, " "));
                    cells.push(React.DOM.td(
                    {
                        key: 3
                    }, " "));
                    cells.push(React.DOM.td(
                    {
                        key: 4
                    }, " "));
                    cells.push(React.DOM.td(
                    {
                        key: 5
                    }, " "));
                    cells.push(React.DOM.td(
                    {
                        key: 6
                    }, " "));
                    cells.push(React.DOM.td(
                    {
                        key: 7
                    }, " "));
                    cells.push(React.DOM.td(
                    {
                        key: 8
                    }, upgradeProps.squadPointCost));
                    rows.push(React.DOM.tr(
                    {
                        key: (100 * token.getId()) + j
                    }, cells));
                }
            }
        }

        var cells = [];
        cells.push(React.DOM.td(
        {
            key: 0,
            className: "squadUISum"
        }, " "));
        cells.push(React.DOM.td(
        {
            key: 1,
            className: "squadUISum"
        }, "Totals"));
        cells.push(React.DOM.td(
        {
            key: 2,
            className: "squadUISum"
        }, " "));
        cells.push(React.DOM.td(
        {
            key: 3,
            className: "squadUISum"
        }, pilotSkillSum));
        cells.push(React.DOM.td(
        {
            key: 4,
            className: "squadUISum"
        }, primaryWeaponSum));
        cells.push(React.DOM.td(
        {
            key: 5,
            className: "squadUISum"
        }, agilitySum));
        cells.push(React.DOM.td(
        {
            key: 6,
            className: "squadUISum"
        }, hullSum));
        cells.push(React.DOM.td(
        {
            key: 7,
            className: "squadUISum"
        }, shieldSum));
        cells.push(React.DOM.td(
        {
            key: 8,
            className: "squadUISum"
        }, squadPointsSum));
        rows.push(React.DOM.tr(
        {
            key: 2000
        }, cells));

        var removeButton = React.DOM.input(
        {
            type: "button",
            value: "Remove",
            onClick: this.removeFunction.bind(this, this.state.selected)
        });

        var thead = React.DOM.thead(
        {
            key: 0
        }, header);
        var tbody = React.DOM.tbody(
        {
            key: 1
        }, rows);
        var statsTable = React.DOM.table(
        {
            className: "squadUI"
        }, [ thead, tbody ]);
        var row0 = React.DOM.tr(
        {
            key: 0
        }, React.DOM.td({}, statsTable));
        var row1 = React.DOM.tr(
        {
            key: 1
        }, React.DOM.td(
        {
            className: "squadUIRemove"
        }, removeButton))

        return React.DOM.table({}, [ row0, row1 ]);
    },

    selectAllActionPerformed: function(event)
    {
        var selected = [];
        var squad = this.props.squad;

        if (event.target.checked)
        {
            selected = squad.slice();
        }

        this.setState(
        {
            selected: selected
        });
    },

    setSelected: function(token, event)
    {
        var selected = this.state.selected;

        if (event.target.checked)
        {
            if (!selected.vizziniContains(token))
            {
                selected[selected.length] = token;
            }
        }
        else
        {
            var index = selected.indexOf(token);
            selected.splice(index, 1);
        }

        this.setState(
        {
            selected: selected
        });
    },

    removeFunction: function(selected, event)
    {
        this.props.removeFunction(selected, event);
        this.setState(
        {
            selected: []
        });
    },
});

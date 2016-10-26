define(["UpgradeCard", "Value", "process/ui/ShipSilhouetteUI", "process/ui/UpgradeTypeUI"],
    function(UpgradeCard, Value, ShipSilhouetteUI, UpgradeTypeUI)
    {
        "use strict";
        var SquadColumns = [
            {
                key: "pilot",
                label: "Pilot",
                className: "squadUIPilotName",
    },
            {
                key: "ship",
                label: "Ship",
                className: "squadUIPilotName",
    },
            {
                key: "pilotSkill",
                label: "Pilot Skill",
                className: "numberCell",
    },
            {
                key: "primaryWeapon",
                label: "Primary Weapon",
                className: "numberCell",
    },
            {
                key: "agility",
                label: "Agility",
                className: "numberCell",
    },
            {
                key: "hull",
                label: "Hull",
                className: "numberCell",
    },
            {
                key: "shield",
                label: "Shield",
                className: "numberCell",
    },
            {
                key: "squadPointCost",
                label: "Squad Points",
                className: "numberCell",
    },
            {
                key: "action",
                label: "Action",
                className: "actionCell",
    }, ];

        /*
         * Provides a user interface for a starfighter squadron.
         *
         * @param squad Squad.
         *
         * @param iconBase Icon base URL.
         *
         * @param removeFunction Called after an item is removed.
         */
        var SquadUI = React.createClass(
        {
            // Factories.
            Table: React.createFactory(Reactable.Table),
            Tr: React.createFactory(Reactable.Tr),
            Td: React.createFactory(Reactable.Td),
            Tfoot: React.createFactory(Reactable.Tfoot),

            render: function()
            {
                var squad = this.props.squad;

                // Assign actions.
                squad.forEach(function(token)
                {
                    if (!token.removeAction)
                    {
                        token.removeAction = this.createRemoveAction(token);
                    }
                }, this);

                var rows = [];
                squad.forEach(function(token, i)
                {
                    if (token.tokenFore && token.tokenAft)
                    {
                        rows.push(this.createRows(token.tokenFore(), "fore" + i));
                        rows.push(this.createRows(token.tokenAft(), "aft" + i));
                    }
                    else
                    {
                        rows.push(this.createRows(token, i));
                    }
                }, this);
                var footer = this.Tfoot(
                {
                    key: "footer",
                }, this.createTotalsRow());
                var myColumns = (this.isEditable() ? SquadColumns : SquadColumns.slice(0, SquadColumns.length - 1));

                return this.Table(
                {
                    className: "squadUI",
                    columns: myColumns,
                }, rows, footer);
            },

            createCell: function(key, column, value)
            {
                return this.Td(
                {
                    key: key,
                    className: column.className,
                    column: column.key,
                }, (value !== undefined ? value : ""));
            },

            createRemoveAction: function(token)
            {
                var removeFunction = this.props.removeFunction;
                var myOnClick = function(event)
                {
                    removeFunction(token);
                };
                var image = React.DOM.img(
                {
                    src: iconBase + "delete.png",
                });

                return React.DOM.a(
                {
                    href: "#",
                    className: "removeButton",
                    onClick: myOnClick,
                }, image);
            },

            createRows: function(token, key)
            {
                var answer = [];

                answer.push(this.createTokenRow(token, key));

                var upgrades = token.upgradeKeys();
                var self = this;

                upgrades.forEach(function(upgrade, j)
                {
                    answer.push(self.createUpgradeRow(upgrade, j));
                });

                return answer;
            },

            createTokenRow: function(token, key)
            {
                var cells = [];
                var createCell = this.createCell;
                var j = 0;

                var pilotProps = token.pilot();
                var shipProps = pilotProps.shipTeam.ship;
                cells.push(createCell(cells.length, SquadColumns[j++], React.DOM.span(
                {
                    title: pilotProps.description,
                }, pilotProps.name)));
                cells.push(createCell(cells.length, SquadColumns[j++], React.createElement(ShipSilhouetteUI,
                {
                    shipKey: pilotProps.shipTeam.shipKey,
                    showName: true,
                })));

                cells.push(createCell(cells.length, SquadColumns[j++], token.shipState(Value.PILOT_SKILL)));
                cells.push(createCell(cells.length, SquadColumns[j++], token.shipState(Value.PRIMARY_WEAPON)));
                cells.push(createCell(cells.length, SquadColumns[j++], token.shipState(Value.AGILITY)));
                cells.push(createCell(cells.length, SquadColumns[j++], token.shipState(Value.HULL)));
                cells.push(createCell(cells.length, SquadColumns[j++], token.shipState(Value.SHIELD)));

                cells.push(createCell(cells.length, SquadColumns[j++], pilotProps.squadPointCost));

                var actionFunction = token.removeAction;
                cells.push(createCell(cells.length, SquadColumns[j++], actionFunction));

                return this.Tr(
                {
                    key: key,
                }, cells);
            },

            createTotalsRow: function()
            {
                var squad = this.props.squad;
                var sums = {};
                var start = 2;
                var i = 0;
                sums[SquadColumns[i++].key] = "";
                sums[SquadColumns[i++].key] = "Totals";
                for (var j = start; j < SquadColumns.length; j++)
                {
                    sums[SquadColumns[j].key] = 0;
                }

                squad.forEach(function(token0)
                {
                    var tokens = [];

                    if (token0.tokenFore && token0.tokenAft)
                    {
                        tokens.push(token0.tokenFore());
                        tokens.push(token0.tokenAft());
                    }
                    else
                    {
                        tokens.push(token0);
                    }

                    tokens.forEach(function(token)
                    {
                        var pilotProps = token.pilot();
                        var values = [token.shipState(Value.PILOT_SKILL), token.shipState(Value.PRIMARY_WEAPON),
                            token.shipState(Value.AGILITY), token.shipState(Value.HULL), token.shipState(Value.SHIELD),
                            pilotProps.squadPointCost];

                        for (var i = start; i < SquadColumns.length; i++)
                        {
                            sums[SquadColumns[i].key] += values[i - start];
                        }

                        var upgradeKeys = token.upgradeKeys();
                        upgradeKeys.forEach(function(upgradeKey)
                        {
                            var upgrade = UpgradeCard.properties[upgradeKey];
                            var values = [upgrade.pilotSkillValue, upgrade.primaryWeaponValue, upgrade.agilityValue,
                                upgrade.hullValue, upgrade.shieldValue];

                            for (var i = start; i < SquadColumns.length - 2; i++)
                            {
                                if (values[i - start] !== undefined)
                                {
                                    sums[SquadColumns[i].key] += values[i - start];
                                }
                            }
                            sums[SquadColumns[SquadColumns.length - 2].key] += upgrade.squadPointCost;
                        });
                    });

                    sums[SquadColumns[SquadColumns.length - 1].key] = "";
                });

                var cells = [];
                var isEditable = this.isEditable();
                SquadColumns.forEach(function(column)
                {
                    if (isEditable || (!isEditable && column.key !== "action"))
                    {
                        cells.push(React.DOM.td(
                        {
                            key: cells.length,
                            className: "squadUISum",
                        }, sums[column.key]));
                    }
                }, this);

                return React.DOM.tr(
                {}, cells);
            },

            createUpgradeRow: function(upgradeKey, i)
            {
                var cells = [];
                var createCell = this.createCell;
                var j = 0;

                var upgrade = UpgradeCard.properties[upgradeKey];
                if (!upgrade)
                {
                    LOGGER.error("Missing upgrade for " + upgradeKey);
                }
                if (!upgrade.type)
                {
                    LOGGER.error("Missing upgrade.type for " + upgradeKey);
                }
                var image = React.createElement(UpgradeTypeUI,
                {
                    upgradeTypeKey: upgrade.type,
                });
                cells.push(this.Td(
                {
                    key: cells.length,
                    className: "squadUIPilotName",
                    column: SquadColumns[j++].key,
                }, React.DOM.span(
                {}, image, " ", React.DOM.span(
                {
                    title: upgrade.description,
                }, upgrade.name))));

                cells.push(createCell(cells.length, SquadColumns[j++], ""));

                cells.push(createCell(cells.length, SquadColumns[j++], upgrade[Value.PILOT_SKILL + "Value"]));
                cells.push(createCell(cells.length, SquadColumns[j++], upgrade[Value.PRIMARY_WEAPON + "Value"]));
                cells.push(createCell(cells.length, SquadColumns[j++], upgrade[Value.AGILITY + "Value"]));
                cells.push(createCell(cells.length, SquadColumns[j++], upgrade[Value.HULL + "Value"]));
                cells.push(createCell(cells.length, SquadColumns[j++], upgrade[Value.SHIELD + "Value"]));

                cells.push(createCell(cells.length, SquadColumns[j++], upgrade.squadPointCost));
                cells.push(createCell(cells.length, SquadColumns[j++], ""));

                return this.Tr(
                {
                    key: i,
                }, cells);
            },

            isEditable: function()
            {
                var isEditable = this.props.isEditable;

                return (isEditable ? isEditable : false);
            },

            removeFunction: function(selected, event)
            {
                this.props.removeFunction(selected, event);
            },
        });

        return SquadUI;
    });

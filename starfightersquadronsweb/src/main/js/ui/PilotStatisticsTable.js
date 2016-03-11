define([ "Pilot", "ui/FactionUI", "ui/ShipSilhouetteUI" ], function(Pilot, FactionUI, ShipSilhouetteUI)
{
    "use strict";
    var PilotColumns = [
    {
        key: "faction",
        label: "Faction",
    },
    {
        key: "pilot",
        label: "Pilot",
        className: "textCell",
    },
    {
        key: "ship",
        label: "Ship",
        className: "textCell",
    },
    {
        key: "description",
        label: "Description",
        className: "textCell",
    },
    {
        key: "isImplemented",
        label: "Implemented",
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
        label: "Squad Point Cost",
        className: "numberCell",
    },
    {
        key: "sumStats",
        label: "Sum Stats",
        className: "numberCell",
    },
    {
        key: "ratioPrimaryWeaponAgility",
        label: "Primary Weapon / Agility",
        className: "numberCell",
    },
    {
        key: "hullPlusShield",
        label: "Hull + Shield",
        className: "numberCell",
    },
    {
        key: "ratioSumStatsSquadPointCost",
        label: "Sum Stats / Squad Point Cost",
        className: "numberCell",
    }, ];

    var PilotStatisticsTable = React.createClass(
    {
        // Factories.
        Table: React.createFactory(Reactable.Table),
        Tr: React.createFactory(Reactable.Tr),
        Td: React.createFactory(Reactable.Td),
        Tfoot: React.createFactory(Reactable.Tfoot),

        render: function()
        {
            var rows = [];

            var pilotKeys = Pilot.values();
            var self = this;

            pilotKeys.forEach(function(pilotKey, i)
            {
                var pilot = Pilot.properties[pilotKey];

                if (pilot.fore || pilot.aft)
                {
                    rows.push(self.createRow(pilot.fore, "fore" + i));
                    rows.push(self.createRow(pilot.aft, "aft" + i));
                }
                else
                {
                    rows.push(self.createRow(pilot, i));
                }
            });

            return this.Table(
            {
                id: "pilotTable",
                columns: PilotColumns,
                sortable: true,
            }, rows);
        },

        createCell: function(key, column, value)
        {
            return this.Td(
            {
                key: key,
                className: column.className,
                column: column.key,
            }, value);
        },

        createImplementedImage: function(isImplemented, key)
        {
            InputValidator.validateNotNull("isImplemented", isImplemented);

            var implementedName = (isImplemented ? "accept" : "delete");
            var fileString = iconBase + implementedName + ".png";
            var myKey = (key ? key : 0);

            return React.DOM.img(
            {
                key: myKey,
                className: "isImplementedImage",
                src: fileString,
                title: isImplemented,
            });
        },

        createRow: function(pilot, i)
        {
            var cells = [];

            var shipTeam = pilot.shipTeam;
            var j = 0;

            cells.push(this.Td(
            {
                key: cells.length,
                className: PilotColumns[j].className,
                column: PilotColumns[j++].key,
                value: shipTeam.team.name, // this allows sorting
            }, React.createElement(FactionUI,
            {
                factionKey: shipTeam.teamKey,
                isSmall: true,
            })));

            cells.push(this.createCell(cells.length, PilotColumns[j++], pilot.name));

            cells.push(this.Td(
            {
                key: cells.length,
                className: PilotColumns[j].className,
                column: PilotColumns[j++].key,
                value: shipTeam.ship.name, // this allows sorting
            }, React.createElement(ShipSilhouetteUI,
            {
                shipKey: shipTeam.shipKey,
                showName: true,
            })));

            if (pilot.isFlavorText)
            {
                cells.push(React.DOM.td(
                {
                    key: cells.length,
                    className: PilotColumns[j].className + " flavorText",
                    column: PilotColumns[j++].key,
                }, pilot.description));
            }
            else
            {
                cells.push(this.createCell(cells.length, PilotColumns[j++], pilot.description));
            }

            var isImplemented = (pilot.isImplemented !== undefined ? pilot.isImplemented : false);
            var implementedImage = this.createImplementedImage(isImplemented);
            cells.push(React.DOM.td(
            {
                key: cells.length,
                className: PilotColumns[j].className,
                column: PilotColumns[j++].key,
                value: isImplemented, // this allows sorting
            }, implementedImage));

            var shipState = pilot.shipState;
            var pilotSkill = shipState.pilotSkillValue();
            cells.push(this.createCell(cells.length, PilotColumns[j++], (pilotSkill ? pilotSkill : " ")));

            var primaryWeapon = shipState.primaryWeaponValue();
            cells.push(this.createCell(cells.length, PilotColumns[j++], primaryWeapon));

            var agility = shipState.agilityValue();
            cells.push(this.createCell(cells.length, PilotColumns[j++], agility));

            var hull = shipState.hullValue();
            cells.push(this.createCell(cells.length, PilotColumns[j++], hull));

            var shield = shipState.shieldValue();
            cells.push(this.createCell(cells.length, PilotColumns[j++], shield));

            var sum = pilotSkill + primaryWeapon + agility + hull + shield;
            cells.push(this.createCell(cells.length, PilotColumns[j++], sum));

            var squadPointCost = pilot.squadPointCost;
            cells.push(this.createCell(cells.length, PilotColumns[j++], (squadPointCost ? squadPointCost : " ")));

            var ratio0 = (agility === 0 ? null : primaryWeapon / agility);
            cells.push(this.Td(
            {
                key: cells.length,
                className: PilotColumns[j].className,
                column: PilotColumns[j++].key,
                value: ratio0, // this allows sorting
            }, Math.vizziniFormat(ratio0, 2)));

            cells.push(this.createCell(cells.length, PilotColumns[j++], hull + shield));

            var ratio1 = sum / squadPointCost;
            cells.push(this.Td(
            {
                key: cells.length,
                className: PilotColumns[j].className,
                column: PilotColumns[j++].key,
                value: ratio1, // this allows sorting
            }, Math.vizziniFormat(ratio1, 4)));

            return this.Tr(
            {
                key: i
            }, cells);
        },
    });

    return PilotStatisticsTable;
});

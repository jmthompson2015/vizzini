define([ "Pilot", "ShipTeam", "Team" ], function(Pilot, ShipTeam, Team)
{
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

            var pilots = Pilot.values();
            var self = this;

            pilots.forEach(function(pilot, i)
            {
                rows.push(self.createRow(pilot, i));
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

            var pilotProps = Pilot.properties[pilot];
            var shipTeam = pilotProps.shipTeam;
            var team = ShipTeam.properties[shipTeam].team;
            var teamName0 = Team.properties[team].name;
            var teamName1 = Team.properties[team].shortName;
            var imageFile = imageBase + teamName1 + "Icon24.png";
            var i = 0;

            cells.push(this.Td(
            {
                key: cells.length,
                className: PilotColumns[i].className,
                column: PilotColumns[i++].key,
                value: teamName0, // this allows sorting
            }, React.DOM.img(
            {
                alt: teamName0,
                src: imageFile,
                title: teamName0,
            })));

            cells.push(this.createCell(cells.length, PilotColumns[i++], pilotProps.name));

            cells.push(this.createCell(cells.length, PilotColumns[i++], ShipTeam.properties[shipTeam].name));

            if (pilotProps.isFlavorText)
            {
                cells.push(React.DOM.td(
                {
                    key: cells.length,
                    className: PilotColumns[i].className + " flavorText",
                    column: PilotColumns[i++].key,
                }, pilotProps.description));
            }
            else
            {
                cells.push(this.createCell(cells.length, PilotColumns[i++], pilotProps.description));
            }

            var isImplemented = (pilotProps.isImplemented !== undefined ? pilotProps.isImplemented : false);
            var implementedImage = this.createImplementedImage(isImplemented);
            cells.push(React.DOM.td(
            {
                key: cells.length,
                className: PilotColumns[i].className,
                column: PilotColumns[i++].key,
                value: isImplemented, // this allows sorting
            }, implementedImage));

            var shipState = Pilot.properties[pilot].shipState;
            var pilotSkill = shipState.pilotSkillValue();
            cells.push(this.createCell(cells.length, PilotColumns[i++], (pilotSkill ? pilotSkill : " ")));

            var primaryWeapon = shipState.primaryWeaponValue();
            cells.push(this.createCell(cells.length, PilotColumns[i++], primaryWeapon));

            var agility = shipState.agilityValue();
            cells.push(this.createCell(cells.length, PilotColumns[i++], agility));

            var hull = shipState.hullValue();
            cells.push(this.createCell(cells.length, PilotColumns[i++], hull));

            var shield = shipState.shieldValue();
            cells.push(this.createCell(cells.length, PilotColumns[i++], shield));

            var sum = pilotSkill + primaryWeapon + agility + hull + shield;
            cells.push(this.createCell(cells.length, PilotColumns[i++], sum));

            var squadPointCost = Pilot.properties[pilot].squadPointCost;
            cells.push(this.createCell(cells.length, PilotColumns[i++], (squadPointCost ? squadPointCost : " ")));

            var ratio0 = (agility === 0 ? null : primaryWeapon / agility);
            cells.push(this.Td(
            {
                key: cells.length,
                className: PilotColumns[i].className,
                column: PilotColumns[i++].key,
                value: ratio0, // this allows sorting
            }, Math.vizziniFormat(ratio0, 2)));

            cells.push(this.createCell(cells.length, PilotColumns[i++], hull + shield));

            var ratio1 = sum / squadPointCost;
            cells.push(this.Td(
            {
                key: cells.length,
                className: PilotColumns[i].className,
                column: PilotColumns[i++].key,
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

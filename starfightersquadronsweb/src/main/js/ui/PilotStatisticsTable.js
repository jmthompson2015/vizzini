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

        createRow: function(pilot, i)
        {
            var cells = [];

            var pilotProps = Pilot.properties[pilot];
            var shipTeam = pilotProps.shipTeam;
            var team = ShipTeam.properties[shipTeam].team;
            var teamName0 = Team.properties[team].name;
            var teamName1 = (teamName0 === "Scum & Villainy" ? "Scum" : teamName0);
            var imageFile = "../resources/images/" + teamName1 + "Icon24.png";
            cells.push(this.Td(
            {
                key: cells.length,
                className: PilotColumns[0].className,
                column: PilotColumns[0].key,
                value: teamName0, // this allows sorting
            }, React.DOM.img(
            {
                alt: teamName0,
                src: imageFile,
                title: teamName0,
            })));

            cells.push(this.createCell(cells.length, PilotColumns[1], pilotProps.name));

            cells.push(this.createCell(cells.length, PilotColumns[2], ShipTeam.properties[shipTeam].name));

            var shipState = Pilot.properties[pilot].shipState;
            var pilotSkill = shipState.getPilotSkillValue();
            cells.push(this.createCell(cells.length, PilotColumns[3], pilotSkill));

            var primaryWeapon = shipState.getPrimaryWeaponValue();
            cells.push(this.createCell(cells.length, PilotColumns[4], primaryWeapon));

            var agility = shipState.getAgilityValue();
            cells.push(this.createCell(cells.length, PilotColumns[5], agility));

            var hull = shipState.getHullValue();
            cells.push(this.createCell(cells.length, PilotColumns[6], hull));

            var shield = shipState.getShieldValue();
            cells.push(this.createCell(cells.length, PilotColumns[7], shield));

            var sum = pilotSkill + primaryWeapon + agility + hull + shield;
            cells.push(this.createCell(cells.length, PilotColumns[8], sum));

            var squadPointCost = Pilot.properties[pilot].squadPointCost;
            cells.push(this.createCell(cells.length, PilotColumns[9], squadPointCost));

            var ratio0 = (agility === 0 ? null : primaryWeapon / agility);
            cells.push(this.Td(
            {
                key: cells.length,
                className: PilotColumns[10].className,
                column: PilotColumns[10].key,
                value: ratio0, // this allows sorting
            }, Math.vizziniFormat(ratio0, 2)));

            cells.push(this.createCell(cells.length, PilotColumns[11], hull + shield));

            var ratio1 = sum / squadPointCost;
            cells.push(this.Td(
            {
                key: cells.length,
                className: PilotColumns[12].className,
                column: PilotColumns[12].key,
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

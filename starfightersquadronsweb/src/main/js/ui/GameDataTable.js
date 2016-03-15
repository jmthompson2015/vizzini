define([ "AttackDice", "Bearing", "DamageCard", "DamageCardTrait", "DamageCardV2", "DefenseDice", "Difficulty",
        "FiringArc", "Maneuver", "Phase", "Pilot", "PlayFormat", "RangeRuler", "Ship", "ShipAction", "ShipBase",
        "ShipTeam", "Team", "UpgradeCard", "UpgradeHeader", "UpgradeRestriction", "UpgradeType" ], function(AttackDice,
        Bearing, DamageCard, DamageCardTrait, DamageCardV2, DefenseDice, Difficulty, FiringArc, Maneuver, Phase, Pilot,
        PlayFormat, RangeRuler, Ship, ShipAction, ShipBase, ShipTeam, Team, UpgradeCard, UpgradeHeader,
        UpgradeRestriction, UpgradeType)
{
    "use strict";
    var GameColumns = [
    {
        key: "item",
        label: "Item",
        className: "textCell",
    },
    {
        key: "count",
        label: "Count",
        className: "numberCell",
    }, ];

    var GameDataTable = React.createClass(
    {
        // Factories.
        Table: React.createFactory(Reactable.Table),
        Tr: React.createFactory(Reactable.Tr),
        Td: React.createFactory(Reactable.Td),

        render: function()
        {
            var rows = [];

            rows.push(this.createRow("Bearings", Bearing.values().length, rows.length));
            rows.push(this.createRow("Damage Cards", DamageCard.values().length, rows.length));
            rows.push(this.createRow("Damage Card Traits", DamageCardTrait.values().length, rows.length));
            rows.push(this.createRow("Damage Cards V2", DamageCardV2.values().length, rows.length));
            rows.push(this.createRow("Difficulties", Difficulty.values().length, rows.length));
            rows.push(this.createRow("Factions", Team.values().length, rows.length));
            rows.push(this.createRow("Faction to Ships", ShipTeam.values().length, rows.length));
            rows.push(this.createRow("Firing Arcs", FiringArc.values().length, rows.length));
            rows.push(this.createRow("Maneuvers", Maneuver.values().length, rows.length));
            rows.push(this.createRow("Phases", Phase.values().length, rows.length));
            rows.push(this.createRow("Pilots", Pilot.values().length, rows.length));
            rows.push(this.createRow("Play Formats", PlayFormat.values().length, rows.length));
            rows.push(this.createRow("Ranges", RangeRuler.values().length, rows.length));
            rows.push(this.createRow("Ship Actions", ShipAction.values().length, rows.length));
            rows.push(this.createRow("Ship Bases", ShipBase.values().length, rows.length));
            rows.push(this.createRow("Ships", Ship.values().length, rows.length));
            rows.push(this.createRow("Upgrade Headers", UpgradeHeader.values().length, rows.length));
            rows.push(this.createRow("Upgrade Restrictions", UpgradeRestriction.values().length, rows.length));
            rows.push(this.createRow("Upgrade Types", UpgradeType.values().length, rows.length));
            rows.push(this.createRow("Upgrades", UpgradeCard.values().length, rows.length));

            return this.Table(
            {
                id: "gameTable",
                columns: GameColumns,
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
            }, (value !== undefined ? value : ""));
        },

        createRow: function(item, count, key)
        {
            var cells = [];
            var j = 0;

            cells.push(this.createCell(cells.length, GameColumns[j++], item));
            cells.push(this.createCell(cells.length, GameColumns[j++], count));

            return this.Tr(
            {
                key: key,
            }, cells);
        },
    });

    return GameDataTable;
});

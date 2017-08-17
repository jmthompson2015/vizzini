define(["Bearing", "ConditionCard", "DamageCard", "DamageCardTrait", "Difficulty", "FiringArc", "Maneuver", "Phase", "Pilot", "PlayFormat", "RangeRuler", "Ship", "ShipAction", "ShipBase", "ShipTeam", "Team", "UpgradeCard", "UpgradeHeader", "UpgradeRestriction", "UpgradeType"],
   function(Bearing, ConditionCard, DamageCard, DamageCardTrait, Difficulty, FiringArc, Maneuver, Phase, Pilot, PlayFormat, RangeRuler, Ship, ShipAction, ShipBase, ShipTeam, Team, UpgradeCard, UpgradeHeader, UpgradeRestriction, UpgradeType)
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
         },
      ];

      var GameDataTable = React.createClass(
      {
         // Factories.
         Table: React.createFactory(Reactable.Table),
         Tr: React.createFactory(Reactable.Tr),
         Td: React.createFactory(Reactable.Td),

         render: function()
         {
            var rows = [];

            rows.push(this.createRow("Bearing", Bearing.values().length, rows.length));
            rows.push(this.createRow("ConditionCard", ConditionCard.values().length, rows.length));
            rows.push(this.createRow("DamageCard", DamageCard.values().length, rows.length));
            rows.push(this.createRow("DamageCardTrait", DamageCardTrait.values().length, rows.length));
            rows.push(this.createRow("Difficulty", Difficulty.values().length, rows.length));
            rows.push(this.createRow("Faction", Team.values().length, rows.length));
            rows.push(this.createRow("Faction to Ship", ShipTeam.values().length, rows.length));
            rows.push(this.createRow("FiringArc", FiringArc.values().length, rows.length));
            rows.push(this.createRow("Maneuver", Maneuver.values().length, rows.length));
            rows.push(this.createRow("Phase", Phase.values().length, rows.length));
            rows.push(this.createRow("Pilot", Pilot.values().length, rows.length));
            rows.push(this.createRow("PlayFormat", PlayFormat.values().length, rows.length));
            rows.push(this.createRow("Range", RangeRuler.values().length, rows.length));
            rows.push(this.createRow("ShipAction", ShipAction.values().length, rows.length));
            rows.push(this.createRow("ShipBase", ShipBase.values().length, rows.length));
            rows.push(this.createRow("Ship", Ship.values().length, rows.length));
            rows.push(this.createRow("UpgradeHeader", UpgradeHeader.values().length, rows.length));
            rows.push(this.createRow("UpgradeRestriction", UpgradeRestriction.values().length, rows.length));
            rows.push(this.createRow("UpgradeType", UpgradeType.values().length, rows.length));
            rows.push(this.createRow("UpgradeCard", UpgradeCard.values().length, rows.length));

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

define([ "UpgradeCard", "UpgradeHeader", "UpgradeRestriction", "ui/UpgradeCardUI" ], function(UpgradeCard,
        UpgradeHeader, UpgradeRestriction, UpgradeCardUI)
{
    var UpgradeColumns = [
    {
        key: "type",
        label: "Type",
    },
    {
        key: "name",
        label: "Name",
        className: "textCell",
    },
    {
        key: "restrictions",
        label: "Restrictions",
        className: "textCell",
    },
    {
        key: "header",
        label: "Header",
        className: "textCell",
    },
    {
        key: "description",
        label: "Description",
        className: "textCell",
    },
    {
        key: "squadPointCost",
        label: "Squad Point Cost",
        className: "numberCell",
    },
    {
        key: "isImplemented",
        label: "Implemented",
    }, ];

    var UpgradeCardsTable = React.createClass(
    {
        // Factories.
        Table: React.createFactory(Reactable.Table),
        Tr: React.createFactory(Reactable.Tr),
        Td: React.createFactory(Reactable.Td),
        Tfoot: React.createFactory(Reactable.Tfoot),

        render: function()
        {
            var rows = [];

            var upgrades = UpgradeCard.values();
            var self = this;

            upgrades.forEach(function(upgrade, i)
            {
                rows.push(self.createRow(upgrade, i));
            });

            return this.Table(
            {
                id: "upgradeTable",
                columns: UpgradeColumns,
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

        createRow: function(upgrade, i)
        {
            var cells = [];

            var upgradeProps = UpgradeCard.properties[upgrade];
            var typeImage = UpgradeCardUI.createUpgradeImage(upgradeProps.type);
            var isUnique = (upgradeProps.isUnique ? "\u25CF" : "");
            var myRestrictions = " ";
            if (upgradeProps.restrictions)
            {
                myRestrictions = upgradeProps.restrictions.reduce(function(previousValue, restriction)
                {
                    return previousValue + " " + UpgradeRestriction.properties[restriction].displayName;
                }, "");
            }
            var myHeader = (upgradeProps.header ? UpgradeHeader.properties[upgradeProps.header].name : " ");
            var isImplemented = (upgradeProps.isImplemented !== undefined ? upgradeProps.isImplemented : false);
            var implementedImage = this.createImplementedImage(isImplemented);
            var i = 0;

            cells.push(React.DOM.td(
            {
                key: cells.length,
                className: UpgradeColumns[i].className,
                column: UpgradeColumns[i].key,
                value: upgradeProps.type, // this allows sorting
            }, typeImage));
            i++;

            cells.push(this.createCell(cells.length, UpgradeColumns[i++], upgradeProps.name));

            cells.push(this.createCell(cells.length, UpgradeColumns[i++], myRestrictions));

            cells.push(this.createCell(cells.length, UpgradeColumns[i++], myHeader));

            cells.push(this.createCell(cells.length, UpgradeColumns[i++], upgradeProps.description));

            cells.push(this.createCell(cells.length, UpgradeColumns[i++], upgradeProps.squadPointCost));

            cells.push(React.DOM.td(
            {
                key: cells.length,
                className: UpgradeColumns[i].className,
                column: UpgradeColumns[i].key,
                value: isImplemented, // this allows sorting
            }, implementedImage));
            i++;

            return this.Tr(
            {
                key: i
            }, cells);
        },
    });

    return UpgradeCardsTable;
});

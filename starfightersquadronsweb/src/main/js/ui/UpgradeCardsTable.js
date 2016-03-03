define([ "FiringArc", "UpgradeCard", "UpgradeHeader", "UpgradeRestriction", "ui/UpgradeCardUI", "ui/UpgradeTypeUI" ],
        function(FiringArc, UpgradeCard, UpgradeHeader, UpgradeRestriction, UpgradeCardUI, UpgradeTypeUI)
        {
            "use strict";
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
                key: "weaponValue",
                label: "Weapon Value",
                className: "numberCell",
            },
            {
                key: "ranges",
                label: "Ranges",
                className: "rangesCell",
            },
            {
                key: "firingArc",
                label: "Firing Arc",
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

                    var upgradeKeys = UpgradeCard.values();
                    var self = this;

                    upgradeKeys.forEach(function(upgradeKey, i)
                    {
                        rows.push(self.createRow(upgradeKey, i));
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

                createRow: function(upgradeKey, i)
                {
                    var cells = [];

                    var upgrade = UpgradeCard.properties[upgradeKey];
                    var typeImage = React.createElement(UpgradeTypeUI,
                    {
                        upgradeTypeKey: upgrade.type,
                    });
                    var isUnique = (upgrade.isUnique ? "\u25CF" : "");
                    var myRestrictions = " ";
                    if (upgrade.restrictions)
                    {
                        myRestrictions = upgrade.restrictions.reduce(function(previousValue, restriction)
                        {
                            return previousValue + " " + UpgradeRestriction.properties[restriction].displayName;
                        }, "");
                    }
                    var myHeader = (upgrade.header ? UpgradeHeader.properties[upgrade.header].name : " ");
                    var myWeaponValue = (upgrade.weaponValue ? upgrade.weaponValue : " ");
                    var myRanges = (upgrade.ranges ? UpgradeCardUI.createRangesLabel(upgradeKey) : " ");
                    var myFiringArc = (upgrade.firingArc ? FiringArc.properties[upgrade.firingArc].name : " ");
                    var isImplemented = (upgrade.isImplemented !== undefined ? upgrade.isImplemented : false);
                    var implementedImage = this.createImplementedImage(isImplemented);
                    var j = 0;

                    cells.push(React.DOM.td(
                    {
                        key: cells.length,
                        className: UpgradeColumns[j].className,
                        column: UpgradeColumns[j].key,
                        value: upgrade.type, // this allows sorting
                    }, typeImage));
                    j++;

                    cells.push(this.createCell(cells.length, UpgradeColumns[j++], upgrade.name));

                    cells.push(this.createCell(cells.length, UpgradeColumns[j++], myRestrictions));

                    cells.push(this.createCell(cells.length, UpgradeColumns[j++], myHeader));

                    cells.push(this.createCell(cells.length, UpgradeColumns[j++], myWeaponValue));

                    cells.push(this.createCell(cells.length, UpgradeColumns[j++], myRanges));

                    cells.push(this.createCell(cells.length, UpgradeColumns[j++], myFiringArc));

                    cells.push(this.createCell(cells.length, UpgradeColumns[j++], upgrade.description));

                    cells.push(this.createCell(cells.length, UpgradeColumns[j++], upgrade.squadPointCost));

                    cells.push(React.DOM.td(
                    {
                        key: cells.length,
                        className: UpgradeColumns[j].className,
                        column: UpgradeColumns[j].key,
                        value: isImplemented, // this allows sorting
                    }, implementedImage));
                    j++;

                    return this.Tr(
                    {
                        key: i
                    }, cells);
                },
            });

            return UpgradeCardsTable;
        });

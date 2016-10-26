define(["FiringArc", "RangeRuler", "UpgradeHeader", "UpgradeRestriction", "upgradestats/UpgradeColumns", "upgradestats/ui/Connector", "upgradestats/ui/FilterUI", "process/ui/UpgradeTypeUI", "../../../../../../coreweb/src/main/js/ui/DataTable"],
    function(FiringArc, RangeRuler, UpgradeHeader, UpgradeRestriction, UpgradeColumns, Connector, FilterUI, UpgradeTypeUI, DataTable)
    {
        "use strict";

        function createImageLink(src, href)
        {
            var image = React.DOM.img(
            {
                className: "imageBlock",
                src: src,
            });

            return React.DOM.a(
            {
                href: href,
                target: "_blank",
            }, image);
        }

        var valueFunctions = {
            "restrictionKeys": function(data)
            {
                return data.restrictionKeys.reduce(function(previousValue, restrictionKey, i)
                {
                    var restriction = UpgradeRestriction.properties[restrictionKey];
                    return previousValue + restriction.name + (i < data.restrictionKeys.length - 1 ? " " : "");
                }, "");
            },
            "headerKey": function(data)
            {
                var header = (data.headerKey !== undefined ? UpgradeHeader.properties[data.headerKey] : undefined);
                return (header !== undefined ? header.name : undefined);
            },
            "rangeKeys": function(data)
            {
                return data.rangeKeys.reduce(function(previousValue, rangeKey, i)
                {
                    var range = RangeRuler.properties[rangeKey];
                    return previousValue + range.name + (i < data.rangeKeys.length - 1 ? "-" : "");
                }, "");
            },
            "firingArcKey": function(data)
            {
                var firingArc = (data.firingArcKey !== undefined ? FiringArc.properties[data.firingArcKey] : undefined);
                return (firingArc !== undefined ? firingArc.name : undefined);
            },
        };

        var cellFunctions = {
            "typeKey": function(data)
            {
                return React.createElement(UpgradeTypeUI,
                {
                    upgradeTypeKey: data.typeKey,
                });
            },
            "name": function(data)
            {
                var src = "../resources/icons/Wikipedia16.png";
                var searchString = data.name.vizziniReplaceAll(" ", "_");
                var href = "http://xwing-miniatures.wikia.com/wiki/" + searchString;
                var link = createImageLink(src, href);
                return React.DOM.span(
                {
                    className: "textImageLink",
                }, data.name, link);
            },
            "isImplemented": function(data)
            {
                var implementedName = (data.isImplemented ? "accept" : "delete");
                var fileString = iconBase + implementedName + ".png";
                return React.DOM.img(
                {
                    className: "isImplementedImage",
                    src: fileString,
                    title: data.isImplemented,
                    value: implementedName,
                });
            },
        };

        var UpgradeTable = React.createClass(
        {
            contextTypes:
            {
                store: React.PropTypes.object.isRequired,
            },

            propTypes:
            {
                filters: React.PropTypes.object.isRequired,
                rowData: React.PropTypes.array.isRequired,
            },

            render: function()
            {
                var myRowData = [];

                this.props.rowData.forEach(function(pilot)
                {
                    if (pilot.fore || pilot.aft)
                    {
                        myRowData.push(pilot.fore);
                        myRowData.push(pilot.aft);
                    }
                    else
                    {
                        myRowData.push(pilot);
                    }
                });

                var connector = ReactRedux.connect(Connector.FilterUI.mapStateToProps)(FilterUI);
                var filterUI = React.createElement(ReactRedux.Provider,
                {
                    store: this.context.store,
                }, React.createElement(connector));

                var table = React.createElement(DataTable,
                {
                    columns: UpgradeColumns,
                    rowData: myRowData,
                    cellFunctions: cellFunctions,
                    valueFunctions: valueFunctions,
                });

                var rows = [];
                rows.push(React.DOM.tr(
                {
                    key: rows.length,
                }, React.DOM.td(
                {}, filterUI)));
                rows.push(React.DOM.tr(
                {
                    key: rows.length,
                }, React.DOM.td(
                {}, table)));

                return React.DOM.table(
                {}, React.DOM.tbody(
                {}, rows));
            },
        });

        return UpgradeTable;
    });

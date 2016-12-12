define(["DamageCardTrait", "damagestats/DamageColumns", "damagestats/ui/Connector", "damagestats/ui/FilterUI", "../../../../../../../coreweb/src/main/js/ui/DataTable"],
    function(DamageCardTrait, DamageColumns, Connector, FilterUI, DataTable)
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
            "trait": function(data)
            {
                var trait = DamageCardTrait.properties[data.trait];
                return (trait !== undefined ? trait.name : undefined);
            },
        };

        var cellFunctions = {
            "name": function(data)
            {
                var src = "../resources/icons/Wikipedia16.png";
                var searchString = data.name.replace(/ /g, "_");
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

        var DamageTable = React.createClass(
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
                    columns: DamageColumns,
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

        return DamageTable;
    });

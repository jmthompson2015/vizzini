define(["pilotstats/PilotColumns", "pilotstats/ui/Connector", "pilotstats/ui/FilterUI", "ui/FactionUI", "ui/ShipSilhouetteUI", "../../../../../../coreweb/src/main/js/ui/DataTable"], function(PilotColumns, Connector, FilterUI, FactionUI, ShipSilhouetteUI, DataTable)
{
    "use strict";
    var cellFunctions = {
        "factionKey": function(data)
        {
            return React.createElement(FactionUI,
            {
                factionKey: data.factionKey,
                isSmall: true,
            });
        },
        "shipKey": function(data)
        {
            return React.createElement(ShipSilhouetteUI,
            {
                shipKey: data.shipKey,
                showName: true,
            });
        },
        "description": function(data)
        {
            var answer = data.description;
            if (data.isFlavorText)
            {
                answer = React.DOM.span(
                {
                    className: "flavorText",
                }, data.description);
            }
            return answer;
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
        "ratioPrimaryWeaponAgility": function(data)
        {
            var value = data.ratioPrimaryWeaponAgility;
            return Math.vizziniFormat(value, 2);
        },
        "ratioSumStatsSquadPointCost": function(data)
        {
            var value = data.ratioSumStatsSquadPointCost;
            return Math.vizziniFormat(value, 4);
        },
    };

    var PilotTable = React.createClass(
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
                columns: PilotColumns,
                rowData: myRowData,
                cellFunctions: cellFunctions,
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

    return PilotTable;
});

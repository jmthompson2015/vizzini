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
        "pilotName": function(data)
        {
            var searchString = data.pilotName;
            searchString = searchString.vizziniReplaceAll(" ", "_");
            var href = "http://xwing-miniatures.wikia.com/wiki/" + searchString;
            var image = React.DOM.img(
            {
                className: "imageBlock",
                src: "../resources/icons/Wikipedia16.png"
            });
            var link = React.DOM.a(
            {
                href: href,
                target: "_blank",
            }, image);
            return React.DOM.span(
            {
                className: "textImageLink",
            }, data.pilotName, link);
        },
        "shipKey": function(data)
        {
            var searchString = data.shipName;
            // switch (data.ship)
            // {
            //     case "Aggressor":
            //         searchString = "IG-2000";
            //         break;
            //     case "Attack Shuttle":
            //     case "VCX-100":
            //         searchString = "Ghost";
            //         break;
            //     case "Firespray-31":
            //         searchString = "Slave 1";
            //         break;
            //     case "G-1A Starfighter":
            //         searchString = "Mist Hunter";
            //         break;
            //     case "JumpMaster 5000":
            //         searchString = "Punishing One";
            //         break;
            //     case "M3-A Interceptor":
            //         searchString = "M3-A Scyk Interceptor";
            //         break;
            //     case "TIE Adv. Prototype":
            //         searchString = "Inquisitor's TIE";
            //         break;
            //     case "YT-1300":
            //         searchString = "Millennium Falcon";
            //         break;
            // }
            searchString += " Expansion Pack";
            searchString = searchString.vizziniReplaceAll(" ", "_");
            var href = "http://xwing-miniatures.wikia.com/wiki/" + searchString;
            var image = React.DOM.img(
            {
                className: "imageBlock",
                src: "../resources/icons/Wikipedia16.png"
            });
            var link = React.DOM.a(
            {
                href: href,
                target: "_blank",
            }, image);
            var silhouette = React.createElement(ShipSilhouetteUI,
            {
                shipKey: data.shipKey,
                showName: true,
            });
            return React.DOM.span(
            {
                className: "textImageLink",
            }, silhouette, link);
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

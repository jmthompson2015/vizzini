define(["Event", "Phase", "abilitystats/AbilityColumns", "abilitystats/ui/Connector", "abilitystats/ui/FilterUI", "../../../../../../../coreweb/src/main/js/ui/DataTable"],
    function(Event, Phase, AbilityColumns, Connector, FilterUI, DataTable)
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
            "event": function(data)
            {
                if (data.event)
                {
                    var key = data.event.substring(data.event.indexOf(".") + 1);

                    if (data.event.startsWith("Event"))
                    {
                        var event = Event.properties[key];
                        if (event === undefined)
                        {
                            LOGGER.warn("Missing event for key = " + key);
                        }
                        return "Event" + String.pad(Event.values().indexOf(event.value), 2);
                    }
                    else if (data.event.startsWith("Phase"))
                    {
                        var phase = Phase.properties[key];
                        if (phase === undefined)
                        {
                            LOGGER.warn("Missing phase for key = " + key);
                        }
                        return "Phase" + String.pad(Phase.values().indexOf(phase.value), 2);
                    }
                }
                else
                {
                    return data.event;
                }
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
            "event": function(data)
            {
                return data.event;
            }
        };

        var AbilityTable = React.createClass(
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
                    columns: AbilityColumns,
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

        return AbilityTable;
    });

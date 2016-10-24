define(function()
{
    "use strict";
    var SimulationPanel = React.createClass(
    {
        render: function()
        {
            var labelFunction = function(value)
            {
                var label;
                switch (value)
                {
                case 1:
                    label = "1 second";
                    break;
                case 30:
                    label = "30 seconds";
                    break;
                case 60:
                    label = "1 minute";
                    break;
                case 300:
                    label = "5 minutes";
                    break;
                case 600:
                    label = "10 minutes";
                    break;
                case 900:
                    label = "15 minutes";
                    break;
                default:
                    throw "Unknown tickCount value: " + value;
                }
                return label;
            };
            var tickCountSelect = React.createElement(Select,
            {
                values: [ 1, 30, 60, 300, 600, 900 ],
                labelFunction: labelFunction,
                onChange: this.tickCountChanged,
            });

            var rows = [];

            var cells = [];
            cells.push(React.DOM.td({}, "Time Factor"));
            cells.push(React.DOM.td({}, tickCountSelect));
            cells.push(React.DOM.td({}, "per second"));
            rows.push(React.DOM.tr(
            {
                key: rows.length,
            }, cells));

            cells = [];
            cells.push(React.DOM.td(
            {
                colSpan: "3",
                id: "timingDisplay",
            }, ""));
            rows.push(React.DOM.tr(
            {
                key: rows.length,
            }, cells));

            return React.DOM.table(
            {
                className: "simulationPanel",
            }, rows);
        },

        tickCountChanged: function(event)
        {
            InputValidator.validateNotNull("callback", this.props.callback);

            var tickCount = event.target.value;
            LOGGER.trace("tickCountChanged() tickCount = " + tickCount);

            this.props.callback(tickCount);
        },
    });

    return SimulationPanel;
});

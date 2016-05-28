define([ "Phase" ], function(Phase)
{
    "use strict";
    var StatusBarUI = React.createClass(
    {
        render: function()
        {
            InputValidator.validateNotNull("round", this.props.round);
            InputValidator.validateNotNull("phaseKey", this.props.phaseKey);

            var round = this.props.round;
            var phaseKey = this.props.phaseKey;
            var activeShipName = (this.props.activeShipName ? this.props.activeShipName : " ");

            var phaseName = (phaseKey ? Phase.properties[phaseKey].name : " ");

            var roundUI = React.DOM.span({}, "Round: " + round);
            var phaseUI = React.DOM.span({}, "Phase: " + phaseName);
            var activePilotUI = React.DOM.span({}, "Active Ship: " + activeShipName);
            var helpLinkUI = React.DOM.a(
            {
                href: "help.html",
                target: "_blank",
            }, "Help");

            var cells = [];

            cells.push(React.DOM.td(
            {
                key: cells.length,
                className: "statusBarUICell",
            }, roundUI));
            cells.push(React.DOM.td(
            {
                key: cells.length,
                className: "statusBarUICell",
            }, phaseUI));
            cells.push(React.DOM.td(
            {
                key: cells.length,
                className: "statusBarUICell",
            }, activePilotUI));
            cells.push(React.DOM.td(
            {
                key: cells.length,
                className: "statusBarUICell",
            }, helpLinkUI));

            var row = React.DOM.tr({}, cells);

            return React.DOM.table(
            {
                className: "statusBarUI",
            }, React.DOM.tbody({}, row));
        },
    });

    return StatusBarUI;
});

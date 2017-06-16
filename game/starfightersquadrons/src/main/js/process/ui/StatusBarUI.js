define(function()
{
    "use strict";
    var StatusBarUI = React.createClass(
    {
        propTypes:
        {
            round: PropTypes.number.isRequired,

            activeShipName: PropTypes.string,
            phase: PropTypes.object,
        },

        render: function()
        {
            var round = this.props.round;
            var phase = this.props.phase;
            var phaseName = (phase ? phase.name : " ");
            var activeShipName = (this.props.activeShipName ? this.props.activeShipName : " ");

            var roundUI = React.DOM.span(
            {}, "Round: ", round);
            var phaseUI = React.DOM.span(
            {}, "Phase: ", phaseName);
            var activePilotUI = React.DOM.span(
            {}, "Active Ship: ", activeShipName);
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

            var row = React.DOM.tr(
            {}, cells);

            return React.DOM.table(
            {
                className: "statusBarUI",
            }, React.DOM.tbody(
            {}, row));
        },
    });

    return StatusBarUI;
});

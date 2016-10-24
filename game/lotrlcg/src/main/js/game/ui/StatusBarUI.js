/*
 * @param scenarioName Scenario name. (required)
 * @param round Round. (required)
 * @param phaseKey Phase. (required)
 * @param firstAgentName First agent name. (required)
 * 
 * @param activeAgentName Active agent name. (optional)
 */
define([ "Phase" ], function(Phase)
{
    "use strict";
    var StatusBarUI = React.createClass(
    {
        render: function()
        {
            InputValidator.validateNotNull("scenarioName", this.props.scenarioName);
            InputValidator.validateNotNull("round", this.props.round);
            InputValidator.validateNotNull("phaseKey", this.props.phaseKey);
            InputValidator.validateNotNull("firstAgentName", this.props.firstAgentName);

            var scenarioName = this.props.scenarioName;
            var round = this.props.round;
            var phaseKey = this.props.phaseKey;
            var firstAgentName = (this.props.firstAgentName ? this.props.firstAgentName : " ");
            var activeAgentName = (this.props.activeAgentName ? this.props.activeAgentName : " ");

            var phaseName = (phaseKey ? Phase.properties[phaseKey].name : " ");

            var scenarioUI = React.DOM.span({}, "Scenario: " + scenarioName);
            var roundUI = React.DOM.span({}, "Round: " + round);
            var phaseUI = React.DOM.span({}, "Phase: " + phaseName);
            var firstAgentUI = React.DOM.span({}, "First Player: " + firstAgentName);
            var activeAgentUI = React.DOM.span({}, "Active Player: " + activeAgentName);

            var cells = [];

            cells.push(React.DOM.td(
            {
                key: cells.length,
                className: "statusBarUICell",
            }, scenarioUI));
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
            }, firstAgentUI));
            cells.push(React.DOM.td(
            {
                key: cells.length,
                className: "statusBarUICell",
            }, activeAgentUI));

            var row = React.DOM.tr({}, cells);

            return React.DOM.table(
            {
                className: "statusBarUI",
            }, React.DOM.tbody({}, row));
        },
    });

    return StatusBarUI;
});

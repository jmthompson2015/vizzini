define([ "Phase", "game/Environment" ], function(Phase, Environment)
{
    "use strict";
    var StatusBarUI = React.createClass(
    {
        getInitialState: function()
        {
            InputValidator.validateNotNull("initialEnvironment", this.props.initialEnvironment);

            return (
            {
                environment: this.props.initialEnvironment,
            });
        },

        componentDidMount: function()
        {
            this.state.environment.bind(Environment.ROUND_EVENT, this.environmentChanged);
            this.state.environment.bind(Environment.PHASE_EVENT, this.environmentChanged);
            this.state.environment.bind(Environment.ACTIVE_AGENT_EVENT, this.environmentChanged);
        },

        componentWillUnmount: function()
        {
            this.state.environment.unbind(Environment.ROUND_EVENT, this.environmentChanged);
            this.state.environment.unbind(Environment.PHASE_EVENT, this.environmentChanged);
            this.state.environment.unbind(Environment.ACTIVE_AGENT_EVENT, this.environmentChanged);
        },

        render: function()
        {
            var environment = this.state.environment;

            var phaseName = (environment.phase() ? Phase.properties[environment.phase()].name : " ");
            var playerName = (environment.activeAgent() ? environment.activeAgent() : " ");

            var roundUI = React.DOM.span({}, "Round: " + environment.round().count());
            var phaseUI = React.DOM.span({}, "Phase: " + phaseName);
            var activeAgentUI = React.DOM.span({}, "Player: " + playerName);

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
            }, activeAgentUI));

            var row = React.DOM.tr({}, cells);

            return React.DOM.table(
            {
                className: "statusBarUI",
            }, row);
        },

        environmentChanged: function()
        {
            LOGGER.trace(this.state.environment + " environment change event");
            this.setState(
            {
                environment: this.state.environment,
            });
        },
    });

    return StatusBarUI;
});

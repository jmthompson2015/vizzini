define([ "game/ui/AgentUI", "game/ui/TokenAreaUI", "game/ui/TokenUI" ], function(AgentUI, TokenAreaUI, TokenUI)
{
    "use strict";
    var EnvironmentUI = React.createClass(
    {
        render: function()
        {
            InputValidator.validateNotNull("environment", this.props.environment);

            var environment = this.props.environment;
            var activeLocationUI = React.createElement(TokenUI,
            {
                label: "Active Location",
                initialToken: environment.activeLocation(),
            });
            var activeQuestUI = React.createElement(TokenUI,
            {
                label: "Active Quest",
                initialToken: environment.activeQuest(),
            });
            var stagingAreaUI = React.createElement(TokenAreaUI,
            {
                label: "Staging Area",
                area: environment.stagingArea(),
            });

            var rows = [];
            var topTable = React.DOM.table(
            {
                className: "locationQuestPanel",
            }, React.DOM.tr({}, [ React.DOM.td({}, activeLocationUI), React.DOM.td({}, activeQuestUI) ]));
            rows.push(React.DOM.tr({}, React.DOM.td(
            {
                className: "locationQuestCell",
            }, topTable)));

            var agents = environment.agents();
            var stagingTable = React.DOM.table(
            {
                className: "stagingAreaUIPanel",
            }, React.DOM.tr({}, React.DOM.td({}, stagingAreaUI)));
            rows.push(React.DOM.tr({}, React.DOM.td(
            {
                className: "stagingAreaUICell",
            }, stagingTable)));

            var cells = [];
            agents.forEach(function(agent)
            {
                var element = React.createElement(AgentUI,
                {
                    environment: environment,
                    agent: agent,
                });
                cells.push(React.DOM.td({}, element));
            });
            var agentTable = React.DOM.table(
            {
                className: "agentPanel",
            }, React.DOM.tr({}, cells));
            rows.push(React.DOM.tr({}, React.DOM.td({}, agentTable)));

            return React.DOM.table(
            {
                className: "environmentUI",
            }, rows);
        },
    });

    return EnvironmentUI;
});

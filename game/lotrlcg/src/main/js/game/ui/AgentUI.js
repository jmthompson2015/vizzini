/*
 * @param environment Environment. (required)
 * @param agent Agent. (required)
 */
define([ "game/ui/TokenAreaUI" ], function(TokenAreaUI)
{
    "use strict";
    var AgentUI = React.createClass(
    {
        render: function()
        {
            InputValidator.validateNotNull("environment", this.props.environment);
            InputValidator.validateNotNull("agent", this.props.agent);

            var environment = this.props.environment;
            var agent = this.props.agent;
            var agentData = environment.agentData(agent);

            var rows = [];
            var cells = [];
            cells.push(React.DOM.td(
            {
                className: "agentUILabel",
            }, agent.name()));
            rows.push(React.DOM.tr({}, cells));

            if (agentData.engagementArea().length > 0)
            {
                cells = [];
                var engagementAreaUI = React.createElement(TokenAreaUI,
                {
                    className: "engagementAreaUI",
                    label: "Engagement Area",
                    area: agentData.engagementArea(),
                });
                cells.push(React.DOM.td(
                {
                    className: "center",
                }, engagementAreaUI));
                rows.push(React.DOM.tr({}, cells));
            }

            if (agentData.playArea().length > 0)
            {
                cells = [];
                var playAreaUI = React.createElement(TokenAreaUI,
                {
                    className: "playAreaUI",
                    label: "Play Area",
                    area: agentData.playArea(),
                });
                cells.push(React.DOM.td(
                {
                    className: "playAreaUICell",
                }, playAreaUI));
                rows.push(React.DOM.tr({}, cells));
            }

            if (agentData.hand().length > 0)
            {
                cells = [];
                var handUI = React.createElement(TokenAreaUI,
                {
                    className: "handUI",
                    label: "Hand",
                    area: agentData.hand(),
                });
                cells.push(React.DOM.td(
                {
                    className: "handUICell",
                }, handUI));
                rows.push(React.DOM.tr({}, cells));
            }

            return React.DOM.table(
            {
                className: "agentUI",
            }, rows);
        },
    });

    return AgentUI;
});

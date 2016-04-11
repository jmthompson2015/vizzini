/*
 * @param agent Agent. (required)
 */
define([ "game/ui/CardAreaUI" ], function(CardAreaUI)
{
    "use strict";
    var AgentUI = React.createClass(
    {
        render: function()
        {
            InputValidator.validateNotNull("agent", this.props.agent);

            var agent = this.props.agent;
            var rows = [];
            var cells = [];
            cells.push(React.DOM.td(
            {
                className: "agentUILabel",
            }, agent.name));
            rows.push(React.DOM.tr({}, cells));

            if (agent.engagementArea.length > 0)
            {
                cells = [];
                var engagementAreaUI = React.createElement(CardAreaUI,
                {
                    className: "engagementAreaUI",
                    label: "Engagement Area",
                    area: agent.engagementArea,
                });
                cells.push(React.DOM.td(
                {
                    className: "center",
                }, engagementAreaUI));
                rows.push(React.DOM.tr({}, cells));
            }

            if (agent.playArea.length > 0)
            {
                cells = [];
                var playAreaUI = React.createElement(CardAreaUI,
                {
                    className: "playAreaUI",
                    label: "Play Area",
                    area: agent.playArea,
                });
                cells.push(React.DOM.td(
                {
                    className: "playAreaUICell",
                }, playAreaUI));
                rows.push(React.DOM.tr({}, cells));
            }

            if (agent.hand.length > 0)
            {
                cells = [];
                var handUI = React.createElement(CardAreaUI,
                {
                    className: "handUI",
                    label: "Hand",
                    area: agent.hand,
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

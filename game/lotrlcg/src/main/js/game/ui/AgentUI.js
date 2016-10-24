/*
 * @param agent Agent. (required)
 * @param engagementArea Engagement area. (required)
 * @param playArea Play area. (required)
 * @param hand Hand. (required)
 */
define([ "game/ui/CardAreaUI" ], function(CardAreaUI)
{
    "use strict";
    var AgentUI = React.createClass(
    {
        render: function()
        {
            InputValidator.validateNotNull("agent", this.props.agent);
            InputValidator.validateNotNull("engagementArea", this.props.engagementArea);
            InputValidator.validateNotNull("playArea", this.props.playArea);
            InputValidator.validateNotNull("hand", this.props.hand);

            var agent = this.props.agent;
            var engagementArea = this.props.engagementArea;
            var playArea = this.props.playArea;
            var hand = this.props.hand;

            var rows = [];
            var cell;
            var cells = [];
            cells.push(React.DOM.td(
            {
                className: "agentUILabel",
            }, agent.name));
            cells.push(React.DOM.td(
            {
                className: "agentUILabel",
            }, "Threat Level: " + agent.threatLevel));
            cell = React.DOM.table(
            {
                className: "agentUILabelRow",
            }, React.DOM.tr({}, cells));
            rows.push(React.DOM.tr({}, cell));

            if (engagementArea.length > 0)
            {
                var engagementAreaUI = React.createElement(CardAreaUI,
                {
                    className: "engagementAreaUI",
                    label: "Engagement Area",
                    area: engagementArea,
                });
                cell = React.DOM.td(
                {
                    className: "center",
                }, engagementAreaUI);
                rows.push(React.DOM.tr({}, cell));
            }

            if (playArea.length > 0)
            {
                var playAreaUI = React.createElement(CardAreaUI,
                {
                    className: "playAreaUI",
                    label: "Play Area",
                    area: playArea,
                });
                cell = React.DOM.td(
                {
                    className: "playAreaUICell",
                }, playAreaUI);
                rows.push(React.DOM.tr({}, cell));
            }

            if (hand.length > 0)
            {
                var handUI = React.createElement(CardAreaUI,
                {
                    className: "handUI",
                    label: "Hand",
                    area: hand,
                });
                cell = React.DOM.td(
                {
                    className: "handUICell",
                }, handUI);
                rows.push(React.DOM.tr({}, cell));
            }

            return React.DOM.table(
            {
                className: "agentUI",
            }, rows);
        },
    });

    return AgentUI;
});

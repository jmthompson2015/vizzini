define([ "PlanningAction", "ui/ManeuverChooser" ], function(PlanningAction, ManeuverChooser)
{
    "use strict";
    var PlanningPanel = React.createClass(
    {
        getInitialState: function()
        {
            return (
            {
                tokenToManeuver: {}
            });
        },

        ok: function()
        {
            var environment = this.props.environment;
            var agent = this.props.agent;
            var tokenToManeuver = this.state.tokenToManeuver;
            var callback = this.props.callback;

            var answer = new PlanningAction(environment, agent, tokenToManeuver);

            callback(answer);
        },

        render: function()
        {
            var tokens = this.props.tokens;
            var imageUtils = this.props.imageUtils;
            var self = this;
            var cells = [];

            for (var i = 0; i < tokens.length; i++)
            {
                var token = tokens[i];
                var element = React.createElement(ManeuverChooser,
                {
                    token: token,
                    callback: self.selectionChanged
                });
                cells.push(React.DOM.td(
                {
                    key: i,
                    className: "planningTableCell"
                }, element));
            }

            var initialInput = React.DOM.table({}, React.DOM.tr({}, cells));
            var disabled = Object.getOwnPropertyNames(this.state.tokenToManeuver).length < tokens.length;
            var buttons = React.DOM.button(
            {
                onClick: self.ok,
                disabled: disabled,
            }, "OK");
            return React.createElement(OptionPane,
            {
                panelClass: "optionPane",
                title: "Planning: Select Maneuvers",
                titleClass: "optionPaneTitle",
                initialInput: initialInput,
                buttons: buttons,
                buttonsClass: "optionPaneButtons"
            });
        },

        selectionChanged: function(token, maneuver)
        {
            LOGGER.debug("selectionChanged() token = " + token + " maneuver = " + maneuver);
            var tokenToManeuver = this.state.tokenToManeuver;
            tokenToManeuver[token] = maneuver;

            this.setState(
            {
                tokenToManeuver: tokenToManeuver,
            });
        },
    });

    return PlanningPanel;
});

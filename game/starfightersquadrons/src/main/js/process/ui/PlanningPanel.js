define(["process/ui/ManeuverChooser"], function(ManeuverChooser)
{
    "use strict";
    var PlanningPanel = React.createClass(
    {
        propTypes:
        {
            agent: PropTypes.object.isRequired,
            callback: PropTypes.func.isRequired,
            environment: PropTypes.object.isRequired,
            imageBase: PropTypes.string.isRequired,
            tokens: PropTypes.array.isRequired,
        },

        getInitialState: function()
        {
            return (
            {
                tokenToManeuver:
                {},
            });
        },

        render: function()
        {
            var tokens = this.props.tokens;
            var self = this;
            var cells = [];

            for (var i = 0; i < tokens.length; i++)
            {
                var token = tokens[i];
                var element = React.createElement(ManeuverChooser,
                {
                    imageBase: this.props.imageBase,
                    callback: self.selectionChanged,
                    token: token,
                });
                cells.push(React.DOM.td(
                {
                    key: i,
                    className: "planningTableCell",
                }, element));
            }

            var initialInput = React.DOM.table(
            {}, React.DOM.tbody(
            {}, React.DOM.tr(
            {}, cells)));
            var disabled = Object.getOwnPropertyNames(this.state.tokenToManeuver).length < tokens.length;
            var buttons = React.DOM.button(
            {
                onClick: self.ok,
                disabled: disabled,
            }, "OK");
            return React.createElement(OptionPane,
            {
                message: "",
                panelClass: "optionPane",
                title: "Planning: Select Maneuvers",
                titleClass: "optionPaneTitle",
                initialInput: initialInput,
                buttons: buttons,
                buttonsClass: "optionPaneButtons",
            });
        },

        ok: function()
        {
            var environment = this.props.environment;
            var agent = this.props.agent;
            var tokenToManeuver = this.state.tokenToManeuver;
            var callback = this.props.callback;

            callback(tokenToManeuver);
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

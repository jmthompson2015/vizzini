define([ "ui/PilotCardUI" ], function(PilotCardUI)
{
    "use strict";
    var PilotsUI = React.createClass(
    {
        getInitialState: function()
        {
            return (
            {
                tokens: this.props.initialTokens
            });
        },

        render: function()
        {
            var tokens = this.state.tokens;

            var tokenHtml = tokens.map(function(token)
            {
                return React.createElement(PilotCardUI,
                {
                    key: token.id(),
                    isCompact: true,
                    initialToken: token
                });
            });

            var row = React.DOM.tr({}, React.DOM.td({}, tokenHtml));

            return React.DOM.table({}, row);
        },
    });

    return PilotsUI;
});

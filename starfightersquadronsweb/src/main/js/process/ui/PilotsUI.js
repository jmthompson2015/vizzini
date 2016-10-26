define(["process/ui/Connector", "process/ui/PilotCardUI"], function(Connector, PilotCardUI)
{
    "use strict";
    var PilotsUI = React.createClass(
    {
        render: function()
        {
            var tokens = this.props.tokens;
            var connector = ReactRedux.connect(Connector.PilotCardUI.mapStateToProps)(PilotCardUI);

            var tokenHtml = tokens.map(function(token)
            {
                return React.createElement(connector,
                {
                    isCompact: true,
                    token: token
                });
            });

            var row = React.DOM.tr(
            {}, React.DOM.td(
            {}, tokenHtml));

            return React.DOM.table(
            {}, row);
        },
    });

    return PilotsUI;
});

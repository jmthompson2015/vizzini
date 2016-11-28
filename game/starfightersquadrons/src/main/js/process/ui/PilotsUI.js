define(["process/ui/Connector", "process/ui/PilotCardCompactUI"], function(Connector, PilotCardCompactUI)
{
    "use strict";
    var PilotsUI = React.createClass(
    {
        propTypes:
        {
            tokens: React.PropTypes.array.isRequired,
            imageBase: React.PropTypes.string.isRequired,
        },

        render: function()
        {
            var tokens = this.props.tokens;
            var connector = ReactRedux.connect(Connector.PilotCardCompactUI.mapStateToProps)(PilotCardCompactUI);

            var tokenElements = tokens.map(function(token, i)
            {
                return React.createElement(connector,
                {
                    key: i,
                    imageBase: this.props.imageBase,
                    isCompact: true,
                    token: token,
                });
            }, this);

            var row = React.DOM.tr(
            {}, React.DOM.td(
            {}, tokenElements));

            return React.DOM.table(
            {}, React.DOM.tbody(
            {}, row));
        },
    });

    return PilotsUI;
});

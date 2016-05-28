define(function()
{
    "use strict";
    var Connector = {};

    Connector.StatusBarUI =
    {
        mapStateToProps: function(state, ownProps)
        {
            InputValidator.validateNotNull("environment", ownProps.environment);

            var environment = ownProps.environment;
            var activeToken = environment.getTokenById(state.activeTokenId);
            var activeShipName = (activeToken ? activeToken.name() : "");

            return (
            {
                round: state.round,
                phaseKey: state.phaseKey,
                activeShipName: activeShipName,
            });
        },
    };

    if (Object.freeze)
    {
        Object.freeze(Connector);
    }

    return Connector;
});

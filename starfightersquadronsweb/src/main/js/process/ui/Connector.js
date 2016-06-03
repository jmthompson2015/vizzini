define(function()
{
    "use strict";
    var Connector = {};

    Connector.PilotCardUI =
    {
        mapStateToProps: function(state, ownProps)
        {
            InputValidator.validateNotNull("token", ownProps.token);
            InputValidator.validateNotNull("isCompact", ownProps.isCompact);

            var token = ownProps.token;
            var isCompact = ownProps.isCompact;

            return (
            {
                key: token.id(),
                isCompact: isCompact,
                initialToken: token
            });
        },
    };

    Connector.PilotsUI =
    {
        mapStateToProps: function(state, ownProps)
        {
            InputValidator.validateNotNull("environment", ownProps.environment);
            InputValidator.validateNotNull("team", ownProps.team);

            var environment = ownProps.environment;
            var team = ownProps.team;
            var tokens = environment.getTokensForTeam(team);
            tokens.sort(function(token0, token1)
            {
                var answer = token1.pilotSkillValue() - token0.pilotSkillValue();

                if (answer === 0)
                {
                    answer = token0.id() - token1.id();
                }

                return answer;
            });

            return (
            {
                tokens: tokens,
            });
        },
    };

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

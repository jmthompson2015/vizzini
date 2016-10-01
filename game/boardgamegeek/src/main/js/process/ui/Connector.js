define(function()
{
    "use strict";
    var Connector = {};

    Connector.FilterUI =
    {
        mapStateToProps: function(state, ownProps)
        {
            var gameDatabase = state.gameDatabase;
            var designers = gameDatabase.getDesigners();
            var categories = gameDatabase.getCategories();
            var mechanics = gameDatabase.getMechanics();

            return (
            {
                gameDatabase: state.gameDatabase,
                designers: designers,
                categories: categories,
                mechanics: mechanics,
            });
        },
    };

    Connector.GameTable =
    {
        mapStateToProps: function(state, ownProps)
        {
            var gameDatabase = state.gameDatabase;
            var gameSummaries = gameDatabase.getGameSummaries();

            return (
            {
                gameDatabase: state.gameDatabase,
                gameSummaries: gameSummaries,
            });
        },
    };

    if (Object.freeze)
    {
        Object.freeze(Connector);
    }

    return Connector;
});

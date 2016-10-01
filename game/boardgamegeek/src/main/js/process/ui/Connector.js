define(function()
{
    "use strict";
    var Connector = {};

    Connector.FilterUI =
    {
        mapStateToProps: function(state, ownProps)
        {
            var gameDatabase = state.gameDatabase;
            var designers = gameDatabase.designers();
            var categories = gameDatabase.categories();
            var mechanics = gameDatabase.mechanics();

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
            var gameSummaries = gameDatabase.filteredGameSummaries();

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

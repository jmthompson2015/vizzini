define(function()
{
    "use strict";
    var Connector = {};

    Connector.FilterUI = {
        mapStateToProps: function(state, ownProps)
        {
            return (
            {
                filters: state.filters,
            });
        }
    };

    Connector.GameTable = {
        mapStateToProps: function(state, ownProps)
        {
            return (
            {
                rowData: state.filteredGameData,
            });
        },
    };

    if (Object.freeze)
    {
        Object.freeze(Connector);
    }

    return Connector;
});

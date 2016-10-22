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

    Connector.UpgradeTable = {
        mapStateToProps: function(state, ownProps)
        {
            return (
            {
                filters: state.filters,
                rowData: state.filteredUpgradeData,
            });
        },
    };

    return Connector;
});

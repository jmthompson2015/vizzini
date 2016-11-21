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

    Connector.DamageTable = {
        mapStateToProps: function(state, ownProps)
        {
            return (
            {
                filters: state.filters,
                rowData: state.filteredDamageData,
            });
        },
    };

    return Connector;
});

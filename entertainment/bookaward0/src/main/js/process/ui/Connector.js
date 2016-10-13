define(function()
{
    "use strict";
    var Connector = {};

    Connector.BookTable = {
        mapStateToProps: function(state, ownProps)
        {
            return (
            {
                nominees: state.nominees,
            });
        },
    };

    if (Object.freeze)
    {
        Object.freeze(Connector);
    }

    return Connector;
});

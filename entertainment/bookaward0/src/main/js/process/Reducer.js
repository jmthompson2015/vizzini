define(["InitialState", "process/Action"], function(InitialState, Action)
{
    "use strict";
    var Reducer = {};

    Reducer.root = function(state, action)
    {
        LOGGER.debug("root() type = " + action.type);

        if (typeof state === 'undefined')
        {
            return new InitialState();
        }

        switch (action.type)
        {
            case Action.ADD_NOMINEE:
                LOGGER.info("Reducer nominee = " + action.nominee);
                var newNominees = [];
                newNominees.vizziniAddAll(state.nominees);
                newNominees.push(action.nominee);
                return Object.assign(
                {}, state,
                {
                    nominees: newNominees,
                });
            default:
                LOGGER.warn("Reducer.root: Unhandled action type: " + action.type);
                return state;
        }
    };

    if (Object.freeze)
    {
        Object.freeze(Reducer);
    }

    return Reducer;
});

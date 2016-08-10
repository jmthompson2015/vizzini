define([ "InitialState", "process/Action" ], function(InitialState, Action)
{
    "use strict";
    var Reducer = {};

    Reducer.root = function(state, action)
    {
        LOGGER.debug("root() type = " + action.type);

        if (typeof state === 'undefined') { return new InitialState(); }

        switch (action.type)
        {
        case Action.SET_CONSOLE_PANEL:
            return Object.assign({}, state,
            {
                consolePanelKey: action.consolePanelKey,
            });
        case Action.SET_DEMAT_STATUS:
            return Object.assign({}, state,
            {
                dematStatusKey: action.dematStatusKey,
            });
        case Action.SET_POWERED:
            return Object.assign({}, state,
            {
                isPowered: action.isPowered,
            });
        case Action.SET_SCANNING:
            return Object.assign({}, state,
            {
                isScanning: action.isScanning,
            });
        case Action.SET_SCENE:
            return Object.assign({}, state,
            {
                sceneKey: action.sceneKey,
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

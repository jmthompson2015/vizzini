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
            LOGGER.info("Reducer consolePanelKey = " + action.consolePanelKey);
            return Object.assign({}, state,
            {
                consolePanelKey: action.consolePanelKey,
            });
        case Action.SET_DEMAT_STATUS:
            LOGGER.info("Reducer dematStatusKey = " + action.dematStatusKey);
            return Object.assign({}, state,
            {
                dematStatusKey: action.dematStatusKey,
            });
        case Action.SET_POWERED:
            LOGGER.info("Reducer isPowered ? " + action.isPowered);
            return Object.assign({}, state,
            {
                isPowered: action.isPowered,
            });
        case Action.SET_SCANNING:
            LOGGER.info("Reducer isScanning ? " + action.isScanning);
            return Object.assign({}, state,
            {
                isScanning: action.isScanning,
            });
        case Action.SET_SCENE:
            LOGGER.info("Reducer sceneKey = " + action.sceneKey);
            return Object.assign({}, state,
            {
                sceneKey: action.sceneKey,
            });
        case Action.SET_TIME_ROTOR_DZ:
            LOGGER.info("Reducer timeRotorDZ = " + action.timeRotorDZ);
            return Object.assign({}, state,
            {
                timeRotorDZ: action.timeRotorDZ,
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

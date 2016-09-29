define([ "InitialState", "process/Action" ], function(InitialState, Action)
{
    "use strict";
    var Reducer = {};

    Reducer.root = function(state, action)
    {
        LOGGER.debug("root() type = " + action.type);

        if (typeof state === 'undefined') { return new InitialState(); }

        var newBestGenomes;

        switch (action.type)
        {
        case Action.ADD_BEST_GENOME:
            LOGGER.debug("Reducer adding bestGenome");
            newBestGenomes = [];
            newBestGenomes.vizziniAddAll(state.bestGenomes);
            newBestGenomes.push(action.bestGenome);
            return Object.assign({}, state,
            {
                bestGenomes: newBestGenomes,
            });
        case Action.CLEAR_BEST_GENOMES:
            newBestGenomes = [];
            return Object.assign({}, state,
            {
                bestGenomes: newBestGenomes,
            });
        case Action.SET_BACK_COUNT:
            LOGGER.info("Reducer backCount = " + action.backCount);
            return Object.assign({}, state,
            {
                backCount: action.backCount,
            });
        case Action.SET_GENERATION_COUNT:
            LOGGER.info("Reducer generationCount = " + action.generationCount);
            return Object.assign({}, state,
            {
                generationCount: action.generationCount,
            });
        case Action.SET_GENETIC_ALGORITHM:
            LOGGER.info("Reducer setting new geneticAlgorithm");
            return Object.assign({}, state,
            {
                geneticAlgorithm: action.geneticAlgorithm,
            });
        case Action.SET_MESSAGE:
            LOGGER.info("Reducer message = " + action.message);
            return Object.assign({}, state,
            {
                message: action.message,
            });
        case Action.SET_POP_SIZE:
            LOGGER.info("Reducer popSize = " + action.popSize);
            return Object.assign({}, state,
            {
                popSize: action.popSize,
            });
        case Action.SET_PROBLEM:
            LOGGER.info("Reducer setting new problem");
            return Object.assign({}, state,
            {
                problem: action.problem,
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

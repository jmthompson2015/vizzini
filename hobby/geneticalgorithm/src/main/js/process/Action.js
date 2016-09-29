define(function()
{
    "use strict";
    var Action = {};

    Action.ADD_BEST_GENOME = "addBestGenome";
    Action.CLEAR_BEST_GENOMES = "clearBestGenomes";
    Action.SET_BACK_COUNT = "setBackCount";
    Action.SET_GENERATION_COUNT = "setGenerationCount";
    Action.SET_GENETIC_ALGORITHM = "setGeneticAlgorithm";
    Action.SET_MESSAGE = "setMessage";
    Action.SET_POP_SIZE = "setPopSize";
    Action.SET_PROBLEM = "setProblem";

    Action.addBestGenome = function(bestGenome)
    {
        return (
        {
            type: Action.ADD_BEST_GENOME,
            bestGenome: bestGenome,
        });
    };

    Action.clearBestGenomes = function()
    {
        return (
        {
            type: Action.CLEAR_BEST_GENOMES,
        });
    };

    Action.setBackCount = function(backCount)
    {
        return (
        {
            type: Action.SET_BACK_COUNT,
            backCount: backCount,
        });
    };

    Action.setGenerationCount = function(generationCount)
    {
        return (
        {
            type: Action.SET_GENERATION_COUNT,
            generationCount: generationCount,
        });
    };

    Action.setMessage = function(message)
    {
        return (
        {
            type: Action.SET_MESSAGE,
            message: message,
        });
    };

    Action.setPopSize = function(popSize)
    {
        return (
        {
            type: Action.SET_POP_SIZE,
            popSize: popSize,
        });
    };

    Action.setGeneticAlgorithm = function(geneticAlgorithm)
    {
        return (
        {
            type: Action.SET_GENETIC_ALGORITHM,
            geneticAlgorithm: geneticAlgorithm,
        });
    };

    Action.setProblem = function(problem)
    {
        return (
        {
            type: Action.SET_PROBLEM,
            problem: problem,
        });
    };

    if (Object.freeze)
    {
        Object.freeze(Action);
    }

    return Action;
});

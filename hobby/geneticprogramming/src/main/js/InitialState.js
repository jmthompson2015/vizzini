define(function()
{
    "use strict";
    function InitialState()
    {
        this.bestGenomes = [];
        this.generationCount = 0;
        this.geneticAlgorithm = undefined;
        this.message = "";
        this.popSize = 0;
        this.problem = undefined;
    }

    if (Object.freeze)
    {
        Object.freeze(InitialState);
    }

    return InitialState;
});

define(function()
{
    "use strict";
    var Connector = {};

    Connector.ProblemControlsUI =
    {
        mapStateToProps: function(state, ownProps)
        {
            return (
            {
                backCount: state.backCount,
                generationCount: state.generationCount,
                popSize: state.popSize,
                submitFunction: ownProps.submitFunction,
            });
        }
    };

    Connector.ProblemResultsUI =
    {
        mapStateToProps: function(state, ownProps)
        {
            return (
            {
                bestGenomes: state.bestGenomes,
                message: state.message,
            });
        }
    };

    Connector.ProblemTableauUI =
    {
        mapStateToProps: function(state, ownProps)
        {
            var problem = state.problem;
            var objective = problem.objective();
            var genes = problem.genes();
            var fitnessCases = problem.fitnessCases();

            return (
            {
                objective: objective,
                genes: genes,
                fitnessCases: fitnessCases,
            });
        }
    };

    if (Object.freeze)
    {
        Object.freeze(Connector);
    }

    return Connector;
});

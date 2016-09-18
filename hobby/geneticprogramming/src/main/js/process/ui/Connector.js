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
            var functions = problem.functions();
            var terminals = problem.terminals();
            var fitnessCases = problem.fitnessCases();

            return (
            {
                objective: objective,
                functions: functions,
                terminals: terminals,
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

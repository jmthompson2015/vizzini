// require("react");

/*
 * Provides a user interface for a genetic algorithm tableau.
 */
var ProblemTableauUI = React.createClass(
{
    render: function()
    {
        var problem = this.props.problem;
        var objective = problem.getObjective();
        var genes = problem.getGenes();
        var inputs = problem.getInputs();
        var outputs = problem.getOutputs();

        var fitnessRows = [];

        for (var i = 0; i < inputs.length; i++)
        {
            var input = this.formatArray(inputs[i]);
            var output = this.formatArray(outputs[i]);
            fitnessRows.push(React.DOM.tr(
            {
                key: i
            }, [ React.DOM.td(
            {
                key: 0
            }, input), React.DOM.td(
            {
                key: 1
            }, output) ]));
        }

        var thead = React.DOM.thead(
        {
            key: 0
        }, React.DOM.tr({}, [ React.DOM.th(
        {
            key: 0
        }, "Inputs"), React.DOM.th(
        {
            key: 1
        }, "Outputs") ]));
        var tbody = React.DOM.tbody(
        {
            key: 1
        }, fitnessRows);
        var fitnessCases = React.DOM.table(
        {
            className: "fitnessCases"
        }, [ thead, tbody ]);

        var rows = [];

        rows.push(React.DOM.tr(
        {
            key: 0
        }, [ React.DOM.th(
        {
            key: 0
        }, "Objective:"), React.DOM.td(
        {
            key: 1
        }, objective) ]));

        rows.push(React.DOM.tr(
        {
            key: 1
        }, [ React.DOM.th(
        {
            key: 0
        }, "Genes:"), React.DOM.td(
        {
            key: 1
        }, this.formatArray(genes)) ]));

        rows.push(React.DOM.tr(
        {
            key: 2
        }, [ React.DOM.th(
        {
            key: 0
        }, "Fitness Cases:"), React.DOM.td(
        {
            key: 1
        }, fitnessCases) ]));

        return React.DOM.table(
        {
            className: "problemTableau"
        }, React.DOM.tbody({}, rows));
    },

    formatArray: function(array)
    {
        var answer = array.toString();

        answer = answer.replace(/,/g, ", ");

        return answer;
    }
});

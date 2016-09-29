define(function()
{
    "use strict";
    var ProblemTableauUI = React.createClass(
    {
        render: function()
        {
            var objective = this.props.objective;
            var myFunctions = this.props.functions;
            var terminals = this.props.terminals;
            var fitnessCases = this.props.fitnessCases;

            var functions = [];
            myFunctions.forEach(function(func)
            {
                functions.push(this.functionName(func));
            }, this);

            var fitnessRows = [];

            for (var i = 0; i < fitnessCases.length; i++)
            {
                var input = this.formatArray(JSON.stringify(fitnessCases[i].input));
                var output = this.formatArray(fitnessCases[i].output);
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
            var fitnessCasesTable = React.DOM.table(
            {
                className: "fitnessCases"
            }, [ thead, tbody ]);

            var rows = [];

            rows.push(React.DOM.tr(
            {
                key: rows.length,
            }, [ React.DOM.th(
            {
                key: 0
            }, "Objective:"), React.DOM.td(
            {
                key: 1
            }, objective) ]));

            rows.push(React.DOM.tr(
            {
                key: rows.length,
            }, [ React.DOM.th(
            {
                key: 0
            }, "Functions:"), React.DOM.td(
            {
                key: 1
            }, this.formatArray(functions)) ]));

            rows.push(React.DOM.tr(
            {
                key: rows.length,
            }, [ React.DOM.th(
            {
                key: 0
            }, "Terminals:"), React.DOM.td(
            {
                key: 1
            }, this.formatArray(terminals)) ]));

            rows.push(React.DOM.tr(
            {
                key: rows.length,
            }, [ React.DOM.th(
            {
                key: 0
            }, "Fitness Cases:"), React.DOM.td(
            {
                key: 1
            }, fitnessCasesTable) ]));

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
        },

        functionName: function(func)
        {
            var answer = func.toString();

            answer = answer.substr('function '.length);
            answer = answer.substr(0, answer.indexOf('('));

            return answer;
        },
    });

    ProblemTableauUI.propTypes =
    {
        objective: React.PropTypes.string.isRequired,
        functions: React.PropTypes.array.isRequired,
        terminals: React.PropTypes.array.isRequired,
        fitnessCases: React.PropTypes.array.isRequired,
    };

    return ProblemTableauUI;
});

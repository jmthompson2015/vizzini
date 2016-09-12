define(function()
{
    var ProblemTableauUI = React.createClass(
    {
        render: function()
        {
            var problem = this.props.problem;
            var objective = problem.objective();
            var myFunctions = problem.functions();
            var terminals = problem.terminals();
            var fitnessCases = problem.fitnessCases();

            var functions = [];
            myFunctions.forEach(function(func)
            {
                functions.push(this.functionName(func));
            }, this);

            var fitnessRows = [];

            for (var i = 0; i < fitnessCases.contexts.length; i++)
            {
                var input = this.formatArray(JSON.stringify(fitnessCases.contexts[i]));
                var output = this.formatArray(fitnessCases.outputs[i]);
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
        },

        functionName: function(func)
        {
            var answer = func.toString();

            answer = answer.substr('function '.length);
            answer = answer.substr(0, answer.indexOf('('));

            return answer;
        },
    });

    return ProblemTableauUI;
});

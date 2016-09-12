define([ "PopulationUtilities", "StringifyVisitor" ], function(PopulationUtilities, StringifyVisitor)
{
    "use strict";
    var ProblemResultsUI = React.createClass(
    {
        componentWillMount: function()
        {
            var ga = this.props.ga;
            var self = this;

            ga.bind("generation", function(ga, generationCount)
            {
                var population = ga.population();
                var averageFitness = PopulationUtilities.averageFitness(population);
                var best = population[0];
                var timeString = moment().format("HH:mm:ss:SSS");
                var newRow =
                {
                    timestamp: timeString,
                    generationCount: generationCount,
                    averageFitness: averageFitness,
                    best: best,
                };
                var rows = self.state.rows;
                rows.push(newRow);
                var message = self.state.message;
                self.setState(
                {
                    message: message,
                    rows: rows
                });
            });

            ga.bind("message", function(message)
            {
                var rows = self.state.rows;
                self.setState(
                {
                    message: message,
                    rows: rows
                });
            });
        },

        getInitialState: function()
        {
            return (
            {
                message: "",
                rows: []
            });
        },

        render: function()
        {
            var rows = [];

            rows.push(React.DOM.tr(
            {
                key: rows.length,
            }, React.DOM.td(
            {
                className: "message"
            }, this.state.message)));

            var element = React.createElement(ProblemResultsUI.GenerationUI,
            {
                isCodeDisplayed: this.props.isCodeDisplayed,
                rows: this.state.rows
            });
            rows.push(React.DOM.tr(
            {
                key: rows.length,
            }, React.DOM.td({}, element)));

            return React.DOM.table({}, React.DOM.tbody({}, rows));
        },
    });

    /*
     * Provides a user interface for a genetic algorithm generation table.
     */
    ProblemResultsUI.GenerationUI = React.createClass(
    {
        render: function()
        {
            var tbodyRows = [];

            var rows = this.props.rows;

            for (var i = rows.length - 1; i >= 0; i--)
            {
                var row = rows[i];
                tbodyRows.push(React.createElement(ProblemResultsUI.RowUI,
                {
                    key: i,
                    isCodeDisplayed: this.props.isCodeDisplayed,
                    timestamp: row.timestamp,
                    generationCount: row.generationCount,
                    averageFitness: row.averageFitness,
                    best: row.best
                }));
            }

            var headerCells = [];

            headerCells.push(React.DOM.th(
            {
                key: headerCells.length,
            }, "Time"));
            headerCells.push(React.DOM.th(
            {
                key: headerCells.length,
            }, "Generation"));
            headerCells.push(React.DOM.th(
            {
                key: headerCells.length,
            }, "Average Fitness"));
            headerCells.push(React.DOM.th(
            {
                key: headerCells.length,
            }, "Best Fitness"));
            headerCells.push(React.DOM.th(
            {
                key: headerCells.length,
            }, "Best Genome"));

            var thead = React.DOM.thead(
            {
                key: 0,
            }, React.DOM.tr({}, headerCells));
            var tbody = React.DOM.tbody(
            {
                key: 1,
            }, tbodyRows);

            return React.DOM.table(
            {
                id: "generationTable"
            }, [ thead, tbody ]);
        }
    });

    /*
     * Provides a user interface for a genetic algorithm generation table row.
     */
    ProblemResultsUI.RowUI = React.createClass(
    {
        render: function()
        {
            var averageFitness = Math.vizziniRound(this.props.averageFitness, 2);
            var best = this.props.best;
            var fitness = Math.vizziniRound(best.fitness, 4);
            var visitor1 = new StringifyVisitor(best);
            var genomeString = visitor1.string();

            var cells = [];

            cells.push(React.DOM.td(
            {
                key: cells.length,
            }, this.props.timestamp));
            cells.push(React.DOM.td(
            {
                key: cells.length,
                className: "generationCount"
            }, this.props.generationCount));
            cells.push(React.DOM.td(
            {
                key: cells.length,
                className: "averageFitness"
            }, averageFitness));
            cells.push(React.DOM.td(
            {
                key: cells.length,
                className: "fitness"
            }, fitness));
            cells.push(React.DOM.td(
            {
                key: cells.length,
                className: "genome",
                title: "length = " + best.length
            }, genomeString));

            return React.DOM.tr({}, cells);
        },
    });

    return ProblemResultsUI;
});

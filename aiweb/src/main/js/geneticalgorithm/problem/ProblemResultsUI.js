// require("moment");
// require("react");
// require("GAUtilities");

/*
 * Provides a user interface for a genetic algorithm results.
 */
var ProblemResultsUI = React.createClass(
{
    componentWillMount: function()
    {
        var ga = this.props.ga;
        var self = this;

        ga.bind("generation", function(generationCount)
        {
            var population = ga.getPopulation();
            var averageFitness = GAUtilities.computeAverageFitness(population);
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
            key: 0
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
            key: 1
        }, React.DOM.td({}, element)));

        return React.DOM.table({}, rows);
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
            key: 0
        }, "Time"));
        headerCells.push(React.DOM.th(
        {
            key: 1
        }, "Generation"));
        headerCells.push(React.DOM.th(
        {
            key: 2
        }, "Average Fitness"));
        headerCells.push(React.DOM.th(
        {
            key: 3
        }, "Best Fitness"));
        headerCells.push(React.DOM.th(
        {
            key: 4
        }, "Best Genome"));

        if (this.props.isCodeDisplayed)
        {
            headerCells.push(React.DOM.th(
            {
                key: 5
            }, "Best Code"));
        }

        headerCells.push(React.DOM.th(
        {
            key: 6
        }, "Creator"));

        var thead = React.DOM.thead(
        {
            key: 0
        }, React.DOM.tr({}, headerCells));
        var tbody = React.DOM.tbody(
        {
            key: 1
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
        var averageFitness = GAUtilities.round2(this.props.averageFitness);
        var best = this.props.best;
        var fitness = GAUtilities.round4(best.fitness);
        var genomeString = GAUtilities.genomeToString(best);
        var creator = best.creator;
        var code = best.code === undefined ? "" : best.code;

        var cells = [];

        cells.push(React.DOM.td(
        {
            key: 0
        }, this.props.timestamp));
        cells.push(React.DOM.td(
        {
            key: 1,
            className: "generationCount"
        }, this.props.generationCount));
        cells.push(React.DOM.td(
        {
            key: 2,
            className: "averageFitness"
        }, averageFitness));
        cells.push(React.DOM.td(
        {
            key: 3,
            className: "fitness"
        }, fitness));
        cells.push(React.DOM.td(
        {
            key: 4,
            className: "genome",
            title: "length = " + best.length
        }, genomeString));

        if (this.props.isCodeDisplayed)
        {
            cells.push(React.DOM.td(
            {
                key: 5,
                className: "code"
            }, code));
        }

        cells.push(React.DOM.td(
        {
            key: 6,
            className: "creator"
        }, creator));

        return React.DOM.tr({}, cells);
    },
});

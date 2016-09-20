define([ "StringifyVisitor", "process/GenomeEditor" ], function(StringifyVisitor, GenomeEditor)
{
    "use strict";
    var ProblemResultsUI = React.createClass(
    {
        render: function()
        {
            var rows = [];

            rows.push(React.DOM.tr(
            {
                key: rows.length,
            }, React.DOM.td(
            {
                className: "message",
            }, this.props.message)));

            var element = React.createElement(ProblemResultsUI.GenerationUI,
            {
                rows: this.props.bestGenomes,
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
                    timestamp: row.timestamp,
                    generationCount: row.generationCount,
                    averageFitness: row.averageFitness,
                    best: row,
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
            }, "Best Raw Fitness"));
            headerCells.push(React.DOM.th(
            {
                key: headerCells.length,
            }, "Best Standardized Fitness"));
            headerCells.push(React.DOM.th(
            {
                key: headerCells.length,
            }, "Best Hits"));
            headerCells.push(React.DOM.th(
            {
                key: headerCells.length,
            }, "Best Genome"));
            headerCells.push(React.DOM.th(
            {
                key: headerCells.length,
            }, "Edited Best Genome"));

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
                id: "generationTable",
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
            var rawFitness = Math.vizziniRound(best.rawFitness, 4);
            var fitness = Math.vizziniRound(best.fitness, 4);
            var hits = best.hits;
            var visitor1 = new StringifyVisitor(best);
            var genomeString = visitor1.string();
            var editedGenome = GenomeEditor.edit(best);
            var visitor2 = new StringifyVisitor(editedGenome);
            var editedString = visitor2.string();

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
                className: "rawFitness"
            }, rawFitness));
            cells.push(React.DOM.td(
            {
                key: cells.length,
                className: "fitness"
            }, fitness));
            cells.push(React.DOM.td(
            {
                key: cells.length,
                className: "hits"
            }, hits));
            cells.push(React.DOM.td(
            {
                key: cells.length,
                className: "genome",
                title: "length = " + best.length
            }, genomeString));
            cells.push(React.DOM.td(
            {
                key: cells.length,
                className: "genome",
                title: "length = " + editedGenome.length
            }, editedString));

            return React.DOM.tr({}, cells);
        },
    });

    ProblemResultsUI.propTypes =
    {
        bestGenomes: React.PropTypes.array.required,
        message: React.PropTypes.string.required,
    };

    ProblemResultsUI.GenerationUI.propTypes =
    {
        rows: React.PropTypes.array.required,
    };

    ProblemResultsUI.RowUI.propTypes =
    {
        averageFitness: React.PropTypes.number.required,
        best: React.PropTypes.object.required,
        timestamp: React.PropTypes.number.required,
        generationCount: React.PropTypes.number.required,
    };

    return ProblemResultsUI;
});

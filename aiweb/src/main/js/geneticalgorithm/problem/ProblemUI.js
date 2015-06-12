// require("moment");
// require("react");
// require("GAUtilities");

/*
 * Provides a user interface for a genetic algorithm problem.
 */
var ProblemUI = React.createClass(
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
                var newRow = {
                        timestamp: timeString,
                        generationCount: generationCount,
                        averageFitness: averageFitness,
                        best: best,
                };
                var rows = self.state.rows;
                rows[rows.length] = newRow;
                var message = self.state.message;
                self.setState({message: message, rows: rows});
            });
        
        ga.bind("message", function(message)
            {
                var rows = self.state.rows;
                self.setState({message: message, rows: rows});
            });
    },
    
    getInitialState: function() 
    {
        return {message: "", rows: []};
    },
    
    render: function() 
    {
        return (
            <table>
            <tr>
                <td className="message">{this.state.message}</td>
            </tr>
            <tr>
                <ProblemUI.GenerationUI rows={this.state.rows} />
            </tr>
            </table>);
    },
});

/*
 * Provides a user interface for a genetic algorithm generation table.
 */
ProblemUI.GenerationUI = React.createClass(
{
    render: function() 
    {
        var tbody = [];
        
        var rows = this.props.rows;
        
        for(var i=rows.length-1; i>=0; i--)
        {
            var row = rows[i];
            tbody[tbody.length] = <ProblemUI.RowUI
                key={i}
                timestamp={row.timestamp}
                generationCount={row.generationCount}
                averageFitness={row.averageFitness}
                best={row.best} />;
        }
        
        return (
            <table id="generationTable">
                <thead>
                    <tr>
                        <th>Time</th>
                        <th>Generation</th>
                        <th>Average Fitness</th>
                        <th>Best Fitness</th>
                        <th>Best Genome</th>
                    </tr>
                </thead>
                <tbody>{tbody}</tbody>
            </table>
        );
    }    
});

/*
 * Provides a user interface for a genetic algorithm generation table row.
 */
ProblemUI.RowUI = React.createClass(
{
    render: function() 
    {
        var averageFitness = GAUtilities.round2(this.props.averageFitness);
        var best = this.props.best;
        var fitness = GAUtilities.round4(best.fitness);
        var genomeString = GAUtilities.genomeToString(best);
        
        return (<tr>
            <td>{this.props.timestamp}</td>
            <td className="generationCount">{this.props.generationCount}</td>
            <td className="averageFitness">{averageFitness}</td>
            <td className="fitness">{fitness}</td>
            <td className="genome">{genomeString}</td>
            </tr>
        );
    },
});

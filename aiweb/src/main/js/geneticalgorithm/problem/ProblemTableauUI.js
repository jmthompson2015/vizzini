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
            fitnessRows.push(<tr key={i}><td>{input}</td><td>{output}</td></tr>);
        }
        
        var fitnessCases = <table className="fitnessCases">
            <thead><tr><th>Inputs</th><th>Outputs</th></tr></thead>
            <tbody>{fitnessRows}</tbody></table>;
        var rows = [];

        rows.push(<tr key={0}><th>Objective:</th><td>{objective}</td></tr>);
        rows.push(<tr key={1}><th>Genes:</th><td>{this.formatArray(genes)}</td></tr>);
        rows.push(<tr key={2}><th>Fitness Cases:</th><td>{fitnessCases}</td></tr>);
        
        return (<table className="problemTableau">
            <tbody>{rows}</tbody>
            </table>);
    },
    
    formatArray: function(array)
    {
        var answer = array.toString();
        
        answer = answer.replace(/,/g, ", ");
        
        return answer;
    }
});

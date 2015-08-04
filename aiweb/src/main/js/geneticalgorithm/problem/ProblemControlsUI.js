/*
 * Provides a user interface for genetic algorithm controls.
 */
var ProblemControlsUI = React.createClass(
{
    render: function()
    {
        var popSize = this.props.popSize;
        var generationCount = this.props.generationCount;
        var backCount = this.props.backCount;
        
        return (<table>
            <tr>
                <td>Population Size:</td>
                <td><input id="popSizeInput" type="number" defaultValue={popSize} /></td>
            </tr>
            <tr>
                <td>Generation Count:</td>
                <td><input id="generationCountInput" type="number" defaultValue={generationCount} /></td>
            </tr>
            <tr>
                <td>Back Count:</td>
                <td><input id="backCountInput" type="number" defaultValue={backCount} /></td>
            </tr>
            <tr>
                <td colSpan={2} className="buttonsPanel"><button onClick={submitActionPerformed}>Submit</button></td>
            </tr>
            </table>);
    },
    
    getPopSize: function()
    {
         return this.getNumber("popSizeInput"); 
    },
    
    getGenerationCount:function()
    {
         return this.getNumber("generationCountInput");
    },
    
    getBackCount: function()
    {
         return this.getNumber("backCountInput");
    },
    
    getNumber: function(elementId)
    {
        var value = document.getElementById(elementId).value;

        return Number(value); 
    },
});

/*
 * Provides a pilots user interface for Starfighter Squadrons.
 */
var PilotsUI = React.createClass({
    
    getInitialState: function() 
    {
        return {tokens: this.props.initialTokens};
    },
    
    render: function() 
    {
        var tokens = this.state.tokens;
        
        var tokenHtml = tokens.map(function(token)
        {
            return <PilotCardUI key={token.getId()} isCompact={true} initialToken={token} />;
        });
        
        return <table>
            <tr>
            <td>{tokenHtml}</td>
            </tr>
            </table>;
    },
});

/**
 * Provides a user interface to create the planning action.
 */
var PlanningPanel = React.createClass(
{
    getInitialState: function() 
    {
        return {tokenToManeuver: {}};
    },
    
    cancel: function()
    {
        callback(undefined);
    },

    ok: function()
    {
        var environment = this.props.environment;
        var agent = this.props.agent;
        var tokenToManeuver = this.state.tokenToManeuver;
        var callback = this.props.callback;
        
        var answer = new PlanningAction(environment, agent, tokenToManeuver);

        callback(answer);
    },

    render: function() 
    {
        var tokens = this.props.tokens;
        var imageUtils = this.props.imageUtils;
        var self = this;
        var myHtml = [];
        
        for (var i = 0; i < tokens.length; i++)
        {
            var token = tokens[i];
            myHtml[myHtml.length] = <td key={i} className="planningTableCell">
                <ManeuverChooser
                    token={token}
                    imageUtils={imageUtils}
                    callback={self.selectionChanged}
                />
                </td>;
        }
        
        return (<OptionPane panelClass="optionPane"
            title="Planning: Select Maneuvers" titleClass="optionPaneTitle"
            initialInput={<table><tr>{myHtml}</tr></table>}
            buttons={<span><button onClick={self.cancel}>Cancel</button>
                <button onClick={self.ok}>OK</button></span>}
            buttonsClass="optionPaneButtons"
        />);
    },

    selectionChanged: function(token, maneuver)
    {
        LOGGER.debug("selectionChanged() token = " + token + " maneuver = " + maneuver);
        var tokenToManeuver = this.state.tokenToManeuver;
        tokenToManeuver[token] = maneuver;
    },
});

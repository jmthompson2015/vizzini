/*
 * Provides a user interface to choose a ship action.
 */
var ShipActionChooser = React.createClass(
{
    getInitialState: function() 
    {
        return {selectedIndex: 0};
    },
    
    render: function() 
    {
        var token = this.props.token;
        var message = "Active Ship: " + token.getName();
        var shipActions = this.props.shipActions;
        var options = shipActions.map(function(shipAction)
            {
                return ShipAction.properties[shipAction].displayName;
            }
        );
        var self = this;
        
        return (<OptionPane panelClass="optionPane"
            title="Select Action" titleClass="optionPaneTitle"
            message={message} messageClass="optionPaneMessage"
            initialInput={<RadioButtonList panelClass="optionPaneInput" name="shipActionRadio" options={options} onChange={self.selectionChanged} />}
            buttons={<span><button onClick={self.cancel}>Cancel</button>
                <button onClick={self.ok}>OK</button></span>}
            buttonsClass="optionPaneButtons"
        />);
    },

    selectionChanged: function(event)
    {
        var index = event.currentTarget.value;
        LOGGER.debug("selectionChanged() selectedIndex = " + index);
        this.setState({selectedIndex: index});
    },

    cancel: function()
    {
        LOGGER.debug("Cancel clicked");
        this.props.callback(undefined);
    },

    ok: function()
    {
        var selectedIndex = this.state.selectedIndex;
        var selectedShipAction = this.props.shipActions[selectedIndex];
        LOGGER.debug("OK clicked, selectedIndex = " + selectedIndex+ " "+selectedShipAction);
        this.props.callback(selectedShipAction);
    },
});

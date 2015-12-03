/*
 * Provides a user interface to choose a ship action.
 * 
 * @param token Token.
 * @param shipActions Ship actions.
 * @param callback Callback.
 */
var ShipActionChooser = React.createClass(
{
    getInitialState: function()
    {
        var shipActions = this.props.shipActions;

        return (
        {
            selected: (shipActions.length > 0 ? shipActions[0] : undefined),
        });
    },

    render: function()
    {
        var token = this.props.token;
        var message = "Active Ship: " + token.getName();
        var shipActions = this.props.shipActions;
        var labelFunction = function(value)
        {
            return ShipAction.properties[value].displayName;
        }
        var initialValue = (shipActions.length > 0 ? shipActions[0] : undefined);
        var initialInput = React.createElement(InputPanel,
        {
            type: "radio",
            values: shipActions,
            name: "shipActionRadio",
            labelFunction: labelFunction,
            initialValues: initialValue,
            onChange: this.selectionChanged,
            panelClass: "optionPaneInput",
        });
        var cancelButton = React.DOM.button(
        {
            key: 0,
            onClick: this.cancel
        }, "Cancel");
        var okButton = React.DOM.button(
        {
            key: 1,
            onClick: this.ok
        }, "OK");
        var buttons = React.DOM.span({}, [ cancelButton, okButton ]);

        return React.createElement(OptionPane,
        {
            panelClass: "optionPane",
            title: "Select Action",
            titleClass: "optionPaneTitle",
            message: message,
            messageClass: "optionPaneMessage",
            initialInput: initialInput,
            buttons: buttons,
            buttonsClass: "optionPaneButtons"
        });
    },

    selectionChanged: function(event)
    {
        var selected = event.target.id;
        LOGGER.debug("selectionChanged() selected = " + selected);
        this.setState(
        {
            selected: selected
        });
    },

    cancel: function()
    {
        LOGGER.debug("Cancel clicked");
        this.props.callback(undefined);
    },

    ok: function()
    {
        var selected = this.state.selected;
        LOGGER.debug("OK clicked, selected = " + selected);
        this.props.callback(selected);
    },
});

/*
 * Provides a user interface to choose a ship action.
 * 
 * @param token Token.
 * @param shipActions Ship actions.
 * @param callback Callback.
 */
define([ "ShipAction" ], function(ShipAction)
{
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
            var message = "Active Ship: " + token.name();
            var shipActions = this.props.shipActions;
            var idFunction = function(value)
            {
                var answer = value;
                if (!ShipAction.properties[value])
                {
                    answer = value.defender.id();
                }
                return answer;
            }
            var labelFunction = function(value)
            {
                var answer;
                if (ShipAction.properties[value])
                {
                    answer = ShipAction.properties[value].displayName;
                }
                else
                {
                    answer = "Target Lock: " + value.defender.name();
                }
                return answer;
            }
            var initialValue = (shipActions.length > 0 ? shipActions[0] : undefined);
            var initialInput = React.createElement(InputPanel,
            {
                type: "radio",
                values: shipActions,
                name: "shipActionRadio",
                idFunction: idFunction,
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

            if (!isNaN(selected))
            {
                var myId = parseInt(selected);
                LOGGER.info("myId = " + myId);
                var shipActions = this.props.shipActions;

                for (var i = 0; i < shipActions.length; i++)
                {
                    var shipAction = shipActions[i];

                    if (!ShipAction.properties[shipAction] && shipAction.defender.id() === myId)
                    {
                        selected = shipAction;
                        LOGGER.info("shipAction = " + JSON.stringify(shipAction));
                        break;
                    }
                }
            }

            LOGGER.debug("selectionChanged() selected = " + JSON.stringify(selected));

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

    return ShipActionChooser;
});

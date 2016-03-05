define([ "ShipAction", "ui/ShipActionUI" ], function(ShipAction, ShipActionUI)
{
    "use strict";
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
                    if (value.defender)
                    {
                        answer = value.defender.id();
                    }
                    else if (value.maneuver)
                    {
                        answer = value.maneuver;
                    }
                }
                return answer;
            };
            var labelFunction = function(value)
            {
                var answer = React.createElement(ShipActionUI,
                {
                    shipActionKey: value,
                    showName: true,
                });
                return answer;
            };
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
            var myId, shipActions, shipAction;

            if (isNaN(selected))
            {
                myId = selected;
                LOGGER.trace("myId = " + myId);
                shipActions = this.props.shipActions;

                for (var i = 0; i < shipActions.length; i++)
                {
                    shipAction = shipActions[i];

                    if (!ShipAction.properties[shipAction] && shipAction.maneuver === myId)
                    {
                        selected = shipAction;
                        LOGGER.trace("shipAction = " + JSON.stringify(shipAction));
                        break;
                    }
                }
            }
            else
            {
                myId = parseInt(selected);
                LOGGER.trace("myId = " + myId);
                shipActions = this.props.shipActions;

                for (var j = 0; j < shipActions.length; j++)
                {
                    shipAction = shipActions[j];

                    if (!ShipAction.properties[shipAction] && shipAction.defender && shipAction.defender.id() === myId)
                    {
                        selected = shipAction;
                        LOGGER.trace("shipAction = " + JSON.stringify(shipAction));
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

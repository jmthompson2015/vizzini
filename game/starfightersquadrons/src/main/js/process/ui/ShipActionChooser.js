define(["ShipAction", "process/ui/AbilityUI", "process/ui/ShipActionUI", "../../../../../../../coreweb/src/main/js/ui/InputPanel2"],
   function(ShipAction, AbilityUI, ShipActionUI, InputPanel)
   {
      "use strict";
      var ShipActionChooser = React.createClass(
      {
         propTypes:
         {
            callback: PropTypes.func.isRequired,
            imageBase: PropTypes.string.isRequired,
            shipActions: PropTypes.array.isRequired,
            token: PropTypes.object.isRequired,
         },

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
            var imageBase = this.props.imageBase;
            var idFunction = function(value)
            {
               return value.toString();
            };
            var labelFunction = function(value)
            {
               var answer;
               if (value.shipActionKey() === "criticalDamage")
               {
                  answer = React.createElement(AbilityUI.Damage,
                  {
                     damage: value.damage(),
                     imageBase: imageBase,
                  });
               }
               else if (value.shipActionKey() === "upgrade")
               {
                  answer = React.createElement(AbilityUI.Upgrade,
                  {
                     upgrade: value.upgrade(),
                     imageBase: imageBase,
                  });
               }
               else
               {
                  answer = React.DOM.span(
                  {}, React.createElement(ShipActionUI,
                  {
                     shipAction: ShipAction.properties[value.shipActionKey()],
                     imageBase: imageBase,
                  }), " ", value.toString());
               }
               return answer;
            };
            var initialValue = (shipActions.length > 0 ? shipActions[0] : undefined);
            var initialInput = React.createElement(InputPanel,
            {
               type: InputPanel.Type.RADIO,
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
            var buttons = React.DOM.span(
            {}, [cancelButton, okButton]);

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

         selectionChanged: function(event, selected)
         {
            var shipActions = this.props.shipActions;

            for (var i = 0; i < shipActions.length; i++)
            {
               var shipAction = shipActions[i];

               if (shipAction.toString() === selected)
               {
                  selected = shipAction;
                  break;
               }
            }

            LOGGER.debug("selectionChanged() selected = " + selected + " typeof selected = " + (typeof selected));

            this.setState(
            {
               selected: selected,
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

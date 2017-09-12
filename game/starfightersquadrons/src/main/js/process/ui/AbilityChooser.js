define(["process/ui/EntityUI", "../../../../../../../coreweb/src/main/js/ui/InputPanel2"],
   function(EntityUI, InputPanel)
   {
      var AbilityChooser = React.createClass(
      {
         propTypes:
         {
            damages: PropTypes.array.isRequired,
            iconBase: PropTypes.string.isRequired,
            imageBase: PropTypes.string.isRequired,
            onChange: PropTypes.func.isRequired,
            pilots: PropTypes.array.isRequired,
            shipActions: PropTypes.array.isRequired,
            token: PropTypes.object.isRequired,
            upgrades: PropTypes.array.isRequired,
         },

         render: function()
         {
            var token = this.props.token;
            var damages = this.props.damages;
            var pilots = this.props.pilots;
            var shipActions = this.props.shipActions;
            var upgrades = this.props.upgrades;
            var iconBase = this.props.iconBase;
            var imageBase = this.props.imageBase;

            var message = "Active Ship: " + token.name();
            var okButton = React.DOM.button(
            {
               key: 0,
               onClick: this.ok,
            }, "Pass");
            var buttons = React.DOM.span(
            {}, [okButton]);

            var labelFunction = function(value)
            {
               var answer = React.createElement(EntityUI,
               {
                  context: value.context(),
                  entity: value.sourceObject(),
                  iconBase: iconBase,
                  imageBase: imageBase,
               });

               return answer;
            };

            var values = shipActions.slice();
            values.vizziniAddAll(pilots);
            values.vizziniAddAll(upgrades);
            values.vizziniAddAll(damages);

            var initialInput = React.createElement(InputPanel,
            {
               type: InputPanel.Type.RADIO,
               values: values,
               name: "selectUpgrade",
               labelFunction: labelFunction,
               onChange: this.myOnChange,
               panelClass: "combatChoicePanel",
            });

            var title = "Select Ability";

            return React.createElement(OptionPane,
            {
               panelClass: "optionPane",
               title: title,
               titleClass: "optionPaneTitle",
               message: message,
               messageClass: "combatMessage",
               initialInput: initialInput,
               buttons: buttons,
               buttonsClass: "optionPaneButtons",
            });
         },

         myOnChange: function(event, selected)
         {
            LOGGER.trace("AbilityChooser.myOnChange()");
            LOGGER.debug("AbilityChooser.myOnChange() selected = " + selected + " " + (typeof selected));

            var isAccepted = (selected !== undefined);
            this.props.onChange(selected, isAccepted);
         },

         ok: function(event, selected)
         {
            var isAccepted = false;
            this.props.onChange(undefined, undefined, undefined, isAccepted);
         },
      });

      return AbilityChooser;
   });

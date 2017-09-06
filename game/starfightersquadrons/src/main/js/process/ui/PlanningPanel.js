define(["Maneuver", "process/Selector", "process/ui/ManeuverChooser"],
   function(Maneuver, Selector, ManeuverChooser)
   {
      "use strict";
      var PlanningPanel = React.createClass(
      {
         propTypes:
         {
            agent: PropTypes.object.isRequired,
            callback: PropTypes.func.isRequired,
            environment: PropTypes.object.isRequired,
            imageBase: PropTypes.string.isRequired,
            tokens: PropTypes.array.isRequired,
         },

         getInitialState: function()
         {
            return (
            {
               tokenToManeuver:
               {},
            });
         },

         render: function()
         {
            var tokens = this.props.tokens;
            var self = this;
            var cells = [];

            for (var i = 0; i < tokens.length; i++)
            {
               var token = tokens[i];
               var maneuverKeys = token.maneuverKeys();
               var maneuvers = [];
               for (var m = 0; m < maneuverKeys.length; m++)
               {
                  maneuvers.push(Maneuver.properties[maneuverKeys[m]]);
               }
               var element = React.createElement(ManeuverChooser,
               {
                  callback: self.selectionChanged,
                  imageBase: this.props.imageBase,
                  maneuvers: maneuvers,
                  pilotName: token.pilotName(),
                  shipName: token.shipName(),
                  tokenId: token.id(),
               });
               cells.push(React.DOM.td(
               {
                  key: i,
                  className: "planningTableCell",
               }, element));
            }

            var initialInput = React.DOM.table(
            {}, React.DOM.tbody(
            {}, React.DOM.tr(
            {}, cells)));
            var disabled = Object.getOwnPropertyNames(this.state.tokenToManeuver).length < tokens.length;
            var buttons = React.DOM.button(
            {
               onClick: self.ok,
               disabled: disabled,
            }, "OK");
            return React.createElement(OptionPane,
            {
               message: "",
               panelClass: "optionPane",
               title: "Planning: Select Maneuvers",
               titleClass: "optionPaneTitle",
               initialInput: initialInput,
               buttons: buttons,
               buttonsClass: "optionPaneButtons",
            });
         },

         ok: function()
         {
            var environment = this.props.environment;
            var agent = this.props.agent;
            var tokenToManeuver = this.state.tokenToManeuver;
            var callback = this.props.callback;

            callback(tokenToManeuver);
         },

         selectionChanged: function(tokenId, maneuverKey)
         {
            LOGGER.debug("selectionChanged() tokenId = " + tokenId + " maneuverKey = " + maneuverKey);
            var tokens = this.props.tokens;
            var store = (tokens.length > 0 ? tokens[0].store() : undefined);
            var token = Selector.token(store.getState(), parseInt(tokenId));
            var tokenToManeuver = this.state.tokenToManeuver;
            tokenToManeuver[token] = maneuverKey;

            this.setState(
            {
               tokenToManeuver: tokenToManeuver,
            });
         },
      });

      return PlanningPanel;
   });

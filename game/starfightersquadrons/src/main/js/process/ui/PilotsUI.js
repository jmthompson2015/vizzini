define(["process/ui/Connector", "process/ui/PilotCardCompactUI"], function(Connector, PilotCardCompactUI)
{
   "use strict";
   var PilotsUI = React.createClass(
   {
      propTypes:
      {
         tokens: PropTypes.array.isRequired,
         imageBase: PropTypes.string.isRequired,
      },

      render: function()
      {
         var tokens = this.props.tokens;
         var connector = ReactRedux.connect(Connector.PilotCardCompactUI.mapStateToProps)(PilotCardCompactUI);

         var tokenElements = tokens.map(function(token, i)
         {
            var element = React.createElement(connector,
            {
               imageBase: this.props.imageBase,
               isCompact: true,
               token: token,
            });
            return React.DOM.td(
            {
               key: i,
               className: "alignTop",
            }, element);
         }, this);

         var row = React.DOM.tr(
         {}, tokenElements);

         var myTable = React.DOM.table(
         {
            style:
            {
               "marginLeft": "auto",
               "marginRight": "auto",
               "textAlign": "center",
            },
         }, React.DOM.tbody(
         {}, row));

         return React.DOM.div(
         {}, myTable);
      },
   });

   return PilotsUI;
});

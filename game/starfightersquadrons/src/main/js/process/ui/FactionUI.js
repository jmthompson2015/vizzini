define(function()
{
   "use strict";
   var FactionUI = React.createClass(
   {
      propTypes:
      {
         faction: PropTypes.object.isRequired,
         imageBase: PropTypes.string.isRequired,

         // default: false
         isSmall: PropTypes.bool,
         // default: faction value
         myKey: PropTypes.string,
         // default: false
         showName: PropTypes.bool,
      },

      render: function()
      {
         var faction = this.props.faction;

         var myKey = (this.props.myKey !== undefined ? this.props.myKey : faction.value);
         var size = (this.props.isSmall ? 24 : 32);
         var fileString = this.props.imageBase + faction.shortName + "Icon" + size + ".png";
         var icon = React.DOM.img(
         {
            key: myKey,
            className: "factionUIImage",
            src: fileString,
            title: faction.name,
         });

         var answer = icon;

         var showName = (this.props.showName !== undefined ? this.props.showName : false);

         if (showName)
         {
            answer = React.DOM.span(
            {}, icon, " ", faction.name);
         }

         return answer;
      },
   });

   return FactionUI;
});

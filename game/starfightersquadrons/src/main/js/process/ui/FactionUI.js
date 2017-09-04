define(["Team"], function(Team)
{
   "use strict";
   var FactionUI = React.createClass(
   {
      propTypes:
      {
         faction: PropTypes.object.isRequired,

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
         var src = this.createSrc(faction);
         var icon = React.DOM.img(
         {
            key: myKey,
            className: "factionUIImage",
            height: size,
            src: src,
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

      createSrc: function(faction)
      {
         InputValidator.validateNotNull("faction", faction);

         var factionUrls = ["galactic-empire", "first-order", "rebel-alliance", "resistance", "scum-and-villainy"];
         var factionUrl = factionUrls[Team.values().indexOf(faction.value)];

         return FactionUI.BASE_URL + factionUrl + ".png";
      },
   });

   FactionUI.BASE_URL = "https://rawgit.com/guidokessels/xwing-data/master/images/factions/";

   return FactionUI;
});

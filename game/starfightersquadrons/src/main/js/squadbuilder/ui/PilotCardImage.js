define(["Team"], function(Team)
{
   "use strict";
   var PilotCardImage = React.createClass(
   {
      propTypes:
      {
         pilot: PropTypes.object.isRequired,

         width: PropTypes.number,
      },

      render: function()
      {
         var pilot = this.props.pilot;
         var width = (this.props.width ? this.props.width : 200);

         if (pilot.fore)
         {
            var src0 = this.createSrc(pilot.fore);
            var cell0 = React.DOM.img(
            {
               src: src0,
               title: pilot.fore.name,
               width: width,
            });

            var src1 = this.createSrc(pilot.aft);
            var cell1 = React.DOM.img(
            {
               src: src1,
               title: pilot.aft.name,
               width: width,
            });

            return React.DOM.span(
            {}, cell0, cell1);
         }
         else
         {
            var src = this.createSrc(pilot);

            return React.DOM.img(
            {
               src: src,
               title: pilot.name,
               width: width,
            });
         }
      },

      createSrc: function(pilot)
      {
         InputValidator.validateNotNull("pilot", pilot);

         var factionUrls = ["Galactic Empire/", "First Order/", "Rebel Alliance/", "Resistance/", "Scum and Villainy/"];
         var factionUrl = factionUrls[Team.values().indexOf(pilot.shipTeam.teamKey)];

         var shipUrl = pilot.shipTeam.ship.name + "/";
         shipUrl = shipUrl.replace("-Wing", "-wing");
         shipUrl = shipUrl.replace("TIE/", "TIE-");

         var pilotUrl = pilot.name;
         pilotUrl = pilotUrl.toLowerCase();
         pilotUrl = pilotUrl.replace(/\'/g, "-");
         pilotUrl = pilotUrl.replace(/\"/g, "");
         pilotUrl = pilotUrl.replace(/ /g, "-");
         pilotUrl = pilotUrl.replace("-(attack-shuttle)", "");
         pilotUrl = pilotUrl.replace("-(hotr)", "");
         pilotUrl = pilotUrl.replace("-(imperial)", "");
         pilotUrl = pilotUrl.replace("-(rebel)", "");
         pilotUrl = pilotUrl.replace("-(scum)", "");
         pilotUrl = pilotUrl.replace("-(vcx-100)", "");
         pilotUrl = pilotUrl.replace("black-eight-sq.-pilot", "black-eight-squadron-pilot");
         pilotUrl = pilotUrl.replace("cr90-corvette-(aft)", "cr90-corvette-aft");
         pilotUrl = pilotUrl.replace("cr90-corvette-(fore)", "cr90-corvette-fore");
         pilotUrl = pilotUrl.replace("nashtah-pup-pilot", "nashtah-pup");
         pilotUrl = pilotUrl.replace("raider-class-corvette-(aft)", "raider-class-corv-aft");
         pilotUrl = pilotUrl.replace("raider-class-corvette-(fore)", "raider-class-corv-fore");

         return PilotCardImage.BASE_URL + factionUrl + shipUrl + pilotUrl + ".png";
      },

   });

   PilotCardImage.BASE_URL = "https://rawgit.com/guidokessels/xwing-data/master/images/pilots/";

   return PilotCardImage;
});

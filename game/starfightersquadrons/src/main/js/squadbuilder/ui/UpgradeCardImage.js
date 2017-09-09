/*
 * see https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement
 */
define(function()
{
   "use strict";
   var UpgradeCardImage = React.createClass(
   {
      propTypes:
      {
         upgrade: PropTypes.object.isRequired,

         width: PropTypes.number,
      },

      render: function()
      {
         var upgrade = this.props.upgrade;
         var width = (this.props.width ? this.props.width : 135);
         var src = this.createSrc(upgrade);
         var myLogLoadFailure = this.logLoadFailure;

         return React.DOM.img(
         {
            crossOrigin: "anonymous",
            onError: function()
            {
               myLogLoadFailure(src);
            },
            src: src,
            title: upgrade.name,
            width: width,
         });
      },

      createSrc: function(upgrade)
      {
         InputValidator.validateNotNull("upgrade", upgrade);

         var upgradeTypeUrl = upgrade.type.name + "/";

         var upgradeUrl = upgrade.name;
         upgradeUrl = upgradeUrl.toLowerCase();
         upgradeUrl = upgradeUrl.replace(/ /g, "-");
         upgradeUrl = upgradeUrl.replace(/\'/g, "-");
         upgradeUrl = upgradeUrl.replace(/\//g, "-");
         upgradeUrl = upgradeUrl.replace(/\"/g, "");
         upgradeUrl = upgradeUrl.replace("-(hotr)", "");
         upgradeUrl = upgradeUrl.replace("bossk", "bossk-crew");
         upgradeUrl = upgradeUrl.replace("hound-s-tooth", "hounds-tooth");
         upgradeUrl = upgradeUrl.replace("kylo-ren-s-shuttle", "kylo-rens-shuttle");
         upgradeUrl = upgradeUrl.replace("mk.-ii", "mk2");
         upgradeUrl = upgradeUrl.replace("r2-d2-(crew)", "r2-d2");

         // FIXME: Adaptability is two-sided.
         upgradeUrl = upgradeUrl.replace("adaptability", "adaptability-increase");
         // FIXME: Pivot Wing is two-sided.
         upgradeUrl = upgradeUrl.replace("pivot-wing", "pivot-wing-attack");

         return UpgradeCardImage.BASE_URL + upgradeTypeUrl + upgradeUrl + ".png";
      },

      logLoadFailure: function(src)
      {
         var lastIndex = src.lastIndexOf("/");
         lastIndex = src.lastIndexOf("/", lastIndex - 1);
         var filename = src.substring(lastIndex + 1);
         LOGGER.error("PilotCardImage failed to load " + filename);
      },
   });

   UpgradeCardImage.BASE_URL = "https://rawgit.com/guidokessels/xwing-data/master/images/upgrades/";

   return UpgradeCardImage;
});

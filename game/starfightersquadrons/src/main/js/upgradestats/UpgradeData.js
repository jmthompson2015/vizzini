define(function()
{
   "use strict";
   var UpgradeData = {};

   UpgradeData.createUpgradeData = function(upgrade)
   {
      InputValidator.validateNotNull("upgrade", upgrade);

      var restrictionKeys = (upgrade.restrictionKeys !== undefined ? upgrade.restrictionKeys : []);
      var rangeKeys = (upgrade.rangeKeys !== undefined ? upgrade.rangeKeys : []);
      var isImplemented = (upgrade.isImplemented !== undefined ? upgrade.isImplemented : false);

      return (
      {
         typeKey: upgrade.typeKey,
         name: upgrade.name,
         restrictionKeys: restrictionKeys,
         headerKey: upgrade.headerKey,
         weaponValue: upgrade.weaponValue,
         rangeKeys: rangeKeys,
         firingArcKey: upgrade.firingArcKey,
         description: upgrade.description,
         squadPointCost: upgrade.squadPointCost,
         isImplemented: isImplemented,
      });
   };

   return UpgradeData;
});

define(["UpgradeType"], function(UpgradeType)
{
   var UpgradeTypeComparator = function(upgradeTypeA, upgradeTypeB)
   {
      var valueA = UpgradeTypeComparator.TYPE_ORDER.indexOf(upgradeTypeA);
      var valueB = UpgradeTypeComparator.TYPE_ORDER.indexOf(upgradeTypeB);

      var answer = -1;

      if (valueA === valueB)
      {
         answer = 0;
      }
      else if (valueA > valueB)
      {
         answer = 1;
      }

      return answer;
   };

   UpgradeTypeComparator.TYPE_ORDER = [
     UpgradeType.TITLE, // type
     UpgradeType.ELITE, // type
     UpgradeType.SYSTEM, // type
     UpgradeType.TURRET, // type
     UpgradeType.CANNON, // type
     UpgradeType.TORPEDO, // type
     UpgradeType.MISSILE, // type
     UpgradeType.CREW, // type
     UpgradeType.BOMB, // type
     UpgradeType.HARDPOINT, // type
     UpgradeType.TEAM, // type
     UpgradeType.CARGO, // type
     UpgradeType.SALVAGED_ASTROMECH, // type
     UpgradeType.ASTROMECH, // type
     UpgradeType.TECH, // type
     UpgradeType.ILLICIT, // type
     UpgradeType.MODIFICATION, // type
   ];

   return UpgradeTypeComparator;
});

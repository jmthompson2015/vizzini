define(function()
{
   "use strict";

   function InitialState()
   {
      this.delegateStore = undefined;
      this.displayItem = undefined;
      this.displayItemType = undefined;
      this.imageBase = undefined;
      this.pilots = Immutable.List();
      this.pilotIndexToUpgrades = Immutable.Map();
      this.ships = Immutable.List();
      this.squad = undefined;
      this.team = undefined;
   }

   return InitialState;
});

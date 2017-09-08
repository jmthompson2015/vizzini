define(function()
{
   "use strict";
   var Action = {};

   Action.INITIALIZE = "initialize";
   Action.SET_DISPLAY_ITEM = "setDisplayItem";
   Action.SET_PILOT = "setPilot";
   Action.SET_PILOT_UPGRADE = "setPilotUpgrade";
   Action.SET_SHIP = "setShip";
   Action.SET_SQUAD = "setSquad";

   Action.initialize = function(delegateStore, imageBase, team)
   {
      InputValidator.validateNotNull("delegateStore", delegateStore);
      InputValidator.validateNotNull("imageBase", imageBase);
      InputValidator.validateNotNull("team", team);

      return (
      {
         type: this.INITIALIZE,
         delegateStore: delegateStore,
         imageBase: imageBase,
         team: team,
      });
   };

   Action.setDisplayItem = function(displayItem, displayItemType)
   {
      return (
      {
         type: this.SET_DISPLAY_ITEM,
         displayItem: displayItem,
         displayItemType: displayItemType,
      });
   };

   Action.setPilot = function(pilot, index)
   {
      InputValidator.validateIsNumber("index", index);

      return (
      {
         type: this.SET_PILOT,
         pilot: pilot,
         index: index,
      });
   };

   Action.setPilotUpgrade = function(pilotIndex, upgrade, upgradeIndex)
   {
      InputValidator.validateIsNumber("pilotIndex", pilotIndex);
      // upgrade optional.
      InputValidator.validateIsNumber("upgradeIndex", upgradeIndex);

      return (
      {
         type: this.SET_PILOT_UPGRADE,
         pilotIndex: pilotIndex,
         upgrade: upgrade,
         upgradeIndex: upgradeIndex,
      });
   };

   Action.setShip = function(ship, index)
   {
      InputValidator.validateIsNumber("index", index);

      return (
      {
         type: this.SET_SHIP,
         ship: ship,
         index: index,
      });
   };

   Action.setSquad = function(squad)
   {
      InputValidator.validateNotNull("squad", squad);

      return (
      {
         type: this.SET_SQUAD,
         squad: squad,
      });
   };

   return Action;
});

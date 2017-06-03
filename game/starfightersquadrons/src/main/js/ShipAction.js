define(function()
{
   "use strict";
   var ShipAction = {
      BARREL_ROLL: "barrelRoll",
      BOOST: "boost",
      CLOAK: "cloak",
      COORDINATE: "coordinate",
      DECLOAK: "decloak",
      EVADE: "evade",
      FOCUS: "focus",
      JAM: "jam",
      RECOVER: "recover",
      REINFORCE: "reinforce",
      ROTATE_ARC: "rotateArc",
      SLAM: "slam",
      TARGET_LOCK: "targetLock",

      properties:
      {
         "barrelRoll":
         {
            name: "Barrel Roll",
            value: "barrelRoll",
         },
         "boost":
         {
            name: "Boost",
            value: "boost",
         },
         "cloak":
         {
            name: "Cloak",
            value: "cloak",
         },
         "coordinate":
         {
            name: "Coordinate",
            value: "coordinate",
         },
         "decloak":
         {
            name: "Decloak",
            value: "decloak",
         },
         "evade":
         {
            name: "Evade",
            value: "evade",
         },
         "focus":
         {
            name: "Focus",
            value: "focus",
         },
         "jam":
         {
            name: "Jam",
            value: "jam",
         },
         "recover":
         {
            name: "Recover",
            value: "recover",
         },
         "reinforce":
         {
            name: "Reinforce",
            value: "reinforce",
         },
         "rotateArc":
         {
            name: "Rotate Arc",
            value: "rotateArc",
         },
         "slam":
         {
            name: "SLAM",
            value: "slam",
         },
         "targetLock":
         {
            name: "Target Lock",
            value: "targetLock",
         },
      },

      values: function()
      {
         return Object.getOwnPropertyNames(ShipAction.properties);
      },
   };

   if (Object.freeze)
   {
      Object.freeze(ShipAction);
   }

   return ShipAction;
});

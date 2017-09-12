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
            isImplemented: true,
            value: "barrelRoll",
         },
         "boost":
         {
            name: "Boost",
            isImplemented: true,
            value: "boost",
         },
         "cloak":
         {
            name: "Cloak",
            isImplemented: true,
            value: "cloak",
         },
         "coordinate":
         {
            name: "Coordinate",
            isImplemented: true,
            value: "coordinate",
         },
         "decloak":
         {
            name: "Decloak",
            isImplemented: true,
            value: "decloak",
         },
         "evade":
         {
            name: "Evade",
            isImplemented: true,
            value: "evade",
         },
         "focus":
         {
            name: "Focus",
            isImplemented: true,
            value: "focus",
         },
         "jam":
         {
            name: "Jam",
            isImplemented: true,
            value: "jam",
         },
         "recover":
         {
            name: "Recover",
            isImplemented: true,
            value: "recover",
         },
         "reinforce":
         {
            name: "Reinforce",
            isImplemented: true,
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
            isImplemented: true,
            value: "slam",
         },
         "targetLock":
         {
            name: "Target Lock",
            isImplemented: true,
            value: "targetLock",
         },
      },

      values: function()
      {
         return Object.getOwnPropertyNames(ShipAction.properties);
      },
   };

   ShipAction.values().forEach(function(shipActionKey)
   {
      var shipAction = ShipAction.properties[shipActionKey];
      shipAction.vizziniType = ShipAction;

      shipAction.oncePerRound = true;
   });

   if (Object.freeze)
   {
      Object.freeze(ShipAction);
   }

   return ShipAction;
});

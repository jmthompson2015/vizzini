define(function()
{
   var Event = {
      AFTER_EXECUTE_MANEUVER: "afterExecuteManeuver",
      RECEIVE_CRITICAL_DAMAGE: "receiveCriticalDamage",
      RECEIVE_DAMAGE: "receiveDamage",
      RECEIVE_STRESS: "receiveStress",
      RECOVER_SHIELD: "recoverShield",
      REMOVE_SHIELD: "removeShield",
      REMOVE_STRESS: "removeStress",
      SHIP_ACTION_PERFORMED: "shipActionPerformed",
      TARGET_LOCK_ACQUIRED: "targetLockAcquired",

      properties:
      {
         "afterExecuteManeuver":
         {
            name: "After Execute Maneuver",
            value: "afterExecuteManeuver",
         },
         "receiveCriticalDamage":
         {
            name: "Receive Critical Damage",
            value: "receiveCriticalDamage",
         },
         "receiveDamage":
         {
            name: "Receive Damage",
            value: "receiveDamage",
         },
         "receiveStress":
         {
            name: "Receive Stress",
            value: "receiveStress",
         },
         "recoverShield":
         {
            name: "Recover Shield",
            value: "recoverShield",
         },
         "removeShield":
         {
            name: "Remove Shield",
            value: "removeShield",
         },
         "removeStress":
         {
            name: "Remove Stress",
            value: "removeStress",
         },
         "shipActionPerformed":
         {
            name: "Ship Action Performed",
            value: "shipActionPerformed",
         },
         "targetLockAcquired":
         {
            name: "Target Lock Acquired",
            value: "targetLockAcquired",
         },
      },

      values: function()
      {
         return Object.getOwnPropertyNames(Event.properties);
      },
   };

   Event.createData = function(eventKey, eventToken, eventCallback, eventContext)
   {
      InputValidator.validateNotNull("eventKey", eventKey);
      InputValidator.validateNotNull("eventToken", eventToken);
      // eventCallback optional.
      // eventContext optional.

      return Immutable.Map(
      {
         eventKey: eventKey,
         eventToken: eventToken,
         eventCallback: eventCallback,
         eventContext: eventContext,
      });
   };

   if (Object.freeze)
   {
      Object.freeze(Event);
   }

   return Event;
});

define(["process/Action", "process/TargetLock"],
   function(Action, TargetLock)
   {
      "use strict";

      function ShipDestroyedAction(environment, token, fromPosition)
      {
         InputValidator.validateNotNull("environment", environment);
         InputValidator.validateNotNull("token", token);

         this.environment = function()
         {
            return environment;
         };

         this.token = function()
         {
            return token;
         };

         this.fromPosition = function()
         {
            return fromPosition;
         };

         this.doIt = function()
         {
            LOGGER.trace("ShipDestroyedAction.doIt() start");

            var store = environment.store();
            TargetLock.removeAllTargetLocks(store, token);

            // Return the damage cards.
            if (token.tokenFore && token.tokenAft)
            {
               environment.discardAllDamage(token.tokenFore().damageKeys());
               environment.discardAllDamage(token.tokenFore().criticalDamageKeys());
               environment.discardAllDamage(token.tokenAft().damageKeys());
               environment.discardAllDamage(token.tokenAft().criticalDamageKeys());
            }
            else
            {
               environment.discardAllDamage(token.damageKeys());
               environment.discardAllDamage(token.criticalDamageKeys());
            }

            if (fromPosition)
            {
               environment.removeToken(fromPosition);
            }
            store.dispatch(Action.setUserMessage("Ship destroyed: " + token));

            LOGGER.trace("ShipDestroyedAction.doIt() end");
         };
      }

      return ShipDestroyedAction;
   });

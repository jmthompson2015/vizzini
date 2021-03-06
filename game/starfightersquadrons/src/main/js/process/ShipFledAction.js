"use strict";

define(["process/Action", "process/TargetLock"],
   function(Action, TargetLock)
   {
      function ShipFledAction(environment, token, fromPosition)
      {
         InputValidator.validateNotNull("environment", environment);
         InputValidator.validateNotNull("token", token);
         InputValidator.validateNotNull("fromPosition", fromPosition);

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
            LOGGER.trace("ShipFledAction.doIt() start");

            var tokens = [];

            if (token.tokenFore && token.tokenAft)
            {
               tokens.push(token.tokenFore());
               tokens.push(token.tokenAft());
            }
            else
            {
               tokens.push(token);
            }

            tokens.forEach(function(token)
            {
               var store = environment.store();
               TargetLock.removeAllTargetLocks(store, token);

               // Return the damage cards.
               environment.discardAllDamage(token.damageKeys());
               environment.discardAllDamage(token.criticalDamageKeys());

               environment.removeToken(token);
               store.dispatch(Action.setUserMessage("Ship fled the battlefield: " + token));
            });

            LOGGER.trace("ShipFledAction.doIt() end");
         };
      }

      return ShipFledAction;
   });

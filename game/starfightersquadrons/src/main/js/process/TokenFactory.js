define(["process/DualToken", "Pilot", "process/Token"],
   function(DualToken, Pilot, Token)
   {
      "use strict";
      var TokenFactory = {
         create: function(store, pilotKey, agent, upgradeKeysFore, upgradeKeysAft)
         {
            InputValidator.validateNotNull("store", store);
            InputValidator.validateNotNull("pilotKey", pilotKey);
            InputValidator.validateNotNull("agent", agent);
            // upgradeKeysForeIn optional.
            // upgradeKeysAftIn optional.

            var pilot = Pilot.properties[pilotKey];

            var answer;

            if (pilot.fore || pilot.aft)
            {
               answer = new DualToken(store, pilotKey, agent, upgradeKeysFore, upgradeKeysAft);
            }
            else
            {
               answer = new Token(store, pilotKey, agent, upgradeKeysFore);
            }

            return answer;
         },

         get: function(store, id)
         {
            InputValidator.validateNotNull("store", store);
            InputValidator.validateIsNumber("id", id);

            var answer;
            var tokenValues = store.getState().tokens.get(id);

            if (tokenValues)
            {
               var pilotKey = tokenValues.get("pilotKey");
               var idFore = tokenValues.get("idFore");
               var idAft = tokenValues.get("idAft");

               if (idFore !== undefined || idAft !== undefined)
               {
                  answer = DualToken.get(store, id);
               }
               else
               {
                  answer = Token.get(store, id);
               }
            }

            return answer;
         },
      };

      return TokenFactory;
   });

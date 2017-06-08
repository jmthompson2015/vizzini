define(function()
{
   "use strict";

   function Squad(factionKey, name, year, description, tokens)
   {
      InputValidator.validateNotNull("factionKey", factionKey);
      InputValidator.validateNotNull("name", name);
      InputValidator.validateIsNumber("year", year);
      InputValidator.validateNotNull("description", description);
      InputValidator.validateIsArray("tokens", tokens);

      this.factionKey = function()
      {
         return factionKey;
      };

      this.name = function()
      {
         return name;
      };

      this.year = function()
      {
         return year;
      };

      this.description = function()
      {
         return description;
      };

      this.tokens = function()
      {
         return tokens;
      };
   }

   Squad.prototype.pilotSkillValue = function()
   {
      var tokens = this.tokens();

      var answer = tokens.reduce(function(accumulator, token)
      {
         var myAnswer = accumulator;

         if (token.tokenFore !== undefined && token.tokenAft !== undefined)
         {
            myAnswer += token.tokenFore().pilotSkillValue();
            myAnswer += token.tokenAft().pilotSkillValue();
         }
         else
         {
            myAnswer += token.pilotSkillValue();
         }

         return myAnswer;
      }, 0);

      return answer;
   };

   Squad.prototype.primaryWeaponValue = function()
   {
      var tokens = this.tokens();

      var answer = tokens.reduce(function(accumulator, token)
      {
         var myAnswer = accumulator;

         if (token.tokenFore !== undefined && token.tokenAft !== undefined)
         {
            myAnswer += token.tokenFore().primaryWeaponValue();
            myAnswer += token.tokenAft().primaryWeaponValue();
         }
         else
         {
            myAnswer += token.primaryWeaponValue();
         }

         return myAnswer;
      }, 0);

      return answer;
   };

   Squad.prototype.energyValue = function()
   {
      var tokens = this.tokens();

      var answer = tokens.reduce(function(accumulator, token)
      {
         var myAnswer = accumulator;

         if (token.tokenFore !== undefined && token.tokenAft !== undefined)
         {
            myAnswer += token.tokenFore().energyValue();
            myAnswer += token.tokenAft().energyValue();
         }
         else
         {
            myAnswer += token.energyValue();
         }

         return myAnswer;
      }, 0);

      return answer;
   };

   Squad.prototype.agilityValue = function()
   {
      var tokens = this.tokens();

      var answer = tokens.reduce(function(accumulator, token)
      {
         var myAnswer = accumulator;

         if (token.tokenFore !== undefined && token.tokenAft !== undefined)
         {
            myAnswer += token.tokenFore().agilityValue();
            myAnswer += token.tokenAft().agilityValue();
         }
         else
         {
            myAnswer += token.agilityValue();
         }

         return myAnswer;
      }, 0);

      return answer;
   };

   Squad.prototype.hullValue = function()
   {
      var tokens = this.tokens();

      var answer = tokens.reduce(function(accumulator, token)
      {
         var myAnswer = accumulator;

         if (token.tokenFore !== undefined && token.tokenAft !== undefined)
         {
            myAnswer += token.tokenFore().hullValue();
            myAnswer += token.tokenAft().hullValue();
         }
         else
         {
            myAnswer += token.hullValue();
         }

         return myAnswer;
      }, 0);

      return answer;
   };

   Squad.prototype.shieldValue = function()
   {
      var tokens = this.tokens();

      var answer = tokens.reduce(function(accumulator, token)
      {
         var myAnswer = accumulator;

         if (token.tokenFore !== undefined && token.tokenAft !== undefined)
         {
            myAnswer += token.tokenFore().shieldValue();
            myAnswer += token.tokenAft().shieldValue();
         }
         else
         {
            myAnswer += token.shieldValue();
         }

         return myAnswer;
      }, 0);

      return answer;
   };

   Squad.prototype.squadPointCost = function()
   {
      var tokens = this.tokens();

      var answer = tokens.reduce(function(accumulator, token)
      {
         var myAnswer = accumulator;

         if (token.tokenFore !== undefined && token.tokenAft !== undefined)
         {
            myAnswer += token.tokenFore().squadPointCost();
            myAnswer += token.tokenAft().squadPointCost();
         }
         else
         {
            myAnswer += token.squadPointCost();
         }

         return myAnswer;
      }, 0);

      return answer;
   };

   Squad.prototype.upgradeCount = function()
   {
      var tokens = this.tokens();

      var answer = tokens.reduce(function(accumulator, token)
      {
         var myAnswer = accumulator;

         if (token.tokenFore !== undefined && token.tokenAft !== undefined)
         {
            myAnswer += token.tokenFore().upgradeKeys().length;
            myAnswer += token.tokenAft().upgradeKeys().length;
         }
         else
         {
            myAnswer += token.upgradeKeys().length;
         }

         return myAnswer;
      }, 0);

      return answer;
   };

   return Squad;
});

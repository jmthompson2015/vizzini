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

   Squad.prototype.squadPointCost = function()
   {
      var tokens = this.tokens();

      var answer = tokens.reduce(function(accumulator, token)
      {
         return accumulator + token.squadPointCost();
      }, 0);

      return answer;
   };

   return Squad;
});

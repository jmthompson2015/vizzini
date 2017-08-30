define(["Count", "Value"], function(Count, Value)
{
   "use strict";
   var Selector = {};

   Selector.activeToken = function(state)
   {
      InputValidator.validateNotNull("state", state);

      var answer;

      if (state.activeTokenId !== undefined && state.activeTokenId !== null)
      {
         answer = Selector.token(state, state.activeTokenId);
      }

      return answer;
   };

   Selector.adjudicator = function(state)
   {
      return state.adjudicator;
   };

   Selector.agilityValue = function(state, tokenId)
   {
      return Selector.value(state, tokenId, Value.AGILITY);
   };

   Selector.cloakCount = function(state, tokenId)
   {
      return Selector.count(state, tokenId, Count.CLOAK);
   };

   Selector.combatAction = function(state, token)
   {
      InputValidator.validateNotNull("state", state);
      InputValidator.validateNotNull("token", token);

      return state.tokenIdToCombatAction[token.id()];
   };

   Selector.count = function(state, tokenId, property)
   {
      InputValidator.validateNotNull("state", state);
      InputValidator.validateIsNumber("tokenId", tokenId);
      InputValidator.validateNotNull("property", property);

      var answer;
      var counts = state.tokenIdToCounts[tokenId];

      if (counts)
      {
         answer = counts[property];
      }

      return answer;
   };

   Selector.criticalDamages = function(state, tokenId)
   {
      InputValidator.validateNotNull("state", state);
      InputValidator.validateIsNumber("tokenId", tokenId);

      var answer = state.tokenIdToCriticalDamages[tokenId];

      return (answer ? answer.slice() : []);
   };

   Selector.damageDealer = function(state, attacker)
   {
      InputValidator.validateNotNull("state", state);
      InputValidator.validateNotNull("attacker", attacker);

      return state.tokenIdToDamageDealer[attacker.id()];
   };

   Selector.damages = function(state, tokenId)
   {
      InputValidator.validateNotNull("state", state);
      InputValidator.validateIsNumber("tokenId", tokenId);

      var answer = state.tokenIdToDamages[tokenId];

      return (answer ? answer.slice() : []);
   };

   Selector.energyCount = function(state, tokenId)
   {
      return Selector.count(state, tokenId, Count.ENERGY);
   };

   Selector.energyValue = function(state, tokenId)
   {
      return Selector.value(state, tokenId, Value.ENERGY);
   };

   Selector.environment = function(state)
   {
      return state.environment;
   };

   Selector.evadeCount = function(state, tokenId)
   {
      return Selector.count(state, tokenId, Count.EVADE);
   };

   Selector.focusCount = function(state, tokenId)
   {
      return Selector.count(state, tokenId, Count.FOCUS);
   };

   Selector.hullValue = function(state, tokenId)
   {
      return Selector.value(state, tokenId, Value.HULL);
   };

   Selector.ionCount = function(state, tokenId)
   {
      return Selector.count(state, tokenId, Count.ION);
   };

   Selector.isAbilityUsed = function(state, token, source, sourceKey)
   {
      InputValidator.validateNotNull("state", state);
      InputValidator.validateNotNull("token", token);
      InputValidator.validateNotNull("source", source);
      InputValidator.validateNotNull("sourceKey", sourceKey);

      var usedAbilities = state.tokenIdToUsedAbilities[token.id()];
      var answer = false;

      for (var i = 0; !answer && i < usedAbilities.length; i++)
      {
         var ability = usedAbilities[i];
         answer = (ability.source() === source && ability.sourceKey() === sourceKey);
      }

      return answer;
   };

   Selector.isDefenderHit = function(state, token)
   {
      InputValidator.validateNotNull("state", state);
      InputValidator.validateNotNull("token", token);

      return state.tokenIdToIsDefenderHit[token.id()];
   };

   Selector.isInFiringArc = function(state, token)
   {
      InputValidator.validateNotNull("state", state);
      InputValidator.validateNotNull("token", token);

      return state.tokenIdToIsInFiringArc[token.id()];
   };

   Selector.isPerRoundAbilityUsed = function(state, token, source, sourceKey)
   {
      InputValidator.validateNotNull("state", state);
      InputValidator.validateNotNull("token", token);
      InputValidator.validateNotNull("source", source);
      InputValidator.validateNotNull("sourceKey", sourceKey);

      var usedAbilities = state.tokenIdToUsedPerRoundAbilities[token.id()];
      var answer = false;

      for (var i = 0; !answer && i < usedAbilities.length; i++)
      {
         var ability = usedAbilities[i];
         answer = (ability.source() === source && ability.sourceKey() === sourceKey);
      }

      return answer;
   };

   Selector.isTouching = function(state, token)
   {
      InputValidator.validateNotNull("state", state);
      InputValidator.validateNotNull("token", token);

      return state.tokenIdToIsTouching[token.id()];
   };

   Selector.maneuver = function(state, token)
   {
      InputValidator.validateNotNull("state", state);
      InputValidator.validateNotNull("token", token);

      return state.tokenIdToManeuver[token.id()];
   };

   Selector.pilotSkillValue = function(state, tokenId)
   {
      return Selector.value(state, tokenId, Value.PILOT_SKILL);
   };

   Selector.position = function(state, tokenId)
   {
      InputValidator.validateNotNull("state", state);
      InputValidator.validateIsNumber("tokenId", tokenId);

      return state.tokenIdToPosition[tokenId];
   };

   Selector.primaryWeaponValue = function(state, tokenId)
   {
      return Selector.value(state, tokenId, Value.PRIMARY_WEAPON);
   };

   Selector.rangeKey = function(state, attacker)
   {
      InputValidator.validateNotNull("state", state);
      InputValidator.validateNotNull("attacker", attacker);

      return state.tokenIdToRange[attacker.id()];
   };

   Selector.reinforceCount = function(state, tokenId)
   {
      return Selector.count(state, tokenId, Count.REINFORCE);
   };

   Selector.shieldCount = function(state, tokenId)
   {
      return Selector.count(state, tokenId, Count.SHIELD);
   };

   Selector.shieldValue = function(state, tokenId)
   {
      return Selector.value(state, tokenId, Value.SHIELD);
   };

   Selector.stressCount = function(state, tokenId)
   {
      return Selector.count(state, tokenId, Count.STRESS);
   };

   Selector.token = function(state, tokenId)
   {
      InputValidator.validateNotNull("state", state);
      InputValidator.validateIsNumber("tokenId", tokenId);

      var tokens = state.tokens;
      var answer = tokens[tokenId];

      if (answer === undefined)
      {
         var keys = Object.keys(tokens);

         for (var i = 0; i < keys.length; i++)
         {
            var token = tokens[keys[i]];

            if (token.tokenFore && token.tokenFore().id() === tokenId)
            {
               answer = token.tokenFore();
               break;
            }
            else if (token.tokenAft && token.tokenAft().id() === tokenId)
            {
               answer = token.tokenAft();
               break;
            }
         }
      }

      return answer;
   };

   Selector.tokenAt = function(state, position)
   {
      InputValidator.validateNotNull("state", state);
      InputValidator.validateNotNull("position", position);

      var answer;
      var tokenId = state.positionToTokenId[position];

      if (tokenId !== undefined)
      {
         answer = Selector.token(state, tokenId);
      }

      return answer;
   };

   Selector.tractorBeamCount = function(state, tokenId)
   {
      return Selector.count(state, tokenId, Count.TRACTOR_BEAM);
   };

   Selector.upgrades = function(state, tokenId)
   {
      InputValidator.validateNotNull("state", state);
      InputValidator.validateIsNumber("tokenId", tokenId);

      var answer = state.tokenIdToUpgrades[tokenId];

      return (answer ? answer.slice() : []);
   };

   Selector.usedAbilities = function(state, token, source, sourceKey)
   {
      InputValidator.validateNotNull("state", state);
      InputValidator.validateNotNull("token", token);
      // source optional.
      // sourceKey optional.

      var answer = state.tokenIdToUsedAbilities[token.id()];

      if (source)
      {
         var usedAbilities = answer;
         answer = [];

         for (var i = 0; i < usedAbilities.length; i++)
         {
            var ability = usedAbilities[i];

            if (ability.source() === source && (sourceKey === undefined || ability.sourceKey() === sourceKey))
            {
               answer.push(ability);
            }
         }
      }

      return (answer !== undefined ? answer : []);
   };

   Selector.usedAbilityKeys = function(state, token, source, sourceKey)
   {
      InputValidator.validateNotNull("state", state);
      InputValidator.validateNotNull("token", token);
      // source optional.
      // sourceKey optional.

      var answer = [];
      var usedAbilities = state.tokenIdToUsedAbilities[token.id()];

      for (var i = 0; i < usedAbilities.length; i++)
      {
         var ability = usedAbilities[i];

         if ((source === undefined || ability.source() === source) && (sourceKey === undefined || ability.sourceKey() === sourceKey))
         {
            answer.push(ability.sourceKey());
         }
      }

      return answer;
   };

   Selector.usedPerRoundAbilities = function(state, token, source, sourceKey)
   {
      InputValidator.validateNotNull("state", state);
      InputValidator.validateNotNull("token", token);
      // source optional.
      // sourceKey optional.

      var answer = state.tokenIdToUsedPerRoundAbilities[token.id()];

      if (source)
      {
         var usedAbilities = answer;
         answer = [];

         for (var i = 0; i < usedAbilities.length; i++)
         {
            var ability = usedAbilities[i];

            if (ability.source() === source && (sourceKey === undefined || ability.sourceKey() === sourceKey))
            {
               answer.push(ability);
            }
         }
      }

      return (answer !== undefined ? answer : []);
   };

   Selector.usedPerRoundAbilityKeys = function(state, token, source, sourceKey)
   {
      InputValidator.validateNotNull("state", state);
      InputValidator.validateNotNull("token", token);
      // source optional.
      // sourceKey optional.

      var answer = [];
      var usedAbilities = state.tokenIdToUsedPerRoundAbilities[token.id()];

      for (var i = 0; i < usedAbilities.length; i++)
      {
         var ability = usedAbilities[i];

         if ((source === undefined || ability.source() === source) && (sourceKey === undefined || ability.sourceKey() === sourceKey))
         {
            answer.push(ability.sourceKey());
         }
      }

      return answer;
   };

   Selector.value = function(state, tokenId, property)
   {
      InputValidator.validateNotNull("state", state);
      InputValidator.validateIsNumber("tokenId", tokenId);
      InputValidator.validateNotNull("property", property);

      var answer;
      var values = state.tokenIdToValues[tokenId];

      if (values)
      {
         answer = values[property];
      }

      return answer;
   };

   Selector.weaponsDisabledCount = function(state, tokenId)
   {
      return Selector.count(state, tokenId, Count.WEAPONS_DISABLED);
   };

   if (Object.freeze)
   {
      Object.freeze(Selector);
   }

   return Selector;
});

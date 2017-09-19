define(["Count"], function(Count)
{
   var TokenAction = {};

   TokenAction.ADD_COUNT = "addCount";
   TokenAction.ADD_SECONDARY_WEAPON = "addSecondaryWeapon";
   TokenAction.ADD_TOKEN_CRITICAL_DAMAGE = "addTokenCriticalDamage";
   TokenAction.ADD_TOKEN_DAMAGE = "addTokenDamage";
   TokenAction.ADD_TOKEN_UPGRADE = "addTokenUpgrade";
   TokenAction.ADD_TOKEN_UPGRADE_ENERGY = "addTokenUpgradeEnergy";
   TokenAction.ADD_TOKEN_USED_ABILITY = "addTokenUsedAbility";
   TokenAction.ADD_TOKEN_USED_PER_ROUND_ABILITY = "addTokenUsedPerRoundAbility";
   TokenAction.CLEAR_TOKEN_USED_ABILITIES = "clearTokenUsedAbilities";
   TokenAction.CLEAR_TOKEN_USED_PER_ROUND_ABILITIES = "clearTokenUsedPerRoundAbilities";
   TokenAction.INCREMENT_NEXT_TOKEN_ID = "incrementNextTokenId";
   TokenAction.REMOVE_SECONDARY_WEAPON = "removeSecondaryWeapon";
   TokenAction.REMOVE_TOKEN_CRITICAL_DAMAGE = "removeTokenCriticalDamage";
   TokenAction.REMOVE_TOKEN_DAMAGE = "removeTokenDamage";
   TokenAction.REMOVE_TOKEN_UPGRADE = "removeTokenUpgrade";
   TokenAction.REMOVE_TOKEN_USED_ABILITY = "removeTokenUsedAbility";
   TokenAction.REMOVE_TOKEN_USED_PER_ROUND_ABILITY = "removeTokenUsedPerRoundAbility";
   TokenAction.SET_COUNT = "setCount";
   TokenAction.SET_PRIMARY_WEAPON = "setPrimaryWeapon";
   TokenAction.SET_TOKEN = "setToken";
   TokenAction.SET_TOKEN_UPGRADE_ENERGY = "setTokenUpgradeEnergy";

   TokenAction.addCloakCount = function(token, value)
   {
      return TokenAction.addCount(token, Count.CLOAK, value);
   };

   TokenAction.addCount = function(token, property, value)
   {
      InputValidator.validateNotNull("token", token);
      InputValidator.validateNotNull("property", property);

      var myValue = (value !== undefined ? value : 1);

      return (
      {
         type: TokenAction.ADD_COUNT,
         token: token,
         property: property,
         value: myValue,
      });
   };

   TokenAction.addEnergyCount = function(token, value)
   {
      return TokenAction.addCount(token, Count.ENERGY, value);
   };

   TokenAction.addEvadeCount = function(token, value)
   {
      return TokenAction.addCount(token, Count.EVADE, value);
   };

   TokenAction.addFocusCount = function(token, value)
   {
      return TokenAction.addCount(token, Count.FOCUS, value);
   };

   TokenAction.addIonCount = function(token, value)
   {
      return TokenAction.addCount(token, Count.ION, value);
   };

   TokenAction.addReinforceCount = function(token, value)
   {
      return TokenAction.addCount(token, Count.REINFORCE, value);
   };

   TokenAction.addSecondaryWeapon = function(token, weapon)
   {
      InputValidator.validateNotNull("token", token);
      InputValidator.validateNotNull("weapon", weapon);

      return (
      {
         type: TokenAction.ADD_SECONDARY_WEAPON,
         token: token,
         weapon: weapon,
      });
   };

   TokenAction.addShieldCount = function(token, value)
   {
      return TokenAction.addCount(token, Count.SHIELD, value);
   };

   TokenAction.addStressCount = function(token, value)
   {
      return TokenAction.addCount(token, Count.STRESS, value);
   };

   TokenAction.addTokenCriticalDamage = function(token, damageKey)
   {
      InputValidator.validateNotNull("token", token);
      InputValidator.validateNotNull("damageKey", damageKey);

      return (
      {
         type: TokenAction.ADD_TOKEN_CRITICAL_DAMAGE,
         token: token,
         damageKey: damageKey,
      });
   };

   TokenAction.addTokenDamage = function(token, damageKey)
   {
      InputValidator.validateNotNull("token", token);
      InputValidator.validateNotNull("damageKey", damageKey);

      return (
      {
         type: TokenAction.ADD_TOKEN_DAMAGE,
         token: token,
         damageKey: damageKey,
      });
   };

   TokenAction.addTokenUpgrade = function(token, upgradeKey)
   {
      InputValidator.validateNotNull("token", token);
      InputValidator.validateNotNull("upgradeKey", upgradeKey);

      return (
      {
         type: TokenAction.ADD_TOKEN_UPGRADE,
         token: token,
         upgradeKey: upgradeKey,
      });
   };

   TokenAction.addTokenUpgradeEnergy = function(token, upgradeKey, value)
   {
      InputValidator.validateNotNull("token", token);
      InputValidator.validateNotNull("upgradeKey", upgradeKey);
      var myValue = (value !== undefined ? value : 1);

      return (
      {
         type: TokenAction.ADD_TOKEN_UPGRADE_ENERGY,
         token: token,
         upgradeKey: upgradeKey,
         value: myValue,
      });
   };

   TokenAction.addTokenUsedAbility = function(token, ability)
   {
      InputValidator.validateNotNull("token", token);
      InputValidator.validateNotNull("ability", ability);

      return (
      {
         type: TokenAction.ADD_TOKEN_USED_ABILITY,
         token: token,
         ability: ability,
      });
   };

   TokenAction.addTokenUsedPerRoundAbility = function(token, ability)
   {
      InputValidator.validateNotNull("token", token);
      InputValidator.validateNotNull("ability", ability);

      return (
      {
         type: TokenAction.ADD_TOKEN_USED_PER_ROUND_ABILITY,
         token: token,
         ability: ability,
      });
   };

   TokenAction.addTractorBeamCount = function(token, value)
   {
      return TokenAction.addCount(token, Count.TRACTOR_BEAM, value);
   };

   TokenAction.addWeaponsDisabledCount = function(token, value)
   {
      return TokenAction.addCount(token, Count.WEAPONS_DISABLED, value);
   };

   TokenAction.clearTokenUsedAbilities = function(token)
   {
      InputValidator.validateNotNull("token", token);

      return (
      {
         type: TokenAction.CLEAR_TOKEN_USED_ABILITIES,
         token: token,
      });
   };

   TokenAction.clearTokenUsedPerRoundAbilities = function(token)
   {
      InputValidator.validateNotNull("token", token);

      return (
      {
         type: TokenAction.CLEAR_TOKEN_USED_PER_ROUND_ABILITIES,
         token: token,
      });
   };

   TokenAction.incrementNextTokenId = function()
   {
      return (
      {
         type: TokenAction.INCREMENT_NEXT_TOKEN_ID,
      });
   };

   TokenAction.removeSecondaryWeapon = function(token, weapon)
   {
      InputValidator.validateNotNull("token", token);
      InputValidator.validateNotNull("weapon", weapon);

      return (
      {
         type: TokenAction.REMOVE_SECONDARY_WEAPON,
         token: token,
         weapon: weapon,
      });
   };

   TokenAction.removeTokenCriticalDamage = function(token, damageKey)
   {
      InputValidator.validateNotNull("token", token);
      InputValidator.validateNotNull("damageKey", damageKey);

      return (
      {
         type: TokenAction.REMOVE_TOKEN_CRITICAL_DAMAGE,
         token: token,
         damageKey: damageKey,
      });
   };

   TokenAction.removeTokenDamage = function(token, damageKey)
   {
      InputValidator.validateNotNull("token", token);
      InputValidator.validateNotNull("damageKey", damageKey);

      return (
      {
         type: TokenAction.REMOVE_TOKEN_DAMAGE,
         token: token,
         damageKey: damageKey,
      });
   };

   TokenAction.removeTokenUpgrade = function(token, upgradeKey)
   {
      InputValidator.validateNotNull("token", token);
      InputValidator.validateNotNull("upgradeKey", upgradeKey);

      return (
      {
         type: TokenAction.REMOVE_TOKEN_UPGRADE,
         token: token,
         upgradeKey: upgradeKey,
      });
   };

   TokenAction.removeTokenUsedAbility = function(token, ability)
   {
      InputValidator.validateNotNull("token", token);
      InputValidator.validateNotNull("ability", ability);

      return (
      {
         type: TokenAction.REMOVE_TOKEN_USED_ABILITY,
         token: token,
         ability: ability,
      });
   };

   TokenAction.removeTokenUsedPerRoundAbility = function(token, ability)
   {
      InputValidator.validateNotNull("token", token);
      InputValidator.validateNotNull("ability", ability);

      return (
      {
         type: TokenAction.REMOVE_TOKEN_USED_PER_ROUND_ABILITY,
         token: token,
         ability: ability,
      });
   };

   TokenAction.setCloakCount = function(token, value)
   {
      return TokenAction.setCount(token, Count.CLOAK, value);
   };

   TokenAction.setCount = function(token, property, value)
   {
      InputValidator.validateNotNull("token", token);
      InputValidator.validateNotNull("property", property);
      var myValue = (value ? value : 0);

      return (
      {
         type: TokenAction.SET_COUNT,
         token: token,
         property: property,
         value: myValue,
      });
   };

   TokenAction.setEnergyCount = function(token, value)
   {
      return TokenAction.setCount(token, Count.ENERGY, value);
   };

   TokenAction.setEvadeCount = function(token, value)
   {
      return TokenAction.setCount(token, Count.EVADE, value);
   };

   TokenAction.setFocusCount = function(token, value)
   {
      return TokenAction.setCount(token, Count.FOCUS, value);
   };

   TokenAction.setIonCount = function(token, value)
   {
      return TokenAction.setCount(token, Count.ION, value);
   };

   TokenAction.setPrimaryWeapon = function(token, weapon)
   {
      InputValidator.validateNotNull("token", token);
      InputValidator.validateNotNull("weapon", weapon);

      return (
      {
         type: TokenAction.SET_PRIMARY_WEAPON,
         token: token,
         weapon: weapon,
      });
   };

   TokenAction.setReinforceCount = function(token, value)
   {
      return TokenAction.setCount(token, Count.REINFORCE, value);
   };

   TokenAction.setShieldCount = function(token, value)
   {
      return TokenAction.setCount(token, Count.SHIELD, value);
   };

   TokenAction.setStressCount = function(token, value)
   {
      return TokenAction.setCount(token, Count.STRESS, value);
   };

   TokenAction.setToken = function(id, pilotKey, agent, idFore, idAft)
   {
      InputValidator.validateIsNumber("id", id);
      InputValidator.validateNotNull("pilotKey", pilotKey);
      InputValidator.validateNotNull("agent", agent);
      // idFore optional.
      // idAft optional.

      var payload = Immutable.Map(
      {
         id: id,
         pilotKey: pilotKey,
         agent: agent,
         idFore: idFore,
         idAft: idAft,
      });

      return (
      {
         type: TokenAction.SET_TOKEN,
         payload: payload,
      });
   };

   TokenAction.setTokenUpgradeEnergy = function(token, upgradeKey, value)
   {
      InputValidator.validateNotNull("token", token);
      InputValidator.validateNotNull("upgradeKey", upgradeKey);
      var myValue = (value !== undefined ? value : 0);

      return (
      {
         type: TokenAction.SET_TOKEN_UPGRADE_ENERGY,
         token: token,
         upgradeKey: upgradeKey,
         value: myValue,
      });
   };

   TokenAction.setTractorBeamCount = function(token, value)
   {
      return TokenAction.setCount(token, Count.TRACTOR_BEAM, value);
   };

   TokenAction.setWeaponsDisabledCount = function(token, value)
   {
      return TokenAction.setCount(token, Count.WEAPONS_DISABLED, value);
   };

   return TokenAction;
});

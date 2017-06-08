define(["process/SimpleAgent"],
   function(SimpleAgent)
   {
      "use strict";
      var SquadData = {};

      SquadData.computeRatioPrimaryWeaponAgility = function(squad)
      {
         InputValidator.validateNotNull("squad", squad);

         var primaryWeapon = squad.primaryWeaponValue();
         var agility = squad.agilityValue();

         return (agility !== 0 ? Math.vizziniRound(primaryWeapon / agility, 2) : "");
      };

      SquadData.computeRatioSumStatsSquadPointCost = function(squad)
      {
         InputValidator.validateNotNull("squad", squad);

         var sumStats = SquadData.computeSumStats(squad);
         var squadPointCost = squad.squadPointCost();

         return (squadPointCost !== 0 ? Math.vizziniRound(sumStats / squadPointCost, 4) : "");
      };

      SquadData.computeSumStats = function(squad)
      {
         InputValidator.validateNotNull("squad", squad);

         var answer = squad.pilotSkillValue();
         answer += squad.primaryWeaponValue();
         answer += squad.energyValue();
         answer += squad.agilityValue();
         answer += squad.hullValue();
         answer += squad.shieldValue();

         return answer;
      };

      SquadData.createSquadData = function(squadBuilder)
      {
         InputValidator.validateNotNull("squadBuilder", squadBuilder);

         var factionKey = squadBuilder.faction();
         var agent = new SimpleAgent("Agent1", factionKey);
         var squad = squadBuilder.buildSquad(agent);
         var sumStats = SquadData.computeSumStats(squad);
         var ratioPrimaryWeaponAgility = SquadData.computeRatioPrimaryWeaponAgility(squad);
         var hullPlusShield = squad.hullValue() + squad.shieldValue();
         var ratioSumStatsSquadPointCost = SquadData.computeRatioSumStatsSquadPointCost(squad);

         return (
         {
            factionKey: squad.factionKey(),
            year: squad.year(),
            name: squad.name(),
            description: squad.description(),
            shipCount: squad.tokens().length,
            upgradeCount: squad.upgradeCount(),
            pilotSkill: squad.pilotSkillValue(),
            primaryWeapon: squad.primaryWeaponValue(),
            energy: squad.energyValue(),
            agility: squad.agilityValue(),
            hull: squad.hullValue(),
            shield: squad.shieldValue(),
            squadPointCost: squad.squadPointCost(),
            sumStats: sumStats,
            ratioPrimaryWeaponAgility: ratioPrimaryWeaponAgility,
            hullPlusShield: hullPlusShield,
            ratioSumStatsSquadPointCost: ratioSumStatsSquadPointCost,
         });
      };

      return SquadData;
   });

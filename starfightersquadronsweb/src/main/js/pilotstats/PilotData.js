define(["Pilot"], function(Pilot)
{
    "use strict";
    var PilotData = {};

    PilotData.computeHullPlusShield = function(ship)
    {
        InputValidator.validateNotNull("ship", ship);

        var answer = (ship.hullValue !== undefined ? ship.hullValue : 0);
        answer += (ship.shieldValue !== undefined ? ship.shieldValue : 0);

        return answer;
    };

    PilotData.computeRatioPrimaryWeaponAgility = function(ship)
    {
        InputValidator.validateNotNull("ship", ship);

        var primaryWeapon = (ship.primaryWeaponValue !== undefined ? ship.primaryWeaponValue : 0);
        var agility = (ship.agilityValue !== undefined ? ship.agilityValue : 0);

        return (agility !== 0 ? Math.vizziniRound(primaryWeapon / agility, 2) : "");
    };

    PilotData.computeRatioSumStatsSquadPointCost = function(pilot, ship)
    {
        InputValidator.validateNotNull("pilot", pilot);
        InputValidator.validateNotNull("ship", ship);

        var sumStats = PilotData.computeSumStats(pilot, ship);
        var squadPointCost = (pilot.squadPointCost !== undefined ? pilot.squadPointCost : 0);

        return (squadPointCost !== 0 ? Math.vizziniRound(sumStats / squadPointCost, 4) : "");
    };

    PilotData.computeSumStats = function(pilot, ship)
    {
        InputValidator.validateNotNull("pilot", pilot);
        InputValidator.validateNotNull("ship", ship);

        var answer = (pilot.pilotSkillValue !== undefined ? pilot.pilotSkillValue : 0);
        answer += (ship.primaryWeaponValue !== undefined ? ship.primaryWeaponValue : 0);
        answer += (ship.energyValue !== undefined ? ship.energyValue : 0);
        answer += (ship.agilityValue !== undefined ? ship.agilityValue : 0);
        answer += (ship.hullValue !== undefined ? ship.hullValue : 0);
        answer += (ship.shieldValue !== undefined ? ship.shieldValue : 0);

        return answer;
    };

    PilotData.createPilotData = function(pilot)
    {
        InputValidator.validateNotNull("pilot", pilot);

        var ship = PilotData.determineShip(pilot);
        var isImplemented = (pilot.isImplemented !== undefined ? pilot.isImplemented : false);
        var sumStats = PilotData.computeSumStats(pilot, ship);
        var ratioPrimaryWeaponAgility = PilotData.computeRatioPrimaryWeaponAgility(ship);
        var hullPlusShield = PilotData.computeHullPlusShield(ship);
        var ratioSumStatsSquadPointCost = PilotData.computeRatioSumStatsSquadPointCost(pilot, ship);

        return (
        {
            faction: pilot.shipTeam.team.name,
            factionKey: pilot.shipTeam.teamKey,
            pilotName: pilot.name,
            shipName: ship.name,
            shipKey: pilot.shipTeam.shipKey,
            shipWikiUrl: ship.wikiUrl,
            description: pilot.description,
            isFlavorText: pilot.isFlavorText,
            isImplemented: isImplemented,
            pilotSkill: pilot.pilotSkillValue,
            primaryWeapon: ship.primaryWeaponValue,
            energy: ship.energyValue,
            agility: ship.agilityValue,
            hull: ship.hullValue,
            shield: ship.shieldValue,
            squadPointCost: pilot.squadPointCost,
            sumStats: sumStats,
            ratioPrimaryWeaponAgility: ratioPrimaryWeaponAgility,
            hullPlusShield: hullPlusShield,
            ratioSumStatsSquadPointCost: ratioSumStatsSquadPointCost,
        });
    };

    PilotData.determineShip = function(pilot)
    {
        InputValidator.validateNotNull("pilot", pilot);

        var ship = pilot.shipTeam.ship;

        if (pilot.parent)
        {
            if (pilot.name.endsWith("(fore)"))
            {
                ship = ship.fore;
            }
            else if (pilot.name.endsWith("(aft)"))
            {
                ship = ship.aft;
            }
        }
        else if (ship.fore)
        {
            ship = ship.fore;
        }

        return ship;
    };

    return PilotData;
});

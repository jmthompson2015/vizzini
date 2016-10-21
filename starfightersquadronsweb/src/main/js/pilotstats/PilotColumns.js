define(function()
{
    "use strict";
    var PilotColumns = [
        {
            key: "factionKey",
            label: "Faction",
       },
        {
            key: "pilotName",
            label: "Pilot",
            className: "textCell",
       },
        {
            key: "shipKey",
            label: "Ship",
            className: "textCell",
       },
        {
            key: "description",
            label: "Description",
            className: "textCell",
       },
        {
            key: "isImplemented",
            label: "Implemented",
       },
        {
            key: "pilotSkill",
            label: "Pilot Skill",
            className: "numberCell",
       },
        {
            key: "primaryWeapon",
            label: "Primary Weapon",
            className: "numberCell",
       },
        {
            key: "energy",
            label: "Energy",
            className: "numberCell",
       },
        {
            key: "agility",
            label: "Agility",
            className: "numberCell",
       },
        {
            key: "hull",
            label: "Hull",
            className: "numberCell",
       },
        {
            key: "shield",
            label: "Shield",
            className: "numberCell",
       },
        {
            key: "squadPointCost",
            label: "Squad Point Cost",
            className: "numberCell",
       },
        {
            key: "sumStats",
            label: "Sum Stats",
            className: "numberCell",
       },
        {
            key: "ratioPrimaryWeaponAgility",
            label: "Primary Weapon / Agility",
            className: "numberCell",
       },
        {
            key: "hullPlusShield",
            label: "Hull + Shield",
            className: "numberCell",
       },
        {
            key: "ratioSumStatsSquadPointCost",
            label: "Sum Stats / Squad Point Cost",
            className: "numberCell",
       },
     ];

    return PilotColumns;
});

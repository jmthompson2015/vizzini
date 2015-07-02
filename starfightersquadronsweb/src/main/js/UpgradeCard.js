var UpgradeRestriction =
{
    FIRESPRAY_31_ONLY: "firespray31Only",
    HUGE_SHIP_ONLY: "hugeShipOnly",
    HWK_290_ONLY: "hwk290Only",
    IMPERIAL_ONLY: "imperialOnly",
    LAMBDA_CLASS_SHUTTLE_ONLY: "lambdaClassShuttleOnly",
    LIMITED: "limited",
    REBEL_ONLY: "rebelOnly",
    TIE_INTERCEPTOR_ONLY: "tieInterceptorOnly",
    TIE_PHANTOM_ONLY: "tiePhantomOnly",
    VT_49_DECIMATOR_ONLY: "vt49DecimatorOnly",
    YT_1300_ONLY: "yt1300Only",
    YT_2400_ONLY: "yt2400Only",
    properties:
    {
        "firespray31Only":
        {
            displayName: "Firespray-31 only.",
            passes: function(pilot)
            {
                var ship = Pilot.properties[pilot].ship;
                return ship === Ship.FIRESPRAY_31;
            }
        },
        "hugeShipOnly":
        {
            displayName: "Huge ship only.",
            passes: function(pilot)
            {
                var ship = Pilot.properties[pilot].ship;
                var shipBase = Ship.properties[ship].shipBase;
                return shipBase === ShipBase.HUGE1
                        || shipBase === ShipBase.HUGE2;
            }
        },
        "hwk290Only":
        {
            displayName: "HWK-290 only.",
            passes: function(pilot)
            {
                var ship = Pilot.properties[pilot].ship;
                return ship === Ship.HWK_290;
            }
        },
        "imperialOnly":
        {
            displayName: "Imperial only.",
            passes: function(pilot)
            {
                var ship = Pilot.properties[pilot].ship;
                return Ship.properties[ship].team === Team.IMPERIAL;
            }
        },
        "lambdaClassShuttleOnly":
        {
            displayName: "Lambda-class Shuttle only.",
            passes: function(pilot)
            {
                var ship = Pilot.properties[pilot].ship;
                return ship === Ship.LAMBDA_CLASS_SHUTTLE;
            }
        },
        "rebelOnly":
        {
            displayName: "Rebel only.",
            passes: function(pilot)
            {
                var ship = Pilot.properties[pilot].ship;
                return Ship.properties[ship].team === Team.REBEL;
            }
        },
        "tieInterceptorOnly":
        {
            displayName: "TIE Interceptor only.",
            passes: function(pilot)
            {
                var ship = Pilot.properties[pilot].ship;
                return ship === Ship.TIE_INTERCEPTOR;
            }
        },
        "tiePhantomOnly":
        {
            displayName: "TIE Phantom only.",
            passes: function(pilot)
            {
                var ship = Pilot.properties[pilot].ship;
                return ship === Ship.TIE_PHANTOM;
            }
        },
        "vt49DecimatorOnly":
        {
            displayName: "VT-49 Decimator only.",
            passes: function(pilot)
            {
                var ship = Pilot.properties[pilot].ship;
                return ship === Ship.VT_49_DECIMATOR;
            }
        },
        "yt1300Only":
        {
            displayName: "YT-1300 only.",
            passes: function(pilot)
            {
                var ship = Pilot.properties[pilot].ship;
                return ship === Ship.YT_1300;
            }
        },
        "yt2400Only":
        {
            displayName: "YT-2400 only.",
            passes: function(pilot)
            {
                var ship = Pilot.properties[pilot].ship;
                return ship === Ship.YT_2400;
            }
        },
    },

    passes: function(restrictions, pilot)
    {
        var answer = true;

        for (var i = 0; i < restrictions.length; i++)
        {
            var restriction = restrictions[i];

            if (!UpgradeRestriction.properties[restriction].passes(pilot))
            {
                answer = false;
                break;
            }
        }

        return answer;
    }
}

var UpgradeType =
{
    ASTROMECH: "astromech",
    BOMB: "bomb",
    CANNON: "cannon",
    CARGO: "cargo",
    CREW: "crew",
    ELITE: "elite",
    HARDPOINT: "hardpoint",
    MISSILE: "missile",
    MODIFICATION: "modification",
    SENSOR: "sensor",
    TEAM: "team",
    TITLE: "title",
    TORPEDO: "torpedo",
    TURRET: "turret",
    properties:
    {
        "astromech":
        {
            displayName: "Astromech",
            value: "astromech",
        },
        "bomb":
        {
            displayName: "Bomb",
            value: "bomb",
        },
        "cannon":
        {
            displayName: "Cannon",
            value: "cannon",
        },
        "cargo":
        {
            displayName: "Cargo",
            value: "cargo",
        },
        "crew":
        {
            displayName: "Crew",
            value: "crew",
        },
        "elite":
        {
            displayName: "Elite",
            value: "elite",
        },
        "hardpoint":
        {
            displayName: "Hardpoint",
            value: "hardpoint",
        },
        "missile":
        {
            displayName: "Missile",
            value: "missile",
        },
        "modification":
        {
            displayName: "Modification",
            value: "modification",
        },
        "sensor":
        {
            displayName: "Sensor",
            value: "sensor",
        },
        "team":
        {
            displayName: "Team",
            value: "team",
        },
        "title":
        {
            displayName: "Title",
            value: "title",
        },
        "torpedo":
        {
            displayName: "Torpedo",
            value: "torpedo",
        },
        "turret":
        {
            displayName: "Turret",
            value: "turret",
        },
    },
    values: [ "astromech", "bomb", "cannon", "cargo", "crew", "elite",
            "hardpoint", "missile", "modification", "sensor", "team", "title",
            "torpedo", "turret", ],
}

/*
 * @return true if this is a secondary weapon.
 */
UpgradeType.isSecondaryWeapon = function(upgradeType)
{
    return (upgradeType === CANNON) || (upgradeType === MISSILE)
            || (upgradeType === TORPEDO) || (upgradeType === TURRET);
}

if (Object.freeze)
{
    Object.freeze(UpgradeType)
};

var UpgradeCard =
{
    ADRENALINE_RUSH: "adrenalineRush",
    ADVANCED_CLOAKING_DEVICE: "advancedCloakingDevice",
    ADVANCED_SENSORS: "advancedSensors",
    ANTI_PURSUIT_LASERS: "antiPursuitLasers",
    C_3PO: "c3po",
    CARLIST_RIEEKAN: "carlistRieekan",
    CHEWBACCA: "chewbacca",
    COMBAT_RETROFIT: "combatRetrofit",
    DAREDEVIL: "daredevil",
    DARTH_VADER: "darthVader",
    DAUNTLESS: "dauntless",
    DEADEYE: "deadeye",
    DECOY: "decoy",
    DETERMINATION: "determination",
    DRAW_THEIR_FIRE: "drawTheirFire",
    ELUSIVENESS: "elusiveness",
    ENGINE_UPGRADE: "engineUpgrade",
    ENGINEERING_TEAM: "engineeringTeam",
    EXPERT_HANDLING: "expertHandling",
    EXPOSE: "expose",
    FIRE_CONTROL_SYSTEM: "fireControlSystem",
    FLIGHT_INSTRUCTOR: "flightInstructor",
    GUNNER: "gunner",
    GUNNERY_TEAM: "gunneryTeam",
    HAN_SOLO: "hanSolo",
    HULL_UPGRADE: "hullUpgrade",
    INTELLIGENCE_AGENT: "intelligenceAgent",
    JAN_DODONNA: "janDodonna",
    LEIA_ORGANA: "leiaOrgana",
    LUKE_SKYWALKER: "lukeSkywalker",
    MARKSMANSHIP: "marksmanship",
    MERCENARY_COPILOT: "mercenaryCopilot",
    MILLENNIUM_FALCON: "millenniumFalcon",
    MOLDY_CROW: "moldyCrow",
    MUNITIONS_FAILSAFE: "munitionsFailsafe",
    NAVIGATOR: "navigator",
    NIEN_NUNB: "nienNunb",
    OPPORTUNIST: "opportunist",
    OUTMANEUVER: "outmaneuver",
    OUTRIDER: "outrider",
    PREDATOR: "predator",
    PROTON_BOMBS: "protonBombs",
    PROXIMITY_MINES: "proximityMines",
    PUSH_THE_LIMIT: "pushTheLimit",
    R2_ASTROMECH: "r2Astromech",
    R2_D2: "r2D2",
    R2_D2_CREW: "r2D2Crew",
    R2_D6: "r2D6",
    R2_F2: "r2F2",
    R3_A2: "r3A2",
    R4_D6: "r4D6",
    R5_ASTROMECH: "r5Astromech",
    R5_D8: "r5D8",
    R5_K6: "r5K6",
    R5_P9: "r5P9",
    R7_ASTROMECH: "r7Astromech",
    R7_T1: "r7T1",
    RAYMUS_ANTILLES: "raymusAntilles",
    REBEL_CAPTIVE: "rebelCaptive",
    RECON_SPECIALIST: "reconSpecialist",
    ROYAL_GUARD_TIE: "royalGuardTie",
    SABOTEUR: "saboteur",
    SEISMIC_CHARGES: "seismicCharges",
    SENSOR_JAMMER: "sensorJammer",
    SENSOR_TEAM: "sensorTeam",
    SHIELD_UPGRADE: "shieldUpgrade",
    SLAVE_I: "slaveI",
    SQUAD_LEADER: "squadLeader",
    ST_321: "st321",
    STEALTH_DEVICE: "stealthDevice",
    STYGIUM_PARTICLE_ACCELERATOR: "stygiumParticleAccelerator",
    SWARM_TACTICS: "swarmTactics",
    TACTICIAN: "tactician",
    TARGETING_COMPUTER: "targetingComputer",
    TARGETING_COORDINATOR: "targetingCoordinator",
    TORYN_FARR: "torynFarr",
    VETERAN_INSTINCTS: "veteranInstincts",
    WEAPONS_ENGINEER: "weaponsEngineer",
    WED_15_REPAIR_DROID: "wed15RepairDroid",
    WINGMAN: "wingman",
    ADVANCED_PROTON_TORPEDOES: "advancedProtonTorpedoes",
    ASSAULT_MISSILES: "assaultMissiles",
    AUTOBLASTER: "autoblaster",
    BLASTER_TURRET: "blasterTurret",
    CLUSTER_MISSILES: "clusterMissiles",
    CONCUSSION_MISSILES: "concussionMissiles",
    FLECHETTE_TORPEDOES: "flechetteTorpedoes",
    HEAVY_LASER_CANNON: "heavyLaserCannon",
    HOMING_MISSILES: "homingMissiles",
    ION_CANNON: "ionCannon",
    ION_CANNON_TURRET: "ionCannonTurret",
    ION_PULSE_MISSILES: "ionPulseMissiles",
    PROTON_TORPEDOES: "protonTorpedoes",
    properties:
    {
        "adrenalineRush":
        {
            name: "Adrenaline Rush",
            type: UpgradeType.ELITE,
            description: "When you reveal a red maneuver, you may discard this card to treat that manuever as a white maneuver until the end of the Activation phase.",
            squadPointCost: 1,
            hasAction: false,
            value: "adrenalineRush",
        },
        "advancedCloakingDevice":
        {
            name: "Advanced Cloaking Device",
            type: UpgradeType.MODIFICATION,
            restrictions: [ UpgradeRestriction.TIE_PHANTOM_ONLY ],
            description: "After you perform an attack, you may perform a free cloak action.",
            squadPointCost: 4,
            hasAction: false,
            value: "advancedCloakingDevice",
        },
        "advancedSensors":
        {
            name: "Advanced Sensors",
            type: UpgradeType.SENSOR,
            description: "Immediately before you reveal your maneuver, you may perform 1 free action. If you use this ability, you must skip your \"Perform Action\" step during this round.",
            squadPointCost: 3,
            hasAction: false,
            value: "advancedSensors",
        },
        "antiPursuitLasers":
        {
            name: "Anti-Pursuit Lasers",
            type: UpgradeType.MODIFICATION,
            description: "After an enemy ship executes a maneuver that causes it to overlap your ship, roll 1 attack die. On a Hit or Critical Hit result, the enemy ship suffers 1 damage.",
            squadPointCost: 2,
            hasAction: false,
            value: "antiPursuitLasers",
        },
        "c3po":
        {
            name: "C-3PO",
            type: UpgradeType.CREW,
            restrictions: [ UpgradeRestriction.REBEL_ONLY ],
            description: "Once per round, before you roll 1 or more defense dice, you may guess aloud a number of Evade results. If you roll that many Evade results (before modifying dice), add 1 Evade result.",
            squadPointCost: 3,
            hasAction: false,
            value: "c3po",
        },
        "carlistRieekan":
        {
            name: "Carlist Rieekan",
            type: UpgradeType.CREW,
            restrictions: [ UpgradeRestriction.HUGE_SHIP_ONLY,
                    UpgradeRestriction.REBEL_ONLY ],
            description: "At the start of the Activation phase, you may discard this card to treat each friendly ship's pilot skill value as \"12\" until the end of the phase.",
            squadPointCost: 3,
            hasAction: false,
            value: "carlistRieekan",
        },
        "chewbacca":
        {
            name: "Chewbacca",
            type: UpgradeType.CREW,
            restrictions: [ UpgradeRestriction.REBEL_ONLY ],
            description: "When you are dealt a Damage card, you may immediately discard that card and recover 1 shield. Then, discard this Upgrade card.",
            squadPointCost: 4,
            hasAction: false,
            value: "chewbacca",
        },
        "combatRetrofit":
        {
            name: "Combat Retrofit",
            type: UpgradeType.MODIFICATION,
            description: "Increase your hull value by 2 and your shield value by 1.",
            squadPointCost: 10,
            hasAction: false,
            value: "combatRetrofit",
        },
        "daredevil":
        {
            name: "Daredevil",
            type: UpgradeType.ELITE,
            description: "Execute a white Turn Left 1 or Turn Right 1 maneuver. Then, receive 1 stress token. Then, if you do not have the Boost action icon, roll 2 attack dice. Suffer any Damage and Critical Damage rolled.",
            squadPointCost: 3,
            hasAction: true,
            value: "daredevil",
        },
        "darthVader":
        {
            name: "Darth Vader",
            type: UpgradeType.CREW,
            restrictions: [ UpgradeRestriction.IMPERIAL_ONLY ],
            description: "After you perform an attack against an enemy ship, you may suffer 2 damage to cause that ship to suffer 1 critical damage.",
            squadPointCost: 3,
            hasAction: false,
            value: "darthVader",
        },
        "dashRendar":
        {
            name: "Dash Rendar",
            type: UpgradeType.CREW,
            restrictions: [ UpgradeRestriction.REBEL_ONLY ],
            description: "You may perform attacks while overlapping an obstacle. Your attacks cannot be obstructed.",
            squadPointCost: 2,
            hasAction: false,
            value: "dashRendar",
        },
        "dauntless":
        {
            name: "Dauntless",
            type: UpgradeType.TITLE,
            restrictions: [ UpgradeRestriction.VT_49_DECIMATOR_ONLY ],
            description: "After you execute a maneuver that causes you to overlap another ship, you may perform 1 free action. Then receive 1 stress token.",
            isUnique: true,
            squadPointCost: 2,
            hasAction: false,
            value: "dauntless",
        },
        "deadeye":
        {
            name: "Deadeye",
            type: UpgradeType.ELITE,
            description: "You may treat the \"Attack [Target Lock]:\" header as \"Attack [Focus]:.\" When an attack instructs you to spend a target lock, you may spend a focus token instead.",
            squadPointCost: 1,
            hasAction: false,
            value: "deadeye",
        },
        "decoy":
        {
            name: "Decoy",
            type: UpgradeType.ELITE,
            description: "At the start of the Combat phase, you may choose 1 friendly ship at Range 1-2. Exchange your pilot skill with that ship's pilot skill until the end of the phase.",
            squadPointCost: 2,
            hasAction: false,
            value: "decoy",
        },
        "determination":
        {
            name: "Determination",
            type: UpgradeType.ELITE,
            description: "When you are dealt a faceup Damage card with the Pilot trait, discard it immediately without resolving its effect.",
            squadPointCost: 1,
            hasAction: false,
            value: "determination",
        },
        "drawTheirFire":
        {
            name: "Draw Their Fire",
            type: UpgradeType.ELITE,
            description: "When a friendly ship at Range 1 is hit by an attack, you may suffer 1 of the uncanceled Critical Hit results instead of the target ship.",
            squadPointCost: 1,
            hasAction: false,
            value: "drawTheirFire",
        },
        "elusiveness":
        {
            name: "Elusiveness",
            type: UpgradeType.ELITE,
            description: "When defending, you may receive 1 stress token to choose 1 attack die. The attacker must reroll that die. If you have at least 1 stress token, you cannot use this ability.",
            squadPointCost: 2,
            hasAction: false,
            value: "elusiveness",
        },
        "engineUpgrade":
        {
            name: "Engine Upgrade",
            type: UpgradeType.MODIFICATION,
            description: "Your action bar gains the boost action icon.",
            squadPointCost: 4,
            hasAction: false,
            value: "engineUpgrade",
        },
        "engineeringTeam":
        {
            name: "Engineering Team",
            type: UpgradeType.TEAM,
            description: "During the Activation phase, when you reveal a Straight maneuver, gain 1 additional energy during the \"Gain Energy\" step.",
            squadPointCost: 4,
            hasAction: false,
            value: "engineeringTeam",
        },
        "expertHandling":
        {
            name: "Expert Handling",
            type: UpgradeType.ELITE,
            description: "Perform a free barrel roll action. If you do not have the Barrel Roll action icon, receive 1 stress token. You may then remove 1 enemy target lock from your ship.",
            squadPointCost: 2,
            hasAction: true,
            value: "expertHandling",
        },
        "expose":
        {
            name: "Expose",
            type: UpgradeType.ELITE,
            description: "Until the end of the round, increase your primary weapon value by 1 and decrease your agility value by 1.",
            squadPointCost: 4,
            hasAction: true,
            value: "expose",
        },
        "fireControlSystem":
        {
            name: "Fire Control System",
            type: UpgradeType.SENSOR,
            description: "After you perform an attack, you may acquire a target lock on the defender.",
            squadPointCost: 2,
            hasAction: false,
            value: "fireControlSystem",
        },
        "fleetOfficer":
        {
            name: "Fleet Officer",
            type: UpgradeType.CREW,
            restrictions: [ UpgradeRestriction.IMPERIAL_ONLY ],
            description: "Choose up to 2 friendly ships at Range 1-2 and assign 1 focus token to each of those ships. Then receive 1 stress token.",
            squadPointCost: 3,
            hasAction: true,
            value: "fleetOfficer",
        },
        "flightInstructor":
        {
            name: "Flight Instructor",
            type: UpgradeType.CREW,
            description: "When defending, you may reroll 1 of your Focus results. If the attacker's pilot skill value is \"2\" or lower, you may reroll 1 of your blank results instead.",
            squadPointCost: 4,
            hasAction: false,
            value: "flightInstructor",
        },
        "gunner":
        {
            name: "Gunner",
            type: UpgradeType.CREW,
            description: "After you perform an attack that does not hit, you may immediately perform a primary weapon attack. You cannot perform another attack this round.",
            squadPointCost: 5,
            hasAction: false,
            value: "gunner",
        },
        "gunneryTeam":
        {
            name: "Gunnery Team",
            type: UpgradeType.TEAM,
            description: "Once per round, when attacking with a secondary weapon, you may spend 1 energy to change 1 of your blank results to a Hit result.",
            squadPointCost: 4,
            hasAction: false,
            value: "gunneryTeam",
        },
        "hanSolo":
        {
            name: "Han Solo",
            type: UpgradeType.CREW,
            restrictions: [ UpgradeRestriction.REBEL_ONLY ],
            description: "When attacking, if you have a target lock on the defender, you may spend that target lock to change all of your Focus results to Hit results.",
            squadPointCost: 2,
            hasAction: false,
            value: "hanSolo",
        },
        "hullUpgrade":
        {
            name: "Hull Upgrade",
            type: UpgradeType.MODIFICATION,
            description: "Increase your hull value by 1.",
            squadPointCost: 3,
            hasAction: false,
            value: "hullUpgrade",
        },
        "intelligenceAgent":
        {
            name: "Intelligence Agent",
            type: UpgradeType.CREW,
            description: "At the start of the Activation phase, choose 1 enemy ship at Range 1-2. You may look at that ship's chosen maneuver.",
            squadPointCost: 1,
            hasAction: false,
            value: "intelligenceAgent",
        },
        "janDodonna":
        {
            name: "Jan Dodonna",
            type: UpgradeType.CREW,
            restrictions: [ UpgradeRestriction.HUGE_SHIP_ONLY,
                    UpgradeRestriction.REBEL_ONLY ],
            description: "When another friendly ship at Range 1 is attacking, it may change 1 of its Hit results to a Critical Hit result.",
            squadPointCost: 6,
            hasAction: false,
            value: "janDodonna",
        },
        "landoCalrissian":
        {
            name: "Lando Calrissian",
            type: UpgradeType.CREW,
            restrictions: [ UpgradeRestriction.REBEL_ONLY ],
            description: "Roll 2 defense dice. For each Focus result, assign 1 focus token to your ship. For each Evade result, assign 1 evade token to your ship.",
            squadPointCost: 3,
            hasAction: true,
            value: "landoCalrissian",
        },
        "leiaOrgana":
        {
            name: "Leia Organa",
            type: UpgradeType.CREW,
            restrictions: [ UpgradeRestriction.REBEL_ONLY ],
            description: "At the start of the Activation phase, you may discard this card to allow all friendly ships that reveal a red maneuver to treat that maneuver as a white maneuver until the end of the phase.",
            squadPointCost: 4,
            hasAction: false,
            value: "leiaOrgana",
        },
        "leebo":
        {
            name: "Leebo",
            type: UpgradeType.CREW,
            restrictions: [ UpgradeRestriction.REBEL_ONLY ],
            description: "Perform a free boost action. Then receive 1 ion token.",
            squadPointCost: 2,
            hasAction: true,
            value: "leebo",
        },
        "lukeSkywalker":
        {
            name: "Luke Skywalker",
            type: UpgradeType.CREW,
            restrictions: [ UpgradeRestriction.REBEL_ONLY ],
            description: "After you perform an attack that does not hit, you may immediately perform a primary weapon attack. You may change 1 Focus result to a Hit result. You cannot perform another attack this round.",
            squadPointCost: 7,
            hasAction: false,
            value: "lukeSkywalker",
        },
        "maraJade":
        {
            name: "Mara Jade",
            type: UpgradeType.CREW,
            restrictions: [ UpgradeRestriction.IMPERIAL_ONLY ],
            description: "At the end of the Combat phase, each enemy ship at Range 1 that does not have a stress token receives 1 stress token.",
            squadPointCost: 3,
            hasAction: false,
            value: "maraJade",
        },
        "marksmanship":
        {
            name: "Marksmanship",
            type: UpgradeType.ELITE,
            description: "When attacking this round, you may change 1 of your Focus results to a Critical Hit result and all of your other Focus results to Hit results.",
            squadPointCost: 3,
            hasAction: true,
            value: "marksmanship",
        },
        "mercenaryCopilot":
        {
            name: "Mercenary Copilot",
            type: UpgradeType.CREW,
            description: "When attacking at Range 3, you may change 1 of your Hit results to a Critical Hit result.",
            squadPointCost: 2,
            hasAction: false,
            value: "mercenaryCopilot",
        },
        "millenniumFalcon":
        {
            name: "Millennium Falcon",
            type: UpgradeType.TITLE,
            restrictions: [ UpgradeRestriction.YT_1300_ONLY ],
            description: "Your action bar gains the Evade action icon.",
            squadPointCost: 1,
            hasAction: false,
            value: "millenniumFalcon",
        },
        "moffJerjerrod":
        {
            name: "Moff Jerjerrod",
            type: UpgradeType.CREW,
            restrictions: [ UpgradeRestriction.IMPERIAL_ONLY ],
            description: "When you are dealt a faceup Damage card, you may discard this Upgrade card or another Crew Upgrade card to flip that Damage card facedown (without resolving its effect).",
            squadPointCost: 2,
            hasAction: false,
            value: "moffJerjerrod",
        },
        "moldyCrow":
        {
            name: "Moldy Crow",
            type: UpgradeType.TITLE,
            restrictions: [ UpgradeRestriction.HWK_290_ONLY ],
            description: "During the End phase, do not remove unused focus tokens from your ship.",
            isUnique: true,
            squadPointCost: 3,
            hasAction: false,
            value: "moldyCrow",
        },
        "munitionsFailsafe":
        {
            name: "Munitions Failsafe",
            type: UpgradeType.MODIFICATION,
            description: "When attacking with a secondary weapon that instructs you to discard it to perform the attack, do not discard it unless the attack hits.",
            squadPointCost: 1,
            hasAction: false,
            value: "munitionsFailsafe",
        },
        "navigator":
        {
            name: "Navigator",
            type: UpgradeType.CREW,
            description: "When you reveal a manuever you may rotate your dial to another maneuver with the same bearing. You cannot rotate to a red maneuver if you have any stress tokens.",
            squadPointCost: 3,
            hasAction: false,
            value: "navigator",
        },
        "nienNunb":
        {
            name: "Nien Nunb",
            type: UpgradeType.CREW,
            restrictions: [ UpgradeRestriction.REBEL_ONLY ],
            description: "You may treat all Straight maneuvers as green maneuvers.",
            squadPointCost: 1,
            hasAction: false,
            value: "nienNunb",
        },
        "opportunist":
        {
            name: "Opportunist",
            type: UpgradeType.ELITE,
            description: "When attacking, if the defender does not have any focus or evade tokens, you may receive 1 stress token to roll 1 additional attack die. You cannot use this ability if you have any stress tokens.",
            squadPointCost: 4,
            hasAction: false,
            value: "opportunist",
        },
        "outmaneuver":
        {
            name: "Outmaneuver",
            type: UpgradeType.ELITE,
            description: "When attacking a ship inside your firing arc, if you are not inside that ship's firing arc, reduce its agility value by 1 (to a minimum of 0).",
            squadPointCost: 3,
            hasAction: false,
            value: "outmaneuver",
        },
        "outrider":
        {
            name: "Outrider",
            type: UpgradeType.TITLE,
            restrictions: [ UpgradeRestriction.YT_2400_ONLY ],
            description: "While you have a Cannon upgrade card equipped, you cannot perform primary weapon attacks and you may perform Cannon secondary weapon attacks against ships outside your firing arc.",
            squadPointCost: 5,
            hasAction: false,
            value: "outrider",
        },
        "predator":
        {
            name: "Predator",
            type: UpgradeType.ELITE,
            description: "When attacking, you may reroll 1 attack die. If the defender's pilot skill value if \"2\" or lower, you may instead reroll up to 2 attack dice.",
            squadPointCost: 3,
            hasAction: false,
            value: "predator",
        },
        "protonBombs":
        {
            name: "Proton Bombs",
            type: UpgradeType.BOMB,
            description: "When you reveal your maneuver dial, you may discard this card to drop 1 proton bomb token. This token detonates at the end of the Activation phase.",
            squadPointCost: 5,
            hasAction: false,
            value: "protonBombs",
        },
        "proximityMines":
        {
            name: "Proximity Mines",
            type: UpgradeType.BOMB,
            description: "Discard this card to drop 1 proximity mine token. When a ship's base or maneuver template overlaps this token, this token detonates.",
            squadPointCost: 3,
            hasAction: true,
            value: "proximityMines",
        },
        "pushTheLimit":
        {
            name: "Push The Limit",
            type: UpgradeType.ELITE,
            description: "Once per round, after you perform an action, you may perform 1 free action shown in your action bar. Then receive 1 stress token.",
            squadPointCost: 3,
            hasAction: false,
            value: "pushTheLimit",
        },
        "r2Astromech":
        {
            name: "R2 Astromech",
            type: UpgradeType.ASTROMECH,
            description: "You may treat all 1- and 2-speed maneuvers as green maneuvers.",
            squadPointCost: 1,
            hasAction: false,
            value: "r2Astromech",
        },
        "r2D2":
        {
            name: "R2-D2",
            type: UpgradeType.ASTROMECH,
            description: "After executing a green maneuver, you may recover 1 shield (up to your shield value).",
            squadPointCost: 4,
            hasAction: false,
            value: "r2D2",
        },
        "r2D2Crew":
        {
            name: "R2-D2 (Crew)",
            type: UpgradeType.CREW,
            restrictions: [ UpgradeRestriction.REBEL_ONLY ],
            description: "At the end of the End phase, if you have no shields, you may recover 1 shield and roll 1 attack die. On a Hit result, randomly flip 1 of your facedown Damage cards faceup and resolve it.",
            squadPointCost: 4,
            hasAction: false,
            value: "r2D2Crew",
        },
        "r2D6":
        {
            name: "R2-D6",
            type: UpgradeType.ASTROMECH,
            description: "Your upgrade bar gains the Elite upgrade icon. You cannot equip this upgrade if you already have a Elite upgrade icon or if your pilot skill value is 2 or lower.",
            squadPointCost: 1,
            hasAction: false,
            value: "r2D6",
        },
        "r2F2":
        {
            name: "R2-F2",
            type: UpgradeType.ASTROMECH,
            description: "Increase your agility value by 1 until the end of this game round.",
            squadPointCost: 3,
            hasAction: true,
            value: "r2F2",
        },
        "r3A2":
        {
            name: "R3-A2",
            type: UpgradeType.ASTROMECH,
            description: "When you declare the target of your attack, if the defender is inside your firing arc, you may receive 1 stress token to cause the defender to receive 1 stress token.",
            squadPointCost: 2,
            hasAction: false,
            value: "r3A2",
        },
        "r4D6":
        {
            name: "R4-D6",
            type: UpgradeType.ASTROMECH,
            description: "When you are hit by an attack and there are at least 3 uncanceled hit results, you may choose and cancel those results until there are 2 remaining. For each result canceled in this way, receive 1 stress token.",
            squadPointCost: 1,
            hasAction: false,
            value: "r4D6",
        },
        "r5Astromech":
        {
            name: "R5 Astromech",
            type: UpgradeType.ASTROMECH,
            description: "During the End phase, you may choose 1 of your faceup Damage cards with the Ship trait and flip it facedown.",
            squadPointCost: 1,
            hasAction: false,
            value: "r5Astromech",
        },
        "r5D8":
        {
            name: "R5-D8",
            type: UpgradeType.ASTROMECH,
            description: "Roll 1 defense die. On an evade or focus result, discard 1 of your facedown Damage cards.",
            squadPointCost: 3,
            hasAction: true,
            value: "r5D8",
        },
        "r5K6":
        {
            name: "R5-K6",
            type: UpgradeType.ASTROMECH,
            description: "After spending your target lock, roll 1 defense die. On an evade result, immediately acquire a target lock on that same ship. You cannot spend this target lock during this attack.",
            squadPointCost: 2,
            hasAction: false,
            value: "r5K6",
        },
        "r5P9":
        {
            name: "R5-P9",
            type: UpgradeType.ASTROMECH,
            description: "At the end of the Combat phase, you may spend 1 of your focus tokens to recover 1 shield (up to your shield value).",
            squadPointCost: 3,
            hasAction: false,
            value: "r5P9",
        },
        "r7Astromech":
        {
            name: "R7 Astromech",
            type: UpgradeType.ASTROMECH,
            description: "Once per round when defending, if you have a target lock on the attacker, you may spend the target lock to choose any or all attack dice. The attacker must reroll the chosen dice.",
            squadPointCost: 2,
            hasAction: false,
            value: "r7Astromech",
        },
        "r7T1":
        {
            name: "R7-T1",
            type: UpgradeType.ASTROMECH,
            description: "Choose an enemy ship at Range 1-2. If you are inside that ship's firing arc, you may acquire a target lock on that ship. Then you may perform a free boost action.",
            squadPointCost: 3,
            hasAction: true,
            value: "r7T1",
        },
        "raymusAntilles":
        {
            name: "Raymus Antilles",
            type: UpgradeType.CREW,
            restrictions: [ UpgradeRestriction.HUGE_SHIP_ONLY,
                    UpgradeRestriction.REBEL_ONLY ],
            description: "At the start of the Activation phase, choose 1 enemy ship at Range 1-3. You may look at that ship's chosen maneuver. If the maneuver is white, assign that ship 1 stress token.",
            squadPointCost: 6,
            hasAction: false,
            value: "raymusAntilles",
        },
        "rebelCaptive":
        {
            name: "Rebel Captive",
            type: UpgradeType.CREW,
            restrictions: [ UpgradeRestriction.IMPERIAL_ONLY ],
            description: "Once per round, the first ship that declares you as the target of an attack immediately receives 1 stress token.",
            squadPointCost: 3,
            hasAction: false,
            value: "rebelCaptive",
        },
        "reconSpecialist":
        {
            name: "Recon Specialist",
            type: UpgradeType.CREW,
            description: "When you perform a focus action, assign 1 additional focus token to your ship.",
            squadPointCost: 3,
            hasAction: false,
            value: "reconSpecialist",
        },
        "royalGuardTie":
        {
            name: "Royal Guard TIE",
            type: UpgradeType.TITLE,
            restrictions: [ UpgradeRestriction.TIE_INTERCEPTOR_ONLY ],
            description: "You may equip up to 2 different Modification upgrades (instead of 1). You cannot equip this card if your pilot skill value is \"4\" or lower.",
            squadPointCost: 0,
            hasAction: false,
            value: "royalGuardTie",
        },
        "saboteur":
        {
            name: "Saboteur",
            type: UpgradeType.CREW,
            description: "Choose 1 enemy ship at Range 1 and roll 1 attack die. On a Hit or Critical Hit result, choose 1 random facedown Damage card assigned to that ship, flip it faceup, and resolve it.",
            squadPointCost: 2,
            hasAction: true,
            value: "saboteur",
        },
        "seismicCharges":
        {
            name: "Seismic Charges",
            type: UpgradeType.BOMB,
            description: "When you reveal your maneuver dial, you may discard this card to drop 1 seismic charge token. This token detonates at the end of the Activation phase.",
            squadPointCost: 2,
            hasAction: false,
            value: "seismicCharges",
        },
        "sensorJammer":
        {
            name: "Sensor Jammer",
            type: UpgradeType.SENSOR,
            description: "When defending, you may change 1 of the attacker's Hit results to a Focus result. The attacker cannot reroll the die with the changed result.",
            squadPointCost: 4,
            hasAction: false,
            value: "sensorJammer",
        },
        "sensorTeam":
        {
            name: "Sensor Team",
            type: UpgradeType.TEAM,
            description: "When acquiring a target lock, you may lock onto an enemy ship at Range 1-5 (instead of Range 1-3).",
            squadPointCost: 4,
            hasAction: false,
            value: "sensorTeam",
        },
        "shieldUpgrade":
        {
            name: "Shield Upgrade",
            type: UpgradeType.MODIFICATION,
            description: "Increase your shield value by 1.",
            squadPointCost: 4,
            hasAction: false,
            value: "shieldUpgrade",
        },
        "slaveI":
        {
            name: "Slave I",
            type: UpgradeType.TITLE,
            restrictions: [ UpgradeRestriction.FIRESPRAY_31_ONLY ],
            description: "Your upgrade bar gains the Torpedo upgrade icon.",
            squadPointCost: 0,
            hasAction: false,
            value: "slaveI",
        },
        "squadLeader":
        {
            name: "Squad Leader",
            type: UpgradeType.ELITE,
            description: "Choose 1 ship at Range 1-2 that has a lower pilot skill than you. The chosen ship may immediately perform 1 free action.",
            squadPointCost: 2,
            hasAction: true,
            value: "squadLeader",
        },
        "st321":
        {
            name: "ST-321",
            type: UpgradeType.TITLE,
            restrictions: [ UpgradeRestriction.LAMBDA_CLASS_SHUTTLE_ONLY ],
            description: "When acquiring a target lock, you may lock onto any enemy ship in the play area.",
            squadPointCost: 3,
            hasAction: false,
            value: "st321",
        },
        "stealthDevice":
        {
            name: "Stealth Device",
            type: UpgradeType.MODIFICATION,
            description: "Increase your agility value by 1. If you are hit by an attack, discard this card.",
            squadPointCost: 3,
            hasAction: false,
            value: "stealthDevice",
        },
        "stygiumParticleAccelerator":
        {
            name: "Stygium Particle Accelerator",
            type: UpgradeType.MODIFICATION,
            description: "When you either decloak or perform a cloak action, you may perform a free evade action.",
            squadPointCost: 2,
            hasAction: false,
            value: "stygiumParticleAccelerator",
        },
        "swarmTactics":
        {
            name: "Swarm Tactics",
            type: UpgradeType.ELITE,
            description: "At the start of the Combat phase, you may choose 1 friendly ship at Range 1. Until the end of this phase, treat the chosen ship as if its pilot skill were equal to your pilot skill.",
            squadPointCost: 2,
            hasAction: false,
            value: "swarmTactics",
        },
        "tactician":
        {
            name: "Tactician",
            type: UpgradeType.CREW,
            description: "After you perform an attack against a ship inside your firing arc at Range 2, that ship receives 1 stress token.",
            squadPointCost: 2,
            hasAction: false,
            value: "tactician",
        },
        "targetingComputer":
        {
            name: "Targeting Computer",
            type: UpgradeType.MODIFICATION,
            description: "Your action bar gains the Target Lock action icon.",
            squadPointCost: 2,
            hasAction: false,
            value: "targetingComputer",
        },
        "targetingCoordinator":
        {
            name: "Targeting Coordinator",
            type: UpgradeType.CREW,
            description: "You may spend 1 energy to choose 1 friendly ship at Range 1-2. Acquire a target lock, then assign the blue target lock token to the chosen ship.",
            squadPointCost: 4,
            hasAction: false,
            value: "targetingCoordinator",
        },
        "torynFarr":
        {
            name: "Toryn Farr",
            type: UpgradeType.CREW,
            restrictions: [ UpgradeRestriction.HUGE_SHIP_ONLY,
                    UpgradeRestriction.REBEL_ONLY ],
            description: "Spend any amount of energy to choose that many enemy ships at Range 1-2. Remove all focus, evade, and blue target lock tokens from those ships.",
            squadPointCost: 6,
            hasAction: true,
            value: "torynFarr",
        },
        "veteranInstincts":
        {
            name: "Veteran Instincts",
            type: UpgradeType.ELITE,
            description: "Increase your pilot skill value by 2.",
            squadPointCost: 1,
            hasAction: false,
            value: "veteranInstincts",
        },
        "weaponsEngineer":
        {
            name: "Weapons Engineer",
            type: UpgradeType.CREW,
            description: "You may maintain 2 target locks (only 1 per enemy ship). When you acquire a target lock, you may lock onto 2 different ships.",
            squadPointCost: 3,
            hasAction: false,
            value: "weaponsEngineer",
        },
        "wed15RepairDroid":
        {
            name: "WED-15 Repair Droid",
            type: UpgradeType.CREW,
            restrictions: [ UpgradeRestriction.HUGE_SHIP_ONLY ],
            description: "Spend 1 energy to discard 1 of your facedown Damage cards, or spend 3 energy to discard 1 of your faceup Damage cards.",
            squadPointCost: 2,
            hasAction: true,
            value: "wed15RepairDroid",
        },
        "wingman":
        {
            name: "Wingman",
            type: UpgradeType.ELITE,
            description: "At the start of the Combat phase, remove 1 stress token from another friendly ship at Range 1.",
            squadPointCost: 2,
            hasAction: false,
            value: "wingman",
        },
        "ysanneIsard":
        {
            name: "Ysanne Isard",
            type: UpgradeType.CREW,
            restrictions: [ UpgradeRestriction.IMPERIAL_ONLY ],
            description: "At the start of the Combat phase, if you have no shields and at least 1 Damage card assigned to your ship, you may perform a free evade action.",
            squadPointCost: 4,
            hasAction: false,
            value: "ysanneIsard",
        },
        "advancedProtonTorpedoes":
        {
            name: "Advanced Proton Torpedoes",
            type: UpgradeType.TORPEDO,
            description: "Spend your target lock and discard this card to perform this attack. You may change up to 3 of your blank results to Focus results.",
            squadPointCost: 6,
            hasAction: false,
            value: "advancedProtonTorpedoes",
        },
        "assaultMissiles":
        {
            name: "Assault Missiles",
            type: UpgradeType.MISSILE,
            description: "Spend your target lock and discard this card to perform this attack. If this attack hits, each other ship at Range 1 of the defender suffers 1 damage.",
            squadPointCost: 5,
            hasAction: false,
            value: "assaultMissiles",
        },
        "autoblaster":
        {
            name: "Autoblaster",
            type: UpgradeType.CANNON,
            description: "Attack 1 ship. Your hit results cannot be canceled by defense dice. The defender may cancel critical hit results before hit results.",
            squadPointCost: 5,
            hasAction: false,
            value: "autoblaster",
        },
        "blasterTurret":
        {
            name: "Blaster Turret",
            type: UpgradeType.TURRET,
            description: "Spend 1 focus token to perform this attack against 1 ship (even a ship outside your firing arc).",
            squadPointCost: 4,
            hasAction: false,
            value: "blasterTurret",
        },
        "clusterMissiles":
        {
            name: "Cluster Missiles",
            type: UpgradeType.MISSILE,
            description: "Spend your target lock and discard this card to perform this attack twice.",
            squadPointCost: 4,
            hasAction: false,
            value: "clusterMissiles",
        },
        "concussionMissiles":
        {
            name: "Concussion Missiles",
            type: UpgradeType.MISSILE,
            description: "Spend your target lock and discard this card to perform this attack. You may change 1 of your blank results to a Hit result.",
            squadPointCost: 4,
            hasAction: false,
            value: "concussionMissiles",
        },
        "flechetteTorpedoes":
        {
            name: "Flechette Torpedoes",
            type: UpgradeType.TORPEDO,
            description: "Discard this card and spend your target lock to perform this attack. After you perform this attack, the defender receives 1 stress token if its hull value is \"4\" or lower.",
            squadPointCost: 2,
            hasAction: false,
            value: "flechetteTorpedoes",
        },
        "heavyLaserCannon":
        {
            name: "Heavy Laser Cannon",
            type: UpgradeType.CANNON,
            description: "Attack 1 ship. Immediately after rolling your attack dice, you must change all of your critical hit results to hit results.",
            squadPointCost: 7,
            hasAction: false,
            value: "heavyLaserCannon",
        },
        "homingMissiles":
        {
            name: "Homing Missiles",
            type: UpgradeType.MISSILE,
            description: "Discard this card to perform this attack. The defender cannot spend evade tokens during this attack.",
            squadPointCost: 5,
            hasAction: false,
            value: "homingMissiles",
        },
        "ionCannon":
        {
            name: "Ion Cannon",
            type: UpgradeType.CANNON,
            description: "Attack 1 ship. If this attack hits, the defender suffers 1 damage and receives 1 ion token. Then cancel all dice results.",
            squadPointCost: 3,
            hasAction: false,
            value: "ionCannon",
        },
        "ionCannonTurret":
        {
            name: "Ion Cannon Turret",
            type: UpgradeType.TURRET,
            description: "Attack 1 ship (even a ship outside your firing arc). If this attack hits the target ship, the ship suffers 1 damage and receives 1 ion token. Then cancel all dice results.",
            squadPointCost: 5,
            hasAction: false,
            value: "ionCannonTurret",
        },
        "ionPulseMissiles":
        {
            name: "Ion Pulse Missiles",
            type: UpgradeType.MISSILE,
            description: "Spend your target lock and discard this card to perform this attack. If this attack hits, the defender suffers 1 damage and receives 2 ion tokens. Then cancel all dice results.",
            squadPointCost: 3,
            hasAction: false,
            value: "ionPulseMissiles",
        },
        "protonTorpedoes":
        {
            name: "Proton Torpedoes",
            type: UpgradeType.TORPEDO,
            description: "Spend your target lock and discard this card to perform this attack. You may change 1 of your Focus results to a Critical Hit result.",
            squadPointCost: 4,
            hasAction: false,
            value: "protonTorpedoes",
        },
    },

    values: function()
    {
        return Object.getOwnPropertyNames(UpgradeCard.properties);
    },

    valuesByPilotAndType: function(pilot, upgradeType)
    {
        InputValidator.validateNotNull("pilot", pilot);
        InputValidator.validateNotNull("upgradeType", upgradeType);

        var answer = [];
        var values = this.values();
        var properties = this.properties;

        for (var i = 0; i < values.length; i++)
        {
            var value = values[i];
            var type = properties[value].type;

            if (type === upgradeType)
            {
                var restrictions = properties[value].restrictions;

                if (restrictions === undefined
                        || UpgradeRestriction.passes(restrictions, pilot))
                {
                    answer[answer.length] = value;
                }
            }
        }

        return answer;
    },
}

if (Object.freeze)
{
    Object.freeze(UpgradeCard)
};

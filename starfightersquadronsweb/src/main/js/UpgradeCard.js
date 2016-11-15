define(["FiringArc", "Pilot", "RangeRuler", "UpgradeHeader", "UpgradeRestriction", "UpgradeType"],
    function(FiringArc, Pilot, RangeRuler, UpgradeHeader, UpgradeRestriction, UpgradeType)
    {
        "use strict";
        var UpgradeCard = {
            A_WING_TEST_PILOT: "aWingTestPilot",
            ACCURACY_CORRECTOR: "accuracyCorrector",
            ADAPTABILITY: "adaptability",
            ADMIRAL_OZZEL: "admiralOzzel",
            ADRENALINE_RUSH: "adrenalineRush",
            ADVANCED_CLOAKING_DEVICE: "advancedCloakingDevice",
            ADVANCED_HOMING_MISSILES: "advancedHomingMissiles",
            ADVANCED_PROTON_TORPEDOES: "advancedProtonTorpedoes",
            ADVANCED_SENSORS: "advancedSensors",
            ADVANCED_SLAM: "advancedSlam",
            ADVANCED_TARGETING_COMPUTER: "advancedTargetingComputer",
            AGENT_KALLUS: "agentKallus",
            ANDRASTA: "andrasta",
            ANTI_PURSUIT_LASERS: "antiPursuitLasers",
            ASSAILER: "assailer",
            ASSAULT_MISSILES: "assaultMissiles",
            ATTANNI_MINDLINK: "attanniMindlink",
            AUTOBLASTER: "autoblaster",
            AUTOBLASTER_TURRET: "autoblasterTurret",
            AUTOMATED_PROTOCOLS: "automatedProtocols",
            AUTOTHRUSTERS: "autothrusters",
            BACKUP_SHIELD_GENERATOR: "backupShieldGenerator",
            B_WING_E2: "bWingE2",
            BB_8: "bb8",
            BLASTER_TURRET: "blasterTurret",
            BOBA_FETT: "bobaFett",
            BODYGUARD: "bodyguard",
            BOMB_LOADOUT: "bombLoadout",
            BOMBARDIER: "bombardier",
            BOSSK: "bossk",
            BRIGHT_HOPE: "brightHope",
            BROADCAST_ARRAY: "broadcastArray",
            BTL_A4_Y_WING: "btlA4YWing",
            C_3PO: "c3po",
            CALCULATION: "calculation",
            CAPTAIN_NEEDA: "captainNeeda",
            CARLIST_RIEEKAN: "carlistRieekan",
            CHARDAAN_REFIT: "chardaanRefit",
            CHEWBACCA: "chewbacca",
            CHOPPER: "chopper",
            CLOAKING_DEVICE: "cloakingDevice",
            CLUSTER_BOMBS: "clusterBombs",
            CLUSTER_MINES: "clusterMines",
            CLUSTER_MISSILES: "clusterMissiles",
            COLLISION_DETECTOR: "collisionDetector",
            COMBAT_RETROFIT: "combatRetrofit",
            COMM_RELAY: "commRelay",
            COMMS_BOOSTER: "commsBooster",
            CONCUSSION_MISSILES: "concussionMissiles",
            CONNER_NET: "connerNet",
            CONSTRUCTION_DROID: "constructionDroid",
            COOL_HAND: "coolHand",
            COUNTERMEASURES: "countermeasures",
            CRACK_SHOT: "crackShot",
            DAREDEVIL: "daredevil",
            DARTH_VADER: "darthVader",
            DASH_RENDAR: "dashRendar",
            DAUNTLESS: "dauntless",
            DEAD_MANS_SWITCH: "deadMansSwitch",
            DEADEYE: "deadeye",
            DECOY: "decoy",
            DENGAR: "dengar",
            DETERMINATION: "determination",
            DOCKING_CLAMPS: "dockingClamps",
            DODONNAS_PRIDE: "dodonnasPride",
            DORSAL_TURRET: "dorsalTurret",
            DRAW_THEIR_FIRE: "drawTheirFire",
            DUAL_LASER_TURRET: "dualLaserTurret",
            DUTYFREE: "dutyfree",
            ELECTRONIC_BAFFLE: "electronicBaffle",
            ELUSIVENESS: "elusiveness",
            EM_EMITTER: "emEmitter",
            EMPEROR_PALPATINE: "emperorPalpatine",
            ENGINE_BOOSTER: "engineBooster",
            ENGINE_UPGRADE: "engineUpgrade",
            ENGINEERING_TEAM: "engineeringTeam",
            ENHANCED_SCOPES: "enhancedScopes",
            EXPANDED_CARGO_HOLD: "expandedCargoHold",
            EXPERIMENTAL_INTERFACE: "experimentalInterface",
            EXPERT_HANDLING: "expertHandling",
            EXPOSE: "expose",
            EXTRA_MUNITIONS: "extraMunitions",
            EZRA_BRIDGER: "ezraBridger",
            FEEDBACK_ARRAY: "feedbackArray",
            FIRE_CONTROL_SYSTEM: "fireControlSystem",
            FLECHETTE_CANNON: "flechetteCannon",
            FLECHETTE_TORPEDOES: "flechetteTorpedoes",
            FLEET_OFFICER: "fleetOfficer",
            FLIGHT_INSTRUCTOR: "flightInstructor",
            FOUR_LOM: "fourLom",
            FREQUENCY_JAMMER: "frequencyJammer",
            GENIUS: "genius",
            GHOST: "ghost",
            GLITTERSTIM: "glitterstim",
            GONK: "gonk",
            GRAND_MOFF_TARKIN: "grandMoffTarkin",
            GREEDO: "greedo",
            GUIDANCE_CHIPS: "guidanceChips",
            GUNNER: "gunner",
            GUNNERY_TEAM: "gunneryTeam",
            HAN_SOLO: "hanSolo",
            HEAVY_LASER_CANNON: "heavyLaserCannon",
            HEAVY_SCYK_INTERCEPTOR: "heavyScykInterceptor",
            HERA_SYNDULLA: "heraSyndulla",
            HOMING_MISSILES: "homingMissiles",
            HOT_SHOT_BLASTER: "hotShotBlaster",
            HOUNDS_TOOTH: "houndsTooth",
            HULL_UPGRADE: "hullUpgrade",
            IG_2000: "ig2000",
            IMPETUOUS: "impetuous",
            INERTIAL_DAMPENERS: "inertialDampeners",
            INSTIGATOR: "instigator",
            INTEGRATED_ASTROMECH: "integratedAstromech",
            INTELLIGENCE_AGENT: "intelligenceAgent",
            INTIMIDATION: "intimidation",
            ION_BOMBS: "ionBombs",
            ION_CANNON: "ionCannon",
            ION_CANNON_BATTERY: "ionCannonBattery",
            ION_CANNON_TURRET: "ionCannonTurret",
            IONIZATION_REACTOR: "ionizationReactor",
            ION_PROJECTOR: "ionProjector",
            ION_PULSE_MISSILES: "ionPulseMissiles",
            ION_TORPEDOES: "ionTorpedoes",
            JAINAS_LIGHT: "jainasLight",
            JAN_DODONNA: "janDodonna",
            JAN_ORS: "janOrs",
            JUKE: "juke",
            K4_SECURITY_DROID: "k4SecurityDroid",
            KANAN_JARRUS: "kananJarrus",
            KYLE_KATARN: "kyleKatarn",
            LANDO_CALRISSIAN: "landoCalrissian",
            LEEBO: "leebo",
            LEIA_ORGANA: "leiaOrgana",
            LIGHTNING_REFLEXES: "lightningReflexes",
            LONE_WOLF: "loneWolf",
            LUKE_SKYWALKER: "lukeSkywalker",
            MANEUVERING_FINS: "maneuveringFins",
            MANGLER_CANNON: "manglerCannon",
            MARA_JADE: "maraJade",
            MARKSMANSHIP: "marksmanship",
            MERCENARY_COPILOT: "mercenaryCopilot",
            MILLENNIUM_FALCON: "millenniumFalcon",
            MIST_HUNTER: "mistHunter",
            MOFF_JERJERROD: "moffJerjerrod",
            MOLDY_CROW: "moldyCrow",
            MUNITIONS_FAILSAFE: "munitionsFailsafe",
            NAVIGATOR: "navigator",
            NIEN_NUNB: "nienNunb",
            OPPORTUNIST: "opportunist",
            OPTIMIZED_GENERATORS: "optimizedGenerators",
            ORDNANCE_EXPERTS: "ordnanceExperts",
            ORDNANCE_TUBES: "ordnanceTubes",
            OUTLAW_TECH: "outlawTech",
            OUTMANEUVER: "outmaneuver",
            OUTRIDER: "outrider",
            OVERCLOCKED_R4: "overclockedR4",
            PHANTOM: "phantom",
            PLASMA_TORPEDOES: "plasmaTorpedoes",
            PREDATOR: "predator",
            PROTON_BOMBS: "protonBombs",
            PROTON_ROCKETS: "protonRockets",
            PROTON_TORPEDOES: "protonTorpedoes",
            PROXIMITY_MINES: "proximityMines",
            PUNISHING_ONE: "punishingOne",
            PUSH_THE_LIMIT: "pushTheLimit",
            QUAD_LASER_CANNONS: "quadLaserCannons",
            QUANTUM_STORM: "quantumStorm",
            R2_ASTROMECH: "r2Astromech",
            R2_D2: "r2D2",
            R2_D2_CREW: "r2D2Crew",
            R2_D6: "r2D6",
            R2_F2: "r2F2",
            R3_A2: "r3A2",
            R4_AGROMECH: "r4Agromech",
            R4_B11: "r4B11",
            R4_D6: "r4D6",
            R5_ASTROMECH: "r5Astromech",
            R5_D8: "r5D8",
            R5_K6: "r5K6",
            R5_P8: "r5P8",
            R5_P9: "r5P9",
            R5_X3: "r5x3",
            R7_ASTROMECH: "r7Astromech",
            R7_T1: "r7T1",
            RAGE: "rage",
            RAYMUS_ANTILLES: "raymusAntilles",
            REAR_ADMIRAL_CHIRANEAU: "rearAdmiralChiraneau",
            REBEL_CAPTIVE: "rebelCaptive",
            RECON_SPECIALIST: "reconSpecialist",
            REINFORCED_DEFLECTORS: "reinforcedDeflectors",
            REQUIEM: "requiem",
            ROYAL_GUARD_TIE: "royalGuardTie",
            RUTHLESSNESS: "ruthlessness",
            SABINE_WREN: "sabineWren",
            SABOTEUR: "saboteur",
            SALVAGED_ASTROMECH: "salvagedAstromech",
            SEISMIC_CHARGES: "seismicCharges",
            SEISMIC_TORPEDO: "seismicTorpedo",
            SENSOR_JAMMER: "sensorJammer",
            SENSOR_TEAM: "sensorTeam",
            SHIELD_PROJECTOR: "shieldProjector",
            SHIELD_TECHNICIAN: "shieldTechnician",
            SHIELD_UPGRADE: "shieldUpgrade",
            SINGLE_TURBOLASERS: "singleTurbolasers",
            SLAVE_I: "slaveI",
            SLICER_TOOLS: "slicerTools",
            SQUAD_LEADER: "squadLeader",
            ST_321: "st321",
            STAY_ON_TARGET: "stayOnTarget",
            STEALTH_DEVICE: "stealthDevice",
            STYGIUM_PARTICLE_ACCELERATOR: "stygiumParticleAccelerator",
            SUPPRESSOR: "suppressor",
            SWARM_TACTICS: "swarmTactics",
            TACTICIAN: "tactician",
            TACTICAL_JAMMER: "tacticalJammer",
            TANTIVE_IV: "tantiveIv",
            TARGETING_ASTROMECH: "targetingAstromech",
            TARGETING_COMPUTER: "targetingComputer",
            TARGETING_COORDINATOR: "targetingCoordinator",
            THERMAL_DETONATORS: "thermalDetonators",
            TIBANNA_GAS_SUPPLIES: "tibannaGasSupplies",
            TIE_V1: "tieV1",
            TIE_X1: "tieX1",
            TIE_X7: "tieX7",
            TORYN_FARR: "torynFarr",
            TRACTOR_BEAM: "tractorBeam",
            TWIN_ION_ENGINE_MK_II: "twinIonEngineMkII",
            TWIN_LASER_TURRET: "twinLaserTurret",
            UNHINGED_ASTROMECH: "unhingedAstromech",
            VECTOR: "vector",
            VETERAN_INSTINCTS: "veteranInstincts",
            VIRAGO: "virago",
            WEAPONS_ENGINEER: "weaponsEngineer",
            WEAPONS_GUIDANCE: "weaponsGuidance",
            WED_15_REPAIR_DROID: "wed15RepairDroid",
            WINGMAN: "wingman",
            WIRED: "wired",
            XX_23_S_THREAD_TRACERS: "xx23SThreadTracers",
            YSANNE_ISARD: "ysanneIsard",
            ZEB_ORRELIOS: "zebOrrelios",
            ZUCKUSS: "zuckuss",

            properties:
            {
                "aWingTestPilot":
                {
                    name: "A-Wing Test Pilot",
                    type: UpgradeType.TITLE,
                    restrictions: [UpgradeRestriction.A_WING_ONLY, UpgradeRestriction.PILOT_SKILL_ABOVE_1],
                    description: "Your upgrade bar gains 1 Elite upgrade icon. You cannot equip 2 of the same Elite upgrade cards. You cannot equip this card if your pilot skill value is \"1\" or lower.",
                    squadPointCost: 0,
                    isImplemented: true,
                    value: "aWingTestPilot",
                },
                "accuracyCorrector":
                {
                    name: "Accuracy Corrector",
                    type: UpgradeType.SYSTEM,
                    description: "When attacking, you may cancel all of your dice results. Then, you may add 2 Hit results to your roll. Your dice cannot be modified again during this attack.",
                    squadPointCost: 3,
                    value: "accuracyCorrector",
                },
                "adaptability":
                {
                    name: "Adaptability",
                    type: UpgradeType.ELITE,
                    description: "Increase your pilot skill value by 1. / Decrease your pilot skill value by 1.",
                    squadPointCost: 0,
                    value: "adaptability",
                },
                "admiralOzzel":
                {
                    name: "Admiral Ozzel",
                    type: UpgradeType.CREW,
                    isUnique: true,
                    restrictions: [UpgradeRestriction.HUGE_SHIP_ONLY, UpgradeRestriction.IMPERIAL_ONLY],
                    header: UpgradeHeader.ENERGY,
                    description: "You may remove up to 3 shields from your ship. For each shield removed, gain 1 energy.",
                    squadPointCost: 2,
                    value: "admiralOzzel",
                },
                "adrenalineRush":
                {
                    name: "Adrenaline Rush",
                    type: UpgradeType.ELITE,
                    description: "When you reveal a red maneuver, you may discard this card to treat that maneuver as a white maneuver until the end of the Activation phase.",
                    squadPointCost: 1,
                    value: "adrenalineRush",
                },
                "advancedCloakingDevice":
                {
                    name: "Advanced Cloaking Device",
                    type: UpgradeType.MODIFICATION,
                    restrictions: [UpgradeRestriction.TIE_PHANTOM_ONLY],
                    description: "After you perform an attack, you may perform a free cloak action.",
                    squadPointCost: 4,
                    value: "advancedCloakingDevice",
                },
                "advancedHomingMissiles":
                {
                    name: "Advanced Homing Missiles",
                    type: UpgradeType.MISSILE,
                    header: UpgradeHeader.ATTACK_TARGET_LOCK,
                    weaponValue: 3,
                    ranges: [RangeRuler.TWO],
                    firingArcKey: FiringArc.FORWARD,
                    description: "Discard this card to perform this attack. If this attack hits, deal 1 faceup Damage card to the defender. Then cancel all dice results.",
                    discardThisCard: true,
                    cancelAllDiceResults: true,
                    squadPointCost: 3,
                    isImplemented: true,
                    value: "advancedHomingMissiles",
                },
                "advancedProtonTorpedoes":
                {
                    name: "Advanced Proton Torpedoes",
                    type: UpgradeType.TORPEDO,
                    header: UpgradeHeader.ATTACK_TARGET_LOCK,
                    weaponValue: 5,
                    ranges: [RangeRuler.ONE],
                    firingArcKey: FiringArc.FORWARD,
                    description: "Spend your Target Lock and discard this card to perform this attack. You may change up to 3 of your blank results to Focus results.",
                    spendTargetLock: true,
                    discardThisCard: true,
                    squadPointCost: 6,
                    isImplemented: true,
                    value: "advancedProtonTorpedoes",
                },
                "advancedSensors":
                {
                    name: "Advanced Sensors",
                    type: UpgradeType.SYSTEM,
                    description: "Immediately before you reveal your maneuver, you may perform 1 free action. If you use this ability, you must skip your \"Perform Action\" step during this round.",
                    squadPointCost: 3,
                    value: "advancedSensors",
                },
                "advancedSlam":
                {
                    name: "Advanced SLAM",
                    type: UpgradeType.MODIFICATION,
                    description: "After performing a SLAM action, if you did not overlap an obstacle or another ship, you may perform a free action.",
                    squadPointCost: 2,
                    value: "advancedSlam",
                },
                "advancedTargetingComputer":
                {
                    name: "Advanced Targeting Computer",
                    type: UpgradeType.SYSTEM,
                    restrictions: [UpgradeRestriction.TIE_ADVANCED_ONLY],
                    description: "When attacking with your primary weapon, if you have a Target Lock on the defender, you may add 1 critical result to your roll. If you do, you cannot spend Target Locks during this attack.",
                    squadPointCost: 5,
                    value: "advancedTargetingComputer",
                },
                "agentKallus":
                {
                    name: "Agent Kallus",
                    type: UpgradeType.CREW,
                    isUnique: true,
                    restrictions: [UpgradeRestriction.IMPERIAL_ONLY],
                    description: "At the start of the first round, choose 1 enemy small or large ship. When attacking or defending against that ship, you may change 1 of your focus results to a hit or evade result.",
                    squadPointCost: 2,
                    value: "agentKallus",
                },
                "andrasta":
                {
                    name: "Andrasta",
                    type: UpgradeType.TITLE,
                    isUnique: true,
                    restrictions: [UpgradeRestriction.FIRESPRAY_31_ONLY],
                    description: "Your upgrade bar gains two additional Bomb upgrade icons.",
                    squadPointCost: 0,
                    isImplemented: true,
                    value: "andrasta",
                },
                "antiPursuitLasers":
                {
                    name: "Anti-Pursuit Lasers",
                    type: UpgradeType.MODIFICATION,
                    restrictions: [UpgradeRestriction.LARGE_SHIP_ONLY],
                    description: "After an enemy ship executes a maneuver that causes it to overlap your ship, roll 1 attack die. On a Hit or Critical Hit result, the enemy ship suffers 1 damage.",
                    squadPointCost: 2,
                    value: "antiPursuitLasers",
                },
                "assailer":
                {
                    name: "Assailer",
                    type: UpgradeType.TITLE,
                    isUnique: true,
                    restrictions: [UpgradeRestriction.RAIDER_CLASS_CORVETTE_AFT_SECTION_ONLY],
                    description: "When defending, if the target section has a reinforce token you may change 1 focus result to a evade result.",
                    squadPointCost: 2,
                    value: "assailer",
                },
                "assaultMissiles":
                {
                    name: "Assault Missiles",
                    type: UpgradeType.MISSILE,
                    header: UpgradeHeader.ATTACK_TARGET_LOCK,
                    weaponValue: 4,
                    ranges: [RangeRuler.TWO, RangeRuler.THREE],
                    firingArcKey: FiringArc.FORWARD,
                    description: "Spend your Target Lock and discard this card to perform this attack. If this attack hits, each other ship at Range 1 of the defender suffers 1 damage.",
                    spendTargetLock: true,
                    discardThisCard: true,
                    squadPointCost: 5,
                    isImplemented: true,
                    value: "assaultMissiles",
                },
                "attanniMindlink":
                {
                    name: "Attanni Mindlink",
                    type: UpgradeType.ELITE,
                    restrictions: [UpgradeRestriction.SCUM_ONLY],
                    description: "Each time you are assigned a focus or stress token, each other friendly ship with Attanni Mindlink must also be assigned the same type of token if it does not already have one.",
                    squadPointCost: 1,
                    value: "attanniMindlink",
                },
                "autoblaster":
                {
                    name: "Autoblaster",
                    type: UpgradeType.CANNON,
                    header: UpgradeHeader.ATTACK,
                    weaponValue: 3,
                    ranges: [RangeRuler.ONE],
                    firingArcKey: FiringArc.FORWARD,
                    description: "Attack 1 ship. Your Hit results cannot be canceled by defense dice. The defender may cancel Critical Hit results before Hit results.",
                    squadPointCost: 5,
                    value: "autoblaster",
                },
                "autoblasterTurret":
                {
                    name: "Autoblaster Turret",
                    type: UpgradeType.TURRET,
                    header: UpgradeHeader.ATTACK,
                    weaponValue: 2,
                    ranges: [RangeRuler.ONE],
                    firingArcKey: FiringArc.FORWARD,
                    isWeaponTurret: true,
                    description: "Attack 1 ship (even a ship outside your firing arc). Your Hit results cannot be canceled by defense dice. The defender may cancel Critical Hit results before Hit results.",
                    squadPointCost: 2,
                    value: "autoblasterTurret",
                },
                "automatedProtocols":
                {
                    name: "Automated Protocols",
                    type: UpgradeType.MODIFICATION,
                    restrictions: [UpgradeRestriction.HUGE_SHIP_ONLY],
                    description: "Once per round, after you perform an action that is not a recover or reinforce action, you may spend 1 energy to perform a free recover or reinforce action.",
                    squadPointCost: 5,
                    value: "automatedProtocols",
                },
                "autothrusters":
                {
                    name: "Autothrusters",
                    type: UpgradeType.MODIFICATION,
                    description: "When defending, if you are beyond Range 2 or outside the attacker's firing arc, you may change 1 of your blank results to an Evade result. You can equip this card only if you have the Boost action icon.",
                    squadPointCost: 2,
                    isImplemented: true,
                    value: "autothrusters",
                },
                "backupShieldGenerator":
                {
                    name: "Backup Shield Generator",
                    type: UpgradeType.CARGO,
                    restrictions: [UpgradeRestriction.LIMITED],
                    description: "At the end of each round, you may spend 1 energy to recover 1 shield (up to your shield value).",
                    squadPointCost: 3,
                    value: "backupShieldGenerator",
                },
                "bb8":
                {
                    name: "BB-8",
                    type: UpgradeType.ASTROMECH,
                    isUnique: true,
                    description: "When you reveal a green maneuver, you may perform a free barrel roll action.",
                    squadPointCost: 2,
                    value: "bb8",
                },
                "blasterTurret":
                {
                    name: "Blaster Turret",
                    type: UpgradeType.TURRET,
                    header: UpgradeHeader.ATTACK_FOCUS,
                    weaponValue: 3,
                    ranges: [RangeRuler.ONE, RangeRuler.TWO],
                    firingArcKey: FiringArc.FORWARD,
                    isWeaponTurret: true,
                    description: "Spend 1 Focus token to perform this attack against 1 ship (even a ship outside your firing arc).",
                    spendFocus: true,
                    squadPointCost: 4,
                    isImplemented: true,
                    value: "blasterTurret",
                },
                "bobaFett":
                {
                    name: "Boba Fett",
                    type: UpgradeType.CREW,
                    isUnique: true,
                    restrictions: [UpgradeRestriction.SCUM_ONLY],
                    description: "After performing an attack, if the defender was dealt a faceup Damage card, you may discard this card to choose and discard 1 of the defender's Upgrade cards.",
                    squadPointCost: 1,
                    value: "bobaFett",
                },
                "bodyguard":
                {
                    name: "Bodyguard",
                    type: UpgradeType.ELITE,
                    isUnique: true,
                    restrictions: [UpgradeRestriction.SCUM_ONLY],
                    description: "At the start of the Combat phase, you may spend a Focus token to choose a friendly ship at Range 1 with higher pilot skill than you. Increase its agility value by 1 until the end of the round.",
                    squadPointCost: 2,
                    value: "bodyguard",
                },
                "bombLoadout":
                {
                    name: "Bomb Loadout",
                    type: UpgradeType.TORPEDO,
                    restrictions: [UpgradeRestriction.Y_WING_ONLY, UpgradeRestriction.LIMITED],
                    description: "Your upgrade bar gains the Bomb icon.",
                    squadPointCost: 0,
                    isImplemented: true,
                    value: "bombLoadout",
                },
                "bombardier":
                {
                    name: "Bombardier",
                    type: UpgradeType.CREW,
                    description: "When dropping a bomb, you may use the Straight 2 template instead of the Straight 1 template.",
                    squadPointCost: 1,
                    value: "bombardier",
                },
                "bossk":
                {
                    name: "Bossk",
                    type: UpgradeType.CREW,
                    restrictions: [UpgradeRestriction.SCUM_ONLY],
                    description: "After you perform an attack that does not hit, if you are not stressed, you must receive 1 Stress token. Then assign 1 Focus token to your ship and acquire a Target Lock on the defender.",
                    squadPointCost: 2,
                    isImplemented: true,
                    value: "bossk",
                },
                "brightHope":
                {
                    name: "Bright Hope",
                    type: UpgradeType.TITLE,
                    isUnique: true,
                    restrictions: [UpgradeRestriction.GR_75_ONLY],
                    description: "A reinforce token assigned to your fore section adds 2 evade results (instead of 1).",
                    energyValue: 2,
                    squadPointCost: 5,
                    value: "brightHope",
                },
                "broadcastArray":
                {
                    name: "Broadcast Array",
                    type: UpgradeType.CARGO,
                    restrictions: [UpgradeRestriction.GOZANTI_CLASS_CRUISER_ONLY],
                    description: "Your action bar gains the Jam action icon.",
                    squadPointCost: 2,
                    isImplemented: true,
                    value: "broadcastArray",
                },
                "btlA4YWing":
                {
                    name: "BTL-A4 Y-Wing",
                    type: UpgradeType.TITLE,
                    restrictions: [UpgradeRestriction.Y_WING_ONLY],
                    description: "You cannot attack ships outside your firing arc. After you perform a primary weapon attack, you may immediately perform an attack with a Turret secondary weapon.",
                    squadPointCost: 0,
                    value: "btlA4YWing",
                },
                "bWingE2":
                {
                    name: "B-Wing/E2",
                    type: UpgradeType.MODIFICATION,
                    restrictions: [UpgradeRestriction.B_WING_ONLY],
                    description: "Your upgrade bar gains the Crew Member upgrade icon.",
                    squadPointCost: 1,
                    isImplemented: true,
                    value: "bWingE2",
                },
                "c3po":
                {
                    name: "C-3PO",
                    type: UpgradeType.CREW,
                    isUnique: true,
                    restrictions: [UpgradeRestriction.REBEL_ONLY],
                    description: "Once per round, before you roll 1 or more defense dice, you may guess aloud a number of Evade results. If you roll that many Evade results (before modifying dice), add 1 Evade result.",
                    squadPointCost: 3,
                    value: "c3po",
                },
                "calculation":
                {
                    name: "Calculation",
                    type: UpgradeType.ELITE,
                    description: "When attacking, you may spend a Focus token to change 1 of your Focus results to a Critical Hit result.",
                    agentInput: true,
                    squadPointCost: 1,
                    isImplemented: true,
                    value: "calculation",
                },
                "captainNeeda":
                {
                    name: "Captain Needa",
                    type: UpgradeType.CREW,
                    isUnique: true,
                    restrictions: [UpgradeRestriction.HUGE_SHIP_ONLY, UpgradeRestriction.IMPERIAL_ONLY],
                    description: "If you overlap an obstacle during the Activation Phase, do not suffer 1 faceup damage card. Instead, roll 1 attack die. On a hit or a critical result, suffer 1 damage.",
                    squadPointCost: 2,
                    value: "captainNeeda",
                },
                "carlistRieekan":
                {
                    name: "Carlist Rieekan",
                    type: UpgradeType.CREW,
                    isUnique: true,
                    restrictions: [UpgradeRestriction.HUGE_SHIP_ONLY, UpgradeRestriction.REBEL_ONLY],
                    description: "At the start of the Activation phase, you may discard this card to treat each friendly ship's pilot skill value as \"12\" until the end of the phase.",
                    squadPointCost: 3,
                    value: "carlistRieekan",
                },
                // Effect implemented through squad point cost.
                "chardaanRefit":
                {
                    name: "Chardaan Refit",
                    type: UpgradeType.MISSILE,
                    restrictions: [UpgradeRestriction.A_WING_ONLY],
                    description: "This card has a negative squad point cost.",
                    squadPointCost: -2,
                    isImplemented: true,
                    value: "chardaanRefit",
                },
                "chewbacca":
                {
                    name: "Chewbacca",
                    type: UpgradeType.CREW,
                    isUnique: true,
                    restrictions: [UpgradeRestriction.REBEL_ONLY],
                    description: "When you are dealt a Damage card, you may immediately discard that card and recover 1 shield. Then, discard this Upgrade card.",
                    squadPointCost: 4,
                    value: "chewbacca",
                },
                "chopper":
                {
                    name: "\"Chopper\"",
                    type: UpgradeType.CREW,
                    isUnique: true,
                    restrictions: [UpgradeRestriction.REBEL_ONLY],
                    description: "You may perform actions even while you are stressed. After you perform an action while you are stressed, suffer 1 damage.",
                    squadPointCost: 0,
                    value: "chopper",
                },
                "cloakingDevice":
                {
                    name: "Cloaking Device",
                    type: UpgradeType.ILLICIT,
                    isUnique: true,
                    restrictions: [UpgradeRestriction.SMALL_SHIP_ONLY],
                    header: UpgradeHeader.ACTION,
                    description: "Perform a free cloak action. At the end of each round, if you are cloaked, roll 1 attack die. On a focus result, discard this card, then decloak or discard your cloak token.",
                    squadPointCost: 2,
                    value: "cloakingDevice",
                },
                "clusterBombs":
                {
                    name: "Cluster Bombs",
                    type: UpgradeType.CARGO,
                    description: "After defending, you may discard this card. If you do, each other ship at Range 1 of the defending section rolls 2 attack dice, suffering all damage and critical damage rolled.",
                    squadPointCost: 4,
                    value: "clusterBombs",
                },
                "clusterMines":
                {
                    name: "Cluster Mines",
                    type: UpgradeType.BOMB,
                    header: UpgradeHeader.ACTION,
                    description: "Discard this card to drop 1 cluster mine token set. When a ship's base or maneuver template overlaps a cluster mine token, that token detonates.",
                    squadPointCost: 4,
                    value: "clusterMines",
                },
                "clusterMissiles":
                {
                    name: "Cluster Missiles",
                    type: UpgradeType.MISSILE,
                    header: UpgradeHeader.ATTACK_TARGET_LOCK,
                    weaponValue: 3,
                    ranges: [RangeRuler.ONE, RangeRuler.TWO],
                    firingArcKey: FiringArc.FORWARD,
                    description: "Spend your Target Lock and discard this card to perform this attack twice.",
                    spendTargetLock: true,
                    discardThisCard: true,
                    squadPointCost: 4,
                    isImplemented: true,
                    value: "clusterMissiles",
                },
                "collisionDetector":
                {
                    name: "Collision Detector",
                    type: UpgradeType.SYSTEM,
                    description: "When performing a boost, barrel roll, or decloak, your ship and maneuver template can overlap obstacles. When rolling for obstacle damage, ignore all Critical results.",
                    squadPointCost: 0,
                    value: "collisionDetector",
                },
                "combatRetrofit":
                {
                    name: "Combat Retrofit",
                    type: UpgradeType.MODIFICATION,
                    restrictions: [UpgradeRestriction.GR_75_ONLY, UpgradeRestriction.HUGE_SHIP_ONLY],
                    description: "Increase your hull value by 2 and your shield value by 1.",
                    hullValue: 2,
                    shieldValue: 1,
                    squadPointCost: 10,
                    isImplemented: true,
                    value: "combatRetrofit",
                },
                "commRelay":
                {
                    name: "Comm Relay",
                    type: UpgradeType.TECH,
                    description: "You cannot have more than 1 Evade token. During the End phase, do not remove an unused Evade token from your ship.",
                    squadPointCost: 3,
                    value: "commRelay",
                },
                "commsBooster":
                {
                    name: "Comms Booster",
                    type: UpgradeType.CARGO,
                    header: UpgradeHeader.ENERGY,
                    description: "Spend 1 energy to remove all stress tokens from a friendly ship at Range 1-3. Then assign 1 focus token to that ship.",
                    squadPointCost: 4,
                    value: "commsBooster",
                },
                "concussionMissiles":
                {
                    name: "Concussion Missiles",
                    type: UpgradeType.MISSILE,
                    header: UpgradeHeader.ATTACK_TARGET_LOCK,
                    weaponValue: 4,
                    ranges: [RangeRuler.TWO, RangeRuler.THREE],
                    firingArcKey: FiringArc.FORWARD,
                    description: "Spend your Target Lock and discard this card to perform this attack. You may change 1 of your blank results to a Hit result.",
                    spendTargetLock: true,
                    discardThisCard: true,
                    squadPointCost: 4,
                    isImplemented: true,
                    value: "concussionMissiles",
                },
                "connerNet":
                {
                    name: "Conner Net",
                    type: UpgradeType.BOMB,
                    header: UpgradeHeader.ACTION,
                    description: "Discard this card to drop 1 Conner net token. When a ship's base or maneuver template overlaps this token, this token detonates.",
                    squadPointCost: 4,
                    value: "connerNet",
                },
                "constructionDroid":
                {
                    name: "Construction Droid",
                    type: UpgradeType.CREW,
                    restrictions: [UpgradeRestriction.HUGE_SHIP_ONLY, UpgradeRestriction.LIMITED],
                    description: "When you perform a recover action, you may spend 1 energy to discard 1 facedown Damage card.",
                    squadPointCost: 3,
                    value: "constructionDroid",
                },
                "coolHand":
                {
                    name: "Cool Hand",
                    type: UpgradeType.ELITE,
                    description: "When you receive a stress token, you may discard this card to assign 1 focus or evade token to your ship.",
                    squadPointCost: 1,
                    value: "coolHand",
                },
                "countermeasures":
                {
                    name: "Countermeasures",
                    type: UpgradeType.MODIFICATION,
                    restrictions: [UpgradeRestriction.LARGE_SHIP_ONLY],
                    description: "At the start of the Combat phase, you may discard this card to increase your agility value by 1 until the end of the round. Then you may remove 1 enemy Target Lock from your ship.",
                    squadPointCost: 3,
                    value: "countermeasures",
                },
                "crackShot":
                {
                    name: "Crack Shot",
                    type: UpgradeType.ELITE,
                    description: "When attacking a ship inside your firing arc, you may discard this card to cancel 1 of the defender's Evade results.",
                    squadPointCost: 1,
                    value: "crackShot",
                },
                "daredevil":
                {
                    name: "Daredevil",
                    type: UpgradeType.ELITE,
                    header: UpgradeHeader.ACTION,
                    description: "Execute a white Turn Left 1 or Turn Right 1 maneuver. Then, receive 1 stress token. Then, if you do not have the Boost action icon, roll 2 attack dice. Suffer any Damage and Critical Damage rolled.",
                    squadPointCost: 3,
                    value: "daredevil",
                },
                "darthVader":
                {
                    name: "Darth Vader",
                    type: UpgradeType.CREW,
                    isUnique: true,
                    restrictions: [UpgradeRestriction.IMPERIAL_ONLY],
                    description: "After you perform an attack against an enemy ship, you may suffer 2 damage to cause that ship to suffer 1 critical damage.",
                    squadPointCost: 3,
                    value: "darthVader",
                },
                "dashRendar":
                {
                    name: "Dash Rendar",
                    type: UpgradeType.CREW,
                    isUnique: true,
                    restrictions: [UpgradeRestriction.REBEL_ONLY],
                    description: "You may perform attacks while overlapping an obstacle. Your attacks cannot be obstructed.",
                    squadPointCost: 2,
                    value: "dashRendar",
                },
                "dauntless":
                {
                    name: "Dauntless",
                    type: UpgradeType.TITLE,
                    isUnique: true,
                    restrictions: [UpgradeRestriction.VT_49_DECIMATOR_ONLY],
                    description: "After you execute a maneuver that causes you to overlap another ship, you may perform 1 free action. Then receive 1 stress token.",
                    squadPointCost: 2,
                    value: "dauntless",
                },
                "deadMansSwitch":
                {
                    name: "Dead Man's Switch",
                    type: UpgradeType.ILLICIT,
                    description: "When you are destroyed, each ship at Range 1 suffers 1 damage.",
                    squadPointCost: 2,
                    isImplemented: true,
                    value: "deadMansSwitch",
                },
                "deadeye":
                {
                    name: "Deadeye",
                    type: UpgradeType.ELITE,
                    description: "You may treat the \"Attack [Target Lock]:\" header as \"Attack [Focus]:.\" When an attack instructs you to spend a Target Lock, you may spend a Focus token instead.",
                    squadPointCost: 1,
                    value: "deadeye",
                },
                "decoy":
                {
                    name: "Decoy",
                    type: UpgradeType.ELITE,
                    description: "At the start of the Combat phase, you may choose 1 friendly ship at Range 1-2. Exchange your pilot skill with that ship's pilot skill until the end of the phase.",
                    squadPointCost: 2,
                    value: "decoy",
                },
                "dengar":
                {
                    name: "Dengar",
                    type: UpgradeType.CREW,
                    isUnique: true,
                    restrictions: [UpgradeRestriction.SCUM_ONLY],
                    description: "When attacking, you may reroll 1 attack die. If the defender is a unique pilot, you may instead reroll up to 2 attack dice.",
                    squadPointCost: 3,
                    isImplemented: true,
                    value: "dengar",
                },
                "determination":
                {
                    name: "Determination",
                    type: UpgradeType.ELITE,
                    description: "When you are dealt a faceup Damage card with the Pilot trait, discard it immediately without resolving its effect.",
                    squadPointCost: 1,
                    isImplemented: true,
                    value: "determination",
                },
                "dockingClamps":
                {
                    name: "Docking Clamps",
                    type: UpgradeType.CARGO,
                    restrictions: [UpgradeRestriction.GOZANTI_CLASS_CRUISER_ONLY, UpgradeRestriction.LIMITED],
                    description: "You may dock up to 4 TIE fighters, TIE Interceptors, TIE bombers, or TIE Advanced to this ship. All of these ships must have the same ship type.",
                    squadPointCost: 0,
                    value: "dockingClamps",
                },
                "dodonnasPride":
                {
                    name: "Dodonna's Pride",
                    type: UpgradeType.TITLE,
                    isUnique: true,
                    restrictions: [UpgradeRestriction.CR90_ONLY],
                    description: "When you perform a coordinate action, you may choose 2 friendly ships (instead of 1). Those ships may each perform 1 free action.",
                    squadPointCost: 4,
                    value: "dodonnasPride",
                },
                "dorsalTurret":
                {
                    name: "Dorsal Turret",
                    type: UpgradeType.TURRET,
                    header: UpgradeHeader.ATTACK,
                    weaponValue: 2,
                    ranges: [RangeRuler.ONE, RangeRuler.TWO],
                    firingArcKey: FiringArc.FORWARD,
                    isWeaponTurret: true,
                    description: "Attack 1 ship (even a ship outside your firing arc). If the target of this attack is at Range 1, roll 1 additional attack die.",
                    squadPointCost: 3,
                    isImplemented: true,
                    value: "dorsalTurret",
                },
                "drawTheirFire":
                {
                    name: "Draw Their Fire",
                    type: UpgradeType.ELITE,
                    description: "When a friendly ship at Range 1 is hit by an attack, you may suffer 1 of the uncanceled Critical Hit results instead of the target ship.",
                    squadPointCost: 1,
                    value: "drawTheirFire",
                },
                "dualLaserTurret":
                {
                    name: "Dual Laser Turret",
                    type: UpgradeType.HARDPOINT,
                    restrictions: [UpgradeRestriction.GOZANTI_CLASS_CRUISER_ONLY],
                    header: UpgradeHeader.ATTACK_ENERGY,
                    energyLimit: 1,
                    weaponValue: 3,
                    ranges: RangeRuler.STANDARD_RANGES,
                    firingArcKey: FiringArc.FORWARD,
                    isWeaponTurret: true,
                    description: "Spend 1 energy from this card to perform this attack against 1 ship (even a ship outside of your firing arc).",
                    squadPointCost: 5,
                    value: "dualLaserTurret",
                },
                "dutyfree":
                {
                    name: "Dutyfree",
                    type: UpgradeType.TITLE,
                    isUnique: true,
                    restrictions: [UpgradeRestriction.GR_75_ONLY],
                    description: "When performing a jam action, you may choose an enemy ship at Range 1-3 (instead of at Range 1-2).",
                    energyValue: 0,
                    squadPointCost: 2,
                    value: "dutyfree",
                },
                "electronicBaffle":
                {
                    name: "Electronic Baffle",
                    type: UpgradeType.SYSTEM,
                    description: "When you receive a stress token or an ion token, you may suffer 1 damage to discard that token.",
                    squadPointCost: 1,
                    value: "electronicBaffle",
                },
                "elusiveness":
                {
                    name: "Elusiveness",
                    type: UpgradeType.ELITE,
                    description: "When defending, you may receive 1 stress token to choose 1 attack die. The attacker must reroll that die. If you have at least 1 stress token, you cannot use this ability.",
                    squadPointCost: 2,
                    value: "elusiveness",
                },
                "emEmitter":
                {
                    name: "EM Emitter",
                    type: UpgradeType.CARGO,
                    restrictions: [UpgradeRestriction.LIMITED],
                    description: "When you obstruct an attack, the defender rolls 3 additional defense dice (instead of 1).",
                    squadPointCost: 3,
                    value: "emEmitter",
                },
                "emperorPalpatine":
                {
                    name: "Emperor Palpatine",
                    type: UpgradeType.CREW,
                    isUnique: true,
                    restrictions: [UpgradeRestriction.IMPERIAL_ONLY],
                    description: "Once per round, you may change a friendly ship's die result to any other die result. That die result cannot be modified again.",
                    squadPointCost: 8,
                    value: "emperorPalpatine",
                },
                "engineBooster":
                {
                    name: "Engine Booster",
                    type: UpgradeType.CARGO,
                    restrictions: [UpgradeRestriction.LIMITED],
                    description: "Immediately before you reveal your maneuver dial, you may spend 1 energy to execute a white [Straight 1] maneuver. You cannot use this ability if you would overlap another ship.",
                    squadPointCost: 3,
                    value: "engineBooster",
                },
                "engineUpgrade":
                {
                    name: "Engine Upgrade",
                    type: UpgradeType.MODIFICATION,
                    description: "Your action bar gains the Boost action icon.",
                    squadPointCost: 4,
                    isImplemented: true,
                    value: "engineUpgrade",
                },
                "engineeringTeam":
                {
                    name: "Engineering Team",
                    type: UpgradeType.TEAM,
                    restrictions: [UpgradeRestriction.LIMITED],
                    description: "During the Activation phase, when you reveal a Straight maneuver, gain 1 additional energy during the \"Gain Energy\" step.",
                    squadPointCost: 4,
                    value: "engineeringTeam",
                },
                "enhancedScopes":
                {
                    name: "Enhanced Scopes",
                    type: UpgradeType.SYSTEM,
                    description: "During the Activation phase, treat your pilot skill value as \"0.\"",
                    squadPointCost: 1,
                    value: "enhancedScopes",
                },
                "expandedCargoHold":
                {
                    name: "Expanded Cargo Hold",
                    type: UpgradeType.CARGO,
                    isUnique: true,
                    restrictions: [UpgradeRestriction.GR_75_ONLY],
                    description: "Once per round, when you would be dealt a faceup Damage card, you may draw that card from either the fore or aft Damage deck.",
                    squadPointCost: 1,
                    value: "expandedCargoHold",
                },
                "experimentalInterface":
                {
                    name: "Experimental Interface",
                    type: UpgradeType.MODIFICATION,
                    header: UpgradeHeader.ACTION,
                    description: "Once per round, after you perform an action, you may perform 1 free action from an equipped Upgrade card with the \"Action:\" header. Then receive 1 stress token.",
                    squadPointCost: 3,
                    value: "experimentalInterface",
                },
                "expertHandling":
                {
                    name: "Expert Handling",
                    type: UpgradeType.ELITE,
                    header: UpgradeHeader.ACTION,
                    description: "Perform a free barrel roll action. If you do not have the Barrel Roll action icon, receive 1 stress token. You may then remove 1 enemy Target Lock from your ship.",
                    squadPointCost: 2,
                    value: "expertHandling",
                },
                "expose":
                {
                    name: "Expose",
                    type: UpgradeType.ELITE,
                    header: UpgradeHeader.ACTION,
                    description: "Until the end of the round, increase your primary weapon value by 1 and decrease your agility value by 1.",
                    squadPointCost: 4,
                    value: "expose",
                },
                "extraMunitions":
                {
                    name: "Extra Munitions",
                    type: UpgradeType.TORPEDO,
                    restrictions: [UpgradeRestriction.LIMITED],
                    description: "When you equip this card, place 1 ordnance token on each equipped Torpedo, Missile, and Bomb Upgrade card. When you are instructed to discard an Upgrade card, you may discard 1 ordnance token on that card instead.",
                    squadPointCost: 2,
                    value: "extraMunitions",
                },
                "ezraBridger":
                {
                    name: "Ezra Bridger",
                    type: UpgradeType.CREW,
                    isUnique: true,
                    restrictions: [UpgradeRestriction.REBEL_ONLY],
                    description: "When attacking, if you are stressed, you may change 1 of your Focus results to a Critical Hit result.",
                    squadPointCost: 3,
                    isImplemented: true,
                    value: "ezraBridger",
                },
                "feedbackArray":
                {
                    name: "Feedback Array",
                    type: UpgradeType.ILLICIT,
                    description: "During the Combat phase, instead of performing any attacks, you may receive 1 ion token and suffer 1 damage to choose 1 enemy ship at Range 1. That ship suffers 1 damage.",
                    squadPointCost: 2,
                    value: "feedbackArray",
                },
                "fireControlSystem":
                {
                    name: "Fire Control System",
                    type: UpgradeType.SYSTEM,
                    description: "After you perform an attack, you may acquire a Target Lock on the defender.",
                    squadPointCost: 2,
                    value: "fireControlSystem",
                },
                "flechetteCannon":
                {
                    name: "Flechette Cannon",
                    type: UpgradeType.CANNON,
                    header: UpgradeHeader.ATTACK,
                    weaponValue: 3,
                    ranges: RangeRuler.STANDARD_RANGES,
                    firingArcKey: FiringArc.FORWARD,
                    description: "Attack 1 ship. If this attack hits, the defender suffers 1 damage and, if the defender is not stressed, it also receives 1 stress token. Then cancel all dice results.",
                    cancelAllDiceResults: true,
                    squadPointCost: 2,
                    isImplemented: true,
                    value: "flechetteCannon",
                },
                "flechetteTorpedoes":
                {
                    name: "Flechette Torpedoes",
                    type: UpgradeType.TORPEDO,
                    header: UpgradeHeader.ATTACK_TARGET_LOCK,
                    weaponValue: 3,
                    ranges: [RangeRuler.TWO, RangeRuler.THREE],
                    firingArcKey: FiringArc.FORWARD,
                    description: "Discard this card and spend your Target Lock to perform this attack. After you perform this attack, the defender receives 1 stress token if its hull value is \"4\" or lower.",
                    spendTargetLock: true,
                    discardThisCard: true,
                    squadPointCost: 2,
                    isImplemented: true,
                    value: "flechetteTorpedoes",
                },
                "fleetOfficer":
                {
                    name: "Fleet Officer",
                    type: UpgradeType.CREW,
                    restrictions: [UpgradeRestriction.IMPERIAL_ONLY],
                    header: UpgradeHeader.ACTION,
                    description: "Choose up to 2 friendly ships at Range 1-2 and assign 1 Focus token to each of those ships. Then receive 1 stress token.",
                    squadPointCost: 3,
                    value: "fleetOfficer",
                },
                "flightInstructor":
                {
                    name: "Flight Instructor",
                    type: UpgradeType.CREW,
                    description: "When defending, you may reroll 1 of your Focus results. If the attacker's pilot skill value is \"2\" or lower, you may reroll 1 of your blank results instead.",
                    squadPointCost: 4,
                    isImplemented: true,
                    value: "flightInstructor",
                },
                "fourLom":
                {
                    name: "4-LOM",
                    type: UpgradeType.CREW,
                    isUnique: true,
                    restrictions: [UpgradeRestriction.SCUM_ONLY],
                    description: "When attacking, during the \"Modify Attack Dice\" step, you may receive 1 ion token to choose 1 of the defender's focus or evade tokens. That token cannot be spent during this attack.",
                    squadPointCost: 1,
                    value: "fourLom",
                },
                "frequencyJammer":
                {
                    name: "Frequency Jammer",
                    type: UpgradeType.CARGO,
                    restrictions: [UpgradeRestriction.LIMITED],
                    description: "When you perform a jam action, choose 1 enemy ship that does not have a stress token and is at Range 1 of the jammed ship. The chosen ship receives 1 stress token.",
                    squadPointCost: 4,
                    value: "frequencyJammer",
                },
                "genius":
                {
                    name: "\"Genius\"",
                    type: UpgradeType.SALVAGED_ASTROMECH,
                    isUnique: true,
                    description: "If you are equipped with a bomb that can be dropped before you reveal your maneuver, you may drop the bomb after you execute your maneuver instead.",
                    squadPointCost: 0,
                    value: "genius",
                },
                "ghost":
                {
                    name: "Ghost",
                    type: UpgradeType.TITLE,
                    isUnique: true,
                    restrictions: [UpgradeRestriction.VCX_100_ONLY],
                    description: "Equip the Phantom title card to a friendly Attack Shuttle and dock it to this ship. After you execute a maneuver, you may deploy it from your rear guides.",
                    squadPointCost: 0,
                    value: "ghost",
                },
                "glitterstim":
                {
                    name: "Glitterstim",
                    type: UpgradeType.ILLICIT,
                    description: "At the start of the Combat phase, you may discard this card and receive 1 stress token. If you do, until the end of the round, when attacking or defending, you may change all of your Focus results to Hit or Evade results.",
                    squadPointCost: 2,
                    value: "glitterstim",
                },
                "gonk":
                {
                    name: "\"Gonk\"",
                    type: UpgradeType.CREW,
                    isUnique: true,
                    restrictions: [UpgradeRestriction.SCUM_ONLY],
                    header: UpgradeHeader.ACTION,
                    description: "Place 1 shield token on this card. OR Remove 1 shield token from this card to recover 1 shield (up to your shield value).",
                    squadPointCost: 2,
                    value: "gonk",
                },
                "grandMoffTarkin":
                {
                    name: "Grand Moff Tarkin",
                    type: UpgradeType.CREW,
                    isUnique: true,
                    restrictions: [UpgradeRestriction.HUGE_SHIP_ONLY, UpgradeRestriction.IMPERIAL_ONLY],
                    description: "At the start of the Combat Phase, you may choose another ship at Range 1-4. Either remove 1 focus token from the chosen ship or assign 1 focus token to that ship.",
                    squadPointCost: 6,
                    value: "grandMoffTarkin",
                },
                "greedo":
                {
                    name: "Greedo",
                    type: UpgradeType.CREW,
                    isUnique: true,
                    restrictions: [UpgradeRestriction.SCUM_ONLY],
                    description: "The first time you attack each round and the first time you defend each round, the first Damage card dealt is dealt faceup.",
                    squadPointCost: 0,
                    value: "greedo",
                },
                "guidanceChips":
                {
                    name: "Guidance Chips",
                    type: UpgradeType.MODIFICATION,
                    description: "Once per round, when attacking with a Torpedo or Missile secondary weapon, you may change 1 die result to a Hit result (or a Critical result if your primary weapon value is \"3\" or higher).",
                    squadPointCost: 0,
                    value: "guidanceChips",
                },
                "gunner":
                {
                    name: "Gunner",
                    type: UpgradeType.CREW,
                    description: "After you perform an attack that does not hit, you may immediately perform a primary weapon attack. You cannot perform another attack this round.",
                    squadPointCost: 5,
                    value: "gunner",
                },
                "gunneryTeam":
                {
                    name: "Gunnery Team",
                    type: UpgradeType.TEAM,
                    restrictions: [UpgradeRestriction.LIMITED],
                    description: "Once per round, when attacking with a secondary weapon, you may spend 1 energy to change 1 of your blank results to a Hit result.",
                    squadPointCost: 4,
                    value: "gunneryTeam",
                },
                "hanSolo":
                {
                    name: "Han Solo",
                    type: UpgradeType.CREW,
                    isUnique: true,
                    restrictions: [UpgradeRestriction.REBEL_ONLY],
                    description: "When attacking, if you have a Target Lock on the defender, you may spend that Target Lock to change all of your Focus results to Hit results.",
                    agentInput: true,
                    squadPointCost: 2,
                    isImplemented: true,
                    value: "hanSolo",
                },
                "heavyLaserCannon":
                {
                    name: "Heavy Laser Cannon",
                    type: UpgradeType.CANNON,
                    header: UpgradeHeader.ATTACK,
                    weaponValue: 4,
                    ranges: [RangeRuler.TWO, RangeRuler.THREE],
                    firingArcKey: FiringArc.FORWARD,
                    description: "Attack 1 ship. Immediately after rolling your attack dice, you must change all of your Critical Hit results to Hit results.",
                    squadPointCost: 7,
                    isImplemented: true,
                    value: "heavyLaserCannon",
                },
                "heavyScykInterceptor":
                {
                    name: "\"Heavy Scyk\" Interceptor",
                    type: UpgradeType.TITLE,
                    restrictions: [UpgradeRestriction.M3_A_INTERCEPTOR_ONLY],
                    description: "Your upgrade bar gains the Cannon, Torpedo, or Missile upgrade icon.",
                    squadPointCost: 2,
                    value: "heavyScykInterceptor",
                },
                "heraSyndulla":
                {
                    name: "Hera Syndulla",
                    type: UpgradeType.CREW,
                    isUnique: true,
                    restrictions: [UpgradeRestriction.REBEL_ONLY],
                    description: "You can reveal and execute red maneuvers even while you are stressed.",
                    squadPointCost: 1,
                    isImplemented: true,
                    value: "heraSyndulla",
                },
                "homingMissiles":
                {
                    name: "Homing Missiles",
                    type: UpgradeType.MISSILE,
                    header: UpgradeHeader.ATTACK_TARGET_LOCK,
                    weaponValue: 4,
                    ranges: [RangeRuler.TWO, RangeRuler.THREE],
                    firingArcKey: FiringArc.FORWARD,
                    description: "Discard this card to perform this attack. The defender cannot spend Evade tokens during this attack.",
                    squadPointCost: 5,
                    value: "homingMissiles",
                },
                "hotShotBlaster":
                {
                    name: "\"Hot Shot\" Blaster",
                    type: UpgradeType.ILLICIT,
                    header: UpgradeHeader.ATTACK,
                    weaponValue: 3,
                    ranges: [RangeRuler.ONE, RangeRuler.TWO],
                    firingArcKey: FiringArc.FORWARD,
                    isWeaponTurret: true,
                    description: "Discard this card to attack 1 ship (even a ship outside your firing arc).",
                    discardThisCard: true,
                    squadPointCost: 3,
                    isImplemented: true,
                    value: "hotShotBlaster",
                },
                "houndsTooth":
                {
                    name: "Hound's Tooth",
                    type: UpgradeType.TITLE,
                    isUnique: true,
                    restrictions: [UpgradeRestriction.YV_666_ONLY],
                    description: "After you are destroyed, before you are removed from the play area, you may deploy the Nashtah Pup Pilot. It cannot attack this round.",
                    squadPointCost: 6,
                    value: "houndsTooth",
                },
                "hullUpgrade":
                {
                    name: "Hull Upgrade",
                    type: UpgradeType.MODIFICATION,
                    description: "Increase your hull value by 1.",
                    hullValue: 1,
                    squadPointCost: 3,
                    isImplemented: true,
                    value: "hullUpgrade",
                },
                "ig2000":
                {
                    name: "IG-2000",
                    type: UpgradeType.TITLE,
                    restrictions: [UpgradeRestriction.AGGRESSOR_ONLY],
                    description: "You have the pilot ability of each other friendly ship with the IG-2000 upgrade card (in addition to your own pilot ability).",
                    squadPointCost: 0,
                    value: "ig2000",
                },
                "impetuous":
                {
                    name: "Impetuous",
                    type: UpgradeType.TITLE,
                    isUnique: true,
                    restrictions: [UpgradeRestriction.RAIDER_CLASS_CORVETTE_AFT_SECTION_ONLY],
                    description: "After you perform an attack that destroys an enemy ship, you may acquire a target lock.",
                    squadPointCost: 3,
                    value: "impetuous",
                },
                "inertialDampeners":
                {
                    name: "Inertial Dampeners",
                    type: UpgradeType.ILLICIT,
                    description: "When you reveal your maneuver, you may discard this card to instead perform a white Stationary 0 maneuver. Then receive 1 stress token.",
                    squadPointCost: 1,
                    value: "inertialDampeners",
                },
                "instigator":
                {
                    name: "Instigator",
                    type: UpgradeType.TITLE,
                    isUnique: true,
                    restrictions: [UpgradeRestriction.RAIDER_CLASS_CORVETTE_AFT_SECTION_ONLY],
                    description: "After you perform a recover action, recover 1 additional shield.",
                    squadPointCost: 4,
                    value: "instigator",
                },
                "integratedAstromech":
                {
                    name: "Integrated Astromech",
                    type: UpgradeType.MODIFICATION,
                    restrictions: [UpgradeRestriction.X_WING_ONLY],
                    description: "When you are dealt a Damage card, you may discard 1 of your Astromech Upgrade cards to discard that Damage card (without resolving its effect).",
                    squadPointCost: 0,
                    value: "integratedAstromech",
                },
                "intelligenceAgent":
                {
                    name: "Intelligence Agent",
                    type: UpgradeType.CREW,
                    description: "At the start of the Activation phase, choose 1 enemy ship at Range 1-2. You may look at that ship's chosen maneuver.",
                    squadPointCost: 1,
                    value: "intelligenceAgent",
                },
                "intimidation":
                {
                    name: "Intimidation",
                    type: UpgradeType.ELITE,
                    description: "While you are touching an enemy ship, reduce that ship's agility value by 1.",
                    squadPointCost: 2,
                    value: "intimidation",
                },
                "ionBombs":
                {
                    name: "Ion Bombs",
                    type: UpgradeType.BOMB,
                    description: "When you reveal your maneuver dial, you may discard this card to drop 1 ion bomb token. This token detonates at the end of the Activation phase.",
                    squadPointCost: 2,
                    value: "ionBombs",
                },
                "ionCannon":
                {
                    name: "Ion Cannon",
                    type: UpgradeType.CANNON,
                    header: UpgradeHeader.ATTACK,
                    weaponValue: 3,
                    ranges: RangeRuler.STANDARD_RANGES,
                    firingArcKey: FiringArc.FORWARD,
                    description: "Attack 1 ship. If this attack hits, the defender suffers 1 damage and receives 1 ion token. Then cancel all dice results.",
                    cancelAllDiceResults: true,
                    squadPointCost: 3,
                    isImplemented: true,
                    value: "ionCannon",
                },
                "ionCannonBattery":
                {
                    name: "Ion Cannon Battery",
                    type: UpgradeType.HARDPOINT,
                    header: UpgradeHeader.ATTACK_ENERGY,
                    energyLimit: 2,
                    weaponValue: 4,
                    ranges: [RangeRuler.TWO, RangeRuler.THREE, RangeRuler.FOUR],
                    firingArcKey: FiringArc.FORWARD,
                    description: "Spend 2 energy from this card to perform this attack. If this attack hits, the defender suffers 1 critical damage and receives 1 ion token. Then cancel all dice results.",
                    squadPointCost: 6,
                    value: "ionCannonBattery",
                },
                "ionCannonTurret":
                {
                    name: "Ion Cannon Turret",
                    type: UpgradeType.TURRET,
                    header: UpgradeHeader.ATTACK,
                    weaponValue: 3,
                    ranges: [RangeRuler.ONE, RangeRuler.TWO],
                    firingArcKey: FiringArc.FORWARD,
                    isWeaponTurret: true,
                    description: "Attack 1 ship (even a ship outside your firing arc). If this attack hits the target ship, the ship suffers 1 damage and receives 1 ion token. Then cancel all dice results.",
                    cancelAllDiceResults: true,
                    squadPointCost: 5,
                    isImplemented: true,
                    value: "ionCannonTurret",
                },
                "ionizationReactor":
                {
                    name: "Ionization Reactor",
                    type: UpgradeType.CARGO,
                    restrictions: [UpgradeRestriction.LIMITED],
                    header: UpgradeHeader.ENERGY,
                    energyLimit: 5,
                    description: "Spend 5 energy from this card and discard this card to cause each other ship at Range 1 to suffer 1 damage and receive 1 ion token.",
                    squadPointCost: 4,
                    value: "ionizationReactor",
                },
                "ionProjector":
                {
                    name: "Ion Projector",
                    type: UpgradeType.MODIFICATION,
                    restrictions: [UpgradeRestriction.LARGE_SHIP_ONLY],
                    description: "After an enemy ship executes a maneuver that causes it to overlap your ship, roll 1 attack die. On a Hit or Critical Hit result, the enemy ship receives 1 Ion token.",
                    squadPointCost: 2,
                    value: "ionProjector",
                },
                "ionPulseMissiles":
                {
                    name: "Ion Pulse Missiles",
                    type: UpgradeType.MISSILE,
                    header: UpgradeHeader.ATTACK_TARGET_LOCK,
                    weaponValue: 3,
                    ranges: [RangeRuler.TWO, RangeRuler.THREE],
                    firingArcKey: FiringArc.FORWARD,
                    description: "Spend your Target Lock and discard this card to perform this attack. If this attack hits, the defender suffers 1 damage and receives 2 ion tokens. Then cancel all dice results.",
                    spendTargetLock: true,
                    discardThisCard: true,
                    cancelAllDiceResults: true,
                    squadPointCost: 3,
                    isImplemented: true,
                    value: "ionPulseMissiles",
                },
                "ionTorpedoes":
                {
                    name: "Ion Torpedoes",
                    type: UpgradeType.TORPEDO,
                    header: UpgradeHeader.ATTACK_TARGET_LOCK,
                    weaponValue: 4,
                    ranges: [RangeRuler.TWO, RangeRuler.THREE],
                    firingArcKey: FiringArc.FORWARD,
                    description: "Spend your Target Lock and discard this card to perform this attack. If this attack hits, the defender and each ship at Range 1 of it receives 1 ion token.",
                    spendTargetLock: true,
                    discardThisCard: true,
                    squadPointCost: 5,
                    isImplemented: true,
                    value: "ionTorpedoes",
                },
                "jainasLight":
                {
                    name: "Jaina's Light",
                    type: UpgradeType.TITLE,
                    isUnique: true,
                    restrictions: [UpgradeRestriction.CR90_ONLY],
                    description: "When defending, once per attack, if you are dealt a faceup Damage card, you may discard it and draw another faceup Damage card.",
                    squadPointCost: 2,
                    value: "jainasLight",
                },
                "janDodonna":
                {
                    name: "Jan Dodonna",
                    type: UpgradeType.CREW,
                    isUnique: true,
                    restrictions: [UpgradeRestriction.HUGE_SHIP_ONLY, UpgradeRestriction.REBEL_ONLY],
                    description: "When another friendly ship at Range 1 is attacking, it may change 1 of its Hit results to a Critical Hit result.",
                    squadPointCost: 6,
                    value: "janDodonna",
                },
                "janOrs":
                {
                    name: "Jan Ors",
                    type: UpgradeType.CREW,
                    isUnique: true,
                    restrictions: [UpgradeRestriction.REBEL_ONLY],
                    description: "Once per round, when a friendly ship at Range 1-3 performs a Focus action or would be assigned a Focus token, you may assign that ship an Evade token instead.",
                    squadPointCost: 2,
                    value: "janOrs",
                },
                "juke":
                {
                    name: "Juke",
                    type: UpgradeType.ELITE,
                    restrictions: [UpgradeRestriction.SMALL_SHIP_ONLY],
                    description: "When attacking, if you have an Evade token, you may change 1 of the defender's Evade results to a Focus result.",
                    squadPointCost: 2,
                    isImplemented: true,
                    value: "juke",
                },
                "k4SecurityDroid":
                {
                    name: "K4 Security Droid",
                    type: UpgradeType.CREW,
                    restrictions: [UpgradeRestriction.SCUM_ONLY],
                    description: "After executing a green maneuver, you may acquire a Target Lock.",
                    squadPointCost: 3,
                    value: "k4SecurityDroid",
                },
                "kananJarrus":
                {
                    name: "Kanan Jarrus",
                    type: UpgradeType.CREW,
                    isUnique: true,
                    restrictions: [UpgradeRestriction.REBEL_ONLY],
                    description: "Once per round, after a friendly ship at Range 1-2 executes a white maneuver, you may remove 1 stress token from that ship.",
                    squadPointCost: 3,
                    value: "kananJarrus",
                },
                "kyleKatarn":
                {
                    name: "Kyle Katarn",
                    type: UpgradeType.CREW,
                    isUnique: true,
                    restrictions: [UpgradeRestriction.REBEL_ONLY],
                    description: "After you remove a stress token from your ship, you may assign a Focus token to your ship.",
                    squadPointCost: 3,
                    isImplemented: true,
                    value: "kyleKatarn",
                },
                "landoCalrissian":
                {
                    name: "Lando Calrissian",
                    type: UpgradeType.CREW,
                    isUnique: true,
                    restrictions: [UpgradeRestriction.REBEL_ONLY],
                    header: UpgradeHeader.ACTION,
                    description: "Roll 2 defense dice. For each Focus result, assign 1 Focus token to your ship. For each Evade result, assign 1 Evade token to your ship.",
                    squadPointCost: 3,
                    value: "landoCalrissian",
                },
                "leiaOrgana":
                {
                    name: "Leia Organa",
                    type: UpgradeType.CREW,
                    isUnique: true,
                    restrictions: [UpgradeRestriction.REBEL_ONLY],
                    description: "At the start of the Activation phase, you may discard this card to allow all friendly ships that reveal a red maneuver to treat that maneuver as a white maneuver until the end of the phase.",
                    squadPointCost: 4,
                    value: "leiaOrgana",
                },
                "leebo":
                {
                    name: "\"Leebo\"",
                    type: UpgradeType.CREW,
                    isUnique: true,
                    restrictions: [UpgradeRestriction.REBEL_ONLY],
                    header: UpgradeHeader.ACTION,
                    description: "Perform a free boost action. Then receive 1 ion token.",
                    squadPointCost: 2,
                    value: "leebo",
                },
                "lightningReflexes":
                {
                    name: "Lightning Reflexes",
                    type: UpgradeType.ELITE,
                    restrictions: [UpgradeRestriction.SMALL_SHIP_ONLY],
                    description: "After you execute a white or green maneuver on your dial, you may discard this card to rotate your ship 180˚. Then receive 1 stress token after the \"Check Pilot Stress\" step.",
                    squadPointCost: 1,
                    value: "lightningReflexes",
                },
                "loneWolf":
                {
                    name: "Lone Wolf",
                    type: UpgradeType.ELITE,
                    isUnique: true,
                    description: "When attacking or defending, if there are no friendly ships at Range 1-2, you may reroll 1 of your blank results.",
                    squadPointCost: 2,
                    isImplemented: true,
                    value: "loneWolf",
                },
                "lukeSkywalker":
                {
                    name: "Luke Skywalker",
                    type: UpgradeType.CREW,
                    isUnique: true,
                    restrictions: [UpgradeRestriction.REBEL_ONLY],
                    description: "After you perform an attack that does not hit, you may immediately perform a primary weapon attack. You may change 1 Focus result to a Hit result. You cannot perform another attack this round.",
                    squadPointCost: 7,
                    value: "lukeSkywalker",
                },
                "maneuveringFins":
                {
                    name: "Maneuvering Fins",
                    type: UpgradeType.MODIFICATION,
                    restrictions: [UpgradeRestriction.YV_666_ONLY],
                    description: "When you reveal a turn maneuver (left or right), you may rotate your dial to the corresponding bank maneuver (left or right) of the same speed.",
                    squadPointCost: 1,
                    value: "maneuveringFins",
                },
                "manglerCannon":
                {
                    name: "\"Mangler\" Cannon",
                    type: UpgradeType.CANNON,
                    header: UpgradeHeader.ATTACK,
                    weaponValue: 3,
                    ranges: RangeRuler.STANDARD_RANGES,
                    firingArcKey: FiringArc.FORWARD,
                    description: "Attack 1 ship. When attacking, you may change 1 of your Hit results to a Critical Hit result.",
                    squadPointCost: 4,
                    isImplemented: true,
                    value: "manglerCannon",
                },
                "maraJade":
                {
                    name: "Mara Jade",
                    type: UpgradeType.CREW,
                    isUnique: true,
                    restrictions: [UpgradeRestriction.IMPERIAL_ONLY],
                    description: "At the end of the Combat phase, each enemy ship at Range 1 that does not have a stress token receives 1 stress token.",
                    squadPointCost: 3,
                    isImplemented: true,
                    value: "maraJade",
                },
                "marksmanship":
                {
                    name: "Marksmanship",
                    type: UpgradeType.ELITE,
                    header: UpgradeHeader.ACTION,
                    description: "When attacking this round, you may change 1 of your Focus results to a Critical Hit result and all of your other Focus results to Hit results.",
                    squadPointCost: 3,
                    value: "marksmanship",
                },
                "mercenaryCopilot":
                {
                    name: "Mercenary Copilot",
                    type: UpgradeType.CREW,
                    description: "When attacking at Range 3, you may change 1 of your Hit results to a Critical Hit result.",
                    squadPointCost: 2,
                    isImplemented: true,
                    value: "mercenaryCopilot",
                },
                "millenniumFalcon":
                {
                    name: "Millennium Falcon",
                    type: UpgradeType.TITLE,
                    restrictions: [UpgradeRestriction.YT_1300_ONLY],
                    description: "Your action bar gains the Evade action icon.",
                    squadPointCost: 1,
                    isImplemented: true,
                    value: "millenniumFalcon",
                },
                "mistHunter":
                {
                    name: "Mist Hunter",
                    type: UpgradeType.TITLE,
                    isUnique: true,
                    restrictions: [UpgradeRestriction.G_1A_STARFIGHTER_ONLY],
                    description: "Your action bar gains the Barrel Roll action icon. You must equip 1 \"Tractor Beam\" upgrade card (paying its squad point cost as normal).",
                    squadPointCost: 0,
                    isImplemented: true,
                    value: "mistHunter",
                },
                "moffJerjerrod":
                {
                    name: "Moff Jerjerrod",
                    type: UpgradeType.CREW,
                    isUnique: true,
                    restrictions: [UpgradeRestriction.IMPERIAL_ONLY],
                    description: "When you are dealt a faceup Damage card, you may discard this Upgrade card or another Crew Upgrade card to flip that Damage card facedown (without resolving its effect).",
                    squadPointCost: 2,
                    value: "moffJerjerrod",
                },
                "moldyCrow":
                {
                    name: "Moldy Crow",
                    type: UpgradeType.TITLE,
                    isUnique: true,
                    restrictions: [UpgradeRestriction.HWK_290_ONLY],
                    description: "During the End phase, do not remove unused Focus tokens from your ship.",
                    squadPointCost: 3,
                    isImplemented: true,
                    value: "moldyCrow",
                },
                "munitionsFailsafe":
                {
                    name: "Munitions Failsafe",
                    type: UpgradeType.MODIFICATION,
                    description: "When attacking with a secondary weapon that instructs you to discard it to perform the attack, do not discard it unless the attack hits.",
                    squadPointCost: 1,
                    value: "munitionsFailsafe",
                },
                "navigator":
                {
                    name: "Navigator",
                    type: UpgradeType.CREW,
                    description: "When you reveal a maneuver you may rotate your dial to another maneuver with the same bearing. You cannot rotate to a red maneuver if you have any stress tokens.",
                    squadPointCost: 3,
                    value: "navigator",
                },
                "nienNunb":
                {
                    name: "Nien Nunb",
                    type: UpgradeType.CREW,
                    isUnique: true,
                    restrictions: [UpgradeRestriction.REBEL_ONLY],
                    description: "You may treat all Straight maneuvers as green maneuvers.",
                    squadPointCost: 1,
                    isImplemented: true,
                    value: "nienNunb",
                },
                "opportunist":
                {
                    name: "Opportunist",
                    type: UpgradeType.ELITE,
                    description: "When attacking, if the defender does not have any Focus or Evade tokens, you may receive 1 stress token to roll 1 additional attack die. You cannot use this ability if you have any stress tokens.",
                    agentInput: true,
                    squadPointCost: 4,
                    isImplemented: true,
                    value: "opportunist",
                },
                "optimizedGenerators":
                {
                    name: "Optimized Generators",
                    type: UpgradeType.MODIFICATION,
                    restrictions: [UpgradeRestriction.HUGE_SHIP_ONLY],
                    description: "Once per round, when you assign energy to an equipped Upgrade card, gain 2 energy.",
                    squadPointCost: 5,
                    value: "optimizedGenerators",
                },
                "ordnanceExperts":
                {
                    name: "Ordnance Experts",
                    type: UpgradeType.TEAM,
                    restrictions: [UpgradeRestriction.LIMITED],
                    description: "Once per round, when a friendly ship at Range 1-3 performs an attack with a Torpedo or Missile secondary weapon, it may change 1 of its blank results to a hit result.",
                    squadPointCost: 5,
                    value: "ordnanceExperts",
                },
                "ordnanceTubes":
                {
                    name: "Ordnance Tubes",
                    type: UpgradeType.MODIFICATION,
                    restrictions: [UpgradeRestriction.HUGE_SHIP_ONLY],
                    description: "You may treat each of your Hardpoint upgrade icons as a Torpedo or Missile upgrade icon. When you are instructed to discard a Torpedo or Missile Upgrade card, do not discard it.",
                    squadPointCost: 5,
                    value: "ordnanceTubes",
                },
                "outlawTech":
                {
                    name: "Outlaw Tech",
                    type: UpgradeType.CREW,
                    restrictions: [UpgradeRestriction.SCUM_ONLY, UpgradeRestriction.LIMITED],
                    description: "After you execute a red maneuver, you may assign 1 Focus token to your ship.",
                    squadPointCost: 2,
                    isImplemented: true,
                    value: "outlawTech",
                },
                "outmaneuver":
                {
                    name: "Outmaneuver",
                    type: UpgradeType.ELITE,
                    description: "When attacking a ship inside your firing arc, if you are not inside that ship's firing arc, reduce its agility value by 1 (to a minimum of 0).",
                    squadPointCost: 3,
                    value: "outmaneuver",
                },
                "outrider":
                {
                    name: "Outrider",
                    type: UpgradeType.TITLE,
                    restrictions: [UpgradeRestriction.YT_2400_ONLY],
                    description: "While you have a Cannon upgrade card equipped, you cannot perform primary weapon attacks and you may perform Cannon secondary weapon attacks against ships outside your firing arc.",
                    squadPointCost: 5,
                    value: "outrider",
                },
                "overclockedR4":
                {
                    name: "Overclocked R4",
                    type: UpgradeType.SALVAGED_ASTROMECH,
                    description: "During the Combat Phase, when you spend a focus token, you may receive 1 stress token to assign 1 focus token to your ship.",
                    squadPointCost: 1,
                    value: "overclockedR4",
                },
                "phantom":
                {
                    name: "Phantom",
                    type: UpgradeType.TITLE,
                    isUnique: true,
                    restrictions: [UpgradeRestriction.VCX_100_ONLY],
                    description: "While you are docked, the Ghost can perform primary weapon attacks from its special firing arc and, at the end of the Combat phase, it may perform an additional attack with an equipped Turret. If it performs this attack, it cannot attack again this round.",
                    squadPointCost: undefined,
                    value: "phantom",
                },
                "plasmaTorpedoes":
                {
                    name: "Plasma Torpedoes",
                    type: UpgradeType.TORPEDO,
                    header: UpgradeHeader.ATTACK_TARGET_LOCK,
                    weaponValue: 4,
                    ranges: [RangeRuler.TWO, RangeRuler.THREE],
                    firingArcKey: FiringArc.FORWARD,
                    description: "Spend your Target Lock and discard this card to perform this attack. If this attack hits, after dealing damage, remove 1 shield token from the defender.",
                    spendTargetLock: true,
                    discardThisCard: true,
                    squadPointCost: 3,
                    isImplemented: true,
                    value: "plasmaTorpedoes",
                },
                "predator":
                {
                    name: "Predator",
                    type: UpgradeType.ELITE,
                    description: "When attacking, you may reroll 1 attack die. If the defender's pilot skill value if \"2\" or lower, you may instead reroll up to 2 attack dice.",
                    squadPointCost: 3,
                    isImplemented: true,
                    value: "predator",
                },
                "protonBombs":
                {
                    name: "Proton Bombs",
                    type: UpgradeType.BOMB,
                    description: "When you reveal your maneuver dial, you may discard this card to drop 1 proton bomb token. This token detonates at the end of the Activation phase.",
                    squadPointCost: 5,
                    value: "protonBombs",
                },
                "protonRockets":
                {
                    name: "Proton Rockets",
                    type: UpgradeType.MISSILE,
                    header: UpgradeHeader.ATTACK_FOCUS,
                    weaponValue: 2,
                    ranges: [RangeRuler.ONE],
                    firingArcKey: FiringArc.FORWARD,
                    description: "Discard this card to perform this attack. You may roll additional attack dice equal to your agility value, to a maximum of 3 additional dice.",
                    discardThisCard: true,
                    squadPointCost: 3,
                    isImplemented: true,
                    value: "protonRockets",
                },
                "protonTorpedoes":
                {
                    name: "Proton Torpedoes",
                    type: UpgradeType.TORPEDO,
                    header: UpgradeHeader.ATTACK_TARGET_LOCK,
                    weaponValue: 4,
                    ranges: [RangeRuler.TWO, RangeRuler.THREE],
                    firingArcKey: FiringArc.FORWARD,
                    description: "Spend your Target Lock and discard this card to perform this attack. You may change 1 of your Focus results to a Critical Hit result.",
                    spendTargetLock: true,
                    discardThisCard: true,
                    squadPointCost: 4,
                    isImplemented: true,
                    value: "protonTorpedoes",
                },
                "proximityMines":
                {
                    name: "Proximity Mines",
                    type: UpgradeType.BOMB,
                    header: UpgradeHeader.ACTION,
                    description: "Discard this card to drop 1 proximity mine token. When a ship's base or maneuver template overlaps this token, this token detonates.",
                    squadPointCost: 3,
                    value: "proximityMines",
                },
                "punishingOne":
                {
                    name: "Punishing One",
                    type: UpgradeType.TITLE,
                    isUnique: true,
                    restrictions: [UpgradeRestriction.JUMPMASTER_5000_ONLY],
                    description: "Increase your primary weapon value by 1.",
                    squadPointCost: 12,
                    isImplemented: true,
                    value: "punishingOne",
                },
                "pushTheLimit":
                {
                    name: "Push The Limit",
                    type: UpgradeType.ELITE,
                    description: "Once per round, after you perform an action, you may perform 1 free action shown in your action bar. Then receive 1 stress token.",
                    squadPointCost: 3,
                    value: "pushTheLimit",
                },
                "quadLaserCannons":
                {
                    name: "Quad Laser Cannons",
                    type: UpgradeType.HARDPOINT,
                    header: UpgradeHeader.ATTACK_ENERGY,
                    energyLimit: 2,
                    weaponValue: 3,
                    ranges: [RangeRuler.ONE, RangeRuler.TWO],
                    firingArcKey: FiringArc.FORWARD,
                    description: "Spend 1 energy from this card to perform this attack. If this attack does not hit, you may immediately spend 1 energy from this card to perform this attack again.",
                    squadPointCost: 6,
                    value: "quadLaserCannons",
                },
                "quantumStorm":
                {
                    name: "Quantum Storm",
                    type: UpgradeType.TITLE,
                    isUnique: true,
                    restrictions: [UpgradeRestriction.GR_75_ONLY],
                    description: "At the start of the End phase, if you have 1 or fewer energy tokens, gain 1 energy token.",
                    energyValue: 1,
                    squadPointCost: 4,
                    isImplemented: true,
                    value: "quantumStorm",
                },
                "r2Astromech":
                {
                    name: "R2 Astromech",
                    type: UpgradeType.ASTROMECH,
                    description: "You may treat all 1- and 2-speed maneuvers as green maneuvers.",
                    squadPointCost: 1,
                    isImplemented: true,
                    value: "r2Astromech",
                },
                "r2D2":
                {
                    name: "R2-D2",
                    type: UpgradeType.ASTROMECH,
                    isUnique: true,
                    description: "After executing a green maneuver, you may recover 1 shield (up to your shield value).",
                    squadPointCost: 4,
                    isImplemented: true,
                    value: "r2D2",
                },
                "r2D2Crew":
                {
                    name: "R2-D2 (Crew)",
                    type: UpgradeType.CREW,
                    isUnique: true,
                    restrictions: [UpgradeRestriction.REBEL_ONLY],
                    description: "At the end of the End phase, if you have no shields, you may recover 1 shield and roll 1 attack die. On a Hit result, randomly flip 1 of your facedown Damage cards faceup and resolve it.",
                    squadPointCost: 4,
                    value: "r2D2Crew",
                },
                "r2D6":
                {
                    name: "R2-D6",
                    type: UpgradeType.ASTROMECH,
                    isUnique: true,
                    description: "Your upgrade bar gains the Elite upgrade icon. You cannot equip this upgrade if you already have a Elite upgrade icon or if your pilot skill value is 2 or lower.",
                    squadPointCost: 1,
                    isImplemented: true,
                    value: "r2D6",
                },
                "r2F2":
                {
                    name: "R2-F2",
                    type: UpgradeType.ASTROMECH,
                    isUnique: true,
                    header: UpgradeHeader.ACTION,
                    description: "Increase your agility value by 1 until the end of this game round.",
                    squadPointCost: 3,
                    value: "r2F2",
                },
                "r3A2":
                {
                    name: "R3-A2",
                    type: UpgradeType.ASTROMECH,
                    isUnique: true,
                    description: "When you declare the target of your attack, if the defender is inside your firing arc, you may receive 1 stress token to cause the defender to receive 1 stress token.",
                    squadPointCost: 2,
                    value: "r3A2",
                },
                "r4Agromech":
                {
                    name: "R4 Agromech",
                    type: UpgradeType.SALVAGED_ASTROMECH,
                    description: "When attacking, after you spend a Focus token, you may acquire a Target Lock on the defender.",
                    squadPointCost: 2,
                    value: "r4Agromech",
                },
                "r4B11":
                {
                    name: "R4-B11",
                    type: UpgradeType.SALVAGED_ASTROMECH,
                    isUnique: true,
                    description: "When attacking, if you have a Target Lock on the defender you may spend the Target Lock to choose any or all defense dice. The defender must reroll the chosen dice.",
                    squadPointCost: 3,
                    value: "r4B11",
                },
                "r4D6":
                {
                    name: "R4-D6",
                    type: UpgradeType.ASTROMECH,
                    isUnique: true,
                    description: "When you are hit by an attack and there are at least 3 uncanceled Hit results, you may choose and cancel those results until there are 2 remaining. For each result canceled in this way, receive 1 stress token.",
                    squadPointCost: 1,
                    value: "r4D6",
                },
                "r5Astromech":
                {
                    name: "R5 Astromech",
                    type: UpgradeType.ASTROMECH,
                    description: "During the End phase, you may choose 1 of your faceup Damage cards with the Ship trait and flip it facedown.",
                    squadPointCost: 1,
                    value: "r5Astromech",
                },
                "r5D8":
                {
                    name: "R5-D8",
                    type: UpgradeType.ASTROMECH,
                    isUnique: true,
                    header: UpgradeHeader.ACTION,
                    description: "Roll 1 defense die. On an Evade or Focus result, discard 1 of your facedown Damage cards.",
                    squadPointCost: 3,
                    value: "r5D8",
                },
                "r5K6":
                {
                    name: "R5-K6",
                    type: UpgradeType.ASTROMECH,
                    isUnique: true,
                    description: "After spending your Target Lock, roll 1 defense die. On an Evade result, immediately acquire a Target Lock on that same ship. You cannot spend this Target Lock during this attack.",
                    squadPointCost: 2,
                    value: "r5K6",
                },
                "r5P8":
                {
                    name: "R5-P8",
                    type: UpgradeType.SALVAGED_ASTROMECH,
                    isUnique: true,
                    description: "Once per round, after defending, you may roll 1 attack die. On a hit result, the attacker suffers 1 damage. On a critical hit result, you and the attacker each suffer 1 damage.",
                    squadPointCost: 3,
                    value: "r5P8",
                },
                "r5P9":
                {
                    name: "R5-P9",
                    type: UpgradeType.ASTROMECH,
                    isUnique: true,
                    description: "At the end of the Combat phase, you may spend 1 of your Focus tokens to recover 1 shield (up to your shield value).",
                    squadPointCost: 3,
                    isImplemented: true,
                    value: "r5P9",
                },
                "r5x3":
                {
                    name: "R5-X3",
                    type: UpgradeType.ASTROMECH,
                    isUnique: true,
                    description: "Before you reveal your maneuver, you may discard this card to ignore obstacles until the end of the round.",
                    squadPointCost: 1,
                    value: "r5x3",
                },
                "r7Astromech":
                {
                    name: "R7 Astromech",
                    type: UpgradeType.ASTROMECH,
                    description: "Once per round when defending, if you have a Target Lock on the attacker, you may spend the Target Lock to choose any or all attack dice. The attacker must reroll the chosen dice.",
                    squadPointCost: 2,
                    value: "r7Astromech",
                },
                "r7T1":
                {
                    name: "R7-T1",
                    type: UpgradeType.ASTROMECH,
                    isUnique: true,
                    header: UpgradeHeader.ACTION,
                    description: "Choose an enemy ship at Range 1-2. If you are inside that ship's firing arc, you may acquire a Target Lock on that ship. Then you may perform a free boost action.",
                    squadPointCost: 3,
                    value: "r7T1",
                },
                "rage":
                {
                    name: "Rage",
                    type: UpgradeType.ELITE,
                    header: UpgradeHeader.ACTION,
                    description: "Assign 1 focus token to your ship and receive 2 stress tokens. Until the end of the round, when attacking, you may reroll up to 3 attack dice.",
                    squadPointCost: 1,
                    value: "rage",
                },
                "raymusAntilles":
                {
                    name: "Raymus Antilles",
                    type: UpgradeType.CREW,
                    isUnique: true,
                    restrictions: [UpgradeRestriction.HUGE_SHIP_ONLY, UpgradeRestriction.REBEL_ONLY],
                    description: "At the start of the Activation phase, choose 1 enemy ship at Range 1-3. You may look at that ship's chosen maneuver. If the maneuver is white, assign that ship 1 stress token.",
                    squadPointCost: 6,
                    value: "raymusAntilles",
                },
                "rearAdmiralChiraneau":
                {
                    name: "Rear Admiral Chiraneau",
                    type: UpgradeType.CREW,
                    isUnique: true,
                    restrictions: [UpgradeRestriction.HUGE_SHIP_ONLY, UpgradeRestriction.IMPERIAL_ONLY],
                    header: UpgradeHeader.ACTION,
                    description: "Execute a white (1 forward) maneuver.",
                    squadPointCost: 3,
                    value: "rearAdmiralChiraneau",
                },
                "rebelCaptive":
                {
                    name: "Rebel Captive",
                    type: UpgradeType.CREW,
                    isUnique: true,
                    restrictions: [UpgradeRestriction.IMPERIAL_ONLY],
                    description: "Once per round, the first ship that declares you as the target of an attack immediately receives 1 stress token.",
                    squadPointCost: 3,
                    value: "rebelCaptive",
                },
                "reconSpecialist":
                {
                    name: "Recon Specialist",
                    type: UpgradeType.CREW,
                    description: "When you perform a Focus action, assign 1 additional Focus token to your ship.",
                    squadPointCost: 3,
                    isImplemented: true,
                    value: "reconSpecialist",
                },
                "reinforcedDeflectors":
                {
                    name: "Reinforced Deflectors",
                    type: UpgradeType.SYSTEM,
                    restrictions: [UpgradeRestriction.LARGE_SHIP_ONLY],
                    description: "After you suffer 3 or more damage from an attack, recover 1 shield (up to your shield value).",
                    squadPointCost: 3,
                    isImplemented: true,
                    value: "reinforcedDeflectors",
                },
                "requiem":
                {
                    name: "Requiem",
                    type: UpgradeType.TITLE,
                    isUnique: true,
                    restrictions: [UpgradeRestriction.GOZANTI_CLASS_CRUISER_ONLY],
                    description: "When you deploy a ship, treat its pilot skill value as \"8\" until the end of the round.",
                    energyValue: 0,
                    squadPointCost: 4,
                    value: "requiem",
                },
                "royalGuardTie":
                {
                    name: "Royal Guard TIE",
                    type: UpgradeType.TITLE,
                    restrictions: [UpgradeRestriction.TIE_INTERCEPTOR_ONLY, UpgradeRestriction.PILOT_SKILL_ABOVE_4],
                    description: "You may equip up to 2 different Modification upgrades (instead of 1). You cannot equip this card if your pilot skill value is \"4\" or lower.",
                    squadPointCost: 0,
                    isImplemented: true,
                    value: "royalGuardTie",
                },
                "ruthlessness":
                {
                    name: "Ruthlessness",
                    type: UpgradeType.ELITE,
                    restrictions: [UpgradeRestriction.IMPERIAL_ONLY],
                    description: "After you perform an attack that hits, you must choose 1 other ship at Range 1 of the defender (other than yourself). That ship suffers 1 damage.",
                    squadPointCost: 3,
                    value: "ruthlessness",
                },
                "sabineWren":
                {
                    name: "Sabine Wren",
                    type: UpgradeType.CREW,
                    isUnique: true,
                    restrictions: [UpgradeRestriction.REBEL_ONLY],
                    description: "Your upgrade bar gains the bomb upgrade icon. Once per round, before a friendly bomb token is removed, choose 1 enemy ship at Range 1 of that token. That ship suffers 1 damage.",
                    squadPointCost: 2,
                    value: "sabineWren",
                },
                "saboteur":
                {
                    name: "Saboteur",
                    type: UpgradeType.CREW,
                    header: UpgradeHeader.ACTION,
                    description: "Choose 1 enemy ship at Range 1 and roll 1 attack die. On a Hit or Critical Hit result, choose 1 random facedown Damage card assigned to that ship, flip it faceup, and resolve it.",
                    squadPointCost: 2,
                    value: "saboteur",
                },
                "salvagedAstromech":
                {
                    name: "Salvaged Astromech",
                    type: UpgradeType.SALVAGED_ASTROMECH,
                    description: "When you are dealt a Damage card with the Ship trait, you may immediately discard that card (before resolving its effect). Then, discard this Upgrade card.",
                    squadPointCost: 2,
                    value: "salvagedAstromech",
                },
                "seismicCharges":
                {
                    name: "Seismic Charges",
                    type: UpgradeType.BOMB,
                    description: "When you reveal your maneuver dial, you may discard this card to drop 1 seismic charge token. This token detonates at the end of the Activation phase.",
                    squadPointCost: 2,
                    value: "seismicCharges",
                },
                "seismicTorpedo":
                {
                    name: "Seismic Torpedo",
                    type: UpgradeType.TORPEDO,
                    header: UpgradeHeader.ACTION,
                    description: "Discard this card to choose an obstacle at Range 1-2 and inside your primary firing arc. Each ship at Range 1 of the obstacle rolls 1 attack die and suffers any damage or critical damage rolled. Then remove the obstacle.",
                    squadPointCost: 2,
                    value: "seismicTorpedo",
                },
                "sensorJammer":
                {
                    name: "Sensor Jammer",
                    type: UpgradeType.SYSTEM,
                    description: "When defending, you may change 1 of the attacker's Hit results to a Focus result. The attacker cannot reroll the die with the changed result.",
                    squadPointCost: 4,
                    value: "sensorJammer",
                },
                "sensorTeam":
                {
                    name: "Sensor Team",
                    type: UpgradeType.TEAM,
                    description: "When acquiring a Target Lock, you may lock onto an enemy ship at Range 1-5 (instead of Range 1-3).",
                    squadPointCost: 4,
                    value: "sensorTeam",
                },
                "shieldProjector":
                {
                    name: "Shield Projector",
                    type: UpgradeType.CARGO,
                    description: "When an enemy ship is declaring either a small or large ship as the target of its attack, you may spend 3 energy to force that ship to target you if possible.",
                    squadPointCost: 4,
                    value: "shieldProjector",
                },
                "shieldTechnician":
                {
                    name: "Shield Technician",
                    type: UpgradeType.CREW,
                    restrictions: [UpgradeRestriction.HUGE_SHIP_ONLY],
                    description: "When you perform a recover action, instead of spending all of your energy, you can choose any amount of energy to spend.",
                    squadPointCost: 1,
                    value: "shieldTechnician",
                },
                "shieldUpgrade":
                {
                    name: "Shield Upgrade",
                    type: UpgradeType.MODIFICATION,
                    description: "Increase your shield value by 1.",
                    shieldValue: 1,
                    squadPointCost: 4,
                    isImplemented: true,
                    value: "shieldUpgrade",
                },
                "singleTurbolasers":
                {
                    name: "Single Turbolasers",
                    type: UpgradeType.HARDPOINT,
                    header: UpgradeHeader.ATTACK_ENERGY,
                    energyLimit: 2,
                    weaponValue: 4,
                    ranges: [RangeRuler.THREE, RangeRuler.FOUR, RangeRuler.FIVE],
                    firingArcKey: FiringArc.FORWARD,
                    description: "Spend 2 energy from this card to perform this attack. The defender doubles his agility value against this attack. You may change 1 of your focus results to a hit result.",
                    squadPointCost: 8,
                    value: "singleTurbolasers",
                },
                "slaveI":
                {
                    name: "Slave I",
                    type: UpgradeType.TITLE,
                    restrictions: [UpgradeRestriction.FIRESPRAY_31_ONLY],
                    description: "Your upgrade bar gains the Torpedo upgrade icon.",
                    squadPointCost: 0,
                    isImplemented: true,
                    value: "slaveI",
                },
                "slicerTools":
                {
                    name: "Slicer Tools",
                    type: UpgradeType.CARGO,
                    header: UpgradeHeader.ACTION,
                    description: "Choose 1 or more enemy ships at Range 1-3 that have a stress token. For each ship chosen, you may spend 1 energy to cause that ship to suffer 1 damage.",
                    squadPointCost: 7,
                    value: "slicerTools",
                },
                "squadLeader":
                {
                    name: "Squad Leader",
                    type: UpgradeType.ELITE,
                    header: UpgradeHeader.ACTION,
                    description: "Choose 1 ship at Range 1-2 that has a lower pilot skill than you. The chosen ship may immediately perform 1 free action.",
                    squadPointCost: 2,
                    value: "squadLeader",
                },
                "st321":
                {
                    name: "ST-321",
                    type: UpgradeType.TITLE,
                    restrictions: [UpgradeRestriction.LAMBDA_CLASS_SHUTTLE_ONLY],
                    description: "When acquiring a Target Lock, you may lock onto any enemy ship in the play area.",
                    squadPointCost: 3,
                    value: "st321",
                },
                "stayOnTarget":
                {
                    name: "Stay On Target",
                    type: UpgradeType.ELITE,
                    description: "When you reveal a maneuver, you may rotate your dial to another maneuver with the same speed. Treat that maneuver as a red maneuver.",
                    squadPointCost: 2,
                    value: "stayOnTarget",
                },
                "stealthDevice":
                {
                    name: "Stealth Device",
                    type: UpgradeType.MODIFICATION,
                    description: "Increase your agility value by 1. If you are hit by an attack, discard this card.",
                    agilityValue: 1,
                    squadPointCost: 3,
                    isImplemented: true,
                    value: "stealthDevice",
                },
                "stygiumParticleAccelerator":
                {
                    name: "Stygium Particle Accelerator",
                    type: UpgradeType.MODIFICATION,
                    description: "When you either decloak or perform a cloak action, you may perform a free Evade action.",
                    squadPointCost: 2,
                    value: "stygiumParticleAccelerator",
                },
                "suppressor":
                {
                    name: "Suppressor",
                    type: UpgradeType.TITLE,
                    isUnique: true,
                    restrictions: [UpgradeRestriction.GOZANTI_CLASS_CRUISER_ONLY],
                    description: "Once per round, after you acquire a target lock on an enemy ship, you may remove 1 focus, evade, or blue target lock from that ship.",
                    energyValue: 2,
                    squadPointCost: 6,
                    value: "suppressor",
                },
                "swarmTactics":
                {
                    name: "Swarm Tactics",
                    type: UpgradeType.ELITE,
                    description: "At the start of the Combat phase, you may choose 1 friendly ship at Range 1. Until the end of this phase, treat the chosen ship as if its pilot skill were equal to your pilot skill.",
                    squadPointCost: 2,
                    value: "swarmTactics",
                },
                "tactician":
                {
                    name: "Tactician",
                    type: UpgradeType.CREW,
                    description: "After you perform an attack against a ship inside your firing arc at Range 2, that ship receives 1 stress token.",
                    squadPointCost: 2,
                    isImplemented: true,
                    value: "tactician",
                },
                "tacticalJammer":
                {
                    name: "Tactical Jammer",
                    type: UpgradeType.MODIFICATION,
                    restrictions: [UpgradeRestriction.LARGE_SHIP_ONLY],
                    description: "Your ship can obstruct enemy attacks.",
                    squadPointCost: 1,
                    value: "tacticalJammer",
                },
                "tantiveIv":
                {
                    name: "Tantive IV",
                    type: UpgradeType.TITLE,
                    isUnique: true,
                    restrictions: [UpgradeRestriction.CR90_ONLY],
                    description: "Your fore section upgrade bar gains 1 additional Crew and 1 additional Team upgrade icon.",
                    squadPointCost: 4,
                    isImplemented: true,
                    value: "tantiveIv",
                },
                "targetingAstromech":
                {
                    name: "Targeting Astromech",
                    type: UpgradeType.ASTROMECH,
                    description: "After you execute a red maneuver, you may acquire a target lock.",
                    squadPointCost: 2,
                    value: "targetingAstromech",
                },
                "targetingComputer":
                {
                    name: "Targeting Computer",
                    type: UpgradeType.MODIFICATION,
                    description: "Your action bar gains the Target Lock action icon.",
                    squadPointCost: 2,
                    isImplemented: true,
                    value: "targetingComputer",
                },
                "targetingCoordinator":
                {
                    name: "Targeting Coordinator",
                    type: UpgradeType.CREW,
                    restrictions: [UpgradeRestriction.LIMITED],
                    description: "You may spend 1 energy to choose 1 friendly ship at Range 1-2. Acquire a Target Lock, then assign the blue Target Lock token to the chosen ship.",
                    squadPointCost: 4,
                    value: "targetingCoordinator",
                },
                "thermalDetonators":
                {
                    name: "Thermal Detonators",
                    type: UpgradeType.BOMB,
                    description: "When you reveal your maneuver dial, you may discard this card to drop 1 thermal detonator token. This token detonates at the end of the Activation phase.",
                    squadPointCost: 3,
                    value: "thermalDetonators",
                },
                "tibannaGasSupplies":
                {
                    name: "Tibanna Gas Supplies",
                    type: UpgradeType.CARGO,
                    restrictions: [UpgradeRestriction.LIMITED],
                    header: UpgradeHeader.ENERGY,
                    description: "You may discard this card to gain 3 energy.",
                    squadPointCost: 4,
                    value: "tibannaGasSupplies",
                },
                "tieV1":
                {
                    name: "TIE/v1",
                    type: UpgradeType.TITLE,
                    restrictions: [UpgradeRestriction.TIE_ADVANCED_PROTOTYPE_ONLY],
                    description: "After you acquire a target lock, you may perform a free evade action.",
                    squadPointCost: 1,
                    value: "tieV1",
                },
                "tieX1":
                {
                    name: "TIE/x1",
                    type: UpgradeType.TITLE,
                    restrictions: [UpgradeRestriction.TIE_ADVANCED_ONLY],
                    description: "Your upgrade bar gains the System upgrade icon. If you equip a System upgrade, its squad point cost is reduced by 4 (to a minimum of 0).",
                    squadPointCost: 0,
                    value: "tieX1",
                },
                "tieX7":
                {
                    name: "TIE/x7",
                    type: UpgradeType.TITLE,
                    restrictions: [UpgradeRestriction.TIE_DEFENDER_ONLY],
                    description: "Your upgrade bar loses the Cannon and Missile upgrade icons. After executing a 3-, 4-, or 5-speed maneuver, you may assign 1 evade token to your ship.",
                    squadPointCost: -2,
                    value: "tieX7",
                },
                "torynFarr":
                {
                    name: "Toryn Farr",
                    type: UpgradeType.CREW,
                    isUnique: true,
                    restrictions: [UpgradeRestriction.HUGE_SHIP_ONLY, UpgradeRestriction.REBEL_ONLY],
                    header: UpgradeHeader.ACTION,
                    description: "Spend any amount of energy to choose that many enemy ships at Range 1-2. Remove all Focus, Evade, and blue Target Lock tokens from those ships.",
                    squadPointCost: 6,
                    value: "torynFarr",
                },
                "tractorBeam":
                {
                    name: "Tractor Beam",
                    type: UpgradeType.CANNON,
                    header: UpgradeHeader.ATTACK,
                    weaponValue: 3,
                    ranges: [RangeRuler.ONE, RangeRuler.TWO, RangeRuler.THREE],
                    firingArcKey: FiringArc.FORWARD,
                    description: "Attack 1 ship. If this attack hits, the defender receives 1 tractor beam token. Then cancel all dice results.",
                    cancelAllDiceResults: true,
                    squadPointCost: 1,
                    value: "tractorBeam",
                },
                "twinIonEngineMkII":
                {
                    name: "Twin Ion Engine Mk. II",
                    type: UpgradeType.MODIFICATION,
                    restrictions: [UpgradeRestriction.TIE_ONLY],
                    description: "You may treat all bank maneuvers (left or right) as green maneuvers.",
                    squadPointCost: 1,
                    isImplemented: true,
                    value: "twinIonEngineMkII",
                },
                "twinLaserTurret":
                {
                    name: "Twin Laser Turret",
                    type: UpgradeType.TURRET,
                    header: UpgradeHeader.ATTACK,
                    weaponValue: 3,
                    ranges: [RangeRuler.TWO, RangeRuler.THREE],
                    firingArcKey: FiringArc.FORWARD,
                    isWeaponTurret: true,
                    description: "Perform this attack twice (even against a ship outside your firing arc). Each time this attack hits, the defender suffers 1 damage. Then cancel all dice results.",
                    cancelAllDiceResults: true,
                    squadPointCost: 6,
                    isImplemented: true,
                    value: "twinLaserTurret",
                },
                "unhingedAstromech":
                {
                    name: "Unhinged Astromech",
                    type: UpgradeType.SALVAGED_ASTROMECH,
                    description: "You may treat all 3 speed maneuvers as green maneuvers.",
                    squadPointCost: 1,
                    isImplemented: true,
                    value: "unhingedAstromech",
                },
                "vector":
                {
                    name: "Vector",
                    type: UpgradeType.TITLE,
                    isUnique: true,
                    restrictions: [UpgradeRestriction.GOZANTI_CLASS_CRUISER_ONLY],
                    description: "After you execute a maneuver, you may deploy up to 4 docked ships (instead of 2).",
                    energyValue: 1,
                    squadPointCost: 2,
                    value: "vector",
                },
                "veteranInstincts":
                {
                    name: "Veteran Instincts",
                    type: UpgradeType.ELITE,
                    description: "Increase your pilot skill value by 2.",
                    pilotSkillValue: 2,
                    squadPointCost: 1,
                    isImplemented: true,
                    value: "veteranInstincts",
                },
                "virago":
                {
                    name: "Virago",
                    type: UpgradeType.TITLE,
                    isUnique: true,
                    restrictions: [UpgradeRestriction.STAR_VIPER_ONLY, UpgradeRestriction.PILOT_SKILL_ABOVE_3],
                    description: "Your upgrade bar gains the System and Illicit upgrade icons. You cannot equip this card if your pilot skill value is \"3\" or lower.",
                    squadPointCost: 1,
                    isImplemented: true,
                    value: "virago",
                },
                "weaponsEngineer":
                {
                    name: "Weapons Engineer",
                    type: UpgradeType.CREW,
                    description: "You may maintain 2 Target Locks (only 1 per enemy ship). When you acquire a Target Lock, you may lock onto 2 different ships.",
                    squadPointCost: 3,
                    value: "weaponsEngineer",
                },
                "weaponsGuidance":
                {
                    name: "Weapons Guidance",
                    type: UpgradeType.TECH,
                    description: "When attacking, you may spend a focus token to change 1 of your blank results to a Hit result.",
                    agentInput: true,
                    squadPointCost: 2,
                    isImplemented: true,
                    value: "weaponsGuidance",
                },
                "wed15RepairDroid":
                {
                    name: "WED-15 Repair Droid",
                    type: UpgradeType.CREW,
                    restrictions: [UpgradeRestriction.HUGE_SHIP_ONLY],
                    header: UpgradeHeader.ACTION,
                    description: "Spend 1 energy to discard 1 of your facedown Damage cards, or spend 3 energy to discard 1 of your faceup Damage cards.",
                    squadPointCost: 2,
                    value: "wed15RepairDroid",
                },
                "wingman":
                {
                    name: "Wingman",
                    type: UpgradeType.ELITE,
                    description: "At the start of the Combat phase, remove 1 stress token from another friendly ship at Range 1.",
                    squadPointCost: 2,
                    value: "wingman",
                },
                "wired":
                {
                    name: "Wired",
                    type: UpgradeType.ELITE,
                    description: "When attacking or defending, if you are stressed, you may reroll 1 or more of your Focus results.",
                    squadPointCost: 1,
                    isImplemented: true,
                    value: "wired",
                },
                "xx23SThreadTracers":
                {
                    name: "XX-23 S-Thread Tracers",
                    type: UpgradeType.MISSILE,
                    header: UpgradeHeader.ATTACK_FOCUS,
                    weaponValue: 3,
                    ranges: [RangeRuler.ONE, RangeRuler.TWO, RangeRuler.THREE],
                    firingArcKey: FiringArc.FORWARD,
                    description: "Discard this card to perform this attack. If this attack hits, each friendly ship at Range 1-2 of you may acquire a target lock on the defender. Then cancel all dice results.",
                    discardThisCard: true,
                    cancelAllDiceResults: true,
                    squadPointCost: 1,
                    isImplemented: true,
                    value: "xx23SThreadTracers",
                },
                "ysanneIsard":
                {
                    name: "Ysanne Isard",
                    type: UpgradeType.CREW,
                    isUnique: true,
                    restrictions: [UpgradeRestriction.IMPERIAL_ONLY],
                    description: "At the start of the Combat phase, if you have no shields and at least 1 Damage card assigned to your ship, you may perform a free Evade action.",
                    squadPointCost: 4,
                    isImplemented: true,
                    value: "ysanneIsard",
                },
                "zebOrrelios":
                {
                    name: "\"Zeb\" Orrelios",
                    type: UpgradeType.CREW,
                    isUnique: true,
                    restrictions: [UpgradeRestriction.REBEL_ONLY],
                    description: "Enemy ships inside your firing arc that you are touching are not considered to be touching you when either you or they activate during the Combat phase.",
                    squadPointCost: 1,
                    value: "zebOrrelios",
                },
                "zuckuss":
                {
                    name: "Zuckuss",
                    type: UpgradeType.CREW,
                    isUnique: true,
                    restrictions: [UpgradeRestriction.SCUM_ONLY],
                    description: "When attacking, you may receive any number of stress tokens to choose an equal number of defense dice. The defender must reroll those dice.",
                    squadPointCost: 1,
                    value: "zuckuss",
                },
            },

            getName: function(upgradeCard)
            {
                var properties = UpgradeCard.properties[upgradeCard];
                var isUnique = properties.isUnique;
                var answer = "";

                if (isUnique)
                {
                    answer += "\u25CF ";
                }

                answer += properties.name;

                return answer;
            },

            values: function()
            {
                return Object.getOwnPropertyNames(UpgradeCard.properties);
            },

            valuesByPilotAndType: function(pilotKey, upgradeType)
            {
                InputValidator.validateNotNull("pilotKey", pilotKey);
                InputValidator.validateNotNull("upgradeType", upgradeType);

                var pilot = Pilot.properties[pilotKey];
                if (!pilot)
                {
                    var parentPilotKey = pilotKey.split(".")[0];
                    pilot = Pilot.properties[parentPilotKey];
                }
                if (pilot === undefined)
                {
                    throw "UpgradeCard: Can't find pilot for pilotKey: " + pilotKey;
                }
                var myPilotKey = pilot.value;

                return this.valuesByType(upgradeType).filter(function(upgradeCard)
                {
                    var restrictions = UpgradeCard.properties[upgradeCard].restrictions;
                    return UpgradeRestriction.passes(restrictions, myPilotKey);
                });
            },

            valuesByType: function(upgradeType)
            {
                InputValidator.validateNotNull("upgradeType", upgradeType);

                return this.values().filter(function(upgradeCard)
                {
                    return UpgradeCard.properties[upgradeCard].type === upgradeType;
                });
            },
        };

        if (Object.freeze)
        {
            Object.freeze(UpgradeCard);
        }

        return UpgradeCard;
    });

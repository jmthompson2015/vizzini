define(
        [ "FiringArc", "RangeRuler", "ShipState", "UpgradeHeader", "UpgradeRestriction", "UpgradeType" ],
        function(FiringArc, RangeRuler, ShipState, UpgradeHeader, UpgradeRestriction, UpgradeType)
        {
            "use strict";
            var UpgradeCard =
            {
                A_WING_TEST_PILOT: "aWingTestPilot",
                ACCURACY_CORRECTOR: "accuracyCorrector",
                ADRENALINE_RUSH: "adrenalineRush",
                ADVANCED_CLOAKING_DEVICE: "advancedCloakingDevice",
                ADVANCED_HOMING_MISSILES: "advancedHomingMissiles",
                ADVANCED_PROTON_TORPEDOES: "advancedProtonTorpedoes",
                ADVANCED_SENSORS: "advancedSensors",
                ADVANCED_SLAM: "advancedSlam",
                ADVANCED_TARGETING_COMPUTER: "advancedTargetingComputer",
                ANDRASTA: "andrasta",
                ANTI_PURSUIT_LASERS: "antiPursuitLasers",
                ASSAULT_MISSILES: "assaultMissiles",
                AUTOBLASTER: "autoblaster",
                AUTOBLASTER_TURRET: "autoblasterTurret",
                AUTOTHRUSTERS: "autothrusters",
                B_WING_E2: "bWingE2",
                BB_8: "bb8",
                BLASTER_TURRET: "blasterTurret",
                BODYGUARD: "bodyguard",
                BOMB_LOADOUT: "bombLoadout",
                BOMBARDIER: "bombardier",
                BOSSK: "bossk",
                BTL_A4_Y_WING: "btlA4YWing",
                C_3PO: "c3po",
                CALCULATION: "calculation",
                CARLIST_RIEEKAN: "carlistRieekan",
                CHARDAAN_REFIT: "chardaanRefit",
                CHEWBACCA: "chewbacca",
                CLUSTER_MINES: "clusterMines",
                CLUSTER_MISSILES: "clusterMissiles",
                COMBAT_RETROFIT: "combatRetrofit",
                COMM_RELAY: "commRelay",
                CONCUSSION_MISSILES: "concussionMissiles",
                CONNER_NET: "connerNet",
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
                DETERMINATION: "determination",
                DRAW_THEIR_FIRE: "drawTheirFire",
                ELUSIVENESS: "elusiveness",
                EMPEROR_PALPATINE: "emperorPalpatine",
                ENGINE_UPGRADE: "engineUpgrade",
                ENGINEERING_TEAM: "engineeringTeam",
                ENHANCED_SCOPES: "enhancedScopes",
                EXPERIMENTAL_INTERFACE: "experimentalInterface",
                EXPERT_HANDLING: "expertHandling",
                EXPOSE: "expose",
                EXTRA_MUNITIONS: "extraMunitions",
                FEEDBACK_ARRAY: "feedbackArray",
                FIRE_CONTROL_SYSTEM: "fireControlSystem",
                FLECHETTE_CANNON: "flechetteCannon",
                FLECHETTE_TORPEDOES: "flechetteTorpedoes",
                FLEET_OFFICER: "fleetOfficer",
                FLIGHT_INSTRUCTOR: "flightInstructor",
                GENIUS: "genius",
                GLITTERSTIM: "glitterstim",
                GREEDO: "greedo",
                GUNNER: "gunner",
                GUNNERY_TEAM: "gunneryTeam",
                HAN_SOLO: "hanSolo",
                HEAVY_LASER_CANNON: "heavyLaserCannon",
                HEAVY_SCYK_INTERCEPTOR: "heavyScykInterceptor",
                HOMING_MISSILES: "homingMissiles",
                HOT_SHOT_BLASTER: "hotShotBlaster",
                HOUNDS_TOOTH: "houndsTooth",
                HULL_UPGRADE: "hullUpgrade",
                IG_2000: "ig2000",
                INERTIAL_DAMPENERS: "inertialDampeners",
                INTEGRATED_ASTROMECH: "integratedAstromech",
                INTELLIGENCE_AGENT: "intelligenceAgent",
                INTIMIDATION: "intimidation",
                ION_BOMBS: "ionBombs",
                ION_CANNON: "ionCannon",
                ION_CANNON_TURRET: "ionCannonTurret",
                ION_PROJECTOR: "ionProjector",
                ION_PULSE_MISSILES: "ionPulseMissiles",
                ION_TORPEDOES: "ionTorpedoes",
                JAN_DODONNA: "janDodonna",
                JAN_ORS: "janOrs",
                JUKE: "juke",
                K4_SECURITY_DROID: "k4SecurityDroid",
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
                MOFF_JERJERROD: "moffJerjerrod",
                MOLDY_CROW: "moldyCrow",
                MUNITIONS_FAILSAFE: "munitionsFailsafe",
                NAVIGATOR: "navigator",
                NIEN_NUNB: "nienNunb",
                OPPORTUNIST: "opportunist",
                OUTLAW_TECH: "outlawTech",
                OUTMANEUVER: "outmaneuver",
                OUTRIDER: "outrider",
                PLASMA_TORPEDOES: "plasmaTorpedoes",
                PREDATOR: "predator",
                PROTON_BOMBS: "protonBombs",
                PROTON_ROCKETS: "protonRockets",
                PROTON_TORPEDOES: "protonTorpedoes",
                PROXIMITY_MINES: "proximityMines",
                PUSH_THE_LIMIT: "pushTheLimit",
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
                R5_P9: "r5P9",
                R5_X3: "r5x3",
                R7_ASTROMECH: "r7Astromech",
                R7_T1: "r7T1",
                RAYMUS_ANTILLES: "raymusAntilles",
                REBEL_CAPTIVE: "rebelCaptive",
                RECON_SPECIALIST: "reconSpecialist",
                ROYAL_GUARD_TIE: "royalGuardTie",
                RUTHLESSNESS: "ruthlessness",
                SABOTEUR: "saboteur",
                SALVAGED_ASTROMECH: "salvagedAstromech",
                SEISMIC_CHARGES: "seismicCharges",
                SENSOR_JAMMER: "sensorJammer",
                SENSOR_TEAM: "sensorTeam",
                SHIELD_UPGRADE: "shieldUpgrade",
                SLAVE_I: "slaveI",
                SQUAD_LEADER: "squadLeader",
                ST_321: "st321",
                STAY_ON_TARGET: "stayOnTarget",
                STEALTH_DEVICE: "stealthDevice",
                STYGIUM_PARTICLE_ACCELERATOR: "stygiumParticleAccelerator",
                SWARM_TACTICS: "swarmTactics",
                TACTICIAN: "tactician",
                TACTICAL_JAMMER: "tacticalJammer",
                TARGETING_ASTROMECH: "targetingAstromech",
                TARGETING_COMPUTER: "targetingComputer",
                TARGETING_COORDINATOR: "targetingCoordinator",
                TIE_X1: "tieX1",
                TORYN_FARR: "torynFarr",
                TWIN_ION_ENGINE_MK_II: "twinIonEngineMkII",
                TWIN_LASER_TURRET: "twinLaserTurret",
                UNHINGED_ASTROMECH: "unhingedAstromech",
                VETERAN_INSTINCTS: "veteranInstincts",
                VIRAGO: "virago",
                WEAPONS_ENGINEER: "weaponsEngineer",
                WEAPONS_GUIDANCE: "weaponsGuidance",
                WED_15_REPAIR_DROID: "wed15RepairDroid",
                WINGMAN: "wingman",
                WIRED: "wired",
                YSANNE_ISARD: "ysanneIsard",

                properties:
                {
                    // @see Token.upgradeTypeKeys() for effect implementation.
                    "aWingTestPilot":
                    {
                        name: "A-Wing Test Pilot",
                        type: UpgradeType.TITLE,
                        isUnique: false,
                        restrictions: [ UpgradeRestriction.A_WING_ONLY, UpgradeRestriction.PILOT_SKILL_ABOVE_1 ],
                        description: "Your upgrade bar gains 1 Elite upgrade icon. You cannot equip 2 of the same Elite upgrade cards. You cannot equip this card if your pilot skill value is \"1\" or lower.",
                        squadPointCost: 0,
                        isImplemented: true,
                        value: "aWingTestPilot",
                    },
                    "accuracyCorrector":
                    {
                        name: "Accuracy Corrector",
                        type: UpgradeType.SYSTEM,
                        isUnique: false,
                        description: "When attacking, you may cancel all of your dice results. Then, you may add 2 Hit results to your roll. Your dice cannot be modified again during this attack.",
                        squadPointCost: 3,
                        value: "accuracyCorrector",
                    },
                    "adrenalineRush":
                    {
                        name: "Adrenaline Rush",
                        type: UpgradeType.ELITE,
                        isUnique: false,
                        description: "When you reveal a red maneuver, you may discard this card to treat that maneuver as a white maneuver until the end of the Activation phase.",
                        squadPointCost: 1,
                        value: "adrenalineRush",
                    },
                    "advancedCloakingDevice":
                    {
                        name: "Advanced Cloaking Device",
                        type: UpgradeType.MODIFICATION,
                        isUnique: false,
                        restrictions: [ UpgradeRestriction.TIE_PHANTOM_ONLY ],
                        description: "After you perform an attack, you may perform a free cloak action.",
                        squadPointCost: 4,
                        value: "advancedCloakingDevice",
                    },
                    "advancedHomingMissiles":
                    {
                        name: "Advanced Homing Missiles",
                        type: UpgradeType.MISSILE,
                        isUnique: false,
                        header: UpgradeHeader.ATTACK_TARGET_LOCK,
                        weaponValue: 3,
                        ranges: [ RangeRuler.TWO ],
                        firingArc: FiringArc.FORWARD,
                        description: "Discard this card to perform this attack. If this attack hits, deal 1 faceup Damage card to the defender. Then cancel all dice results.",
                        discardThisCard: true,
                        squadPointCost: 3,
                        isImplemented: true,
                        value: "advancedHomingMissiles",
                    },
                    // @see CombatAction.doIt() for effect implementation.
                    "advancedProtonTorpedoes":
                    {
                        name: "Advanced Proton Torpedoes",
                        type: UpgradeType.TORPEDO,
                        isUnique: false,
                        header: UpgradeHeader.ATTACK_TARGET_LOCK,
                        weaponValue: 5,
                        ranges: [ RangeRuler.ONE ],
                        firingArc: FiringArc.FORWARD,
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
                        isUnique: false,
                        description: "Immediately before you reveal your maneuver, you may perform 1 free action. If you use this ability, you must skip your \"Perform Action\" step during this round.",
                        squadPointCost: 3,
                        value: "advancedSensors",
                    },
                    "advancedSlam":
                    {
                        name: "Advanced SLAM",
                        type: UpgradeType.MODIFICATION,
                        isUnique: false,
                        description: "After performing a SLAM action, if you did not overlap an obstacle or another ship, you may perform a free action.",
                        squadPointCost: 2,
                        value: "advancedSlam",
                    },
                    "advancedTargetingComputer":
                    {
                        name: "Advanced Targeting Computer",
                        type: UpgradeType.SYSTEM,
                        isUnique: false,
                        restrictions: [ UpgradeRestriction.TIE_ADVANCED_ONLY ],
                        description: "When attacking with your primary weapon, if you have a Target Lock on the defender, you may add 1 critical result to your roll. If you do, you cannot spend Target Locks during this attack.",
                        squadPointCost: 5,
                        value: "advancedTargetingComputer",
                    },
                    // @see Token.upgradeTypeKeys() for effect implementation.
                    "andrasta":
                    {
                        name: "Andrasta",
                        type: UpgradeType.TITLE,
                        isUnique: true,
                        restrictions: [ UpgradeRestriction.FIRESPRAY_31_ONLY ],
                        description: "Your upgrade bar gains two additional Bomb upgrade icons.",
                        squadPointCost: 0,
                        isImplemented: true,
                        value: "andrasta",
                    },
                    "antiPursuitLasers":
                    {
                        name: "Anti-Pursuit Lasers",
                        type: UpgradeType.MODIFICATION,
                        isUnique: false,
                        restrictions: [ UpgradeRestriction.LARGE_SHIP_ONLY ],
                        description: "After an enemy ship executes a maneuver that causes it to overlap your ship, roll 1 attack die. On a Hit or Critical Hit result, the enemy ship suffers 1 damage.",
                        squadPointCost: 2,
                        value: "antiPursuitLasers",
                    },
                    "assaultMissiles":
                    {
                        name: "Assault Missiles",
                        type: UpgradeType.MISSILE,
                        isUnique: false,
                        header: UpgradeHeader.ATTACK_TARGET_LOCK,
                        weaponValue: 4,
                        ranges: [ RangeRuler.TWO, RangeRuler.THREE ],
                        firingArc: FiringArc.FORWARD,
                        description: "Spend your Target Lock and discard this card to perform this attack. If this attack hits, each other ship at Range 1 of the defender suffers 1 damage.",
                        squadPointCost: 5,
                        value: "assaultMissiles",
                    },
                    "autoblaster":
                    {
                        name: "Autoblaster",
                        type: UpgradeType.CANNON,
                        isUnique: false,
                        header: UpgradeHeader.ATTACK,
                        weaponValue: 3,
                        ranges: [ RangeRuler.ONE ],
                        firingArc: FiringArc.FORWARD,
                        description: "Attack 1 ship. Your Hit results cannot be canceled by defense dice. The defender may cancel Critical Hit results before Hit results.",
                        squadPointCost: 5,
                        value: "autoblaster",
                    },
                    "autoblasterTurret":
                    {
                        name: "Autoblaster Turret",
                        type: UpgradeType.TURRET,
                        isUnique: false,
                        header: UpgradeHeader.ATTACK,
                        weaponValue: 2,
                        ranges: [ RangeRuler.ONE ],
                        firingArc: FiringArc.TURRET,
                        description: "Attack 1 ship (even a ship outside your firing arc). Your Hit results cannot be canceled by defense dice. The defender may cancel Critical Hit results before Hit results.",
                        squadPointCost: 2,
                        value: "autoblasterTurret",
                    },
                    "autothrusters":
                    {
                        name: "Autothrusters",
                        type: UpgradeType.MODIFICATION,
                        isUnique: false,
                        description: "When defending, if you are beyond Range 2 or outside the attacker's firing arc, you may change 1 of your blank results to an Evade result. You can equip this card only if you have the Boost action icon.",
                        squadPointCost: 2,
                        value: "autothrusters",
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
                    // @see CombatAction.doIt() for effect implementation.
                    "blasterTurret":
                    {
                        name: "Blaster Turret",
                        type: UpgradeType.TURRET,
                        isUnique: false,
                        header: UpgradeHeader.ATTACK_FOCUS,
                        weaponValue: 3,
                        ranges: [ RangeRuler.ONE, RangeRuler.TWO ],
                        firingArc: FiringArc.TURRET,
                        description: "Spend 1 Focus token to perform this attack against 1 ship (even a ship outside your firing arc).",
                        spendFocus: true,
                        squadPointCost: 4,
                        isImplemented: true,
                        value: "blasterTurret",
                    },
                    "bodyguard":
                    {
                        name: "Bodyguard",
                        type: UpgradeType.ELITE,
                        isUnique: true,
                        restrictions: [ UpgradeRestriction.SCUM_ONLY ],
                        description: "At the start of the Combat phase, you may spend a Focus token to choose a friendly ship at Range 1 with higher pilot skill than you. Increase its agility value by 1 until the end of the round.",
                        squadPointCost: 2,
                        value: "bodyguard",
                    },
                    // @see Token.upgradeTypeKeys() for effect implementation.
                    "bombLoadout":
                    {
                        name: "Bomb Loadout",
                        type: UpgradeType.TORPEDO,
                        isUnique: false,
                        restrictions: [ UpgradeRestriction.Y_WING_ONLY, UpgradeRestriction.LIMITED ],
                        description: "Your upgrade bar gains the Bomb icon.",
                        squadPointCost: 0,
                        isImplemented: true,
                        value: "bombLoadout",
                    },
                    "bombardier":
                    {
                        name: "Bombardier",
                        type: UpgradeType.CREW,
                        isUnique: false,
                        description: "When dropping a bomb, you may use the Straight 2 template instead of the Straight 1 template.",
                        squadPointCost: 1,
                        value: "bombardier",
                    },
                    "bossk":
                    {
                        name: "Bossk",
                        type: UpgradeType.CREW,
                        isUnique: false,
                        restrictions: [ UpgradeRestriction.SCUM_ONLY ],
                        description: "After you perform an attack that does not hit, if you are not stressed, you must receive 1 Stress token. Then assign 1 Focus token to your ship and acquire a Target Lock on the defender.",
                        squadPointCost: 2,
                        value: "bossk",
                    },
                    "btlA4YWing":
                    {
                        name: "BTL-A4 Y-Wing",
                        type: UpgradeType.TITLE,
                        isUnique: false,
                        restrictions: [ UpgradeRestriction.Y_WING_ONLY ],
                        description: "You cannot attack ships outside your firing arc. After you perform a primary weapon attack, you may immediately perform an attack with a Turret secondary weapon.",
                        squadPointCost: 0,
                        value: "btlA4YWing",
                    },
                    // @see Token.upgradeTypeKeys() for effect implementation.
                    "bWingE2":
                    {
                        name: "B-Wing/E2",
                        type: UpgradeType.MODIFICATION,
                        isUnique: false,
                        restrictions: [ UpgradeRestriction.B_WING_ONLY ],
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
                        restrictions: [ UpgradeRestriction.REBEL_ONLY ],
                        description: "Once per round, before you roll 1 or more defense dice, you may guess aloud a number of Evade results. If you roll that many Evade results (before modifying dice), add 1 Evade result.",
                        squadPointCost: 3,
                        value: "c3po",
                    },
                    "calculation":
                    {
                        name: "Calculation",
                        type: UpgradeType.ELITE,
                        isUnique: false,
                        description: "When attacking, you may spend a Focus token to change 1 of your Focus results to a Critical Hit result.",
                        squadPointCost: 1,
                        value: "calculation",
                    },
                    "carlistRieekan":
                    {
                        name: "Carlist Rieekan",
                        type: UpgradeType.CREW,
                        isUnique: true,
                        restrictions: [ UpgradeRestriction.HUGE_SHIP_ONLY, UpgradeRestriction.REBEL_ONLY ],
                        description: "At the start of the Activation phase, you may discard this card to treat each friendly ship's pilot skill value as \"12\" until the end of the phase.",
                        squadPointCost: 3,
                        value: "carlistRieekan",
                    },
                    // Effect implemented through squad point cost.
                    "chardaanRefit":
                    {
                        name: "Chardaan Refit",
                        type: UpgradeType.MISSILE,
                        isUnique: false,
                        restrictions: [ UpgradeRestriction.A_WING_ONLY ],
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
                        restrictions: [ UpgradeRestriction.REBEL_ONLY ],
                        description: "When you are dealt a Damage card, you may immediately discard that card and recover 1 shield. Then, discard this Upgrade card.",
                        squadPointCost: 4,
                        value: "chewbacca",
                    },
                    "clusterMines":
                    {
                        name: "Cluster Mines",
                        type: UpgradeType.BOMB,
                        isUnique: false,
                        header: UpgradeHeader.ACTION,
                        description: "Discard this card to drop 1 cluster mine token set. When a ship's base or maneuver template overlaps a cluster mine token, that token detonates.",
                        squadPointCost: 4,
                        value: "clusterMines",
                    },
                    "clusterMissiles":
                    {
                        name: "Cluster Missiles",
                        type: UpgradeType.MISSILE,
                        isUnique: false,
                        header: UpgradeHeader.ATTACK_TARGET_LOCK,
                        weaponValue: 3,
                        ranges: [ RangeRuler.ONE, RangeRuler.TWO ],
                        firingArc: FiringArc.FORWARD,
                        description: "Spend your Target Lock and discard this card to perform this attack twice.",
                        squadPointCost: 4,
                        value: "clusterMissiles",
                    },
                    // @see Token.hullValue() and Token.shieldValue() for effect implementation.
                    "combatRetrofit":
                    {
                        name: "Combat Retrofit",
                        type: UpgradeType.MODIFICATION,
                        isUnique: false,
                        description: "Increase your hull value by 2 and your shield value by 1.",
                        shipState: new ShipState(null, null, null, 2, 1),
                        squadPointCost: 10,
                        isImplemented: true,
                        value: "combatRetrofit",
                    },
                    "commRelay":
                    {
                        name: "Comm Relay",
                        type: UpgradeType.TECH,
                        isUnique: false,
                        description: "You cannot have more than 1 Evade token. During the End phase, do not remove an unused Evade token from your ship.",
                        squadPointCost: 3,
                        value: "commRelay",
                    },
                    // @see CombatAction.doIt() for effect implementation.
                    "concussionMissiles":
                    {
                        name: "Concussion Missiles",
                        type: UpgradeType.MISSILE,
                        isUnique: false,
                        header: UpgradeHeader.ATTACK_TARGET_LOCK,
                        weaponValue: 4,
                        ranges: [ RangeRuler.TWO, RangeRuler.THREE ],
                        firingArc: FiringArc.FORWARD,
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
                        isUnique: false,
                        header: UpgradeHeader.ACTION,
                        description: "Discard this card to drop 1 Conner net token. When a ship's base or maneuver template overlaps this token, this token detonates.",
                        squadPointCost: 4,
                        value: "connerNet",
                    },
                    "coolHand":
                    {
                        name: "Cool Hand",
                        type: UpgradeType.ELITE,
                        isUnique: false,
                        description: "When you receive a stress token, you may discard this card to assign 1 focus or evade token to your ship.",
                        squadPointCost: 1,
                        value: "coolHand",
                    },
                    "countermeasures":
                    {
                        name: "Countermeasures",
                        type: UpgradeType.MODIFICATION,
                        isUnique: false,
                        restrictions: [ UpgradeRestriction.LARGE_SHIP_ONLY ],
                        description: "At the start of the Combat phase, you may discard this card to increase your agility value by 1 until the end of the round. Then you may remove 1 enemy Target Lock from your ship.",
                        squadPointCost: 3,
                        value: "countermeasures",
                    },
                    "crackShot":
                    {
                        name: "Crack Shot",
                        type: UpgradeType.ELITE,
                        isUnique: false,
                        description: "When attacking a ship inside your firing arc, you may discard this card to cancel 1 of the defender's Evade results.",
                        squadPointCost: 1,
                        value: "crackShot",
                    },
                    "daredevil":
                    {
                        name: "Daredevil",
                        type: UpgradeType.ELITE,
                        isUnique: false,
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
                        restrictions: [ UpgradeRestriction.IMPERIAL_ONLY ],
                        description: "After you perform an attack against an enemy ship, you may suffer 2 damage to cause that ship to suffer 1 critical damage.",
                        squadPointCost: 3,
                        value: "darthVader",
                    },
                    "dashRendar":
                    {
                        name: "Dash Rendar",
                        type: UpgradeType.CREW,
                        isUnique: true,
                        restrictions: [ UpgradeRestriction.REBEL_ONLY ],
                        description: "You may perform attacks while overlapping an obstacle. Your attacks cannot be obstructed.",
                        squadPointCost: 2,
                        value: "dashRendar",
                    },
                    "dauntless":
                    {
                        name: "Dauntless",
                        type: UpgradeType.TITLE,
                        isUnique: true,
                        restrictions: [ UpgradeRestriction.VT_49_DECIMATOR_ONLY ],
                        description: "After you execute a maneuver that causes you to overlap another ship, you may perform 1 free action. Then receive 1 stress token.",
                        squadPointCost: 2,
                        value: "dauntless",
                    },
                    "deadMansSwitch":
                    {
                        name: "Dead Man's Switch",
                        type: UpgradeType.ILLICIT,
                        isUnique: false,
                        description: "When you are destroyed, each ship at Range 1 suffers 1 damage.",
                        squadPointCost: 2,
                        value: "deadMansSwitch",
                    },
                    "deadeye":
                    {
                        name: "Deadeye",
                        type: UpgradeType.ELITE,
                        isUnique: false,
                        description: "You may treat the \"Attack [Target Lock]:\" header as \"Attack [Focus]:.\" When an attack instructs you to spend a Target Lock, you may spend a Focus token instead.",
                        squadPointCost: 1,
                        value: "deadeye",
                    },
                    "decoy":
                    {
                        name: "Decoy",
                        type: UpgradeType.ELITE,
                        isUnique: false,
                        description: "At the start of the Combat phase, you may choose 1 friendly ship at Range 1-2. Exchange your pilot skill with that ship's pilot skill until the end of the phase.",
                        squadPointCost: 2,
                        value: "decoy",
                    },
                    // @see DamageDealer.dealDamage() for effect implementation.
                    "determination":
                    {
                        name: "Determination",
                        type: UpgradeType.ELITE,
                        isUnique: false,
                        description: "When you are dealt a faceup Damage card with the Pilot trait, discard it immediately without resolving its effect.",
                        squadPointCost: 1,
                        isImplemented: true,
                        value: "determination",
                    },
                    "drawTheirFire":
                    {
                        name: "Draw Their Fire",
                        type: UpgradeType.ELITE,
                        isUnique: false,
                        description: "When a friendly ship at Range 1 is hit by an attack, you may suffer 1 of the uncanceled Critical Hit results instead of the target ship.",
                        squadPointCost: 1,
                        value: "drawTheirFire",
                    },
                    "elusiveness":
                    {
                        name: "Elusiveness",
                        type: UpgradeType.ELITE,
                        isUnique: false,
                        description: "When defending, you may receive 1 stress token to choose 1 attack die. The attacker must reroll that die. If you have at least 1 stress token, you cannot use this ability.",
                        squadPointCost: 2,
                        value: "elusiveness",
                    },
                    "emperorPalpatine":
                    {
                        name: "Emperor Palpatine",
                        type: UpgradeType.CREW,
                        isUnique: true,
                        restrictions: [ UpgradeRestriction.IMPERIAL_ONLY ],
                        description: "Once per round, you may change a friendly ship's die result to any other die result. That die result cannot be modified again.",
                        squadPointCost: 8,
                        value: "emperorPalpatine",
                    },
                    // @see Token.shipActions() for effect implementation.
                    "engineUpgrade":
                    {
                        name: "Engine Upgrade",
                        type: UpgradeType.MODIFICATION,
                        isUnique: false,
                        description: "Your action bar gains the Boost action icon.",
                        squadPointCost: 4,
                        isImplemented: true,
                        value: "engineUpgrade",
                    },
                    "engineeringTeam":
                    {
                        name: "Engineering Team",
                        type: UpgradeType.TEAM,
                        isUnique: false,
                        restrictions: [ UpgradeRestriction.LIMITED ],
                        description: "During the Activation phase, when you reveal a Straight maneuver, gain 1 additional energy during the \"Gain Energy\" step.",
                        squadPointCost: 4,
                        value: "engineeringTeam",
                    },
                    "enhancedScopes":
                    {
                        name: "Enhanced Scopes",
                        type: UpgradeType.SYSTEM,
                        isUnique: false,
                        description: "During the Activation phase, treat your pilot skill value as \"0.\"",
                        squadPointCost: 1,
                        value: "enhancedScopes",
                    },
                    "experimentalInterface":
                    {
                        name: "Experimental Interface",
                        type: UpgradeType.MODIFICATION,
                        isUnique: false,
                        header: UpgradeHeader.ACTION,
                        description: "Once per round, after you perform an action, you may perform 1 free action from an equipped Upgrade card with the \"Action:\" header. Then receive 1 stress token.",
                        squadPointCost: 3,
                        value: "experimentalInterface",
                    },
                    "expertHandling":
                    {
                        name: "Expert Handling",
                        type: UpgradeType.ELITE,
                        isUnique: false,
                        header: UpgradeHeader.ACTION,
                        description: "Perform a free barrel roll action. If you do not have the Barrel Roll action icon, receive 1 stress token. You may then remove 1 enemy Target Lock from your ship.",
                        squadPointCost: 2,
                        value: "expertHandling",
                    },
                    "expose":
                    {
                        name: "Expose",
                        type: UpgradeType.ELITE,
                        isUnique: false,
                        header: UpgradeHeader.ACTION,
                        description: "Until the end of the round, increase your primary weapon value by 1 and decrease your agility value by 1.",
                        squadPointCost: 4,
                        value: "expose",
                    },
                    "extraMunitions":
                    {
                        name: "Extra Munitions",
                        type: UpgradeType.TORPEDO,
                        isUnique: false,
                        restrictions: [ UpgradeRestriction.LIMITED ],
                        description: "When you equip this card, place 1 ordnance token on each equipped Torpedo, Missile, and Bomb Upgrade card. When you are instructed to discard an Upgrade card, you may discard 1 ordnance token on that card instead.",
                        squadPointCost: 2,
                        value: "extraMunitions",
                    },
                    "feedbackArray":
                    {
                        name: "Feedback Array",
                        type: UpgradeType.ILLICIT,
                        isUnique: false,
                        description: "During the Combat phase, instead of performing any attacks, you may receive 1 ion token and suffer 1 damage to choose 1 enemy ship at Range 1. That ship suffers 1 damage.",
                        squadPointCost: 2,
                        value: "feedbackArray",
                    },
                    "fireControlSystem":
                    {
                        name: "Fire Control System",
                        type: UpgradeType.SYSTEM,
                        isUnique: false,
                        description: "After you perform an attack, you may acquire a Target Lock on the defender.",
                        squadPointCost: 2,
                        value: "fireControlSystem",
                    },
                    "flechetteCannon":
                    {
                        name: "Flechette Cannon",
                        type: UpgradeType.CANNON,
                        isUnique: false,
                        header: UpgradeHeader.ATTACK,
                        weaponValue: 3,
                        ranges: [ RangeRuler.ONE, RangeRuler.TWO, RangeRuler.THREE ],
                        firingArc: FiringArc.FORWARD,
                        description: "Attack 1 ship. If this attack hits, the defender suffers 1 damage and, if the defender is not stressed, it also receives 1 stress token. Then cancel all dice results.",
                        squadPointCost: 2,
                        isImplemented: true,
                        value: "flechetteCannon",
                    },
                    "flechetteTorpedoes":
                    {
                        name: "Flechette Torpedoes",
                        type: UpgradeType.TORPEDO,
                        isUnique: false,
                        header: UpgradeHeader.ATTACK_TARGET_LOCK,
                        weaponValue: 3,
                        ranges: [ RangeRuler.TWO, RangeRuler.THREE ],
                        firingArc: FiringArc.FORWARD,
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
                        isUnique: false,
                        restrictions: [ UpgradeRestriction.IMPERIAL_ONLY ],
                        header: UpgradeHeader.ACTION,
                        description: "Choose up to 2 friendly ships at Range 1-2 and assign 1 Focus token to each of those ships. Then receive 1 stress token.",
                        squadPointCost: 3,
                        value: "fleetOfficer",
                    },
                    "flightInstructor":
                    {
                        name: "Flight Instructor",
                        type: UpgradeType.CREW,
                        isUnique: false,
                        description: "When defending, you may reroll 1 of your Focus results. If the attacker's pilot skill value is \"2\" or lower, you may reroll 1 of your blank results instead.",
                        squadPointCost: 4,
                        value: "flightInstructor",
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
                    "glitterstim":
                    {
                        name: "Glitterstim",
                        type: UpgradeType.ILLICIT,
                        isUnique: false,
                        description: "At the start of the Combat phase, you may discard this card and receive 1 stress token. If you do, until the end of the round, when attacking or defending, you may change all of your Focus results to Hit or Evade results.",
                        squadPointCost: 2,
                        value: "glitterstim",
                    },
                    "greedo":
                    {
                        name: "Greedo",
                        type: UpgradeType.CREW,
                        isUnique: true,
                        restrictions: [ UpgradeRestriction.SCUM_ONLY ],
                        description: "The first time you attack each round and the first time you defend each round, the first Damage card dealt is dealt faceup.",
                        squadPointCost: 0,
                        value: "greedo",
                    },
                    "gunner":
                    {
                        name: "Gunner",
                        type: UpgradeType.CREW,
                        isUnique: false,
                        description: "After you perform an attack that does not hit, you may immediately perform a primary weapon attack. You cannot perform another attack this round.",
                        squadPointCost: 5,
                        value: "gunner",
                    },
                    "gunneryTeam":
                    {
                        name: "Gunnery Team",
                        type: UpgradeType.TEAM,
                        isUnique: false,
                        restrictions: [ UpgradeRestriction.LIMITED ],
                        description: "Once per round, when attacking with a secondary weapon, you may spend 1 energy to change 1 of your blank results to a Hit result.",
                        squadPointCost: 4,
                        value: "gunneryTeam",
                    },
                    "hanSolo":
                    {
                        name: "Han Solo",
                        type: UpgradeType.CREW,
                        isUnique: true,
                        restrictions: [ UpgradeRestriction.REBEL_ONLY ],
                        description: "When attacking, if you have a Target Lock on the defender, you may spend that Target Lock to change all of your Focus results to Hit results.",
                        squadPointCost: 2,
                        value: "hanSolo",
                    },
                    // @see CombatAction.doIt() for effect implementation.
                    "heavyLaserCannon":
                    {
                        name: "Heavy Laser Cannon",
                        type: UpgradeType.CANNON,
                        isUnique: false,
                        header: UpgradeHeader.ATTACK,
                        weaponValue: 4,
                        ranges: [ RangeRuler.TWO, RangeRuler.THREE ],
                        firingArc: FiringArc.FORWARD,
                        description: "Attack 1 ship. Immediately after rolling your attack dice, you must change all of your Critical Hit results to Hit results.",
                        squadPointCost: 7,
                        isImplemented: true,
                        value: "heavyLaserCannon",
                    },
                    "heavyScykInterceptor":
                    {
                        name: "\"Heavy Scyk\" Interceptor",
                        type: UpgradeType.TITLE,
                        isUnique: false,
                        restrictions: [ UpgradeRestriction.M3_A_INTERCEPTOR_ONLY ],
                        description: "Your upgrade bar gains the Cannon, Torpedo, or Missile upgrade icon.",
                        squadPointCost: 2,
                        value: "heavyScykInterceptor",
                    },
                    "homingMissiles":
                    {
                        name: "Homing Missiles",
                        type: UpgradeType.MISSILE,
                        isUnique: false,
                        header: UpgradeHeader.ATTACK_TARGET_LOCK,
                        weaponValue: 4,
                        ranges: [ RangeRuler.TWO, RangeRuler.THREE ],
                        firingArc: FiringArc.FORWARD,
                        description: "Discard this card to perform this attack. The defender cannot spend Evade tokens during this attack.",
                        squadPointCost: 5,
                        value: "homingMissiles",
                    },
                    // @see CombatAction.doIt() for effect implementation.
                    "hotShotBlaster":
                    {
                        name: "\"Hot Shot\" Blaster",
                        type: UpgradeType.ILLICIT,
                        isUnique: false,
                        header: UpgradeHeader.ATTACK,
                        weaponValue: 3,
                        ranges: [ RangeRuler.ONE, RangeRuler.TWO ],
                        firingArc: FiringArc.TURRET,
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
                        restrictions: [ UpgradeRestriction.YV_666_ONLY ],
                        description: "After you are destroyed, before you are removed from the play area, you may deploy the Nashtah Pup Pilot. It cannot attack this round.",
                        squadPointCost: 6,
                        value: "houndsTooth",
                    },
                    // @see Token.hullValue() for effect implementation.
                    "hullUpgrade":
                    {
                        name: "Hull Upgrade",
                        type: UpgradeType.MODIFICATION,
                        isUnique: false,
                        description: "Increase your hull value by 1.",
                        shipState: new ShipState(null, null, null, 1, null),
                        squadPointCost: 3,
                        isImplemented: true,
                        value: "hullUpgrade",
                    },
                    "ig2000":
                    {
                        name: "IG-2000",
                        type: UpgradeType.TITLE,
                        isUnique: false,
                        restrictions: [ UpgradeRestriction.AGGRESSOR_ONLY ],
                        description: "You have the pilot ability of each other friendly ship with the IG-2000 upgrade card (in addition to your own pilot ability).",
                        squadPointCost: 0,
                        value: "ig2000",
                    },
                    "inertialDampeners":
                    {
                        name: "Inertial Dampeners",
                        type: UpgradeType.ILLICIT,
                        isUnique: false,
                        description: "When you reveal your maneuver, you may discard this card to instead perform a white Stationary 0 maneuver. Then receive 1 stress token.",
                        squadPointCost: 1,
                        value: "inertialDampeners",
                    },
                    "integratedAstromech":
                    {
                        name: "Integrated Astromech",
                        type: UpgradeType.MODIFICATION,
                        isUnique: false,
                        restrictions: [ UpgradeRestriction.X_WING_ONLY ],
                        description: "When you are dealt a Damage card, you may discard 1 of your Astromech Upgrade cards to discard that Damage card (without resolving its effect).",
                        squadPointCost: 0,
                        value: "integratedAstromech",
                    },
                    "intelligenceAgent":
                    {
                        name: "Intelligence Agent",
                        type: UpgradeType.CREW,
                        isUnique: false,
                        description: "At the start of the Activation phase, choose 1 enemy ship at Range 1-2. You may look at that ship's chosen maneuver.",
                        squadPointCost: 1,
                        value: "intelligenceAgent",
                    },
                    "intimidation":
                    {
                        name: "Intimidation",
                        type: UpgradeType.ELITE,
                        isUnique: false,
                        description: "While you are touching an enemy ship, reduce that ship's agility value by 1.",
                        squadPointCost: 2,
                        value: "intimidation",
                    },
                    "ionBombs":
                    {
                        name: "Ion Bombs",
                        type: UpgradeType.BOMB,
                        isUnique: false,
                        description: "When you reveal your maneuver dial, you may discard this card to drop 1 ion bomb token. This token detonates at the end of the Activation phase.",
                        squadPointCost: 2,
                        value: "ionBombs",
                    },
                    "ionCannon":
                    {
                        name: "Ion Cannon",
                        type: UpgradeType.CANNON,
                        isUnique: false,
                        header: UpgradeHeader.ATTACK,
                        weaponValue: 3,
                        ranges: [ RangeRuler.ONE, RangeRuler.TWO, RangeRuler.THREE ],
                        firingArc: FiringArc.FORWARD,
                        description: "Attack 1 ship. If this attack hits, the defender suffers 1 damage and receives 1 ion token. Then cancel all dice results.",
                        squadPointCost: 3,
                        isImplemented: true,
                        value: "ionCannon",
                    },
                    "ionCannonTurret":
                    {
                        name: "Ion Cannon Turret",
                        type: UpgradeType.TURRET,
                        isUnique: false,
                        header: UpgradeHeader.ATTACK,
                        weaponValue: 3,
                        ranges: [ RangeRuler.ONE, RangeRuler.TWO ],
                        firingArc: FiringArc.TURRET,
                        description: "Attack 1 ship (even a ship outside your firing arc). If this attack hits the target ship, the ship suffers 1 damage and receives 1 ion token. Then cancel all dice results.",
                        squadPointCost: 5,
                        isImplemented: true,
                        value: "ionCannonTurret",
                    },
                    "ionProjector":
                    {
                        name: "Ion Projector",
                        type: UpgradeType.MODIFICATION,
                        isUnique: false,
                        restrictions: [ UpgradeRestriction.LARGE_SHIP_ONLY ],
                        description: "After an enemy ship executes a maneuver that causes it to overlap your ship, roll 1 attack die. On a Hit or Critical Hit result, the enemy ship receives 1 Ion token.",
                        squadPointCost: 2,
                        value: "ionProjector",
                    },
                    "ionPulseMissiles":
                    {
                        name: "Ion Pulse Missiles",
                        type: UpgradeType.MISSILE,
                        isUnique: false,
                        header: UpgradeHeader.ATTACK_TARGET_LOCK,
                        weaponValue: 3,
                        ranges: [ RangeRuler.TWO, RangeRuler.THREE ],
                        firingArc: FiringArc.FORWARD,
                        description: "Spend your Target Lock and discard this card to perform this attack. If this attack hits, the defender suffers 1 damage and receives 2 ion tokens. Then cancel all dice results.",
                        spendTargetLock: true,
                        discardThisCard: true,
                        squadPointCost: 3,
                        isImplemented: true,
                        value: "ionPulseMissiles",
                    },
                    "ionTorpedoes":
                    {
                        name: "Ion Torpedoes",
                        type: UpgradeType.TORPEDO,
                        isUnique: false,
                        header: UpgradeHeader.ATTACK_TARGET_LOCK,
                        weaponValue: 4,
                        ranges: [ RangeRuler.TWO, RangeRuler.THREE ],
                        firingArc: FiringArc.FORWARD,
                        description: "Spend your Target Lock and discard this card to perform this attack. If this attack hits, the defender and each ship at Range 1 of it receives 1 ion token.",
                        squadPointCost: 5,
                        value: "ionPulseMissiles",
                    },
                    "janDodonna":
                    {
                        name: "Jan Dodonna",
                        type: UpgradeType.CREW,
                        isUnique: true,
                        restrictions: [ UpgradeRestriction.HUGE_SHIP_ONLY, UpgradeRestriction.REBEL_ONLY ],
                        description: "When another friendly ship at Range 1 is attacking, it may change 1 of its Hit results to a Critical Hit result.",
                        squadPointCost: 6,
                        value: "janDodonna",
                    },
                    "janOrs":
                    {
                        name: "Jan Ors",
                        type: UpgradeType.CREW,
                        isUnique: true,
                        restrictions: [ UpgradeRestriction.REBEL_ONLY ],
                        description: "Once per round, when a friendly ship at Range 1-3 performs a Focus action or would be assigned a Focus token, you may assign that ship an Evade token instead.",
                        squadPointCost: 2,
                        value: "janOrs",
                    },
                    "juke":
                    {
                        name: "Juke",
                        type: UpgradeType.ELITE,
                        isUnique: false,
                        restrictions: [ UpgradeRestriction.SMALL_SHIP_ONLY ],
                        description: "When attacking, if you have an Evade token, you may change 1 of the defender's Evade results to a Focus result.",
                        squadPointCost: 2,
                        value: "juke",
                    },
                    "k4SecurityDroid":
                    {
                        name: "K4 Security Droid",
                        type: UpgradeType.CREW,
                        isUnique: false,
                        restrictions: [ UpgradeRestriction.SCUM_ONLY ],
                        description: "After executing a green maneuver, you may acquire a Target Lock.",
                        squadPointCost: 3,
                        value: "k4SecurityDroid",
                    },
                    "kyleKatarn":
                    {
                        name: "Kyle Katarn",
                        type: UpgradeType.CREW,
                        isUnique: true,
                        restrictions: [ UpgradeRestriction.REBEL_ONLY ],
                        description: "After you remove a stress token from your ship, you may assign a Focus token to your ship.",
                        squadPointCost: 3,
                        value: "kyleKatarn",
                    },
                    "landoCalrissian":
                    {
                        name: "Lando Calrissian",
                        type: UpgradeType.CREW,
                        isUnique: true,
                        restrictions: [ UpgradeRestriction.REBEL_ONLY ],
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
                        restrictions: [ UpgradeRestriction.REBEL_ONLY ],
                        description: "At the start of the Activation phase, you may discard this card to allow all friendly ships that reveal a red maneuver to treat that maneuver as a white maneuver until the end of the phase.",
                        squadPointCost: 4,
                        value: "leiaOrgana",
                    },
                    "leebo":
                    {
                        name: "\"Leebo\"",
                        type: UpgradeType.CREW,
                        isUnique: true,
                        restrictions: [ UpgradeRestriction.REBEL_ONLY ],
                        header: UpgradeHeader.ACTION,
                        description: "Perform a free boost action. Then receive 1 ion token.",
                        squadPointCost: 2,
                        value: "leebo",
                    },
                    "lightningReflexes":
                    {
                        name: "Lightning Reflexes",
                        type: UpgradeType.ELITE,
                        isUnique: false,
                        restrictions: [ UpgradeRestriction.SMALL_SHIP_ONLY ],
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
                        value: "loneWolf",
                    },
                    "lukeSkywalker":
                    {
                        name: "Luke Skywalker",
                        type: UpgradeType.CREW,
                        isUnique: true,
                        restrictions: [ UpgradeRestriction.REBEL_ONLY ],
                        description: "After you perform an attack that does not hit, you may immediately perform a primary weapon attack. You may change 1 Focus result to a Hit result. You cannot perform another attack this round.",
                        squadPointCost: 7,
                        value: "lukeSkywalker",
                    },
                    "maneuveringFins":
                    {
                        name: "Maneuvering Fins",
                        type: UpgradeType.MODIFICATION,
                        isUnique: false,
                        restrictions: [ UpgradeRestriction.YV_666_ONLY ],
                        description: "When you reveal a turn maneuver (left or right), you may rotate your dial to the corresponding bank maneuver (left or right) of the same speed.",
                        squadPointCost: 1,
                        value: "maneuveringFins",
                    },
                    // @see CombatAction.doIt() for effect implementation.
                    "manglerCannon":
                    {
                        name: "\"Mangler\" Cannon",
                        type: UpgradeType.CANNON,
                        isUnique: false,
                        header: UpgradeHeader.ATTACK,
                        weaponValue: 3,
                        ranges: [ RangeRuler.ONE, RangeRuler.TWO, RangeRuler.THREE ],
                        firingArc: FiringArc.FORWARD,
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
                        restrictions: [ UpgradeRestriction.IMPERIAL_ONLY ],
                        description: "At the end of the Combat phase, each enemy ship at Range 1 that does not have a stress token receives 1 stress token.",
                        squadPointCost: 3,
                        value: "maraJade",
                    },
                    "marksmanship":
                    {
                        name: "Marksmanship",
                        type: UpgradeType.ELITE,
                        isUnique: false,
                        header: UpgradeHeader.ACTION,
                        description: "When attacking this round, you may change 1 of your Focus results to a Critical Hit result and all of your other Focus results to Hit results.",
                        squadPointCost: 3,
                        value: "marksmanship",
                    },
                    "mercenaryCopilot":
                    {
                        name: "Mercenary Copilot",
                        type: UpgradeType.CREW,
                        isUnique: false,
                        description: "When attacking at Range 3, you may change 1 of your Hit results to a Critical Hit result.",
                        squadPointCost: 2,
                        value: "mercenaryCopilot",
                    },
                    // @see Token.shipActions() for effect implementation.
                    "millenniumFalcon":
                    {
                        name: "Millennium Falcon",
                        type: UpgradeType.TITLE,
                        isUnique: false,
                        restrictions: [ UpgradeRestriction.YT_1300_ONLY ],
                        description: "Your action bar gains the Evade action icon.",
                        squadPointCost: 1,
                        isImplemented: true,
                        value: "millenniumFalcon",
                    },
                    "moffJerjerrod":
                    {
                        name: "Moff Jerjerrod",
                        type: UpgradeType.CREW,
                        isUnique: true,
                        restrictions: [ UpgradeRestriction.IMPERIAL_ONLY ],
                        description: "When you are dealt a faceup Damage card, you may discard this Upgrade card or another Crew Upgrade card to flip that Damage card facedown (without resolving its effect).",
                        squadPointCost: 2,
                        value: "moffJerjerrod",
                    },
                    // @see Engine.processEndQueue() for effect implementation.
                    "moldyCrow":
                    {
                        name: "Moldy Crow",
                        type: UpgradeType.TITLE,
                        isUnique: true,
                        restrictions: [ UpgradeRestriction.HWK_290_ONLY ],
                        description: "During the End phase, do not remove unused Focus tokens from your ship.",
                        squadPointCost: 3,
                        isImplemented: true,
                        value: "moldyCrow",
                    },
                    "munitionsFailsafe":
                    {
                        name: "Munitions Failsafe",
                        type: UpgradeType.MODIFICATION,
                        isUnique: false,
                        description: "When attacking with a secondary weapon that instructs you to discard it to perform the attack, do not discard it unless the attack hits.",
                        squadPointCost: 1,
                        value: "munitionsFailsafe",
                    },
                    "navigator":
                    {
                        name: "Navigator",
                        type: UpgradeType.CREW,
                        isUnique: false,
                        description: "When you reveal a maneuver you may rotate your dial to another maneuver with the same bearing. You cannot rotate to a red maneuver if you have any stress tokens.",
                        squadPointCost: 3,
                        value: "navigator",
                    },
                    // @see Token.maneuverKeys() for effect implementation.
                    "nienNunb":
                    {
                        name: "Nien Nunb",
                        type: UpgradeType.CREW,
                        isUnique: true,
                        restrictions: [ UpgradeRestriction.REBEL_ONLY ],
                        description: "You may treat all Straight maneuvers as green maneuvers.",
                        squadPointCost: 1,
                        isImplemented: true,
                        value: "nienNunb",
                    },
                    "opportunist":
                    {
                        name: "Opportunist",
                        type: UpgradeType.ELITE,
                        isUnique: false,
                        description: "When attacking, if the defender does not have any Focus or Evade tokens, you may receive 1 stress token to roll 1 additional attack die. You cannot use this ability if you have any stress tokens.",
                        squadPointCost: 4,
                        value: "opportunist",
                    },
                    "outlawTech":
                    {
                        name: "Outlaw Tech",
                        type: UpgradeType.CREW,
                        isUnique: false,
                        restrictions: [ UpgradeRestriction.SCUM_ONLY, UpgradeRestriction.LIMITED ],
                        description: "After you execute a red maneuver, you may assign 1 Focus token to your ship.",
                        squadPointCost: 2,
                        value: "outlawTech",
                    },
                    "outmaneuver":
                    {
                        name: "Outmaneuver",
                        type: UpgradeType.ELITE,
                        isUnique: false,
                        description: "When attacking a ship inside your firing arc, if you are not inside that ship's firing arc, reduce its agility value by 1 (to a minimum of 0).",
                        squadPointCost: 3,
                        value: "outmaneuver",
                    },
                    "outrider":
                    {
                        name: "Outrider",
                        type: UpgradeType.TITLE,
                        isUnique: false,
                        restrictions: [ UpgradeRestriction.YT_2400_ONLY ],
                        description: "While you have a Cannon upgrade card equipped, you cannot perform primary weapon attacks and you may perform Cannon secondary weapon attacks against ships outside your firing arc.",
                        squadPointCost: 5,
                        value: "outrider",
                    },
                    "plasmaTorpedoes":
                    {
                        name: "Plasma Torpedoes",
                        type: UpgradeType.TORPEDO,
                        isUnique: false,
                        header: UpgradeHeader.ATTACK_TARGET_LOCK,
                        weaponValue: 4,
                        ranges: [ RangeRuler.TWO, RangeRuler.THREE ],
                        firingArc: FiringArc.FORWARD,
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
                        isUnique: false,
                        description: "When attacking, you may reroll 1 attack die. If the defender's pilot skill value if \"2\" or lower, you may instead reroll up to 2 attack dice.",
                        squadPointCost: 3,
                        value: "predator",
                    },
                    "protonBombs":
                    {
                        name: "Proton Bombs",
                        type: UpgradeType.BOMB,
                        isUnique: false,
                        description: "When you reveal your maneuver dial, you may discard this card to drop 1 proton bomb token. This token detonates at the end of the Activation phase.",
                        squadPointCost: 5,
                        value: "protonBombs",
                    },
                    // @see Token.computeAttackDiceCount() for effect implementation.
                    "protonRockets":
                    {
                        name: "Proton Rockets",
                        type: UpgradeType.MISSILE,
                        isUnique: false,
                        header: UpgradeHeader.ATTACK_FOCUS,
                        weaponValue: 2,
                        ranges: [ RangeRuler.ONE ],
                        firingArc: FiringArc.FORWARD,
                        description: "Discard this card to perform this attack. You may roll additional attack dice equal to your agility value, to a maximum of 3 additional dice.",
                        discardThisCard: true,
                        squadPointCost: 3,
                        isImplemented: true,
                        value: "protonRockets",
                    },
                    // @see CombatAction.doIt() for effect implementation.
                    "protonTorpedoes":
                    {
                        name: "Proton Torpedoes",
                        type: UpgradeType.TORPEDO,
                        isUnique: false,
                        header: UpgradeHeader.ATTACK_TARGET_LOCK,
                        weaponValue: 4,
                        ranges: [ RangeRuler.TWO, RangeRuler.THREE ],
                        firingArc: FiringArc.FORWARD,
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
                        isUnique: false,
                        header: UpgradeHeader.ACTION,
                        description: "Discard this card to drop 1 proximity mine token. When a ship's base or maneuver template overlaps this token, this token detonates.",
                        squadPointCost: 3,
                        value: "proximityMines",
                    },
                    "pushTheLimit":
                    {
                        name: "Push The Limit",
                        type: UpgradeType.ELITE,
                        isUnique: false,
                        description: "Once per round, after you perform an action, you may perform 1 free action shown in your action bar. Then receive 1 stress token.",
                        squadPointCost: 3,
                        value: "pushTheLimit",
                    },
                    // @see Token.maneuverKeys() for effect implementation.
                    "r2Astromech":
                    {
                        name: "R2 Astromech",
                        type: UpgradeType.ASTROMECH,
                        isUnique: false,
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
                        value: "r2D2",
                    },
                    "r2D2Crew":
                    {
                        name: "R2-D2 (Crew)",
                        type: UpgradeType.CREW,
                        isUnique: true,
                        restrictions: [ UpgradeRestriction.REBEL_ONLY ],
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
                        isUnique: false,
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
                        isUnique: false,
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
                    "r5P9":
                    {
                        name: "R5-P9",
                        type: UpgradeType.ASTROMECH,
                        isUnique: true,
                        description: "At the end of the Combat phase, you may spend 1 of your Focus tokens to recover 1 shield (up to your shield value).",
                        squadPointCost: 3,
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
                        isUnique: false,
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
                    "raymusAntilles":
                    {
                        name: "Raymus Antilles",
                        type: UpgradeType.CREW,
                        isUnique: true,
                        restrictions: [ UpgradeRestriction.HUGE_SHIP_ONLY, UpgradeRestriction.REBEL_ONLY ],
                        description: "At the start of the Activation phase, choose 1 enemy ship at Range 1-3. You may look at that ship's chosen maneuver. If the maneuver is white, assign that ship 1 stress token.",
                        squadPointCost: 6,
                        value: "raymusAntilles",
                    },
                    "rebelCaptive":
                    {
                        name: "Rebel Captive",
                        type: UpgradeType.CREW,
                        isUnique: true,
                        restrictions: [ UpgradeRestriction.IMPERIAL_ONLY ],
                        description: "Once per round, the first ship that declares you as the target of an attack immediately receives 1 stress token.",
                        squadPointCost: 3,
                        value: "rebelCaptive",
                    },
                    // @see ModifyAttackDiceAction.doIt() and ModifyDefenseDiceAction.doIt() for effect implementation.
                    "reconSpecialist":
                    {
                        name: "Recon Specialist",
                        type: UpgradeType.CREW,
                        isUnique: false,
                        description: "When you perform a Focus action, assign 1 additional Focus token to your ship.",
                        squadPointCost: 3,
                        isImplemented: true,
                        value: "reconSpecialist",
                    },
                    // @see Token.upgradeTypeKeys() for effect implementation.
                    "royalGuardTie":
                    {
                        name: "Royal Guard TIE",
                        type: UpgradeType.TITLE,
                        isUnique: false,
                        restrictions: [ UpgradeRestriction.TIE_INTERCEPTOR_ONLY, UpgradeRestriction.PILOT_SKILL_ABOVE_4 ],
                        description: "You may equip up to 2 different Modification upgrades (instead of 1). You cannot equip this card if your pilot skill value is \"4\" or lower.",
                        squadPointCost: 0,
                        isImplemented: true,
                        value: "royalGuardTie",
                    },
                    "ruthlessness":
                    {
                        name: "Ruthlessness",
                        type: UpgradeType.ELITE,
                        isUnique: false,
                        restrictions: [ UpgradeRestriction.IMPERIAL_ONLY ],
                        description: "After you perform an attack that hits, you must choose 1 other ship at Range 1 of the defender (other than yourself). That ship suffers 1 damage.",
                        squadPointCost: 3,
                        value: "ruthlessness",
                    },
                    "saboteur":
                    {
                        name: "Saboteur",
                        type: UpgradeType.CREW,
                        isUnique: false,
                        header: UpgradeHeader.ACTION,
                        description: "Choose 1 enemy ship at Range 1 and roll 1 attack die. On a Hit or Critical Hit result, choose 1 random facedown Damage card assigned to that ship, flip it faceup, and resolve it.",
                        squadPointCost: 2,
                        value: "saboteur",
                    },
                    "salvagedAstromech":
                    {
                        name: "Salvaged Astromech",
                        type: UpgradeType.SALVAGED_ASTROMECH,
                        isUnique: false,
                        description: "When you are dealt a Damage card with the Ship trait, you may immediately discard that card (before resolving its effect). Then, discard this Upgrade card.",
                        squadPointCost: 2,
                        value: "salvagedAstromech",
                    },
                    "seismicCharges":
                    {
                        name: "Seismic Charges",
                        type: UpgradeType.BOMB,
                        isUnique: false,
                        description: "When you reveal your maneuver dial, you may discard this card to drop 1 seismic charge token. This token detonates at the end of the Activation phase.",
                        squadPointCost: 2,
                        value: "seismicCharges",
                    },
                    "sensorJammer":
                    {
                        name: "Sensor Jammer",
                        type: UpgradeType.SYSTEM,
                        isUnique: false,
                        description: "When defending, you may change 1 of the attacker's Hit results to a Focus result. The attacker cannot reroll the die with the changed result.",
                        squadPointCost: 4,
                        value: "sensorJammer",
                    },
                    "sensorTeam":
                    {
                        name: "Sensor Team",
                        type: UpgradeType.TEAM,
                        isUnique: false,
                        description: "When acquiring a Target Lock, you may lock onto an enemy ship at Range 1-5 (instead of Range 1-3).",
                        squadPointCost: 4,
                        value: "sensorTeam",
                    },
                    // @see Token.shieldValue() for effect implementation.
                    "shieldUpgrade":
                    {
                        name: "Shield Upgrade",
                        type: UpgradeType.MODIFICATION,
                        isUnique: false,
                        description: "Increase your shield value by 1.",
                        shipState: new ShipState(null, null, null, null, 1),
                        squadPointCost: 4,
                        isImplemented: true,
                        value: "shieldUpgrade",
                    },
                    // @see Token.upgradeTypeKeys() for effect implementation.
                    "slaveI":
                    {
                        name: "Slave I",
                        type: UpgradeType.TITLE,
                        isUnique: false,
                        restrictions: [ UpgradeRestriction.FIRESPRAY_31_ONLY ],
                        description: "Your upgrade bar gains the Torpedo upgrade icon.",
                        squadPointCost: 0,
                        isImplemented: true,
                        value: "slaveI",
                    },
                    "squadLeader":
                    {
                        name: "Squad Leader",
                        type: UpgradeType.ELITE,
                        isUnique: false,
                        header: UpgradeHeader.ACTION,
                        description: "Choose 1 ship at Range 1-2 that has a lower pilot skill than you. The chosen ship may immediately perform 1 free action.",
                        squadPointCost: 2,
                        value: "squadLeader",
                    },
                    "st321":
                    {
                        name: "ST-321",
                        type: UpgradeType.TITLE,
                        isUnique: false,
                        restrictions: [ UpgradeRestriction.LAMBDA_CLASS_SHUTTLE_ONLY ],
                        description: "When acquiring a Target Lock, you may lock onto any enemy ship in the play area.",
                        squadPointCost: 3,
                        value: "st321",
                    },
                    "stayOnTarget":
                    {
                        name: "Stay On Target",
                        type: UpgradeType.ELITE,
                        isUnique: false,
                        description: "When you reveal a maneuver, you may rotate your dial to another maneuver with the same speed. Treat that maneuver as a red maneuver.",
                        squadPointCost: 2,
                        value: "stayOnTarget",
                    },
                    "stealthDevice":
                    {
                        name: "Stealth Device",
                        type: UpgradeType.MODIFICATION,
                        isUnique: false,
                        description: "Increase your agility value by 1. If you are hit by an attack, discard this card.",
                        shipState: new ShipState(null, null, 1, null, null),
                        squadPointCost: 3,
                        value: "stealthDevice",
                    },
                    "stygiumParticleAccelerator":
                    {
                        name: "Stygium Particle Accelerator",
                        type: UpgradeType.MODIFICATION,
                        isUnique: false,
                        description: "When you either decloak or perform a cloak action, you may perform a free Evade action.",
                        squadPointCost: 2,
                        value: "stygiumParticleAccelerator",
                    },
                    "swarmTactics":
                    {
                        name: "Swarm Tactics",
                        type: UpgradeType.ELITE,
                        isUnique: false,
                        description: "At the start of the Combat phase, you may choose 1 friendly ship at Range 1. Until the end of this phase, treat the chosen ship as if its pilot skill were equal to your pilot skill.",
                        squadPointCost: 2,
                        value: "swarmTactics",
                    },
                    "tactician":
                    {
                        name: "Tactician",
                        type: UpgradeType.CREW,
                        isUnique: false,
                        description: "After you perform an attack against a ship inside your firing arc at Range 2, that ship receives 1 stress token.",
                        squadPointCost: 2,
                        value: "tactician",
                    },
                    "tacticalJammer":
                    {
                        name: "Tactical Jammer",
                        type: UpgradeType.MODIFICATION,
                        isUnique: false,
                        restrictions: [ UpgradeRestriction.LARGE_SHIP_ONLY ],
                        description: "Your ship can obstruct enemy attacks.",
                        squadPointCost: 1,
                        value: "tacticalJammer",
                    },
                    "targetingAstromech":
                    {
                        name: "Targeting Astromech",
                        type: UpgradeType.ASTROMECH,
                        isUnique: false,
                        description: "After you execute a red maneuver, you may acquire a target lock.",
                        squadPointCost: 2,
                        value: "targetingAstromech",
                    },
                    // @see Token.shipActions() for effect implementation.
                    "targetingComputer":
                    {
                        name: "Targeting Computer",
                        type: UpgradeType.MODIFICATION,
                        isUnique: false,
                        description: "Your action bar gains the Target Lock action icon.",
                        squadPointCost: 2,
                        isImplemented: true,
                        value: "targetingComputer",
                    },
                    "targetingCoordinator":
                    {
                        name: "Targeting Coordinator",
                        type: UpgradeType.CREW,
                        isUnique: false,
                        restrictions: [ UpgradeRestriction.LIMITED ],
                        description: "You may spend 1 energy to choose 1 friendly ship at Range 1-2. Acquire a Target Lock, then assign the blue Target Lock token to the chosen ship.",
                        squadPointCost: 4,
                        value: "targetingCoordinator",
                    },
                    "tieX1":
                    {
                        name: "TIE/x1",
                        type: UpgradeType.TITLE,
                        isUnique: false,
                        restrictions: [ UpgradeRestriction.TIE_ADVANCED_ONLY ],
                        description: "Your upgrade bar gains the System upgrade icon. If you equip a System upgrade, its squad point cost is reduced by 4 (to a minimum of 0).",
                        squadPointCost: 0,
                        value: "tieX1",
                    },
                    "torynFarr":
                    {
                        name: "Toryn Farr",
                        type: UpgradeType.CREW,
                        isUnique: true,
                        restrictions: [ UpgradeRestriction.HUGE_SHIP_ONLY, UpgradeRestriction.REBEL_ONLY ],
                        header: UpgradeHeader.ACTION,
                        description: "Spend any amount of energy to choose that many enemy ships at Range 1-2. Remove all Focus, Evade, and blue Target Lock tokens from those ships.",
                        squadPointCost: 6,
                        value: "torynFarr",
                    },
                    // @see Token.maneuverKeys() for effect implementation.
                    "twinIonEngineMkII":
                    {
                        name: "Twin Ion Engine Mk. II",
                        type: UpgradeType.MODIFICATION,
                        isUnique: false,
                        restrictions: [ UpgradeRestriction.TIE_ONLY ],
                        description: "You may treat all bank maneuvers (left or right) as green maneuvers.",
                        squadPointCost: 1,
                        isImplemented: true,
                        value: "twinIonEngineMkII",
                    },
                    "twinLaserTurret":
                    {
                        name: "Twin Laser Turret",
                        type: UpgradeType.TURRET,
                        isUnique: false,
                        header: UpgradeHeader.ATTACK,
                        weaponValue: 3,
                        ranges: [ RangeRuler.TWO, RangeRuler.THREE ],
                        firingArc: FiringArc.TURRET,
                        description: "Perform this attack twice (even against a ship outside your firing arc). Each time this attack hits, the defender suffers 1 damage. Then cancel all dice results.",
                        squadPointCost: 6,
                        value: "twinLaserTurret",
                    },
                    // @see Token.maneuverKeys() for effect implementation.
                    "unhingedAstromech":
                    {
                        name: "Unhinged Astromech",
                        type: UpgradeType.SALVAGED_ASTROMECH,
                        isUnique: false,
                        description: "You may treat all 3 speed maneuvers as green maneuvers.",
                        squadPointCost: 1,
                        isImplemented: true,
                        value: "unhingedAstromech",
                    },
                    // @see Token.pilotSkillValue() for effect implementation.
                    "veteranInstincts":
                    {
                        name: "Veteran Instincts",
                        type: UpgradeType.ELITE,
                        isUnique: false,
                        description: "Increase your pilot skill value by 2.",
                        shipState: new ShipState(2, null, null, null, null),
                        squadPointCost: 1,
                        isImplemented: true,
                        value: "veteranInstincts",
                    },
                    // @see Token.upgradeTypeKeys() for effect implementation.
                    "virago":
                    {
                        name: "Virago",
                        type: UpgradeType.TITLE,
                        isUnique: true,
                        restrictions: [ UpgradeRestriction.STAR_VIPER_ONLY, UpgradeRestriction.PILOT_SKILL_ABOVE_3 ],
                        description: "Your upgrade bar gains the System and Illicit upgrade icons. You cannot equip this card if your pilot skill value is \"3\" or lower.",
                        squadPointCost: 1,
                        isImplemented: true,
                        value: "virago",
                    },
                    "weaponsEngineer":
                    {
                        name: "Weapons Engineer",
                        type: UpgradeType.CREW,
                        isUnique: false,
                        description: "You may maintain 2 Target Locks (only 1 per enemy ship). When you acquire a Target Lock, you may lock onto 2 different ships.",
                        squadPointCost: 3,
                        value: "weaponsEngineer",
                    },
                    "weaponsGuidance":
                    {
                        name: "Weapons Guidance",
                        type: UpgradeType.TECH,
                        isUnique: false,
                        description: "When attacking, you may spend a focus token to change 1 of your blank results to a Hit result.",
                        squadPointCost: 2,
                        value: "weaponsGuidance",
                    },
                    "wed15RepairDroid":
                    {
                        name: "WED-15 Repair Droid",
                        type: UpgradeType.CREW,
                        isUnique: false,
                        restrictions: [ UpgradeRestriction.HUGE_SHIP_ONLY ],
                        header: UpgradeHeader.ACTION,
                        description: "Spend 1 energy to discard 1 of your facedown Damage cards, or spend 3 energy to discard 1 of your faceup Damage cards.",
                        squadPointCost: 2,
                        value: "wed15RepairDroid",
                    },
                    "wingman":
                    {
                        name: "Wingman",
                        type: UpgradeType.ELITE,
                        isUnique: false,
                        description: "At the start of the Combat phase, remove 1 stress token from another friendly ship at Range 1.",
                        squadPointCost: 2,
                        value: "wingman",
                    },
                    "wired":
                    {
                        name: "Wired",
                        type: UpgradeType.ELITE,
                        isUnique: false,
                        description: "When attacking or defending, if you are stressed, you may reroll 1 or more of your Focus results.",
                        squadPointCost: 1,
                        value: "wired",
                    },
                    "ysanneIsard":
                    {
                        name: "Ysanne Isard",
                        type: UpgradeType.CREW,
                        isUnique: true,
                        restrictions: [ UpgradeRestriction.IMPERIAL_ONLY ],
                        description: "At the start of the Combat phase, if you have no shields and at least 1 Damage card assigned to your ship, you may perform a free Evade action.",
                        squadPointCost: 4,
                        value: "ysanneIsard",
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

                    return this.valuesByType(upgradeType).filter(function(upgradeCard)
                    {
                        var restrictions = UpgradeCard.properties[upgradeCard].restrictions;
                        return UpgradeRestriction.passes(restrictions, pilotKey);
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

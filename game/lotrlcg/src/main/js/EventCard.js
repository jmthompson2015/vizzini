define([ "CardSet", "CardSubset", "CardType", "ImageNameCreator", "Sphere", "Trait" ], function(CardSet, CardSubset,
        CardType, ImageNameCreator, Sphere, Trait)
{
    "use strict";
    var EventCard =
    {
        A_ELBERETH_GILTHONIEL: "aElberethGilthoniel",
        A_GOOD_HARVEST: "aGoodHarvest",
        A_LIGHT_IN_THE_DARK: "aLightInTheDark",
        A_TEST_OF_WILL: "aTestOfWill",
        A_WATCHFUL_PEACE: "aWatchfulPeace",
        ADVANCE_WARNING: "advanceWarning",
        AGAINST_THE_SHADOW: "againstTheShadow",
        ASTONISHING_SPEED: "astonishingSpeed",
        BEHIND_STRONG_WALLS: "behindStrongWalls",
        BOOMED_AND_TRUMPETED: "boomedAndTrumpeted",
        CAMPFIRE_TALES: "campfireTales",
        CHARGE_OF_THE_ROHIRRIM: "chargeOfTheRohirrim",
        CHILDREN_OF_THE_SEA: "childrenOfTheSea",
        CLOSE_CALL: "closeCall",
        COURAGE_AWAKENED: "courageAwakened",
        DAERONS_RUNES: "daeronsRunes",
        DAWN_TAKE_YOU_ALL: "dawnTakeYouAll",
        DEEP_KNOWLEDGE: "deepKnowledge",
        DESCENDANTS_OF_KINGS: "descendantsOfKings",
        DESPERATE_ALLIANCE: "desperateAlliance",
        DISTANT_STARS: "distantStars",
        DONT_BE_HASTY: "dontBeHasty",
        DOOM_HANGS_STILL: "doomHangsStill",
        DUNEDAIN_MESSAGE: "dunedainMessage",
        DWARVEN_TOMB: "dwarvenTomb",
        ELRONDS_COUNSEL: "elrondsCounsel",
        EXPERT_TRACKERS: "expertTrackers",
        FAIR_AND_PERILOUS: "fairAndPerilous",
        FEIGNED_VOICES: "feignedVoices",
        FEINT: "feint",
        FOLLOW_ME: "followMe",
        FOR_GONDOR: "forGondor",
        FOREST_PATROL: "forestPatrol",
        FORTH_EORLINGAS: "forthEorlingas",
        FREE_TO_CHOOSE: "freeToChoose",
        FRESH_TRACKS: "freshTracks",
        GAINING_STRENGTH: "gainingStrength",
        GILDORS_COUNSEL: "gildorsCounsel",
        GONDORIAN_DISCIPLINE: "gondorianDiscipline",
        GRAVE_CAIRN: "graveCairn",
        HAIL_OF_STONES: "hailOfStones",
        HANDS_UPON_THE_BOW: "handsUponTheBow",
        HASTY_STROKE: "hastyStroke",
        HEAVY_STROKE: "heavyStroke",
        HIDDEN_CACHE: "hiddenCache",
        HOBBIT_SENSE: "hobbitSense",
        HOLD_YOUR_GROUND: "holdYourGround",
        HOPE_REKINDLED: "hopeRekindled",
        HORNS_CRY: "hornsCry",
        INFIGHTING: "infighting",
        ISLAND_AMID_PERILS: "islandAmidPerils",
        KEEN_AS_LANCES: "keenAsLances",
        LAY_OF_NIMRODEL: "layOfNimrodel",
        LEAVE_NO_TRACE: "leaveNoTrace",
        LEGACY_OF_NUMENOR: "legacyOfNumenor",
        LIGHT_THE_BEACONS: "lightTheBeacons",
        LORDS_OF_THE_ELDAR: "lordsOfTheEldar",
        LURE_OF_MORIA: "lureOfMoria",
        MEN_OF_THE_WEST: "menOfTheWest",
        MENELDORS_FLIGHT: "meneldorsFlight",
        MESSAGE_FROM_ELROND: "messageFromElrond",
        MITHRANDIRS_ADVICE: "mithrandirsAdvice",
        MUSTERING_THE_ROHIRRIM: "musteringTheRohirrim",
        MUTUAL_ACCORD: "mutualAccord",
        NEEDFUL_TO_KNOW: "needfulToKnow",
        NOISELESS_MOVEMENT: "noiselessMovement",
        NONE_RETURN: "noneReturn",
        OUT_OF_SIGHT: "outOfSight",
        OUT_OF_THE_WILD: "outOfTheWild",
        PARTING_GIFTS: "partingGifts",
        PEACE_AND_THOUGHT: "peaceAndThought",
        POWER_OF_ORTHANC: "powerOfOrthanc",
        PURSUING_THE_ENEMY: "pursuingTheEnemy",
        QUICK_EARS: "quickEars",
        QUICK_STRIKE: "quickStrike",
        RADAGASTS_CUNNING: "radagastsCunning",
        RALLYING_CRY: "rallyingCry",
        RANGER_SUMMONS: "rangerSummons",
        RAVENS_OF_THE_MOUNTAIN: "ravensOfTheMountain",
        REAR_GUARD: "rearGuard",
        RENEWED_FRIENDSHIP: "renewedFriendship",
        RIDE_THEM_DOWN: "rideThemDown",
        RIDE_TO_RUIN: "rideToRuin",
        REINFORCEMENTS: "reinforcements",
        RISK_SOME_LIGHT: "riskSomeLight",
        RUMOUR_FROM_THE_EARTH: "rumourFromTheEarth",
        SECOND_BREAKFAST: "secondBreakfast",
        SHADOW_OF_THE_PAST: "shadowOfThePast",
        SHADOWS_GIVE_WAY: "shadowsGiveWay",
        SHORT_CUT: "shortCut",
        SMALL_TARGET: "smallTarget",
        SNEAK_ATTACK: "sneakAttack",
        STAND_AND_FIGHT: "standAndFight",
        STRAIGHT_SHOT: "straightShot",
        STRENGTH_OF_ARMS: "strengthOfArms",
        STRIDERS_PATH: "stridersPath",
        SWIFT_AND_SILENT: "swiftAndSilent",
        SWIFT_STRIKE: "swiftStrike",
        TAKING_INITIATIVE: "takingInitiative",
        THE_DOOR_IS_CLOSED: "theDoorIsClosed",
        THE_EAGLES_ARE_COMING: "theEaglesAreComing",
        THE_END_COMES: "theEndComes",
        THE_GALADHRIMS_GREETING: "theGaladhrimsGreeting",
        THE_HAMMER_STROKE: "theHammerStroke",
        THE_LUCKY_NUMBER: "theLuckyNumber",
        THE_SEEING_STONE: "theSeeingStone",
        THE_TREE_PEOPLE: "theTreePeople",
        THE_WHITE_COUNCIL: "theWhiteCouncil",
        THE_WIZARDS_VOICE: "theWizardsVoice",
        TIGHTEN_OUR_BELTS: "tightenOurBelts",
        TIMELY_AID: "timelyAid",
        TIRELESS_HUNTERS: "tirelessHunters",
        TO_ME_O_MY_KINSFOLK: "toMeOMyKinsfolk",
        TO_THE_EYRIE: "toTheEyrie",
        TRAINED_FOR_WAR: "trainedForWar",
        UNSEEN_STRIKE: "unseenStrike",
        VALIANT_SACRIFICE: "valiantSacrifice",
        WATERS_OF_NIMRODEL: "watersOfNimrodel",
        WE_ARE_NOT_IDLE: "weAreNotIdle",
        WE_DO_NOT_SLEEP: "weDoNotSleep",
        WEALTH_OF_GONDOR: "wealthOfGondor",
        WELL_EQUIPPED: "wellEquipped",
        WORD_OF_COMMAND: "wordOfCommand",

        properties:
        {
            "aElberethGilthoniel":
            {
                name: "A Elbereth! Gilthoniel!",
                cost: 4,
                sphereKey: Sphere.SPIRIT,
                cardSetKey: CardSet.DWARROWDELF,
                cardSubsetKey: CardSubset.D6_SHADOW_AND_FLAME,
                // This is spelled wrong at cardgamedb.com
                image: "http://www.cardgamedb.com/forums/uploads/lotr/ffg_o-elbereth-gilthonial-saf.jpg",
                value: "aElberethGilthoniel",
            },
            "aGoodHarvest":
            {
                name: "A Good Harvest",
                cost: 0,
                sphereKey: Sphere.NEUTRAL,
                cardSetKey: CardSet.AGAINST_THE_SHADOW,
                cardSubsetKey: CardSubset.ATS1_THE_STEWARDS_FEAR,
                value: "aGoodHarvest",
            },
            "aLightInTheDark":
            {
                name: "A Light in the Dark",
                cost: 2,
                sphereKey: Sphere.SPIRIT,
                cardSetKey: CardSet.CORE,
                value: "aLightInTheDark",
            },
            "aTestOfWill":
            {
                name: "A Test of Will",
                cost: 1,
                sphereKey: Sphere.SPIRIT,
                cardSetKey: CardSet.CORE,
                value: "aTestOfWill",
            },
            "aWatchfulPeace":
            {
                name: "A Watchful Peace",
                cost: 1,
                sphereKey: Sphere.SPIRIT,
                cardSetKey: CardSet.HEIRS_OF_NUMENOR,
                value: "aWatchfulPeace",
            },
            "advanceWarning":
            {
                name: "Advance Warning",
                cost: 2,
                sphereKey: Sphere.LORE,
                cardSetKey: CardSet.AGAINST_THE_SHADOW,
                cardSubsetKey: CardSubset.ATS2_THE_DRUADAN_FOREST,
                value: "advanceWarning",
            },
            "againstTheShadow":
            {
                name: "Against the Shadow",
                cost: 2,
                sphereKey: Sphere.SPIRIT,
                cardSetKey: CardSet.AGAINST_THE_SHADOW,
                cardSubsetKey: CardSubset.ATS2_THE_DRUADAN_FOREST,
                value: "againstTheShadow",
            },
            "astonishingSpeed":
            {
                name: "Astonishing Speed",
                cost: 3,
                sphereKey: Sphere.SPIRIT,
                cardSetKey: CardSet.SHADOWS_OF_MIRKWOOD,
                cardSubsetKey: CardSubset.SOM6_RETURN_TO_MIRKWOOD,
                value: "astonishingSpeed",
            },
            "behindStrongWalls":
            {
                name: "Behind Strong Walls",
                cost: 1,
                sphereKey: Sphere.TACTICS,
                cardSetKey: CardSet.HEIRS_OF_NUMENOR,
                value: "behindStrongWalls",
            },
            "boomedAndTrumpeted":
            {
                name: "Boomed and Trumpeted",
                cost: 1,
                traitKeys: [ Trait.ENT ],
                sphereKey: Sphere.TACTICS,
                cardSetKey: CardSet.ANGMAR_AWAKENED,
                cardSubsetKey: CardSubset.AA2_ESCAPE_FROM_MOUNT_GRAM,
                cardSetNumber: 32,
                value: "boomedAndTrumpeted",
            },
            "campfireTales":
            {
                name: "Campfire Tales",
                cost: 1,
                sphereKey: Sphere.LEADERSHIP,
                cardSetKey: CardSet.SHADOWS_OF_MIRKWOOD,
                cardSubsetKey: CardSubset.SOM1_THE_HUNT_FOR_GOLLUM,
                value: "campfireTales",
            },
            "chargeOfTheRohirrim":
            {
                name: "Charge of the Rohirrim",
                cost: 2,
                sphereKey: Sphere.TACTICS,
                cardSetKey: CardSet.THE_RING_MAKER,
                cardSubsetKey: CardSubset.TRM5_CELEBRIMBORS_SECRET,
                cardSetNumber: 116,
                value: "chargeOfTheRohirrim",
            },
            "childrenOfTheSea":
            {
                name: "Children of the Sea",
                cost: 0,
                sphereKey: Sphere.SPIRIT,
                cardSetKey: CardSet.AGAINST_THE_SHADOW,
                cardSubsetKey: CardSubset.ATS5_THE_BLOOD_OF_GONDOR,
                value: "childrenOfTheSea",
            },
            "closeCall":
            {
                name: "Close Call",
                cost: 0,
                sphereKey: Sphere.TACTICS,
                cardSetKey: CardSet.THE_RING_MAKER,
                cardSubsetKey: CardSubset.TRM1_THE_DUNLAND_TRAP,
                cardSetNumber: 5,
                value: "closeCall",
            },
            "courageAwakened":
            {
                name: "Courage Awakened",
                cost: 1,
                sphereKey: Sphere.SPIRIT,
                cardSetKey: CardSet.THE_RING_MAKER,
                cardSubsetKey: CardSubset.TRM3_TROUBLE_IN_THARBAD,
                cardSetNumber: 61,
                value: "courageAwakened",
            },
            "daeronsRunes":
            {
                name: "Daeron's Runes",
                cost: 0,
                sphereKey: Sphere.LORE,
                cardSetKey: CardSet.DWARROWDELF,
                cardSubsetKey: CardSubset.D5_FOUNDATIONS_OF_STONE,
                value: "daeronsRunes",
            },
            "dawnTakeYouAll":
            {
                name: "Dawn Take You All",
                cost: 2,
                sphereKey: Sphere.LEADERSHIP,
                cardSetKey: CardSet.SHADOWS_OF_MIRKWOOD,
                cardSubsetKey: CardSubset.SOM6_RETURN_TO_MIRKWOOD,
                value: "dawnTakeYouAll",
            },
            "deepKnowledge":
            {
                name: "Deep Knowledge",
                cost: 0,
                sphereKey: Sphere.LORE,
                cardSetKey: CardSet.THE_VOICE_OF_ISENGARD,
                value: "deepKnowledge",
            },
            "descendantsOfKings":
            {
                name: "Descendants of Kings",
                cost: 1,
                sphereKey: Sphere.LEADERSHIP,
                cardSetKey: CardSet.ANGMAR_AWAKENED,
                cardSubsetKey: CardSubset.AA2_ESCAPE_FROM_MOUNT_GRAM,
                cardSetNumber: 30,
                value: "descendantsOfKings",
            },
            "desperateAlliance":
            {
                name: "Desperate Alliance",
                cost: 0,
                sphereKey: Sphere.SPIRIT,
                cardSetKey: CardSet.ON_THE_DOORSTEP,
                value: "desperateAlliance",
            },
            "distantStars":
            {
                name: "Distant Stars",
                cost: 0,
                sphereKey: Sphere.LORE,
                cardSetKey: CardSet.ANGMAR_AWAKENED,
                cardSubsetKey: CardSubset.AA2_ESCAPE_FROM_MOUNT_GRAM,
                cardSetNumber: 36,
                value: "distantStars",
            },
            "dontBeHasty":
            {
                name: "Don't Be Hasty!",
                cost: 0,
                sphereKey: Sphere.LORE,
                cardSetKey: CardSet.THE_RING_MAKER,
                cardSubsetKey: CardSubset.TRM6_THE_ANTLERED_CROWN,
                cardSetNumber: 144,
                value: "dontBeHasty",
            },
            "doomHangsStill":
            {
                name: "Doom Hangs Still",
                cost: 5,
                sphereKey: Sphere.LEADERSHIP,
                cardSetKey: CardSet.ANGMAR_AWAKENED,
                cardSubsetKey: CardSubset.AA5_THE_BATTLE_OF_CARN_DUM,
                cardSetNumber: 117,
                value: "doomHangsStill",
            },
            "dunedainMessage":
            {
                name: "Dúnedain Message",
                cost: 1,
                traitKeys: [ Trait.SIGNAL ],
                sphereKey: Sphere.LEADERSHIP,
                cardSetKey: CardSet.ANGMAR_AWAKENED,
                cardSubsetKey: CardSubset.AA3_ACROSS_THE_ETTENMOORS,
                cardSetNumber: 56,
                value: "dunedainMessage",
            },
            "dwarvenTomb":
            {
                name: "Dwarven Tomb",
                cost: 1,
                sphereKey: Sphere.SPIRIT,
                cardSetKey: CardSet.CORE,
                value: "dwarvenTomb",
            },
            "elrondsCounsel":
            {
                name: "Elrond's Counsel",
                cost: 0,
                sphereKey: Sphere.SPIRIT,
                cardSetKey: CardSet.DWARROWDELF,
                cardSubsetKey: CardSubset.D3_THE_WATCHER_IN_THE_WATER,
                value: "elrondsCounsel",
            },
            "expertTrackers":
            {
                name: "Expert Trackers",
                cost: 0,
                sphereKey: Sphere.LORE,
                cardSetKey: CardSet.THE_LOST_REALM,
                cardSetNumber: 9,
                value: "expertTrackers",
            },
            "fairAndPerilous":
            {
                name: "Fair and Perilous",
                cost: 1,
                sphereKey: Sphere.SPIRIT,
                cardSetKey: CardSet.ANGMAR_AWAKENED,
                cardSubsetKey: CardSubset.AA3_ACROSS_THE_ETTENMOORS,
                cardSetNumber: 60,
                value: "fairAndPerilous",
            },
            "feignedVoices":
            {
                name: "Feigned Voices",
                cost: 0,
                sphereKey: Sphere.LEADERSHIP,
                cardSetKey: CardSet.THE_RING_MAKER,
                cardSubsetKey: CardSubset.TRM2_THE_THREE_TRIALS,
                cardSetNumber: 27,
                value: "feignedVoices",
            },
            "feint":
            {
                name: "Feint",
                cost: 1,
                sphereKey: Sphere.TACTICS,
                cardSetKey: CardSet.CORE,
                value: "feint",
            },
            "followMe":
            {
                name: "Follow Me!",
                cost: 1,
                sphereKey: Sphere.LEADERSHIP,
                cardSetKey: CardSet.THE_RING_MAKER,
                cardSubsetKey: CardSubset.TRM4_THE_NIN_IN_EILPH,
                cardSetNumber: 85,
                value: "followMe",
            },
            "forGondor":
            {
                name: "For Gondor!",
                cost: 2,
                sphereKey: Sphere.LEADERSHIP,
                cardSetKey: CardSet.CORE,
                value: "forGondor",
            },
            "forestPatrol":
            {
                name: "Forest Patrol",
                cost: 1,
                sphereKey: Sphere.LORE,
                cardSetKey: CardSet.AGAINST_THE_SHADOW,
                cardSubsetKey: CardSubset.ATS4_ASSAULT_ON_OSGILIATH,
                value: "forestPatrol",
            },
            "forthEorlingas":
            {
                name: "Forth Eorlingas!",
                cost: 2,
                sphereKey: Sphere.TACTICS,
                cardSetKey: CardSet.AGAINST_THE_SHADOW,
                cardSubsetKey: CardSubset.ATS6_THE_MORGUL_VALE,
                value: "forthEorlingas",
            },
            "freeToChoose":
            {
                name: "Free to Choose",
                cost: 0,
                sphereKey: Sphere.SPIRIT,
                cardSetKey: CardSet.THE_RING_MAKER,
                cardSubsetKey: CardSubset.TRM3_TROUBLE_IN_THARBAD,
                cardSetNumber: 62,
                value: "freeToChoose",
            },
            "freshTracks":
            {
                name: "Fresh Tracks",
                cost: 1,
                sphereKey: Sphere.LEADERSHIP,
                cardSetKey: CardSet.DWARROWDELF,
                cardSubsetKey: CardSubset.D4_THE_LONG_DARK,
                value: "freshTracks",
            },
            "gainingStrength":
            {
                name: "Gaining Strength",
                cost: 0,
                sphereKey: Sphere.LEADERSHIP,
                cardSetKey: CardSet.AGAINST_THE_SHADOW,
                cardSubsetKey: CardSubset.ATS1_THE_STEWARDS_FEAR,
                value: "gainingStrength",
            },
            "gildorsCounsel":
            {
                name: "Gildor's Counsel",
                cost: 3,
                sphereKey: Sphere.LORE,
                cardSetKey: CardSet.SHADOWS_OF_MIRKWOOD,
                cardSubsetKey: CardSubset.SOM4_THE_HILLS_OF_EMYN_MUIL,
                value: "gildorsCounsel",
            },
            "gondorianDiscipline":
            {
                name: "Gondorian Discipline",
                cost: 0,
                sphereKey: Sphere.TACTICS,
                cardSetKey: CardSet.AGAINST_THE_SHADOW,
                cardSubsetKey: CardSubset.ATS3_ENCOUNTER_AT_AMON_DIN,
                value: "gondorianDiscipline",
            },
            "graveCairn":
            {
                name: "Grave Cairn",
                cost: 1,
                sphereKey: Sphere.LEADERSHIP,
                cardSetKey: CardSet.DWARROWDELF,
                cardSubsetKey: CardSubset.D3_THE_WATCHER_IN_THE_WATER,
                value: "graveCairn",
            },
            "hailOfStones":
            {
                name: "Hail of Stones",
                cost: 1,
                sphereKey: Sphere.TACTICS,
                cardSetKey: CardSet.DWARROWDELF,
                cardSubsetKey: CardSubset.D2_ROAD_TO_RIVENDELL,
                value: "hailOfStones",
            },
            "handsUponTheBow":
            {
                name: "Hands Upon the Bow",
                cost: 1,
                sphereKey: Sphere.TACTICS,
                cardSetKey: CardSet.DWARROWDELF,
                cardSubsetKey: CardSubset.D6_SHADOW_AND_FLAME,
                value: "handsUponTheBow",
            },
            "hastyStroke":
            {
                name: "Hasty Stroke",
                cost: 1,
                sphereKey: Sphere.SPIRIT,
                cardSetKey: CardSet.CORE,
                value: "hastyStroke",
            },
            "heavyStroke":
            {
                name: "Heavy Stroke",
                cost: 1,
                sphereKey: Sphere.TACTICS,
                cardSetKey: CardSet.DWARROWDELF,
                cardSubsetKey: CardSubset.D5_FOUNDATIONS_OF_STONE,
                value: "heavyStroke",
            },
            "hiddenCache":
            {
                name: "Hidden Cache",
                cost: 0,
                sphereKey: Sphere.NEUTRAL,
                cardSetKey: CardSet.AGAINST_THE_SHADOW,
                cardSubsetKey: CardSubset.ATS6_THE_MORGUL_VALE,
                value: "hiddenCache",
            },
            "hobbitSense":
            {
                name: "Hobbit-Sense",
                cost: 2,
                sphereKey: Sphere.NEUTRAL,
                cardSetKey: CardSet.AGAINST_THE_SHADOW,
                cardSubsetKey: CardSubset.ATS3_ENCOUNTER_AT_AMON_DIN,
                value: "hobbitSense",
            },
            "holdYourGround":
            {
                name: "Hold Your Ground!",
                cost: 1,
                sphereKey: Sphere.TACTICS,
                cardSetKey: CardSet.ANGMAR_AWAKENED,
                cardSubsetKey: CardSubset.AA5_THE_BATTLE_OF_CARN_DUM,
                cardSetNumber: 119,
                value: "holdYourGround",
            },
            "hopeRekindled":
            {
                name: "Hope Rekindled",
                cost: 0,
                traitKeys: [ Trait.SONG ],
                sphereKey: Sphere.NEUTRAL,
                cardSetKey: CardSet.ANGMAR_AWAKENED,
                cardSubsetKey: CardSubset.AA3_ACROSS_THE_ETTENMOORS,
                cardSetNumber: 63,
                value: "hopeRekindled",
            },
            "hornsCry":
            {
                name: "Horn's Cry",
                cost: 2,
                sphereKey: Sphere.TACTICS,
                cardSetKey: CardSet.ANGMAR_AWAKENED,
                cardSubsetKey: CardSubset.AA4_THE_TREACHERY_OF_RHUDAUR,
                cardSetNumber: 88,
                value: "hornsCry",
            },
            "islandAmidPerils":
            {
                name: "Island Amid Perils",
                cost: 0,
                sphereKey: Sphere.SPIRIT,
                cardSetKey: CardSet.THE_RING_MAKER,
                cardSubsetKey: CardSubset.TRM4_THE_NIN_IN_EILPH,
                cardSetNumber: 90,
                value: "islandAmidPerils",
            },
            "infighting":
            {
                name: "Infighting",
                cost: 1,
                sphereKey: Sphere.LORE,
                cardSetKey: CardSet.SHADOWS_OF_MIRKWOOD,
                cardSubsetKey: CardSubset.SOM3_A_JOURNEY_TO_RHOSGOBEL,
                value: "infighting",
            },
            "keenAsLances":
            {
                name: "Keen as Lances",
                cost: 5,
                sphereKey: Sphere.NEUTRAL,
                cardSetKey: CardSet.ANGMAR_AWAKENED,
                cardSubsetKey: CardSubset.AA2_ESCAPE_FROM_MOUNT_GRAM,
                cardSetNumber: 37,
                value: "keenAsLances",
            },
            "layOfNimrodel":
            {
                name: "Lay of Nimrodel",
                cost: 1,
                sphereKey: Sphere.SPIRIT,
                cardSetKey: CardSet.AGAINST_THE_SHADOW,
                cardSubsetKey: CardSubset.ATS6_THE_MORGUL_VALE,
                value: "layOfNimrodel",
            },
            "leaveNoTrace":
            {
                name: "Leave No Trace",
                cost: 1,
                sphereKey: Sphere.LORE,
                cardSetKey: CardSet.ANGMAR_AWAKENED,
                cardSubsetKey: CardSubset.AA2_ESCAPE_FROM_MOUNT_GRAM,
                cardSetNumber: 35,
                value: "leaveNoTrace",
            },
            "legacyOfNumenor":
            {
                name: "Legacy of Numenor",
                cost: 0,
                sphereKey: Sphere.LEADERSHIP,
                cardSetKey: CardSet.THE_VOICE_OF_ISENGARD,
                value: "legacyOfNumenor",
            },
            "lightTheBeacons":
            {
                name: "Light the Beacons",
                cost: 5,
                sphereKey: Sphere.SPIRIT,
                cardSetKey: CardSet.HEIRS_OF_NUMENOR,
                value: "lightTheBeacons",
            },
            "lordsOfTheEldar":
            {
                name: "Lords of the Eldar",
                cost: 3,
                sphereKey: Sphere.SPIRIT,
                cardSetKey: CardSet.ANGMAR_AWAKENED,
                cardSubsetKey: CardSubset.AA5_THE_BATTLE_OF_CARN_DUM,
                cardSetNumber: 121,
                value: "lordsOfTheEldar",
            },
            "lureOfMoria":
            {
                name: "Lure of Moria",
                cost: 3,
                sphereKey: Sphere.LEADERSHIP,
                cardSetKey: CardSet.DWARROWDELF,
                cardSubsetKey: CardSubset.D2_ROAD_TO_RIVENDELL,
                value: "lureOfMoria",
            },
            "menOfTheWest":
            {
                name: "Men of the West",
                cost: undefined,
                sphereKey: Sphere.LEADERSHIP,
                cardSetKey: CardSet.AGAINST_THE_SHADOW,
                cardSubsetKey: CardSubset.ATS4_ASSAULT_ON_OSGILIATH,
                value: "menOfTheWest",
            },
            "meneldorsFlight":
            {
                name: "Meneldor's Flight",
                cost: 0,
                sphereKey: Sphere.TACTICS,
                cardSetKey: CardSet.SHADOWS_OF_MIRKWOOD,
                cardSubsetKey: CardSubset.SOM4_THE_HILLS_OF_EMYN_MUIL,
                value: "meneldorsFlight",
            },
            "messageFromElrond":
            {
                name: "Message from Elrond",
                cost: 0,
                sphereKey: Sphere.LORE,
                cardSetKey: CardSet.THE_RING_MAKER,
                cardSubsetKey: CardSubset.TRM2_THE_THREE_TRIALS,
                cardSetNumber: 32,
                value: "messageFromElrond",
            },
            "mithrandirsAdvice":
            {
                name: "Mithrandir's Advice",
                cost: 0,
                sphereKey: Sphere.LEADERSHIP,
                cardSetKey: CardSet.AGAINST_THE_SHADOW,
                cardSubsetKey: CardSubset.ATS1_THE_STEWARDS_FEAR,
                value: "mithrandirsAdvice",
            },
            "musteringTheRohirrim":
            {
                name: "Mustering the Rohirrim",
                cost: 1,
                sphereKey: Sphere.SPIRIT,
                cardSetKey: CardSet.SHADOWS_OF_MIRKWOOD,
                cardSubsetKey: CardSubset.SOM1_THE_HUNT_FOR_GOLLUM,
                value: "musteringTheRohirrim",
            },
            "mutualAccord":
            {
                name: "Mutual Accord",
                cost: 0,
                sphereKey: Sphere.LEADERSHIP,
                cardSetKey: CardSet.HEIRS_OF_NUMENOR,
                value: "mutualAccord",
            },
            "needfulToKnow":
            {
                name: "Needful to Know",
                cost: 2,
                sphereKey: Sphere.LORE,
                cardSetKey: CardSet.DWARROWDELF,
                cardSubsetKey: CardSubset.D1_THE_REDHORN_GATE,
                value: "needfulToKnow",
            },
            "noiselessMovement":
            {
                name: "Noiseless Movement",
                cost: 1,
                sphereKey: Sphere.LORE,
                cardSetKey: CardSet.THE_RING_MAKER,
                cardSubsetKey: CardSubset.TRM2_THE_THREE_TRIALS,
                cardSetNumber: 33,
                value: "noiselessMovement",
            },
            "noneReturn":
            {
                name: "None Return",
                cost: 1,
                sphereKey: Sphere.LORE,
                cardSetKey: CardSet.ANGMAR_AWAKENED,
                cardSubsetKey: CardSubset.AA3_ACROSS_THE_ETTENMOORS,
                cardSetNumber: 62,
                value: "noneReturn",
            },
            "outOfSight":
            {
                name: "Out of Sight",
                cost: 5,
                sphereKey: Sphere.SPIRIT,
                cardSetKey: CardSet.DWARROWDELF,
                cardSubsetKey: CardSubset.D4_THE_LONG_DARK,
                value: "outOfSight",
            },
            "outOfTheWild":
            {
                name: "Out of the Wild",
                cost: 3,
                sphereKey: Sphere.LORE,
                cardSetKey: CardSet.DWARROWDELF,
                cardSubsetKey: CardSubset.D2_ROAD_TO_RIVENDELL,
                value: "outOfTheWild",
            },
            "partingGifts":
            {
                name: "Parting Gifts",
                cost: 0,
                sphereKey: Sphere.LEADERSHIP,
                cardSetKey: CardSet.SHADOWS_OF_MIRKWOOD,
                cardSubsetKey: CardSubset.SOM3_A_JOURNEY_TO_RHOSGOBEL,
                value: "partingGifts",
            },
            "peaceAndThought":
            {
                name: "Peace, and Thought",
                cost: 1,
                sphereKey: Sphere.LORE,
                cardSetKey: CardSet.DWARROWDELF,
                cardSubsetKey: CardSubset.D6_SHADOW_AND_FLAME,
                value: "peaceAndThought",
            },
            "powerOfOrthanc":
            {
                name: "Power of Orthanc",
                cost: 0,
                sphereKey: Sphere.SPIRIT,
                cardSetKey: CardSet.THE_VOICE_OF_ISENGARD,
                value: "powerOfOrthanc",
            },
            "pursuingTheEnemy":
            {
                name: "Pursuing the Enemy",
                cost: 0,
                sphereKey: Sphere.TACTICS,
                cardSetKey: CardSet.THE_RING_MAKER,
                cardSubsetKey: CardSubset.TRM3_TROUBLE_IN_THARBAD,
                cardSetNumber: 60,
                value: "pursuingTheEnemy",
            },
            "quickEars":
            {
                name: "Quick Ears",
                cost: 1,
                sphereKey: Sphere.LORE,
                cardSetKey: CardSet.ANGMAR_AWAKENED,
                cardSubsetKey: CardSubset.AA5_THE_BATTLE_OF_CARN_DUM,
                cardSetNumber: 123,
                value: "quickEars",
            },
            "quickStrike":
            {
                name: "Quick Strike",
                cost: 1,
                sphereKey: Sphere.TACTICS,
                cardSetKey: CardSet.CORE,
                value: "quickStrike",
            },
            "radagastsCunning":
            {
                name: "Radagast's Cunning",
                cost: 1,
                sphereKey: Sphere.LORE,
                cardSetKey: CardSet.CORE,
                value: "radagastsCunning",
            },
            "rallyingCry":
            {
                name: "Rallying Cry",
                cost: 2,
                sphereKey: Sphere.LEADERSHIP,
                cardSetKey: CardSet.ANGMAR_AWAKENED,
                cardSubsetKey: CardSubset.AA1_THE_WASTES_OF_ERIADOR,
                cardSetNumber: 3,
                value: "rallyingCry",
            },
            "rangerSummons":
            {
                name: "Ranger Summons",
                cost: 1,
                sphereKey: Sphere.LEADERSHIP,
                cardSetKey: CardSet.THE_LOST_REALM,
                cardSetNumber: 7,
                value: "rangerSummons",
            },
            "ravensOfTheMountain":
            {
                name: "Ravens of the Mountain",
                cost: 1,
                sphereKey: Sphere.LORE,
                cardSetKey: CardSet.ON_THE_DOORSTEP,
                value: "ravensOfTheMountain",
            },
            "rearGuard":
            {
                name: "Rear Guard",
                cost: 1,
                sphereKey: Sphere.LEADERSHIP,
                cardSetKey: CardSet.SHADOWS_OF_MIRKWOOD,
                cardSubsetKey: CardSubset.SOM4_THE_HILLS_OF_EMYN_MUIL,
                value: "rearGuard",
            },
            "reinforcements":
            {
                name: "Reinforcements",
                cost: 3,
                sphereKey: Sphere.LEADERSHIP,
                cardSetKey: CardSet.ANGMAR_AWAKENED,
                cardSubsetKey: CardSubset.AA4_THE_TREACHERY_OF_RHUDAUR,
                cardSetNumber: 85,
                value: "reinforcements",
            },
            "renewedFriendship":
            {
                name: "Renewed Friendship",
                cost: 0,
                sphereKey: Sphere.SPIRIT,
                cardSetKey: CardSet.DWARROWDELF,
                cardSubsetKey: CardSubset.D1_THE_REDHORN_GATE,
                value: "renewedFriendship",
            },
            "rideThemDown":
            {
                name: "Ride Them Down",
                cost: 2,
                sphereKey: Sphere.SPIRIT,
                cardSetKey: CardSet.THE_RING_MAKER,
                cardSubsetKey: CardSubset.TRM6_THE_ANTLERED_CROWN,
                cardSetNumber: 142,
                value: "rideThemDown",
            },
            "rideToRuin":
            {
                name: "Ride to Ruin",
                cost: 1,
                sphereKey: Sphere.SPIRIT,
                cardSetKey: CardSet.SHADOWS_OF_MIRKWOOD,
                cardSubsetKey: CardSubset.SOM4_THE_HILLS_OF_EMYN_MUIL,
                value: "rideToRuin",
            },
            "riskSomeLight":
            {
                name: "Risk Some Light",
                cost: 3,
                sphereKey: Sphere.LORE,
                cardSetKey: CardSet.DWARROWDELF,
                cardSubsetKey: CardSubset.D6_SHADOW_AND_FLAME,
                value: "riskSomeLight",
            },
            "rumourFromTheEarth":
            {
                name: "Rumour from the Earth",
                cost: 0,
                sphereKey: Sphere.LORE,
                cardSetKey: CardSet.SHADOWS_OF_MIRKWOOD,
                cardSubsetKey: CardSubset.SOM6_RETURN_TO_MIRKWOOD,
                value: "rumourFromTheEarth",
            },
            "secondBreakfast":
            {
                name: "Second Breakfast",
                cost: 1,
                sphereKey: Sphere.LEADERSHIP,
                cardSetKey: CardSet.SHADOWS_OF_MIRKWOOD,
                cardSubsetKey: CardSubset.SOM2_CONFLICT_AT_THE_CARROCK,
                value: "secondBreakfast",
            },
            "shadowOfThePast":
            {
                name: "Shadow of the Past",
                cost: 2,
                sphereKey: Sphere.NEUTRAL,
                cardSetKey: CardSet.SHADOWS_OF_MIRKWOOD,
                cardSubsetKey: CardSubset.SOM6_RETURN_TO_MIRKWOOD,
                value: "shadowOfThePast",
            },
            "shadowsGiveWay":
            {
                name: "Shadows Give Way",
                cost: 3,
                sphereKey: Sphere.SPIRIT,
                cardSetKey: CardSet.THE_RING_MAKER,
                cardSubsetKey: CardSubset.TRM6_THE_ANTLERED_CROWN,
                cardSetNumber: 143,
                value: "shadowsGiveWay",
            },
            "shortCut":
            {
                name: "Short Cut",
                cost: 1,
                sphereKey: Sphere.LORE,
                cardSetKey: CardSet.DWARROWDELF,
                cardSubsetKey: CardSubset.D3_THE_WATCHER_IN_THE_WATER,
                value: "shortCut",
            },
            "smallTarget":
            {
                name: "Small Target",
                cost: 1,
                sphereKey: Sphere.SPIRIT,
                cardSetKey: CardSet.AGAINST_THE_SHADOW,
                cardSubsetKey: CardSubset.ATS3_ENCOUNTER_AT_AMON_DIN,
                value: "smallTarget",
            },
            "sneakAttack":
            {
                name: "Sneak Attack",
                cost: 1,
                sphereKey: Sphere.LEADERSHIP,
                cardSetKey: CardSet.CORE,
                value: "sneakAttack",
            },
            "standAndFight":
            {
                name: "Stand and Fight",
                // cost: 1,
                sphereKey: Sphere.SPIRIT,
                cardSetKey: CardSet.CORE,
                value: "standAndFight",
            },
            "straightShot":
            {
                name: "Straight Shot",
                cost: 0,
                sphereKey: Sphere.TACTICS,
                cardSetKey: CardSet.ON_THE_DOORSTEP,
                value: "straightShot",
            },
            "strengthOfArms":
            {
                name: "Strength of Arms",
                cost: 2,
                sphereKey: Sphere.LEADERSHIP,
                cardSetKey: CardSet.AGAINST_THE_SHADOW,
                cardSubsetKey: CardSubset.ATS2_THE_DRUADAN_FOREST,
                value: "strengthOfArms",
            },
            "stridersPath":
            {
                name: "Strider's Path",
                cost: 1,
                sphereKey: Sphere.LORE,
                cardSetKey: CardSet.SHADOWS_OF_MIRKWOOD,
                cardSubsetKey: CardSubset.SOM1_THE_HUNT_FOR_GOLLUM,
                value: "stridersPath",
            },
            "swiftAndSilent":
            {
                name: "Swift and Silent",
                cost: 1,
                sphereKey: Sphere.LEADERSHIP,
                cardSetKey: CardSet.THE_RING_MAKER,
                cardSubsetKey: CardSubset.TRM1_THE_DUNLAND_TRAP,
                cardSetNumber: 3,
                value: "swiftAndSilent",
            },
            "swiftStrike":
            {
                name: "Swift Strike",
                cost: 2,
                sphereKey: Sphere.TACTICS,
                cardSetKey: CardSet.CORE,
                value: "swiftStrike",
            },
            "takingInitiative":
            {
                name: "Taking Initiative",
                cost: 0,
                sphereKey: Sphere.LEADERSHIP,
                cardSetKey: CardSet.DWARROWDELF,
                cardSubsetKey: CardSubset.D1_THE_REDHORN_GATE,
                value: "takingInitiative",
            },
            "theDoorIsClosed":
            {
                name: "The Door is Closed!",
                cost: 1,
                sphereKey: Sphere.LORE,
                cardSetKey: CardSet.ANGMAR_AWAKENED,
                cardSubsetKey: CardSubset.AA4_THE_TREACHERY_OF_RHUDAUR,
                cardSetNumber: 92,
                value: "theDoorIsClosed",
            },
            "theEaglesAreComing":
            {
                name: "The Eagles Are Coming!",
                cost: 0,
                sphereKey: Sphere.TACTICS,
                cardSetKey: CardSet.SHADOWS_OF_MIRKWOOD,
                cardSubsetKey: CardSubset.SOM1_THE_HUNT_FOR_GOLLUM,
                value: "theEaglesAreComing",
            },
            "theEndComes":
            {
                name: "The End Comes",
                cost: 0,
                sphereKey: Sphere.NEUTRAL,
                cardSetKey: CardSet.DWARROWDELF,
                cardSubsetKey: CardSubset.D2_ROAD_TO_RIVENDELL,
                value: "theEndComes",
            },
            "theGaladhrimsGreeting":
            {
                name: "The Galadhrim's Greeting",
                cost: 3,
                sphereKey: Sphere.SPIRIT,
                cardSetKey: CardSet.CORE,
                value: "theGaladhrimsGreeting",
            },
            "theHammerStroke":
            {
                name: "The Hammer-Stroke",
                cost: 2,
                sphereKey: Sphere.TACTICS,
                cardSetKey: CardSet.AGAINST_THE_SHADOW,
                cardSubsetKey: CardSubset.ATS5_THE_BLOOD_OF_GONDOR,
                value: "theHammerStroke",
            },
            "theLuckyNumber":
            {
                name: "The Lucky Number",
                cost: 1,
                sphereKey: Sphere.BAGGINS,
                cardSetKey: CardSet.ON_THE_DOORSTEP,
                value: "theLuckyNumber",
            },
            "theSeeingStone":
            {
                name: "The Seeing-Stone",
                cost: 0,
                sphereKey: Sphere.NEUTRAL,
                cardSetKey: CardSet.THE_VOICE_OF_ISENGARD,
                value: "theSeeingStone",
            },
            "theTreePeople":
            {
                name: "The Tree People",
                cost: 0,
                sphereKey: Sphere.LORE,
                cardSetKey: CardSet.THE_RING_MAKER,
                cardSubsetKey: CardSubset.TRM1_THE_DUNLAND_TRAP,
                cardSetNumber: 9,
                value: "theTreePeople",
            },
            "theWhiteCouncil":
            {
                name: "The White Council",
                cost: undefined,
                sphereKey: Sphere.NEUTRAL,
                cardSetKey: CardSet.THE_RING_MAKER,
                cardSubsetKey: CardSubset.TRM1_THE_DUNLAND_TRAP,
                cardSetNumber: 10,
                value: "theWhiteCouncil",
            },
            "theWizardsVoice":
            {
                name: "The Wizard's Voice",
                cost: 0,
                sphereKey: Sphere.TACTICS,
                cardSetKey: CardSet.THE_VOICE_OF_ISENGARD,
                cardSetNumber: 13,
                // This is spelled wrong at cardgamedb.com
                image: "http://www.cardgamedb.com/forums/uploads/lotr/ffg_the-wizardss-voice-voi.jpg",
                value: "theWizardsVoice",
            },
            "tightenOurBelts":
            {
                name: "Tighten Our Belts",
                cost: 0,
                sphereKey: Sphere.LEADERSHIP,
                cardSetKey: CardSet.THE_RING_MAKER,
                cardSubsetKey: CardSubset.TRM4_THE_NIN_IN_EILPH,
                cardSetNumber: 86,
                value: "tightenOurBelts",
            },
            "timelyAid":
            {
                name: "Timely Aid",
                cost: 4,
                sphereKey: Sphere.LEADERSHIP,
                cardSetKey: CardSet.DWARROWDELF,
                cardSubsetKey: CardSubset.D1_THE_REDHORN_GATE,
                value: "timelyAid",
            },
            "tirelessHunters":
            {
                name: "Tireless Hunters",
                cost: 1,
                sphereKey: Sphere.TACTICS,
                cardSetKey: CardSet.THE_LOST_REALM,
                cardSetNumber: 8,
                value: "tirelessHunters",
            },
            "toMeOMyKinsfolk":
            {
                name: "To Me! O My Kinsfolk!",
                cost: 1,
                sphereKey: Sphere.LEADERSHIP,
                cardSetKey: CardSet.ON_THE_DOORSTEP,
                value: "toMeOMyKinsfolk",
            },
            "toTheEyrie":
            {
                name: "To the Eyrie",
                cost: 2,
                sphereKey: Sphere.TACTICS,
                cardSetKey: CardSet.SHADOWS_OF_MIRKWOOD,
                cardSubsetKey: CardSubset.SOM3_A_JOURNEY_TO_RHOSGOBEL,
                value: "toTheEyrie",
            },
            "trainedForWar":
            {
                name: "Trained for War",
                cost: 2,
                sphereKey: Sphere.TACTICS,
                cardSetKey: CardSet.AGAINST_THE_SHADOW,
                cardSubsetKey: CardSubset.ATS2_THE_DRUADAN_FOREST,
                value: "trainedForWar",
            },
            "unseenStrike":
            {
                name: "Unseen Strike",
                cost: 0,
                sphereKey: Sphere.TACTICS,
                cardSetKey: CardSet.DWARROWDELF,
                cardSubsetKey: CardSubset.D1_THE_REDHORN_GATE,
                value: "unseenStrike",
            },
            "valiantSacrifice":
            {
                name: "Valiant Sacrifice",
                cost: 1,
                sphereKey: Sphere.LEADERSHIP,
                cardSetKey: CardSet.CORE,
                value: "valiantSacrifice",
            },
            "watersOfNimrodel":
            {
                name: "Waters of Nimrodel",
                cost: 3,
                sphereKey: Sphere.LORE,
                cardSetKey: CardSet.THE_RING_MAKER,
                cardSubsetKey: CardSubset.TRM6_THE_ANTLERED_CROWN,
                cardSetNumber: 145,
                value: "watersOfNimrodel",
            },
            "weAreNotIdle":
            {
                name: "We Are Not Idle",
                cost: 0,
                sphereKey: Sphere.LEADERSHIP,
                cardSetKey: CardSet.DWARROWDELF,
                cardSubsetKey: CardSubset.D6_SHADOW_AND_FLAME,
                value: "weAreNotIdle",
            },
            "weDoNotSleep":
            {
                name: "We Do Not Sleep",
                cost: 5,
                sphereKey: Sphere.SPIRIT,
                cardSetKey: CardSet.SHADOWS_OF_MIRKWOOD,
                cardSubsetKey: CardSubset.SOM5_THE_DEAD_MARSHES,
                value: "weDoNotSleep",
            },
            "wealthOfGondor":
            {
                name: "Wealth of Gondor",
                cost: 0,
                sphereKey: Sphere.LEADERSHIP,
                cardSetKey: CardSet.HEIRS_OF_NUMENOR,
                value: "wealthOfGondor",
            },
            "wellEquipped":
            {
                name: "Well-Equipped",
                cost: 0,
                sphereKey: Sphere.NEUTRAL,
                cardSetKey: CardSet.AGAINST_THE_SHADOW,
                cardSubsetKey: CardSubset.ATS5_THE_BLOOD_OF_GONDOR,
                value: "wellEquipped",
            },
            "wordOfCommand":
            {
                name: "Word of Command",
                cost: 1,
                sphereKey: Sphere.LORE,
                cardSetKey: CardSet.DWARROWDELF,
                cardSubsetKey: CardSubset.D4_THE_LONG_DARK,
                value: "wordOfCommand",
            },
        },

        values: function()
        {
            return Object.getOwnPropertyNames(EventCard.properties);
        },
    };

    EventCard.values().forEach(function(cardKey)
    {
        var card = EventCard.properties[cardKey];
        card.cardSet = CardSet.properties[card.cardSetKey];
        if (card.cardSubsetKey)
        {
            card.cardSubset = CardSubset.properties[card.cardSubsetKey];
        }
        card.cardTypeKey = CardType.EVENT;
        card.cardType = CardType.properties[card.cardTypeKey];
        card.sphere = Sphere.properties[card.sphereKey];

        if (!card.image)
        {
            card.image = ImageNameCreator.create(card);
        }
    });

    if (Object.freeze)
    {
        Object.freeze(EventCard);
    }

    return EventCard;
});

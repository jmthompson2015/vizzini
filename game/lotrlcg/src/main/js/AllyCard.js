define([ "CardSet", "CardSubset", "CardType", "ImageNameCreator", "Sphere", "Trait" ], function(CardSet, CardSubset,
        CardType, ImageNameCreator, Sphere, Trait)
{
    "use strict";
    var AllyCard =
    {
        BEORN: "beorn",
        BEORNING_BEEKEEPER: "beorningBeekeeper",
        BIFUR: "bifur",
        BOFUR_OHAUH: "bofurOHaUH",
        BOFUR_TRG: "bofurTRG",
        BROK_IRONFIST: "brokIronfist",
        DAUGHTER_OF_THE_NIMRODEL: "daughterOfTheNimrodel",
        DESCENDANT_OF_THORONDOR: "descendantOfThorondor",
        DORI: "dori",
        DUNEDAIN_WATCHER: "dunedainWatcher",
        DWALIN: "dwalin",
        EAGLES_OF_THE_MISTY_MOUNTAINS: "eaglesOfTheMistyMountains",
        ELFHELM: "elfhelm",
        EOMUND: "eomund",
        EREBOR_BATTLE_MASTER: "ereborBattleMaster",
        EREBOR_HAMMERSMITH: "ereborHammersmith",
        EREBOR_RECORD_KEEPER: "ereborRecordKeeper",
        ERESTOR: "erestor",
        ESCORT_FROM_EDORAS: "escortFromEdoras",
        FARAMIR: "faramir",
        FILI: "fili",
        GANDALF_CORE: "gandalfCore",
        GANDALF_OHAUH: "gandalfOHaUH",
        GILDOR_INGLORION: "gildorInglorion",
        GIMLI: "gimli",
        GLEOWINE: "gleowine",
        GLOIN: "gloin",
        GONDORIAN_SPEARMAN: "gondorianSpearman",
        GUARD_OF_THE_CITADEL: "guardOfTheCitadel",
        HALDIR_OF_LORIEN: "haldirOfLorien",
        HAMA: "hama",
        HENAMARTH_RIVERSONG: "henamarthRiversong",
        HORSEBACK_ARCHER: "horsebackArcher",
        IMLADRIS_STARGAZER: "imladrisStargazer",
        KEEN_EYED_TOOK: "keenEyedTook",
        KILI: "kili",
        LANDROVAL: "landroval",
        LEGOLAS: "legolas",
        LINDON_NAVIGATOR: "lindonNavigator",
        LONGBEARD_ELDER: "longbeardElder",
        LONGBEARD_MAP_MAKER: "longbeardMapMaker",
        LONGBEARD_ORC_SLAYER: "longbeardOrcSlayer",
        LORIEN_GUIDE: "lorienGuide",
        MASTER_OF_THE_FORGE: "masterOfTheForge",
        MINER_OF_THE_IRON_HILLS: "minerOfTheIronHills",
        MIRKWOOD_RUNNER: "mirkwoodRunner",
        MITHLOND_SEA_WATCHER: "mithlondSeaWatcher",
        NORTHERN_TRACKER: "northernTracker",
        QUICKBEAM: "quickbeam",
        RADAGAST: "radagast",
        RAVENHILL_SCOUT: "ravenhillScout",
        RIVENDELL_MINSTREL: "rivendellMinstrel",
        SAILOR_OF_LUNE: "sailorOfLune",
        SILVAN_TRACKER: "silvanTracker",
        SILVERLODE_ARCHER: "silverlodeArcher",
        SNOWBOURN_SCOUT: "snowbournScout",
        SON_OF_ARNOR: "sonOfArnor",
        THE_RIDDERMARKS_FINEST: "theRiddermarksFinest",
        TROLLSHAW_SCOUT: "trollshawScout",
        VASSAL_OF_THE_WINDLORD: "vassalOfTheWindlord",
        VETERAN_AXEHAND: "veteranAxehand",
        VETERAN_OF_NANDUHIRION: "veteranOfNanduhirion",
        WANDERING_TOOK: "wanderingTook",
        WARDEN_OF_HEALING: "wardenOfHealing",
        WARDEN_OF_THE_HAVENS: "wardenOfTheHavens",
        WESTFOLD_HORSE_BREAKER: "westfoldHorseBreaker",
        WEST_ROAD_TRAVELLER: "westRoadTraveller",
        WINGED_GUARDIAN: "wingedGuardian",
        ZIGIL_MINER: "zigilMiner",

        properties:
        {
            "beorn":
            {
                name: "Beorn",
                isUnique: true,
                cost: 6,
                willpower: 1,
                attack: 3,
                defense: 3,
                hitPoints: 6,
                traitKeys: [ Trait.BEORNING, Trait.WARRIOR ],
                sphereKey: Sphere.TACTICS,
                cardSetKey: CardSet.CORE,
                value: "beorn",
            },
            "beorningBeekeeper":
            {
                name: "Beorning Beekeeper",
                cost: 4,
                willpower: 1,
                attack: 2,
                defense: 1,
                hitPoints: 3,
                traitKeys: [ Trait.BEORNING ],
                sphereKey: Sphere.TACTICS,
                cardSetKey: CardSet.SHADOWS_OF_MIRKWOOD,
                cardSubsetKey: CardSubset.SOM2_CONFLICT_AT_THE_CARROCK,
                value: "beorningBeekeeper",
            },
            "bifur":
            {
                name: "Bifur",
                isUnique: true,
                cost: 3,
                willpower: 1,
                attack: 2,
                defense: 1,
                hitPoints: 3,
                traitKeys: [ Trait.DWARF ],
                sphereKey: Sphere.LORE,
                cardSetKey: CardSet.ON_THE_DOORSTEP,
                value: "bifur",
            },
            "bofurOHaUH":
            {
                name: "Bofur",
                isUnique: true,
                cost: 3,
                willpower: 2,
                attack: 2,
                defense: 0,
                hitPoints: 3,
                traitKeys: [ Trait.DWARF ],
                sphereKey: Sphere.TACTICS,
                cardSetKey: CardSet.OVER_HILL_AND_UNDER_HILL,
                value: "bofurOHaUH",
            },
            "bofurTRG":
            {
                name: "Bofur",
                isUnique: true,
                cost: 3,
                willpower: 2,
                attack: 1,
                defense: 1,
                hitPoints: 3,
                traitKeys: [ Trait.DWARF ],
                sphereKey: Sphere.SPIRIT,
                cardSetKey: CardSet.DWARROWDELF,
                cardSubsetKey: CardSubset.D1_THE_REDHORN_GATE,
                value: "bofurTRG",
            },
            "brokIronfist":
            {
                name: "Brok Ironfist",
                isUnique: true,
                cost: 6,
                willpower: 2,
                attack: 2,
                defense: 1,
                hitPoints: 4,
                traitKeys: [ Trait.DWARF, Trait.WARRIOR ],
                sphereKey: Sphere.LEADERSHIP,
                cardSetKey: CardSet.CORE,
                value: "brokIronfist",
            },
            "daughterOfTheNimrodel":
            {
                name: "Daughter of the Nimrodel",
                cost: 3,
                willpower: 1,
                attack: 0,
                defense: 0,
                hitPoints: 1,
                traitKeys: [ Trait.SILVAN ],
                sphereKey: Sphere.LORE,
                cardSetKey: CardSet.CORE,
                value: "daughterOfTheNimrodel",
            },
            "descendantOfThorondor":
            {
                name: "Descendant of Thorondor",
                cost: 4,
                willpower: 1,
                attack: 2,
                defense: 1,
                hitPoints: 2,
                traitKeys: [ Trait.CREATURE, Trait.EAGLE ],
                sphereKey: Sphere.TACTICS,
                cardSetKey: CardSet.SHADOWS_OF_MIRKWOOD,
                cardSubsetKey: CardSubset.SOM4_THE_HILLS_OF_EMYN_MUIL,
                value: "descendantOfThorondor",
            },
            "dori":
            {
                name: "Dori",
                isUnique: true,
                cost: 3,
                willpower: 1,
                attack: 2,
                defense: 1,
                hitPoints: 3,
                traitKeys: [ Trait.DWARF ],
                sphereKey: Sphere.LORE,
                cardSetKey: CardSet.OVER_HILL_AND_UNDER_HILL,
                value: "dori",
            },
            "dunedainWatcher":
            {
                name: "Dúnedain Watcher",
                cost: 3,
                willpower: 1,
                attack: 1,
                defense: 1,
                hitPoints: 2,
                traitKeys: [ Trait.DUNEDAIN ],
                sphereKey: Sphere.LEADERSHIP,
                cardSetKey: CardSet.SHADOWS_OF_MIRKWOOD,
                cardSubsetKey: CardSubset.SOM5_THE_DEAD_MARSHES,
                value: "dunedainWatcher",
            },
            "dwalin":
            {
                name: "Dwalin",
                isUnique: true,
                cost: 3,
                willpower: 1,
                attack: 1,
                defense: 2,
                hitPoints: 3,
                traitKeys: [ Trait.DWARF ],
                sphereKey: Sphere.SPIRIT,
                cardSetKey: CardSet.ON_THE_DOORSTEP,
                value: "dwalin",
            },
            "eaglesOfTheMistyMountains":
            {
                name: "Eagles of the Misty Mountains",
                cost: 4,
                willpower: 2,
                attack: 2,
                defense: 2,
                hitPoints: 4,
                traitKeys: [ Trait.CREATURE, Trait.EAGLE ],
                sphereKey: Sphere.TACTICS,
                cardSetKey: CardSet.SHADOWS_OF_MIRKWOOD,
                cardSubsetKey: CardSubset.SOM6_RETURN_TO_MIRKWOOD,
                value: "eaglesOfTheMistyMountains",
            },
            "elfhelm":
            {
                name: "Elfhelm",
                isUnique: true,
                cost: 4,
                willpower: 1,
                attack: 2,
                defense: 2,
                hitPoints: 3,
                traitKeys: [ Trait.ROHAN, Trait.WARRIOR ],
                sphereKey: Sphere.SPIRIT,
                cardSetKey: CardSet.SHADOWS_OF_MIRKWOOD,
                cardSubsetKey: CardSubset.SOM5_THE_DEAD_MARSHES,
                value: "elfhelm",
            },
            "eomund":
            {
                name: "Éomund",
                isUnique: true,
                cost: 3,
                willpower: 2,
                attack: 1,
                defense: 1,
                hitPoints: 2,
                traitKeys: [ Trait.ROHAN ],
                sphereKey: Sphere.SPIRIT,
                cardSetKey: CardSet.SHADOWS_OF_MIRKWOOD,
                cardSubsetKey: CardSubset.SOM2_CONFLICT_AT_THE_CARROCK,
                value: "eomund",
            },
            "ereborBattleMaster":
            {
                name: "Erebor Battle Master",
                cost: 3,
                willpower: 0,
                attack: 1,
                defense: 1,
                hitPoints: 2,
                traitKeys: [ Trait.DWARF, Trait.WARRIOR ],
                sphereKey: Sphere.TACTICS,
                cardSetKey: CardSet.DWARROWDELF,
                cardSubsetKey: CardSubset.D4_THE_LONG_DARK,
                value: "ereborBattleMaster",
            },
            "ereborHammersmith":
            {
                name: "Erebor Hammersmith",
                cost: 2,
                willpower: 1,
                attack: 1,
                defense: 1,
                hitPoints: 3,
                traitKeys: [ Trait.DWARF, Trait.CRAFTSMAN ],
                sphereKey: Sphere.LORE,
                cardSetKey: CardSet.CORE,
                value: "ereborHammersmith",
            },
            "ereborRecordKeeper":
            {
                name: "Erebor Record Keeper",
                cost: 1,
                willpower: 1,
                attack: 0,
                defense: 0,
                hitPoints: 1,
                traitKeys: [ Trait.DWARF ],
                sphereKey: Sphere.LORE,
                cardSetKey: CardSet.KHAZAD_DUM,
                value: "ereborRecordKeeper",
            },
            "erestor":
            {
                name: "Erestor",
                isUnique: true,
                cost: 4,
                willpower: 2,
                attack: 0,
                defense: 1,
                hitPoints: 3,
                traitKeys: [ Trait.NOLDOR ],
                sphereKey: Sphere.LEADERSHIP,
                cardSetKey: CardSet.DWARROWDELF,
                cardSubsetKey: CardSubset.D4_THE_LONG_DARK,
                value: "erestor",
            },
            "escortFromEdoras":
            {
                name: "Escort from Edoras",
                cost: 2,
                willpower: 2,
                attack: 0,
                defense: 0,
                hitPoints: 1,
                traitKeys: [ Trait.ROHAN ],
                sphereKey: Sphere.SPIRIT,
                cardSetKey: CardSet.SHADOWS_OF_MIRKWOOD,
                cardSubsetKey: CardSubset.SOM3_A_JOURNEY_TO_RHOSGOBEL,
                value: "escortFromEdoras",
            },
            "faramir":
            {
                name: "Faramir",
                isUnique: true,
                cost: 4,
                willpower: 2,
                attack: 1,
                defense: 2,
                hitPoints: 3,
                traitKeys: [ Trait.GONDOR, Trait.NOBLE, Trait.RANGER ],
                sphereKey: Sphere.LEADERSHIP,
                cardSetKey: CardSet.CORE,
                value: "faramir",
            },
            "fili":
            {
                name: "Fili",
                isUnique: true,
                cost: 3,
                willpower: 1,
                attack: 1,
                defense: 1,
                hitPoints: 2,
                traitKeys: [ Trait.DWARF ],
                sphereKey: Sphere.LEADERSHIP,
                cardSetKey: CardSet.OVER_HILL_AND_UNDER_HILL,
                value: "fili",
            },
            "gandalfCore":
            {
                name: "Gandalf",
                isUnique: true,
                cost: 5,
                willpower: 4,
                attack: 4,
                defense: 4,
                hitPoints: 4,
                traitKeys: [ Trait.ISTARI ],
                sphereKey: Sphere.NEUTRAL,
                cardSetKey: CardSet.CORE,
                value: "gandalfCore",
            },
            "gandalfOHaUH":
            {
                name: "Gandalf",
                isUnique: true,
                cost: 5,
                willpower: 4,
                attack: 4,
                defense: 4,
                hitPoints: 4,
                traitKeys: [ Trait.ISTARI ],
                sphereKey: Sphere.NEUTRAL,
                cardSetKey: CardSet.OVER_HILL_AND_UNDER_HILL,
                value: "gandalfOHaUH",
            },
            "gildorInglorion":
            {
                name: "Gildor Inglorion",
                isUnique: true,
                cost: 5,
                willpower: 3,
                attack: 2,
                defense: 3,
                hitPoints: 3,
                traitKeys: [ Trait.NOLDOR ],
                sphereKey: Sphere.LORE,
                cardSetKey: CardSet.SHADOWS_OF_MIRKWOOD,
                cardSubsetKey: CardSubset.SOM4_THE_HILLS_OF_EMYN_MUIL,
                value: "gildorInglorion",
            },
            "gimli":
            {
                name: "Gimli",
                isUnique: true,
                cost: 4,
                willpower: 2,
                attack: 2,
                defense: 2,
                hitPoints: 3,
                traitKeys: [ Trait.DWARF, Trait.WARRIOR ],
                sphereKey: Sphere.LEADERSHIP,
                cardSetKey: CardSet.THE_TREASON_OF_SARUMAN,
                cardSetNumber: 4,
                value: "gimli",
            },
            "gleowine":
            {
                name: "Gléowine",
                isUnique: true,
                cost: 2,
                willpower: 1,
                attack: 0,
                defense: 0,
                hitPoints: 2,
                traitKeys: [ Trait.MINSTREL, Trait.ROHAN ],
                sphereKey: Sphere.LORE,
                cardSetKey: CardSet.CORE,
                value: "gleowine",
            },
            "gloin":
            {
                name: "Glóin",
                isUnique: true,
                cost: 3,
                willpower: 2,
                attack: 1,
                defense: 1,
                hitPoints: 3,
                traitKeys: [ Trait.DWARF ],
                sphereKey: Sphere.LEADERSHIP,
                cardSetKey: CardSet.ON_THE_DOORSTEP,
                value: "gloin",
            },
            "gondorianSpearman":
            {
                name: "Gondorian Spearman",
                cost: 2,
                willpower: 0,
                attack: 1,
                defense: 1,
                hitPoints: 1,
                traitKeys: [ Trait.GONDOR, Trait.WARRIOR ],
                sphereKey: Sphere.TACTICS,
                cardSetKey: CardSet.CORE,
                value: "gondorianSpearman",
            },
            "guardOfTheCitadel":
            {
                name: "Guard of the Citadel",
                cost: 2,
                willpower: 1,
                attack: 1,
                defense: 0,
                hitPoints: 2,
                traitKeys: [ Trait.GONDOR, Trait.WARRIOR ],
                sphereKey: Sphere.LEADERSHIP,
                cardSetKey: CardSet.CORE,
                value: "guardOfTheCitadel",
            },
            "haldirOfLorien":
            {
                name: "Haldir of Lórien",
                isUnique: true,
                cost: 4,
                willpower: 2,
                attack: 2,
                defense: 2,
                hitPoints: 3,
                traitKeys: [ Trait.SILVAN ],
                sphereKey: Sphere.LORE,
                cardSetKey: CardSet.SHADOWS_OF_MIRKWOOD,
                cardSubsetKey: CardSubset.SOM3_A_JOURNEY_TO_RHOSGOBEL,
                value: "haldirOfLorien",
            },
            "hama":
            {
                name: "Hama",
                isUnique: true,
                cost: 3,
                willpower: 1,
                attack: 2,
                defense: 2,
                hitPoints: 2,
                traitKeys: [ Trait.ROHAN, Trait.WARRIOR ],
                sphereKey: Sphere.SPIRIT,
                cardSetKey: CardSet.THE_TREASON_OF_SARUMAN,
                cardSetNumber: 7,
                value: "hama",
            },
            "henamarthRiversong":
            {
                name: "Henamarth Riversong",
                isUnique: true,
                cost: 1,
                willpower: 1,
                attack: 1,
                defense: 0,
                hitPoints: 1,
                traitKeys: [ Trait.SILVAN ],
                sphereKey: Sphere.LORE,
                cardSetKey: CardSet.CORE,
                value: "henamarthRiversong",
            },
            "horsebackArcher":
            {
                name: "Horseback Archer",
                cost: 3,
                willpower: 0,
                attack: 2,
                defense: 1,
                hitPoints: 2,
                traitKeys: [ Trait.ROHAN, Trait.ARCHER ],
                sphereKey: Sphere.TACTICS,
                cardSetKey: CardSet.CORE,
                value: "horsebackArcher",
            },
            "imladrisStargazer":
            {
                name: "Imladris Stargazer",
                cost: 2,
                willpower: 0,
                attack: 0,
                defense: 1,
                hitPoints: 1,
                traitKeys: [ Trait.NOLDOR ],
                sphereKey: Sphere.SPIRIT,
                cardSetKey: CardSet.DWARROWDELF,
                cardSubsetKey: CardSubset.D5_FOUNDATIONS_OF_STONE,
                value: "imladrisStargazer",
            },
            "keenEyedTook":
            {
                name: "Keen-Eyed Took",
                cost: 2,
                willpower: 1,
                attack: 0,
                defense: 0,
                hitPoints: 2,
                traitKeys: [ Trait.HOBBIT ],
                sphereKey: Sphere.LEADERSHIP,
                cardSetKey: CardSet.SHADOWS_OF_MIRKWOOD,
                cardSubsetKey: CardSubset.SOM4_THE_HILLS_OF_EMYN_MUIL,
                value: "keenEyedTook",
            },
            "kili":
            {
                name: "Kili",
                isUnique: true,
                cost: 3,
                willpower: 1,
                attack: 1,
                defense: 1,
                hitPoints: 2,
                traitKeys: [ Trait.DWARF ],
                sphereKey: Sphere.SPIRIT,
                cardSetKey: CardSet.OVER_HILL_AND_UNDER_HILL,
                value: "kili",
            },
            "landroval":
            {
                name: "Landroval",
                isUnique: true,
                cost: 5,
                willpower: 1,
                attack: 3,
                defense: 1,
                hitPoints: 4,
                traitKeys: [ Trait.CREATURE, Trait.EAGLE ],
                sphereKey: Sphere.TACTICS,
                cardSetKey: CardSet.SHADOWS_OF_MIRKWOOD,
                cardSubsetKey: CardSubset.SOM3_A_JOURNEY_TO_RHOSGOBEL,
                value: "landroval",
            },
            "legolas":
            {
                name: "Legolas",
                isUnique: true,
                cost: 4,
                willpower: 1,
                attack: 3,
                defense: 1,
                hitPoints: 3,
                traitKeys: [ Trait.SILVAN, Trait.WARRIOR ],
                sphereKey: Sphere.TACTICS,
                cardSetKey: CardSet.THE_TREASON_OF_SARUMAN,
                cardSetNumber: 5,
                value: "legolas",
            },
            "lindonNavigator":
            {
                name: "Lindon Navigator",
                cost: 2,
                willpower: 2,
                attack: 1,
                defense: 1,
                hitPoints: 2,
                traitKeys: [ Trait.NOLDOR, Trait.SCOUT ],
                sphereKey: Sphere.LORE,
                cardSetKey: CardSet.THE_GREY_HAVENS,
                cardSetNumber: 9,
                value: "lindonNavigator",
            },
            "longbeardElder":
            {
                name: "Longbeard Elder",
                cost: 3,
                willpower: 2,
                attack: 1,
                defense: 1,
                hitPoints: 2,
                traitKeys: [ Trait.DWARF ],
                sphereKey: Sphere.LEADERSHIP,
                cardSetKey: CardSet.DWARROWDELF,
                cardSubsetKey: CardSubset.D5_FOUNDATIONS_OF_STONE,
                value: "longbeardElder",
            },
            "longbeardMapMaker":
            {
                name: "Longbeard Map Maker",
                cost: 3,
                willpower: 1,
                attack: 1,
                defense: 1,
                hitPoints: 3,
                traitKeys: [ Trait.DWARF ],
                sphereKey: Sphere.LORE,
                cardSetKey: CardSet.SHADOWS_OF_MIRKWOOD,
                cardSubsetKey: CardSubset.SOM2_CONFLICT_AT_THE_CARROCK,
                value: "longbeardMapMaker",
            },
            "longbeardOrcSlayer":
            {
                name: "Longbeard Orc Slayer",
                cost: 4,
                willpower: 0,
                attack: 2,
                defense: 1,
                hitPoints: 3,
                traitKeys: [ Trait.DWARF, Trait.WARRIOR ],
                sphereKey: Sphere.LEADERSHIP,
                cardSetKey: CardSet.CORE,
                value: "longbeardOrcSlayer",
            },
            "lorienGuide":
            {
                name: "Lórien Guide",
                cost: 3,
                willpower: 1,
                attack: 1,
                defense: 0,
                hitPoints: 2,
                traitKeys: [ Trait.SILVAN, Trait.SCOUT ],
                sphereKey: Sphere.SPIRIT,
                cardSetKey: CardSet.CORE,
                value: "lorienGuide",
            },
            "masterOfTheForge":
            {
                name: "Master of the Forge",
                cost: 2,
                willpower: 0,
                attack: 0,
                defense: 1,
                hitPoints: 1,
                traitKeys: [ Trait.NOLDOR, Trait.CRAFTSMAN ],
                sphereKey: Sphere.LORE,
                cardSetKey: CardSet.DWARROWDELF,
                cardSubsetKey: CardSubset.D6_SHADOW_AND_FLAME,
                value: "masterOfTheForge",
            },
            "minerOfTheIronHills":
            {
                name: "Miner of the Iron Hills",
                cost: 2,
                willpower: 0,
                attack: 1,
                defense: 1,
                hitPoints: 2,
                traitKeys: [ Trait.DWARF ],
                sphereKey: Sphere.LORE,
                cardSetKey: CardSet.CORE,
                value: "minerOfTheIronHills",
            },
            "mirkwoodRunner":
            {
                name: "Mirkwood Runner",
                cost: 3,
                willpower: 1,
                attack: 2,
                defense: 0,
                hitPoints: 2,
                traitKeys: [ Trait.SILVAN, Trait.SCOUT ],
                sphereKey: Sphere.LORE,
                cardSetKey: CardSet.SHADOWS_OF_MIRKWOOD,
                cardSubsetKey: CardSubset.SOM6_RETURN_TO_MIRKWOOD,
                value: "mirkwoodRunner",
            },
            "mithlondSeaWatcher":
            {
                name: "Mithlond Sea-Watcher",
                cost: 2,
                willpower: 1,
                attack: 1,
                defense: 0,
                hitPoints: 2,
                traitKeys: [ Trait.NOLDOR, Trait.WARRIOR ],
                sphereKey: Sphere.TACTICS,
                cardSetKey: CardSet.THE_GREY_HAVENS,
                cardSetNumber: 3,
                value: "mithlondSeaWatcher",
            },
            "northernTracker":
            {
                name: "Northern Tracker",
                cost: 4,
                willpower: 1,
                attack: 2,
                defense: 2,
                hitPoints: 3,
                traitKeys: [ Trait.DUNEDAIN, Trait.RANGER ],
                sphereKey: Sphere.SPIRIT,
                cardSetKey: CardSet.CORE,
                value: "northernTracker",
            },
            "quickbeam":
            {
                name: "Quickbeam",
                isUnique: true,
                cost: 2,
                willpower: 2,
                attack: 3,
                defense: 1,
                hitPoints: 3,
                traitKeys: [ Trait.ENT ],
                sphereKey: Sphere.LORE,
                cardSetKey: CardSet.THE_TREASON_OF_SARUMAN,
                cardSetNumber: 6,
                value: "quickbeam",
            },
            "radagast":
            {
                name: "Radagast",
                isUnique: true,
                cost: 5,
                willpower: 2,
                attack: 1,
                defense: 1,
                hitPoints: 3,
                traitKeys: [ Trait.ISTARI ],
                sphereKey: Sphere.NEUTRAL,
                cardSetKey: CardSet.SHADOWS_OF_MIRKWOOD,
                cardSubsetKey: CardSubset.SOM3_A_JOURNEY_TO_RHOSGOBEL,
                value: "radagast",
            },
            "ravenhillScout":
            {
                name: "Ravenhill Scout",
                cost: 3,
                willpower: 0,
                attack: 1,
                defense: 1,
                hitPoints: 3,
                traitKeys: [ Trait.DALE, Trait.SCOUT ],
                sphereKey: Sphere.LORE,
                cardSetKey: CardSet.DWARROWDELF,
                cardSubsetKey: CardSubset.D1_THE_REDHORN_GATE,
                value: "ravenhillScout",
            },
            "rivendellMinstrel":
            {
                name: "Rivendell Minstrel",
                cost: 3,
                willpower: 2,
                attack: 0,
                defense: 0,
                hitPoints: 1,
                traitKeys: [ Trait.NOLDOR ],
                sphereKey: Sphere.LORE,
                cardSetKey: CardSet.SHADOWS_OF_MIRKWOOD,
                cardSubsetKey: CardSubset.SOM1_THE_HUNT_FOR_GOLLUM,
                value: "rivendellMinstrel",
            },
            "sailorOfLune":
            {
                name: "Sailor of Lune",
                cost: 2,
                willpower: 1,
                attack: 1,
                defense: 0,
                hitPoints: 2,
                traitKeys: [ Trait.NOLDOR, Trait.SCOUT ],
                sphereKey: Sphere.SPIRIT,
                cardSetKey: CardSet.THE_GREY_HAVENS,
                cardSetNumber: 12,
                value: "sailorOfLune",
            },
            "silvanTracker":
            {
                name: "Silvan Tracker",
                cost: 3,
                willpower: 1,
                attack: 1,
                defense: 1,
                hitPoints: 3,
                traitKeys: [ Trait.SILVAN ],
                sphereKey: Sphere.LORE,
                cardSetKey: CardSet.SHADOWS_OF_MIRKWOOD,
                cardSubsetKey: CardSubset.SOM5_THE_DEAD_MARSHES,
                value: "silvanTracker",
            },
            "silverlodeArcher":
            {
                name: "Silverlode Archer",
                cost: 3,
                willpower: 1,
                attack: 2,
                defense: 0,
                hitPoints: 1,
                traitKeys: [ Trait.ARCHER, Trait.SILVAN ],
                sphereKey: Sphere.LEADERSHIP,
                cardSetKey: CardSet.CORE,
                value: "silverlodeArcher",
            },
            "snowbournScout":
            {
                name: "Snowbourn Scout",
                cost: 1,
                willpower: 0,
                attack: 0,
                defense: 1,
                hitPoints: 1,
                traitKeys: [ Trait.ROHAN, Trait.SCOUT ],
                sphereKey: Sphere.LEADERSHIP,
                cardSetKey: CardSet.CORE,
                value: "snowbournScout",
            },
            "sonOfArnor":
            {
                name: "Son of Arnor",
                cost: 3,
                willpower: 0,
                attack: 2,
                defense: 0,
                hitPoints: 2,
                traitKeys: [ Trait.DUNEDAIN ],
                sphereKey: Sphere.LEADERSHIP,
                cardSetKey: CardSet.CORE,
                value: "sonOfArnor",
            },
            "theRiddermarksFinest":
            {
                name: "The Riddermark's Finest",
                cost: 2,
                willpower: 1,
                attack: 1,
                defense: 0,
                hitPoints: 2,
                traitKeys: [ Trait.CREATURE, Trait.ROHAN ],
                sphereKey: Sphere.SPIRIT,
                cardSetKey: CardSet.SHADOWS_OF_MIRKWOOD,
                cardSubsetKey: CardSubset.SOM4_THE_HILLS_OF_EMYN_MUIL,
                value: "theRiddermarksFinest",
            },
            "trollshawScout":
            {
                name: "Trollshaw Scout",
                cost: 2,
                willpower: 0,
                attack: 2,
                defense: 1,
                hitPoints: 2,
                traitKeys: [ Trait.NOLDOR, Trait.SCOUT ],
                sphereKey: Sphere.TACTICS,
                cardSetKey: CardSet.DWARROWDELF,
                cardSubsetKey: CardSubset.D5_FOUNDATIONS_OF_STONE,
                value: "trollshawScout",
            },
            "vassalOfTheWindlord":
            {
                name: "Vassal of the Windlord",
                cost: 1,
                willpower: 0,
                attack: 3,
                defense: 0,
                hitPoints: 1,
                traitKeys: [ Trait.CREATURE, Trait.EAGLE ],
                sphereKey: Sphere.TACTICS,
                cardSetKey: CardSet.SHADOWS_OF_MIRKWOOD,
                cardSubsetKey: CardSubset.SOM5_THE_DEAD_MARSHES,
                value: "vassalOfTheWindlord",
            },
            "veteranAxehand":
            {
                name: "Veteran Axehand",
                cost: 2,
                willpower: 0,
                attack: 2,
                defense: 1,
                hitPoints: 2,
                traitKeys: [ Trait.DWARF, Trait.WARRIOR ],
                sphereKey: Sphere.TACTICS,
                cardSetKey: CardSet.CORE,
                value: "veteranAxehand",
            },
            "veteranOfNanduhirion":
            {
                name: "Veteran of Nanduhirion",
                cost: 4,
                willpower: 0,
                attack: 3,
                defense: 2,
                hitPoints: 3,
                traitKeys: [ Trait.DWARF, Trait.WARRIOR ],
                sphereKey: Sphere.TACTICS,
                cardSetKey: CardSet.KHAZAD_DUM,
                value: "veteranOfNanduhirion",
            },
            "wanderingTook":
            {
                name: "Wandering Took",
                cost: 2,
                willpower: 1,
                attack: 1,
                defense: 1,
                hitPoints: 2,
                traitKeys: [ Trait.HOBBIT ],
                sphereKey: Sphere.SPIRIT,
                cardSetKey: CardSet.CORE,
                value: "wanderingTook",
            },
            "wardenOfHealing":
            {
                name: "Warden of Healing",
                cost: 2,
                willpower: 1,
                attack: 0,
                defense: 1,
                hitPoints: 1,
                traitKeys: [ Trait.GONDOR, Trait.HEALER ],
                sphereKey: Sphere.LORE,
                cardSetKey: CardSet.DWARROWDELF,
                cardSubsetKey: CardSubset.D4_THE_LONG_DARK,
                value: "wardenOfHealing",
            },
            "wardenOfTheHavens":
            {
                name: "Warden of the Havens",
                cost: 2,
                willpower: 0,
                attack: 1,
                defense: 1,
                hitPoints: 3,
                traitKeys: [ Trait.NOLDOR, Trait.WARRIOR ],
                sphereKey: Sphere.LEADERSHIP,
                cardSetKey: CardSet.THE_GREY_HAVENS,
                cardSetNumber: 6,
                value: "wardenOfTheHavens",
            },
            "westfoldHorseBreaker":
            {
                name: "Westfold Horse-Breaker",
                cost: 2,
                willpower: 1,
                attack: 0,
                defense: 1,
                hitPoints: 1,
                traitKeys: [ Trait.ROHAN ],
                sphereKey: Sphere.LORE,
                cardSetKey: CardSet.SHADOWS_OF_MIRKWOOD,
                cardSubsetKey: CardSubset.SOM1_THE_HUNT_FOR_GOLLUM,
                value: "westfoldHorseBreaker",
            },
            "westRoadTraveller":
            {
                name: "West Road Traveller",
                cost: 2,
                willpower: 2,
                attack: 0,
                defense: 0,
                hitPoints: 1,
                traitKeys: [ Trait.ROHAN ],
                sphereKey: Sphere.SPIRIT,
                cardSetKey: CardSet.SHADOWS_OF_MIRKWOOD,
                cardSubsetKey: CardSubset.SOM6_RETURN_TO_MIRKWOOD,
                value: "westRoadTraveller",
            },
            "wingedGuardian":
            {
                name: "Winged Guardian",
                cost: 2,
                willpower: 0,
                attack: 0,
                defense: 4,
                hitPoints: 1,
                traitKeys: [ Trait.CREATURE, Trait.EAGLE ],
                sphereKey: Sphere.LORE,
                cardSetKey: CardSet.SHADOWS_OF_MIRKWOOD,
                cardSubsetKey: CardSubset.SOM1_THE_HUNT_FOR_GOLLUM,
                value: "wingedGuardian",
            },
            "zigilMiner":
            {
                name: "Zigil Miner",
                cost: 2,
                willpower: 1,
                attack: 1,
                defense: 1,
                hitPoints: 1,
                traitKeys: [ Trait.DWARF ],
                sphereKey: Sphere.SPIRIT,
                cardSetKey: CardSet.KHAZAD_DUM,
                value: "zigilMiner",
            },
        },

        values: function()
        {
            return Object.getOwnPropertyNames(AllyCard.properties);
        },
    };

    AllyCard.values().forEach(function(cardKey)
    {
        var card = AllyCard.properties[cardKey];
        card.cardSet = CardSet.properties[card.cardSetKey];
        if (card.cardSubsetKey)
        {
            card.cardSubset = CardSubset.properties[card.cardSubsetKey];
        }
        card.cardTypeKey = CardType.ALLY;
        card.cardType = CardType.properties[card.cardTypeKey];
        card.sphere = Sphere.properties[card.sphereKey];

        if (!card.image)
        {
            card.image = ImageNameCreator.create(card);
        }
    });

    if (Object.freeze)
    {
        Object.freeze(AllyCard);
    }

    return AllyCard;
});

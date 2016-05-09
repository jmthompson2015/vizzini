define([ "CardSet", "CardSubset", "CardType", "ImageNameCreator", "Sphere", "Trait" ], function(CardSet, CardSubset,
        CardType, ImageNameCreator, Sphere, Trait)
{
    "use strict";
    var AttachmentCard =
    {
        A_BURNING_BRAND: "aBurningBrand",
        ANCIENT_MATHOM: "ancientMathom",
        AROD: "arod",
        ASFALOTH: "asfaloth",
        BLACK_ARROW: "blackArrow",
        BLADE_OF_GONDOLIN: "bladeOfGondolin",
        BLOOD_OF_NUMENOR: "bloodOfNumenor",
        BOOTS_FROM_EREBOR: "bootsFromErebor",
        BORN_ALOFT: "bornAloft",
        BOW_OF_THE_GALADHRIM: "bowOfTheGaladhrim",
        CELEBRIANS_STONE: "celebriansStone",
        CITADEL_PLATE: "citadelPlate",
        CLOAK_OF_LORIEN: "cloakOfLorien",
        CRAM: "cram",
        DARK_KNOWLEDGE: "darkKnowledge",
        DEFENDER_OF_THE_WEST: "defenderOfTheWest",
        DUNEDAIN_CACHE: "dunedainCache",
        DUNEDAIN_MARK: "dunedainMark",
        DUNEDAIN_QUEST: "dunedainQuest",
        DUNEDAIN_SIGNAL: "dunedainSignal",
        DUNEDAIN_WARNING: "dunedainWarning",
        DWARROWDELF_AXE: "dwarrowdelfAxe",
        DWARVEN_AXE: "dwarvenAxe",
        ENT_DRAUGHT: "entDraught",
        EVER_MY_HEART_RISES: "everMyHeartRises",
        EXPERT_TREASURE_HUNTER: "expertTreasureHunter",
        EXPLORERS_ALMANAC: "explorersAlmanac",
        FAST_HITCH: "fastHitch",
        FOREST_SNARE: "forestSnare",
        GOOD_MEAL: "goodMeal",
        GRAPPLING_HOOK: "grapplingHook",
        GREAT_YEW_BOW: "greatYewBow",
        HARDY_LEADERSHIP: "hardyLeadership",
        HEALING_HERBS: "healingHerbs",
        HEIR_OF_MARDIL: "heirOfMardil",
        HERUGRIM: "herugrim",
        HORN_OF_GONDOR: "hornOfGondor",
        KEEPING_COUNT: "keepingCount",
        KEYS_OF_ORTHANC: "keysOfOrthanc",
        KING_UNDER_THE_MOUNTAIN: "kingUnderTheMountain",
        LIGHT_OF_VALINOR: "lightOfValinor",
        LOVE_OF_TALES: "loveOfTales",
        MARINERS_COMPASS: "marinersCompass",
        MIRROR_OF_GALADRIEL: "mirrorOfGaladriel",
        MIRUVOR: "miruvor",
        NARVIS_BELT: "narvisBelt",
        NARYA: "narya",
        NENYA: "nenya",
        NOR_AM_I_A_STRANGER: "norAmIAStranger",
        PATH_OF_NEED: "pathOfNeed",
        POISONED_STAKES: "poisonedStakes",
        POWER_IN_THE_EARTH: "powerInTheEarth",
        PROTECTOR_OF_LORIEN: "protectorOfLorien",
        RANGER_SPIKES: "rangerSpikes",
        RING_MAIL: "ringMail",
        ROHAN_WARHORSE: "rohanWarhorse",
        SELF_PRESERVATION: "selfPreservation",
        SHADOWFAX: "shadowfax",
        SILVER_LAMP: "silverLamp",
        SONG_OF_BATTLE: "songOfBattle",
        SONG_OF_KINGS: "songOfKings",
        SONG_OF_MOCKING: "songOfMocking",
        SONG_OF_TRAVEL: "songOfTravel",
        SONG_OF_WISDOM: "songOfWisdom",
        SPARE_HOOD_AND_CLOAK: "spareHoodAndCloak",
        SPEAR_OF_THE_CITADEL: "spearOfTheCitadel",
        STEWARD_OF_GONDOR: "stewardOfGondor",
        SUPPORT_OF_THE_EAGLES: "supportOfTheEagles",
        THE_FAVOR_OF_THE_LADY: "theFavorOfTheLady",
        THRORS_KEY: "throrsKey",
        THRORS_MAP: "throrsMap",
        TO_THE_SEA_TO_THE_SEA: "toTheSeaToTheSea",
        TOME_OF_ATANATAR: "tomeOfAtanatar",
        UNEXPECTED_COURAGE: "unexpectedCourage",
        VILYA: "vilya",
        WINGFOOT: "wingfoot",

        properties:
        {
            "aBurningBrand":
            {
                name: "A Burning Brand",
                cost: 2,
                traitKeys: [ Trait.ITEM ],
                sphereKey: Sphere.LORE,
                cardSetKey: CardSet.SHADOWS_OF_MIRKWOOD,
                cardSubsetKey: CardSubset.SOM2_CONFLICT_AT_THE_CARROCK,
                value: "aBurningBrand",
            },
            "ancientMathom":
            {
                name: "Ancient Mathom",
                cost: 1,
                traitKeys: [ Trait.MATHOM ],
                sphereKey: Sphere.SPIRIT,
                cardSetKey: CardSet.SHADOWS_OF_MIRKWOOD,
                cardSubsetKey: CardSubset.SOM3_A_JOURNEY_TO_RHOSGOBEL,
                value: "ancientMathom",
            },
            "arod":
            {
                name: "Arod",
                isUnique: true,
                cost: 1,
                traitKeys: [ Trait.MOUNT ],
                sphereKey: Sphere.TACTICS,
                cardSetKey: CardSet.THE_TREASON_OF_SARUMAN,
                cardSetNumber: 8,
                value: "arod",
            },
            "asfaloth":
            {
                name: "Asfaloth",
                isUnique: true,
                cost: 2,
                traitKeys: [ Trait.MOUNT ],
                sphereKey: Sphere.LORE,
                cardSetKey: CardSet.DWARROWDELF,
                cardSubsetKey: CardSubset.D5_FOUNDATIONS_OF_STONE,
                value: "asfaloth",
            },
            "blackArrow":
            {
                isUnique: true,
                name: "Black Arrow",
                cost: 0,
                traitKeys: [ Trait.ARTIFACT, Trait.ITEM ],
                sphereKey: Sphere.TACTICS,
                cardSetKey: CardSet.ON_THE_DOORSTEP,
                value: "blackArrow",
            },
            "bladeOfGondolin":
            {
                name: "Blade of Gondolin",
                cost: 1,
                traitKeys: [ Trait.ITEM, Trait.WEAPON ],
                sphereKey: Sphere.TACTICS,
                cardSetKey: CardSet.CORE,
                value: "bladeOfGondolin",
            },
            "bloodOfNumenor":
            {
                name: "Blood of Númenor",
                cost: 0,
                traitKeys: [ Trait.CONDITION ],
                sphereKey: Sphere.SPIRIT,
                cardSetKey: CardSet.HEIRS_OF_NUMENOR,
                value: "bloodOfNumenor",
            },
            "bootsFromErebor":
            {
                name: "Boots from Erebor",
                cost: 0,
                traitKeys: [ Trait.ITEM ],
                sphereKey: Sphere.NEUTRAL,
                cardSetKey: CardSet.KHAZAD_DUM,
                value: "bootsFromErebor",
            },
            "bornAloft":
            {
                name: "Born Aloft",
                cost: 0,
                traitKeys: [ Trait.CONDITION ],
                sphereKey: Sphere.TACTICS,
                cardSetKey: CardSet.SHADOWS_OF_MIRKWOOD,
                cardSubsetKey: CardSubset.SOM2_CONFLICT_AT_THE_CARROCK,
                value: "bornAloft",
            },
            "bowOfTheGaladhrim":
            {
                name: "Bow of the Galadhrim",
                cost: 1,
                traitKeys: [ Trait.ITEM, Trait.WEAPON ],
                sphereKey: Sphere.TACTICS,
                cardSetKey: CardSet.THE_RING_MAKER,
                cardSubsetKey: CardSubset.TRM4_THE_NIN_IN_EILPH,
                cardSetNumber: 88,
                value: "bowOfTheGaladhrim",
            },
            "celebriansStone":
            {
                name: "Celebrían's Stone",
                isUnique: true,
                cost: 2,
                traitKeys: [ Trait.ARTIFACT, Trait.ITEM ],
                sphereKey: Sphere.LEADERSHIP,
                cardSetKey: CardSet.CORE,
                value: "celebriansStone",
            },
            "citadelPlate":
            {
                name: "Citadel Plate",
                cost: 4,
                traitKeys: [ Trait.ITEM, Trait.ARMOR ],
                sphereKey: Sphere.TACTICS,
                cardSetKey: CardSet.CORE,
                value: "citadelPlate",
            },
            "cloakOfLorien":
            {
                name: "Cloak of Lórien",
                cost: 1,
                traitKeys: [ Trait.ITEM ],
                sphereKey: Sphere.LORE,
                cardSetKey: CardSet.THE_RING_MAKER,
                cardSubsetKey: CardSubset.TRM5_CELEBRIMBORS_SECRET,
                cardSetNumber: 120,
                value: "cloakOfLorien",
            },
            "cram":
            {
                name: "Cram",
                cost: 0,
                traitKeys: [ Trait.ITEM ],
                sphereKey: Sphere.LEADERSHIP,
                cardSetKey: CardSet.OVER_HILL_AND_UNDER_HILL,
                value: "cram",
            },
            "darkKnowledge":
            {
                name: "Dark Knowledge",
                cost: 1,
                traitKeys: [ Trait.CONDITION ],
                sphereKey: Sphere.LORE,
                cardSetKey: CardSet.CORE,
                value: "darkKnowledge",
            },
            "defenderOfTheWest":
            {
                name: "Defender of the West",
                isUnique: true,
                cost: 1,
                traitKeys: [ Trait.TITLE ],
                sphereKey: Sphere.NEUTRAL,
                cardSetKey: CardSet.THE_RING_MAKER,
                cardSubsetKey: CardSubset.TRM4_THE_NIN_IN_EILPH,
                cardSetNumber: 93,
                value: "defenderOfTheWest",
            },
            "dunedainCache":
            {
                name: "Dúnedain Cache",
                cost: 2,
                traitKeys: [ Trait.ITEM ],
                sphereKey: Sphere.LEADERSHIP,
                cardSetKey: CardSet.SHADOWS_OF_MIRKWOOD,
                cardSubsetKey: CardSubset.SOM5_THE_DEAD_MARSHES,
                value: "dunedainCache",
            },
            "dunedainMark":
            {
                name: "Dúnedain Mark",
                cost: 1,
                traitKeys: [ Trait.SIGNAL ],
                sphereKey: Sphere.LEADERSHIP,
                cardSetKey: CardSet.SHADOWS_OF_MIRKWOOD,
                cardSubsetKey: CardSubset.SOM1_THE_HUNT_FOR_GOLLUM,
                value: "dunedainMark",
            },
            "dunedainQuest":
            {
                name: "Dúnedain Quest",
                cost: 2,
                traitKeys: [ Trait.SIGNAL ],
                sphereKey: Sphere.LEADERSHIP,
                cardSetKey: CardSet.SHADOWS_OF_MIRKWOOD,
                cardSubsetKey: CardSubset.SOM3_A_JOURNEY_TO_RHOSGOBEL,
                value: "dunedainQuest",
            },
            "dunedainSignal":
            {
                name: "Dúnedain Signal",
                cost: 1,
                traitKeys: [ Trait.SIGNAL ],
                sphereKey: Sphere.LEADERSHIP,
                cardSetKey: CardSet.SHADOWS_OF_MIRKWOOD,
                cardSubsetKey: CardSubset.SOM6_RETURN_TO_MIRKWOOD,
                value: "dunedainSignal",
            },
            "dunedainWarning":
            {
                name: "Dúnedain Warning",
                cost: 1,
                traitKeys: [ Trait.SIGNAL ],
                sphereKey: Sphere.LEADERSHIP,
                cardSetKey: CardSet.SHADOWS_OF_MIRKWOOD,
                cardSubsetKey: CardSubset.SOM2_CONFLICT_AT_THE_CARROCK,
                value: "dunedainWarning",
            },
            "dwarrowdelfAxe":
            {
                name: "Dwarrowdelf Axe",
                cost: 1,
                traitKeys: [ Trait.ITEM, Trait.WEAPON ],
                sphereKey: Sphere.TACTICS,
                cardSetKey: CardSet.KHAZAD_DUM,
                value: "dwarrowdelfAxe",
            },
            "dwarvenAxe":
            {
                name: "Dwarven Axe",
                cost: 2,
                traitKeys: [ Trait.ITEM, Trait.WEAPON ],
                sphereKey: Sphere.TACTICS,
                cardSetKey: CardSet.CORE,
                value: "dwarvenAxe",
            },
            "entDraught":
            {
                name: "Ent Draught",
                cost: 1,
                traitKeys: [ Trait.ITEM, Trait.ENT ],
                sphereKey: Sphere.LORE,
                cardSetKey: CardSet.THE_TREASON_OF_SARUMAN,
                cardSetNumber: 9,
                value: "entDraught",
            },
            "everMyHeartRises":
            {
                name: "Ever My Heart Rises",
                cost: 0,
                traitKeys: [ Trait.CONDITION ],
                sphereKey: Sphere.SPIRIT,
                cardSetKey: CardSet.DWARROWDELF,
                cardSubsetKey: CardSubset.D4_THE_LONG_DARK,
                value: "everMyHeartRises",
            },
            "expertTreasureHunter":
            {
                name: "Expert Treasure-Hunter",
                cost: 0,
                traitKeys: [ Trait.SKILL ],
                sphereKey: Sphere.LORE,
                cardSetKey: CardSet.ON_THE_DOORSTEP,
                value: "expertTreasureHunter",
            },
            "explorersAlmanac":
            {
                name: "Explorer's Almanac",
                cost: 0,
                traitKeys: [ Trait.ITEM ],
                sphereKey: Sphere.LORE,
                cardSetKey: CardSet.THE_GREY_HAVENS,
                cardSetNumber: 11,
                value: "explorersAlmanac",
            },
            "fastHitch":
            {
                name: "Fast Hitch",
                cost: 1,
                traitKeys: [ Trait.SKILL ],
                sphereKey: Sphere.LORE,
                cardSetKey: CardSet.SHADOWS_OF_MIRKWOOD,
                cardSubsetKey: CardSubset.SOM5_THE_DEAD_MARSHES,
                value: "fastHitch",
            },
            "forestSnare":
            {
                name: "Forest Snare",
                cost: 3,
                traitKeys: [ Trait.ITEM, Trait.TRAP ],
                sphereKey: Sphere.LORE,
                cardSetKey: CardSet.CORE,
                value: "forestSnare",
            },
            "goodMeal":
            {
                name: "Good Meal",
                cost: 0,
                traitKeys: [],
                sphereKey: Sphere.NEUTRAL,
                cardSetKey: CardSet.DWARROWDELF,
                cardSubsetKey: CardSubset.D1_THE_REDHORN_GATE,
                value: "goodMeal",
            },
            "grapplingHook":
            {
                name: "Grappling Hook",
                cost: 1,
                traitKeys: [ Trait.ITEM ],
                sphereKey: Sphere.TACTICS,
                cardSetKey: CardSet.THE_GREY_HAVENS,
                cardSetNumber: 5,
                value: "grapplingHook",
            },
            "greatYewBow":
            {
                name: "Great Yew Bow",
                cost: 2,
                traitKeys: [ Trait.ITEM, Trait.WEAPON ],
                sphereKey: Sphere.TACTICS,
                cardSetKey: CardSet.ON_THE_DOORSTEP,
                value: "greatYewBow",
            },
            "hardyLeadership":
            {
                name: "Hardy Leadership",
                isUnique: true,
                cost: 2,
                traitKeys: [],
                sphereKey: Sphere.LEADERSHIP,
                cardSetKey: CardSet.DWARROWDELF,
                cardSubsetKey: CardSubset.D6_SHADOW_AND_FLAME,
                value: "hardyLeadership",
            },
            "healingHerbs":
            {
                name: "Healing Herbs",
                cost: 0,
                traitKeys: [],
                sphereKey: Sphere.LORE,
                cardSetKey: CardSet.DWARROWDELF,
                cardSubsetKey: CardSubset.D5_FOUNDATIONS_OF_STONE,
                value: "healingHerbs",
            },
            "heirOfMardil":
            {
                name: "Heir of Mardil",
                isUnique: true,
                cost: 1,
                traitKeys: [ Trait.TITLE ],
                sphereKey: Sphere.LEADERSHIP,
                cardSetKey: CardSet.THE_RING_MAKER,
                cardSubsetKey: CardSubset.TRM5_CELEBRIMBORS_SECRET,
                cardSetNumber: 113,
                value: "heirOfMardil",
            },
            "herugrim":
            {
                name: "Herugrim",
                isUnique: true,
                cost: 3,
                traitKeys: [ Trait.ITEM, Trait.WEAPON ],
                sphereKey: Sphere.SPIRIT,
                cardSetKey: CardSet.THE_TREASON_OF_SARUMAN,
                cardSetNumber: 10,
                value: "herugrim",
            },
            "hornOfGondor":
            {
                name: "Horn Of Gondor",
                cost: 1,
                traitKeys: [ Trait.ITEM, Trait.ARTIFACT ],
                sphereKey: Sphere.TACTICS,
                cardSetKey: CardSet.CORE,
                value: "hornOfGondor",
            },
            "keepingCount":
            {
                name: "Keeping Count",
                cost: 0,
                traitKeys: [],
                sphereKey: Sphere.TACTICS,
                cardSetKey: CardSet.DWARROWDELF,
                cardSubsetKey: CardSubset.D1_THE_REDHORN_GATE,
                value: "keepingCount",
            },
            "keysOfOrthanc":
            {
                name: "Keys of Orthanc",
                isUnique: true,
                cost: 1,
                traitKeys: [ Trait.ITEM ],
                sphereKey: Sphere.NEUTRAL,
                cardSetKey: CardSet.THE_VOICE_OF_ISENGARD,
                value: "keysOfOrthanc",
            },
            "kingUnderTheMountain":
            {
                name: "King Under the Mountain",
                isUnique: true,
                cost: 2,
                traitKeys: [ Trait.TITLE ],
                sphereKey: Sphere.LEADERSHIP,
                cardSetKey: CardSet.ON_THE_DOORSTEP,
                value: "kingUnderTheMountain",
            },
            "lightOfValinor":
            {
                name: "Light of Valinor",
                isUnique: true,
                cost: 1,
                traitKeys: [ Trait.CONDITION ],
                sphereKey: Sphere.SPIRIT,
                cardSetKey: CardSet.DWARROWDELF,
                cardSubsetKey: CardSubset.D5_FOUNDATIONS_OF_STONE,
                value: "lightOfValinor",
            },
            "loveOfTales":
            {
                name: "Love of Tales",
                cost: 0,
                traitKeys: [ Trait.CONDITION ],
                sphereKey: Sphere.LORE,
                cardSetKey: CardSet.DWARROWDELF,
                cardSubsetKey: CardSubset.D4_THE_LONG_DARK,
                value: "loveOfTales",
            },
            "marinersCompass":
            {
                name: "Mariner's Compass",
                cost: 1,
                traitKeys: [ Trait.ITEM ],
                sphereKey: Sphere.LEADERSHIP,
                cardSetKey: CardSet.THE_GREY_HAVENS,
                cardSetNumber: 8,
                value: "marinersCompass",
            },
            "mirrorOfGaladriel":
            {
                name: "Mirror of Galadriel",
                isUnique: true,
                cost: 1,
                traitKeys: [ Trait.ARTIFACT, Trait.ITEM ],
                sphereKey: Sphere.SPIRIT,
                cardSetKey: CardSet.THE_RING_MAKER,
                cardSubsetKey: CardSubset.TRM5_CELEBRIMBORS_SECRET,
                cardSetNumber: 118,
                value: "mirrorOfGaladriel",
            },
            "miruvor":
            {
                name: "Miruvor",
                cost: 1,
                traitKeys: [ Trait.ITEM ],
                sphereKey: Sphere.SPIRIT,
                cardSetKey: CardSet.DWARROWDELF,
                cardSubsetKey: CardSubset.D6_SHADOW_AND_FLAME,
                value: "miruvor",
            },
            "narvisBelt":
            {
                name: "Narvi's Belt",
                cost: 2,
                traitKeys: [ Trait.ITEM ],
                sphereKey: Sphere.LEADERSHIP,
                cardSetKey: CardSet.KHAZAD_DUM,
                value: "narvisBelt",
            },
            "narya":
            {
                name: "Narya",
                isUnique: true,
                cost: 2,
                traitKeys: [ Trait.RING, Trait.ARTIFACT ],
                sphereKey: Sphere.NEUTRAL,
                cardSetKey: CardSet.THE_GREY_HAVENS,
                cardSetNumber: 15,
                value: "narya",
            },
            "nenya":
            {
                name: "Nenya",
                isUnique: true,
                cost: 1,
                traitKeys: [ Trait.ARTIFACT, Trait.RING ],
                sphereKey: Sphere.NEUTRAL,
                cardSetKey: CardSet.THE_RING_MAKER,
                cardSubsetKey: CardSubset.TRM5_CELEBRIMBORS_SECRET,
                cardSetNumber: 121,
                value: "nenya",
            },
            "norAmIAStranger":
            {
                name: "Nor am I a Stranger",
                cost: 1,
                traitKeys: [ Trait.TITLE ],
                sphereKey: Sphere.SPIRIT,
                cardSetKey: CardSet.SHADOWS_OF_MIRKWOOD,
                cardSubsetKey: CardSubset.SOM2_CONFLICT_AT_THE_CARROCK,
                value: "norAmIAStranger",
            },
            "pathOfNeed":
            {
                name: "Path of Need",
                cost: 4,
                traitKeys: [ Trait.CONDITION ],
                sphereKey: Sphere.LEADERSHIP,
                cardSetKey: CardSet.DWARROWDELF,
                cardSubsetKey: CardSubset.D5_FOUNDATIONS_OF_STONE,
                value: "pathOfNeed",
            },
            "poisonedStakes":
            {
                name: "Poisoned Stakes",
                cost: 2,
                traitKeys: [ Trait.TRAP ],
                sphereKey: Sphere.LORE,
                cardSetKey: CardSet.AGAINST_THE_SHADOW,
                cardSubsetKey: CardSubset.ATS5_THE_BLOOD_OF_GONDOR,
                value: "poisonedStakes",
            },
            "powerInTheEarth":
            {
                name: "Power in the Earth",
                cost: 1,
                traitKeys: [ Trait.CONDITION ],
                sphereKey: Sphere.SPIRIT,
                cardSetKey: CardSet.CORE,
                value: "powerInTheEarth",
            },
            "protectorOfLorien":
            {
                name: "Protector of Lórien",
                cost: 1,
                traitKeys: [ Trait.TITLE ],
                sphereKey: Sphere.LORE,
                cardSetKey: CardSet.CORE,
                value: "protectorOfLorien",
            },
            "rangerSpikes":
            {
                name: "Ranger Spikes",
                cost: 2,
                traitKeys: [ Trait.TRAP ],
                sphereKey: Sphere.LORE,
                cardSetKey: CardSet.HEIRS_OF_NUMENOR,
                value: "rangerSpikes",
            },
            "ringMail":
            {
                name: "Ring Mail",
                cost: 2,
                traitKeys: [ Trait.ITEM, Trait.ARMOR ],
                sphereKey: Sphere.TACTICS,
                cardSetKey: CardSet.DWARROWDELF,
                cardSubsetKey: CardSubset.D4_THE_LONG_DARK,
                value: "ringMail",
            },
            "rohanWarhorse":
            {
                name: "Rohan Warhorse",
                cost: 1,
                traitKeys: [ Trait.MOUNT ],
                sphereKey: Sphere.TACTICS,
                cardSetKey: CardSet.THE_VOICE_OF_ISENGARD,
                value: "rohanWarhorse",
            },
            "selfPreservation":
            {
                name: "Self Preservation",
                cost: 3,
                traitKeys: [ Trait.SKILL ],
                sphereKey: Sphere.LORE,
                cardSetKey: CardSet.CORE,
                value: "selfPreservation",
            },
            "shadowfax":
            {
                name: "Shadowfax",
                isUnique: true,
                cost: 3,
                traitKeys: [ Trait.MOUNT, Trait.MEARAS ],
                sphereKey: Sphere.NEUTRAL,
                cardSetKey: CardSet.THE_TREASON_OF_SARUMAN,
                cardSetNumber: 14,
                value: "shadowfax",
            },
            "silverLamp":
            {
                name: "Silver Lamp",
                cost: 2,
                traitKeys: [ Trait.ITEM ],
                sphereKey: Sphere.SPIRIT,
                cardSetKey: CardSet.THE_VOICE_OF_ISENGARD,
                value: "silverLamp",
            },
            "songOfBattle":
            {
                name: "Song of Battle",
                cost: 1,
                traitKeys: [ Trait.SONG ],
                sphereKey: Sphere.NEUTRAL,
                cardSetKey: CardSet.SHADOWS_OF_MIRKWOOD,
                cardSubsetKey: CardSubset.SOM5_THE_DEAD_MARSHES,
                value: "songOfBattle",
            },
            "songOfKings":
            {
                name: "Song of Kings",
                cost: 1,
                traitKeys: [ Trait.SONG ],
                sphereKey: Sphere.NEUTRAL,
                cardSetKey: CardSet.SHADOWS_OF_MIRKWOOD,
                cardSubsetKey: CardSubset.SOM1_THE_HUNT_FOR_GOLLUM,
                value: "songOfKings",
            },
            "songOfMocking":
            {
                name: "Song of Mocking",
                cost: 1,
                traitKeys: [ Trait.SONG ],
                sphereKey: Sphere.TACTICS,
                cardSetKey: CardSet.SHADOWS_OF_MIRKWOOD,
                cardSubsetKey: CardSubset.SOM5_THE_DEAD_MARSHES,
                value: "songOfMocking",
            },
            "songOfTravel":
            {
                name: "Song of Travel",
                cost: 1,
                traitKeys: [ Trait.SONG ],
                sphereKey: Sphere.NEUTRAL,
                cardSetKey: CardSet.SHADOWS_OF_MIRKWOOD,
                cardSubsetKey: CardSubset.SOM4_THE_HILLS_OF_EMYN_MUIL,
                value: "songOfTravel",
            },
            "songOfWisdom":
            {
                name: "Song of Wisdom",
                cost: 1,
                traitKeys: [ Trait.SONG ],
                sphereKey: Sphere.NEUTRAL,
                cardSetKey: CardSet.SHADOWS_OF_MIRKWOOD,
                cardSubsetKey: CardSubset.SOM2_CONFLICT_AT_THE_CARROCK,
                value: "songOfWisdom",
            },
            "spareHoodAndCloak":
            {
                name: "Spare Hood and Cloak",
                cost: 0,
                traitKeys: [ Trait.ITEM ],
                sphereKey: Sphere.SPIRIT,
                cardSetKey: CardSet.OVER_HILL_AND_UNDER_HILL,
                value: "spareHoodAndCloak",
            },
            "spearOfTheCitadel":
            {
                name: "Spear of the Citadel",
                cost: 2,
                traitKeys: [ Trait.ITEM, Trait.WEAPON ],
                sphereKey: Sphere.TACTICS,
                cardSetKey: CardSet.HEIRS_OF_NUMENOR,
                value: "spearOfTheCitadel",
            },
            "stewardOfGondor":
            {
                name: "Steward of Gondor",
                isUnique: true,
                cost: 2,
                traitKeys: [ Trait.GONDOR, Trait.TITLE ],
                sphereKey: Sphere.LEADERSHIP,
                cardSetKey: CardSet.CORE,
                value: "stewardOfGondor",
            },
            "supportOfTheEagles":
            {
                name: "Support of the Eagles",
                cost: 3,
                traitKeys: [ Trait.BOON ],
                sphereKey: Sphere.TACTICS,
                cardSetKey: CardSet.SHADOWS_OF_MIRKWOOD,
                cardSubsetKey: CardSubset.SOM6_RETURN_TO_MIRKWOOD,
                value: "supportOfTheEagles",
            },
            "theFavorOfTheLady":
            {
                name: "The Favor of the Lady",
                cost: 2,
                traitKeys: [ Trait.CONDITION ],
                sphereKey: Sphere.SPIRIT,
                cardSetKey: CardSet.CORE,
                value: "theFavorOfTheLady",
            },
            "throrsKey":
            {
                name: "Thrór's Key",
                isUnique: true,
                cost: 1,
                traitKeys: [ Trait.ARTIFACT, Trait.ITEM ],
                sphereKey: Sphere.SPIRIT,
                cardSetKey: CardSet.ON_THE_DOORSTEP,
                value: "throrsKey",
            },
            "throrsMap":
            {
                name: "Thrór's Map",
                cost: 1,
                traitKeys: [ Trait.ARTIFACT, Trait.ITEM ],
                sphereKey: Sphere.LORE,
                cardSetKey: CardSet.OVER_HILL_AND_UNDER_HILL,
                value: "throrsMap",
            },
            "toTheSeaToTheSea":
            {
                name: "To the Sea, to the Sea!",
                isUnique: true,
                cost: 1,
                traitKeys: [ Trait.SONG ],
                sphereKey: Sphere.SPIRIT,
                cardSetKey: CardSet.THE_GREY_HAVENS,
                cardSetNumber: 14,
                value: "toTheSeaToTheSea",
            },
            "tomeOfAtanatar":
            {
                name: "Tome of Atanatar",
                isUnique: true,
                cost: 4,
                traitKeys: [ Trait.RECORD ],
                sphereKey: Sphere.LEADERSHIP,
                cardSetKey: CardSet.AGAINST_THE_SHADOW,
                cardSubsetKey: CardSubset.ATS5_THE_BLOOD_OF_GONDOR,
                value: "tomeOfAtanatar",
            },
            "unexpectedCourage":
            {
                name: "Unexpected Courage",
                cost: 2,
                traitKeys: [ Trait.CONDITION ],
                sphereKey: Sphere.SPIRIT,
                cardSetKey: CardSet.CORE,
                value: "unexpectedCourage",
            },
            "vilya":
            {
                name: "Vilya",
                cost: 2,
                traitKeys: [ Trait.RING, Trait.ARTIFACT ],
                sphereKey: Sphere.NEUTRAL,
                cardSetKey: CardSet.DWARROWDELF,
                cardSubsetKey: CardSubset.D6_SHADOW_AND_FLAME,
                value: "vilya",
            },
            "wingfoot":
            {
                name: "Wingfoot",
                isUnique: true,
                cost: 1,
                traitKeys: [ Trait.TITLE ],
                sphereKey: Sphere.LORE,
                cardSetKey: CardSet.THE_RING_MAKER,
                cardSubsetKey: CardSubset.TRM4_THE_NIN_IN_EILPH,
                cardSetNumber: 92,
                value: "wingfoot",
            },
        },

        values: function()
        {
            return Object.getOwnPropertyNames(AttachmentCard.properties);
        },
    };

    AttachmentCard.values().forEach(function(cardKey)
    {
        var card = AttachmentCard.properties[cardKey];
        card.cardSet = CardSet.properties[card.cardSetKey];
        if (card.cardSubsetKey)
        {
            card.cardSubset = CardSubset.properties[card.cardSubsetKey];
        }
        card.cardTypeKey = CardType.ATTACHMENT;
        card.cardType = CardType.properties[card.cardTypeKey];
        card.sphere = Sphere.properties[card.sphereKey];

        if (!card.image)
        {
            card.image = ImageNameCreator.create(card);
        }
    });

    if (Object.freeze)
    {
        Object.freeze(AttachmentCard);
    }

    return AttachmentCard;
});

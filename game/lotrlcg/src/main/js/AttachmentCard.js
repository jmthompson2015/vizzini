define([ "CardSet", "CardSubset", "CardType", "ImageNameCreator", "Sphere", "Trait" ], function(CardSet, CardSubset,
        CardType, ImageNameCreator, Sphere, Trait)
{
    "use strict";
    var AttachmentCard =
    {
        A_BURNING_BRAND: "aBurningBrand",
        ANCIENT_MATHOM: "ancientMathom",
        AROD: "arod",
        BLADE_OF_GONDOLIN: "bladeOfGondolin",
        BOOTS_FROM_EREBOR: "bootsFromErebor",
        BORN_ALOFT: "bornAloft",
        CELEBRIANS_STONE: "celebriansStone",
        CITADEL_PLATE: "citadelPlate",
        CRAM: "cram",
        DARK_KNOWLEDGE: "darkKnowledge",
        DUNEDAIN_CACHE: "dunedainCache",
        DUNEDAIN_MARK: "dunedainMark",
        DUNEDAIN_QUEST: "dunedainQuest",
        DUNEDAIN_SIGNAL: "dunedainSignal",
        DUNEDAIN_WARNING: "dunedainWarning",
        DWARROWDELF_AXE: "dwarrowdelfAxe",
        DWARVEN_AXE: "dwarvenAxe",
        ENT_DRAUGHT: "entDraught",
        EVER_MY_HEART_RISES: "everMyHeartRises",
        EXPLORERS_ALMANAC: "explorersAlmanac",
        FAST_HITCH: "fastHitch",
        FOREST_SNARE: "forestSnare",
        GRAPPLING_HOOK: "grapplingHook",
        HARDY_LEADERSHIP: "hardyLeadership",
        HERUGRIM: "herugrim",
        HORN_OF_GONDOR: "hornOfGondor",
        LOVE_OF_TALES: "loveOfTales",
        MARINERS_COMPASS: "marinersCompass",
        MIRUVOR: "miruvor",
        NARVIS_BELT: "narvisBelt",
        NARYA: "narya",
        NOR_AM_I_A_STRANGER: "norAmIAStranger",
        POWER_IN_THE_EARTH: "powerInTheEarth",
        PROTECTOR_OF_LORIEN: "protectorOfLorien",
        RING_MAIL: "ringMail",
        SELF_PRESERVATION: "selfPreservation",
        SHADOWFAX: "shadowfax",
        SONG_OF_BATTLE: "songOfBattle",
        SONG_OF_KINGS: "songOfKings",
        SONG_OF_MOCKING: "songOfMocking",
        SONG_OF_TRAVEL: "songOfTravel",
        SONG_OF_WISDOM: "songOfWisdom",
        SPARE_HOOD_AND_CLOAK: "spareHoodAndCloak",
        STEWARD_OF_GONDOR: "stewardOfGondor",
        SUPPORT_OF_THE_EAGLES: "supportOfTheEagles",
        THE_FAVOR_OF_THE_LADY: "theFavorOfTheLady",
        THRORS_MAP: "throrsMap",
        TO_THE_SEA_TO_THE_SEA: "toTheSeaToTheSea",
        UNEXPECTED_COURAGE: "unexpectedCourage",
        VILYA: "vilya",

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
                value: "arod",
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
            "explorersAlmanac":
            {
                name: "Explorer's Almanac",
                cost: 0,
                traitKeys: [ Trait.ITEM ],
                sphereKey: Sphere.LORE,
                cardSetKey: CardSet.THE_GREY_HAVENS,
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
            "grapplingHook":
            {
                name: "Grappling Hook",
                cost: 1,
                traitKeys: [ Trait.ITEM ],
                sphereKey: Sphere.TACTICS,
                cardSetKey: CardSet.THE_GREY_HAVENS,
                value: "grapplingHook",
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
            "herugrim":
            {
                name: "Herugrim",
                isUnique: true,
                cost: 3,
                traitKeys: [ Trait.ITEM, Trait.WEAPON ],
                sphereKey: Sphere.SPIRIT,
                cardSetKey: CardSet.THE_TREASON_OF_SARUMAN,
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
                value: "marinersCompass",
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
                value: "narya",
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
                value: "shadowfax",
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
                value: "toTheSeaToTheSea",
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

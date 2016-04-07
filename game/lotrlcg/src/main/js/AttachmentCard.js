define([ "CardSet", "CardType", "Sphere", "Trait" ], function(CardSet, CardType, Sphere, Trait)
{
    "use strict";
    var AttachmentCard =
    {
        AROD: "arod",
        BLADE_OF_GONDOLIN: "bladeOfGondolin",
        BOOTS_FROM_EREBOR: "bootsFromErebor",
        CELEBRIANS_STONE: "celebriansStone",
        CITADEL_PLATE: "citadelPlate",
        CRAM: "cram",
        DARK_KNOWLEDGE: "darkKnowledge",
        DUNEDAIN_MARK: "dunedainMark",
        DWARROWDELF_AXE: "dwarrowdelfAxe",
        DWARVEN_AXE: "dwarvenAxe",
        ENT_DRAUGHT: "entDraught",
        EXPLORERS_ALMANAC: "explorersAlmanac",
        FOREST_SNARE: "forestSnare",
        GRAPPLING_HOOK: "grapplingHook",
        HERUGRIM: "herugrim",
        HORN_OF_GONDOR: "hornOfGondor",
        MARINERS_COMPASS: "marinersCompass",
        NARVIS_BELT: "narvisBelt",
        NARYA: "narya",
        POWER_IN_THE_EARTH: "powerInTheEarth",
        PROTECTOR_OF_LORIEN: "protectorOfLorien",
        SELF_PRESERVATION: "selfPreservation",
        SHADOWFAX: "shadowfax",
        SONG_OF_KINGS: "songOfKings",
        SPARE_HOOD_AND_CLOAK: "spareHoodAndCloak",
        STEWARD_OF_GONDOR: "stewardOfGondor",
        THE_FAVOR_OF_THE_LADY: "theFavorOfTheLady",
        THRORS_MAP: "throrsMap",
        TO_THE_SEA_TO_THE_SEA: "toTheSeaToTheSea",
        UNEXPECTED_COURAGE: "unexpectedCourage",

        properties:
        {
            "arod":
            {
                name: "Arod",
                isUnique: true,
                cost: 1,
                traits: [ Trait.MOUNT ],
                sphere: Sphere.TACTICS,
                set: CardSet.THE_TREASON_OF_SARUMAN,
                value: "arod",
            },
            "bladeOfGondolin":
            {
                name: "Blade of Gondolin",
                cost: 1,
                traits: [ Trait.ITEM, Trait.WEAPON ],
                sphere: Sphere.TACTICS,
                set: CardSet.CORE,
                value: "bladeOfGondolin",
            },
            "bootsFromErebor":
            {
                name: "Boots from Erebor",
                cost: 0,
                traits: [ Trait.ITEM ],
                sphere: Sphere.NEUTRAL,
                set: CardSet.KHAZAD_DUM,
                value: "bootsFromErebor",
            },
            "celebriansStone":
            {
                name: "Celebrían's Stone",
                isUnique: true,
                cost: 2,
                traits: [ Trait.ARTIFACT, Trait.ITEM ],
                sphere: Sphere.LEADERSHIP,
                set: CardSet.CORE,
                value: "celebriansStone",
            },
            "citadelPlate":
            {
                name: "Citadel Plate",
                cost: 4,
                traits: [ Trait.ITEM, Trait.ARMOR ],
                sphere: Sphere.TACTICS,
                set: CardSet.CORE,
                value: "citadelPlate",
            },
            "cram":
            {
                name: "Cram",
                cost: 0,
                traits: [ Trait.ITEM ],
                sphere: Sphere.LEADERSHIP,
                set: CardSet.OVER_HILL_AND_UNDER_HILL,
                value: "cram",
            },
            "darkKnowledge":
            {
                name: "Dark Knowledge",
                cost: 1,
                traits: [ Trait.CONDITION ],
                sphere: Sphere.LORE,
                set: CardSet.CORE,
                value: "darkKnowledge",
            },
            "dunedainMark":
            {
                name: "Dúnedain Mark",
                cost: 1,
                traits: [ Trait.SIGNAL ],
                sphere: Sphere.LEADERSHIP,
                set: CardSet.SOM1_THE_HUNT_FOR_GOLLUM,
                value: "dunedainMark",
            },
            "dwarrowdelfAxe":
            {
                name: "Dwarrowdelf Axe",
                cost: 1,
                traits: [ Trait.ITEM, Trait.WEAPON ],
                sphere: Sphere.TACTICS,
                set: CardSet.KHAZAD_DUM,
                value: "dwarrowdelfAxe",
            },
            "dwarvenAxe":
            {
                name: "Dwarven Axe",
                cost: 2,
                traits: [ Trait.ITEM, Trait.WEAPON ],
                sphere: Sphere.TACTICS,
                set: CardSet.CORE,
                value: "dwarvenAxe",
            },
            "entDraught":
            {
                name: "Ent Draught",
                cost: 1,
                traits: [ Trait.ITEM, Trait.ENT ],
                sphere: Sphere.LORE,
                set: CardSet.THE_TREASON_OF_SARUMAN,
                value: "entDraught",
            },
            "explorersAlmanac":
            {
                name: "Explorer's Almanac",
                cost: 0,
                traits: [ Trait.ITEM ],
                sphere: Sphere.LORE,
                set: CardSet.THE_GREY_HAVENS,
                value: "explorersAlmanac",
            },
            "forestSnare":
            {
                name: "Forest Snare",
                cost: 3,
                traits: [ Trait.ITEM, Trait.TRAP ],
                sphere: Sphere.LORE,
                set: CardSet.CORE,
                value: "forestSnare",
            },
            "grapplingHook":
            {
                name: "Grappling Hook",
                cost: 1,
                traits: [ Trait.ITEM ],
                sphere: Sphere.TACTICS,
                set: CardSet.THE_GREY_HAVENS,
                value: "grapplingHook",
            },
            "herugrim":
            {
                name: "Herugrim",
                isUnique: true,
                cost: 3,
                traits: [ Trait.ITEM, Trait.WEAPON ],
                sphere: Sphere.SPIRIT,
                set: CardSet.THE_TREASON_OF_SARUMAN,
                value: "herugrim",
            },
            "hornOfGondor":
            {
                name: "Horn Of Gondor",
                cost: 1,
                traits: [ Trait.ITEM, Trait.ARTIFACT ],
                sphere: Sphere.TACTICS,
                set: CardSet.CORE,
                value: "hornOfGondor",
            },
            "marinersCompass":
            {
                name: "Mariner's Compass",
                cost: 1,
                traits: [ Trait.ITEM ],
                sphere: Sphere.LEADERSHIP,
                set: CardSet.THE_GREY_HAVENS,
                value: "marinersCompass",
            },
            "narvisBelt":
            {
                name: "Narvi's Belt",
                cost: 2,
                traits: [ Trait.ITEM ],
                sphere: Sphere.LEADERSHIP,
                set: CardSet.KHAZAD_DUM,
                value: "narvisBelt",
            },
            "narya":
            {
                name: "Narya",
                isUnique: true,
                cost: 2,
                traits: [ Trait.RING, Trait.ARTIFACT ],
                sphere: Sphere.NEUTRAL,
                set: CardSet.THE_GREY_HAVENS,
                value: "narya",
            },
            "powerInTheEarth":
            {
                name: "Power in the Earth",
                cost: 1,
                traits: [ Trait.CONDITION ],
                sphere: Sphere.SPIRIT,
                set: CardSet.CORE,
                value: "powerInTheEarth",
            },
            "protectorOfLorien":
            {
                name: "Protector of Lórien",
                cost: 1,
                traits: [ Trait.TITLE ],
                sphere: Sphere.LORE,
                set: CardSet.CORE,
                value: "protectorOfLorien",
            },
            "selfPreservation":
            {
                name: "Self Preservation",
                cost: 3,
                traits: [ Trait.SKILL ],
                sphere: Sphere.LORE,
                set: CardSet.CORE,
                value: "selfPreservation",
            },
            "shadowfax":
            {
                name: "Shadowfax",
                isUnique: true,
                cost: 3,
                traits: [ Trait.MOUNT, Trait.MEARAS ],
                sphere: Sphere.NEUTRAL,
                set: CardSet.THE_TREASON_OF_SARUMAN,
                value: "shadowfax",
            },
            "songOfKings":
            {
                name: "Song of Kings",
                cost: 1,
                traits: [ Trait.SONG ],
                sphere: Sphere.NEUTRAL,
                set: CardSet.SOM1_THE_HUNT_FOR_GOLLUM,
                value: "songOfKings",
            },
            "spareHoodAndCloak":
            {
                name: "Spare Hood and Cloak",
                cost: 0,
                traits: [ Trait.ITEM ],
                sphere: Sphere.SPIRIT,
                set: CardSet.OVER_HILL_AND_UNDER_HILL,
                value: "spareHoodAndCloak",
            },
            "stewardOfGondor":
            {
                name: "Steward of Gondor",
                isUnique: true,
                cost: 2,
                traits: [ Trait.GONDOR, Trait.TITLE ],
                sphere: Sphere.LEADERSHIP,
                set: CardSet.CORE,
                value: "stewardOfGondor",
            },
            "theFavorOfTheLady":
            {
                name: "The Favor of the Lady",
                cost: 2,
                traits: [ Trait.CONDITION ],
                sphere: Sphere.SPIRIT,
                set: CardSet.CORE,
                value: "theFavorOfTheLady",
            },
            "throrsMap":
            {
                name: "Thrór's Map",
                cost: 1,
                traits: [ Trait.ARTIFACT, Trait.ITEM ],
                sphere: Sphere.LORE,
                set: CardSet.OVER_HILL_AND_UNDER_HILL,
                value: "throrsMap",
            },
            "toTheSeaToTheSea":
            {
                name: "To the Sea, to the Sea!",
                isUnique: true,
                cost: 1,
                traits: [ Trait.SONG ],
                sphere: Sphere.SPIRIT,
                set: CardSet.THE_GREY_HAVENS,
                value: "toTheSeaToTheSea",
            },
            "unexpectedCourage":
            {
                name: "Unexpected Courage",
                cost: 2,
                traits: [ Trait.CONDITION ],
                sphere: Sphere.SPIRIT,
                set: CardSet.CORE,
                value: "unexpectedCourage",
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
        card.cardType = CardType.ATTACHMENT;
    });

    if (Object.freeze)
    {
        Object.freeze(AttachmentCard);
    }

    return AttachmentCard;
});

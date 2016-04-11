define([ "CardSet", "CardType", "ImageNameCreator", "Sphere", "Trait" ], function(CardSet, CardType, ImageNameCreator,
        Sphere, Trait)
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
            "dunedainMark":
            {
                name: "Dúnedain Mark",
                cost: 1,
                traitKeys: [ Trait.SIGNAL ],
                sphereKey: Sphere.LEADERSHIP,
                cardSetKey: CardSet.SOM1_THE_HUNT_FOR_GOLLUM,
                value: "dunedainMark",
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
            "explorersAlmanac":
            {
                name: "Explorer's Almanac",
                cost: 0,
                traitKeys: [ Trait.ITEM ],
                sphereKey: Sphere.LORE,
                cardSetKey: CardSet.THE_GREY_HAVENS,
                value: "explorersAlmanac",
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
            "marinersCompass":
            {
                name: "Mariner's Compass",
                cost: 1,
                traitKeys: [ Trait.ITEM ],
                sphereKey: Sphere.LEADERSHIP,
                cardSetKey: CardSet.THE_GREY_HAVENS,
                value: "marinersCompass",
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
            "songOfKings":
            {
                name: "Song of Kings",
                cost: 1,
                traitKeys: [ Trait.SONG ],
                sphereKey: Sphere.NEUTRAL,
                cardSetKey: CardSet.SOM1_THE_HUNT_FOR_GOLLUM,
                value: "songOfKings",
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
        card.cardType = CardType.ATTACHMENT;
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

define([ "CardSet", "CardType", "ImageNameCreator", "Sphere", "Trait" ], function(CardSet, CardType, ImageNameCreator,
        Sphere, Trait)
{
    "use strict";
    var HeroCard =
    {
        ARAGORN_FELLOWSHIP: "aragornFellowship",
        ARAGORN_LEADERSHIP: "aragornLeadership",
        BEORN: "beorn",
        BERAVOR: "beravor",
        BIFUR: "bifur",
        BILBO_BAGGINS_BAGGINS: "bilboBagginsBaggins",
        BILBO_BAGGINS_LORE: "bilboBagginsLore",
        CIRDAN_THE_SHIPWRIGHT: "cirdanTheShipwright",
        DENETHOR: "denethor",
        DWALIN: "dwalin",
        DUNHERE: "dunhere",
        ELEANOR: "eleanor",
        EOWYN: "eowyn",
        GALDOR_OF_THE_HAVENS: "galdorOfTheHavens",
        GIMLI: "gimli",
        GLOIN: "gloin",
        GLORFINDEL: "glorfindel",
        LEGOLAS: "legolas",
        NORI: "nori",
        ORI: "ori",
        THALIN: "thalin",
        THEODEN: "theoden",
        THEODRED: "theodred",
        THORIN_OAKENSHIELD: "thorinOakenshield",
        TREEBEARD: "treebeard",

        properties:
        {
            "aragornFellowship":
            {
                name: "Aragorn",
                threatCost: 0,
                willpower: 2,
                attack: 3,
                defense: 2,
                hitPoints: 5,
                traitKeys: [ Trait.DUNEDAIN, Trait.NOBLE, Trait.RANGER ],
                sphereKey: Sphere.FELLOWSHIP,
                cardSetKey: CardSet.THE_TREASON_OF_SARUMAN,
                cardSetNumber: 1,
                value: "aragornFellowship",
            },
            "aragornLeadership":
            {
                name: "Aragorn",
                threatCost: 12,
                willpower: 2,
                attack: 3,
                defense: 2,
                hitPoints: 5,
                traitKeys: [ Trait.DUNEDAIN, Trait.NOBLE, Trait.RANGER ],
                sphereKey: Sphere.LEADERSHIP,
                cardSetKey: CardSet.CORE,
                cardSetNumber: 1,
                value: "aragornLeadership",
            },
            "beorn":
            {
                name: "Beorn",
                threatCost: 12,
                willpower: 0,
                attack: 5,
                defense: 1,
                hitPoints: 10,
                traitKeys: [ Trait.BEORNING, Trait.WARRIOR ],
                sphereKey: Sphere.TACTICS,
                cardSetKey: CardSet.OVER_HILL_AND_UNDER_HILL,
                cardSetNumber: 5,
                value: "beorn",
            },
            "beravor":
            {
                name: "Beravor",
                threatCost: 10,
                willpower: 2,
                attack: 2,
                defense: 2,
                hitPoints: 4,
                traitKeys: [ Trait.DUNEDAIN, Trait.RANGER ],
                sphereKey: Sphere.LORE,
                cardSetKey: CardSet.CORE,
                cardSetNumber: 12,
                value: "beravor",
            },
            "bifur":
            {
                name: "Bifur",
                threatCost: 7,
                willpower: 2,
                attack: 1,
                defense: 2,
                hitPoints: 3,
                traitKeys: [ Trait.DWARF ],
                sphereKey: Sphere.LORE,
                cardSetKey: CardSet.KHAZAD_DUM,
                cardSetNumber: 2,
                value: "bifur",
            },
            "bilboBagginsBaggins":
            {
                name: "Bilbo Baggins",
                threatCost: 0,
                willpower: 1,
                attack: 1,
                defense: 1,
                hitPoints: 3,
                traitKeys: [ Trait.HOBBIT ],
                sphereKey: Sphere.BAGGINS,
                cardSetKey: CardSet.OVER_HILL_AND_UNDER_HILL,
                cardSetNumber: 1,
                value: "bilboBagginsBaggins",
            },
            "bilboBagginsLore":
            {
                name: "Bilbo Baggins",
                threatCost: 9,
                willpower: 1,
                attack: 1,
                defense: 2,
                hitPoints: 2,
                traitKeys: [ Trait.HOBBIT ],
                sphereKey: Sphere.LORE,
                cardSetKey: CardSet.SOM1_THE_HUNT_FOR_GOLLUM,
                cardSetNumber: 1,
                value: "bilboBagginsLore",
            },
            "cirdanTheShipwright":
            {
                name: "Círdan the Shipwright",
                threatCost: 12,
                willpower: 4,
                attack: 2,
                defense: 2,
                hitPoints: 4,
                traitKeys: [ Trait.NOLDOR, Trait.NOBLE ],
                sphereKey: Sphere.SPIRIT,
                cardSetKey: CardSet.THE_GREY_HAVENS,
                cardSetNumber: 1,
                image: "http://www.cardgamedb.com/forums/uploads/lotr/ffg_MEC47_1.jpg",
                value: "cirdanTheShipwright",
            },
            "denethor":
            {
                name: "Denethor",
                threatCost: 8,
                willpower: 1,
                attack: 1,
                defense: 3,
                hitPoints: 3,
                traitKeys: [ Trait.GONDOR, Trait.NOBLE, Trait.STEWARD ],
                sphereKey: Sphere.LORE,
                cardSetKey: CardSet.CORE,
                cardSetNumber: 10,
                value: "denethor",
            },
            "dwalin":
            {
                name: "Dwalin",
                threatCost: 9,
                willpower: 1,
                attack: 2,
                defense: 2,
                hitPoints: 4,
                traitKeys: [ Trait.DWARF ],
                sphereKey: Sphere.SPIRIT,
                cardSetKey: CardSet.KHAZAD_DUM,
                cardSetNumber: 1,
                value: "dwalin",
            },
            "dunhere":
            {
                name: "Dúnhere",
                threatCost: 8,
                willpower: 1,
                attack: 2,
                defense: 1,
                hitPoints: 4,
                traitKeys: [ Trait.ROHAN, Trait.WARRIOR ],
                sphereKey: Sphere.SPIRIT,
                cardSetKey: CardSet.CORE,
                cardSetNumber: 9,
                value: "dunhere",
            },
            "eleanor":
            {
                name: "Eleanor",
                threatCost: 7,
                willpower: 1,
                attack: 1,
                defense: 2,
                hitPoints: 3,
                traitKeys: [ Trait.GONDOR, Trait.NOBLE ],
                sphereKey: Sphere.SPIRIT,
                cardSetKey: CardSet.CORE,
                cardSetNumber: 8,
                value: "eleanor",
            },
            "eowyn":
            {
                name: "Éowyn",
                threatCost: 9,
                willpower: 4,
                attack: 1,
                defense: 1,
                hitPoints: 3,
                traitKeys: [ Trait.NOBLE, Trait.ROHAN ],
                sphereKey: Sphere.SPIRIT,
                cardSetKey: CardSet.CORE,
                cardSetNumber: 7,
                value: "eowyn",
            },
            "galdorOfTheHavens":
            {
                name: "Galdor of the Havens",
                threatCost: 9,
                willpower: 2,
                attack: 2,
                defense: 1,
                hitPoints: 4,
                traitKeys: [ Trait.NOLDOR ],
                sphereKey: Sphere.LORE,
                cardSetKey: CardSet.THE_GREY_HAVENS,
                cardSetNumber: 2,
                image: "http://www.cardgamedb.com/forums/uploads/lotr/ffg_MEC47_2.jpg",
                value: "galdorOfTheHavens",
            },
            "gimli":
            {
                name: "Gimli",
                threatCost: 11,
                willpower: 2,
                attack: 2,
                defense: 2,
                hitPoints: 5,
                traitKeys: [ Trait.DWARF, Trait.NOBLE, Trait.WARRIOR ],
                sphereKey: Sphere.TACTICS,
                cardSetKey: CardSet.CORE,
                cardSetNumber: 4,
                value: "gimli",
            },
            "gloin":
            {
                name: "Glóin",
                threatCost: 9,
                willpower: 2,
                attack: 2,
                defense: 1,
                hitPoints: 4,
                traitKeys: [ Trait.DWARF, Trait.NOBLE ],
                sphereKey: Sphere.LEADERSHIP,
                cardSetKey: CardSet.CORE,
                cardSetNumber: 3,
                value: "gloin",
            },
            "glorfindel":
            {
                name: "Glorfindel",
                threatCost: 12,
                willpower: 3,
                attack: 3,
                defense: 1,
                hitPoints: 5,
                traitKeys: [ Trait.NOBLE, Trait.NOLDOR, Trait.WARRIOR ],
                sphereKey: Sphere.LORE,
                cardSetKey: CardSet.CORE,
                cardSetNumber: 11,
                value: "glorfindel",
            },
            "legolas":
            {
                name: "Legolas",
                threatCost: 9,
                willpower: 1,
                attack: 3,
                defense: 1,
                hitPoints: 4,
                traitKeys: [ Trait.NOBLE, Trait.SILVAN, Trait.WARRIOR ],
                sphereKey: Sphere.TACTICS,
                cardSetKey: CardSet.CORE,
                cardSetNumber: 5,
                value: "legolas",
            },
            "nori":
            {
                name: "Nori",
                threatCost: 9,
                willpower: 2,
                attack: 1,
                defense: 2,
                hitPoints: 4,
                traitKeys: [ Trait.DWARF ],
                sphereKey: Sphere.SPIRIT,
                cardSetKey: CardSet.OVER_HILL_AND_UNDER_HILL,
                cardSetNumber: 3,
                value: "nori",
            },
            "ori":
            {
                name: "Ori",
                threatCost: 8,
                willpower: 2,
                attack: 2,
                defense: 1,
                hitPoints: 3,
                traitKeys: [ Trait.DWARF ],
                sphereKey: Sphere.LORE,
                cardSetKey: CardSet.OVER_HILL_AND_UNDER_HILL,
                cardSetNumber: 4,
                value: "ori",
            },
            "thalin":
            {
                name: "Thalin",
                threatCost: 9,
                willpower: 1,
                attack: 2,
                defense: 2,
                hitPoints: 4,
                traitKeys: [ Trait.DWARF, Trait.WARRIOR ],
                sphereKey: Sphere.TACTICS,
                cardSetKey: CardSet.CORE,
                cardSetNumber: 6,
                value: "thalin",
            },
            "theoden":
            {
                name: "Théoden",
                threatCost: 12,
                willpower: 2,
                attack: 3,
                defense: 2,
                hitPoints: 4,
                traitKeys: [ Trait.ROHAN, Trait.NOBLE, Trait.WARRIOR ],
                sphereKey: Sphere.SPIRIT,
                cardSetKey: CardSet.THE_TREASON_OF_SARUMAN,
                cardSetNumber: 2,
                value: "theoden",
            },
            "theodred":
            {
                name: "Théodred",
                threatCost: 8,
                willpower: 1,
                attack: 2,
                defense: 1,
                hitPoints: 4,
                traitKeys: [ Trait.NOBLE, Trait.ROHAN, Trait.WARRIOR ],
                sphereKey: Sphere.LEADERSHIP,
                cardSetKey: CardSet.CORE,
                cardSetNumber: 2,
                value: "theodred",
            },
            "thorinOakenshield":
            {
                name: "Thorin Oakenshield",
                threatCost: 12,
                willpower: 3,
                attack: 3,
                defense: 1,
                hitPoints: 5,
                traitKeys: [ Trait.DWARF, Trait.NOBLE, Trait.WARRIOR ],
                sphereKey: Sphere.LEADERSHIP,
                cardSetKey: CardSet.OVER_HILL_AND_UNDER_HILL,
                cardSetNumber: 2,
                value: "thorinOakenshield",
            },
            "treebeard":
            {
                name: "Treebeard",
                threatCost: 13,
                willpower: 2,
                attack: 3,
                defense: 3,
                hitPoints: 5,
                traitKeys: [ Trait.ENT ],
                sphereKey: Sphere.LORE,
                cardSetKey: CardSet.THE_TREASON_OF_SARUMAN,
                cardSetNumber: 3,
                value: "treebeard",
            },
        },

        values: function()
        {
            return Object.getOwnPropertyNames(HeroCard.properties);
        },
    };

    HeroCard.values().forEach(function(cardKey)
    {
        var card = HeroCard.properties[cardKey];
        card.isUnique = true;
        card.cardSet = CardSet.properties[card.cardSetKey];
        card.cardType = CardType.HERO;
        card.sphere = Sphere.properties[card.sphereKey];

        if (!card.image)
        {
            card.image = ImageNameCreator.create(card);
        }
    });

    if (Object.freeze)
    {
        Object.freeze(HeroCard);
    }

    return HeroCard;
});

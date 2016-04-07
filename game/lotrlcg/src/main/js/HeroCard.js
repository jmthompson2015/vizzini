define([ "CardSet", "CardType", "Sphere", "Trait" ], function(CardSet, CardType, Sphere, Trait)
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
                traits: [ Trait.DUNEDAIN, Trait.NOBLE, Trait.RANGER ],
                sphere: Sphere.FELLOWSHIP,
                set: CardSet.THE_TREASON_OF_SARUMAN,
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
                traits: [ Trait.DUNEDAIN, Trait.NOBLE, Trait.RANGER ],
                sphere: Sphere.LEADERSHIP,
                set: CardSet.CORE,
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
                traits: [ Trait.BEORNING, Trait.WARRIOR ],
                sphere: Sphere.TACTICS,
                set: CardSet.OVER_HILL_AND_UNDER_HILL,
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
                traits: [ Trait.DUNEDAIN, Trait.RANGER ],
                sphere: Sphere.LORE,
                set: CardSet.CORE,
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
                traits: [ Trait.DWARF ],
                sphere: Sphere.LORE,
                set: CardSet.KHAZAD_DUM,
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
                traits: [ Trait.HOBBIT ],
                sphere: Sphere.BAGGINS,
                set: CardSet.OVER_HILL_AND_UNDER_HILL,
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
                traits: [ Trait.HOBBIT ],
                sphere: Sphere.LORE,
                set: CardSet.SOM1_THE_HUNT_FOR_GOLLUM,
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
                traits: [ Trait.NOLDOR, Trait.NOBLE ],
                sphere: Sphere.SPIRIT,
                set: CardSet.THE_GREY_HAVENS,
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
                traits: [ Trait.GONDOR, Trait.NOBLE, Trait.STEWARD ],
                sphere: Sphere.LORE,
                set: CardSet.CORE,
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
                traits: [ Trait.DWARF ],
                sphere: Sphere.SPIRIT,
                set: CardSet.KHAZAD_DUM,
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
                traits: [ Trait.ROHAN, Trait.WARRIOR ],
                sphere: Sphere.SPIRIT,
                set: CardSet.CORE,
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
                traits: [ Trait.GONDOR, Trait.NOBLE ],
                sphere: Sphere.SPIRIT,
                set: CardSet.CORE,
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
                traits: [ Trait.NOBLE, Trait.ROHAN ],
                sphere: Sphere.SPIRIT,
                set: CardSet.CORE,
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
                traits: [ Trait.NOLDOR ],
                sphere: Sphere.LORE,
                set: CardSet.THE_GREY_HAVENS,
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
                traits: [ Trait.DWARF, Trait.NOBLE, Trait.WARRIOR ],
                sphere: Sphere.TACTICS,
                set: CardSet.CORE,
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
                traits: [ Trait.DWARF, Trait.NOBLE ],
                sphere: Sphere.LEADERSHIP,
                set: CardSet.CORE,
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
                traits: [ Trait.NOBLE, Trait.NOLDOR, Trait.WARRIOR ],
                sphere: Sphere.LORE,
                set: CardSet.CORE,
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
                traits: [ Trait.NOBLE, Trait.SILVAN, Trait.WARRIOR ],
                sphere: Sphere.TACTICS,
                set: CardSet.CORE,
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
                traits: [ Trait.DWARF ],
                sphere: Sphere.SPIRIT,
                set: CardSet.OVER_HILL_AND_UNDER_HILL,
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
                traits: [ Trait.DWARF ],
                sphere: Sphere.LORE,
                set: CardSet.OVER_HILL_AND_UNDER_HILL,
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
                traits: [ Trait.DWARF, Trait.WARRIOR ],
                sphere: Sphere.TACTICS,
                set: CardSet.CORE,
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
                traits: [ Trait.ROHAN, Trait.NOBLE, Trait.WARRIOR ],
                sphere: Sphere.SPIRIT,
                set: CardSet.THE_TREASON_OF_SARUMAN,
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
                traits: [ Trait.NOBLE, Trait.ROHAN, Trait.WARRIOR ],
                sphere: Sphere.LEADERSHIP,
                set: CardSet.CORE,
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
                traits: [ Trait.DWARF, Trait.NOBLE, Trait.WARRIOR ],
                sphere: Sphere.LEADERSHIP,
                set: CardSet.OVER_HILL_AND_UNDER_HILL,
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
                traits: [ Trait.ENT ],
                sphere: Sphere.LORE,
                set: CardSet.THE_TREASON_OF_SARUMAN,
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
        card.cardType = CardType.HERO;
    });

    if (Object.freeze)
    {
        Object.freeze(HeroCard);
    }

    return HeroCard;
});

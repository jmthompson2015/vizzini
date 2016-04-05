define([ "CardSet", "CardType", "Sphere" ], function(CardSet, CardType, Sphere)
{
    "use strict";
    var EventCard =
    {
        A_LIGHT_IN_THE_DARK: "aLightInTheDark",
        A_TEST_OF_WILL: "aTestOfWill",
        DWARVEN_TOMB: "dwarvenTomb",
        FEINT: "feint",
        FOR_GONDOR: "forGondor",
        HASTY_STROKE: "hastyStroke",
        QUICK_STRIKE: "quickStrike",
        RADAGASTS_CUNNING: "radagastsCunning",
        SNEAK_ATTACK: "sneakAttack",
        STAND_AND_FIGHT: "standAndFight",
        SWIFT_STRIKE: "swiftStrike",
        THE_GALADHRIMS_GREETING: "theGaladhrimsGreeting",
        VALIANT_SACRIFICE: "valiantSacrifice",

        properties:
        {
            "aLightInTheDark":
            {
                name: "A Light in the Dark",
                cost: 2,
                sphere: Sphere.SPIRIT,
                set: CardSet.CORE,
                value: "aLightInTheDark",
            },
            "aTestOfWill":
            {
                name: "A Test of Will",
                cost: 1,
                sphere: Sphere.SPIRIT,
                set: CardSet.CORE,
                value: "aTestOfWill",
            },
            "dwarvenTomb":
            {
                name: "Dwarven Tomb",
                cost: 1,
                sphere: Sphere.SPIRIT,
                set: CardSet.CORE,
                value: "dwarvenTomb",
            },
            "feint":
            {
                name: "Feint",
                cost: 1,
                sphere: Sphere.TACTICS,
                set: CardSet.CORE,
                value: "feint",
            },
            "forGondor":
            {
                name: "For Gondor!",
                cost: 2,
                sphere: Sphere.LEADERSHIP,
                set: CardSet.CORE,
                value: "forGondor",
            },
            "hastyStroke":
            {
                name: "Hasty Stroke",
                cost: 1,
                sphere: Sphere.SPIRIT,
                set: CardSet.CORE,
                value: "hastyStroke",
            },
            "quickStrike":
            {
                name: "Quick Strike",
                cost: 1,
                sphere: Sphere.TACTICS,
                set: CardSet.CORE,
                value: "quickStrike",
            },
            "radagastsCunning":
            {
                name: "Radagast's Cunning",
                cost: 1,
                sphere: Sphere.LORE,
                set: CardSet.CORE,
                value: "radagastsCunning",
            },
            "sneakAttack":
            {
                name: "Sneak Attack",
                cost: 1,
                sphere: Sphere.LEADERSHIP,
                set: CardSet.CORE,
                value: "sneakAttack",
            },
            "standAndFight":
            {
                name: "Stand and Fight",
                // cost: 1,
                sphere: Sphere.SPIRIT,
                set: CardSet.CORE,
                value: "standAndFight",
            },
            "swiftStrike":
            {
                name: "Swift Strike",
                cost: 2,
                sphere: Sphere.TACTICS,
                set: CardSet.CORE,
                value: "swiftStrike",
            },
            "theGaladhrimsGreeting":
            {
                name: "The Galadhrim's Greeting",
                cost: 3,
                sphere: Sphere.SPIRIT,
                set: CardSet.CORE,
                value: "theGaladhrimsGreeting",
            },
            "valiantSacrifice":
            {
                name: "Valiant Sacrifice",
                cost: 1,
                sphere: Sphere.LEADERSHIP,
                set: CardSet.CORE,
                value: "valiantSacrifice",
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
        card.cardType = CardType.EVENT;
    });

    if (Object.freeze)
    {
        Object.freeze(EventCard);
    }

    return EventCard;
});

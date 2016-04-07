define([ "CardSet", "CardType", "Sphere" ], function(CardSet, CardType, Sphere)
{
    "use strict";
    var EventCard =
    {
        A_LIGHT_IN_THE_DARK: "aLightInTheDark",
        A_TEST_OF_WILL: "aTestOfWill",
        CAMPFIRE_TALES: "campfireTales",
        DWARVEN_TOMB: "dwarvenTomb",
        FEINT: "feint",
        FOR_GONDOR: "forGondor",
        HASTY_STROKE: "hastyStroke",
        MUSTERING_THE_ROHIRRIM: "musteringTheRohirrim",
        QUICK_STRIKE: "quickStrike",
        RADAGASTS_CUNNING: "radagastsCunning",
        SNEAK_ATTACK: "sneakAttack",
        STAND_AND_FIGHT: "standAndFight",
        STRIDERS_PATH: "stridersPath",
        SWIFT_STRIKE: "swiftStrike",
        THE_EAGLES_ARE_COMING: "theEaglesAreComing",
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
            "campfireTales":
            {
                name: "Campfire Tales",
                cost: 1,
                sphere: Sphere.LEADERSHIP,
                set: CardSet.SOM1_THE_HUNT_FOR_GOLLUM,
                value: "campfireTales",
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
            "musteringTheRohirrim":
            {
                name: "Mustering the Rohirrim",
                cost: 1,
                sphere: Sphere.SPIRIT,
                set: CardSet.SOM1_THE_HUNT_FOR_GOLLUM,
                value: "musteringTheRohirrim",
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
            "stridersPath":
            {
                name: "Strider's Path",
                cost: 1,
                sphere: Sphere.LORE,
                set: CardSet.SOM1_THE_HUNT_FOR_GOLLUM,
                value: "stridersPath",
            },
            "swiftStrike":
            {
                name: "Swift Strike",
                cost: 2,
                sphere: Sphere.TACTICS,
                set: CardSet.CORE,
                value: "swiftStrike",
            },
            "theEaglesAreComing":
            {
                name: "The Eagles Are Coming!",
                cost: 0,
                sphere: Sphere.TACTICS,
                set: CardSet.SOM1_THE_HUNT_FOR_GOLLUM,
                value: "theEaglesAreComing",
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

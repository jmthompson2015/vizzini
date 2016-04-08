define([ "CardType", "EncounterSet", "GameMode", "ImageNameCreator" ], function(CardType, EncounterSet, GameMode,
        ImageNameCreator)
{
    "use strict";
    var TreacheryCard =
    {
        CAUGHT_IN_A_WEB: "caughtInAWeb",
        DRIVEN_BY_SHADOW: "drivenByShadow",
        EYES_OF_THE_FOREST: "eyesOfTheForest",
        THE_NECROMANCERS_REACH: "theNecromancersReach",

        properties:
        {
            "caughtInAWeb":
            {
                name: "Caught in a Web",
                encounterSet: EncounterSet.SPIDERS_OF_MIRKWOOD,
                gameMode: GameMode.STANDARD,
                value: "caughtInAWeb",
            },
            "drivenByShadow":
            {
                name: "Driven by Shadow",
                encounterSet: EncounterSet.DOL_GULDUR_ORCS,
                gameMode: GameMode.EASY,
                value: "drivenByShadow",
            },
            "eyesOfTheForest":
            {
                name: "Eyes of the Forest",
                encounterSet: EncounterSet.SPIDERS_OF_MIRKWOOD,
                gameMode: GameMode.STANDARD,
                value: "eyesOfTheForest",
            },
            "theNecromancersReach":
            {
                name: "The Necromancer's Reach",
                encounterSet: EncounterSet.DOL_GULDUR_ORCS,
                gameMode: GameMode.STANDARD,
                value: "theNecromancersReach",
            },
        },

        values: function()
        {
            return Object.getOwnPropertyNames(TreacheryCard.properties);
        },
    };

    TreacheryCard.values().forEach(function(cardKey)
    {
        var card = TreacheryCard.properties[cardKey];
        card.cardType = CardType.TREACHERY;

        if (!card.image)
        {
            card.image = ImageNameCreator.create(card);
        }
    });

    if (Object.freeze)
    {
        Object.freeze(TreacheryCard);
    }

    return TreacheryCard;
});

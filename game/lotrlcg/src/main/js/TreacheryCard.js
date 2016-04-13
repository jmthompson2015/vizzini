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
                encounterSetKey: EncounterSet.SPIDERS_OF_MIRKWOOD,
                gameModeKey: GameMode.STANDARD,
                value: "caughtInAWeb",
            },
            "drivenByShadow":
            {
                name: "Driven by Shadow",
                encounterSetKey: EncounterSet.DOL_GULDUR_ORCS,
                gameModeKey: GameMode.EASY,
                value: "drivenByShadow",
            },
            "eyesOfTheForest":
            {
                name: "Eyes of the Forest",
                encounterSetKey: EncounterSet.SPIDERS_OF_MIRKWOOD,
                gameModeKey: GameMode.STANDARD,
                value: "eyesOfTheForest",
            },
            "theNecromancersReach":
            {
                name: "The Necromancer's Reach",
                encounterSetKey: EncounterSet.DOL_GULDUR_ORCS,
                gameModeKey: GameMode.STANDARD,
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
        card.cardTypeKey = CardType.TREACHERY;
        card.cardType = CardType.properties[card.cardTypeKey];
        card.encounterSet = EncounterSet.properties[card.encounterSetKey];
        card.gameMode = GameMode.properties[card.gameModeKey];

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

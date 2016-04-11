define([ "CardType", "EncounterSet", "ImageNameCreator" ], function(CardType, EncounterSet, ImageNameCreator)
{
    "use strict";
    var QuestCard =
    {
        A_CHOSEN_PATH_BEORNS_PATH: "aChosenPathBeornsPath",
        A_CHOSEN_PATH_DONT_LEAVE_THE_PATH: "aChosenPathDontLeaveThePath",
        A_FORK_IN_THE_ROAD: "aForkInTheRoad",
        FLIES_AND_SPIDERS: "fliesAndSpiders",

        properties:
        {
            "aChosenPathBeornsPath":
            {
                name: "A Chosen Path: Beorn's Path",
                sequence: 3,
                questPoints: 10,
                encounterSetKey: EncounterSet.PASSAGE_THROUGH_MIRKWOOD,
                encounterSetKeys: [ EncounterSet.SPIDERS_OF_MIRKWOOD, EncounterSet.DOL_GULDUR_ORCS ],
                value: "aChosenPathBeornsPath",
            },
            "aChosenPathDontLeaveThePath":
            {
                name: "A Chosen Path: Don't Leave the Path!",
                sequence: 3,
                questPoints: 0,
                encounterSetKey: EncounterSet.PASSAGE_THROUGH_MIRKWOOD,
                encounterSetKeys: [ EncounterSet.SPIDERS_OF_MIRKWOOD, EncounterSet.DOL_GULDUR_ORCS ],
                value: "aChosenPathDontLeaveThePath",
            },
            "aForkInTheRoad":
            {
                name: "A Fork in the Road",
                sequence: 2,
                questPoints: 2,
                encounterSetKey: EncounterSet.PASSAGE_THROUGH_MIRKWOOD,
                encounterSetKeys: [ EncounterSet.SPIDERS_OF_MIRKWOOD, EncounterSet.DOL_GULDUR_ORCS ],
                value: "aForkInTheRoad",
            },
            "fliesAndSpiders":
            {
                name: "Flies and Spiders",
                sequence: 1,
                questPoints: 8,
                encounterSetKey: EncounterSet.PASSAGE_THROUGH_MIRKWOOD,
                encounterSetKeys: [ EncounterSet.SPIDERS_OF_MIRKWOOD, EncounterSet.DOL_GULDUR_ORCS ],
                value: "fliesAndSpiders",
            },
        },

        values: function()
        {
            return Object.getOwnPropertyNames(QuestCard.properties);
        },
    };

    QuestCard.values().forEach(function(cardKey)
    {
        var card = QuestCard.properties[cardKey];
        card.cardType = CardType.QUEST;
        card.encounterSet = EncounterSet.properties[card.encounterSetKey];

        if (!card.image)
        {
            card.image = ImageNameCreator.create(card);
        }
    });

    if (Object.freeze)
    {
        Object.freeze(QuestCard);
    }

    return QuestCard;
});

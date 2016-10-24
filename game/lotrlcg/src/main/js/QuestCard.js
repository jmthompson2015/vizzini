define(
        [ "CardType", "EncounterSet", "ImageNameCreator", "Scenario" ],
        function(CardType, EncounterSet, ImageNameCreator, Scenario)
        {
            "use strict";
            var QuestCard =
            {
                PTM1A_FLIES_AND_SPIDERS: "ptm1aFliesAndSpiders",
                PTM1B_FLIES_AND_SPIDERS: "ptm1bFliesAndSpiders",
                PTM2A_A_FORK_IN_THE_ROAD: "ptm2aAForkInTheRoad",
                PTM2B_A_FORK_IN_THE_ROAD: "ptm2bAForkInTheRoad",
                PTM3A_A_CHOSEN_PATH: "ptm3aAChosenPath",
                PTM3B1_BEORNS_PATH: "ptm3b1BeornsPath",
                PTM3B2_DONT_LEAVE_THE_PATH: "ptm3b2DontLeaveThePath",
                THFG1A_THE_HUNT_BEGINS: "thfg1aTheHuntBegins",
                THFG1B_THE_HUNT_BEGINS: "thfg1bTheHuntBegins",
                THFG2A_A_NEW_TERROR_ABROAD: "thfg2aANewTerrorAbroad",
                THFG2B_A_NEW_TERROR_ABROAD: "thfg2bANewTerrorAbroad",
                THFG3A_ON_THE_TRAIL: "thfg3aOnTheTrail",
                THFG3B_ON_THE_TRAIL: "thfg3bOnTheTrail",

                properties:
                {
                    "ptm1aFliesAndSpiders":
                    {
                        name: "Flies and Spiders",
                        scenarioKey: Scenario.PASSAGE_THROUGH_MIRKWOOD,
                        sequence: "1A",
                        encounterSetKey: EncounterSet.PASSAGE_THROUGH_MIRKWOOD,
                        value: "ptm1aFliesAndSpiders",
                    },
                    "ptm1bFliesAndSpiders":
                    {
                        name: "Flies and Spiders",
                        scenarioKey: Scenario.PASSAGE_THROUGH_MIRKWOOD,
                        sequence: "1B",
                        questPoints: 8,
                        encounterSetKey: EncounterSet.PASSAGE_THROUGH_MIRKWOOD,
                        value: "ptm1bFliesAndSpiders",
                    },
                    "ptm2aAForkInTheRoad":
                    {
                        name: "A Fork in the Road",
                        scenarioKey: Scenario.PASSAGE_THROUGH_MIRKWOOD,
                        sequence: "2A",
                        encounterSetKey: EncounterSet.PASSAGE_THROUGH_MIRKWOOD,
                        value: "ptm2aAForkInTheRoad",
                    },
                    "ptm2bAForkInTheRoad":
                    {
                        name: "A Fork in the Road",
                        scenarioKey: Scenario.PASSAGE_THROUGH_MIRKWOOD,
                        sequence: "2B",
                        questPoints: 2,
                        encounterSetKey: EncounterSet.PASSAGE_THROUGH_MIRKWOOD,
                        value: "ptm2bAForkInTheRoad",
                    },
                    "ptm3aAChosenPath":
                    {
                        name: "A Chosen Path",
                        scenarioKey: Scenario.PASSAGE_THROUGH_MIRKWOOD,
                        sequence: "3A",
                        encounterSetKey: EncounterSet.PASSAGE_THROUGH_MIRKWOOD,
                        image: "http://s3.amazonaws.com/hallofbeorn-resources/Images/Cards/Core-Set/A-Chosen-Path-Beorn's-Path-3A.png",
                        value: "ptm3aAChosenPath",
                    },
                    "ptm3b1BeornsPath":
                    {
                        name: "Beorn's Path",
                        scenarioKey: Scenario.PASSAGE_THROUGH_MIRKWOOD,
                        sequence: "3B",
                        questPoints: 10,
                        encounterSetKey: EncounterSet.PASSAGE_THROUGH_MIRKWOOD,
                        image: "http://s3.amazonaws.com/hallofbeorn-resources/Images/Cards/Core-Set/A-Chosen-Path-Beorn's-Path-3B.png",
                        value: "ptm3b1BeornsPath",
                    },
                    "ptm3b2DontLeaveThePath":
                    {
                        name: "Don't Leave the Path!",
                        scenarioKey: Scenario.PASSAGE_THROUGH_MIRKWOOD,
                        sequence: "3B",
                        questPoints: 0,
                        encounterSetKey: EncounterSet.PASSAGE_THROUGH_MIRKWOOD,
                        image: "http://s3.amazonaws.com/hallofbeorn-resources/Images/Cards/Core-Set/A-Chosen-Path-Don't-Leave-the-Path-3B.png",
                        value: "ptm3b2DontLeaveThePath",
                    },
                    "thfg1aTheHuntBegins":
                    {
                        name: "The Hunt Begins",
                        scenarioKey: Scenario.THE_HUNT_FOR_GOLLUM,
                        sequence: "1A",
                        encounterSetKey: EncounterSet.THE_HUNT_FOR_GOLLUM,
                        value: "thfg1aTheHuntBegins",
                    },
                    "thfg1bTheHuntBegins":
                    {
                        name: "The Hunt Begins",
                        scenarioKey: Scenario.THE_HUNT_FOR_GOLLUM,
                        sequence: "1B",
                        questPoints: 8,
                        encounterSetKey: EncounterSet.THE_HUNT_FOR_GOLLUM,
                        value: "thfg1bTheHuntBegins",
                    },
                    "thfg2aANewTerrorAbroad":
                    {
                        name: "A New Terror Abroad",
                        scenarioKey: Scenario.THE_HUNT_FOR_GOLLUM,
                        sequence: "2A",
                        encounterSetKey: EncounterSet.THE_HUNT_FOR_GOLLUM,
                        value: "thfg2aANewTerrorAbroad",
                    },
                    "thfg2bANewTerrorAbroad":
                    {
                        name: "A New Terror Abroad",
                        scenarioKey: Scenario.THE_HUNT_FOR_GOLLUM,
                        sequence: "2B",
                        questPoints: 10,
                        encounterSetKey: EncounterSet.THE_HUNT_FOR_GOLLUM,
                        value: "thfg2bANewTerrorAbroad",
                    },
                    "thfg3aOnTheTrail":
                    {
                        name: "On the Trail",
                        scenarioKey: Scenario.THE_HUNT_FOR_GOLLUM,
                        sequence: "3A",
                        encounterSetKey: EncounterSet.THE_HUNT_FOR_GOLLUM,
                        value: "thfg3aOnTheTrail",
                    },
                    "thfg3bOnTheTrail":
                    {
                        name: "On the Trail",
                        scenarioKey: Scenario.THE_HUNT_FOR_GOLLUM,
                        sequence: "3B",
                        questPoints: 8,
                        encounterSetKey: EncounterSet.THE_HUNT_FOR_GOLLUM,
                        value: "thfg3bOnTheTrail",
                    },
                },

                values: function()
                {
                    return Object.getOwnPropertyNames(QuestCard.properties);
                },

                valuesByScenario: function(scenarioKey)
                {
                    InputValidator.validateNotNull("scenarioKey", scenarioKey);

                    var values = QuestCard.values();

                    return values.filter(function(cardKey)
                    {
                        var card = QuestCard.properties[cardKey];

                        return card.scenarioKey === scenarioKey;
                    });
                },
            };

            QuestCard.values().forEach(function(cardKey)
            {
                var card = QuestCard.properties[cardKey];
                card.cardTypeKey = CardType.QUEST;
                card.cardType = CardType.properties[card.cardTypeKey];
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

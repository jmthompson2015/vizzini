define([ "CardSet", "CardSubset", "CardType", "ImageNameCreator", "Sphere" ], function(CardSet, CardSubset, CardType,
        ImageNameCreator, Sphere)
{
    "use strict";
    var EventCard =
    {
        A_ELBERETH_GILTHONIEL: "aElberethGilthoniel",
        A_LIGHT_IN_THE_DARK: "aLightInTheDark",
        A_TEST_OF_WILL: "aTestOfWill",
        A_WATCHFUL_PEACE: "aWatchfulPeace",
        ASTONISHING_SPEED: "astonishingSpeed",
        BEHIND_STRONG_WALLS: "behindStrongWalls",
        CAMPFIRE_TALES: "campfireTales",
        CHARGE_OF_THE_ROHIRRIM: "chargeOfTheRohirrim",
        CHILDREN_OF_THE_SEA: "childrenOfTheSea",
        DAERONS_RUNES: "daeronsRunes",
        DAWN_TAKE_YOU_ALL: "dawnTakeYouAll",
        DEEP_KNOWLEDGE: "deepKnowledge",
        DESPERATE_ALLIANCE: "desperateAlliance",
        DWARVEN_TOMB: "dwarvenTomb",
        FEINT: "feint",
        FOLLOW_ME: "followMe",
        FOR_GONDOR: "forGondor",
        FRESH_TRACKS: "freshTracks",
        GILDORS_COUNSEL: "gildorsCounsel",
        HANDS_UPON_THE_BOW: "handsUponTheBow",
        HASTY_STROKE: "hastyStroke",
        HEAVY_STROKE: "heavyStroke",
        INFIGHTING: "infighting",
        ISLAND_AMID_PERILS: "islandAmidPerils",
        LEGACY_OF_NUMENOR: "legacyOfNumenor",
        LIGHT_THE_BEACONS: "lightTheBeacons",
        MENELDORS_FLIGHT: "meneldorsFlight",
        MUSTERING_THE_ROHIRRIM: "musteringTheRohirrim",
        MUTUAL_ACCORD: "mutualAccord",
        NEEDFUL_TO_KNOW: "needfulToKnow",
        OUT_OF_SIGHT: "outOfSight",
        PARTING_GIFTS: "partingGifts",
        PEACE_AND_THOUGHT: "peaceAndThought",
        POWER_OF_ORTHANC: "powerOfOrthanc",
        QUICK_STRIKE: "quickStrike",
        RADAGASTS_CUNNING: "radagastsCunning",
        RAVENS_OF_THE_MOUNTAIN: "ravensOfTheMountain",
        REAR_GUARD: "rearGuard",
        RENEWED_FRIENDSHIP: "renewedFriendship",
        RIDE_TO_RUIN: "rideToRuin",
        RISK_SOME_LIGHT: "riskSomeLight",
        RUMOUR_FROM_THE_EARTH: "rumourFromTheEarth",
        SECOND_BREAKFAST: "secondBreakfast",
        SHADOW_OF_THE_PAST: "shadowOfThePast",
        SNEAK_ATTACK: "sneakAttack",
        STAND_AND_FIGHT: "standAndFight",
        STRAIGHT_SHOT: "straightShot",
        STRIDERS_PATH: "stridersPath",
        SWIFT_STRIKE: "swiftStrike",
        TAKING_INITIATIVE: "takingInitiative",
        THE_EAGLES_ARE_COMING: "theEaglesAreComing",
        THE_GALADHRIMS_GREETING: "theGaladhrimsGreeting",
        THE_HAMMER_STROKE: "theHammerStroke",
        THE_LUCKY_NUMBER: "theLuckyNumber",
        THE_SEEING_STONE: "theSeeingStone",
        THE_WIZARDS_VOICE: "theWizardsVoice",
        TIGHTEN_OUR_BELTS: "tightenOurBelts",
        TIMELY_AID: "timelyAid",
        TO_ME_O_MY_KINSFOLK: "toMeOMyKinsfolk",
        TO_THE_EYRIE: "toTheEyrie",
        UNSEEN_STRIKE: "unseenStrike",
        VALIANT_SACRIFICE: "valiantSacrifice",
        WE_ARE_NOT_IDLE: "weAreNotIdle",
        WE_DO_NOT_SLEEP: "weDoNotSleep",
        WEALTH_OF_GONDOR: "wealthOfGondor",
        WELL_EQUIPPED: "wellEquipped",
        WORD_OF_COMMAND: "wordOfCommand",

        properties:
        {
            "aElberethGilthoniel":
            {
                name: "A Elbereth! Gilthoniel!",
                cost: 4,
                sphereKey: Sphere.SPIRIT,
                cardSetKey: CardSet.DWARROWDELF,
                cardSubsetKey: CardSubset.D6_SHADOW_AND_FLAME,
                // This is spelled wrong at cardgamedb.com
                image: "http://www.cardgamedb.com/forums/uploads/lotr/ffg_o-elbereth-gilthonial-saf.jpg",
                value: "aElberethGilthoniel",
            },
            "aLightInTheDark":
            {
                name: "A Light in the Dark",
                cost: 2,
                sphereKey: Sphere.SPIRIT,
                cardSetKey: CardSet.CORE,
                value: "aLightInTheDark",
            },
            "aTestOfWill":
            {
                name: "A Test of Will",
                cost: 1,
                sphereKey: Sphere.SPIRIT,
                cardSetKey: CardSet.CORE,
                value: "aTestOfWill",
            },
            "aWatchfulPeace":
            {
                name: "A Watchful Peace",
                cost: 1,
                sphereKey: Sphere.SPIRIT,
                cardSetKey: CardSet.HEIRS_OF_NUMENOR,
                value: "aWatchfulPeace",
            },
            "astonishingSpeed":
            {
                name: "Astonishing Speed",
                cost: 3,
                sphereKey: Sphere.SPIRIT,
                cardSetKey: CardSet.SHADOWS_OF_MIRKWOOD,
                cardSubsetKey: CardSubset.SOM6_RETURN_TO_MIRKWOOD,
                value: "astonishingSpeed",
            },
            "behindStrongWalls":
            {
                name: "Behind Strong Walls",
                cost: 1,
                sphereKey: Sphere.TACTICS,
                cardSetKey: CardSet.HEIRS_OF_NUMENOR,
                value: "behindStrongWalls",
            },
            "campfireTales":
            {
                name: "Campfire Tales",
                cost: 1,
                sphereKey: Sphere.LEADERSHIP,
                cardSetKey: CardSet.SHADOWS_OF_MIRKWOOD,
                cardSubsetKey: CardSubset.SOM1_THE_HUNT_FOR_GOLLUM,
                value: "campfireTales",
            },
            "chargeOfTheRohirrim":
            {
                name: "Charge of the Rohirrim",
                cost: 2,
                sphereKey: Sphere.TACTICS,
                cardSetKey: CardSet.THE_RING_MAKER,
                cardSubsetKey: CardSubset.TRM5_CELEBRIMBORS_SECRET,
                cardSetNumber: 116,
                value: "chargeOfTheRohirrim",
            },
            "childrenOfTheSea":
            {
                name: "Children of the Sea",
                cost: 0,
                sphereKey: Sphere.SPIRIT,
                cardSetKey: CardSet.AGAINST_THE_SHADOW,
                cardSubsetKey: CardSubset.ATS5_THE_BLOOD_OF_GONDOR,
                value: "childrenOfTheSea",
            },
            "daeronsRunes":
            {
                name: "Daeron's Runes",
                cost: 0,
                sphereKey: Sphere.LORE,
                cardSetKey: CardSet.DWARROWDELF,
                cardSubsetKey: CardSubset.D5_FOUNDATIONS_OF_STONE,
                value: "daeronsRunes",
            },
            "dawnTakeYouAll":
            {
                name: "Dawn Take You All",
                cost: 2,
                sphereKey: Sphere.LEADERSHIP,
                cardSetKey: CardSet.SHADOWS_OF_MIRKWOOD,
                cardSubsetKey: CardSubset.SOM6_RETURN_TO_MIRKWOOD,
                value: "dawnTakeYouAll",
            },
            "deepKnowledge":
            {
                name: "Deep Knowledge",
                cost: 0,
                sphereKey: Sphere.LORE,
                cardSetKey: CardSet.THE_VOICE_OF_ISENGARD,
                value: "deepKnowledge",
            },
            "desperateAlliance":
            {
                name: "Desperate Alliance",
                cost: 0,
                sphereKey: Sphere.SPIRIT,
                cardSetKey: CardSet.ON_THE_DOORSTEP,
                value: "desperateAlliance",
            },
            "dwarvenTomb":
            {
                name: "Dwarven Tomb",
                cost: 1,
                sphereKey: Sphere.SPIRIT,
                cardSetKey: CardSet.CORE,
                value: "dwarvenTomb",
            },
            "feint":
            {
                name: "Feint",
                cost: 1,
                sphereKey: Sphere.TACTICS,
                cardSetKey: CardSet.CORE,
                value: "feint",
            },
            "followMe":
            {
                name: "Follow Me!",
                cost: 1,
                sphereKey: Sphere.LEADERSHIP,
                cardSetKey: CardSet.THE_RING_MAKER,
                cardSubsetKey: CardSubset.TRM4_THE_NIN_IN_EILPH,
                cardSetNumber: 85,
                value: "followMe",
            },
            "forGondor":
            {
                name: "For Gondor!",
                cost: 2,
                sphereKey: Sphere.LEADERSHIP,
                cardSetKey: CardSet.CORE,
                value: "forGondor",
            },
            "freshTracks":
            {
                name: "Fresh Tracks",
                cost: 1,
                sphereKey: Sphere.LEADERSHIP,
                cardSetKey: CardSet.DWARROWDELF,
                cardSubsetKey: CardSubset.D4_THE_LONG_DARK,
                value: "freshTracks",
            },
            "gildorsCounsel":
            {
                name: "Gildor's Counsel",
                cost: 3,
                sphereKey: Sphere.LORE,
                cardSetKey: CardSet.SHADOWS_OF_MIRKWOOD,
                cardSubsetKey: CardSubset.SOM4_THE_HILLS_OF_EMYN_MUIL,
                value: "gildorsCounsel",
            },
            "handsUponTheBow":
            {
                name: "Hands Upon the Bow",
                cost: 1,
                sphereKey: Sphere.TACTICS,
                cardSetKey: CardSet.DWARROWDELF,
                cardSubsetKey: CardSubset.D6_SHADOW_AND_FLAME,
                value: "handsUponTheBow",
            },
            "hastyStroke":
            {
                name: "Hasty Stroke",
                cost: 1,
                sphereKey: Sphere.SPIRIT,
                cardSetKey: CardSet.CORE,
                value: "hastyStroke",
            },
            "heavyStroke":
            {
                name: "Heavy Stroke",
                cost: 1,
                sphereKey: Sphere.TACTICS,
                cardSetKey: CardSet.DWARROWDELF,
                cardSubsetKey: CardSubset.D5_FOUNDATIONS_OF_STONE,
                value: "heavyStroke",
            },
            "islandAmidPerils":
            {
                name: "Island Amid Perils",
                cost: 0,
                sphereKey: Sphere.SPIRIT,
                cardSetKey: CardSet.THE_RING_MAKER,
                cardSubsetKey: CardSubset.TRM4_THE_NIN_IN_EILPH,
                cardSetNumber: 90,
                value: "islandAmidPerils",
            },
            "infighting":
            {
                name: "Infighting",
                cost: 1,
                sphereKey: Sphere.LORE,
                cardSetKey: CardSet.SHADOWS_OF_MIRKWOOD,
                cardSubsetKey: CardSubset.SOM3_A_JOURNEY_TO_RHOSGOBEL,
                value: "infighting",
            },
            "legacyOfNumenor":
            {
                name: "Legacy of Numenor",
                cost: 0,
                sphereKey: Sphere.LEADERSHIP,
                cardSetKey: CardSet.THE_VOICE_OF_ISENGARD,
                value: "legacyOfNumenor",
            },
            "lightTheBeacons":
            {
                name: "Light the Beacons",
                cost: 5,
                sphereKey: Sphere.SPIRIT,
                cardSetKey: CardSet.HEIRS_OF_NUMENOR,
                value: "lightTheBeacons",
            },
            "meneldorsFlight":
            {
                name: "Meneldor's Flight",
                cost: 0,
                sphereKey: Sphere.TACTICS,
                cardSetKey: CardSet.SHADOWS_OF_MIRKWOOD,
                cardSubsetKey: CardSubset.SOM4_THE_HILLS_OF_EMYN_MUIL,
                value: "meneldorsFlight",
            },
            "musteringTheRohirrim":
            {
                name: "Mustering the Rohirrim",
                cost: 1,
                sphereKey: Sphere.SPIRIT,
                cardSetKey: CardSet.SHADOWS_OF_MIRKWOOD,
                cardSubsetKey: CardSubset.SOM1_THE_HUNT_FOR_GOLLUM,
                value: "musteringTheRohirrim",
            },
            "mutualAccord":
            {
                name: "Mutual Accord",
                cost: 0,
                sphereKey: Sphere.LEADERSHIP,
                cardSetKey: CardSet.HEIRS_OF_NUMENOR,
                value: "mutualAccord",
            },
            "needfulToKnow":
            {
                name: "Needful to Know",
                cost: 2,
                sphereKey: Sphere.LORE,
                cardSetKey: CardSet.DWARROWDELF,
                cardSubsetKey: CardSubset.D1_THE_REDHORN_GATE,
                value: "needfulToKnow",
            },
            "outOfSight":
            {
                name: "Out of Sight",
                cost: 5,
                sphereKey: Sphere.SPIRIT,
                cardSetKey: CardSet.DWARROWDELF,
                cardSubsetKey: CardSubset.D4_THE_LONG_DARK,
                value: "outOfSight",
            },
            "partingGifts":
            {
                name: "Parting Gifts",
                cost: 0,
                sphereKey: Sphere.LEADERSHIP,
                cardSetKey: CardSet.SHADOWS_OF_MIRKWOOD,
                cardSubsetKey: CardSubset.SOM3_A_JOURNEY_TO_RHOSGOBEL,
                value: "partingGifts",
            },
            "peaceAndThought":
            {
                name: "Peace, and Thought",
                cost: 1,
                sphereKey: Sphere.LORE,
                cardSetKey: CardSet.DWARROWDELF,
                cardSubsetKey: CardSubset.D6_SHADOW_AND_FLAME,
                value: "peaceAndThought",
            },
            "powerOfOrthanc":
            {
                name: "Power of Orthanc",
                cost: 0,
                sphereKey: Sphere.SPIRIT,
                cardSetKey: CardSet.THE_VOICE_OF_ISENGARD,
                value: "powerOfOrthanc",
            },
            "quickStrike":
            {
                name: "Quick Strike",
                cost: 1,
                sphereKey: Sphere.TACTICS,
                cardSetKey: CardSet.CORE,
                value: "quickStrike",
            },
            "radagastsCunning":
            {
                name: "Radagast's Cunning",
                cost: 1,
                sphereKey: Sphere.LORE,
                cardSetKey: CardSet.CORE,
                value: "radagastsCunning",
            },
            "ravensOfTheMountain":
            {
                name: "Ravens of the Mountain",
                cost: 1,
                sphereKey: Sphere.LORE,
                cardSetKey: CardSet.ON_THE_DOORSTEP,
                value: "ravensOfTheMountain",
            },
            "rearGuard":
            {
                name: "Rear Guard",
                cost: 1,
                sphereKey: Sphere.LEADERSHIP,
                cardSetKey: CardSet.SHADOWS_OF_MIRKWOOD,
                cardSubsetKey: CardSubset.SOM4_THE_HILLS_OF_EMYN_MUIL,
                value: "rearGuard",
            },
            "renewedFriendship":
            {
                name: "Renewed Friendship",
                cost: 0,
                sphereKey: Sphere.SPIRIT,
                cardSetKey: CardSet.DWARROWDELF,
                cardSubsetKey: CardSubset.D1_THE_REDHORN_GATE,
                value: "renewedFriendship",
            },
            "rideToRuin":
            {
                name: "Ride to Ruin",
                cost: 1,
                sphereKey: Sphere.SPIRIT,
                cardSetKey: CardSet.SHADOWS_OF_MIRKWOOD,
                cardSubsetKey: CardSubset.SOM4_THE_HILLS_OF_EMYN_MUIL,
                value: "rideToRuin",
            },
            "riskSomeLight":
            {
                name: "Risk Some Light",
                cost: 3,
                sphereKey: Sphere.LORE,
                cardSetKey: CardSet.DWARROWDELF,
                cardSubsetKey: CardSubset.D6_SHADOW_AND_FLAME,
                value: "riskSomeLight",
            },
            "rumourFromTheEarth":
            {
                name: "Rumour from the Earth",
                cost: 0,
                sphereKey: Sphere.LORE,
                cardSetKey: CardSet.SHADOWS_OF_MIRKWOOD,
                cardSubsetKey: CardSubset.SOM6_RETURN_TO_MIRKWOOD,
                value: "rumourFromTheEarth",
            },
            "secondBreakfast":
            {
                name: "Second Breakfast",
                cost: 1,
                sphereKey: Sphere.LEADERSHIP,
                cardSetKey: CardSet.SHADOWS_OF_MIRKWOOD,
                cardSubsetKey: CardSubset.SOM2_CONFLICT_AT_THE_CARROCK,
                value: "secondBreakfast",
            },
            "shadowOfThePast":
            {
                name: "Shadow of the Past",
                cost: 2,
                sphereKey: Sphere.NEUTRAL,
                cardSetKey: CardSet.SHADOWS_OF_MIRKWOOD,
                cardSubsetKey: CardSubset.SOM6_RETURN_TO_MIRKWOOD,
                value: "shadowOfThePast",
            },
            "sneakAttack":
            {
                name: "Sneak Attack",
                cost: 1,
                sphereKey: Sphere.LEADERSHIP,
                cardSetKey: CardSet.CORE,
                value: "sneakAttack",
            },
            "standAndFight":
            {
                name: "Stand and Fight",
                // cost: 1,
                sphereKey: Sphere.SPIRIT,
                cardSetKey: CardSet.CORE,
                value: "standAndFight",
            },
            "straightShot":
            {
                name: "Straight Shot",
                cost: 0,
                sphereKey: Sphere.TACTICS,
                cardSetKey: CardSet.ON_THE_DOORSTEP,
                value: "straightShot",
            },
            "stridersPath":
            {
                name: "Strider's Path",
                cost: 1,
                sphereKey: Sphere.LORE,
                cardSetKey: CardSet.SHADOWS_OF_MIRKWOOD,
                cardSubsetKey: CardSubset.SOM1_THE_HUNT_FOR_GOLLUM,
                value: "stridersPath",
            },
            "swiftStrike":
            {
                name: "Swift Strike",
                cost: 2,
                sphereKey: Sphere.TACTICS,
                cardSetKey: CardSet.CORE,
                value: "swiftStrike",
            },
            "takingInitiative":
            {
                name: "Taking Initiative",
                cost: 0,
                sphereKey: Sphere.LEADERSHIP,
                cardSetKey: CardSet.DWARROWDELF,
                cardSubsetKey: CardSubset.D1_THE_REDHORN_GATE,
                value: "takingInitiative",
            },
            "theEaglesAreComing":
            {
                name: "The Eagles Are Coming!",
                cost: 0,
                sphereKey: Sphere.TACTICS,
                cardSetKey: CardSet.SHADOWS_OF_MIRKWOOD,
                cardSubsetKey: CardSubset.SOM1_THE_HUNT_FOR_GOLLUM,
                value: "theEaglesAreComing",
            },
            "theGaladhrimsGreeting":
            {
                name: "The Galadhrim's Greeting",
                cost: 3,
                sphereKey: Sphere.SPIRIT,
                cardSetKey: CardSet.CORE,
                value: "theGaladhrimsGreeting",
            },
            "theHammerStroke":
            {
                name: "The Hammer-Stroke",
                cost: 2,
                sphereKey: Sphere.TACTICS,
                cardSetKey: CardSet.AGAINST_THE_SHADOW,
                cardSubsetKey: CardSubset.ATS5_THE_BLOOD_OF_GONDOR,
                value: "theHammerStroke",
            },
            "theLuckyNumber":
            {
                name: "The Lucky Number",
                cost: 1,
                sphereKey: Sphere.BAGGINS,
                cardSetKey: CardSet.ON_THE_DOORSTEP,
                value: "theLuckyNumber",
            },
            "theSeeingStone":
            {
                name: "The Seeing-Stone",
                cost: 0,
                sphereKey: Sphere.NEUTRAL,
                cardSetKey: CardSet.THE_VOICE_OF_ISENGARD,
                value: "theSeeingStone",
            },
            "theWizardsVoice":
            {
                name: "The Wizard's Voice",
                cost: 0,
                sphereKey: Sphere.TACTICS,
                cardSetKey: CardSet.THE_VOICE_OF_ISENGARD,
                cardSetNumber: 13,
                // This is spelled wrong at cardgamedb.com
                image: "http://www.cardgamedb.com/forums/uploads/lotr/ffg_the-wizardss-voice-voi.jpg",
                value: "theWizardsVoice",
            },
            "tightenOurBelts":
            {
                name: "Tighten Our Belts",
                cost: 0,
                sphereKey: Sphere.LEADERSHIP,
                cardSetKey: CardSet.THE_RING_MAKER,
                cardSubsetKey: CardSubset.TRM4_THE_NIN_IN_EILPH,
                cardSetNumber: 86,
                value: "tightenOurBelts",
            },
            "timelyAid":
            {
                name: "Timely Aid",
                cost: 4,
                sphereKey: Sphere.LEADERSHIP,
                cardSetKey: CardSet.DWARROWDELF,
                cardSubsetKey: CardSubset.D1_THE_REDHORN_GATE,
                value: "timelyAid",
            },
            "toMeOMyKinsfolk":
            {
                name: "To Me! O My Kinsfolk!",
                cost: 1,
                sphereKey: Sphere.LEADERSHIP,
                cardSetKey: CardSet.ON_THE_DOORSTEP,
                value: "toMeOMyKinsfolk",
            },
            "toTheEyrie":
            {
                name: "To the Eyrie",
                cost: 2,
                sphereKey: Sphere.TACTICS,
                cardSetKey: CardSet.SHADOWS_OF_MIRKWOOD,
                cardSubsetKey: CardSubset.SOM3_A_JOURNEY_TO_RHOSGOBEL,
                value: "toTheEyrie",
            },
            "unseenStrike":
            {
                name: "Unseen Strike",
                cost: 0,
                sphereKey: Sphere.TACTICS,
                cardSetKey: CardSet.DWARROWDELF,
                cardSubsetKey: CardSubset.D1_THE_REDHORN_GATE,
                value: "unseenStrike",
            },
            "valiantSacrifice":
            {
                name: "Valiant Sacrifice",
                cost: 1,
                sphereKey: Sphere.LEADERSHIP,
                cardSetKey: CardSet.CORE,
                value: "valiantSacrifice",
            },
            "weAreNotIdle":
            {
                name: "We Are Not Idle",
                cost: 0,
                sphereKey: Sphere.LEADERSHIP,
                cardSetKey: CardSet.DWARROWDELF,
                cardSubsetKey: CardSubset.D6_SHADOW_AND_FLAME,
                value: "weAreNotIdle",
            },
            "weDoNotSleep":
            {
                name: "We Do Not Sleep",
                cost: 5,
                sphereKey: Sphere.SPIRIT,
                cardSetKey: CardSet.SHADOWS_OF_MIRKWOOD,
                cardSubsetKey: CardSubset.SOM5_THE_DEAD_MARSHES,
                value: "weDoNotSleep",
            },
            "wealthOfGondor":
            {
                name: "Wealth of Gondor",
                cost: 0,
                sphereKey: Sphere.LEADERSHIP,
                cardSetKey: CardSet.HEIRS_OF_NUMENOR,
                value: "wealthOfGondor",
            },
            "wellEquipped":
            {
                name: "Well-Equipped",
                cost: 0,
                sphereKey: Sphere.NEUTRAL,
                cardSetKey: CardSet.AGAINST_THE_SHADOW,
                cardSubsetKey: CardSubset.ATS5_THE_BLOOD_OF_GONDOR,
                value: "wellEquipped",
            },
            "wordOfCommand":
            {
                name: "Word of Command",
                cost: 1,
                sphereKey: Sphere.LORE,
                cardSetKey: CardSet.DWARROWDELF,
                cardSubsetKey: CardSubset.D4_THE_LONG_DARK,
                value: "wordOfCommand",
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
        card.cardSet = CardSet.properties[card.cardSetKey];
        if (card.cardSubsetKey)
        {
            card.cardSubset = CardSubset.properties[card.cardSubsetKey];
        }
        card.cardTypeKey = CardType.EVENT;
        card.cardType = CardType.properties[card.cardTypeKey];
        card.sphere = Sphere.properties[card.sphereKey];

        if (!card.image)
        {
            card.image = ImageNameCreator.create(card);
        }
    });

    if (Object.freeze)
    {
        Object.freeze(EventCard);
    }

    return EventCard;
});

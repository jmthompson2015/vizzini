define([ "CardSet", "CardSubset", "CardType" ], function(CardSet, CardSubset, CardType)
{
    "use strict";
    var ImageNameCreator =
    {
        create: function(card)
        {
            InputValidator.validateNotNull("card", card);

            if (card.cardTypeKey === CardType.QUEST)
            {
                return this.createQuest(card);
            }
            else
            {
                var cardName;

                if (card.shortName)
                {
                    cardName = card.shortName;
                }
                else
                {
                    cardName = this.convert(card.name);
                }

                var cardSet = card.cardSet;
                var cardSubset = card.cardSubset;

                if (!cardSet)
                {
                    var encounterSet = card.encounterSet;
                    if (!encounterSet) { throw "Can't find encounter set for card: " + card.name; }
                    cardSet = CardSet.properties[encounterSet.cardSetKey];
                    cardSubset = CardSubset.properties[encounterSet.cardSubsetKey];
                }

                var cardSetName;

                if (cardSubset && cardSubset.shortName)
                {
                    cardSetName = cardSubset.shortName;

                    if (!cardSetName.startsWith("MEC"))
                    {
                        cardSetName = cardSetName.toLowerCase();
                    }
                }
                else if (cardSet.shortName)
                {
                    cardSetName = cardSet.shortName;
                }
                else
                {
                    cardSetName = this.convert(cardSet.name);
                }

                var description;
                LOGGER.info("cardSubset = " + cardSubset);

                if (cardSetName.startsWith("MEC"))
                {
                    description = cardSetName + "_" + card.cardSetNumber;
                }
                else if (cardSubset && cardSubset.value === CardSubset.TRM1_THE_DUNLAND_TRAP)
                {
                    var cardSubsetName = this.convert(cardSubset.name);
                    LOGGER.info("cardSubsetName = " + cardSubsetName);
                    description = cardName + "_" + cardSubsetName + "_" + card.cardSetNumber;
                }
                else if (cardSubset && cardSubset.value === CardSubset.TRM2_THE_THREE_TRIALS)
                {
                    var cardSubsetName = this.convert(cardSubset.name);
                    LOGGER.info("cardSubsetName = " + cardSubsetName);
                    description = cardName + "-" + cardSubsetName + "-" + card.cardSetNumber;
                }
                else if (cardSubset && cardSubset.value === CardSubset.TRM3_TROUBLE_IN_THARBAD)
                {
                    var cardSubsetName = this.convert(cardSubset.name);
                    LOGGER.info("cardSubsetName = " + cardSubsetName);
                    description = cardName + "-" + cardSubsetName + "-" + card.cardSetNumber;
                }
                else
                {
                    description = cardName + "-" + cardSetName.toLowerCase();
                }

                return "http://www.cardgamedb.com/forums/uploads/lotr/ffg_" + description + ".jpg";
            }
        },

        createQuest: function(card)
        {
            InputValidator.validateNotNull("card", card);

            var cardSetKey = card.encounterSet.cardSubsetKey;

            if (!cardSetKey)
            {
                cardSetKey = card.encounterSet.cardSetKey;
            }

            var cardSetName;

            if (cardSetKey === CardSet.CORE)
            {
                cardSetName = "Core-Set";
            }
            else
            {
                cardSetName = card.encounterSet.name;
                cardSetName = cardSetName.replace(/ /g, "-");
            }

            var cardName = card.name.replace(/ /g, "-") + "-" + card.sequence;

            return "http://s3.amazonaws.com/hallofbeorn-resources/Images/Cards/" + cardSetName + "/" + cardName +
                    ".png";
        },

        convert: function(string)
        {
            var answer = string.toLowerCase();

            answer = this.convertSpace(answer);
            answer = this.removeDiacritic(answer);
            answer = this.removePunctuation(answer);

            return answer;
        },

        convertSpace: function(string)
        {
            return string.replace(/ /g, "-");
        },

        removeDiacritic: function(string)
        {
            var answer = string;

            answer = answer.replace(/[áâä]/g, "a");
            answer = answer.replace(/[éêë]/g, "e");
            answer = answer.replace(/[íîï]/g, "i");
            answer = answer.replace(/[óôö]/g, "o");
            answer = answer.replace(/[úûü]/g, "u");

            return answer;
        },

        removePunctuation: function(string)
        {
            return string.replace(/[,.'!]/g, "");
        },
    };

    return ImageNameCreator;
});

define([ "CardSet" ], function(CardSet)
{
    "use strict";
    var ImageNameCreator =
    {
        create: function(card)
        {
            InputValidator.validateNotNull("card", card);

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
                cardSet = CardSet.properties[encounterSet.cardSet];
            }

            if (card.cardKey === "boromir")
            {
                LOGGER.info("card.cardSetKey = " + card.cardSetKey);
                LOGGER.info("card.cardSubsetKey = " + card.cardSubsetKey);
            }

            var cardSetName;

            if (cardSubset && cardSubset.shortName)
            {
                cardSetName = cardSubset.shortName.toLowerCase();
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

            if (cardSetName.startsWith("MEC"))
            {
                description = cardSetName + "_" + card.cardSetNumber;
            }
            else
            {
                description = cardName + "-" + cardSetName.toLowerCase();
            }

            return "http://www.cardgamedb.com/forums/uploads/lotr/ffg_" + description + ".jpg";
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

            answer = answer.replace(/[áâ]/g, "a");
            answer = answer.replace(/[éê]/g, "e");
            answer = answer.replace(/[íî]/g, "i");
            answer = answer.replace(/[óô]/g, "o");
            answer = answer.replace(/[úû]/g, "u");

            return answer;
        },

        removePunctuation: function(string)
        {
            return string.replace(/[,.'!]/g, "");
        },
    };

    return ImageNameCreator;
});

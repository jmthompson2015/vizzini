define([ "CardSet" ], function(CardSet)
{
    "use strict";
    var ImageNameCreator =
    {
        create: function(card)
        {
            var name;

            if (card.shortName)
            {
                name = card.shortName;
            }
            else
            {
                name = this.convert(card.name);
            }

            var cardSet = CardSet.properties[card.set];

            if (!cardSet)
            {
                var encounterSet = card.encounterSet;
                if (!encounterSet) { throw "Can't find encounter set for card: " + card.name; }
                cardSet = CardSet.properties[encounterSet.cardSet];
            }

            var set;

            if (cardSet.shortName)
            {
                set = cardSet.shortName;
            }
            else
            {
                set = this.convert(cardSet.name);
            }

            return "http://www.cardgamedb.com/forums/uploads/lotr/ffg_" + name + "-" + set + ".jpg";
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

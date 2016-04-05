define([ "TreacheryCard" ], function(TreacheryCard)
{
    "use strict";
    function TreacheryToken(cardKey)
    {
        InputValidator.validateNotNull("cardKey", cardKey);

        this.cardKey = function()
        {
            return cardKey;
        };

        var card = TreacheryCard.properties[cardKey];
        InputValidator.validateNotNull("card", card);

        this.card = function()
        {
            return card;
        };
    }

    TreacheryToken.EVENT = "treachery";

    TreacheryToken.prototype.toString = function()
    {
        return "Treachery " + this.card().name;
    };

    MicroEvent.mixin(TreacheryToken);

    return TreacheryToken;
});

define([ "EventCard" ], function(EventCard)
{
    "use strict";
    function EventToken(cardKey)
    {
        InputValidator.validateNotNull("cardKey", cardKey);

        this.cardKey = function()
        {
            return cardKey;
        };

        var card = EventCard.properties[cardKey];
        InputValidator.validateNotNull("card", card);

        this.card = function()
        {
            return card;
        };
    }

    EventToken.EVENT = "event";

    EventToken.prototype.toString = function()
    {
        return "Event " + this.card().name;
    };

    MicroEvent.mixin(EventToken);

    return EventToken;
});

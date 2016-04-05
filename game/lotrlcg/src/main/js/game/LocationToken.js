define([ "LocationCard", "game/QuestState" ], function(LocationCard, QuestState)
{
    "use strict";
    function LocationToken(cardKey)
    {
        InputValidator.validateNotNull("cardKey", cardKey);

        this.cardKey = function()
        {
            return cardKey;
        };

        var card = LocationCard.properties[cardKey];
        InputValidator.validateNotNull("card", card);

        this.card = function()
        {
            return card;
        };

        var questState = new QuestState();

        this.questState = function()
        {
            return questState;
        };
    }

    LocationToken.EVENT = "location";

    LocationToken.prototype.toString = function()
    {
        return "Location " + this.card().name;
    };

    MicroEvent.mixin(LocationToken);

    return LocationToken;
});

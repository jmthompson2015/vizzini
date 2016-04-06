define([ "LocationCard", "game/QuestState", "game/TokenId" ], function(LocationCard, QuestState, TokenId)
{
    "use strict";
    function LocationToken(cardKey)
    {
        InputValidator.validateNotNull("cardKey", cardKey);

        this.cardKey = function()
        {
            return cardKey;
        };

        var id = TokenId.nextId();

        this.id = function()
        {
            return id;
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

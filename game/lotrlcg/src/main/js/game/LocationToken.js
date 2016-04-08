define([ "LocationCard", "game/CountState", "game/TokenId" ], function(LocationCard, CountState, TokenId)
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

        var progressState = new CountState();

        this.progressState = function()
        {
            return progressState;
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

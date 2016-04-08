define([ "EnemyCard", "game/AttachState", "game/CountState", "game/TokenId" ], function(EnemyCard, AttachState,
        CountState, TokenId)
{
    "use strict";
    function EnemyToken(cardKey)
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

        var card = EnemyCard.properties[cardKey];
        InputValidator.validateNotNull("card", card);

        this.card = function()
        {
            return card;
        };

        var woundState = new CountState();

        var attachState = new AttachState();

        this.attachState = function()
        {
            return attachState;
        };

        this.woundState = function()
        {
            return woundState;
        };
    }

    EnemyToken.EVENT = "enemy";

    EnemyToken.prototype.toString = function()
    {
        return "Enemy " + this.card().name;
    };

    MicroEvent.mixin(EnemyToken);

    return EnemyToken;
});

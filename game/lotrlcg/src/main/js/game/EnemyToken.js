define([ "EnemyCard", "game/AttachmentState", "game/TokenId", "game/WoundState" ], function(EnemyCard, AttachmentState,
        TokenId, WoundState)
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

        var attachmentState = new AttachmentState();
        var woundState = new WoundState();

        this.attachmentState = function()
        {
            return attachmentState;
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

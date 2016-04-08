define([ "QuestCard", "game/CountState", "game/TokenId" ], function(QuestCard, CountState, TokenId)
{
    "use strict";
    function QuestToken(cardKey)
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

        var card = QuestCard.properties[cardKey];
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

    QuestToken.EVENT = "quest";

    QuestToken.prototype.toString = function()
    {
        return "Quest " + this.card().sequence + " " + this.card().name;
    };

    MicroEvent.mixin(QuestToken);

    return QuestToken;
});

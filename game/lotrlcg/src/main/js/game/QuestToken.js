define([ "QuestCard", "game/QuestState", "game/TokenId" ], function(QuestCard, QuestState, TokenId)
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

        var questState = new QuestState();

        this.questState = function()
        {
            return questState;
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

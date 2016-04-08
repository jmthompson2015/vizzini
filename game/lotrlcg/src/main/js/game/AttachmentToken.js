define([ "AttachmentCard", "game/MarkerState", "game/TokenId" ], function(AttachmentCard, MarkerState, TokenId)
{
    "use strict";
    function AttachmentToken(cardKey)
    {
        InputValidator.validateNotNull("cardKey", cardKey);

        this.cardKey = function()
        {
            return cardKey;
        };

        var that = this;
        var id = TokenId.nextId();

        this.id = function()
        {
            return id;
        };

        var card = AttachmentCard.properties[cardKey];
        InputValidator.validateNotNull("card", card);

        this.card = function()
        {
            return card;
        };

        var exhaustState = new MarkerState();
        exhaustState.bind("mark", function()
        {
            that.trigger("change");
        });

        this.exhaustState = function()
        {
            return exhaustState;
        };

        var owner;

        this.owner = function(newValue)
        {
            if (newValue !== undefined)
            {
                owner = newValue;
            }

            return owner;
        };
    }

    AttachmentToken.EVENT = "attachment";

    AttachmentToken.prototype.toString = function()
    {
        return "Attachment " + this.card().name;
    };

    MicroEvent.mixin(AttachmentToken);

    return AttachmentToken;
});

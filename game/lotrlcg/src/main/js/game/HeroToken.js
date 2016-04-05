define([ "HeroCard", "game/AttachmentState", "game/AttackerState", "game/DefenderState", "game/ExhaustState",
        "game/QuesterState", "game/ResourceState", "game/WoundState" ], function(HeroCard, AttachmentState,
        AttackerState, DefenderState, ExhaustState, QuesterState, ResourceState, WoundState)
{
    "use strict";
    function HeroToken(cardKey)
    {
        InputValidator.validateNotNull("cardKey", cardKey);

        this.cardKey = function()
        {
            return cardKey;
        };

        var card = HeroCard.properties[cardKey];
        InputValidator.validateNotNull("card", card);

        this.card = function()
        {
            return card;
        };

        var attachmentState = new AttachmentState();
        var attackerState = new AttackerState();
        var defenderState = new DefenderState();
        var exhaustState = new ExhaustState();
        var questerState = new QuesterState();
        var resourceState = new ResourceState(card.sphere);
        var woundState = new WoundState();

        this.attachmentState = function()
        {
            return attachmentState;
        };

        this.attackerState = function()
        {
            return attackerState;
        };

        this.defenderState = function()
        {
            return defenderState;
        };

        this.exhaustState = function()
        {
            return exhaustState;
        };

        this.questerState = function()
        {
            return questerState;
        };

        this.resourceState = function()
        {
            return resourceState;
        };

        this.woundState = function()
        {
            return woundState;
        };
    }

    HeroToken.EVENT = "hero";

    HeroToken.prototype.toString = function()
    {
        return "Hero " + this.card().name;
    };

    MicroEvent.mixin(HeroToken);

    return HeroToken;
});

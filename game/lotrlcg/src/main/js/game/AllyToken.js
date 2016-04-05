define([ "AllyCard", "game/AttackerState", "game/DefenderState", "game/ExhaustState", "game/QuesterState",
        "game/WoundState" ], function(AllyCard, AttackerState, DefenderState, ExhaustState, QuesterState, WoundState)
{
    "use strict";
    function AllyToken(cardKey)
    {
        InputValidator.validateNotNull("cardKey", cardKey);

        this.cardKey = function()
        {
            return cardKey;
        };

        var card = AllyCard.properties[cardKey];
        InputValidator.validateNotNull("card", card);

        this.card = function()
        {
            return card;
        };

        var attackerState = new AttackerState();
        var defenderState = new DefenderState();
        var exhaustState = new ExhaustState();
        var questerState = new QuesterState();
        var woundState = new WoundState();

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

        this.woundState = function()
        {
            return woundState;
        };
    }

    AllyToken.EVENT = "ally";

    AllyToken.prototype.toString = function()
    {
        return "Ally " + this.card().name;
    };

    MicroEvent.mixin(AllyToken);

    return AllyToken;
});

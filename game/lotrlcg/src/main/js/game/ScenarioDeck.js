define(function()
{
    "use strict";
    function ScenarioDeck(questTokens, encounterTokens)
    {
        InputValidator.validateNotNull("questTokens", questTokens);
        InputValidator.validateNotNull("encounterTokens", encounterTokens);

        this.questTokens = function()
        {
            return questTokens;
        };

        this.encounterTokens = function()
        {
            return encounterTokens;
        };

        var drawPile = [];
        var discardPile = [];

        this.draw = function()
        {
            return drawPile.shift();
        };

        this.discard = function(encounterToken)
        {
            discardPile.push(encounterToken);
        };

        this.shuffle = function()
        {
            drawPile.vizziniShuffle();
        };

        // Setup.
        drawPile.vizziniAddAll(encounterTokens);
    }

    return ScenarioDeck;
});

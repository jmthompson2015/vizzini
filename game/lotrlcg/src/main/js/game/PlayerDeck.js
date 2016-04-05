define(function()
{
    "use strict";
    function PlayerDeck(heroTokens, playerTokens)
    {
        InputValidator.validateNotNull("heroTokens", heroTokens);
        InputValidator.validateNotNull("playerTokens", playerTokens);

        this.heroTokens = function()
        {
            return heroTokens;
        };

        this.playerTokens = function()
        {
            return playerTokens;
        };

        var drawPile = [];
        var discardPile = [];

        this.draw = function()
        {
            return drawPile.shift();
        };

        this.discard = function(playerToken)
        {
            discardPile.push(playerToken);
        };

        this.shuffle = function()
        {
            drawPile.vizziniShuffle();
        };

        // Setup.
        drawPile.vizziniAddAll(playerTokens);
    }

    return PlayerDeck;
});

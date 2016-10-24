define(function()
{
    "use strict";
    function PlayerDeck(heroInstances, playerInstances)
    {
        InputValidator.validateNotNull("heroInstances", heroInstances);
        InputValidator.validateNotNull("playerInstances", playerInstances);

        this.heroInstances = function()
        {
            return heroInstances;
        };

        this.playerInstances = function()
        {
            return playerInstances;
        };
    }

    return PlayerDeck;
});

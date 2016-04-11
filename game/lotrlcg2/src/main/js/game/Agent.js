define(function()
{
    "use strict";
    var Agent = {};
    
    Agent.create = function(id, name, heroes, playerCards)
    {
        InputValidator.validateNotNull("id", id);
        InputValidator.validateNotNull("name", name);
        InputValidator.validateNotNull("heroes", heroes);
        InputValidator.validateNotNull("playerCards", playerCards);

        var threatLevel = 0;

        heroes.forEach(function(hero)
        {
            threatLevel += hero.card.threatCost;
        });

        var playArea = [];
        playArea.vizziniAddAll(heroes);

        return (
        {
            id: id,
            name: name,
            playerCards: playerCards,
            threatLevel: threatLevel,

            engagementArea: [],
            playArea: playArea,
            hand: [],
        });
    };

    return Agent;
});

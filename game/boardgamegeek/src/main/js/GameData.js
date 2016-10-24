define(function()
{
    "use strict";
    var GameData = {};

    GameData.createGameData = function(gameSummary, gameDetail)
    {
        InputValidator.validateNotNull("gameSummary", gameSummary);
        // InputValidator.validateNotNull("gameDetail", gameDetail);

        var answer = {
            id: gameSummary.id,
            boardGameRank: gameSummary.boardGameRank,
            title: gameSummary.title,
            geekRating: gameSummary.geekRating,

            designers: [],
            categories: [],
            mechanics: [],
        };

        if (gameDetail)
        {
            var designers = (gameDetail.designers ? gameDetail.designers : []);
            var categories = (gameDetail.categories ? gameDetail.categories : []);
            var mechanics = (gameDetail.mechanics ? gameDetail.mechanics : []);

            answer.title = gameDetail.title;
            answer.designers = designers;
            answer.yearPublished = gameDetail.yearPublished;
            answer.minPlayers = gameDetail.minPlayers;
            answer.maxPlayers = gameDetail.maxPlayers;
            answer.bestWithPlayers = gameDetail.bestWithPlayers;
            answer.minPlayTime = gameDetail.minPlayTime;
            answer.maxPlayTime = gameDetail.maxPlayTime;
            answer.categories = categories;
            answer.mechanics = mechanics;
        }

        return answer;
    };

    return GameData;
});

define(function()
{
    "use strict";
    var GameData = {};

    GameData.createGameData = function(gameSummary, gameDetail, usernames)
    {
        InputValidator.validateNotNull("gameSummary", gameSummary);
        InputValidator.validateNotNull("gameDetail", gameDetail);
        // usernames optional.
        if (gameSummary.id !== gameDetail.id)
        {
            throw "ID mismatch: gameSummary.id = " + gameSummary.id + " gameDetail.id = " + gameDetail.id;
        }

        var answer = {};

        answer.id = gameSummary.id;
        answer.boardGameRank = gameSummary.boardGameRank;
        answer.geekRating = gameSummary.geekRating;

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
        answer.averageWeight = gameDetail.averageWeight;
        answer.categories = categories;
        answer.mechanics = mechanics;

        answer.usernames = usernames;

        return answer;
    };

    return GameData;
});

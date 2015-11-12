function GameDatabase(numPages)
{
    var that = this;
    var SUMMARIES_CACHE_TIME = 10 * 60 * 1000; // 10 minutes in milliseconds
    var DETAILS_CACHE_TIME = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

    var filters = [];
    var gameSummariesTimestamp;
    var gameSummaries = [];
    var gameDetailsTimestamp;
    var gameDetails = [];

    this.getGameDetails = function()
    {
        return gameDetails;
    }

    this.getGameSummaries = function()
    {
        var answer;

        if (filters && filters.length > 0)
        {
            answer = gameSummaries.filter(function(gameSummary)
            {
                var gameDetail = that.findGameDetailById(gameSummary.id);
                var passes = true;

                filters.forEach(function(filter)
                {
                    passes = passes && filter.passes(gameSummary, gameDetail);
                });

                return passes;
            });
        }
        else
        {
            answer = gameSummaries;
        }

        LOGGER.info("GameDatabase.getGameSummaries() answer.length = " + answer.length);

        return answer;
    }

    this.load = function()
    {
        // Check the timestamp in localStorage.
        if (localStorage.gameSummariesTimestamp)
        {
            gameSummariesTimestamp = parseInt(localStorage.gameSummariesTimestamp);
        }

        LOGGER.debug("localStorage gameSummariesTimestamp = " + gameSummariesTimestamp);

        if (localStorage.gameDetailsTimestamp)
        {
            gameDetailsTimestamp = parseInt(localStorage.gameDetailsTimestamp);
        }

        LOGGER.debug("localStorage gameDetailsTimestamp = " + gameDetailsTimestamp);

        if (gameDetailsTimestamp && Date.now() < gameDetailsTimestamp + DETAILS_CACHE_TIME)
        {
            // Load from localStorage.
            var newGameDetails = JSON.parse(localStorage.gameDetails);
            LOGGER.debug("newGameDetails loaded from localStorage newGameDetails.length = " + newGameDetails.length);
            this.receiveDetailData(newGameDetails);
        }
        else
        {
            gameDetailsTimestamp = undefined;
        }

        if (gameSummariesTimestamp && Date.now() < gameSummariesTimestamp + SUMMARIES_CACHE_TIME)
        {
            // Load from localStorage.
            var newGameSummaries = JSON.parse(localStorage.gameSummaries);
            LOGGER.debug("newGameSummaries loaded from localStorage newGameSummaries.length = "
                    + newGameSummaries.length);
            this.receiveSummaryData(newGameSummaries);
        }
        else
        {
            gameSummariesTimestamp = undefined;
        }

        if (!gameSummaries || gameSummaries.length === 0)
        {
            // Load from the internet.
            for (var i = 1; i <= numPages; i++)
            {
                var summaryFetcher = new GameSummaryFetcher(i);
                summaryFetcher.bind("dataLoaded", this.receiveSummaryData);
                summaryFetcher.fetchData();
            }

            LOGGER.debug("gameSummaries loading from the internet");
        }

        if (!gameDetails)
        {
            gameDetails = [];
        }
    }

    this.receiveDetailData = function(newGameDetails)
    {
        LOGGER.trace("GameDatabase.receiveDetailData() start");

        gameDetails.vizziniAddAll(newGameDetails);
        that.trigger("dataLoaded", that);

        LOGGER.trace("GameDatabase.receiveDetailData() end");
    }

    this.receiveSummaryData = function(newGameSummaries)
    {
        LOGGER.trace("GameDatabase.receiveSummaryData() start");

        gameSummaries.vizziniAddAll(newGameSummaries);
        that.trigger("dataLoaded", that);

        // Fetch a game detail for each game summary.
        var needGameDetailIds = [];
        newGameSummaries.forEach(function(gameSummary)
        {
            var gameDetail = that.findGameDetailById(gameSummary.id);

            if (!gameDetail)
            {
                needGameDetailIds.push(gameSummary.id);
            }
        });

        if (needGameDetailIds.length > 0)
        {
            var numPerCall = 20;
            var count = Math.ceil(needGameDetailIds.length / numPerCall);

            for (var i = 0; i < count; i++)
            {
                var start = numPerCall * i;
                var max = Math.min(numPerCall, needGameDetailIds.length);
                var end = start + max;
                var detailFetcher = new GameDetailFetcher(needGameDetailIds.slice(start, end));
                detailFetcher.bind("dataLoaded", that.receiveDetailData);
                detailFetcher.fetchData();
            }
        }

        LOGGER.trace("GameDatabase.receiveSummaryData() end");
    }

    this.setFilters = function(newFilters)
    {
        LOGGER.info("GameDatabase.setFilters() start");

        filters = newFilters;
        that.trigger("dataLoaded", that);

        LOGGER.info("GameDatabase.setFilters() end");
    }

    this.store = function()
    {
        // Store to local storage.
        if (gameDetails.length > 0)
        {
            if (!gameDetailsTimestamp)
            {
                gameDetailsTimestamp = Date.now();
            }
            localStorage.gameDetailsTimestamp = gameDetailsTimestamp;
            localStorage.gameDetails = JSON.stringify(gameDetails);
            LOGGER.debug("gameDetails stored to localStorage at " + (new Date()));
            LOGGER.debug("gameDetails.length = " + gameDetails.length);
        }

        if (gameSummaries.length > 0)
        {
            if (!gameSummariesTimestamp)
            {
                gameSummariesTimestamp = Date.now();
            }
            localStorage.gameSummariesTimestamp = gameSummariesTimestamp;
            localStorage.gameSummaries = JSON.stringify(gameSummaries);
            LOGGER.debug("gameSummaries stored to localStorage at " + (new Date()));
            LOGGER.debug("gameSummaries.length = " + gameSummaries.length);
        }
    }
}

MicroEvent.mixin(GameDatabase);

GameDatabase.prototype.findGameDetailById = function(id)
{
    return this.findItemById(this.getGameDetails(), id);
}

GameDatabase.prototype.findGameSummaryById = function(id)
{
    return this.findItemById(this.getGameSummaries(), id);
}

GameDatabase.prototype.findItemById = function(array, id)
{
    var answer;

    for (var i = 0; i < array.length; i++)
    {
        var item = array[i];

        if (item.id === id)
        {
            answer = item;
            break;
        }
    }

    return answer;
}

GameDatabase.newFilter = function(columnKey, isMinEnabled, minValue, isMaxEnabled, maxValue)
{
    var answer =
    {
        columnKey: columnKey,
        isMinEnabled: isMinEnabled,
        minValue: minValue,
        isMaxEnabled: isMaxEnabled,
        maxValue: maxValue,
    };

    answer.passes = function(gameSummary, gameDetail)
    {
        var value = gameSummary[columnKey];

        if (!value && gameDetail)
        {
            value = gameDetail[columnKey];
        }

        return (!isMinEnabled || minValue <= value) && (!isMaxEnabled || value <= maxValue);
    }

    return answer;
}

GameDatabase.newGameDetail = function(id, title, yearPublished, minPlayers, maxPlayers, minPlayTime, maxPlayTime,
        mechanics)
{
    return (
    {
        id: parseInt(id),
        title: title,
        yearPublished: parseInt(yearPublished),
        minPlayers: parseInt(minPlayers),
        maxPlayers: parseInt(maxPlayers),
        minPlayTime: parseInt(minPlayTime),
        maxPlayTime: parseInt(maxPlayTime),
        mechanics: mechanics,
    });
}

GameDatabase.newGameSummary = function(id, title, boardGameRank, geekRatingDisplay, averageRatingDisplay, numVoters)
{
    return (
    {
        id: parseInt(id),
        title: title,
        boardGameRank: parseInt(boardGameRank),
        geekRating: parseFloat(geekRatingDisplay),
        geekRatingDisplay: geekRatingDisplay,
        averageRating: parseFloat(averageRatingDisplay),
        averageRatingDisplay: averageRatingDisplay,
        numVoters: parseInt(numVoters),
    });
}

GameDatabase.newMechanic = function(id, name)
{
    return (
    {
        id: parseInt(id),
        name: name,
    });
}

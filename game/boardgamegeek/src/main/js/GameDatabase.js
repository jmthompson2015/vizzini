function GameDatabase(numPages)
{
    var that = this;
    var SUMMARIES_CACHE_TIME = 30 * 60 * 1000; // 30 minutes in milliseconds
    var DETAILS_CACHE_TIME = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

    var filters = [];
    var gameSummariesTimestamp;
    var gameSummaryMap = {};
    var gameDetailsTimestamp;
    var gameDetailMap = {};

    this.getGameDetailMap = function()
    {
        return gameDetailMap;
    }

    this.getGameSummaryMap = function()
    {
        return gameSummaryMap;
    }

    this.getGameSummaries = function()
    {
        var answer;

        if (filters && filters.length > 0)
        {
            var gameSummaries = this.objectValues(gameSummaryMap);
            answer = gameSummaries.filter(function(gameSummary)
            {
                var gameDetail = that.findGameDetailById(gameSummary.id);
                var passes = true;

                filters.forEach(function(filter)
                {
                    passes = passes && GameDatabase.passes(filter, gameSummary, gameDetail);
                });

                return passes;
            });
        }
        else
        {
            answer = this.objectValues(gameSummaryMap);
        }

        answer.sort(function(a, b)
        {
            return a.boardGameRank - b.boardGameRank;
        });

        LOGGER.trace("GameDatabase.getGameSummaries() answer.length = " + answer.length);

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
            var newGameDetailMap = JSON.parse(localStorage.gameDetailMap);
            LOGGER.debug("newGameDetailMap loaded from localStorage");
            this.receiveDetailData(newGameDetailMap);
        }
        else
        {
            gameDetailsTimestamp = undefined;
        }

        if (gameSummariesTimestamp && Date.now() < gameSummariesTimestamp + SUMMARIES_CACHE_TIME)
        {
            // Load from localStorage.
            var newGameSummaryMap = JSON.parse(localStorage.gameSummaryMap);
            LOGGER.debug("newGameSummaryMap loaded from localStorage");
            this.receiveSummaryData(newGameSummaryMap);
        }
        else
        {
            gameSummariesTimestamp = undefined;
        }

        if (!gameSummaryMap || this.objectIsEmpty(gameSummaryMap))
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

        if (!gameDetailMap)
        {
            gameDetailMap = {};
        }
    }

    this.receiveDetailData = function(newGameDetailMap)
    {
        LOGGER.trace("GameDatabase.receiveDetailData() start");

        var keys = Object.keys(newGameDetailMap);
        for (var i = 0, len = keys.length; i < len; i++)
        {
            var gameDetail = newGameDetailMap[keys[i]];
            gameDetailMap[gameDetail.id] = gameDetail;
        }
        that.trigger("dataLoaded", that);

        LOGGER.trace("GameDatabase.receiveDetailData() end");
    }

    this.receiveSummaryData = function(newGameSummaryMap)
    {
        LOGGER.trace("GameDatabase.receiveSummaryData() start");

        var keys = Object.keys(newGameSummaryMap);
        for (var i = 0, len = keys.length; i < len; i++)
        {
            var gameSummary = newGameSummaryMap[keys[i]];
            gameSummaryMap[gameSummary.id] = gameSummary;
        }
        that.trigger("dataLoaded", that);

        // Fetch a game detail for each game summary.
        var needGameDetailIds = [];
        for (var i = 0, len = keys.length; i < len; i++)
        {
            var gameSummary = newGameSummaryMap[keys[i]];
            var gameDetail = that.findGameDetailById(gameSummary.id);

            if (!gameDetail)
            {
                needGameDetailIds.push(gameSummary.id);
            }
        }

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
        LOGGER.trace("GameDatabase.setFilters() start");

        filters = newFilters;
        that.trigger("dataLoaded", that);

        LOGGER.trace("GameDatabase.setFilters() end");
    }

    this.store = function()
    {
        // Store to local storage.
        if (!this.objectIsEmpty(gameDetailMap))
        {
            if (!gameDetailsTimestamp)
            {
                gameDetailsTimestamp = Date.now();
            }
            localStorage.gameDetailsTimestamp = gameDetailsTimestamp;
            localStorage.gameDetailMap = JSON.stringify(gameDetailMap);
            LOGGER.debug("gameDetails stored to localStorage with timestamp " + gameDetailsTimestamp);
        }

        if (!this.objectIsEmpty(gameSummaryMap))
        {
            if (!gameSummariesTimestamp)
            {
                gameSummariesTimestamp = Date.now();
            }
            localStorage.gameSummariesTimestamp = gameSummariesTimestamp;
            localStorage.gameSummaryMap = JSON.stringify(gameSummaryMap);
            LOGGER.debug("gameSummaryMap stored to localStorage with timestamp " + gameSummariesTimestamp);
        }
    }
}

MicroEvent.mixin(GameDatabase);

GameDatabase.prototype.findGameDetailById = function(id)
{
    return this.getGameDetailMap()[id];
}

GameDatabase.prototype.findGameSummaryById = function(id)
{
    return this.getGameSummaryMap()[id];
}

/*
 * @see <a href="http://stackoverflow.com/questions/4994201/is-object-empty">Is
 *      object empty?</a>
 */
GameDatabase.prototype.objectIsEmpty = function(obj)
{
    // null and undefined are "empty"
    if (obj == null) { return true; }

    // Assume if it has a length property with a non-zero value that that
    // property is correct.
    if (obj.length > 0) { return false; }
    if (obj.length === 0) { return true; }

    // Otherwise, does it have any properties of its own? Note that this doesn't
    // handle toString and valueOf enumeration bugs in IE < 9
    if (Object.getOwnPropertyNames(obj).length > 0) { return false; }

    return true;
}

/*
 * @see <a
 *      href="http://stackoverflow.com/questions/1718777/how-might-i-extract-the-property-values-of-a-javascript-object-into-an-array">How
 *      might I extract the property values of a JavaScript object into an
 *      array?</a>
 */
GameDatabase.prototype.objectValues = function(obj)
{
    var answer = [];
    var keys = Object.keys(obj);

    for (var i = 0, len = keys.length; i < len; i++)
    {
        answer.push(obj[keys[i]]);
    }

    return answer;
}

GameDatabase.newEntity = function(id, name)
{
    return (
    {
        id: parseInt(id),
        name: name,
    });
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

    return answer;
}

GameDatabase.newGameDetail = function(id, title, designers, yearPublished, minPlayers, maxPlayers, minPlayTime,
        maxPlayTime, categories, mechanics)
{
    return (
    {
        id: parseInt(id),
        title: title,
        designers: designers,
        yearPublished: parseInt(yearPublished),
        minPlayers: parseInt(minPlayers),
        maxPlayers: parseInt(maxPlayers),
        minPlayTime: parseInt(minPlayTime),
        maxPlayTime: parseInt(maxPlayTime),
        categories: categories,
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

GameDatabase.passes = function(filter, gameSummary, gameDetail)
{
    var value = gameSummary[filter.columnKey];

    if (!value && gameDetail)
    {
        value = gameDetail[filter.columnKey];
    }

    return (!filter.isMinEnabled || filter.minValue <= value) && (!filter.isMaxEnabled || value <= filter.maxValue);
}

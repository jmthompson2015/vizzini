define([ "GameDetailFetcher", "GameSummaryFetcher" ], function(GameDetailFetcher, GameSummaryFetcher)
{
    function GameDatabase(numPages)
    {
        var that = this;
        var SUMMARIES_CACHE_TIME = 30 * 60 * 1000; // 30 minutes in milliseconds
        var DETAILS_CACHE_TIME = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
        var ENTITIES_CACHE_TIME = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

        var filters = [];
        var gameSummariesTimestamp;
        var gameSummaryMap = {};
        var gameDetailsTimestamp;
        var gameDetailMap = {};
        var entitiesTimestamp;
        var entityMap = {};

        this.getCategories = function()
        {
            return getEntities("boardgamecategory");
        }

        this.getDesigners = function()
        {
            return getEntities("boardgamedesigner");
        }

        this.getEntityMap = function()
        {
            return entityMap;
        }

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
                var gameSummaries = GameDatabase.objectValues(gameSummaryMap);
                answer = gameSummaries.filter(function(gameSummary)
                {
                    var gameDetail = that.findGameDetailById(gameSummary.id);

                    return GameDatabase.passesFilters(filters, gameSummary, gameDetail);
                });
            }
            else
            {
                answer = GameDatabase.objectValues(gameSummaryMap);
            }

            answer.sort(function(a, b)
            {
                return a.boardGameRank - b.boardGameRank;
            });

            LOGGER.trace("GameDatabase.getGameSummaries() answer.length = " + answer.length);

            return answer;
        }

        this.getMechanics = function()
        {
            return getEntities("boardgamemechanic");
        }

        this.load = function()
        {
            if (localStorage.entitiesTimestamp)
            {
                var newEntitiesTimestamp = parseInt(localStorage.entitiesTimestamp);
                LOGGER.debug("localStorage newEntitiesTimestamp = " + newEntitiesTimestamp);

                if (newEntitiesTimestamp && Date.now() < newEntitiesTimestamp + ENTITIES_CACHE_TIME)
                {
                    // Load from localStorage.
                    var newEntityMap = JSON.parse(localStorage.entityMap);
                    LOGGER.debug("newEntityMap loaded from localStorage");
                    entitiesTimestamp = newEntitiesTimestamp;
                    GameDatabase.objectMerge(entityMap, newEntityMap);
                }
            }

            if (localStorage.gameDetailsTimestamp)
            {
                var newGameDetailsTimestamp = parseInt(localStorage.gameDetailsTimestamp);
                LOGGER.debug("localStorage newGameDetailsTimestamp = " + newGameDetailsTimestamp);

                if (newGameDetailsTimestamp && Date.now() < newGameDetailsTimestamp + DETAILS_CACHE_TIME)
                {
                    // Load from localStorage.
                    var newGameDetailMap = JSON.parse(localStorage.gameDetailMap);
                    LOGGER.debug("newGameDetailMap loaded from localStorage");
                    gameDetailsTimestamp = newGameDetailsTimestamp;
                    GameDatabase.objectMerge(gameDetailMap, newGameDetailMap);
                }
            }

            if (localStorage.gameSummariesTimestamp)
            {
                var newGameSummariesTimestamp = parseInt(localStorage.gameSummariesTimestamp);
                LOGGER.debug("localStorage newGameSummariesTimestamp = " + newGameSummariesTimestamp);

                if (newGameSummariesTimestamp && Date.now() < newGameSummariesTimestamp + SUMMARIES_CACHE_TIME)
                {
                    // Load from localStorage.
                    var newGameSummaryMap = JSON.parse(localStorage.gameSummaryMap);
                    LOGGER.debug("newGameSummaryMap loaded from localStorage");
                    gameSummariesTimestamp = newGameSummariesTimestamp;
                    GameDatabase.objectMerge(gameSummaryMap, newGameSummaryMap);
                    this.receiveSummaryData(newGameSummaryMap);
                }
            }

            if (!gameSummaryMap || GameDatabase.objectIsEmpty(gameSummaryMap))
            {
                // Load from the internet.
                for (var i = 1; i <= numPages; i++)
                {
                    var summaryFetcher = new GameSummaryFetcher(this, i);
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

        this.newEntity = function(type, id, name)
        {
            var answer = entityMap[id];

            if (answer)
            {
                // Increment count.
                answer.count++;
            }
            else
            {
                answer =
                {
                    type: type,
                    id: parseInt(id),
                    name: name,
                    count: 1,
                };

                entityMap[answer.id] = answer;
            }

            return answer;
        }

        this.newGameDetail = function(id, title, designers, yearPublished, minPlayers, maxPlayers, bestWithPlayers,
                minPlayTime, maxPlayTime, categories, mechanics)
        {
            var answer = gameDetailMap[id];

            if (!answer)
            {
                answer =
                {
                    id: parseInt(id),
                    title: title,
                    designers: designers,
                    yearPublished: parseInt(yearPublished),
                    minPlayers: parseInt(minPlayers),
                    maxPlayers: parseInt(maxPlayers),
                    bestWithPlayers: parseInt(bestWithPlayers),
                    minPlayTime: parseInt(minPlayTime),
                    maxPlayTime: parseInt(maxPlayTime),
                    categories: categories,
                    mechanics: mechanics,
                };

                gameDetailMap[answer.id] = answer;
            }

            return answer;
        }

        this.newGameSummary = function(id, title, boardGameRank, geekRatingDisplay, averageRatingDisplay, numVoters)
        {
            var answer = gameSummaryMap[id];

            if (!answer)
            {
                answer =
                {
                    id: parseInt(id),
                    title: title,
                    boardGameRank: parseInt(boardGameRank),
                    geekRating: parseFloat(geekRatingDisplay),
                    geekRatingDisplay: geekRatingDisplay,
                    averageRating: parseFloat(averageRatingDisplay),
                    averageRatingDisplay: averageRatingDisplay,
                    numVoters: parseInt(numVoters),
                };

                gameSummaryMap[answer.id] = answer;
            }

            return answer;
        }

        this.receiveDetailData = function(newGameDetailMap)
        {
            LOGGER.trace("GameDatabase.receiveDetailData() start");

            that.store();
            that.trigger("dataLoaded", that);

            LOGGER.trace("GameDatabase.receiveDetailData() end");
        }

        this.receiveSummaryData = function(newGameSummaryMap)
        {
            LOGGER.trace("GameDatabase.receiveSummaryData() start");

            that.store();
            that.trigger("dataLoaded", that);

            // Fetch a game detail for each game summary.
            var needGameDetailIds = [];
            var keys = Object.keys(newGameSummaryMap);
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
                    var detailFetcher = new GameDetailFetcher(that, needGameDetailIds.slice(start, end));
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
            if (!GameDatabase.objectIsEmpty(entityMap))
            {
                if (!entitiesTimestamp)
                {
                    entitiesTimestamp = Date.now();
                }
                localStorage.entitiesTimestamp = entitiesTimestamp;
                localStorage.entityMap = JSON.stringify(entityMap);
                LOGGER.debug("entityMap stored to localStorage with timestamp " + entitiesTimestamp);
            }

            if (!GameDatabase.objectIsEmpty(gameDetailMap))
            {
                if (!gameDetailsTimestamp)
                {
                    gameDetailsTimestamp = Date.now();
                }
                localStorage.gameDetailsTimestamp = gameDetailsTimestamp;
                localStorage.gameDetailMap = JSON.stringify(gameDetailMap);
                LOGGER.debug("gameDetailMap stored to localStorage with timestamp " + gameDetailsTimestamp);
            }

            if (!GameDatabase.objectIsEmpty(gameSummaryMap))
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

        function getEntities(type)
        {
            var answer = [];

            var keys = Object.keys(entityMap);
            for (var i = 0, len = keys.length; i < len; i++)
            {
                var entity = entityMap[keys[i]];
                if (entity.type === type)
                {
                    answer.push(entity);
                }
            }

            answer.sort(function(a, b)
            {
                var answer = b.count - a.count;

                if (answer === 0)
                {
                    if (a.name > b.name)
                    {
                        answer = 1;
                    }
                    else if (a.name < b.name)
                    {
                        answer = -1;
                    }
                    else
                    {
                        answer = 0;
                    }
                }
                return answer;
            });

            return answer;
        }
    }

    MicroEvent.mixin(GameDatabase);

    GameDatabase.prototype.findEntityById = function(id)
    {
        return this.getEntityMap()[id];
    }

    GameDatabase.prototype.findGameDetailById = function(id)
    {
        return this.getGameDetailMap()[id];
    }

    GameDatabase.prototype.findGameSummaryById = function(id)
    {
        return this.getGameSummaryMap()[id];
    }

    GameDatabase.passesFilters = function(filters, gameSummary, gameDetail)
    {
        var passes = true;

        filters.forEach(function(filter)
        {
            passes = passes && filter.passes(gameSummary, gameDetail);
        });

        return passes;
    }

    /*
     * @see <a href="http://stackoverflow.com/questions/4994201/is-object-empty">Is object empty?</a>
     */
    GameDatabase.objectIsEmpty = function(obj)
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

    GameDatabase.objectMerge = function(a, b)
    {
        var keys = Object.keys(b);

        for (var i = 0, len = keys.length; i < len; i++)
        {
            var key = keys[i];
            a[key] = b[key];
        }
    }

    /*
     * @see <a
     *      href="http://stackoverflow.com/questions/1718777/how-might-i-extract-the-property-values-of-a-javascript-object-into-an-array">How
     *      might I extract the property values of a JavaScript object into an array?</a>
     */
    GameDatabase.objectValues = function(obj)
    {
        var answer = [];
        var keys = Object.keys(obj);

        for (var i = 0, len = keys.length; i < len; i++)
        {
            answer.push(obj[keys[i]]);
        }

        return answer;
    }

    return GameDatabase;
});

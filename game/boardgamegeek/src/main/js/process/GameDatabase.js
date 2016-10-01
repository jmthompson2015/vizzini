define([ "process/Action", "process/GameDetailFetcher", "process/GameSummaryFetcher", "process/Reducer" ], function(
        Action, GameDetailFetcher, GameSummaryFetcher, Reducer)
{
    function GameDatabase(numPages)
    {
        InputValidator.validateInRange("numPages", numPages, 1, 10);

        var that = this;
        var SUMMARIES_CACHE_TIME = 30 * 60 * 1000; // 30 minutes in milliseconds
        var DETAILS_CACHE_TIME = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
        var ENTITIES_CACHE_TIME = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

        var store = Redux.createStore(Reducer.root);
        store.dispatch(Action.setGameDatabase(this));

        this.store = function()
        {
            return store;
        };

        this.entitiesTimestamp = function()
        {
            return store.getState().entitiesTimestamp;
        }

        this.filters = function()
        {
            return store.getState().filters;
        };

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
            return store.getState().entityMap;
        }

        this.getGameDetailMap = function()
        {
            return store.getState().gameDetailMap;
        }

        this.gameDetailsTimestamp = function()
        {
            return store.getState().gameDetailsTimestamp;
        }

        this.gameSummariesTimestamp = function()
        {
            return store.getState().gameSummariesTimestamp;
        }

        this.getGameSummaryMap = function()
        {
            return store.getState().gameSummaryMap;
        }

        this.getGameSummaries = function()
        {
            var answer;
            var filters = this.filters();
            var gameSummaryMap = this.getGameSummaryMap();

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

        this.loadFromLocalStorage = function()
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
                    store.dispatch(Action.setEntitiesTimestamp(newEntitiesTimestamp));
                    store.dispatch(Action.mergeEntityMap(newEntityMap));
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
                    store.dispatch(Action.setGameDetailsTimestamp(newGameDetailsTimestamp));
                    store.dispatch(Action.mergeGameDetailMap(newGameDetailMap));
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
                    store.dispatch(Action.setGameSummariesTimestamp(newGameSummariesTimestamp));
                    store.dispatch(Action.mergeGameSummaryMap(newGameSummaryMap));
                }
            }

            if (!this.getGameSummaryMap() || GameDatabase.objectIsEmpty(this.getGameSummaryMap()))
            {
                // Load from the internet.
                for (var i = 1; i <= numPages; i++)
                {
                    var summaryFetcher = new GameSummaryFetcher(this, i, this.receiveSummaryData.bind(this));
                    summaryFetcher.fetchData();
                }

                LOGGER.debug("gameSummaries loading from the internet");
            }

            if (!this.getGameDetailMap())
            {
                store.dispatch(Action.resetGameDetailMap());
            }
        }

        this.newEntity = function(type, id, name)
        {
            var entityMap = this.getEntityMap();
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
            var gameDetailMap = this.getGameDetailMap();
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
            var gameSummaryMap = this.getGameSummaryMap();
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

            store.dispatch(Action.mergeGameDetailMap(newGameDetailMap));
            that.storeToLocalStorage();

            LOGGER.trace("GameDatabase.receiveDetailData() end");
        }

        this.receiveSummaryData = function(newGameSummaryMap)
        {
            LOGGER.trace("GameDatabase.receiveSummaryData() start");

            store.dispatch(Action.mergeGameSummaryMap(newGameSummaryMap));
            that.storeToLocalStorage();

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
                    var detailFetcher = new GameDetailFetcher(that, needGameDetailIds.slice(start, end),
                            that.receiveDetailData.bind(that));
                    detailFetcher.fetchData();
                }
            }

            LOGGER.trace("GameDatabase.receiveSummaryData() end");
        }

        this.storeToLocalStorage = function()
        {
            if (!GameDatabase.objectIsEmpty(this.getEntityMap()))
            {
                if (!this.entitiesTimestamp())
                {
                    entitiesTimestamp = Date.now();
                    store.dispatch(Action.setEntitiesTimestamp(Date.now()));
                }
                localStorage.entitiesTimestamp = this.entitiesTimestamp();
                localStorage.entityMap = JSON.stringify(this.getEntityMap());
                LOGGER.debug("entityMap stored to localStorage with timestamp " + this.entitiesTimestamp());
            }

            if (!GameDatabase.objectIsEmpty(this.getGameDetailMap()))
            {
                if (!this.gameDetailsTimestamp())
                {
                    store.dispatch(Action.setGameDetailsTimestamp(Date.now()));
                }
                localStorage.gameDetailsTimestamp = this.gameDetailsTimestamp();
                localStorage.gameDetailMap = JSON.stringify(this.getGameDetailMap());
                LOGGER.debug("gameDetailMap stored to localStorage with timestamp " + this.gameDetailsTimestamp());
            }

            if (!GameDatabase.objectIsEmpty(this.getGameSummaryMap()))
            {
                if (!this.gameSummariesTimestamp())
                {
                    store.dispatch(Action.setGameSummariesTimestamp(Date.now()));
                }
                localStorage.gameSummariesTimestamp = this.gameSummariesTimestamp();
                localStorage.gameSummaryMap = JSON.stringify(this.getGameSummaryMap());
                LOGGER.debug("gameSummaryMap stored to localStorage with timestamp " + this.gameSummariesTimestamp());
            }
        }

        function getEntities(type)
        {
            var answer = [];

            var entityMap = that.getEntityMap();
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

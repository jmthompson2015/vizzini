define(["process/Action", "process/GameDetailFetcher", "process/GameSummaryFetcher", "process/Reducer"],
    function(Action, GameDetailFetcher, GameSummaryFetcher, Reducer)
    {
        "use strict";

        function GameDatabase(pageCount)
        {
            InputValidator.validateInRange("pageCount", pageCount, 1, 10);

            var that = this;
            var store = Redux.createStore(Reducer.root);
            var gameSummaryMap = {};
            var gameDetailMap = {};
            var categoryMap = {};
            var designerMap = {};
            var mechanicMap = {};
            store.dispatch(Action.setGameDatabase(this));

            this.pageCount = function()
            {
                return pageCount;
            };

            this.store = function()
            {
                return store;
            };

            this.gameSummaryMap = function()
            {
                return gameSummaryMap;
            };

            this.gameDetailMap = function()
            {
                return gameDetailMap;
            };

            this.categoryMap = function()
            {
                return categoryMap;
            };

            this.designerMap = function()
            {
                return designerMap;
            };

            this.mechanicMap = function()
            {
                return mechanicMap;
            };

            this.entityMap = function(type)
            {
                InputValidator.validateNotNull("type", type);

                var answer;

                switch (type)
                {
                    case "boardgamecategory":
                        answer = categoryMap;
                        break;
                    case "boardgamedesigner":
                        answer = designerMap;
                        break;
                    case "boardgamemechanic":
                        answer = mechanicMap;
                        break;
                    default:
                        throw "Unknown entity type: " + type;
                }

                return answer;
            };

            this.load = function()
            {
                // Load from the internet.
                for (var i = 1; i <= pageCount; i++)
                {
                    var summaryFetcher = new GameSummaryFetcher(this, i, this.receiveSummaryData.bind(this));
                    summaryFetcher.fetchData();
                }

                LOGGER.debug("gameSummaries loading from the internet");
            };

            this.receiveDetailData = function(newGameDetailMap)
            {
                LOGGER.trace("GameDatabase.receiveDetailData() start");

                Object.vizziniMerge(gameDetailMap, newGameDetailMap);

                store.dispatch(Action.mergeGameDetailMap(newGameDetailMap));

                LOGGER.trace("GameDatabase.receiveDetailData() end");
            };

            this.receiveSummaryData = function(newGameSummaryMap)
            {
                LOGGER.trace("GameDatabase.receiveSummaryData() start");

                Object.vizziniMerge(gameSummaryMap, newGameSummaryMap);

                // Fetch a game detail for each game summary.
                var needGameDetailIds = [];
                var keys = Object.keys(newGameSummaryMap);
                var i, len;

                for (i = 0, len = keys.length; i < len; i++)
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
                    var numPerCall = 50;
                    var count = Math.ceil(needGameDetailIds.length / numPerCall);

                    for (i = 0; i < count; i++)
                    {
                        var start = numPerCall * i;
                        var max = Math.min(numPerCall, needGameDetailIds.length);
                        var end = start + max;
                        var detailFetcher = new GameDetailFetcher(that, needGameDetailIds.slice(start, end), that.receiveDetailData.bind(that));
                        detailFetcher.fetchData();
                    }
                }

                LOGGER.trace("GameDatabase.receiveSummaryData() end");
            };
        }

        GameDatabase.prototype.findGameDetailById = function(id)
        {
            return this.gameDetailMap()[id];
        };

        GameDatabase.prototype.findGameSummaryById = function(id)
        {
            return this.gameSummaryMap()[id];
        };

        GameDatabase.prototype.newEntity = function(type, id, name)
        {
            var entityMap = this.entityMap(type);
            var answer = entityMap[id];

            if (answer)
            {
                // Increment count.
                answer.count++;
            }
            else
            {
                answer = {
                    type: type,
                    id: parseInt(id),
                    name: name,
                    count: 1,
                };

                entityMap[answer.id] = answer;
            }

            return answer;
        };

        GameDatabase.prototype.newGameDetail = function(id, title, designers, yearPublished, minPlayers, maxPlayers, bestWithPlayers, minPlayTime, maxPlayTime, averageWeight, categories, mechanics)
        {
            var gameDetailMap = this.gameDetailMap();
            var answer = gameDetailMap[id];

            if (!answer)
            {
                answer = {
                    id: parseInt(id),
                    title: title,
                    designers: designers,
                    yearPublished: parseInt(yearPublished),
                    minPlayers: parseInt(minPlayers),
                    maxPlayers: parseInt(maxPlayers),
                    bestWithPlayers: parseInt(bestWithPlayers),
                    minPlayTime: parseInt(minPlayTime),
                    maxPlayTime: parseInt(maxPlayTime),
                    averageWeight: Number(averageWeight),
                    categories: categories,
                    mechanics: mechanics,
                };

                gameDetailMap[answer.id] = answer;
            }

            return answer;
        };

        GameDatabase.prototype.newGameSummary = function(id, title, boardGameRank, geekRatingDisplay, averageRatingDisplay, numVoters)
        {
            var gameSummaryMap = this.gameSummaryMap();
            var answer = gameSummaryMap[id];

            if (!answer)
            {
                answer = {
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
        };

        return GameDatabase;
    });

define(["process/Action", "process/GameCollectionFetcher", "process/GameDetailFetcher", "process/GameSummaryFetcher", "process/Reducer"],
    function(Action, GameCollectionFetcher, GameDetailFetcher, GameSummaryFetcher, Reducer)
    {
        "use strict";

        function GameDatabase(pageCount, callback)
        {
            InputValidator.validateInRange("pageCount", pageCount, 1, 10);
            // callback optional.

            var that = this;
            var categoryMap = {};
            var designerMap = {};
            var gameCollectionMap = {};
            var gameDetailMap = {};
            var gameSummaryMap = {};
            var mechanicMap = {};
            var usernameMap = {};
            var usernames = ["ghightshoe", "jmthompson", "kmistr"];
            var usernameToReceivedMap = {};

            this.pageCount = function()
            {
                return pageCount;
            };

            this.callback = function()
            {
                return callback;
            };

            this.categoryMap = function()
            {
                return categoryMap;
            };

            this.designerMap = function()
            {
                return designerMap;
            };

            this.gameCollectionMap = function()
            {
                return gameCollectionMap;
            };

            this.gameDetailMap = function()
            {
                return gameDetailMap;
            };

            this.gameSummaryMap = function()
            {
                return gameSummaryMap;
            };

            this.mechanicMap = function()
            {
                return mechanicMap;
            };

            this.usernameMap = function()
            {
                return usernameMap;
            };

            this.usernames = function()
            {
                return usernames;
            };

            this.usernameToReceivedMap = function()
            {
                return usernameToReceivedMap;
            };

            this.receiveCollection = function(username, collectionIds)
            {
                InputValidator.validateNotNull("username", username);
                InputValidator.validateNotNull("collectionIds", collectionIds);
                LOGGER.info("GameDatabase.receiveCollection(" + username + ") collectionIds.length = " + collectionIds.length);

                if (collectionIds.length > 0)
                {
                    usernameToReceivedMap[username] = true;

                    var userId = this.usernames().indexOf(username);
                    var user = this.usernameMap()[userId];

                    collectionIds.forEach(function(id)
                    {
                        var users = gameCollectionMap[id];

                        if (users === undefined)
                        {
                            gameCollectionMap[id] = [user];
                        }
                        else
                        {
                            users.push(user);
                        }
                    });
                }

                if (this.isCollectionsLoaded())
                {
                    this.determineCollectionCounts();
                    this.loadGameDetails(gameSummaryMap);
                }
            };

            this.receiveDetailData = function(newGameDetailMap)
            {
                InputValidator.validateNotNull("newGameDetailMap", newGameDetailMap);
                LOGGER.info("GameDatabase.receiveDetailData() newGameDetailMap length = " + Object.keys(newGameDetailMap).length);

                Object.vizziniMerge(gameDetailMap, newGameDetailMap);

                if (callback !== undefined)
                {
                    callback(newGameDetailMap);
                }
            };

            this.receiveSummaryData = function(newGameSummaryMap)
            {
                InputValidator.validateNotNull("newGameSummaryMap", newGameSummaryMap);
                LOGGER.info("GameDatabase.receiveSummaryData() newGameSummaryMap length = " + Object.keys(newGameSummaryMap).length);

                Object.vizziniMerge(gameSummaryMap, newGameSummaryMap);

                if (this.isCollectionsLoaded())
                {
                    this.determineCollectionCounts();
                    this.loadGameDetails(gameSummaryMap);
                }
            };

            usernames.forEach(function(username, i)
            {
                this.newEntity("username", i, username);
            }, this);
        }

        GameDatabase.prototype.entityMap = function(type)
        {
            InputValidator.validateNotNull("type", type);

            var answer;

            switch (type)
            {
                case "boardgamecategory":
                    answer = this.categoryMap();
                    break;
                case "boardgamedesigner":
                    answer = this.designerMap();
                    break;
                case "boardgamemechanic":
                    answer = this.mechanicMap();
                    break;
                case "username":
                    answer = this.usernameMap();
                    break;
                default:
                    throw "Unknown entity type: " + type;
            }

            return answer;
        };

        GameDatabase.prototype.determineCollectionCounts = function()
        {
            var users = Object.values(this.usernameMap());

            users.forEach(function(user)
            {
                user.count = 0;
            });

            var gameCollectionMap = this.gameCollectionMap();
            var collectionKeys = Object.keys(gameCollectionMap);
            var summaryKeys = Object.keys(this.gameSummaryMap());

            collectionKeys.forEach(function(collectionKey)
            {
                if (summaryKeys.includes(collectionKey))
                {
                    var collectionValues = gameCollectionMap[collectionKey];

                    collectionValues.forEach(function(user)
                    {
                        user.count++;
                    });
                }
            });
        };

        GameDatabase.prototype.findGameCollectionsById = function(id)
        {
            return this.gameCollectionMap()[id];
        };

        GameDatabase.prototype.findGameDetailById = function(id)
        {
            return this.gameDetailMap()[id];
        };

        GameDatabase.prototype.findGameSummaryById = function(id)
        {
            return this.gameSummaryMap()[id];
        };

        GameDatabase.prototype.isCollectionsLoaded = function()
        {
            var usernames = this.usernames();
            var usernameToReceivedMap = this.usernameToReceivedMap();

            return usernames.reduce(function(accumulator, username)
            {
                return accumulator && (usernameToReceivedMap[username] === true);
            }, true);
        };

        GameDatabase.prototype.load = function()
        {
            // Load from the internet.
            this.loadCollections();
            this.loadGameSummaries();
        };

        GameDatabase.prototype.loadCollections = function()
        {
            var usernames = this.usernames();

            usernames.forEach(function(username)
            {
                var fetcher = new GameCollectionFetcher(username, this.receiveCollection.bind(this));
                fetcher.fetchData();
            }, this);
        };

        GameDatabase.prototype.loadGameDetails = function(newGameSummaryMap)
        {
            InputValidator.validateNotNull("newGameSummaryMap", newGameSummaryMap);

            // Fetch a game detail for each game summary.
            var keys = Object.keys(newGameSummaryMap);
            LOGGER.info("GameDatabase.loadGameDetails() keys.length = " + keys.length);

            var needGameDetailIds = keys.filter(function(key)
            {
                return this.findGameDetailById(key) === undefined;
            }, this);
            LOGGER.info("GameDatabase.loadGameDetails() needGameDetailIds.length = " + needGameDetailIds.length);

            if (needGameDetailIds.length > 0)
            {
                var numPerCall = 50;
                var count = Math.ceil(needGameDetailIds.length / numPerCall);

                for (var i = 0; i < count; i++)
                {
                    var start = numPerCall * i;
                    var max = Math.min(numPerCall, needGameDetailIds.length);
                    var end = start + max;
                    var fetcher = new GameDetailFetcher(this, needGameDetailIds.slice(start, end), this.receiveDetailData.bind(this));
                    fetcher.fetchData();
                }
            }
        };

        GameDatabase.prototype.loadGameSummaries = function()
        {
            var pageCount = this.pageCount();

            for (var i = 1; i <= pageCount; i++)
            {
                var fetcher = new GameSummaryFetcher(this, i, this.receiveSummaryData.bind(this));
                fetcher.fetchData();
            }
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

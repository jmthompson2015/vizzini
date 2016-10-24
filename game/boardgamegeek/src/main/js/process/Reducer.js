define(["DefaultFilters", "GameData", "InitialState", "process/Action"],
    function(DefaultFilters, GameData, InitialState, Action)
    {
        "use strict";
        var Reducer = {};

        Reducer.root = function(state, action)
        {
            LOGGER.debug("root() type = " + action.type);

            if (typeof state === 'undefined')
            {
                return new InitialState();
            }

            var newEntityMap, newFilteredGameData, newFilters, newGameData, newGameDetailMap, newGameSummaryMap;

            switch (action.type)
            {
                case Action.MERGE_ENTITY_MAP:
                    LOGGER.info("Reducer merge entity map");
                    newEntityMap = Object.assign(
                    {}, state.entityMap);
                    Object.vizziniMerge(newEntityMap, action.entityMap);
                    return Object.assign(
                    {}, state,
                    {
                        entityMap: newEntityMap,
                    });
                case Action.MERGE_GAME_DETAIL_MAP:
                    LOGGER.info("Reducer merge game detail map");
                    newGameDetailMap = Object.assign(
                    {}, state.gameDetailMap);
                    Object.vizziniMerge(newGameDetailMap, action.gameDetailMap);

                    newGameData = [];
                    newGameData.vizziniAddAll(Reducer.createGameData(state.gameDatabase, state.gameSummaryMap));
                    Reducer.sortGameData(newGameData);
                    newFilteredGameData = Reducer.filterGameData(newGameData, state.filters);

                    return Object.assign(
                    {}, state,
                    {
                        filteredGameData: newFilteredGameData,
                        gameData: newGameData,
                        gameDetailMap: newGameDetailMap,
                    });
                case Action.MERGE_GAME_SUMMARY_MAP:
                    LOGGER.info("Reducer merge game summary map");
                    newGameSummaryMap = Object.assign(
                    {}, state.gameSummaryMap);
                    Object.vizziniMerge(newGameSummaryMap, action.gameSummaryMap);

                    newGameData = [];
                    newGameData.vizziniAddAll(Reducer.createGameData(state.gameDatabase, action.gameSummaryMap));
                    Reducer.sortGameData(newGameData);
                    newFilteredGameData = Reducer.filterGameData(newGameData, state.filters);

                    return Object.assign(
                    {}, state,
                    {
                        filteredGameData: newFilteredGameData,
                        gameData: newGameData,
                        gameSummaryMap: newGameSummaryMap,
                    });
                case Action.REMOVE_FILTERS:
                    newFilteredGameData = [];
                    newFilteredGameData.vizziniAddAll(state.gameData);
                    return Object.assign(
                    {}, state,
                    {
                        filteredGameData: newFilteredGameData,
                    });
                case Action.RESET_GAME_DETAIL_MAP:
                    LOGGER.info("Reducer reset game detail map");
                    return Object.assign(
                    {}, state,
                    {
                        gameDetailMap:
                        {},
                    });
                case Action.SET_DEFAULT_FILTERS:
                    newFilters = DefaultFilters.create();
                    return Object.assign(
                    {}, state,
                    {
                        filters: newFilters,
                    });
                case Action.SET_ENTITY_TIMESTAMP:
                    LOGGER.info("Reducer entityTimestamp = " + action.entityTimestamp);
                    return Object.assign(
                    {}, state,
                    {
                        entityTimestamp: action.entityTimestamp,
                    });
                case Action.SET_FILTERS:
                    LOGGER.info("Reducer filters = " + action.filters);
                    Object.getOwnPropertyNames(action.filters).forEach(function(columnKey)
                    {
                        LOGGER.info(columnKey + ": " + action.filters[columnKey]);
                    });
                    newFilters = Object.assign(
                    {}, state.filters);
                    Object.vizziniMerge(newFilters, action.filters);
                    newFilteredGameData = Reducer.filterGameData(state.gameData, newFilters);
                    Reducer.saveToLocalStorage(newFilters);
                    return Object.assign(
                    {}, state,
                    {
                        filters: newFilters,
                        filteredGameData: newFilteredGameData,
                    });
                case Action.SET_GAME_DATABASE:
                    LOGGER.info("Reducer gameDatabase = " + action.gameDatabase);
                    return Object.assign(
                    {}, state,
                    {
                        gameDatabase: action.gameDatabase,
                    });
                case Action.SET_GAME_DETAIL_TIMESTAMP:
                    LOGGER.info("Reducer gameDetailTimestamp = " + action.gameDetailTimestamp);
                    return Object.assign(
                    {}, state,
                    {
                        gameDetailTimestamp: action.gameDetailTimestamp,
                    });
                case Action.SET_GAME_SUMMARY_TIMESTAMP:
                    LOGGER.info("Reducer gameSummaryTimestamp = " + action.gameSummaryTimestamp);
                    return Object.assign(
                    {}, state,
                    {
                        gameSummaryTimestamp: action.gameSummaryTimestamp,
                    });
                default:
                    LOGGER.warn("Reducer.root: Unhandled action type: " + action.type);
                    return state;
            }
        };

        Reducer.createGameData = function(gameDatabase, gameSummaryMap)
        {
            InputValidator.validateNotNull("gameSummaryMap", gameSummaryMap);

            var answer = [];

            Object.values(gameSummaryMap).forEach(function(gameSummary)
            {
                var gameDetail = gameDatabase.findGameDetailById(gameSummary.id);
                answer.push(GameData.createGameData(gameSummary, gameDetail));
            });

            return answer;
        };

        Reducer.filterGameData = function(gameData, filters)
        {
            InputValidator.validateNotNull("gameData", gameData);
            InputValidator.validateNotNull("filters", filters);

            var answer = [];

            gameData.forEach(function(data)
            {
                if (Reducer.passes(data, filters))
                {
                    answer.push(data);
                }
            });

            return answer;
        };

        Reducer.passes = function(data, filters)
        {
            InputValidator.validateNotNull("data", data);
            InputValidator.validateNotNull("filters", filters);

            var answer = true;
            var propertyNames = Object.getOwnPropertyNames(filters);

            for (var i = 0; i < propertyNames.length; i++)
            {
                var propertyName = propertyNames[i];
                var filter = filters[propertyName];

                if (!filter.passes(data))
                {
                    answer = false;
                    break;
                }
            }

            return answer;
        };

        Reducer.saveToLocalStorage = function(filters)
        {
            InputValidator.validateNotNull("filters", filters);

            var filterObjects = [];

            Object.getOwnPropertyNames(filters).forEach(function(columnKey)
            {
                var filter = filters[columnKey];
                filterObjects.push(filter.toObject());
            });

            localStorage.filters = JSON.stringify(filterObjects);
        };

        Reducer.sortGameData = function(gameData)
        {
            gameData.sort(function(a, b)
            {
                return a.boardGameRank - b.boardGameRank;
            });
        };

        if (Object.freeze)
        {
            Object.freeze(Reducer);
        }

        return Reducer;
    });

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

            var newCategoryMap, newDesignerMap, newFilteredGameData, newFilters, newGameDataMap, newMechanicMap;

            switch (action.type)
            {
                case Action.MERGE_GAME_DETAIL_MAP:
                    LOGGER.info("Reducer merge game detail map");
                    newGameDataMap = Object.assign(
                    {}, state.gameDataMap);
                    Reducer.addGameData(newGameDataMap, state.gameDatabase, action.gameDetailMap);
                    newCategoryMap = Object.assign(
                    {}, state.gameDatabase.categoryMap());
                    newDesignerMap = Object.assign(
                    {}, state.gameDatabase.designerMap());
                    newMechanicMap = Object.assign(
                    {}, state.gameDatabase.mechanicMap());
                    newFilteredGameData = [];
                    newFilteredGameData.vizziniAddAll(Object.values(newGameDataMap));
                    Reducer.sortGameData(newFilteredGameData);

                    return Object.assign(
                    {}, state,
                    {
                        categoryMap: newCategoryMap,
                        designerMap: newDesignerMap,
                        filteredGameData: newFilteredGameData,
                        gameDataMap: newGameDataMap,
                        mechanicMap: newMechanicMap,
                    });
                case Action.REMOVE_FILTERS:
                    newFilteredGameData = [];
                    newFilteredGameData.vizziniAddAll(Object.values(state.gameDataMap));
                    Reducer.sortGameData(newFilteredGameData);
                    return Object.assign(
                    {}, state,
                    {
                        filteredGameData: newFilteredGameData,
                    });
                case Action.SET_DEFAULT_FILTERS:
                    newFilters = DefaultFilters.create();
                    return Object.assign(
                    {}, state,
                    {
                        filters: newFilters,
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
                    newFilteredGameData = Reducer.filterGameData(Object.values(state.gameDataMap), newFilters);
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
                default:
                    LOGGER.warn("Reducer.root: Unhandled action type: " + action.type);
                    return state;
            }
        };

        Reducer.addGameData = function(gameDataMap, gameDatabase, newGameDetailMap)
        {
            InputValidator.validateNotNull("gameDataMap", gameDataMap);
            InputValidator.validateNotNull("gameDatabase", gameDatabase);
            InputValidator.validateNotNull("newGameDetailMap", newGameDetailMap);

            Object.values(newGameDetailMap).forEach(function(gameDetail)
            {
                var gameSummary = gameDatabase.findGameSummaryById(gameDetail.id);
                var usernames = gameDatabase.findUsernamesById(gameDetail.id);
                gameDataMap[gameDetail.id] = GameData.createGameData(gameSummary, gameDetail, usernames);
            });
        };

        Reducer.filterGameData = function(gameData, filters)
        {
            InputValidator.validateNotNull("gameData", gameData);
            InputValidator.validateNotNull("filters", filters);

            var answer = gameData.filter(function(data)
            {
                return Reducer.passes(data, filters);
            });

            Reducer.sortGameData(answer);

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

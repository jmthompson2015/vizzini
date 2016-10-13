define(
        ["EntityFilter", "RangeFilter", "process/Action", "process/Filter", "process/GameDatabase", "process/Reducer"],
    function(EntityFilter, RangeFilter, Action, Filter, GameDatabase, Reducer)
    {
        "use strict";
        QUnit.module("Filter");

        QUnit.test("loadFromLocalStorage() defaults", function(assert)
        {
            // Setup.
            var numPages = 5;
            var gameDatabase = new GameDatabase(numPages);
            var store = gameDatabase.store();
            var filter = new Filter(store);
            delete localStorage.filters;

            // Run.
            var result = filter.loadFromLocalStorage();

            // Verify.
            assert.ok(result);
            // assert.ok(Array.isArray(result));
            // assert.equal(result.length, 11);
            assert.ok(result.boardGameRank);
            assert.ok(result.designers);
            assert.ok(result.yearPublished);
            assert.ok(result.geekRating);
            assert.ok(result.minPlayers);
            assert.ok(result.maxPlayers);
            assert.ok(result.bestWithPlayers);
            assert.ok(result.minPlayTime);
            assert.ok(result.maxPlayTime);
            assert.ok(result.categories);
            assert.ok(result.mechanics);
        });

        QUnit.test("passes()", function(assert)
        {
            // Setup.
            var numPages = 5;
            var gameDatabase = new GameDatabase(numPages);
            var store = gameDatabase.store();
            var filter = new Filter(store);
            var gameSummary = createGameSummary(gameDatabase);
            var gameDetail = createGameDetail(gameDatabase);
            var filters = [];
            filters.push(createEntityFilter());
            filters.push(createRangeFilter());
            store.dispatch(Action.setFilters(filters));

            // Run.
            var result = filter.passes(gameSummary, gameDetail);

            // Verify.
            assert.ok(result);
        });

        QUnit.test("storeToLocalStorage()", function(assert)
        {
            // Setup.
            var numPages = 5;
            var gameDatabase = new GameDatabase(numPages);
            var store = gameDatabase.store();
            var filter = new Filter(store);
            // var filters = [];
            // filters.push(createEntityFilter());
            // filters.push(createRangeFilter());
            // store.dispatch(Action.setFilters(filters));
            var filterObject = {};
            // filters.forEach(function(myFilter)
            // {
            // LOGGER.info("myFilter.columnKey() = "+myFilter.columnKey());
            // filterObject[myFilter.columnKey()] = myFilter;
            // });
            var filter0 = createEntityFilter();
            var filter1 = createRangeFilter();
            filterObject[filter0.columnKey()] = filter0;
            filterObject[filter1.columnKey()] = filter1;
            //                LOGGER.info("filterObject = " + JSON.stringify(filterObject));

            // Run.
            filter.storeToLocalStorage(filterObject);
            var result = JSON.parse(localStorage.filterObject);

            // Verify.
            assert.ok(result);
            //                LOGGER.info("result = " + JSON.stringify(result));
            assert.ok(result.designers);
            assert.ok(result.maxPlayers);
        });

        // var id = "1234";
        // var title = "Splendor";

        function createEntity0(gameDatabase)
        {
            var type = "designer";
            var id = "3876";
            var name = "Ananda Gupta";

            return gameDatabase.newEntity(type, id, name);
        }

        function createEntity1(gameDatabase)
        {
            var type = "designer";
            var id = "3877";
            var name = "Jason Matthews";

            return gameDatabase.newEntity(type, id, name);
        }

        function createEntity2(gameDatabase)
        {
            var type = "category";
            var id = "1069";
            var name = "Modern Warfare";

            return gameDatabase.newEntity(type, id, name);
        }

        function createEntity3(gameDatabase)
        {
            var type = "mechanic";
            var id = "2001";
            var name = "Action Point Allowance System";

            return gameDatabase.newEntity(type, id, name);
        }

        function createEntityFilter()
        {
            var columnKey = "designers";
            var ids = ["3876"];
            var isAnd = false;
            var props = EntityFilter.newFilterProps(columnKey, ids, isAnd);

            return new EntityFilter(props);
        }

        function createGameDetail(gameDatabase)
        {
            var id = "12333";
            var title = "Twilight Struggle";
            var designers = [createEntity0(gameDatabase), createEntity1(gameDatabase)];
            var yearPublished = "2005";
            var minPlayers = "2";
            var maxPlayers = "2";
            var bestWithPlayers = "2";
            var minPlayTime = "180";
            var maxPlayTime = "180";
            var categories = [createEntity2(gameDatabase)];
            var mechanics = [createEntity3(gameDatabase)];

            return gameDatabase.newGameDetail(id, title, designers, yearPublished, minPlayers, maxPlayers,
                bestWithPlayers, minPlayTime, maxPlayTime, categories, mechanics);
        }

        function createGameSummary(gameDatabase)
        {
            var id = "12333";
            var title = "Twilight Struggle (2005)";
            var boardGameRank = "1";
            var geekRatingDisplay = "8.216";
            var averageRatingDisplay = "8.33";
            var numVoters = "20528";

            return gameDatabase.newGameSummary(id, title, boardGameRank, geekRatingDisplay, averageRatingDisplay,
                numVoters);
        }

        function createRangeFilter()
        {
            var columnKey = "maxPlayers";
            var isMinEnabled = true;
            var minValue = 1;
            var isMaxEnabled = true;
            var maxValue = 4;
            var props = RangeFilter.newFilterProps(columnKey, isMinEnabled, minValue, isMaxEnabled, maxValue);

            return new RangeFilter(props);
        }
    });

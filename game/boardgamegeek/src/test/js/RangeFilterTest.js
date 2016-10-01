define([ "RangeFilter", "process/GameDatabase" ], function(RangeFilter, GameDatabase)
{
    "use strict";
    QUnit.module("RangeFilter");

    QUnit.test("RangeFilter passes()", function(assert)
    {
        // Setup.
        var numPages = 5;
        var gameDatabase = new GameDatabase(numPages);
        var gameSummary = createGameSummary(gameDatabase);
        var gameDetail = createGameDetail(gameDatabase);

        // Run / Verify.
        assert.ok(createFilter0(gameDatabase).passes(gameSummary, gameDetail));
        assert.ok(!createFilter1(gameDatabase).passes(gameSummary, gameDetail));
    });

    function createFilter0(gameDatabase)
    {
        var columnKey = "geekRating";
        var isMinEnabled = true;
        var minValue = 8.0;
        var isMaxEnabled = true;
        var maxValue = 8.3;
        var props = RangeFilter.newFilterProps(columnKey, isMinEnabled, minValue, isMaxEnabled, maxValue);

        return new RangeFilter(props);
    }

    function createFilter1(gameDatabase)
    {
        var columnKey = "geekRating";
        var isMinEnabled = true;
        var minValue = 7.5;
        var isMaxEnabled = true;
        var maxValue = 8.0;
        var props = RangeFilter.newFilterProps(columnKey, isMinEnabled, minValue, isMaxEnabled, maxValue);

        return new RangeFilter(props);
    }

    function createGameSummary(gameDatabase)
    {
        var id = "12333";
        var title = "Twilight Struggle (2005)";
        var boardGameRank = "1";
        var geekRatingDisplay = "8.216";
        var averageRatingDisplay = "8.33";
        var numVoters = "20528";

        return gameDatabase
                .newGameSummary(id, title, boardGameRank, geekRatingDisplay, averageRatingDisplay, numVoters);
    }

    function createGameDetail(gameDatabase)
    {
        var id = "12333";
        var title = "Twilight Struggle";
        var designers = [ createEntity0(gameDatabase), createEntity1(gameDatabase) ];
        var yearPublished = "2005";
        var minPlayers = "2";
        var maxPlayers = "2";
        var minPlayTime = "180";
        var maxPlayTime = "180";
        var categories = [ createEntity2(gameDatabase) ];
        var mechanics = [ createEntity3(gameDatabase) ];

        return gameDatabase.newGameDetail(id, title, designers, yearPublished, minPlayers, maxPlayers, minPlayTime,
                maxPlayTime, categories, mechanics);
    }

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
});

define([ "EntityFilter", "process/GameDatabase" ], function(EntityFilter, GameDatabase)
{
    "use strict";
    QUnit.module("EntityFilter");

    QUnit.test("EntityFilter passes()", function(assert)
    {
        // Setup.
        var numPages = 5;
        var gameDatabase = new GameDatabase(numPages);
        var gameSummary = createGameSummary(gameDatabase);
        var gameDetail = createGameDetail(gameDatabase);

        // Run / Verify.
        assert.ok(createFilter2(gameDatabase, true).passes(gameSummary, gameDetail));
        assert.ok(!createFilter3(gameDatabase, true).passes(gameSummary, gameDetail));
        assert.ok(createFilter2(gameDatabase, false).passes(gameSummary, gameDetail));
        assert.ok(createFilter3(gameDatabase, false).passes(gameSummary, gameDetail));
        assert.ok(createFilter4(gameDatabase).passes(gameSummary, gameDetail));
        assert.ok(!createFilter5(gameDatabase).passes(gameSummary, gameDetail));
        assert.ok(createFilter6(gameDatabase).passes(gameSummary, gameDetail));
        assert.ok(!createFilter7(gameDatabase).passes(gameSummary, gameDetail));
    });

    function createFilter2(gameDatabase, isAnd)
    {
        var columnKey = "designers";
        var ids = [ "3876", "3877" ];
        var props = EntityFilter.newFilterProps(columnKey, ids, isAnd);

        return new EntityFilter(props);
    }

    function createFilter3(gameDatabase, isAnd)
    {
        var columnKey = "designers";
        var ids = [ "3876", "9876" ];
        var props = EntityFilter.newFilterProps(columnKey, ids, isAnd);

        return new EntityFilter(props);
    }

    function createFilter4(gameDatabase)
    {
        var columnKey = "categories";
        var ids = [ "1069" ];
        var isAnd = true;
        var props = EntityFilter.newFilterProps(columnKey, ids, isAnd);

        return new EntityFilter(props);
    }

    function createFilter5(gameDatabase)
    {
        var columnKey = "categories";
        var ids = [ "9876" ];
        var isAnd = true;
        var props = EntityFilter.newFilterProps(columnKey, ids, isAnd);

        return new EntityFilter(props);
    }

    function createFilter6(gameDatabase)
    {
        var columnKey = "mechanics";
        var ids = [ "2001" ];
        var isAnd = true;
        var props = EntityFilter.newFilterProps(columnKey, ids, isAnd);

        return new EntityFilter(props);
    }

    function createFilter7(gameDatabase)
    {
        var columnKey = "mechanics";
        var ids = [ "9876" ];
        var isAnd = true;
        var props = EntityFilter.newFilterProps(columnKey, ids, isAnd);

        return new EntityFilter(props);
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
        var bestWithPlayers = "2";
        var minPlayTime = "180";
        var maxPlayTime = "180";
        var categories = [ createEntity2(gameDatabase) ];
        var mechanics = [ createEntity3(gameDatabase) ];

        return gameDatabase.newGameDetail(id, title, designers, yearPublished, minPlayers, maxPlayers, bestWithPlayers,
                minPlayTime, maxPlayTime, categories, mechanics);
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

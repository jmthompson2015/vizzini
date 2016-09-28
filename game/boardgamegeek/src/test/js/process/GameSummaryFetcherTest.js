define([ "process/GameDatabase", "process/GameSummaryFetcher" ], function(GameDatabase, GameSummaryFetcher)
{
    "use strict";
    QUnit.module("GameSummaryFetcher");

    QUnit.test("fetchData()", function(assert)
    {
        // Setup.
        var gameDatabase = new GameDatabase();
        var gameIds = [];
        gameIds.push(12333); // Twilight Struggle
        gameIds.push(120677); // Terra Mystica
        var fetcher = new GameSummaryFetcher(gameDatabase, gameIds);
        fetcher.bind("dataLoaded", myReceiveData);

        // Run.
        fetcher.fetchData();

        // Verify.
        assert.ok(true);
    });

    function myReceiveData(newGameSummaryMap)
    {
        LOGGER.info("myReceiveData() start");
        LOGGER.info("newGameSummaryMap = " + newGameSummaryMap);
        var gameSummaries = GameDatabase.objectValues(newGameSummaryMap);
        LOGGER.info("myReceiveData gameSummaries.length = " + gameSummaries.length);

        for (var i = 0; i < gameSummaries.length; i++)
        {
            var gameSummary = gameSummaries[i];
            LOGGER.info("gameSummaries[" + i + "] = " + JSON.stringify(gameSummary, null, "   "));
        }

        LOGGER.info("myReceiveData() end");
    }
});

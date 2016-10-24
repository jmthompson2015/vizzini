define([ "process/GameDatabase", "process/GameSummaryFetcher" ], function(GameDatabase, GameSummaryFetcher)
{
    "use strict";
    QUnit.module("GameSummaryFetcher");

    QUnit.test("fetchData()", function(assert)
    {
        // Setup.
        var numPages = 5;
        var gameDatabase = new GameDatabase(numPages);
        var page = 2;
        var callback = myReceiveData;
        var fetcher = new GameSummaryFetcher(gameDatabase, page, callback);

        // Run.
        fetcher.fetchData();

        // Verify.
        assert.ok(true);
    });

    function myReceiveData(newGameSummaryMap)
    {
        LOGGER.debug("myReceiveData() start");
        LOGGER.debug("newGameSummaryMap = " + newGameSummaryMap);
        var gameSummaries = Object.values(newGameSummaryMap);
        LOGGER.debug("myReceiveData gameSummaries.length = " + gameSummaries.length);

        for (var i = 0; i < gameSummaries.length; i++)
        {
            var gameSummary = gameSummaries[i];
            LOGGER.debug("gameSummaries[" + i + "] = " + JSON.stringify(gameSummary, null, "   "));
        }

        LOGGER.debug("myReceiveData() end");
    }
});

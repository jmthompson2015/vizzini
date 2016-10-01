define([ "process/GameDatabase", "process/GameDetailFetcher" ], function(GameDatabase, GameDetailFetcher)
{
    "use strict";
    QUnit.module("GameDetailFetcher");

    QUnit.test("fetchData()", function(assert)
    {
        // Setup.
        var numPages = 5;
        var gameDatabase = new GameDatabase(numPages);
        var gameIds = [];
        gameIds.push(12333); // Twilight Struggle
        gameIds.push(120677); // Terra Mystica
        var callback = myReceiveData;
        var fetcher = new GameDetailFetcher(gameDatabase, gameIds, callback);

        // Run.
        fetcher.fetchData();

        // Verify.
        assert.ok(true);
    });

    function myReceiveData(newGameDetailMap)
    {
        LOGGER.debug("myReceiveData() start");
        LOGGER.debug("newGameDetailMap = " + newGameDetailMap);
        LOGGER.debug("newGameDetailMap keys = " + Object.keys(newGameDetailMap));
        var gameDetails = GameDatabase.objectValues(newGameDetailMap);
        LOGGER.debug("myReceiveData gameDetails.length = " + gameDetails.length);

        for (var i = 0; i < gameDetails.length; i++)
        {
            var gameDetail = gameDetails[i];
            LOGGER.debug("gameDetails[" + i + "] = " + JSON.stringify(gameDetail, null, "   "));
        }

        LOGGER.debug("myReceiveData() end");
    }
});

define([ "GameDatabase", "GameDetailFetcher" ], function(GameDatabase, GameDetailFetcher)
{
    "use strict";
    QUnit.module("GameDetailFetcher");

    QUnit.test("fetchData()", function(assert)
    {
        // Setup.
        var gameDatabase = new GameDatabase();
        var gameIds = [];
        gameIds.push(12333); // Twilight Struggle
        gameIds.push(120677); // Terra Mystica
        var fetcher = new GameDetailFetcher(gameDatabase, gameIds);
        fetcher.bind("dataLoaded", myReceiveData);

        // Run.
        fetcher.fetchData();

        // Verify.
        assert.ok(true);
    });

    function myReceiveData(newGameDetailMap)
    {
        LOGGER.info("myReceiveData() start");
        LOGGER.info("newGameDetailMap = " + newGameDetailMap);
        LOGGER.info("newGameDetailMap keys = " + Object.keys(newGameDetailMap));
        var gameDetails = GameDatabase.objectValues(newGameDetailMap);
        LOGGER.info("myReceiveData gameDetails.length = " + gameDetails.length);

        for (var i = 0; i < gameDetails.length; i++)
        {
            var gameDetail = gameDetails[i];
            LOGGER.info("gameDetails[" + i + "] = " + JSON.stringify(gameDetail, null, "   "));
        }

        LOGGER.info("myReceiveData() end");
    }
});

define(["process/GameDatabase", "process/GameDetailFetcher"],
    function(GameDatabase, GameDetailFetcher)
    {
        "use strict";
        QUnit.module("GameDetailFetcher");

        QUnit.test("fetchData()", function(assert)
        {
            // Setup.
            var numPages = 5;
            var gameDatabase = new GameDatabase(numPages);
            var gameIds = [];
            gameIds.push(12333);
            gameIds.push(120677);
            var fetcher = new GameDetailFetcher(gameDatabase, gameIds, myCallback);

            // Run.
            var done = assert.async();
            fetcher.fetchData();

            // Verify.
            function myCallback(newGameDetailMap)
            {
                assert.ok(true, "test resumed from async operation");
                assert.ok(newGameDetailMap);
                var gameDetails = Object.values(newGameDetailMap);
                assert.ok(gameDetails);
                var length = gameIds.length;
                assert.equal(gameDetails.length, length);
                assert.equal(gameDetails[0].id, gameIds[0]);
                assert.equal(gameDetails[0].title, "Twilight Struggle");
                assert.equal(gameDetails[length - 1].id, gameIds[length - 1]);
                assert.equal(gameDetails[length - 1].title, "Terra Mystica");
                done();
            }
        });
    });

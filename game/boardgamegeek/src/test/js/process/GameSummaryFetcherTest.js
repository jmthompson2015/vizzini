define(["process/GameDatabase", "process/GameSummaryFetcher"],
    function(GameDatabase, GameSummaryFetcher)
    {
        "use strict";
        QUnit.module("GameSummaryFetcher");

        QUnit.test("fetchData()", function(assert)
        {
            // Setup.
            var numPages = 5;
            var gameDatabase = new GameDatabase(numPages);
            var page = 2;
            var fetcher = new GameSummaryFetcher(gameDatabase, page, myCallback);

            // Run.
            var done = assert.async();
            fetcher.fetchData();

            // Verify.
            function myCallback(newGameSummaryMap)
            {
                assert.ok(true, "test resumed from async operation");
                assert.ok(newGameSummaryMap);
                var gameSummaries = Object.values(newGameSummaryMap);
                assert.ok(gameSummaries);
                var length = 100;
                assert.equal(gameSummaries.length, length);
                assert.equal(gameSummaries[0].id, 1);
                assert.equal(gameSummaries[0].title, "Die Macher  (1986)");
                assert.equal(gameSummaries[length - 1].id, 198773);
                assert.equal(gameSummaries[length - 1].title, "Codenames: Pictures  (2016)");
                done();
            }
        });
    });

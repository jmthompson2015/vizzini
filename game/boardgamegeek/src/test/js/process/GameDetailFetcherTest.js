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
                verifyFirst(gameDetails[0]);
                verifyLast(gameDetails[length - 1]);
                done();
            }

            function verifyFirst(gameDetail)
            {
                assert.ok(gameDetail);
                assert.equal(gameDetail.id, 12333);
                assert.equal(gameDetail.title, "Twilight Struggle");
                assert.equal(gameDetail.yearPublished, 2005);
                assert.equal(gameDetail.minPlayers, 2);
                assert.equal(gameDetail.maxPlayers, 2);
                assert.equal(gameDetail.bestWithPlayers, 2);
                assert.equal(gameDetail.minPlayTime, 180);
                assert.equal(gameDetail.maxPlayTime, 180);
                assert.equal(gameDetail.averageWeight, 3.526);
                assert.equal(gameDetail.designers.length, 2);
                assert.equal(gameDetail.categories.length, 3);
                assert.equal(gameDetail.mechanics.length, 5);
            }

            function verifyLast(gameDetail)
            {
                assert.ok(gameDetail);
                assert.equal(gameDetail.id, 120677);
                assert.equal(gameDetail.title, "Terra Mystica");
                assert.equal(gameDetail.yearPublished, 2012);
                assert.equal(gameDetail.minPlayers, 2);
                assert.equal(gameDetail.maxPlayers, 5);
                assert.equal(gameDetail.bestWithPlayers, 4);
                assert.equal(gameDetail.minPlayTime, 60);
                assert.equal(gameDetail.maxPlayTime, 150);
                assert.equal(gameDetail.averageWeight, 3.9336);
                assert.equal(gameDetail.designers.length, 2);
                assert.equal(gameDetail.categories.length, 4);
                assert.equal(gameDetail.mechanics.length, 3);
            }
        });
    });

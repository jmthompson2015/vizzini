define(["process/GameCollectionFetcher"],
    function(GameCollectionFetcher)
    {
        "use strict";
        QUnit.module("GameCollectionFetcher");

        QUnit.test("fetchData() ghightshoe", function(assert)
        {
            // Setup.
            var username = "ghightshoe";
            var fetcher = new GameCollectionFetcher(username, myCallback);

            // Run.
            var done = assert.async();
            fetcher.fetchData();

            // Verify.
            function myCallback(username2, collectionIds)
            {
                assert.ok(true, "test resumed from async operation");
                assert.ok(username2);
                assert.equal(username2, username);
                assert.ok(collectionIds);
                var length = 25;
                assert.equal(collectionIds.length, length);
                assert.equal(collectionIds[0], 74);
                assert.equal(collectionIds[length - 1], 204053);
                done();
            }
        });

        QUnit.test("fetchData() jmthompson", function(assert)
        {
            // Setup.
            var username = "jmthompson";
            var fetcher = new GameCollectionFetcher(username, myCallback);

            // Run.
            var done = assert.async();
            fetcher.fetchData();

            // Verify.
            function myCallback(username2, collectionIds)
            {
                assert.ok(true, "test resumed from async operation");
                assert.ok(username2);
                assert.equal(username2, username);
                assert.ok(collectionIds);
                var length = 116;
                assert.equal(collectionIds.length, length);
                assert.equal(collectionIds[0], 1198);
                assert.equal(collectionIds[length - 1], 201875);
                done();
            }
        });

        QUnit.test("fetchData() kmistr", function(assert)
        {
            // Setup.
            var username = "kmistr";
            var fetcher = new GameCollectionFetcher(username, myCallback);

            // Run.
            var done = assert.async();
            fetcher.fetchData();

            // Verify.
            function myCallback(username2, collectionIds)
            {
                assert.ok(true, "test resumed from async operation");
                assert.ok(username2);
                assert.equal(username2, username);
                assert.ok(collectionIds);
                var length = 30;
                assert.equal(collectionIds.length, length);
                assert.equal(collectionIds[0], 13);
                assert.equal(collectionIds[length - 1], 176173);
                done();
            }
        });
    });

define(["process/GameDatabase"],
    function(GameDatabase)
    {
        "use strict";
        QUnit.module("GameDatabase");

        QUnit.test("GameDatabase()", function(assert)
        {
            // Setup.
            var pageCount = 5;

            // Run.
            var result = new GameDatabase(pageCount);

            // Verify.
            assert.ok(result);
            assert.equal(result.pageCount(), pageCount);
            assert.ok(result.categoryMap());
            assert.ok(result.designerMap());
            assert.ok(result.gameCollectionMap());
            assert.ok(result.gameDetailMap());
            assert.ok(result.gameSummaryMap());
            assert.ok(result.mechanicMap());
            assert.ok(result.usernames());
            assert.ok(result.usernameToReceivedMap());
        });

        QUnit.test("findGameCollectionsById()", function(assert)
        {
            // Setup.
            var pageCount = 1;
            var gameDatabase = new GameDatabase(pageCount);
            var id = 161936;
            var done = assert.async();
            gameDatabase.loadCollections();

            setTimeout(function()
            {
                assert.equal(Object.keys(gameDatabase.gameCollectionMap()).length, 169);

                // Run.
                var result = gameDatabase.findGameCollectionsById(id);

                // Verify.
                assert.ok(true, "test resumed from async operation");
                assert.ok(result);
                assert.ok(Array.isArray(result));
                assert.equal(result[0].name, "ghightshoe");
                done();
            }, 1000);
        });

        QUnit.test("loadCollections()", function(assert)
        {
            // Setup.
            var pageCount = 5;
            var gameDatabase = new GameDatabase(pageCount);

            // Run.
            var done = assert.async();
            gameDatabase.loadCollections();

            // Verify.
            setTimeout(function()
            {
                assert.ok(true, "test resumed from async operation");
                var gameCollectionMap = gameDatabase.gameCollectionMap();
                assert.ok(gameCollectionMap);
                assert.equal(Object.keys(gameCollectionMap).length, 169);
                done();
            }, 1000);
        });

        QUnit.test("loadGameDetails()", function(assert)
        {
            // Setup.
            var pageCount = 1;
            var gameDatabase = new GameDatabase(pageCount);
            var done2 = assert.async();
            gameDatabase.loadGameSummaries();
            setTimeout(function()
            {
                assert.ok(true, "test resumed from async operation");
                assert.equal(Object.keys(gameDatabase.gameSummaryMap()).length, 100);

                // Run.
                var done = assert.async();
                gameDatabase.loadGameDetails(gameDatabase.gameSummaryMap());

                // Verify.
                setTimeout(function()
                {
                    assert.ok(true, "test resumed from async operation");
                    var gameDetailMap = gameDatabase.gameDetailMap();
                    assert.ok(gameDetailMap);
                    assert.equal(Object.keys(gameDetailMap).length, 100);
                    done();
                }, 1500);

                done2();
            }, 500);
        });

        QUnit.test("loadGameSummaries()", function(assert)
        {
            // Setup.
            var pageCount = 2;
            var gameDatabase = new GameDatabase(pageCount);

            // Run.
            var done = assert.async();
            gameDatabase.loadGameSummaries();

            // Verify.
            setTimeout(function()
            {
                assert.ok(true, "test resumed from async operation");
                var gameSummaryMap = gameDatabase.gameSummaryMap();
                assert.ok(gameSummaryMap);
                assert.equal(Object.keys(gameSummaryMap).length, 200);
                done();
            }, 500);
        });
    });

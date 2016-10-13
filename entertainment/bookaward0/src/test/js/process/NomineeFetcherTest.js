define(["Award", "process/NomineeFetcher"], function(Award, NomineeFetcher)
{
    "use strict";
    QUnit.module("NomineeFetcher");

    QUnit.test("NomineeFetcher()", function(assert)
    {
        // Setup.
        var award = Award.properties[Award.AGATHA];
        var callback = function(books, nominees) {};

        // Run.
        var result = new NomineeFetcher(award, callback);

        // Verify.
        assert.ok(result);
        assert.equal(result.award(), award);
    });

    QUnit.test("fetch()", function(assert)
    {
        // Setup.
        var award = Award.properties[Award.AGATHA];
        var callback = function(nominees)
        {
            assert.ok(nominees);
            assert.equal(nominees.length, 6);
            assert.equal(nominees[0].title(), "Burned Bridges");
            assert.equal(nominees[0].author(), "Annette Dashofy");
            assert.equal(nominees[0].award(), award);
            var category = award.categories.properties[award.categories.CONTEMPORARY];
            assert.equal(nominees[0].category(), category);
            assert.equal(nominees[0].year(), 2016);
        };
        var fetcher = new NomineeFetcher(award, callback);

        // Run.
        fetcher.fetch();

        // Verify.
        assert.ok(true);
    });
});

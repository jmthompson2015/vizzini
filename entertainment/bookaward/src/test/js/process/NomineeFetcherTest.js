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
        var callback = function(books, bookToNomination)
        {
            assert.ok(books);
            assert.equal(books.length, 6);
            assert.equal(books[0].title(), "Burned Bridges");
            assert.equal(books[0].author(), "Annette Dashofy");

            assert.ok(bookToNomination);
            var nominations = bookToNomination[books[0]];
            assert.equal(nominations.length, 1);
            var nomination = nominations[0];
            assert.equal(nomination.award(), award);
            var category = award.categories.properties[award.categories.CONTEMPORARY];
            assert.equal(nomination.category(), category);
            assert.equal(nomination.year(), 2016);
            assert.ok(!nomination.isWinner());
        };
        var fetcher = new NomineeFetcher(award, callback);

        // Run.
        fetcher.fetch();

        // Verify.
        assert.ok(true);
    });
});

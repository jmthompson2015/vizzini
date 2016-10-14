define(["Award", "process/SYKMDaggerNomineeFetcher"], function(Award, SYKMDaggerNomineeFetcher)
{
    "use strict";
    QUnit.module("SYKMDaggerNomineeFetcher");

    QUnit.test("receiveData() Dagger", function(assert)
    {
        // Setup.
        var award = Award.properties[Award.DAGGER];
        var callback = function(books, bookToNomination)
        {
            assert.ok(books);
            assert.equal(books.length, 23);

            var i = 0;
            assert.equal(books[i].title(), "Dodgers");
            assert.equal(books[i].author(), "Bill Beverly");
            var nominations = bookToNomination[books[i]];
            assert.ok(nominations);
            assert.equal(nominations.length, 2);
            var j = 0;
            assert.equal(nominations[j].award(), award);
            var category = award.categories.properties[award.categories.GOLD];
            assert.equal(nominations[j].category(), category);
            assert.equal(nominations[j].year(), 2016);
            assert.ok(nominations[j].isWinner());
            j = 1;
            assert.equal(nominations[j].award(), award);
            category = award.categories.properties[award.categories.FIRST];
            assert.equal(nominations[j].category(), category);
            assert.equal(nominations[j].year(), 2016);

            i = books.length - 1;
            assert.equal(books[i].title(), "Striking Murder");
            assert.equal(books[i].author(), "A.J. Wright");
            nominations = bookToNomination[books[i]];
            assert.ok(nominations);
            assert.equal(nominations.length, 1);
            j = 0;
            assert.equal(nominations[j].award(), award);
            category = award.categories.properties[award.categories.HISTORICAL];
            assert.equal(nominations[j].category(), category);
            assert.equal(nominations[j].year(), 2016);
            assert.ok(!nominations[j].isWinner());
        };
        var fetcher = new SYKMDaggerNomineeFetcher(callback);
        var xmlDocument = load(award.name);

        // Run.
        fetcher.receiveData(xmlDocument);

        // Verify.
        assert.ok(true);
    });

    function load(name)
    {
        var request = new XMLHttpRequest();
        var url = "../resources/" + name + ".xml";
        LOGGER.debug("url = " + url);
        var isAsync = false;
        request.open("GET", url, isAsync);
        request.send();

        return request.responseXML;
    }
});

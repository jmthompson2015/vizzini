define(["SciFiAward", "process/SFADBNomineeFetcher"], function(SciFiAward, SFADBNomineeFetcher)
{
    "use strict";
    QUnit.module("SFADBNomineeFetcher");

    QUnit.test("receiveData() British Fantasy", function(assert)
    {
        // Setup.
        var award = SciFiAward.properties[SciFiAward.BRITISH_FANTASY];
        var year = 2016;
        var callback = function(books, bookToNomination)
        {
            assert.ok(books);
            assert.equal(books.length, 12);

            var i = 0;
            assert.equal(books[i].title(), "Uprooted");
            assert.equal(books[i].author(), "Naomi Novik");
            var nominations = bookToNomination[books[i]];
            assert.ok(nominations);
            assert.equal(nominations.length, 1);
            var j = 0;
            assert.equal(nominations[j].award(), award);
            var category = award.categories.properties[award.categories.FANTASY];
            assert.equal(nominations[j].category(), category);
            assert.equal(nominations[j].year(), 2016);
            assert.ok(nominations[j].isWinner());

            i = books.length - 1;
            assert.equal(books[i].title(), "Welcome to Night Vale");
            assert.equal(books[i].author(), "Joseph Fink & Jeffrey Cranor");
            nominations = bookToNomination[books[i]];
            assert.ok(nominations);
            assert.equal(nominations.length, 1);
            j = 0;
            assert.equal(nominations[j].award(), award);
            category = award.categories.properties[award.categories.HORROR];
            assert.equal(nominations[j].category(), category);
            assert.equal(nominations[j].year(), 2016);
            assert.ok(!nominations[j].isWinner());
        };
        var fetcher = new SFADBNomineeFetcher(award, year, callback);
        var xmlDocument = load("British_Fantasy");

        // Run.
        fetcher.receiveData(xmlDocument);

        // Verify.
        assert.ok(true);
    });

    QUnit.test("receiveData() British SF", function(assert)
    {
        // Setup.
        var award = SciFiAward.properties[SciFiAward.BRITISH_SF];
        var year = 2016;
        var callback = function(books, bookToNomination)
        {
            assert.ok(books);
            assert.equal(books.length, 5);

            var i = 0;
            assert.equal(books[i].title(), "The House of Shattered Wings");
            assert.equal(books[i].author(), "Aliette de Bodard");
            var nominations = bookToNomination[books[i]];
            assert.ok(nominations);
            assert.equal(nominations.length, 1);
            var j = 0;
            assert.equal(nominations[j].award(), award);
            var category = award.categories.properties[award.categories.NOVEL];
            assert.equal(nominations[j].category(), category);
            assert.equal(nominations[j].year(), 2016);
            assert.ok(nominations[j].isWinner());

            i = books.length - 1;
            assert.equal(books[i].title(), "Mother of Eden");
            assert.equal(books[i].author(), "Chris Beckett");
            nominations = bookToNomination[books[i]];
            assert.ok(nominations);
            assert.equal(nominations.length, 1);
            j = 0;
            assert.equal(nominations[j].award(), award);
            assert.equal(nominations[j].category(), category);
            assert.equal(nominations[j].year(), 2016);
            assert.ok(!nominations[j].isWinner());
        };
        var fetcher = new SFADBNomineeFetcher(award, year, callback);
        var xmlDocument = load("British_SF");

        // Run.
        fetcher.receiveData(xmlDocument);

        // Verify.
        assert.ok(true);
    });

    QUnit.test("receiveData() Hugo", function(assert)
    {
        // Setup.
        var award = SciFiAward.properties[SciFiAward.HUGO];
        var year = 2016;
        var callback = function(books, bookToNomination)
        {
            assert.ok(books);
            assert.equal(books.length, 5);

            var i = 0;
            assert.equal(books[i].title(), "The Fifth Season");
            assert.equal(books[i].author(), "N. K. Jemisin");
            var nominations = bookToNomination[books[i]];
            assert.ok(nominations);
            assert.equal(nominations.length, 1);
            var j = 0;
            assert.equal(nominations[j].award(), award);
            var category = award.categories.properties[award.categories.NOVEL];
            assert.equal(nominations[j].category(), category);
            assert.equal(nominations[j].year(), 2016);
            assert.ok(nominations[j].isWinner());

            i = books.length - 1;
            assert.equal(books[i].title(), "Uprooted");
            assert.equal(books[i].author(), "Naomi Novik");
            nominations = bookToNomination[books[i]];
            assert.ok(nominations);
            assert.equal(nominations.length, 1);
            j = 0;
            assert.equal(nominations[j].award(), award);
            // category = award.categories.properties[award.categories.FIRST];
            assert.equal(nominations[j].category(), category);
            assert.equal(nominations[j].year(), 2016);
            assert.ok(!nominations[j].isWinner());
        };
        var fetcher = new SFADBNomineeFetcher(award, year, callback);
        var xmlDocument = load(award.name);

        // Run.
        fetcher.receiveData(xmlDocument);

        // Verify.
        assert.ok(true);
    });

    QUnit.test("receiveData() Locus", function(assert)
    {
        // Setup.
        var award = SciFiAward.properties[SciFiAward.LOCUS];
        var year = 2016;
        var callback = function(books, bookToNomination)
        {
            assert.ok(books);
            assert.equal(books.length, 15);

            var i = 0;
            assert.equal(books[i].title(), "Ancillary Mercy");
            assert.equal(books[i].author(), "Ann Leckie");
            var nominations = bookToNomination[books[i]];
            assert.ok(nominations);
            assert.equal(nominations.length, 1);
            var j = 0;
            assert.equal(nominations[j].award(), award);
            var category = award.categories.properties[award.categories.SF];
            assert.equal(nominations[j].category(), category);
            assert.equal(nominations[j].year(), 2016);

            i = books.length - 1;
            assert.equal(books[i].title(), "The Watchmaker of Filigree Street");
            assert.equal(books[i].author(), "Natasha Pulley");
            nominations = bookToNomination[books[i]];
            assert.ok(nominations);
            assert.equal(nominations.length, 1);
            j = 0;
            assert.equal(nominations[j].award(), award);
            category = award.categories.properties[award.categories.FIRST];
            assert.equal(nominations[j].category(), category);
            assert.equal(nominations[j].year(), 2016);
        };
        var fetcher = new SFADBNomineeFetcher(award, year, callback);
        var xmlDocument = load(award.name);

        // Run.
        fetcher.receiveData(xmlDocument);

        // Verify.
        assert.ok(true);
    });

    QUnit.test("receiveData() Nebula", function(assert)
    {
        // Setup.
        var award = SciFiAward.properties[SciFiAward.NEBULA];
        var year = 2016;
        var callback = function(books, bookToNomination)
        {
            assert.ok(books);
            assert.equal(books.length, 7);

            var i = 0;
            assert.equal(books[i].title(), "Uprooted");
            assert.equal(books[i].author(), "Naomi Novik");
            var nominations = bookToNomination[books[i]];
            assert.ok(nominations);
            assert.equal(nominations.length, 1);
            var j = 0;
            assert.equal(nominations[j].award(), award);
            var category = award.categories.properties[award.categories.NOVEL];
            assert.equal(nominations[j].category(), category);
            assert.equal(nominations[j].year(), 2016);

            i = books.length - 1;
            assert.equal(books[i].title(), "Updraft");
            assert.equal(books[i].author(), "Fran Wilde");
            nominations = bookToNomination[books[i]];
            assert.ok(nominations);
            assert.equal(nominations.length, 1);
            j = 0;
            assert.equal(nominations[j].award(), award);
            // category = award.categories.properties[award.categories.PAPERBACK];
            assert.equal(nominations[j].category(), category);
            assert.equal(nominations[j].year(), 2016);
        };
        var fetcher = new SFADBNomineeFetcher(award, year, callback);
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

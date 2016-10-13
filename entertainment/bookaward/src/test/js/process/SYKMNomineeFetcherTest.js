define(["Award", "process/SYKMNomineeFetcher"], function(Award, SYKMNomineeFetcher)
{
    "use strict";
    QUnit.module("SYKMNomineeFetcher");

    QUnit.test("receiveData() Agatha", function(assert)
    {
        // Setup.
        var award = Award.properties[Award.AGATHA];
        var callback = function(books, bookToNomination)
        {
            assert.ok(books);
            assert.equal(books.length, 15);

            var i = 0;
            assert.equal(books[i].title(), "Long Upon the Land");
            assert.equal(books[i].author(), "Margaret Maron");
            var nominations = bookToNomination[books[i]];
            assert.ok(nominations);
            assert.equal(nominations.length, 1);
            var j = 0;
            assert.equal(nominations[j].award(), award);
            var category = award.categories.properties[award.categories.CONTEMPORARY];
            assert.equal(nominations[j].category(), category);
            assert.equal(nominations[j].year(), 2015);

            i = books.length - 1;
            assert.equal(books[i].title(), "Just Killing Time");
            assert.equal(books[i].author(), "Julianne Holmes");
            nominations = bookToNomination[books[i]];
            assert.ok(nominations);
            assert.equal(nominations.length, 1);
            j = 0;
            assert.equal(nominations[j].award(), award);
            category = award.categories.properties[award.categories.FIRST];
            assert.equal(nominations[j].category(), category);
            assert.equal(nominations[j].year(), 2015);
        };
        var fetcher = new SYKMNomineeFetcher(award, callback);
        var xmlDocument = load(award.name);

        // Run.
        fetcher.receiveData(xmlDocument);

        // Verify.
        assert.ok(true);
    });

    QUnit.test("receiveData() Anthony", function(assert)
    {
        // Setup.
        var award = Award.properties[Award.ANTHONY];
        var callback = function(books, bookToNomination)
        {
            assert.ok(books);
            assert.equal(books.length, 15);

            var i = 0;
            assert.equal(books[i].title(), "The Killing Kind");
            assert.equal(books[i].author(), "Chris Holm");
            var nominations = bookToNomination[books[i]];
            assert.ok(nominations);
            assert.equal(nominations.length, 1);
            var j = 0;
            assert.equal(nominations[j].award(), award);
            var category = award.categories.properties[award.categories.MYSTERY];
            assert.equal(nominations[j].category(), category);
            assert.equal(nominations[j].year(), 2016);

            i = books.length - 1;
            assert.equal(books[i].title(), "Stone Cold Dead");
            assert.equal(books[i].author(), "James W. Ziskin");
            nominations = bookToNomination[books[i]];
            assert.ok(nominations);
            assert.equal(nominations.length, 1);
            j = 0;
            assert.equal(nominations[j].award(), award);
            category = award.categories.properties[award.categories.PAPERBACK];
            assert.equal(nominations[j].category(), category);
            assert.equal(nominations[j].year(), 2016);
        };
        var fetcher = new SYKMNomineeFetcher(award, callback);
        var xmlDocument = load(award.name);

        // Run.
        fetcher.receiveData(xmlDocument);

        // Verify.
        assert.ok(true);
    });

    QUnit.test("receiveData() Barry", function(assert)
    {
        // Setup.
        var award = Award.properties[Award.BARRY];
        var callback = function(books, bookToNomination)
        {
            assert.ok(books);
            assert.equal(books.length, 24);

            var i = 0;
            assert.equal(books[i].title(), "Badlands");
            assert.equal(books[i].author(), "C.J. Box");
            var nominations = bookToNomination[books[i]];
            assert.ok(nominations);
            assert.equal(nominations.length, 1);
            var j = 0;
            assert.equal(nominations[j].award(), award);
            var category = award.categories.properties[award.categories.NOVEL];
            assert.equal(nominations[j].category(), category);
            assert.equal(nominations[j].year(), 2016);

            i = books.length - 1;
            assert.equal(books[i].title(), "Foreign and Domestic");
            assert.equal(books[i].author(), "A.J. Tata");
            nominations = bookToNomination[books[i]];
            assert.ok(nominations);
            assert.equal(nominations.length, 1);
            j = 0;
            assert.equal(nominations[j].award(), award);
            category = award.categories.properties[award.categories.THRILLER];
            assert.equal(nominations[j].category(), category);
            assert.equal(nominations[j].year(), 2016);
        };
        var fetcher = new SYKMNomineeFetcher(award, callback);
        var xmlDocument = load(award.name);

        // Run.
        fetcher.receiveData(xmlDocument);

        // Verify.
        assert.ok(true);
    });

    QUnit.skip("receiveData() Dagger", function(assert)
    {
        // Setup.
        var award = Award.properties[Award.DAGGER];
        var callback = function(books, bookToNomination)
        {
            assert.ok(books);
            assert.equal(books.length, 15);

            var i = 0;
            assert.equal(books[i].title(), "Long Upon the Land");
            assert.equal(books[i].author(), "Margaret Maron");
            var nominations = bookToNomination[books[i]];
            assert.ok(nominations);
            assert.equal(nominations.length, 1);
            var j = 0;
            assert.equal(nominations[j].award(), award);
            var category = award.categories.properties[award.categories.CONTEMPORARY];
            assert.equal(nominations[j].category(), category);
            assert.equal(nominations[j].year(), 2015);

            i = books.length - 1;
            assert.equal(books[i].title(), "Just Killing Time");
            assert.equal(books[i].author(), "Julianne Holmes");
            nominations = bookToNomination[books[i]];
            assert.ok(nominations);
            assert.equal(nominations.length, 1);
            j = 0;
            assert.equal(nominations[j].award(), award);
            category = award.categories.properties[award.categories.FIRST];
            assert.equal(nominations[j].category(), category);
            assert.equal(nominations[j].year(), 2015);
        };
        var fetcher = new SYKMNomineeFetcher(award, callback);
        var xmlDocument = load(award.name);

        // Run.
        fetcher.receiveData(xmlDocument);

        // Verify.
        assert.ok(true);
    });

    QUnit.test("receiveData() Edgar", function(assert)
    {
        // Setup.
        var award = Award.properties[Award.EDGAR];
        var callback = function(books, bookToNomination)
        {
            assert.ok(books);
            assert.equal(books.length, 17);

            var i = 0;
            assert.equal(books[i].title(), "Let Me Die in His Footsteps");
            assert.equal(books[i].author(), "Lori Roy");
            var nominations = bookToNomination[books[i]];
            assert.ok(nominations);
            assert.equal(nominations.length, 1);
            var j = 0;
            assert.equal(nominations[j].award(), award);
            var category = award.categories.properties[award.categories.NOVEL];
            assert.equal(nominations[j].category(), category);
            assert.equal(nominations[j].year(), 2016);

            i = books.length - 1;
            assert.equal(books[i].title(), "The Daughter");
            assert.equal(books[i].author(), "Jane Shemilt");
            nominations = bookToNomination[books[i]];
            assert.ok(nominations);
            assert.equal(nominations.length, 1);
            j = 0;
            assert.equal(nominations[j].award(), award);
            category = award.categories.properties[award.categories.PAPERBACK];
            assert.equal(nominations[j].category(), category);
            assert.equal(nominations[j].year(), 2016);
        };
        var fetcher = new SYKMNomineeFetcher(award, callback);
        var xmlDocument = load(award.name);

        // Run.
        fetcher.receiveData(xmlDocument);

        // Verify.
        assert.ok(true);
    });

    QUnit.skip("receiveData() Nero", function(assert)
    {
        // Setup.
        var award = Award.properties[Award.NERO];
        var callback = function(books, bookToNomination)
        {
            assert.ok(books);
            assert.equal(books.length, 15);

            var i = 0;
            assert.equal(books[i].title(), "Long Upon the Land");
            assert.equal(books[i].author(), "Margaret Maron");
            var nominations = bookToNomination[books[i]];
            assert.ok(nominations);
            assert.equal(nominations.length, 1);
            var j = 0;
            assert.equal(nominations[j].award(), award);
            var category = award.categories.properties[award.categories.CONTEMPORARY];
            assert.equal(nominations[j].category(), category);
            assert.equal(nominations[j].year(), 2015);

            i = books.length - 1;
            assert.equal(books[i].title(), "Just Killing Time");
            assert.equal(books[i].author(), "Julianne Holmes");
            nominations = bookToNomination[books[i]];
            assert.ok(nominations);
            assert.equal(nominations.length, 1);
            j = 0;
            assert.equal(nominations[j].award(), award);
            category = award.categories.properties[award.categories.FIRST];
            assert.equal(nominations[j].category(), category);
            assert.equal(nominations[j].year(), 2015);
        };
        var fetcher = new SYKMNomineeFetcher(award, callback);
        var xmlDocument = load(award.name);

        // Run.
        fetcher.receiveData(xmlDocument);

        // Verify.
        assert.ok(true);
    });

    QUnit.test("receiveData() Shamus", function(assert)
    {
        // Setup.
        var award = Award.properties[Award.SHAMUS];
        var callback = function(books, bookToNomination)
        {
            assert.ok(books);
            assert.equal(books.length, 15);

            var i = 0;
            assert.equal(books[i].title(), "Brutality");
            assert.equal(books[i].author(), "Ingrid Thoft");
            var nominations = bookToNomination[books[i]];
            assert.ok(nominations);
            assert.equal(nominations.length, 1);
            var j = 0;
            assert.equal(nominations[j].award(), award);
            var category = award.categories.properties[award.categories.HARDCOVER];
            assert.equal(nominations[j].category(), category);
            assert.equal(nominations[j].year(), 2016);

            i = books.length - 1;
            assert.equal(books[i].title(), "Depth");
            assert.equal(books[i].author(), "Lev AC Rosen");
            nominations = bookToNomination[books[i]];
            assert.ok(nominations);
            assert.equal(nominations.length, 1);
            j = 0;
            assert.equal(nominations[j].award(), award);
            category = award.categories.properties[award.categories.FIRST];
            assert.equal(nominations[j].category(), category);
            assert.equal(nominations[j].year(), 2016);
        };
        var fetcher = new SYKMNomineeFetcher(award, callback);
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

define(["Award", "process/SYKMNomineeFetcher"], function(Award, SYKMNomineeFetcher)
{
    "use strict";
    QUnit.module("SYKMNomineeFetcher");

    QUnit.test("receiveData() Agatha", function(assert)
    {
        // Setup.
        var award = Award.properties[Award.AGATHA];
        var callback = function(nominees)
        {
            assert.ok(nominees);
            assert.equal(nominees.length, 15);

            var i = 0;
            assert.equal(nominees[i].title(), "Long Upon the Land");
            assert.equal(nominees[i].author(), "Margaret Maron");
            assert.equal(nominees[i].award(), award);
            var category = award.categories.properties[award.categories.CONTEMPORARY];
            assert.equal(nominees[i].category(), category);
            assert.equal(nominees[i].year(), 2015);

            i = nominees.length - 1;
            assert.equal(nominees[i].title(), "Just Killing Time");
            assert.equal(nominees[i].author(), "Julianne Holmes");
            assert.equal(nominees[i].award(), award);
            category = award.categories.properties[award.categories.FIRST];
            assert.equal(nominees[i].category(), category);
            assert.equal(nominees[i].year(), 2015);
        };
        var fetcher = new SYKMNomineeFetcher(award, callback);
        var xmlDocument = load(award.name + "2");

        // Run.
        fetcher.receiveData(xmlDocument);

        // Verify.
        assert.ok(true);
    });

    QUnit.test("receiveData() Barry", function(assert)
    {
        // Setup.
        var award = Award.properties[Award.BARRY];
        var callback = function(nominees)
        {
            assert.ok(nominees);
            assert.equal(nominees.length, 24);

            var i = 0;
            assert.equal(nominees[i].title(), "Badlands");
            assert.equal(nominees[i].author(), "C.J. Box");
            assert.equal(nominees[i].award(), award);
            var category = award.categories.properties[award.categories.NOVEL];
            assert.equal(nominees[i].category(), category);
            assert.equal(nominees[i].year(), 2016);

            i = nominees.length - 1;
            assert.equal(nominees[i].title(), "Foreign and Domestic");
            assert.equal(nominees[i].author(), "A.J. Tata");
            assert.equal(nominees[i].award(), award);
            category = award.categories.properties[award.categories.THRILLER];
            assert.equal(nominees[i].category(), category);
            assert.equal(nominees[i].year(), 2016);
        };
        var fetcher = new SYKMNomineeFetcher(award, callback);
        var xmlDocument = load(award.name + "2");

        // Run.
        fetcher.receiveData(xmlDocument);

        // Verify.
        assert.ok(true);
    });

    QUnit.test("receiveData() Edgar", function(assert)
    {
        // Setup.
        var award = Award.properties[Award.EDGAR];
        var callback = function(nominees)
        {
            assert.ok(nominees);
            for (var j = 0; j < nominees.length; j++)
            {
                LOGGER.debug(j + " " + nominees[j].title() + " by " + nominees[j].author());
            }
            assert.equal(nominees.length, 17);

            var i = 0;
            assert.equal(nominees[i].title(), "Let Me Die in His Footsteps");
            assert.equal(nominees[i].author(), "Lori Roy");
            assert.equal(nominees[i].award(), award);
            var category = award.categories.properties[award.categories.NOVEL];
            assert.equal(nominees[i].category(), category);
            assert.equal(nominees[i].year(), 2016);

            i = nominees.length - 1;
            // assert.equal(nominees[i].title(), "Night Life");
            // assert.equal(nominees[i].author(), "David C. Taylor");
            // assert.equal(nominees[i].award(), award);
            // category = award.categories.properties[award.categories.NOVEL];
            // assert.equal(nominees[i].category(), category);
            // assert.equal(nominees[i].year(), 2016);
            assert.equal(nominees[i].title(), "The Daughter");
            assert.equal(nominees[i].author(), "Jane Shemilt");
            assert.equal(nominees[i].award(), award);
            category = award.categories.properties[award.categories.PAPERBACK];
            assert.equal(nominees[i].category(), category);
            assert.equal(nominees[i].year(), 2016);
        };
        var fetcher = new SYKMNomineeFetcher(award, callback);
        var xmlDocument = load(award.name + "2");

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

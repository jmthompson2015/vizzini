define(["Award", "process/OmniMysteryNomineeFetcher"], function(Award, OmniMysteryNomineeFetcher)
{
    "use strict";
    QUnit.module("OmniMysteryNomineeFetcher");

    QUnit.test("receiveData() Agatha", function(assert)
    {
        // Setup.
        var award = Award.properties[Award.AGATHA];
        var callback = function(nominees)
        {
            assert.ok(nominees);
            assert.equal(nominees.length, 11);

            var i = 0;
            assert.equal(nominees[i].title(), "Long Upon the Land");
            assert.equal(nominees[i].author(), "Margaret Maron");
            assert.equal(nominees[i].award(), award);
            var category = award.categories.properties[award.categories.CONTEMPORARY];
            assert.equal(nominees[i].category(), category);
            assert.equal(nominees[i].year(), 2015);

            i = nominees.length - 1;
            assert.equal(nominees[i].title(), "Dandy Gilver and an Unsuitable Day for Murder");
            assert.equal(nominees[i].author(), "Catriona McPherson");
            assert.equal(nominees[i].award(), award);
            category = award.categories.properties[award.categories.HISTORICAL];
            assert.equal(nominees[i].category(), category);
            assert.equal(nominees[i].year(), 2012);
        };
        var fetcher = new OmniMysteryNomineeFetcher(award, callback);
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
        var callback = function(nominees)
        {
            assert.ok(nominees);
            assert.equal(nominees.length, 20);

            var i = 0;
            assert.equal(nominees[i].title(), "Badlands");
            assert.equal(nominees[i].author(), "C. J. Box");
            assert.equal(nominees[i].award(), award);
            var category = award.categories.properties[award.categories.NOVEL];
            assert.equal(nominees[i].category(), category);
            assert.equal(nominees[i].year(), 2016);

            i = nominees.length - 1;
            assert.equal(nominees[i].title(), "The Informant");
            assert.equal(nominees[i].author(), "Thomas Perry");
            assert.equal(nominees[i].award(), award);
            category = award.categories.properties[award.categories.THRILLER];
            assert.equal(nominees[i].category(), category);
            assert.equal(nominees[i].year(), 2012);
        };
        var fetcher = new OmniMysteryNomineeFetcher(award, callback);
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
        var callback = function(nominees)
        {
            assert.ok(nominees);
            assert.equal(nominees.length, 15);

            var i = 0;
            assert.equal(nominees[i].title(), "Let Me Die in His Footsteps");
            assert.equal(nominees[i].author(), "Lori Roy");
            assert.equal(nominees[i].award(), award);
            var category = award.categories.properties[award.categories.NOVEL];
            assert.equal(nominees[i].category(), category);
            assert.equal(nominees[i].year(), 2016);

            i = nominees.length - 1;
            assert.equal(nominees[i].title(), "The Company Man");
            assert.equal(nominees[i].author(), "Robert Jackson Bennett");
            assert.equal(nominees[i].award(), award);
            category = award.categories.properties[award.categories.PAPERBACK];
            assert.equal(nominees[i].category(), category);
            assert.equal(nominees[i].year(), 2012);
        };
        var fetcher = new OmniMysteryNomineeFetcher(award, callback);
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
        var isAsync = false;
        request.open("GET", url, isAsync);
        request.send();

        return request.responseXML;
    }
});

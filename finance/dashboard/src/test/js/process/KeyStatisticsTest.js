define(["process/KeyStatistics", "process/Reducer"], function(KeyStatistics, Reducer)
{
    "use strict";
    QUnit.module("KeyStatistics");

    QUnit.test("fetchData()", function(assert)
    {
        // Setup.
        var store = Redux.createStore(Reducer.root);
        var symbol = "AAPL";
        var keyStats = new KeyStatistics(store, symbol);

        // Run.
        keyStats.fetchData();

        // Verify.
        assert.ok(true);
    });

    QUnit.test("fiftyTwoWeekPricePercent", function(assert)
    {
        // Setup.
        var store = Redux.createStore(Reducer.root);
        var symbol = "AAPL";
        var keyStats = new KeyStatistics(store, symbol);
        var xmlDocument = load();
        keyStats.receiveData(xmlDocument);

        // Run.
        var result = store.getState().keyStatistics[symbol].fiftyTwoWeekPricePercent;

        // Verify.
        assert.ok(result);
        assert.equal(result, 95);
    });

    QUnit.test("forwardAnnualDividendYield", function(assert)
    {
        // Setup.
        var store = Redux.createStore(Reducer.root);
        var symbol = "AAPL";
        var keyStats = new KeyStatistics(store, symbol);
        var xmlDocument = load();
        keyStats.receiveData(xmlDocument);

        // Run.
        var result = store.getState().keyStatistics[symbol].forwardAnnualDividendYield;

        // Verify.
        assert.ok(result);
        assert.equal(result, 1.77);
    });

    QUnit.test("forwardPE", function(assert)
    {
        // Setup.
        var store = Redux.createStore(Reducer.root);
        var symbol = "AAPL";
        var keyStats = new KeyStatistics(store, symbol);
        var xmlDocument = load();
        keyStats.receiveData(xmlDocument);

        // Run.
        var result = store.getState().keyStatistics[symbol].forwardPE;

        // Verify.
        assert.ok(result);
        assert.equal(result, 12.750992);
    });

    QUnit.test("freeCashFlow", function(assert)
    {
        // Setup.
        var store = Redux.createStore(Reducer.root);
        var symbol = "AAPL";
        var keyStats = new KeyStatistics(store, symbol);
        var xmlDocument = load();
        keyStats.receiveData(xmlDocument);

        // Run.
        var result = store.getState().keyStatistics[symbol].freeCashFlow;

        // Verify.
        assert.ok(result);
        assert.equal(result, 49.84);
    });

    function load()
    {
        var request = new XMLHttpRequest();
        var url = "../resources/YahooKeyStatistics_AAPL.xml";
        var isAsync = false;
        request.open("GET", url, isAsync);
        request.send();

        return request.responseXML;
    }
});

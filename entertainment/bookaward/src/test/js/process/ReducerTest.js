define(["Award", "Book", "InitialState", "Nomination", "process/Action", "process/Reducer"], function(Award, Book, InitialState, Nomination, Action, Reducer)
{
    "use strict";
    QUnit.module("Reducer");

    QUnit.test("addBook()", function(assert)
    {
        // Setup.
        var state = new InitialState();
        assert.equal(state.books.length, 106);
        var book = createBook1();
        var action = Action.addBook(book);

        // Run.
        var result = Reducer.root(state, action);

        // Verify.
        assert.ok(result);
        assert.equal(result.books.length, 107);
    });

    QUnit.test("addNomination()", function(assert)
    {
        // Setup.
        var state = new InitialState();
        assert.equal(state.books.length, 106);
        var book = createBook1();
        state = Reducer.root(state, Action.addBook(book));
        var nomination = createNomination1();
        var action = Action.addNomination(book, nomination);

        // Run.
        var result = Reducer.root(state, action);

        // Verify.
        assert.ok(result);
        assert.equal(result.books.length, 107);
        var nominations = result.bookToNomination[book];
        assert.equal(nominations.length, 1);
        assert.equal(nominations[0], nomination);
    });

    function createBook1()
    {
        var title = "A Dark and Stormy Night";
        var author = "Noah Boddy";

        return new Book(title, author);
    }

    function createNomination1()
    {
        var awardKey = Award.AGATHA;
        var award = Award.properties[awardKey];
        var categoryKey = award.categories.CONTEMPORARY;
        var category = award.categories.properties[categoryKey];
        var year = 2016;

        return new Nomination(award, category, year);
    }

    // function createNomination1()
    // {
    //     // var title = "A Dark and Stormy Night";
    //     // var author = "Noah Boddy";
    //     var awardKey = Award.AGATHA;
    //     var award = Award.properties[awardKey];
    //     var categoryKey = award.categories.CONTEMPORARY;
    //     var category = award.categories.properties[categoryKey];
    //     var year = 2016;
    //
    //     return new Nomination(award, category, year);
    // }
});

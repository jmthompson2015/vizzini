define(["Award", "InitialState", "Nominee", "process/Action", "process/Reducer"], function(Award, InitialState, Nominee, Action, Reducer)
{
    "use strict";
    QUnit.module("Reducer");

    QUnit.test("root()", function(assert)
    {
        // Setup.
        var state = new InitialState();
        var nominee = createNominee1();
        var action = Action.addNominee(nominee);

        // Run.
        var result = Reducer.root(state, action);

        // Verify.
        assert.ok(result);
        assert.equal(result.nominees.length, 37);
        assert.equal(result.nominees[result.nominees.length - 1], nominee);
    });

    function createNominee1()
    {
        var title = "A Dark and Stormy Night";
        var author = "Noah Boddy";
        var awardKey = Award.AGATHA;
        var award = Award.properties[awardKey];
        var categoryKey = award.categories.CONTEMPORARY;
        var category = award.categories.properties[categoryKey];
        var year = 2016;

        return new Nominee(title, author, award, category, year);
    }
});

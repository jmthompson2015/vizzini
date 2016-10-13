define(["Award", "Nominee", "process/Action"], function(Award, Nominee, Action)
{
    "use strict";
    QUnit.module("Action");

    QUnit.test("addNominee()", function(assert)
    {
        // Setup.
        var nominee = createNominee1();

        // Run.
        var result = Action.addNominee(nominee);

        // Verify.
        assert.ok(result);
        assert.equal(result.type, Action.ADD_NOMINEE);
        assert.equal(result.nominee, nominee);
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

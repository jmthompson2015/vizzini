define(["Award", "Nomination"], function(Award, Nomination)
{
    "use strict";
    QUnit.module("Nomination");

    QUnit.test("Nomination()", function(assert)
    {
        // Setup.
        var awardKey = Award.AGATHA;
        var award = Award.properties[awardKey];
        var categoryKey = award.categories.CONTEMPORARY;
        var category = award.categories.properties[categoryKey];
        assert.ok(category);
        var year = 2016;

        // Run.
        var result = new Nomination(award, category, year);

        // Verify.
        assert.ok(result);
        assert.equal(result.award(), award);
        assert.equal(result.category(), category);
        assert.equal(result.year(), year);
    });
});

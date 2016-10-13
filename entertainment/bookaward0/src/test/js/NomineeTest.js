define(["Award", "Nominee"], function(Award, Nominee)
{
    "use strict";
    QUnit.module("Nominee");

    QUnit.test("Nominee()", function(assert)
    {
        // Setup.
        var title = "A Dark and Stormy Night";
        var author = "Noah Boddy";
        var awardKey = Award.AGATHA;
        var award = Award.properties[awardKey];
        var categoryKey = award.categories.CONTEMPORARY;
        var category = award.categories.properties[categoryKey];
        assert.ok(category);
        var year = 2016;

        // Run.
        var result = new Nominee(title, author, award, category, year);

        // Verify.
        assert.ok(result);
        assert.equal(result.title(), title);
        assert.equal(result.author(), author);
        assert.equal(result.award(), award);
        assert.equal(result.category(), category);
        assert.equal(result.year(), year);
    });
});

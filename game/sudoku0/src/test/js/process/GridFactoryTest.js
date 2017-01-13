define(["process/GridFactory"], function(GridFactory)
{
    "use strict";
    QUnit.module("GridFactory");

    QUnit.test("createDefaultSolution()", function(assert)
    {
        // Setup.

        // Run.
        var result = GridFactory.createDefaultSolution();

        // Verify.
        assert.equal(result.length, 81);
        assert.equal(result, "123456789456789123789123456234567891567891234891234567345678912678912345912345678");
    });

    QUnit.test("createDiabolical()", function(assert)
    {
        // Setup.

        // Run.
        var result = GridFactory.createDiabolical();

        // Verify.
        assert.equal(result.length, 81);
        assert.equal(result, "17.....8.86.9...7....3..5..2...3......62.18......4...3..9..3....2...9.35.5.....62");
    });

    QUnit.test("createDiabolicalSolution()", function(assert)
    {
        // Setup.

        // Run.
        var result = GridFactory.createDiabolicalSolution();

        // Verify.
        assert.equal(result.length, 81);
        assert.equal(result, "173456289865912374942387516287635491436291857591748623619523748724869135358174962");
    });

    QUnit.test("createEasy()", function(assert)
    {
        // Setup.

        // Run.
        var result = GridFactory.createEasy();

        // Verify.
        assert.equal(result.length, 81);
        assert.equal(result, "..6..8.74..5...1.99.74.16.5.3.1...46.........16...9.2.2.36.54.87.4...9..68.9..3..");
    });

    QUnit.test("createEasySolution()", function(assert)
    {
        // Setup.

        // Run.
        var result = GridFactory.createEasySolution();

        // Verify.
        assert.equal(result.length, 81);
        assert.equal(result, "316598274845267139927431685539182746472356891168749523293675418754813962681924357");
    });

    QUnit.test("createEmpty()", function(assert)
    {
        // Setup.

        // Run.
        var result = GridFactory.createEmpty();

        // Verify.
        assert.equal(result.length, 81);
        assert.equal(result, ".................................................................................");
    });
});

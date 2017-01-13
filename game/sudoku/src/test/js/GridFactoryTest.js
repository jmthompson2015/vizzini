define(["GridFactory"],
    function(GridFactory)
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

        QUnit.test("createDiabolical86()", function(assert)
        {
            // Setup.

            // Run.
            var result = GridFactory.createDiabolical86();

            // Verify.
            assert.equal(result.length, 81);
            assert.equal(result, "17.....8.86.9...7....3..5..2...3......62.18......4...3..9..3....2...9.35.5.....62");
        });

        QUnit.test("createDiabolical86Solution()", function(assert)
        {
            // Setup.

            // Run.
            var result = GridFactory.createDiabolical86Solution();

            // Verify.
            assert.equal(result.length, 81);
            assert.equal(result, "173456289865912374942387516287635491436291857591748623619523748724869135358174962");
        });

        QUnit.test("createDiabolical87()", function(assert)
        {
            // Setup.

            // Run.
            var result = GridFactory.createDiabolical87();

            // Verify.
            assert.equal(result.length, 81);
            assert.equal(result, ".5.......8....37..7....8.19....62....76.1.53....79....13.5....8..24....7.......2.");
        });

        QUnit.test("createEasy1()", function(assert)
        {
            // Setup.

            // Run.
            var result = GridFactory.createEasy1();

            // Verify.
            assert.equal(result.length, 81);
            assert.equal(result, "..6..8.74..5...1.99.74.16.5.3.1...46.........16...9.2.2.36.54.87.4...9..68.9..3..");
        });

        QUnit.test("createEasy1Solution()", function(assert)
        {
            // Setup.

            // Run.
            var result = GridFactory.createEasy1Solution();

            // Verify.
            assert.equal(result.length, 81);
            assert.equal(result, "316598274845267139927431685539182746472356891168749523293675418754813962681924357");
        });

        QUnit.test("createEasy2()", function(assert)
        {
            // Setup.

            // Run.
            var result = GridFactory.createEasy2();

            // Verify.
            assert.equal(result.length, 81);
            assert.equal(result, "4..2..197.5.....3..31.67.8.....8...4..63745..1...9.....8.42.65..9.....2.612..5..8");
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

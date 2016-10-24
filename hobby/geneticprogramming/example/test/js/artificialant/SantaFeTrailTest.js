define(
        [ "../../../../example/main/js/artificialant/Content", "../../../../example/main/js/artificialant/SantaFeTrail" ],
        function(Content, SantaFeTrail)
        {
            "use strict";
            QUnit.module("SantaFeTrail");

            QUnit.test("SantaFeTrail()", function(assert)
            {
                // Setup.
                var trail = new SantaFeTrail();

                // Run / Verify.
                assert.equal(trail.get(0, 0), Content.FOOTPRINT);
                assert.equal(trail.get(1, 0), Content.FOOD);
                assert.equal(trail.get(2, 0), Content.FOOD);
                assert.equal(trail.get(3, 0), Content.FOOD);
                assert.equal(trail.get(4, 0), Content.EMPTY);

                assert.equal(trail.initialFoodCount(), 89);
            });
        });

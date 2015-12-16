define(
        [ "Bearing", "Difficulty", "Team", "ui/ImageUtilities" ],
        function(Bearing, Difficulty, Team, ImageUtilities)
        {
            QUnit.module("ImageUtilities");

            QUnit
                    .test(
                            "String endsWith",
                            function(assert)
                            {
                                var string = "Apple, Banana, Kiwi";
                                var key = "Banana";
                                assert.equal(string.indexOf(key), 7);
                                assert.equal(string.substr(7, key.length), key);
                                assert.equal(string.search(key), 7);
                                assert.equal(string.search(key + "$"), -1);
                                assert.equal(string.search("Kiwi"), 15);
                                assert.equal(string.search("Kiwi$"), 15);

                                var filename = "file:///Users/jmthompson/Dropbox/SoftwareDev/JavaProjects/vizzini/starfightersquadronsweb/src/resources/images/ImperialIcon24.png";
                                var expected = "file:///Users/jmthompson/Dropbox/SoftwareDev/JavaProjects/vizzini/starfightersquadronsweb/src/main/resources/images/ImperialIcon24.png";
                                filename = filename.replace("src/resources", "src/main/resources");
                                assert.equal(filename, expected);
                            });

            QUnit.test("createManeuverIconSource", function(assert)
            {
                // Setup.
                var imageUtils = new ImageUtilities(imageBase);

                // Run.
                var result = imageUtils.createManeuverIconSource(Bearing.STRAIGHT, Difficulty.EASY);

                // Verify.
                var expected = imageBase + "maneuver/straight_easy16.png";
                assert.equal(result, expected);
            });
        });

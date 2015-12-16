define(
        [ "Team", "ui/ImageUtilities" ],
        function(Team, ImageUtilities)
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

            QUnit
                    .test(
                            "ImageUtilities.createTeamIconString() Imperial",
                            function(assert)
                            {
                                // Setup.
                                var imageUtils = new ImageUtilities();

                                // Run.
                                var result = imageUtils.createTeamIconString(Team.properties[Team.IMPERIAL].name);

                                // Verify.
                                var expected = "<img title='Imperial Faction' src='/Volumes/StorageDrive/jmthompson/git/vizzini/starfightersquadronsweb/src/main/resources/images/ImperialIcon24.png'/>";
                                assert.equal(result, expected);
                            });

            QUnit
                    .test(
                            "ImageUtilities.createTeamIconString() Rebel",
                            function(assert)
                            {
                                // Setup.
                                var imageUtils = new ImageUtilities();

                                // Run.
                                var result = imageUtils.createTeamIconString(Team.properties[Team.REBEL].name);

                                // Verify.
                                var expected = "<img title='Rebel Faction' src='/Volumes/StorageDrive/jmthompson/git/vizzini/starfightersquadronsweb/src/main/resources/images/RebelIcon24.png'/>";
                                assert.equal(result, expected);
                            });
        });

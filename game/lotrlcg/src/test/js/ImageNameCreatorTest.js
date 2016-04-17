define(
        [ "AllyCard", "EnemyCard", "EventCard", "HeroCard", "LocationCard", "QuestCard", "ImageNameCreator" ],
        function(AllyCard, EnemyCard, EventCard, HeroCard, LocationCard, QuestCard, ImageNameCreator)
        {
            "use strict";
            QUnit.module("ImageNameCreator");

            QUnit.test("create() allies", function(assert)
            {
                assert.equal(ImageNameCreator.create(AllyCard.properties[AllyCard.GILDOR_INGLORION]),
                        "http://www.cardgamedb.com/forums/uploads/lotr/ffg_gildor-inglorion-thoem.jpg");
                assert.equal(ImageNameCreator.create(AllyCard.properties[AllyCard.GIMLI]),
                        "http://www.cardgamedb.com/forums/uploads/lotr/ffg_MEC45_4.jpg");
            });

            QUnit.test("create() enemies", function(assert)
            {
                assert.equal(ImageNameCreator.create(EnemyCard.properties[EnemyCard.GOBLINTOWN_SCAVENGERS]),
                        "http://www.cardgamedb.com/forums/uploads/lotr/ffg_goblintown-scavengers-thfg.jpg");
            });

            QUnit.test("create() heroes", function(assert)
            {
                assert.equal(ImageNameCreator.create(HeroCard.properties[HeroCard.ARAGORN_CORE]),
                        "http://www.cardgamedb.com/forums/uploads/lotr/ffg_aragorn-core.jpg");
                assert.equal(ImageNameCreator.create(HeroCard.properties[HeroCard.ARAGORN_TTOS]),
                        "http://www.cardgamedb.com/forums/uploads/lotr/ffg_MEC45_1.jpg");
                assert.equal(ImageNameCreator.create(HeroCard.properties[HeroCard.BALIN]),
                        "http://www.cardgamedb.com/forums/uploads/lotr/ffg_balin-otd.jpg");
                assert.equal(ImageNameCreator.create(HeroCard.properties[HeroCard.BEORN]),
                        "http://www.cardgamedb.com/forums/uploads/lotr/ffg_beorn-ohauh.jpg");
                assert.equal(ImageNameCreator.create(HeroCard.properties[HeroCard.BIFUR]),
                        "http://www.cardgamedb.com/forums/uploads/lotr/ffg_bifur-kd.jpg");
                assert.equal(ImageNameCreator.create(HeroCard.properties[HeroCard.BILBO_BAGGINS_THFG]),
                        "http://www.cardgamedb.com/forums/uploads/lotr/ffg_bilbo-baggins-thfg.jpg");
                assert.equal(ImageNameCreator.create(HeroCard.properties[HeroCard.BOROMIR]),
                        "http://www.cardgamedb.com/forums/uploads/lotr/ffg_boromir-tdm.jpg");
                assert.equal(ImageNameCreator.create(HeroCard.properties[HeroCard.BRAND_SON_OF_BAIN]),
                        "http://www.cardgamedb.com/forums/uploads/lotr/ffg_brand-son-of-bain-thoem.jpg");
                assert.equal(ImageNameCreator.create(HeroCard.properties[HeroCard.CIRDAN_THE_SHIPWRIGHT]),
                        "http://www.cardgamedb.com/forums/uploads/lotr/ffg_MEC47_1.jpg");
                assert.equal(ImageNameCreator.create(HeroCard.properties[HeroCard.DAIN_IRONFOOT]),
                        "http://www.cardgamedb.com/forums/uploads/lotr/ffg_dain-ironfoot-rtm.jpg");
                assert.equal(ImageNameCreator.create(HeroCard.properties[HeroCard.DUNHERE]),
                        "http://www.cardgamedb.com/forums/uploads/lotr/ffg_dunhere-core.jpg");
                assert.equal(ImageNameCreator.create(HeroCard.properties[HeroCard.ELROHIR]),
                        "http://www.cardgamedb.com/forums/uploads/lotr/ffg_elrohir-trg.jpg");
                assert.equal(ImageNameCreator.create(HeroCard.properties[HeroCard.EOWYN]),
                        "http://www.cardgamedb.com/forums/uploads/lotr/ffg_eowyn-core.jpg");
                assert.equal(ImageNameCreator.create(HeroCard.properties[HeroCard.GALDOR_OF_THE_HAVENS]),
                        "http://www.cardgamedb.com/forums/uploads/lotr/ffg_MEC47_2.jpg");
            });

            QUnit
                    .test(
                            "create() quests",
                            function(assert)
                            {
                                assert
                                        .equal(ImageNameCreator
                                                .create(QuestCard.properties[QuestCard.PTM1A_FLIES_AND_SPIDERS]),
                                                "http://s3.amazonaws.com/hallofbeorn-resources/Images/Cards/Core-Set/Flies-and-Spiders-1A.png");
                                assert
                                        .equal(ImageNameCreator
                                                .create(QuestCard.properties[QuestCard.PTM1B_FLIES_AND_SPIDERS]),
                                                "http://s3.amazonaws.com/hallofbeorn-resources/Images/Cards/Core-Set/Flies-and-Spiders-1B.png");
                                assert
                                        .equal(ImageNameCreator
                                                .create(QuestCard.properties[QuestCard.THFG1A_THE_HUNT_BEGINS]),
                                                "http://s3.amazonaws.com/hallofbeorn-resources/Images/Cards/The-Hunt-for-Gollum/The-Hunt-Begins-1A.png");
                                assert
                                        .equal(ImageNameCreator
                                                .create(QuestCard.properties[QuestCard.THFG1B_THE_HUNT_BEGINS]),
                                                "http://s3.amazonaws.com/hallofbeorn-resources/Images/Cards/The-Hunt-for-Gollum/The-Hunt-Begins-1B.png");
                            });
        });

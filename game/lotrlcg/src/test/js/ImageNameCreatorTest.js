define([ "HeroCard", "ImageNameCreator" ], function(HeroCard, ImageNameCreator)
{
    "use strict";
    QUnit.module("ImageNameCreator");

    QUnit.test("create()", function(assert)
    {
        assert.equal(ImageNameCreator.create(HeroCard.properties[HeroCard.ARAGORN_CORE]),
                "http://www.cardgamedb.com/forums/uploads/lotr/ffg_aragorn-core.jpg");
        assert.equal(ImageNameCreator.create(HeroCard.properties[HeroCard.BILBO_BAGGINS_THFG]),
                "http://www.cardgamedb.com/forums/uploads/lotr/ffg_bilbo-baggins-thfg.jpg");
        // assert.equal(ImageNameCreator.create(HeroCard.properties[HeroCard.CIRDAN_THE_SHIPWRIGHT]),
        // "http://www.cardgamedb.com/forums/uploads/lotr/ffg_MEC47_1.jpg");
        assert.equal(ImageNameCreator.create(HeroCard.properties[HeroCard.DUNHERE]),
                "http://www.cardgamedb.com/forums/uploads/lotr/ffg_dunhere-core.jpg");
        assert.equal(ImageNameCreator.create(HeroCard.properties[HeroCard.EOWYN]),
                "http://www.cardgamedb.com/forums/uploads/lotr/ffg_eowyn-core.jpg");
        // assert.equal(ImageNameCreator.create(HeroCard.properties[HeroCard.GALDOR_OF_THE_HAVENS]),
        // "http://www.cardgamedb.com/forums/uploads/lotr/ffg_MEC47_2.jpg");
    });
});

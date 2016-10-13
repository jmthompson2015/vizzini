define(["Award", "Nominee"], function(Award, Nominee)
{
    "use strict";

    function NomineeFetcher(award, callback)
    {
        InputValidator.validateNotNull("award", award);
        InputValidator.validateNotNull("callback", callback);

        this.award = function()
        {
            return award;
        };

        this.fetch = function()
        {
            var nominees = [];
            var year = 2016;

            switch (award.value)
            {
                case Award.AGATHA:
                    this.fetchAgatha(nominees);
                    break;
                case Award.BARRY:
                    break;
                case Award.EDGAR:
                    break;
            }

            callback(nominees);
        };

        this.fetchAgatha = function(nominees)
        {
            // Best contemporary novel.
            var categoryKey0 = award.categories.CONTEMPORARY;
            var category0 = award.categories.properties[categoryKey0];
            var year = 2016;

            var nominee00 = new Nominee("Burned Bridges", "Annette Dashofy", award, category0, year);
            nominees.push(nominee00);
            var nominee01 = new Nominee("Long Upon the Land", "Margaret Maron", award, category0, year);
            nominees.push(nominee01);

            // Best historical novel.
            var categoryKey1 = award.categories.HISTORICAL;
            var category1 = award.categories.properties[categoryKey1];

            var nominee10 = new Nominee("Malice at the Palace", "Rhys Bowen", award, category1, year);
            nominees.push(nominee10);
            var nominee11 = new Nominee("The Masque of a Murderer", "Susanna Calkins", award, category1, year);
            nominees.push(nominee11);

            // Best first novel.
            var categoryKey2 = award.categories.FIRST;
            var category2 = award.categories.properties[categoryKey2];

            var nominee20 = new Nominee("Death of a Dishonorable Gentleman", "Tessa Arlen", award, category2, year);
            nominees.push(nominee20);
            var nominee21 = new Nominee("Macdeath", "Cindy Brown", award, category2, year);
            nominees.push(nominee21);
        };
    }

    return NomineeFetcher;
});

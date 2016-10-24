define(["Award", "Book", "Nomination"], function(Award, Book, Nomination)
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
            var books = [];
            var bookToNomination = {};
            var year = 2016;

            switch (award.value)
            {
                case Award.AGATHA:
                    this.fetchAgatha(books, bookToNomination);
                    break;
                case Award.BARRY:
                    break;
                case Award.EDGAR:
                    break;
            }

            callback(books, bookToNomination);
        };

        this.fetchAgatha = function(books, bookToNomination)
        {
            // Best contemporary novel.
            var categoryKey0 = award.categories.CONTEMPORARY;
            var category0 = award.categories.properties[categoryKey0];
            var year = 2016;

            var book00 = new Book("Burned Bridges", "Annette Dashofy");
            var nomination00 = new Nomination(award, category0, year);
            books.push(book00);
            bookToNomination[book00] = [];
            bookToNomination[book00].push(nomination00);
            var book01 = new Book("Long Upon the Land", "Margaret Maron");
            var nomination01 = new Nomination(award, category0, year);
            books.push(book01);
            bookToNomination[book01] = [];
            bookToNomination[book01].push(nomination01);

            // Best historical novel.
            var categoryKey1 = award.categories.HISTORICAL;
            var category1 = award.categories.properties[categoryKey1];

            var book10 = new Book("Malice at the Palace", "Rhys Bowen");
            var nomination10 = new Nomination(award, category1, year);
            books.push(book10);
            bookToNomination[book10] = [];
            bookToNomination[book10].push(nomination10);
            var book11 = new Book("The Masque of a Murderer", "Susanna Calkins");
            var nomination11 = new Nomination(award, category1, year);
            books.push(book11);
            bookToNomination[book11] = [];
            bookToNomination[book11].push(nomination11);

            // Best first novel.
            var categoryKey2 = award.categories.FIRST;
            var category2 = award.categories.properties[categoryKey2];

            var book20 = new Book("Death of a Dishonorable Gentleman", "Tessa Arlen");
            var nomination20 = new Nomination(award, category2, year);
            books.push(book20);
            bookToNomination[book20] = [];
            bookToNomination[book20].push(nomination20);
            var book21 = new Book("Macdeath", "Cindy Brown");
            var nomination21 = new Nomination(award, category2, year);
            books.push(book21);
            bookToNomination[book21] = [];
            bookToNomination[book21].push(nomination21);
        };
    }

    return NomineeFetcher;
});

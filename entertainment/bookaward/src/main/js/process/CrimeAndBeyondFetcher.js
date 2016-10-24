define(["Award", "Book", "Nomination"], function(Award, Book, Nomination)
{
    "use strict";

    function CrimeAndBeyondFetcher(callback)
    {
        InputValidator.validateNotNull("callback", callback);

        var award = Award.properties[Award.CRIME_AND_BEYOND];

        this.award = function()
        {
            return award;
        };

        this.category = function()
        {
            var categoryKey = award.categories.CASE;

            return award.categories.properties[categoryKey];
        };

        var that = this;

        this.fetchData = function()
        {
            this.receiveData();
        };

        this.receiveData = function()
        {
            LOGGER.trace("CrimeAndBeyondFetcher.receiveData() start");

            var books = [];
            var bookToNomination = {};

            var nomination = new Nomination(award, this.category(), 2016);

            var titleAndAuthor = [
  ["Blood On Snow", "Jo Nesbø"],
  ["Crazy Love You", "Lisa Unger"],
  ["The Killer Next Door", "Alex Marwood"],
  ["The Stranger", "Harlan Coben"],
  ["Vanishing Games", "Roger Hobbs"],
  ["Make Me", "Lee Child"],
  ["The Promise", "Robert Crais"],
  ["The Guilty", "David Baldacci"],
  ["The Crossing", "Michael Connelly"],
  ["The Travelers", "Chris Pavone"],
  ["Redemption Road", "John Hart"],
  ["Ink & Bone", "Lisa Unger"],
];
            addTitleAndAuthor(books, bookToNomination, titleAndAuthor, nomination);

            nomination = new Nomination(award, this.category(), 2017);
            titleAndAuthor = [
  ["The Last Painting of Sara de Vos", "Dominic Smith"],
  ["Fool Me Once", "Harlan Coben"],
];
            addTitleAndAuthor(books, bookToNomination, titleAndAuthor, nomination);

            LOGGER.info(award.name + " books.length = " + books.length);
            callback(books, bookToNomination);

            LOGGER.trace("CrimeAndBeyondFetcher.receiveData() end");
        };

        function addTitleAndAuthor(books, bookToNomination, titleAndAuthor, nomination)
        {
            for (var i = 0; i < titleAndAuthor.length; i++)
            {
                var book = new Book(titleAndAuthor[i][0], titleAndAuthor[i][1]);
                books.push(book);
                bookToNomination[book] = [nomination];
            }
        }
    }

    return CrimeAndBeyondFetcher;
});

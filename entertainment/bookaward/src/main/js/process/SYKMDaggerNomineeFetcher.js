define(["Award", "Book", "Nomination"], function(Award, Book, Nomination)
{
    "use strict";

    function SYKMDaggerNomineeFetcher(callback)
    {
        InputValidator.validateNotNull("callback", callback);

        var award = Award.properties[Award.DAGGER];

        this.award = function()
        {
            return award;
        };

        var that = this;
        var currentYear = moment().year();
        var yearsBack = 3;
        var books = [];
        var bookToNomination = {};
        var xmlDocument;

        this.fetchData = function()
        {
            LOGGER.trace("SYKMDaggerNomineeFetcher.fetchData() start");

            var url = createUrl();
            $.ajax(url).done(this.receiveData).fail(function(jqXHR, textStatus, errorThrown)
            {
                LOGGER.error(errorThrown);
            });

            LOGGER.trace("SYKMDaggerNomineeFetcher.fetchData() end");
        };

        this.receiveData = function(xmlDocumentIn)
        {
            InputValidator.validateNotNull("xmlDocument", xmlDocumentIn);

            LOGGER.trace("SYKMDaggerNomineeFetcher.receiveData() start");

            xmlDocument = xmlDocumentIn;
            LOGGER.trace("award = " + award.name);
            LOGGER.trace("xmlDocument = " + (new XMLSerializer()).serializeToString(xmlDocument));
            parse(xmlDocument);
            LOGGER.info(award.name + " books.length = " + books.length);
            callback(books, bookToNomination);

            LOGGER.trace("SYKMDaggerNomineeFetcher.receiveData() end");
        };

        function createUrl()
        {
            var baseUrl = "https://query.yahooapis.com/v1/public/yql?q=";
            var sourceUrl = award.url;

            var query = "select * from html where url='" + sourceUrl + "'";
            var answer = baseUrl + encodeURIComponent(query);
            LOGGER.debug("url = " + answer);

            return answer;
        }

        function forEachRow(rows, callback)
        {
            var thisRow = rows.iterateNext();

            while (thisRow)
            {
                callback(thisRow);

                thisRow = rows.iterateNext();
            }
        }

        function parse()
        {
            LOGGER.trace("SYKMDaggerNomineeFetcher.parse() start");

            // This gives the year set.
            var xpath = "//p[@class='AuthorSub']/parent::td";
            var resultType = XPathResult.ORDERED_NODE_ITERATOR_TYPE;
            var rows = xmlDocument.evaluate(xpath, xmlDocument, null, resultType, null);
            forEachRow(rows, parseNominees);

            LOGGER.trace("SYKMDaggerNomineeFetcher.parse() end");
        }

        function parseNominees(xmlFragment)
        {
            LOGGER.trace("SYKMDaggerNomineeFetcher.parseNominees() start");
            LOGGER.trace("xmlFragment = " + (new XMLSerializer()).serializeToString(xmlFragment));

            // This gives the year.
            var xpath0 = "p[@class='AuthorSub']";
            var resultType0 = XPathResult.FIRST_ORDERED_NODE_TYPE;
            var element = xmlDocument.evaluate(xpath0, xmlFragment, null, resultType0, null);
            LOGGER.debug("element.singleNodeValue = " + element.singleNodeValue);
            LOGGER.debug("element.singleNodeValue.textContent = " + element.singleNodeValue.textContent);
            var year = Number(element.singleNodeValue.textContent.substring(0, 4));

            if (year > currentYear - yearsBack)
            {
                LOGGER.debug("year = " + year);
                var callback = function(xmlFragment)
                {
                    parseNominee(xmlFragment, year);
                };

                for (var j = 1; j < 9; j++)
                {
                    // This gives the year set.
                    var xpath = "table[" + j + "]";
                    var resultType = XPathResult.ORDERED_NODE_ITERATOR_TYPE;
                    var rows = xmlDocument.evaluate(xpath, xmlFragment, null, resultType, null);
                    forEachRow(rows, callback);
                }

                LOGGER.trace("SYKMDaggerNomineeFetcher.parseNominees() end");
            }
        }

        function parseNominee(xmlFragment, year)
        {
            LOGGER.trace("SYKMDaggerNomineeFetcher.parseNominee() start");
            LOGGER.debug("xmlFragment = " + (new XMLSerializer()).serializeToString(xmlFragment));

            var xpath0 = "tbody/tr/th";
            var resultType0 = XPathResult.FIRST_ORDERED_NODE_TYPE;
            var element = xmlDocument.evaluate(xpath0, xmlFragment, null, resultType0, null);
            LOGGER.debug("element.singleNodeValue = " + element.singleNodeValue);

            if (element.singleNodeValue)
            {
                LOGGER.debug("element.singleNodeValue.textContent = " + element.singleNodeValue.textContent);
                var categoryName = element.singleNodeValue.textContent.trim();
                categoryName = categoryName.replace("  ", " ");
                categoryName = categoryName.replace(":", "");
                LOGGER.debug("categoryName = _" + categoryName + "_");
                var properties = award.categories.properties;
                var category = Award.findByName(properties, categoryName);
                LOGGER.debug("category = " + category);

                if (category !== undefined)
                {
                    // This gives the data cells (td).
                    var xpath = "tbody/tr/td";
                    var resultType = XPathResult.ORDERED_NODE_SNAPSHOT_TYPE;
                    var cells = xmlDocument.evaluate(xpath, xmlFragment, null, resultType, null);
                    for (var i = 0; i < cells.snapshotLength; i++)
                    {
                        LOGGER.debug(i + " snapshotItem = " + cells.snapshotItem(i).textContent);
                    }

                    for (var j = 1; j < cells.snapshotLength; j += 2)
                    {
                        var titleAuthor = cells.snapshotItem(j).textContent.trim();
                        titleAuthor = titleAuthor.vizziniReplaceAll("\n", " ");
                        LOGGER.debug("titleAuthor = " + titleAuthor);
                        var index = titleAuthor.indexOf(" by ");
                        var title;
                        var author;

                        if (index >= 0)
                        {
                            title = titleAuthor.substring(0, index).trim();
                            author = parseAuthor(titleAuthor.substring(index + 3).trim());
                        }

                        LOGGER.debug("title = _" + title + "_");
                        LOGGER.debug("author = _" + author + "_");

                        var book = new Book(title, author);
                        var nomination = new Nomination(award, category, year);
                        add(books, bookToNomination, book, nomination);
                    }
                }
            }

            LOGGER.trace("SYKMDaggerNomineeFetcher.parseNominee() end");
        }

        function add(books, bookToNomination, book, nomination)
        {
            if (!books.vizziniContainsUsingEquals(book, function(a, b)
                {
                    return a.title() === b.title() && a.author() === b.author();
                }))
            {
                books.push(book);
                bookToNomination[book] = [];
            }
            var nominations = bookToNomination[book];

            if (!nominations.vizziniContains(nomination))
            {
                nominations.push(nomination);
            }
        }

        function parseAuthor(author)
        {
            var answer = author;

            var index = answer.indexOf("[");

            if (index >= 0)
            {
                answer = answer.substring(0, index).trim();
            }

            return answer;
        }
    }

    return SYKMDaggerNomineeFetcher;
});

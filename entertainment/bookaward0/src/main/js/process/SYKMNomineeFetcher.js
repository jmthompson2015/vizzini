define(["Award", "Nominee"], function(Award, Nominee)
{
    "use strict";

    function SYKMNomineeFetcher(award, callback)
    {
        InputValidator.validateNotNull("award", award);
        InputValidator.validateNotNull("callback", callback);

        this.award = function()
        {
            return award;
        };

        var that = this;
        var currentYear = moment().year();
        var yearsBack = 3;

        this.fetchData = function()
        {
            LOGGER.trace("SYKMNomineeFetcher.fetchData() start");

            var url = createUrl();
            $.ajax(url).done(this.receiveData).fail(function(jqXHR, textStatus, errorThrown)
            {
                LOGGER.error(errorThrown);
            });

            LOGGER.trace("SYKMNomineeFetcher.fetchData() end");
        };

        this.receiveData = function(xmlDocument)
        {
            LOGGER.trace("SYKMNomineeFetcher.receiveData() start");

            LOGGER.trace("award = " + award.name);
            LOGGER.trace("xmlDocument = " + (new XMLSerializer()).serializeToString(xmlDocument));
            var nominees = parse(xmlDocument);
            LOGGER.info(award.name + " nominees.length = " + nominees.length);
            callback(nominees);

            LOGGER.trace("SYKMNomineeFetcher.receiveData() end");
        };

        function createUrl()
        {
            var baseUrl = "https://query.yahooapis.com/v1/public/yql?q=";
            var sourceUrl = award.url2;

            var query = "select * from html where url='" + sourceUrl + "'";
            var answer = baseUrl + encodeURIComponent(query);
            LOGGER.debug("url = _" + answer + "_");

            return answer;
        }

        function parse(xmlDocument)
        {
            LOGGER.trace("SYKMNomineeFetcher.parse() start");

            var answer = [];

            // This gives the year set.
            var xpath = "//p[@class='AuthorSub']/parent::td";
            var resultType = XPathResult.ORDERED_NODE_ITERATOR_TYPE;
            var rows = xmlDocument.evaluate(xpath, xmlDocument, null, resultType, null);
            var thisRow = rows.iterateNext();

            while (thisRow)
            {
                var nominees = parseNominees(xmlDocument, thisRow);
                answer.vizziniAddAll(nominees);

                thisRow = rows.iterateNext();
            }

            LOGGER.trace("SYKMNomineeFetcher.parse() end");

            return answer;
        }

        function parseNominees(xmlDocument, xmlFragment)
        {
            LOGGER.trace("SYKMNomineeFetcher.parseNominees() start");
            LOGGER.trace("xmlFragment = " + (new XMLSerializer()).serializeToString(xmlFragment));

            var answer = [];

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

                for (var j = 1; j < 5; j++)
                {
                    // This gives the year set.
                    var xpath = "table[" + j + "]";
                    var resultType = XPathResult.ORDERED_NODE_ITERATOR_TYPE;
                    var rows = xmlDocument.evaluate(xpath, xmlFragment, null, resultType, null);
                    var thisRow = rows.iterateNext();

                    while (thisRow)
                    {
                        var nominees = parseNominee(xmlDocument, thisRow, year);
                        answer.vizziniAddAll(nominees);

                        thisRow = rows.iterateNext();
                    }
                }
            }

            LOGGER.trace("SYKMNomineeFetcher.parseNominees() end");

            return answer;
        }

        function parseNominee(xmlDocument, xmlFragment, year)
        {
            LOGGER.trace("xmlFragment = " + (new XMLSerializer()).serializeToString(xmlFragment));

            // This gives the data cells (td).
            var xpath = "tbody/tr/td";
            var resultType = XPathResult.ORDERED_NODE_SNAPSHOT_TYPE;
            var cells = xmlDocument.evaluate(xpath, xmlFragment, null, resultType, null);
            for (var i = 0; i < cells.snapshotLength; i++)
            {
                LOGGER.debug(i + " snapshotItem = " + cells.snapshotItem(i).textContent);
            }

            var answer = [];

            var categoryName = cells.snapshotItem(0).textContent.trim();
            categoryName = categoryName.replace("  ", " ");
            categoryName = categoryName.replace(":", "");
            LOGGER.debug("categoryName = _" + categoryName + "_");
            var properties = award.categories.properties;
            var category = Award.findByName(properties, categoryName);
            LOGGER.debug("category = " + category);

            if (category !== undefined)
            {
                for (var j = 2; j < cells.snapshotLength; j += 2)
                {
                    // LOGGER.debug("cells.snapshotLength = " + cells.snapshotLength);
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

                    answer.push(new Nominee(title, author, award, category, year));
                }
            }

            return answer;
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

    return SYKMNomineeFetcher;
});

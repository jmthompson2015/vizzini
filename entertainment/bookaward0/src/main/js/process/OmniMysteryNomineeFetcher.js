define(["Award", "Nominee"], function(Award, Nominee)
{
    "use strict";

    function OmniMysteryNomineeFetcher(award, callback)
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
            LOGGER.trace("OmniMysteryNomineeFetcher.fetchData() start");

            var url = createUrl();
            $.ajax(url).done(this.receiveData).fail(function(jqXHR, textStatus, errorThrown)
            {
                LOGGER.error(errorThrown);
            });

            LOGGER.trace("OmniMysteryNomineeFetcher.fetchData() end");
        };

        this.receiveData = function(xmlDocument)
        {
            LOGGER.trace("OmniMysteryNomineeFetcher.receiveData() start");

            var nominees = parse(xmlDocument);
            LOGGER.info(award.name + " nominees.length = " + nominees.length);
            callback(nominees);

            LOGGER.trace("OmniMysteryNomineeFetcher.receiveData() end");
        };

        function createUrl()
        {
            var baseUrl = "https://query.yahooapis.com/v1/public/yql?q=";
            var sourceUrl = award.url;

            var query = "select * from html where url='" + sourceUrl + "'";
            var answer = baseUrl + encodeURIComponent(query);
            LOGGER.debug("url = _" + answer + "_");

            return answer;
        }

        function parse(xmlDocument)
        {
            LOGGER.trace("OmniMysteryNomineeFetcher.parse() start");

            var answer = [];

            // This gives the year set.
            var xpath = "//ul[@class='ulist01']";
            var resultType = XPathResult.ORDERED_NODE_ITERATOR_TYPE;
            var rows = xmlDocument.evaluate(xpath, xmlDocument, null, resultType, null);
            var thisRow = rows.iterateNext();

            while (thisRow)
            {
                var nominees = parseNominees(xmlDocument, thisRow);
                answer.vizziniAddAll(nominees);

                thisRow = rows.iterateNext();
            }

            LOGGER.trace("OmniMysteryNomineeFetcher.parse() end");

            return answer;
        }

        function parseNominees(xmlDocument, xmlFragment)
        {
            LOGGER.trace("OmniMysteryNomineeFetcher.parseNominees() start");
            LOGGER.trace("xmlFragment = " + (new XMLSerializer()).serializeToString(xmlFragment));

            var answer = [];

            // This gives the year.
            var xpath0 = "span";
            var resultType0 = XPathResult.FIRST_ORDERED_NODE_TYPE;
            var span = xmlDocument.evaluate(xpath0, xmlFragment, null, resultType0, null);
            var year = Number(span.singleNodeValue.textContent);

            if (year > currentYear - yearsBack)
            {
                LOGGER.debug("year = " + year);

                // This gives the year set.
                var xpath = "span[text()='" + year + "']/ancestor::ul/li[@class='list01']";
                var resultType = XPathResult.ORDERED_NODE_ITERATOR_TYPE;
                var rows = xmlDocument.evaluate(xpath, xmlFragment, null, resultType, null);
                var thisRow = rows.iterateNext();

                while (thisRow)
                {
                    var nominee = parseNominee(xmlDocument, thisRow, year);

                    if (nominee !== undefined)
                    {
                        answer.push(nominee);
                    }

                    thisRow = rows.iterateNext();
                }
            }

            LOGGER.trace("OmniMysteryNomineeFetcher.parseNominees() end");

            return answer;
        }

        function parseNominee(xmlDocument, xmlFragment, year)
        {
            LOGGER.trace("xmlFragment = " + (new XMLSerializer()).serializeToString(xmlFragment));

            // This gives the data cells (td).
            var xpath = "node()";
            var resultType = XPathResult.ORDERED_NODE_SNAPSHOT_TYPE;
            var cells = xmlDocument.evaluate(xpath, xmlFragment, null, resultType, null);

            var answer;

            if (cells.snapshotItem(1))
            {
                var categoryName = cells.snapshotItem(0).textContent.trim();
                categoryName = categoryName.replace(":", "");
                var properties = award.categories.properties;
                var category = Award.findByName(properties, categoryName);

                if (category !== undefined)
                {
                    var title = cells.snapshotItem(1).textContent.trim();
                    LOGGER.debug("cells.snapshotLength = " + cells.snapshotLength);
                    var author;

                    if (cells.snapshotLength === 3)
                    {
                        author = parseAuthor(cells.snapshotItem(2).textContent.trim());
                    }
                    else
                    {
                        author = parseAuthor(cells.snapshotItem(3).textContent.trim());
                    }

                    answer = new Nominee(title, author, award, category, year);
                }
            }

            return answer;
        }

        function parseAuthor(author)
        {
            var answer = author.replace("by ", "");

            var index = answer.indexOf("]");

            if (index >= 0)
            {
                answer = answer.substring(index + 2);
            }

            index = answer.indexOf(" (");

            if (index >= 0)
            {
                answer = answer.substring(0, index);
            }

            return answer;
        }
    }

    return OmniMysteryNomineeFetcher;
});

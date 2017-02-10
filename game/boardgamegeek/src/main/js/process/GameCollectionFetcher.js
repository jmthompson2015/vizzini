// https://www.boardgamegeek.com/xmlapi2/collection?own=1&username=ghightshoe

define(function()
{
    "use strict";

    function GameCollectionFetcher(username, callback)
    {
        InputValidator.validateNotEmpty("username", username);
        InputValidator.validateNotNull("callback", callback);

        var that = this;

        this.fetchData = function()
        {
            LOGGER.trace("GameCollectionFetcher.fetchData() start");

            var url = createUrl();
            $.ajax(url).done(this.receiveData).fail(function(jqXHR, textStatus, errorThrown)
            {
                LOGGER.error(errorThrown);
            });

            LOGGER.trace("GameCollectionFetcher.fetchData() end");
        };

        this.receiveData = function(xmlDocument)
        {
            LOGGER.trace("GameCollectionFetcher.receiveData() start");

            // LOGGER.debug("xmlDocument = " + xmlDocument);
            // LOGGER.info("xmlDocument = " + (new XMLSerializer()).serializeToString(xmlDocument));
            var userCollectionIds = parseUserCollectionIds(xmlDocument);
            userCollectionIds.sort(function(a, b)
            {
                return a - b;
            });
            callback(username, userCollectionIds);

            LOGGER.trace("GameCollectionFetcher.receiveData() end");
        };

        function createUrl()
        {
            var baseUrl = "https://query.yahooapis.com/v1/public/yql?q=";

            // https://www.boardgamegeek.com/xmlapi2/collection?own=1&username=ghightshoe
            var sourceUrl = "https://www.boardgamegeek.com/xmlapi2/collection?own=1&username=" + username;
            var query = "select * from xml where url='" + sourceUrl + "'";
            var answer = baseUrl + encodeURIComponent(query);
            LOGGER.debug("url = " + answer);

            return answer;
        }

        function parseUserCollectionIds(xmlDocument)
        {
            LOGGER.trace("GameCollectionFetcher.parseGameDetails() start");

            var answer = [];

            // This gives the data items.
            var xpath = "query/results/items/item";
            var resultType = XPathResult.ORDERED_NODE_ITERATOR_TYPE;
            var rows = xmlDocument.evaluate(xpath, xmlDocument, null, resultType, null);
            var thisRow = rows.iterateNext();

            while (thisRow)
            {
                var idCell = xmlDocument.evaluate("@objectid", thisRow, null, XPathResult.STRING_TYPE, null);
                var id = parseInt(idCell.stringValue.trim());
                answer.push(id);

                thisRow = rows.iterateNext();
            }

            LOGGER.trace("GameCollectionFetcher.parseGameDetails() end");

            return answer;
        }
    }

    return GameCollectionFetcher;
});

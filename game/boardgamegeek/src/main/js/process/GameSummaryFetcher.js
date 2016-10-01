define(function()
{
    function GameSummaryFetcher(gameDatabase, page, callback)
    {
        InputValidator.validateNotNull("gameDatabase", gameDatabase);
        InputValidator.validateInRange("page", page, 1, 10);
        InputValidator.validateNotNull("callback", callback);

        var that = this;

        this.fetchData = function()
        {
            LOGGER.trace("GameSummaryFetcher.fetchData() start");

            var url = createUrl();
            $.ajax(url).done(this.receiveData).fail(function(jqXHR, textStatus, errorThrown)
            {
                LOGGER.error(errorThrown);
            });

            LOGGER.trace("GameSummaryFetcher.fetchData() end");
        }

        this.receiveData = function(xmlDocument)
        {
            LOGGER.trace("GameSummaryFetcher.receiveData() start");

            // LOGGER.debug("xmlDocument = " + xmlDocument);
            // LOGGER.trace("xmlDocument = " + (new
            // XMLSerializer()).serializeToString(xmlDocument));
            var gameSummaries = parseGameSummaries(xmlDocument);
            callback(gameSummaries);

            LOGGER.trace("GameSummaryFetcher.receiveData() end");
        }

        function createUrl()
        {
            var baseUrl = "https://query.yahooapis.com/v1/public/yql?q=";

            // https://www.boardgamegeek.com/browse/boardgame
            // https://www.boardgamegeek.com/browse/boardgame/page/2
            var sourceUrl = "https://www.boardgamegeek.com/browse/boardgame";

            if (page && page > 1)
            {
                sourceUrl += "/page/" + page;
            }

            var query = "select * from html where url='" + sourceUrl + "'";
            var answer = baseUrl + encodeURIComponent(query);
            LOGGER.debug("url = _" + answer + "_");

            return answer;
        }

        function parseGameSummaries(xmlDocument)
        {
            LOGGER.trace("GameSummaryFetcher.parseGameSummaries() start");

            var answer = {};

            // This gives the data rows (tr).
            var xpath = "//tr[@id='row_']";
            var resultType = XPathResult.ORDERED_NODE_ITERATOR_TYPE;
            var rows = xmlDocument.evaluate(xpath, xmlDocument, null, resultType, null);
            var thisRow = rows.iterateNext();

            while (thisRow)
            {
                var gameSummary = parseGameSummary(xmlDocument, thisRow);
                answer[gameSummary.id] = gameSummary;

                thisRow = rows.iterateNext();
            }

            LOGGER.trace("GameSummaryFetcher.parseGameSummaries() end");

            return answer;
        }

        function parseGameSummary(xmlDocument, xmlFragment)
        {
            // This gives the data cells (td).
            var xpath = "td";
            var resultType = XPathResult.ORDERED_NODE_SNAPSHOT_TYPE;
            var cells = xmlDocument.evaluate(xpath, xmlFragment, null, resultType, null);

            var boardGameRank = cells.snapshotItem(0).textContent.trim();
            var title = cells.snapshotItem(2).textContent.trim();
            title = title.replace(/\n/g, "");
            title = title.replace(/    /g, " ");
            title = title.replace(/   /g, " ");
            title = title.replace(/  /g, " ");

            var idCell = xmlDocument.evaluate("a/@href", cells.snapshotItem(1), null, XPathResult.STRING_TYPE, null);
            var id = idCell.stringValue.trim();
            id = id.replace("/boardgame/", "");
            var index = id.indexOf("/");
            id = id.substring(0, index);

            var geekRatingDisplay = cells.snapshotItem(3).textContent.trim();
            var averageRatingDisplay = cells.snapshotItem(4).textContent.trim();
            var numVoters = cells.snapshotItem(5).textContent.trim();

            return gameDatabase.newGameSummary(id, title, boardGameRank, geekRatingDisplay, averageRatingDisplay,
                    numVoters);
        }
    }

    return GameSummaryFetcher;
});

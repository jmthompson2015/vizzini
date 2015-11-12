function GameDetailFetcher(gameIds)
{
    var that = this;

    this.fetchData = function()
    {
        LOGGER.trace("GameDetailFetcher.fetchData() start");

        var url = createUrl();
        $.get(url, this.receiveData);

        LOGGER.trace("GameDetailFetcher.fetchData() end");
    }

    this.receiveData = function(xmlDocument)
    {
        LOGGER.trace("GameDetailFetcher.receiveData() start");

        // LOGGER.debug("xmlDocument = " + xmlDocument);
        // LOGGER.debug("xmlDocument = " + (new
        // XMLSerializer()).serializeToString(xmlDocument));
        var gameDetails = parseGameDetails(xmlDocument);
        that.trigger("dataLoaded", gameDetails);

        LOGGER.trace("GameDetailFetcher.receiveData() end");
    }

    function createUrl()
    {
        var baseUrl = "https://query.yahooapis.com/v1/public/yql?q=";

        // https://www.boardgamegeek.com/xmlapi2/thing?id=12333,120677
        var initialValue = "";
        var idsString = gameIds.reduce(function(previousValue, id, i)
        {
            var answer = previousValue + id;

            if (i < gameIds.length - 1)
            {
                answer += ",";
            }

            return answer;
        }, initialValue);

        var sourceUrl = "https://www.boardgamegeek.com/xmlapi2/thing?id=" + idsString;

        var query = "select * from xml where url='" + sourceUrl + "'";
        LOGGER.debug("unencoded url = _" + (baseUrl + query) + "_");
        var answer = baseUrl + encodeURIComponent(query);
        LOGGER.debug("url = _" + answer + "_");

        return answer;
    }

    function parseGameDetails(xmlDocument)
    {
        LOGGER.trace("GameDetailFetcher.parseGameDetails() start");
        var answer = [];

        // This gives the data items.
        var xpath = "query/results/items/item";
        var resultType = XPathResult.ORDERED_NODE_ITERATOR_TYPE;
        var rows = xmlDocument.evaluate(xpath, xmlDocument, null, resultType, null);
        var thisRow = rows.iterateNext();

        while (thisRow)
        {
            var gameDetail = parseGameDetail(xmlDocument, thisRow);
            answer.push(gameDetail);

            thisRow = rows.iterateNext();
        }

        LOGGER.trace("GameDetailFetcher.parseGameDetails() end");

        return answer;
    }

    function parseGameDetail(xmlDocument, xmlFragment)
    {
        var idCell = xmlDocument.evaluate("@id", xmlFragment, null, XPathResult.STRING_TYPE, null);
        var id = idCell.stringValue.trim();

        var titleCell = xmlDocument.evaluate("name[@type='primary']/@value", xmlFragment, null,
                XPathResult.STRING_TYPE, null);
        var title = titleCell.stringValue.trim();

        var yearPublishedCell = xmlDocument.evaluate("yearpublished/@value", xmlFragment, null,
                XPathResult.STRING_TYPE, null);
        var yearPublished = yearPublishedCell.stringValue.trim();

        var minPlayersCell = xmlDocument
                .evaluate("minplayers/@value", xmlFragment, null, XPathResult.STRING_TYPE, null);
        var minPlayers = minPlayersCell.stringValue.trim();

        var maxPlayersCell = xmlDocument
                .evaluate("maxplayers/@value", xmlFragment, null, XPathResult.STRING_TYPE, null);
        var maxPlayers = maxPlayersCell.stringValue.trim();

        var minPlayTimeCell = xmlDocument.evaluate("minplaytime/@value", xmlFragment, null, XPathResult.STRING_TYPE,
                null);
        var minPlayTime = minPlayTimeCell.stringValue.trim();

        var maxPlayTimeCell = xmlDocument.evaluate("maxplaytime/@value", xmlFragment, null, XPathResult.STRING_TYPE,
                null);
        var maxPlayTime = maxPlayTimeCell.stringValue.trim();

        var mechanics = [];

        var xpath = "link[@type='boardgamemechanic']";
        var resultType = XPathResult.ORDERED_NODE_ITERATOR_TYPE;
        var rows = xmlDocument.evaluate(xpath, xmlFragment, null, resultType, null);
        var thisRow = rows.iterateNext();

        while (thisRow)
        {
            var mechIdCell = xmlDocument.evaluate("@id", thisRow, null, XPathResult.STRING_TYPE, null);
            var mechId = mechIdCell.stringValue.trim();
            var nameCell = xmlDocument.evaluate("@value", thisRow, null, XPathResult.STRING_TYPE, null);
            var name = nameCell.stringValue.trim();
            var mechanic = GameDatabase.newMechanic(mechId, name);
            mechanics.push(mechanic);

            thisRow = rows.iterateNext();
        }

        return GameDatabase.newGameDetail(id, title, yearPublished, minPlayers, maxPlayers, minPlayTime, maxPlayTime,
                mechanics);
    }
}

MicroEvent.mixin(GameDetailFetcher);

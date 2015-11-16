// https://query.yahooapis.com/v1/public/yql?q=select * from xml where url='https://www.boardgamegeek.com/xmlapi2/thing?id=42,91,93,188,215,234,521,555,2511,2651,3076,4098,9209,9216,9609,10630,12333,12493,14105,14996'

// https://www.boardgamegeek.com/xmlapi2/thing?id=42,91,93,188,215,234,521,555,2511,2651,3076,4098,9209,9216,9609,10630,12333,12493,14105,14996

function GameDetailFetcher(gameDatabase, gameIds)
{
    var that = this;

    this.fetchData = function()
    {
        LOGGER.trace("GameDetailFetcher.fetchData() start");

        var url = createUrl();
        $.ajax(url).done(this.receiveData).fail(function(jqXHR, textStatus, errorThrown)
        {
            LOGGER.error(errorThrown);
        });

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

        var query = "select * from xml where url=\"" + sourceUrl + "\"";
        LOGGER.debug("unencoded url = " + (baseUrl + query));
        var answer = baseUrl + encodeURIComponent(query);
        LOGGER.debug("url = " + answer);

        return answer;
    }

    function parseEntities(xmlDocument, xmlFragment, type)
    {
        var answer = [];

        var xpath = "link[@type='" + type + "']";
        var resultType = XPathResult.ORDERED_NODE_ITERATOR_TYPE;
        var rows = xmlDocument.evaluate(xpath, xmlFragment, null, resultType, null);
        var thisRow = rows.iterateNext();

        while (thisRow)
        {
            var idCell = xmlDocument.evaluate("@id", thisRow, null, XPathResult.STRING_TYPE, null);
            var id = idCell.stringValue.trim();
            var nameCell = xmlDocument.evaluate("@value", thisRow, null, XPathResult.STRING_TYPE, null);
            var name = nameCell.stringValue.trim();
            var entity = gameDatabase.newEntity(type, id, name);
            answer.push(entity);

            thisRow = rows.iterateNext();
        }

        return answer;
    }

    function parseGameDetails(xmlDocument)
    {
        LOGGER.trace("GameDetailFetcher.parseGameDetails() start");

        var answer = {};

        // This gives the data items.
        var xpath = "query/results/items/item";
        var resultType = XPathResult.ORDERED_NODE_ITERATOR_TYPE;
        var rows = xmlDocument.evaluate(xpath, xmlDocument, null, resultType, null);
        var thisRow = rows.iterateNext();

        while (thisRow)
        {
            var gameDetail = parseGameDetail(xmlDocument, thisRow);
            answer[gameDetail.id] = gameDetail;

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

        var categories = parseEntities(xmlDocument, xmlFragment, "boardgamecategory");
        var designers = parseEntities(xmlDocument, xmlFragment, "boardgamedesigner");
        var mechanics = parseEntities(xmlDocument, xmlFragment, "boardgamemechanic");

        return gameDatabase.newGameDetail(id, title, designers, yearPublished, minPlayers, maxPlayers, minPlayTime,
                maxPlayTime, categories, mechanics);
    }
}

MicroEvent.mixin(GameDetailFetcher);

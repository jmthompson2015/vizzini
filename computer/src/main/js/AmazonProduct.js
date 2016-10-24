function AmazonProduct(part)
{
    InputValidator.validateNotNull("part", part);

    var that = this;
    var EIGHT_HOURS = 8 * 60 * 60 * 1000;

    this.fetchData = function()
    {
        LOGGER.trace("fetchData() start");

        var timestamp = localStorage[part.value + "_timestamp"];
        var cost = localStorage[part.value + "_cost"];

        if (timestamp && cost && Date.now() < timestamp + EIGHT_HOURS)
        {
            part.cost = parseFloat(cost);
        }
        else
        {
            var url = createUrl();
            $.get(url, this.receiveData);
        }

        LOGGER.trace("fetchData() end");
    }

    this.getPart = function()
    {
        return part;
    }

    this.receiveData = function(xmlDocument)
    {
        LOGGER.trace("receiveData() start");

        parsePrice(xmlDocument);
        localStorage[part.value + "_timestamp"] = Date.now();
        localStorage[part.value + "_cost"] = part.cost;
        that.trigger("dataLoaded", that);

        LOGGER.trace("receiveData() end");
    }

    function createUrl()
    {
        var baseUrl = "https://query.yahooapis.com/v1/public/yql?q=";
        var sourceUrl = part.url;

        var query = "select * from html where url='" + sourceUrl + "'";
        var answer = baseUrl + encodeURIComponent(query);

        return answer;
    }

    function parsePrice(xmlDocument)
    {
        var ids = [ "priceblock_saleprice", "priceblock_ourprice" ];

        for (var i = 0; i < ids.length; i++)
        {
            var xpath = "//span[@id='" + ids[i] + "']/text()";
            var nsResolver = null;
            var resultType = XPathResult.STRING_TYPE;
            var result = null;
            var string = xmlDocument.evaluate(xpath, xmlDocument, nsResolver,
                    resultType, result);
            var priceString = string.stringValue;
            priceString = priceString.replace("$", "");
            var price = parseFloat(priceString);

            if (!isNaN(price))
            {
                part.cost = price;
                break;
            }
        }

        if (!part.cost)
        {
            LOGGER.error("Can't parse priceString for part.value = "
                    + part.value);
        }
    }
}

MicroEvent.mixin(AmazonProduct);

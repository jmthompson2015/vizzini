function KeyStatistics(symbol)
{
    InputValidator.validateNotEmpty("symbol", symbol);

    var that = this;

    this.fetchData = function()
    {
        LOGGER.trace("fetchData() start");

        var url = createUrl();
        $.get(url, this.receiveData);

        LOGGER.trace("fetchData() end");
    }

    this.get52WeekHigh = function()
    {
        return _52WeekHigh;
    }

    this.get52WeekLow = function()
    {
        return _52WeekLow;
    }

    this.get52WeekPricePercent = function()
    {
        var price = this.getPrice().number;
        var low = this.get52WeekLow().number;
        var high = this.get52WeekHigh().number;
        var range = high - low;
        LOGGER.trace("price = " + price);
        LOGGER.trace("low = " + low);
        LOGGER.trace("high = " + high);
        LOGGER.trace("range = " + range);
        var answer = Math.round(100.0 * (price - low) / range);
        LOGGER.debug("pricePercent = " + answer);

        return answer;
    }

    this.getDividendYield = function()
    {
        return dividendYield;
    }

    this.getForwardPE = function()
    {
        return forwardPE;
    }

    this.getFreeCashFlow = function()
    {
        return freeCashFlow;
    }

    this.getPrice = function()
    {
        return price;
    }

    this.getSymbol = function()
    {
        return symbol;
    }

    this.receiveData = function(xmlDocument)
    {
        LOGGER.trace("receiveData() start");

        LOGGER.debug("xmlDocument = " + xmlDocument);
        if (symbol === "AAPL")
        {
            var xml_serializer = new XMLSerializer();
            LOGGER.trace("xmlDocument = "
                    + xml_serializer.serializeToString(xmlDocument));
        }
        parsePrice(xmlDocument);
        parseRowData(xmlDocument);
        that.trigger("dataLoaded", that);

        LOGGER.trace("receiveData() end");
    }

    var price;
    var forwardPE;
    var freeCashFlow;
    var _52WeekLow;
    var _52WeekHigh;
    var dividendYield;

    function createUrl()
    {
        var baseUrl = "https://query.yahooapis.com/v1/public/yql?q=";

        // http://finance.yahoo.com/q/ks?s=AAPL+Key+Statistics
        var sourceUrl = "http://finance.yahoo.com/q/ks?s=" + symbol
                + "+Key+Statistics";

        var query = "select * from html where url='" + sourceUrl + "'";
        LOGGER.debug("unencoded url = _" + (baseUrl + query) + "_");
        var answer = baseUrl + encodeURIComponent(query);
        LOGGER.debug("url = _" + answer + "_");

        return answer;
    }

    function parsePrice(xmlDocument)
    {
        // This finds the price (real-time quote).
        var xpath = "//span[@class='time_rtq_ticker']/span/text()";
        var nsResolver = null;
        var resultType = XPathResult.NUMBER_TYPE;
        var result = null;
        var rawPrice = xmlDocument.evaluate(xpath, xmlDocument, nsResolver,
                resultType, result).numberValue;
        LOGGER.debug("rawPrice = " + rawPrice);
        price =
        {
            label: "Price",
            value: rawPrice,
            number: Number(rawPrice)
        };
        LOGGER.debug("price = " + price.label + " " + price.value);
    }

    function parseRowData(xmlDocument)
    {
        // This gives the data rows (tr).
        var xpath = "/query/results/body/div[@id='screen']/div[@id='rightcol']//table[@class='yfnc_datamodoutline1']//table//td[@class='yfnc_tabledata1']/parent::tr";
        var nsResolver = null;
        var resultType = XPathResult.ORDERED_NODE_ITERATOR_TYPE;
        var result = null;
        var rows = xmlDocument.evaluate(xpath, xmlDocument, nsResolver,
                resultType, result);
        var thisRow = rows.iterateNext();

        var i = 0;

        while (thisRow)
        {
            var label = thisRow.firstElementChild.textContent;

            if (label)
            {
                var value = thisRow.lastElementChild.textContent;
                var newData =
                {
                    label: label,
                    value: value,
                    number: Number(value)
                };

                LOGGER.trace(i + " " + newData.label + " " + newData.value);

                if (label.startsWith("Forward P/E"))
                {
                    forwardPE = newData;
                }
                else if (label.startsWith("Levered Free Cash Flow"))
                {
                    var myNumber = newData.value;

                    if (myNumber.endsWith("B"))
                    {
                        myNumber = myNumber.substring(0, myNumber.length - 1);
                    }

                    myNumber = Number(myNumber);
                    newData.number = (isNaN(myNumber) ? "" : myNumber);
                    freeCashFlow = newData;
                }
                else if (label.startsWith("52-Week Low"))
                {
                    _52WeekLow = newData;
                }
                else if (label.startsWith("52-Week High"))
                {
                    _52WeekHigh = newData;
                }
                else if (label.startsWith("Forward Annual Dividend Yield"))
                {
                    var myNumber = newData.value;

                    if (myNumber.endsWith("%"))
                    {
                        myNumber = myNumber.substring(0, myNumber.length - 1);
                    }

                    myNumber = Number(myNumber);
                    newData.number = (isNaN(myNumber) ? "" : myNumber);
                    dividendYield = newData;
                }
            }

            var thisRow = rows.iterateNext();
            i++;
        }
    }
}

// String.endsWith polyfill.
if (!String.prototype.endsWith)
{
    String.prototype.endsWith = function(searchString, position)
    {
        var subjectString = this.toString();
        if (position === undefined || position > subjectString.length)
        {
            position = subjectString.length;
        }
        position -= searchString.length;
        var lastIndex = subjectString.indexOf(searchString, position);
        return lastIndex !== -1 && lastIndex === position;
    };
}

// String.startsWith polyfill.
if (!String.prototype.startsWith)
{
    String.prototype.startsWith = function(searchString, position)
    {
        position = position || 0;
        return this.indexOf(searchString, position) === position;
    };
}

MicroEvent.mixin(KeyStatistics);

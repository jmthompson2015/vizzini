function KeyStatistics(symbol)
{
    InputValidator.validateNotEmpty("symbol", symbol);

    var that = this;

    this.fetchData = function()
    {
        LOGGER.trace("fetchData() start");

        var url = createUrl();

        $.get(url, function(xmlDocument)
        {
            LOGGER.trace("anonymous callback start");

            LOGGER.debug("xmlDocument = " + xmlDocument);
            parsePrice(xmlDocument);
            parseRowData(xmlDocument);
            that.trigger("dataLoaded", that);

            LOGGER.trace("anonymous callback end");
        });

        LOGGER.trace("fetchData() end");
    }

    this.get52WeekHighLabel = function()
    {
        return getLabel(_52WeekHigh);
    }

    this.get52WeekHighValue = function()
    {
        return getValue(_52WeekHigh);
    }

    this.get52WeekLowLabel = function()
    {
        return getLabel(_52WeekLow);
    }

    this.get52WeekLowValue = function()
    {
        return getValue(_52WeekLow);
    }

    this.get52WeekPricePercent = function()
    {
        var price = this.getPriceValue();
        var low = this.get52WeekLowValue();
        var high = this.get52WeekHighValue();
        var range = high - low;
        LOGGER.trace("price = " + price);
        LOGGER.trace("low = " + low);
        LOGGER.trace("high = " + high);
        LOGGER.trace("range = " + range);
        var answer = Math.round(100.0 * (price - low) / range);
        LOGGER.debug("pricePercent = " + answer);

        return answer;
    }

    this.getDividendYieldLabel = function()
    {
        return getLabel(dividendYield);
    }

    this.getDividendYieldValue = function()
    {
        return getValue(dividendYield);
    }

    this.getForwardPELabel = function()
    {
        return getLabel(forwardPE);
    }

    this.getForwardPEValue = function()
    {
        return getValue(forwardPE);
    }

    this.getFreeCashFlowLabel = function()
    {
        return getLabel(freeCashFlow);
    }

    this.getFreeCashFlowValue = function()
    {
        return getValue(freeCashFlow);
    }

    this.getPriceLabel = function()
    {
        return getLabel(price);
    }

    this.getPriceValue = function()
    {
        return getValue(price);
    }

    this.getSymbol = function()
    {
        return symbol;
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

    function getLabel(data)
    {
        var answer = "&nbsp;";

        if (data)
        {
            answer = data.label;
        }

        return answer;
    }

    function getValue(data)
    {
        var answer = "&nbsp;";

        if (data)
        {
            answer = data.value;
        }

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
                };

                LOGGER.trace(i + " " + newData.label + " " + newData.value);

                if (label.startsWith("Forward P/E"))
                {
                    forwardPE = newData;
                }
                else if (label.startsWith("Levered Free Cash Flow"))
                {
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
                    dividendYield = newData;
                    LOGGER.trace("dividendYield = " + dividendYield.label + " "
                            + dividendYield.value);
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

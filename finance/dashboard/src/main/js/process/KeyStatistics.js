define(["process/Action"], function(Action)
{
    "use strict";

    function KeyStatistics(store, symbol)
    {
        InputValidator.validateNotEmpty("store", store);
        InputValidator.validateNotEmpty("symbol", symbol);

        var that = this;

        this.fetchData = function()
        {
            LOGGER.trace("fetchData() start");

            var url = createUrl();
            $.get(url, this.receiveData);

            LOGGER.trace("fetchData() end");
        };

        this.get52WeekPricePercent = function()
        {
            var myPrice = (price ? price.number : undefined);
            var low = (_52WeekLow ? _52WeekLow.number : undefined);
            var high = (_52WeekHigh ? _52WeekHigh.number : undefined);
            var range;
            if (low && high)
            {
                range = high - low;
            }
            LOGGER.trace("myPrice = " + myPrice);
            LOGGER.trace("low = " + low);
            LOGGER.trace("high = " + high);
            LOGGER.trace("range = " + range);
            var answer;
            if (myPrice && low && range)
            {
                answer = Math.round(100.0 * (myPrice - low) / range);
            }
            LOGGER.debug("pricePercent = " + answer);

            return answer;
        };

        this.receiveData = function(xmlDocument)
        {
            LOGGER.trace("receiveData() start");

            LOGGER.debug("xmlDocument = " + xmlDocument);
            if (symbol === "AAPL")
            {
                var xmlSerializer = new XMLSerializer();
                var prettyXML = xmlSerializer.serializeToString(xmlDocument);
                console.log(prettyXML);
            }
            parsePrice(xmlDocument);
            parseRowData(xmlDocument);

            var data = {
                fiftyTwoWeekPricePercent: fiftyTwoWeekPricePercent,
                freeCashFlow: (freeCashFlow ? freeCashFlow.number : undefined),
                forwardPE: (forwardPE ? forwardPE.number : undefined),
                forwardAnnualDividendYield: (dividendYield ? dividendYield.number : undefined),
            };
            store.dispatch(Action.setKeyStatistics(symbol, data));

            LOGGER.trace("receiveData() end");
        };

        var price;
        var forwardPE;
        var freeCashFlow;
        var _52WeekLow;
        var _52WeekHigh;
        var dividendYield;
        var fiftyTwoWeekPricePercent;

        function createUrl()
        {
            var baseUrl = "https://query.yahooapis.com/v1/public/yql?q=";

            // http://finance.yahoo.com/quote/AAPL/key-statistics
            var sourceUrl = "https://finance.yahoo.com/quote/" + symbol + "/key-statistics";

            var query = "select * from html where url='" + sourceUrl + "'";
            LOGGER.debug("unencoded url = _" + (baseUrl + query) + "_");
            var answer = baseUrl + encodeURIComponent(query);
            LOGGER.debug("url = _" + answer + "_");

            return answer;
        }

        function parsePrice(xmlDocument)
        {
            // This finds the price (real-time quote).
            var xpath = "//span[@class='Fw(b) Fz(36px) Mb(-4px)']/text()";
            var nsResolver = null;
            var resultType = XPathResult.NUMBER_TYPE;
            var result = null;
            var rawPrice = xmlDocument.evaluate(xpath, xmlDocument, nsResolver, resultType, result).numberValue;
            LOGGER.debug("rawPrice = " + rawPrice);
            price = {
                label: "Price",
                value: rawPrice,
                number: Number(rawPrice)
            };
            LOGGER.debug("price = " + price.label + " " + price.value);
        }

        function parseRowData(xmlDocument)
        {
            var xml_serializer = new XMLSerializer();
            var myDocument = xml_serializer.serializeToString(xmlDocument);

            var key1 = "root.App.main = ";
            var index1 = myDocument.indexOf(key1);

            if (index1 >= 0)
            {
                var index2 = myDocument.indexOf("\n", index1);
                myDocument = myDocument.substring(index1 + key1.length, index2);
                var data1 = JSON.parse(myDocument);
                var summaryDetail = data1.context.dispatcher.stores.QuoteSummaryStore.summaryDetail;
                var labels = ["forwardPE", /* "freeCashFlow", */ "_52WeekLow", "_52WeekHigh"];
                var keys = ["forwardPE", /* "freeCashFlow", */ "fiftyTwoWeekLow", "fiftyTwoWeekHigh"];

                labels.forEach(function(label, i)
                {
                    var newData = {
                        label: label,
                        value: summaryDetail[keys[i]].fmt,
                        number: summaryDetail[keys[i]].raw,
                    };

                    LOGGER.trace(label + " = " + newData.number);

                    switch (label)
                    {
                        case "_52WeekLow":
                            _52WeekLow = newData;
                            break;
                        case "_52WeekHigh":
                            _52WeekHigh = newData;
                            break;
                        case "forwardPE":
                            forwardPE = newData;
                            break;
                        case "freeCashFlow":
                            freeCashFlow = newData;
                            break;
                    }
                });

                dividendYield = {
                    label: "dividendYield",
                    value: summaryDetail.dividendYield.fmt,
                    number: summaryDetail.dividendYield.raw * 100.0,
                };

                fiftyTwoWeekPricePercent = that.get52WeekPricePercent();
                LOGGER.trace("fiftyTwoWeekPricePercent = " + fiftyTwoWeekPricePercent);
            }
        }
    }

    return KeyStatistics;
});

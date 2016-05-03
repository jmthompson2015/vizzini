define(
        [ "process/Action" ],
        function(Action)
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
                        var xml_serializer = new XMLSerializer();
                        LOGGER.trace("xmlDocument = " + xml_serializer.serializeToString(xmlDocument));
                    }
                    parsePrice(xmlDocument);
                    parseRowData(xmlDocument);

                    var data =
                    {
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

                    // http://finance.yahoo.com/q/ks?s=AAPL+Key+Statistics
                    var sourceUrl = "https://finance.yahoo.com/q/ks?s=" + symbol + "+Key+Statistics";

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
                    var rawPrice = xmlDocument.evaluate(xpath, xmlDocument, nsResolver, resultType, result).numberValue;
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
                    var rows = xmlDocument.evaluate(xpath, xmlDocument, nsResolver, resultType, result);
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
                            var myNumber;

                            if (label.startsWith("Forward P/E"))
                            {
                                forwardPE = newData;
                            }
                            else if (label.startsWith("Levered Free Cash Flow"))
                            {
                                myNumber = newData.value;

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
                                myNumber = newData.value;

                                if (myNumber.endsWith("%"))
                                {
                                    myNumber = myNumber.substring(0, myNumber.length - 1);
                                }

                                myNumber = Number(myNumber);
                                newData.number = (isNaN(myNumber) ? "" : myNumber);
                                dividendYield = newData;
                            }
                        }

                        thisRow = rows.iterateNext();
                        i++;
                    }

                    fiftyTwoWeekPricePercent = that.get52WeekPricePercent();
                }
            }

            return KeyStatistics;
        });

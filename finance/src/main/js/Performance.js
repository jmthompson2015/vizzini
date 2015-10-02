function Performance(symbol)
{
    InputValidator.validateNotEmpty("symbol", symbol);

    var that = this;

    this.fetchData = function()
    {
        LOGGER.trace("fetchData() start");

        var FUND_CONTEXT_PATH = "http://performance.morningstar.com"
                + "/Performance/fund";
        var g_productCode;
        var g_ep;
        var g_region = "USA";
        var align;
        var currency;
        var culture = "en_US";
        var isRemove;
        var symbols = "";
        var holdProductCode = g_productCode == "SRT" ? "COM" : g_productCode;
        var self = this;
        $
                .get(FUND_CONTEXT_PATH + "/trailing-total-returns.action",
                        {
                            t: symbol,
                            s: symbols,
                            ndec: 2,
                            ep: g_ep,
                            align: align,
                            annlz: "true",
                            cur: currency,
                            region: g_region,
                            culture: (culture && culture.length >= 5 ? (culture
                                    .substr(0, 3) + culture.substr(3)
                                    .toUpperCase()) : culture),
                            pageCacheFlag: "true",
                            ops: "clear",
                            comparisonRemove: isRemove,
                            productCode: holdProductCode
                        }, function(respText)
                        {
                            self.receiveData(respText);
                        });

        LOGGER.trace("fetchData() end");
    }

    this.getOneYearTotalReturn = function()
    {
        return oneYearTotalReturn;
    }

    this.getThreeYearTotalReturn = function()
    {
        return threeYearTotalReturn;
    }

    this.getFiveYearTotalReturn = function()
    {
        return fiveYearTotalReturn;
    }

    this.getTenYearTotalReturn = function()
    {
        return tenYearTotalReturn;
    }

    this.getSymbol = function()
    {
        return symbol;
    }

    this.receiveData = function(htmlDocument)
    {
        LOGGER.trace("receiveData() start");

        // Pre-process.
        var key0 = "</thead>";
        var index0 = htmlDocument.indexOf(key0);

        var key1 = "</tbody>";
        var index1 = htmlDocument.indexOf(key1);

        var myDocument = htmlDocument.substring(index0 + key0.length, index1
                + key1.length);

        var key2 = "<tr";
        var index2 = myDocument.lastIndexOf(key2);

        var key3 = "</tr>";
        var index3 = myDocument.lastIndexOf(key3);

        myDocument = myDocument.substring(0, index2)
                + myDocument.substring(index3 + key3.length);

        // Wrap it in a jQuery object.
        var xmlDocument = $(myDocument);
        var cells = xmlDocument.find("td");
        var i = 0;

        cells.each(function()
        {
            if (i === 5)
            {
                oneYearTotalReturn = Number($(this).text());
            }
            else if (i === 6)
            {
                threeYearTotalReturn = Number($(this).text());
            }
            else if (i === 7)
            {
                fiveYearTotalReturn = Number($(this).text());
            }
            else if (i === 8)
            {
                tenYearTotalReturn = Number($(this).text());
            }

            i++;
        });

        LOGGER.debug("oneYearTotalReturn   = " + oneYearTotalReturn);
        LOGGER.debug("threeYearTotalReturn = " + threeYearTotalReturn);
        LOGGER.debug("fiveYearTotalReturn  = " + fiveYearTotalReturn);
        LOGGER.debug("tenYearTotalReturn   = " + tenYearTotalReturn);

        that.trigger("performanceLoaded", that);

        LOGGER.trace("receiveData() end");
    }

    var oneYearTotalReturn;
    var threeYearTotalReturn;
    var fiveYearTotalReturn;
    var tenYearTotalReturn;
}

MicroEvent.mixin(Performance);

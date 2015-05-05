/*
 * Provides methods to call the gw2spidy API.
 * 
 * @see <a href="https://github.com/rubensayshi/gw2spidy/wiki/API-v0.9">GW2Spidy API v0.9</a>
 */
var GW2Spidy =
{
    // Return data type.
    DATA_TYPE: "json",

    // Base URL.
    BASE_URL: "http://www.gw2spidy.com/api/v0.9/json",

    getFullItemList: function(typeId, successFunction)
    {
        InputValidator.validateNotNull("typeId", typeId);
        InputValidator.validateNotNull("successFunction", successFunction);
        LOGGER.debug("GW2Spidy.getFullItemList() typeId = " + typeId);

        var start = new Date().getTime();
        var url = this.BASE_URL + "/all-items/" + typeId;
        LOGGER.info("url = " + url);

        $.get(url, function(data)
        {
            if (LOGGER.isTimeEnabled())
            {
                LOGGER.time("GW2Spidy.getFullItemList() get data", start,
                        new Date().getTime());
            }

            if (data)
            {
                LOGGER.debug("GW2Spidy.getFullItemList() data.count = "
                        + data.count);
                var results = data.results;
                LOGGER.debug("GW2Spidy.getFullItemList() results.length = "
                        + results.length);
                successFunction(results);
            }

            if (LOGGER.isTimeEnabled())
            {
                LOGGER.time("GW2Spidy.getFullItemList() after successFunction",
                        start, new Date().getTime());
            }
        }, this.DATA_TYPE);
    },

    getRarities: function(successFunction)
    {
        InputValidator.validateNotNull("successFunction", successFunction);

        var url = this.BASE_URL + "/rarities";

        $.get(url, function(data)
        {
            if (data)
            {
                var results = data.results;
                successFunction(results);
            }
        }, this.DATA_TYPE);
    },

    getTypes: function(successFunction)
    {
        InputValidator.validateNotNull("successFunction", successFunction);

        var url = this.BASE_URL + "/types";

        $.get(url, function(data)
        {
            if (data)
            {
                var results = data.results;
                successFunction(results);
            }
        }, this.DATA_TYPE);
    },
}

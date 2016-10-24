/*
 * Provides a handler for the paginated recipe list call.
 */
function FullRecipeListGetter(disciplineId, filter, successFunction)
{
    InputValidator.validateNotNull("disciplineId", disciplineId);
    InputValidator.validateNotNull("filter", filter);
    InputValidator.validateNotNull("successFunction", successFunction);

    var that = this;
    var fullResults = [];
    var myFilter;
    var pageStart;
    var pageResponsesRemaining;
    var productIdToRecipe = {};
    var itemStart;
    var itemResponsesRemaining;

    this.start = function()
    {
        pageStart = new Date().getTime();

        noRange = new FilterRange(false, 0, false, 0);
        myFilter = new RecipeFilter(filter.getRatingRange(), filter
                .getCostRange(), filter.getBidRange(), filter.getAskRange(),
                noRange, noRange, filter.getBidCostRatioRange(), filter
                        .getAskCostRatioRange(), filter.getAskBidRatioRange(),
                noRange);

        pageRequest(1);
    }

    function itemRequest(recipe)
    {
        var productId = RecipeComputer.getProductId(recipe);
        productIdToRecipe[productId] = recipe;
        GW2Spidy.getItemData(productId, itemResponse, GW2Spidy.DATA_TYPE);
    }

    function itemResponse(result)
    {
        if (result)
        {
            var productId = ItemComputer.getId(result);
            itemResponsesRemaining--;
            LOGGER.info("itemResponsesRemaining = " + itemResponsesRemaining);
            var recipe = productIdToRecipe[productId];
            recipe.result_item_name = result.name;
            recipe.offer_availability = result.offer_availability;
            recipe.sale_availability = result.sale_availability;

            if (itemResponsesRemaining === 0)
            {
                // Done.
                productIdToRecipe = {};
                successFunction(fullResults);

                if (LOGGER.isTimeEnabled())
                {
                    LOGGER
                            .time(
                                    "GW2Spidy.getFullRecipeList() after successFunction",
                                    pageStart, new Date().getTime());
                }
            }
        }
    }

    function pageRequest(page)
    {
        var url = GW2Spidy.BASE_URL + "/recipes/" + disciplineId + "/" + page;
        LOGGER.debug("url = " + url);

        $.get(url, pageResponse, GW2Spidy.DATA_TYPE);
    }

    function pageResponse(data)
    {
        if (data)
        {
            var page = data.page;

            if (page === 1)
            {
                // Request the rest of the pages.
                pageResponsesRemaining = data.last_page;

                for (var i = 2; i <= pageResponsesRemaining; i++)
                {
                    pageRequest(i);
                }
            }

            pageResponsesRemaining--;
            LOGGER.info("pageResponsesRemaining = " + pageResponsesRemaining);

            // Filter the results.
            var previous = LOGGER.isTimeEnabled();
            LOGGER.setTimeEnabled(false);
            var myResults = myFilter.filter(data.results);
            LOGGER.setTimeEnabled(previous);

            // Concatenate the results.
            fullResults = fullResults.concat(myResults);

            if (pageResponsesRemaining === 0)
            {
                // Done.
                LOGGER.info("fullResults.length = " + fullResults.length);

                if (fullResults.length > 0)
                {
                    // Get supply and demand.
                    itemStart = new Date().getTime();
                    itemResponsesRemaining = fullResults.length;

                    for (var i = 0; i < fullResults.length; i++)
                    {
                        var recipe = fullResults[i];
                        itemRequest(recipe);
                    }
                }
                else
                {
                    // Done.
                    successFunction(fullResults);

                    if (LOGGER.isTimeEnabled())
                    {
                        LOGGER
                                .time(
                                        "GW2Spidy.getFullRecipeList() after successFunction",
                                        pageStart, new Date().getTime());
                    }
                }
            }
        }
    }
}

/*
 * Provides methods to call the gw2spidy API.
 * 
 * @see <a href="https://github.com/rubensayshi/gw2spidy/wiki/API-v0.9">GW2Spidy
 *      API v0.9</a>
 */
var GW2Spidy =
{
    // Return data type.
    DATA_TYPE: "json",

    // Base URL.
    BASE_URL: "http://www.gw2spidy.com/api/v0.9/json",

    getDisciplines: function(successFunction)
    {
        InputValidator.validateNotNull("successFunction", successFunction);

        var url = this.BASE_URL + "/disciplines";

        $.get(url, function(data)
        {
            if (data)
            {
                var results = data.results;
                successFunction(results);
            }
        }, this.DATA_TYPE);
    },

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

    getFullRecipeList: function(disciplineId, filter, successFunction)
    {
        InputValidator.validateNotNull("disciplineId", disciplineId);
        InputValidator.validateNotNull("filter", filter);
        InputValidator.validateNotNull("successFunction", successFunction);

        var getter = new FullRecipeListGetter(disciplineId, filter,
                successFunction);

        getter.start();
    },

    getItemData: function(itemId, successFunction)
    {
        InputValidator.validateNotNull("itemId", itemId);
        InputValidator.validateNotNull("successFunction", successFunction);

        var url = this.BASE_URL + "/item/" + itemId;

        $.get(url, function(data)
        {
            if (data)
            {
                var result = data.result;
                successFunction(result);
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

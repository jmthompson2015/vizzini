/*
 * Provides a recipe sorter.
 */
var RecipeSorter =
{
    sort: function(results)
    {
        var start = new Date().getTime();
        var answer;

        if (results)
        {
            answer = results.sort(function(item0, item1)
            {
                var ret;

                if (item0 === item1)
                {
                    ret = 0;
                }
                else if (item0 == null)
                {
                    ret = -1;
                }
                else if (item1 == null)
                {
                    ret = 1;
                }
                else
                {
                    var a2c0 = RecipeComputer.computeAskCostRatio(item0);
                    var a2c1 = RecipeComputer.computeAskCostRatio(item1);

                    // Change to match the displayed precision.
                    if (typeof a2c0 === "number")
                    {
                        a2c0 = CraftingFormat.round2(a2c0);
                    }

                    if (typeof a2c1 === "number")
                    {
                        a2c1 = CraftingFormat.round2(a2c1);
                    }

                    if (a2c0 === a2c1)
                    {
                        var b2c0 = RecipeComputer.computeBidCostRatio(item0);
                        var b2c1 = RecipeComputer.computeBidCostRatio(item1);

                        if (b2c0 === b2c1)
                        {
                            ret = 0;
                        }
                        else if (b2c0 < b2c1)
                        {
                            ret = 1;
                        }
                        else
                        {
                            ret = -1;
                        }
                    }
                    else if (a2c0 < a2c1)
                    {
                        ret = 1;
                    }
                    else
                    {
                        ret = -1;
                    }
                }

                return ret;
            });
        }

        if (LOGGER.isTimeEnabled())
        {
            LOGGER.time("RecipeSorter.sort()", start, new Date().getTime());
        }

        return answer;
    },
}

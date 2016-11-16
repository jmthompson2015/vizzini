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
                    var acr0 = RecipeComputer.computeAskCostRatio(item0);
                    var acr1 = RecipeComputer.computeAskCostRatio(item1);

                    // Change to match the displayed precision.
                    if (typeof acr0 === "number")
                    {
                        acr0 = CraftingFormat.round2(acr0);
                    }

                    if (typeof acr1 === "number")
                    {
                        acr1 = CraftingFormat.round2(acr1);
                    }

                    if (acr0 === acr1)
                    {
                        var dsr0 = RecipeComputer.computeDemandSupplyRatio(item0);
                        var dsr1 = RecipeComputer.computeDemandSupplyRatio(item1);

                        if (dsr0 === dsr1)
                        {
                            ret = 0;
                        }
                        else if (dsr0 < dsr1)
                        {
                            ret = 1;
                        }
                        else
                        {
                            ret = -1;
                        }
                    }
                    else if (acr0 < acr1)
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

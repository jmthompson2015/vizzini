/*
 * Provides an item sorter.
 */
var ItemSorter =
{
    sort: function(results)
    {
        var start = new Date().getTime();
        var answer;

        if (results)
        {
            answer = results
                    .sort(function(item0, item1)
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
                            var a2b0 = ItemComputer.computeAskBidRatio(item0);
                            var a2b1 = ItemComputer.computeAskBidRatio(item1);

                            // Change to match the displayed precision.
                            if (typeof a2b0 === "number")
                            {
                                a2b0 = CommerceFormat.round2(a2b0);
                            }

                            if (typeof a2b1 === "number")
                            {
                                a2b1 = CommerceFormat.round2(a2b1);
                            }

                            if (a2b0 === a2b1)
                            {
                                var d2s0 = ItemComputer
                                        .computeDemandSupplyRatio(item0);
                                var d2s1 = ItemComputer
                                        .computeDemandSupplyRatio(item1);

                                if (d2s0 === d2s1)
                                {
                                    ret = 0;
                                }
                                else if (d2s0 < d2s1)
                                {
                                    ret = 1;
                                }
                                else
                                {
                                    ret = -1;
                                }
                            }
                            else if (a2b0 < a2b1)
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
            LOGGER.time("ItemSorter.sort()", start, new Date().getTime());
        }

        return answer;
    },
}

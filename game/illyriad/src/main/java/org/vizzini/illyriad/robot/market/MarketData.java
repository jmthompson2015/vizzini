package org.vizzini.illyriad.robot.market;

import org.apache.commons.lang3.StringUtils;
import org.vizzini.illyriad.ResourceProduct;

/**
 * Provides a market data.
 */
public final class MarketData
{
    /** Ask price. */
    private final String askPrice;

    /** Bid price. */
    private final String bidPrice;

    /** Resource product. */
    private final ResourceProduct product;

    /**
     * Construct this object.
     * 
     * @param product Resource product. (required)
     * @param askPrice Ask price. (one of ask/bid required)
     * @param bidPrice Bid price. (one of ask/bid required)
     */
    @SuppressWarnings("hiding")
    public MarketData(final ResourceProduct product, final String askPrice, final String bidPrice)
    {
        if (product == null)
        {
            throw new IllegalArgumentException("product is null");
        }

        if (StringUtils.isEmpty(askPrice) && StringUtils.isEmpty(bidPrice))
        {
            throw new IllegalArgumentException("askPrice and bidPrice are both null or empty");
        }

        this.product = product;
        this.askPrice = askPrice;
        this.bidPrice = bidPrice;
    }

    /**
     * @return the askPrice
     */
    public String getAskPrice()
    {
        return askPrice;
    }

    /**
     * @return the bidPrice
     */
    public String getBidPrice()
    {
        return bidPrice;
    }

    /**
     * @return the product
     */
    public ResourceProduct getProduct()
    {
        return product;
    }
}

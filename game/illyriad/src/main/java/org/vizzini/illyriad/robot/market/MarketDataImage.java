package org.vizzini.illyriad.robot.market;

import org.apache.commons.lang3.StringUtils;
import org.vizzini.ai.robot.RobotImage;
import org.vizzini.illyriad.ResourceProduct;

/**
 * Provides a market data image.
 */
public final class MarketDataImage
{
    /** Ask filename. */
    private final String askFilename;

    /** Ask image. */
    private final RobotImage askImage;

    /** Bid filename. */
    private final String bidFilename;

    /** Bid image. */
    private final RobotImage bidImage;

    /** Resource product. */
    private final ResourceProduct product;

    /**
     * Construct this object.
     * 
     * @param product Resource product.
     * @param askFilename Ask filename.
     * @param askImage Ask image.
     * @param bidFilename Bid filename.
     * @param bidImage Bid image.
     */
    @SuppressWarnings("hiding")
    public MarketDataImage(final ResourceProduct product, final String askFilename, final RobotImage askImage,
            final String bidFilename, final RobotImage bidImage)
    {
        if (product == null)
        {
            throw new IllegalArgumentException("product is null");
        }

        if (StringUtils.isEmpty(askFilename) != (askImage == null))
        {
            throw new IllegalArgumentException("askFilename and askImage are inconsistent");
        }

        if (StringUtils.isEmpty(bidFilename) != (bidImage == null))
        {
            throw new IllegalArgumentException("bidFilename and bidImage are inconsistent");
        }

        this.product = product;
        this.askFilename = askFilename;
        this.askImage = askImage;
        this.bidFilename = bidFilename;
        this.bidImage = bidImage;
    }

    /**
     * @return the askFilename
     */
    public String getAskFilename()
    {
        return askFilename;
    }

    /**
     * @return the askImage
     */
    public RobotImage getAskImage()
    {
        return askImage;
    }

    /**
     * @return the bidFilename
     */
    public String getBidFilename()
    {
        return bidFilename;
    }

    /**
     * @return the bidImage
     */
    public RobotImage getBidImage()
    {
        return bidImage;
    }

    /**
     * @return the product
     */
    public ResourceProduct getProduct()
    {
        return product;
    }
}

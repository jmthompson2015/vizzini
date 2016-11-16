package org.vizzini.illyriad.robot.market;

import java.awt.Point;
import java.awt.Rectangle;

/**
 * Provides configuration values for a market data robot.
 * 
 * <p>
 * Coordinates in this class are specific to these conditions.
 * </p>
 * <ul>
 * <li>Mac OS X 10.8.5</li>
 * <li>Firefox 24.0</li>
 * <li>1280 x 1024 display</li>
 * <li>Firefox positioned at top left of screen</li>
 * <li>Firefox width at least enough to display the Per Item column on the Illyriad Trade Markets page</li>
 * <li>Firefox extends full height of screen</li>
 * </ul>
 */
public final class RobotConfiguration
{
    /** Ask price rectangle. */
    private final Rectangle askPriceRectangle = new Rectangle(210, 463, (718 - 210), (492 - 463));

    /** Back button point. */
    private final Point backButtonPoint = new Point(23, 92);

    /** Bid price rectangle. */
    private final Rectangle bidPriceRectangle = new Rectangle(210, 707, (718 - 210), (737 - 707));

    /** Browser app name. */
    private final String browserAppName = "Firefox.app";

    /** Login button point. */
    private final Point loginButtonPoint = new Point(255, 710);

    /** Logout button point. */
    private final Point logoutButtonPoint = new Point(15, 200);

    /** Markets and prices button point. */
    private final Point marketsAndPricesPoint = new Point(484, 210);

    /** Markets show all checkbox point. */
    private final Point marketsShowAllPoint = new Point(27, 894);

    /** Maximum delta height. */
    private final int maxDeltaHeight = 2;

    /** Maximum delta width. */
    private final int maxDeltaWidth = 2;

    /** Maximum pixel count. */
    private final int maxPixelCount = 102;

    /** Resource child items rectangle. */
    private final Rectangle resourceChildRectangle = new Rectangle(70, 393, (193 - 70), (883 - 393));

    /** Resource items rectangle. */
    private final Rectangle resourceItemsRectangle = new Rectangle(40, 393, (193 - 40), (883 - 393));

    /** Resource items scroll bar rectangle. */
    private final Rectangle resourcesScrollBarRectangle = new Rectangle(193, resourceItemsRectangle.y, (208 - 193),
            resourceItemsRectangle.height);

    /** Trade overview button point. */
    private final Point tradeOverviewPoint = new Point(480, 170);

    /**
     * Construct this object.
     */
    public RobotConfiguration()
    {
        // FIXME: read data from file?
    }

    /**
     * @return the askPriceRectangle
     */
    public Rectangle getAskPriceRectangle()
    {
        return askPriceRectangle;
    }

    /**
     * @return the backButtonPoint
     */
    public Point getBackButtonPoint()
    {
        return backButtonPoint;
    }

    /**
     * @return the bidPriceRectangle
     */
    public Rectangle getBidPriceRectangle()
    {
        return bidPriceRectangle;
    }

    /**
     * @return the browserAppName
     */
    public String getBrowserAppName()
    {
        return browserAppName;
    }

    /**
     * @return the loginButtonPoint
     */
    public Point getLoginButtonPoint()
    {
        return loginButtonPoint;
    }

    /**
     * @return the logoutButtonPoint
     */
    public Point getLogoutButtonPoint()
    {
        return logoutButtonPoint;
    }

    /**
     * @return the marketsAndPricesPoint
     */
    public Point getMarketsAndPricesPoint()
    {
        return marketsAndPricesPoint;
    }

    /**
     * @return the marketsShowAllPoint
     */
    public Point getMarketsShowAllPoint()
    {
        return marketsShowAllPoint;
    }

    /**
     * @return the maxDeltaHeight
     */
    public int getMaxDeltaHeight()
    {
        return maxDeltaHeight;
    }

    /**
     * @return the maxDeltaWidth
     */
    public int getMaxDeltaWidth()
    {
        return maxDeltaWidth;
    }

    /**
     * @return the maxPixelCount
     */
    public int getMaxPixelCount()
    {
        return maxPixelCount;
    }

    /**
     * @return the resourceChildRectangle
     */
    public Rectangle getResourceChildRectangle()
    {
        return resourceChildRectangle;
    }

    /**
     * @return the resourceItemsRectangle
     */
    public Rectangle getResourceItemsRectangle()
    {
        return resourceItemsRectangle;
    }

    /**
     * @return the resourcesScrollBarRectangle
     */
    public Rectangle getResourcesScrollBarRectangle()
    {
        return resourcesScrollBarRectangle;
    }

    /**
     * @return the tradeOverviewPoint
     */
    public Point getTradeOverviewPoint()
    {
        return tradeOverviewPoint;
    }
}

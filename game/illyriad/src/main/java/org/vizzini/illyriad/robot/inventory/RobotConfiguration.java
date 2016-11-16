package org.vizzini.illyriad.robot.inventory;

import java.awt.Point;
import java.awt.Rectangle;

/**
 * Provides configuration values for an inventory data robot.
 * 
 * <p>
 * Coordinates in this class are specific to these conditions.
 * </p>
 * <ul>
 * <li>Mac OS X 10.8.5</li>
 * <li>Firefox 24.0</li>
 * <li>1280 x 1024 display</li>
 * <li>Firefox positioned at top left of screen</li>
 * <li>Firefox extends full width and height of screen</li>
 * </ul>
 */
public final class RobotConfiguration
{
    /** Anatomies tab point. */
    private final Point anatomiesPoint = new Point(392, 654);

    /** Back button point. */
    private final Point backButtonPoint = new Point(23, 92);

    /** Browser app name. */
    private final String browserAppName = "Firefox.app";

    /** City forward button point. */
    private final Point cityForwardPoint = new Point(255, 226);

    /** City map button point. */
    private final Point cityMapPoint = new Point(237, 173);

    /** Data count rectangle. */
    private final Rectangle dataCountRectangle = new Rectangle(15, 671, (734 - 15), (706 - 671));

    /** Herbs tab point. */
    private final Point herbsPoint = new Point(533, 654);

    /** Inventory button point. */
    private final Point inventoryPoint = new Point(276, 173);

    /** Login button point. */
    private final Point loginButtonPoint = new Point(255, 710);

    /** Logout button point. */
    private final Point logoutButtonPoint = new Point(15, 200);

    /** Minerals tab point. */
    private final Point mineralsPoint = new Point(470, 654);

    /** Resources tab point. */
    private final Point resourcesPoint = new Point(102, 654);

    /** Threshold color scale. (typically 1.0) */
    private final double thresholdColorScale = 0.92;

    /**
     * @return the anatomiesPoint
     */
    public Point getAnatomiesPoint()
    {
        return anatomiesPoint;
    }

    /**
     * @return the backButtonPoint
     */
    public Point getBackButtonPoint()
    {
        return backButtonPoint;
    }

    /**
     * @return the browserAppName
     */
    public String getBrowserAppName()
    {
        return browserAppName;
    }

    /**
     * @return the cityForwardPoint
     */
    public Point getCityForwardPoint()
    {
        return cityForwardPoint;
    }

    /**
     * @return the cityMapPoint
     */
    public Point getCityMapPoint()
    {
        return cityMapPoint;
    }

    /**
     * @return the dataCountRectangle
     */
    public Rectangle getDataCountRectangle()
    {
        return dataCountRectangle;
    }

    /**
     * @return the herbsPoint
     */
    public Point getHerbsPoint()
    {
        return herbsPoint;
    }

    /**
     * @return the inventoryPoint
     */
    public Point getInventoryPoint()
    {
        return inventoryPoint;
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
     * @return the mineralsPoint
     */
    public Point getMineralsPoint()
    {
        return mineralsPoint;
    }

    /**
     * @return the resourcesPoint
     */
    public Point getResourcesPoint()
    {
        return resourcesPoint;
    }

    /**
     * @return the thresholdColorScale
     */
    public double getThresholdColorScale()
    {
        return thresholdColorScale;
    }
}

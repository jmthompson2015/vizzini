package org.vizzini.ai.robot;

import java.awt.Point;

/**
 * Provides data needed by a mouse drag and drop actuator.
 */
public final class DragAndDropData
{
    /** Start point. */
    private final Point startPoint;

    /** End point. */
    private final Point endPoint;

    /** Delay time. (ms) */
    private final int delayTime;

    /**
     * Construct this object.
     * 
     * @param x0 Start X coordinate.
     * @param y0 Start Y coordinate.
     * @param x1 End X coordinate.
     * @param y1 End Y coordinate.
     * @param delayTime Delay time. (ms)
     */
    @SuppressWarnings("hiding")
    public DragAndDropData(final int x0, final int y0, final int x1, final int y1, final int delayTime)
    {
        this(new Point(x0, y0), new Point(x1, y1), delayTime);
    }

    /**
     * Construct this object.
     * 
     * @param startPoint Start point. (required)
     * @param endPoint End point. (required)
     * @param delayTime Delay time. (ms)
     */
    @SuppressWarnings("hiding")
    public DragAndDropData(final Point startPoint, final Point endPoint, final int delayTime)
    {
        if (startPoint == null)
        {
            throw new IllegalArgumentException("startPoint is null");
        }

        if (endPoint == null)
        {
            throw new IllegalArgumentException("endPoint is null");
        }

        this.startPoint = startPoint;
        this.endPoint = endPoint;
        this.delayTime = delayTime;
    }

    /**
     * @return the delayTime
     */
    public int getDelayTime()
    {
        return delayTime;
    }

    /**
     * @return the endPoint
     */
    public Point getEndPoint()
    {
        return endPoint;
    }

    /**
     * @return the startPoint
     */
    public Point getStartPoint()
    {
        return startPoint;
    }
}

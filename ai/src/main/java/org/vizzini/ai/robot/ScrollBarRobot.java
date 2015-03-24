package org.vizzini.ai.robot;

import java.awt.Adjustable;
import java.awt.Point;
import java.awt.Rectangle;

/**
 * Provides a robot to sense and actuate a scroll bar. Methods either deal with screen pixels or view units. Typically,
 * view units refer to pixels in the view pane. If the maximum is not provided upon construction, then it is calculated
 * as the height of the view pane.
 */
public final class ScrollBarRobot
{
    /** Actuator kit. */
    private final MacActuatorKit actuatorKit;

    /** Scroll bar extent in pixels. */
    private final Rectangle extent;

    /** Maximum value. */
    private Integer maximum;

    /** Minimum value. */
    private final int minimum;

    /** Orientation. */
    private final int orientation;

    /** Sensor suite. */
    private final SensorSuite sensorSuite;

    /** Scroll bar to view ratio. */
    private Double sbToViewRatio;

    /**
     * Construct this object.
     * 
     * @param orientation The component's orientation (horizontal or vertical).
     * @param extent Scroll bar extent in pixels.
     * @param actuatorKit Actuator kit.
     * @param sensorSuite Sensor suite.
     */
    @SuppressWarnings("hiding")
    public ScrollBarRobot(final int orientation, final Rectangle extent, final MacActuatorKit actuatorKit,
            final SensorSuite sensorSuite)
    {
        this(orientation, extent, actuatorKit, sensorSuite, 0, null);
    }

    /**
     * Construct this object.
     * 
     * @param orientation The component's orientation (horizontal or vertical).
     * @param extent Scroll bar extent in pixels.
     * @param actuatorKit Actuator kit.
     * @param sensorSuite Sensor suite.
     * @param minimum Minimum value.
     * @param maximum Maximum value.
     */
    @SuppressWarnings("hiding")
    public ScrollBarRobot(final int orientation, final Rectangle extent, final MacActuatorKit actuatorKit,
            final SensorSuite sensorSuite, final int minimum, final Integer maximum)
    {
        if (!((orientation == Adjustable.HORIZONTAL) || (orientation == Adjustable.VERTICAL)))
        {
            throw new IllegalArgumentException("orientation must be Adjustable.HORIZONTAL or Adjustable.VERTICAL: "
                    + orientation);
        }

        if (extent == null)
        {
            throw new IllegalArgumentException("extent is null");
        }

        if (actuatorKit == null)
        {
            throw new IllegalArgumentException("actuatorKit is null");
        }

        if (sensorSuite == null)
        {
            throw new IllegalArgumentException("sensorSuite is null");
        }

        this.orientation = orientation;
        this.extent = extent;
        this.actuatorKit = actuatorKit;
        this.sensorSuite = sensorSuite;
        this.minimum = minimum;
        this.maximum = maximum;
    }

    /**
     * @return the extent in pixels.
     */
    public Rectangle getExtent()
    {
        return extent;
    }

    /**
     * @return the invisible amount at the end in pixels.
     */
    public int getInvisibleAmountEnd()
    {
        final int end = (isHorizontal() ? extent.x + extent.width : extent.y + extent.height);

        return end - detectKnobEnd();
    }

    /**
     * @return the invisible amount at the start in pixels.
     */
    public int getInvisibleAmountStart()
    {
        final int start = (isHorizontal() ? extent.x : extent.y);

        return detectKnobStart() - start;
    }

    /**
     * @return the maximum in view units.
     */
    public int getMaximum()
    {
        if (maximum == null)
        {
            final int dimension = (isHorizontal() ? extent.width : extent.height);
            maximum = (dimension * dimension) / getVisibleAmount();
        }

        return maximum;
    }

    /**
     * @return the minimum in view units.
     */
    public int getMinimum()
    {
        return minimum;
    }

    /**
     * @return the component's orientation (horizontal or vertical).
     */
    public int getOrientation()
    {
        return orientation;
    }

    /**
     * @return the scrollbar's value in view units.
     */
    public int getValue()
    {
        final double ratio = 1.0 / getScrollBarToViewRatio();
        final int invisibleStart = getInvisibleAmountStart();
        final int min = getMinimum();
        // System.out.println("getValue() ratio = " + ratio + " invisibleStart = " + invisibleStart + " min = " + min);

        return asInt(ratio * invisibleStart) + min;
    }

    /**
     * @return the scrollbar's extent, aka its "visibleAmount" in pixels.
     */
    public int getVisibleAmount()
    {
        final int start = detectKnobStart();
        final int end = detectKnobEnd();

        return end - start;
    }

    /**
     * Page down by clicking near the end of the scroll bar area.
     * 
     * @return this object.
     */
    public ScrollBarRobot pageDown()
    {
        int x;
        int y;

        final int knobEnd = detectKnobEnd();
        final int end = computeScrollBarEnd(isVertical());
        final int delta = asInt((end - knobEnd) / 2.0);

        if (isVertical())
        {
            x = computeScrollBarCenter(true);
            y = end - delta;
        }
        else
        {
            x = end - delta;
            y = computeScrollBarCenter(false);
        }

        final MouseLeftClickActuator leftClicker = actuatorKit.getMouseLeftClicker();
        leftClicker.actuate(new Point(x, y)).delay(500);

        return this;
    }

    /**
     * Page up by clicking near the start of the scroll bar area.
     * 
     * @return this object.
     */
    public ScrollBarRobot pageUp()
    {
        int x;
        int y;

        final int start = (isVertical() ? extent.y : extent.x);
        final int knobStart = detectKnobStart();
        final int delta = asInt((knobStart - start) / 2.0);

        if (isVertical())
        {
            x = computeScrollBarCenter(true);
            y = start + delta;
        }
        else
        {
            x = start + delta;
            y = computeScrollBarCenter(false);
        }

        final MouseLeftClickActuator leftClicker = actuatorKit.getMouseLeftClicker();
        leftClicker.actuate(new Point(x, y)).delay(500);

        return this;
    }

    /**
     * @param value Value in view units.
     * 
     * @return this object.
     */
    public ScrollBarRobot setValue(final int value)
    {
        setValueToStart();

        final int center = computeScrollBarCenter(isVertical());
        final int knobStart = detectKnobStart();
        final int visibleAmount = getVisibleAmount();
        final int delta = asInt(getScrollBarToViewRatio() * value);
        final int delayTime = 250;

        DragAndDropData data;

        if (isVertical())
        {
            final int x = center;
            final int y0 = knobStart + (visibleAmount / 2);
            final int y1 = y0 + delta;
            // System.out.println("setValue(" + value + ") delta = " + delta + " y0 = " + y0 + " y1 = " + y1);

            data = new DragAndDropData(x, y0, x, y1, delayTime);
        }
        else
        {
            final int y = center;
            final int x0 = knobStart + (visibleAmount / 2);
            final int x1 = x0 + delta;

            data = new DragAndDropData(x0, y, x1, y, delayTime);
        }

        final DragAndDropActuator dragAndDropper = actuatorKit.getDragAndDropper();
        dragAndDropper.actuate(data).delay(500);

        return this;
    }

    /**
     * @return this object.
     */
    public ScrollBarRobot setValueToEnd()
    {
        DragAndDropData data;
        final int delayTime = 250;

        if (isVertical())
        {
            final int x = computeScrollBarCenter(true);
            final int y0 = detectKnobEnd() - 10;
            final int y1 = extent.y + extent.height;

            data = new DragAndDropData(x, y0, x, y1, delayTime);
        }
        else
        {
            final int y = computeScrollBarCenter(false);
            final int x0 = detectKnobEnd() - 10;
            final int x1 = extent.x + extent.width;

            data = new DragAndDropData(x0, y, x1, y, delayTime);
        }

        final DragAndDropActuator dragAndDropper = actuatorKit.getDragAndDropper();
        dragAndDropper.actuate(data).delay(500);

        return this;
    }

    /**
     * @return this object.
     */
    public ScrollBarRobot setValueToStart()
    {
        DragAndDropData data;
        final int delayTime = 250;

        if (isVertical())
        {
            final int x = computeScrollBarCenter(true);
            final int y0 = detectKnobStart() + 10;
            final int y1 = extent.y;

            data = new DragAndDropData(x, y0, x, y1, delayTime);
        }
        else
        {
            final int y = computeScrollBarCenter(false);
            final int x0 = detectKnobStart() + 10;
            final int x1 = extent.x;

            data = new DragAndDropData(x0, y, x1, y, delayTime);
        }

        final DragAndDropActuator dragAndDropper = actuatorKit.getDragAndDropper();
        dragAndDropper.actuate(data).delay(500);

        return this;
    }

    /**
     * @param value Value.
     * 
     * @return the given parameter as the nearest integer.
     */
    private int asInt(final double value)
    {
        return (int)Math.round(value);
    }

    /**
     * @param isVertical Flag indicating if the vertical center is requested.
     * 
     * @return the center coordinate of the scroll bar.
     */
    private int computeScrollBarCenter(final boolean isVertical)
    {
        int answer;

        if (isVertical)
        {
            answer = extent.x + (extent.width / 2);
        }
        else
        {
            answer = extent.y + (extent.height / 2);
        }

        return answer;
    }

    /**
     * @param isVertical Flag indicating if the vertical center is requested.
     * 
     * @return the end coordinate of the scroll bar.
     */
    private int computeScrollBarEnd(final boolean isVertical)
    {
        int answer;

        if (isVertical)
        {
            answer = extent.y + extent.height;
        }
        else
        {
            answer = extent.x + extent.width;
        }

        return answer;
    }

    /**
     * @param isForward Flag indicating the direction of the search.
     * 
     * @return the X coordinate of the knob.
     */
    private int detectHorizontalKnob(final boolean isForward)
    {
        int answer = -1;

        final int startX = extent.x;
        final int endX = extent.x + extent.width;

        final int x = (isForward ? startX : endX);
        final int y = computeScrollBarCenter(false);
        final int deltaX = (isForward ? 1 : -1);

        final ScreenPixelColorSensor sensor = sensorSuite.getScreenPixelColorSensor();
        final Point point = new Point(x, y);

        while ((startX <= point.x) && (point.x <= endX))
        {
            final RobotColor color = sensor.sense(point);
            final int grayscale = color.getRed();

            if (grayscale < 182)
            {
                answer = point.x;
                break;
            }

            point.x += deltaX;
        }

        return answer;
    }

    /**
     * @return the Y coordinate of the end of the knob.
     */
    private int detectKnobEnd()
    {
        final boolean isForward = false;

        return (isVertical() ? detectVerticalKnob(isForward) : detectHorizontalKnob(isForward));
    }

    /**
     * @return the Y coordinate of the start of the knob.
     */
    private int detectKnobStart()
    {
        final boolean isForward = true;

        return (isVertical() ? detectVerticalKnob(isForward) : detectHorizontalKnob(isForward));
    }

    /**
     * @param isForward Flag indicating the direction of the search.
     * @return the Y coordinate of the knob.
     */
    private int detectVerticalKnob(final boolean isForward)
    {
        int answer = -1;

        final int startY = extent.y;
        final int endY = extent.y + extent.height;

        final int x = computeScrollBarCenter(true);
        final int y = (isForward ? startY : endY);
        final int deltaY = (isForward ? 1 : -1);

        final ScreenPixelColorSensor sensor = sensorSuite.getScreenPixelColorSensor();
        final Point point = new Point(x, y);

        while ((startY <= point.y) && (point.y <= endY))
        {
            final RobotColor color = sensor.sense(point);
            final int grayScale = color.getGray();

            if (grayScale < 182)
            {
                answer = point.y;
                break;
            }

            point.y += deltaY;
        }

        return answer;
    }

    /**
     * @return scroll bar to view ratio in pixels per view units.
     */
    private double getScrollBarToViewRatio()
    {
        if (sbToViewRatio == null)
        {
            final int dimension = (isHorizontal() ? extent.width : extent.height);
            // System.out.println("dimension = " + dimension);
            // System.out.println("getValueRange() = " + getValueRange());
            sbToViewRatio = (1.0 * dimension) / (getValueRange() - 1);
            // System.out.println("sbToViewRatio = " + sbToViewRatio);
        }

        return sbToViewRatio;
    }

    /**
     * @return the scrollbar's value range in view units.
     */
    private int getValueRange()
    {
        return (getMaximum() - getMinimum()) + 1;
    }

    /**
     * @return true if the orientation is horizontal.
     */
    private boolean isHorizontal()
    {
        return orientation == Adjustable.HORIZONTAL;
    }

    /**
     * @return true if the orientation is vertical.
     */
    private boolean isVertical()
    {
        return orientation == Adjustable.VERTICAL;
    }
}

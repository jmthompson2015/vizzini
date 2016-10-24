package org.vizzini.ai.robot;

import java.awt.Color;
import java.awt.PaintContext;
import java.awt.Rectangle;
import java.awt.RenderingHints;
import java.awt.color.ColorSpace;
import java.awt.geom.AffineTransform;
import java.awt.geom.Rectangle2D;
import java.awt.image.ColorModel;

/**
 * Provides a default implementation of a robot color.
 * 
 * @see <a href="http://dl.dropboxusercontent.com/u/1267954/website/softwareDev/colors.html">Colors</a>
 */
public final class DefaultRobotColor implements RobotColor
{
    /** Gray scale color. */
    public static final RobotColor BLACK = new DefaultRobotColor(Color.BLACK);

    /** Gray scale color. */
    public static final RobotColor IRON = new DefaultRobotColor(63, 63, 63);

    /** Gray scale color. */
    public static final RobotColor GRAY = new DefaultRobotColor(Color.GRAY);

    /** Gray scale color. */
    public static final RobotColor SILVER = new DefaultRobotColor(191, 191, 191);

    /** Gray scale color. */
    public static final RobotColor WHITE = new DefaultRobotColor(Color.WHITE);

    /** Primary color. */
    public static final RobotColor RED = new DefaultRobotColor(Color.RED);

    /** Primary color. */
    public static final RobotColor GREEN = new DefaultRobotColor(Color.GREEN);

    /** Primary color. */
    public static final RobotColor BLUE = new DefaultRobotColor(Color.BLUE);

    /** Primary color. */
    public static final RobotColor MAROON = new DefaultRobotColor(127, 0, 0);

    /** Primary color. */
    public static final RobotColor DARK_GREEN = new DefaultRobotColor(0, 127, 0);

    /** Primary color. */
    public static final RobotColor NAVY = new DefaultRobotColor(0, 0, 127);

    /** Secondary color. */
    public static final RobotColor YELLOW = new DefaultRobotColor(Color.YELLOW);

    /** Secondary color. */
    public static final RobotColor MAGENTA = new DefaultRobotColor(Color.MAGENTA);

    /** Secondary color. */
    public static final RobotColor CYAN = new DefaultRobotColor(Color.CYAN);

    /** Secondary color. */
    public static final RobotColor OLIVE = new DefaultRobotColor(127, 127, 0);

    /** Secondary color. */
    public static final RobotColor PURPLE = new DefaultRobotColor(127, 0, 127);

    /** Secondary color. */
    public static final RobotColor TEAL = new DefaultRobotColor(0, 127, 127);

    /** Tertiary color. */
    public static final RobotColor ORANGE = new DefaultRobotColor(Color.ORANGE);

    /** Tertiary color. */
    public static final RobotColor ROSE = new DefaultRobotColor(255, 0, 127);

    /** Tertiary color. */
    public static final RobotColor CHARTREUSE = new DefaultRobotColor(127, 255, 0);

    /** Tertiary color. */
    public static final RobotColor SPRING_GREEN = new DefaultRobotColor(0, 255, 127);

    /** Tertiary color. */
    public static final RobotColor VIOLET = new DefaultRobotColor(127, 0, 255);

    /** Tertiary color. */
    public static final RobotColor AZURE = new DefaultRobotColor(0, 127, 255);

    /** Gray scale maximum distance. (ignores alpha) */
    private static final double GRAY_SCALE_MAX_DISTANCE = Math.sqrt(3 * (255 * 255));

    /** Color. */
    private final ColorInterface delegate;

    /** Gray scale value. */
    private Integer grayValue;

    /**
     * Construct this object.
     * 
     * @param color Color.
     */
    public DefaultRobotColor(final Color color)
    {
        this(new DefaultColor(color));
    }

    /**
     * Construct this object.
     * 
     * @param color Color. (required)
     */
    public DefaultRobotColor(final ColorInterface color)
    {
        if (color == null)
        {
            throw new IllegalArgumentException("color is null");
        }

        this.delegate = color;
    }

    /**
     * Construct this object.
     * 
     * @param red Red component.
     * @param green Green component.
     * @param blue Blue component.
     */
    public DefaultRobotColor(final int red, final int green, final int blue)
    {
        this(new DefaultColor(red, green, blue));
    }

    /**
     * Construct this object.
     * 
     * @param red Red component.
     * @param green Green component.
     * @param blue Blue component.
     * @param alpha Alpha component.
     */
    public DefaultRobotColor(final int red, final int green, final int blue, final int alpha)
    {
        this(new DefaultColor(red, green, blue, alpha));
    }

    /**
     * Construct this object.
     * 
     * @param rgb RGB value.
     */
    DefaultRobotColor(final int rgb)
    {
        this(new DefaultColor(rgb));
    }

    @Override
    public RobotColor brighter()
    {
        return new DefaultRobotColor(delegate.brighter());
    }

    @Override
    public int compareTo(final RobotColor another)
    {
        int answer = getGray() - another.getGray();

        if (answer == 0)
        {
            answer = getRed() - another.getRed();
        }

        if (answer == 0)
        {
            answer = getGreen() - another.getGreen();
        }

        if (answer == 0)
        {
            answer = getBlue() - another.getBlue();
        }

        if (answer == 0)
        {
            answer = getAlpha() - another.getAlpha();
        }

        return answer;
    }

    @Override
    public PaintContext createContext(final ColorModel cm, final Rectangle r, final Rectangle2D r2d,
            final AffineTransform xform, final RenderingHints hints)
    {
        return delegate.createContext(cm, r, r2d, xform, hints);
    }

    @Override
    public RobotColor darker()
    {
        return new DefaultRobotColor(delegate.darker());
    }

    @Override
    public boolean equals(final Object object)
    {
        boolean answer = false;

        if (object == this)
        {
            answer = true;
        }
        else if (object == null)
        {
            answer = false;
        }
        else if (getClass() != object.getClass())
        {
            answer = false;
        }
        else
        {
            final DefaultRobotColor another = (DefaultRobotColor)object;

            answer = getRed() == another.getRed();

            if (answer)
            {
                answer = getGreen() == another.getGreen();
            }

            if (answer)
            {
                answer = getBlue() == another.getBlue();
            }

            if (answer)
            {
                answer = getAlpha() == another.getAlpha();
            }
        }

        return answer;
    }

    @Override
    public int getAlpha()
    {
        return delegate.getAlpha();
    }

    @Override
    public int getBlue()
    {
        return delegate.getBlue();
    }

    @Override
    public float[] getColorComponents(final ColorSpace cspace, final float[] compArray)
    {
        return delegate.getColorComponents(cspace, compArray);
    }

    @Override
    public float[] getColorComponents(final float[] compArray)
    {
        return delegate.getColorComponents(compArray);
    }

    @Override
    public ColorSpace getColorSpace()
    {
        return delegate.getColorSpace();
    }

    @Override
    public float[] getComponents(final ColorSpace cspace, final float[] compArray)
    {
        return delegate.getComponents(cspace, compArray);
    }

    @Override
    public float[] getComponents(final float[] compArray)
    {
        return delegate.getComponents(compArray);
    }

    @Override
    public int getGray()
    {
        if (grayValue == null)
        {
            // Ignore alpha.
            final int red = getRed();
            final int green = getGreen();
            final int blue = getBlue();
            final int alpha = 0;

            final double distance = Math.sqrt(computeDistanceSquared(red, green, blue, alpha));
            grayValue = asInt((distance / GRAY_SCALE_MAX_DISTANCE) * 255);
        }

        return grayValue;
    }

    @Override
    public int getGreen()
    {
        return delegate.getGreen();
    }

    @Override
    public int getRed()
    {
        return delegate.getRed();
    }

    @Override
    public int getRGB()
    {
        return delegate.getRGB();
    }

    @Override
    public float[] getRGBColorComponents(final float[] compArray)
    {
        return delegate.getRGBColorComponents(compArray);
    }

    @Override
    public float[] getRGBComponents(final float[] compArray)
    {
        return delegate.getRGBComponents(compArray);
    }

    @Override
    public int getTransparency()
    {
        return delegate.getTransparency();
    }

    @Override
    public int hashCode()
    {
        int answer = 0;

        final int[] primes = { 2, 3, 5, 7, };
        int i = 0;

        answer += primes[i++] * getRed();
        answer += primes[i++] * getGreen();
        answer += primes[i++] * getBlue();
        answer += primes[i++] * getAlpha();

        return answer;
    }

    @Override
    public boolean isDarkerThan(final RobotColor anotherColor)
    {
        boolean answer = false;

        if (anotherColor == null)
        {
            // Nothing is darker than null.
            answer = false;
        }
        else if (equals(anotherColor))
        {
            answer = false;
        }
        else
        {
            answer = compareTo(anotherColor) < 0;
        }

        return answer;
    }

    @Override
    public boolean isLighterThan(final RobotColor anotherColor)
    {
        boolean answer = false;

        if (anotherColor == null)
        {
            // Everything is lighter than null.
            answer = true;
        }
        else if (equals(anotherColor))
        {
            answer = false;
        }
        else
        {
            answer = !isDarkerThan(anotherColor);
        }

        return answer;
    }

    @Override
    public RobotColor scale(final double fraction)
    {
        // Keep the same alpha.
        int red = asInt(fraction * getRed());
        int green = asInt(fraction * getGreen());
        int blue = asInt(fraction * getBlue());
        final int alpha = getAlpha();

        // Limit to [0, 255].
        red = Math.max(0, Math.min(red, 255));
        green = Math.max(0, Math.min(green, 255));
        blue = Math.max(0, Math.min(blue, 255));

        return new DefaultRobotColor(red, green, blue, alpha);
    }

    @Override
    public RobotColor toBlackAndWhite()
    {
        return toBlackAndWhite(GRAY);
    }

    @Override
    public RobotColor toBlackAndWhite(final RobotColor thresholdColor)
    {
        return (isDarkerThan(thresholdColor) ? BLACK : WHITE);
    }

    @Override
    public RobotColor toGrayScale()
    {
        final int grayscale = getGray();

        return new DefaultRobotColor(grayscale, grayscale, grayscale);
    }

    @Override
    public String toString()
    {
        final StringBuilder sb = new StringBuilder();

        sb.append(getClass().getName());
        sb.append(" [");
        sb.append("r=").append(getRed());
        sb.append(",g=").append(getGreen());
        sb.append(",b=").append(getBlue());
        sb.append(",a=").append(getAlpha());
        sb.append("]");

        return sb.toString();
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
     * @param red Red component.
     * @param green Green component.
     * @param blue Blue component.
     * @param alpha Alpha component.
     * 
     * @return the distance squared from the origin of color space.
     */
    private int computeDistanceSquared(final int red, final int green, final int blue, final int alpha)
    {
        return (red * red) + (green * green) + (blue * blue) + (alpha * alpha);
    }
}

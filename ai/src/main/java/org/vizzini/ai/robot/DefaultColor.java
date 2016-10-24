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
 * Provides a default implementation of a color.
 */
public final class DefaultColor implements ColorInterface
{
    /** Gray scale color. */
    public static final ColorInterface BLACK = new DefaultColor(Color.BLACK);

    /** Gray scale color. */
    public static final ColorInterface IRON = new DefaultColor(63, 63, 63);

    /** Gray scale color. */
    public static final ColorInterface GRAY = new DefaultColor(Color.GRAY);

    /** Gray scale color. */
    public static final ColorInterface SILVER = new DefaultColor(191, 191, 191);

    /** Gray scale color. */
    public static final ColorInterface WHITE = new DefaultColor(Color.WHITE);

    /** Primary color. */
    public static final ColorInterface RED = new DefaultColor(Color.RED);

    /** Primary color. */
    public static final ColorInterface GREEN = new DefaultColor(Color.GREEN);

    /** Primary color. */
    public static final ColorInterface BLUE = new DefaultColor(Color.BLUE);

    /** Primary color. */
    public static final ColorInterface MAROON = new DefaultColor(127, 0, 0);

    /** Primary color. */
    public static final ColorInterface DARK_GREEN = new DefaultColor(0, 127, 0);

    /** Primary color. */
    public static final ColorInterface NAVY = new DefaultColor(0, 0, 127);

    /** Secondary color. */
    public static final ColorInterface YELLOW = new DefaultColor(Color.YELLOW);

    /** Secondary color. */
    public static final ColorInterface MAGENTA = new DefaultColor(Color.MAGENTA);

    /** Secondary color. */
    public static final ColorInterface CYAN = new DefaultColor(Color.CYAN);

    /** Secondary color. */
    public static final ColorInterface OLIVE = new DefaultColor(127, 127, 0);

    /** Secondary color. */
    public static final ColorInterface PURPLE = new DefaultColor(127, 0, 127);

    /** Secondary color. */
    public static final ColorInterface TEAL = new DefaultColor(0, 127, 127);

    /** Tertiary color. */
    public static final ColorInterface ORANGE = new DefaultColor(Color.ORANGE);

    /** Tertiary color. */
    public static final ColorInterface ROSE = new DefaultColor(255, 0, 127);

    /** Tertiary color. */
    public static final ColorInterface CHARTREUSE = new DefaultColor(127, 255, 0);

    /** Tertiary color. */
    public static final ColorInterface SPRING_GREEN = new DefaultColor(0, 255, 127);

    /** Tertiary color. */
    public static final ColorInterface VIOLET = new DefaultColor(127, 0, 255);

    /** Tertiary color. */
    public static final ColorInterface AZURE = new DefaultColor(0, 127, 255);

    /** Color. */
    private final Color delegate;

    /**
     * Construct this object.
     * 
     * @param color Color. (required)
     */
    public DefaultColor(final Color color)
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
     * @param rgb RGB value.
     */
    public DefaultColor(final int rgb)
    {
        this(new Color(rgb));
    }

    /**
     * Construct this object.
     * 
     * @param red Red component.
     * @param green Green component.
     * @param blue Blue component.
     */
    public DefaultColor(final int red, final int green, final int blue)
    {
        this(new Color(red, green, blue));
    }

    /**
     * Construct this object.
     * 
     * @param red Red component.
     * @param green Green component.
     * @param blue Blue component.
     * @param alpha Alpha component.
     */
    public DefaultColor(final int red, final int green, final int blue, final int alpha)
    {
        this(new Color(red, green, blue, alpha));
    }

    @Override
    public ColorInterface brighter()
    {
        return new DefaultColor(delegate.brighter());
    }

    @Override
    public PaintContext createContext(final ColorModel cm, final Rectangle r, final Rectangle2D r2d,
            final AffineTransform xform, final RenderingHints hints)
    {
        return delegate.createContext(cm, r, r2d, xform, hints);
    }

    @Override
    public ColorInterface darker()
    {
        return new DefaultColor(delegate.darker());
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
    public String toString()
    {
        return delegate.toString();
    }
}

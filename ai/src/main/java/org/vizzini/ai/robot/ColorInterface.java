package org.vizzini.ai.robot;

import java.awt.PaintContext;
import java.awt.Rectangle;
import java.awt.RenderingHints;
import java.awt.color.ColorSpace;
import java.awt.geom.AffineTransform;
import java.awt.geom.Rectangle2D;
import java.awt.image.ColorModel;

/**
 * Defines methods required by a color. This interface is based upon the methods in the Color class.
 * 
 * @see java.awt.Color
 */
public interface ColorInterface
{
    /**
     * @return a new RobotColor object that is a brighter version of this RobotColor.
     * @see java.awt.Color#brighter()
     */
    ColorInterface brighter();

    /**
     * @param cm the specified ColorModel
     * @param r the specified Rectangle
     * @param r2d the specified Rectangle2D
     * @param xform the specified AffineTransform
     * @param hints the specified RenderingHints
     * 
     * @return a PaintContext that is used to generate a solid color pattern.
     * @see java.awt.Color#createContext(java.awt.image.ColorModel, java.awt.Rectangle, java.awt.geom.Rectangle2D,
     *      java.awt.geom.AffineTransform, java.awt.RenderingHints)
     */
    PaintContext createContext(final ColorModel cm, final Rectangle r, final Rectangle2D r2d,
            final AffineTransform xform, final RenderingHints hints);

    /**
     * @return a new RobotColor object that is a darker version of this RobotColor.
     * @see java.awt.Color#darker()
     */
    ColorInterface darker();

    /**
     * @return the alpha component.
     * @see java.awt.Color#getAlpha()
     */
    int getAlpha();

    /**
     * @return the blue component.
     * @see java.awt.Color#getBlue()
     */
    int getBlue();

    /**
     * @param cspace a specified ColorSpace
     * @param compArray an array that this method fills with the color components of this RobotColor in the specified
     *            ColorSpace
     * @return the color components in a float array.
     * @see java.awt.Color#getColorComponents(java.awt.color.ColorSpace, float[])
     */
    float[] getColorComponents(final ColorSpace cspace, final float[] compArray);

    /**
     * @param compArray an array that this method fills with the color components of this RobotColor in its ColorSpace
     *            and returns
     * @return the color components in a float array.
     * @see java.awt.Color#getColorComponents(float[])
     */
    float[] getColorComponents(final float[] compArray);

    /**
     * @return this RobotColor object's ColorSpace.
     * @see java.awt.Color#getColorSpace()
     */
    ColorSpace getColorSpace();

    /**
     * @param cspace a specified ColorSpace
     * @param compArray an array that this method fills with the color and alpha components of this RobotColor in the
     *            specified ColorSpace and returns
     * @return the color and alpha components in a float array.
     * @see java.awt.Color#getComponents(java.awt.color.ColorSpace, float[])
     */
    float[] getComponents(final ColorSpace cspace, final float[] compArray);

    /**
     * @param compArray an array that this method fills with the color components of this RobotColor in its ColorSpace
     *            and returns
     * @return the color and alpha components in a float array.
     * @see java.awt.Color#getComponents(float[])
     */
    float[] getComponents(final float[] compArray);

    /**
     * @return the green component.
     * @see java.awt.Color#getGreen()
     */
    int getGreen();

    /**
     * @return the red component.
     * @see java.awt.Color#getRed()
     */
    int getRed();

    /**
     * @return the RGB value of the color in the default sRGB ColorModel.
     * @see java.awt.Color#getRGB()
     */
    int getRGB();

    /**
     * @param compArray an array that this method fills with color components and returns
     * @return the RGB components in a float array.
     * @see java.awt.Color#getRGBColorComponents(float[])
     */
    float[] getRGBColorComponents(final float[] compArray);

    /**
     * @param compArray an array that this method fills with color and alpha components and returns
     * @return the RGBA components in a float array.
     * @see java.awt.Color#getRGBComponents(float[])
     */
    float[] getRGBComponents(final float[] compArray);

    /**
     * @return this RobotColor object's transparency mode.
     * @see java.awt.Color#getTransparency()
     */
    int getTransparency();
}

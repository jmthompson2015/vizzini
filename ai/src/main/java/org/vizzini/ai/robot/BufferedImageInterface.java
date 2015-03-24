package org.vizzini.ai.robot;

import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.GraphicsConfiguration;
import java.awt.Image;
import java.awt.ImageCapabilities;
import java.awt.Transparency;
import java.awt.image.ImageObserver;
import java.awt.image.ImageProducer;
import java.awt.image.WritableRaster;
import java.awt.image.WritableRenderedImage;

/**
 * Defines methods required by a buffered image. This interface is based upon the methods in the BufferedImage class.
 * The mutator methods have been removed.
 * 
 * @see java.awt.image.BufferedImage
 */
public interface BufferedImageInterface extends WritableRenderedImage, Transparency
{
    /**
     * @param isAlphaPremultiplied true if the alpha has been premultiplied; false otherwise.
     * @see java.awt.image.BufferedImage#coerceData(boolean)
     */
    void coerceData(final boolean isAlphaPremultiplied);

    /**
     * @return a Graphics2D, used for drawing into this image.
     * @see java.awt.image.BufferedImage#createGraphics()
     */
    Graphics2D createGraphics();

    /**
     * @see java.awt.Image#flush()
     */
    void flush();

    /**
     * @return value between 0 and 1, inclusive, which represents the current priority value
     * @see java.awt.Image#getAccelerationPriority()
     */
    float getAccelerationPriority();

    /**
     * @return a WritableRaster or null if this BufferedImage has no alpha channel associated with its ColorModel.
     * @see java.awt.image.BufferedImage#getAlphaRaster()
     */
    WritableRaster getAlphaRaster();

    /**
     * @param gc a GraphicsConfiguration object. A value of null for this parameter will result in getting the image
     *            capabilities for the default GraphicsConfiguration.
     * @return an ImageCapabilities object that contains the capabilities of this Image on the specified
     *         GraphicsConfiguration.
     * @see java.awt.Image#getCapabilities(java.awt.GraphicsConfiguration)
     */
    ImageCapabilities getCapabilities(final GraphicsConfiguration gc);

    /**
     * @return a Graphics2D, which can be used to draw into this image.
     * @see java.awt.image.BufferedImage#getGraphics()
     */
    Graphics getGraphics();

    /**
     * @param observer ignored
     * @return the height of this BufferedImage
     * @see java.awt.image.BufferedImage#getHeight(java.awt.image.ImageObserver)
     */
    int getHeight(final ImageObserver observer);

    /**
     * @param name the property name
     * @param observer the ImageObserver that receives notification regarding image information
     * @return an Object that is the property referred to by the specified name or null if the properties of this image
     *         are not yet known.
     * @see java.awt.image.BufferedImage#getProperty(java.lang.String, java.awt.image.ImageObserver)
     */
    Object getProperty(final String name, final ImageObserver observer);

    /**
     * @return the WriteableRaster of this BufferedImage.
     * @see java.awt.image.BufferedImage#getRaster()
     */
    WritableRaster getRaster();

    /**
     * @param x the X coordinate of the pixel from which to get the pixel in the default RGB color model and sRGB color
     *            space
     * @param y the Y coordinate of the pixel from which to get the pixel in the default RGB color model and sRGB color
     *            space
     * @return an integer pixel in the default RGB color model and default sRGB colorspace.
     * @see java.awt.image.BufferedImage#getRGB(int, int)
     */
    int getRGB(final int x, final int y);

    /**
     * @param startX the starting X coordinate
     * @param startY the starting Y coordinate
     * @param w width of region
     * @param h height of region
     * @param rgbArray if not null, the rgb pixels are written here
     * @param offset offset into the rgbArray
     * @param scansize scanline stride for the rgbArray
     * @return array of RGB pixels.
     * @see java.awt.image.BufferedImage#getRGB(int, int, int, int, int[], int, int)
     */
    int[] getRGB(final int startX, final int startY, final int w, final int h, final int[] rgbArray, final int offset,
            final int scansize);

    /**
     * @param width the width to which to scale the image.
     * @param height the height to which to scale the image.
     * @param hints flags to indicate the type of algorithm to use for image resampling.
     * @return a scaled version of the image.
     * @see java.awt.Image#getScaledInstance(int, int, int)
     */
    Image getScaledInstance(final int width, final int height, final int hints);

    /**
     * @return the ImageProducer that is used to produce the pixels for this image.
     * @see java.awt.image.BufferedImage#getSource()
     */
    ImageProducer getSource();

    /**
     * @param x the X coordinate of the upper-left corner of the specified rectangular region
     * @param y the Y coordinate of the upper-left corner of the specified rectangular region
     * @param w the width of the specified rectangular region
     * @param h the height of the specified rectangular region
     * @return a BufferedImage that is the subimage of this BufferedImage.
     * @see java.awt.image.BufferedImage#getSubimage(int, int, int, int)
     */
    BufferedImageInterface getSubimage(final int x, final int y, final int w, final int h);

    /**
     * @return the image type of this BufferedImage.
     * @see java.awt.image.BufferedImage#getType()
     */
    int getType();

    /**
     * @param observer ignored
     * @return the width of this BufferedImage
     * @see java.awt.image.BufferedImage#getWidth(java.awt.image.ImageObserver)
     */
    int getWidth(final ImageObserver observer);

    /**
     * @return true if the alpha has been premultiplied; false otherwise.
     * @see java.awt.image.BufferedImage#isAlphaPremultiplied()
     */
    boolean isAlphaPremultiplied();
}

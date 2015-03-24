package org.vizzini.imageeditor;

import java.awt.Color;
import java.awt.Graphics2D;
import java.awt.Image;
import java.awt.Toolkit;
import java.awt.image.BufferedImage;
import java.awt.image.FilteredImageSource;
import java.awt.image.ImageFilter;
import java.awt.image.ImageProducer;
import java.awt.image.RGBImageFilter;

import org.vizzini.core.InputValidator;

/**
 * Provides an image filter which converts pixels within a color range to another color.
 */
public final class ColorRangeImageFilter
{
    /** Low range of color to change. */
    private final Color color1;

    /** High range of color to change. */
    private final Color color2;

    /** Replacement color, or null for transparent. */
    private final Color color3;

    /**
     * Construct this object.
     * 
     * @param color1 Low range of color to change.
     * @param color2 High range of color to change.
     */
    @SuppressWarnings("hiding")
    public ColorRangeImageFilter(final Color color1, final Color color2)
    {
        this(color1, color2, null);
    }

    /**
     * Construct this object.
     * 
     * @param color1 Low range of color to change.
     * @param color2 High range of color to change.
     * @param color3 Replacement color, or null for transparent.
     */
    @SuppressWarnings("hiding")
    public ColorRangeImageFilter(final Color color1, final Color color2, final Color color3)
    {
        InputValidator.validateNotNull("color1", color1);
        InputValidator.validateNotNull("color2", color2);

        this.color1 = color1;
        this.color2 = color2;
        this.color3 = color3;
    }

    /**
     * @param image Image.
     * 
     * @return a transformed version of the given parameter.
     */
    public BufferedImage filter(final BufferedImage image)
    {
        InputValidator.validateNotNull("image", image);

        final Image transformedImage = transformColorToTransparency(image);
        final int width = image.getWidth();
        final int height = image.getHeight();
        final BufferedImage answer = imageToBufferedImage(transformedImage, width, height);

        return answer;
    }

    /**
     * @param image Image.
     * @param width Width.
     * @param height Height.
     * 
     * @return a new image.
     */
    private BufferedImage imageToBufferedImage(final Image image, final int width, final int height)
    {
        final BufferedImage dest = new BufferedImage(width, height, BufferedImage.TYPE_INT_ARGB);
        final Graphics2D g2 = dest.createGraphics();
        g2.drawImage(image, 0, 0, null);
        g2.dispose();

        return dest;
    }

    /**
     * @param image Image.
     * 
     * @return a new image with colors in the range transformed to transparent.
     */
    private Image transformColorToTransparency(final BufferedImage image)
    {
        // Primitive test, just an example
        final int r1 = color1.getRed();
        final int g1 = color1.getGreen();
        final int b1 = color1.getBlue();
        final int r2 = color2.getRed();
        final int g2 = color2.getGreen();
        final int b2 = color2.getBlue();

        final ImageFilter filter = new RGBImageFilter()
        {
            @SuppressWarnings("synthetic-access")
            @Override
            public final int filterRGB(final int x, final int y, final int rgb)
            {
                int answer = rgb;

                final int r = (rgb & 0xFF0000) >> 16;
                final int g = (rgb & 0xFF00) >> 8;
                final int b = rgb & 0xFF;

                if ((r >= r1) && (r <= r2) && (g >= g1) && (g <= g2) && (b >= b1) && (b <= b2))
                {
                    if (color3 == null)
                    {
                        // Set fully transparent but keep color.
                        answer = rgb & 0xFFFFFF;
                    }
                    else
                    {
                        answer = color3.getRGB();
                    }
                }

                return answer;
            }
        };

        final ImageProducer ip = new FilteredImageSource(image.getSource(), filter);

        return Toolkit.getDefaultToolkit().createImage(ip);
    }
}

package org.vizzini.ai.robot;

import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.GraphicsConfiguration;
import java.awt.Image;
import java.awt.ImageCapabilities;
import java.awt.Point;
import java.awt.Rectangle;
import java.awt.RenderingHints;
import java.awt.image.BufferedImage;
import java.awt.image.ColorModel;
import java.awt.image.ImageObserver;
import java.awt.image.ImageProducer;
import java.awt.image.Raster;
import java.awt.image.RenderedImage;
import java.awt.image.RescaleOp;
import java.awt.image.SampleModel;
import java.awt.image.TileObserver;
import java.awt.image.WritableRaster;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.TreeMap;
import java.util.Vector;

/**
 * Provides a default implementation of a robot image.
 */
public final class DefaultRobotImage implements RobotImage
{
    /** Flag indicating whether to provide verbose output. */
    private static final boolean IS_VERBOSE = false;

    /** Image. */
    private final BufferedImageInterface delegate;

    /** Origin relative to parent. */
    private final Point origin;

    /** Parent image. */
    private final RobotImage parent;

    /** Pixels. */
    private RobotColor[][] pixels;

    /**
     * Construct this object.
     * 
     * @param image Image. (required)
     */
    public DefaultRobotImage(final BufferedImage image)
    {
        this(new DefaultBufferedImage(image));
    }

    /**
     * Construct this object.
     * 
     * @param image Image. (required)
     * @param parent Parent image. (optional)
     * @param origin Origin relative to parent. (optional)
     */
    @SuppressWarnings("hiding")
    public DefaultRobotImage(final BufferedImage image, final RobotImage parent, final Point origin)
    {
        this(new DefaultBufferedImage(image), parent, origin);
    }

    /**
     * Construct this object.
     * 
     * @param image Image. (required)
     * @param parent Parent image. (optional)
     * @param origin Origin relative to parent. (optional)
     */
    @SuppressWarnings("hiding")
    public DefaultRobotImage(final BufferedImageInterface image, final RobotImage parent, final Point origin)
    {
        if (image == null)
        {
            throw new IllegalArgumentException("image is null");
        }

        this.delegate = image;
        this.parent = parent;

        if (origin == null)
        {
            this.origin = new Point(0, 0);
        }
        else
        {
            this.origin = new Point(origin);
        }
    }

    /**
     * Construct this object.
     * 
     * @param width width of the created image
     * @param height height of the created image
     * @param imageType type of the created image
     * @param parent Parent image. (optional)
     * @param origin Origin relative to parent. (optional)
     */
    @SuppressWarnings("hiding")
    public DefaultRobotImage(final int width, final int height, final int imageType, final RobotImage parent,
            final Point origin)
    {
        this(new DefaultBufferedImage(width, height, imageType), parent, origin);
    }

    /**
     * Construct this object.
     * 
     * @param image Image. (required)
     */
    private DefaultRobotImage(final BufferedImageInterface image)
    {
        this(image, null, null);
    }

    @Override
    public void addTileObserver(final TileObserver to)
    {
        delegate.addTileObserver(to);
    }

    @Override
    public void coerceData(final boolean isAlphaPremultiplied)
    {
        delegate.coerceData(isAlphaPremultiplied);
    }

    @Override
    public WritableRaster copyData(final WritableRaster outRaster)
    {
        return delegate.copyData(outRaster);
    }

    @Override
    public Map<RobotColor, Integer> countColorOccurrences()
    {
        final Map<RobotColor, Integer> map = new TreeMap<RobotColor, Integer>();

        // Count the occurrence of each color.
        final int width = getWidth();
        final int height = getHeight();

        for (int i = 0; i < width; i++)
        {
            for (int j = 0; j < height; j++)
            {
                final RobotColor color = getPixel(i, j);

                Integer count = map.get(color);

                if (count == null)
                {
                    count = 0;
                }

                map.put(color, count + 1);
            }
        }

        return map;
    }

    @Override
    public Graphics2D createGraphics()
    {
        return delegate.createGraphics();
    }

    @Override
    public RobotImage dilate(final RobotColor thresholdColor)
    {
        final Boolean[][] bits = toBinary(thresholdColor);

        final int width = getWidth();
        final int height = getHeight();

        for (int i = 0; i < width; i++)
        {
            for (int j = 0; j < height; j++)
            {
                if ((bits[i][j] != null) && bits[i][j])
                {
                    if ((i > 0) && (bits[i - 1][j] != null) && !bits[i - 1][j])
                    {
                        bits[i - 1][j] = null;
                    }

                    if ((j > 0) && (bits[i][j - 1] != null) && !bits[i][j - 1])
                    {
                        bits[i][j - 1] = null;
                    }

                    if (((i + 1) < width) && (bits[i + 1][j] != null) && !bits[i + 1][j])
                    {
                        bits[i + 1][j] = null;
                    }

                    if (((j + 1) < height) && (bits[i][j + 1] != null) && !bits[i][j + 1])
                    {
                        bits[i][j + 1] = null;
                    }
                }
            }
        }

        final BufferedImage image = new BufferedImage(width, height, getType());

        for (int i = 0; i < width; i++)
        {
            for (int j = 0; j < height; j++)
            {
                RobotColor color = DefaultRobotColor.WHITE;

                if ((bits[i][j] == null) || bits[i][j])
                {
                    color = DefaultRobotColor.BLACK;
                }

                image.setRGB(i, j, color.getRGB());
            }
        }

        return new DefaultRobotImage(image, getParent(), getOrigin());
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
            final DefaultRobotImage another = (DefaultRobotImage)object;

            answer = getWidth() == another.getWidth();

            if (answer)
            {
                answer = getHeight() == another.getHeight();
            }

            if (answer)
            {
                // Check pixels for equality.
                for (int j = 0; answer && (j < getHeight()); j++)
                {
                    for (int i = 0; answer && (i < getWidth()); i++)
                    {
                        answer = getRGB(i, j) == another.getRGB(i, j);
                    }
                }
            }
        }

        return answer;
    }

    @Override
    public RobotImage erode(final RobotColor thresholdColor)
    {
        final Boolean[][] bits = toBinary(thresholdColor);

        final int width = getWidth();
        final int height = getHeight();

        for (int i = 0; i < width; i++)
        {
            for (int j = 0; j < height; j++)
            {
                if ((bits[i][j] != null) && !bits[i][j])
                {
                    if ((i > 0) && (bits[i - 1][j] != null) && bits[i - 1][j])
                    {
                        bits[i - 1][j] = null;
                    }

                    if ((j > 0) && (bits[i][j - 1] != null) && bits[i][j - 1])
                    {
                        bits[i][j - 1] = null;
                    }

                    if (((i + 1) < width) && (bits[i + 1][j] != null) && bits[i + 1][j])
                    {
                        bits[i + 1][j] = null;
                    }

                    if (((j + 1) < height) && (bits[i][j + 1] != null) && bits[i][j + 1])
                    {
                        bits[i][j + 1] = null;
                    }
                }
            }
        }

        final BufferedImage image = new BufferedImage(width, height, getType());

        for (int i = 0; i < width; i++)
        {
            for (int j = 0; j < height; j++)
            {
                RobotColor color = DefaultRobotColor.WHITE;

                if ((bits[i][j] != null) && bits[i][j])
                {
                    color = DefaultRobotColor.BLACK;
                }

                image.setRGB(i, j, color.getRGB());
            }
        }

        return new DefaultRobotImage(image, getParent(), getOrigin());
    }

    @Override
    public void flush()
    {
        delegate.flush();

        pixels = null;
    }

    @Override
    public Point getAbsoluteOrigin()
    {
        final Point answer = new Point(origin.x, origin.y);

        if (parent != null)
        {
            final Point parentOrigin = parent.getAbsoluteOrigin();
            answer.x += parentOrigin.x;
            answer.y += parentOrigin.y;
        }

        return answer;
    }

    @Override
    public float getAccelerationPriority()
    {
        return delegate.getAccelerationPriority();
    }

    @Override
    public WritableRaster getAlphaRaster()
    {
        return delegate.getAlphaRaster();
    }

    @Override
    public ImageCapabilities getCapabilities(final GraphicsConfiguration gc)
    {
        return delegate.getCapabilities(gc);
    }

    @Override
    public ColorModel getColorModel()
    {
        return delegate.getColorModel();
    }

    @Override
    public Raster getData()
    {
        return delegate.getData();
    }

    @Override
    public Raster getData(final Rectangle rect)
    {
        return delegate.getData(rect);
    }

    @Override
    public Graphics getGraphics()
    {
        return delegate.getGraphics();
    }

    @Override
    public int getHeight()
    {
        return delegate.getHeight();
    }

    @Override
    public int getHeight(final ImageObserver observer)
    {
        return delegate.getHeight(observer);
    }

    @Override
    public RobotColor getMaximumColor()
    {
        final int width = getWidth();
        final int height = getHeight();

        int red = 0;
        int green = 0;
        int blue = 0;
        int alpha = 0;

        for (int i = 0; i < width; i++)
        {
            for (int j = 0; j < height; j++)
            {
                final RobotColor color = getPixel(i, j);

                red = Math.max(color.getRed(), red);
                green = Math.max(color.getGreen(), green);
                blue = Math.max(color.getBlue(), blue);
                alpha = Math.max(color.getAlpha(), alpha);
            }
        }

        return new DefaultRobotColor(red, green, blue, alpha);
    }

    @Override
    public RobotColor getMeanColor()
    {
        final int width = getWidth();
        final int height = getHeight();
        final int total = width * height;

        int sumRed = 0;
        int sumGreen = 0;
        int sumBlue = 0;
        int sumAlpha = 0;

        for (int i = 0; i < width; i++)
        {
            for (int j = 0; j < height; j++)
            {
                final RobotColor color = getPixel(i, j);

                sumRed += color.getRed();
                sumGreen += color.getGreen();
                sumBlue += color.getBlue();
                sumAlpha += color.getAlpha();
            }
        }

        final int red = asInt((1.0 * sumRed) / total);
        final int green = asInt((1.0 * sumGreen) / total);
        final int blue = asInt((1.0 * sumBlue) / total);
        final int alpha = asInt((1.0 * sumAlpha) / total);

        return new DefaultRobotColor(red, green, blue, alpha);
    }

    @Override
    public RobotColor getMedianColor()
    {
        final int width = getWidth();
        final int height = getHeight();
        final int total = width * height;

        // Collect all the colors.
        final List<RobotColor> list = new ArrayList<RobotColor>();

        for (int i = 0; i < width; i++)
        {
            for (int j = 0; j < height; j++)
            {
                final RobotColor color = getPixel(i, j);
                list.add(color);
            }
        }

        // Sort, and find the median.
        Collections.sort(list);
        final int index = asInt(0.5 * total);

        return list.get(index);
    }

    @Override
    public RobotColor getMidrangeColor()
    {
        final RobotColor minColor = getMinimumColor();
        final RobotColor maxColor = getMaximumColor();

        final int red = asInt(0.5 * (minColor.getRed() + maxColor.getRed()));
        final int green = asInt(0.5 * (minColor.getGreen() + maxColor.getGreen()));
        final int blue = asInt(0.5 * (minColor.getBlue() + maxColor.getBlue()));
        final int alpha = asInt(0.5 * (minColor.getAlpha() + maxColor.getAlpha()));

        return new DefaultRobotColor(red, green, blue, alpha);
    }

    @Override
    public RobotColor getMinimumColor()
    {
        final int width = getWidth();
        final int height = getHeight();

        int red = 255;
        int green = 255;
        int blue = 255;
        int alpha = 255;

        for (int i = 0; i < width; i++)
        {
            for (int j = 0; j < height; j++)
            {
                final RobotColor color = getPixel(i, j);

                red = Math.min(color.getRed(), red);
                green = Math.min(color.getGreen(), green);
                blue = Math.min(color.getBlue(), blue);
                alpha = Math.min(color.getAlpha(), alpha);
            }
        }

        return new DefaultRobotColor(red, green, blue, alpha);
    }

    @Override
    public int getMinTileX()
    {
        return delegate.getMinTileX();
    }

    @Override
    public int getMinTileY()
    {
        return delegate.getMinTileY();
    }

    @Override
    public int getMinX()
    {
        return delegate.getMinX();
    }

    @Override
    public int getMinY()
    {
        return delegate.getMinY();
    }

    @Override
    public RobotColor getModeColor()
    {
        final Map<RobotColor, Integer> map = countColorOccurrences();

        // Find the color with the most occurrences.
        final List<RobotColor> maxColors = new ArrayList<RobotColor>();
        int maxCount = -1;

        for (final Entry<RobotColor, Integer> entry : map.entrySet())
        {
            final RobotColor color = entry.getKey();
            final int count = entry.getValue();

            if (count > maxCount)
            {
                maxCount = count;
                maxColors.clear();
                maxColors.add(color);
            }
            else if (count == maxCount)
            {
                maxColors.add(color);
            }
        }

        if (maxColors.size() > 1)
        {
            Collections.sort(maxColors);
        }

        return maxColors.get(0);
    }

    @Override
    public int getNumXTiles()
    {
        return delegate.getNumXTiles();
    }

    @Override
    public int getNumYTiles()
    {
        return delegate.getNumYTiles();
    }

    @Override
    public Point getOrigin()
    {
        return origin;
    }

    @Override
    public RobotImage getParent()
    {
        return parent;
    }

    @Override
    public RobotColor getPixel(final int x, final int y)
    {
        if (pixels == null)
        {
            pixels = new RobotColor[getWidth()][];
        }

        if (pixels[x] == null)
        {
            pixels[x] = new RobotColor[getHeight()];
        }

        RobotColor answer = pixels[x][y];

        if (answer == null)
        {
            answer = new DefaultRobotColor(getRGB(x, y));
            pixels[x][y] = answer;
        }

        return answer;
    }

    @Override
    public Object getProperty(final String name)
    {
        return delegate.getProperty(name);
    }

    @Override
    public Object getProperty(final String name, final ImageObserver observer)
    {
        return delegate.getProperty(name, observer);
    }

    @Override
    public String[] getPropertyNames()
    {
        return delegate.getPropertyNames();
    }

    @Override
    public WritableRaster getRaster()
    {
        return delegate.getRaster();
    }

    @Override
    public int getRGB(final int x, final int y)
    {
        return delegate.getRGB(x, y);
    }

    @Override
    public int[] getRGB(final int startX, final int startY, final int w, final int h, final int[] rgbArray,
            final int offset, final int scansize)
    {
        return delegate.getRGB(startX, startY, w, h, rgbArray, offset, scansize);
    }

    @Override
    public SampleModel getSampleModel()
    {
        return delegate.getSampleModel();
    }

    @Override
    public Image getScaledInstance(final int width, final int height, final int hints)
    {
        return delegate.getScaledInstance(width, height, hints);
    }

    @Override
    public ImageProducer getSource()
    {
        return delegate.getSource();
    }

    @Override
    public Vector<RenderedImage> getSources()
    {
        return delegate.getSources();
    }

    @Override
    public RobotImage getSubimage(final int x, final int y, final int w, final int h)
    {
        return new DefaultRobotImage(delegate.getSubimage(x, y, w, h), this, new Point(x, y));
    }

    @Override
    public Raster getTile(final int tileX, final int tileY)
    {
        return delegate.getTile(tileX, tileY);
    }

    @Override
    public int getTileGridXOffset()
    {
        return delegate.getTileGridXOffset();
    }

    @Override
    public int getTileGridYOffset()
    {
        return delegate.getTileGridYOffset();
    }

    @Override
    public int getTileHeight()
    {
        return delegate.getTileHeight();
    }

    @Override
    public int getTileWidth()
    {
        return delegate.getTileWidth();
    }

    @Override
    public int getTransparency()
    {
        return delegate.getTransparency();
    }

    @Override
    public int getType()
    {
        return delegate.getType();
    }

    @Override
    public int getWidth()
    {
        return delegate.getWidth();
    }

    @Override
    public int getWidth(final ImageObserver observer)
    {
        return delegate.getWidth(observer);
    }

    @Override
    public WritableRaster getWritableTile(final int tileX, final int tileY)
    {
        return delegate.getWritableTile(tileX, tileY);
    }

    @Override
    public Point[] getWritableTileIndices()
    {
        return delegate.getWritableTileIndices();
    }

    @Override
    public int hashCode()
    {
        int answer = 0;

        final int[] primes = { 2, 3, 5, };
        int index = 0;

        answer += primes[index++] * getWidth();
        answer += primes[index++] * getHeight();

        // Include pixels in hash code.
        for (int j = 0; j < getHeight(); j++)
        {
            for (int i = 0; i < getWidth(); i++)
            {
                answer += primes[index] * getRGB(i, j);
            }
        }

        return answer;
    }

    @Override
    public boolean hasTileWriters()
    {
        return delegate.hasTileWriters();
    }

    @Override
    public boolean isAlphaPremultiplied()
    {
        return delegate.isAlphaPremultiplied();
    }

    @Override
    public boolean isTileWritable(final int tileX, final int tileY)
    {
        return delegate.isTileWritable(tileX, tileY);
    }

    @Override
    public boolean nearlyEquals(final Object object, final int maxDeltaWidth, final int maxDeltaHeight,
            final int maxPixelCount)
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
            final DefaultRobotImage another = (DefaultRobotImage)object;

            final int deltaWidth = getWidth() - another.getWidth();
            answer = Math.abs(deltaWidth) < maxDeltaWidth;

            if (IS_VERBOSE)
            {
                if (!answer)
                {
                    System.out.println("deltaWidth = " + deltaWidth);
                }
            }

            if (answer)
            {
                final int deltaHeight = getHeight() - another.getHeight();
                answer = Math.abs(deltaHeight) < maxDeltaHeight;

                if (IS_VERBOSE)
                {
                    if (!answer)
                    {
                        System.out.println("deltaHeight = " + deltaHeight);
                    }
                }
            }

            if (answer)
            {
                // Check pixels for equality.
                final int width = Math.min(getWidth(), another.getWidth());
                final int height = Math.min(getHeight(), another.getHeight());
                int count = 0;

                // Count the number of pixels which aren't equal.
                for (int j = 0; j < height; j++)
                {
                    for (int i = 0; i < width; i++)
                    {
                        if (getRGB(i, j) != another.getRGB(i, j))
                        {
                            count++;
                        }
                    }
                }

                answer = count <= maxPixelCount;

                if (IS_VERBOSE)
                {
                    if (!answer)
                    {
                        System.out.println("DefaultRobotImage.nearlyEquals() count = " + count);
                    }
                }
            }
        }

        return answer;
    }

    @Override
    public RobotImage normalize()
    {
        // TODO combine these two steps into one.

        // Translate so that the new minimum color is black.
        final RobotColor minColor = getMinimumColor();
        float[] scaleFactor = new float[] { 1.0f, 1.0f, 1.0f };
        float[] offset = new float[] { -minColor.getRed(), -minColor.getGreen(), -minColor.getBlue() };
        final RenderingHints hints = null;
        final RobotImage image = rescale(scaleFactor, offset, hints);

        // Scale so that the new maximum color is white.
        final RobotColor maxColor = image.getMaximumColor();
        final double accuracy = 100.0;
        final float redScale = asFloat(256.0 / maxColor.getRed(), accuracy);
        final float greenScale = asFloat(256.0 / maxColor.getGreen(), accuracy);
        final float blueScale = asFloat(256.0 / maxColor.getBlue(), accuracy);
        scaleFactor = new float[] { redScale, greenScale, blueScale };
        offset = new float[] { 0.0f, 0.0f, 0.0f, };

        return image.rescale(scaleFactor, offset, hints);
    }

    @Override
    public void releaseWritableTile(final int tileX, final int tileY)
    {
        delegate.releaseWritableTile(tileX, tileY);
    }

    @Override
    public void removeTileObserver(final TileObserver to)
    {
        delegate.removeTileObserver(to);
    }

    @Override
    public RobotImage replaceAllDarkerThan(final RobotColor thresholdColor, final RobotColor replacementColor)
    {
        if (thresholdColor == null)
        {
            throw new IllegalArgumentException("thresholdColor is null");
        }

        if (replacementColor == null)
        {
            throw new IllegalArgumentException("replacementColor is null");
        }

        final int width = getWidth();
        final int height = getHeight();

        final BufferedImage image = new BufferedImage(width, height, getType());

        final int replacementRgb = replacementColor.getRGB();

        for (int i = 0; i < width; i++)
        {
            for (int j = 0; j < height; j++)
            {
                final RobotColor color = getPixel(i, j);

                if (color.isDarkerThan(thresholdColor))
                {
                    image.setRGB(i, j, replacementRgb);
                }
                else
                {
                    image.setRGB(i, j, color.getRGB());
                }
            }
        }

        return new DefaultRobotImage(image, getParent(), getOrigin());
    }

    @Override
    public RobotImage replaceAllLighterThan(final RobotColor thresholdColor, final RobotColor replacementColor)
    {
        if (thresholdColor == null)
        {
            throw new IllegalArgumentException("thresholdColor is null");
        }

        if (replacementColor == null)
        {
            throw new IllegalArgumentException("replacementColor is null");
        }

        final int width = getWidth();
        final int height = getHeight();

        final BufferedImage image = new BufferedImage(width, height, getType());

        final int replacementRgb = replacementColor.getRGB();

        for (int i = 0; i < width; i++)
        {
            for (int j = 0; j < height; j++)
            {
                final RobotColor color = getPixel(i, j);

                if (color.isLighterThan(thresholdColor))
                {
                    image.setRGB(i, j, replacementRgb);
                }
                else
                {
                    image.setRGB(i, j, color.getRGB());
                }
            }
        }

        return new DefaultRobotImage(image, getParent(), getOrigin());
    }

    @Override
    public RobotImage replaceAllUsingThreshold(final RobotColor thresholdColor,
            final RobotColor darkerReplacementColor, final RobotColor lighterReplacementColor)
    {
        if (thresholdColor == null)
        {
            throw new IllegalArgumentException("thresholdColor is null");
        }

        if (darkerReplacementColor == null)
        {
            throw new IllegalArgumentException("darkerReplacementColor is null");
        }

        if (lighterReplacementColor == null)
        {
            throw new IllegalArgumentException("lighterReplacementColor is null");
        }

        final int width = getWidth();
        final int height = getHeight();

        final BufferedImage image = new BufferedImage(width, height, getType());

        final int darkerReplacementRgb = darkerReplacementColor.getRGB();
        final int lighterReplacementRgb = lighterReplacementColor.getRGB();

        for (int i = 0; i < width; i++)
        {
            for (int j = 0; j < height; j++)
            {
                final RobotColor color = getPixel(i, j);

                if (color.isDarkerThan(thresholdColor))
                {
                    image.setRGB(i, j, darkerReplacementRgb);
                }
                else
                {
                    image.setRGB(i, j, lighterReplacementRgb);
                }
            }
        }

        return new DefaultRobotImage(image, getParent(), getOrigin());
    }

    /**
     * <table style="border: 1px solid; border-collapse: collapse; text-align:center">
     * <tr>
     * <th style="border: 1px solid;">scaleFactor</th>
     * <th style="border: 1px solid;">offset</th>
     * <th style="border: 1px solid;">input</th>
     * <th colspan="2" style="border: 1px solid;">output</th>
     * </tr>
     * <tr>
     * <td rowspan="3" style="border: 1px solid;">2</td>
     * <td rowspan="3" style="border: 1px solid;">-127</td>
     * <td style="border: 1px solid;">0</td>
     * <td style="border: 1px solid;">-127</td>
     * <td style="border: 1px solid;">0</td>
     * </tr>
     * <tr>
     * <td style="border: 1px solid;">127</td>
     * <td colspan="2" style="border: 1px solid;">127</td>
     * </tr>
     * <tr>
     * <td style="border: 1px solid;">255</td>
     * <td style="border: 1px solid;">383</td>
     * <td style="border: 1px solid;">255</td>
     * </tr>
     * <tr>
     * <td rowspan="3" style="border: 1px solid;">3</td>
     * <td rowspan="3" style="border: 1px solid;">-160</td>
     * <td style="border: 1px solid;">0</td>
     * <td style="border: 1px solid;">-160</td>
     * <td style="border: 1px solid;">0</td>
     * </tr>
     * <tr>
     * <td style="border: 1px solid;">127</td>
     * <td colspan="2" style="border: 1px solid;">221</td>
     * </tr>
     * <tr>
     * <td style="border: 1px solid;">255</td>
     * <td style="border: 1px solid;">605</td>
     * <td style="border: 1px solid;">255</td>
     * </tr>
     * <tr>
     * <td rowspan="3" style="border: 1px solid;">3</td>
     * <td rowspan="3" style="border: 1px solid;">-254</td>
     * <td style="border: 1px solid;">0</td>
     * <td style="border: 1px solid;">-254</td>
     * <td style="border: 1px solid;">0</td>
     * </tr>
     * <tr>
     * <td style="border: 1px solid;">127</td>
     * <td colspan="2" style="border: 1px solid;">127</td>
     * </tr>
     * <tr>
     * <td style="border: 1px solid;">255</td>
     * <td style="border: 1px solid;">511</td>
     * <td style="border: 1px solid;">255</td>
     * </tr>
     * <tr>
     * <td rowspan="3" style="border: 1px solid;">4</td>
     * <td rowspan="3" style="border: 1px solid;">-381</td>
     * <td style="border: 1px solid;">0</td>
     * <td style="border: 1px solid;">-381</td>
     * <td style="border: 1px solid;">0</td>
     * </tr>
     * <tr>
     * <td style="border: 1px solid;">127</td>
     * <td colspan="2" style="border: 1px solid;">127</td>
     * </tr>
     * <tr>
     * <td style="border: 1px solid;">255</td>
     * <td style="border: 1px solid;">639</td>
     * <td style="border: 1px solid;">255</td>
     * </tr>
     * <tr>
     * <td rowspan="3" style="border: 1px solid;">5</td>
     * <td rowspan="3" style="border: 1px solid;">-508</td>
     * <td style="border: 1px solid;">0</td>
     * <td style="border: 1px solid;">-508</td>
     * <td style="border: 1px solid;">0</td>
     * </tr>
     * <tr>
     * <td style="border: 1px solid;">127</td>
     * <td colspan="2" style="border: 1px solid;">127</td>
     * </tr>
     * <tr>
     * <td style="border: 1px solid;">255</td>
     * <td style="border: 1px solid;">767</td>
     * <td style="border: 1px solid;">255</td>
     * </tr>
     * </table>
     */
    @Override
    public RobotImage rescale(final float scaleFactor, final float offset, final RenderingHints hints)
    {
        final RescaleOp operation = new RescaleOp(scaleFactor, offset, hints);
        final BufferedImage image = operation.filter(getBufferedImage(), null);

        return new DefaultRobotImage(image, getParent(), getOrigin());
    }

    @Override
    public RobotImage rescale(final float[] scaleFactors, final float[] offsets, final RenderingHints hints)
    {
        final RescaleOp operation = new RescaleOp(scaleFactors, offsets, hints);
        final BufferedImage image = operation.filter(getBufferedImage(), null);

        return new DefaultRobotImage(image, getParent(), getOrigin());
    }

    @Override
    public void setData(final Raster r)
    {
        throw new RuntimeException("Instances of DefaultRobotImage are immutable.");
    }

    @Override
    public List<RobotImage> splitAlongHorizontalLine(final RobotColor thresholdColor)
    {
        return splitAlongHorizontalLine(thresholdColor, 0);
    }

    @Override
    public List<RobotImage> splitAlongHorizontalLine(final RobotColor thresholdColor, final int maxCount)
    {
        if (thresholdColor == null)
        {
            throw new IllegalArgumentException("thresholdColor is null");
        }

        final List<RobotImage> answer = new ArrayList<RobotImage>();

        final int width = getWidth();
        final int height = getHeight();

        int start = 0;
        boolean isPreviousLighter = false;
        boolean isLighter = isHorizontalLineLighterThan(start, thresholdColor, maxCount);

        for (int j = 1; j < height; j++)
        {
            isPreviousLighter = isLighter;
            isLighter = isHorizontalLineLighterThan(j, thresholdColor, maxCount);

            if (isPreviousLighter && !isLighter)
            {
                start = j;
            }
            else if (!isPreviousLighter && isLighter)
            {
                final RobotImage segment = getSubimage(0, start, width, (j - start));
                answer.add(segment);
            }
        }

        if ((start < height) && !isLighter)
        {
            // Capture the last segment.
            final RobotImage segment = getSubimage(0, start, width, (height - start));
            answer.add(segment);
        }

        return answer;
    }

    @Override
    public List<RobotImage> splitAlongVerticalLine(final RobotColor thresholdColor)
    {
        return splitAlongVerticalLine(thresholdColor, 0);
    }

    @Override
    public List<RobotImage> splitAlongVerticalLine(final RobotColor thresholdColor, final int maxCount)
    {
        if (thresholdColor == null)
        {
            throw new IllegalArgumentException("thresholdColor is null");
        }

        final boolean isVerbose = false;

        final List<RobotImage> answer = new ArrayList<RobotImage>();

        final int width = getWidth();
        final int height = getHeight();

        int start = 0;
        int previousDarker = 0;
        int darker = countPixelsInVerticalLineDarkerThan(start, thresholdColor);

        for (int i = 1; i < width; i++)
        {
            previousDarker = darker;
            darker = countPixelsInVerticalLineDarkerThan(i, thresholdColor);

            if (isVerbose)
            {
                System.out.println(i + " previousDarker = " + previousDarker + " darker = " + darker);
            }

            boolean isSegment = false;

            if (maxCount == 0)
            {
                isSegment = (previousDarker >= 0) && (darker == 0);
            }
            else
            {
                isSegment = (previousDarker > maxCount) && (darker <= maxCount);
            }

            if (isSegment)
            {
                if (i > start)
                {
                    if (isVerbose)
                    {
                        System.out.println(answer.size() + " segment start, end = " + start + ", " + i);
                    }

                    final RobotImage segment = getSubimage(start, 0, (i - start), height);
                    answer.add(segment);
                }

                start = i + 1;

                if (isVerbose)
                {
                    System.out.println(i + " start = " + start);
                }
            }
        }

        if ((start < width) && (darker > maxCount))
        {
            // Capture the last segment.
            if (isVerbose)
            {
                System.out.println(answer.size() + " segment start, end = " + start + ", " + width);
            }

            final RobotImage segment = getSubimage(start, 0, (width - start), height);
            answer.add(segment);
        }

        if (isVerbose)
        {
            System.out.println("answer.size() = " + answer.size());
        }

        return answer;
    }

    @Override
    public List<RobotImage> splitAlongVerticalRegion(final RobotColor thresholdColor, final int minGap)
    {
        if (thresholdColor == null)
        {
            throw new IllegalArgumentException("thresholdColor is null");
        }

        final List<RobotImage> answer = new ArrayList<RobotImage>();

        final List<RobotImage> list = splitAlongVerticalLine(thresholdColor);

        if (!list.isEmpty())
        {
            final int height = getHeight();

            final RobotImage image0 = list.get(0);
            int groupStart = 0;
            int groupEnd = image0.getWidth();

            for (int i = 1; i < list.size(); i++)
            {
                final RobotImage image = list.get(i);
                final int start = image.getOrigin().x;

                final int gap = start - groupEnd;

                if (gap >= minGap)
                {
                    final RobotImage region = getSubimage(groupStart, 0, (groupEnd - groupStart), height);
                    answer.add(region);

                    groupStart = start;
                }

                groupEnd = image.getOrigin().x + image.getWidth();
            }

            final int end = getWidth();
            final RobotImage region = getSubimage(groupStart, 0, (end - groupStart), height);
            answer.add(region);
        }

        return answer;
    }

    @Override
    public RobotImage toBlackAndWhite()
    {
        return toBlackAndWhite(DefaultRobotColor.GRAY);
    }

    @Override
    public RobotImage toBlackAndWhite(final RobotColor thresholdColor)
    {
        final RobotColor darkerReplacementColor = DefaultRobotColor.BLACK;
        final RobotColor lighterReplacementColor = DefaultRobotColor.WHITE;

        return replaceAllUsingThreshold(thresholdColor, darkerReplacementColor, lighterReplacementColor);
    }

    @Override
    public RobotImage toGrayScale()
    {
        // FIXME replace with use of ColorConvertOp?
        final int width = getWidth();
        final int height = getHeight();

        final BufferedImage image = new BufferedImage(width, height, getType());

        for (int i = 0; i < width; i++)
        {
            for (int j = 0; j < height; j++)
            {
                final RobotColor color = getPixel(i, j);
                final int newRgb = color.toGrayScale().getRGB();

                image.setRGB(i, j, newRgb);
            }
        }

        return new DefaultRobotImage(image, getParent(), getOrigin());
    }

    @Override
    public String toString()
    {
        final StringBuilder sb = new StringBuilder();

        sb.append(getClass().getName());
        sb.append(" [");
        sb.append("width=").append(getWidth());
        sb.append(",height=").append(getHeight());
        sb.append("]");

        return sb.toString();
    }

    @Override
    public RobotImage trim()
    {
        return trim(DefaultRobotColor.GRAY);
    }

    @Override
    public RobotImage trim(final RobotColor thresholdColor)
    {
        if (thresholdColor == null)
        {
            throw new IllegalArgumentException("thresholdColor is null");
        }

        Rectangle bounds = null;
        final int width = getWidth();
        final int height = getHeight();

        for (int i = 0; i < width; i++)
        {
            for (int j = 0; j < height; j++)
            {
                final RobotColor color = getPixel(i, j);

                if (color.isDarkerThan(thresholdColor))
                {
                    if (bounds == null)
                    {
                        bounds = new Rectangle(i, j, 1, 1);
                    }
                    else
                    {
                        bounds.add(i, j);
                    }
                }
            }
        }

        RobotImage answer = null;

        if (bounds != null)
        {
            if (((bounds.x + bounds.width) < getWidth()) && ((bounds.y + bounds.height) < getHeight()))
            {
                answer = getSubimage(bounds.x, bounds.y, bounds.width + 1, bounds.height + 1);
            }
        }

        return answer;
    }

    /**
     * @return the backing buffered image.
     */
    BufferedImage getBufferedImage()
    {
        return ((DefaultBufferedImage)delegate).getBufferedImage();
    }

    /**
     * @param value Value.
     * @param accuracy Accuracy (typically two decimal places 100.0).
     * 
     * @return the given parameter as the nearest float.
     */
    private float asFloat(final double value, final double accuracy)
    {
        return (float)(Math.round(value * accuracy) / accuracy);
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
     * @param x Image X coordinate.
     * @param thresholdColor Threshold color.
     * 
     * @return the number of pixels which are darker than the threshold color.
     */
    private int countPixelsInVerticalLineDarkerThan(final int x, final RobotColor thresholdColor)
    {
        // Count the number of pixels which are darker than the threshold color.
        final int height = getHeight();
        int count = 0;

        for (int j = 0; j < height; j++)
        {
            final RobotColor color = getPixel(x, j);

            if (color.isDarkerThan(thresholdColor))
            {
                count++;
            }
        }

        return count;
    }

    /**
     * @param y Image Y coordinate.
     * @param thresholdColor Threshold color.
     * @param maxCount Maximum darker count allowed (typically 0).
     * 
     * @return true if the row is all background.
     */
    private boolean isHorizontalLineLighterThan(final int y, final RobotColor thresholdColor, final int maxCount)
    {
        // Count the number of pixels which are darker than the threshold color.
        final int width = getWidth();
        int count = 0;

        for (int i = 0; i < width; i++)
        {
            final RobotColor color = getPixel(i, y);

            if (color.isDarkerThan(thresholdColor))
            {
                count++;
            }
        }

        return (count <= maxCount);
    }

    /**
     * @param thresholdColor Threshold color.
     * 
     * @return an array representing this image with pixels lighter than threshold color as false, and pixels darker
     *         than threshold color as true.
     */
    private Boolean[][] toBinary(final RobotColor thresholdColor)
    {
        final int width = getWidth();
        final int height = getHeight();

        final Boolean[][] image = new Boolean[width][];

        for (int i = 0; i < width; i++)
        {
            image[i] = new Boolean[height];

            for (int j = 0; j < height; j++)
            {
                final RobotColor color = getPixel(i, j);

                if (color.isDarkerThan(thresholdColor))
                {
                    image[i][j] = true;
                }
                else
                {
                    image[i][j] = false;
                }
            }
        }

        return image;
    }
}

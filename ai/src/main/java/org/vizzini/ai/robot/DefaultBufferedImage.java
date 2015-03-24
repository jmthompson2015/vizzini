package org.vizzini.ai.robot;

import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.GraphicsConfiguration;
import java.awt.Image;
import java.awt.ImageCapabilities;
import java.awt.Point;
import java.awt.Rectangle;
import java.awt.image.BufferedImage;
import java.awt.image.ColorModel;
import java.awt.image.ImageObserver;
import java.awt.image.ImageProducer;
import java.awt.image.Raster;
import java.awt.image.RenderedImage;
import java.awt.image.SampleModel;
import java.awt.image.TileObserver;
import java.awt.image.WritableRaster;
import java.util.Vector;

/**
 * Provides a default implementation of a buffered image.
 */
public final class DefaultBufferedImage implements BufferedImageInterface
{
    /** Image. */
    private final BufferedImage delegate;

    /**
     * Construct this object.
     * 
     * @param image Image. (required)
     */
    public DefaultBufferedImage(final BufferedImage image)
    {
        if (image == null)
        {
            throw new IllegalArgumentException("image is null");
        }

        this.delegate = image;
    }

    /**
     * Construct this object.
     * 
     * @param width width of the created image
     * @param height height of the created image
     * @param imageType type of the created image
     */
    public DefaultBufferedImage(final int width, final int height, final int imageType)
    {
        this(new BufferedImage(width, height, imageType));
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
    public Graphics2D createGraphics()
    {
        return delegate.createGraphics();
    }

    @Override
    public void flush()
    {
        delegate.flush();
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
    public BufferedImageInterface getSubimage(final int x, final int y, final int w, final int h)
    {
        return new DefaultBufferedImage(delegate.getSubimage(x, y, w, h));
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
    public void setData(final Raster r)
    {
        throw new RuntimeException("Instances of DefaultBufferedImage are immutable.");
    }

    /**
     * @return the backing buffered image.
     */
    BufferedImage getBufferedImage()
    {
        return delegate;
    }
}

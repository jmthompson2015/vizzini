package org.vizzini.illyriad.map.swingui;

import java.awt.Color;
import java.awt.Dimension;
import java.awt.Graphics;
import java.awt.Image;
import java.awt.Point;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.io.InputStream;
import java.util.BitSet;

import javax.imageio.ImageIO;
import javax.swing.JPanel;

import org.vizzini.illyriad.map.GeoIdConverter;

/**
 * Provides a map panel for a sweetspot finder user interface.
 */
public final class MapPanel extends JPanel
{
    /**
     * @param masterSize Master size.
     * @param targetSize Target size.
     * 
     * @return a scale factor.
     */
    private static double getScaleFactor(final int masterSize, final int targetSize)
    {
        double answer = 1.0;

        if (masterSize > targetSize)
        {
            answer = (double)targetSize / (double)masterSize;
        }
        else
        {
            answer = (double)targetSize / (double)masterSize;
        }

        return answer;
    }

    /**
     * @param original Original dimensions.
     * @param toFit To fit dimensions.
     * 
     * @return a scale factor.
     */
    private static double getScaleFactorToFit(final Dimension original, final Dimension toFit)
    {
        double answer = 1.0;

        if ((original != null) && (toFit != null))
        {
            final double dScaleWidth = getScaleFactor(original.width, toFit.width);
            final double dScaleHeight = getScaleFactor(original.height, toFit.height);

            answer = Math.min(dScaleHeight, dScaleWidth);
        }

        return answer;
    }

    /** Geospatial ID converter. */
    private final GeoIdConverter converter = new GeoIdConverter(true);

    /** Background image. */
    private final BufferedImage backgroundImage;

    /** Points. */
    private BitSet points = new BitSet();

    /** Point color. */
    private final Color pointColor = Color.WHITE;

    /** Point size. */
    private final int pointSize = 4;

    /**
     * Construct this object.
     */
    public MapPanel()
    {
        backgroundImage = loadBackgroundImage();

        setBackground(Color.GRAY);
    }

    /**
     * @return the squares
     */
    public BitSet getSquares()
    {
        return points;
    }

    /**
     * @param points the points to set
     */
    @SuppressWarnings("hiding")
    public void setSquares(final BitSet points)
    {
        this.points = points;
        repaint();
    }

    @Override
    protected void paintComponent(final Graphics g)
    {
        super.paintComponent(g);

        final double scaleFactor = Math.min(1d,
                getScaleFactorToFit(new Dimension(backgroundImage.getWidth(), backgroundImage.getHeight()), getSize()));

        final int scaleWidth = (int)Math.round(backgroundImage.getWidth() * scaleFactor);
        final int scaleHeight = (int)Math.round(backgroundImage.getHeight() * scaleFactor);

        final Image scaled = backgroundImage.getScaledInstance(scaleWidth, scaleHeight, Image.SCALE_SMOOTH);

        final int width = getWidth() - 1;
        final int height = getHeight() - 1;

        final int x = (width - scaled.getWidth(null)) / 2;
        final int y = (height - scaled.getHeight(null)) / 2;

        g.drawImage(scaled, x, y, null);

        drawPoints(g, x, y, scaleWidth, scaleHeight);
    }

    /**
     * @param g Graphics.
     * @param x X origin.
     * @param y Y origin.
     * @param scaleWidth Scale width.
     * @param scaleHeight Scale height.
     */
    private void drawPoints(final Graphics g, final int x, final int y, final int scaleWidth, final int scaleHeight)
    {
        if ((points != null) && !points.isEmpty())
        {
            System.out.println("points.cardinality() = " + points.cardinality());
            g.setColor(pointColor);

            final double pointScaleX = (1.0 * scaleWidth) / GeoIdConverter.X_COORD_RANGE;
            final double pointScaleY = (1.0 * scaleHeight) / GeoIdConverter.Y_COORD_RANGE;

            final Point point = new Point();

            for (int i = points.nextSetBit(0); i >= 0; i = points.nextSetBit(i + 1))
            {
                getScaledPointFor(point, i, pointScaleX, pointScaleY);
                g.fillOval(x + point.x, (y + scaleHeight) - point.y, pointSize, pointSize);
            }
        }
    }

    /**
     * @param point Point to fill.
     * @param index Geospatial index.
     * @param pointScaleX Point scale for X.
     * @param pointScaleY Point scale for Y.
     */
    private void getScaledPointFor(final Point point, final int index, final double pointScaleX,
            final double pointScaleY)
    {
        final Point myPoint = converter.indexToPoint(index);
        myPoint.translate(-GeoIdConverter.MIN_X_COORD, -converter.getMinY());

        point.x = (int)Math.floor(pointScaleX * myPoint.x);
        point.y = (int)Math.floor(pointScaleY * myPoint.y);
    }

    /**
     * @return a new background image.
     */
    private BufferedImage loadBackgroundImage()
    {
        BufferedImage answer = null;

        final InputStream inputStream = getClass().getClassLoader().getResourceAsStream(
                "mapData/region_faction_map.png");

        try
        {
            answer = ImageIO.read(inputStream);
        }
        catch (final IOException e)
        {
            throw new RuntimeException(e);
        }

        return answer;
    }
}

package org.vizzini.starfightersquadrons.swingui;

import java.awt.BasicStroke;
import java.awt.Color;
import java.awt.Graphics2D;
import java.awt.RenderingHints;
import java.awt.Stroke;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;

import javax.imageio.ImageIO;

import org.vizzini.starfightersquadrons.Ship;
import org.vizzini.starfightersquadrons.Ship.FiringArc;
import org.vizzini.starfightersquadrons.SSTeam;

/**
 * Provides a utility to add firing arc lines to a ship image.
 */
public final class AddFiringArcLines
{
    /**
     * Application method.
     *
     * @param args Application arguments.
     */
    public static final void main(final String[] args)
    {
        final Ship[] ships = Ship.values();

        for (final Ship ship : ships)
        {
            final AddFiringArcLines app = new AddFiringArcLines(ship);
            final BufferedImage newImage = app.createNewImage();
            saveImage(ship, newImage);
        }
    }

    /**
     * @param ship Ship.
     *
     * @return a filename.
     */
    private static String createFilename(final Ship ship)
    {
        String shipName = ship.getName();
        shipName = shipName.replaceAll("[ ]", "_");

        return shipName + ".png";
    }

    /**
     * @param ship Ship.
     * @param newImage New image.
     */
    private static void saveImage(final Ship ship, final BufferedImage newImage)
    {
        final File base = new File("newShips");
        base.mkdir();
        final File file = new File(base, createFilename(ship));
        try
        {
            ImageIO.write(newImage, "png", file);
        }
        catch (final IOException e)
        {
            throw new RuntimeException(e);
        }
    }

    /** Firing arc stroke. */
    private static final Stroke FIRING_ARC_STROKE = new BasicStroke(1, BasicStroke.CAP_BUTT, BasicStroke.JOIN_BEVEL, 0,
            new float[] { 3 }, 0);

    /** Firing arc color. */
    private static final Color IMPERIAL_FIRING_ARC = Color.GREEN;

    /** Firing arc color. */
    private static final Color REBEL_FIRING_ARC = Color.RED;

    /** Transparent color. */
    private static final Color TRANSPARENT = new Color(0, 0, 0, 0);

    /** Ship. */
    private final Ship ship;

    /**
     * Construct this object.
     *
     * @param ship Ship.
     */
    @SuppressWarnings("hiding")
    public AddFiringArcLines(final Ship ship)
    {
        this.ship = ship;
    }

    /**
     * @return a new image upon which the firing arc is drawn.
     */
    public BufferedImage createNewImage()
    {
        BufferedImage answer = null;

        // Load ship image.
        final String shipName = createFilename(ship);
        final String filename = "/Users/jmthompson/Dropbox/SoftwareDev/JavaProjects/vizzini/starfightersquadrons/src/main/resources/images/Ship/"
                + shipName;
        System.out.println("filename = " + filename);
        final File oldFile = new File(filename);

        try
        {
            final InputStream inputStream = new FileInputStream(oldFile);
            final BufferedImage oldImage = ImageIO.read(inputStream);
            final int size = Math.max(oldImage.getWidth(), oldImage.getHeight());
            System.out.println("size = " + size);

            // Create a new buffered image.
            answer = new BufferedImage(size, size, BufferedImage.TYPE_INT_ARGB);

            // Fill image with transparent color.
            final Graphics2D g2d = answer.createGraphics();
            g2d.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
            g2d.setColor(TRANSPARENT);
            g2d.fillRect(0, 0, size, size);

            // Draw firing arc lines.
            final int center = size / 2;
            System.out.println("center = " + center);
            g2d.setColor(getFiringArcColor(ship.getTeam()));
            g2d.drawLine(center, center - 1, size - 1, 0);
            g2d.drawLine(center, center, size, size);

            if (ship.getPrimaryFiringArc() == FiringArc.FORWARD_AND_AFT)
            {
                g2d.setStroke(FIRING_ARC_STROKE);
                g2d.drawLine(0, 0, center, center);
                g2d.drawLine(0, size - 1, center, center - 1);
            }

            // Draw the ship image on top.
            final int x = (size - oldImage.getWidth()) / 2;
            final int y = (size - oldImage.getHeight()) / 2;
            System.out.println("x, y = " + x + ", " + y);
            g2d.drawImage(oldImage, x, y, null);
            g2d.dispose();
        }
        catch (final FileNotFoundException e)
        {
            throw new RuntimeException(e);
        }
        catch (final IOException e)
        {
            throw new RuntimeException(e);
        }

        return answer;
    }

    /**
     * @param team Team.
     *
     * @return the color.
     */
    private Color getFiringArcColor(final SSTeam team)
    {
        return team == SSTeam.IMPERIAL ? IMPERIAL_FIRING_ARC : REBEL_FIRING_ARC;
    }
}

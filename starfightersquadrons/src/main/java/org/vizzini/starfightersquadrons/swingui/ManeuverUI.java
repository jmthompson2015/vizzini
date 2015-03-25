package org.vizzini.starfightersquadrons.swingui;

import java.awt.Color;
import java.awt.Dimension;
import java.awt.Font;
import java.awt.FontMetrics;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.Point;
import java.awt.Polygon;
import java.awt.RenderingHints;
import java.awt.geom.Path2D;
import java.awt.geom.Point2D;
import java.awt.geom.Rectangle2D;
import java.util.List;

import javax.swing.JPanel;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.vizzini.core.InputValidator;
import org.vizzini.starfightersquadrons.Maneuver;
import org.vizzini.starfightersquadrons.ShapeUtilities;
import org.vizzini.starfightersquadrons.ShipBase;
import org.vizzini.starfightersquadrons.SSPosition;
import org.vizzini.starfightersquadrons.Maneuver.Difficulty;

/**
 * Provides a user interface for a maneuver.
 */
public final class ManeuverUI extends JPanel
{
    /** Foreground color. */
    private static final Color FOREGROUND_COLOR = Color.WHITE;

    /** Logger. */
    private static final Logger LOGGER = LogManager.getLogger();

    /** From polygon. */
    private final Polygon fromPolygon;

    /** From position. */
    private final SSPosition fromPosition;

    /** Maneuver. */
    private final Maneuver maneuver;

    /** Origin point. */
    private final Point origin;

    /** Path. */
    private final Path2D path;

    /** Path points. */
    private final List<Point2D> pathPoints;

    /** Shape utilities. */
    private final ShapeUtilities shapeUtils = new ShapeUtilities();

    /** To polygon. */
    private final Polygon toPolygon;

    /** To position. */
    private final SSPosition toPosition;

    /** Preferred size. */
    private final Dimension preferredSize;

    /**
     * Construct this object.
     * 
     * @param maneuver Maneuver.
     * @param fromPosition From position.
     * @param shipBase Ship base.
     */
    @SuppressWarnings("hiding")
    public ManeuverUI(final Maneuver maneuver, final SSPosition fromPosition, final ShipBase shipBase)
    {
        super();

        InputValidator.validateNotNull("maneuver", maneuver);
        InputValidator.validateNotNull("fromPosition", fromPosition);
        InputValidator.validateNotNull("shipBase", shipBase);

        this.maneuver = maneuver;
        this.fromPosition = fromPosition;
        this.toPosition = maneuver.computeToPosition(fromPosition, shipBase);

        if (toPosition == null)
        {
            throw new RuntimeException("toPosition is null");
        }

        this.fromPolygon = maneuver.computeFromPolygon(fromPosition, shipBase);
        this.path = maneuver.computePath(fromPosition, shipBase);
        this.toPolygon = maneuver.computeToPolygon(fromPosition, shipBase);

        this.pathPoints = shapeUtils.asList(path);

        final Rectangle2D fromBounds = fromPolygon.getBounds2D();
        final Rectangle2D pathBounds = path.getBounds2D();
        final Rectangle2D toBounds = toPolygon.getBounds2D();
        final Rectangle2D bounds = fromBounds.createUnion(pathBounds).createUnion(toBounds);
        LOGGER.trace("bounds = " + bounds);
        preferredSize = new Dimension(toInt(bounds.getWidth()) + 2, toInt(bounds.getHeight()) + 2);
        LOGGER.trace("preferredSize = " + getPreferredSize());

        // Compute the origin point.
        origin = new Point(toInt(bounds.getX()) - 1, toInt(bounds.getY()) - 1);
        LOGGER.trace("origin = " + origin);
        setBounds(origin.x, origin.y, preferredSize.width, preferredSize.height);

        setToolTipText(maneuver.getBearing() + " " + maneuver.getSpeed() + " " + maneuver.getDifficulty());
        setOpaque(false);
    }

    @Override
    public Dimension getPreferredSize()
    {
        return preferredSize;
    }

    @Override
    public void paintComponent(final Graphics g)
    {
        LOGGER.trace("paintComponent() start");
        super.paintComponent(g);

        // Setup.
        final Graphics2D g2d = (Graphics2D)g.create();
        g2d.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
        g2d.translate(-origin.x, -origin.y);

        // Mark the center.
        g2d.setColor(FOREGROUND_COLOR);
        final int radius = 4;
        g2d.fillOval(fromPosition.getX() - radius, fromPosition.getY() - radius, 2 * radius, 2 * radius);

        // Draw from ship base.
        g2d.draw(fromPolygon);

        // Draw to ship base.
        g2d.draw(toPolygon);

        // Draw maneuver path.
        g2d.setColor(getColor(maneuver.getDifficulty()));
        g2d.draw(path);

        // Draw the speed.
        g2d.setColor(FOREGROUND_COLOR);
        final Font font = g2d.getFont();
        g2d.setFont(new Font(font.getName(), Font.BOLD, font.getSize()));
        final int size = pathPoints.size();
        final Point2D p0 = pathPoints.get(size - 1);
        final Point2D p1 = pathPoints.get(size - 2);
        final double t = 1.6;
        final int x0 = toInt(p0.getX() + (t * (p1.getX() - p0.getX())));
        final int y0 = toInt(p0.getY() + (t * (p1.getY() - p0.getY())));
        final String text = String.valueOf(maneuver.getSpeed());
        final FontMetrics fm = g.getFontMetrics();
        final int totalWidth = fm.stringWidth(text);
        final int totalHeight = fm.getHeight();
        final int x1 = x0 - (totalWidth / 2);
        final int y1 = y0 + (totalHeight / 4);
        g2d.drawString(String.valueOf(maneuver.getSpeed()), x1, y1);

        LOGGER.trace("paintComponent() end");
    }

    /**
     * @param difficulty Difficulty.
     * 
     * @return the color for the given parameter.
     */
    private Color getColor(final Difficulty difficulty)
    {
        Color answer = Color.YELLOW;

        switch (difficulty)
        {
        case EASY:
            answer = Color.GREEN;
            break;
        case STANDARD:
            answer = Color.WHITE;
            break;
        case HARD:
            answer = Color.RED;
            break;
        }

        return answer;
    }

    /**
     * @param value Value.
     * 
     * @return value rounded to an integer.
     */
    private int toInt(final double value)
    {
        return (int)Math.round(value);
    }
}

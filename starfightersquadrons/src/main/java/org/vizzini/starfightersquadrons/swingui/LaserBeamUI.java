package org.vizzini.starfightersquadrons.swingui;

import java.awt.BasicStroke;
import java.awt.Color;
import java.awt.Dimension;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.Point;
import java.awt.RenderingHints;

import javax.swing.JPanel;

import org.vizzini.core.InputValidator;
import org.vizzini.starfightersquadrons.SSPosition;
import org.vizzini.starfightersquadrons.SSTeam;

/**
 * Provides a user interface for a laser beam.
 */
public final class LaserBeamUI extends JPanel
{
    /** Imperial laser color. */
    private static final Color IMPERIAL_LASER = Color.GREEN;

    /** Line width. */
    private static final int LINE_WIDTH = 3;

    /** Rebel laser color. */
    private static final Color REBEL_LASER = Color.RED;

    /** Color. */
    private final Color color;

    /** From position. */
    private final SSPosition fromPosition;

    /** Origin point. */
    private final Point origin;

    /** Preferred size. */
    private final Dimension preferredSize;

    /** To position. */
    private final SSPosition toPosition;

    /**
     * Construct this object.
     * 
     * @param attackerTeam Attacker team.
     * @param fromPosition From position.
     * @param toPosition To position.
     */
    @SuppressWarnings("hiding")
    public LaserBeamUI(final SSTeam attackerTeam, final SSPosition fromPosition, final SSPosition toPosition)
    {
        super();

        InputValidator.validateNotNull("attackerTeam", attackerTeam);
        InputValidator.validateNotNull("fromPosition", fromPosition);
        InputValidator.validateNotNull("toPosition", toPosition);

        this.color = getLaserColor(attackerTeam);
        this.fromPosition = fromPosition;
        this.toPosition = toPosition;

        final int minX = Math.min(fromPosition.getX(), toPosition.getX());
        final int minY = Math.min(fromPosition.getY(), toPosition.getY());

        origin = new Point(minX, minY);

        final int maxX = Math.max(fromPosition.getX(), toPosition.getX());
        final int maxY = Math.max(fromPosition.getY(), toPosition.getY());

        final int width = Math.max(maxX - minX, LINE_WIDTH + 1);
        final int height = Math.max(maxY - minY, LINE_WIDTH + 1);

        preferredSize = new Dimension(width, height);

        setBounds(origin.x, origin.y, preferredSize.width, preferredSize.height);
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
        super.paintComponent(g);

        // Setup.
        final Graphics2D g2d = (Graphics2D)g.create();
        g2d.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
        g2d.translate(-origin.x, -origin.y);

        // Draw laser beam.
        g2d.setColor(color);
        g2d.setStroke(new BasicStroke(LINE_WIDTH, BasicStroke.CAP_SQUARE, 0));
        g2d.drawLine(fromPosition.getX(), fromPosition.getY(), toPosition.getX(), toPosition.getY());
    }

    /**
     * @param team Team.
     * 
     * @return the laser color for the given team.
     */
    private Color getLaserColor(final SSTeam team)
    {
        return team == SSTeam.IMPERIAL ? IMPERIAL_LASER : REBEL_LASER;
    }
}

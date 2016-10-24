package org.vizzini.starfightersquadrons.swingui;

import java.awt.BasicStroke;
import java.awt.Color;
import java.awt.Dimension;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.Point;
import java.awt.Rectangle;
import java.awt.RenderingHints;
import java.awt.Stroke;

import javax.swing.ImageIcon;
import javax.swing.JPanel;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.vizzini.core.InputValidator;
import org.vizzini.starfightersquadrons.ShipBase;
import org.vizzini.starfightersquadrons.SSPosition;
import org.vizzini.starfightersquadrons.SSTeam;
import org.vizzini.starfightersquadrons.SSToken;
import org.vizzini.starfightersquadrons.Ship.FiringArc;
import org.vizzini.swingui.game.TokenUI;

/**
 * Provides a ship user interface.
 */
public final class ShipUI extends JPanel implements TokenUI
{
    /** Background square color. */
    private static final Color BACKGROUND_SQUARE = new Color(255, 255, 255, 127);

    /** Firing arc stroke. */
    private static final Stroke FIRING_ARC_STROKE = new BasicStroke(1, BasicStroke.CAP_BUTT, BasicStroke.JOIN_BEVEL, 0,
            new float[] { 5 }, 0);

    /** Firing arc color. */
    private static final Color IMPERIAL_FIRING_ARC = Color.GREEN;

    /** Logger. */
    private static final Logger LOGGER = LogManager.getLogger();

    /** Firing arc color. */
    private static final Color REBEL_FIRING_ARC = Color.RED;

    /** Center point. */
    private final Point center;

    /** Heading. */
    private int heading;

    /** Image. */
    private final ImageIcon image;

    /** Image point. */
    private final Point imagePoint;

    /** Preferred size. */
    private final Dimension preferredSize;

    /** Background square. */
    private final Rectangle square;

    /** Token. */
    private final SSToken token;

    /**
     * Construct this object.
     * 
     * @param token Token.
     * @param heading Heading.
     * @param image Image.
     */
    @SuppressWarnings("hiding")
    public ShipUI(final SSToken token, final int heading, final ImageIcon image)
    {
        super();

        InputValidator.validateNotNull("token", token);
        InputValidator.validateNotNull("image", image);

        this.token = token;
        this.heading = heading;
        this.image = image;

        final ShipBase base = token.getPilot().getShip().getShipBase();
        square = base.getRectangle();
        LOGGER.trace("square = " + square);

        final double size0 = Math.max(square.width, square.height);
        final int size = (int)Math.round(size0 / Math.cos(Math.PI / 4.0));
        preferredSize = new Dimension(size, size);
        LOGGER.trace("preferredSize = " + getPreferredSize());

        final int offset = size / 2;
        center = new Point(offset, offset);
        LOGGER.trace("centerPoint = " + center);

        final int x1 = -(image.getIconWidth() / 2);
        final int y1 = -(image.getIconHeight() / 2);
        imagePoint = new Point(x1, y1);
        LOGGER.trace("imagePoint = " + imagePoint);

        setToolTipText(token.getName());
        setOpaque(false);
    }

    /**
     * @return the center
     */
    public Point getCenter()
    {
        return center;
    }

    /**
     * @return the heading
     */
    public int getHeading()
    {
        return heading;
    }

    /**
     * @return the image
     */
    public ImageIcon getImage()
    {
        return image;
    }

    @Override
    public Dimension getPreferredSize()
    {
        return preferredSize;
    }

    @Override
    public SSToken getToken()
    {
        return token;
    }

    @Override
    public void paintComponent(final Graphics g)
    {
        LOGGER.trace("ShipUI.paintComponent()");
        super.paintComponent(g);

        // Setup.
        final Graphics2D g2d = (Graphics2D)g.create();
        g2d.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);

        g2d.translate(center.x, center.y);
        g2d.rotate(Math.toRadians(heading));

        // Draw background square.
        LOGGER.trace("black rectangle " + square.x + ", " + square.y + ", " + square.width + ", " + square.height);
        g2d.setColor(BACKGROUND_SQUARE);
        g2d.fill(square);

        // Draw firing arc.
        final Color firingArcColor = getFiringArcColor(token.getTeam());

        if (token.getPilot().getShip().getPrimaryFiringArc() == FiringArc.FORWARD)
        {
            g2d.setColor(firingArcColor);
            g2d.drawLine(0, 0, square.x + square.width, square.y);
            g2d.drawLine(0, 0, square.x + square.width, square.y + square.height);
        }
        else if (token.getPilot().getShip().getPrimaryFiringArc() == FiringArc.FORWARD_AND_AFT)
        {
            g2d.setColor(firingArcColor);
            g2d.drawLine(0, 0, square.x + square.width, square.y);
            g2d.drawLine(0, 0, square.x + square.width, square.y + square.height);

            // Dashed line.
            final Graphics2D myG2d = (Graphics2D)g2d.create();
            myG2d.setColor(firingArcColor);
            myG2d.setStroke(FIRING_ARC_STROKE);
            myG2d.drawLine(0, 0, square.x, square.y);
            myG2d.drawLine(0, 0, square.x, square.y + square.height);
            myG2d.dispose();
        }

        // Draw ship image.
        LOGGER.trace("image " + imagePoint.x + ", " + imagePoint.y + ", " + image.getIconWidth() + ", "
                + image.getIconHeight());
        g2d.drawImage(image.getImage(), imagePoint.x, imagePoint.y, this);

        // Draw the token ID.
        g2d.setColor(firingArcColor);
        g2d.rotate(Math.toRadians(90));
        g2d.drawString(String.valueOf(token.getId()), square.x, square.y + square.height);

        // Cleanup.
        g2d.dispose();
    }

    /**
     * @param position the position to set
     */
    public void setPosition(final SSPosition position)
    {
        final int x = position.getX() - center.x;
        final int y = position.getY() - center.y;
        final Dimension prefSize = getPreferredSize();
        LOGGER.trace(token.getPilot().getName() + " setBounds(" + x + ", " + y + ", " + prefSize.width + ", "
                + prefSize.height + ")");
        setBounds(x, y, prefSize.width, prefSize.height);
        this.heading = position.getHeading();

        repaint();
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

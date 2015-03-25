package org.vizzini.starfightersquadrons.swingui;

import java.awt.Dimension;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.Point;
import java.awt.Rectangle;
import java.awt.RenderingHints;

import javax.swing.ImageIcon;
import javax.swing.JPanel;

import org.vizzini.core.InputValidator;
import org.vizzini.starfightersquadrons.ShipBase;
import org.vizzini.starfightersquadrons.SSPosition;

/**
 * Provides a user interface for an explosion.
 */
public final class ExplosionUI extends JPanel
{
    /** Image. */
    private final ImageIcon image;

    /** Origin point. */
    private final Point origin;

    /** Preferred size. */
    private final Dimension preferredSize;

    /**
     * Construct this object.
     * 
     * @param fromPosition From position.
     * @param shipBase Ship base.
     * @param image Image.
     */
    @SuppressWarnings("hiding")
    public ExplosionUI(final SSPosition fromPosition, final ShipBase shipBase, final ImageIcon image)
    {
        super();

        InputValidator.validateNotNull("fromPosition", fromPosition);
        InputValidator.validateNotNull("shipBase", shipBase);
        InputValidator.validateNotNull("image", image);

        this.image = image;

        final Rectangle rectangle = shipBase.getRectangle();

        final int x = fromPosition.getX() - (rectangle.width / 2);
        final int y = fromPosition.getY() - (rectangle.height / 2);
        origin = new Point(x, y);
        preferredSize = new Dimension(rectangle.width, rectangle.height);

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

        // Draw explosion.
        g2d.drawImage(image.getImage(), origin.x, origin.y, preferredSize.width, preferredSize.height, this);
    }
}

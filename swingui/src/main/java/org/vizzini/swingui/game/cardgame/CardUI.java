package org.vizzini.swingui.game.cardgame;

import java.awt.Dimension;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.Image;

import javax.swing.JPanel;

import org.vizzini.core.game.cardgame.Card;

/**
 * Provides a user interface for a card.
 */
public final class CardUI extends JPanel
{
    /** Card. */
    private final Card card;

    /** Image. */
    private final Image image;

    /** Image dimension. */
    private final Dimension imageDimension;

    /**
     * Construct this object.
     * 
     * @param card Card.
     * @param image Image.
     */
    @SuppressWarnings("hiding")
    public CardUI(final Card card, final Image image)
    {
        if (card == null)
        {
            throw new IllegalArgumentException("card is null");
        }

        if (image == null)
        {
            throw new IllegalArgumentException("image is null");
        }

        this.card = card;
        this.image = image;

        setToolTipText(card.getDescription());

        imageDimension = new Dimension(image.getWidth(this), image.getHeight(this));
        setPreferredSize(imageDimension);
    }

    /**
     * @return the card
     */
    public Card getCard()
    {
        return card;
    }

    /**
     * @return the image
     */
    public Image getImage()
    {
        return image;
    }

    @Override
    protected void paintComponent(final Graphics g)
    {
        super.paintComponent(g);

        final Dimension size = getSize();

        final double scaleFactor = Math.min(1.0, getScaleFactorToFit(imageDimension, size));

        final int scaleWidth = (int)Math.round(scaleFactor * imageDimension.width);
        final int scaleHeight = (int)Math.round(scaleFactor * imageDimension.height);

        final int width = size.width - 1;
        final int height = size.height - 1;

        final int x = (width - scaleWidth) / 2;
        final int y = (height - scaleHeight) / 2;

        final Graphics2D g2d = (Graphics2D)g;
        g2d.drawImage(image, x, y, scaleWidth, scaleHeight, this);
    }

    /**
     * @param original Original dimension.
     * @param toFit To fit dimension.
     * 
     * @return a scale factor.
     */
    private double getScaleFactorToFit(final Dimension original, final Dimension toFit)
    {
        final double scaleWidth = (double)toFit.width / original.width;
        final double scaleHeight = (double)toFit.height / original.height;

        return Math.min(scaleHeight, scaleWidth);
    }
}

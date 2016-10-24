package org.vizzini.swingui.game.cardgame;

import java.awt.Image;
import java.io.File;

import org.vizzini.core.game.cardgame.Card;

/**
 * Defines methods required by a card to image map.
 */
public interface CardImageMap
{
    /**
     * @param card Card.
     * 
     * @return the file.
     */
    File getFile(final Card card);

    /**
     * @param card Card.
     * 
     * @return the image.
     */
    Image getImage(final Card card);
}

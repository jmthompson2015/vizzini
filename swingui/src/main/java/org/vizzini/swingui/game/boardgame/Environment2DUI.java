package org.vizzini.swingui.game.boardgame;

import java.awt.Color;
import java.awt.Graphics;
import java.awt.Point;

import org.vizzini.core.game.Position;

/**
 * Defines methods required by a 2D environment user interface.
 */
public interface Environment2DUI extends BoardGameEnvironmentUI
{
    /**
     * @return color.
     */
    Color getFirstTokenColor();

    /**
     * @param point Point.
     * 
     * @return the position of the point in the environment.
     */
    Position<?> getPositionForPoint(final Point point);

    /**
     * @return color.
     */
    Color getSecondTokenColor();

    /**
     * @param g Graphics.
     */
    void paintComponent(final Graphics g);
}

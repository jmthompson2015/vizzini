package org.vizzini.swingui.game.boardgame;

import java.awt.Color;
import java.util.Set;

import org.vizzini.core.game.boardgame.BoardGamePosition;
import org.vizzini.swingui.game.EnvironmentUI;

/**
 * Defines methods required by an environment user interface for a board game.
 */
public interface BoardGameEnvironmentUI extends EnvironmentUI
{
    /**
     * Add a highlight.
     * 
     * @param position Position.
     */
    void addHighlight(BoardGamePosition position);

    /**
     * Clear all highlights.
     */
    void clearHighlights();

    /**
     * @return the highlightColor
     */
    Color getHighlightColor();

    /**
     * @return highlights.
     */
    Set<BoardGamePosition> getHighlights();

    /**
     * Play a click sound.
     */
    void playClick();
}

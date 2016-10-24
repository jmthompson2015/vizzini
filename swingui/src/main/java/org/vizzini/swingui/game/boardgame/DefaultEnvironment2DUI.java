package org.vizzini.swingui.game.boardgame;

import java.awt.Color;
import java.awt.Graphics;
import java.awt.Point;
import java.util.Set;

import javax.swing.JPanel;

import org.vizzini.core.game.Environment;
import org.vizzini.core.game.Position;
import org.vizzini.core.game.boardgame.BoardGamePosition;

/**
 * Provides a default implementation of a 2D environment user interface.
 */
public final class DefaultEnvironment2DUI extends JPanel implements Environment2DUI
{
    /** Default first token color. */
    public static final Color DEFAULT_FIRST_TOKEN_COLOR = Color.WHITE;

    /** Default second token color. */
    public static final Color DEFAULT_SECOND_TOKEN_COLOR = Color.BLACK;

    /** Delegate. */
    private final BoardGameEnvironmentUI delegate;

    /** First token color. */
    private final Color firstTokenColor;

    /** Second token color. */
    private final Color secondTokenColor;

    /**
     * Construct this object.
     * 
     * @param environment Environment.
     */
    public DefaultEnvironment2DUI(final Environment environment)
    {
        this(environment, DEFAULT_FIRST_TOKEN_COLOR, DEFAULT_SECOND_TOKEN_COLOR);
    }

    /**
     * Construct this object.
     * 
     * @param environment Environment. (required)
     * @param firstTokenColor First token color. (required)
     * @param secondTokenColor Second token color. (required)
     */
    @SuppressWarnings("hiding")
    public DefaultEnvironment2DUI(final Environment environment, final Color firstTokenColor,
            final Color secondTokenColor)
    {
        if (firstTokenColor == null)
        {
            throw new IllegalArgumentException("firstTokenColor is null");
        }

        if (secondTokenColor == null)
        {
            throw new IllegalArgumentException("secondTokenColor is null");
        }

        delegate = new DefaultBoardGameEnvironmentUI(environment);

        this.firstTokenColor = firstTokenColor;
        this.secondTokenColor = secondTokenColor;
    }

    @Override
    public void addHighlight(final BoardGamePosition position)
    {
        delegate.addHighlight(position);
    }

    @Override
    public void clearHighlights()
    {
        delegate.clearHighlights();
    }

    @Override
    public Environment getEnvironment()
    {
        return delegate.getEnvironment();
    }

    @Override
    public Color getFirstTokenColor()
    {
        return firstTokenColor;
    }

    @Override
    public Color getHighlightColor()
    {
        return delegate.getHighlightColor();
    }

    @Override
    public Set<BoardGamePosition> getHighlights()
    {
        return delegate.getHighlights();
    }

    @Override
    public Position<?> getPositionForPoint(final Point point)
    {
        throw new RuntimeException("method not implemented");
    }

    @Override
    public Color getSecondTokenColor()
    {
        return secondTokenColor;
    }

    @Override
    public void paintComponent(final Graphics g)
    {
        super.paintComponent(g);
    }

    @Override
    public void playClick()
    {
        delegate.playClick();
    }
}

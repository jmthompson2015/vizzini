package org.vizzini.swingui.game.boardgame;

import java.applet.Applet;
import java.applet.AudioClip;
import java.awt.Color;
import java.net.URL;
import java.util.HashSet;
import java.util.Set;

import org.vizzini.core.game.Environment;
import org.vizzini.core.game.boardgame.BoardGamePosition;

/**
 * Provides a default implementation of an environment user interface for a board game.
 */
public final class DefaultBoardGameEnvironmentUI implements BoardGameEnvironmentUI
{
    /** Environment. */
    private final Environment environment;

    /** Highlight color. */
    private final Color highlightColor;

    /** Highlights. */
    private final Set<BoardGamePosition> highlights = new HashSet<BoardGamePosition>();

    /** Placement audio clip. */
    private AudioClip placementAudioClip;

    /**
     * Construct this object.
     * 
     * @param environment Environment.
     */
    @SuppressWarnings("hiding")
    public DefaultBoardGameEnvironmentUI(final Environment environment)
    {
        this(environment, Color.BLUE);
    }

    /**
     * Construct this object.
     * 
     * @param environment Environment.
     * @param highlightColor Highlight color.
     */
    @SuppressWarnings("hiding")
    public DefaultBoardGameEnvironmentUI(final Environment environment, final Color highlightColor)
    {
        if (environment == null)
        {
            throw new IllegalArgumentException("environment is null");
        }

        if (highlightColor == null)
        {
            throw new IllegalArgumentException("highlightColor is null");
        }

        this.environment = environment;
        this.highlightColor = highlightColor;
    }

    @Override
    public void addHighlight(final BoardGamePosition position)
    {
        if (position == null)
        {
            throw new IllegalArgumentException("position is null");
        }

        highlights.add(position);
    }

    @Override
    public void clearHighlights()
    {
        highlights.clear();
    }

    @Override
    public Environment getEnvironment()
    {
        return environment;
    }

    @Override
    public Color getHighlightColor()
    {
        return highlightColor;
    }

    @Override
    public Set<BoardGamePosition> getHighlights()
    {
        return highlights;
    }

    @Override
    public void playClick()
    {
        getPlacementAudioClip().play();
    }

    /**
     * @param clipName Audio clip name.
     * 
     * @return the audio clip specified by the given key.
     */
    private AudioClip getAudioClip(final String clipName)
    {
        AudioClip answer = null;

        final URL url = getClass().getResource(clipName);

        if (url != null)
        {
            answer = Applet.newAudioClip(url);
        }
        else
        {
            System.out.println("getAudioClip() missing audio clip resource " + clipName);
        }

        return answer;
    }

    /**
     * @return the placement audio clip.
     */
    private AudioClip getPlacementAudioClip()
    {
        if (placementAudioClip == null)
        {
            placementAudioClip = getAudioClip("/game/boardgame/click.au");
        }

        return placementAudioClip;
    }
}

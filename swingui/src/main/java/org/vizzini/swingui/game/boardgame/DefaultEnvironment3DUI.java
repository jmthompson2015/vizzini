package org.vizzini.swingui.game.boardgame;

import java.awt.Color;
import java.util.Set;

import org.vizzini.core.game.Environment;
import org.vizzini.core.game.Position;
import org.vizzini.core.game.Token;
import org.vizzini.core.game.boardgame.BoardGamePosition;

import com.jme3.light.AmbientLight;
import com.jme3.light.DirectionalLight;
import com.jme3.math.ColorRGBA;
import com.jme3.math.Vector3f;

/**
 * Provides a default implementation of a 3D environment user interface.
 */
public final class DefaultEnvironment3DUI implements Environment3DUI
{
    /** Delegate. */
    private final BoardGameEnvironmentUI delegate;

    /**
     * Construct this object.
     * 
     * @param environment Environment.
     */
    public DefaultEnvironment3DUI(final Environment environment)
    {
        delegate = new DefaultBoardGameEnvironmentUI(environment);
    }

    @Override
    public void addHighlight(final BoardGamePosition position)
    {
        delegate.addHighlight(position);
    }

    @Override
    public void addTokenUIAt(final Position<?> position, final Token token)
    {
        throw new RuntimeException("method not implemented");
    }

    @Override
    public void clearHighlights()
    {
        delegate.clearHighlights();
    }

    @Override
    public AmbientLight createAmbientLight()
    {
        final AmbientLight answer = new AmbientLight();

        answer.setColor(ColorRGBA.White.mult(0.3f));

        return answer;
    }

    @Override
    public DirectionalLight createDirectionalLight()
    {
        final DirectionalLight answer = new DirectionalLight();

        answer.setColor(ColorRGBA.White);
        answer.setDirection(new Vector3f(-1, -1, -1).normalizeLocal());

        return answer;
    }

    @Override
    public Environment getEnvironment()
    {
        return delegate.getEnvironment();
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
    public MaterialFactory getMaterialFactory()
    {
        throw new RuntimeException("method not implemented");
    }

    @Override
    public SpatialFactory getSpatialFactory()
    {
        throw new RuntimeException("method not implemented");
    }

    @Override
    public void initKeys()
    {
        throw new RuntimeException("method not implemented");
    }

    @Override
    public void playClick()
    {
        delegate.playClick();
    }

    @Override
    public void reconcileTokens()
    {
        throw new RuntimeException("method not implemented");
    }

    @Override
    public void removeTokenUIAt(final Position<?> position)
    {
        throw new RuntimeException("method not implemented");
    }
}

package org.vizzini.swingui.game.boardgame;

import org.vizzini.core.game.Position;
import org.vizzini.core.game.Token;

import com.jme3.light.AmbientLight;
import com.jme3.light.DirectionalLight;

/**
 * Defines methods required by a 3D environment user interface.
 */
public interface Environment3DUI extends BoardGameEnvironmentUI
{
    /**
     * @param position Position.
     * @param token Token.
     */
    void addTokenUIAt(final Position<?> position, final Token token);

    /**
     * @return a new ambient light source.
     */
    AmbientLight createAmbientLight();

    /**
     * @return a new directional light source.
     */
    DirectionalLight createDirectionalLight();

    /**
     * @return the material factory.
     */
    MaterialFactory getMaterialFactory();

    /**
     * @return the spatial factory.
     */
    SpatialFactory getSpatialFactory();

    /**
     * Custom Keybinding: Map named actions to inputs.
     */
    void initKeys();

    /**
     * Reconcile tokens.
     */
    void reconcileTokens();

    /**
     * @param position Position.
     */
    void removeTokenUIAt(final Position<?> position);
}

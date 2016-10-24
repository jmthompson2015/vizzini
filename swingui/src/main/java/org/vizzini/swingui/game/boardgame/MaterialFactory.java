package org.vizzini.swingui.game.boardgame;

import com.jme3.asset.AssetManager;
import com.jme3.material.Material;

/**
 * Defines methods required by a material factory.
 */
public interface MaterialFactory
{
    /**
     * @return a new material.
     */
    Material createFirstSquareMaterial();

    /**
     * @return a new material.
     */
    Material createFirstTokenMaterial();

    /**
     * @return a new material.
     */
    Material createSecondSquareMaterial();

    /**
     * @return a new material.
     */
    Material createSecondTokenMaterial();

    /**
     * @return the assetManager
     */
    AssetManager getAssetManager();

    /**
     * @return the tokenShininess
     */
    float getTokenShininess();

    /**
     * @return the isTokenShiny
     */
    boolean isTokenShiny();
}

package org.vizzini.swingui.game.boardgame;

import com.jme3.asset.AssetManager;
import com.jme3.material.Material;
import com.jme3.material.RenderState.BlendMode;
import com.jme3.math.ColorRGBA;

/**
 * Provides a default implementation of a material factory.
 */
public final class DefaultMaterialFactory implements MaterialFactory
{
    /** Default first square color. */
    public static final ColorRGBA DEFAULT_FIRST_SQUARE_COLOR = new ColorRGBA(0, 0, 0, 0.5f);

    /** Default second square color. */
    public static final ColorRGBA DEFAULT_SECOND_SQUARE_COLOR = new ColorRGBA(1, 1, 1, 0.5f);

    /** Asset manager. */
    private final AssetManager assetManager;

    /** First square color. */
    private final ColorRGBA firstSquareColor;

    /** Flag indicating whether the token materials are shiny. */
    private final boolean isTokenShiny;

    /** Second square color. */
    private final ColorRGBA secondSquareColor;

    /** Token shininess value. [1, 128]. */
    private final float tokenShininess = 5;

    /**
     * Construct this object.
     * 
     * @param assetManager Asset manager. (required)
     * @param isShiny Flag indicating whether the token materials are shiny.
     * @param firstSquareColor First square color. (required)
     * @param secondSquareColor Second square color. (required)
     */
    @SuppressWarnings("hiding")
    public DefaultMaterialFactory(final AssetManager assetManager, final boolean isShiny,
            final ColorRGBA firstSquareColor, final ColorRGBA secondSquareColor)
    {
        if (assetManager == null)
        {
            throw new IllegalArgumentException("assetManager is null");
        }

        if (firstSquareColor == null)
        {
            throw new IllegalArgumentException("firstSquareColor is null");
        }

        if (secondSquareColor == null)
        {
            throw new IllegalArgumentException("secondSquareColor is null");
        }

        this.assetManager = assetManager;
        this.isTokenShiny = isShiny;
        this.firstSquareColor = firstSquareColor;
        this.secondSquareColor = secondSquareColor;
    }

    @Override
    public Material createFirstSquareMaterial()
    {
        return createSquareMaterial(firstSquareColor);
    }

    @Override
    public Material createFirstTokenMaterial()
    {
        throw new RuntimeException("method not implemented");
    }

    @Override
    public Material createSecondSquareMaterial()
    {
        return createSquareMaterial(secondSquareColor);
    }

    @Override
    public Material createSecondTokenMaterial()
    {
        throw new RuntimeException("method not implemented");
    }

    @Override
    public AssetManager getAssetManager()
    {
        return assetManager;
    }

    @Override
    public float getTokenShininess()
    {
        return tokenShininess;
    }

    @Override
    public boolean isTokenShiny()
    {
        return isTokenShiny;
    }

    /**
     * @param color Color.
     * 
     * @return a new material.
     */
    private Material createSquareMaterial(final ColorRGBA color)
    {
        final Material material = new Material(assetManager, "Common/MatDefs/Misc/Unshaded.j3md");

        material.setColor("Color", color);
        material.getAdditionalRenderState().setBlendMode(BlendMode.Alpha);

        return material;
    }
}

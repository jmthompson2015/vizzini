package org.vizzini.swingui.game.boardgame;

import com.jme3.asset.AssetManager;
import com.jme3.material.Material;
import com.jme3.math.ColorRGBA;

/**
 * Provides a material factory which uses colors.
 */
public final class ColorMaterialFactory implements MaterialFactory
{
    /** Default first token color. */
    public static final ColorRGBA DEFAULT_FIRST_TOKEN_COLOR = ColorRGBA.LightGray;

    /** Default second token color. */
    public static final ColorRGBA DEFAULT_SECOND_TOKEN_COLOR = ColorRGBA.DarkGray;

    /** Delegate. */
    private final MaterialFactory delegate;

    /** First token color. */
    private final ColorRGBA firstTokenColor;

    /** Second token color. */
    private final ColorRGBA secondTokenColor;

    /**
     * Construct this object.
     * 
     * @param assetManager Asset manager.
     */
    public ColorMaterialFactory(final AssetManager assetManager)
    {
        this(assetManager, false);
    }

    /**
     * Construct this object.
     * 
     * @param assetManager Asset manager.
     * @param isShiny Flag indicating whether the token materials are shiny.
     */
    public ColorMaterialFactory(final AssetManager assetManager, final boolean isShiny)
    {
        this(assetManager, isShiny, DefaultMaterialFactory.DEFAULT_FIRST_SQUARE_COLOR);
    }

    /**
     * Construct this object.
     * 
     * @param assetManager Asset manager.
     * @param isShiny Flag indicating whether the token materials are shiny.
     * @param firstSquareColor First square color.
     */
    public ColorMaterialFactory(final AssetManager assetManager, final boolean isShiny, final ColorRGBA firstSquareColor)
    {
        this(assetManager, isShiny, firstSquareColor, DefaultMaterialFactory.DEFAULT_SECOND_SQUARE_COLOR,
                DEFAULT_FIRST_TOKEN_COLOR, DEFAULT_SECOND_TOKEN_COLOR);
    }

    /**
     * Construct this object.
     * 
     * @param assetManager Asset manager. (required)
     * @param isShiny Flag indicating whether the token materials are shiny.
     * @param firstSquareColor First square color. (required)
     * @param secondSquareColor Second square color. (required)
     * @param firstTokenColor First token color. (required)
     * @param secondTokenColor Second token color. (required)
     */
    @SuppressWarnings("hiding")
    public ColorMaterialFactory(final AssetManager assetManager, final boolean isShiny,
            final ColorRGBA firstSquareColor, final ColorRGBA secondSquareColor, final ColorRGBA firstTokenColor,
            final ColorRGBA secondTokenColor)
    {
        if (firstTokenColor == null)
        {
            throw new IllegalArgumentException("firstTokenColor is null");
        }

        if (secondTokenColor == null)
        {
            throw new IllegalArgumentException("secondTokenColor is null");
        }

        this.delegate = new DefaultMaterialFactory(assetManager, isShiny, firstSquareColor, secondSquareColor);

        this.firstTokenColor = firstTokenColor;
        this.secondTokenColor = secondTokenColor;
    }

    @Override
    public Material createFirstSquareMaterial()
    {
        return delegate.createFirstSquareMaterial();
    }

    @Override
    public Material createFirstTokenMaterial()
    {
        return createTokenMaterial(firstTokenColor);
    }

    @Override
    public Material createSecondSquareMaterial()
    {
        return delegate.createSecondSquareMaterial();
    }

    @Override
    public Material createSecondTokenMaterial()
    {
        return createTokenMaterial(secondTokenColor);
    }

    @Override
    public AssetManager getAssetManager()
    {
        return delegate.getAssetManager();
    }

    @Override
    public float getTokenShininess()
    {
        return delegate.getTokenShininess();
    }

    @Override
    public boolean isTokenShiny()
    {
        return delegate.isTokenShiny();
    }

    /**
     * @param color Color.
     * 
     * @return a new material.
     */
    private Material createTokenMaterial(final ColorRGBA color)
    {
        final Material material = new Material(getAssetManager(), "Common/MatDefs/Light/Lighting.j3md");

        material.setBoolean("UseMaterialColors", true);
        material.setColor("Ambient", color);
        material.setColor("Diffuse", color);

        if (isTokenShiny())
        {
            material.setFloat("Shininess", getTokenShininess());
            material.setColor("Specular", ColorRGBA.White);
        }

        return material;
    }
}

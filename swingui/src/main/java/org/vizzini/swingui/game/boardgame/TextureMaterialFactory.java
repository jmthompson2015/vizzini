package org.vizzini.swingui.game.boardgame;

import org.apache.commons.lang3.StringUtils;

import com.jme3.asset.AssetManager;
import com.jme3.material.Material;
import com.jme3.math.ColorRGBA;

/**
 * Provides a material factory which uses textures.
 */
public final class TextureMaterialFactory implements MaterialFactory
{
    /** Default first token texture filename. */
    public static final String DEFAULT_FIRST_TOKEN_TEXTURE_FILENAME = "game/boardgame/chess/wood/Seamless_Fine_Wood_Texture.jpg";

    /** Default second token texture filename. */
    public static final String DEFAULT_SECOND_TOKEN_TEXTURE_FILENAME = "game/boardgame/chess/wood/Wood-cherry10.jpg";

    /** Delegate. */
    private final MaterialFactory delegate;

    /** White token texture filename. */
    private final String firstTokenTextureFilename;

    /** Black token texture filename. */
    private final String secondTokenTextureFilename;

    /**
     * Construct this object.
     * 
     * @param assetManager Asset manager.
     */
    public TextureMaterialFactory(final AssetManager assetManager)
    {
        this(assetManager, false);
    }

    /**
     * Construct this object.
     * 
     * @param assetManager Asset manager.
     * @param isShiny Flag indicating whether the token materials are shiny.
     */
    public TextureMaterialFactory(final AssetManager assetManager, final boolean isShiny)
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
    public TextureMaterialFactory(final AssetManager assetManager, final boolean isShiny,
            final ColorRGBA firstSquareColor)
    {
        this(assetManager, isShiny, firstSquareColor, DefaultMaterialFactory.DEFAULT_SECOND_SQUARE_COLOR,
                DEFAULT_FIRST_TOKEN_TEXTURE_FILENAME, DEFAULT_SECOND_TOKEN_TEXTURE_FILENAME);
    }

    /**
     * Construct this object.
     * 
     * @param assetManager Asset manager. (required)
     * @param isShiny Flag indicating whether the token materials are shiny.
     * @param firstSquareColor First square color. (required)
     * @param secondSquareColor Second square color. (required)
     * @param firstTokenTextureFilename First token texture filename. (required)
     * @param secondTokenTextureFilename Second token texture filename. (required)
     */
    @SuppressWarnings("hiding")
    public TextureMaterialFactory(final AssetManager assetManager, final boolean isShiny,
            final ColorRGBA firstSquareColor, final ColorRGBA secondSquareColor,
            final String firstTokenTextureFilename, final String secondTokenTextureFilename)
    {
        if (StringUtils.isEmpty(firstTokenTextureFilename))
        {
            throw new IllegalArgumentException("whiteTokenTextureFilename is null or empty");
        }

        if (StringUtils.isEmpty(secondTokenTextureFilename))
        {
            throw new IllegalArgumentException("blackTokenTextureFilename is null or empty");
        }

        this.delegate = new DefaultMaterialFactory(assetManager, isShiny, firstSquareColor, secondSquareColor);

        this.firstTokenTextureFilename = firstTokenTextureFilename;
        this.secondTokenTextureFilename = secondTokenTextureFilename;
    }

    @Override
    public Material createFirstSquareMaterial()
    {
        return delegate.createFirstSquareMaterial();
    }

    @Override
    public Material createFirstTokenMaterial()
    {
        return createTokenMaterial(firstTokenTextureFilename);
    }

    @Override
    public Material createSecondSquareMaterial()
    {
        return delegate.createSecondSquareMaterial();
    }

    @Override
    public Material createSecondTokenMaterial()
    {
        return createTokenMaterial(secondTokenTextureFilename);
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
     * @param textureFilename Texture filename.
     * 
     * @return a new material.
     */
    private Material createTokenMaterial(final String textureFilename)
    {
        final Material material = new Material(getAssetManager(), "Common/MatDefs/Light/Lighting.j3md");

        material.setTexture("DiffuseMap", getAssetManager().loadTexture(textureFilename));

        if (isTokenShiny())
        {
            material.setFloat("Shininess", getTokenShininess());
            material.setBoolean("UseMaterialColors", true);
            material.setColor("Specular", ColorRGBA.White);
            material.setColor("Diffuse", ColorRGBA.White);
        }

        return material;
    }
}

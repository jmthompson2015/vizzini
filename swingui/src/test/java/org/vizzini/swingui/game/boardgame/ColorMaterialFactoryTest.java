package org.vizzini.swingui.game.boardgame;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.fail;

import org.junit.Test;

import com.jme3.asset.AssetManager;
import com.jme3.material.Material;
import com.jme3.system.JmeSystem;

/**
 * Provides tests for the <code>ColorMaterialFactory</code> class.
 */
public final class ColorMaterialFactoryTest
{
    /**
     * Test the <code>createFirstSquareMaterial()</code> method.
     */
    @Test
    public void createFirstSquareMaterial()
    {
        // Setup.
        final AssetManager assetManager = createAssetManager();
        final MaterialFactory factory = new ColorMaterialFactory(assetManager);

        // Run.
        final Material result = factory.createFirstSquareMaterial();

        // Verify.
        assertNotNull(result);
    }

    /**
     * Test the <code>createFirstTokenMaterial()</code> method.
     */
    @Test
    public void createFirstTokenMaterial()
    {
        // Setup.
        final AssetManager assetManager = createAssetManager();
        final MaterialFactory factory = new ColorMaterialFactory(assetManager);

        // Run.
        final Material result = factory.createFirstTokenMaterial();

        // Verify.
        assertNotNull(result);
    }

    /**
     * Test the <code>createSecondSquareMaterial()</code> method.
     */
    @Test
    public void createSecondSquareMaterial()
    {
        // Setup.
        final AssetManager assetManager = createAssetManager();
        final MaterialFactory factory = new ColorMaterialFactory(assetManager);

        // Run.
        final Material result = factory.createSecondSquareMaterial();

        // Verify.
        assertNotNull(result);
    }

    /**
     * Test the <code>createSecondTokenMaterial()</code> method.
     */
    @Test
    public void createSecondTokenMaterial()
    {
        // Setup.
        final AssetManager assetManager = createAssetManager();
        final MaterialFactory factory = new ColorMaterialFactory(assetManager);

        // Run.
        final Material result = factory.createSecondTokenMaterial();

        // Verify.
        assertNotNull(result);
    }

    /**
     * Test the <code>ColorMaterialFactory()</code> method.
     */
    @Test
    public void testConstructorNull()
    {
        try
        {
            new ColorMaterialFactory(null);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("assetManager is null"));
        }
    }

    /**
     * @return a new asset manager.
     */
    private AssetManager createAssetManager()
    {
        return JmeSystem.newAssetManager(Thread.currentThread().getContextClassLoader()
                .getResource("com/jme3/asset/Desktop.cfg"));
    }
}

package org.vizzini.swingui.game.cardgame;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;

import java.awt.Image;
import java.io.File;

import org.junit.Test;
import org.vizzini.core.game.cardgame.TarotCard;

/**
 * Provides tests for the <code>TarotCardImageMap</code> class.
 */
public final class TarotCardImageMapTest
{
    /**
     * Test the <code>getFile()</code> method.
     */
    @Test
    public void getFileAll()
    {
        // Setup.
        final TarotCardImageMap map = new TarotCardImageMap();

        for (final TarotCard card : TarotCard.values())
        {
            // Run.
            final File result = map.getFile(card);

            // Verify.
            assertNotNull(result);
            assertTrue(result.getPath().startsWith("/game/cardgame/tarot/rw"));
            assertTrue(result.getPath().endsWith(".jpg"));
        }
    }

    /**
     * Test the <code>getFile()</code> method.
     */
    @Test
    public void getFileC2()
    {
        // Setup.
        final TarotCardImageMap map = new TarotCardImageMap();

        // Run.
        final File result = map.getFile(TarotCard.C2);

        // Verify.
        assertNotNull(result);
        assertTrue(result.getPath().startsWith("/game/cardgame/tarot/rw"));
        assertThat(result.getName(), is("rw02cups.jpg"));
    }

    /**
     * Test the <code>getFile()</code> method.
     */
    @Test
    public void getFileFool()
    {
        // Setup.
        final TarotCardImageMap map = new TarotCardImageMap();

        // Run.
        final File result = map.getFile(TarotCard.FOOL);

        // Verify.
        assertNotNull(result);
        assertTrue(result.getPath().startsWith("/game/cardgame/tarot/rw"));
        assertThat(result.getName(), is("rwfool.jpg"));
    }

    /**
     * Test the <code>getFile()</code> method.
     */
    @Test
    public void getFileW1()
    {
        // Setup.
        final TarotCardImageMap map = new TarotCardImageMap();

        // Run.
        final File result = map.getFile(TarotCard.W1);

        // Verify.
        assertNotNull(result);
        assertTrue(result.getPath().startsWith("/game/cardgame/tarot/rw"));
        assertThat(result.getName(), is("rwacewands.jpg"));
    }

    /**
     * Test the <code>getImage()</code> method.
     */
    @Test
    public void getImageAll()
    {
        // Setup.
        final TarotCardImageMap map = new TarotCardImageMap();

        for (final TarotCard card : TarotCard.values())
        {
            // Run.
            final Image result = map.getImage(card);

            // Verify.
            assertNotNull(result);
            final int width = result.getWidth(null);
            final int height = result.getHeight(null);

            assertTrue("file = " + map.getFile(card), width > 0);
            assertTrue(height > 0);

            assertTrue("width = " + width, width <= 150);
            assertTrue("height = " + height, height <= 266);
        }
    }

    /**
     * Test the <code>getImage()</code> method.
     */
    @Test
    public void getImageC2()
    {
        // Setup.
        final TarotCardImageMap map = new TarotCardImageMap();

        // Run.
        final Image result = map.getImage(TarotCard.C2);

        // Verify.
        assertNotNull(result);
        assertThat(result.getWidth(null), is(150));
        assertThat(result.getHeight(null), is(263));
    }

    /**
     * Test the <code>getImage()</code> method.
     */
    @Test
    public void getImageFool()
    {
        // Setup.
        final TarotCardImageMap map = new TarotCardImageMap();

        // Run.
        final Image result = map.getImage(TarotCard.FOOL);

        // Verify.
        assertNotNull(result);
        assertThat(result.getWidth(null), is(150));
        assertThat(result.getHeight(null), is(260));
    }

    /**
     * Test the <code>getImage()</code> method.
     */
    @Test
    public void getImageW1()
    {
        // Setup.
        final TarotCardImageMap map = new TarotCardImageMap();

        // Run.
        final Image result = map.getImage(TarotCard.W1);

        // Verify.
        assertNotNull(result);
        assertThat(result.getWidth(null), is(150));
        assertThat(result.getHeight(null), is(255));
    }
}

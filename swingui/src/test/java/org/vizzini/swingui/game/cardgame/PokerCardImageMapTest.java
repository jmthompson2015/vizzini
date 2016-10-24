package org.vizzini.swingui.game.cardgame;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;

import java.awt.Image;
import java.io.File;

import org.junit.Test;
import org.vizzini.core.game.cardgame.PokerCard;

/**
 * Provides tests for the <code>PokerCardImageMap</code> class.
 */
public final class PokerCardImageMapTest
{
    /**
     * Test the <code>getFile()</code> method.
     */
    @Test
    public void getFileAll()
    {
        // Setup.
        final PokerCardImageMap map = new PokerCardImageMap();

        for (final PokerCard card : PokerCard.values())
        {
            // Run.
            final File result = map.getFile(card);

            // Verify.
            assertNotNull(result);
            assertTrue(result.getPath().startsWith("/game/cardgame/poker/"));
            assertTrue(result.getPath().endsWith(".png"));
        }
    }

    /**
     * Test the <code>getFile()</code> method.
     */
    @Test
    public void getFileC1()
    {
        // Setup.
        final PokerCardImageMap map = new PokerCardImageMap();

        // Run.
        final File result = map.getFile(PokerCard.C1);

        // Verify.
        assertNotNull(result);
        assertTrue(result.getPath().startsWith("/game/cardgame/poker/"));
        assertThat(result.getName(), is("1.png"));
    }

    /**
     * Test the <code>getFile()</code> method.
     */
    @Test
    public void getFileD1()
    {
        // Setup.
        final PokerCardImageMap map = new PokerCardImageMap();

        // Run.
        final File result = map.getFile(PokerCard.D1);

        // Verify.
        assertNotNull(result);
        assertThat(result.getPath(), is("/game/cardgame/poker/4.png"));
    }

    /**
     * Test the <code>getFile()</code> method.
     */
    @Test
    public void getFileH2()
    {
        // Setup.
        final PokerCardImageMap map = new PokerCardImageMap();

        // Run.
        final File result = map.getFile(PokerCard.H2);

        // Verify.
        assertNotNull(result);
        assertTrue(result.getPath().startsWith("/game/cardgame/poker/"));
        assertThat(result.getName(), is("51.png"));
    }

    /**
     * Test the <code>getImage()</code> method.
     */
    @Test
    public void getImageAll()
    {
        // Setup.
        final PokerCardImageMap map = new PokerCardImageMap();

        for (final PokerCard card : PokerCard.values())
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
    public void getImageH2()
    {
        // Setup.
        final PokerCardImageMap map = new PokerCardImageMap();

        // Run.
        final Image result = map.getImage(PokerCard.H2);

        // Verify.
        assertNotNull(result);
        assertThat(result.getWidth(null), is(72));
        assertThat(result.getHeight(null), is(96));
    }

    /**
     * Test the <code>getImage()</code> method.
     */
    @Test
    public void getImageW1()
    {
        // Setup.
        final PokerCardImageMap map = new PokerCardImageMap();

        // Run.
        final Image result = map.getImage(PokerCard.C1);

        // Verify.
        assertNotNull(result);
        assertThat(result.getWidth(null), is(72));
        assertThat(result.getHeight(null), is(96));
    }
}

package org.vizzini.imageeditor;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.fail;

import java.awt.Color;

import org.junit.Test;

/**
 * Provides tests for the <code>ColorRangeImageFilter</code> class.
 */
public final class ColorRangeImageFilterTest
{
    /**
     * Test the <code>ColorRangeImageFilter()</code> method.
     */
    @Test
    public void testConstructorNull()
    {
        // Setup.
        final Color color1 = Color.BLACK;
        final Color color2 = Color.GRAY;
        final Color color3 = Color.WHITE;

        // Run / Verify.
        try
        {
            new ColorRangeImageFilter(null, color2, color3);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("color1 is null"));
        }

        try
        {
            new ColorRangeImageFilter(color1, null, color3);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("color2 is null"));
        }

        final ColorRangeImageFilter filter = new ColorRangeImageFilter(color1, color2, null);
        assertNotNull(filter);
    }
}

package org.vizzini.illyriad.map;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;

import org.junit.Test;

/**
 * Provides tests for the <code>TerrainSpecific</code> class.
 */
public final class TerrainSpecificTest
{
    /**
     * Test the <code>getDisplayName()</code> method.
     */
    @Test
    public void getDisplayName()
    {
        assertThat(TerrainSpecific.PLAINS.getDisplayName(), is("Plains"));
        assertThat(TerrainSpecific.SHARP_CRAGS.getDisplayName(), is("Sharp Crags"));
    }

    /**
     * Test the <code>valueOfId()</code> method.
     */
    @Test
    public void valueOfId()
    {
        assertThat(TerrainSpecific.valueOfId(2), is(TerrainSpecific.PLAINS));
        assertThat(TerrainSpecific.valueOfId(27), is(TerrainSpecific.SHARP_CRAGS));
    }
}

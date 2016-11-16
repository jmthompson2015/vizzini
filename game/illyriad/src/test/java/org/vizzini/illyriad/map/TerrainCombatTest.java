package org.vizzini.illyriad.map;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;

import org.junit.Test;

/**
 * Provides tests for the <code>TerrainCombat</code> class.
 */
public final class TerrainCombatTest
{
    /**
     * Test the <code>getDisplayName()</code> method.
     */
    @Test
    public void getDisplayName()
    {
        assertThat(TerrainCombat.PLAINS.getDisplayName(), is("Plains"));
        assertThat(TerrainCombat.LARGE_MOUNTAIN.getDisplayName(), is("Large Mountain"));
    }

    /**
     * Test the <code>getId()</code> method.
     */
    @Test
    public void getId()
    {
        assertThat(TerrainCombat.PLAINS.getId(), is(7));
        assertThat(TerrainCombat.LARGE_MOUNTAIN.getId(), is(1));
    }

    /**
     * Test the <code>valueOfDisplayName()</code> method.
     */
    @Test
    public void valueOfDisplayName()
    {
        assertThat(TerrainCombat.valueOfDisplayName("Plains"), is(TerrainCombat.PLAINS));
        assertThat(TerrainCombat.valueOfDisplayName("Large Mountain"), is(TerrainCombat.LARGE_MOUNTAIN));
    }

    /**
     * Test the <code>valueOfId()</code> method.
     */
    @Test
    public void valueOfId()
    {
        assertThat(TerrainCombat.valueOfId(7), is(TerrainCombat.PLAINS));
        assertThat(TerrainCombat.valueOfId(1), is(TerrainCombat.LARGE_MOUNTAIN));
    }
}

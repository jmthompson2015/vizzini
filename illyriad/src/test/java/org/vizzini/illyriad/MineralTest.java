package org.vizzini.illyriad;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.junit.Test;

/**
 * Provides tests for the <code>Mineral</code> class.
 */
public final class MineralTest
{
    /**
     * Test the <code>toString()</code> method.
     */
    @Test
    public void testToString()
    {
        assertThat(Mineral.AEGHRIS.toString(), is("Aeghris"));
    }

    /**
     * Test the <code>values()</code> method.
     */
    @Test
    public void values()
    {
        assertThat(Mineral.values().length, is(21));
    }

    /**
     * Write a list of minerals.
     */
    @Test
    public void writeMinerals()
    {
        final List<String> list = new ArrayList<String>();

        for (final Mineral mineral : Mineral.values())
        {
            list.add(mineral.getDisplayName());
        }

        Collections.sort(list);

        for (final String mineral : list)
        {
            System.out.println(mineral);
        }
    }
}

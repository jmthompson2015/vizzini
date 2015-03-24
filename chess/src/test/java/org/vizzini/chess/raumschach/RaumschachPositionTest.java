package org.vizzini.chess.raumschach;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertThat;

import org.junit.Test;

/**
 * Provides tests for the <code>RaumschachPosition</code> class.
 */
public final class RaumschachPositionTest
{
    /**
     * Test the <code>findByCoordinates()</code> method.
     */
    @Test
    public void findByCoordinates()
    {
        assertThat(RaumschachPosition.findByCoordinates(0, 0, 0), is(RaumschachPosition.a1A));
        assertThat(RaumschachPosition.findByCoordinates(1, 0, 0), is(RaumschachPosition.b1A));
        assertThat(RaumschachPosition.findByCoordinates(2, 0, 0), is(RaumschachPosition.c1A));
        assertThat(RaumschachPosition.findByCoordinates(0, 1, 0), is(RaumschachPosition.a2A));
        assertThat(RaumschachPosition.findByCoordinates(2, 1, 0), is(RaumschachPosition.c2A));
        assertThat(RaumschachPosition.findByCoordinates(0, 2, 0), is(RaumschachPosition.a3A));
        assertThat(RaumschachPosition.findByCoordinates(1, 2, 0), is(RaumschachPosition.b3A));
        assertThat(RaumschachPosition.findByCoordinates(2, 2, 0), is(RaumschachPosition.c3A));
        assertThat(RaumschachPosition.findByCoordinates(3, 3, 0), is(RaumschachPosition.d4A));
        assertThat(RaumschachPosition.findByCoordinates(0, 0, 3), is(RaumschachPosition.a1D));
        assertThat(RaumschachPosition.findByCoordinates(3, 0, 3), is(RaumschachPosition.d1D));
        assertThat(RaumschachPosition.findByCoordinates(0, 3, 3), is(RaumschachPosition.a4D));
        assertThat(RaumschachPosition.findByCoordinates(3, 3, 3), is(RaumschachPosition.d4D));

        assertNull(RaumschachPosition.findByCoordinates(-1, 0, 0));
        assertNull(RaumschachPosition.findByCoordinates(5, 0, 0));

        assertNull(RaumschachPosition.findByCoordinates(0, -1, 0));
        assertNull(RaumschachPosition.findByCoordinates(0, 5, 0));

        assertNull(RaumschachPosition.findByCoordinates(0, 0, -1));
        assertNull(RaumschachPosition.findByCoordinates(0, 0, 5));
    }

    /**
     * Test the <code>findByIndex()</code> method.
     */
    @Test
    public void findByIndex()
    {
        assertThat(RaumschachPosition.findByIndex(0), is(RaumschachPosition.a1A));
        assertThat(RaumschachPosition.findByIndex(1), is(RaumschachPosition.b1A));
        assertThat(RaumschachPosition.findByIndex(8), is(RaumschachPosition.d2A));
        assertThat(RaumschachPosition.findByIndex(63), is(RaumschachPosition.d3C));
        assertThat(RaumschachPosition.findByIndex(124), is(RaumschachPosition.e5E));

        assertNull(RaumschachPosition.findByIndex(-1));
        assertNull(RaumschachPosition.findByIndex(125));
    }

    /**
     * Test the <code>getIndex()</code> method.
     */
    @Test
    public void getIndex()
    {
        assertThat(RaumschachPosition.a1A.getIndex(), is(0));
        assertThat(RaumschachPosition.b1A.getIndex(), is(1));
        assertThat(RaumschachPosition.c1A.getIndex(), is(2));
        assertThat(RaumschachPosition.d1A.getIndex(), is(3));
        assertThat(RaumschachPosition.a2A.getIndex(), is(5));
        assertThat(RaumschachPosition.c2A.getIndex(), is(7));
        assertThat(RaumschachPosition.a3A.getIndex(), is(10));
        assertThat(RaumschachPosition.b3A.getIndex(), is(11));
        assertThat(RaumschachPosition.c3A.getIndex(), is(12));
        assertThat(RaumschachPosition.d4A.getIndex(), is(18));
        assertThat(RaumschachPosition.a1B.getIndex(), is(25));
        assertThat(RaumschachPosition.a1C.getIndex(), is(50));
        assertThat(RaumschachPosition.a1D.getIndex(), is(75));
        assertThat(RaumschachPosition.a4D.getIndex(), is(90));
        assertThat(RaumschachPosition.b4D.getIndex(), is(91));
        assertThat(RaumschachPosition.c4D.getIndex(), is(92));
        assertThat(RaumschachPosition.a1E.getIndex(), is(100));
        assertThat(RaumschachPosition.e5E.getIndex(), is(124));
    }

    /**
     * Test the <code>getX()</code> method.
     */
    @Test
    public void getX()
    {
        assertThat(RaumschachPosition.a1A.getX(), is(0));
        assertThat(RaumschachPosition.a2A.getX(), is(0));
        assertThat(RaumschachPosition.a3A.getX(), is(0));
        assertThat(RaumschachPosition.b1A.getX(), is(1));
        assertThat(RaumschachPosition.b3A.getX(), is(1));
        assertThat(RaumschachPosition.c1A.getX(), is(2));
        assertThat(RaumschachPosition.c2A.getX(), is(2));
        assertThat(RaumschachPosition.c3A.getX(), is(2));
        assertThat(RaumschachPosition.d4A.getX(), is(3));
        assertThat(RaumschachPosition.a1B.getX(), is(0));
        assertThat(RaumschachPosition.a1C.getX(), is(0));
        assertThat(RaumschachPosition.a1D.getX(), is(0));
        assertThat(RaumschachPosition.a4D.getX(), is(0));
        assertThat(RaumschachPosition.b4D.getX(), is(1));
        assertThat(RaumschachPosition.c4D.getX(), is(2));
        assertThat(RaumschachPosition.d4D.getX(), is(3));
        assertThat(RaumschachPosition.e5E.getX(), is(4));
    }

    /**
     * Test the <code>getY()</code> method.
     */
    @Test
    public void getY()
    {
        assertThat(RaumschachPosition.a1A.getY(), is(0));
        assertThat(RaumschachPosition.a2A.getY(), is(1));
        assertThat(RaumschachPosition.a3A.getY(), is(2));
        assertThat(RaumschachPosition.b1A.getY(), is(0));
        assertThat(RaumschachPosition.b3A.getY(), is(2));
        assertThat(RaumschachPosition.c1A.getY(), is(0));
        assertThat(RaumschachPosition.c2A.getY(), is(1));
        assertThat(RaumschachPosition.c3A.getY(), is(2));
        assertThat(RaumschachPosition.d4A.getY(), is(3));
        assertThat(RaumschachPosition.a1B.getY(), is(0));
        assertThat(RaumschachPosition.a1C.getY(), is(0));
        assertThat(RaumschachPosition.a1D.getY(), is(0));
        assertThat(RaumschachPosition.a4D.getY(), is(3));
        assertThat(RaumschachPosition.b4D.getY(), is(3));
        assertThat(RaumschachPosition.c4D.getY(), is(3));
        assertThat(RaumschachPosition.d4D.getY(), is(3));
        assertThat(RaumschachPosition.e5E.getY(), is(4));
    }

    /**
     * Test the <code>getZ()</code> method.
     */
    @Test
    public void getZ()
    {
        assertThat(RaumschachPosition.a1A.getZ(), is(0));
        assertThat(RaumschachPosition.a2A.getZ(), is(0));
        assertThat(RaumschachPosition.a3A.getZ(), is(0));
        assertThat(RaumschachPosition.b1A.getZ(), is(0));
        assertThat(RaumschachPosition.b3A.getZ(), is(0));
        assertThat(RaumschachPosition.c1A.getZ(), is(0));
        assertThat(RaumschachPosition.c2A.getZ(), is(0));
        assertThat(RaumschachPosition.c3A.getZ(), is(0));
        assertThat(RaumschachPosition.d4A.getZ(), is(0));
        assertThat(RaumschachPosition.a1B.getZ(), is(1));
        assertThat(RaumschachPosition.a1C.getZ(), is(2));
        assertThat(RaumschachPosition.a1D.getZ(), is(3));
        assertThat(RaumschachPosition.a4D.getZ(), is(3));
        assertThat(RaumschachPosition.b4D.getZ(), is(3));
        assertThat(RaumschachPosition.c4D.getZ(), is(3));
        assertThat(RaumschachPosition.d4D.getZ(), is(3));
        assertThat(RaumschachPosition.e5E.getZ(), is(4));
    }

    /**
     * Test the <code>values()</code> method.
     */
    @Test
    public void values()
    {
        final RaumschachPosition[] values = RaumschachPosition.values();

        assertNotNull(values);
        assertThat(values.length, is(125));

        for (int i = 0; i < 125; i++)
        {
            assertThat(values[i].getIndex(), is(i));
        }
    }
}

package org.vizzini.chess.artemis;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertThat;

import org.junit.Test;

/**
 * Provides tests for the <code>ArtemisPosition</code> class.
 */
public final class ArtemisPositionTest
{
    /**
     * Test the <code>findByCoordinates()</code> method.
     */
    @Test
    public void findByCoordinates()
    {
        assertThat(ArtemisPosition.findByCoordinates(0, 0, 0), is(ArtemisPosition.a1A));
        assertThat(ArtemisPosition.findByCoordinates(1, 0, 0), is(ArtemisPosition.b1A));
        assertThat(ArtemisPosition.findByCoordinates(2, 0, 0), is(ArtemisPosition.c1A));
        assertThat(ArtemisPosition.findByCoordinates(0, 1, 0), is(ArtemisPosition.a2A));
        assertThat(ArtemisPosition.findByCoordinates(2, 1, 0), is(ArtemisPosition.c2A));
        assertThat(ArtemisPosition.findByCoordinates(0, 2, 0), is(ArtemisPosition.a3A));
        assertThat(ArtemisPosition.findByCoordinates(1, 2, 0), is(ArtemisPosition.b3A));
        assertThat(ArtemisPosition.findByCoordinates(2, 2, 0), is(ArtemisPosition.c3A));
        assertThat(ArtemisPosition.findByCoordinates(3, 3, 0), is(ArtemisPosition.d4A));
        assertThat(ArtemisPosition.findByCoordinates(0, 0, 3), is(ArtemisPosition.a1D));
        assertThat(ArtemisPosition.findByCoordinates(3, 0, 3), is(ArtemisPosition.d1D));
        assertThat(ArtemisPosition.findByCoordinates(0, 3, 3), is(ArtemisPosition.a4D));
        assertThat(ArtemisPosition.findByCoordinates(3, 3, 3), is(ArtemisPosition.d4D));

        assertNull(ArtemisPosition.findByCoordinates(-1, 0, 0));
        assertNull(ArtemisPosition.findByCoordinates(4, 0, 0));

        assertNull(ArtemisPosition.findByCoordinates(0, -1, 0));
        assertNull(ArtemisPosition.findByCoordinates(0, 4, 0));

        assertNull(ArtemisPosition.findByCoordinates(0, 0, -1));
        assertNull(ArtemisPosition.findByCoordinates(0, 0, 4));
    }

    /**
     * Test the <code>findByIndex()</code> method.
     */
    @Test
    public void findByIndex()
    {
        assertThat(ArtemisPosition.findByIndex(0), is(ArtemisPosition.a1A));
        assertThat(ArtemisPosition.findByIndex(1), is(ArtemisPosition.b1A));
        assertThat(ArtemisPosition.findByIndex(8), is(ArtemisPosition.a3A));
        assertThat(ArtemisPosition.findByIndex(63), is(ArtemisPosition.d4D));

        assertNull(ArtemisPosition.findByIndex(-1));
        assertNull(ArtemisPosition.findByIndex(64));
    }

    /**
     * Test the <code>getIndex()</code> method.
     */
    @Test
    public void getIndex()
    {
        assertThat(ArtemisPosition.a1A.getIndex(), is(0));
        assertThat(ArtemisPosition.b1A.getIndex(), is(1));
        assertThat(ArtemisPosition.c1A.getIndex(), is(2));
        assertThat(ArtemisPosition.d1A.getIndex(), is(3));
        assertThat(ArtemisPosition.a2A.getIndex(), is(4));
        assertThat(ArtemisPosition.c2A.getIndex(), is(6));
        assertThat(ArtemisPosition.a3A.getIndex(), is(8));
        assertThat(ArtemisPosition.b3A.getIndex(), is(9));
        assertThat(ArtemisPosition.c3A.getIndex(), is(10));
        assertThat(ArtemisPosition.d4A.getIndex(), is(15));
        assertThat(ArtemisPosition.a1B.getIndex(), is(16));
        assertThat(ArtemisPosition.a1C.getIndex(), is(32));
        assertThat(ArtemisPosition.a1D.getIndex(), is(48));
        assertThat(ArtemisPosition.a4D.getIndex(), is(60));
        assertThat(ArtemisPosition.b4D.getIndex(), is(61));
        assertThat(ArtemisPosition.c4D.getIndex(), is(62));
        assertThat(ArtemisPosition.d4D.getIndex(), is(63));
    }

    /**
     * Test the <code>getX()</code> method.
     */
    @Test
    public void getX()
    {
        assertThat(ArtemisPosition.a1A.getX(), is(0));
        assertThat(ArtemisPosition.a2A.getX(), is(0));
        assertThat(ArtemisPosition.a3A.getX(), is(0));
        assertThat(ArtemisPosition.b1A.getX(), is(1));
        assertThat(ArtemisPosition.b3A.getX(), is(1));
        assertThat(ArtemisPosition.c1A.getX(), is(2));
        assertThat(ArtemisPosition.c2A.getX(), is(2));
        assertThat(ArtemisPosition.c3A.getX(), is(2));
        assertThat(ArtemisPosition.d4A.getX(), is(3));
        assertThat(ArtemisPosition.a1B.getX(), is(0));
        assertThat(ArtemisPosition.a1C.getX(), is(0));
        assertThat(ArtemisPosition.a1D.getX(), is(0));
        assertThat(ArtemisPosition.a4D.getX(), is(0));
        assertThat(ArtemisPosition.b4D.getX(), is(1));
        assertThat(ArtemisPosition.c4D.getX(), is(2));
        assertThat(ArtemisPosition.d4D.getX(), is(3));
    }

    /**
     * Test the <code>getY()</code> method.
     */
    @Test
    public void getY()
    {
        assertThat(ArtemisPosition.a1A.getY(), is(0));
        assertThat(ArtemisPosition.a2A.getY(), is(1));
        assertThat(ArtemisPosition.a3A.getY(), is(2));
        assertThat(ArtemisPosition.b1A.getY(), is(0));
        assertThat(ArtemisPosition.b3A.getY(), is(2));
        assertThat(ArtemisPosition.c1A.getY(), is(0));
        assertThat(ArtemisPosition.c2A.getY(), is(1));
        assertThat(ArtemisPosition.c3A.getY(), is(2));
        assertThat(ArtemisPosition.d4A.getY(), is(3));
        assertThat(ArtemisPosition.a1B.getY(), is(0));
        assertThat(ArtemisPosition.a1C.getY(), is(0));
        assertThat(ArtemisPosition.a1D.getY(), is(0));
        assertThat(ArtemisPosition.a4D.getY(), is(3));
        assertThat(ArtemisPosition.b4D.getY(), is(3));
        assertThat(ArtemisPosition.c4D.getY(), is(3));
        assertThat(ArtemisPosition.d4D.getY(), is(3));
    }

    /**
     * Test the <code>getZ()</code> method.
     */
    @Test
    public void getZ()
    {
        assertThat(ArtemisPosition.a1A.getZ(), is(0));
        assertThat(ArtemisPosition.a2A.getZ(), is(0));
        assertThat(ArtemisPosition.a3A.getZ(), is(0));
        assertThat(ArtemisPosition.b1A.getZ(), is(0));
        assertThat(ArtemisPosition.b3A.getZ(), is(0));
        assertThat(ArtemisPosition.c1A.getZ(), is(0));
        assertThat(ArtemisPosition.c2A.getZ(), is(0));
        assertThat(ArtemisPosition.c3A.getZ(), is(0));
        assertThat(ArtemisPosition.d4A.getZ(), is(0));
        assertThat(ArtemisPosition.a1B.getZ(), is(1));
        assertThat(ArtemisPosition.a1C.getZ(), is(2));
        assertThat(ArtemisPosition.a1D.getZ(), is(3));
        assertThat(ArtemisPosition.a4D.getZ(), is(3));
        assertThat(ArtemisPosition.b4D.getZ(), is(3));
        assertThat(ArtemisPosition.c4D.getZ(), is(3));
        assertThat(ArtemisPosition.d4D.getZ(), is(3));
    }

    /**
     * Test the <code>values()</code> method.
     */
    @Test
    public void values()
    {
        final ArtemisPosition[] values = ArtemisPosition.values();

        assertNotNull(values);
        assertThat(values.length, is(64));

        for (int i = 0; i < 64; i++)
        {
            assertThat(values[i].getIndex(), is(i));
        }
    }
}

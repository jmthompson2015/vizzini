package org.vizzini.chess.tridimensional;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertThat;

import org.junit.Test;

/**
 * Provides tests for the <code>TridPosition</code> class.
 */
public final class TridPositionTest
{
    /**
     * Test the <code>findByCoordinates()</code> method.
     */
    @Test
    public void findByCoordinates()
    {
        assertThat(TridPosition.findByCoordinates(0, 0, 0), is(TridPosition.a1A));
        assertThat(TridPosition.findByCoordinates(5, 0, 0), is(TridPosition.f1A));
        assertThat(TridPosition.findByCoordinates(0, 5, 0), is(TridPosition.a6A));
        assertThat(TridPosition.findByCoordinates(0, 0, 6), is(TridPosition.a1G));
        assertThat(TridPosition.findByCoordinates(5, 5, 6), is(TridPosition.f6G));

        assertNull(TridPosition.findByCoordinates(-1, 0, 0));
        assertNull(TridPosition.findByCoordinates(6, 0, 0));

        assertNull(TridPosition.findByCoordinates(0, -1, 0));
        assertNull(TridPosition.findByCoordinates(0, 6, 0));

        assertNull(TridPosition.findByCoordinates(0, 0, -1));
        assertNull(TridPosition.findByCoordinates(0, 0, 7));
    }

    /**
     * Test the <code>findByIndex()</code> method.
     */
    @Test
    public void findByIndex()
    {
        assertThat(TridPosition.findByIndex(0), is(TridPosition.a1A));
        assertThat(TridPosition.findByIndex(5), is(TridPosition.f1A));
        assertThat(TridPosition.findByIndex(30), is(TridPosition.a6A));
        assertThat(TridPosition.findByIndex(216), is(TridPosition.a1G));
        assertThat(TridPosition.findByIndex(251), is(TridPosition.f6G));

        assertNull(TridPosition.findByIndex(-1));
        assertNull(TridPosition.findByIndex(288));
    }

    /**
     * Test the <code>getIndex()</code> method.
     */
    @Test
    public void getIndex()
    {
        assertThat(TridPosition.a1A.getIndex(), is(0));
        assertThat(TridPosition.b1A.getIndex(), is(1));
        assertThat(TridPosition.a2A.getIndex(), is(6));
        assertThat(TridPosition.b2A.getIndex(), is(7));

        assertThat(TridPosition.b2B.getIndex(), is(43));
        assertThat(TridPosition.c2B.getIndex(), is(44));
        assertThat(TridPosition.d2B.getIndex(), is(45));
        assertThat(TridPosition.e2B.getIndex(), is(46));

        assertThat(TridPosition.b2D.getIndex(), is(115));
        assertThat(TridPosition.c2D.getIndex(), is(116));
        assertThat(TridPosition.d2D.getIndex(), is(117));
        assertThat(TridPosition.e2D.getIndex(), is(118));

        assertThat(TridPosition.b2F.getIndex(), is(187));
        assertThat(TridPosition.c2F.getIndex(), is(188));
        assertThat(TridPosition.d2F.getIndex(), is(189));
        assertThat(TridPosition.e2F.getIndex(), is(190));

        assertThat(TridPosition.e5G.getIndex(), is(244));
        assertThat(TridPosition.f5G.getIndex(), is(245));
        assertThat(TridPosition.e6G.getIndex(), is(250));
        assertThat(TridPosition.f6G.getIndex(), is(251));
    }

    /**
     * Test the <code>getX()</code> method.
     */
    @Test
    public void getX()
    {
        assertThat(TridPosition.a1A.getX(), is(0));
        assertThat(TridPosition.b1A.getX(), is(1));
        assertThat(TridPosition.a2A.getX(), is(0));
        assertThat(TridPosition.b2A.getX(), is(1));
        assertThat(TridPosition.b2B.getX(), is(1));
        assertThat(TridPosition.a1C.getX(), is(0));
        assertThat(TridPosition.b2D.getX(), is(1));
        assertThat(TridPosition.a1E.getX(), is(0));
        assertThat(TridPosition.b2F.getX(), is(1));
        assertThat(TridPosition.f5G.getX(), is(5));
        assertThat(TridPosition.e6G.getX(), is(4));
        assertThat(TridPosition.f6G.getX(), is(5));
    }

    /**
     * Test the <code>getY()</code> method.
     */
    @Test
    public void getY()
    {
        assertThat(TridPosition.a1A.getY(), is(0));
        assertThat(TridPosition.b1A.getY(), is(0));
        assertThat(TridPosition.a2A.getY(), is(1));
        assertThat(TridPosition.b2A.getY(), is(1));
        assertThat(TridPosition.b2B.getY(), is(1));
        assertThat(TridPosition.a1C.getY(), is(0));
        assertThat(TridPosition.b2D.getY(), is(1));
        assertThat(TridPosition.a1E.getY(), is(0));
        assertThat(TridPosition.b2F.getY(), is(1));
        assertThat(TridPosition.f5G.getY(), is(4));
        assertThat(TridPosition.e6G.getY(), is(5));
        assertThat(TridPosition.f6G.getY(), is(5));
    }

    /**
     * Test the <code>getZ()</code> method.
     */
    @Test
    public void getZ()
    {
        assertThat(TridPosition.a1A.getZ(), is(0));
        assertThat(TridPosition.b1A.getZ(), is(0));
        assertThat(TridPosition.a2A.getZ(), is(0));
        assertThat(TridPosition.b2A.getZ(), is(0));
        assertThat(TridPosition.b2B.getZ(), is(1));
        assertThat(TridPosition.a1C.getZ(), is(2));
        assertThat(TridPosition.b2D.getZ(), is(3));
        assertThat(TridPosition.a1E.getZ(), is(4));
        assertThat(TridPosition.b2F.getZ(), is(5));
        assertThat(TridPosition.f5G.getZ(), is(6));
        assertThat(TridPosition.e6G.getZ(), is(6));
        assertThat(TridPosition.f6G.getZ(), is(6));
    }

    /**
     * Test the <code>values()</code> method.
     */
    @Test
    public void values()
    {
        final TridPosition[] values = TridPosition.values();

        assertNotNull(values);
        // 3 * (4 * 4) + 4 * 4 * (2 * 2)
        assertThat(values.length, is(112));

        // for (int i = 0; i < 112; i++)
        // {
        // assertThat(values[i].getIndex(), is(i));
        // }
    }
}

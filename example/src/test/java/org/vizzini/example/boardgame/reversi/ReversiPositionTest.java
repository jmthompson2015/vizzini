package org.vizzini.example.boardgame.reversi;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;

import org.junit.Test;

/**
 * Provides tests for the <code>ReversiPosition</code> class.
 */
public final class ReversiPositionTest
{
    /**
     * Test the <code>findByCoordinates()</code> method.
     */
    @Test
    public void findByCoordinates()
    {
        assertThat(ReversiPosition.findByCoordinates(0, 0), is(ReversiPosition.a1));
        assertThat(ReversiPosition.findByCoordinates(1, 0), is(ReversiPosition.b1));
        assertThat(ReversiPosition.findByCoordinates(2, 0), is(ReversiPosition.c1));
        assertThat(ReversiPosition.findByCoordinates(0, 1), is(ReversiPosition.a2));
        assertThat(ReversiPosition.findByCoordinates(2, 1), is(ReversiPosition.c2));
        assertThat(ReversiPosition.findByCoordinates(0, 2), is(ReversiPosition.a3));
        assertThat(ReversiPosition.findByCoordinates(1, 2), is(ReversiPosition.b3));
        assertThat(ReversiPosition.findByCoordinates(2, 2), is(ReversiPosition.c3));
        assertThat(ReversiPosition.findByCoordinates(3, 3), is(ReversiPosition.d4));
        assertThat(ReversiPosition.findByCoordinates(4, 3), is(ReversiPosition.e4));
        assertThat(ReversiPosition.findByCoordinates(3, 4), is(ReversiPosition.d5));
        assertThat(ReversiPosition.findByCoordinates(4, 4), is(ReversiPosition.e5));

        assertThat(ReversiPosition.findByCoordinates(3, 3), is(ReversiPosition.CENTER0));
        assertThat(ReversiPosition.findByCoordinates(4, 3), is(ReversiPosition.CENTER1));
        assertThat(ReversiPosition.findByCoordinates(3, 4), is(ReversiPosition.CENTER2));
        assertThat(ReversiPosition.findByCoordinates(4, 4), is(ReversiPosition.CENTER3));

        assertNull(ReversiPosition.findByCoordinates(-1, 0));
        assertNull(ReversiPosition.findByCoordinates(8, 0));

        assertNull(ReversiPosition.findByCoordinates(0, -1));
        assertNull(ReversiPosition.findByCoordinates(0, 8));
    }

    /**
     * Test the <code>getIndex()</code> method.
     */
    @Test
    public void getIndex()
    {
        assertThat(ReversiPosition.a1.getIndex(), is(0));
        assertThat(ReversiPosition.b1.getIndex(), is(1));
        assertThat(ReversiPosition.c1.getIndex(), is(2));
        assertThat(ReversiPosition.a2.getIndex(), is(8));
        assertThat(ReversiPosition.c2.getIndex(), is(10));
        assertThat(ReversiPosition.a3.getIndex(), is(16));
        assertThat(ReversiPosition.b3.getIndex(), is(17));
        assertThat(ReversiPosition.c3.getIndex(), is(18));
        assertThat(ReversiPosition.d4.getIndex(), is(27));
        assertThat(ReversiPosition.e4.getIndex(), is(28));
        assertThat(ReversiPosition.d5.getIndex(), is(35));
        assertThat(ReversiPosition.e5.getIndex(), is(36));
        assertThat(ReversiPosition.h8.getIndex(), is(63));

        assertThat(ReversiPosition.CENTER0.getIndex(), is(27));
        assertThat(ReversiPosition.CENTER1.getIndex(), is(28));
        assertThat(ReversiPosition.CENTER2.getIndex(), is(35));
        assertThat(ReversiPosition.CENTER3.getIndex(), is(36));
    }

    /**
     * Test the <code>getX()</code> method.
     */
    @Test
    public void getX()
    {
        assertThat(ReversiPosition.a1.getX(), is(0));
        assertThat(ReversiPosition.a2.getX(), is(0));
        assertThat(ReversiPosition.a3.getX(), is(0));
        assertThat(ReversiPosition.b1.getX(), is(1));
        assertThat(ReversiPosition.b3.getX(), is(1));
        assertThat(ReversiPosition.c1.getX(), is(2));
        assertThat(ReversiPosition.c2.getX(), is(2));
        assertThat(ReversiPosition.c3.getX(), is(2));
        assertThat(ReversiPosition.d4.getX(), is(3));
        assertThat(ReversiPosition.d5.getX(), is(3));
        assertThat(ReversiPosition.e4.getX(), is(4));
        assertThat(ReversiPosition.e5.getX(), is(4));
        assertThat(ReversiPosition.h8.getX(), is(7));

        assertThat(ReversiPosition.CENTER0.getX(), is(3));
        assertThat(ReversiPosition.CENTER2.getX(), is(3));
        assertThat(ReversiPosition.CENTER1.getX(), is(4));
        assertThat(ReversiPosition.CENTER3.getX(), is(4));
    }

    /**
     * Test the <code>getY()</code> method.
     */
    @Test
    public void getY()
    {
        assertThat(ReversiPosition.a1.getY(), is(0));
        assertThat(ReversiPosition.b1.getY(), is(0));
        assertThat(ReversiPosition.c1.getY(), is(0));
        assertThat(ReversiPosition.a2.getY(), is(1));
        assertThat(ReversiPosition.c2.getY(), is(1));
        assertThat(ReversiPosition.a3.getY(), is(2));
        assertThat(ReversiPosition.b3.getY(), is(2));
        assertThat(ReversiPosition.c3.getY(), is(2));
        assertThat(ReversiPosition.d4.getY(), is(3));
        assertThat(ReversiPosition.e4.getY(), is(3));
        assertThat(ReversiPosition.c5.getY(), is(4));
        assertThat(ReversiPosition.e5.getY(), is(4));
        assertThat(ReversiPosition.h8.getY(), is(7));

        assertThat(ReversiPosition.CENTER0.getY(), is(3));
        assertThat(ReversiPosition.CENTER1.getY(), is(3));
        assertThat(ReversiPosition.CENTER2.getY(), is(4));
        assertThat(ReversiPosition.CENTER3.getY(), is(4));
    }

    /**
     * Test the <code>isCorner()</code> method.
     */
    @Test
    public void isCorner()
    {
        assertTrue(ReversiPosition.CORNER0.isCorner());
        assertTrue(ReversiPosition.CORNER1.isCorner());
        assertTrue(ReversiPosition.CORNER2.isCorner());
        assertTrue(ReversiPosition.CORNER3.isCorner());

        assertFalse(ReversiPosition.CENTER0.isCorner());
        assertFalse(ReversiPosition.CENTER1.isCorner());
        assertFalse(ReversiPosition.CENTER2.isCorner());
        assertFalse(ReversiPosition.CENTER3.isCorner());
    }

    /**
     * Test the <code>isSide()</code> method.
     */
    @Test
    public void isSide()
    {
        assertTrue(ReversiPosition.a2.isSide());
        assertTrue(ReversiPosition.a7.isSide());
        assertTrue(ReversiPosition.b1.isSide());
        assertTrue(ReversiPosition.g1.isSide());
        assertTrue(ReversiPosition.b8.isSide());
        assertTrue(ReversiPosition.g8.isSide());
        assertTrue(ReversiPosition.h2.isSide());
        assertTrue(ReversiPosition.h7.isSide());

        assertFalse(ReversiPosition.CORNER0.isSide());
        assertFalse(ReversiPosition.CORNER1.isSide());
        assertFalse(ReversiPosition.CORNER2.isSide());
        assertFalse(ReversiPosition.CORNER3.isSide());

        assertFalse(ReversiPosition.CENTER0.isCorner());
        assertFalse(ReversiPosition.CENTER1.isCorner());
        assertFalse(ReversiPosition.CENTER2.isCorner());
        assertFalse(ReversiPosition.CENTER3.isCorner());
    }

    /**
     * Test the <code>values()</code> method.
     */
    @Test
    public void values()
    {
        final ReversiPosition[] values = ReversiPosition.values();

        assertNotNull(values);
        assertThat(values.length, is(64));

        for (int i = 0; i < 64; i++)
        {
            assertThat(values[i].getIndex(), is(i));
        }
    }
}

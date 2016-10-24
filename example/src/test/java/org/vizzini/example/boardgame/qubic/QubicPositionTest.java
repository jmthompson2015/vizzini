package org.vizzini.example.boardgame.qubic;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertThat;

import org.junit.Test;

/**
 * Provides tests for the <code>QubicPosition</code> class.
 */
public final class QubicPositionTest
{
    /**
     * Test the <code>findByCoordinates()</code> method.
     */
    @Test
    public void findByCoordinates()
    {
        assertThat(QubicPosition.findByCoordinates(0, 0, 0), is(QubicPosition.a1A));
        assertThat(QubicPosition.findByCoordinates(1, 0, 0), is(QubicPosition.b1A));
        assertThat(QubicPosition.findByCoordinates(2, 0, 0), is(QubicPosition.c1A));
        assertThat(QubicPosition.findByCoordinates(3, 0, 0), is(QubicPosition.d1A));

        assertThat(QubicPosition.findByCoordinates(0, 1, 1), is(QubicPosition.a2B));
        assertThat(QubicPosition.findByCoordinates(1, 1, 1), is(QubicPosition.b2B));
        assertThat(QubicPosition.findByCoordinates(2, 1, 1), is(QubicPosition.c2B));
        assertThat(QubicPosition.findByCoordinates(3, 1, 1), is(QubicPosition.d2B));

        assertThat(QubicPosition.findByCoordinates(0, 2, 2), is(QubicPosition.a3C));
        assertThat(QubicPosition.findByCoordinates(1, 2, 2), is(QubicPosition.b3C));
        assertThat(QubicPosition.findByCoordinates(2, 2, 2), is(QubicPosition.c3C));
        assertThat(QubicPosition.findByCoordinates(3, 2, 2), is(QubicPosition.d3C));

        assertThat(QubicPosition.findByCoordinates(0, 3, 3), is(QubicPosition.a4D));
        assertThat(QubicPosition.findByCoordinates(1, 3, 3), is(QubicPosition.b4D));
        assertThat(QubicPosition.findByCoordinates(2, 3, 3), is(QubicPosition.c4D));
        assertThat(QubicPosition.findByCoordinates(3, 3, 3), is(QubicPosition.d4D));

        assertNull(QubicPosition.findByCoordinates(-1, 0, 0));
        assertNull(QubicPosition.findByCoordinates(0, -1, 0));
        assertNull(QubicPosition.findByCoordinates(0, 0, -1));
        assertNull(QubicPosition.findByCoordinates(4, 0, 0));
        assertNull(QubicPosition.findByCoordinates(0, 4, 0));
        assertNull(QubicPosition.findByCoordinates(0, 0, 4));
    }

    /**
     * Test the <code>findByIndex()</code> method.
     */
    @Test
    public void findByIndex()
    {
        assertThat(QubicPosition.findByIndex(0), is(QubicPosition.a1A));
        assertThat(QubicPosition.findByIndex(1), is(QubicPosition.b1A));
        assertThat(QubicPosition.findByIndex(2), is(QubicPosition.c1A));
        assertThat(QubicPosition.findByIndex(3), is(QubicPosition.d1A));

        assertThat(QubicPosition.findByIndex(20), is(QubicPosition.a2B));
        assertThat(QubicPosition.findByIndex(21), is(QubicPosition.b2B));
        assertThat(QubicPosition.findByIndex(22), is(QubicPosition.c2B));
        assertThat(QubicPosition.findByIndex(23), is(QubicPosition.d2B));

        assertThat(QubicPosition.findByIndex(40), is(QubicPosition.a3C));
        assertThat(QubicPosition.findByIndex(41), is(QubicPosition.b3C));
        assertThat(QubicPosition.findByIndex(42), is(QubicPosition.c3C));
        assertThat(QubicPosition.findByIndex(43), is(QubicPosition.d3C));

        assertThat(QubicPosition.findByIndex(60), is(QubicPosition.a4D));
        assertThat(QubicPosition.findByIndex(61), is(QubicPosition.b4D));
        assertThat(QubicPosition.findByIndex(62), is(QubicPosition.c4D));
        assertThat(QubicPosition.findByIndex(63), is(QubicPosition.d4D));

        assertNull(QubicPosition.findByIndex(-1));
        assertNull(QubicPosition.findByIndex(64));
    }

    /**
     * Test the <code>getIndex()</code> method.
     */
    @Test
    public void getIndex()
    {
        assertThat(QubicPosition.a1A.getIndex(), is(0));
        assertThat(QubicPosition.b1A.getIndex(), is(1));
        assertThat(QubicPosition.c1A.getIndex(), is(2));
        assertThat(QubicPosition.d1A.getIndex(), is(3));

        assertThat(QubicPosition.a2B.getIndex(), is(20));
        assertThat(QubicPosition.b2B.getIndex(), is(21));
        assertThat(QubicPosition.c2B.getIndex(), is(22));
        assertThat(QubicPosition.d2B.getIndex(), is(23));

        assertThat(QubicPosition.a3C.getIndex(), is(40));
        assertThat(QubicPosition.b3C.getIndex(), is(41));
        assertThat(QubicPosition.c3C.getIndex(), is(42));
        assertThat(QubicPosition.d3C.getIndex(), is(43));

        assertThat(QubicPosition.a4D.getIndex(), is(60));
        assertThat(QubicPosition.b4D.getIndex(), is(61));
        assertThat(QubicPosition.c4D.getIndex(), is(62));
        assertThat(QubicPosition.d4D.getIndex(), is(63));
    }

    /**
     * Test the <code>getX()</code> method.
     */
    @Test
    public void getX()
    {
        assertThat(QubicPosition.a1A.getX(), is(0));
        assertThat(QubicPosition.b1A.getX(), is(1));
        assertThat(QubicPosition.c1A.getX(), is(2));
        assertThat(QubicPosition.d1A.getX(), is(3));

        assertThat(QubicPosition.a2B.getX(), is(0));
        assertThat(QubicPosition.b2B.getX(), is(1));
        assertThat(QubicPosition.c2B.getX(), is(2));
        assertThat(QubicPosition.d2B.getX(), is(3));

        assertThat(QubicPosition.a3C.getX(), is(0));
        assertThat(QubicPosition.b3C.getX(), is(1));
        assertThat(QubicPosition.c3C.getX(), is(2));
        assertThat(QubicPosition.d3C.getX(), is(3));

        assertThat(QubicPosition.a4D.getX(), is(0));
        assertThat(QubicPosition.b4D.getX(), is(1));
        assertThat(QubicPosition.c4D.getX(), is(2));
        assertThat(QubicPosition.d4D.getX(), is(3));
    }

    /**
     * Test the <code>getY()</code> method.
     */
    @Test
    public void getY()
    {
        assertThat(QubicPosition.a1A.getY(), is(0));
        assertThat(QubicPosition.b1A.getY(), is(0));
        assertThat(QubicPosition.c1A.getY(), is(0));
        assertThat(QubicPosition.d1A.getY(), is(0));

        assertThat(QubicPosition.a2B.getY(), is(1));
        assertThat(QubicPosition.b2B.getY(), is(1));
        assertThat(QubicPosition.c2B.getY(), is(1));
        assertThat(QubicPosition.d2B.getY(), is(1));

        assertThat(QubicPosition.a3C.getY(), is(2));
        assertThat(QubicPosition.b3C.getY(), is(2));
        assertThat(QubicPosition.c3C.getY(), is(2));
        assertThat(QubicPosition.d3C.getY(), is(2));

        assertThat(QubicPosition.a4D.getY(), is(3));
        assertThat(QubicPosition.b4D.getY(), is(3));
        assertThat(QubicPosition.c4D.getY(), is(3));
        assertThat(QubicPosition.d4D.getY(), is(3));
    }

    /**
     * Test the <code>getZ()</code> method.
     */
    @Test
    public void getZ()
    {
        assertThat(QubicPosition.a1A.getZ(), is(0));
        assertThat(QubicPosition.b1A.getZ(), is(0));
        assertThat(QubicPosition.c1A.getZ(), is(0));
        assertThat(QubicPosition.d1A.getZ(), is(0));

        assertThat(QubicPosition.a2B.getZ(), is(1));
        assertThat(QubicPosition.b2B.getZ(), is(1));
        assertThat(QubicPosition.c2B.getZ(), is(1));
        assertThat(QubicPosition.d2B.getZ(), is(1));

        assertThat(QubicPosition.a3C.getZ(), is(2));
        assertThat(QubicPosition.b3C.getZ(), is(2));
        assertThat(QubicPosition.c3C.getZ(), is(2));
        assertThat(QubicPosition.d3C.getZ(), is(2));

        assertThat(QubicPosition.a4D.getZ(), is(3));
        assertThat(QubicPosition.b4D.getZ(), is(3));
        assertThat(QubicPosition.c4D.getZ(), is(3));
        assertThat(QubicPosition.d4D.getZ(), is(3));
    }

    /**
     * Test the <code>values()</code> method.
     */
    @Test
    public void values()
    {
        final QubicPosition[] values = QubicPosition.values();

        assertNotNull(values);
        assertThat(values.length, is(64));

        for (int i = 0; i < 64; i++)
        {
            assertThat(values[i].getIndex(), is(i));
        }
    }
}

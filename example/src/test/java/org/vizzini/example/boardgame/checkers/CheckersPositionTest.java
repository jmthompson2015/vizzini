package org.vizzini.example.boardgame.checkers;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertThat;

import org.junit.Test;

/**
 * Provides tests for the <code>CheckersPosition</code> class.
 */
public final class CheckersPositionTest
{
    /**
     * Test the <code>computeIndex()</code> method.
     */
    @Test
    public void computeIndex()
    {
        assertThat(CheckersPosition.computeIndex(1, 0), is(0));
        assertThat(CheckersPosition.computeIndex(3, 0), is(1));
        assertThat(CheckersPosition.computeIndex(5, 0), is(2));
        assertThat(CheckersPosition.computeIndex(7, 0), is(3));

        assertThat(CheckersPosition.computeIndex(2, 1), is(5));
        assertThat(CheckersPosition.computeIndex(3, 2), is(9));
        assertThat(CheckersPosition.computeIndex(4, 3), is(14));
        assertThat(CheckersPosition.computeIndex(5, 4), is(18));
        assertThat(CheckersPosition.computeIndex(6, 5), is(23));
        assertThat(CheckersPosition.computeIndex(7, 6), is(27));

        assertThat(CheckersPosition.computeIndex(0, 7), is(28));
        assertThat(CheckersPosition.computeIndex(2, 7), is(29));
        assertThat(CheckersPosition.computeIndex(4, 7), is(30));
        assertThat(CheckersPosition.computeIndex(6, 7), is(31));

        assertNull(CheckersPosition.computeIndex(0, 0));
        assertNull(CheckersPosition.computeIndex(7, 7));
    }

    /**
     * Test the <code>findByCoordinates()</code> method.
     */
    @Test
    public void findByCoordinates()
    {
        assertThat(CheckersPosition.findByCoordinates(1, 0), is(CheckersPosition.P01));
        assertThat(CheckersPosition.findByCoordinates(3, 0), is(CheckersPosition.P02));
        assertThat(CheckersPosition.findByCoordinates(5, 0), is(CheckersPosition.P03));
        assertThat(CheckersPosition.findByCoordinates(7, 0), is(CheckersPosition.P04));

        assertThat(CheckersPosition.findByCoordinates(2, 1), is(CheckersPosition.P06));
        assertThat(CheckersPosition.findByCoordinates(3, 2), is(CheckersPosition.P10));
        assertThat(CheckersPosition.findByCoordinates(4, 3), is(CheckersPosition.P15));
        assertThat(CheckersPosition.findByCoordinates(5, 4), is(CheckersPosition.P19));
        assertThat(CheckersPosition.findByCoordinates(6, 5), is(CheckersPosition.P24));
        assertThat(CheckersPosition.findByCoordinates(7, 6), is(CheckersPosition.P28));

        assertThat(CheckersPosition.findByCoordinates(0, 7), is(CheckersPosition.P29));
        assertThat(CheckersPosition.findByCoordinates(2, 7), is(CheckersPosition.P30));
        assertThat(CheckersPosition.findByCoordinates(4, 7), is(CheckersPosition.P31));
        assertThat(CheckersPosition.findByCoordinates(6, 7), is(CheckersPosition.P32));

        assertNull(CheckersPosition.findByCoordinates(-1, 0));
        assertNull(CheckersPosition.findByCoordinates(8, 0));
        assertNull(CheckersPosition.findByCoordinates(0, -1));
        assertNull(CheckersPosition.findByCoordinates(0, 8));
    }

    /**
     * Test the <code>findByIndex()</code> method.
     */
    @Test
    public void findByIndex()
    {
        assertThat(CheckersPosition.findByIndex(0), is(CheckersPosition.P01));
        assertThat(CheckersPosition.findByIndex(1), is(CheckersPosition.P02));
        assertThat(CheckersPosition.findByIndex(2), is(CheckersPosition.P03));
        assertThat(CheckersPosition.findByIndex(3), is(CheckersPosition.P04));

        assertThat(CheckersPosition.findByIndex(5), is(CheckersPosition.P06));
        assertThat(CheckersPosition.findByIndex(9), is(CheckersPosition.P10));
        assertThat(CheckersPosition.findByIndex(14), is(CheckersPosition.P15));
        assertThat(CheckersPosition.findByIndex(18), is(CheckersPosition.P19));
        assertThat(CheckersPosition.findByIndex(23), is(CheckersPosition.P24));
        assertThat(CheckersPosition.findByIndex(27), is(CheckersPosition.P28));

        assertThat(CheckersPosition.findByIndex(28), is(CheckersPosition.P29));
        assertThat(CheckersPosition.findByIndex(29), is(CheckersPosition.P30));
        assertThat(CheckersPosition.findByIndex(30), is(CheckersPosition.P31));
        assertThat(CheckersPosition.findByIndex(31), is(CheckersPosition.P32));

        assertNull(CheckersPosition.findByIndex(-1));
        assertNull(CheckersPosition.findByIndex(32));
    }

    /**
     * Test the <code>getIndex()</code> method.
     */
    @Test
    public void getIndex()
    {
        assertThat(CheckersPosition.P01.getIndex(), is(0));
        assertThat(CheckersPosition.P02.getIndex(), is(1));
        assertThat(CheckersPosition.P03.getIndex(), is(2));
        assertThat(CheckersPosition.P04.getIndex(), is(3));

        assertThat(CheckersPosition.P06.getIndex(), is(5));
        assertThat(CheckersPosition.P10.getIndex(), is(9));
        assertThat(CheckersPosition.P15.getIndex(), is(14));
        assertThat(CheckersPosition.P19.getIndex(), is(18));
        assertThat(CheckersPosition.P24.getIndex(), is(23));
        assertThat(CheckersPosition.P28.getIndex(), is(27));

        assertThat(CheckersPosition.P29.getIndex(), is(28));
        assertThat(CheckersPosition.P30.getIndex(), is(29));
        assertThat(CheckersPosition.P31.getIndex(), is(30));
        assertThat(CheckersPosition.P32.getIndex(), is(31));
    }

    /**
     * Test the <code>getX()</code> method.
     */
    @Test
    public void getX()
    {
        assertThat(CheckersPosition.P01.getX(), is(1));
        assertThat(CheckersPosition.P06.getX(), is(2));
        assertThat(CheckersPosition.P10.getX(), is(3));
        assertThat(CheckersPosition.P15.getX(), is(4));
        assertThat(CheckersPosition.P19.getX(), is(5));
        assertThat(CheckersPosition.P24.getX(), is(6));
        assertThat(CheckersPosition.P28.getX(), is(7));
        assertThat(CheckersPosition.P32.getX(), is(6));
    }

    /**
     * Test the <code>getY()</code> method.
     */
    @Test
    public void getY()
    {
        assertThat(CheckersPosition.P01.getY(), is(0));
        assertThat(CheckersPosition.P06.getY(), is(1));
        assertThat(CheckersPosition.P10.getY(), is(2));
        assertThat(CheckersPosition.P15.getY(), is(3));
        assertThat(CheckersPosition.P19.getY(), is(4));
        assertThat(CheckersPosition.P24.getY(), is(5));
        assertThat(CheckersPosition.P28.getY(), is(6));
        assertThat(CheckersPosition.P32.getY(), is(7));
    }

    /**
     * Test the <code>values()</code> method.
     */
    @Test
    public void values()
    {
        final CheckersPosition[] values = CheckersPosition.values();

        assertNotNull(values);
        assertThat(values.length, is(32));

        for (int i = 0; i < 32; i++)
        {
            assertThat("i = " + i, values[i].getIndex(), is(i));
        }
    }
}

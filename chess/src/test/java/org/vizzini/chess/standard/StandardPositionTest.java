package org.vizzini.chess.standard;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertThat;

import org.junit.Test;

/**
 * Provides tests for the <code>StandardPosition</code> class.
 */
public final class StandardPositionTest
{
    /**
     * Test the <code>findByCoordinates()</code> method.
     */
    @Test
    public void findByCoordinates()
    {
        assertThat(StandardPosition.findByCoordinates(0, 0), is(StandardPosition.a1));
        assertThat(StandardPosition.findByCoordinates(1, 0), is(StandardPosition.b1));
        assertThat(StandardPosition.findByCoordinates(2, 0), is(StandardPosition.c1));
        assertThat(StandardPosition.findByCoordinates(0, 1), is(StandardPosition.a2));
        assertThat(StandardPosition.findByCoordinates(2, 1), is(StandardPosition.c2));
        assertThat(StandardPosition.findByCoordinates(0, 2), is(StandardPosition.a3));
        assertThat(StandardPosition.findByCoordinates(1, 2), is(StandardPosition.b3));
        assertThat(StandardPosition.findByCoordinates(2, 2), is(StandardPosition.c3));
        assertThat(StandardPosition.findByCoordinates(3, 3), is(StandardPosition.d4));
        assertThat(StandardPosition.findByCoordinates(4, 3), is(StandardPosition.e4));
        assertThat(StandardPosition.findByCoordinates(3, 4), is(StandardPosition.d5));
        assertThat(StandardPosition.findByCoordinates(4, 4), is(StandardPosition.e5));
        assertThat(StandardPosition.findByCoordinates(7, 7), is(StandardPosition.h8));

        assertNull(StandardPosition.findByCoordinates(-1, 0));
        assertNull(StandardPosition.findByCoordinates(8, 0));

        assertNull(StandardPosition.findByCoordinates(0, -1));
        assertNull(StandardPosition.findByCoordinates(0, 8));
    }

    /**
     * Test the <code>findByIndex()</code> method.
     */
    @Test
    public void findByIndex()
    {
        assertThat(StandardPosition.findByIndex(0), is(StandardPosition.a1));
        assertThat(StandardPosition.findByIndex(1), is(StandardPosition.b1));
        assertThat(StandardPosition.findByIndex(8), is(StandardPosition.a2));
        assertThat(StandardPosition.findByIndex(63), is(StandardPosition.h8));

        assertNull(StandardPosition.findByIndex(-1));
        assertNull(StandardPosition.findByIndex(64));
    }

    /**
     * Test the <code>getIndex()</code> method.
     */
    @Test
    public void getIndex()
    {
        assertThat(StandardPosition.a1.getIndex(), is(0));
        assertThat(StandardPosition.b1.getIndex(), is(1));
        assertThat(StandardPosition.c1.getIndex(), is(2));
        assertThat(StandardPosition.a2.getIndex(), is(8));
        assertThat(StandardPosition.c2.getIndex(), is(10));
        assertThat(StandardPosition.a3.getIndex(), is(16));
        assertThat(StandardPosition.b3.getIndex(), is(17));
        assertThat(StandardPosition.c3.getIndex(), is(18));
        assertThat(StandardPosition.d4.getIndex(), is(27));
        assertThat(StandardPosition.e4.getIndex(), is(28));
        assertThat(StandardPosition.d5.getIndex(), is(35));
        assertThat(StandardPosition.e5.getIndex(), is(36));
        assertThat(StandardPosition.h8.getIndex(), is(63));
    }

    /**
     * Test the <code>getX()</code> method.
     */
    @Test
    public void getX()
    {
        assertThat(StandardPosition.a1.getX(), is(0));
        assertThat(StandardPosition.a2.getX(), is(0));
        assertThat(StandardPosition.a3.getX(), is(0));
        assertThat(StandardPosition.b1.getX(), is(1));
        assertThat(StandardPosition.b3.getX(), is(1));
        assertThat(StandardPosition.c1.getX(), is(2));
        assertThat(StandardPosition.c2.getX(), is(2));
        assertThat(StandardPosition.c3.getX(), is(2));
        assertThat(StandardPosition.d4.getX(), is(3));
        assertThat(StandardPosition.d5.getX(), is(3));
        assertThat(StandardPosition.e4.getX(), is(4));
        assertThat(StandardPosition.e5.getX(), is(4));
        assertThat(StandardPosition.h8.getX(), is(7));
    }

    /**
     * Test the <code>getY()</code> method.
     */
    @Test
    public void getY()
    {
        assertThat(StandardPosition.a1.getY(), is(0));
        assertThat(StandardPosition.b1.getY(), is(0));
        assertThat(StandardPosition.c1.getY(), is(0));
        assertThat(StandardPosition.a2.getY(), is(1));
        assertThat(StandardPosition.c2.getY(), is(1));
        assertThat(StandardPosition.a3.getY(), is(2));
        assertThat(StandardPosition.b3.getY(), is(2));
        assertThat(StandardPosition.c3.getY(), is(2));
        assertThat(StandardPosition.d4.getY(), is(3));
        assertThat(StandardPosition.e4.getY(), is(3));
        assertThat(StandardPosition.d5.getY(), is(4));
        assertThat(StandardPosition.e5.getY(), is(4));
        assertThat(StandardPosition.h8.getY(), is(7));
    }

    /**
     * Test the <code>values()</code> method.
     */
    @Test
    public void values()
    {
        final StandardPosition[] values = StandardPosition.values();

        assertNotNull(values);
        assertThat(values.length, is(64));

        for (int i = 0; i < 64; i++)
        {
            assertThat(values[i].getIndex(), is(i));
        }
    }
}

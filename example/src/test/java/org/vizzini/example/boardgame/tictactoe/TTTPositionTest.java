package org.vizzini.example.boardgame.tictactoe;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;

import org.junit.Test;

/**
 * Provides tests for the <code>TTTPosition</code> class.
 */
public final class TTTPositionTest
{
    /**
     * Test the <code>findByCoordinates()</code> method.
     */
    @Test
    public void findByCoordinates()
    {
        assertThat(TTTPosition.findByCoordinates(0, 0), is(TTTPosition.a1));
        assertThat(TTTPosition.findByCoordinates(1, 0), is(TTTPosition.b1));
        assertThat(TTTPosition.findByCoordinates(2, 0), is(TTTPosition.c1));
        assertThat(TTTPosition.findByCoordinates(0, 1), is(TTTPosition.a2));
        assertThat(TTTPosition.findByCoordinates(1, 1), is(TTTPosition.b2));
        assertThat(TTTPosition.findByCoordinates(2, 1), is(TTTPosition.c2));
        assertThat(TTTPosition.findByCoordinates(0, 2), is(TTTPosition.a3));
        assertThat(TTTPosition.findByCoordinates(1, 2), is(TTTPosition.b3));
        assertThat(TTTPosition.findByCoordinates(2, 2), is(TTTPosition.c3));

        assertThat(TTTPosition.findByCoordinates(1, 1), is(TTTPosition.CENTER));

        assertNull(TTTPosition.findByCoordinates(-1, 0));
        assertNull(TTTPosition.findByCoordinates(3, 0));
    }

    /**
     * Test the <code>findByIndex()</code> method.
     */
    @Test
    public void findByIndex()
    {
        assertNull(TTTPosition.findByIndex(-1));
        assertThat(TTTPosition.findByIndex(0), is(TTTPosition.a1));
        assertThat(TTTPosition.findByIndex(1), is(TTTPosition.b1));
        assertThat(TTTPosition.findByIndex(2), is(TTTPosition.c1));
        assertThat(TTTPosition.findByIndex(3), is(TTTPosition.a2));
        assertThat(TTTPosition.findByIndex(4), is(TTTPosition.b2));
        assertThat(TTTPosition.findByIndex(5), is(TTTPosition.c2));
        assertThat(TTTPosition.findByIndex(6), is(TTTPosition.a3));
        assertThat(TTTPosition.findByIndex(7), is(TTTPosition.b3));
        assertThat(TTTPosition.findByIndex(8), is(TTTPosition.c3));

        assertThat(TTTPosition.findByIndex(4), is(TTTPosition.CENTER));

        assertNull(TTTPosition.findByIndex(-2));
        assertNull(TTTPosition.findByIndex(9));
    }

    /**
     * Test the <code>getIndex()</code> method.
     */
    @Test
    public void getIndex()
    {
        assertThat(TTTPosition.a1.getIndex(), is(0));
        assertThat(TTTPosition.b1.getIndex(), is(1));
        assertThat(TTTPosition.c1.getIndex(), is(2));
        assertThat(TTTPosition.a2.getIndex(), is(3));
        assertThat(TTTPosition.b2.getIndex(), is(4));
        assertThat(TTTPosition.c2.getIndex(), is(5));
        assertThat(TTTPosition.a3.getIndex(), is(6));
        assertThat(TTTPosition.b3.getIndex(), is(7));
        assertThat(TTTPosition.c3.getIndex(), is(8));

        assertThat(TTTPosition.CENTER.getIndex(), is(4));
    }

    /**
     * Test the <code>getX()</code> method.
     */
    @Test
    public void getX()
    {
        assertThat(TTTPosition.a1.getX(), is(0));
        assertThat(TTTPosition.b1.getX(), is(1));
        assertThat(TTTPosition.c1.getX(), is(2));
        assertThat(TTTPosition.a2.getX(), is(0));
        assertThat(TTTPosition.b2.getX(), is(1));
        assertThat(TTTPosition.c2.getX(), is(2));
        assertThat(TTTPosition.a3.getX(), is(0));
        assertThat(TTTPosition.b3.getX(), is(1));
        assertThat(TTTPosition.c3.getX(), is(2));

        assertThat(TTTPosition.CENTER.getX(), is(1));
    }

    /**
     * Test the <code>getY()</code> method.
     */
    @Test
    public void getY()
    {
        assertThat(TTTPosition.a1.getY(), is(0));
        assertThat(TTTPosition.b1.getY(), is(0));
        assertThat(TTTPosition.c1.getY(), is(0));
        assertThat(TTTPosition.a2.getY(), is(1));
        assertThat(TTTPosition.b2.getY(), is(1));
        assertThat(TTTPosition.c2.getY(), is(1));
        assertThat(TTTPosition.a3.getY(), is(2));
        assertThat(TTTPosition.b3.getY(), is(2));
        assertThat(TTTPosition.c3.getY(), is(2));

        assertThat(TTTPosition.CENTER.getY(), is(1));
    }

    /**
     * Test the <code>isCenter()</code> method.
     */
    @Test
    public void isCenter()
    {
        assertFalse(TTTPosition.a1.isCenter());
        assertFalse(TTTPosition.b1.isCenter());
        assertFalse(TTTPosition.c1.isCenter());
        assertFalse(TTTPosition.a2.isCenter());
        assertTrue(TTTPosition.b2.isCenter());
        assertFalse(TTTPosition.c2.isCenter());
        assertFalse(TTTPosition.a3.isCenter());
        assertFalse(TTTPosition.b3.isCenter());
        assertFalse(TTTPosition.c3.isCenter());

        assertTrue(TTTPosition.CENTER.isCenter());
    }

    /**
     * Test the <code>isCorner()</code> method.
     */
    @Test
    public void isCorner()
    {
        assertTrue(TTTPosition.a1.isCorner());
        assertFalse(TTTPosition.b1.isCorner());
        assertTrue(TTTPosition.c1.isCorner());
        assertFalse(TTTPosition.a2.isCorner());
        assertFalse(TTTPosition.b2.isCorner());
        assertFalse(TTTPosition.c2.isCorner());
        assertTrue(TTTPosition.a3.isCorner());
        assertFalse(TTTPosition.b3.isCorner());
        assertTrue(TTTPosition.c3.isCorner());

        assertFalse(TTTPosition.CENTER.isCorner());
    }

    /**
     * Test the <code>isSide()</code> method.
     */
    @Test
    public void isSide()
    {
        assertFalse(TTTPosition.a1.isSide());
        assertTrue(TTTPosition.b1.isSide());
        assertFalse(TTTPosition.c1.isSide());
        assertTrue(TTTPosition.a2.isSide());
        assertFalse(TTTPosition.b2.isSide());
        assertTrue(TTTPosition.c2.isSide());
        assertFalse(TTTPosition.a3.isSide());
        assertTrue(TTTPosition.b3.isSide());
        assertFalse(TTTPosition.c3.isSide());

        assertFalse(TTTPosition.CENTER.isSide());
    }

    /**
     * Test the <code>name()</code> method.
     */
    @Test
    public void name()
    {
        assertThat(TTTPosition.a1.name(), is("a1"));
        assertThat(TTTPosition.b1.name(), is("b1"));
        assertThat(TTTPosition.c1.name(), is("c1"));
        assertThat(TTTPosition.a2.name(), is("a2"));
        assertThat(TTTPosition.b2.name(), is("b2"));
        assertThat(TTTPosition.c2.name(), is("c2"));
        assertThat(TTTPosition.a3.name(), is("a3"));
        assertThat(TTTPosition.b3.name(), is("b3"));
        assertThat(TTTPosition.c3.name(), is("c3"));

        assertThat(TTTPosition.CENTER.name(), is("b2"));
    }

    /**
     * Test the <code>values()</code> method.
     */
    @Test
    public void values()
    {
        final TTTPosition[] values = TTTPosition.values();

        assertNotNull(values);
        assertThat(values.length, is(9));

        for (int i = 0; i < 9; i++)
        {
            assertThat(values[i].getIndex(), is(i));
        }
    }
}

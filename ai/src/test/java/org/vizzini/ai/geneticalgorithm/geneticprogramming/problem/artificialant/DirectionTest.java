package org.vizzini.ai.geneticalgorithm.geneticprogramming.problem.artificialant;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;

import org.junit.Test;

/**
 * Provides tests for the <code>Direction</code> class.
 */
public final class DirectionTest
{
    /**
     * Test the <code>getDx()</code> method.
     */
    @Test
    public void getDx()
    {
        assertThat(Direction.NORTH.getDx(), is(0));
        assertThat(Direction.EAST.getDx(), is(1));
        assertThat(Direction.SOUTH.getDx(), is(0));
        assertThat(Direction.WEST.getDx(), is(-1));
    }

    /**
     * Test the <code>getDy()</code> method.
     */
    @Test
    public void getDy()
    {
        assertThat(Direction.NORTH.getDy(), is(-1));
        assertThat(Direction.EAST.getDy(), is(0));
        assertThat(Direction.SOUTH.getDy(), is(1));
        assertThat(Direction.WEST.getDy(), is(0));
    }

    /**
     * Test the <code>left()</code> method.
     */
    @Test
    public void left()
    {
        assertThat(Direction.NORTH.left(), is(Direction.WEST));
        assertThat(Direction.EAST.left(), is(Direction.NORTH));
        assertThat(Direction.SOUTH.left(), is(Direction.EAST));
        assertThat(Direction.WEST.left(), is(Direction.SOUTH));
    }

    /**
     * Test the <code>right()</code> method.
     */
    @Test
    public void right()
    {
        assertThat(Direction.NORTH.right(), is(Direction.EAST));
        assertThat(Direction.EAST.right(), is(Direction.SOUTH));
        assertThat(Direction.SOUTH.right(), is(Direction.WEST));
        assertThat(Direction.WEST.right(), is(Direction.NORTH));
    }
}

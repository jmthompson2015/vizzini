package org.vizzini.chess;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.CoreMatchers.not;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;

import org.junit.Test;

/**
 * Provides tests for the <code>DefaultDimensions</code> class.
 */
public final class DefaultDimensionsTest
{
    /**
     * Test the <code>contains()</code> method.
     */
    @Test
    public void contains()
    {
        final Dimensions dimensions = new DefaultDimensions(8, 8, 1);

        assertFalse(dimensions.contains(-1));
        assertTrue(dimensions.contains(0));
        assertTrue(dimensions.contains(63));
        assertFalse(dimensions.contains(64));
    }

    /**
     * Test the <code>coordsToIndex()</code> method.
     */
    @Test
    public void coordsToIndex()
    {
        final Dimensions dimensions = new DefaultDimensions(8, 8, 1);

        assertThat(dimensions.coordsToIndex(0, 0, 0), is(0));
        assertThat(dimensions.coordsToIndex(1, 0, 0), is(1));
        assertThat(dimensions.coordsToIndex(2, 0, 0), is(2));
        assertThat(dimensions.coordsToIndex(0, 1, 0), is(8));
        assertThat(dimensions.coordsToIndex(1, 1, 0), is(9));
        assertThat(dimensions.coordsToIndex(2, 1, 0), is(10));
        assertThat(dimensions.coordsToIndex(7, 7, 0), is(63));

        assertThat(dimensions.coordsToIndex(-1, 0, 0), is(-1));
        assertThat(dimensions.coordsToIndex(0, -1, 0), is(-1));
        assertThat(dimensions.coordsToIndex(0, 0, -1), is(-1));

        assertThat(dimensions.coordsToIndex(8, 7, 0), is(-1));
        assertThat(dimensions.coordsToIndex(7, 8, 0), is(-1));
        assertThat(dimensions.coordsToIndex(7, 7, 1), is(-1));
    }

    /**
     * Test the <code>getMaxDimension()</code> method.
     */
    @Test
    public void getMaxDimension3()
    {
        final Dimensions dimensions = new DefaultDimensions(3, 2, 1);

        final int result = dimensions.getMaxDimension();

        assertThat(result, is(3));
    }

    /**
     * Test the <code>getMaxDimension()</code> method.
     */
    @Test
    public void getMaxDimension4()
    {
        final Dimensions dimensions = new DefaultDimensions(3, 4, 2);

        final int result = dimensions.getMaxDimension();

        assertThat(result, is(4));
    }

    /**
     * Test the <code>getMaxDimension()</code> method.
     */
    @Test
    public void getMaxDimension5()
    {
        final Dimensions dimensions = new DefaultDimensions(3, 4, 5);

        final int result = dimensions.getMaxDimension();

        assertThat(result, is(5));
    }

    /**
     * Test the <code>getMaxDimension()</code> method.
     */
    @Test
    public void getMaxDimension8()
    {
        final Dimensions dimensions = new DefaultDimensions(8, 8, 1);

        final int result = dimensions.getMaxDimension();

        assertThat(result, is(8));
    }

    /**
     * Test the <code>indexToFile()</code> method.
     */
    @Test
    public void indexToFile()
    {
        final Dimensions dimensions = new DefaultDimensions(8, 8, 1);

        assertThat(dimensions.indexToFile(-1), is(-1));
        assertThat(dimensions.indexToFile(0), is(0));
        assertThat(dimensions.indexToFile(9), is(1));
        assertThat(dimensions.indexToFile(18), is(2));
        assertThat(dimensions.indexToFile(27), is(3));
        assertThat(dimensions.indexToFile(36), is(4));
        assertThat(dimensions.indexToFile(63), is(7));
        assertThat(dimensions.indexToFile(64), is(-1));
    }

    /**
     * Test the <code>indexToLevel()</code> method.
     */
    @Test
    public void indexToLevel()
    {
        final Dimensions dimensions = new DefaultDimensions(4, 4, 4);

        assertThat(dimensions.indexToLevel(-1), is(-1));
        assertThat(dimensions.indexToLevel(0), is(0));
        assertThat(dimensions.indexToLevel(16), is(1));
        assertThat(dimensions.indexToLevel(32), is(2));
        assertThat(dimensions.indexToLevel(63), is(3));
        assertThat(dimensions.indexToLevel(64), is(-1));
    }

    /**
     * Test the <code>indexToRank()</code> method.
     */
    @Test
    public void indexToRank()
    {
        final Dimensions dimensions = new DefaultDimensions(8, 8, 1);

        assertThat(dimensions.indexToRank(-1), is(-1));
        assertThat(dimensions.indexToRank(0), is(0));
        assertThat(dimensions.indexToRank(9), is(1));
        assertThat(dimensions.indexToRank(18), is(2));
        assertThat(dimensions.indexToRank(27), is(3));
        assertThat(dimensions.indexToRank(36), is(4));
        assertThat(dimensions.indexToRank(63), is(7));
        assertThat(dimensions.indexToRank(64), is(-1));
    }

    /**
     * Test the constructor method.
     */
    @Test
    public void testConstructor()
    {
        final Dimensions dimensions = new DefaultDimensions(8, 8, 1);

        assertThat(dimensions.getFileCount(), is(8));
        assertThat(dimensions.getRankCount(), is(8));
        assertThat(dimensions.getLevelCount(), is(1));
        assertThat(dimensions.getCellCount(), is(64));
    }

    /**
     * Test the <code>equals()</code> method.
     */
    @Test
    public void testEquals()
    {
        final Dimensions dimensions0 = new DefaultDimensions(1, 2, 3);
        final Dimensions dimensions1 = new DefaultDimensions(3, 2, 1);
        final Dimensions dimensions2 = new DefaultDimensions(1, 2, 3);

        assertTrue(dimensions0.equals(dimensions0));
        assertFalse(dimensions0.equals(dimensions1));
        assertTrue(dimensions0.equals(dimensions2));
        assertFalse(dimensions0.equals(null));
    }

    /**
     * Test the <code>hashCode()</code> method.
     */
    @Test
    public void testHashCode()
    {
        final Dimensions dimensions0 = new DefaultDimensions(1, 2, 3);
        final Dimensions dimensions1 = new DefaultDimensions(3, 2, 1);
        final Dimensions dimensions2 = new DefaultDimensions(1, 2, 3);

        assertThat(dimensions0.hashCode(), is(dimensions0.hashCode()));
        assertThat(dimensions0.hashCode(), not(dimensions1.hashCode()));
        assertThat(dimensions0.hashCode(), is(dimensions2.hashCode()));
    }
}

package org.vizzini.illyriad.map;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;

import java.awt.Point;

import org.junit.Test;

/**
 * Provides tests for the <code>GeoIdConverter</code> class.
 */
public final class GeoIdConverterTest
{
    /** Converter. */
    private static final GeoIdConverter CONVERTER_BL = new GeoIdConverter(false);

    /** Converter. */
    private static final GeoIdConverter CONVERTER_ELGEA = new GeoIdConverter(true);

    /**
     * Test the <code>coordsToIndex()</code> method.
     */
    @Test
    public void commutative0()
    {
        // Elgea.
        for (int y = CONVERTER_ELGEA.getMinY(); y <= CONVERTER_ELGEA.getMaxY(); y++)
        {
            for (int x = GeoIdConverter.MIN_X_COORD; x <= GeoIdConverter.MAX_X_COORD; x++)
            {
                final int index = CONVERTER_ELGEA.coordsToIndex(x, y);
                final Point point = CONVERTER_ELGEA.indexToPoint(index);
                assertThat("x = " + point.x + " should be " + x, point.x, is(x));
                assertThat("y = " + point.y + " should be " + y, point.y, is(y));
            }
        }

        // Broken Lands.
        for (int y = CONVERTER_BL.getMinY(); y <= CONVERTER_BL.getMaxY(); y++)
        {
            for (int x = GeoIdConverter.MIN_X_COORD; x <= GeoIdConverter.MAX_X_COORD; x++)
            {
                final int index = CONVERTER_BL.coordsToIndex(x, y);
                final Point point = CONVERTER_BL.indexToPoint(index);
                assertThat("x = " + point.x + " should be " + x, point.x, is(x));
                assertThat("y = " + point.y + " should be " + y, point.y, is(y));
            }
        }
    }

    /**
     * Test the <code>indexToPoint()</code> method.
     */
    @Test
    public void commutative1()
    {
        // Elgea.
        for (int index = GeoIdConverter.MIN_INDEX; index <= GeoIdConverter.MAX_INDEX; index++)
        {
            final Point point = CONVERTER_ELGEA.indexToPoint(index);
            final int newIndex = CONVERTER_ELGEA.pointToIndex(point);
            assertThat("newIndex = " + newIndex + " should be " + index, newIndex, is(index));
        }

        // Broken Lands.
        for (int index = GeoIdConverter.MIN_INDEX; index <= GeoIdConverter.MAX_INDEX; index++)
        {
            final Point point = CONVERTER_BL.indexToPoint(index);
            final int newIndex = CONVERTER_BL.pointToIndex(point);
            assertThat("newIndex = " + newIndex + " should be " + index, newIndex, is(index));
        }
    }

    /**
     * Test the <code>coordsToIndex()</code> method.
     */
    @Test
    public void coordsToIndex()
    {
        // Elgea.
        assertThat(CONVERTER_ELGEA.coordsToIndex(-1000, -1000), is(0));
        assertThat(CONVERTER_ELGEA.coordsToIndex(0, -1000), is(1000));
        assertThat(CONVERTER_ELGEA.coordsToIndex(1000, -1000), is(2000));

        assertThat(CONVERTER_ELGEA.coordsToIndex(-1000, 0), is(2001000));
        assertThat(CONVERTER_ELGEA.coordsToIndex(0, 0), is(2002000));
        assertThat(CONVERTER_ELGEA.coordsToIndex(1000, 0), is(2003000));

        assertThat(CONVERTER_ELGEA.coordsToIndex(-1000, 500), is(3001500));
        assertThat(CONVERTER_ELGEA.coordsToIndex(0, 500), is(3002500));
        assertThat(CONVERTER_ELGEA.coordsToIndex(1000, 500), is(3003500));

        assertThat(CONVERTER_ELGEA.coordsToIndex(-1000, 1000), is(4002000));
        assertThat(CONVERTER_ELGEA.coordsToIndex(0, 1000), is(4003000));
        assertThat(CONVERTER_ELGEA.coordsToIndex(1000, 1000), is(4004000));

        // Broken Lands.
        assertThat(CONVERTER_BL.coordsToIndex(-1000, -3300), is(0));
        assertThat(CONVERTER_BL.coordsToIndex(0, -3300), is(1000));
        assertThat(CONVERTER_BL.coordsToIndex(1000, -3300), is(2000));

        assertThat(CONVERTER_BL.coordsToIndex(-1000, -2300), is(2001000));
        assertThat(CONVERTER_BL.coordsToIndex(0, -2300), is(2002000));
        assertThat(CONVERTER_BL.coordsToIndex(1000, -2300), is(2003000));

        assertThat(CONVERTER_BL.coordsToIndex(-1000, -1800), is(3001500));
        assertThat(CONVERTER_BL.coordsToIndex(0, -1800), is(3002500));
        assertThat(CONVERTER_BL.coordsToIndex(1000, -1800), is(3003500));

        assertThat(CONVERTER_BL.coordsToIndex(-1000, -1300), is(4002000));
        assertThat(CONVERTER_BL.coordsToIndex(0, -1300), is(4003000));
        assertThat(CONVERTER_BL.coordsToIndex(1000, -1300), is(4004000));
    }

    /**
     * Test the <code>getMaxY()</code> method.
     */
    @Test
    public void getMaxY()
    {
        assertThat(CONVERTER_ELGEA.getMaxY(), is(1000));

        assertThat(CONVERTER_BL.getMaxY(), is(-1300));
    }

    /**
     * Test the <code>getMinY()</code> method.
     */
    @Test
    public void getMinY()
    {
        assertThat(CONVERTER_ELGEA.getMinY(), is(-1000));

        assertThat(CONVERTER_BL.getMinY(), is(-3300));
    }

    /**
     * Test the <code>indexToPoint()</code> method.
     */
    @Test
    public void indexToPoint()
    {
        // Elgea.
        {
            final Point point = CONVERTER_ELGEA.indexToPoint(0);
            assertThat(point.x, is(-1000));
            assertThat(point.y, is(-1000));
        }
        {
            final Point point = CONVERTER_ELGEA.indexToPoint(2002000);
            assertThat(point.x, is(0));
            assertThat(point.y, is(0));
        }
        {
            final Point point = CONVERTER_ELGEA.indexToPoint(4004000);
            assertThat(point.x, is(1000));
            assertThat(point.y, is(1000));
        }

        // Broken Lands.
        {
            final Point point = CONVERTER_BL.indexToPoint(0);
            assertThat(point.x, is(-1000));
            assertThat(point.y, is(-3300));
        }
        {
            final Point point = CONVERTER_BL.indexToPoint(2002000);
            assertThat(point.x, is(0));
            assertThat(point.y, is(-2300));
        }
        {
            final Point point = CONVERTER_BL.indexToPoint(4004000);
            assertThat(point.x, is(1000));
            assertThat(point.y, is(-1300));
        }
    }

    /**
     * Test the <code>isCoordsInRange()</code> method.
     */
    @Test
    public void isCoordsInRange()
    {
        // Elgea.
        assertFalse(CONVERTER_ELGEA.isCoordsInRange(-1001, -1000));
        assertFalse(CONVERTER_ELGEA.isCoordsInRange(-1000, -1001));
        assertTrue(CONVERTER_ELGEA.isCoordsInRange(-1000, -1000));

        assertTrue(CONVERTER_ELGEA.isCoordsInRange(1000, 1000));
        assertFalse(CONVERTER_ELGEA.isCoordsInRange(1001, 1000));
        assertFalse(CONVERTER_ELGEA.isCoordsInRange(1000, 1001));

        // Broken Lands.
        assertFalse(CONVERTER_BL.isCoordsInRange(-1001, -3300));
        assertFalse(CONVERTER_BL.isCoordsInRange(-1000, -3301));
        assertTrue(CONVERTER_BL.isCoordsInRange(-1000, -3300));

        assertTrue(CONVERTER_BL.isCoordsInRange(1000, -1300));
        assertFalse(CONVERTER_BL.isCoordsInRange(1001, -1300));
        assertFalse(CONVERTER_BL.isCoordsInRange(1000, -1299));
    }

    /**
     * Test the <code>isIndexInRange()</code> method.
     */
    @Test
    public void isIndexInRange()
    {
        // Elgea.
        assertFalse(CONVERTER_ELGEA.isIndexInRange(-1));
        assertTrue(CONVERTER_ELGEA.isIndexInRange(0));
        assertTrue(CONVERTER_ELGEA.isIndexInRange(4004000));
        assertFalse(CONVERTER_ELGEA.isIndexInRange(4004001));

        // Broken Lands.
        assertFalse(CONVERTER_BL.isIndexInRange(-1));
        assertTrue(CONVERTER_BL.isIndexInRange(0));
        assertTrue(CONVERTER_BL.isIndexInRange(4004000));
        assertFalse(CONVERTER_BL.isIndexInRange(4004001));
    }

    /**
     * Test the <code>pointToIndex()</code> method.
     */
    @Test
    public void pointToIndex()
    {
        // Elgea.
        assertThat(CONVERTER_ELGEA.pointToIndex(new Point(-1000, -1000)), is(0));
        assertThat(CONVERTER_ELGEA.pointToIndex(new Point(0, -1000)), is(1000));
        assertThat(CONVERTER_ELGEA.pointToIndex(new Point(1000, -1000)), is(2000));

        assertThat(CONVERTER_ELGEA.pointToIndex(new Point(-1000, 0)), is(2001000));
        assertThat(CONVERTER_ELGEA.pointToIndex(new Point(0, 0)), is(2002000));
        assertThat(CONVERTER_ELGEA.pointToIndex(new Point(1000, 0)), is(2003000));

        assertThat(CONVERTER_ELGEA.pointToIndex(new Point(-1000, 1000)), is(4002000));
        assertThat(CONVERTER_ELGEA.pointToIndex(new Point(0, 1000)), is(4003000));
        assertThat(CONVERTER_ELGEA.pointToIndex(new Point(1000, 1000)), is(4004000));

        // Broken Lands.
        assertThat(CONVERTER_BL.pointToIndex(new Point(-1000, -3300)), is(0));
        assertThat(CONVERTER_BL.pointToIndex(new Point(0, -3300)), is(1000));
        assertThat(CONVERTER_BL.pointToIndex(new Point(1000, -3300)), is(2000));

        assertThat(CONVERTER_BL.pointToIndex(new Point(-1000, -2300)), is(2001000));
        assertThat(CONVERTER_BL.pointToIndex(new Point(0, -2300)), is(2002000));
        assertThat(CONVERTER_BL.pointToIndex(new Point(1000, -2300)), is(2003000));

        assertThat(CONVERTER_BL.pointToIndex(new Point(-1000, -1300)), is(4002000));
        assertThat(CONVERTER_BL.pointToIndex(new Point(0, -1300)), is(4003000));
        assertThat(CONVERTER_BL.pointToIndex(new Point(1000, -1300)), is(4004000));
    }
}

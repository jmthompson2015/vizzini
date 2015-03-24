package org.vizzini.example.boardgame.hexchess;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;

import org.junit.Test;

/**
 * Provides tests for the <code>HexChessPosition</code> class.
 */
public final class HexChessPositionTest
{
    /**
     * Test the <code>computeIndex()</code> method.
     */
    @Test
    public void computeIndexAxial()
    {
        assertThat(HexChessPosition.computeIndex(-5, 5), is(0));
        assertThat(HexChessPosition.computeIndex(5, -5), is(120));

        assertNull(HexChessPosition.computeIndex(-6, 0));
        assertNull(HexChessPosition.computeIndex(6, 0));
        assertNull(HexChessPosition.computeIndex(0, 6));
        assertNull(HexChessPosition.computeIndex(0, -6));
    }

    /**
     * Test the <code>computeIndex()</code> method.
     */
    @Test
    public void computeIndexCube()
    {
        assertThat(HexChessPosition.computeIndex(-5, 0, 5), is(0));
        assertThat(HexChessPosition.computeIndex(5, 0, -5), is(120));

        assertNull(HexChessPosition.computeIndex(-6, 0, 0));
        assertNull(HexChessPosition.computeIndex(6, 0, 0));
        assertNull(HexChessPosition.computeIndex(0, 0, 6));
        assertNull(HexChessPosition.computeIndex(0, 0, -6));
        assertNull(HexChessPosition.computeIndex(0, 1, 0));
    }

    /**
     * Test the <code>distance()</code> method.
     */
    @Test
    public void distance()
    {
        assertThat(HexChessPosition.a1.distance(HexChessPosition.a2), is(1));
        assertThat(HexChessPosition.a1.distance(HexChessPosition.a3), is(2));

        assertThat(HexChessPosition.a1.distance(HexChessPosition.l1), is(10));

        assertThat(HexChessPosition.f1.distance(HexChessPosition.f11), is(10));

        assertThat(HexChessPosition.f6.distance(HexChessPosition.a1), is(5));
        assertThat(HexChessPosition.f6.distance(HexChessPosition.f1), is(5));
        assertThat(HexChessPosition.f6.distance(HexChessPosition.l1), is(5));
        assertThat(HexChessPosition.f6.distance(HexChessPosition.l6), is(5));
        assertThat(HexChessPosition.f6.distance(HexChessPosition.f11), is(5));
        assertThat(HexChessPosition.f6.distance(HexChessPosition.a6), is(5));
    }

    /**
     * Test the <code>findByCoordinates()</code> method.
     */
    @Test
    public void findByCoordinatesAxial()
    {
        assertThat(HexChessPosition.findByCoordinates(-5, 5), is(HexChessPosition.a1));
        assertThat(HexChessPosition.findByCoordinates(-4, 5), is(HexChessPosition.b1));
        assertThat(HexChessPosition.findByCoordinates(-3, 5), is(HexChessPosition.c1));
        assertThat(HexChessPosition.findByCoordinates(-2, 5), is(HexChessPosition.d1));
        assertThat(HexChessPosition.findByCoordinates(-1, 5), is(HexChessPosition.e1));
        assertThat(HexChessPosition.findByCoordinates(0, 5), is(HexChessPosition.f1));
        assertThat(HexChessPosition.findByCoordinates(1, 4), is(HexChessPosition.g1));
        assertThat(HexChessPosition.findByCoordinates(2, 3), is(HexChessPosition.h1));
        assertThat(HexChessPosition.findByCoordinates(3, 2), is(HexChessPosition.i1));
        assertThat(HexChessPosition.findByCoordinates(4, 1), is(HexChessPosition.k1));
        assertThat(HexChessPosition.findByCoordinates(5, 0), is(HexChessPosition.l1));

        assertThat(HexChessPosition.findByCoordinates(-5, 0), is(HexChessPosition.a6));
        assertThat(HexChessPosition.findByCoordinates(-4, -1), is(HexChessPosition.b7));
        assertThat(HexChessPosition.findByCoordinates(-3, -2), is(HexChessPosition.c8));
        assertThat(HexChessPosition.findByCoordinates(-2, -3), is(HexChessPosition.d9));
        assertThat(HexChessPosition.findByCoordinates(-1, -4), is(HexChessPosition.e10));
        assertThat(HexChessPosition.findByCoordinates(0, -5), is(HexChessPosition.f11));
        assertThat(HexChessPosition.findByCoordinates(1, -5), is(HexChessPosition.g10));
        assertThat(HexChessPosition.findByCoordinates(2, -5), is(HexChessPosition.h9));
        assertThat(HexChessPosition.findByCoordinates(3, -5), is(HexChessPosition.i8));
        assertThat(HexChessPosition.findByCoordinates(4, -5), is(HexChessPosition.k7));
        assertThat(HexChessPosition.findByCoordinates(5, -5), is(HexChessPosition.l6));

        assertNull(HexChessPosition.findByCoordinates(-6, 0));
        assertNull(HexChessPosition.findByCoordinates(0, -6));
        assertNull(HexChessPosition.findByCoordinates(6, 0));
        assertNull(HexChessPosition.findByCoordinates(0, 6));
    }

    /**
     * Test the <code>findByCoordinates()</code> method.
     */
    @Test
    public void findByCoordinatesCube()
    {
        assertThat(HexChessPosition.findByCoordinates(-5, 0, 5), is(HexChessPosition.a1));
        assertThat(HexChessPosition.findByCoordinates(-4, -1, 5), is(HexChessPosition.b1));
        assertThat(HexChessPosition.findByCoordinates(-3, -2, 5), is(HexChessPosition.c1));
        assertThat(HexChessPosition.findByCoordinates(-2, -3, 5), is(HexChessPosition.d1));
        assertThat(HexChessPosition.findByCoordinates(-1, -4, 5), is(HexChessPosition.e1));
        assertThat(HexChessPosition.findByCoordinates(0, -5, 5), is(HexChessPosition.f1));
        assertThat(HexChessPosition.findByCoordinates(1, -5, 4), is(HexChessPosition.g1));
        assertThat(HexChessPosition.findByCoordinates(2, -5, 3), is(HexChessPosition.h1));
        assertThat(HexChessPosition.findByCoordinates(3, -5, 2), is(HexChessPosition.i1));
        assertThat(HexChessPosition.findByCoordinates(4, -5, 1), is(HexChessPosition.k1));
        assertThat(HexChessPosition.findByCoordinates(5, -5, 0), is(HexChessPosition.l1));

        assertThat(HexChessPosition.findByCoordinates(-5, 5, 0), is(HexChessPosition.a6));
        assertThat(HexChessPosition.findByCoordinates(-4, 5, -1), is(HexChessPosition.b7));
        assertThat(HexChessPosition.findByCoordinates(-3, 5, -2), is(HexChessPosition.c8));
        assertThat(HexChessPosition.findByCoordinates(-2, 5, -3), is(HexChessPosition.d9));
        assertThat(HexChessPosition.findByCoordinates(-1, 5, -4), is(HexChessPosition.e10));
        assertThat(HexChessPosition.findByCoordinates(0, 5, -5), is(HexChessPosition.f11));
        assertThat(HexChessPosition.findByCoordinates(1, 4, -5), is(HexChessPosition.g10));
        assertThat(HexChessPosition.findByCoordinates(2, 3, -5), is(HexChessPosition.h9));
        assertThat(HexChessPosition.findByCoordinates(3, 2, -5), is(HexChessPosition.i8));
        assertThat(HexChessPosition.findByCoordinates(4, 1, -5), is(HexChessPosition.k7));
        assertThat(HexChessPosition.findByCoordinates(5, 0, -5), is(HexChessPosition.l6));

        assertNull(HexChessPosition.findByCoordinates(-6, 0, 0));
        assertNull(HexChessPosition.findByCoordinates(0, 0, -6));
        assertNull(HexChessPosition.findByCoordinates(6, 0, 0));
        assertNull(HexChessPosition.findByCoordinates(0, 0, 6));
    }

    /**
     * Test the <code>findByCoordinates()</code> method.
     */
    @Test
    public void findByCoordinatesPerformance()
    {
        // Run / Verify.
        final long start = System.currentTimeMillis();

        for (int r = -5; r < 6; r++)
        {
            for (int q = -5; q < 6; q++)
            {
                final HexChessPosition result = HexChessPosition.findByCoordinates(q, r);

                if (HexChessPosition.isUsable(q, r))
                {
                    assertNotNull("used q, r = " + q + ", " + r, result);
                }
                else
                {
                    assertNull("unused q, r = " + q + ", " + r, result);
                }
            }
        }

        final long end = System.currentTimeMillis();
        final long threshold = 15;
        System.out.println("HexChessPosition findByCoordinates() performance: " + (end - start) + " ms");
        assertTrue("findByCoordinates() exceeded performance threshold (" + threshold + "): " + (end - start),
                (end - start) < threshold);
    }

    /**
     * Test the <code>findByIndex()</code> method.
     */
    @Test
    public void findByIndex()
    {
        assertThat(HexChessPosition.findByIndex(0), is(HexChessPosition.a1));
        assertThat(HexChessPosition.findByIndex(1), is(HexChessPosition.b1));
        assertThat(HexChessPosition.findByIndex(2), is(HexChessPosition.c1));
        assertThat(HexChessPosition.findByIndex(3), is(HexChessPosition.d1));
        assertThat(HexChessPosition.findByIndex(4), is(HexChessPosition.e1));
        assertThat(HexChessPosition.findByIndex(5), is(HexChessPosition.f1));
        assertThat(HexChessPosition.findByIndex(17), is(HexChessPosition.g1));
        assertThat(HexChessPosition.findByIndex(29), is(HexChessPosition.h1));
        assertThat(HexChessPosition.findByIndex(41), is(HexChessPosition.i1));
        assertThat(HexChessPosition.findByIndex(53), is(HexChessPosition.k1));
        assertThat(HexChessPosition.findByIndex(65), is(HexChessPosition.l1));

        assertThat(HexChessPosition.findByIndex(55), is(HexChessPosition.a6));
        assertThat(HexChessPosition.findByIndex(67), is(HexChessPosition.b7));
        assertThat(HexChessPosition.findByIndex(79), is(HexChessPosition.c8));
        assertThat(HexChessPosition.findByIndex(91), is(HexChessPosition.d9));
        assertThat(HexChessPosition.findByIndex(103), is(HexChessPosition.e10));
        assertThat(HexChessPosition.findByIndex(115), is(HexChessPosition.f11));
        assertThat(HexChessPosition.findByIndex(116), is(HexChessPosition.g10));
        assertThat(HexChessPosition.findByIndex(117), is(HexChessPosition.h9));
        assertThat(HexChessPosition.findByIndex(118), is(HexChessPosition.i8));
        assertThat(HexChessPosition.findByIndex(119), is(HexChessPosition.k7));
        assertThat(HexChessPosition.findByIndex(120), is(HexChessPosition.l6));

        assertNull(HexChessPosition.findByIndex(null));
        assertNull(HexChessPosition.findByIndex(-1));
        assertNull(HexChessPosition.findByIndex(121));
    }

    /**
     * Test the <code>findByIndex()</code> method.
     */
    @Test
    public void findByIndexPerformance()
    {
        // Run / Verify.
        final long start = System.currentTimeMillis();

        for (int i = 0; i < 121; i++)
        {
            final HexChessPosition result = HexChessPosition.findByIndex(i);

            if (HexChessPosition.isUsable(i))
            {
                assertNotNull("used i = " + i, result);
            }
            else
            {
                assertNull("unused i = " + i, result);
            }
        }

        final long end = System.currentTimeMillis();
        final long threshold = 15;
        System.out.println("HexChessPosition findByIndex() performance: " + (end - start) + " ms");
        assertTrue("findByIndex() exceeded performance threshold (" + threshold + "): " + (end - start),
                (end - start) < threshold);
    }

    /**
     * Test the <code>getIndex()</code> method.
     */
    @Test
    public void getIndex()
    {
        assertThat(HexChessPosition.a1.getIndex(), is(0));
        assertThat(HexChessPosition.b1.getIndex(), is(1));
        assertThat(HexChessPosition.c1.getIndex(), is(2));
        assertThat(HexChessPosition.d1.getIndex(), is(3));
        assertThat(HexChessPosition.e1.getIndex(), is(4));
        assertThat(HexChessPosition.f1.getIndex(), is(5));
        assertThat(HexChessPosition.g1.getIndex(), is(17));
        assertThat(HexChessPosition.h1.getIndex(), is(29));
        assertThat(HexChessPosition.i1.getIndex(), is(41));
        assertThat(HexChessPosition.k1.getIndex(), is(53));
        assertThat(HexChessPosition.l1.getIndex(), is(65));

        assertThat(HexChessPosition.a6.getIndex(), is(55));
        assertThat(HexChessPosition.b7.getIndex(), is(67));
        assertThat(HexChessPosition.c8.getIndex(), is(79));
        assertThat(HexChessPosition.d9.getIndex(), is(91));
        assertThat(HexChessPosition.e10.getIndex(), is(103));
        assertThat(HexChessPosition.f11.getIndex(), is(115));
        assertThat(HexChessPosition.g10.getIndex(), is(116));
        assertThat(HexChessPosition.h9.getIndex(), is(117));
        assertThat(HexChessPosition.i8.getIndex(), is(118));
        assertThat(HexChessPosition.k7.getIndex(), is(119));
        assertThat(HexChessPosition.l6.getIndex(), is(120));
    }

    /**
     * Test the <code>getQ()</code> method.
     */
    @Test
    public void getQ()
    {
        assertThat(HexChessPosition.a1.getQ(), is(-5));
        assertThat(HexChessPosition.b1.getQ(), is(-4));
        assertThat(HexChessPosition.c1.getQ(), is(-3));
        assertThat(HexChessPosition.d1.getQ(), is(-2));
        assertThat(HexChessPosition.e1.getQ(), is(-1));
        assertThat(HexChessPosition.f1.getQ(), is(0));
        assertThat(HexChessPosition.g1.getQ(), is(1));
        assertThat(HexChessPosition.h1.getQ(), is(2));
        assertThat(HexChessPosition.i1.getQ(), is(3));
        assertThat(HexChessPosition.k1.getQ(), is(4));
        assertThat(HexChessPosition.l1.getQ(), is(5));

        assertThat(HexChessPosition.a6.getQ(), is(-5));
        assertThat(HexChessPosition.b7.getQ(), is(-4));
        assertThat(HexChessPosition.c8.getQ(), is(-3));
        assertThat(HexChessPosition.d9.getQ(), is(-2));
        assertThat(HexChessPosition.e10.getQ(), is(-1));
        assertThat(HexChessPosition.f11.getQ(), is(0));
        assertThat(HexChessPosition.g10.getQ(), is(1));
        assertThat(HexChessPosition.h9.getQ(), is(2));
        assertThat(HexChessPosition.i8.getQ(), is(3));
        assertThat(HexChessPosition.k7.getQ(), is(4));
        assertThat(HexChessPosition.l6.getQ(), is(5));
    }

    /**
     * Test the <code>getR()</code> method.
     */
    @Test
    public void getR()
    {
        assertThat(HexChessPosition.a1.getR(), is(5));
        assertThat(HexChessPosition.b1.getR(), is(5));
        assertThat(HexChessPosition.c1.getR(), is(5));
        assertThat(HexChessPosition.d1.getR(), is(5));
        assertThat(HexChessPosition.e1.getR(), is(5));
        assertThat(HexChessPosition.f1.getR(), is(5));
        assertThat(HexChessPosition.g1.getR(), is(4));
        assertThat(HexChessPosition.h1.getR(), is(3));
        assertThat(HexChessPosition.i1.getR(), is(2));
        assertThat(HexChessPosition.k1.getR(), is(1));
        assertThat(HexChessPosition.l1.getR(), is(0));

        assertThat(HexChessPosition.a6.getR(), is(0));
        assertThat(HexChessPosition.b7.getR(), is(-1));
        assertThat(HexChessPosition.c8.getR(), is(-2));
        assertThat(HexChessPosition.d9.getR(), is(-3));
        assertThat(HexChessPosition.e10.getR(), is(-4));
        assertThat(HexChessPosition.f11.getR(), is(-5));
        assertThat(HexChessPosition.g10.getR(), is(-5));
        assertThat(HexChessPosition.h9.getR(), is(-5));
        assertThat(HexChessPosition.i8.getR(), is(-5));
        assertThat(HexChessPosition.k7.getR(), is(-5));
        assertThat(HexChessPosition.l6.getR(), is(-5));
    }

    /**
     * Test the <code>getX()</code> method.
     */
    @Test
    public void getX()
    {
        assertThat(HexChessPosition.a1.getX(), is(-5));
        assertThat(HexChessPosition.b1.getX(), is(-4));
        assertThat(HexChessPosition.c1.getX(), is(-3));
        assertThat(HexChessPosition.d1.getX(), is(-2));
        assertThat(HexChessPosition.e1.getX(), is(-1));
        assertThat(HexChessPosition.f1.getX(), is(0));
        assertThat(HexChessPosition.g1.getX(), is(1));
        assertThat(HexChessPosition.h1.getX(), is(2));
        assertThat(HexChessPosition.i1.getX(), is(3));
        assertThat(HexChessPosition.k1.getX(), is(4));
        assertThat(HexChessPosition.l1.getX(), is(5));

        assertThat(HexChessPosition.a6.getX(), is(-5));
        assertThat(HexChessPosition.b7.getX(), is(-4));
        assertThat(HexChessPosition.c8.getX(), is(-3));
        assertThat(HexChessPosition.d9.getX(), is(-2));
        assertThat(HexChessPosition.e10.getX(), is(-1));
        assertThat(HexChessPosition.f11.getX(), is(0));
        assertThat(HexChessPosition.g10.getX(), is(1));
        assertThat(HexChessPosition.h9.getX(), is(2));
        assertThat(HexChessPosition.i8.getX(), is(3));
        assertThat(HexChessPosition.k7.getX(), is(4));
        assertThat(HexChessPosition.l6.getX(), is(5));
    }

    /**
     * Test the <code>getY()</code> method.
     */
    @Test
    public void getY()
    {
        assertThat(HexChessPosition.a1.getY(), is(0));
        assertThat(HexChessPosition.b1.getY(), is(-1));
        assertThat(HexChessPosition.c1.getY(), is(-2));
        assertThat(HexChessPosition.d1.getY(), is(-3));
        assertThat(HexChessPosition.e1.getY(), is(-4));
        assertThat(HexChessPosition.f1.getY(), is(-5));
        assertThat(HexChessPosition.g1.getY(), is(-5));
        assertThat(HexChessPosition.h1.getY(), is(-5));
        assertThat(HexChessPosition.i1.getY(), is(-5));
        assertThat(HexChessPosition.k1.getY(), is(-5));
        assertThat(HexChessPosition.l1.getY(), is(-5));

        assertThat(HexChessPosition.a6.getY(), is(5));
        assertThat(HexChessPosition.b7.getY(), is(5));
        assertThat(HexChessPosition.c8.getY(), is(5));
        assertThat(HexChessPosition.d9.getY(), is(5));
        assertThat(HexChessPosition.e10.getY(), is(5));
        assertThat(HexChessPosition.f11.getY(), is(5));
        assertThat(HexChessPosition.g10.getY(), is(4));
        assertThat(HexChessPosition.h9.getY(), is(3));
        assertThat(HexChessPosition.i8.getY(), is(2));
        assertThat(HexChessPosition.k7.getY(), is(1));
        assertThat(HexChessPosition.l6.getY(), is(0));
    }

    /**
     * Test the <code>getZ()</code> method.
     */
    @Test
    public void getZ()
    {
        assertThat(HexChessPosition.a1.getZ(), is(5));
        assertThat(HexChessPosition.b1.getZ(), is(5));
        assertThat(HexChessPosition.c1.getZ(), is(5));
        assertThat(HexChessPosition.d1.getZ(), is(5));
        assertThat(HexChessPosition.e1.getZ(), is(5));
        assertThat(HexChessPosition.f1.getZ(), is(5));
        assertThat(HexChessPosition.g1.getZ(), is(4));
        assertThat(HexChessPosition.h1.getZ(), is(3));
        assertThat(HexChessPosition.i1.getZ(), is(2));
        assertThat(HexChessPosition.k1.getZ(), is(1));
        assertThat(HexChessPosition.l1.getZ(), is(0));

        assertThat(HexChessPosition.a6.getZ(), is(0));
        assertThat(HexChessPosition.b7.getZ(), is(-1));
        assertThat(HexChessPosition.c8.getZ(), is(-2));
        assertThat(HexChessPosition.d9.getZ(), is(-3));
        assertThat(HexChessPosition.e10.getZ(), is(-4));
        assertThat(HexChessPosition.f11.getZ(), is(-5));
        assertThat(HexChessPosition.g10.getZ(), is(-5));
        assertThat(HexChessPosition.h9.getZ(), is(-5));
        assertThat(HexChessPosition.i8.getZ(), is(-5));
        assertThat(HexChessPosition.k7.getZ(), is(-5));
        assertThat(HexChessPosition.l6.getZ(), is(-5));
    }

    /**
     * Test the <code>isUsable()</code> method.
     */
    @Test
    public void isUsable()
    {
        // Run / Verify.
        // Bottom perimeter.
        assertTrue(HexChessPosition.isUsable(-5, 5));
        assertTrue(HexChessPosition.isUsable(-4, 5));
        assertTrue(HexChessPosition.isUsable(-3, 5));
        assertTrue(HexChessPosition.isUsable(-2, 5));
        assertTrue(HexChessPosition.isUsable(-1, 5));
        assertTrue(HexChessPosition.isUsable(0, 5));
        assertTrue(HexChessPosition.isUsable(1, 4));
        assertTrue(HexChessPosition.isUsable(2, 3));
        assertTrue(HexChessPosition.isUsable(3, 2));
        assertTrue(HexChessPosition.isUsable(4, 1));
        assertTrue(HexChessPosition.isUsable(5, 0));

        // Center.
        assertTrue(HexChessPosition.isUsable(0, 0));

        // Top perimeter.
        assertTrue(HexChessPosition.isUsable(-5, 0));
        assertTrue(HexChessPosition.isUsable(-4, -1));
        assertTrue(HexChessPosition.isUsable(-3, -2));
        assertTrue(HexChessPosition.isUsable(-2, -3));
        assertTrue(HexChessPosition.isUsable(-1, -4));
        assertTrue(HexChessPosition.isUsable(0, -5));
        assertTrue(HexChessPosition.isUsable(1, -5));
        assertTrue(HexChessPosition.isUsable(2, -5));
        assertTrue(HexChessPosition.isUsable(3, -5));
        assertTrue(HexChessPosition.isUsable(4, -5));
        assertTrue(HexChessPosition.isUsable(5, -5));

        assertFalse(HexChessPosition.isUsable(1, 5));
        assertFalse(HexChessPosition.isUsable(2, 4));
        assertFalse(HexChessPosition.isUsable(3, 3));
        assertFalse(HexChessPosition.isUsable(4, 2));
        assertFalse(HexChessPosition.isUsable(5, 1));

        assertFalse(HexChessPosition.isUsable(-5, -1));
        assertFalse(HexChessPosition.isUsable(-4, -2));
        assertFalse(HexChessPosition.isUsable(-3, -3));
        assertFalse(HexChessPosition.isUsable(-2, -4));
        assertFalse(HexChessPosition.isUsable(-1, -5));
    }

    /**
     * Test the <code>values()</code> method.
     */
    @Test
    public void values()
    {
        final HexChessPosition[] values = HexChessPosition.values();

        assertNotNull(values);
        assertThat(values.length, is(91));

        int count = 0;

        for (int r = -5; r < 6; r++)
        {
            for (int q = -5; q < 6; q++)
            {
                final HexChessPosition result = HexChessPosition.findByCoordinates(q, r);

                if (result != null)
                {
                    count++;
                }

                if (HexChessPosition.isUsable(q, r))
                {
                    assertNotNull("used q, r = " + q + ", " + r, result);
                }
                else
                {
                    assertNull("unused q, r = " + q + ", " + r, result);
                }
            }
        }

        assertThat(count, is(91));
    }
}

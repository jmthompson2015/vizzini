package org.vizzini.chess;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;

import org.junit.Test;

/**
 * Provides tests for the <code>DirectionType</code> class.
 */
public final class DirectionTypeTest
{
    /**
     * Test the <code>getBiaxialDirections()</code> method.
     */
    @Test
    public void getBiaxialDirections()
    {
        final DirectionType[] biaxials = DirectionType.getBiaxialDirections();

        assertNotNull(biaxials);
        assertThat(biaxials.length, is(12));

        assertThat(biaxials[0], is(DirectionType.DIR45));
        assertThat(biaxials[1], is(DirectionType.DIR135));
        assertThat(biaxials[2], is(DirectionType.DIR225));
        assertThat(biaxials[3], is(DirectionType.DIR315));

        assertThat(biaxials[4], is(DirectionType.UP0));
        assertThat(biaxials[5], is(DirectionType.UP90));
        assertThat(biaxials[6], is(DirectionType.UP180));
        assertThat(biaxials[7], is(DirectionType.UP270));

        assertThat(biaxials[8], is(DirectionType.DOWN0));
        assertThat(biaxials[9], is(DirectionType.DOWN90));
        assertThat(biaxials[10], is(DirectionType.DOWN180));
        assertThat(biaxials[11], is(DirectionType.DOWN270));
    }

    /**
     * Test the <code>getTriaxialDirections()</code> method.
     */
    @Test
    public void getTriaxialDirections()
    {
        final DirectionType[] triaxials = DirectionType.getTriaxialDirections();

        assertNotNull(triaxials);
        assertThat(triaxials.length, is(8));

        assertThat(triaxials[0], is(DirectionType.UP45));
        assertThat(triaxials[1], is(DirectionType.UP135));
        assertThat(triaxials[2], is(DirectionType.UP225));
        assertThat(triaxials[3], is(DirectionType.UP315));

        assertThat(triaxials[4], is(DirectionType.DOWN45));
        assertThat(triaxials[5], is(DirectionType.DOWN135));
        assertThat(triaxials[6], is(DirectionType.DOWN225));
        assertThat(triaxials[7], is(DirectionType.DOWN315));
    }

    /**
     * Test the <code>getUniaxialDirections()</code> method.
     */
    @Test
    public void getUniaxialDirections()
    {
        final DirectionType[] uniaxials = DirectionType.getUniaxialDirections();

        assertNotNull(uniaxials);
        assertThat(uniaxials.length, is(6));

        assertThat(uniaxials[0], is(DirectionType.DIR0));
        assertThat(uniaxials[1], is(DirectionType.DIR90));
        assertThat(uniaxials[2], is(DirectionType.DIR180));
        assertThat(uniaxials[3], is(DirectionType.DIR270));
        assertThat(uniaxials[4], is(DirectionType.UP));
        assertThat(uniaxials[5], is(DirectionType.DOWN));
    }

    /**
     * Test the <code>isBiaxial()</code> method.
     */
    @Test
    public void isBiaxial()
    {
        // Uniaxial.
        assertFalse(DirectionType.isBiaxial(1, 0, 0));
        assertFalse(DirectionType.isBiaxial(0, 1, 0));
        assertFalse(DirectionType.isBiaxial(0, 0, 1));

        assertFalse(DirectionType.isBiaxial(-1, 0, 0));
        assertFalse(DirectionType.isBiaxial(0, -1, 0));
        assertFalse(DirectionType.isBiaxial(0, 0, -1));

        // Biaxial
        assertTrue(DirectionType.isBiaxial(1, 1, 0));
        assertTrue(DirectionType.isBiaxial(1, 0, 1));
        assertTrue(DirectionType.isBiaxial(0, 1, 1));

        assertTrue(DirectionType.isBiaxial(-1, -1, 0));
        assertTrue(DirectionType.isBiaxial(-1, 0, -1));
        assertTrue(DirectionType.isBiaxial(0, -1, -1));

        // Triaxial.
        assertFalse(DirectionType.isBiaxial(1, 1, 1));

        assertFalse(DirectionType.isBiaxial(-1, -1, -1));
    }

    /**
     * Test the <code>isTriaxial()</code> method.
     */
    @Test
    public void isTriaxial()
    {
        // Uniaxial.
        assertFalse(DirectionType.isTriaxial(1, 0, 0));
        assertFalse(DirectionType.isTriaxial(0, 1, 0));
        assertFalse(DirectionType.isTriaxial(0, 0, 1));

        assertFalse(DirectionType.isTriaxial(-1, 0, 0));
        assertFalse(DirectionType.isTriaxial(0, -1, 0));
        assertFalse(DirectionType.isTriaxial(0, 0, -1));

        // Biaxial
        assertFalse(DirectionType.isTriaxial(1, 1, 0));
        assertFalse(DirectionType.isTriaxial(1, 0, 1));
        assertFalse(DirectionType.isTriaxial(0, 1, 1));

        assertFalse(DirectionType.isTriaxial(-1, -1, 0));
        assertFalse(DirectionType.isTriaxial(-1, 0, -1));
        assertFalse(DirectionType.isTriaxial(0, -1, -1));

        // Triaxial.
        assertTrue(DirectionType.isTriaxial(1, 1, 1));

        assertTrue(DirectionType.isTriaxial(-1, -1, -1));
    }

    /**
     * Test the <code>isUniaxial()</code> method.
     */
    @Test
    public void isUniaxial()
    {
        // Uniaxial.
        assertTrue(DirectionType.isUniaxial(1, 0, 0));
        assertTrue(DirectionType.isUniaxial(0, 1, 0));
        assertTrue(DirectionType.isUniaxial(0, 0, 1));

        assertTrue(DirectionType.isUniaxial(-1, 0, 0));
        assertTrue(DirectionType.isUniaxial(0, -1, 0));
        assertTrue(DirectionType.isUniaxial(0, 0, -1));

        // Biaxial
        assertFalse(DirectionType.isUniaxial(1, 1, 0));
        assertFalse(DirectionType.isUniaxial(1, 0, 1));
        assertFalse(DirectionType.isUniaxial(0, 1, 1));

        assertFalse(DirectionType.isUniaxial(-1, -1, 0));
        assertFalse(DirectionType.isUniaxial(-1, 0, -1));
        assertFalse(DirectionType.isUniaxial(0, -1, -1));

        // Triaxial.
        assertFalse(DirectionType.isUniaxial(1, 1, 1));

        assertFalse(DirectionType.isUniaxial(-1, -1, -1));
    }

    /**
     * Test the <code>values()</code> method.
     */
    @Test
    public void testValues()
    {
        assertThat(DirectionType.values().length, is(8 + 9 + 9));

        int countUp = 0;
        int countPlanar = 0;
        int countDown = 0;

        for (final DirectionType direction : DirectionType.values())
        {
            switch (direction.getDz())
            {
            case 1:
                countUp++;
                break;
            case 0:
                countPlanar++;
                break;
            case -1:
                countDown++;
                break;

            default:
                throw new RuntimeException("Unknown dz value: " + direction.getDz());
            }
        }

        assertThat(countUp, is(9));
        assertThat(countPlanar, is(8));
        assertThat(countDown, is(9));

        final int axials = DirectionType.getUniaxialDirections().length + DirectionType.getBiaxialDirections().length
                + DirectionType.getTriaxialDirections().length;
        assertThat(axials, is(DirectionType.values().length));
    }
}

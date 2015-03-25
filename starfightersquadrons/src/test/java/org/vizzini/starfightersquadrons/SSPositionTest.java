package org.vizzini.starfightersquadrons;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;

import org.junit.Test;

/**
 * Provides tests for the <code>SSPosition</code> class.
 */
public final class SSPositionTest
{
    /**
     * Test the <code>computeBearing()</code> method.
     */
    @Test
    public void computeBearing()
    {
        // Setup.
        final int x = 10;
        final int y = 10;
        final SSPosition position = new SSPosition(x, y, 0);

        // Run / Verify.
        assertThat(position.computeBearing(x + 1, y + 0), is(0));
        assertThat(position.computeBearing(x + 1, y + 1), is(45));
        assertThat(position.computeBearing(x - 0, y + 1), is(90));
        assertThat(position.computeBearing(x - 1, y + 1), is(135));
        assertThat(position.computeBearing(x - 1, y - 0), is(180));
        assertThat(position.computeBearing(x - 1, y - 1), is(225));
        assertThat(position.computeBearing(x + 0, y - 1), is(270));
        assertThat(position.computeBearing(x + 1, y - 1), is(315));
    }

    /**
     * Test the <code>computeBearing()</code> method.
     */
    @Test
    public void computeBearingPosition()
    {
        // Setup.
        final int x = 10;
        final int y = 10;
        final SSPosition position = new SSPosition(x, y, 0);

        // Run / Verify.
        assertThat(position.computeBearing(new SSPosition(x + 1, y + 0, 0)), is(0));
        assertThat(position.computeBearing(new SSPosition(x + 1, y + 1, 0)), is(45));
        assertThat(position.computeBearing(new SSPosition(x - 0, y + 1, 0)), is(90));
        assertThat(position.computeBearing(new SSPosition(x - 1, y + 1, 0)), is(135));
        assertThat(position.computeBearing(new SSPosition(x - 1, y - 0, 0)), is(180));
        assertThat(position.computeBearing(new SSPosition(x - 1, y - 1, 0)), is(225));
        assertThat(position.computeBearing(new SSPosition(x + 0, y - 1, 0)), is(270));
        assertThat(position.computeBearing(new SSPosition(x + 1, y - 1, 0)), is(315));
    }

    /**
     * Test the <code>computeBearing()</code> method.
     */
    @Test
    public void computeBearingPosition0()
    {
        // Setup.
        final SSPosition position0 = new SSPosition(1, 2, 0);
        final SSPosition position1 = new SSPosition(position0.getX() + 1, position0.getY() + 1, 0);
        final SSPosition position2 = new SSPosition(position0.getX() - 1, position0.getY() + 1, 0);
        final SSPosition position3 = new SSPosition(position0.getX() - 1, position0.getY() - 1, 0);
        final SSPosition position4 = new SSPosition(position0.getX() + 1, position0.getY() - 1, 0);

        // Run / Verify.
        assertThat(position0.computeBearing(position1), is(45));
        assertThat(position0.computeBearing(position2), is(135));
        assertThat(position0.computeBearing(position3), is(225));
        assertThat(position0.computeBearing(position4), is(315));
    }

    /**
     * Test the <code>computeBearing()</code> method.
     */
    @Test
    public void computeBearingPosition30()
    {
        // Setup.
        final SSPosition position0 = new SSPosition(1, 2, 30);
        final SSPosition position1 = new SSPosition(position0.getX() + 1, position0.getY() + 1, 0);
        final SSPosition position2 = new SSPosition(position0.getX() - 1, position0.getY() + 1, 0);
        final SSPosition position3 = new SSPosition(position0.getX() - 1, position0.getY() - 1, 0);
        final SSPosition position4 = new SSPosition(position0.getX() + 1, position0.getY() - 1, 0);

        // Run / Verify.
        assertThat(position0.computeBearing(position1), is(15));
        assertThat(position0.computeBearing(position2), is(105));
        assertThat(position0.computeBearing(position3), is(195));
        assertThat(position0.computeBearing(position4), is(285));
    }

    /**
     * Test the <code>computeBearing()</code> method.
     */
    @Test
    public void computeBearingPosition300()
    {
        // Setup.
        final SSPosition position0 = new SSPosition(1, 2, 300);
        final SSPosition position1 = new SSPosition(position0.getX() + 1, position0.getY() + 1, 0);
        final SSPosition position2 = new SSPosition(position0.getX() - 1, position0.getY() + 1, 0);
        final SSPosition position3 = new SSPosition(position0.getX() - 1, position0.getY() - 1, 0);
        final SSPosition position4 = new SSPosition(position0.getX() + 1, position0.getY() - 1, 0);

        // Run / Verify.
        assertThat(position0.computeBearing(position1), is(105));
        assertThat(position0.computeBearing(position2), is(195));
        assertThat(position0.computeBearing(position3), is(285));
        assertThat(position0.computeBearing(position4), is(15));
    }

    /**
     * Test the <code>computeDistance()</code> method.
     */
    @Test
    public void computeDistance()
    {
        // Setup.
        final SSPosition position0 = new SSPosition(100, 200, 0);
        final SSPosition position1 = new SSPosition(position0.getX() + 100, position0.getY() + 1, 0);
        final SSPosition position2 = new SSPosition(position0.getX() - 50, position0.getY() + 10, 0);
        final SSPosition position3 = new SSPosition(position0.getX() - 10, position0.getY() - 50, 0);
        final SSPosition position4 = new SSPosition(position0.getX() + 1, position0.getY() - 100, 0);

        // Run / Verify.
        assertThat(position0.computeDistance(position1), is(100));
        assertThat(position0.computeDistance(position2), is(51));
        assertThat(position0.computeDistance(position3), is(51));
        assertThat(position0.computeDistance(position4), is(100));
    }

    /**
     * Test the <code>computeHeading()</code> method.
     */
    @Test
    public void computeHeading()
    {
        // Setup.
        final int x = 10;
        final int y = 10;

        // Run / Verify.
        assertThat(SSPosition.computeHeading(x, y, x + 1, y + 0), is(0));
        assertThat(SSPosition.computeHeading(x, y, x + 1, y + 1), is(45));
        assertThat(SSPosition.computeHeading(x, y, x - 0, y + 1), is(90));
        assertThat(SSPosition.computeHeading(x, y, x - 1, y + 1), is(135));
        assertThat(SSPosition.computeHeading(x, y, x - 1, y - 0), is(180));
        assertThat(SSPosition.computeHeading(x, y, x - 1, y - 1), is(225));
        assertThat(SSPosition.computeHeading(x, y, x + 0, y - 1), is(270));
        assertThat(SSPosition.computeHeading(x, y, x + 1, y - 1), is(315));
    }

    /**
     * Test the <code>isInPlayArea()</code> method.
     */
    @Test
    public void isInPlayArea()
    {
        assertFalse(SSPosition.isInPlayArea(-1, 0));
        assertFalse(SSPosition.isInPlayArea(0, -1));
        assertFalse(SSPosition.isInPlayArea(-1, -1));

        assertTrue(SSPosition.isInPlayArea(0, 0));
        assertTrue(SSPosition.isInPlayArea(914, 0));
        assertTrue(SSPosition.isInPlayArea(0, 914));
        assertTrue(SSPosition.isInPlayArea(914, 914));

        assertFalse(SSPosition.isInPlayArea(SSPosition.MAX_X, 0));
        assertFalse(SSPosition.isInPlayArea(0, SSPosition.MAX_Y));
        assertFalse(SSPosition.isInPlayArea(SSPosition.MAX_X, SSPosition.MAX_Y));
    }

    /**
     * Test the <code>isInPlayArea()</code> method.
     */
    @Test
    public void isInPlayAreaPolygon()
    {
        // Setup.
        final Ship ship = Ship.X_WING;
        final ShipBase shipBase = ship.getShipBase();

        // Run / Verify.
        assertFalse(SSPosition.isInPlayArea(shipBase.computePolygon(new SSPosition(0, 0, 0))));
        assertFalse(SSPosition.isInPlayArea(shipBase.computePolygon(new SSPosition(20, 0, 0))));
        assertFalse(SSPosition.isInPlayArea(shipBase.computePolygon(new SSPosition(0, 20, 0))));
        assertTrue(SSPosition.isInPlayArea(shipBase.computePolygon(new SSPosition(20, 20, 0))));

        assertFalse(SSPosition.isInPlayArea(shipBase.computePolygon(new SSPosition(894, 914, 0))));
        assertFalse(SSPosition.isInPlayArea(shipBase.computePolygon(new SSPosition(914, 894, 0))));
        assertTrue(SSPosition.isInPlayArea(shipBase.computePolygon(new SSPosition(894, 894, 0))));
        assertFalse(SSPosition.isInPlayArea(shipBase.computePolygon(new SSPosition(914, 914, 0))));
    }

    /**
     * Test the <code>SSPosition()</code> method.
     */
    @Test
    public void normalizeAngle()
    {
        assertThat(SSPosition.normalizeAngle(0), is(0));
        assertThat(SSPosition.normalizeAngle(90), is(90));
        assertThat(SSPosition.normalizeAngle(180), is(180));
        assertThat(SSPosition.normalizeAngle(270), is(270));

        assertThat(SSPosition.normalizeAngle(360), is(0));
        assertThat(SSPosition.normalizeAngle(360 + 90), is(90));
        assertThat(SSPosition.normalizeAngle(360 + 180), is(180));
        assertThat(SSPosition.normalizeAngle(360 + 270), is(270));

        assertThat(SSPosition.normalizeAngle(-360), is(0));
        assertThat(SSPosition.normalizeAngle(-270), is(90));
        assertThat(SSPosition.normalizeAngle(-180), is(180));
        assertThat(SSPosition.normalizeAngle(-90), is(270));
    }

    /**
     * Test the <code>SSPosition()</code> method.
     */
    @Test
    public void testConstructor()
    {
        // Setup / Run.
        final SSPosition result = new SSPosition(1, 2, 3);

        // Verify.
        assertNotNull(result);
        assertThat(result.getX(), is(1));
        assertThat(result.getY(), is(2));
        assertThat(result.getZ(), is(0));
        assertThat(result.getHeading(), is(3));
    }

    /**
     * Test the <code>SSPosition()</code> method.
     */
    @Test
    public void testConstructorNormalizeAngle()
    {
        // Setup / Run.
        final SSPosition result = new SSPosition(1, 2, -45);

        // Verify.
        assertNotNull(result);
        assertThat(result.getX(), is(1));
        assertThat(result.getY(), is(2));
        assertThat(result.getZ(), is(0));
        assertThat(result.getHeading(), is(315));
    }

    /**
     * Test the <code>SSPosition()</code> method.
     */
    @Test
    public void testConstructorOutOfBounds()
    {
        try
        {
            new SSPosition(-1, 0, 0);
            fail("Should have thrown an exception");
        }
        catch (final IndexOutOfBoundsException e)
        {
            assertThat(e.getMessage(), is("X out of bounds [0, 915): -1"));
        }

        try
        {
            new SSPosition(SSPosition.MAX_X, 0, 0);
            fail("Should have thrown an exception");
        }
        catch (final IndexOutOfBoundsException e)
        {
            assertThat(e.getMessage(), is("X out of bounds [0, 915): 915"));
        }

        try
        {
            new SSPosition(0, -1, 0);
            fail("Should have thrown an exception");
        }
        catch (final IndexOutOfBoundsException e)
        {
            assertThat(e.getMessage(), is("Y out of bounds [0, 915): -1"));
        }

        try
        {
            new SSPosition(0, SSPosition.MAX_Y, 0);
            fail("Should have thrown an exception");
        }
        catch (final IndexOutOfBoundsException e)
        {
            assertThat(e.getMessage(), is("Y out of bounds [0, 915): 915"));
        }
    }
}

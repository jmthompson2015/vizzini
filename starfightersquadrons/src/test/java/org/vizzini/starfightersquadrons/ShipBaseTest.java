package org.vizzini.starfightersquadrons;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;

import java.awt.Polygon;
import java.awt.Rectangle;

import org.junit.Test;
import org.vizzini.starfightersquadrons.ShipBase;
import org.vizzini.starfightersquadrons.SSPosition;

/**
 * Provides tests for the <code>ShipBase</code> class.
 */
public final class ShipBaseTest
{
    /**
     * Test the <code>computePolygon()</code> method.
     */
    @Test
    public void computePolygonLarge0()
    {
        // Setup.
        final int heading = 0;

        // Run.
        final Polygon result = ShipBase.LARGE.computePolygon(heading);

        // Verify.
        assertNotNull(result);
        assertThat(result.npoints, is(5)); // includes closing point
        assertThat(result.xpoints[0], is(-40));
        assertThat(result.ypoints[0], is(-40));
        assertThat(result.xpoints[1], is(40));
        assertThat(result.ypoints[1], is(-40));
        assertThat(result.xpoints[2], is(40));
        assertThat(result.ypoints[2], is(40));
        assertThat(result.xpoints[3], is(-40));
        assertThat(result.ypoints[3], is(40));
        assertThat(result.xpoints[4], is(-40));
        assertThat(result.ypoints[4], is(-40));
    }

    /**
     * Test the <code>computePolygon()</code> method.
     */
    @Test
    public void computePolygonLarge45()
    {
        // Setup.
        final int heading = 45;

        // Run.
        final Polygon result = ShipBase.LARGE.computePolygon(heading);

        // Verify.
        assertNotNull(result);
        assertThat(result.npoints, is(5)); // includes closing point
        assertThat(result.xpoints[0], is(0));
        assertThat(result.ypoints[0], is(-57));
        assertThat(result.xpoints[1], is(57));
        assertThat(result.ypoints[1], is(0));
        assertThat(result.xpoints[2], is(0));
        assertThat(result.ypoints[2], is(57));
        assertThat(result.xpoints[3], is(-57));
        assertThat(result.ypoints[3], is(0));
        assertThat(result.xpoints[4], is(0));
        assertThat(result.ypoints[4], is(-57));
    }

    /**
     * Test the <code>computePolygon()</code> method.
     */
    @Test
    public void computePolygonStandard0()
    {
        // Setup.
        final int heading = 0;

        // Run.
        final Polygon result = ShipBase.STANDARD.computePolygon(heading);

        // Verify.
        assertNotNull(result);
        assertThat(result.npoints, is(5)); // includes closing point
        assertThat(result.xpoints[0], is(-20));
        assertThat(result.ypoints[0], is(-20));
        assertThat(result.xpoints[1], is(20));
        assertThat(result.ypoints[1], is(-20));
        assertThat(result.xpoints[2], is(20));
        assertThat(result.ypoints[2], is(20));
        assertThat(result.xpoints[3], is(-20));
        assertThat(result.ypoints[3], is(20));
        assertThat(result.xpoints[4], is(-20));
        assertThat(result.ypoints[4], is(-20));
    }

    /**
     * Test the <code>computePolygon()</code> method.
     */
    @Test
    public void computePolygonStandard0_0_0()
    {
        // Setup.
        final SSPosition position = new SSPosition(0, 0, 0);

        // Run.
        final Polygon result = ShipBase.STANDARD.computePolygon(position);

        // Verify.
        assertNotNull(result);
        assertThat(result.npoints, is(5)); // includes closing point
        assertThat(result.xpoints[0], is(-20));
        assertThat(result.ypoints[0], is(-20));
        assertThat(result.xpoints[1], is(20));
        assertThat(result.ypoints[1], is(-20));
        assertThat(result.xpoints[2], is(20));
        assertThat(result.ypoints[2], is(20));
        assertThat(result.xpoints[3], is(-20));
        assertThat(result.ypoints[3], is(20));
        assertThat(result.xpoints[4], is(-20));
        assertThat(result.ypoints[4], is(-20));
    }

    /**
     * Test the <code>computePolygon()</code> method.
     */
    @Test
    public void computePolygonStandard0_0_45()
    {
        // Setup.
        final SSPosition position = new SSPosition(0, 0, 45);

        // Run.
        final Polygon result = ShipBase.STANDARD.computePolygon(position);

        // Verify.
        assertNotNull(result);
        assertThat(result.npoints, is(5)); // includes closing point
        assertThat(result.xpoints[0], is(0));
        assertThat(result.ypoints[0], is(-28));
        assertThat(result.xpoints[1], is(28));
        assertThat(result.ypoints[1], is(0));
        assertThat(result.xpoints[2], is(0));
        assertThat(result.ypoints[2], is(28));
        assertThat(result.xpoints[3], is(-28));
        assertThat(result.ypoints[3], is(0));
        assertThat(result.xpoints[4], is(0));
        assertThat(result.ypoints[4], is(-28));
    }

    /**
     * Test the <code>computePolygon()</code> method.
     */
    @Test
    public void computePolygonStandard0OffsetOne()
    {
        // Setup.
        final int heading = 0;

        // Run.
        final Polygon result = ShipBase.STANDARD.computePolygon(heading, 1);

        // Verify.
        assertNotNull(result);
        assertThat(result.npoints, is(5)); // includes closing point
        assertThat(result.xpoints[0], is(-21));
        assertThat(result.ypoints[0], is(-21));
        assertThat(result.xpoints[1], is(21));
        assertThat(result.ypoints[1], is(-21));
        assertThat(result.xpoints[2], is(21));
        assertThat(result.ypoints[2], is(21));
        assertThat(result.xpoints[3], is(-21));
        assertThat(result.ypoints[3], is(21));
        assertThat(result.xpoints[4], is(-21));
        assertThat(result.ypoints[4], is(-21));
    }

    /**
     * Test the <code>computePolygon()</code> method.
     */
    @Test
    public void computePolygonStandard10_20_0()
    {
        // Setup.
        final SSPosition position = new SSPosition(10, 20, 0);

        // Run.
        final Polygon result = ShipBase.STANDARD.computePolygon(position);

        // Verify.
        assertNotNull(result);
        assertThat(result.npoints, is(5)); // includes closing point
        assertThat(result.xpoints[0], is(-10));
        assertThat(result.ypoints[0], is(0));
        assertThat(result.xpoints[1], is(30));
        assertThat(result.ypoints[1], is(0));
        assertThat(result.xpoints[2], is(30));
        assertThat(result.ypoints[2], is(40));
        assertThat(result.xpoints[3], is(-10));
        assertThat(result.ypoints[3], is(40));
        assertThat(result.xpoints[4], is(-10));
        assertThat(result.ypoints[4], is(0));
    }

    /**
     * Test the <code>computePolygon()</code> method.
     */
    @Test
    public void computePolygonStandard10_20_45()
    {
        // Setup.
        final SSPosition position = new SSPosition(10, 20, 45);

        // Run.
        final Polygon result = ShipBase.STANDARD.computePolygon(position);

        // Verify.
        assertNotNull(result);
        assertThat(result.npoints, is(5)); // includes closing point
        assertThat(result.xpoints[0], is(10));
        assertThat(result.ypoints[0], is(-8));
        assertThat(result.xpoints[1], is(38));
        assertThat(result.ypoints[1], is(20));
        assertThat(result.xpoints[2], is(10));
        assertThat(result.ypoints[2], is(48));
        assertThat(result.xpoints[3], is(-18));
        assertThat(result.ypoints[3], is(20));
        assertThat(result.xpoints[4], is(10));
        assertThat(result.ypoints[4], is(-8));
    }

    /**
     * Test the <code>computePolygon()</code> method.
     */
    @Test
    public void computePolygonStandard45()
    {
        // Setup.
        final int heading = 45;

        // Run.
        final Polygon result = ShipBase.STANDARD.computePolygon(heading);

        // Verify.
        assertNotNull(result);
        assertThat(result.npoints, is(5)); // includes closing point
        assertThat(result.xpoints[0], is(0));
        assertThat(result.ypoints[0], is(-28));
        assertThat(result.xpoints[1], is(28));
        assertThat(result.ypoints[1], is(0));
        assertThat(result.xpoints[2], is(0));
        assertThat(result.ypoints[2], is(28));
        assertThat(result.xpoints[3], is(-28));
        assertThat(result.ypoints[3], is(0));
        assertThat(result.xpoints[4], is(0));
        assertThat(result.ypoints[4], is(-28));
    }

    /**
     * Test the <code>computePolygon()</code> method.
     */
    @Test
    public void computePolygonStandard45OffsetOne()
    {
        // Setup.
        final int heading = 45;

        // Run.
        final Polygon result = ShipBase.STANDARD.computePolygon(heading, 1);

        // Verify.
        assertNotNull(result);
        assertThat(result.npoints, is(5)); // includes closing point
        assertThat(result.xpoints[0], is(0));
        assertThat(result.ypoints[0], is(-30));
        assertThat(result.xpoints[1], is(30));
        assertThat(result.ypoints[1], is(0));
        assertThat(result.xpoints[2], is(0));
        assertThat(result.ypoints[2], is(30));
        assertThat(result.xpoints[3], is(-30));
        assertThat(result.ypoints[3], is(0));
        assertThat(result.xpoints[4], is(0));
        assertThat(result.ypoints[4], is(-30));
    }

    /**
     * Test the <code>getRectangle()</code> method.
     */
    @Test
    public void getRectangleLarge()
    {
        // Run.
        final Rectangle result = ShipBase.LARGE.getRectangle();

        // Verify.
        assertNotNull(result);
        assertThat(result.x, is(-40));
        assertThat(result.y, is(-40));
        assertThat(result.width, is(80));
        assertThat(result.height, is(80));
    }

    /**
     * Test the <code>getRectangle()</code> method.
     */
    @Test
    public void getRectangleStandard()
    {
        // Run.
        final Rectangle result = ShipBase.STANDARD.getRectangle();

        // Verify.
        assertNotNull(result);
        assertThat(result.x, is(-20));
        assertThat(result.y, is(-20));
        assertThat(result.width, is(40));
        assertThat(result.height, is(40));
    }

    /**
     * Test the <code>getRectangle()</code> method.
     */
    @Test
    public void getRectangleStandardOffsetOne()
    {
        // Run.
        final Rectangle result = ShipBase.STANDARD.getRectangle(1);

        // Verify.
        assertNotNull(result);
        assertThat(result.x, is(-21));
        assertThat(result.y, is(-21));
        assertThat(result.width, is(42));
        assertThat(result.height, is(42));
    }

    /**
     * Test the <code>getRectangle()</code> method.
     */
    @Test
    public void getRectangleStandardOffsetZero()
    {
        // Run.
        final Rectangle result = ShipBase.STANDARD.getRectangle(0);

        // Verify.
        assertNotNull(result);
        assertThat(result.x, is(-20));
        assertThat(result.y, is(-20));
        assertThat(result.width, is(40));
        assertThat(result.height, is(40));
        assertThat(result, is(ShipBase.STANDARD.getRectangle()));
    }
}

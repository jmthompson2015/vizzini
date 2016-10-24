package org.vizzini.starfightersquadrons;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;

import java.awt.Polygon;
import java.awt.Shape;
import java.awt.geom.Area;
import java.awt.geom.Path2D;
import java.awt.geom.Point2D;
import java.io.StringWriter;
import java.io.Writer;
import java.util.List;

import org.junit.Test;
import org.vizzini.starfightersquadrons.Maneuver;
import org.vizzini.starfightersquadrons.ShapeUtilities;
import org.vizzini.starfightersquadrons.ShipBase;
import org.vizzini.starfightersquadrons.SSPosition;

/**
 * Provides tests for the <code>ShapeUtilities</code> class.
 */
public final class ShapeUtilitiesTest
{
    /**
     * Test the <code>asList()</code> method.
     */
    @Test
    public void asList()
    {
        // Setup.
        final SSPosition fromPosition = new SSPosition(20, 30, 45);
        final ShipBase shipBase = ShipBase.STANDARD;
        final Path2D shape = Maneuver.BANK_RIGHT_1_STANDARD.computePath(fromPosition, shipBase);
        final ShapeUtilities shapeUtils = new ShapeUtilities();

        // Run.
        final List<Point2D> result = shapeUtils.asList(shape);

        // Verify.
        assertNotNull(result);
        assertThat(result.size(), is(7));
        assertThat(result.get(0), is(shapeUtils.getFirstPoint(shape)));
        assertThat(result.get(3), is(shapeUtils.getPoint(shape, 3)));
        assertThat(result.get(6), is(shapeUtils.getLastPoint(shape)));
    }

    /**
     * Test the <code>computeMinimumDistance()</code> method.
     */
    @Test
    public void computeMinimumDistance0()
    {
        // Setup.
        final double x = 0.0;
        final double y = 0.0;
        final SSPosition position = new SSPosition(100, 0, 0);
        final Polygon shape = ShipBase.STANDARD.computePolygon(position);
        final ShapeUtilities shapeUtils = new ShapeUtilities();

        // Run.
        final double result = shapeUtils.computeMinimumDistance(x, y, shape);

        // Verify.
        assertThat(result, is(80.0));
    }

    /**
     * Test the <code>computeMinimumDistance()</code> method.
     */
    @Test
    public void computeMinimumDistance45()
    {
        // Setup.
        final double x = 0.0;
        final double y = 0.0;
        final SSPosition position = new SSPosition(100, 0, 45);
        final Polygon shape = ShipBase.STANDARD.computePolygon(position);
        final ShapeUtilities shapeUtils = new ShapeUtilities();

        // Run.
        final double result = shapeUtils.computeMinimumDistance(x, y, shape);

        // Verify.
        assertThat(result, is(72.0));
    }

    /**
     * Test the <code>computeMinimumDistance()</code> method.
     */
    @Test
    public void computeMinimumDistanceLineSegment()
    {
        // Setup.
        final double x = 0.0;
        final double y = 0.0;
        final double x1 = 80.0;
        final double y1 = 20.0;
        final double x2 = 80.0;
        final double y2 = -20.0;
        final ShapeUtilities shapeUtils = new ShapeUtilities();

        // Run.
        final double result = shapeUtils.computeMinimumDistance(x, y, x1, y1, x2, y2);

        // Verify.
        assertThat(result, is(80.0));
    }

    /**
     * Test the <code>computeMinimumDistance()</code> method.
     */
    @Test
    public void computeMinimumDistanceLineSegmentTilted()
    {
        // Setup.
        final double x = 0.0;
        final double y = 0.0;
        final double x1 = 80.0;
        final double y1 = 20.0;
        final double x2 = 81.0;
        final double y2 = -20.0;
        final ShapeUtilities shapeUtils = new ShapeUtilities();

        // Run.
        final double result = shapeUtils.computeMinimumDistance(x, y, x1, y1, x2, y2);

        // Verify.
        assertThat(myRound(result), is(80.4749));
    }

    /**
     * Test the <code>computeMinimumDistance()</code> method.
     */
    @Test
    public void computeMinimumDistanceShapes0()
    {
        // Setup.
        final SSPosition position1 = new SSPosition(20, 0, 0);
        final Polygon shape1 = ShipBase.STANDARD.computePolygon(position1);
        final SSPosition position2 = new SSPosition(100, 0, 0);
        final Polygon shape2 = ShipBase.STANDARD.computePolygon(position2);
        final ShapeUtilities shapeUtils = new ShapeUtilities();

        // Run.
        final double result = shapeUtils.computeMinimumDistance(shape1, shape2);

        // Verify.
        assertThat(result, is(40.0));
    }

    /**
     * Test the <code>computeMinimumDistance()</code> method.
     */
    @Test
    public void computeMinimumDistanceShapes45()
    {
        // Setup.
        final SSPosition position1 = new SSPosition(20, 0, 0);
        final Polygon shape1 = ShipBase.STANDARD.computePolygon(position1);
        final SSPosition position2 = new SSPosition(100, 0, 45);
        final Polygon shape2 = ShipBase.STANDARD.computePolygon(position2);
        final ShapeUtilities shapeUtils = new ShapeUtilities();

        // Run.
        final double result = shapeUtils.computeMinimumDistance(shape1, shape2);

        // Verify.
        assertThat(myRound(result), is(37.7359));
    }

    /**
     * Test the <code>doAreasCollide()</code> method.
     */
    @Test
    public void doAreasCollideLargeFalse()
    {
        // Setup.
        final SSPosition position1 = new SSPosition(50, 0, 0);
        final Area area1 = new Area(ShipBase.LARGE.computePolygon(position1));
        final SSPosition position2 = new SSPosition(130, 0, 0);
        final Area area2 = new Area(ShipBase.LARGE.computePolygon(position2));
        final ShapeUtilities shapeUtils = new ShapeUtilities();

        // Run / Verify.
        assertFalse(shapeUtils.doAreasCollide(area1, area2));
        assertFalse(shapeUtils.doAreasCollide(area2, area1));
    }

    /**
     * Test the <code>doAreasCollide()</code> method.
     */
    @Test
    public void doAreasCollideLargeTrue()
    {
        // Setup.
        final SSPosition position1 = new SSPosition(50, 0, 0);
        final Area area1 = new Area(ShipBase.LARGE.computePolygon(position1));
        final SSPosition position2 = new SSPosition(129, 0, 0);
        final Area area2 = new Area(ShipBase.LARGE.computePolygon(position2));
        final ShapeUtilities shapeUtils = new ShapeUtilities();

        // Run / Verify.
        assertTrue(shapeUtils.doAreasCollide(area1, area2));
        assertTrue(shapeUtils.doAreasCollide(area2, area1));
    }

    /**
     * Test the <code>doAreasCollide()</code> method.
     */
    @Test
    public void doAreasCollideStandardFalse()
    {
        // Setup.
        final SSPosition position1 = new SSPosition(50, 0, 0);
        final Area area1 = new Area(ShipBase.STANDARD.computePolygon(position1));
        final SSPosition position2 = new SSPosition(90, 0, 0);
        final Area area2 = new Area(ShipBase.STANDARD.computePolygon(position2));
        final ShapeUtilities shapeUtils = new ShapeUtilities();

        // Run / Verify.
        assertFalse(shapeUtils.doAreasCollide(area1, area2));
        assertFalse(shapeUtils.doAreasCollide(area2, area1));
    }

    /**
     * Test the <code>doAreasCollide()</code> method.
     */
    @Test
    public void doAreasCollideStandardTrue()
    {
        // Setup.
        final SSPosition position1 = new SSPosition(50, 0, 0);
        final Area area1 = new Area(ShipBase.STANDARD.computePolygon(position1));
        final SSPosition position2 = new SSPosition(89, 0, 0);
        final Area area2 = new Area(ShipBase.STANDARD.computePolygon(position2));
        final ShapeUtilities shapeUtils = new ShapeUtilities();

        // Run / Verify.
        assertTrue(shapeUtils.doAreasCollide(area1, area2));
        assertTrue(shapeUtils.doAreasCollide(area2, area1));
    }

    /**
     * Test the <code>doShapesCollide()</code> method.
     */
    @Test
    public void doShapesCollideStandardFalse()
    {
        // Setup.
        final SSPosition position1 = new SSPosition(50, 0, 0);
        final Shape shape1 = ShipBase.STANDARD.computePolygon(position1);
        final SSPosition position2 = new SSPosition(90, 0, 0);
        final Shape shape2 = ShipBase.STANDARD.computePolygon(position2);
        final ShapeUtilities shapeUtils = new ShapeUtilities();

        // Run / Verify.
        assertFalse(shapeUtils.doShapesCollide(shape1, shape2));
        assertFalse(shapeUtils.doShapesCollide(shape1, shape2));
    }

    /**
     * Test the <code>doShapesCollide()</code> method.
     */
    @Test
    public void doShapesCollideStandardTrue()
    {
        // Setup.
        final SSPosition position1 = new SSPosition(50, 0, 0);
        final Shape shape1 = ShipBase.STANDARD.computePolygon(position1);
        final SSPosition position2 = new SSPosition(89, 0, 0);
        final Shape shape2 = ShipBase.STANDARD.computePolygon(position2);
        final ShapeUtilities shapeUtils = new ShapeUtilities();

        // Run / Verify.
        assertTrue(shapeUtils.doShapesCollide(shape1, shape2));
        assertTrue(shapeUtils.doShapesCollide(shape1, shape2));
    }

    /**
     * Test the <code>getFirstPoint()</code> method.
     */
    @Test
    public void getFirstPoint()
    {
        // Setup.
        final SSPosition fromPosition = new SSPosition(20, 30, 45);
        final ShipBase shipBase = ShipBase.STANDARD;
        final Path2D shape = Maneuver.BANK_RIGHT_1_STANDARD.computePath(fromPosition, shipBase);
        final ShapeUtilities shapeUtils = new ShapeUtilities();

        // Run.
        final Point2D result = shapeUtils.getFirstPoint(shape);

        // Verify.
        assertNotNull(result);
        assertThat(myRound(result.getX()), is(20.0000));
        assertThat(myRound(result.getY()), is(30.0000));
    }

    /**
     * Test the <code>getLastPoint()</code> method.
     */
    @Test
    public void getLastPoint()
    {
        // Setup.
        final SSPosition fromPosition = new SSPosition(20, 30, 45);
        final ShipBase shipBase = ShipBase.STANDARD;
        final Path2D shape = Maneuver.BANK_RIGHT_1_STANDARD.computePath(fromPosition, shipBase);
        final ShapeUtilities shapeUtils = new ShapeUtilities();

        // Run.
        final Point2D result = shapeUtils.getLastPoint(shape);

        // Verify.
        assertNotNull(result);
        assertThat(myRound(result.getX()), is(58.1838));
        assertThat(myRound(result.getY()), is(122.1249));
    }

    /**
     * Test the <code>getLastPoint()</code> method.
     */
    @Test
    public void getPoint5()
    {
        // Setup.
        final SSPosition fromPosition = new SSPosition(20, 30, 45);
        final ShipBase shipBase = ShipBase.STANDARD;
        final Path2D shape = Maneuver.BANK_RIGHT_1_STANDARD.computePath(fromPosition, shipBase);
        final ShapeUtilities shapeUtils = new ShapeUtilities();

        // Run.
        final Point2D result = shapeUtils.getPoint(shape, 5);

        // Verify.
        assertNotNull(result);
        assertThat(myRound(result.getX()), is(58.3351));
        assertThat(myRound(result.getY()), is(102.5492));
    }

    /**
     * Test the <code>getLastPoint()</code> method.
     */
    @Test
    public void getPointFirstLast()
    {
        // Setup.
        final SSPosition fromPosition = new SSPosition(20, 30, 45);
        final ShipBase shipBase = ShipBase.STANDARD;
        final Path2D shape = Maneuver.BANK_RIGHT_1_STANDARD.computePath(fromPosition, shipBase);
        final ShapeUtilities shapeUtils = new ShapeUtilities();

        // Run / Verify.
        assertThat(shapeUtils.getPoint(shape, 0), is(shapeUtils.getFirstPoint(shape)));
        assertThat(shapeUtils.getPoint(shape, shapeUtils.size(shape) - 1), is(shapeUtils.getLastPoint(shape)));
    }

    /**
     * Test the <code>size()</code> method.
     */
    @Test
    public void size()
    {
        // Setup.
        final SSPosition fromPosition = new SSPosition(20, 30, 45);
        final ShipBase shipBase = ShipBase.STANDARD;
        final Path2D shape = Maneuver.BANK_RIGHT_1_STANDARD.computePath(fromPosition, shipBase);
        final ShapeUtilities shapeUtils = new ShapeUtilities();

        // Run.
        final int result = shapeUtils.size(shape);

        // Verify.
        assertThat(result, is(7));
    }

    /**
     * Test the <code>writePoints()</code> method.
     */
    @Test
    public void writePoints()
    {
        // Setup.
        final SSPosition fromPosition = new SSPosition(20, 30, 45);
        final ShipBase shipBase = ShipBase.STANDARD;
        final Path2D shape = Maneuver.BANK_RIGHT_1_STANDARD.computePath(fromPosition, shipBase);
        final Writer writer = new StringWriter();
        final ShapeUtilities shapeUtils = new ShapeUtilities();

        // Run.
        shapeUtils.writePoints(shape, writer);
        final String result = writer.toString();

        // Verify.
        assertNotNull(result);
        final String expected = "0 MOVETO coords = [20.0, 30.0, 0.0, 0.0, 0.0, 0.0]\n1 LINETO coords = [34.14213562373095, 44.14213562373095, 0.0, 0.0, 0.0, 0.0]\n2 LINETO coords = [44.41450547391236, 56.65905450232063, 0.0, 0.0, 0.0, 0.0]\n3 LINETO coords = [52.04756488315441, 70.93950423638336, 0.0, 0.0, 0.0, 0.0]\n4 LINETO coords = [56.74797965902896, 86.43469515120756, 0.0, 0.0, 0.0, 0.0]\n5 LINETO coords = [58.33511549772213, 102.54915574973977, 0.0, 0.0, 0.0, 0.0]\n6 LINETO coords = [58.183766184073576, 122.12489168102783, 0.0, 0.0, 0.0, 0.0]\n";
        assertThat(result, is(expected));
    }

    /**
     * @param value Value.
     * 
     * @return the value rounded to four decimal points.
     */
    private double myRound(final double value)
    {
        final double multiple = 10000;

        return toInt(value * multiple) / multiple;
    }

    /**
     * @param value Value.
     * 
     * @return value rounded to an integer.
     */
    private int toInt(final double value)
    {
        return (int)Math.round(value);
    }
}

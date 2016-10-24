package org.vizzini.starfightersquadrons;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;

import java.awt.Point;
import java.awt.geom.Path2D;
import java.awt.geom.PathIterator;
import java.util.Arrays;
import java.util.List;

import org.junit.Test;
import org.vizzini.starfightersquadrons.Maneuver;
import org.vizzini.starfightersquadrons.ShipBase;
import org.vizzini.starfightersquadrons.SSPosition;
import org.vizzini.starfightersquadrons.Maneuver.BarrelRollManeuver;
import org.vizzini.starfightersquadrons.Maneuver.Bearing;
import org.vizzini.starfightersquadrons.Maneuver.Difficulty;
import org.vizzini.starfightersquadrons.Maneuver.StationaryManeuver;

/**
 * Provides tests for the <code>Maneuver</code> class.
 */
public final class ManeuverTest
{
    /**
     * Test the <code>computeToPosition()</code> method.
     */
    @Test
    public void comparePathAndToPositionLarge()
    {
        // Setup.
        final List<Maneuver> maneuvers = Arrays.asList(new Maneuver[] {
                // Speed 1
                Maneuver.TURN_LEFT_1_STANDARD, Maneuver.BANK_LEFT_1_EASY, Maneuver.STRAIGHT_1_EASY,
                Maneuver.BANK_RIGHT_1_EASY,
                Maneuver.TURN_RIGHT_1_STANDARD,
                // Speed 2
                Maneuver.TURN_LEFT_2_STANDARD, Maneuver.BANK_LEFT_2_EASY, Maneuver.STRAIGHT_2_EASY,
                Maneuver.BANK_RIGHT_2_EASY, Maneuver.TURN_RIGHT_2_STANDARD,
                // Speed 3
                Maneuver.TURN_LEFT_3_STANDARD, Maneuver.BANK_LEFT_3_STANDARD, Maneuver.STRAIGHT_3_EASY,
                Maneuver.BANK_RIGHT_3_STANDARD, Maneuver.TURN_RIGHT_3_STANDARD,
                // Speed 4
                Maneuver.STRAIGHT_4_EASY,
                // Speed 5
                Maneuver.STRAIGHT_5_EASY, });

        final SSPosition fromPosition = new SSPosition(SSPosition.MAX_X / 2, SSPosition.MAX_Y / 2, 0);
        final ShipBase shipBase = ShipBase.LARGE;

        for (final Maneuver maneuver : maneuvers)
        {
            final Path2D path = maneuver.computePath(fromPosition, shipBase);
            final Point point = getLastPoint(path);
            assertNotNull(path);
            assertNotNull(point);

            final SSPosition toPosition = maneuver.computeToPosition(fromPosition, shipBase);
            assertNotNull(toPosition);

            if (maneuver.getBearing().isBank() && (maneuver.getSpeed() == 1))
            {
                // TODO: Banks at speed one are off by one for some reason.
                assertThat("maneuver = " + maneuver, point.x, is(toPosition.getX() - 1));
            }
            else
            {
                assertThat("maneuver = " + maneuver, point.x, is(toPosition.getX()));
            }
            assertThat("maneuver = " + maneuver, point.y, is(toPosition.getY()));
        }
    }

    /**
     * Test the <code>computeToPosition()</code> method.
     */
    @Test
    public void comparePathAndToPositionStandard()
    {
        // Setup.
        final List<Maneuver> maneuvers = Arrays.asList(new Maneuver[] {
                // Speed 1
                Maneuver.TURN_LEFT_1_STANDARD, Maneuver.BANK_LEFT_1_EASY, Maneuver.STRAIGHT_1_EASY,
                Maneuver.BANK_RIGHT_1_EASY,
                Maneuver.TURN_RIGHT_1_STANDARD,
                // Speed 2
                Maneuver.TURN_LEFT_2_STANDARD, Maneuver.BANK_LEFT_2_EASY, Maneuver.STRAIGHT_2_EASY,
                Maneuver.BANK_RIGHT_2_EASY, Maneuver.TURN_RIGHT_2_STANDARD,
                // Speed 3
                Maneuver.TURN_LEFT_3_STANDARD, Maneuver.BANK_LEFT_3_STANDARD, Maneuver.STRAIGHT_3_EASY,
                Maneuver.BANK_RIGHT_3_STANDARD, Maneuver.TURN_RIGHT_3_STANDARD,
                // Speed 4
                Maneuver.STRAIGHT_4_EASY,
                // Speed 5
                Maneuver.STRAIGHT_5_EASY, });

        final SSPosition fromPosition = new SSPosition(SSPosition.MAX_X / 2, SSPosition.MAX_Y / 2, 0);
        final ShipBase shipBase = ShipBase.STANDARD;

        for (final Maneuver maneuver : maneuvers)
        {
            final Path2D path = maneuver.computePath(fromPosition, shipBase);
            final Point point = getLastPoint(path);
            assertNotNull(path);
            assertNotNull(point);

            final SSPosition toPosition = maneuver.computeToPosition(fromPosition, shipBase);
            assertNotNull(toPosition);

            if (maneuver.getBearing().isBank() && (maneuver.getSpeed() == 1))
            {
                // TODO: Banks at speed one are off by one for some reason.
                assertThat("maneuver = " + maneuver, point.x, is(toPosition.getX() - 1));
            }
            else
            {
                assertThat("maneuver = " + maneuver, point.x, is(toPosition.getX()));
            }
            assertThat(point.y, is(toPosition.getY()));
        }
    }

    /**
     * Test the <code>computePath()</code> method.
     */
    @Test
    public void computePathBarrelRollLeft()
    {
        // Setup.
        final SSPosition fromPosition = new SSPosition(100, 200, 0);
        final Maneuver maneuver = BarrelRollManeuver.BARREL_ROLL_LEFT_1;
        final ShipBase shipBase = ShipBase.STANDARD;

        // Run.
        final Path2D result = maneuver.computePath(fromPosition, shipBase);

        // Verify.
        assertNotNull(result);
        assertThat(size(result), is(4));

        final PathIterator iter = result.getPathIterator(null);
        final double[] coords = new double[6];

        int type = iter.currentSegment(coords);
        assertThat(type, is(PathIterator.SEG_MOVETO));
        assertThat(coords[0], is(fromPosition.getX() * 1.0));
        assertThat(coords[1], is(fromPosition.getY() * 1.0));
        assertFalse(iter.isDone());

        iter.next();
        assertFalse(iter.isDone());
        type = iter.currentSegment(coords);
        assertThat(type, is(PathIterator.SEG_LINETO));
        assertThat(myRound(coords[0]), is(fromPosition.getX() + 0.0));
        assertThat(myRound(coords[1]), is(fromPosition.getY() - 20.0));

        iter.next();
        assertFalse(iter.isDone());
        type = iter.currentSegment(coords);
        assertThat(type, is(PathIterator.SEG_LINETO));
        assertThat(myRound(coords[0]), is(fromPosition.getX() + 0.0));
        assertThat(myRound(coords[1]), is(fromPosition.getY() - 60.0));

        iter.next();
        assertFalse(iter.isDone());
        type = iter.currentSegment(coords);
        assertThat(type, is(PathIterator.SEG_LINETO));
        assertThat(coords[0], is(fromPosition.getX() + 0.0));
        assertThat(coords[1], is(fromPosition.getY() - 80.0));

        iter.next();
        assertTrue(iter.isDone());
    }

    /**
     * Test the <code>computePath()</code> method.
     */
    @Test
    public void computePathBarrelRollRight()
    {
        // Setup.
        final SSPosition fromPosition = new SSPosition(100, 200, 0);
        final Maneuver maneuver = BarrelRollManeuver.BARREL_ROLL_RIGHT_1;
        final ShipBase shipBase = ShipBase.STANDARD;

        // Run.
        final Path2D result = maneuver.computePath(fromPosition, shipBase);

        // Verify.
        assertNotNull(result);
        assertThat(size(result), is(4));

        final PathIterator iter = result.getPathIterator(null);
        final double[] coords = new double[6];

        int type = iter.currentSegment(coords);
        assertThat(type, is(PathIterator.SEG_MOVETO));
        assertThat(coords[0], is(fromPosition.getX() * 1.0));
        assertThat(coords[1], is(fromPosition.getY() * 1.0));
        assertFalse(iter.isDone());

        iter.next();
        assertFalse(iter.isDone());
        type = iter.currentSegment(coords);
        assertThat(type, is(PathIterator.SEG_LINETO));
        assertThat(myRound(coords[0]), is(fromPosition.getX() + 0.0));
        assertThat(myRound(coords[1]), is(fromPosition.getY() + 20.0));

        iter.next();
        assertFalse(iter.isDone());
        type = iter.currentSegment(coords);
        assertThat(type, is(PathIterator.SEG_LINETO));
        assertThat(myRound(coords[0]), is(fromPosition.getX() + 0.0));
        assertThat(myRound(coords[1]), is(fromPosition.getY() + 60.0));

        iter.next();
        assertFalse(iter.isDone());
        type = iter.currentSegment(coords);
        assertThat(type, is(PathIterator.SEG_LINETO));
        assertThat(coords[0], is(fromPosition.getX() + 0.0));
        assertThat(coords[1], is(fromPosition.getY() + 80.0));

        iter.next();
        assertTrue(iter.isDone());
    }

    /**
     * Test the <code>computePath()</code> method.
     */
    @Test
    public void computePathKoiogranFive0Standard()
    {
        // Setup.
        final SSPosition fromPosition = new SSPosition(0, 0, 0);
        final Maneuver maneuver = Maneuver.KOIOGRAN_TURN_5_HARD;
        final ShipBase shipBase = ShipBase.STANDARD;

        // Run.
        final Path2D result = maneuver.computePath(fromPosition, shipBase);

        // Verify.
        assertNotNull(result);
        assertThat(size(result), is(8));

        final PathIterator iter = result.getPathIterator(null);
        final double[] coords = new double[6];

        int type = iter.currentSegment(coords);
        assertThat(type, is(PathIterator.SEG_MOVETO));
        assertThat(coords[0], is(fromPosition.getX() * 1.0));
        assertThat(coords[1], is(fromPosition.getY() * 1.0));
        assertFalse(iter.isDone());

        iter.next();
        assertFalse(iter.isDone());
        type = iter.currentSegment(coords);
        assertThat(type, is(PathIterator.SEG_LINETO));
        assertThat(coords[0], is(20.0));
        assertThat(coords[1], is(0.0));

        iter.next();
        assertFalse(iter.isDone());
        type = iter.currentSegment(coords);
        assertThat(type, is(PathIterator.SEG_LINETO));
        assertThat(coords[0], is(60.0));
        assertThat(coords[1], is(0.0));

        iter.next();
        assertFalse(iter.isDone());
        type = iter.currentSegment(coords);
        assertThat(type, is(PathIterator.SEG_LINETO));
        assertThat(coords[0], is(100.0));
        assertThat(coords[1], is(0.0));

        iter.next();
        assertFalse(iter.isDone());
        type = iter.currentSegment(coords);
        assertThat(type, is(PathIterator.SEG_LINETO));
        assertThat(coords[0], is(140.0));
        assertThat(coords[1], is(0.0));

        iter.next();
        assertFalse(iter.isDone());
        type = iter.currentSegment(coords);
        assertThat(type, is(PathIterator.SEG_LINETO));
        assertThat(coords[0], is(180.0));
        assertThat(coords[1], is(0.0));

        iter.next();
        assertFalse(iter.isDone());
        type = iter.currentSegment(coords);
        assertThat(type, is(PathIterator.SEG_LINETO));
        assertThat(coords[0], is(220.0));
        assertThat(coords[1], is(0.0));

        iter.next();
        assertFalse(iter.isDone());
        type = iter.currentSegment(coords);
        assertThat(type, is(PathIterator.SEG_LINETO));
        assertThat(coords[0], is(240.0));
        assertThat(coords[1], is(0.0));

        iter.next();
        type = iter.currentSegment(coords);
        assertTrue(iter.isDone());
    }

    /**
     * Test the <code>computePath()</code> method.
     */
    @Test
    public void computePathStationaryZeroHard()
    {
        // Setup.
        final SSPosition fromPosition = new SSPosition(10, 20, 30);
        final Maneuver maneuver = StationaryManeuver.STATIONARY_0_HARD;
        final ShipBase shipBase = ShipBase.STANDARD;

        // Run.
        final Path2D result = maneuver.computePath(fromPosition, shipBase);

        // Verify.
        assertNotNull(result);
        assertThat(size(result), is(1));

        final PathIterator iter = result.getPathIterator(null);
        final double[] coords = new double[6];

        final int type = iter.currentSegment(coords);
        assertThat(type, is(PathIterator.SEG_MOVETO));
        assertThat(coords[0], is(fromPosition.getX() + 0.0));
        assertThat(coords[1], is(fromPosition.getY() + 0.0));
        assertFalse(iter.isDone());

        iter.next();
        assertTrue(iter.isDone());
    }

    /**
     * Test the <code>computePath()</code> method.
     */
    @Test
    public void computePathStraightFive0Large()
    {
        // Setup.
        final SSPosition fromPosition = new SSPosition(0, 0, 0);
        final Maneuver maneuver = Maneuver.STRAIGHT_5_STANDARD;
        final ShipBase shipBase = ShipBase.LARGE;

        // Run.
        final Path2D result = maneuver.computePath(fromPosition, shipBase);

        // Verify.
        assertNotNull(result);
        assertThat(size(result), is(8));

        final PathIterator iter = result.getPathIterator(null);
        final double[] coords = new double[6];

        int type = iter.currentSegment(coords);
        assertThat(type, is(PathIterator.SEG_MOVETO));
        assertThat(coords[0], is(fromPosition.getX() * 1.0));
        assertThat(coords[1], is(fromPosition.getY() * 1.0));
        assertFalse(iter.isDone());

        iter.next();
        assertFalse(iter.isDone());
        type = iter.currentSegment(coords);
        assertThat(type, is(PathIterator.SEG_LINETO));
        assertThat(coords[0], is(40.0));
        assertThat(coords[1], is(0.0));

        iter.next();
        assertFalse(iter.isDone());
        type = iter.currentSegment(coords);
        assertThat(type, is(PathIterator.SEG_LINETO));
        assertThat(coords[0], is(80.0));
        assertThat(coords[1], is(0.0));

        iter.next();
        assertFalse(iter.isDone());
        type = iter.currentSegment(coords);
        assertThat(type, is(PathIterator.SEG_LINETO));
        assertThat(coords[0], is(120.0));
        assertThat(coords[1], is(0.0));

        iter.next();
        assertFalse(iter.isDone());
        type = iter.currentSegment(coords);
        assertThat(type, is(PathIterator.SEG_LINETO));
        assertThat(coords[0], is(160.0));
        assertThat(coords[1], is(0.0));

        iter.next();
        assertFalse(iter.isDone());
        type = iter.currentSegment(coords);
        assertThat(type, is(PathIterator.SEG_LINETO));
        assertThat(coords[0], is(200.0));
        assertThat(coords[1], is(0.0));

        iter.next();
        assertFalse(iter.isDone());
        type = iter.currentSegment(coords);
        assertThat(type, is(PathIterator.SEG_LINETO));
        assertThat(coords[0], is(240.0));
        assertThat(coords[1], is(0.0));

        iter.next();
        assertFalse(iter.isDone());
        type = iter.currentSegment(coords);
        assertThat(type, is(PathIterator.SEG_LINETO));
        assertThat(coords[0], is(280.0));
        assertThat(coords[1], is(0.0));

        iter.next();
        assertTrue(iter.isDone());
    }

    /**
     * Test the <code>computePath()</code> method.
     */
    @Test
    public void computePathStraightFive0Standard()
    {
        // Setup.
        final SSPosition fromPosition = new SSPosition(0, 0, 0);
        final Maneuver maneuver = Maneuver.STRAIGHT_5_STANDARD;
        final ShipBase shipBase = ShipBase.STANDARD;

        // Run.
        final Path2D result = maneuver.computePath(fromPosition, shipBase);

        // Verify.
        assertNotNull(result);
        assertThat(size(result), is(8));

        final PathIterator iter = result.getPathIterator(null);
        final double[] coords = new double[6];

        int type = iter.currentSegment(coords);
        assertThat(type, is(PathIterator.SEG_MOVETO));
        assertThat(coords[0], is(fromPosition.getX() * 1.0));
        assertThat(coords[1], is(fromPosition.getY() * 1.0));
        assertFalse(iter.isDone());

        iter.next();
        assertFalse(iter.isDone());
        type = iter.currentSegment(coords);
        assertThat(type, is(PathIterator.SEG_LINETO));
        assertThat(coords[0], is(20.0));
        assertThat(coords[1], is(0.0));

        iter.next();
        assertFalse(iter.isDone());
        type = iter.currentSegment(coords);
        assertThat(type, is(PathIterator.SEG_LINETO));
        assertThat(coords[0], is(60.0));
        assertThat(coords[1], is(0.0));

        iter.next();
        assertFalse(iter.isDone());
        type = iter.currentSegment(coords);
        assertThat(type, is(PathIterator.SEG_LINETO));
        assertThat(coords[0], is(100.0));
        assertThat(coords[1], is(0.0));

        iter.next();
        assertFalse(iter.isDone());
        type = iter.currentSegment(coords);
        assertThat(type, is(PathIterator.SEG_LINETO));
        assertThat(coords[0], is(140.0));
        assertThat(coords[1], is(0.0));

        iter.next();
        assertFalse(iter.isDone());
        type = iter.currentSegment(coords);
        assertThat(type, is(PathIterator.SEG_LINETO));
        assertThat(coords[0], is(180.0));
        assertThat(coords[1], is(0.0));

        iter.next();
        assertFalse(iter.isDone());
        type = iter.currentSegment(coords);
        assertThat(type, is(PathIterator.SEG_LINETO));
        assertThat(coords[0], is(220.0));
        assertThat(coords[1], is(0.0));

        iter.next();
        assertFalse(iter.isDone());
        type = iter.currentSegment(coords);
        assertThat(type, is(PathIterator.SEG_LINETO));
        assertThat(coords[0], is(240.0));
        assertThat(coords[1], is(0.0));

        iter.next();
        type = iter.currentSegment(coords);
        assertTrue(iter.isDone());
    }

    /**
     * Test the <code>computePath()</code> method.
     */
    @Test
    public void computePathStraightOne0Large()
    {
        // Setup.
        final SSPosition fromPosition = new SSPosition(0, 0, 0);
        final Maneuver maneuver = Maneuver.STRAIGHT_1_EASY;
        final ShipBase shipBase = ShipBase.LARGE;

        // Run.
        final Path2D result = maneuver.computePath(fromPosition, shipBase);

        // Verify.
        assertNotNull(result);
        assertThat(size(result), is(4));

        final PathIterator iter = result.getPathIterator(null);
        final double[] coords = new double[6];

        int type = iter.currentSegment(coords);
        assertThat(type, is(PathIterator.SEG_MOVETO));
        assertThat(coords[0], is(fromPosition.getX() * 1.0));
        assertThat(coords[1], is(fromPosition.getY() * 1.0));
        assertFalse(iter.isDone());

        iter.next();
        assertFalse(iter.isDone());
        type = iter.currentSegment(coords);
        assertThat(type, is(PathIterator.SEG_LINETO));
        assertThat(coords[0], is(40.0));
        assertThat(coords[1], is(0.0));

        iter.next();
        assertFalse(iter.isDone());
        type = iter.currentSegment(coords);
        assertThat(type, is(PathIterator.SEG_LINETO));
        assertThat(coords[0], is(80.0));
        assertThat(coords[1], is(0.0));

        iter.next();
        assertFalse(iter.isDone());
        type = iter.currentSegment(coords);
        assertThat(type, is(PathIterator.SEG_LINETO));
        assertThat(coords[0], is(120.0));
        assertThat(coords[1], is(0.0));

        iter.next();
        assertTrue(iter.isDone());
    }

    /**
     * Test the <code>computePath()</code> method.
     */
    @Test
    public void computePathStraightOne0Standard()
    {
        // Setup.
        final SSPosition fromPosition = new SSPosition(10, 20, 0);
        final Maneuver maneuver = Maneuver.STRAIGHT_1_EASY;
        final ShipBase shipBase = ShipBase.STANDARD;

        // Run.
        final Path2D result = maneuver.computePath(fromPosition, shipBase);

        // Verify.
        assertNotNull(result);
        assertThat(size(result), is(4));

        final PathIterator iter = result.getPathIterator(null);
        final double[] coords = new double[6];

        int type = iter.currentSegment(coords);
        assertThat(type, is(PathIterator.SEG_MOVETO));
        assertThat(coords[0], is(fromPosition.getX() + 0.0));
        assertThat(coords[1], is(fromPosition.getY() + 0.0));
        assertFalse(iter.isDone());

        iter.next();
        assertFalse(iter.isDone());
        type = iter.currentSegment(coords);
        assertThat(type, is(PathIterator.SEG_LINETO));
        assertThat(coords[0], is(fromPosition.getX() + 20.0));
        assertThat(coords[1], is(fromPosition.getY() + 0.0));

        iter.next();
        assertFalse(iter.isDone());
        type = iter.currentSegment(coords);
        assertThat(type, is(PathIterator.SEG_LINETO));
        assertThat(coords[0], is(fromPosition.getX() + 60.0));
        assertThat(coords[1], is(fromPosition.getY() + 0.0));

        iter.next();
        assertFalse(iter.isDone());
        type = iter.currentSegment(coords);
        assertThat(type, is(PathIterator.SEG_LINETO));
        assertThat(coords[0], is(fromPosition.getX() + 80.0));
        assertThat(coords[1], is(fromPosition.getY() + 0.0));

        iter.next();
        assertTrue(iter.isDone());
    }

    /**
     * Test the <code>computePath()</code> method.
     */
    @Test
    public void computePathStraightOne30Standard()
    {
        // Setup.
        final SSPosition fromPosition = new SSPosition(0, 0, 30);
        final Maneuver maneuver = Maneuver.STRAIGHT_1_EASY;
        final ShipBase shipBase = ShipBase.STANDARD;

        // Run.
        final Path2D result = maneuver.computePath(fromPosition, shipBase);

        // Verify.
        assertNotNull(result);
        assertThat(size(result), is(4));

        final PathIterator iter = result.getPathIterator(null);
        final double[] coords = new double[6];

        int type = iter.currentSegment(coords);
        assertThat(type, is(PathIterator.SEG_MOVETO));
        assertThat(coords[0], is(fromPosition.getX() + 0.0));
        assertThat(coords[1], is(fromPosition.getY() + 0.0));
        assertFalse(iter.isDone());

        iter.next();
        assertFalse(iter.isDone());
        type = iter.currentSegment(coords);
        assertThat(type, is(PathIterator.SEG_LINETO));
        assertThat(myRound(coords[0]), is(fromPosition.getX() + 17.3205));
        assertThat(myRound(coords[1]), is(fromPosition.getY() + 10.0000));

        iter.next();
        assertFalse(iter.isDone());
        type = iter.currentSegment(coords);
        assertThat(type, is(PathIterator.SEG_LINETO));
        assertThat(myRound(coords[0]), is(fromPosition.getX() + 51.9615));
        assertThat(myRound(coords[1]), is(fromPosition.getY() + 30.0000));

        iter.next();
        assertFalse(iter.isDone());
        type = iter.currentSegment(coords);
        assertThat(type, is(PathIterator.SEG_LINETO));
        assertThat(myRound(coords[0]), is(fromPosition.getX() + 69.2820));
        assertThat(myRound(coords[1]), is(fromPosition.getY() + 40.0000));

        iter.next();
        assertTrue(iter.isDone());
    }

    /**
     * Test the <code>computePath()</code> method.
     */
    @Test
    public void computePathStraightOne30Standard_2()
    {
        // Setup.
        final SSPosition fromPosition = new SSPosition(10, 20, 30);
        final Maneuver maneuver = Maneuver.STRAIGHT_1_EASY;
        final ShipBase shipBase = ShipBase.STANDARD;

        // Run.
        final Path2D result = maneuver.computePath(fromPosition, shipBase);

        // Verify.
        assertNotNull(result);
        assertThat(size(result), is(4));

        final PathIterator iter = result.getPathIterator(null);
        final double[] coords = new double[6];

        int type = iter.currentSegment(coords);
        assertThat(type, is(PathIterator.SEG_MOVETO));
        assertThat(coords[0], is(fromPosition.getX() + 0.0));
        assertThat(coords[1], is(fromPosition.getY() + 0.0));
        assertFalse(iter.isDone());

        iter.next();
        assertFalse(iter.isDone());
        type = iter.currentSegment(coords);
        assertThat(type, is(PathIterator.SEG_LINETO));
        assertThat(myRound(coords[0]), is(fromPosition.getX() + 17.3205));
        assertThat(myRound(coords[1]), is(fromPosition.getY() + 10.0000));

        iter.next();
        assertFalse(iter.isDone());
        type = iter.currentSegment(coords);
        assertThat(type, is(PathIterator.SEG_LINETO));
        assertThat(myRound(coords[0]), is(fromPosition.getX() + 51.9615));
        assertThat(myRound(coords[1]), is(fromPosition.getY() + 30.0000));

        iter.next();
        assertFalse(iter.isDone());
        type = iter.currentSegment(coords);
        assertThat(type, is(PathIterator.SEG_LINETO));
        assertThat(myRound(coords[0]), is(fromPosition.getX() + 69.2820));
        assertThat(myRound(coords[1]), is(fromPosition.getY() + 40.0000));

        iter.next();
        assertTrue(iter.isDone());
    }

    /**
     * Test the <code>computePath()</code> method.
     */
    @Test
    public void computePathTurnLeftOne0Standard()
    {
        // Setup.
        final SSPosition fromPosition = new SSPosition(0, 0, 0);
        final Maneuver maneuver = Maneuver.TURN_LEFT_1_STANDARD;
        final ShipBase shipBase = ShipBase.STANDARD;

        // Run.
        final Path2D result = maneuver.computePath(fromPosition, shipBase);

        // Verify.
        assertNotNull(result);
        assertThat(size(result), is(9));

        final PathIterator iter = result.getPathIterator(null);
        final double[] coords = new double[6];

        int type = iter.currentSegment(coords);
        assertThat(type, is(PathIterator.SEG_MOVETO));
        assertThat(coords[0], is(fromPosition.getX() + 0.0));
        assertThat(coords[1], is(fromPosition.getY() + 0.0));
        assertFalse(iter.isDone());

        iter.next();
        assertFalse(iter.isDone());
        type = iter.currentSegment(coords);
        assertThat(type, is(PathIterator.SEG_LINETO));
        assertThat(coords[0], is(fromPosition.getX() + 20.0));
        assertThat(coords[1], is(fromPosition.getY() + 0.0));

        iter.next();
        assertFalse(iter.isDone());
        type = iter.currentSegment(coords);
        assertThat(type, is(PathIterator.SEG_LINETO));
        assertThat(myRound(coords[0]), is(fromPosition.getX() + 28.8775));
        assertThat(myRound(coords[1]), is(fromPosition.getY() - 1.1687));

        iter.next();
        assertFalse(iter.isDone());
        type = iter.currentSegment(coords);
        assertThat(type, is(PathIterator.SEG_LINETO));
        assertThat(myRound(coords[0]), is(fromPosition.getX() + 37.1500));
        assertThat(myRound(coords[1]), is(fromPosition.getY() - 4.5953));

        iter.next();
        assertFalse(iter.isDone());
        type = iter.currentSegment(coords);
        assertThat(type, is(PathIterator.SEG_LINETO));
        assertThat(myRound(coords[0]), is(fromPosition.getX() + 44.2538));
        assertThat(myRound(coords[1]), is(fromPosition.getY() - 10.0462));

        iter.next();
        assertFalse(iter.isDone());
        type = iter.currentSegment(coords);
        assertThat(type, is(PathIterator.SEG_LINETO));
        assertThat(myRound(coords[0]), is(fromPosition.getX() + 49.7047));
        assertThat(myRound(coords[1]), is(fromPosition.getY() - 17.1500));

        iter.next();
        assertFalse(iter.isDone());
        type = iter.currentSegment(coords);
        assertThat(type, is(PathIterator.SEG_LINETO));
        assertThat(myRound(coords[0]), is(fromPosition.getX() + 53.1313));
        assertThat(myRound(coords[1]), is(fromPosition.getY() - 25.4225));

        iter.next();
        assertFalse(iter.isDone());
        type = iter.currentSegment(coords);
        assertThat(type, is(PathIterator.SEG_LINETO));
        assertThat(myRound(coords[0]), is(fromPosition.getX() + 54.3000));
        assertThat(myRound(coords[1]), is(fromPosition.getY() - 34.3000));

        iter.next();
        assertFalse(iter.isDone());
        type = iter.currentSegment(coords);
        assertThat(type, is(PathIterator.SEG_LINETO));
        assertThat(myRound(coords[0]), is(fromPosition.getX() + 54.0000));
        assertThat(myRound(coords[1]), is(fromPosition.getY() - 54.0000));

        iter.next();
        assertTrue(iter.isDone());
    }

    /**
     * Test the <code>computePath()</code> method.
     */
    @Test
    public void computePathTurnRightOne0Standard()
    {
        // Setup.
        final SSPosition fromPosition = new SSPosition(0, 0, 0);
        final Maneuver maneuver = Maneuver.TURN_RIGHT_1_STANDARD;
        final ShipBase shipBase = ShipBase.STANDARD;

        // Run.
        final Path2D result = maneuver.computePath(fromPosition, shipBase);

        // Verify.
        assertNotNull(result);
        assertThat(size(result), is(9));

        final PathIterator iter = result.getPathIterator(null);
        final double[] coords = new double[6];

        int type = iter.currentSegment(coords);
        assertThat(type, is(PathIterator.SEG_MOVETO));
        assertThat(coords[0], is(fromPosition.getX() + 0.0));
        assertThat(coords[1], is(fromPosition.getY() + 0.0));
        assertFalse(iter.isDone());

        iter.next();
        assertFalse(iter.isDone());
        type = iter.currentSegment(coords);
        assertThat(type, is(PathIterator.SEG_LINETO));
        assertThat(coords[0], is(fromPosition.getX() + 20.0));
        assertThat(coords[1], is(fromPosition.getY() + 0.0));

        iter.next();
        assertFalse(iter.isDone());
        type = iter.currentSegment(coords);
        assertThat(type, is(PathIterator.SEG_LINETO));
        assertThat(myRound(coords[0]), is(fromPosition.getX() + 28.8775));
        assertThat(myRound(coords[1]), is(fromPosition.getY() + 1.1687));

        iter.next();
        assertFalse(iter.isDone());
        type = iter.currentSegment(coords);
        assertThat(type, is(PathIterator.SEG_LINETO));
        assertThat(myRound(coords[0]), is(fromPosition.getX() + 37.1500));
        assertThat(myRound(coords[1]), is(fromPosition.getY() + 4.5953));

        iter.next();
        assertFalse(iter.isDone());
        type = iter.currentSegment(coords);
        assertThat(type, is(PathIterator.SEG_LINETO));
        assertThat(myRound(coords[0]), is(fromPosition.getX() + 44.2538));
        assertThat(myRound(coords[1]), is(fromPosition.getY() + 10.0462));

        iter.next();
        assertFalse(iter.isDone());
        type = iter.currentSegment(coords);
        assertThat(type, is(PathIterator.SEG_LINETO));
        assertThat(myRound(coords[0]), is(fromPosition.getX() + 49.7047));
        assertThat(myRound(coords[1]), is(fromPosition.getY() + 17.1500));

        iter.next();
        assertFalse(iter.isDone());
        type = iter.currentSegment(coords);
        assertThat(type, is(PathIterator.SEG_LINETO));
        assertThat(myRound(coords[0]), is(fromPosition.getX() + 53.1313));
        assertThat(myRound(coords[1]), is(fromPosition.getY() + 25.4225));

        iter.next();
        assertFalse(iter.isDone());
        type = iter.currentSegment(coords);
        assertThat(type, is(PathIterator.SEG_LINETO));
        assertThat(myRound(coords[0]), is(fromPosition.getX() + 54.3000));
        assertThat(myRound(coords[1]), is(fromPosition.getY() + 34.3000));

        iter.next();
        assertFalse(iter.isDone());
        type = iter.currentSegment(coords);
        assertThat(type, is(PathIterator.SEG_LINETO));
        assertThat(myRound(coords[0]), is(fromPosition.getX() + 54.0000));
        assertThat(myRound(coords[1]), is(fromPosition.getY() + 54.0000));

        iter.next();
        assertTrue(iter.isDone());
    }

    /**
     * Test the <code>computeToPosition()</code> method.
     */
    @Test
    public void computeToPositionBankLeftOne0()
    {
        // Setup.
        final SSPosition fromPosition = new SSPosition(20, 400, 0);
        final Maneuver maneuver = Maneuver.BANK_LEFT_1_EASY;

        // Run.
        final SSPosition result = maneuver.computeToPosition(fromPosition, ShipBase.STANDARD);

        // Verify.
        assertNotNull(result);
        assertThat(result.getX(), is(fromPosition.getX() + 93));
        assertThat(result.getY(), is(fromPosition.getY() - 38));
        assertThat(result.getHeading(), is(fromPosition.getHeading() + 315));
    }

    /**
     * Test the <code>computeToPosition()</code> method.
     */
    @Test
    public void computeToPositionBankLeftThree0()
    {
        // Setup.
        final SSPosition fromPosition = new SSPosition(20, 400, 0);
        final Maneuver maneuver = Maneuver.BANK_LEFT_3_STANDARD;

        // Run.
        final SSPosition result = maneuver.computeToPosition(fromPosition, ShipBase.STANDARD);

        // Verify.
        assertNotNull(result);
        assertThat(result.getX(), is(fromPosition.getX() + 160));
        assertThat(result.getY(), is(fromPosition.getY() - 66));
        assertThat(result.getHeading(), is(fromPosition.getHeading() + 315));
    }

    /**
     * Test the <code>computeToPosition()</code> method.
     */
    @Test
    public void computeToPositionBankRightOne0()
    {
        // Setup.
        final SSPosition fromPosition = new SSPosition(400, 20, 0);
        final Maneuver maneuver = Maneuver.BANK_RIGHT_1_EASY;

        // Run.
        final SSPosition result = maneuver.computeToPosition(fromPosition, ShipBase.STANDARD);

        // Verify.
        assertNotNull(result);
        assertThat(result.getX(), is(fromPosition.getX() + 93));
        assertThat(result.getY(), is(fromPosition.getY() + 38));
        assertThat(result.getHeading(), is(fromPosition.getHeading() + 45));
    }

    /**
     * Test the <code>computeToPosition()</code> method.
     */
    @Test
    public void computeToPositionBankRightOne0Large()
    {
        // Setup.
        final SSPosition fromPosition = new SSPosition(400, 20, 0);
        final Maneuver maneuver = Maneuver.BANK_RIGHT_1_EASY;

        // Run.
        final SSPosition result = maneuver.computeToPosition(fromPosition, ShipBase.LARGE);

        // Verify.
        assertNotNull(result);
        assertThat(result.getX(), is(fromPosition.getX() + 127));
        assertThat(result.getY(), is(fromPosition.getY() + 52));
        assertThat(result.getHeading(), is(fromPosition.getHeading() + 45));
    }

    /**
     * Test the <code>computeToPosition()</code> method.
     */
    @Test
    public void computeToPositionBankRightThree0()
    {
        // Setup.
        final SSPosition fromPosition = new SSPosition(400, 20, 0);
        final Maneuver maneuver = Maneuver.BANK_RIGHT_3_STANDARD;

        // Run.
        final SSPosition result = maneuver.computeToPosition(fromPosition, ShipBase.STANDARD);

        // Verify.
        assertNotNull(result);
        assertThat(result.getX(), is(fromPosition.getX() + 160));
        assertThat(result.getY(), is(fromPosition.getY() + 66));
        assertThat(result.getHeading(), is(fromPosition.getHeading() + 45));
    }

    /**
     * Test the <code>computeToPosition()</code> method.
     */
    @Test
    public void computeToPositionBankRightTwo0()
    {
        // Setup.
        final SSPosition fromPosition = new SSPosition(400, 20, 0);
        final Maneuver maneuver = Maneuver.BANK_RIGHT_2_STANDARD;

        // Run.
        final SSPosition result = maneuver.computeToPosition(fromPosition, ShipBase.STANDARD);

        // Verify.
        assertNotNull(result);
        assertThat(result.getX(), is(fromPosition.getX() + 124));
        assertThat(result.getY(), is(fromPosition.getY() + 51));
        assertThat(result.getHeading(), is(fromPosition.getHeading() + 45));
    }

    /**
     * Test the <code>computeToPosition()</code> method.
     */
    @Test
    public void computeToPositionBarrelRollLeft()
    {
        // Setup.
        final SSPosition fromPosition = new SSPosition(100, 200, 0);
        final Maneuver maneuver = BarrelRollManeuver.BARREL_ROLL_LEFT_1;

        // Run.
        final SSPosition result = maneuver.computeToPosition(fromPosition, ShipBase.STANDARD);

        // Verify.
        assertNotNull(result);
        assertThat(result.getX(), is(fromPosition.getX()));
        assertThat(result.getY(), is(fromPosition.getY() - 80));
        assertThat(result.getHeading(), is(fromPosition.getHeading()));
    }

    /**
     * Test the <code>computeToPosition()</code> method.
     */
    @Test
    public void computeToPositionBarrelRollRight()
    {
        // Setup.
        final SSPosition fromPosition = new SSPosition(100, 200, 0);
        final Maneuver maneuver = BarrelRollManeuver.BARREL_ROLL_RIGHT_1;

        // Run.
        final SSPosition result = maneuver.computeToPosition(fromPosition, ShipBase.STANDARD);

        // Verify.
        assertNotNull(result);
        assertThat(result.getX(), is(fromPosition.getX()));
        assertThat(result.getY(), is(fromPosition.getY() + 80));
        assertThat(result.getHeading(), is(fromPosition.getHeading()));
    }

    /**
     * Test the <code>computeToPosition()</code> method.
     */
    @Test
    public void computeToPositionKoiogranFour0()
    {
        // Setup.
        final SSPosition fromPosition = new SSPosition(10, 20, 0);
        final Maneuver maneuver = Maneuver.KOIOGRAN_TURN_4_HARD;

        // Run.
        final SSPosition result = maneuver.computeToPosition(fromPosition, ShipBase.STANDARD);

        // Verify.
        assertNotNull(result);
        assertThat(result.getX(), is(fromPosition.getX() + 200));
        assertThat(result.getY(), is(fromPosition.getY()));
        assertThat(result.getHeading(), is(fromPosition.getHeading() + 180));
    }

    /**
     * Test the <code>computeToPosition()</code> method.
     */
    @Test
    public void computeToPositionKoiogranThree0()
    {
        // Setup.
        final SSPosition fromPosition = new SSPosition(10, 20, 0);
        final Maneuver maneuver = Maneuver.KOIOGRAN_TURN_3_HARD;

        // Run.
        final SSPosition result = maneuver.computeToPosition(fromPosition, ShipBase.STANDARD);

        // Verify.
        assertNotNull(result);
        assertThat(result.getX(), is(fromPosition.getX() + 160));
        assertThat(result.getY(), is(fromPosition.getY()));
        assertThat(result.getHeading(), is(fromPosition.getHeading() + 180));
    }

    /**
     * Test the <code>computeToPosition()</code> method.
     */
    @Test
    public void computeToPositionOutOfBounds()
    {
        // Setup.
        final SSPosition fromPosition = new SSPosition(0, 0, 0);
        final Maneuver maneuver = Maneuver.BANK_LEFT_1_EASY;

        // Run.
        final SSPosition result = maneuver.computeToPosition(fromPosition, ShipBase.STANDARD);

        // Verify.
        assertNull(result);
    }

    /**
     * Test the <code>computeToPosition()</code> method.
     */
    @Test
    public void computeToPositionStationaryZeroHard()
    {
        // Setup.
        final SSPosition fromPosition = new SSPosition(10, 20, 0);
        final Maneuver maneuver = StationaryManeuver.STATIONARY_0_HARD;

        // Run.
        final SSPosition result = maneuver.computeToPosition(fromPosition, ShipBase.LARGE);

        // Verify.
        assertNotNull(result);
        assertThat(result.getX(), is(fromPosition.getX() + 0));
        assertThat(result.getY(), is(fromPosition.getY() + 0));
        assertThat(result.getHeading(), is(fromPosition.getHeading()));
    }

    /**
     * Test the <code>computeToPosition()</code> method.
     */
    @Test
    public void computeToPositionStraightFive0Large()
    {
        // Setup.
        final SSPosition fromPosition = new SSPosition(10, 20, 0);
        final Maneuver maneuver = Maneuver.STRAIGHT_5_STANDARD;

        // Run.
        final SSPosition result = maneuver.computeToPosition(fromPosition, ShipBase.LARGE);

        // Verify.
        assertNotNull(result);
        assertThat(result.getX(), is(fromPosition.getX() + 280));
        assertThat(result.getY(), is(fromPosition.getY() + 0));
        assertThat(result.getHeading(), is(fromPosition.getHeading()));
    }

    /**
     * Test the <code>computeToPosition()</code> method.
     */
    @Test
    public void computeToPositionStraightFive0Standard()
    {
        // Setup.
        final SSPosition fromPosition = new SSPosition(10, 20, 0);
        final Maneuver maneuver = Maneuver.STRAIGHT_5_STANDARD;

        // Run.
        final SSPosition result = maneuver.computeToPosition(fromPosition, ShipBase.STANDARD);

        // Verify.
        assertNotNull(result);
        assertThat(result.getX(), is(fromPosition.getX() + 240));
        assertThat(result.getY(), is(fromPosition.getY() + 0));
        assertThat(result.getHeading(), is(fromPosition.getHeading()));
    }

    /**
     * Test the <code>computeToPosition()</code> method.
     */
    @Test
    public void computeToPositionStraightOne0Large()
    {
        // Setup.
        final SSPosition fromPosition = new SSPosition(10, 20, 0);
        final Maneuver maneuver = Maneuver.STRAIGHT_1_EASY;

        // Run.
        final SSPosition result = maneuver.computeToPosition(fromPosition, ShipBase.LARGE);

        // Verify.
        assertNotNull(result);
        assertThat(result.getX(), is(fromPosition.getX() + 120));
        assertThat(result.getY(), is(fromPosition.getY()));
        assertThat(result.getHeading(), is(fromPosition.getHeading()));
    }

    /**
     * Test the <code>computeToPosition()</code> method.
     */
    @Test
    public void computeToPositionStraightOne0Standard()
    {
        // Setup.
        final SSPosition fromPosition = new SSPosition(10, 20, 0);
        final Maneuver maneuver = Maneuver.STRAIGHT_1_EASY;

        // Run.
        final SSPosition result = maneuver.computeToPosition(fromPosition, ShipBase.STANDARD);

        // Verify.
        assertNotNull(result);
        assertThat(result.getX(), is(fromPosition.getX() + 80));
        assertThat(result.getY(), is(fromPosition.getY()));
        assertThat(result.getHeading(), is(fromPosition.getHeading()));
    }

    /**
     * Test the <code>computeToPosition()</code> method.
     */
    @Test
    public void computeToPositionStraightOne30()
    {
        // Setup.
        final SSPosition fromPosition = new SSPosition(10, 50, 30);
        final Maneuver maneuver = Maneuver.STRAIGHT_1_EASY;

        // Run.
        final SSPosition result = maneuver.computeToPosition(fromPosition, ShipBase.STANDARD);

        // Verify.
        assertNotNull(result);
        assertThat(result.getX(), is(fromPosition.getX() + 69));
        assertThat(result.getY(), is(fromPosition.getY() + 40));
        assertThat(result.getHeading(), is(fromPosition.getHeading()));
    }

    /**
     * Test the <code>computeToPosition()</code> method.
     */
    @Test
    public void computeToPositionTurnLeftOne0()
    {
        // Setup.
        final SSPosition fromPosition = new SSPosition(20, 400, 0);
        final Maneuver maneuver = Maneuver.TURN_LEFT_1_STANDARD;

        // Run.
        final SSPosition result = maneuver.computeToPosition(fromPosition, ShipBase.STANDARD);

        // Verify.
        assertNotNull(result);
        assertThat(result.getX(), is(fromPosition.getX() + 54));
        assertThat(result.getY(), is(fromPosition.getY() - 54));
        assertThat(result.getHeading(), is(fromPosition.getHeading() + 270));
    }

    /**
     * Test the <code>computeToPosition()</code> method.
     */
    @Test
    public void computeToPositionTurnLeftThree0()
    {
        // Setup.
        final SSPosition fromPosition = new SSPosition(20, 400, 0);
        final Maneuver maneuver = Maneuver.TURN_LEFT_3_STANDARD;

        // Run.
        final SSPosition result = maneuver.computeToPosition(fromPosition, ShipBase.STANDARD);

        // Verify.
        assertNotNull(result);
        assertThat(result.getX(), is(fromPosition.getX() + 109));
        assertThat(result.getY(), is(fromPosition.getY() - 109));
        assertThat(result.getHeading(), is(fromPosition.getHeading() + 270));
    }

    /**
     * Test the <code>computeToPosition()</code> method.
     */
    @Test
    public void computeToPositionTurnRightOne0()
    {
        // Setup.
        final SSPosition fromPosition = new SSPosition(400, 20, 0);
        final Maneuver maneuver = Maneuver.TURN_RIGHT_1_STANDARD;

        // Run.
        final SSPosition result = maneuver.computeToPosition(fromPosition, ShipBase.STANDARD);

        // Verify.
        assertNotNull(result);
        assertThat(result.getX(), is(fromPosition.getX() + 54));
        assertThat(result.getY(), is(fromPosition.getY() + 54));
        assertThat(result.getHeading(), is(fromPosition.getHeading() + 90));
    }

    /**
     * Test the <code>computeToPosition()</code> method.
     */
    @Test
    public void computeToPositionTurnRightThree0()
    {
        // Setup.
        final SSPosition fromPosition = new SSPosition(400, 20, 0);
        final Maneuver maneuver = Maneuver.TURN_RIGHT_3_STANDARD;

        // Run.
        final SSPosition result = maneuver.computeToPosition(fromPosition, ShipBase.STANDARD);

        // Verify.
        assertNotNull(result);
        assertThat(result.getX(), is(fromPosition.getX() + 109));
        assertThat(result.getY(), is(fromPosition.getY() + 109));
        assertThat(result.getHeading(), is(fromPosition.getHeading() + 90));
    }

    /**
     * Test the <code>computeToPosition()</code> method.
     */
    @Test
    public void computeToPositionTurnRightTwo0()
    {
        // Setup.
        final SSPosition fromPosition = new SSPosition(400, 20, 0);
        final Maneuver maneuver = Maneuver.TURN_RIGHT_2_STANDARD;

        // Run.
        final SSPosition result = maneuver.computeToPosition(fromPosition, ShipBase.STANDARD);

        // Verify.
        assertNotNull(result);
        assertThat(result.getX(), is(fromPosition.getX() + 82));
        assertThat(result.getY(), is(fromPosition.getY() + 82));
        assertThat(result.getHeading(), is(fromPosition.getHeading() + 90));
    }

    /**
     * Test the <code>find()</code> method.
     */
    @Test
    public void find()
    {
        assertThat(Maneuver.find(Bearing.TURN_LEFT, 1, Difficulty.STANDARD), is(Maneuver.TURN_LEFT_1_STANDARD));
        assertThat(Maneuver.find(Bearing.BANK_LEFT, 1, Difficulty.STANDARD), is(Maneuver.BANK_LEFT_1_STANDARD));
        assertThat(Maneuver.find(Bearing.STRAIGHT, 1, Difficulty.STANDARD), is(Maneuver.STRAIGHT_1_STANDARD));
    }

    /**
     * Test the <code>getBearing()</code> method.
     */
    @Test
    public void getBearing()
    {
        assertThat(Maneuver.STRAIGHT_1_EASY.getBearing(), is(Bearing.STRAIGHT));
    }

    /**
     * Test the <code>getDifficulty()</code> method.
     */
    @Test
    public void getDifficulty()
    {
        assertThat(Maneuver.STRAIGHT_1_EASY.getDifficulty(), is(Difficulty.EASY));
    }

    /**
     * Test the <code>getRadius()</code> method.
     */
    @Test
    public void getRadius()
    {
        assertNull(Maneuver.STRAIGHT_1_EASY.getRadius());
        assertThat(Maneuver.BANK_RIGHT_1_EASY.getRadius(), is(82.6));
        assertThat(Maneuver.TURN_RIGHT_1_STANDARD.getRadius(), is(34.3));

        assertNull(Maneuver.STRAIGHT_2_EASY.getRadius());
        assertThat(Maneuver.BANK_RIGHT_2_EASY.getRadius(), is(127.0));
        assertThat(Maneuver.TURN_RIGHT_2_STANDARD.getRadius(), is(62.2));

        assertNull(Maneuver.STRAIGHT_3_STANDARD.getRadius());
        assertThat(Maneuver.BANK_RIGHT_3_STANDARD.getRadius(), is(177.8));
        assertThat(Maneuver.TURN_RIGHT_3_STANDARD.getRadius(), is(88.9));
    }

    /**
     * Test the <code>getSpeed()</code> method.
     */
    @Test
    public void getSpeed()
    {
        assertThat(Maneuver.STRAIGHT_1_EASY.getSpeed(), is(1));
    }

    /**
     * @param path Path.
     * 
     * @return the number of points.
     */
    private Point getLastPoint(final Path2D path)
    {
        final double[] coords = new double[6];

        for (final PathIterator iter = path.getPathIterator(null); !iter.isDone(); iter.next())
        {
            iter.currentSegment(coords);
        }

        return new Point(toInt(coords[0]), toInt(coords[1]));
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
     * @param path Path.
     * 
     * @return the number of points.
     */
    private int size(final Path2D path)
    {
        int answer = 0;

        final double[] coords = new double[6];

        for (final PathIterator iter = path.getPathIterator(null); !iter.isDone(); iter.next())
        {
            iter.currentSegment(coords);
            answer++;
        }

        return answer;
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

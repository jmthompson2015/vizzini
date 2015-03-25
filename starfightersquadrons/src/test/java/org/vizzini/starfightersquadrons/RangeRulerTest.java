package org.vizzini.starfightersquadrons;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.fail;

import org.junit.Test;
import org.vizzini.core.game.Agent;
import org.vizzini.starfightersquadrons.Pilot;
import org.vizzini.starfightersquadrons.RangeRuler;
import org.vizzini.starfightersquadrons.SSPosition;
import org.vizzini.starfightersquadrons.SSToken;
import org.vizzini.starfightersquadrons.RangeRuler.Range;

/**
 * Provides tests for the <code>Pilot</code> class.
 */
public final class RangeRulerTest
{
    /** Test data. */
    private final TestData testData = new TestData();

    /**
     * Test the <code>getRange()</code> method.
     */
    @Test
    public void getRangeNull()
    {
        // Setup.
        final Agent rebelAgent = testData.createRebelAgent();
        final SSToken attacker = new SSToken(Pilot.ROOKIE_PILOT, rebelAgent);
        final SSPosition attackerPosition = new SSPosition(0, 0, 0);
        final Agent imperialAgent = testData.createImperialAgent();
        final SSToken defender = new SSToken(Pilot.ACADEMY_PILOT, imperialAgent);
        final SSPosition defenderPosition = new SSPosition(0, 75, 180);
        final RangeRuler ruler = new RangeRuler();

        // Run. / Verify.
        try
        {
            ruler.getRange(null, attackerPosition, defender, defenderPosition);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("attacker is null."));
        }

        // Run. / Verify.
        try
        {
            ruler.getRange(attacker, null, defender, defenderPosition);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("attackerPosition is null."));
        }

        // Run. / Verify.
        try
        {
            ruler.getRange(attacker, attackerPosition, null, defenderPosition);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("defender is null."));
        }

        // Run. / Verify.
        try
        {
            ruler.getRange(attacker, attackerPosition, defender, null);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("defenderPosition is null."));
        }
    }

    /**
     * Test the <code>getRange()</code> method.
     */
    @Test
    public void getRangeOne()
    {
        // Setup.
        final Agent rebelAgent = testData.createRebelAgent();
        final SSToken attacker = new SSToken(Pilot.ROOKIE_PILOT, rebelAgent);
        final SSPosition attackerPosition = new SSPosition(0, 0, 0);
        final Agent imperialAgent = testData.createImperialAgent();
        final SSToken defender = new SSToken(Pilot.ACADEMY_PILOT, imperialAgent);
        final SSPosition defenderPosition = new SSPosition(0, 75, 180);
        final RangeRuler ruler = new RangeRuler();

        // Run.
        final Range result = ruler.getRange(attacker, attackerPosition, defender, defenderPosition);

        // Verify.
        assertNotNull(result);
        assertThat(result, is(Range.ONE));
    }

    /**
     * Test the <code>getRange()</code> method.
     */
    @Test
    public void getRangeOneEdgeLarge()
    {
        // Setup.
        final Agent imperialAgent = testData.createImperialAgent();
        final SSToken attacker = new SSToken(Pilot.ACADEMY_PILOT, imperialAgent);
        final SSPosition attackerPosition = new SSPosition(0, 0, 315);
        final Agent rebelAgent = testData.createRebelAgent();
        final SSToken defender = new SSToken(Pilot.OUTER_RIM_SMUGGLER, rebelAgent);
        final SSPosition defenderPosition0 = new SSPosition(0, 185, 135);
        final SSPosition defenderPosition1 = new SSPosition(0, 186, 135);
        final SSPosition defenderPosition2 = new SSPosition(185, 0, 135);
        final SSPosition defenderPosition3 = new SSPosition(186, 0, 135);
        final SSPosition defenderPosition4 = new SSPosition(0, 185, 225);
        final SSPosition defenderPosition5 = new SSPosition(0, 186, 225);
        final SSPosition defenderPosition6 = new SSPosition(185, 0, 225);
        final SSPosition defenderPosition7 = new SSPosition(186, 0, 225);
        final SSPosition defenderPosition8 = new SSPosition(168, 0, 180);
        final SSPosition defenderPosition9 = new SSPosition(169, 0, 180);
        final RangeRuler ruler = new RangeRuler();

        // Run / Verify.
        assertThat(ruler.getRange(attacker, attackerPosition, defender, defenderPosition0), is(Range.ONE));
        assertThat(ruler.getRange(attacker, attackerPosition, defender, defenderPosition1), is(Range.TWO));
        assertThat(ruler.getRange(attacker, attackerPosition, defender, defenderPosition2), is(Range.ONE));
        assertThat(ruler.getRange(attacker, attackerPosition, defender, defenderPosition3), is(Range.TWO));
        assertThat(ruler.getRange(attacker, attackerPosition, defender, defenderPosition4), is(Range.ONE));
        assertThat(ruler.getRange(attacker, attackerPosition, defender, defenderPosition5), is(Range.TWO));
        assertThat(ruler.getRange(attacker, attackerPosition, defender, defenderPosition6), is(Range.ONE));
        assertThat(ruler.getRange(attacker, attackerPosition, defender, defenderPosition7), is(Range.TWO));
        assertThat(ruler.getRange(attacker, attackerPosition, defender, defenderPosition8), is(Range.ONE));
        assertThat(ruler.getRange(attacker, attackerPosition, defender, defenderPosition9), is(Range.TWO));
    }

    /**
     * Test the <code>getRange()</code> method.
     */
    @Test
    public void getRangeOneEdgeStandard()
    {
        // Setup.
        final Agent rebelAgent = testData.createRebelAgent();
        final SSToken attacker = new SSToken(Pilot.ROOKIE_PILOT, rebelAgent);
        final SSPosition attackerPosition = new SSPosition(0, 0, 315);
        final Agent imperialAgent = testData.createImperialAgent();
        final SSToken defender = new SSToken(Pilot.ACADEMY_PILOT, imperialAgent);
        final SSPosition defenderPosition0 = new SSPosition(0, 156, 135);
        final SSPosition defenderPosition1 = new SSPosition(0, 157, 135);
        final SSPosition defenderPosition2 = new SSPosition(156, 0, 135);
        final SSPosition defenderPosition3 = new SSPosition(157, 0, 135);
        final SSPosition defenderPosition4 = new SSPosition(0, 156, 225);
        final SSPosition defenderPosition5 = new SSPosition(0, 157, 225);
        final SSPosition defenderPosition6 = new SSPosition(156, 0, 225);
        final SSPosition defenderPosition7 = new SSPosition(157, 0, 225);
        final SSPosition defenderPosition8 = new SSPosition(148, 0, 180);
        final SSPosition defenderPosition9 = new SSPosition(149, 0, 180);
        final RangeRuler ruler = new RangeRuler();

        // Run / Verify.
        assertThat(ruler.getRange(attacker, attackerPosition, defender, defenderPosition0), is(Range.ONE));
        assertThat(ruler.getRange(attacker, attackerPosition, defender, defenderPosition1), is(Range.TWO));
        assertThat(ruler.getRange(attacker, attackerPosition, defender, defenderPosition2), is(Range.ONE));
        assertThat(ruler.getRange(attacker, attackerPosition, defender, defenderPosition3), is(Range.TWO));
        assertThat(ruler.getRange(attacker, attackerPosition, defender, defenderPosition4), is(Range.ONE));
        assertThat(ruler.getRange(attacker, attackerPosition, defender, defenderPosition5), is(Range.TWO));
        assertThat(ruler.getRange(attacker, attackerPosition, defender, defenderPosition6), is(Range.ONE));
        assertThat(ruler.getRange(attacker, attackerPosition, defender, defenderPosition7), is(Range.TWO));
        assertThat(ruler.getRange(attacker, attackerPosition, defender, defenderPosition8), is(Range.ONE));
        assertThat(ruler.getRange(attacker, attackerPosition, defender, defenderPosition9), is(Range.TWO));
    }

    /**
     * Test the <code>getRange()</code> method.
     */
    @Test
    public void getRangeThree()
    {
        // Setup.
        final Agent rebelAgent = testData.createRebelAgent();
        final SSToken attacker = new SSToken(Pilot.ROOKIE_PILOT, rebelAgent);
        final SSPosition attackerPosition = new SSPosition(0, 0, 0);
        final Agent imperialAgent = testData.createImperialAgent();
        final SSToken defender = new SSToken(Pilot.ACADEMY_PILOT, imperialAgent);
        final SSPosition defenderPosition = new SSPosition(0, 275, 180);
        final RangeRuler ruler = new RangeRuler();

        // Run.
        final Range result = ruler.getRange(attacker, attackerPosition, defender, defenderPosition);

        // Verify.
        assertNotNull(result);
        assertThat(result, is(Range.THREE));
    }

    /**
     * Test the <code>getRange()</code> method.
     */
    @Test
    public void getRangeTwo()
    {
        // Setup.
        final Agent rebelAgent = testData.createRebelAgent();
        final SSToken attacker = new SSToken(Pilot.ROOKIE_PILOT, rebelAgent);
        final SSPosition attackerPosition = new SSPosition(0, 0, 0);
        final Agent imperialAgent = testData.createImperialAgent();
        final SSToken defender = new SSToken(Pilot.ACADEMY_PILOT, imperialAgent);
        final SSPosition defenderPosition = new SSPosition(0, 175, 180);
        final RangeRuler ruler = new RangeRuler();

        // Run.
        final Range result = ruler.getRange(attacker, attackerPosition, defender, defenderPosition);

        // Verify.
        assertNotNull(result);
        assertThat(result, is(Range.TWO));
    }
}

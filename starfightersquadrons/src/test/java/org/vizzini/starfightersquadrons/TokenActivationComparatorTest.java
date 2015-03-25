package org.vizzini.starfightersquadrons;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.junit.Test;
import org.vizzini.core.game.Agent;
import org.vizzini.starfightersquadrons.Pilot;
import org.vizzini.starfightersquadrons.TokenActivationComparator;
import org.vizzini.starfightersquadrons.SSToken;

/**
 * Provides tests for the <code>TokenActivationComparator</code> class.
 */
public final class TokenActivationComparatorTest
{
    /** Test data. */
    private final TestData testData = new TestData();

    /**
     * Test the <code>compare()</code> method.
     */
    @Test
    public void compare()
    {
        // Setup.
        final TokenActivationComparator comparator = new TokenActivationComparator();
        final Agent imperialAgent = testData.createImperialAgent();
        final Agent rebelAgent = testData.createRebelAgent();
        final SSToken token0 = new SSToken(Pilot.ACADEMY_PILOT, imperialAgent);
        final SSToken token1 = new SSToken(Pilot.HOWLRUNNER, imperialAgent);
        final SSToken token2 = new SSToken(Pilot.ROOKIE_PILOT, rebelAgent);
        final SSToken token3 = new SSToken(Pilot.LUKE_SKYWALKER, rebelAgent);

        // Run / Verify.
        assertThat(comparator.compare(token0, token0), is(0));
        assertThat(comparator.compare(token1, token1), is(0));
        assertThat(comparator.compare(token2, token2), is(0));
        assertThat(comparator.compare(token3, token3), is(0));

        assertTrue(comparator.compare(token0, token1) < 0);
        assertTrue(comparator.compare(token0, token2) < 0);
        assertTrue(comparator.compare(token0, token3) < 0);

        assertTrue(comparator.compare(token1, token0) > 0);
        assertTrue(comparator.compare(token1, token2) > 0);
        assertTrue(comparator.compare(token1, token3) < 0);

        assertTrue(comparator.compare(token2, token0) > 0);
        assertTrue(comparator.compare(token2, token1) < 0);
        assertTrue(comparator.compare(token2, token3) < 0);

        assertTrue(comparator.compare(token3, token0) > 0);
        assertTrue(comparator.compare(token3, token1) > 0);
        assertTrue(comparator.compare(token3, token2) > 0);
    }

    /**
     * Test the <code>compare()</code> method.
     */
    @Test
    public void sortList()
    {
        // Setup.
        final TokenActivationComparator comparator = new TokenActivationComparator();
        final Agent imperialAgent = testData.createImperialAgent();
        final Agent rebelAgent = testData.createRebelAgent();
        final SSToken token0 = new SSToken(Pilot.ACADEMY_PILOT, imperialAgent);
        final SSToken token1 = new SSToken(Pilot.HOWLRUNNER, imperialAgent);
        final SSToken token2 = new SSToken(Pilot.ROOKIE_PILOT, rebelAgent);
        final SSToken token3 = new SSToken(Pilot.LUKE_SKYWALKER, rebelAgent);

        // Run / Verify.
        final List<SSToken> tokens = new ArrayList<SSToken>();

        tokens.add(token0);
        tokens.add(token1);
        tokens.add(token2);
        tokens.add(token3);

        Collections.shuffle(tokens);
        Collections.sort(tokens, comparator);

        assertThat(tokens.get(0), is(token0));
        assertThat(tokens.get(1), is(token2));
        assertThat(tokens.get(2), is(token1));
        assertThat(tokens.get(3), is(token3));
    }
}

package org.vizzini.starfightersquadrons;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertThat;

import java.util.List;

import org.junit.Test;
import org.vizzini.starfightersquadrons.Pilot;
import org.vizzini.starfightersquadrons.TargetLock;
import org.vizzini.starfightersquadrons.SSAgent;
import org.vizzini.starfightersquadrons.SSEnvironment;
import org.vizzini.starfightersquadrons.SSPosition;
import org.vizzini.starfightersquadrons.SSTeam;
import org.vizzini.starfightersquadrons.SSToken;

/**
 * Provides tests for the <code>TargetLock</code> class.
 */
public final class TargetLockTest
{
    /** Test data. */
    private final TestData testData = new TestData();

    /**
     * Test the <code>findForAttacker()</code> method.
     */
    @Test
    public void findForAttacker()
    {
        // Setup.
        final SSEnvironment environment = testData.createEnvironment();
        final List<SSToken> imperialTokens = environment.getAttackers(SSTeam.IMPERIAL);
        final List<SSToken> rebelTokens = environment.getAttackers(SSTeam.REBEL);
        final TargetLock targetLock0 = TargetLock.getInstance(imperialTokens.get(0), rebelTokens.get(0));
        final TargetLock targetLock1 = TargetLock.getInstance(imperialTokens.get(1), rebelTokens.get(1));
        TargetLock.freeInstance(targetLock0);
        final TargetLock targetLock2 = TargetLock.getInstance(imperialTokens.get(0), rebelTokens.get(1));

        // Run / Verify.
        assertThat(TargetLock.findForAttacker(imperialTokens.get(0)), is(targetLock2));
        assertThat(TargetLock.findForAttacker(imperialTokens.get(1)), is(targetLock1));
        assertNull(TargetLock.findForAttacker(rebelTokens.get(0)));
        assertNull(TargetLock.findForAttacker(rebelTokens.get(1)));

        TargetLock.freeInstance(targetLock1);
        TargetLock.freeInstance(targetLock2);
    }

    /**
     * Test the <code>getInstance()</code> method.
     */
    @Test
    public void getInstance()
    {
        // Setup.
        final SSEnvironment environment = testData.createEnvironment();
        final List<SSToken> imperialTokens = environment.getAttackers(SSTeam.IMPERIAL);
        final List<SSToken> rebelTokens = environment.getAttackers(SSTeam.REBEL);
        final TargetLock targetLock0 = TargetLock.getInstance(imperialTokens.get(0), rebelTokens.get(0));
        final TargetLock targetLock1 = TargetLock.getInstance(imperialTokens.get(1), rebelTokens.get(1));

        // Verify.
        assertThat(targetLock0.getName(), is("A"));
        assertThat(targetLock1.getName(), is("B"));

        TargetLock.freeInstance(targetLock0);
        TargetLock.freeInstance(targetLock1);
    }

    /**
     * Test the <code>getInstance()</code> method.
     */
    @Test
    public void getInstanceReassign()
    {
        // Setup.
        final SSEnvironment environment = testData.createEnvironment();
        final SSAgent imperialAgent = environment.getImperialAgent();
        environment.placeToken(new SSPosition((SSPosition.MAX_X / 2) - 200, 21, 90), new SSToken(
                Pilot.OBSIDIAN_SQUADRON_PILOT, imperialAgent));
        environment.placeToken(new SSPosition((SSPosition.MAX_X / 2) + 200, 21, 90), new SSToken(
                Pilot.BLACK_SQUADRON_PILOT, imperialAgent));
        final List<SSToken> imperialTokens = environment.getAttackers(SSTeam.IMPERIAL);
        final List<SSToken> rebelTokens = environment.getAttackers(SSTeam.REBEL);
        TargetLock targetLock0 = TargetLock.getInstance(imperialTokens.get(0), rebelTokens.get(0));
        TargetLock targetLock1 = TargetLock.getInstance(imperialTokens.get(1), rebelTokens.get(1));

        // Verify.
        assertNotNull(targetLock0);
        assertNotNull(targetLock1);
        assertThat(targetLock0.getName(), is("A"));
        assertThat(targetLock1.getName(), is("B"));

        TargetLock.freeInstance(targetLock0);
        targetLock0 = null;
        TargetLock targetLock2 = TargetLock.getInstance(imperialTokens.get(2), rebelTokens.get(1));

        assertNotNull(targetLock2);
        assertThat(targetLock1.getName(), is("B"));
        assertThat(targetLock2.getName(), is("A"));

        TargetLock targetLock3 = TargetLock.getInstance(imperialTokens.get(3), rebelTokens.get(1));
        assertThat(targetLock3.getName(), is("C"));

        TargetLock.freeInstance(targetLock1);
        targetLock1 = null;
        TargetLock.freeInstance(targetLock2);
        targetLock2 = null;
        TargetLock.freeInstance(targetLock3);
        targetLock3 = null;
    }

    /**
     * Test the <code>valuesForDefender()</code> method.
     */
    @Test
    public void valuesForDefender()
    {
        // Setup.
        final SSEnvironment environment = testData.createEnvironment();
        final SSAgent imperialAgent = environment.getImperialAgent();
        environment.placeToken(new SSPosition((SSPosition.MAX_X / 2) - 200, 21, 90), new SSToken(
                Pilot.OBSIDIAN_SQUADRON_PILOT, imperialAgent));
        final List<SSToken> imperialTokens = environment.getAttackers(SSTeam.IMPERIAL);
        final List<SSToken> rebelTokens = environment.getAttackers(SSTeam.REBEL);
        final TargetLock targetLock0 = TargetLock.getInstance(imperialTokens.get(0), rebelTokens.get(0));
        final TargetLock targetLock1 = TargetLock.getInstance(imperialTokens.get(1), rebelTokens.get(1));
        final TargetLock targetLock2 = TargetLock.getInstance(imperialTokens.get(2), rebelTokens.get(1));

        // Run.
        List<TargetLock> result = TargetLock.valuesForDefender(rebelTokens.get(0));

        // Verify.
        assertNotNull(result);
        assertThat(result.size(), is(1));
        assertThat(result.get(0), is(targetLock0));

        // Run.
        result = TargetLock.valuesForDefender(rebelTokens.get(1));

        // Verify.
        assertNotNull(result);
        assertThat(result.size(), is(2));
        assertThat(result.get(0), is(targetLock1));
        assertThat(result.get(1), is(targetLock2));

        TargetLock.freeInstance(targetLock0);
        TargetLock.freeInstance(targetLock1);
        TargetLock.freeInstance(targetLock2);
    }
}

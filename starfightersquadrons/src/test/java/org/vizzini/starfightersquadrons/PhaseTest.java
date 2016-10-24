package org.vizzini.starfightersquadrons;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;

import org.junit.Test;
import org.vizzini.starfightersquadrons.Phase;

/**
 * Provides tests for the <code>Phase</code> class.
 */
public final class PhaseTest
{
    /**
     * Test the <code>getDisplayName()</code> method.
     */
    @Test
    public void getDisplayName()
    {
        assertThat(Phase.PLANNING_START.getDisplayName(), is("Planning (start)"));
        assertThat(Phase.END_END.getDisplayName(), is("End (end)"));
    }

    /**
     * Test the <code>values()</code> method.
     */
    @Test
    public void values()
    {
        assertThat(Phase.values().length, is(17));
    }
}

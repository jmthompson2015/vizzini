package org.vizzini.starfightersquadrons;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;

import org.junit.Test;

/**
 * Provides tests for the <code>SSTeam</code> class.
 */
public final class SSTeamTest
{
    /**
     * Test the <code>opposite()</code> method.
     */
    @Test
    public void opposite()
    {
        assertThat(SSTeam.IMPERIAL.opposite(), is(SSTeam.REBEL));
        assertThat(SSTeam.REBEL.opposite(), is(SSTeam.IMPERIAL));
    }

    /**
     * Test the <code>values()</code> method.
     */
    @Test
    public void values()
    {
        // Run.
        final SSTeam[] result = SSTeam.values();

        // Verify.
        assertNotNull(result);
        assertThat(result.length, is(2));
        assertThat(result[0], is(SSTeam.IMPERIAL));
        assertThat(result[1], is(SSTeam.REBEL));
    }
}

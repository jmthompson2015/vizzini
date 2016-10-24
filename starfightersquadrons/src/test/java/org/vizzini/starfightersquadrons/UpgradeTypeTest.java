package org.vizzini.starfightersquadrons;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;

import org.junit.Test;
import org.vizzini.starfightersquadrons.UpgradeType;

/**
 * Provides tests for the <code>UpgradeType</code> class.
 */
public final class UpgradeTypeTest
{
    /**
     * Test the <code>values()</code> method.
     */
    @Test
    public void values()
    {
        assertThat(UpgradeType.values().length, is(14));
    }
}

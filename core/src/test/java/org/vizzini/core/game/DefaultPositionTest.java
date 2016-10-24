package org.vizzini.core.game;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;

import org.junit.Test;

/**
 * Provides tests for the <code>DefaultPosition</code> class.
 */
public final class DefaultPositionTest
{
    /**
     * Test the <code>DefaultPosition()</code> method.
     */
    @Test
    public void testConstructorInteger()
    {
        // Setup.
        final Position<Integer> toPosition = new DefaultPosition<Integer>(1, 2, 3);

        // Run / Verify.
        assertThat(toPosition.getX(), is(1));
        assertThat(toPosition.getY(), is(2));
        assertThat(toPosition.getZ(), is(3));
    }
}

package org.vizzini.core.game;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;

import org.junit.Test;

/**
 * Provides tests for the <code>SynchronousEngine</code> class.
 */
public final class SynchronousEngineTest
{
    /**
     * Test the <code>SynchronousEngine()</code> method.
     */
    @Test
    public void testConstructor()
    {
        // Setup.
        final String name = "engine";
        final String description = "some engine";

        // Run.
        final Engine result = new SynchronousEngine(name, description);

        // Verify.
        assertNotNull(result);
        assertThat(result.getName(), is("engine"));
        assertThat(result.getDescription(), is("some engine"));
    }
}

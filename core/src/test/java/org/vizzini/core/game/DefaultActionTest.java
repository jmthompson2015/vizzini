package org.vizzini.core.game;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;

import org.junit.Test;

/**
 * Provides tests for the <code>DefaultAction</code> class.
 */
public final class DefaultActionTest
{
    /**
     * Test the <code>DefaultAction()</code> method.
     */
    @Test
    public void testConstructor()
    {
        // Setup.
        final DefaultGameInjector injector = new DefaultGameInjector();
        final Environment environment = injector.injectEnvironment();
        final Team team = injector.injectTeamBlack();
        final Agent agent = new DefaultAgent("name", "description", team);

        // Run.
        final Action result = new DefaultAction(environment, agent);

        // Verify.
        assertThat(result.getEnvironment(), is(environment));
        assertThat(result.getAgent(), is(agent));
    }
}

package org.vizzini.starfightersquadrons.swingui;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;

import javax.swing.JFrame;

import org.junit.Test;
import org.vizzini.starfightersquadrons.CoreSetSquadBuilder;
import org.vizzini.starfightersquadrons.SSAgent;
import org.vizzini.starfightersquadrons.SSTeam;
import org.vizzini.starfightersquadrons.SimpleAgent;
import org.vizzini.starfightersquadrons.SquadBuilder;

/**
 * Provides tests for the <code>SSAgentFactory</code> class.
 */
public final class SSAgentFactoryTest
{
    /**
     * Test the <code>create()</code> method.
     */
    @Test
    public void createThreeArgImperial()
    {
        // Setup.
        final Class<?> agentType = SimpleAgent.class;
        final String name = "Darth Vader";
        final SSTeam team = SSTeam.IMPERIAL;
        final JFrame parentComponent = null;
        final SquadBuilder squadBuilder = CoreSetSquadBuilder.createImperial();
        final SSAgentFactory factory = new SSAgentFactory();

        // Run.
        final SSAgent result = factory.create(agentType, name, team, parentComponent, squadBuilder);

        // Verify.
        assertNotNull(result);
        assertThat(result, is(agentType));
        assertThat(result.getName(), is(name));
        assertThat((SSTeam)result.getTeam(), is(team));
    }

    /**
     * Test the <code>create()</code> method.
     */
    @Test
    public void createThreeArgRebel()
    {
        // Setup.
        final Class<?> agentType = SimpleAgent.class;
        final String name = "Luke Skywalker";
        final SSTeam team = SSTeam.REBEL;
        final JFrame parentComponent = null;
        final SquadBuilder squadBuilder = CoreSetSquadBuilder.createRebel();
        final SSAgentFactory factory = new SSAgentFactory();

        // Run.
        final SSAgent result = factory.create(agentType, name, team, parentComponent, squadBuilder);

        // Verify.
        assertNotNull(result);
        assertThat(result, is(agentType));
        assertThat(result.getName(), is(name));
        assertThat((SSTeam)result.getTeam(), is(team));
    }
}

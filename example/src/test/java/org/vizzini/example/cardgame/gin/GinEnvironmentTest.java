package org.vizzini.example.cardgame.gin;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;

import java.util.ArrayList;
import java.util.List;

import org.junit.Test;
import org.vizzini.core.game.Agent;
import org.vizzini.core.game.DefaultAgent;

/**
 * Provides tests for the <code>GinEnvironment</code> class.
 */
public final class GinEnvironmentTest
{
    /**
     * Test the <code>getTokenCount()</code> method.
     */
    @Test
    public void getTokenCount()
    {
        // Setup.
        final GinGameInjector injector = new GinGameInjector();
        final GinEnvironment environment = injector.injectEnvironment();
        final Agent firstAgent = new DefaultAgent("first", "first", GinTeam.FIRST);
        final Agent secondAgent = new DefaultAgent("second", "second", GinTeam.SECOND);
        final List<Agent> agents = new ArrayList<Agent>();
        agents.add(firstAgent);
        agents.add(secondAgent);
        environment.placeInitialTokens(agents);

        // Run / Verify.
        assertThat(environment.getTokenCount(), is(52));
    }

    /**
     * Test the <code>getTokenCountFor()</code> method.
     */
    @Test
    public void getTokenCountForAgent()
    {
        // Setup.
        final GinGameInjector injector = new GinGameInjector();
        final GinEnvironment environment = injector.injectEnvironment();
        final Agent firstAgent = new DefaultAgent("first", "first", GinTeam.FIRST);
        final Agent secondAgent = new DefaultAgent("second", "second", GinTeam.SECOND);
        final List<Agent> agents = new ArrayList<Agent>();
        agents.add(firstAgent);
        agents.add(secondAgent);
        environment.placeInitialTokens(agents);

        // Run / Verify.
        assertThat(environment.getTokenCountFor(firstAgent), is(10));
        assertThat(environment.getTokenCountFor(secondAgent), is(10));
    }

    /**
     * Test the <code>getTokenCountFor()</code> method.
     */
    @Test
    public void getTokenCountForTeam()
    {
        // Setup.
        final GinGameInjector injector = new GinGameInjector();
        final GinEnvironment environment = injector.injectEnvironment();
        final Agent firstAgent = new DefaultAgent("first", "first", GinTeam.FIRST);
        final Agent secondAgent = new DefaultAgent("second", "second", GinTeam.SECOND);
        final List<Agent> agents = new ArrayList<Agent>();
        agents.add(firstAgent);
        agents.add(secondAgent);
        environment.placeInitialTokens(agents);

        // Run / Verify.
        assertThat(environment.getTokenCountFor(GinTeam.FIRST), is(10));
        assertThat(environment.getTokenCountFor(GinTeam.SECOND), is(10));
    }

    /**
     * Test the <code>placeInitialTokens()</code> method.
     */
    @Test
    public void placeInitialTokens()
    {
        // Setup.
        final GinGameInjector injector = new GinGameInjector();
        final GinEnvironment environment = injector.injectEnvironment();
        final Agent firstAgent = new DefaultAgent("first", "first", GinTeam.FIRST);
        final Agent secondAgent = new DefaultAgent("second", "second", GinTeam.SECOND);
        final List<Agent> agents = new ArrayList<Agent>();
        agents.add(firstAgent);
        agents.add(secondAgent);

        // Run.
        environment.placeInitialTokens(agents);

        // Verify.
        assertThat(environment.getStockPile().size(), is(31));
        assertThat(environment.getDiscardPile().size(), is(1));
        assertThat(environment.getHandFor(firstAgent).size(), is(10));
        assertThat(environment.getHandFor(secondAgent).size(), is(10));
    }
}

package org.vizzini.example.boardgame.reversi;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;

import java.util.ArrayList;
import java.util.List;

import org.junit.Test;
import org.vizzini.core.game.Agent;
import org.vizzini.core.game.DefaultAgent;

/**
 * Provides tests for the <code>ReversiAction</code> class.
 */
public final class ReversiActionTest
{
    /**
     * Test the <code>doIt()</code> method.
     */
    @Test
    public void doIt()
    {
        final ReversiGameInjector injector = new ReversiGameInjector();
        final ReversiEnvironment environment = injector.injectEnvironment();
        final Agent agentBlack = new DefaultAgent(ReversiTeam.BLACK.getName(), ReversiTeam.BLACK.getDescription(),
                ReversiTeam.BLACK);
        final Agent agentWhite = new DefaultAgent(ReversiTeam.WHITE.getName(), ReversiTeam.WHITE.getDescription(),
                ReversiTeam.WHITE);
        final List<Agent> agents = new ArrayList<Agent>();
        agents.add(agentBlack);
        agents.add(agentWhite);
        environment.placeInitialTokens(agents);

        // Initially black.
        assertThat(environment.getTokenAt(ReversiPosition.CENTER1).getTeam(), is(ReversiTeam.BLACK));

        final ReversiPosition toPosition = ReversiPosition.f4;
        final ReversiToken token = ReversiToken.WHITE.withAgent(agentWhite);

        final ReversiAction action = new ReversiAction(environment, toPosition, token);
        action.doIt();
        // This one was placed.
        assertThat(environment.getTokenAt(toPosition).getTeam(), is(ReversiTeam.WHITE));
        // This one got flipped.
        assertThat(environment.getTokenAt(ReversiPosition.CENTER1).getTeam(), is(ReversiTeam.WHITE));
    }

    /**
     * Test the <code>doIt()</code> method.
     */
    @Test
    public void doItEdge()
    {
        final ReversiGameInjector injector = new ReversiGameInjector();
        final ReversiEnvironment environment = injector.injectEnvironment();
        final Agent agentBlack = new DefaultAgent(ReversiTeam.BLACK.getName(), ReversiTeam.BLACK.getDescription(),
                ReversiTeam.BLACK);
        final Agent agentWhite = new DefaultAgent(ReversiTeam.WHITE.getName(), ReversiTeam.WHITE.getDescription(),
                ReversiTeam.WHITE);
        final List<Agent> agents = new ArrayList<Agent>();
        agents.add(agentBlack);
        agents.add(agentWhite);
        environment.placeInitialTokens(agents);
        environment.placeToken(ReversiPosition.g4, ReversiToken.BLACK.withAgent(agentBlack));
        environment.placeToken(ReversiPosition.h4, ReversiToken.BLACK.withAgent(agentBlack));

        // Initially black.
        assertThat(environment.getTokenAt(ReversiPosition.CENTER1).getName(), is(ReversiTeam.BLACK.getName()));

        final ReversiPosition toPosition = ReversiPosition.f4;
        final ReversiToken token = ReversiToken.WHITE.withAgent(agentWhite);

        final ReversiAction action = new ReversiAction(environment, toPosition, token);
        action.doIt();
        // This one was placed.
        assertThat(environment.getTokenAt(toPosition).getName(), is(ReversiTeam.WHITE.getName()));
        // This one got flipped.
        assertThat(environment.getTokenAt(ReversiPosition.CENTER1).getName(), is(ReversiTeam.WHITE.getName()));
    }

    /**
     * Test the <code>undoIt()</code> method.
     */
    @Test
    public void undoIt()
    {
        // Setup.
        final ReversiGameInjector injector = new ReversiGameInjector();
        final ReversiEnvironment environment = injector.injectEnvironment();
        final Agent agentBlack = new DefaultAgent(ReversiTeam.BLACK.getName(), ReversiTeam.BLACK.getDescription(),
                ReversiTeam.BLACK);
        final Agent agentWhite = new DefaultAgent(ReversiTeam.WHITE.getName(), ReversiTeam.WHITE.getDescription(),
                ReversiTeam.WHITE);
        final List<Agent> agents = new ArrayList<Agent>();
        agents.add(agentBlack);
        agents.add(agentWhite);
        environment.placeInitialTokens(agents);
        assertThat(environment.getTokenCount(), is(4));
        assertThat(environment.getTokenAt(ReversiPosition.CENTER0).getTeam(), is(ReversiTeam.WHITE));
        assertThat(environment.getTokenAt(ReversiPosition.CENTER1).getTeam(), is(ReversiTeam.BLACK));
        assertThat(environment.getTokenAt(ReversiPosition.CENTER2).getTeam(), is(ReversiTeam.BLACK));
        assertThat(environment.getTokenAt(ReversiPosition.CENTER3).getTeam(), is(ReversiTeam.WHITE));

        final ReversiPosition toPosition = ReversiPosition.d3;
        final ReversiToken token = ReversiToken.BLACK.withAgent(agentBlack);
        final ReversiAction action = new ReversiAction(environment, toPosition, token);
        action.doIt();
        // System.out.println(environment);
        assertThat(environment.getTokenCount(), is(5));
        assertThat(environment.getTokenAt(ReversiPosition.d3).getTeam(), is(ReversiTeam.BLACK));
        assertThat(environment.getTokenAt(ReversiPosition.CENTER0).getTeam(), is(ReversiTeam.BLACK));
        assertThat(environment.getTokenAt(ReversiPosition.CENTER1).getTeam(), is(ReversiTeam.BLACK));
        assertThat(environment.getTokenAt(ReversiPosition.CENTER2).getTeam(), is(ReversiTeam.BLACK));
        assertThat(environment.getTokenAt(ReversiPosition.CENTER3).getTeam(), is(ReversiTeam.WHITE));

        // Run.
        action.undoIt();

        // Verify.
        // System.out.println(environment);
        assertThat(environment.getTokenCount(), is(4));
        assertThat(environment.getTokenAt(ReversiPosition.CENTER0).getTeam(), is(ReversiTeam.WHITE));
        assertThat(environment.getTokenAt(ReversiPosition.CENTER1).getTeam(), is(ReversiTeam.BLACK));
        assertThat(environment.getTokenAt(ReversiPosition.CENTER2).getTeam(), is(ReversiTeam.BLACK));
        assertThat(environment.getTokenAt(ReversiPosition.CENTER3).getTeam(), is(ReversiTeam.WHITE));
    }
}

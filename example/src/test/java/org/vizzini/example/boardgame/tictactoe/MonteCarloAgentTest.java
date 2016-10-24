package org.vizzini.example.boardgame.tictactoe;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;

import org.junit.Test;

/**
 * Provides tests for the <code>MonteCarloAgent</code> class.
 */
public final class MonteCarloAgentTest
{
    /** Trial count. */
    private static final int TRIAL_COUNT = 10000;

    /**
     * Test the <code>getAction()</code> method.
     */
    @Test
    public void getAction()
    {
        // Setup.
        final TTTGameInjector gameInjector = new TTTGameInjector();
        final TTTActionGenerator actionGenerator = gameInjector.injectActionGenerator();
        final MonteCarloAgent agent = new MonteCarloAgent(TTTTeam.X, actionGenerator, TRIAL_COUNT);
        final TTTEnvironment environment = gameInjector.injectEnvironment();
        final TTTAdjudicator adjudicator = gameInjector.injectAdjudicator();

        // Run.
        final TTTAction result = agent.getAction(environment, adjudicator);

        // Verify.
        assertNotNull(result);
        final TTTPosition position = result.getPosition();
        assertNotNull(position);
        // MonteCarloAgent selects a position randomly, so we can't check the coordinates.
        assertThat(result.getPosition(), is(TTTPosition.b2));
    }

    /**
     * Test the <code>getAction()</code> method.
     */
    @Test
    public void getAction2()
    {
        // Setup.
        final TTTGameInjector gameInjector = new TTTGameInjector();
        final TTTActionGenerator actionGenerator = gameInjector.injectActionGenerator();
        final MonteCarloAgent agentX = new MonteCarloAgent(TTTTeam.X, actionGenerator, TRIAL_COUNT);
        final SimpleAgent agentO = new SimpleAgent(TTTTeam.O, actionGenerator);
        final TTTEnvironment environment = gameInjector.injectEnvironment();
        environment.placeToken(TTTPosition.a1, TTTToken.X.withAgent(agentX));
        environment.placeToken(TTTPosition.b2, TTTToken.O.withAgent(agentO));
        final TTTAdjudicator adjudicator = gameInjector.injectAdjudicator();

        // Run.
        final TTTAction result = agentX.getAction(environment, adjudicator);

        // Verify.
        assertNotNull(result);
        final TTTPosition position = result.getPosition();
        assertNotNull(position);
        // MonteCarloAgent selects a position randomly, so we can't check the coordinates.
        // assertTrue(result.getPosition().isSide());
        // assertThat(result.getPosition(), is(TTTPosition.b1));
    }

    /**
     * Test the <code>getAction()</code> method.
     */
    @Test
    public void getAction4()
    {
        // Setup.
        final TTTGameInjector gameInjector = new TTTGameInjector();
        final TTTActionGenerator actionGenerator = gameInjector.injectActionGenerator();
        final MonteCarloAgent agentX = new MonteCarloAgent(TTTTeam.X, actionGenerator, TRIAL_COUNT);
        // final MonteCarloAgent agentX = new MonteCarloAgent( TTTTeam.X, actionGenerator, 1);
        final SimpleAgent agentO = new SimpleAgent(TTTTeam.O, actionGenerator);
        final TTTEnvironment environment = gameInjector.injectEnvironment();
        environment.placeToken(TTTPosition.a1, TTTToken.X.withAgent(agentX));
        environment.placeToken(TTTPosition.b2, TTTToken.O.withAgent(agentO));
        environment.placeToken(TTTPosition.a3, TTTToken.X.withAgent(agentX));
        environment.placeToken(TTTPosition.a2, TTTToken.O.withAgent(agentO));
        final TTTAdjudicator adjudicator = gameInjector.injectAdjudicator();
        // System.out.println(environment);

        // Run.
        final TTTAction result = agentX.getAction(environment, adjudicator);

        // Verify.
        assertNotNull(result);
        final TTTPosition position = result.getPosition();
        assertNotNull(position);
        assertThat(result.getPosition(), is(TTTPosition.c2));
    }

    /**
     * Test the <code>getAction()</code> method.
     */
    @Test
    public void getAction5()
    {
        // Setup.
        final TTTGameInjector gameInjector = new TTTGameInjector();
        final TTTActionGenerator actionGenerator = gameInjector.injectActionGenerator();
        final SimpleAgent agentX = new SimpleAgent(TTTTeam.X, actionGenerator);
        final MonteCarloAgent agentO = new MonteCarloAgent(TTTTeam.O, actionGenerator, TRIAL_COUNT);
        final TTTEnvironment environment = gameInjector.injectEnvironment();
        environment.placeToken(TTTPosition.a1, TTTToken.X.withAgent(agentX));
        environment.placeToken(TTTPosition.b2, TTTToken.O.withAgent(agentO));
        environment.placeToken(TTTPosition.a3, TTTToken.X.withAgent(agentX));
        environment.placeToken(TTTPosition.a2, TTTToken.O.withAgent(agentO));
        environment.placeToken(TTTPosition.c3, TTTToken.X.withAgent(agentX));
        final TTTAdjudicator adjudicator = gameInjector.injectAdjudicator();
        // System.out.println(environment);

        // Run.
        final TTTAction result = agentO.getAction(environment, adjudicator);

        // Verify.
        assertNotNull(result);
        final TTTPosition position = result.getPosition();
        assertNotNull(position);
        assertThat(result.getPosition(), is(TTTPosition.c2));
    }
}

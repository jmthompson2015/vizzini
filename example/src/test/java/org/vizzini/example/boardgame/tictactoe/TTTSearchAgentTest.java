package org.vizzini.example.boardgame.tictactoe;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;

import org.junit.Ignore;
import org.junit.Test;
import org.vizzini.core.game.Agent;
import org.vizzini.core.game.boardgame.AlphaBetaSearch;
import org.vizzini.core.game.boardgame.EnvironmentEvaluator;
import org.vizzini.core.game.boardgame.Search;

/**
 * Provides tests for the <code>TTTSearchAgent</code> class.
 */
public final class TTTSearchAgentTest
{
    /** Game injector. */
    private final TTTGameInjector gameInjector = new TTTGameInjector();

    /**
     * Test the <code>getAction()</code> method.
     */
    @Test
    public void getActionDepthOneOWins()
    {
        final TTTActionGenerator actionGenerator = gameInjector.injectActionGenerator();
        final SimpleAgent agentX = new SimpleAgent("X", TTTTeam.X, actionGenerator);
        final Search search = createSearch();
        final TTTSearchAgent agentO = new TTTSearchAgent("O", TTTTeam.O, search, 1);
        final TTTEnvironment environment = createEnvironmentDepthOne(agentX, agentO);
        environment.placeToken(TTTPosition.a2, TTTToken.X.withAgent(agentX));
        final TTTAdjudicator adjudicator = gameInjector.injectAdjudicator();

        final TTTAction result = agentO.getAction(environment, adjudicator);
        assertNotNull(result);
        // System.out.println("\nresult = " + result);
        final TTTPosition position = result.getPosition();
        assertNotNull(position);
        // System.out.println("position = " + position);
        assertThat(position, is(TTTPosition.c1));
        // assertTrue(result.getAgent() == agentO);
        assertThat((TTTSearchAgent)result.getAgent(), is(agentO));
        assertThat(result.getEnvironment(), is(environment));

        result.doIt();
        // System.out.println("final environment =\n" + environment);
    }

    /**
     * Test the <code>getAction()</code> method.
     */
    @Test
    public void getActionDepthOneXWins()
    {
        final Search search = createSearch();
        final TTTSearchAgent agentX = new TTTSearchAgent("X", TTTTeam.X, search, 1);
        final TTTActionGenerator actionGenerator = gameInjector.injectActionGenerator();
        final SimpleAgent agentO = new SimpleAgent("O", TTTTeam.O, actionGenerator);
        final TTTEnvironment environment = createEnvironmentDepthOne(agentX, agentO);
        final TTTAdjudicator adjudicator = gameInjector.injectAdjudicator();

        final TTTAction result = agentX.getAction(environment, adjudicator);
        assertNotNull(result);
        // System.out.println("\nresult = " + result);
        final TTTPosition position = result.getPosition();
        assertNotNull(position);
        // System.out.println("position = " + position);
        assertThat(position, is(TTTPosition.c1));
        assertThat((TTTSearchAgent)result.getAgent(), is(agentX));
        assertThat(result.getEnvironment(), is(environment));

        result.doIt();
        // System.out.println("final environment =\n" + environment);
    }

    /**
     * Test the <code>getAction()</code> method.
     */
    @Test
    public void getActionDepthOneXWins3()
    {
        final Search search = createSearch();
        final TTTSearchAgent agentX = new TTTSearchAgent("X", TTTTeam.X, search, 3);
        final TTTActionGenerator actionGenerator = gameInjector.injectActionGenerator();
        final SimpleAgent agentO = new SimpleAgent("O", TTTTeam.O, actionGenerator);
        final TTTEnvironment environment = createEnvironmentDepthOne(agentX, agentO);
        final TTTAdjudicator adjudicator = gameInjector.injectAdjudicator();

        final TTTAction result = agentX.getAction(environment, adjudicator);
        assertNotNull(result);
        // System.out.println("\nresult = " + result);
        final TTTPosition position = result.getPosition();
        assertNotNull(position);
        // System.out.println("position = " + position);
        assertThat(position, is(TTTPosition.c1));
        assertThat((TTTSearchAgent)result.getAgent(), is(agentX));
        assertThat(result.getEnvironment(), is(environment));

        result.doIt();
        // System.out.println("final environment =\n" + environment);
    }

    /**
     * Test the <code>getAction()</code> method.
     */
    @Test
    public void getActionDepthThreeOWins()
    {
        final TTTActionGenerator actionGenerator = gameInjector.injectActionGenerator();
        final SimpleAgent agentX = new SimpleAgent("X", TTTTeam.X, actionGenerator);
        final Search search = createSearch();
        final TTTSearchAgent agentO = new TTTSearchAgent("O", TTTTeam.O, search, 3);
        final TTTEnvironment environment = createEnvironmentDepthThree(agentX, agentO);
        environment.placeToken(TTTPosition.c1, TTTToken.X.withAgent(agentX));
        final TTTAdjudicator adjudicator = gameInjector.injectAdjudicator();

        final TTTAction result = agentO.getAction(environment, adjudicator);
        assertNotNull(result);
        // System.out.println("\nresult = " + result);
        final TTTPosition position = result.getPosition();
        assertNotNull(position);
        // System.out.println("position = " + position);
        assertThat(position, is(TTTPosition.b2));
        assertThat((TTTSearchAgent)result.getAgent(), is(agentO));
        assertThat(result.getEnvironment(), is(environment));

        result.doIt();
        // System.out.println("final environment =\n" + environment);
    }

    /**
     * Test the <code>getAction()</code> method.
     */
    @Test
    public void getActionDepthThreeXWins()
    {
        final Search search = createSearch();
        final TTTSearchAgent agentX = new TTTSearchAgent("X", TTTTeam.X, search, 3);
        final TTTActionGenerator actionGenerator = gameInjector.injectActionGenerator();
        final SimpleAgent agentO = new SimpleAgent("O", TTTTeam.O, actionGenerator);
        final TTTEnvironment environment = createEnvironmentDepthThree(agentX, agentO);
        final TTTAdjudicator adjudicator = gameInjector.injectAdjudicator();

        final TTTAction result = agentX.getAction(environment, adjudicator);
        assertNotNull(result);
        // System.out.println("\nresult = " + result);
        final TTTPosition position = result.getPosition();
        assertNotNull(position);
        // System.out.println("position = " + position);
        assertThat(position, is(TTTPosition.c3));
        assertThat((TTTSearchAgent)result.getAgent(), is(agentX));
        assertThat(result.getEnvironment(), is(environment));

        result.doIt();
        // System.out.println("final environment =\n" + environment);
    }

    /**
     * Test the <code>getAction()</code> method.
     */
    @Ignore
    @Test
    public void getActionDepthTwoXWins()
    {
        final Search search = createSearch();
        final TTTSearchAgent agentX = new TTTSearchAgent("X", TTTTeam.X, search, 3);
        final TTTActionGenerator actionGenerator = gameInjector.injectActionGenerator();
        final SimpleAgent agentO = new SimpleAgent("O", TTTTeam.O, actionGenerator);
        final TTTEnvironment environment = createEnvironmentDepthTwo(agentX, agentO);
        final TTTAdjudicator adjudicator = gameInjector.injectAdjudicator();

        final TTTAction result = agentX.getAction(environment, adjudicator);
        assertNotNull(result);
        // System.out.println("\nresult = " + result);
        final TTTPosition position = result.getPosition();
        assertNotNull(position);
        // System.out.println("position = " + position);
        assertThat(position, is(TTTPosition.c1));
        assertThat((TTTSearchAgent)result.getAgent(), is(agentX));
        assertThat(result.getEnvironment(), is(environment));

        result.doIt();
        // System.out.println("final environment =\n" + environment);
    }

    /**
     * @param agentX Agent X.
     * @param agentO Agent O.
     * 
     * @return a new environment.
     */
    private TTTEnvironment createEnvironmentDepthOne(final Agent agentX, final Agent agentO)
    {
        final TTTEnvironment environment = gameInjector.injectEnvironment();
        environment.placeToken(TTTPosition.a3, TTTToken.X.withAgent(agentX));
        environment.placeToken(TTTPosition.a1, TTTToken.O.withAgent(agentO));
        environment.placeToken(TTTPosition.CENTER, TTTToken.X.withAgent(agentX));
        environment.placeToken(TTTPosition.b1, TTTToken.O.withAgent(agentO));
        // System.out.println("initial environment =\n" + environment);

        return environment;
    }

    /**
     * @param agentX Agent X.
     * @param agentO Agent O.
     * 
     * @return a new environment.
     */
    private TTTEnvironment createEnvironmentDepthThree(final Agent agentX, final Agent agentO)
    {
        final TTTEnvironment environment = gameInjector.injectEnvironment();
        environment.placeToken(TTTPosition.a3, TTTToken.X.withAgent(agentX));
        environment.placeToken(TTTPosition.a1, TTTToken.O.withAgent(agentO));
        // environment.placeToken(TTTPosition.CENTER, TTTToken.X.withAgent(agentX));
        // environment.placeToken(TTTPosition.b1, TTTToken.O.withAgent(agentO));
        // System.out.println("initial environment =\n" + environment);

        return environment;
    }

    /**
     * @param agentX Agent X.
     * @param agentO Agent O.
     * 
     * @return a new environment.
     */
    private TTTEnvironment createEnvironmentDepthTwo(final Agent agentX, final Agent agentO)
    {
        final TTTEnvironment environment = gameInjector.injectEnvironment();
        environment.placeToken(TTTPosition.a3, TTTToken.X.withAgent(agentX));
        environment.placeToken(TTTPosition.a1, TTTToken.O.withAgent(agentO));
        environment.placeToken(TTTPosition.CENTER, TTTToken.X.withAgent(agentX));
        environment.placeToken(TTTPosition.b1, TTTToken.O.withAgent(agentO));
        // System.out.println("initial environment =\n" + environment);

        return environment;
    }

    /**
     * @return a new search.
     */
    private Search createSearch()
    {
        final TTTActionGenerator actionGenerator = gameInjector.injectActionGenerator();
        final EnvironmentEvaluator environmentEvaluator = new TTTEnvironmentEvaluator();

        return new AlphaBetaSearch(actionGenerator, environmentEvaluator);
    }
}

package org.vizzini.example.boardgame.qubic;

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
 * Provides tests for the <code>QubicSearchAgent</code> class.
 */
public final class QubicSearchAgentTest
{
    /** Game injector. */
    private final QubicGameInjector gameInjector = new QubicGameInjector();

    /**
     * Test the <code>getAction()</code> method.
     */
    @Test
    public void getActionDepthOneOWins()
    {
        final QubicActionGenerator actionGenerator = gameInjector.injectActionGenerator();
        final SimpleAgent agentX = new SimpleAgent("X", QubicTeam.X, actionGenerator);
        final Search search = createSearch();
        final QubicSearchAgent agentO = new QubicSearchAgent("O", QubicTeam.O, search, 1);
        final QubicEnvironment environment = createEnvironmentDepthOne(agentX, agentO);
        environment.placeToken(QubicPosition.a2A, QubicToken.X.withAgent(agentX));
        final QubicAdjudicator adjudicator = gameInjector.injectAdjudicator();

        final QubicAction result = agentO.getAction(environment, adjudicator);
        assertNotNull(result);
        final QubicPosition position = result.getPosition();
        assertNotNull(position);
        assertThat(position, is(QubicPosition.b2B));
        assertThat((QubicSearchAgent)result.getAgent(), is(agentO));
        assertThat(result.getEnvironment(), is(environment));

        result.doIt();
    }

    /**
     * Test the <code>getAction()</code> method.
     */
    @Test
    public void getActionDepthOneXWins()
    {
        final Search search = createSearch();
        final QubicSearchAgent agentX = new QubicSearchAgent("X", QubicTeam.X, search, 1);
        final QubicActionGenerator actionGenerator = gameInjector.injectActionGenerator();
        final SimpleAgent agentO = new SimpleAgent("O", QubicTeam.O, actionGenerator);
        final QubicEnvironment environment = createEnvironmentDepthOne(agentX, agentO);
        final QubicAdjudicator adjudicator = gameInjector.injectAdjudicator();

        final QubicAction result = agentX.getAction(environment, adjudicator);
        assertNotNull(result);
        final QubicPosition position = result.getPosition();
        assertNotNull(position);
        assertThat(position, is(QubicPosition.b2B));
        assertThat((QubicSearchAgent)result.getAgent(), is(agentX));
        assertThat(result.getEnvironment(), is(environment));

        result.doIt();
    }

    /**
     * Test the <code>getAction()</code> method.
     */
    @Test
    public void getActionDepthOneXWins3()
    {
        final Search search = createSearch();
        final QubicSearchAgent agentX = new QubicSearchAgent("X", QubicTeam.X, search, 3);
        final QubicActionGenerator actionGenerator = gameInjector.injectActionGenerator();
        final SimpleAgent agentO = new SimpleAgent("O", QubicTeam.O, actionGenerator);
        final QubicEnvironment environment = createEnvironmentDepthOne(agentX, agentO);
        final QubicAdjudicator adjudicator = gameInjector.injectAdjudicator();

        final QubicAction result = agentX.getAction(environment, adjudicator);
        assertNotNull(result);
        final QubicPosition position = result.getPosition();
        assertNotNull(position);
        assertThat(position, is(QubicPosition.b2B));
        assertThat((QubicSearchAgent)result.getAgent(), is(agentX));
        assertThat(result.getEnvironment(), is(environment));

        result.doIt();
    }

    /**
     * Test the <code>getAction()</code> method.
     */
    @Test
    public void getActionDepthThreeOWins()
    {
        final QubicActionGenerator actionGenerator = gameInjector.injectActionGenerator();
        final SimpleAgent agentX = new SimpleAgent("X", QubicTeam.X, actionGenerator);
        final Search search = createSearch();
        final QubicSearchAgent agentO = new QubicSearchAgent("O", QubicTeam.O, search, 3);
        final QubicEnvironment environment = createEnvironmentDepthThree(agentX, agentO);
        environment.placeToken(QubicPosition.c1A, QubicToken.X.withAgent(agentX));
        final QubicAdjudicator adjudicator = gameInjector.injectAdjudicator();

        final QubicAction result = agentO.getAction(environment, adjudicator);
        assertNotNull(result);
        final QubicPosition position = result.getPosition();
        assertNotNull(position);
        assertThat(position, is(QubicPosition.b2B));
        assertThat((QubicSearchAgent)result.getAgent(), is(agentO));
        assertThat(result.getEnvironment(), is(environment));

        result.doIt();
    }

    /**
     * Test the <code>getAction()</code> method.
     */
    @Test
    public void getActionDepthThreeXWins()
    {
        final Search search = createSearch();
        final QubicSearchAgent agentX = new QubicSearchAgent("X", QubicTeam.X, search, 3);
        final QubicActionGenerator actionGenerator = gameInjector.injectActionGenerator();
        final SimpleAgent agentO = new SimpleAgent("O", QubicTeam.O, actionGenerator);
        final QubicEnvironment environment = createEnvironmentDepthThree(agentX, agentO);
        final QubicAdjudicator adjudicator = gameInjector.injectAdjudicator();

        final QubicAction result = agentX.getAction(environment, adjudicator);
        assertNotNull(result);
        final QubicPosition position = result.getPosition();
        assertNotNull(position);
        assertThat(position, is(QubicPosition.b2B));
        assertThat((QubicSearchAgent)result.getAgent(), is(agentX));
        assertThat(result.getEnvironment(), is(environment));

        result.doIt();
    }

    /**
     * Test the <code>getAction()</code> method.
     */
    @Ignore
    @Test
    public void getActionDepthTwoXWins()
    {
        final Search search = createSearch();
        final QubicSearchAgent agentX = new QubicSearchAgent("X", QubicTeam.X, search, 3);
        final QubicActionGenerator actionGenerator = gameInjector.injectActionGenerator();
        final SimpleAgent agentO = new SimpleAgent("O", QubicTeam.O, actionGenerator);
        final QubicEnvironment environment = createEnvironmentDepthTwo(agentX, agentO);
        final QubicAdjudicator adjudicator = gameInjector.injectAdjudicator();

        final QubicAction result = agentX.getAction(environment, adjudicator);
        assertNotNull(result);
        final QubicPosition position = result.getPosition();
        assertNotNull(position);
        assertThat(position, is(QubicPosition.c1A));
        assertThat((QubicSearchAgent)result.getAgent(), is(agentX));
        assertThat(result.getEnvironment(), is(environment));

        result.doIt();
    }

    /**
     * @param agentX Agent X.
     * @param agentO Agent O.
     * 
     * @return a new environment.
     */
    private QubicEnvironment createEnvironmentDepthOne(final Agent agentX, final Agent agentO)
    {
        final QubicEnvironment environment = gameInjector.injectEnvironment();
        environment.placeToken(QubicPosition.a3A, QubicToken.X.withAgent(agentX));
        environment.placeToken(QubicPosition.a1A, QubicToken.O.withAgent(agentO));
        environment.placeToken(QubicPosition.b2A, QubicToken.X.withAgent(agentX));
        environment.placeToken(QubicPosition.b1A, QubicToken.O.withAgent(agentO));

        return environment;
    }

    /**
     * @param agentX Agent X.
     * @param agentO Agent O.
     * 
     * @return a new environment.
     */
    private QubicEnvironment createEnvironmentDepthThree(final Agent agentX, final Agent agentO)
    {
        final QubicEnvironment environment = gameInjector.injectEnvironment();
        environment.placeToken(QubicPosition.a3A, QubicToken.X.withAgent(agentX));
        environment.placeToken(QubicPosition.a1A, QubicToken.O.withAgent(agentO));

        return environment;
    }

    /**
     * @param agentX Agent X.
     * @param agentO Agent O.
     * 
     * @return a new environment.
     */
    private QubicEnvironment createEnvironmentDepthTwo(final Agent agentX, final Agent agentO)
    {
        final QubicEnvironment environment = gameInjector.injectEnvironment();
        environment.placeToken(QubicPosition.a3A, QubicToken.X.withAgent(agentX));
        environment.placeToken(QubicPosition.a1A, QubicToken.O.withAgent(agentO));
        environment.placeToken(QubicPosition.b2A, QubicToken.X.withAgent(agentX));
        environment.placeToken(QubicPosition.b1A, QubicToken.O.withAgent(agentO));

        return environment;
    }

    /**
     * @return a new search.
     */
    private Search createSearch()
    {
        final QubicActionGenerator actionGenerator = gameInjector.injectActionGenerator();
        final EnvironmentEvaluator environmentEvaluator = new QubicEnvironmentEvaluator();

        return new AlphaBetaSearch(actionGenerator, environmentEvaluator);
    }
}

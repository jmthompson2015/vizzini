package org.vizzini.example.boardgame.tictactoe;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;

import org.junit.Test;
import org.vizzini.core.game.boardgame.EnvironmentEvaluator;

/**
 * Provides tests for the <code>TTTEnvironmentEvaluator</code> class.
 */
public final class TTTEnvironmentEvaluatorTest
{
    /** Game injector. */
    private final TTTGameInjector gameInjector = new TTTGameInjector();

    /**
     * Test the <code>evaluate()</code> method.
     */
    @Test
    public void evaluateCenter()
    {
        // Setup.
        final TTTActionGenerator actionGenerator = gameInjector.injectActionGenerator();
        final SimpleAgent agentX = new SimpleAgent("X", TTTTeam.X, actionGenerator);
        final SimpleAgent agentO = new SimpleAgent("O", TTTTeam.O, actionGenerator);
        final TTTEnvironment environment = gameInjector.injectEnvironment();
        final TTTAdjudicator adjudicator = gameInjector.injectAdjudicator();
        final EnvironmentEvaluator evaluator = new TTTEnvironmentEvaluator();

        // Run / Verify.
        environment.placeToken(TTTPosition.CENTER, TTTToken.X.withAgent(agentX));
        assertThat(evaluator.evaluate(environment, adjudicator, agentX), is(3));
        assertThat(evaluator.evaluate(environment, adjudicator, agentO), is(-3));
        environment.removeToken(TTTPosition.CENTER);

        environment.placeToken(TTTPosition.CENTER, TTTToken.O.withAgent(agentO));
        assertThat(evaluator.evaluate(environment, adjudicator, agentX), is(-3));
        assertThat(evaluator.evaluate(environment, adjudicator, agentO), is(3));
        environment.removeToken(TTTPosition.CENTER);
    }

    /**
     * Test the <code>evaluate()</code> method.
     */
    @Test
    public void evaluateCorners()
    {
        // Setup.
        final TTTActionGenerator actionGenerator = gameInjector.injectActionGenerator();
        final SimpleAgent agentX = new SimpleAgent("X", TTTTeam.X, actionGenerator);
        final SimpleAgent agentO = new SimpleAgent("O", TTTTeam.O, actionGenerator);
        final TTTEnvironment environment = gameInjector.injectEnvironment();
        final TTTAdjudicator adjudicator = gameInjector.injectAdjudicator();
        final EnvironmentEvaluator evaluator = new TTTEnvironmentEvaluator();

        for (final TTTPosition position : TTTPosition.values())
        {
            if (position.isCorner())
            {
                environment.placeToken(position, TTTToken.X.withAgent(agentX));
                assertThat(evaluator.evaluate(environment, adjudicator, agentX), is(2));
                assertThat(evaluator.evaluate(environment, adjudicator, agentO), is(-2));
                environment.removeToken(position);

                environment.placeToken(position, TTTToken.O.withAgent(agentO));
                assertThat(evaluator.evaluate(environment, adjudicator, agentX), is(-2));
                assertThat(evaluator.evaluate(environment, adjudicator, agentO), is(2));
                environment.removeToken(position);
            }
        }
    }

    /**
     * Test the <code>evaluate()</code> method.
     */
    @Test
    public void evaluateDraw()
    {
        // Setup.
        final TTTActionGenerator actionGenerator = gameInjector.injectActionGenerator();
        final SimpleAgent agentX = new SimpleAgent("X", TTTTeam.X, actionGenerator);
        final SimpleAgent agentO = new SimpleAgent("O", TTTTeam.O, actionGenerator);
        final TTTEnvironment environment = gameInjector.injectEnvironment();
        environment.placeToken(TTTPosition.a1, TTTToken.X.withAgent(agentX));
        environment.placeToken(TTTPosition.b1, TTTToken.X.withAgent(agentX));
        environment.placeToken(TTTPosition.c1, TTTToken.O.withAgent(agentO));

        environment.placeToken(TTTPosition.a2, TTTToken.O.withAgent(agentO));
        environment.placeToken(TTTPosition.CENTER, TTTToken.O.withAgent(agentO));
        environment.placeToken(TTTPosition.c2, TTTToken.X.withAgent(agentX));

        environment.placeToken(TTTPosition.a3, TTTToken.X.withAgent(agentX));
        environment.placeToken(TTTPosition.b3, TTTToken.X.withAgent(agentX));
        environment.placeToken(TTTPosition.c3, TTTToken.O.withAgent(agentO));
        // System.out.println(environment);
        final TTTAdjudicator adjudicator = gameInjector.injectAdjudicator();
        final EnvironmentEvaluator evaluator = new TTTEnvironmentEvaluator();

        // Run / Verify.
        assertThat(evaluator.evaluate(environment, adjudicator, agentX), is(-1));
        assertThat(evaluator.evaluate(environment, adjudicator, agentO), is(1));
    }

    /**
     * Test the <code>evaluate()</code> method.
     */
    @Test
    public void evaluateEmptyBoard()
    {
        // Setup.
        final TTTActionGenerator actionGenerator = gameInjector.injectActionGenerator();
        final SimpleAgent agentX = new SimpleAgent("X", TTTTeam.X, actionGenerator);
        final SimpleAgent agentO = new SimpleAgent("O", TTTTeam.O, actionGenerator);
        final TTTEnvironment environment = gameInjector.injectEnvironment();
        final TTTAdjudicator adjudicator = gameInjector.injectAdjudicator();
        final EnvironmentEvaluator evaluator = new TTTEnvironmentEvaluator();

        // Run / Verify.
        assertThat(evaluator.evaluate(environment, adjudicator, agentX), is(0));
        assertThat(evaluator.evaluate(environment, adjudicator, agentO), is(0));
    }

    /**
     * Test the <code>evaluate()</code> method.
     */
    @Test
    public void evaluateSides()
    {
        // Setup.
        final TTTActionGenerator actionGenerator = gameInjector.injectActionGenerator();
        final SimpleAgent agentX = new SimpleAgent("X", TTTTeam.X, actionGenerator);
        final SimpleAgent agentO = new SimpleAgent("O", TTTTeam.O, actionGenerator);
        final TTTEnvironment environment = gameInjector.injectEnvironment();
        final TTTAdjudicator adjudicator = gameInjector.injectAdjudicator();
        final EnvironmentEvaluator evaluator = new TTTEnvironmentEvaluator();

        for (final TTTPosition position : TTTPosition.values())
        {
            if (!(position.isCenter() || position.isCorner()))
            {
                environment.placeToken(position, TTTToken.X.withAgent(agentX));
                assertThat(evaluator.evaluate(environment, adjudicator, agentX), is(1));
                assertThat(evaluator.evaluate(environment, adjudicator, agentO), is(-1));
                environment.removeToken(position);

                environment.placeToken(position, TTTToken.O.withAgent(agentO));
                assertThat(evaluator.evaluate(environment, adjudicator, agentX), is(-1));
                assertThat(evaluator.evaluate(environment, adjudicator, agentO), is(1));
                environment.removeToken(position);
            }
        }
    }
}

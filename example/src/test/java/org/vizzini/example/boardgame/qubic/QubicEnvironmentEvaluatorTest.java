package org.vizzini.example.boardgame.qubic;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;

import org.junit.Test;
import org.vizzini.core.game.boardgame.EnvironmentEvaluator;

/**
 * Provides tests for the <code>QubicEnvironmentEvaluator</code> class.
 */
public final class QubicEnvironmentEvaluatorTest
{
    /** Game injector. */
    private final QubicGameInjector gameInjector = new QubicGameInjector();

    /**
     * Test the <code>evaluate()</code> method.
     */
    @Test
    public void evaluateCenters()
    {
        // Setup.
        final QubicActionGenerator actionGenerator = gameInjector.injectActionGenerator();
        final SimpleAgent agentX = new SimpleAgent("X", QubicTeam.X, actionGenerator);
        final SimpleAgent agentO = new SimpleAgent("O", QubicTeam.O, actionGenerator);
        final QubicEnvironment environment = gameInjector.injectEnvironment();
        final QubicAdjudicator adjudicator = gameInjector.injectAdjudicator();
        final EnvironmentEvaluator evaluator = new QubicEnvironmentEvaluator();

        // Run / Verify.
        for (final QubicPosition position : QubicPosition.values())
        {
            if (position.isCenter())
            {
                environment.placeToken(position, QubicToken.X.withAgent(agentX));
                assertThat(evaluator.evaluate(environment, adjudicator, agentX), is(3));
                assertThat(evaluator.evaluate(environment, adjudicator, agentO), is(-3));
                environment.removeToken(position);

                environment.placeToken(position, QubicToken.O.withAgent(agentO));
                assertThat(evaluator.evaluate(environment, adjudicator, agentX), is(-3));
                assertThat(evaluator.evaluate(environment, adjudicator, agentO), is(3));
                environment.removeToken(position);
            }
        }
    }

    /**
     * Test the <code>evaluate()</code> method.
     */
    @Test
    public void evaluateCorners()
    {
        // Setup.
        final QubicActionGenerator actionGenerator = gameInjector.injectActionGenerator();
        final SimpleAgent agentX = new SimpleAgent("X", QubicTeam.X, actionGenerator);
        final SimpleAgent agentO = new SimpleAgent("O", QubicTeam.O, actionGenerator);
        final QubicEnvironment environment = gameInjector.injectEnvironment();
        final QubicAdjudicator adjudicator = gameInjector.injectAdjudicator();
        final EnvironmentEvaluator evaluator = new QubicEnvironmentEvaluator();

        for (final QubicPosition position : QubicPosition.values())
        {
            if (position.isCorner())
            {
                environment.placeToken(position, QubicToken.X.withAgent(agentX));
                assertThat(evaluator.evaluate(environment, adjudicator, agentX), is(2));
                assertThat(evaluator.evaluate(environment, adjudicator, agentO), is(-2));
                environment.removeToken(position);

                environment.placeToken(position, QubicToken.O.withAgent(agentO));
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
        final QubicActionGenerator actionGenerator = gameInjector.injectActionGenerator();
        final SimpleAgent agentX = new SimpleAgent("X", QubicTeam.X, actionGenerator);
        final SimpleAgent agentO = new SimpleAgent("O", QubicTeam.O, actionGenerator);
        final QubicEnvironment environment = gameInjector.injectEnvironment();
        environment.placeToken(QubicPosition.a1A, QubicToken.X.withAgent(agentX));
        environment.placeToken(QubicPosition.b1A, QubicToken.X.withAgent(agentX));
        environment.placeToken(QubicPosition.c1A, QubicToken.O.withAgent(agentO));

        environment.placeToken(QubicPosition.a2A, QubicToken.O.withAgent(agentO));
        environment.placeToken(QubicPosition.b2A, QubicToken.O.withAgent(agentO));
        environment.placeToken(QubicPosition.c2A, QubicToken.X.withAgent(agentX));

        environment.placeToken(QubicPosition.a3A, QubicToken.X.withAgent(agentX));
        environment.placeToken(QubicPosition.b3A, QubicToken.X.withAgent(agentX));
        environment.placeToken(QubicPosition.c3A, QubicToken.O.withAgent(agentO));
        final QubicAdjudicator adjudicator = gameInjector.injectAdjudicator();
        final EnvironmentEvaluator evaluator = new QubicEnvironmentEvaluator();

        // Run / Verify.
        assertThat(evaluator.evaluate(environment, adjudicator, agentX), is(0));
        assertThat(evaluator.evaluate(environment, adjudicator, agentO), is(0));
    }

    /**
     * Test the <code>evaluate()</code> method.
     */
    @Test
    public void evaluateEmptyBoard()
    {
        // Setup.
        final QubicActionGenerator actionGenerator = gameInjector.injectActionGenerator();
        final SimpleAgent agentX = new SimpleAgent("X", QubicTeam.X, actionGenerator);
        final SimpleAgent agentO = new SimpleAgent("O", QubicTeam.O, actionGenerator);
        final QubicEnvironment environment = gameInjector.injectEnvironment();
        final QubicAdjudicator adjudicator = gameInjector.injectAdjudicator();
        final EnvironmentEvaluator evaluator = new QubicEnvironmentEvaluator();

        // Run / Verify.
        assertThat(evaluator.evaluate(environment, adjudicator, agentX), is(0));
        assertThat(evaluator.evaluate(environment, adjudicator, agentO), is(0));
    }

    /**
     * Test the <code>evaluate()</code> method.
     */
    @Test
    public void evaluateOWins()
    {
        // Setup.
        final QubicActionGenerator actionGenerator = gameInjector.injectActionGenerator();
        final SimpleAgent agentX = new SimpleAgent("X", QubicTeam.X, actionGenerator);
        final SimpleAgent agentO = new SimpleAgent("O", QubicTeam.O, actionGenerator);
        final QubicEnvironment environment = gameInjector.injectEnvironment();
        environment.placeToken(QubicPosition.a1A, QubicToken.X.withAgent(agentX));
        environment.placeToken(QubicPosition.b1A, QubicToken.O.withAgent(agentO));
        environment.placeToken(QubicPosition.c1A, QubicToken.X.withAgent(agentX));
        environment.placeToken(QubicPosition.b2A, QubicToken.O.withAgent(agentO));
        environment.placeToken(QubicPosition.a3A, QubicToken.X.withAgent(agentX));
        environment.placeToken(QubicPosition.b3A, QubicToken.O.withAgent(agentO));
        environment.placeToken(QubicPosition.d4A, QubicToken.X.withAgent(agentX));
        environment.placeToken(QubicPosition.b4A, QubicToken.O.withAgent(agentO));
        final QubicAdjudicator adjudicator = gameInjector.injectAdjudicator();
        final EnvironmentEvaluator evaluator = new QubicEnvironmentEvaluator();

        // Run / Verify.
        assertThat(evaluator.evaluate(environment, adjudicator, agentX), is(Integer.MIN_VALUE + 1002));
        assertThat(evaluator.evaluate(environment, adjudicator, agentO), is(Integer.MAX_VALUE - 1001));
    }

    /**
     * Test the <code>evaluate()</code> method.
     */
    @Test
    public void evaluateSides()
    {
        // Setup.
        final QubicActionGenerator actionGenerator = gameInjector.injectActionGenerator();
        final SimpleAgent agentX = new SimpleAgent("X", QubicTeam.X, actionGenerator);
        final SimpleAgent agentO = new SimpleAgent("O", QubicTeam.O, actionGenerator);
        final QubicEnvironment environment = gameInjector.injectEnvironment();
        final QubicAdjudicator adjudicator = gameInjector.injectAdjudicator();
        final EnvironmentEvaluator evaluator = new QubicEnvironmentEvaluator();

        for (final QubicPosition position : QubicPosition.values())
        {
            if (!(position.isCenter() || position.isCorner()))
            {
                environment.placeToken(position, QubicToken.X.withAgent(agentX));
                assertThat(evaluator.evaluate(environment, adjudicator, agentX), is(1));
                assertThat(evaluator.evaluate(environment, adjudicator, agentO), is(-1));
                environment.removeToken(position);

                environment.placeToken(position, QubicToken.O.withAgent(agentO));
                assertThat(evaluator.evaluate(environment, adjudicator, agentX), is(-1));
                assertThat(evaluator.evaluate(environment, adjudicator, agentO), is(1));
                environment.removeToken(position);
            }
        }
    }

    /**
     * Test the <code>evaluate()</code> method.
     */
    @Test
    public void evaluateXWins()
    {
        // Setup.
        final QubicActionGenerator actionGenerator = gameInjector.injectActionGenerator();
        final SimpleAgent agentX = new SimpleAgent("X", QubicTeam.X, actionGenerator);
        final SimpleAgent agentO = new SimpleAgent("O", QubicTeam.O, actionGenerator);
        final QubicEnvironment environment = gameInjector.injectEnvironment();
        environment.placeToken(QubicPosition.a1A, QubicToken.X.withAgent(agentX));
        environment.placeToken(QubicPosition.b1A, QubicToken.O.withAgent(agentO));
        environment.placeToken(QubicPosition.b2A, QubicToken.X.withAgent(agentX));
        environment.placeToken(QubicPosition.c1A, QubicToken.O.withAgent(agentO));
        environment.placeToken(QubicPosition.c3A, QubicToken.X.withAgent(agentX));
        environment.placeToken(QubicPosition.d4A, QubicToken.X.withAgent(agentX));
        final QubicAdjudicator adjudicator = gameInjector.injectAdjudicator();
        final EnvironmentEvaluator evaluator = new QubicEnvironmentEvaluator();

        // Run / Verify.
        assertThat(evaluator.evaluate(environment, adjudicator, agentX), is(Integer.MIN_VALUE - 1002));
        assertThat(evaluator.evaluate(environment, adjudicator, agentO), is(Integer.MAX_VALUE + 1003));
    }
}

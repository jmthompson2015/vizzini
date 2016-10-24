package org.vizzini.example.boardgame.tictactoe.geneticprogramming;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;

import org.junit.Test;
import org.vizzini.core.game.boardgame.EnvironmentEvaluator;
import org.vizzini.example.boardgame.tictactoe.SimpleAgent;
import org.vizzini.example.boardgame.tictactoe.TTTActionGenerator;
import org.vizzini.example.boardgame.tictactoe.TTTAdjudicator;
import org.vizzini.example.boardgame.tictactoe.TTTEnvironment;
import org.vizzini.example.boardgame.tictactoe.TTTGameInjector;
import org.vizzini.example.boardgame.tictactoe.TTTPosition;
import org.vizzini.example.boardgame.tictactoe.TTTTeam;
import org.vizzini.example.boardgame.tictactoe.TTTToken;

/**
 * Provides tests for the <code>GPEnvironmentEvaluator</code> class.
 */
public final class GPEnvironmentEvaluatorTest
{
    /** Game injector. */
    private final TTTGameInjector gameInjector = new TTTGameInjector();

    /** Problem. */
    private final TTTProblem problem = new TTTProblem();

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
        final EnvironmentEvaluator evaluator = new GPEnvironmentEvaluator(problem.getSimpleSolution());

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
        final EnvironmentEvaluator evaluator = new GPEnvironmentEvaluator(problem.getSimpleSolution());

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
        final TTTAdjudicator adjudicator = gameInjector.injectAdjudicator();
        final EnvironmentEvaluator evaluator = new GPEnvironmentEvaluator(problem.getSimpleSolution());

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
        final TTTActionGenerator actionGenerator = gameInjector.injectActionGenerator();
        final SimpleAgent agentX = new SimpleAgent("X", TTTTeam.X, actionGenerator);
        final SimpleAgent agentO = new SimpleAgent("O", TTTTeam.O, actionGenerator);
        final TTTEnvironment environment = gameInjector.injectEnvironment();
        final TTTAdjudicator adjudicator = gameInjector.injectAdjudicator();
        final EnvironmentEvaluator evaluator = new GPEnvironmentEvaluator(problem.getSimpleSolution());

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
        final TTTActionGenerator actionGenerator = gameInjector.injectActionGenerator();
        final SimpleAgent agentX = new SimpleAgent("X", TTTTeam.X, actionGenerator);
        final SimpleAgent agentO = new SimpleAgent("O", TTTTeam.O, actionGenerator);
        final TTTEnvironment environment = gameInjector.injectEnvironment();
        environment.placeToken(TTTPosition.a1, TTTToken.X.withAgent(agentX));
        environment.placeToken(TTTPosition.b1, TTTToken.O.withAgent(agentO));
        environment.placeToken(TTTPosition.c1, TTTToken.X.withAgent(agentX));
        environment.placeToken(TTTPosition.CENTER, TTTToken.O.withAgent(agentO));
        environment.placeToken(TTTPosition.a3, TTTToken.X.withAgent(agentX));
        environment.placeToken(TTTPosition.b3, TTTToken.O.withAgent(agentO));
        final TTTAdjudicator adjudicator = gameInjector.injectAdjudicator();
        final EnvironmentEvaluator evaluator = new GPEnvironmentEvaluator(problem.getSimpleSolution());

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
        final TTTActionGenerator actionGenerator = gameInjector.injectActionGenerator();
        final SimpleAgent agentX = new SimpleAgent("X", TTTTeam.X, actionGenerator);
        final SimpleAgent agentO = new SimpleAgent("O", TTTTeam.O, actionGenerator);
        final TTTEnvironment environment = gameInjector.injectEnvironment();
        final TTTAdjudicator adjudicator = gameInjector.injectAdjudicator();
        final EnvironmentEvaluator evaluator = new GPEnvironmentEvaluator(problem.getSimpleSolution());

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

    /**
     * Test the <code>evaluate()</code> method.
     */
    @Test
    public void evaluateXWins()
    {
        // Setup.
        final TTTActionGenerator actionGenerator = gameInjector.injectActionGenerator();
        final SimpleAgent agentX = new SimpleAgent("X", TTTTeam.X, actionGenerator);
        final SimpleAgent agentO = new SimpleAgent("O", TTTTeam.O, actionGenerator);
        final TTTEnvironment environment = gameInjector.injectEnvironment();
        environment.placeToken(TTTPosition.a1, TTTToken.X.withAgent(agentX));
        environment.placeToken(TTTPosition.b1, TTTToken.O.withAgent(agentO));
        environment.placeToken(TTTPosition.CENTER, TTTToken.X.withAgent(agentX));
        environment.placeToken(TTTPosition.c1, TTTToken.O.withAgent(agentO));
        environment.placeToken(TTTPosition.c3, TTTToken.X.withAgent(agentX));
        final TTTAdjudicator adjudicator = gameInjector.injectAdjudicator();
        final EnvironmentEvaluator evaluator = new GPEnvironmentEvaluator(problem.getSimpleSolution());

        // Run / Verify.
        assertThat(evaluator.evaluate(environment, adjudicator, agentX), is(Integer.MAX_VALUE - 1001));
        assertThat(evaluator.evaluate(environment, adjudicator, agentO), is(Integer.MIN_VALUE + 1002));
    }
}

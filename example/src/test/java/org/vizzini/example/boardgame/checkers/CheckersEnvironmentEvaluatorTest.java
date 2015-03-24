package org.vizzini.example.boardgame.checkers;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;

import java.util.ArrayList;
import java.util.List;

import org.junit.Test;
import org.vizzini.core.game.Agent;
import org.vizzini.core.game.DefaultAgent;

/**
 * Provides tests for the <code>CheckersEnvironmentEvaluator</code> class.
 */
public final class CheckersEnvironmentEvaluatorTest
{
    /**
     * Test the <code>evaluate()</code> method.
     */
    @Test
    public void evaluate()
    {
        // Setup.
        final CheckersGameInjector injector = new CheckersGameInjector();
        final CheckersEnvironment environment = injector.injectEnvironment();
        final Agent agentRed = new DefaultAgent(CheckersTeam.RED.getName(), CheckersTeam.RED.getDescription(),
                CheckersTeam.RED);
        final Agent agentWhite = new DefaultAgent(CheckersTeam.WHITE.getName(), CheckersTeam.WHITE.getDescription(),
                CheckersTeam.WHITE);
        final List<Agent> agents = new ArrayList<Agent>();
        agents.add(agentRed);
        agents.add(agentWhite);
        environment.placeInitialTokens(agents);
        final CheckersAdjudicator adjudicator = injector.injectAdjudicator();
        final CheckersEnvironmentEvaluator evaluator = new CheckersEnvironmentEvaluator();

        // Run / Verify.
        assertThat(evaluator.evaluate(environment, adjudicator, agentRed), is(0));
        assertThat(evaluator.evaluate(environment, adjudicator, agentWhite), is(0));

        // Setup.
        environment.removeToken(CheckersPosition.P02);

        // Run / Verify.
        assertThat(evaluator.evaluate(environment, adjudicator, agentRed), is(1));
        assertThat(evaluator.evaluate(environment, adjudicator, agentWhite), is(-1));

        // Setup.
        environment.placeToken(CheckersPosition.P02, King.RED.withAgent(agentRed));

        // Run / Verify.
        assertThat(evaluator.evaluate(environment, adjudicator, agentRed), is(3));
        assertThat(evaluator.evaluate(environment, adjudicator, agentWhite), is(-3));
    }
}

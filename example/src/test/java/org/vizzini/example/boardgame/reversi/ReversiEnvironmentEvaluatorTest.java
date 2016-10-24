package org.vizzini.example.boardgame.reversi;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;

import java.util.ArrayList;
import java.util.List;

import org.junit.Test;
import org.vizzini.core.game.Agent;
import org.vizzini.core.game.DefaultAgent;

/**
 * Provides tests for the <code>ReversiEnvironmentEvaluator</code> class.
 */
public final class ReversiEnvironmentEvaluatorTest
{
    /**
     * Test the <code>evaluate()</code> method.
     */
    @Test
    public void evaluate()
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
        final ReversiAdjudicator adjudicator = injector.injectAdjudicator();
        final ReversiEnvironmentEvaluator evaluator = new ReversiEnvironmentEvaluator();

        // Run / Verify.
        assertThat(evaluator.evaluate(environment, adjudicator, agentBlack), is(0));
        assertThat(evaluator.evaluate(environment, adjudicator, agentWhite), is(0));

        // Setup.
        final ReversiAction action = new ReversiAction(environment, ReversiPosition.d3,
                ReversiToken.BLACK.withAgent(agentBlack));
        action.doIt();
        // System.out.println(environment);

        // Run / Verify.
        assertThat(evaluator.evaluate(environment, adjudicator, agentBlack), is(3));
        assertThat(evaluator.evaluate(environment, adjudicator, agentWhite), is(-3));

        // Setup.
        environment.placeToken(ReversiPosition.d2, ReversiToken.BLACK.withAgent(agentBlack));
        environment.placeToken(ReversiPosition.d1, ReversiToken.BLACK.withAgent(agentBlack));
        // System.out.println(environment);

        // Run / Verify.
        assertThat(evaluator.evaluate(environment, adjudicator, agentBlack), is(6));
        assertThat(evaluator.evaluate(environment, adjudicator, agentWhite), is(-6));
    }
}

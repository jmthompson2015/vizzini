package org.vizzini.example.boardgame.tictactoe.geneticprogramming;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;

import org.junit.Test;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.Function;
import org.vizzini.core.game.Agent;
import org.vizzini.core.game.boardgame.AlphaBetaSearch;
import org.vizzini.core.game.boardgame.Search;
import org.vizzini.example.boardgame.tictactoe.Statistics;
import org.vizzini.example.boardgame.tictactoe.TTTActionGenerator;
import org.vizzini.example.boardgame.tictactoe.TTTSearchAgent;
import org.vizzini.example.boardgame.tictactoe.TTTTeam;

/**
 * Provides tests for the <code>Simulator</code> class.
 */
public final class SimulatorTest
{
    /**
     * Test the <code>run()</code> method.
     */
    @Test
    public void run()
    {
        // Setup.
        final Agent agentX = createAgentX();
        final Statistics statisticsX = new Statistics();
        final Agent agentO = createAgentO();
        final Statistics statisticsO = new Statistics();
        final Simulator simulator = new Simulator();

        // Run.
        simulator.run(agentX, statisticsX, agentO, statisticsO);

        // Verify.
        assertThat(statisticsX.getWinCount(), is(0));
        assertThat(statisticsX.getDrawCount(), is(0));
        assertThat(statisticsX.getLossCount(), is(1));
        assertThat(statisticsX.getPlayCount(), is(1));
        assertThat(statisticsX.getRating(), is(-1.0));

        assertThat(statisticsO.getWinCount(), is(1));
        assertThat(statisticsO.getDrawCount(), is(0));
        assertThat(statisticsO.getLossCount(), is(0));
        assertThat(statisticsO.getPlayCount(), is(1));
        assertThat(statisticsO.getRating(), is(-0.0));
    }

    /**
     * @return a new agent.
     */
    private Agent createAgentO()
    {
        final Search search = new AlphaBetaSearch(new TTTActionGenerator(), createEvaluator());
        final int maxPlies = 3;

        return new TTTSearchAgent(TTTTeam.O.getName(), TTTTeam.O, search, maxPlies);
    }

    /**
     * @return a new agent.
     */
    private Agent createAgentX()
    {
        final Search search = new AlphaBetaSearch(new TTTActionGenerator(), createEvaluator());
        final int maxPlies = 3;

        return new TTTSearchAgent(TTTTeam.X.getName(), TTTTeam.X, search, maxPlies);
    }

    /**
     * @return a new environment evaluator.
     */
    private GPEnvironmentEvaluator createEvaluator()
    {
        final TTTProblem problem = new TTTProblem();
        final Function<Integer> function = problem.getSimpleSolution();

        return new GPEnvironmentEvaluator(function);
    }
}

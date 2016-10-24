package org.vizzini.example.boardgame.tictactoe.geneticprogramming;

import java.util.HashMap;
import java.util.Map;

import org.vizzini.ai.geneticalgorithm.Evaluator;
import org.vizzini.ai.geneticalgorithm.Genome;
import org.vizzini.ai.geneticalgorithm.Population;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.TreeNode;
import org.vizzini.core.game.Agent;
import org.vizzini.core.game.boardgame.ActionGenerator;
import org.vizzini.core.game.boardgame.AlphaBetaSearch;
import org.vizzini.core.game.boardgame.EnvironmentEvaluator;
import org.vizzini.core.game.boardgame.Search;
import org.vizzini.example.boardgame.tictactoe.Statistics;
import org.vizzini.example.boardgame.tictactoe.TTTActionGenerator;
import org.vizzini.example.boardgame.tictactoe.TTTSearchAgent;
import org.vizzini.example.boardgame.tictactoe.TTTTeam;

/**
 * Provides an evaluator for this problem.
 */
public final class TTTEvaluator implements Evaluator<TreeNode<Integer>>
{
    /** Map of genome to statistics. */
    private final Map<Genome<TreeNode<Integer>>, Statistics> genomeToStatistics = new HashMap<Genome<TreeNode<Integer>>, Statistics>();

    @Override
    public void evaluate(final Population<TreeNode<Integer>> population)
    {
        genomeToStatistics.clear();

        // Play each genome against all the others.
        final Simulator simulator = new Simulator();
        final ActionGenerator actionGenerator = new TTTActionGenerator();
        final int maxPlies = 3;

        for (int i = 0; i < population.size(); i++)
        {
            final Genome<TreeNode<Integer>> genomeX = population.get(i);
            final EnvironmentEvaluator environmentEvaluatorX = new GPEnvironmentEvaluator(genomeX.get(0));
            final Search searchX = new AlphaBetaSearch(actionGenerator, environmentEvaluatorX);
            final Agent agentX = new TTTSearchAgent("X", TTTTeam.X, searchX, maxPlies);
            final Statistics statisticsX = getStatistics(genomeX);

            for (int j = 0; j < population.size(); j++)
            {
                final Genome<TreeNode<Integer>> genomeO = population.get(j);
                final EnvironmentEvaluator environmentEvaluatorO = new GPEnvironmentEvaluator(genomeO.get(0));
                final Search searchO = new AlphaBetaSearch(actionGenerator, environmentEvaluatorO);
                final Agent agentO = new TTTSearchAgent("O", TTTTeam.O, searchO, maxPlies);
                final Statistics statisticsO = getStatistics(genomeO);

                simulator.run(agentX, statisticsX, agentO, statisticsO);
            }
        }

        for (int i = 0; i < population.size(); i++)
        {
            final Genome<TreeNode<Integer>> genome = population.get(i);
            final Statistics statistics = getStatistics(genome);
            genome.setFitness(statistics.getRating());
        }
    }

    /**
     * @param genome Genome.
     * 
     * @return a statistics object for the given genome, creating it if necessary.
     */
    public Statistics getStatistics(final Genome<TreeNode<Integer>> genome)
    {
        Statistics answer = genomeToStatistics.get(genome);

        if (answer == null)
        {
            answer = new Statistics();
            genomeToStatistics.put(genome, answer);
        }

        return answer;
    }

    @Override
    public double idealEvaluation()
    {
        return 1;
    }

    @Override
    public boolean isMaximizing()
    {
        return true;
    }
}

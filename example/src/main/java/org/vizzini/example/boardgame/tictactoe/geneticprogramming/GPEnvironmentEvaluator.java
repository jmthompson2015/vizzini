package org.vizzini.example.boardgame.tictactoe.geneticprogramming;

import static org.vizzini.core.game.Constants.INFINITY;

import org.vizzini.ai.geneticalgorithm.geneticprogramming.TreeNode;
import org.vizzini.core.game.Adjudicator;
import org.vizzini.core.game.Agent;
import org.vizzini.core.game.Environment;
import org.vizzini.core.game.boardgame.EnvironmentEvaluator;
import org.vizzini.example.boardgame.tictactoe.TTTEnvironment;
import org.vizzini.example.boardgame.tictactoe.TTTTeam;

/**
 * Provides an environment evaluator which uses a genetic programming tree node.
 */
public final class GPEnvironmentEvaluator implements EnvironmentEvaluator
{
    /** Genetic programming tree node. */
    private final TreeNode<Integer> treeNode;

    /**
     * Construct this object.
     * 
     * @param treeNode Genetic programming tree node.
     */
    @SuppressWarnings("hiding")
    public GPEnvironmentEvaluator(final TreeNode<Integer> treeNode)
    {
        this.treeNode = treeNode;
    }

    @Override
    public int evaluate(final Environment environment, final Adjudicator adjudicator, final Agent agent)
    {
        int answer = 0;

        if (adjudicator.isGameOver(environment))
        {
            final Agent winner = adjudicator.determineWinner(environment);

            if (winner != null)
            {
                final TTTTeam winnerTeam = (TTTTeam)winner.getTeam();
                final int factor = (winnerTeam == agent.getTeam() ? 1 : -1);
                answer = factor * (INFINITY - 1);
            }
        }
        else
        {
            final TTTEnvironment tEnvironment = (TTTEnvironment)environment;
            final TTTTeam team = (TTTTeam)agent.getTeam();
            final TTTContext context = new TTTContext(tEnvironment, team);
            answer = treeNode.evaluate(context);
        }

        return answer;
    }
}

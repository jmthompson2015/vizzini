package org.vizzini.core.game.boardgame;

import static org.vizzini.core.game.Constants.INFINITY;

import java.util.List;

import org.vizzini.core.game.Action;
import org.vizzini.core.game.Adjudicator;
import org.vizzini.core.game.Agent;
import org.vizzini.core.game.Environment;

/**
 * Provides an alpha beta search.
 * 
 * @see <a href="http://en.wikipedia.org/wiki/Alpha-beta_pruning">Alpha-beta pruning (Wikipedia)</a>
 * @see <a href="http://chessprogramming.wikispaces.com/Alpha-Beta">Alpha-Beta (Chess Programming Wiki)</a>
 */
public final class AlphaBetaSearch implements Search
{
    /** Flag indicating whether to print output. */
    private static final boolean IS_VERBOSE = false;

    /** Action generator. */
    private final ActionGenerator actionGenerator;

    /** Environment evaluator. */
    private final EnvironmentEvaluator environmentEvaluator;

    /**
     * Construct this object.
     * 
     * @param actionGenerator Action generator.
     * @param environmentEvaluator Environment evaluator.
     */
    @SuppressWarnings("hiding")
    public AlphaBetaSearch(final ActionGenerator actionGenerator, final EnvironmentEvaluator environmentEvaluator)
    {
        if (actionGenerator == null)
        {
            throw new IllegalArgumentException("actionGenerator is null");
        }

        if (environmentEvaluator == null)
        {
            throw new IllegalArgumentException("environmentEvaluator is null");
        }

        this.actionGenerator = actionGenerator;
        this.environmentEvaluator = environmentEvaluator;
    }

    @Override
    public ActionGenerator getActionGenerator()
    {
        return actionGenerator;
    }

    @Override
    public EnvironmentEvaluator getEnvironmentEvaluator()
    {
        return environmentEvaluator;
    }

    @Override
    public Action search(final Environment environment, final Adjudicator adjudicator, final Agent agent,
            final Agent opponent, final int maxPlies)
    {
        if (environment == null)
        {
            throw new IllegalArgumentException("environment is null");
        }

        if (adjudicator == null)
        {
            throw new IllegalArgumentException("adjudicator is null");
        }

        if (agent == null)
        {
            throw new IllegalArgumentException("agent is null");
        }

        if (opponent == null)
        {
            throw new IllegalArgumentException("opponent is null");
        }

        if (maxPlies <= 0)
        {
            throw new IllegalArgumentException("maxPlies is zero or less");
        }

        final List<Action> actions = actionGenerator.generateActions(environment, adjudicator, agent);
        Action answer = null;
        Integer bestValue = null;

        for (final Action child : actions)
        {
            child.doIt();

            final int rating = -performSearch(environment, adjudicator, opponent, agent, maxPlies - 1, -INFINITY - 100,
                    INFINITY + 100);

            if (IS_VERBOSE)
            {
                System.out.println(rating + " child " + child);
            }

            child.undoIt();

            if ((bestValue == null) || (rating > bestValue))
            {
                bestValue = rating;
                answer = child;

                if (IS_VERBOSE)
                {
                    System.out.println("new best " + rating + " " + child);
                }
            }
        }

        if (IS_VERBOSE)
        {
            System.out.println("answer = " + answer);
        }

        return answer;
    }

    /**
     * Perform a search using the given parameters.
     * 
     * @param agent Agent.
     * @param opponent Opposing agent.
     * @param environment Environment.
     * @param adjudicator Adjudicator.
     * @param ply Current ply.
     * @param alpha Minimum score of maximizing agent.
     * @param beta Maximum score of minimizing agent.
     * 
     * @return the rating.
     */
    private int performSearch(final Environment environment, final Adjudicator adjudicator, final Agent agent,
            final Agent opponent, final int ply, final int alpha, final int beta)
    {
        int answer = alpha;

        if (IS_VERBOSE)
        {
            System.out.println("\n" + ply + " environment =\n" + environment);
        }

        final Agent winner = adjudicator.determineWinner(environment);

        if (winner != null)
        {
            answer = -(INFINITY + ply);

            if (IS_VERBOSE)
            {
                System.out.println(ply + " " + winner.getName() + " wins, answer = " + answer);
            }
        }
        else if (adjudicator.isGameOver(environment))
        {
            answer = -(INFINITY - ply);

            if (IS_VERBOSE)
            {
                System.out.println(ply + " draw, answer = " + answer);
            }
        }
        else if (ply == 0)
        {
            answer = -environmentEvaluator.evaluate(environment, adjudicator, opponent);

            if (IS_VERBOSE)
            {
                System.out.println(ply + " " + opponent.getTeam().getName() + " answer = " + answer);
            }
        }
        else
        {
            final List<Action> actions = actionGenerator.generateActions(environment, adjudicator, agent);

            for (final Action child : actions)
            {
                child.doIt();

                final int rating = -performSearch(environment, adjudicator, opponent, agent, ply - 1, -beta, -answer);

                child.undoIt();

                if (rating >= beta)
                {
                    if (IS_VERBOSE)
                    {
                        System.out.println("beta cut-off");
                    }

                    answer = beta;
                    break;
                }

                answer = Math.max(rating, answer);
            }

            if (IS_VERBOSE)
            {
                System.out.println(ply + " answer = " + answer);
            }
        }

        return answer;
    }
}

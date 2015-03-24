package org.vizzini.chess;

import java.util.List;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.vizzini.core.game.Action;
import org.vizzini.core.game.Adjudicator;
import org.vizzini.core.game.Agent;
import org.vizzini.core.game.Environment;
import org.vizzini.core.game.Team;

/**
 * Provides a simple implementation of a computer agent for chess.
 */
public final class SimpleAgent implements Agent
{
    /** Action generator. */
    private final ChessActionGenerator actionGenerator;

    /** Name. */
    private final String name;

    /** Team. */
    private final Team team;

    /**
     * Construct this object.
     * 
     * @param name Name. (required)
     * @param team Team. (required)
     * @param actionGenerator Action generator. (required)
     */
    @SuppressWarnings("hiding")
    public SimpleAgent(final String name, final ChessTeam team, final ChessActionGenerator actionGenerator)
    {
        if (StringUtils.isEmpty(name))
        {
            throw new IllegalArgumentException("name is null or empty");
        }

        if (team == null)
        {
            throw new IllegalArgumentException("team is null");
        }

        if (actionGenerator == null)
        {
            throw new IllegalArgumentException("actionGenerator is null");
        }

        this.name = name;
        this.team = team;
        this.actionGenerator = actionGenerator;
    }

    @Override
    public Action getAction(final Environment environment, final Adjudicator adjudicator)
    {
        final ChessEnvironment board = (ChessEnvironment)environment;
        actionGenerator.generateValidMoves(board);

        ChessAction answer = null;

        final ChessPosition[] values = board.getPositionValues();

        for (final ChessPosition fromPosition : values)
        {
            final ChessToken fromToken = (ChessToken)board.getTokenAt(fromPosition);

            if (fromToken != null)
            {
                if ((fromToken.getTeam() == board.getWhoseMove()) && !fromToken.getValidMoves().isEmpty())
                {
                    final int toIndex = selectIndex(fromToken.getValidMoves());
                    final ChessPosition toPosition = board.getPositionFor(toIndex);
                    answer = new DefaultChessAction(board, this, fromPosition, toPosition);
                    break;
                }
            }
        }

        return answer;
    }

    /**
     * @return the actionGenerator
     */
    public ChessActionGenerator getActionGenerator()
    {
        return actionGenerator;
    }

    @Override
    public String getDescription()
    {
        return "A simple agent.";
    }

    @Override
    public String getName()
    {
        return name;
    }

    @Override
    public Team getTeam()
    {
        return team;
    }

    @Override
    public void postProcessGame(final Agent winner)
    {
        // Nothing to do.
    }

    /**
     * @param indices Indices.
     * 
     * @return a randomly selected action.
     */
    private Integer selectIndex(final List<Integer> indices)
    {
        Integer answer = null;

        if (CollectionUtils.isNotEmpty(indices))
        {
            if (indices.size() == 1)
            {
                answer = indices.get(0);
            }
            else
            {
                // Randomly pick an index.
                final int size = indices.size();
                final int index = (int)(size * Math.random());
                answer = indices.get(index);
            }
        }

        return answer;
    }
}

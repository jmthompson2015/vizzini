package org.vizzini.example.puzzle.sudoku;

import java.util.Set;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import org.vizzini.core.game.Adjudicator;
import org.vizzini.core.game.Agent;
import org.vizzini.core.game.Environment;

/**
 * Provides a simple implementation of a computer agent for tic-tac-toe.
 */
public final class SimpleAgent implements Agent
{
    /** Name. */
    private final String name;

    /** Team. */
    private final SudokuTeam team;

    /**
     * Construct this object.
     */
    public SimpleAgent()
    {
        this.name = SudokuTeam.TEAM.getName();
        this.team = SudokuTeam.TEAM;
    }

    /**
     * Construct this object.
     * 
     * @param name Name.
     */
    @SuppressWarnings("hiding")
    public SimpleAgent(final String name)
    {
        this.name = name;
        this.team = SudokuTeam.TEAM;
    }

    @Override
    public SudokuAction getAction(final Environment environment, final Adjudicator adjudicator)
    {
        SudokuAction answer = null;

        final SudokuEnvironment sEnvironment = (SudokuEnvironment)environment;

        // Search for a position with just one possible token.
        for (final SudokuPosition position : SudokuPosition.values())
        {
            final Set<SudokuToken> possibleTokens = sEnvironment.getPossibleTokens(position);

            if (possibleTokens.size() == 1)
            {
                final SudokuToken token = possibleTokens.iterator().next();
                answer = new SudokuAction(sEnvironment, position, token);
            }
        }

        if (answer == null)
        {
            // Search for a position which is the only place a token can appear in a file, rank, or block.
            for (int file = 0; file < SudokuPosition.MAX_X; file++)
            {
                for (final SudokuToken token : SudokuToken.values())
                {
                    if (sEnvironment.getFilePossibleTokenCount(file, token) == 1)
                    {
                        for (final SudokuPosition position : SudokuPosition.valuesByFile(file))
                        {
                            final Set<SudokuToken> tokens = sEnvironment.getPossibleTokens(position);

                            if (tokens.contains(token))
                            {
                                answer = new SudokuAction(sEnvironment, position, token);
                                break;
                            }
                        }
                    }
                }
            }
        }

        if (answer == null)
        {
            // Search for a position which is the only place a token can appear in a file, rank, or block.
            for (int rank = 0; rank < SudokuPosition.MAX_Y; rank++)
            {
                for (final SudokuToken token : SudokuToken.values())
                {
                    if (sEnvironment.getRankPossibleTokenCount(rank, token) == 1)
                    {
                        for (final SudokuPosition position : SudokuPosition.valuesByRank(rank))
                        {
                            final Set<SudokuToken> tokens = sEnvironment.getPossibleTokens(position);

                            if (tokens.contains(token))
                            {
                                answer = new SudokuAction(sEnvironment, position, token);
                                break;
                            }
                        }
                    }
                }
            }
        }

        if (answer == null)
        {
            // Search for a position which is the only place a token can appear in a file, rank, or block.
            for (int block = 0; block < SudokuPosition.MAX_BLOCK; block++)
            {
                for (final SudokuToken token : SudokuToken.values())
                {
                    if (sEnvironment.getFilePossibleTokenCount(block, token) == 1)
                    {
                        for (final SudokuPosition position : SudokuPosition.valuesByBlock(block))
                        {
                            final Set<SudokuToken> tokens = sEnvironment.getPossibleTokens(position);

                            if (tokens.contains(token))
                            {
                                answer = new SudokuAction(sEnvironment, position, token);
                                break;
                            }
                        }
                    }
                }
            }
        }

        return answer;
    }

    @Override
    public String getDescription()
    {
        return "This agent plays on a random open position.";
    }

    @Override
    public String getName()
    {
        return name;
    }

    @Override
    public SudokuTeam getTeam()
    {
        return team;
    }

    @Override
    public void postProcessGame(final Agent winner)
    {
        // Nothing to do.
    }

    @Override
    public String toString()
    {
        final ToStringBuilder builder = new ToStringBuilder(this, ToStringStyle.SHORT_PREFIX_STYLE);

        builder.append("name", getName());
        builder.append("team", getTeam());

        return builder.toString();
    }

    /**
     * @param actions Actions.
     * 
     * @return a randomly selected action.
     */
    // private SudokuAction selectAction(final List<Action> actions)
    // {
    // SudokuAction answer = null;
    //
    // if (CollectionUtils.isNotEmpty(actions))
    // {
    // if (actions.size() == 1)
    // {
    // answer = (SudokuAction)actions.get(0);
    // }
    // else
    // {
    // // Randomly pick an action.
    // final int size = actions.size();
    // final int index = (int)(size * Math.random());
    // answer = (SudokuAction)actions.get(index);
    // }
    // }
    //
    // return answer;
    // }
}

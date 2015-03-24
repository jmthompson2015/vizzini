package org.vizzini.example.puzzle.sudoku;

import java.beans.PropertyChangeEvent;
import java.beans.PropertyChangeListener;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.vizzini.core.game.Action;
import org.vizzini.core.game.Agent;
import org.vizzini.core.game.DefaultEnvironment;
import org.vizzini.core.game.Environment;
import org.vizzini.core.game.Position;
import org.vizzini.core.game.Team;
import org.vizzini.core.game.Token;

/**
 * Provides an environment for Sudoku.<br/>
 * Blocks are numbered like this:<br/>
 * 6 | 7 | 8<br/>
 * 3 | 4 | 5<br/>
 * 0 | 1 | 2
 */
public class SudokuEnvironment implements Environment
{
    /** Map of position to possible tokens. */
    Map<SudokuPosition, Set<SudokuToken>> possibleTokens = new HashMap<SudokuPosition, Set<SudokuToken>>();

    /** Agent. */
    private Agent agent;

    /** Delegate. */
    private final Environment delegate;

    /** Map of file to map of possible token to count. */
    final Map<Integer, Map<SudokuToken, Integer>> filePossibleTokenCounts = new HashMap<Integer, Map<SudokuToken, Integer>>();

    /** Map of rank to map of possible token to count. */
    final Map<Integer, Map<SudokuToken, Integer>> rankPossibleTokenCounts = new HashMap<Integer, Map<SudokuToken, Integer>>();

    /** Map of block to map of possible token to count. */
    final Map<Integer, Map<SudokuToken, Integer>> blockPossibleTokenCounts = new HashMap<Integer, Map<SudokuToken, Integer>>();

    /**
     * Construct this object.
     */
    public SudokuEnvironment()
    {
        final String description = "Sudoku board";
        final String name = "Sudoku board";

        delegate = new DefaultEnvironment(name, description);

        final PropertyChangeListener listener = createPropertyChangeListener();
        addDoActionListener(listener);
        addUndoActionListener(listener);
    }

    @Override
    public void addDoActionListener(final PropertyChangeListener listener)
    {
        delegate.addDoActionListener(listener);
    }

    @Override
    public void addUndoActionListener(final PropertyChangeListener listener)
    {
        delegate.addUndoActionListener(listener);
    }

    @Override
    public void clear()
    {
        agent = null;

        delegate.clear();
    }

    @Override
    public SudokuEnvironment copy()
    {
        final SudokuEnvironment answer = new SudokuEnvironment();

        final SudokuPosition[] values = SudokuPosition.values();

        for (final SudokuPosition position : values)
        {
            final Token token = getTokenAt(position);

            if (token != null)
            {
                answer.placeToken(position, token);
            }
        }

        return answer;
    }

    @Override
    public void fireDoActionPropertyChange(final Action oldValue, final Action newValue)
    {
        delegate.fireDoActionPropertyChange(oldValue, newValue);
    }

    @Override
    public void fireUndoActionPropertyChange(final Action oldValue, final Action newValue)
    {
        delegate.fireUndoActionPropertyChange(oldValue, newValue);
    }

    /**
     * @return agent.
     */
    public Agent getAgent()
    {
        return agent;
    }

    /**
     * @param block Rank.
     * @param token Token.
     * 
     * @return a count of the given possible token in the given block.
     */
    public int getBlockPossibleTokenCount(final int block, final SudokuToken token)
    {
        Map<SudokuToken, Integer> possibleTokenCounts = blockPossibleTokenCounts.get(block);

        if (possibleTokenCounts == null)
        {
            possibleTokenCounts = new HashMap<SudokuToken, Integer>();
            blockPossibleTokenCounts.put(block, possibleTokenCounts);
        }

        Integer answer = possibleTokenCounts.get(token);

        if (answer == null)
        {
            final SudokuPosition[] values = SudokuPosition.valuesByBlock(block);

            for (final SudokuPosition position : values)
            // for (int i = 0; i < SudokuPosition.MAX_X; i++)
            {
                // final SudokuPosition position = SudokuPosition.findByCoordinates(i, block);
                final Set<SudokuToken> myPossibleTokens = getPossibleTokens(position);

                if (myPossibleTokens.contains(token))
                {
                    Integer count = possibleTokenCounts.get(token);

                    if (count == null)
                    {
                        count = 0;
                    }

                    possibleTokenCounts.put(token, count + 1);
                }
            }

            answer = possibleTokenCounts.get(token);
        }

        if (answer == null)
        {
            answer = 0;
        }

        return answer;
    }

    @Override
    public String getDescription()
    {
        return delegate.getDescription();
    }

    /**
     * @param file File.
     * @param token Token.
     * 
     * @return a count of the given possible token in the given file.
     */
    public int getFilePossibleTokenCount(final int file, final SudokuToken token)
    {
        Map<SudokuToken, Integer> possibleTokenCounts = filePossibleTokenCounts.get(file);

        if (possibleTokenCounts == null)
        {
            possibleTokenCounts = new HashMap<SudokuToken, Integer>();
            filePossibleTokenCounts.put(file, possibleTokenCounts);
        }

        Integer answer = possibleTokenCounts.get(token);

        if (answer == null)
        {
            for (int j = 0; j < SudokuPosition.MAX_Y; j++)
            {
                final SudokuPosition position = SudokuPosition.findByCoordinates(file, j);
                final Set<SudokuToken> myPossibleTokens = getPossibleTokens(position);

                if (myPossibleTokens.contains(token))
                {
                    Integer count = possibleTokenCounts.get(token);

                    if (count == null)
                    {
                        count = 0;
                    }

                    possibleTokenCounts.put(token, count + 1);
                }
            }

            answer = possibleTokenCounts.get(token);
        }

        if (answer == null)
        {
            answer = 0;
        }

        return answer;
    }

    @Override
    public String getName()
    {
        return delegate.getName();
    }

    /**
     * @param position Position. (required)
     * 
     * @return a set of possible tokens.
     */
    public Set<SudokuToken> getPossibleTokens(final SudokuPosition position)
    {
        if (position == null)
        {
            throw new IllegalArgumentException("position is null");
        }

        Set<SudokuToken> answer = possibleTokens.get(position);

        if (answer == null)
        {
            answer = new HashSet<SudokuToken>();
            possibleTokens.put(position, answer);

            if (getTokenAt(position) == null)
            {
                final int column = position.getX();
                final int row = position.getY();
                final int block = position.getBlock();

                for (final SudokuToken token : SudokuToken.values())
                {
                    if (!fileContains(column, token) && !rankContains(row, token) && !blockContains(block, token))
                    {
                        answer.add(token);
                    }
                }
            }
        }

        return answer;
    }

    /**
     * @param rank Rank.
     * @param token Token.
     * 
     * @return a count of the given possible token in the given rank.
     */
    public int getRankPossibleTokenCount(final int rank, final SudokuToken token)
    {
        Map<SudokuToken, Integer> possibleTokenCounts = rankPossibleTokenCounts.get(rank);

        if (possibleTokenCounts == null)
        {
            possibleTokenCounts = new HashMap<SudokuToken, Integer>();
            rankPossibleTokenCounts.put(rank, possibleTokenCounts);
        }

        Integer answer = possibleTokenCounts.get(token);

        if (answer == null)
        {
            for (int i = 0; i < SudokuPosition.MAX_X; i++)
            {
                final SudokuPosition position = SudokuPosition.findByCoordinates(i, rank);
                final Set<SudokuToken> myPossibleTokens = getPossibleTokens(position);

                if (myPossibleTokens.contains(token))
                {
                    Integer count = possibleTokenCounts.get(token);

                    if (count == null)
                    {
                        count = 0;
                    }

                    possibleTokenCounts.put(token, count + 1);
                }
            }

            answer = possibleTokenCounts.get(token);
        }

        if (answer == null)
        {
            answer = 0;
        }

        return answer;
    }

    @Override
    public SudokuToken getTokenAt(final Position<?> position)
    {
        return (SudokuToken)delegate.getTokenAt(position);
    }

    @Override
    public int getTokenCount()
    {
        return delegate.getTokenCount();
    }

    @SuppressWarnings("hiding")
    @Override
    public int getTokenCountFor(final Agent agent)
    {
        return delegate.getTokenCountFor(agent);
    }

    @Override
    public int getTokenCountFor(final Team team)
    {
        return delegate.getTokenCountFor(team);
    }

    @Override
    public void placeInitialTokens(final List<Agent> agents)
    {
        agent = agents.get(0);
    }

    @Override
    public void placeToken(final Position<?> position, final Token token)
    {
        delegate.placeToken(position, token);
    }

    @Override
    public void removeDoActionListener(final PropertyChangeListener listener)
    {
        delegate.removeDoActionListener(listener);
    }

    @Override
    public void removeToken(final Position<?> position)
    {
        delegate.removeToken(position);
    }

    @Override
    public void removeUndoActionListener(final PropertyChangeListener listener)
    {
        delegate.removeUndoActionListener(listener);
    }

    @Override
    public String toString()
    {
        final StringBuilder sb = new StringBuilder();

        for (int y = SudokuPosition.MAX_Y - 1; y >= 0; y--)
        {
            sb.append(y + 1).append(" |");

            for (int x = 0; x < SudokuPosition.MAX_X; x++)
            {
                final SudokuPosition position = SudokuPosition.findByCoordinates(x, y);
                final Token token = getTokenAt(position);

                if (token == null)
                {
                    sb.append(" ");
                }
                else
                {
                    sb.append(token.getName());
                }

                sb.append("|");
            }

            // if (y < (SudokuPosition.MAX_Y - 1))
            // {
            sb.append("\n");
            // }

            if ((y > 0) && ((y % 3) == 0))
            {
                // sb.append("   a b c d e f g h i\n");
                sb.append("  +-----+-----+-----+\n");
            }
        }

        sb.append("   a b c d e f g h i\n");

        return sb.toString();
    }

    /**
     * @param block Block index.
     * @param token Token.
     * 
     * @return true if the specified block contains the given token.
     */
    private boolean blockContains(final int block, final SudokuToken token)
    {
        final SudokuPosition[] values = SudokuPosition.valuesByBlock(block);

        return valuesContains(values, token);
    }

    /**
     * @return a new property change listener.
     */
    private PropertyChangeListener createPropertyChangeListener()
    {
        return new PropertyChangeListener()
        {
            @Override
            public void propertyChange(final PropertyChangeEvent evt)
            {
                // System.out.println("Clearing environment data caches.");
                possibleTokens.clear();

                filePossibleTokenCounts.clear();
                rankPossibleTokenCounts.clear();
                blockPossibleTokenCounts.clear();
            }
        };
    }

    /**
     * @param file File.
     * @param token Token.
     * 
     * @return true if the specified file contains the given token.
     */
    private boolean fileContains(final int file, final SudokuToken token)
    {
        final SudokuPosition[] values = SudokuPosition.valuesByFile(file);

        return valuesContains(values, token);
    }

    /**
     * @param rank Rank.
     * @param token Token.
     * 
     * @return true if the specified rank contains the given token.
     */
    private boolean rankContains(final int rank, final SudokuToken token)
    {
        final SudokuPosition[] values = SudokuPosition.valuesByRank(rank);

        return valuesContains(values, token);
    }

    /**
     * @param values Array of position values.
     * @param token Token.
     * 
     * @return true if the specified block contains the given token.
     */
    private boolean valuesContains(final SudokuPosition[] values, final SudokuToken token)
    {
        boolean answer = false;

        for (final SudokuPosition position : values)
        {
            final SudokuToken myToken = getTokenAt(position);

            if (myToken == token)
            {
                answer = true;
                break;
            }
        }

        return answer;
    }
}

package org.vizzini.chess;

import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.TreeMap;

import org.apache.commons.lang3.StringUtils;
import org.vizzini.chess.artemis.ArtemisEnvironment;
import org.vizzini.chess.raumschach.RaumschachEnvironment;
import org.vizzini.chess.standard.StandardEnvironment;
import org.vizzini.chess.tridimensional.TridEnvironment;
import org.vizzini.core.game.Agent;

/**
 * Provides a board format which uses Forsyth-Edwards Notation (FEN), modified for three dimensions. Added a separator
 * '|' between levels for the piece placement. Added optional agent class names at the end of the string.
 * 
 * See <a href="http://en.wikipedia.org/wiki/Forsyth-Edwards_Notation">Wikipedia</a>.
 * 
 * @see GameType
 */
public final class FENBoardFormat implements ChessBoardFormat
{
    /** Flag indicating whether to provide verbose output. */
    private static final boolean IS_VERBOSE = false;

    /**
     * @param boardString String representation of a board.
     * 
     * @return the game type.
     */
    public GameType determineGameType(final String boardString)
    {
        GameType answer = null;

        final int levelCount = StringUtils.countMatches(boardString, "|") + 1;

        if (levelCount == 1)
        {
            answer = GameType.STANDARD;
        }
        else
        {
            final int rankCount = (StringUtils.countMatches(boardString, "/") / levelCount) + 1;

            if (rankCount == 4)
            {
                answer = GameType.ARTEMIS;
            }
            else if (rankCount == 5)
            {
                answer = GameType.RAUMSCHACH;
            }
            else if (rankCount == 6)
            {
                answer = GameType.TRIDIMENSIONAL;
            }
            else
            {
                throw new RuntimeException("Unknown game type for " + boardString);
            }
        }

        return answer;
    }

    @Override
    public String format(final ChessEnvironment board)
    {
        if (board == null)
        {
            throw new IllegalArgumentException("board is null");
        }

        final StringBuilder sb = new StringBuilder();

        final Dimensions dimensions = board.getDimensions();
        int count = 0;

        for (int l = dimensions.getLevelCount() - 1; l >= 0; l--)
        {
            for (int r = dimensions.getRankCount() - 1; r >= 0; r--)
            {
                for (int f = 0; f < dimensions.getFileCount(); f++)
                {
                    final int index = dimensions.coordsToIndex(f, r, l);
                    final ChessToken token = board.getTokenAt(index);

                    if (token == null)
                    {
                        count++;
                    }
                    else
                    {
                        if (count > 0)
                        {
                            sb.append(count);
                            count = 0;
                        }

                        final String symbol = token.getName();

                        sb.append(symbol);
                    }
                }

                if (count > 0)
                {
                    sb.append(count);
                    count = 0;
                }

                if (r > 0)
                {
                    sb.append('/');
                }
            }

            if (l > 0)
            {
                sb.append("|");
            }
        }

        sb.append(" ").append(board.getWhoseMove().getInitial().toLowerCase());

        if (board.getGameType() == GameType.STANDARD)
        {
            sb.append(" ");

            final StandardEnvironment scBoard = (StandardEnvironment)board;

            if (scBoard.isWhiteCastled() && scBoard.isBlackCastled())
            {
                sb.append("-");
            }
            else
            {
                if (!scBoard.isWhiteCastled())
                {
                    sb.append("KQ");
                }

                if (!scBoard.isBlackCastled())
                {
                    sb.append("kq");
                }
            }

            // FIXME en passant target square in algebraic notation
            sb.append(" -");
        }

        sb.append(" ").append(board.getFiftyMoveCount());
        sb.append(" ").append(board.getMoveCount());
        sb.append(" ").append(board.getFirstAgent().getClass().getName());
        sb.append(" ").append(board.getSecondAgent().getClass().getName());

        return sb.toString();
    }

    @Override
    public ChessEnvironment parse(final String boardString)
    {
        final GameType gameType = determineGameType(boardString);

        return parse(boardString, gameType);
    }

    /**
     * @param className Agent class name.
     * @param team Team.
     * 
     * @return a new agent.
     */
    private Agent createAgent(final String className, final ChessTeam team)
    {
        Agent answer = null;

        if (StringUtils.isNotEmpty(className))
        {
            try
            {
                final Class<?> aClass = Class.forName(className);
                @SuppressWarnings("unchecked")
                final Constructor<Agent> constructor = (Constructor<Agent>)aClass.getConstructor(String.class,
                        ChessTeam.class, ChessActionGenerator.class);
                final ChessActionGenerator actionGenerator = new DefaultChessActionGenerator();
                answer = constructor.newInstance(team.getName(), team, actionGenerator);
            }
            catch (final ClassNotFoundException e)
            {
                throw new RuntimeException(e);
            }
            catch (final SecurityException e)
            {
                throw new RuntimeException(e);
            }
            catch (final NoSuchMethodException e)
            {
                throw new RuntimeException(e);
            }
            catch (final IllegalArgumentException e)
            {
                throw new RuntimeException(e);
            }
            catch (final InstantiationException e)
            {
                throw new RuntimeException(e);
            }
            catch (final IllegalAccessException e)
            {
                throw new RuntimeException(e);
            }
            catch (final InvocationTargetException e)
            {
                throw new RuntimeException(e);
            }
        }

        if (answer == null)
        {
            final ChessActionGenerator actionGenerator = new DefaultChessActionGenerator();
            answer = new SimpleAgent(team.getName(), team, actionGenerator);
        }

        return answer;
    }

    /**
     * @param agentWhiteClassName Agent white class name.
     * @param agentBlackClassName Agent black class name.
     * 
     * @return a new list of agents.
     */
    private List<Agent> createAgents(final String agentWhiteClassName, final String agentBlackClassName)
    {
        final List<Agent> agents = new ArrayList<Agent>();

        agents.add(createAgent(agentWhiteClassName, ChessTeam.WHITE));
        agents.add(createAgent(agentBlackClassName, ChessTeam.BLACK));

        return agents;
    }

    /**
     * @param boardString String representation of a board.
     * @param gameType Game type.
     * 
     * @return a new board.
     */
    private ChessEnvironment parse(final String boardString, final GameType gameType)
    {
        if (StringUtils.isEmpty(boardString))
        {
            throw new IllegalArgumentException("boardString is empty");
        }

        final String[] parts = boardString.split("[ ]");
        final int partsOffset = (gameType == GameType.STANDARD ? 2 : 0);

        if ((parts == null) || (parts.length < (4 + partsOffset)))
        {
            throw new IllegalArgumentException("Cannot parse boardString [" + boardString + "]");
        }

        final String agentWhiteClassName = parts.length > (4 + partsOffset) ? parts[4 + partsOffset] : null;
        final String agentBlackClassName = parts.length > (5 + partsOffset) ? parts[5 + partsOffset] : null;
        final List<Agent> agents = createAgents(agentWhiteClassName, agentBlackClassName);

        final Map<Integer, ChessToken> tokens = parseTokens(parts[0], gameType, agents);

        if (IS_VERBOSE)
        {
            System.out.println("tokens =\n");

            for (final Entry<Integer, ChessToken> entry : tokens.entrySet())
            {
                final ChessToken token = entry.getValue();
                System.out.println(entry.getKey() + ": " + token.getTeam() + " " + token.getType());
            }
        }

        final ChessTeam whoseMove = ("w".equals(parts[1]) ? ChessTeam.WHITE : ChessTeam.BLACK);

        // FIXME: need to process standard chess castling availability (parts[2]) and en passant target square
        // (parts[3]).

        final Integer fiftyMoveCount0 = parseInteger(parts[2 + partsOffset]);
        final int fiftyMoveCount = fiftyMoveCount0 == null ? 0 : fiftyMoveCount0;
        final Integer moveCount0 = parseInteger(parts[3 + partsOffset]);
        final int moveCount = moveCount0 == null ? 0 : moveCount0;

        ChessEnvironment answer;

        // FIXME: imports from down package.
        switch (gameType)
        {
        case ARTEMIS:
            answer = new ArtemisEnvironment(fiftyMoveCount, moveCount, whoseMove);
            break;
        case RAUMSCHACH:
            answer = new RaumschachEnvironment(fiftyMoveCount, moveCount, whoseMove);
            break;
        case STANDARD:
            answer = new StandardEnvironment(fiftyMoveCount, moveCount, whoseMove);
            break;
        case TRIDIMENSIONAL:
            answer = new TridEnvironment(fiftyMoveCount, moveCount, whoseMove);
            break;
        default:
            throw new RuntimeException("Unknown game type: " + gameType);
        }

        for (final Entry<Integer, ChessToken> entry : tokens.entrySet())
        {
            answer.placeToken(entry.getKey(), entry.getValue());
        }

        return answer;
    }

    /**
     * @param value String value.
     * 
     * @return an integer parsed from the given parameter.
     */
    private Integer parseInteger(final String value)
    {
        Integer answer = null;

        try
        {
            answer = Integer.parseInt(value);
        }
        catch (final NumberFormatException ignore)
        {
            // e.printStackTrace();
        }

        return answer;
    }

    /**
     * @param boardString Board string.
     * @param gameType Game type.
     * @param agents Agents.
     * 
     * @return a map of index to chess token.
     */
    private Map<Integer, ChessToken> parseTokens(final String boardString, final GameType gameType,
            final List<Agent> agents)
    {
        if (gameType == null)
        {
            throw new IllegalArgumentException("gameType is null");
        }

        final Map<Integer, ChessToken> answer = new TreeMap<Integer, ChessToken>();

        final int length = boardString.length();
        final Dimensions dimensions = gameType.getDimensions();
        int file = 0;
        int rank = dimensions.getRankCount() - 1;
        int level = dimensions.getLevelCount() - 1;
        int index = dimensions.coordsToIndex(file, rank, level);
        final Agent agentWhite = agents.get(0);
        final Agent agentBlack = agents.get(1);

        for (int i = 0; i < length; i++)
        {
            final char c = boardString.charAt(i);

            if (Character.isDigit(c))
            {
                file += Integer.parseInt(String.valueOf(c));
            }
            else if (Character.isLetter(c))
            {
                final ChessTeam team = Character.isUpperCase(c) ? ChessTeam.WHITE : ChessTeam.BLACK;
                final TokenType type = TokenType.getBySymbol(String.valueOf(c).toUpperCase());
                final Agent agent = team == ChessTeam.WHITE ? agentWhite : agentBlack;
                answer.put(index, (ChessToken)DefaultChessToken.findByTeamAndType(team, type).withAgent(agent));
                file++;
            }
            else if (c == '/')
            {
                file = 0;
                rank--;
            }
            else if (c == '|')
            {
                file = 0;
                rank = dimensions.getRankCount() - 1;
                level--;
            }
            else
            {
                throw new RuntimeException("Unrecognized character: [" + c + "]");
            }

            index = dimensions.coordsToIndex(file, rank, level);
        }

        return answer;
    }
}

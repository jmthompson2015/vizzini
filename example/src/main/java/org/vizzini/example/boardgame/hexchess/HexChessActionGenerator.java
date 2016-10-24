package org.vizzini.example.boardgame.hexchess;

import java.util.ArrayList;
import java.util.BitSet;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.vizzini.core.game.Action;
import org.vizzini.core.game.Adjudicator;
import org.vizzini.core.game.Agent;
import org.vizzini.core.game.Environment;
import org.vizzini.core.game.boardgame.ActionGenerator;

/**
 * Provides a generator for hex chess actions.
 */
public final class HexChessActionGenerator implements ActionGenerator
{
    /** Map of position to moves. */
    private final Map<HexChessPosition, BitSet> bishopMoves = new HashMap<HexChessPosition, BitSet>();

    /** Map of position to moves. */
    private final Map<HexChessPosition, BitSet> kingMoves = new HashMap<HexChessPosition, BitSet>();

    /** Map of position to moves. */
    private final Map<HexChessPosition, BitSet> knightMoves = new HashMap<HexChessPosition, BitSet>();

    /** Map of position to moves. */
    private final Map<HexChessPosition, BitSet> rookMoves = new HashMap<HexChessPosition, BitSet>();

    @Override
    public List<Action> generateActions(final Environment environment, final Adjudicator adjudicator, final Agent agent)
    {
        final HexChessEnvironment cEnvironment = (HexChessEnvironment)environment;
        final HexChessAdjudicator cAdjudicator = (HexChessAdjudicator)adjudicator;
        final HexChessTeam team = (HexChessTeam)agent.getTeam();

        final List<Action> answer = new ArrayList<Action>();

        final HexChessPosition[] values = HexChessPosition.values();

        for (final HexChessPosition fromPosition : values)
        {
            final HexChessToken fromToken = cEnvironment.getTokenAt(fromPosition);

            if ((fromToken != null) && (fromToken.getTeam() == team))
            {
                if (fromToken.getType() == TokenType.BISHOP)
                {
                    final List<HexChessAction> actions = generateBishopActions(cEnvironment, cAdjudicator, agent,
                            fromPosition);
                    answer.addAll(actions);
                }
                else if (fromToken.getType() == TokenType.KING)
                {
                    final List<HexChessAction> actions = generateKingActions(cEnvironment, cAdjudicator, agent,
                            fromPosition);
                    answer.addAll(actions);
                }
                else if (fromToken.getType() == TokenType.KNIGHT)
                {
                    final List<HexChessAction> actions = generateKnightActions(cEnvironment, cAdjudicator, agent,
                            fromPosition);
                    answer.addAll(actions);
                }
                else if (fromToken.getType() == TokenType.QUEEN)
                {
                    final List<HexChessAction> actions = generateQueenActions(cEnvironment, cAdjudicator, agent,
                            fromPosition);
                    answer.addAll(actions);
                }
                else if (fromToken.getType() == TokenType.PAWN)
                {
                    // FIXME
                }
                else if (fromToken.getType() == TokenType.ROOK)
                {
                    final List<HexChessAction> actions = generateRookActions(cEnvironment, cAdjudicator, agent,
                            fromPosition);
                    answer.addAll(actions);
                }
                else
                {
                    throw new RuntimeException("Unknown token type: " + fromToken.getType());
                }
            }
        }

        return answer;
    }

    /**
     * @param fromPosition From position.
     * 
     * @return a new bit set.
     */
    private BitSet createBishopMoves(final HexChessPosition fromPosition)
    {
        final BitSet answer = new BitSet();

        final Direction[] directions = Direction.getBiaxialDirections();

        for (final Direction d : directions)
        {
            final int dx = d.getDx();
            final int dy = d.getDy();
            final int dz = d.getDz();

            for (int i = 0; i < 10; i++)
            {
                maybeSetPosition(answer, fromPosition, i * dx, i * dy, i * dz);
            }
        }

        return answer;
    }

    /**
     * @param fromPosition From position.
     * 
     * @return a new bit set.
     */
    private BitSet createKingMoves(final HexChessPosition fromPosition)
    {
        final BitSet answer = new BitSet();

        final Direction[] directions1 = Direction.getUniaxialDirections();

        for (final Direction d : directions1)
        {
            final int dx = d.getDx();
            final int dy = d.getDy();
            final int dz = d.getDz();

            maybeSetPosition(answer, fromPosition, dx, dy, dz);
        }

        final Direction[] directions2 = Direction.getBiaxialDirections();

        for (final Direction d : directions2)
        {
            final int dx = d.getDx();
            final int dy = d.getDy();
            final int dz = d.getDz();

            maybeSetPosition(answer, fromPosition, dx, dy, dz);
        }

        return answer;
    }

    /**
     * @param fromPosition From position.
     * 
     * @return a new bit set.
     */
    private BitSet createKnightMoves(final HexChessPosition fromPosition)
    {
        final BitSet answer = new BitSet();

        maybeSetPosition(answer, fromPosition, 1, 2, -3);
        maybeSetPosition(answer, fromPosition, 1, -3, 2);
        maybeSetPosition(answer, fromPosition, -1, -2, 3);
        maybeSetPosition(answer, fromPosition, -1, 3, -2);

        maybeSetPosition(answer, fromPosition, 2, -3, 1);
        maybeSetPosition(answer, fromPosition, 2, 1, -3);
        maybeSetPosition(answer, fromPosition, -2, 3, -1);
        maybeSetPosition(answer, fromPosition, -2, -1, 3);

        maybeSetPosition(answer, fromPosition, 3, -1, -2);
        maybeSetPosition(answer, fromPosition, 3, -2, -1);
        maybeSetPosition(answer, fromPosition, -3, 1, 2);
        maybeSetPosition(answer, fromPosition, -3, 2, 1);

        return answer;
    }

    /**
     * @param fromPosition From position.
     * 
     * @return a new bit set.
     */
    private BitSet createRookMoves(final HexChessPosition fromPosition)
    {
        final BitSet answer = new BitSet();

        final Direction[] directions = Direction.getUniaxialDirections();

        for (final Direction d : directions)
        {
            final int dx = d.getDx();
            final int dy = d.getDy();
            final int dz = d.getDz();

            for (int i = 0; i < 10; i++)
            {
                maybeSetPosition(answer, fromPosition, i * dx, i * dy, i * dz);
            }
        }

        return answer;
    }

    /**
     * @param moves Bit set of moves.
     * @param environment Environment.
     * @param adjudicator Adjudicator.
     * @param agent Agent.
     * @param fromPosition From position.
     * 
     * @return all the possible actions.
     */
    private List<HexChessAction> generateActions(final BitSet moves, final HexChessEnvironment environment,
            final HexChessAdjudicator adjudicator, final Agent agent, final HexChessPosition fromPosition)
    {
        final List<HexChessAction> answer = new ArrayList<HexChessAction>();

        final HexChessTeam team = (HexChessTeam)agent.getTeam();

        for (int i = moves.nextSetBit(0); i >= 0; i = moves.nextSetBit(i + 1))
        {
            final HexChessPosition toPosition = HexChessPosition.findByIndex(i);

            if (adjudicator.isActionLegalFor(environment, team, fromPosition, toPosition))
            {
                final HexChessAction action = new HexChessAction(environment, agent, fromPosition, toPosition);
                answer.add(action);
            }
        }

        return answer;
    }

    /**
     * @param environment Environment.
     * @param adjudicator Adjudicator.
     * @param agent Agent.
     * @param fromPosition From position.
     * 
     * @return all the possible actions.
     */
    private List<HexChessAction> generateBishopActions(final HexChessEnvironment environment,
            final HexChessAdjudicator adjudicator, final Agent agent, final HexChessPosition fromPosition)
    {
        BitSet moves = bishopMoves.get(fromPosition);

        if (moves == null)
        {
            moves = createBishopMoves(fromPosition);
            bishopMoves.put(fromPosition, moves);
        }

        return generateActions(moves, environment, adjudicator, agent, fromPosition);
    }

    /**
     * @param environment Environment.
     * @param adjudicator Adjudicator.
     * @param agent Agent.
     * @param fromPosition From position.
     * 
     * @return all the possible actions.
     */
    private List<HexChessAction> generateKingActions(final HexChessEnvironment environment,
            final HexChessAdjudicator adjudicator, final Agent agent, final HexChessPosition fromPosition)
    {
        BitSet moves = kingMoves.get(fromPosition);

        if (moves == null)
        {
            moves = createKingMoves(fromPosition);
            kingMoves.put(fromPosition, moves);
        }

        return generateActions(moves, environment, adjudicator, agent, fromPosition);
    }

    /**
     * @param environment Environment.
     * @param adjudicator Adjudicator.
     * @param agent Agent.
     * @param fromPosition From position.
     * 
     * @return all the possible actions.
     */
    private List<HexChessAction> generateKnightActions(final HexChessEnvironment environment,
            final HexChessAdjudicator adjudicator, final Agent agent, final HexChessPosition fromPosition)
    {
        BitSet moves = knightMoves.get(fromPosition);

        if (moves == null)
        {
            moves = createKnightMoves(fromPosition);
            knightMoves.put(fromPosition, moves);
        }

        return generateActions(moves, environment, adjudicator, agent, fromPosition);
    }

    /**
     * @param environment Environment.
     * @param adjudicator Adjudicator.
     * @param agent Agent.
     * @param fromPosition From position.
     * 
     * @return all the possible actions.
     */
    private List<HexChessAction> generateQueenActions(final HexChessEnvironment environment,
            final HexChessAdjudicator adjudicator, final Agent agent, final HexChessPosition fromPosition)
    {
        final List<HexChessAction> answer = new ArrayList<HexChessAction>();

        answer.addAll(generateRookActions(environment, adjudicator, agent, fromPosition));
        answer.addAll(generateBishopActions(environment, adjudicator, agent, fromPosition));

        return answer;
    }

    /**
     * @param environment Environment.
     * @param adjudicator Adjudicator.
     * @param agent Agent.
     * @param fromPosition From position.
     * 
     * @return all the possible actions.
     */
    private List<HexChessAction> generateRookActions(final HexChessEnvironment environment,
            final HexChessAdjudicator adjudicator, final Agent agent, final HexChessPosition fromPosition)
    {
        BitSet moves = rookMoves.get(fromPosition);

        if (moves == null)
        {
            moves = createRookMoves(fromPosition);
            rookMoves.put(fromPosition, moves);
        }

        return generateActions(moves, environment, adjudicator, agent, fromPosition);
    }

    /**
     * @param bitSet Bit set.
     * @param fromPosition From position.
     * @param dx Delta cube coordinate x.
     * @param dy Delta cube coordinate y.
     * @param dz Delta cube coordinate z.
     */
    private void maybeSetPosition(final BitSet bitSet, final HexChessPosition fromPosition, final int dx, final int dy,
            final int dz)
    {
        final int x0 = fromPosition.getX();
        final int y0 = fromPosition.getY();
        final int z0 = fromPosition.getZ();

        final HexChessPosition toPosition = HexChessPosition.findByCoordinates(x0 + dx, y0 + dy, z0 + dz);

        if (toPosition != null)
        {
            bitSet.set(toPosition.getIndex());
        }
    }
}

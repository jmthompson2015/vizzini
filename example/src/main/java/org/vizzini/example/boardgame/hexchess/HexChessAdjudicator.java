package org.vizzini.example.boardgame.hexchess;

import org.vizzini.core.game.Action;
import org.vizzini.core.game.Adjudicator;
import org.vizzini.core.game.Agent;
import org.vizzini.core.game.Environment;

/**
 * Provides an adjudicator for hexagonal chess.
 */
public final class HexChessAdjudicator implements Adjudicator
{
    /** Flag indicating whether to print output. */
    private static final boolean IS_VERBOSE = false;

    @Override
    public Agent determineWinner(final Environment environment)
    {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public String getDescription()
    {
        return "A hexagonal chess adjudicator.";
    }

    @Override
    public String getName()
    {
        return "HexChessAdjudicator";
    }

    @Override
    public boolean isActionLegal(final Action action)
    {
        boolean answer = false;

        if (action instanceof HexChessAction)
        {
            final HexChessAction cAction = (HexChessAction)action;
            final HexChessEnvironment environment = cAction.getEnvironment();
            final HexChessTeam team = (HexChessTeam)cAction.getAgent().getTeam();
            final HexChessPosition fromPosition = cAction.getFromPosition();
            final HexChessPosition toPosition = cAction.getToPosition();

            answer = isActionLegalFor(environment, team, fromPosition, toPosition);
        }

        return answer;
    }

    /**
     * @param environment Environment.
     * @param team Team.
     * @param fromPosition From position.
     * @param toPosition To position.
     * 
     * @return true if the given action is legal.
     */
    public boolean isActionLegalFor(final HexChessEnvironment environment, final HexChessTeam team,
            final HexChessPosition fromPosition, final HexChessPosition toPosition)
    {
        boolean answer = false;

        final HexChessToken fromToken = environment.getTokenAt(fromPosition);

        if (IS_VERBOSE)
        {
            System.out.println("fromToken = " + fromToken);
        }

        if ((fromToken != null) && (fromToken.getTeam() == team))
        {
            final HexChessToken toToken = environment.getTokenAt(toPosition);
            if (IS_VERBOSE)
            {
                System.out.println("toToken = " + toToken);
            }

            if ((toToken == null) || (fromToken.getTeam() != toToken.getTeam()))
            {
                if (fromToken.getType() == TokenType.PAWN)
                {
                    // TODO implement pawn
                }
                else
                {
                    if (fromToken.getType() == TokenType.BISHOP)
                    {
                        answer = isBishopActionLegalFor(fromPosition, toPosition)
                                && isEmptyRun(environment, fromPosition, toPosition);
                    }
                    else if (fromToken.getType() == TokenType.KING)
                    {
                        answer = isKingActionLegalFor(fromPosition, toPosition);
                    }
                    else if (fromToken.getType() == TokenType.KNIGHT)
                    {
                        answer = isKnightActionLegalFor(fromPosition, toPosition);
                    }
                    else if (fromToken.getType() == TokenType.QUEEN)
                    {
                        answer = ( // Bishop
                                isBishopActionLegalFor(fromPosition, toPosition)
                                // Rook
                                || isRookActionLegalFor(fromPosition, toPosition))
                                && isEmptyRun(environment, fromPosition, toPosition);
                    }
                    else if (fromToken.getType() == TokenType.ROOK)
                    {
                        answer = isRookActionLegalFor(fromPosition, toPosition)
                                && isEmptyRun(environment, fromPosition, toPosition);
                    }
                    else
                    {
                        throw new RuntimeException("Unknown token type: " + fromToken.getType());
                    }
                }
            }
        }

        return answer;
    }

    /**
     * @param environment Environment.
     * @param fromPosition From position.
     * @param toPosition To position.
     * 
     * @return true if the run is empty of tokens.
     */
    public boolean isEmptyRun(final HexChessEnvironment environment, final HexChessPosition fromPosition,
            final HexChessPosition toPosition)
    {
        // TODO Auto-generated method stub
        return true;
    }

    @Override
    public boolean isGameOver(final Environment environment)
    {
        // TODO Auto-generated method stub
        return false;
    }

    /**
     * @param fromPosition From position.
     * @param toPosition To position.
     * 
     * @return true if the given action is legal.
     */
    private boolean isBishopActionLegalFor(final HexChessPosition fromPosition, final HexChessPosition toPosition)
    {
        final int dq = toPosition.getQ() - fromPosition.getQ();
        final int dr = toPosition.getR() - fromPosition.getR();
        final int dx = toPosition.getX() - fromPosition.getX();
        final int dy = toPosition.getY() - fromPosition.getY();
        final int dz = toPosition.getZ() - fromPosition.getZ();

        if (IS_VERBOSE)
        {
            System.out.println("dq, dr = " + dq + ", " + dr + " dx, dy, dz = " + dx + ", " + dy + ", " + dz);
        }

        return (((dx == dy) && ((dy != dz))) || ((dx == dz) && ((dz != dy))) || ((dy == dz) && ((dz != dx))));
    }

    /**
     * @param fromPosition From position.
     * @param toPosition To position.
     * 
     * @return true if the given action is legal.
     */
    private boolean isKingActionLegalFor(final HexChessPosition fromPosition, final HexChessPosition toPosition)
    {
        final int dq = toPosition.getQ() - fromPosition.getQ();
        final int dr = toPosition.getR() - fromPosition.getR();
        final int dx = toPosition.getX() - fromPosition.getX();
        final int dy = toPosition.getY() - fromPosition.getY();
        final int dz = toPosition.getZ() - fromPosition.getZ();

        if (IS_VERBOSE)
        {
            System.out.println("dq, dr = " + dq + ", " + dr + " dx, dy, dz = " + dx + ", " + dy + ", " + dz);
        }

        final Direction direction = Direction.findByComponents(dx, dy, dz);

        return direction != null;
    }

    /**
     * @param fromPosition From position.
     * @param toPosition To position.
     * 
     * @return true if the given action is legal.
     */
    private boolean isKnightActionLegalFor(final HexChessPosition fromPosition, final HexChessPosition toPosition)
    {
        final int dq = toPosition.getQ() - fromPosition.getQ();
        final int dr = toPosition.getR() - fromPosition.getR();
        final int dx = Math.abs(toPosition.getX() - fromPosition.getX());
        final int dy = Math.abs(toPosition.getY() - fromPosition.getY());
        final int dz = Math.abs(toPosition.getZ() - fromPosition.getZ());

        if (IS_VERBOSE)
        {
            System.out.println("dq, dr = " + dq + ", " + dr + " dx, dy, dz = " + dx + ", " + dy + ", " + dz);
        }

        return ((dx == 1) && (dy == 2) && (dz == 3)) || ((dx == 1) && (dy == 3) && (dz == 2))
                || ((dx == 2) && (dy == 1) && (dz == 3)) || ((dx == 2) && (dy == 3) && (dz == 1))
                || ((dx == 3) && (dy == 1) && (dz == 2)) || ((dx == 3) && (dy == 2) && (dz == 1));
    }

    /**
     * @param fromPosition From position.
     * @param toPosition To position.
     * 
     * @return true if the given action is legal.
     */
    private boolean isRookActionLegalFor(final HexChessPosition fromPosition, final HexChessPosition toPosition)
    {
        final int dq = toPosition.getQ() - fromPosition.getQ();
        final int dr = toPosition.getR() - fromPosition.getR();
        final int dx = toPosition.getX() - fromPosition.getX();
        final int dy = toPosition.getY() - fromPosition.getY();
        final int dz = toPosition.getZ() - fromPosition.getZ();

        if (IS_VERBOSE)
        {
            System.out.println("dq, dr = " + dq + ", " + dr + " dx, dy, dz = " + dx + ", " + dy + ", " + dz);
        }

        return (((dx == 0) && (dy != 0) && (dz != 0)) || ((dx != 0) && (dy == 0) && (dz != 0)) || ((dx != 0)
                && (dy != 0) && (dz == 0)));
    }
}

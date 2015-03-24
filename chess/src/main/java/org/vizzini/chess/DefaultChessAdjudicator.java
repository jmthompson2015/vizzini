package org.vizzini.chess;

import org.vizzini.core.game.Action;
import org.vizzini.core.game.Adjudicator;
import org.vizzini.core.game.Agent;
import org.vizzini.core.game.DefaultAdjudicator;
import org.vizzini.core.game.Environment;

/**
 * Provides an adjudicator for chess.
 */
public final class DefaultChessAdjudicator implements ChessAdjudicator
{
    /** Flag indicating whether to print output. */
    private static final boolean IS_VERBOSE = false;

    /** Delegate. */
    private final Adjudicator delegate = new DefaultAdjudicator("Chess Adjudicator", "A chess adjudicator");

    @Override
    public Agent determineWinner(final Environment environment)
    {
        // FIXME
        return delegate.determineWinner(environment);
    }

    @Override
    public String getDescription()
    {
        return delegate.getDescription();
    }

    @Override
    public String getName()
    {
        return delegate.getName();
    }

    @Override
    public boolean isActionLegal(final Action action)
    {
        boolean answer = false;

        if (action instanceof ChessAction)
        {
            final ChessAction cAction = (ChessAction)action;
            final ChessEnvironment environment = (ChessEnvironment)cAction.getEnvironment();
            final ChessTeam team = (ChessTeam)cAction.getAgent().getTeam();
            final ChessPosition fromPosition = cAction.getFromPosition();
            final ChessPosition toPosition = cAction.getToPosition();

            answer = isActionLegalFor(environment, team, fromPosition, toPosition);
        }

        return answer;
    }

    @Override
    public boolean isActionLegalFor(final ChessEnvironment environment, final ChessTeam team,
            final ChessPosition fromPosition, final ChessPosition toPosition)
    {
        boolean answer = false;

        final ChessToken fromToken = (ChessToken)environment.getTokenAt(fromPosition);

        if (IS_VERBOSE)
        {
            System.out.println("fromToken = " + fromToken);
        }

        if ((fromToken != null) && (fromToken.getTeam() == team))
        {
            final ChessToken toToken = (ChessToken)environment.getTokenAt(toPosition);

            if (IS_VERBOSE)
            {
                System.out.println("toToken = " + toToken);
            }

            if ((toToken == null) || (fromToken.getTeam() != toToken.getTeam()))
            {
                if (fromToken.getType() == TokenType.PAWN)
                {
                    final int dx = toPosition.getX() - fromPosition.getX();
                    final int dy = toPosition.getY() - fromPosition.getY();
                    final int dz = toPosition.getZ() - fromPosition.getZ();

                    if (IS_VERBOSE)
                    {
                        System.out.println("dx, dy, dz = " + dx + ", " + dy + ", " + dz);
                    }

                    if (fromToken.getTeam() == ChessTeam.WHITE)
                    {
                        answer = (dx == 0) && (((dy == 1) && (dz == 0)) || ((dy == 0) && (dz == 1)));
                    }
                    else
                    {
                        answer = (dx == 0) && (((dy == -1) && (dz == 0)) || ((dy == 0) && (dz == -1)));
                    }
                }
                else
                {
                    final int dx = Math.abs(toPosition.getX() - fromPosition.getX());
                    final int dy = Math.abs(toPosition.getY() - fromPosition.getY());
                    final int dz = Math.abs(toPosition.getZ() - fromPosition.getZ());

                    if (IS_VERBOSE)
                    {
                        System.out.println("dx, dy, dz = " + dx + ", " + dy + ", " + dz);
                    }

                    if (fromToken.getType() == TokenType.BISHOP)
                    {
                        answer = isBishopActionLegalFor(fromPosition, toPosition)
                                && isEmptyRun(environment, fromPosition, toPosition);
                    }
                    else if (fromToken.getType() == TokenType.KING)
                    {
                        answer = (((dx > 0) || (dy > 0) || (dz > 0)) && (dx <= 1) && (dy <= 1) && (dz <= 1))
                                && isEmptyRun(environment, fromPosition, toPosition);
                    }
                    else if (fromToken.getType() == TokenType.KNIGHT)
                    {
                        answer = ((dx == 1) && (dy == 2) && (dz == 0)) || ((dx == 2) && (dy == 1) && (dz == 0))
                                || ((dx == 0) && (dy == 2) && (dz == 1)) || ((dx == 2) && (dy == 0) && (dz == 1))
                                || ((dx == 0) && (dy == 1) && (dz == 2)) || ((dx == 1) && (dy == 0) && (dz == 2));
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
                    else if (fromToken.getType() == TokenType.UNICORN)
                    {
                        answer = (dx > 0) && (dx == dy) && (dx == dz)
                                && isEmptyRun(environment, fromPosition, toPosition);
                    }
                    else
                    {
                        throw new RuntimeException("Unknown token type: " + fromToken.getClass().getName());
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
    public boolean isEmptyRun(final ChessEnvironment environment, final ChessPosition fromPosition,
            final ChessPosition toPosition)
    {
        boolean answer = true;

        final int x0 = Math.min(fromPosition.getX(), toPosition.getX());
        final int y0 = Math.min(fromPosition.getY(), toPosition.getY());
        final int z0 = Math.min(fromPosition.getZ(), toPosition.getZ());

        if (IS_VERBOSE)
        {
            System.out.println("x0, y0, z0 = " + x0 + ", " + y0 + ", " + z0);
        }

        final int x1 = Math.max(fromPosition.getX(), toPosition.getX());
        final int y1 = Math.max(fromPosition.getY(), toPosition.getY());
        final int z1 = Math.max(fromPosition.getZ(), toPosition.getZ());

        if (IS_VERBOSE)
        {
            System.out.println("x1, y1, z1 = " + x1 + ", " + y1 + ", " + z1);
        }

        final int dx = x1 - x0;
        final int dy = y1 - y0;
        final int dz = z1 - z0;

        if (IS_VERBOSE)
        {
            System.out.println("dx, dy, dz = " + dx + ", " + dy + ", " + dz);
        }

        if ((dx == 0) && (dy == 0) && (dz == 0))
        {
            if (IS_VERBOSE)
            {
                System.out.println("case 0");
            }

            // Nothing to do.
        }
        else if ((dx == 0) && (dy == 0))
        {
            if (IS_VERBOSE)
            {
                System.out.println("case 1");
            }

            for (int z = z0 + 1; z < z1; z++)
            {
                final ChessPosition position = environment.getPositionFor(x0, y0, z);
                final ChessToken token = (ChessToken)environment.getTokenAt(position);

                if (token != null)
                {
                    answer = false;
                    break;
                }
            }
        }
        else if ((dx == 0) && (dz == 0))
        {
            if (IS_VERBOSE)
            {
                System.out.println("case 2");
            }

            for (int y = y0 + 1; y < y1; y++)
            {
                final ChessPosition position = environment.getPositionFor(x0, y, z0);
                final ChessToken token = (ChessToken)environment.getTokenAt(position);

                if (token != null)
                {
                    answer = false;
                    break;
                }
            }
        }
        else if ((dy == 0) && (dz == 0))
        {
            if (IS_VERBOSE)
            {
                System.out.println("case 3");
            }

            for (int x = x0 + 1; x < x1; x++)
            {
                final ChessPosition position = environment.getPositionFor(x, y0, z0);
                final ChessToken token = (ChessToken)environment.getTokenAt(position);

                if (token != null)
                {
                    answer = false;
                    break;
                }
            }
        }
        else if (dx == 0)
        {
            if (IS_VERBOSE)
            {
                System.out.println("case 4");
            }

            for (int y = y0 + 1; y < y1; y++)
            {
                final int z = z0 + (y - y0);
                final ChessPosition position = environment.getPositionFor(x0, y, z);
                final ChessToken token = (ChessToken)environment.getTokenAt(position);

                if (token != null)
                {
                    answer = false;
                    break;
                }
            }
        }
        else if (dy == 0)
        {
            if (IS_VERBOSE)
            {
                System.out.println("case 5");
            }

            for (int x = x0 + 1; x < x1; x++)
            {
                final int z = z0 + (x - x0);
                final ChessPosition position = environment.getPositionFor(x, y0, z);
                final ChessToken token = (ChessToken)environment.getTokenAt(position);

                if (token != null)
                {
                    answer = false;
                    break;
                }
            }
        }
        else if (dz == 0)
        {
            if (IS_VERBOSE)
            {
                System.out.println("case 6");
            }

            for (int x = x0 + 1; x < x1; x++)
            {
                final int y = y0 + (x - x0);
                final ChessPosition position = environment.getPositionFor(x, y, z0);
                final ChessToken token = (ChessToken)environment.getTokenAt(position);

                if (token != null)
                {
                    answer = false;
                    break;
                }
            }
        }
        else
        {
            if (IS_VERBOSE)
            {
                System.out.println("case 7");
            }

            for (int x = x0 + 1; x < x1; x++)
            {
                final int y = y0 + (x - x0);
                final int z = z0 + (x - x0);
                if (IS_VERBOSE)
                {
                    System.out.println("x, y, z = " + x + ", " + y + ", " + z);
                }
                final ChessPosition position = environment.getPositionFor(x, y, z);
                final ChessToken token = (ChessToken)environment.getTokenAt(position);
                if (IS_VERBOSE)
                {
                    System.out.println("token = " + token);
                }

                if (token != null)
                {
                    answer = false;
                    break;
                }
            }
        }

        return answer;
    }

    @Override
    public boolean isGameOver(final Environment environment)
    {
        // FIXME
        return delegate.isGameOver(environment);
    }

    /**
     * @param fromPosition From position.
     * @param toPosition To position.
     * 
     * @return true if the given action is legal.
     */
    private boolean isBishopActionLegalFor(final ChessPosition fromPosition, final ChessPosition toPosition)
    {
        final int dx = Math.abs(toPosition.getX() - fromPosition.getX());
        final int dy = Math.abs(toPosition.getY() - fromPosition.getY());
        final int dz = Math.abs(toPosition.getZ() - fromPosition.getZ());

        if (IS_VERBOSE)
        {
            System.out.println("dx, dy, dz = " + dx + ", " + dy + ", " + dz);
        }

        return ((dx > 0) && (dx == dy) && (dz == 0)) || ((dx > 0) && (dx == dz) && (dy == 0))
                || ((dy > 0) && (dy == dz) && (dx == 0));
    }

    /**
     * @param fromPosition From position.
     * @param toPosition To position.
     * 
     * @return true if the given action is legal.
     */
    private boolean isRookActionLegalFor(final ChessPosition fromPosition, final ChessPosition toPosition)
    {
        final int dx = Math.abs(toPosition.getX() - fromPosition.getX());
        final int dy = Math.abs(toPosition.getY() - fromPosition.getY());
        final int dz = Math.abs(toPosition.getZ() - fromPosition.getZ());

        if (IS_VERBOSE)
        {
            System.out.println("dx, dy, dz = " + dx + ", " + dy + ", " + dz);
        }

        return ((dx > 0) && (dy == 0) && (dz == 0)) || ((dx == 0) && (dy > 0) && (dz == 0))
                || ((dx == 0) && (dy == 0) && (dz > 0));
    }
}

package org.vizzini.chess;

import java.util.Iterator;

import org.vizzini.core.game.Agent;

/**
 * Provides a default implementation of a chess action generator.
 */
public final class DefaultChessActionGenerator implements ChessActionGenerator
{
    /**
     * @param board Board.
     */
    public void cleanUpValidMoves(final ChessEnvironment board)
    {
        final ChessTeam whoseMove = board.getWhoseMove();

        final int cellCount = board.getDimensions().getCellCount();

        for (int fromIndex = 0; fromIndex < cellCount; fromIndex++)
        {
            final ChessToken fromToken = board.getTokenAt(fromIndex);

            if (fromToken != null)
            {
                if (fromToken.getTeam() != whoseMove)
                {
                    // Remove opponent moves.
                    fromToken.clearValidMoves();
                }
                else
                {
                    // Perform an in check test.
                    final Iterator<Integer> iter = fromToken.getValidMoves().iterator();

                    while (iter.hasNext())
                    {
                        final int toIndex = iter.next();

                        if (isInCheckAfterMove(board, fromIndex, toIndex))
                        {
                            iter.remove();
                        }
                    }
                }
            }
        }
    }

    @Override
    public void generateMoves(final ChessEnvironment board)
    {
        if (board == null)
        {
            throw new IllegalArgumentException("board is null");
        }

        board.clear();

        final int cellCount = board.getDimensions().getCellCount();

        for (int fromIndex = 0; fromIndex < cellCount; fromIndex++)
        {
            final ChessToken fromToken = board.getTokenAt(fromIndex);

            if (fromToken != null)
            {
                if (fromToken.getType() != TokenType.KING)
                {
                    generateMoves(board, fromIndex);
                }
            }
        }

        // Scan for attack and defense moves.
        analyzeAttackAndDefense(board);

        // Now that all the pieces were examined we know if the king is in check
        generateMoves(board, board.getWhiteKingPosition().getIndex());
        generateMoves(board, board.getBlackKingPosition().getIndex());
    }

    @Override
    public void generateMoves(final ChessEnvironment board, final int fromIndex)
    {
        if (board == null)
        {
            throw new IllegalArgumentException("board is null");
        }

        final ChessToken token = board.getTokenAt(fromIndex);

        if (token != null)
        {
            switch (token.getType())
            {
            case BISHOP:
                generateBishopMoves(board, fromIndex);
                break;
            case KING:
                generateKingMoves(board, fromIndex);
                break;
            case KNIGHT:
                generateKnightMoves(board, fromIndex);
                break;
            case PAWN:
                if (token.getTeam() == ChessTeam.WHITE)
                {
                    generateWhitePawnMoves(board, fromIndex);
                }
                else
                {
                    generateBlackPawnMoves(board, fromIndex);
                }
                break;
            case QUEEN:
                generateQueenMoves(board, fromIndex);
                break;
            case ROOK:
                generateRookMoves(board, fromIndex);
                break;
            case UNICORN:
                generateUnicornMoves(board, fromIndex);
                break;
            default:
                throw new RuntimeException("Unknown token type: " + token.getType());
            }
        }
    }

    @Override
    public void generateValidMoves(final ChessEnvironment board)
    {
        if (board == null)
        {
            throw new IllegalArgumentException("board is null");
        }

        // Generate all moves, and analyze attack and defense.
        generateMoves(board);

        // Remove opponent moves, and moves which leave the team in check.
        // TODO may impact performance
        cleanUpValidMoves(board);
    }

    /**
     * @param board Board.
     */
    private void analyzeAttackAndDefense(final ChessEnvironment board)
    {
        final int cellCount = board.getDimensions().getCellCount();

        for (int fromIndex = 0; fromIndex < cellCount; fromIndex++)
        {
            final ChessToken fromToken = board.getTokenAt(fromIndex);

            if (fromToken != null)
            {
                for (final int toIndex : fromToken.getValidMoves())
                {
                    if (fromToken.getType() == TokenType.PAWN)
                    {
                        if (board.getDimensions().isBiaxialMove(fromIndex, toIndex))
                        {
                            // Pawn attack move.
                            assignAttackAndDefense(board, fromToken, toIndex);
                        }
                    }
                    else
                    {
                        // If I am not a pawn everywhere I move I can attack.
                        assignAttackAndDefense(board, fromToken, toIndex);
                    }
                }
            }
        }
    }

    /**
     * @param board Chess board.
     * @param fromToken From token.
     * @param toIndex To index.
     */
    private void assignAttackAndDefense(final ChessEnvironment board, final ChessToken fromToken, final int toIndex)
    {
        if (fromToken.getTeam() == ChessTeam.WHITE)
        {
            board.getWhiteAttackBoard().set(toIndex);
        }
        else
        {
            board.getBlackAttackBoard().set(toIndex);
        }

        final ChessToken toToken = board.getTokenAt(toIndex);

        if (toToken != null)
        {
            if (toToken.getTeam() != fromToken.getTeam())
            {
                // Opposite team: I am attacking.
                toToken.addAttackedValue(fromToken.getActionValue());

                if (toToken.getType() == TokenType.KING)
                {
                    board.setInCheck((ChessTeam)toToken.getTeam(), true);
                }
            }
            else
            {
                // Same team: I am defending.
                toToken.addDefendedValue(fromToken.getActionValue());
            }
        }
    }

    /**
     * @param board Board.
     * @param fromIndex From index.
     */
    private void generateBishopMoves(final ChessEnvironment board, final int fromIndex)
    {
        final DirectionType[] directions = DirectionType.getBiaxialDirections();

        generateSliderMoves(board, fromIndex, directions);
    }

    /**
     * @param board Board.
     * @param fromIndex From index.
     */
    private void generateBlackPawnMoves(final ChessEnvironment board, final int fromIndex)
    {
        final Dimensions dimensions = board.getDimensions();
        final int file = dimensions.indexToFile(fromIndex);
        final int rank = dimensions.indexToRank(fromIndex);
        final int level = dimensions.indexToLevel(fromIndex);
        final ChessToken fromToken = board.getTokenAt(fromIndex);

        // Forward.
        int toIndex = dimensions.coordsToIndex(file, rank - 1, level);

        if (dimensions.contains(toIndex) && (board.getTokenAt(toIndex) == null))
        {
            fromToken.addValidMove(toIndex);
        }

        // Down.
        toIndex = dimensions.coordsToIndex(file, rank, level - 1);

        if (dimensions.contains(toIndex) && (board.getTokenAt(toIndex) == null))
        {
            fromToken.addValidMove(toIndex);
        }

        // Capture moves.
        toIndex = dimensions.coordsToIndex(file - 1, rank - 1, level);
        maybeAddPawnCaptureMove(board, fromToken, toIndex);

        toIndex = dimensions.coordsToIndex(file + 1, rank - 1, level);
        maybeAddPawnCaptureMove(board, fromToken, toIndex);

        toIndex = dimensions.coordsToIndex(file - 1, rank, level - 1);
        maybeAddPawnCaptureMove(board, fromToken, toIndex);

        toIndex = dimensions.coordsToIndex(file, rank - 1, level - 1);
        maybeAddPawnCaptureMove(board, fromToken, toIndex);

        toIndex = dimensions.coordsToIndex(file + 1, rank, level - 1);
        maybeAddPawnCaptureMove(board, fromToken, toIndex);
    }

    /**
     * @param board Board.
     * @param fromIndex From index.
     */
    private void generateKingMoves(final ChessEnvironment board, final int fromIndex)
    {
        final DirectionType[] directions = DirectionType.values();

        final ChessToken fromToken = board.getTokenAt(fromIndex);
        final Dimensions dimensions = board.getDimensions();
        final int file = dimensions.indexToFile(fromIndex);
        final int rank = dimensions.indexToRank(fromIndex);
        final int level = dimensions.indexToLevel(fromIndex);

        for (final DirectionType d : directions)
        {
            final int index = dimensions.coordsToIndex(file + d.getDx(), rank + d.getDy(), level + d.getDz());
            maybeAddKingMove(board, fromToken, index);
        }
    }

    /**
     * @param board Board.
     * @param fromIndex From index.
     */
    private void generateKnightMoves(final ChessEnvironment board, final int fromIndex)
    {
        final ChessToken fromToken = board.getTokenAt(fromIndex);
        final Dimensions dimensions = board.getDimensions();
        final int file = dimensions.indexToFile(fromIndex);
        final int rank = dimensions.indexToRank(fromIndex);
        final int level = dimensions.indexToLevel(fromIndex);

        // 2D moves.
        maybeAddMove(board, fromToken, dimensions.coordsToIndex(file + 1, rank + 2, level));
        maybeAddMove(board, fromToken, dimensions.coordsToIndex(file + 1, rank - 2, level));
        maybeAddMove(board, fromToken, dimensions.coordsToIndex(file - 1, rank - 2, level));
        maybeAddMove(board, fromToken, dimensions.coordsToIndex(file - 1, rank + 2, level));
        maybeAddMove(board, fromToken, dimensions.coordsToIndex(file + 2, rank + 1, level));
        maybeAddMove(board, fromToken, dimensions.coordsToIndex(file + 2, rank - 1, level));
        maybeAddMove(board, fromToken, dimensions.coordsToIndex(file - 2, rank - 1, level));
        maybeAddMove(board, fromToken, dimensions.coordsToIndex(file - 2, rank + 1, level));

        // One level moves.
        maybeAddMove(board, fromToken, dimensions.coordsToIndex(file, rank + 2, level + 1));
        maybeAddMove(board, fromToken, dimensions.coordsToIndex(file + 2, rank, level + 1));
        maybeAddMove(board, fromToken, dimensions.coordsToIndex(file - 2, rank, level + 1));
        maybeAddMove(board, fromToken, dimensions.coordsToIndex(file, rank - 2, level + 1));
        maybeAddMove(board, fromToken, dimensions.coordsToIndex(file, rank + 2, level - 1));
        maybeAddMove(board, fromToken, dimensions.coordsToIndex(file + 2, rank, level - 1));
        maybeAddMove(board, fromToken, dimensions.coordsToIndex(file - 2, rank, level - 1));
        maybeAddMove(board, fromToken, dimensions.coordsToIndex(file, rank - 2, level - 1));

        // Two level moves.
        maybeAddMove(board, fromToken, dimensions.coordsToIndex(file, rank + 1, level + 2));
        maybeAddMove(board, fromToken, dimensions.coordsToIndex(file + 1, rank, level + 2));
        maybeAddMove(board, fromToken, dimensions.coordsToIndex(file - 1, rank, level + 2));
        maybeAddMove(board, fromToken, dimensions.coordsToIndex(file, rank - 1, level + 2));
        maybeAddMove(board, fromToken, dimensions.coordsToIndex(file, rank + 1, level - 2));
        maybeAddMove(board, fromToken, dimensions.coordsToIndex(file + 1, rank, level - 2));
        maybeAddMove(board, fromToken, dimensions.coordsToIndex(file - 1, rank, level - 2));
        maybeAddMove(board, fromToken, dimensions.coordsToIndex(file, rank - 1, level - 2));
    }

    /**
     * @param board Board.
     * @param fromIndex From index.
     */
    private void generateQueenMoves(final ChessEnvironment board, final int fromIndex)
    {
        final DirectionType[] directions = DirectionType.values();

        generateSliderMoves(board, fromIndex, directions);
    }

    /**
     * @param board Board.
     * @param fromIndex From index.
     */
    private void generateRookMoves(final ChessEnvironment board, final int fromIndex)
    {
        final DirectionType[] directions = DirectionType.getUniaxialDirections();

        generateSliderMoves(board, fromIndex, directions);
    }

    /**
     * @param board Board.
     * @param fromIndex From index.
     * @param directions Directions.
     */
    private void generateSliderMoves(final ChessEnvironment board, final int fromIndex, final DirectionType[] directions)
    {
        final ChessToken fromToken = board.getTokenAt(fromIndex);
        final Dimensions dimensions = board.getDimensions();
        final int max = dimensions.getMaxDimension();
        final int file = dimensions.indexToFile(fromIndex);
        final int rank = dimensions.indexToRank(fromIndex);
        final int level = dimensions.indexToLevel(fromIndex);

        for (final DirectionType d : directions)
        {
            boolean keepGoing = true;

            for (int i = 1; keepGoing && (i < max); i++)
            {
                final int index = dimensions.coordsToIndex(file + (i * d.getDx()), rank + (i * d.getDy()), level
                        + (i * d.getDz()));
                keepGoing = maybeAddMove(board, fromToken, index);
            }
        }
    }

    /**
     * @param board Board.
     * @param fromIndex From index.
     */
    private void generateUnicornMoves(final ChessEnvironment board, final int fromIndex)
    {
        final DirectionType[] directions = DirectionType.getTriaxialDirections();

        generateSliderMoves(board, fromIndex, directions);
    }

    /**
     * @param board Board.
     * @param fromIndex From index.
     */
    private void generateWhitePawnMoves(final ChessEnvironment board, final int fromIndex)
    {
        final ChessToken fromToken = board.getTokenAt(fromIndex);
        final Dimensions dimensions = board.getDimensions();
        final int file = dimensions.indexToFile(fromIndex);
        final int rank = dimensions.indexToRank(fromIndex);
        final int level = dimensions.indexToLevel(fromIndex);

        // Forward.
        int toIndex = dimensions.coordsToIndex(file, rank + 1, level);

        if (dimensions.contains(toIndex) && (board.getTokenAt(toIndex) == null))
        {
            final ChessPosition toPosition = board.getPositionFor(toIndex);

            if ((toPosition != null) && board.isUsable(toPosition))
            {
                fromToken.addValidMove(toIndex);
            }
        }

        // Up.
        toIndex = dimensions.coordsToIndex(file, rank, level + 1);

        if (dimensions.contains(toIndex) && (board.getTokenAt(toIndex) == null))
        {
            final ChessPosition toPosition = board.getPositionFor(toIndex);

            if ((toPosition != null) && board.isUsable(toPosition))
            {
                fromToken.addValidMove(toIndex);
            }
        }

        // Capture moves.
        toIndex = dimensions.coordsToIndex(file - 1, rank + 1, level);
        maybeAddPawnCaptureMove(board, fromToken, toIndex);

        toIndex = dimensions.coordsToIndex(file + 1, rank + 1, level);
        maybeAddPawnCaptureMove(board, fromToken, toIndex);

        toIndex = dimensions.coordsToIndex(file - 1, rank, level + 1);
        maybeAddPawnCaptureMove(board, fromToken, toIndex);

        toIndex = dimensions.coordsToIndex(file, rank + 1, level + 1);
        maybeAddPawnCaptureMove(board, fromToken, toIndex);

        toIndex = dimensions.coordsToIndex(file + 1, rank, level + 1);
        maybeAddPawnCaptureMove(board, fromToken, toIndex);
    }

    /**
     * @param board Board.
     * @param fromIndex From index.
     * @param toIndex To index.
     * 
     * @return true if this chess board is in check after making the proposed move.
     */
    private boolean isInCheckAfterMove(final ChessEnvironment board, final int fromIndex, final int toIndex)
    {
        boolean answer = false;

        final ChessTeam whoseMove = board.getWhoseMove();
        final ChessEnvironment nextBoard = (ChessEnvironment)board.copy();

        final ChessPosition fromPosition = board.getPositionFor(fromIndex);
        final ChessPosition toPosition = board.getPositionFor(toIndex);
        final ChessToken fromToken = (ChessToken)board.getTokenAt(fromPosition);
        final Agent agent = fromToken.getAgent();

        final ChessAction move = new DefaultChessAction(nextBoard, agent, fromPosition, toPosition);
        move.doIt();
        generateMoves(nextBoard);

        if (nextBoard.isInCheck(whoseMove))
        {
            answer = true;
        }

        return answer;
    }

    /**
     * @param board Board.
     * @param fromToken From token.
     * @param toIndex To index.
     * 
     * @return true if this move was added.
     */
    private boolean maybeAddKingMove(final ChessEnvironment board, final ChessToken fromToken, final int toIndex)
    {
        boolean answer = false;

        if (board.getDimensions().contains(toIndex))
        {
            final ChessPosition toPosition = board.getPositionFor(toIndex);

            if ((toPosition != null) && board.isUsable(toPosition))
            {
                final ChessToken toToken = board.getTokenAt(toIndex);

                // Cannot move into check.
                if (((fromToken.getTeam() == ChessTeam.WHITE) && !board.getBlackAttackBoard().get(toIndex))
                        || ((fromToken.getTeam() == ChessTeam.BLACK) && !board.getWhiteAttackBoard().get(toIndex)))
                {
                    if ((toToken == null) || (toToken.getTeam() != fromToken.getTeam()))
                    {
                        answer = true;
                        fromToken.addValidMove(toIndex);
                    }
                }
            }
            else
            {
                answer = true;
            }
        }

        return answer;
    }

    /**
     * @param board Board.
     * @param fromToken From token.
     * @param toIndex To index.
     * 
     * @return true if a slider should continue.
     */
    private boolean maybeAddMove(final ChessEnvironment board, final ChessToken fromToken, final int toIndex)
    {
        boolean answer = false;

        if (board.getDimensions().contains(toIndex))
        {
            final ChessPosition toPosition = board.getPositionFor(toIndex);

            if ((toPosition != null) && board.isUsable(toPosition))
            {
                final ChessToken toToken = board.getTokenAt(toIndex);

                if (toToken == null)
                {
                    answer = true;
                    fromToken.addValidMove(toIndex);
                }
                else if (toToken.getTeam() != fromToken.getTeam())
                {
                    answer = false;
                    fromToken.addValidMove(toIndex);
                }
            }
            else
            {
                answer = true;
            }
        }

        return answer;
    }

    /**
     * @param board Board.
     * @param fromToken From token.
     * @param toIndex To index.
     * 
     * @return true if this move was added.
     */
    private boolean maybeAddPawnCaptureMove(final ChessEnvironment board, final ChessToken fromToken, final int toIndex)
    {
        boolean answer = false;

        if (board.getDimensions().contains(toIndex))
        {
            final ChessPosition toPosition = board.getPositionFor(toIndex);

            if ((toPosition != null) && board.isUsable(toPosition))
            {
                final ChessToken toToken = board.getTokenAt(toIndex);

                if ((toToken != null) && (toToken.getTeam() != fromToken.getTeam()))
                {
                    answer = true;
                    fromToken.addValidMove(toIndex);
                }
            }
            else
            {
                answer = true;
            }
        }

        return answer;
    }
}

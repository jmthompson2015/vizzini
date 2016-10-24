package org.vizzini.chess.standard;

import org.vizzini.chess.ChessActionGenerator;
import org.vizzini.chess.ChessEnvironment;
import org.vizzini.chess.ChessTeam;
import org.vizzini.chess.ChessToken;
import org.vizzini.chess.DefaultChessActionGenerator;
import org.vizzini.chess.Dimensions;
import org.vizzini.chess.DirectionType;

/**
 * Provides a standard chess action generator.
 */
public final class StandardActionGenerator implements ChessActionGenerator
{
    /** Move generator delegate. */
    private final ChessActionGenerator delegate;

    /**
     * Construct this object.
     */
    public StandardActionGenerator()
    {
        this(new DefaultChessActionGenerator());
    }

    /**
     * Construct this object.
     * 
     * @param delegate Move generator delegate.
     */
    @SuppressWarnings("hiding")
    public StandardActionGenerator(final ChessActionGenerator delegate)
    {
        this.delegate = delegate;
    }

    @Override
    public void generateMoves(final ChessEnvironment board)
    {
        final ChessTeam whoseMove = board.getWhoseMove();

        final int cellCount = board.getDimensions().getCellCount();

        for (int i = 0; i < cellCount; i++)
        {
            final ChessToken token = board.getTokenAt(i);

            if (token != null)
            {
                token.clearValidMoves();

                if (token.getTeam() == whoseMove)
                {
                    generateMoves(board, i);
                }
            }
        }
    }

    @Override
    public void generateMoves(final ChessEnvironment board, final int fromIndex)
    {
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
            default:
                throw new RuntimeException("Unknown token type: " + token.getType());
            }
        }
    }

    @Override
    public void generateValidMoves(final ChessEnvironment board)
    {
        delegate.generateValidMoves(board);
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

        int to = dimensions.coordsToIndex(file, rank - 1, level);
        if (dimensions.contains(to))
        {
            final ChessToken toToken = board.getTokenAt(to);
            if (toToken == null)
            {
                fromToken.addValidMove(to);
            }
        }

        to = dimensions.coordsToIndex(file, rank - 2, level);
        if (dimensions.contains(to))
        {
            final ChessToken toToken = board.getTokenAt(to);
            if (toToken == null)
            {
                fromToken.addValidMove(to);
            }
        }
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
            maybeAddMove(board, fromToken,
                    dimensions.coordsToIndex(file + d.getDx(), rank + d.getDy(), level + d.getDz()));
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
                keepGoing = maybeAddMove(
                        // answer,
                        board,
                        fromToken,
                        dimensions.coordsToIndex(file + (i * d.getDx()), rank + (i * d.getDy()), level
                                + (i * d.getDz())));
            }
        }
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

        int to = dimensions.coordsToIndex(file, rank + 1, level);
        if (dimensions.contains(to))
        {
            final ChessToken toToken = board.getTokenAt(to);
            if (toToken == null)
            {
                fromToken.addValidMove(to);
            }
        }

        to = dimensions.coordsToIndex(file, rank + 2, level);
        if (dimensions.contains(to))
        {
            final ChessToken toToken = board.getTokenAt(to);
            if (toToken == null)
            {
                fromToken.addValidMove(to);
            }
        }

        to = dimensions.coordsToIndex(file, rank, level + 1);
        if (dimensions.contains(to))
        {
            final ChessToken toToken = board.getTokenAt(to);
            if (toToken == null)
            {
                fromToken.addValidMove(to);
            }
        }

        to = dimensions.coordsToIndex(file, rank, level + 2);
        if (dimensions.contains(to))
        {
            final ChessToken toToken = board.getTokenAt(to);
            if (toToken == null)
            {
                fromToken.addValidMove(to);
            }
        }
    }

    /**
     * @param board Board.
     * @param fromToken From token.
     * @param toIndex To index.
     * 
     * @return true if this move was added.
     */
    private boolean maybeAddMove(final ChessEnvironment board, final ChessToken fromToken, final int toIndex)
    {
        boolean answer = false;

        if (board.getDimensions().contains(toIndex))
        {
            final ChessToken toToken = board.getTokenAt(toIndex);

            if ((toToken == null) || (toToken.getTeam() != fromToken.getTeam()))
            {
                answer = true;
                fromToken.addValidMove(toIndex);
            }
        }

        return answer;
    }
}

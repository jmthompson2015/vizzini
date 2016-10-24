package org.vizzini.chess;

/**
 * Provides an enumeration of chess game types.
 * <ol>
 * <li><a href="http://vizzini.sourceforge.net/chess3d/artemischess.html">Artemis</a></li>
 * <li><a href="http://www.chessvariants.org/3d.dir/3d5.html">Raumschach</a></li>
 * <li><a href="http://en.wikipedia.org/wiki/Chess">Standard Chess</a></li>
 * <li><a href="http://www.chessvariants.org/3d.dir/startrek.html">Tridimensional</a></li>
 * </ol>
 */
public enum GameType
{
    /** Artemis chess. 4x4x4, no pawn initial two-step advance, no en passant, no castling */
    ARTEMIS(4, 4, 4, false, false, false, "rqkr/pppp/4/4|nbbn/pppp/4/4|4/4/PPPP/NBBN|4/4/PPPP/RQKR w 0 1"),

    /** Raumschach chess. 5x5x5, no pawn initial two-step advance, no en passant, no castling */
    RAUMSCHACH(5, 5, 5, false, false, false,
            "rnknr/ppppp/5/5/5|buqbu/ppppp/5/5/5|5/5/5/5/5|5/5/5/PPPPP/BUQBU|5/5/5/PPPPP/RNKNR w 0 1"),

    /** Standard chess. 8x8x1, pawn initial two-step advance, en passant, castling */
    STANDARD(8, 8, 1, true, true, true, "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"),

    /** Tridimensional (Star Trek) chess. 6x6x7, no pawn initial two-step advance, no en passant, no castling */
    TRIDIMENSIONAL(
            6,
            6,
            7,
            false,
            false,
            false,
            "rn2nr/pp2pp/6/6/6/6|6/1bqkb1/1pppp1/6/6/6|6/6/6/6/6/6|6/6/6/6/6/6|6/6/6/6/6/6|6/6/6/1PPPP1/1BQKB1/6|6/6/6/6/PP2PP/RN2NR w 0 1");

    /** Dimensions. */
    private final Dimensions dimensions;

    /** Flag indicating if castling is allowed. */
    private final boolean isCastlingAllowed;

    /** Flag indicating if en passant is allowed. */
    private final boolean isEnPassantAllowed;

    /** Flag indicating if a pawn has a double first move. */
    private final boolean isPawnDoubleFirstMove;

    /** Start position in FEN notation. */
    private final String startPosition;

    /**
     * @param fileCount File count.
     * @param rankCount Rank count.
     * @param levelCount Level count.
     * @param isPawnDoubleFirstMove Flag indicating if a pawn has a double first move.
     * @param isCastlingAllowed Flag indicating if castling is allowed.
     * @param isEnPassantAllowed Flag indicating if en passant is allowed.
     * @param startPosition Start position in FEN notation.
     */
    @SuppressWarnings("hiding")
    private GameType(final int fileCount, final int rankCount, final int levelCount,
            final boolean isPawnDoubleFirstMove, final boolean isCastlingAllowed, final boolean isEnPassantAllowed,
            final String startPosition)
    {
        this.dimensions = new DefaultDimensions(fileCount, rankCount, levelCount);
        this.isPawnDoubleFirstMove = isPawnDoubleFirstMove;
        this.isCastlingAllowed = isCastlingAllowed;
        this.isEnPassantAllowed = isEnPassantAllowed;
        this.startPosition = startPosition;
    }

    /**
     * @return the dimensions
     */
    public Dimensions getDimensions()
    {
        return dimensions;
    }

    /**
     * @return the startPosition
     */
    public String getStartPosition()
    {
        return startPosition;
    }

    /**
     * @return the isCastlingAllowed
     */
    public boolean isCastlingAllowed()
    {
        return isCastlingAllowed;
    }

    /**
     * @return the isEnPassantAllowed
     */
    public boolean isEnPassantAllowed()
    {
        return isEnPassantAllowed;
    }

    /**
     * @return the isPawnDoubleFirstMove
     */
    public boolean isPawnDoubleFirstMove()
    {
        return isPawnDoubleFirstMove;
    }
}

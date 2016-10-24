package org.vizzini.chess;

/**
 * Defines methods required by a chess action generator.
 */
public interface ChessActionGenerator
{
    /**
     * @param board Board.
     */
    void generateMoves(ChessEnvironment board);

    /**
     * @param board Board.
     * @param fromIndex From token index.
     */
    void generateMoves(ChessEnvironment board, int fromIndex);

    /**
     * @param board Board.
     */
    void generateValidMoves(ChessEnvironment board);
}

package org.vizzini.chess.service;

import java.util.List;

import org.vizzini.chess.ChessAction;

/**
 * Defines methods required by a chess service.
 */
public interface ChessService
{
    /**
     * @param boardString String representation of a board.
     * 
     * @return a list of valid moves for the given board.
     * 
     * @throws UnparseableBoardException if the board string cannot be parsed.
     * @throws NoValidMoveException if there is no valid move.
     */
    List<ChessAction> getMoves(final String boardString) throws UnparseableBoardException, NoValidMoveException;

    /**
     * @param boardString String representation of a board.
     * 
     * @return the given board after my agent makes a move.
     * 
     * @throws UnparseableBoardException if the board string cannot be parsed.
     * @throws NoValidMoveException if there is no valid move.
     */
    String makeMove(final String boardString) throws UnparseableBoardException, NoValidMoveException;
}

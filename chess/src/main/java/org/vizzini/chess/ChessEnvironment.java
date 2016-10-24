package org.vizzini.chess;

import java.util.BitSet;

import org.vizzini.core.game.boardgame.BoardGameEnvironment;

/**
 * Defines methods required by a chess environment.
 */
public interface ChessEnvironment extends BoardGameEnvironment
{
    /**
     * @return the blackAttackBoard
     */
    BitSet getBlackAttackBoard();

    /**
     * @return the blackKingPosition
     */
    ChessPosition getBlackKingPosition();

    /**
     * @return the dimensions
     */
    Dimensions getDimensions();

    /**
     * @return the number of halfmoves since the last pawn advance or capture.
     */
    int getFiftyMoveCount();

    /**
     * @return the game type.
     */
    GameType getGameType();

    /**
     * @return the number of the full move.
     */
    int getMoveCount();

    /**
     * @param index Index.
     * 
     * @return the position.
     */
    ChessPosition getPositionFor(int index);

    /**
     * @param file File.
     * @param rank Rank.
     * @param level Level.
     * 
     * @return the position.
     */
    ChessPosition getPositionFor(int file, int rank, int level);

    /**
     * @return the position values.
     */
    ChessPosition[] getPositionValues();

    /**
     * @return the repeatedMoveCount
     */
    int getRepeatedMoveCount();

    /**
     * @param index Index.
     * 
     * @return the token.
     */
    ChessToken getTokenAt(Integer index);

    /**
     * @return the whiteAttackBoard
     */
    BitSet getWhiteAttackBoard();

    /**
     * @return the whiteKingPosition
     */
    ChessPosition getWhiteKingPosition();

    /**
     * @return the whoseMove
     */
    ChessTeam getWhoseMove();

    /**
     * Increment fifty move count.
     */
    void incrementFiftyMoveCount();

    /**
     * Increment move count.
     */
    void incrementMoveCount();

    /**
     * @param team Team.
     * 
     * @return true if the given team is in check.
     */
    boolean isInCheck(ChessTeam team);

    /**
     * @return the isStaleMate
     */
    boolean isStaleMate();

    /**
     * @param position Position.
     * 
     * @return true if the given position is usable.
     */
    boolean isUsable(final ChessPosition position);

    /**
     * @param index Index.
     * @param token Token.
     */
    void placeToken(Integer index, ChessToken token);

    /**
     * @param index Index.
     */
    void removeToken(Integer index);

    /**
     * @param team Team.
     * @param isInCheck the isInCheck to set
     */
    void setInCheck(ChessTeam team, boolean isInCheck);

    /**
     * @param isStaleMate the isStaleMate to set
     */
    void setStaleMate(final boolean isStaleMate);

    /**
     * @param whoseMove the whoseMove to set
     */
    void setWhoseMove(final ChessTeam whoseMove);

    /**
     * Set fifty move count to zero.
     */
    void zeroFiftyMoveCount();
}

package org.vizzini.chess;

import java.util.List;

import org.vizzini.core.Copyable;
import org.vizzini.core.game.Token;

/**
 * Defines methods required by a chess token.
 */
public interface ChessToken extends Copyable<ChessToken>, Token
{
    /**
     * @param attackedValue Attacked value.
     */
    void addAttackedValue(final int attackedValue);

    /**
     * @param defendedValue Defended value.
     */
    void addDefendedValue(final int defendedValue);

    /**
     * @param index Index.
     */
    void addValidMove(final int index);

    /**
     * Clear valid moves.
     */
    void clearValidMoves();

    /**
     * @return the actionValue
     */
    int getActionValue();

    /**
     * @return the attackedValue
     */
    int getAttackedValue();

    /**
     * @return the defendedValue
     */
    int getDefendedValue();

    /**
     * @return the type
     */
    TokenType getType();

    /**
     * @return the validMoves
     */
    List<Integer> getValidMoves();

    /**
     * @return the value
     */
    int getValue();

    /**
     * @return the moved
     */
    boolean isMoved();

    /**
     * @return the selected
     */
    boolean isSelected();

    /**
     * @param moved the moved to set
     */
    void setMoved(final boolean moved);

    /**
     * @param selected the selected to set
     */
    void setSelected(final boolean selected);
}

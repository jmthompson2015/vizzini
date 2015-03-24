package org.vizzini.swingui.game.boardgame.chess;

import org.vizzini.chess.ChessPosition;
import org.vizzini.chess.ChessTeam;
import org.vizzini.swingui.game.boardgame.SpatialFactory;

import com.jme3.scene.Spatial;

/**
 * Defines methods required by a spatial factory for chess.
 */
public interface ChessSpatialFactory extends SpatialFactory
{
    /**
     * @param team Team.
     * @param position Position.
     * 
     * @return a new bishop.
     */
    Spatial createBishop(final ChessTeam team, ChessPosition position);

    /**
     * @param team Team.
     * @param position Position.
     * 
     * @return a new king.
     */
    Spatial createKing(final ChessTeam team, ChessPosition position);

    /**
     * @param team Team.
     * @param position Position.
     * 
     * @return a new knight.
     */
    Spatial createKnight(final ChessTeam team, ChessPosition position);

    /**
     * @param team Team.
     * @param position Position.
     * 
     * @return a new pawn.
     */
    Spatial createPawn(final ChessTeam team, ChessPosition position);

    /**
     * @param team Team.
     * @param position Position.
     * 
     * @return a new queen.
     */
    Spatial createQueen(final ChessTeam team, ChessPosition position);

    /**
     * @param team Team.
     * @param position Position.
     * 
     * @return a new rook.
     */
    Spatial createRook(final ChessTeam team, ChessPosition position);

    /**
     * @param team Team.
     * @param position Position.
     * 
     * @return a new unicorn.
     */
    Spatial createUnicorn(final ChessTeam team, ChessPosition position);

    /**
     * @return the pawnSize
     */
    float getPawnSize();
}

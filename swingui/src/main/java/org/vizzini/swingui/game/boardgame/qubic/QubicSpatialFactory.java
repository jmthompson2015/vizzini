package org.vizzini.swingui.game.boardgame.qubic;

import org.vizzini.example.boardgame.qubic.QubicPosition;
import org.vizzini.example.boardgame.qubic.QubicTeam;
import org.vizzini.swingui.game.boardgame.SpatialFactory;

import com.jme3.scene.Spatial;

/**
 * Defines methods required by a spatial factory for qubic.
 */
public interface QubicSpatialFactory extends SpatialFactory
{
    /**
     * @param team Team.
     * @param position Position.
     * 
     * @return a new O.
     */
    Spatial createO(final QubicTeam team, QubicPosition position);

    /**
     * @param team Team.
     * @param position Position.
     * 
     * @return a new X.
     */
    Spatial createX(final QubicTeam team, QubicPosition position);
}

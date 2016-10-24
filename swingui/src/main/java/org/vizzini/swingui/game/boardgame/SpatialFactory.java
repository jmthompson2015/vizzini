package org.vizzini.swingui.game.boardgame;

import org.vizzini.core.game.Position;
import org.vizzini.core.game.Team;
import org.vizzini.core.game.Token;

import com.jme3.asset.AssetManager;
import com.jme3.material.Material;
import com.jme3.scene.Spatial;

/**
 * Defines methods required by a spatial factory.
 */
public interface SpatialFactory
{
    /**
     * @param assetManager Asset manager.
     * 
     * @return a new board.
     */
    Spatial createBoard(final AssetManager assetManager);

    /**
     * @param position Position.
     * @param token Token.
     * 
     * @return a new spatial.
     */
    Spatial createSpatial(Position<?> position, Token token);

    /**
     * @return the fileCenter
     */
    float getFileCenter();

    /**
     * @return the fileCount
     */
    int getFileCount();

    /**
     * @return the firstSquareMaterial
     */
    Material getFirstSquareMaterial();

    /**
     * @return the firstTokenMaterial
     */
    Material getFirstTokenMaterial();

    /**
     * @return the levelCenter
     */
    float getLevelCenter();

    /**
     * @return the levelCount
     */
    int getLevelCount();

    /**
     * @return the rankCenter
     */
    float getRankCenter();

    /**
     * @return the rankCount
     */
    int getRankCount();

    /**
     * @return the secondSquareMaterial
     */
    Material getSecondSquareMaterial();

    /**
     * @return the secondTokenMaterial
     */
    Material getSecondTokenMaterial();

    /**
     * @return the squareHeight
     */
    float getSquareHeight();

    /**
     * @param file File.
     * @param rank Rank.
     * @param level Level.
     * 
     * @return the square material for the given parameters.
     */
    Material getSquareMaterialFor(int file, int rank, int level);

    /**
     * @return the squareSize
     */
    float getSquareSize();

    /**
     * @param team Team.
     * 
     * @return the token material for the given team.
     */
    Material getTokenMaterialFor(final Team team);

    /**
     * @return the tokenSize
     */
    float getTokenSize();

    /**
     * @param file File.
     * 
     * @return the x coordinate.
     */
    float getX(final int file);

    /**
     * @param rank Rank.
     * 
     * @return the y coordinate.
     */
    float getY(final int rank);

    /**
     * @param level Level.
     * 
     * @return the z coordinate.
     */
    float getZ(final int level);
}

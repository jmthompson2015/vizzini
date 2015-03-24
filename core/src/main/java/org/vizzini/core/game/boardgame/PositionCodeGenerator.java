package org.vizzini.core.game.boardgame;

import java.io.Writer;

/**
 * Defines methods required by a code generator for a position class.
 */
public interface PositionCodeGenerator
{
    /**
     * @param x X coordinate.
     * @param y Y coordinate.
     * @param z Z coordinate.
     * 
     * @return the index.
     */
    Integer computeIndex(final int x, final int y, final int z);

    /**
     * @param x X coordinate.
     * @param y Y coordinate.
     * @param z Z coordinate.
     * 
     * @return a position name.
     */
    String createName(final int x, final int y, final int z);

    /**
     * Generate code.
     * 
     * @param writer Writer.
     */
    void generate(final Writer writer);

    /**
     * Generate a map of index to position.
     * 
     * @param writer Writer.
     */
    void generateMap(final Writer writer);

    /**
     * Generate position constants.
     * 
     * @param writer Writer.
     */
    void generatePositions(final Writer writer);

    /**
     * @return the maxX
     */
    int getMaxX();

    /**
     * @return the maxY
     */
    int getMaxY();

    /**
     * @return the maxZ
     */
    int getMaxZ();

    /**
     * @return the positionClassName
     */
    String getPositionClassName();
}

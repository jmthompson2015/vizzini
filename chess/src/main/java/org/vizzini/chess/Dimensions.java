package org.vizzini.chess;

/**
 * Defines methods required by board dimensions.
 */
public interface Dimensions
{
    /**
     * @param index Index.
     * 
     * @return true if the given position is within the limits of this board.
     */
    boolean contains(final int index);

    /**
     * @param file File.
     * @param rank Rank.
     * @param level Level.
     * 
     * @return true if the given position is within the limits of this board.
     */
    boolean contains(final int file, final int rank, final int level);

    /**
     * @param file File.
     * @param rank Rank.
     * @param level Level.
     * 
     * @return The index, or -1 if the coordinates are out of range.
     */
    int coordsToIndex(final int file, final int rank, final int level);

    /**
     * @return the cellCount
     */
    int getCellCount();

    /**
     * @return the fileCount
     */
    int getFileCount();

    /**
     * @return the levelCount
     */
    int getLevelCount();

    /**
     * @return the maximum dimension.
     */
    int getMaxDimension();

    /**
     * @return the rankCount
     */
    int getRankCount();

    /**
     * @param index Index.
     * 
     * @return the file coordinates computed from the given index.
     */
    int indexToFile(final int index);

    /**
     * @param index Index.
     * 
     * @return the level coordinates computed from the given index.
     */
    int indexToLevel(final int index);

    /**
     * @param index Index.
     * 
     * @return the rank coordinates computed from the given index.
     */
    int indexToRank(final int index);

    /**
     * @return true if this is using 3D coordinates.
     */
    boolean is3D();

    /**
     * @param fromIndex From index.
     * @param toIndex To index.
     * 
     * @return true if this is a biaxial move.
     */
    boolean isBiaxialMove(final int fromIndex, final int toIndex);

    /**
     * @param fromIndex From index.
     * @param toIndex To index.
     * 
     * @return true if this is a triaxial move.
     */
    boolean isTriaxialMove(final int fromIndex, final int toIndex);

    /**
     * @param fromIndex From index.
     * @param toIndex To index.
     * 
     * @return true if this is a uniaxial move.
     */
    boolean isUniaxialMove(final int fromIndex, final int toIndex);
}

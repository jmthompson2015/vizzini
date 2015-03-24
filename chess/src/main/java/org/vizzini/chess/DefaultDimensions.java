package org.vizzini.chess;

/**
 * Provides a default implementation of dimensions.
 */
public final class DefaultDimensions implements Dimensions
{
    /** Constant indicating a coordinate is out of range. */
    public static final int OUT_OF_RANGE = -1;

    /** File count. */
    private final int fileCount;

    /** Rank count. */
    private final int rankCount;

    /** Level count. */
    private final int levelCount;

    /** Cell count. */
    private final int cellCount;

    /**
     * Construct this object.
     * 
     * @param fileCount File count.
     * @param rankCount Rank count.
     * @param levelCount Level count.
     */
    @SuppressWarnings("hiding")
    public DefaultDimensions(final int fileCount, final int rankCount, final int levelCount)
    {
        this.fileCount = fileCount;
        this.rankCount = rankCount;
        this.levelCount = levelCount;
        cellCount = rankCount * fileCount * levelCount;
    }

    @Override
    public boolean contains(final int index)
    {
        return ((0 <= index) && (index < cellCount));
    }

    @Override
    public boolean contains(final int file, final int rank, final int level)
    {
        return ((0 <= file) && (file < fileCount) && (0 <= rank) && (rank < rankCount) && (0 <= level) && (level < levelCount));
    }

    @Override
    public int coordsToIndex(final int file, final int rank, final int level)
    {
        int answer = OUT_OF_RANGE;

        if (contains(file, rank, level))
        {
            answer = (((level * rankCount) + rank) * fileCount) + file;
        }

        return answer;
    }

    @Override
    public boolean equals(final Object object)
    {
        boolean answer = false;

        if (object == this)
        {
            answer = true;
        }
        else if (object == null)
        {
            answer = false;
        }
        else if (getClass() != object.getClass())
        {
            answer = false;
        }
        else
        {
            final DefaultDimensions another = (DefaultDimensions)object;

            answer = (fileCount == another.fileCount) && (rankCount == another.rankCount)
                    && (levelCount == another.levelCount);
        }

        return answer;
    }

    @Override
    public int getCellCount()
    {
        return cellCount;
    }

    @Override
    public int getFileCount()
    {
        return fileCount;
    }

    @Override
    public int getLevelCount()
    {
        return levelCount;
    }

    @Override
    public int getMaxDimension()
    {
        return Math.max(fileCount, Math.max(rankCount, levelCount));
    }

    @Override
    public int getRankCount()
    {
        return rankCount;
    }

    @Override
    public int hashCode()
    {
        int answer = fileCount;

        answer += (31 * rankCount);

        answer += (37 * levelCount);

        return answer;
    }

    @Override
    public int indexToFile(final int index)
    {
        int answer = OUT_OF_RANGE;

        if (contains(index))
        {
            answer = index % fileCount;
        }

        return answer;
    }

    @Override
    public int indexToLevel(final int index)
    {
        int answer = OUT_OF_RANGE;

        if (contains(index))
        {
            answer = index / (fileCount * rankCount);
        }

        return answer;
    }

    @Override
    public int indexToRank(final int index)
    {
        int answer = OUT_OF_RANGE;

        if (contains(index))
        {
            final int mult = fileCount * rankCount;
            final int myIndex = index - ((index / mult) * mult);

            answer = myIndex / fileCount;
        }

        return answer;
    }

    @Override
    public boolean is3D()
    {
        return getLevelCount() > 1;
    }

    @Override
    public boolean isBiaxialMove(final int fromIndex, final int toIndex)
    {
        final int dx = indexToFile(toIndex) - indexToFile(fromIndex);
        final int dy = indexToRank(toIndex) - indexToRank(fromIndex);
        final int dz = indexToLevel(toIndex) - indexToLevel(fromIndex);

        return DirectionType.isBiaxial(dx, dy, dz);
    }

    @Override
    public boolean isTriaxialMove(final int fromIndex, final int toIndex)
    {
        final int dx = indexToFile(toIndex) - indexToFile(fromIndex);
        final int dy = indexToRank(toIndex) - indexToRank(fromIndex);
        final int dz = indexToLevel(toIndex) - indexToLevel(fromIndex);

        return DirectionType.isTriaxial(dx, dy, dz);
    }

    @Override
    public boolean isUniaxialMove(final int fromIndex, final int toIndex)
    {
        final int dx = indexToFile(toIndex) - indexToFile(fromIndex);
        final int dy = indexToRank(toIndex) - indexToRank(fromIndex);
        final int dz = indexToLevel(toIndex) - indexToLevel(fromIndex);

        return DirectionType.isUniaxial(dx, dy, dz);
    }
}

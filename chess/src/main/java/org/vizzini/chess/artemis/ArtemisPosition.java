package org.vizzini.chess.artemis;

import java.util.Map;
import java.util.TreeMap;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import org.vizzini.chess.ChessPosition;

/**
 * Provides a pseudo-enumeration of positions for artemis chess.
 */
public final class ArtemisPosition implements ChessPosition
{
    /** Position. */
    public static final ArtemisPosition a1A = new ArtemisPosition("a1A", 0, 0, 0);

    /** Position. */
    public static final ArtemisPosition b1A = new ArtemisPosition("b1A", 1, 0, 0);

    /** Position. */
    public static final ArtemisPosition c1A = new ArtemisPosition("c1A", 2, 0, 0);

    /** Position. */
    public static final ArtemisPosition d1A = new ArtemisPosition("d1A", 3, 0, 0);

    /** Position. */
    public static final ArtemisPosition a2A = new ArtemisPosition("a2A", 0, 1, 0);

    /** Position. */
    public static final ArtemisPosition b2A = new ArtemisPosition("b2A", 1, 1, 0);

    /** Position. */
    public static final ArtemisPosition c2A = new ArtemisPosition("c2A", 2, 1, 0);

    /** Position. */
    public static final ArtemisPosition d2A = new ArtemisPosition("d2A", 3, 1, 0);

    /** Position. */
    public static final ArtemisPosition a3A = new ArtemisPosition("a3A", 0, 2, 0);

    /** Position. */
    public static final ArtemisPosition b3A = new ArtemisPosition("b3A", 1, 2, 0);

    /** Position. */
    public static final ArtemisPosition c3A = new ArtemisPosition("c3A", 2, 2, 0);

    /** Position. */
    public static final ArtemisPosition d3A = new ArtemisPosition("d3A", 3, 2, 0);

    /** Position. */
    public static final ArtemisPosition a4A = new ArtemisPosition("a4A", 0, 3, 0);

    /** Position. */
    public static final ArtemisPosition b4A = new ArtemisPosition("b4A", 1, 3, 0);

    /** Position. */
    public static final ArtemisPosition c4A = new ArtemisPosition("c4A", 2, 3, 0);

    /** Position. */
    public static final ArtemisPosition d4A = new ArtemisPosition("d4A", 3, 3, 0);

    /** Position. */
    public static final ArtemisPosition a1B = new ArtemisPosition("a1B", 0, 0, 1);

    /** Position. */
    public static final ArtemisPosition b1B = new ArtemisPosition("b1B", 1, 0, 1);

    /** Position. */
    public static final ArtemisPosition c1B = new ArtemisPosition("c1B", 2, 0, 1);

    /** Position. */
    public static final ArtemisPosition d1B = new ArtemisPosition("d1B", 3, 0, 1);

    /** Position. */
    public static final ArtemisPosition a2B = new ArtemisPosition("a2B", 0, 1, 1);

    /** Position. */
    public static final ArtemisPosition b2B = new ArtemisPosition("b2B", 1, 1, 1);

    /** Position. */
    public static final ArtemisPosition c2B = new ArtemisPosition("c2B", 2, 1, 1);

    /** Position. */
    public static final ArtemisPosition d2B = new ArtemisPosition("d2B", 3, 1, 1);

    /** Position. */
    public static final ArtemisPosition a3B = new ArtemisPosition("a3B", 0, 2, 1);

    /** Position. */
    public static final ArtemisPosition b3B = new ArtemisPosition("b3B", 1, 2, 1);

    /** Position. */
    public static final ArtemisPosition c3B = new ArtemisPosition("c3B", 2, 2, 1);

    /** Position. */
    public static final ArtemisPosition d3B = new ArtemisPosition("d3B", 3, 2, 1);

    /** Position. */
    public static final ArtemisPosition a4B = new ArtemisPosition("a4B", 0, 3, 1);

    /** Position. */
    public static final ArtemisPosition b4B = new ArtemisPosition("b4B", 1, 3, 1);

    /** Position. */
    public static final ArtemisPosition c4B = new ArtemisPosition("c4B", 2, 3, 1);

    /** Position. */
    public static final ArtemisPosition d4B = new ArtemisPosition("d4B", 3, 3, 1);

    /** Position. */
    public static final ArtemisPosition a1C = new ArtemisPosition("a1C", 0, 0, 2);

    /** Position. */
    public static final ArtemisPosition b1C = new ArtemisPosition("b1C", 1, 0, 2);

    /** Position. */
    public static final ArtemisPosition c1C = new ArtemisPosition("c1C", 2, 0, 2);

    /** Position. */
    public static final ArtemisPosition d1C = new ArtemisPosition("d1C", 3, 0, 2);

    /** Position. */
    public static final ArtemisPosition a2C = new ArtemisPosition("a2C", 0, 1, 2);

    /** Position. */
    public static final ArtemisPosition b2C = new ArtemisPosition("b2C", 1, 1, 2);

    /** Position. */
    public static final ArtemisPosition c2C = new ArtemisPosition("c2C", 2, 1, 2);

    /** Position. */
    public static final ArtemisPosition d2C = new ArtemisPosition("d2C", 3, 1, 2);

    /** Position. */
    public static final ArtemisPosition a3C = new ArtemisPosition("a3C", 0, 2, 2);

    /** Position. */
    public static final ArtemisPosition b3C = new ArtemisPosition("b3C", 1, 2, 2);

    /** Position. */
    public static final ArtemisPosition c3C = new ArtemisPosition("c3C", 2, 2, 2);

    /** Position. */
    public static final ArtemisPosition d3C = new ArtemisPosition("d3C", 3, 2, 2);

    /** Position. */
    public static final ArtemisPosition a4C = new ArtemisPosition("a4C", 0, 3, 2);

    /** Position. */
    public static final ArtemisPosition b4C = new ArtemisPosition("b4C", 1, 3, 2);

    /** Position. */
    public static final ArtemisPosition c4C = new ArtemisPosition("c4C", 2, 3, 2);

    /** Position. */
    public static final ArtemisPosition d4C = new ArtemisPosition("d4C", 3, 3, 2);

    /** Position. */
    public static final ArtemisPosition a1D = new ArtemisPosition("a1D", 0, 0, 3);

    /** Position. */
    public static final ArtemisPosition b1D = new ArtemisPosition("b1D", 1, 0, 3);

    /** Position. */
    public static final ArtemisPosition c1D = new ArtemisPosition("c1D", 2, 0, 3);

    /** Position. */
    public static final ArtemisPosition d1D = new ArtemisPosition("d1D", 3, 0, 3);

    /** Position. */
    public static final ArtemisPosition a2D = new ArtemisPosition("a2D", 0, 1, 3);

    /** Position. */
    public static final ArtemisPosition b2D = new ArtemisPosition("b2D", 1, 1, 3);

    /** Position. */
    public static final ArtemisPosition c2D = new ArtemisPosition("c2D", 2, 1, 3);

    /** Position. */
    public static final ArtemisPosition d2D = new ArtemisPosition("d2D", 3, 1, 3);

    /** Position. */
    public static final ArtemisPosition a3D = new ArtemisPosition("a3D", 0, 2, 3);

    /** Position. */
    public static final ArtemisPosition b3D = new ArtemisPosition("b3D", 1, 2, 3);

    /** Position. */
    public static final ArtemisPosition c3D = new ArtemisPosition("c3D", 2, 2, 3);

    /** Position. */
    public static final ArtemisPosition d3D = new ArtemisPosition("d3D", 3, 2, 3);

    /** Position. */
    public static final ArtemisPosition a4D = new ArtemisPosition("a4D", 0, 3, 3);

    /** Position. */
    public static final ArtemisPosition b4D = new ArtemisPosition("b4D", 1, 3, 3);

    /** Position. */
    public static final ArtemisPosition c4D = new ArtemisPosition("c4D", 2, 3, 3);

    /** Position. */
    public static final ArtemisPosition d4D = new ArtemisPosition("d4D", 3, 3, 3);

    /** Map of index to position. */
    private static final Map<Integer, ArtemisPosition> INDEX_TO_POSITION = new TreeMap<Integer, ArtemisPosition>();

    static
    {
        INDEX_TO_POSITION.put(0, a1A);
        INDEX_TO_POSITION.put(1, b1A);
        INDEX_TO_POSITION.put(2, c1A);
        INDEX_TO_POSITION.put(3, d1A);
        INDEX_TO_POSITION.put(4, a2A);
        INDEX_TO_POSITION.put(5, b2A);
        INDEX_TO_POSITION.put(6, c2A);
        INDEX_TO_POSITION.put(7, d2A);
        INDEX_TO_POSITION.put(8, a3A);
        INDEX_TO_POSITION.put(9, b3A);
        INDEX_TO_POSITION.put(10, c3A);
        INDEX_TO_POSITION.put(11, d3A);
        INDEX_TO_POSITION.put(12, a4A);
        INDEX_TO_POSITION.put(13, b4A);
        INDEX_TO_POSITION.put(14, c4A);
        INDEX_TO_POSITION.put(15, d4A);
        INDEX_TO_POSITION.put(16, a1B);
        INDEX_TO_POSITION.put(17, b1B);
        INDEX_TO_POSITION.put(18, c1B);
        INDEX_TO_POSITION.put(19, d1B);
        INDEX_TO_POSITION.put(20, a2B);
        INDEX_TO_POSITION.put(21, b2B);
        INDEX_TO_POSITION.put(22, c2B);
        INDEX_TO_POSITION.put(23, d2B);
        INDEX_TO_POSITION.put(24, a3B);
        INDEX_TO_POSITION.put(25, b3B);
        INDEX_TO_POSITION.put(26, c3B);
        INDEX_TO_POSITION.put(27, d3B);
        INDEX_TO_POSITION.put(28, a4B);
        INDEX_TO_POSITION.put(29, b4B);
        INDEX_TO_POSITION.put(30, c4B);
        INDEX_TO_POSITION.put(31, d4B);
        INDEX_TO_POSITION.put(32, a1C);
        INDEX_TO_POSITION.put(33, b1C);
        INDEX_TO_POSITION.put(34, c1C);
        INDEX_TO_POSITION.put(35, d1C);
        INDEX_TO_POSITION.put(36, a2C);
        INDEX_TO_POSITION.put(37, b2C);
        INDEX_TO_POSITION.put(38, c2C);
        INDEX_TO_POSITION.put(39, d2C);
        INDEX_TO_POSITION.put(40, a3C);
        INDEX_TO_POSITION.put(41, b3C);
        INDEX_TO_POSITION.put(42, c3C);
        INDEX_TO_POSITION.put(43, d3C);
        INDEX_TO_POSITION.put(44, a4C);
        INDEX_TO_POSITION.put(45, b4C);
        INDEX_TO_POSITION.put(46, c4C);
        INDEX_TO_POSITION.put(47, d4C);
        INDEX_TO_POSITION.put(48, a1D);
        INDEX_TO_POSITION.put(49, b1D);
        INDEX_TO_POSITION.put(50, c1D);
        INDEX_TO_POSITION.put(51, d1D);
        INDEX_TO_POSITION.put(52, a2D);
        INDEX_TO_POSITION.put(53, b2D);
        INDEX_TO_POSITION.put(54, c2D);
        INDEX_TO_POSITION.put(55, d2D);
        INDEX_TO_POSITION.put(56, a3D);
        INDEX_TO_POSITION.put(57, b3D);
        INDEX_TO_POSITION.put(58, c3D);
        INDEX_TO_POSITION.put(59, d3D);
        INDEX_TO_POSITION.put(60, a4D);
        INDEX_TO_POSITION.put(61, b4D);
        INDEX_TO_POSITION.put(62, c4D);
        INDEX_TO_POSITION.put(63, d4D);
    }

    /** Maximum X coordinate value. */
    public static final int MAX_X = 4;

    /** Maximum Y coordinate value. */
    public static final int MAX_Y = 4;

    /** Maximum Z coordinate value. */
    public static final int MAX_Z = 4;

    /** Values. */
    private static final ArtemisPosition[] VALUES;

    static
    {
        VALUES = INDEX_TO_POSITION.values().toArray(new ArtemisPosition[MAX_X * MAX_Y * MAX_Z]);
    }

    /**
     * @param x X coordinate.
     * @param y Y coordinate.
     * @param z Z coordinate.
     * 
     * @return the index.
     */
    public static Integer computeIndex(final int x, final int y, final int z)
    {
        Integer answer = null;

        if ((0 <= x) && (x < MAX_X) && (0 <= y) && (y < MAX_Y) && (0 <= z) && (z < MAX_Z))
        {
            answer = x + ((y + (z * MAX_Y)) * MAX_X);
        }

        return answer;
    }

    /**
     * @param x X coordinate.
     * @param y Y coordinate.
     * @param z Z coordinate.
     * 
     * @return the position for the given parameters.
     */
    public static ArtemisPosition findByCoordinates(final int x, final int y, final int z)
    {
        return findByIndex(computeIndex(x, y, z));
    }

    /**
     * @param index Index.
     * 
     * @return the position for the given parameter.
     */
    public static ArtemisPosition findByIndex(final Integer index)
    {
        ArtemisPosition answer = null;

        if (index != null)
        {
            answer = INDEX_TO_POSITION.get(index);
        }

        return answer;
    }

    /**
     * @return values.
     */
    public static ArtemisPosition[] values()
    {
        return VALUES;
    }

    /** Index. */
    private final int index;

    /** Name. */
    private final String name;

    /** X coordinate. */
    private final int x;

    /** Y coordinate. */
    private final int y;

    /** Z coordinate. */
    private final int z;

    /**
     * Construct this object.
     * 
     * @param name Name.
     * @param x X coordinate.
     * @param y Y coordinate.
     * @param z Z coordinate.
     */
    @SuppressWarnings("hiding")
    private ArtemisPosition(final String name, final int x, final int y, final int z)
    {
        this.name = name;
        this.x = x;
        this.y = y;
        this.z = z;
        this.index = computeIndex(x, y, z);
    }

    @Override
    public int getFile()
    {
        return x;
    }

    @Override
    public int getIndex()
    {
        return index;
    }

    @Override
    public int getLevel()
    {
        return z;
    }

    @Override
    public int getRank()
    {
        return y;
    }

    @Override
    public Integer getX()
    {
        return x;
    }

    @Override
    public Integer getY()
    {
        return y;
    }

    @Override
    public Integer getZ()
    {
        return z;
    }

    @Override
    public String name()
    {
        return name;
    }

    @Override
    public String toString()
    {
        return ToStringBuilder.reflectionToString(this, ToStringStyle.SHORT_PREFIX_STYLE);
    }
}

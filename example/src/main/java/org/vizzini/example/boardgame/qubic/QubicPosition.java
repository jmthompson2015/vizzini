package org.vizzini.example.boardgame.qubic;

import java.util.Map;
import java.util.TreeMap;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import org.vizzini.core.game.boardgame.BoardGamePosition;

/**
 * Provides a pseudo-enumeration of positions for qubic.
 */
public final class QubicPosition implements BoardGamePosition
{
    /** Position. */
    public static final QubicPosition a1A = new QubicPosition("a1A", 0, 0, 0);

    /** Position. */
    public static final QubicPosition b1A = new QubicPosition("b1A", 1, 0, 0);

    /** Position. */
    public static final QubicPosition c1A = new QubicPosition("c1A", 2, 0, 0);

    /** Position. */
    public static final QubicPosition d1A = new QubicPosition("d1A", 3, 0, 0);

    /** Position. */
    public static final QubicPosition a2A = new QubicPosition("a2A", 0, 1, 0);

    /** Position. */
    public static final QubicPosition b2A = new QubicPosition("b2A", 1, 1, 0);

    /** Position. */
    public static final QubicPosition c2A = new QubicPosition("c2A", 2, 1, 0);

    /** Position. */
    public static final QubicPosition d2A = new QubicPosition("d2A", 3, 1, 0);

    /** Position. */
    public static final QubicPosition a3A = new QubicPosition("a3A", 0, 2, 0);

    /** Position. */
    public static final QubicPosition b3A = new QubicPosition("b3A", 1, 2, 0);

    /** Position. */
    public static final QubicPosition c3A = new QubicPosition("c3A", 2, 2, 0);

    /** Position. */
    public static final QubicPosition d3A = new QubicPosition("d3A", 3, 2, 0);

    /** Position. */
    public static final QubicPosition a4A = new QubicPosition("a4A", 0, 3, 0);

    /** Position. */
    public static final QubicPosition b4A = new QubicPosition("b4A", 1, 3, 0);

    /** Position. */
    public static final QubicPosition c4A = new QubicPosition("c4A", 2, 3, 0);

    /** Position. */
    public static final QubicPosition d4A = new QubicPosition("d4A", 3, 3, 0);

    /** Position. */
    public static final QubicPosition a1B = new QubicPosition("a1B", 0, 0, 1);

    /** Position. */
    public static final QubicPosition b1B = new QubicPosition("b1B", 1, 0, 1);

    /** Position. */
    public static final QubicPosition c1B = new QubicPosition("c1B", 2, 0, 1);

    /** Position. */
    public static final QubicPosition d1B = new QubicPosition("d1B", 3, 0, 1);

    /** Position. */
    public static final QubicPosition a2B = new QubicPosition("a2B", 0, 1, 1);

    /** Position. */
    public static final QubicPosition b2B = new QubicPosition("b2B", 1, 1, 1);

    /** Position. */
    public static final QubicPosition c2B = new QubicPosition("c2B", 2, 1, 1);

    /** Position. */
    public static final QubicPosition d2B = new QubicPosition("d2B", 3, 1, 1);

    /** Position. */
    public static final QubicPosition a3B = new QubicPosition("a3B", 0, 2, 1);

    /** Position. */
    public static final QubicPosition b3B = new QubicPosition("b3B", 1, 2, 1);

    /** Position. */
    public static final QubicPosition c3B = new QubicPosition("c3B", 2, 2, 1);

    /** Position. */
    public static final QubicPosition d3B = new QubicPosition("d3B", 3, 2, 1);

    /** Position. */
    public static final QubicPosition a4B = new QubicPosition("a4B", 0, 3, 1);

    /** Position. */
    public static final QubicPosition b4B = new QubicPosition("b4B", 1, 3, 1);

    /** Position. */
    public static final QubicPosition c4B = new QubicPosition("c4B", 2, 3, 1);

    /** Position. */
    public static final QubicPosition d4B = new QubicPosition("d4B", 3, 3, 1);

    /** Position. */
    public static final QubicPosition a1C = new QubicPosition("a1C", 0, 0, 2);

    /** Position. */
    public static final QubicPosition b1C = new QubicPosition("b1C", 1, 0, 2);

    /** Position. */
    public static final QubicPosition c1C = new QubicPosition("c1C", 2, 0, 2);

    /** Position. */
    public static final QubicPosition d1C = new QubicPosition("d1C", 3, 0, 2);

    /** Position. */
    public static final QubicPosition a2C = new QubicPosition("a2C", 0, 1, 2);

    /** Position. */
    public static final QubicPosition b2C = new QubicPosition("b2C", 1, 1, 2);

    /** Position. */
    public static final QubicPosition c2C = new QubicPosition("c2C", 2, 1, 2);

    /** Position. */
    public static final QubicPosition d2C = new QubicPosition("d2C", 3, 1, 2);

    /** Position. */
    public static final QubicPosition a3C = new QubicPosition("a3C", 0, 2, 2);

    /** Position. */
    public static final QubicPosition b3C = new QubicPosition("b3C", 1, 2, 2);

    /** Position. */
    public static final QubicPosition c3C = new QubicPosition("c3C", 2, 2, 2);

    /** Position. */
    public static final QubicPosition d3C = new QubicPosition("d3C", 3, 2, 2);

    /** Position. */
    public static final QubicPosition a4C = new QubicPosition("a4C", 0, 3, 2);

    /** Position. */
    public static final QubicPosition b4C = new QubicPosition("b4C", 1, 3, 2);

    /** Position. */
    public static final QubicPosition c4C = new QubicPosition("c4C", 2, 3, 2);

    /** Position. */
    public static final QubicPosition d4C = new QubicPosition("d4C", 3, 3, 2);

    /** Position. */
    public static final QubicPosition a1D = new QubicPosition("a1D", 0, 0, 3);

    /** Position. */
    public static final QubicPosition b1D = new QubicPosition("b1D", 1, 0, 3);

    /** Position. */
    public static final QubicPosition c1D = new QubicPosition("c1D", 2, 0, 3);

    /** Position. */
    public static final QubicPosition d1D = new QubicPosition("d1D", 3, 0, 3);

    /** Position. */
    public static final QubicPosition a2D = new QubicPosition("a2D", 0, 1, 3);

    /** Position. */
    public static final QubicPosition b2D = new QubicPosition("b2D", 1, 1, 3);

    /** Position. */
    public static final QubicPosition c2D = new QubicPosition("c2D", 2, 1, 3);

    /** Position. */
    public static final QubicPosition d2D = new QubicPosition("d2D", 3, 1, 3);

    /** Position. */
    public static final QubicPosition a3D = new QubicPosition("a3D", 0, 2, 3);

    /** Position. */
    public static final QubicPosition b3D = new QubicPosition("b3D", 1, 2, 3);

    /** Position. */
    public static final QubicPosition c3D = new QubicPosition("c3D", 2, 2, 3);

    /** Position. */
    public static final QubicPosition d3D = new QubicPosition("d3D", 3, 2, 3);

    /** Position. */
    public static final QubicPosition a4D = new QubicPosition("a4D", 0, 3, 3);

    /** Position. */
    public static final QubicPosition b4D = new QubicPosition("b4D", 1, 3, 3);

    /** Position. */
    public static final QubicPosition c4D = new QubicPosition("c4D", 2, 3, 3);

    /** Position. */
    public static final QubicPosition d4D = new QubicPosition("d4D", 3, 3, 3);

    /** Map of index to position. */
    private static final Map<Integer, QubicPosition> INDEX_TO_POSITION = new TreeMap<Integer, QubicPosition>();

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
    private static final QubicPosition[] VALUES;

    static
    {
        VALUES = INDEX_TO_POSITION.values().toArray(new QubicPosition[MAX_X * MAX_Y * MAX_Z]);
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
    public static QubicPosition findByCoordinates(final int x, final int y, final int z)
    {
        return findByIndex(computeIndex(x, y, z));
    }

    /**
     * @param index Index.
     * 
     * @return the position for the given parameter.
     */
    public static QubicPosition findByIndex(final Integer index)
    {
        QubicPosition answer = null;

        if (index != null)
        {
            answer = INDEX_TO_POSITION.get(index);
        }

        return answer;
    }

    /**
     * @return values.
     */
    public static QubicPosition[] values()
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
    private QubicPosition(final String name, final int x, final int y, final int z)
    {
        this.name = name;
        this.x = x;
        this.y = y;
        this.z = z;
        this.index = computeIndex(x, y, z);
    }

    @Override
    public int getIndex()
    {
        return index;
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

    /**
     * @return true if this is a center.
     */
    public boolean isCenter()
    {
        return ((x == 1) || (x == 2)) && ((y == 1) || (y == 2)) && ((z == 1) || (z == 2));
    }

    /**
     * @return true if this is a corner.
     */
    public boolean isCorner()
    {
        return ((x == 0) || (x == 3)) && ((y == 0) || (y == 3)) && ((z == 0) || (z == 3));
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

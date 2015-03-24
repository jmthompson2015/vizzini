package org.vizzini.chess.raumschach;

import java.util.Map;
import java.util.TreeMap;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import org.vizzini.chess.ChessPosition;

/**
 * Provides a pseudo-enumeration of positions for raumschach chess.
 */
public final class RaumschachPosition implements ChessPosition
{
    /** Position. */
    public static final RaumschachPosition a1A = new RaumschachPosition("a1A", 0, 0, 0);

    /** Position. */
    public static final RaumschachPosition b1A = new RaumschachPosition("b1A", 1, 0, 0);

    /** Position. */
    public static final RaumschachPosition c1A = new RaumschachPosition("c1A", 2, 0, 0);

    /** Position. */
    public static final RaumschachPosition d1A = new RaumschachPosition("d1A", 3, 0, 0);

    /** Position. */
    public static final RaumschachPosition e1A = new RaumschachPosition("e1A", 4, 0, 0);

    /** Position. */
    public static final RaumschachPosition a2A = new RaumschachPosition("a2A", 0, 1, 0);

    /** Position. */
    public static final RaumschachPosition b2A = new RaumschachPosition("b2A", 1, 1, 0);

    /** Position. */
    public static final RaumschachPosition c2A = new RaumschachPosition("c2A", 2, 1, 0);

    /** Position. */
    public static final RaumschachPosition d2A = new RaumschachPosition("d2A", 3, 1, 0);

    /** Position. */
    public static final RaumschachPosition e2A = new RaumschachPosition("e2A", 4, 1, 0);

    /** Position. */
    public static final RaumschachPosition a3A = new RaumschachPosition("a3A", 0, 2, 0);

    /** Position. */
    public static final RaumschachPosition b3A = new RaumschachPosition("b3A", 1, 2, 0);

    /** Position. */
    public static final RaumschachPosition c3A = new RaumschachPosition("c3A", 2, 2, 0);

    /** Position. */
    public static final RaumschachPosition d3A = new RaumschachPosition("d3A", 3, 2, 0);

    /** Position. */
    public static final RaumschachPosition e3A = new RaumschachPosition("e3A", 4, 2, 0);

    /** Position. */
    public static final RaumschachPosition a4A = new RaumschachPosition("a4A", 0, 3, 0);

    /** Position. */
    public static final RaumschachPosition b4A = new RaumschachPosition("b4A", 1, 3, 0);

    /** Position. */
    public static final RaumschachPosition c4A = new RaumschachPosition("c4A", 2, 3, 0);

    /** Position. */
    public static final RaumschachPosition d4A = new RaumschachPosition("d4A", 3, 3, 0);

    /** Position. */
    public static final RaumschachPosition e4A = new RaumschachPosition("e4A", 4, 3, 0);

    /** Position. */
    public static final RaumschachPosition a5A = new RaumschachPosition("a5A", 0, 4, 0);

    /** Position. */
    public static final RaumschachPosition b5A = new RaumschachPosition("b5A", 1, 4, 0);

    /** Position. */
    public static final RaumschachPosition c5A = new RaumschachPosition("c5A", 2, 4, 0);

    /** Position. */
    public static final RaumschachPosition d5A = new RaumschachPosition("d5A", 3, 4, 0);

    /** Position. */
    public static final RaumschachPosition e5A = new RaumschachPosition("e5A", 4, 4, 0);

    /** Position. */
    public static final RaumschachPosition a1B = new RaumschachPosition("a1B", 0, 0, 1);

    /** Position. */
    public static final RaumschachPosition b1B = new RaumschachPosition("b1B", 1, 0, 1);

    /** Position. */
    public static final RaumschachPosition c1B = new RaumschachPosition("c1B", 2, 0, 1);

    /** Position. */
    public static final RaumschachPosition d1B = new RaumschachPosition("d1B", 3, 0, 1);

    /** Position. */
    public static final RaumschachPosition e1B = new RaumschachPosition("e1B", 4, 0, 1);

    /** Position. */
    public static final RaumschachPosition a2B = new RaumschachPosition("a2B", 0, 1, 1);

    /** Position. */
    public static final RaumschachPosition b2B = new RaumschachPosition("b2B", 1, 1, 1);

    /** Position. */
    public static final RaumschachPosition c2B = new RaumschachPosition("c2B", 2, 1, 1);

    /** Position. */
    public static final RaumschachPosition d2B = new RaumschachPosition("d2B", 3, 1, 1);

    /** Position. */
    public static final RaumschachPosition e2B = new RaumschachPosition("e2B", 4, 1, 1);

    /** Position. */
    public static final RaumschachPosition a3B = new RaumschachPosition("a3B", 0, 2, 1);

    /** Position. */
    public static final RaumschachPosition b3B = new RaumschachPosition("b3B", 1, 2, 1);

    /** Position. */
    public static final RaumschachPosition c3B = new RaumschachPosition("c3B", 2, 2, 1);

    /** Position. */
    public static final RaumschachPosition d3B = new RaumschachPosition("d3B", 3, 2, 1);

    /** Position. */
    public static final RaumschachPosition e3B = new RaumschachPosition("e3B", 4, 2, 1);

    /** Position. */
    public static final RaumschachPosition a4B = new RaumschachPosition("a4B", 0, 3, 1);

    /** Position. */
    public static final RaumschachPosition b4B = new RaumschachPosition("b4B", 1, 3, 1);

    /** Position. */
    public static final RaumschachPosition c4B = new RaumschachPosition("c4B", 2, 3, 1);

    /** Position. */
    public static final RaumschachPosition d4B = new RaumschachPosition("d4B", 3, 3, 1);

    /** Position. */
    public static final RaumschachPosition e4B = new RaumschachPosition("e4B", 4, 3, 1);

    /** Position. */
    public static final RaumschachPosition a5B = new RaumschachPosition("a5B", 0, 4, 1);

    /** Position. */
    public static final RaumschachPosition b5B = new RaumschachPosition("b5B", 1, 4, 1);

    /** Position. */
    public static final RaumschachPosition c5B = new RaumschachPosition("c5B", 2, 4, 1);

    /** Position. */
    public static final RaumschachPosition d5B = new RaumschachPosition("d5B", 3, 4, 1);

    /** Position. */
    public static final RaumschachPosition e5B = new RaumschachPosition("e5B", 4, 4, 1);

    /** Position. */
    public static final RaumschachPosition a1C = new RaumschachPosition("a1C", 0, 0, 2);

    /** Position. */
    public static final RaumschachPosition b1C = new RaumschachPosition("b1C", 1, 0, 2);

    /** Position. */
    public static final RaumschachPosition c1C = new RaumschachPosition("c1C", 2, 0, 2);

    /** Position. */
    public static final RaumschachPosition d1C = new RaumschachPosition("d1C", 3, 0, 2);

    /** Position. */
    public static final RaumschachPosition e1C = new RaumschachPosition("e1C", 4, 0, 2);

    /** Position. */
    public static final RaumschachPosition a2C = new RaumschachPosition("a2C", 0, 1, 2);

    /** Position. */
    public static final RaumschachPosition b2C = new RaumschachPosition("b2C", 1, 1, 2);

    /** Position. */
    public static final RaumschachPosition c2C = new RaumschachPosition("c2C", 2, 1, 2);

    /** Position. */
    public static final RaumschachPosition d2C = new RaumschachPosition("d2C", 3, 1, 2);

    /** Position. */
    public static final RaumschachPosition e2C = new RaumschachPosition("e2C", 4, 1, 2);

    /** Position. */
    public static final RaumschachPosition a3C = new RaumschachPosition("a3C", 0, 2, 2);

    /** Position. */
    public static final RaumschachPosition b3C = new RaumschachPosition("b3C", 1, 2, 2);

    /** Position. */
    public static final RaumschachPosition c3C = new RaumschachPosition("c3C", 2, 2, 2);

    /** Position. */
    public static final RaumschachPosition d3C = new RaumschachPosition("d3C", 3, 2, 2);

    /** Position. */
    public static final RaumschachPosition e3C = new RaumschachPosition("e3C", 4, 2, 2);

    /** Position. */
    public static final RaumschachPosition a4C = new RaumschachPosition("a4C", 0, 3, 2);

    /** Position. */
    public static final RaumschachPosition b4C = new RaumschachPosition("b4C", 1, 3, 2);

    /** Position. */
    public static final RaumschachPosition c4C = new RaumschachPosition("c4C", 2, 3, 2);

    /** Position. */
    public static final RaumschachPosition d4C = new RaumschachPosition("d4C", 3, 3, 2);

    /** Position. */
    public static final RaumschachPosition e4C = new RaumschachPosition("e4C", 4, 3, 2);

    /** Position. */
    public static final RaumschachPosition a5C = new RaumschachPosition("a5C", 0, 4, 2);

    /** Position. */
    public static final RaumschachPosition b5C = new RaumschachPosition("b5C", 1, 4, 2);

    /** Position. */
    public static final RaumschachPosition c5C = new RaumschachPosition("c5C", 2, 4, 2);

    /** Position. */
    public static final RaumschachPosition d5C = new RaumschachPosition("d5C", 3, 4, 2);

    /** Position. */
    public static final RaumschachPosition e5C = new RaumschachPosition("e5C", 4, 4, 2);

    /** Position. */
    public static final RaumschachPosition a1D = new RaumschachPosition("a1D", 0, 0, 3);

    /** Position. */
    public static final RaumschachPosition b1D = new RaumschachPosition("b1D", 1, 0, 3);

    /** Position. */
    public static final RaumschachPosition c1D = new RaumschachPosition("c1D", 2, 0, 3);

    /** Position. */
    public static final RaumschachPosition d1D = new RaumschachPosition("d1D", 3, 0, 3);

    /** Position. */
    public static final RaumschachPosition e1D = new RaumschachPosition("e1D", 4, 0, 3);

    /** Position. */
    public static final RaumschachPosition a2D = new RaumschachPosition("a2D", 0, 1, 3);

    /** Position. */
    public static final RaumschachPosition b2D = new RaumschachPosition("b2D", 1, 1, 3);

    /** Position. */
    public static final RaumschachPosition c2D = new RaumschachPosition("c2D", 2, 1, 3);

    /** Position. */
    public static final RaumschachPosition d2D = new RaumschachPosition("d2D", 3, 1, 3);

    /** Position. */
    public static final RaumschachPosition e2D = new RaumschachPosition("e2D", 4, 1, 3);

    /** Position. */
    public static final RaumschachPosition a3D = new RaumschachPosition("a3D", 0, 2, 3);

    /** Position. */
    public static final RaumschachPosition b3D = new RaumschachPosition("b3D", 1, 2, 3);

    /** Position. */
    public static final RaumschachPosition c3D = new RaumschachPosition("c3D", 2, 2, 3);

    /** Position. */
    public static final RaumschachPosition d3D = new RaumschachPosition("d3D", 3, 2, 3);

    /** Position. */
    public static final RaumschachPosition e3D = new RaumschachPosition("e3D", 4, 2, 3);

    /** Position. */
    public static final RaumschachPosition a4D = new RaumschachPosition("a4D", 0, 3, 3);

    /** Position. */
    public static final RaumschachPosition b4D = new RaumschachPosition("b4D", 1, 3, 3);

    /** Position. */
    public static final RaumschachPosition c4D = new RaumschachPosition("c4D", 2, 3, 3);

    /** Position. */
    public static final RaumschachPosition d4D = new RaumschachPosition("d4D", 3, 3, 3);

    /** Position. */
    public static final RaumschachPosition e4D = new RaumschachPosition("e4D", 4, 3, 3);

    /** Position. */
    public static final RaumschachPosition a5D = new RaumschachPosition("a5D", 0, 4, 3);

    /** Position. */
    public static final RaumschachPosition b5D = new RaumschachPosition("b5D", 1, 4, 3);

    /** Position. */
    public static final RaumschachPosition c5D = new RaumschachPosition("c5D", 2, 4, 3);

    /** Position. */
    public static final RaumschachPosition d5D = new RaumschachPosition("d5D", 3, 4, 3);

    /** Position. */
    public static final RaumschachPosition e5D = new RaumschachPosition("e5D", 4, 4, 3);

    /** Position. */
    public static final RaumschachPosition a1E = new RaumschachPosition("a1E", 0, 0, 4);

    /** Position. */
    public static final RaumschachPosition b1E = new RaumschachPosition("b1E", 1, 0, 4);

    /** Position. */
    public static final RaumschachPosition c1E = new RaumschachPosition("c1E", 2, 0, 4);

    /** Position. */
    public static final RaumschachPosition d1E = new RaumschachPosition("d1E", 3, 0, 4);

    /** Position. */
    public static final RaumschachPosition e1E = new RaumschachPosition("e1E", 4, 0, 4);

    /** Position. */
    public static final RaumschachPosition a2E = new RaumschachPosition("a2E", 0, 1, 4);

    /** Position. */
    public static final RaumschachPosition b2E = new RaumschachPosition("b2E", 1, 1, 4);

    /** Position. */
    public static final RaumschachPosition c2E = new RaumschachPosition("c2E", 2, 1, 4);

    /** Position. */
    public static final RaumschachPosition d2E = new RaumschachPosition("d2E", 3, 1, 4);

    /** Position. */
    public static final RaumschachPosition e2E = new RaumschachPosition("e2E", 4, 1, 4);

    /** Position. */
    public static final RaumschachPosition a3E = new RaumschachPosition("a3E", 0, 2, 4);

    /** Position. */
    public static final RaumschachPosition b3E = new RaumschachPosition("b3E", 1, 2, 4);

    /** Position. */
    public static final RaumschachPosition c3E = new RaumschachPosition("c3E", 2, 2, 4);

    /** Position. */
    public static final RaumschachPosition d3E = new RaumschachPosition("d3E", 3, 2, 4);

    /** Position. */
    public static final RaumschachPosition e3E = new RaumschachPosition("e3E", 4, 2, 4);

    /** Position. */
    public static final RaumschachPosition a4E = new RaumschachPosition("a4E", 0, 3, 4);

    /** Position. */
    public static final RaumschachPosition b4E = new RaumschachPosition("b4E", 1, 3, 4);

    /** Position. */
    public static final RaumschachPosition c4E = new RaumschachPosition("c4E", 2, 3, 4);

    /** Position. */
    public static final RaumschachPosition d4E = new RaumschachPosition("d4E", 3, 3, 4);

    /** Position. */
    public static final RaumschachPosition e4E = new RaumschachPosition("e4E", 4, 3, 4);

    /** Position. */
    public static final RaumschachPosition a5E = new RaumschachPosition("a5E", 0, 4, 4);

    /** Position. */
    public static final RaumschachPosition b5E = new RaumschachPosition("b5E", 1, 4, 4);

    /** Position. */
    public static final RaumschachPosition c5E = new RaumschachPosition("c5E", 2, 4, 4);

    /** Position. */
    public static final RaumschachPosition d5E = new RaumschachPosition("d5E", 3, 4, 4);

    /** Position. */
    public static final RaumschachPosition e5E = new RaumschachPosition("e5E", 4, 4, 4);

    /** Map of index to position. */
    private static final Map<Integer, RaumschachPosition> INDEX_TO_POSITION = new TreeMap<Integer, RaumschachPosition>();

    static
    {
        INDEX_TO_POSITION.put(0, a1A);
        INDEX_TO_POSITION.put(1, b1A);
        INDEX_TO_POSITION.put(2, c1A);
        INDEX_TO_POSITION.put(3, d1A);
        INDEX_TO_POSITION.put(4, e1A);
        INDEX_TO_POSITION.put(5, a2A);
        INDEX_TO_POSITION.put(6, b2A);
        INDEX_TO_POSITION.put(7, c2A);
        INDEX_TO_POSITION.put(8, d2A);
        INDEX_TO_POSITION.put(9, e2A);
        INDEX_TO_POSITION.put(10, a3A);
        INDEX_TO_POSITION.put(11, b3A);
        INDEX_TO_POSITION.put(12, c3A);
        INDEX_TO_POSITION.put(13, d3A);
        INDEX_TO_POSITION.put(14, e3A);
        INDEX_TO_POSITION.put(15, a4A);
        INDEX_TO_POSITION.put(16, b4A);
        INDEX_TO_POSITION.put(17, c4A);
        INDEX_TO_POSITION.put(18, d4A);
        INDEX_TO_POSITION.put(19, e4A);
        INDEX_TO_POSITION.put(20, a5A);
        INDEX_TO_POSITION.put(21, b5A);
        INDEX_TO_POSITION.put(22, c5A);
        INDEX_TO_POSITION.put(23, d5A);
        INDEX_TO_POSITION.put(24, e5A);
        INDEX_TO_POSITION.put(25, a1B);
        INDEX_TO_POSITION.put(26, b1B);
        INDEX_TO_POSITION.put(27, c1B);
        INDEX_TO_POSITION.put(28, d1B);
        INDEX_TO_POSITION.put(29, e1B);
        INDEX_TO_POSITION.put(30, a2B);
        INDEX_TO_POSITION.put(31, b2B);
        INDEX_TO_POSITION.put(32, c2B);
        INDEX_TO_POSITION.put(33, d2B);
        INDEX_TO_POSITION.put(34, e2B);
        INDEX_TO_POSITION.put(35, a3B);
        INDEX_TO_POSITION.put(36, b3B);
        INDEX_TO_POSITION.put(37, c3B);
        INDEX_TO_POSITION.put(38, d3B);
        INDEX_TO_POSITION.put(39, e3B);
        INDEX_TO_POSITION.put(40, a4B);
        INDEX_TO_POSITION.put(41, b4B);
        INDEX_TO_POSITION.put(42, c4B);
        INDEX_TO_POSITION.put(43, d4B);
        INDEX_TO_POSITION.put(44, e4B);
        INDEX_TO_POSITION.put(45, a5B);
        INDEX_TO_POSITION.put(46, b5B);
        INDEX_TO_POSITION.put(47, c5B);
        INDEX_TO_POSITION.put(48, d5B);
        INDEX_TO_POSITION.put(49, e5B);
        INDEX_TO_POSITION.put(50, a1C);
        INDEX_TO_POSITION.put(51, b1C);
        INDEX_TO_POSITION.put(52, c1C);
        INDEX_TO_POSITION.put(53, d1C);
        INDEX_TO_POSITION.put(54, e1C);
        INDEX_TO_POSITION.put(55, a2C);
        INDEX_TO_POSITION.put(56, b2C);
        INDEX_TO_POSITION.put(57, c2C);
        INDEX_TO_POSITION.put(58, d2C);
        INDEX_TO_POSITION.put(59, e2C);
        INDEX_TO_POSITION.put(60, a3C);
        INDEX_TO_POSITION.put(61, b3C);
        INDEX_TO_POSITION.put(62, c3C);
        INDEX_TO_POSITION.put(63, d3C);
        INDEX_TO_POSITION.put(64, e3C);
        INDEX_TO_POSITION.put(65, a4C);
        INDEX_TO_POSITION.put(66, b4C);
        INDEX_TO_POSITION.put(67, c4C);
        INDEX_TO_POSITION.put(68, d4C);
        INDEX_TO_POSITION.put(69, e4C);
        INDEX_TO_POSITION.put(70, a5C);
        INDEX_TO_POSITION.put(71, b5C);
        INDEX_TO_POSITION.put(72, c5C);
        INDEX_TO_POSITION.put(73, d5C);
        INDEX_TO_POSITION.put(74, e5C);
        INDEX_TO_POSITION.put(75, a1D);
        INDEX_TO_POSITION.put(76, b1D);
        INDEX_TO_POSITION.put(77, c1D);
        INDEX_TO_POSITION.put(78, d1D);
        INDEX_TO_POSITION.put(79, e1D);
        INDEX_TO_POSITION.put(80, a2D);
        INDEX_TO_POSITION.put(81, b2D);
        INDEX_TO_POSITION.put(82, c2D);
        INDEX_TO_POSITION.put(83, d2D);
        INDEX_TO_POSITION.put(84, e2D);
        INDEX_TO_POSITION.put(85, a3D);
        INDEX_TO_POSITION.put(86, b3D);
        INDEX_TO_POSITION.put(87, c3D);
        INDEX_TO_POSITION.put(88, d3D);
        INDEX_TO_POSITION.put(89, e3D);
        INDEX_TO_POSITION.put(90, a4D);
        INDEX_TO_POSITION.put(91, b4D);
        INDEX_TO_POSITION.put(92, c4D);
        INDEX_TO_POSITION.put(93, d4D);
        INDEX_TO_POSITION.put(94, e4D);
        INDEX_TO_POSITION.put(95, a5D);
        INDEX_TO_POSITION.put(96, b5D);
        INDEX_TO_POSITION.put(97, c5D);
        INDEX_TO_POSITION.put(98, d5D);
        INDEX_TO_POSITION.put(99, e5D);
        INDEX_TO_POSITION.put(100, a1E);
        INDEX_TO_POSITION.put(101, b1E);
        INDEX_TO_POSITION.put(102, c1E);
        INDEX_TO_POSITION.put(103, d1E);
        INDEX_TO_POSITION.put(104, e1E);
        INDEX_TO_POSITION.put(105, a2E);
        INDEX_TO_POSITION.put(106, b2E);
        INDEX_TO_POSITION.put(107, c2E);
        INDEX_TO_POSITION.put(108, d2E);
        INDEX_TO_POSITION.put(109, e2E);
        INDEX_TO_POSITION.put(110, a3E);
        INDEX_TO_POSITION.put(111, b3E);
        INDEX_TO_POSITION.put(112, c3E);
        INDEX_TO_POSITION.put(113, d3E);
        INDEX_TO_POSITION.put(114, e3E);
        INDEX_TO_POSITION.put(115, a4E);
        INDEX_TO_POSITION.put(116, b4E);
        INDEX_TO_POSITION.put(117, c4E);
        INDEX_TO_POSITION.put(118, d4E);
        INDEX_TO_POSITION.put(119, e4E);
        INDEX_TO_POSITION.put(120, a5E);
        INDEX_TO_POSITION.put(121, b5E);
        INDEX_TO_POSITION.put(122, c5E);
        INDEX_TO_POSITION.put(123, d5E);
        INDEX_TO_POSITION.put(124, e5E);
    }

    /** Maximum X coordinate value. */
    public static final int MAX_X = 5;

    /** Maximum Y coordinate value. */
    public static final int MAX_Y = 5;

    /** Maximum Z coordinate value. */
    public static final int MAX_Z = 5;

    /** Values. */
    private static final RaumschachPosition[] VALUES;

    static
    {
        VALUES = INDEX_TO_POSITION.values().toArray(new RaumschachPosition[MAX_X * MAX_Y * MAX_Z]);
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
    public static RaumschachPosition findByCoordinates(final int x, final int y, final int z)
    {
        return findByIndex(computeIndex(x, y, z));
    }

    /**
     * @param index Index.
     * 
     * @return the position for the given parameter.
     */
    public static RaumschachPosition findByIndex(final Integer index)
    {
        RaumschachPosition answer = null;

        if (index != null)
        {
            answer = INDEX_TO_POSITION.get(index);
        }

        return answer;
    }

    /**
     * @return values.
     */
    public static RaumschachPosition[] values()
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
    private RaumschachPosition(final String name, final int x, final int y, final int z)
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

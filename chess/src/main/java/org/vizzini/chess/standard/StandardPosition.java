package org.vizzini.chess.standard;

import java.util.Map;
import java.util.TreeMap;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import org.vizzini.chess.ChessPosition;

/**
 * Provides a pseudo-enumeration of positions for standard chess.
 */
public final class StandardPosition implements ChessPosition
{
    /** Position. */
    public static final StandardPosition a1 = new StandardPosition("a1", 0, 0);

    /** Position. */
    public static final StandardPosition b1 = new StandardPosition("b1", 1, 0);

    /** Position. */
    public static final StandardPosition c1 = new StandardPosition("c1", 2, 0);

    /** Position. */
    public static final StandardPosition d1 = new StandardPosition("d1", 3, 0);

    /** Position. */
    public static final StandardPosition e1 = new StandardPosition("e1", 4, 0);

    /** Position. */
    public static final StandardPosition f1 = new StandardPosition("f1", 5, 0);

    /** Position. */
    public static final StandardPosition g1 = new StandardPosition("g1", 6, 0);

    /** Position. */
    public static final StandardPosition h1 = new StandardPosition("h1", 7, 0);

    /** Position. */
    public static final StandardPosition a2 = new StandardPosition("a2", 0, 1);

    /** Position. */
    public static final StandardPosition b2 = new StandardPosition("b2", 1, 1);

    /** Position. */
    public static final StandardPosition c2 = new StandardPosition("c2", 2, 1);

    /** Position. */
    public static final StandardPosition d2 = new StandardPosition("d2", 3, 1);

    /** Position. */
    public static final StandardPosition e2 = new StandardPosition("e2", 4, 1);

    /** Position. */
    public static final StandardPosition f2 = new StandardPosition("f2", 5, 1);

    /** Position. */
    public static final StandardPosition g2 = new StandardPosition("g2", 6, 1);

    /** Position. */
    public static final StandardPosition h2 = new StandardPosition("h2", 7, 1);

    /** Position. */
    public static final StandardPosition a3 = new StandardPosition("a3", 0, 2);

    /** Position. */
    public static final StandardPosition b3 = new StandardPosition("b3", 1, 2);

    /** Position. */
    public static final StandardPosition c3 = new StandardPosition("c3", 2, 2);

    /** Position. */
    public static final StandardPosition d3 = new StandardPosition("d3", 3, 2);

    /** Position. */
    public static final StandardPosition e3 = new StandardPosition("e3", 4, 2);

    /** Position. */
    public static final StandardPosition f3 = new StandardPosition("f3", 5, 2);

    /** Position. */
    public static final StandardPosition g3 = new StandardPosition("g3", 6, 2);

    /** Position. */
    public static final StandardPosition h3 = new StandardPosition("h3", 7, 2);

    /** Position. */
    public static final StandardPosition a4 = new StandardPosition("a4", 0, 3);

    /** Position. */
    public static final StandardPosition b4 = new StandardPosition("b4", 1, 3);

    /** Position. */
    public static final StandardPosition c4 = new StandardPosition("c4", 2, 3);

    /** Position. */
    public static final StandardPosition d4 = new StandardPosition("d4", 3, 3);

    /** Position. */
    public static final StandardPosition e4 = new StandardPosition("e4", 4, 3);

    /** Position. */
    public static final StandardPosition f4 = new StandardPosition("f4", 5, 3);

    /** Position. */
    public static final StandardPosition g4 = new StandardPosition("g4", 6, 3);

    /** Position. */
    public static final StandardPosition h4 = new StandardPosition("h4", 7, 3);

    /** Position. */
    public static final StandardPosition a5 = new StandardPosition("a5", 0, 4);

    /** Position. */
    public static final StandardPosition b5 = new StandardPosition("b5", 1, 4);

    /** Position. */
    public static final StandardPosition c5 = new StandardPosition("c5", 2, 4);

    /** Position. */
    public static final StandardPosition d5 = new StandardPosition("d5", 3, 4);

    /** Position. */
    public static final StandardPosition e5 = new StandardPosition("e5", 4, 4);

    /** Position. */
    public static final StandardPosition f5 = new StandardPosition("f5", 5, 4);

    /** Position. */
    public static final StandardPosition g5 = new StandardPosition("g5", 6, 4);

    /** Position. */
    public static final StandardPosition h5 = new StandardPosition("h5", 7, 4);

    /** Position. */
    public static final StandardPosition a6 = new StandardPosition("a6", 0, 5);

    /** Position. */
    public static final StandardPosition b6 = new StandardPosition("b6", 1, 5);

    /** Position. */
    public static final StandardPosition c6 = new StandardPosition("c6", 2, 5);

    /** Position. */
    public static final StandardPosition d6 = new StandardPosition("d6", 3, 5);

    /** Position. */
    public static final StandardPosition e6 = new StandardPosition("e6", 4, 5);

    /** Position. */
    public static final StandardPosition f6 = new StandardPosition("f6", 5, 5);

    /** Position. */
    public static final StandardPosition g6 = new StandardPosition("g6", 6, 5);

    /** Position. */
    public static final StandardPosition h6 = new StandardPosition("h6", 7, 5);

    /** Position. */
    public static final StandardPosition a7 = new StandardPosition("a7", 0, 6);

    /** Position. */
    public static final StandardPosition b7 = new StandardPosition("b7", 1, 6);

    /** Position. */
    public static final StandardPosition c7 = new StandardPosition("c7", 2, 6);

    /** Position. */
    public static final StandardPosition d7 = new StandardPosition("d7", 3, 6);

    /** Position. */
    public static final StandardPosition e7 = new StandardPosition("e7", 4, 6);

    /** Position. */
    public static final StandardPosition f7 = new StandardPosition("f7", 5, 6);

    /** Position. */
    public static final StandardPosition g7 = new StandardPosition("g7", 6, 6);

    /** Position. */
    public static final StandardPosition h7 = new StandardPosition("h7", 7, 6);

    /** Position. */
    public static final StandardPosition a8 = new StandardPosition("a8", 0, 7);

    /** Position. */
    public static final StandardPosition b8 = new StandardPosition("b8", 1, 7);

    /** Position. */
    public static final StandardPosition c8 = new StandardPosition("c8", 2, 7);

    /** Position. */
    public static final StandardPosition d8 = new StandardPosition("d8", 3, 7);

    /** Position. */
    public static final StandardPosition e8 = new StandardPosition("e8", 4, 7);

    /** Position. */
    public static final StandardPosition f8 = new StandardPosition("f8", 5, 7);

    /** Position. */
    public static final StandardPosition g8 = new StandardPosition("g8", 6, 7);

    /** Position. */
    public static final StandardPosition h8 = new StandardPosition("h8", 7, 7);

    /** Map of index to position. */
    private static final Map<Integer, StandardPosition> INDEX_TO_POSITION = new TreeMap<Integer, StandardPosition>();

    static
    {
        INDEX_TO_POSITION.put(0, a1);
        INDEX_TO_POSITION.put(1, b1);
        INDEX_TO_POSITION.put(2, c1);
        INDEX_TO_POSITION.put(3, d1);
        INDEX_TO_POSITION.put(4, e1);
        INDEX_TO_POSITION.put(5, f1);
        INDEX_TO_POSITION.put(6, g1);
        INDEX_TO_POSITION.put(7, h1);
        INDEX_TO_POSITION.put(8, a2);
        INDEX_TO_POSITION.put(9, b2);
        INDEX_TO_POSITION.put(10, c2);
        INDEX_TO_POSITION.put(11, d2);
        INDEX_TO_POSITION.put(12, e2);
        INDEX_TO_POSITION.put(13, f2);
        INDEX_TO_POSITION.put(14, g2);
        INDEX_TO_POSITION.put(15, h2);
        INDEX_TO_POSITION.put(16, a3);
        INDEX_TO_POSITION.put(17, b3);
        INDEX_TO_POSITION.put(18, c3);
        INDEX_TO_POSITION.put(19, d3);
        INDEX_TO_POSITION.put(20, e3);
        INDEX_TO_POSITION.put(21, f3);
        INDEX_TO_POSITION.put(22, g3);
        INDEX_TO_POSITION.put(23, h3);
        INDEX_TO_POSITION.put(24, a4);
        INDEX_TO_POSITION.put(25, b4);
        INDEX_TO_POSITION.put(26, c4);
        INDEX_TO_POSITION.put(27, d4);
        INDEX_TO_POSITION.put(28, e4);
        INDEX_TO_POSITION.put(29, f4);
        INDEX_TO_POSITION.put(30, g4);
        INDEX_TO_POSITION.put(31, h4);
        INDEX_TO_POSITION.put(32, a5);
        INDEX_TO_POSITION.put(33, b5);
        INDEX_TO_POSITION.put(34, c5);
        INDEX_TO_POSITION.put(35, d5);
        INDEX_TO_POSITION.put(36, e5);
        INDEX_TO_POSITION.put(37, f5);
        INDEX_TO_POSITION.put(38, g5);
        INDEX_TO_POSITION.put(39, h5);
        INDEX_TO_POSITION.put(40, a6);
        INDEX_TO_POSITION.put(41, b6);
        INDEX_TO_POSITION.put(42, c6);
        INDEX_TO_POSITION.put(43, d6);
        INDEX_TO_POSITION.put(44, e6);
        INDEX_TO_POSITION.put(45, f6);
        INDEX_TO_POSITION.put(46, g6);
        INDEX_TO_POSITION.put(47, h6);
        INDEX_TO_POSITION.put(48, a7);
        INDEX_TO_POSITION.put(49, b7);
        INDEX_TO_POSITION.put(50, c7);
        INDEX_TO_POSITION.put(51, d7);
        INDEX_TO_POSITION.put(52, e7);
        INDEX_TO_POSITION.put(53, f7);
        INDEX_TO_POSITION.put(54, g7);
        INDEX_TO_POSITION.put(55, h7);
        INDEX_TO_POSITION.put(56, a8);
        INDEX_TO_POSITION.put(57, b8);
        INDEX_TO_POSITION.put(58, c8);
        INDEX_TO_POSITION.put(59, d8);
        INDEX_TO_POSITION.put(60, e8);
        INDEX_TO_POSITION.put(61, f8);
        INDEX_TO_POSITION.put(62, g8);
        INDEX_TO_POSITION.put(63, h8);
    }

    /** Maximum X coordinate value. */
    public static final int MAX_X = 8;

    /** Maximum Y coordinate value. */
    public static final int MAX_Y = 8;

    /** Maximum Z coordinate value. */
    public static final int MAX_Z = 1;

    /** Values. */
    private static final StandardPosition[] VALUES;

    static
    {
        VALUES = INDEX_TO_POSITION.values().toArray(new StandardPosition[MAX_X * MAX_Y * MAX_Z]);
    }

    /**
     * @param x X coordinate.
     * @param y Y coordinate.
     * 
     * @return the index.
     */
    public static Integer computeIndex(final int x, final int y)
    {
        Integer answer = null;

        if ((0 <= x) && (x < MAX_X) && (0 <= y) && (y < MAX_Y))
        {
            answer = x + (y * MAX_X);
        }

        return answer;
    }

    /**
     * @param x X coordinate.
     * @param y Y coordinate.
     * 
     * @return the position for the given parameters.
     */
    public static StandardPosition findByCoordinates(final int x, final int y)
    {
        return findByIndex(computeIndex(x, y));
    }

    /**
     * @param x X coordinate.
     * @param y Y coordinate.
     * @param z Z coordinate.
     * 
     * @return the position for the given parameters.
     */
    public static StandardPosition findByCoordinates(final int x, final int y, final int z)
    {
        return findByCoordinates(x, y);
    }

    /**
     * @param index Index.
     * 
     * @return the position for the given parameter.
     */
    public static StandardPosition findByIndex(final Integer index)
    {
        StandardPosition answer = null;

        if (index != null)
        {
            answer = INDEX_TO_POSITION.get(index);
        }

        return answer;
    }

    /**
     * @return values.
     */
    public static StandardPosition[] values()
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

    /**
     * Construct this object.
     * 
     * @param name Name.
     * @param x X coordinate.
     * @param y Y coordinate.
     */
    @SuppressWarnings("hiding")
    private StandardPosition(final String name, final int x, final int y)
    {
        this.name = name;
        this.x = x;
        this.y = y;
        this.index = computeIndex(x, y);
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
        return 0;
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
        return 0;
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

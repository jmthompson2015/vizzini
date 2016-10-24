package org.vizzini.example.boardgame.reversi;

import java.util.Map;
import java.util.TreeMap;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import org.vizzini.core.game.boardgame.BoardGamePosition;

/**
 * Provides a pseudo-enumeration of positions for reversi.
 */
public final class ReversiPosition implements BoardGamePosition
{
    /** Position. */
    public static final ReversiPosition a1 = new ReversiPosition("a1", 0, 0);

    /** Position. */
    public static final ReversiPosition b1 = new ReversiPosition("b1", 1, 0);

    /** Position. */
    public static final ReversiPosition c1 = new ReversiPosition("c1", 2, 0);

    /** Position. */
    public static final ReversiPosition d1 = new ReversiPosition("d1", 3, 0);

    /** Position. */
    public static final ReversiPosition e1 = new ReversiPosition("e1", 4, 0);

    /** Position. */
    public static final ReversiPosition f1 = new ReversiPosition("f1", 5, 0);

    /** Position. */
    public static final ReversiPosition g1 = new ReversiPosition("g1", 6, 0);

    /** Position. */
    public static final ReversiPosition h1 = new ReversiPosition("h1", 7, 0);

    /** Position. */
    public static final ReversiPosition a2 = new ReversiPosition("a2", 0, 1);

    /** Position. */
    public static final ReversiPosition b2 = new ReversiPosition("b2", 1, 1);

    /** Position. */
    public static final ReversiPosition c2 = new ReversiPosition("c2", 2, 1);

    /** Position. */
    public static final ReversiPosition d2 = new ReversiPosition("d2", 3, 1);

    /** Position. */
    public static final ReversiPosition e2 = new ReversiPosition("e2", 4, 1);

    /** Position. */
    public static final ReversiPosition f2 = new ReversiPosition("f2", 5, 1);

    /** Position. */
    public static final ReversiPosition g2 = new ReversiPosition("g2", 6, 1);

    /** Position. */
    public static final ReversiPosition h2 = new ReversiPosition("h2", 7, 1);

    /** Position. */
    public static final ReversiPosition a3 = new ReversiPosition("a3", 0, 2);

    /** Position. */
    public static final ReversiPosition b3 = new ReversiPosition("b3", 1, 2);

    /** Position. */
    public static final ReversiPosition c3 = new ReversiPosition("c3", 2, 2);

    /** Position. */
    public static final ReversiPosition d3 = new ReversiPosition("d3", 3, 2);

    /** Position. */
    public static final ReversiPosition e3 = new ReversiPosition("e3", 4, 2);

    /** Position. */
    public static final ReversiPosition f3 = new ReversiPosition("f3", 5, 2);

    /** Position. */
    public static final ReversiPosition g3 = new ReversiPosition("g3", 6, 2);

    /** Position. */
    public static final ReversiPosition h3 = new ReversiPosition("h3", 7, 2);

    /** Position. */
    public static final ReversiPosition a4 = new ReversiPosition("a4", 0, 3);

    /** Position. */
    public static final ReversiPosition b4 = new ReversiPosition("b4", 1, 3);

    /** Position. */
    public static final ReversiPosition c4 = new ReversiPosition("c4", 2, 3);

    /** Position. */
    public static final ReversiPosition d4 = new ReversiPosition("d4", 3, 3);

    /** Position. */
    public static final ReversiPosition e4 = new ReversiPosition("e4", 4, 3);

    /** Position. */
    public static final ReversiPosition f4 = new ReversiPosition("f4", 5, 3);

    /** Position. */
    public static final ReversiPosition g4 = new ReversiPosition("g4", 6, 3);

    /** Position. */
    public static final ReversiPosition h4 = new ReversiPosition("h4", 7, 3);

    /** Position. */
    public static final ReversiPosition a5 = new ReversiPosition("a5", 0, 4);

    /** Position. */
    public static final ReversiPosition b5 = new ReversiPosition("b5", 1, 4);

    /** Position. */
    public static final ReversiPosition c5 = new ReversiPosition("c5", 2, 4);

    /** Position. */
    public static final ReversiPosition d5 = new ReversiPosition("d5", 3, 4);

    /** Position. */
    public static final ReversiPosition e5 = new ReversiPosition("e5", 4, 4);

    /** Position. */
    public static final ReversiPosition f5 = new ReversiPosition("f5", 5, 4);

    /** Position. */
    public static final ReversiPosition g5 = new ReversiPosition("g5", 6, 4);

    /** Position. */
    public static final ReversiPosition h5 = new ReversiPosition("h5", 7, 4);

    /** Position. */
    public static final ReversiPosition a6 = new ReversiPosition("a6", 0, 5);

    /** Position. */
    public static final ReversiPosition b6 = new ReversiPosition("b6", 1, 5);

    /** Position. */
    public static final ReversiPosition c6 = new ReversiPosition("c6", 2, 5);

    /** Position. */
    public static final ReversiPosition d6 = new ReversiPosition("d6", 3, 5);

    /** Position. */
    public static final ReversiPosition e6 = new ReversiPosition("e6", 4, 5);

    /** Position. */
    public static final ReversiPosition f6 = new ReversiPosition("f6", 5, 5);

    /** Position. */
    public static final ReversiPosition g6 = new ReversiPosition("g6", 6, 5);

    /** Position. */
    public static final ReversiPosition h6 = new ReversiPosition("h6", 7, 5);

    /** Position. */
    public static final ReversiPosition a7 = new ReversiPosition("a7", 0, 6);

    /** Position. */
    public static final ReversiPosition b7 = new ReversiPosition("b7", 1, 6);

    /** Position. */
    public static final ReversiPosition c7 = new ReversiPosition("c7", 2, 6);

    /** Position. */
    public static final ReversiPosition d7 = new ReversiPosition("d7", 3, 6);

    /** Position. */
    public static final ReversiPosition e7 = new ReversiPosition("e7", 4, 6);

    /** Position. */
    public static final ReversiPosition f7 = new ReversiPosition("f7", 5, 6);

    /** Position. */
    public static final ReversiPosition g7 = new ReversiPosition("g7", 6, 6);

    /** Position. */
    public static final ReversiPosition h7 = new ReversiPosition("h7", 7, 6);

    /** Position. */
    public static final ReversiPosition a8 = new ReversiPosition("a8", 0, 7);

    /** Position. */
    public static final ReversiPosition b8 = new ReversiPosition("b8", 1, 7);

    /** Position. */
    public static final ReversiPosition c8 = new ReversiPosition("c8", 2, 7);

    /** Position. */
    public static final ReversiPosition d8 = new ReversiPosition("d8", 3, 7);

    /** Position. */
    public static final ReversiPosition e8 = new ReversiPosition("e8", 4, 7);

    /** Position. */
    public static final ReversiPosition f8 = new ReversiPosition("f8", 5, 7);

    /** Position. */
    public static final ReversiPosition g8 = new ReversiPosition("g8", 6, 7);

    /** Position. */
    public static final ReversiPosition h8 = new ReversiPosition("h8", 7, 7);

    /** Alternate position name. */
    public static final ReversiPosition CENTER0 = d4;

    /** Alternate position name. */
    public static final ReversiPosition CENTER1 = e4;

    /** Alternate position name. */
    public static final ReversiPosition CENTER2 = d5;

    /** Alternate position name. */
    public static final ReversiPosition CENTER3 = e5;

    /** Alternate position name. */
    public static final ReversiPosition CORNER0 = a1;

    /** Alternate position name. */
    public static final ReversiPosition CORNER1 = h1;

    /** Alternate position name. */
    public static final ReversiPosition CORNER2 = a8;

    /** Alternate position name. */
    public static final ReversiPosition CORNER3 = h8;

    /** Map of index to position. */
    private static final Map<Integer, ReversiPosition> INDEX_TO_POSITION = new TreeMap<Integer, ReversiPosition>();

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

    /** Values. */
    private static final ReversiPosition[] VALUES;

    static
    {
        VALUES = INDEX_TO_POSITION.values().toArray(new ReversiPosition[MAX_X * MAX_Y]);
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
    public static ReversiPosition findByCoordinates(final int x, final int y)
    {
        return findByIndex(computeIndex(x, y));
    }

    /**
     * @param index Index.
     * 
     * @return the position for the given parameter.
     */
    public static ReversiPosition findByIndex(final Integer index)
    {
        ReversiPosition answer = null;

        if (index != null)
        {
            answer = INDEX_TO_POSITION.get(index);
        }

        return answer;
    }

    /**
     * @return values.
     */
    public static ReversiPosition[] values()
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
    private ReversiPosition(final String name, final int x, final int y)
    {
        this.name = name;
        this.x = x;
        this.y = y;
        this.index = computeIndex(x, y);
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
        return 0;
    }

    /**
     * @return true if this position is a corner.
     */
    public boolean isCorner()
    {
        return ((x == 0) && (y == 0)) || ((x == 7) && (y == 0)) || ((x == 0) && (y == 7)) || ((x == 7) && (y == 7));
    }

    /**
     * @return true if this position is a side.
     */
    public boolean isSide()
    {
        return (((x == 0) || (x == 7)) && ((0 < y) && (y < 7))) || (((y == 0) || (y == 7)) && ((0 < x) && (x < 7)));
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

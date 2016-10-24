package org.vizzini.example.boardgame.tictactoe;

import java.util.Map;
import java.util.TreeMap;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import org.vizzini.core.game.boardgame.BoardGamePosition;

/**
 * Provides a pseudo-enumeration of positions for tic-tac-toe.
 */
public final class TTTPosition implements BoardGamePosition
{
    /** Position. */
    public static final TTTPosition a1 = new TTTPosition("a1", 0, 0);

    /** Position. */
    public static final TTTPosition b1 = new TTTPosition("b1", 1, 0);

    /** Position. */
    public static final TTTPosition c1 = new TTTPosition("c1", 2, 0);

    /** Position. */
    public static final TTTPosition a2 = new TTTPosition("a2", 0, 1);

    /** Position. */
    public static final TTTPosition b2 = new TTTPosition("b2", 1, 1);

    /** Position. */
    public static final TTTPosition c2 = new TTTPosition("c2", 2, 1);

    /** Position. */
    public static final TTTPosition a3 = new TTTPosition("a3", 0, 2);

    /** Position. */
    public static final TTTPosition b3 = new TTTPosition("b3", 1, 2);

    /** Position. */
    public static final TTTPosition c3 = new TTTPosition("c3", 2, 2);

    /** Alternate position name. */
    public static final TTTPosition CENTER = b2;

    /** Alternate position name. */
    public static final TTTPosition CORNER0 = a1;

    /** Alternate position name. */
    public static final TTTPosition CORNER1 = c1;

    /** Alternate position name. */
    public static final TTTPosition CORNER2 = a3;

    /** Alternate position name. */
    public static final TTTPosition CORNER3 = c3;

    /** Map of index to position. */
    private static final Map<Integer, TTTPosition> INDEX_TO_POSITION = new TreeMap<Integer, TTTPosition>();

    static
    {
        INDEX_TO_POSITION.put(0, a1);
        INDEX_TO_POSITION.put(1, b1);
        INDEX_TO_POSITION.put(2, c1);
        INDEX_TO_POSITION.put(3, a2);
        INDEX_TO_POSITION.put(4, b2);
        INDEX_TO_POSITION.put(5, c2);
        INDEX_TO_POSITION.put(6, a3);
        INDEX_TO_POSITION.put(7, b3);
        INDEX_TO_POSITION.put(8, c3);
    }

    /** Maximum X coordinate value. */
    public static final int MAX_X = 3;

    /** Maximum Y coordinate value. */
    public static final int MAX_Y = 3;

    /** Values. */
    private static final TTTPosition[] VALUES;

    static
    {
        VALUES = INDEX_TO_POSITION.values().toArray(new TTTPosition[MAX_X * MAX_Y]);
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
    public static TTTPosition findByCoordinates(final int x, final int y)
    {
        return findByIndex(computeIndex(x, y));
    }

    /**
     * @param index Index.
     * 
     * @return the position for the given parameter.
     */
    public static TTTPosition findByIndex(final Integer index)
    {
        TTTPosition answer = null;

        if (index != null)
        {
            answer = INDEX_TO_POSITION.get(index);
        }

        return answer;
    }

    /**
     * @return values.
     */
    public static TTTPosition[] values()
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
    private TTTPosition(final String name, final int x, final int y)
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
     * @return true if this is a center.
     */
    public boolean isCenter()
    {
        return this == CENTER;
    }

    /**
     * @return true if this is a corner.
     */
    public boolean isCorner()
    {
        return ((x == 0) || (x == 2)) && ((y == 0) || (y == 2));
    }

    /**
     * @return true if this is a corner.
     */
    public boolean isSide()
    {
        return (((x == 0) || (x == 2)) && (y == 1)) || ((x == 1) && ((y == 0) || (y == 2)));
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

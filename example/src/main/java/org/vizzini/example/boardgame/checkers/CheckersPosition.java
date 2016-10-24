package org.vizzini.example.boardgame.checkers;

import java.util.Map;
import java.util.TreeMap;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import org.vizzini.core.game.boardgame.BoardGamePosition;

/**
 * Provides a pseudo-enumeration of positions for checkers. The constant names refer to the standardized notation.
 * 
 * @see <a href="http://en.wikipedia.org/wiki/English_draughts#Notation">English Draughts Notation</a>
 */
public final class CheckersPosition implements BoardGamePosition
{
    /** Position. */
    public static final CheckersPosition P01 = new CheckersPosition("01", 1, 0);

    /** Position. */
    public static final CheckersPosition P02 = new CheckersPosition("02", 3, 0);

    /** Position. */
    public static final CheckersPosition P03 = new CheckersPosition("03", 5, 0);

    /** Position. */
    public static final CheckersPosition P04 = new CheckersPosition("04", 7, 0);

    /** Position. */
    public static final CheckersPosition P05 = new CheckersPosition("05", 0, 1);

    /** Position. */
    public static final CheckersPosition P06 = new CheckersPosition("06", 2, 1);

    /** Position. */
    public static final CheckersPosition P07 = new CheckersPosition("07", 4, 1);

    /** Position. */
    public static final CheckersPosition P08 = new CheckersPosition("08", 6, 1);

    /** Position. */
    public static final CheckersPosition P09 = new CheckersPosition("09", 1, 2);

    /** Position. */
    public static final CheckersPosition P10 = new CheckersPosition("10", 3, 2);

    /** Position. */
    public static final CheckersPosition P11 = new CheckersPosition("11", 5, 2);

    /** Position. */
    public static final CheckersPosition P12 = new CheckersPosition("12", 7, 2);

    /** Position. */
    public static final CheckersPosition P13 = new CheckersPosition("13", 0, 3);

    /** Position. */
    public static final CheckersPosition P14 = new CheckersPosition("14", 2, 3);

    /** Position. */
    public static final CheckersPosition P15 = new CheckersPosition("15", 4, 3);

    /** Position. */
    public static final CheckersPosition P16 = new CheckersPosition("16", 6, 3);

    /** Position. */
    public static final CheckersPosition P17 = new CheckersPosition("17", 1, 4);

    /** Position. */
    public static final CheckersPosition P18 = new CheckersPosition("18", 3, 4);

    /** Position. */
    public static final CheckersPosition P19 = new CheckersPosition("19", 5, 4);

    /** Position. */
    public static final CheckersPosition P20 = new CheckersPosition("20", 7, 4);

    /** Position. */
    public static final CheckersPosition P21 = new CheckersPosition("21", 0, 5);

    /** Position. */
    public static final CheckersPosition P22 = new CheckersPosition("22", 2, 5);

    /** Position. */
    public static final CheckersPosition P23 = new CheckersPosition("23", 4, 5);

    /** Position. */
    public static final CheckersPosition P24 = new CheckersPosition("24", 6, 5);

    /** Position. */
    public static final CheckersPosition P25 = new CheckersPosition("25", 1, 6);

    /** Position. */
    public static final CheckersPosition P26 = new CheckersPosition("26", 3, 6);

    /** Position. */
    public static final CheckersPosition P27 = new CheckersPosition("27", 5, 6);

    /** Position. */
    public static final CheckersPosition P28 = new CheckersPosition("28", 7, 6);

    /** Position. */
    public static final CheckersPosition P29 = new CheckersPosition("29", 0, 7);

    /** Position. */
    public static final CheckersPosition P30 = new CheckersPosition("30", 2, 7);

    /** Position. */
    public static final CheckersPosition P31 = new CheckersPosition("31", 4, 7);

    /** Position. */
    public static final CheckersPosition P32 = new CheckersPosition("32", 6, 7);

    /** Map of index to position. */
    private static final Map<Integer, CheckersPosition> INDEX_TO_POSITION = new TreeMap<Integer, CheckersPosition>();

    static
    {
        INDEX_TO_POSITION.put(0, P01);
        INDEX_TO_POSITION.put(1, P02);
        INDEX_TO_POSITION.put(2, P03);
        INDEX_TO_POSITION.put(3, P04);
        INDEX_TO_POSITION.put(4, P05);
        INDEX_TO_POSITION.put(5, P06);
        INDEX_TO_POSITION.put(6, P07);
        INDEX_TO_POSITION.put(7, P08);
        INDEX_TO_POSITION.put(8, P09);
        INDEX_TO_POSITION.put(9, P10);
        INDEX_TO_POSITION.put(10, P11);
        INDEX_TO_POSITION.put(11, P12);
        INDEX_TO_POSITION.put(12, P13);
        INDEX_TO_POSITION.put(13, P14);
        INDEX_TO_POSITION.put(14, P15);
        INDEX_TO_POSITION.put(15, P16);
        INDEX_TO_POSITION.put(16, P17);
        INDEX_TO_POSITION.put(17, P18);
        INDEX_TO_POSITION.put(18, P19);
        INDEX_TO_POSITION.put(19, P20);
        INDEX_TO_POSITION.put(20, P21);
        INDEX_TO_POSITION.put(21, P22);
        INDEX_TO_POSITION.put(22, P23);
        INDEX_TO_POSITION.put(23, P24);
        INDEX_TO_POSITION.put(24, P25);
        INDEX_TO_POSITION.put(25, P26);
        INDEX_TO_POSITION.put(26, P27);
        INDEX_TO_POSITION.put(27, P28);
        INDEX_TO_POSITION.put(28, P29);
        INDEX_TO_POSITION.put(29, P30);
        INDEX_TO_POSITION.put(30, P31);
        INDEX_TO_POSITION.put(31, P32);
    }

    /** Maximum X coordinate value. */
    public static final int MAX_X = 8;

    /** Maximum Y coordinate value. */
    public static final int MAX_Y = 8;

    /** Values. */
    private static final CheckersPosition[] VALUES;

    static
    {
        VALUES = INDEX_TO_POSITION.values().toArray(new CheckersPosition[32]);
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

        if (isInRange(x, y) && isUsable(x, y))
        {
            answer = (x / 2) + (y * 4);
        }

        return answer;
    }

    /**
     * @param x X coordinate.
     * @param y Y coordinate.
     * 
     * @return the position for the given parameters.
     */
    public static CheckersPosition findByCoordinates(final int x, final int y)
    {
        return findByIndex(computeIndex(x, y));
    }

    /**
     * @param index Index.
     * 
     * @return the position for the given parameter.
     */
    public static CheckersPosition findByIndex(final Integer index)
    {
        CheckersPosition answer = null;

        if (index != null)
        {
            answer = INDEX_TO_POSITION.get(index);
        }

        return answer;
    }

    /**
     * @return values.
     */
    public static CheckersPosition[] values()
    {
        return VALUES;
    }

    /**
     * @param x X coordinate.
     * @param y Y coordinate.
     * 
     * @return true if the given coordinates are in range.
     */
    private static boolean isInRange(final int x, final int y)
    {
        return (0 <= x) && (x < MAX_X) && (0 <= y) && (y < MAX_Y);
    }

    /**
     * @param x X coordinate.
     * @param y Y coordinate.
     * 
     * @return true if the position is usable.
     */
    private static boolean isUsable(final int x, final int y)
    {
        return (x % 2) != (y % 2);
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
    private CheckersPosition(final String name, final int x, final int y)
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

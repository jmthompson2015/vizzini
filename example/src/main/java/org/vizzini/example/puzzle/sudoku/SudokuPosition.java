package org.vizzini.example.puzzle.sudoku;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import org.vizzini.core.game.boardgame.BoardGamePosition;

/**
 * Provides a pseudo-enumeration of positions for Sudoku.
 */
public final class SudokuPosition implements BoardGamePosition
{
    /** Position. */
    public static final SudokuPosition a1 = new SudokuPosition("a1", 0, 0);

    /** Position. */
    public static final SudokuPosition b1 = new SudokuPosition("b1", 1, 0);

    /** Position. */
    public static final SudokuPosition c1 = new SudokuPosition("c1", 2, 0);

    /** Position. */
    public static final SudokuPosition d1 = new SudokuPosition("d1", 3, 0);

    /** Position. */
    public static final SudokuPosition e1 = new SudokuPosition("e1", 4, 0);

    /** Position. */
    public static final SudokuPosition f1 = new SudokuPosition("f1", 5, 0);

    /** Position. */
    public static final SudokuPosition g1 = new SudokuPosition("g1", 6, 0);

    /** Position. */
    public static final SudokuPosition h1 = new SudokuPosition("h1", 7, 0);

    /** Position. */
    public static final SudokuPosition i1 = new SudokuPosition("i1", 8, 0);

    /** Position. */
    public static final SudokuPosition a2 = new SudokuPosition("a2", 0, 1);

    /** Position. */
    public static final SudokuPosition b2 = new SudokuPosition("b2", 1, 1);

    /** Position. */
    public static final SudokuPosition c2 = new SudokuPosition("c2", 2, 1);

    /** Position. */
    public static final SudokuPosition d2 = new SudokuPosition("d2", 3, 1);

    /** Position. */
    public static final SudokuPosition e2 = new SudokuPosition("e2", 4, 1);

    /** Position. */
    public static final SudokuPosition f2 = new SudokuPosition("f2", 5, 1);

    /** Position. */
    public static final SudokuPosition g2 = new SudokuPosition("g2", 6, 1);

    /** Position. */
    public static final SudokuPosition h2 = new SudokuPosition("h2", 7, 1);

    /** Position. */
    public static final SudokuPosition i2 = new SudokuPosition("i2", 8, 1);

    /** Position. */
    public static final SudokuPosition a3 = new SudokuPosition("a3", 0, 2);

    /** Position. */
    public static final SudokuPosition b3 = new SudokuPosition("b3", 1, 2);

    /** Position. */
    public static final SudokuPosition c3 = new SudokuPosition("c3", 2, 2);

    /** Position. */
    public static final SudokuPosition d3 = new SudokuPosition("d3", 3, 2);

    /** Position. */
    public static final SudokuPosition e3 = new SudokuPosition("e3", 4, 2);

    /** Position. */
    public static final SudokuPosition f3 = new SudokuPosition("f3", 5, 2);

    /** Position. */
    public static final SudokuPosition g3 = new SudokuPosition("g3", 6, 2);

    /** Position. */
    public static final SudokuPosition h3 = new SudokuPosition("h3", 7, 2);

    /** Position. */
    public static final SudokuPosition i3 = new SudokuPosition("i3", 8, 2);

    /** Position. */
    public static final SudokuPosition a4 = new SudokuPosition("a4", 0, 3);

    /** Position. */
    public static final SudokuPosition b4 = new SudokuPosition("b4", 1, 3);

    /** Position. */
    public static final SudokuPosition c4 = new SudokuPosition("c4", 2, 3);

    /** Position. */
    public static final SudokuPosition d4 = new SudokuPosition("d4", 3, 3);

    /** Position. */
    public static final SudokuPosition e4 = new SudokuPosition("e4", 4, 3);

    /** Position. */
    public static final SudokuPosition f4 = new SudokuPosition("f4", 5, 3);

    /** Position. */
    public static final SudokuPosition g4 = new SudokuPosition("g4", 6, 3);

    /** Position. */
    public static final SudokuPosition h4 = new SudokuPosition("h4", 7, 3);

    /** Position. */
    public static final SudokuPosition i4 = new SudokuPosition("i4", 8, 3);

    /** Position. */
    public static final SudokuPosition a5 = new SudokuPosition("a5", 0, 4);

    /** Position. */
    public static final SudokuPosition b5 = new SudokuPosition("b5", 1, 4);

    /** Position. */
    public static final SudokuPosition c5 = new SudokuPosition("c5", 2, 4);

    /** Position. */
    public static final SudokuPosition d5 = new SudokuPosition("d5", 3, 4);

    /** Position. */
    public static final SudokuPosition e5 = new SudokuPosition("e5", 4, 4);

    /** Position. */
    public static final SudokuPosition f5 = new SudokuPosition("f5", 5, 4);

    /** Position. */
    public static final SudokuPosition g5 = new SudokuPosition("g5", 6, 4);

    /** Position. */
    public static final SudokuPosition h5 = new SudokuPosition("h5", 7, 4);

    /** Position. */
    public static final SudokuPosition i5 = new SudokuPosition("i5", 8, 4);

    /** Position. */
    public static final SudokuPosition a6 = new SudokuPosition("a6", 0, 5);

    /** Position. */
    public static final SudokuPosition b6 = new SudokuPosition("b6", 1, 5);

    /** Position. */
    public static final SudokuPosition c6 = new SudokuPosition("c6", 2, 5);

    /** Position. */
    public static final SudokuPosition d6 = new SudokuPosition("d6", 3, 5);

    /** Position. */
    public static final SudokuPosition e6 = new SudokuPosition("e6", 4, 5);

    /** Position. */
    public static final SudokuPosition f6 = new SudokuPosition("f6", 5, 5);

    /** Position. */
    public static final SudokuPosition g6 = new SudokuPosition("g6", 6, 5);

    /** Position. */
    public static final SudokuPosition h6 = new SudokuPosition("h6", 7, 5);

    /** Position. */
    public static final SudokuPosition i6 = new SudokuPosition("i6", 8, 5);

    /** Position. */
    public static final SudokuPosition a7 = new SudokuPosition("a7", 0, 6);

    /** Position. */
    public static final SudokuPosition b7 = new SudokuPosition("b7", 1, 6);

    /** Position. */
    public static final SudokuPosition c7 = new SudokuPosition("c7", 2, 6);

    /** Position. */
    public static final SudokuPosition d7 = new SudokuPosition("d7", 3, 6);

    /** Position. */
    public static final SudokuPosition e7 = new SudokuPosition("e7", 4, 6);

    /** Position. */
    public static final SudokuPosition f7 = new SudokuPosition("f7", 5, 6);

    /** Position. */
    public static final SudokuPosition g7 = new SudokuPosition("g7", 6, 6);

    /** Position. */
    public static final SudokuPosition h7 = new SudokuPosition("h7", 7, 6);

    /** Position. */
    public static final SudokuPosition i7 = new SudokuPosition("i7", 8, 6);

    /** Position. */
    public static final SudokuPosition a8 = new SudokuPosition("a8", 0, 7);

    /** Position. */
    public static final SudokuPosition b8 = new SudokuPosition("b8", 1, 7);

    /** Position. */
    public static final SudokuPosition c8 = new SudokuPosition("c8", 2, 7);

    /** Position. */
    public static final SudokuPosition d8 = new SudokuPosition("d8", 3, 7);

    /** Position. */
    public static final SudokuPosition e8 = new SudokuPosition("e8", 4, 7);

    /** Position. */
    public static final SudokuPosition f8 = new SudokuPosition("f8", 5, 7);

    /** Position. */
    public static final SudokuPosition g8 = new SudokuPosition("g8", 6, 7);

    /** Position. */
    public static final SudokuPosition h8 = new SudokuPosition("h8", 7, 7);

    /** Position. */
    public static final SudokuPosition i8 = new SudokuPosition("i8", 8, 7);

    /** Position. */
    public static final SudokuPosition a9 = new SudokuPosition("a9", 0, 8);

    /** Position. */
    public static final SudokuPosition b9 = new SudokuPosition("b9", 1, 8);

    /** Position. */
    public static final SudokuPosition c9 = new SudokuPosition("c9", 2, 8);

    /** Position. */
    public static final SudokuPosition d9 = new SudokuPosition("d9", 3, 8);

    /** Position. */
    public static final SudokuPosition e9 = new SudokuPosition("e9", 4, 8);

    /** Position. */
    public static final SudokuPosition f9 = new SudokuPosition("f9", 5, 8);

    /** Position. */
    public static final SudokuPosition g9 = new SudokuPosition("g9", 6, 8);

    /** Position. */
    public static final SudokuPosition h9 = new SudokuPosition("h9", 7, 8);

    /** Position. */
    public static final SudokuPosition i9 = new SudokuPosition("i9", 8, 8);

    /** Map of index to position. */
    private static final Map<Integer, SudokuPosition> INDEX_TO_POSITION = new TreeMap<Integer, SudokuPosition>();

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
        INDEX_TO_POSITION.put(8, i1);
        INDEX_TO_POSITION.put(9, a2);
        INDEX_TO_POSITION.put(10, b2);
        INDEX_TO_POSITION.put(11, c2);
        INDEX_TO_POSITION.put(12, d2);
        INDEX_TO_POSITION.put(13, e2);
        INDEX_TO_POSITION.put(14, f2);
        INDEX_TO_POSITION.put(15, g2);
        INDEX_TO_POSITION.put(16, h2);
        INDEX_TO_POSITION.put(17, i2);
        INDEX_TO_POSITION.put(18, a3);
        INDEX_TO_POSITION.put(19, b3);
        INDEX_TO_POSITION.put(20, c3);
        INDEX_TO_POSITION.put(21, d3);
        INDEX_TO_POSITION.put(22, e3);
        INDEX_TO_POSITION.put(23, f3);
        INDEX_TO_POSITION.put(24, g3);
        INDEX_TO_POSITION.put(25, h3);
        INDEX_TO_POSITION.put(26, i3);
        INDEX_TO_POSITION.put(27, a4);
        INDEX_TO_POSITION.put(28, b4);
        INDEX_TO_POSITION.put(29, c4);
        INDEX_TO_POSITION.put(30, d4);
        INDEX_TO_POSITION.put(31, e4);
        INDEX_TO_POSITION.put(32, f4);
        INDEX_TO_POSITION.put(33, g4);
        INDEX_TO_POSITION.put(34, h4);
        INDEX_TO_POSITION.put(35, i4);
        INDEX_TO_POSITION.put(36, a5);
        INDEX_TO_POSITION.put(37, b5);
        INDEX_TO_POSITION.put(38, c5);
        INDEX_TO_POSITION.put(39, d5);
        INDEX_TO_POSITION.put(40, e5);
        INDEX_TO_POSITION.put(41, f5);
        INDEX_TO_POSITION.put(42, g5);
        INDEX_TO_POSITION.put(43, h5);
        INDEX_TO_POSITION.put(44, i5);
        INDEX_TO_POSITION.put(45, a6);
        INDEX_TO_POSITION.put(46, b6);
        INDEX_TO_POSITION.put(47, c6);
        INDEX_TO_POSITION.put(48, d6);
        INDEX_TO_POSITION.put(49, e6);
        INDEX_TO_POSITION.put(50, f6);
        INDEX_TO_POSITION.put(51, g6);
        INDEX_TO_POSITION.put(52, h6);
        INDEX_TO_POSITION.put(53, i6);
        INDEX_TO_POSITION.put(54, a7);
        INDEX_TO_POSITION.put(55, b7);
        INDEX_TO_POSITION.put(56, c7);
        INDEX_TO_POSITION.put(57, d7);
        INDEX_TO_POSITION.put(58, e7);
        INDEX_TO_POSITION.put(59, f7);
        INDEX_TO_POSITION.put(60, g7);
        INDEX_TO_POSITION.put(61, h7);
        INDEX_TO_POSITION.put(62, i7);
        INDEX_TO_POSITION.put(63, a8);
        INDEX_TO_POSITION.put(64, b8);
        INDEX_TO_POSITION.put(65, c8);
        INDEX_TO_POSITION.put(66, d8);
        INDEX_TO_POSITION.put(67, e8);
        INDEX_TO_POSITION.put(68, f8);
        INDEX_TO_POSITION.put(69, g8);
        INDEX_TO_POSITION.put(70, h8);
        INDEX_TO_POSITION.put(71, i8);
        INDEX_TO_POSITION.put(72, a9);
        INDEX_TO_POSITION.put(73, b9);
        INDEX_TO_POSITION.put(74, c9);
        INDEX_TO_POSITION.put(75, d9);
        INDEX_TO_POSITION.put(76, e9);
        INDEX_TO_POSITION.put(77, f9);
        INDEX_TO_POSITION.put(78, g9);
        INDEX_TO_POSITION.put(79, h9);
        INDEX_TO_POSITION.put(80, i9);
    }

    /** Maximum X coordinate value. */
    public static final int MAX_X = 9;

    /** Maximum Y coordinate value. */
    public static final int MAX_Y = 9;

    /** Maximum block value. */
    public static final int MAX_BLOCK = 9;

    /** Values. */
    private static final SudokuPosition[] VALUES;

    static
    {
        VALUES = INDEX_TO_POSITION.values().toArray(new SudokuPosition[MAX_X * MAX_Y]);
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
    public static SudokuPosition findByCoordinates(final int x, final int y)
    {
        return findByIndex(computeIndex(x, y));
    }

    /**
     * @param index Index.
     * 
     * @return the position for the given parameter.
     */
    public static SudokuPosition findByIndex(final Integer index)
    {
        SudokuPosition answer = null;

        if (index != null)
        {
            answer = INDEX_TO_POSITION.get(index);
        }

        return answer;
    }

    /**
     * @return values.
     */
    public static SudokuPosition[] values()
    {
        return VALUES;
    }

    /**
     * @param block Block.
     * 
     * @return values.
     */
    public static SudokuPosition[] valuesByBlock(final int block)
    {
        if ((block < 0) || (block > MAX_BLOCK))
        {
            throw new IndexOutOfBoundsException("block out of bounds [0, 9]: " + block);
        }

        final List<SudokuPosition> answer = new ArrayList<SudokuPosition>(9);

        for (final SudokuPosition position : values())
        {
            if (position.getBlock() == block)
            {
                answer.add(position);
            }
        }

        return answer.toArray(new SudokuPosition[answer.size()]);
    }

    /**
     * @param file File.
     * 
     * @return values.
     */
    public static SudokuPosition[] valuesByFile(final int file)
    {
        if ((file < 0) || (file > MAX_X))
        {
            throw new IndexOutOfBoundsException("file out of bounds [0, 9]: " + file);
        }

        final List<SudokuPosition> answer = new ArrayList<SudokuPosition>(9);

        for (final SudokuPosition position : values())
        {
            if (position.getX() == file)
            {
                answer.add(position);
            }
        }

        return answer.toArray(new SudokuPosition[answer.size()]);
    }

    /**
     * @param rank Rank.
     * 
     * @return values.
     */
    public static SudokuPosition[] valuesByRank(final int rank)
    {
        if ((rank < 0) || (rank > MAX_Y))
        {
            throw new IndexOutOfBoundsException("rank out of bounds [0, 9]: " + rank);
        }

        final List<SudokuPosition> answer = new ArrayList<SudokuPosition>(9);

        for (final SudokuPosition position : values())
        {
            if (position.getY() == rank)
            {
                answer.add(position);
            }
        }

        return answer.toArray(new SudokuPosition[answer.size()]);
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
    private SudokuPosition(final String name, final int x, final int y)
    {
        this.name = name;
        this.x = x;
        this.y = y;
        this.index = computeIndex(x, y);
    }

    /**
     * @return the block index.
     */
    public int getBlock()
    {
        int answer = -1;

        final int i = x / 3;
        final int j = y / 3;

        answer = (j * 3) + i;

        return answer;
    }

    /**
     * @return the block index.
     */
    // public int getBlock0()
    // {
    // int answer = -1;
    //
    // if ((0 <= x) && (x < 3))
    // {
    // if ((0 <= y) && (y < 3))
    // {
    // answer = 0;
    // }
    // else if ((3 <= y) && (y < 6))
    // {
    // answer = 3;
    // }
    // else if ((6 <= y) && (y < 9))
    // {
    // answer = 6;
    // }
    // }
    // else if ((3 <= x) && (x < 6))
    // {
    // if ((0 <= y) && (y < 3))
    // {
    // answer = 1;
    // }
    // else if ((3 <= y) && (y < 6))
    // {
    // answer = 4;
    // }
    // else if ((6 <= y) && (y < 9))
    // {
    // answer = 7;
    // }
    // }
    // else if ((6 <= x) && (x < 9))
    // {
    // if ((0 <= y) && (y < 3))
    // {
    // answer = 2;
    // }
    // else if ((3 <= y) && (y < 6))
    // {
    // answer = 5;
    // }
    // else if ((6 <= y) && (y < 9))
    // {
    // answer = 8;
    // }
    // }
    //
    // return answer;
    // }

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
    // public boolean isCenter()
    // {
    // return this == CENTER;
    // }

    /**
     * @return true if this is a corner.
     */
    // public boolean isCorner()
    // {
    // return ((x == 0) || (x == 2)) && ((y == 0) || (y == 2));
    // }

    /**
     * @return true if this is a corner.
     */
    // public boolean isSide()
    // {
    // return (((x == 0) || (x == 2)) && (y == 1)) || ((x == 1) && ((y == 0) || (y == 2)));
    // }

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

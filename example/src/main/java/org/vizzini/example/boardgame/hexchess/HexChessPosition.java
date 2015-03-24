package org.vizzini.example.boardgame.hexchess;

import java.util.Map;
import java.util.TreeMap;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import org.vizzini.core.game.boardgame.BoardGamePosition;

/**
 * Provides a hexagonal position. This class uses both Cube Coordinates and Axial Coordinates. Note that x + y + z = 0.
 * <p>
 * The game is played on a regular hexagonal board with 91 hex cells having three colors (light, dark, and mid-tone),
 * with the middle cell (or "hex") usually mid-tone.[3] The usual set of chess pieces is increased by one bishop and one
 * pawn. The board has 11 files, marked by letters a-l (letter j is not used), and 11 ranks (which bend 60 degrees at
 * file f). Ranks 1-6 each contain 11 cells, rank 7 (filled with black pawns in the initial setup) has 9 cells, rank 8
 * has 7, and so on. Rank 11 contains exactly one cell: f11.
 * </p>
 * 
 * @see <a href="http://en.wikipedia.org/wiki/Hexagonal_chess">Hexagonal chess (Wikipedia)</a>
 * @see <a href="http://www.redblobgames.com/grids/hexagons/">Hexagonal Grids</a>
 */
public final class HexChessPosition implements BoardGamePosition
{
    /** Position. */
    public static final HexChessPosition a1 = new HexChessPosition("a1", -5, 5);

    /** Position. */
    public static final HexChessPosition b1 = new HexChessPosition("b1", -4, 5);

    /** Position. */
    public static final HexChessPosition c1 = new HexChessPosition("c1", -3, 5);

    /** Position. */
    public static final HexChessPosition d1 = new HexChessPosition("d1", -2, 5);

    /** Position. */
    public static final HexChessPosition e1 = new HexChessPosition("e1", -1, 5);

    /** Position. */
    public static final HexChessPosition f1 = new HexChessPosition("f1", 0, 5);

    /** Position. */
    public static final HexChessPosition a2 = new HexChessPosition("a2", -5, 4);

    /** Position. */
    public static final HexChessPosition b2 = new HexChessPosition("b2", -4, 4);

    /** Position. */
    public static final HexChessPosition c2 = new HexChessPosition("c2", -3, 4);

    /** Position. */
    public static final HexChessPosition d2 = new HexChessPosition("d2", -2, 4);

    /** Position. */
    public static final HexChessPosition e2 = new HexChessPosition("e2", -1, 4);

    /** Position. */
    public static final HexChessPosition f2 = new HexChessPosition("f2", 0, 4);

    /** Position. */
    public static final HexChessPosition g1 = new HexChessPosition("g1", 1, 4);

    /** Position. */
    public static final HexChessPosition a3 = new HexChessPosition("a3", -5, 3);

    /** Position. */
    public static final HexChessPosition b3 = new HexChessPosition("b3", -4, 3);

    /** Position. */
    public static final HexChessPosition c3 = new HexChessPosition("c3", -3, 3);

    /** Position. */
    public static final HexChessPosition d3 = new HexChessPosition("d3", -2, 3);

    /** Position. */
    public static final HexChessPosition e3 = new HexChessPosition("e3", -1, 3);

    /** Position. */
    public static final HexChessPosition f3 = new HexChessPosition("f3", 0, 3);

    /** Position. */
    public static final HexChessPosition g2 = new HexChessPosition("g2", 1, 3);

    /** Position. */
    public static final HexChessPosition h1 = new HexChessPosition("h1", 2, 3);

    /** Position. */
    public static final HexChessPosition a4 = new HexChessPosition("a4", -5, 2);

    /** Position. */
    public static final HexChessPosition b4 = new HexChessPosition("b4", -4, 2);

    /** Position. */
    public static final HexChessPosition c4 = new HexChessPosition("c4", -3, 2);

    /** Position. */
    public static final HexChessPosition d4 = new HexChessPosition("d4", -2, 2);

    /** Position. */
    public static final HexChessPosition e4 = new HexChessPosition("e4", -1, 2);

    /** Position. */
    public static final HexChessPosition f4 = new HexChessPosition("f4", 0, 2);

    /** Position. */
    public static final HexChessPosition g3 = new HexChessPosition("g3", 1, 2);

    /** Position. */
    public static final HexChessPosition h2 = new HexChessPosition("h2", 2, 2);

    /** Position. */
    public static final HexChessPosition i1 = new HexChessPosition("i1", 3, 2);

    /** Position. */
    public static final HexChessPosition a5 = new HexChessPosition("a5", -5, 1);

    /** Position. */
    public static final HexChessPosition b5 = new HexChessPosition("b5", -4, 1);

    /** Position. */
    public static final HexChessPosition c5 = new HexChessPosition("c5", -3, 1);

    /** Position. */
    public static final HexChessPosition d5 = new HexChessPosition("d5", -2, 1);

    /** Position. */
    public static final HexChessPosition e5 = new HexChessPosition("e5", -1, 1);

    /** Position. */
    public static final HexChessPosition f5 = new HexChessPosition("f5", 0, 1);

    /** Position. */
    public static final HexChessPosition g4 = new HexChessPosition("g4", 1, 1);

    /** Position. */
    public static final HexChessPosition h3 = new HexChessPosition("h3", 2, 1);

    /** Position. */
    public static final HexChessPosition i2 = new HexChessPosition("i2", 3, 1);

    /** Position. */
    public static final HexChessPosition k1 = new HexChessPosition("k1", 4, 1);

    /** Position. */
    public static final HexChessPosition a6 = new HexChessPosition("a6", -5, 0);

    /** Position. */
    public static final HexChessPosition b6 = new HexChessPosition("b6", -4, 0);

    /** Position. */
    public static final HexChessPosition c6 = new HexChessPosition("c6", -3, 0);

    /** Position. */
    public static final HexChessPosition d6 = new HexChessPosition("d6", -2, 0);

    /** Position. */
    public static final HexChessPosition e6 = new HexChessPosition("e6", -1, 0);

    /** Position. */
    public static final HexChessPosition f6 = new HexChessPosition("f6", 0, 0);

    /** Position. */
    public static final HexChessPosition g5 = new HexChessPosition("g5", 1, 0);

    /** Position. */
    public static final HexChessPosition h4 = new HexChessPosition("h4", 2, 0);

    /** Position. */
    public static final HexChessPosition i3 = new HexChessPosition("i3", 3, 0);

    /** Position. */
    public static final HexChessPosition k2 = new HexChessPosition("k2", 4, 0);

    /** Position. */
    public static final HexChessPosition l1 = new HexChessPosition("l1", 5, 0);

    /** Position. */
    public static final HexChessPosition b7 = new HexChessPosition("b7", -4, -1);

    /** Position. */
    public static final HexChessPosition c7 = new HexChessPosition("c7", -3, -1);

    /** Position. */
    public static final HexChessPosition d7 = new HexChessPosition("d7", -2, -1);

    /** Position. */
    public static final HexChessPosition e7 = new HexChessPosition("e7", -1, -1);

    /** Position. */
    public static final HexChessPosition f7 = new HexChessPosition("f7", 0, -1);

    /** Position. */
    public static final HexChessPosition g6 = new HexChessPosition("g6", 1, -1);

    /** Position. */
    public static final HexChessPosition h5 = new HexChessPosition("h5", 2, -1);

    /** Position. */
    public static final HexChessPosition i4 = new HexChessPosition("i4", 3, -1);

    /** Position. */
    public static final HexChessPosition k3 = new HexChessPosition("k3", 4, -1);

    /** Position. */
    public static final HexChessPosition l2 = new HexChessPosition("l2", 5, -1);

    /** Position. */
    public static final HexChessPosition c8 = new HexChessPosition("c8", -3, -2);

    /** Position. */
    public static final HexChessPosition d8 = new HexChessPosition("d8", -2, -2);

    /** Position. */
    public static final HexChessPosition e8 = new HexChessPosition("e8", -1, -2);

    /** Position. */
    public static final HexChessPosition f8 = new HexChessPosition("f8", 0, -2);

    /** Position. */
    public static final HexChessPosition g7 = new HexChessPosition("g7", 1, -2);

    /** Position. */
    public static final HexChessPosition h6 = new HexChessPosition("h6", 2, -2);

    /** Position. */
    public static final HexChessPosition i5 = new HexChessPosition("i5", 3, -2);

    /** Position. */
    public static final HexChessPosition k4 = new HexChessPosition("k4", 4, -2);

    /** Position. */
    public static final HexChessPosition l3 = new HexChessPosition("l3", 5, -2);

    /** Position. */
    public static final HexChessPosition d9 = new HexChessPosition("d9", -2, -3);

    /** Position. */
    public static final HexChessPosition e9 = new HexChessPosition("e9", -1, -3);

    /** Position. */
    public static final HexChessPosition f9 = new HexChessPosition("f9", 0, -3);

    /** Position. */
    public static final HexChessPosition g8 = new HexChessPosition("g8", 1, -3);

    /** Position. */
    public static final HexChessPosition h7 = new HexChessPosition("h7", 2, -3);

    /** Position. */
    public static final HexChessPosition i6 = new HexChessPosition("i6", 3, -3);

    /** Position. */
    public static final HexChessPosition k5 = new HexChessPosition("k5", 4, -3);

    /** Position. */
    public static final HexChessPosition l4 = new HexChessPosition("l4", 5, -3);

    /** Position. */
    public static final HexChessPosition e10 = new HexChessPosition("e10", -1, -4);

    /** Position. */
    public static final HexChessPosition f10 = new HexChessPosition("f10", 0, -4);

    /** Position. */
    public static final HexChessPosition g9 = new HexChessPosition("g9", 1, -4);

    /** Position. */
    public static final HexChessPosition h8 = new HexChessPosition("h8", 2, -4);

    /** Position. */
    public static final HexChessPosition i7 = new HexChessPosition("i7", 3, -4);

    /** Position. */
    public static final HexChessPosition k6 = new HexChessPosition("k6", 4, -4);

    /** Position. */
    public static final HexChessPosition l5 = new HexChessPosition("l5", 5, -4);

    /** Position. */
    public static final HexChessPosition f11 = new HexChessPosition("f11", 0, -5);

    /** Position. */
    public static final HexChessPosition g10 = new HexChessPosition("g10", 1, -5);

    /** Position. */
    public static final HexChessPosition h9 = new HexChessPosition("h9", 2, -5);

    /** Position. */
    public static final HexChessPosition i8 = new HexChessPosition("i8", 3, -5);

    /** Position. */
    public static final HexChessPosition k7 = new HexChessPosition("k7", 4, -5);

    /** Position. */
    public static final HexChessPosition l6 = new HexChessPosition("l6", 5, -5);

    /** Map of index to position. */
    private static final Map<Integer, HexChessPosition> INDEX_TO_POSITION = new TreeMap<Integer, HexChessPosition>();

    static
    {
        INDEX_TO_POSITION.put(0, a1);
        INDEX_TO_POSITION.put(1, b1);
        INDEX_TO_POSITION.put(2, c1);
        INDEX_TO_POSITION.put(3, d1);
        INDEX_TO_POSITION.put(4, e1);
        INDEX_TO_POSITION.put(5, f1);
        INDEX_TO_POSITION.put(11, a2);
        INDEX_TO_POSITION.put(12, b2);
        INDEX_TO_POSITION.put(13, c2);
        INDEX_TO_POSITION.put(14, d2);
        INDEX_TO_POSITION.put(15, e2);
        INDEX_TO_POSITION.put(16, f2);
        INDEX_TO_POSITION.put(17, g1);
        INDEX_TO_POSITION.put(22, a3);
        INDEX_TO_POSITION.put(23, b3);
        INDEX_TO_POSITION.put(24, c3);
        INDEX_TO_POSITION.put(25, d3);
        INDEX_TO_POSITION.put(26, e3);
        INDEX_TO_POSITION.put(27, f3);
        INDEX_TO_POSITION.put(28, g2);
        INDEX_TO_POSITION.put(29, h1);
        INDEX_TO_POSITION.put(33, a4);
        INDEX_TO_POSITION.put(34, b4);
        INDEX_TO_POSITION.put(35, c4);
        INDEX_TO_POSITION.put(36, d4);
        INDEX_TO_POSITION.put(37, e4);
        INDEX_TO_POSITION.put(38, f4);
        INDEX_TO_POSITION.put(39, g3);
        INDEX_TO_POSITION.put(40, h2);
        INDEX_TO_POSITION.put(41, i1);
        INDEX_TO_POSITION.put(44, a5);
        INDEX_TO_POSITION.put(45, b5);
        INDEX_TO_POSITION.put(46, c5);
        INDEX_TO_POSITION.put(47, d5);
        INDEX_TO_POSITION.put(48, e5);
        INDEX_TO_POSITION.put(49, f5);
        INDEX_TO_POSITION.put(50, g4);
        INDEX_TO_POSITION.put(51, h3);
        INDEX_TO_POSITION.put(52, i2);
        INDEX_TO_POSITION.put(53, k1);
        INDEX_TO_POSITION.put(55, a6);
        INDEX_TO_POSITION.put(56, b6);
        INDEX_TO_POSITION.put(57, c6);
        INDEX_TO_POSITION.put(58, d6);
        INDEX_TO_POSITION.put(59, e6);
        INDEX_TO_POSITION.put(60, f6);
        INDEX_TO_POSITION.put(61, g5);
        INDEX_TO_POSITION.put(62, h4);
        INDEX_TO_POSITION.put(63, i3);
        INDEX_TO_POSITION.put(64, k2);
        INDEX_TO_POSITION.put(65, l1);
        INDEX_TO_POSITION.put(67, b7);
        INDEX_TO_POSITION.put(68, c7);
        INDEX_TO_POSITION.put(69, d7);
        INDEX_TO_POSITION.put(70, e7);
        INDEX_TO_POSITION.put(71, f7);
        INDEX_TO_POSITION.put(72, g6);
        INDEX_TO_POSITION.put(73, h5);
        INDEX_TO_POSITION.put(74, i4);
        INDEX_TO_POSITION.put(75, k3);
        INDEX_TO_POSITION.put(76, l2);
        INDEX_TO_POSITION.put(79, c8);
        INDEX_TO_POSITION.put(80, d8);
        INDEX_TO_POSITION.put(81, e8);
        INDEX_TO_POSITION.put(82, f8);
        INDEX_TO_POSITION.put(83, g7);
        INDEX_TO_POSITION.put(84, h6);
        INDEX_TO_POSITION.put(85, i5);
        INDEX_TO_POSITION.put(86, k4);
        INDEX_TO_POSITION.put(87, l3);
        INDEX_TO_POSITION.put(91, d9);
        INDEX_TO_POSITION.put(92, e9);
        INDEX_TO_POSITION.put(93, f9);
        INDEX_TO_POSITION.put(94, g8);
        INDEX_TO_POSITION.put(95, h7);
        INDEX_TO_POSITION.put(96, i6);
        INDEX_TO_POSITION.put(97, k5);
        INDEX_TO_POSITION.put(98, l4);
        INDEX_TO_POSITION.put(103, e10);
        INDEX_TO_POSITION.put(104, f10);
        INDEX_TO_POSITION.put(105, g9);
        INDEX_TO_POSITION.put(106, h8);
        INDEX_TO_POSITION.put(107, i7);
        INDEX_TO_POSITION.put(108, k6);
        INDEX_TO_POSITION.put(109, l5);
        INDEX_TO_POSITION.put(115, f11);
        INDEX_TO_POSITION.put(116, g10);
        INDEX_TO_POSITION.put(117, h9);
        INDEX_TO_POSITION.put(118, i8);
        INDEX_TO_POSITION.put(119, k7);
        INDEX_TO_POSITION.put(120, l6);
    }

    /** Minimum Q coordinate value. */
    public static final int MIN_Q = -5;

    /** Maximum Q coordinate value. */
    public static final int MAX_Q = 6;

    /** Minimum R coordinate value. */
    public static final int MIN_R = -5;

    /** Maximum R coordinate value. */
    public static final int MAX_R = 6;

    /** Values. */
    private static final HexChessPosition[] VALUES;

    static
    {
        VALUES = INDEX_TO_POSITION.values().toArray(new HexChessPosition[91]);
    }

    /**
     * @param q Axial coordinate q.
     * @param r Axial coordinate r.
     * 
     * @return the index.
     */
    public static Integer computeIndex(final int q, final int r)
    {
        Integer answer = null;

        if ((MIN_Q <= q) && (q < MAX_Q) && (MIN_R <= r) && (r < MAX_R))
        {
            answer = (q + 5) + ((5 - r) * 11);
        }

        return answer;
    }

    /**
     * @param x Cube coordinate x.
     * @param y Cube coordinate y.
     * @param z Cube coordinate z.
     * 
     * @return the index.
     */
    public static Integer computeIndex(final int x, final int y, final int z)
    {
        Integer answer = null;

        if ((x + y + z) == 0)
        {
            final int q = x;
            final int r = z;

            answer = computeIndex(q, r);
        }

        return answer;
    }

    /**
     * @param q Axial coordinate q.
     * @param r Axial coordinate r.
     * 
     * @return the position for the given parameters.
     */
    public static HexChessPosition findByCoordinates(final int q, final int r)
    {
        return findByIndex(computeIndex(q, r));
    }

    /**
     * @param x Cube coordinate x.
     * @param y Cube coordinate y.
     * @param z Cube coordinate z.
     * 
     * @return the position for the given parameters.
     */
    public static HexChessPosition findByCoordinates(final int x, final int y, final int z)
    {
        return findByIndex(computeIndex(x, y, z));
    }

    /**
     * @param index Index.
     * 
     * @return the position for the given parameter.
     */
    public static HexChessPosition findByIndex(final Integer index)
    {
        HexChessPosition answer = null;

        if (index != null)
        {
            answer = INDEX_TO_POSITION.get(index);
        }

        return answer;
    }

    /**
     * @param q Axial coordinate q.
     * @param r Axial coordinate r.
     * 
     * @return true if the coordinates are on the used portion of the board.
     */
    public static boolean isUsable(final int q, final int r)
    {
        return isUsable(computeIndex(q, r));
    }

    /**
     * @param x Cube coordinate x.
     * @param y Cube coordinate y.
     * @param z Cube coordinate z.
     * 
     * @return true if the coordinates are on the used portion of the board.
     */
    public static boolean isUsable(final int x, final int y, final int z)
    {
        return isUsable(computeIndex(x, y, z));
    }

    /**
     * @param index Index.
     * 
     * @return true if the index is on the used portion of the board.
     */
    public static boolean isUsable(final Integer index)
    {
        boolean answer = false;

        if (index != null)
        {
            final HexChessPosition position = INDEX_TO_POSITION.get(index);
            answer = (position != null);
        }

        return answer;
    }

    /**
     * @return values.
     */
    public static HexChessPosition[] values()
    {
        return VALUES;
    }

    /** Index. */
    private final int index;

    /** Name. */
    private final String name;

    /** Axial coordinate. */
    private final int q;

    /** Axial coordinate. */
    private final int r;

    /** Cube coordinate. */
    private final int x;

    /** Cube coordinate. */
    private final int y;

    /** Cube coordinate. */
    private final int z;

    /**
     * Construct this object.
     * 
     * @param name Name.
     * @param q Axial coordinate q.
     * @param r Axial coordinate r.
     */
    @SuppressWarnings("hiding")
    private HexChessPosition(final String name, final int q, final int r)
    {
        this.name = name;
        this.q = q;
        this.r = r;
        this.index = computeIndex(q, r);

        // Axial to cube.
        x = q;
        z = r;
        y = -x - z;
    }

    /**
     * @param another Another hex position.
     * 
     * @return the distance between this and another.
     */
    public int distance(final HexChessPosition another)
    {
        final int dx = Math.abs(getX() - another.getX());
        final int dy = Math.abs(getY() - another.getY());
        final int dz = Math.abs(getZ() - another.getZ());

        return Math.max(dx, Math.max(dy, dz));
    }

    @Override
    public int getIndex()
    {
        return index;
    }

    /**
     * @return the q
     */
    public int getQ()
    {
        return q;
    }

    /**
     * @return the r
     */
    public int getR()
    {
        return r;
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

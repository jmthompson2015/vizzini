package org.vizzini.example.boardgame.hexchess;

import java.util.ArrayList;
import java.util.List;

/**
 * Provides an enumeration of directions.
 */
public enum Direction
{
    /** +q / +x direction. */
    X_PLUS(1, -1, 0),
    /** +y direction */
    Y_PLUS(1, 0, -1),
    /** +r / +z direction */
    Z_PLUS(0, 1, -1),
    /** -q / -x direction. */
    X_MINUS(-1, 1, 0),
    /** -y direction */
    Y_MINUS(-1, 0, 1),
    /** -r / -z direction */
    Z_MINUS(0, -1, 1),
    /** 30 degrees. */
    DIR30(1, 1, -2),
    /** 90 degrees. */
    DIR90(2, -1, -1),
    /** 150 degrees. */
    DIR150(1, -2, 1),
    /** 210 degrees. */
    DIR210(-1, -1, 2),
    /** 270 degrees. */
    DIR270(-2, 1, 1),
    /** 330 degrees. */
    DIR330(-1, 2, -1);

    /** Uniaxial directions. */
    private static Direction[] UNIAXIALS;

    /** Biaxial directions. */
    private static Direction[] BIAXIALS;

    /**
     * @param dx Delta X.
     * @param dy Delta Y.
     * @param dz Delta Z.
     * 
     * @return the position for the given parameters.
     */
    public static Direction findByComponents(final int dx, final int dy, final int dz)
    {
        Direction answer = null;

        for (final Direction d : values())
        {
            if ((d.getDx() == dx) && (d.getDy() == dy) && (d.getDz() == dz))
            {
                answer = d;
                break;
            }
        }

        return answer;
    }

    /**
     * @return the biaxial directions.
     */
    public static Direction[] getBiaxialDirections()
    {
        if (BIAXIALS == null)
        {
            final List<Direction> list = new ArrayList<Direction>();

            for (final Direction d : values())
            {
                if (isBiaxial(d.dx, d.dy, d.dz))
                {
                    list.add(d);
                }
            }

            BIAXIALS = list.toArray(new Direction[list.size()]);
        }

        return BIAXIALS;
    }

    /**
     * @return the uniaxial directions.
     */
    public static Direction[] getUniaxialDirections()
    {
        if (UNIAXIALS == null)
        {
            final List<Direction> list = new ArrayList<Direction>();

            for (final Direction d : values())
            {
                if (isUniaxial(d.dx, d.dy, d.dz))
                {
                    list.add(d);
                }
            }

            UNIAXIALS = list.toArray(new Direction[list.size()]);
        }

        return UNIAXIALS;
    }

    /**
     * @param dx Delta X.
     * @param dy Delta Y.
     * @param dz Delta Z.
     * 
     * @return true if the given parameters represent a biaxial move.
     */
    public static boolean isBiaxial(final int dx, final int dy, final int dz)
    {
        return (((dx == dy) && (Math.abs(dz) == 2)) || ((dx == dz) && (Math.abs(dy) == 2)) || ((dy == dz) && (Math
                .abs(dx) == 2)));
    }

    /**
     * @param dx Delta X.
     * @param dy Delta Y.
     * @param dz Delta Z.
     * 
     * @return true if the given parameters represent a uniaxial move.
     */
    public static boolean isUniaxial(final int dx, final int dy, final int dz)
    {
        final int myDx = Math.abs(dx);
        final int myDy = Math.abs(dy);
        final int myDz = Math.abs(dz);

        return (((myDx == 1) && (myDy == 1) && (myDz == 0)) || ((myDx == 1) && (myDy == 0) && (myDz == 1)) || ((myDx == 0)
                && (myDy == 1) && (myDz == 1)));
    }

    /** Delta X. */
    private int dx;

    /** Delta Y. */
    private int dy;

    /** Delta Z. */
    private int dz;

    /**
     * Construct this object.
     * 
     * @param dx Delta X.
     * @param dy Delta Y.
     * @param dz Delta Z.
     */
    @SuppressWarnings("hiding")
    private Direction(final int dx, final int dy, final int dz)
    {
        this.dx = dx;
        this.dy = dy;
        this.dz = dz;
    }

    /**
     * @return the dx
     */
    public int getDx()
    {
        return dx;
    }

    /**
     * @return the dy
     */
    public int getDy()
    {
        return dy;
    }

    /**
     * @return the dz
     */
    public int getDz()
    {
        return dz;
    }
}

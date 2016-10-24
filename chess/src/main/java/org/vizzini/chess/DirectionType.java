package org.vizzini.chess;

import java.util.ArrayList;
import java.util.List;

/**
 * Provides an enumeration of directions.
 */
public enum DirectionType
{
    /** In plane 0 deg. */
    DIR0(0, 1, 0),
    /** In plane 45 deg. */
    DIR45(1, 1, 0),
    /** In plane 90 deg. */
    DIR90(1, 0, 0),
    /** In plane 135 deg. */
    DIR135(1, -1, 0),
    /** In plane 180 deg. */
    DIR180(0, -1, 0),
    /** In plane 225 deg. */
    DIR225(-1, -1, 0),
    /** In plane 270 deg. */
    DIR270(-1, 0, 0),
    /** In plane 225 deg. */
    DIR315(-1, 1, 0),
    /** Straight up. */
    UP(0, 0, 1),
    /** Up 0 deg. */
    UP0(0, 1, 1),
    /** Up 45 deg. */
    UP45(1, 1, 1),
    /** Up 90 deg. */
    UP90(1, 0, 1),
    /** Up 135 deg. */
    UP135(1, -1, 1),
    /** Up 180 deg. */
    UP180(0, -1, 1),
    /** Up 225 deg. */
    UP225(-1, -1, 1),
    /** Up 270 deg. */
    UP270(-1, 0, 1),
    /** Up 225 deg. */
    UP315(-1, 1, 1),
    /** Straight down. */
    DOWN(0, 0, -1),
    /** Down 0 deg. */
    DOWN0(0, 1, -1),
    /** Down 45 deg. */
    DOWN45(1, 1, -1),
    /** Down 90 deg. */
    DOWN90(1, 0, -1),
    /** Down 135 deg. */
    DOWN135(1, -1, -1),
    /** Down 180 deg. */
    DOWN180(0, -1, -1),
    /** Down 225 deg. */
    DOWN225(-1, -1, -1),
    /** Down 270 deg. */
    DOWN270(-1, 0, -1),
    /** Down 225 deg. */
    DOWN315(-1, 1, -1);

    /** Uniaxial directions. */
    private static DirectionType[] UNIAXIALS;

    /** Biaxial directions. */
    private static DirectionType[] BIAXIALS;

    /** Triaxial directions. */
    private static DirectionType[] TRIAXIALS;

    /**
     * @return the biaxial directions.
     */
    public static DirectionType[] getBiaxialDirections()
    {
        if (BIAXIALS == null)
        {
            final List<DirectionType> list = new ArrayList<DirectionType>();

            for (final DirectionType d : values())
            {
                if (isBiaxial(d.dx, d.dy, d.dz))
                {
                    list.add(d);
                }
            }

            BIAXIALS = list.toArray(new DirectionType[list.size()]);
        }

        return BIAXIALS;
    }

    /**
     * @return the triaxial directions.
     */
    public static DirectionType[] getTriaxialDirections()
    {
        if (TRIAXIALS == null)
        {
            final List<DirectionType> list = new ArrayList<DirectionType>();

            for (final DirectionType d : values())
            {
                if (isTriaxial(d.dx, d.dy, d.dz))
                {
                    list.add(d);
                }
            }

            TRIAXIALS = list.toArray(new DirectionType[list.size()]);
        }

        return TRIAXIALS;
    }

    /**
     * @return the uniaxial directions.
     */
    public static DirectionType[] getUniaxialDirections()
    {
        if (UNIAXIALS == null)
        {
            final List<DirectionType> list = new ArrayList<DirectionType>();

            for (final DirectionType d : values())
            {
                if (isUniaxial(d.dx, d.dy, d.dz))
                {
                    list.add(d);
                }
            }

            UNIAXIALS = list.toArray(new DirectionType[list.size()]);
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
        return (((Math.abs(dx) == 1) && (Math.abs(dy) == 1) && (dz == 0))
                || ((Math.abs(dx) == 1) && (dy == 0) && (Math.abs(dz) == 1)) || ((dx == 0) && (Math.abs(dy) == 1) && (Math
                .abs(dz) == 1)));
    }

    /**
     * @param dx Delta X.
     * @param dy Delta Y.
     * @param dz Delta Z.
     * 
     * @return true if the given parameters represent a triaxial move.
     */
    public static boolean isTriaxial(final int dx, final int dy, final int dz)
    {
        return ((Math.abs(dx) == 1) && (Math.abs(dy) == 1) && (Math.abs(dz) == 1));
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
        return (((Math.abs(dx) == 1) && (dy == 0) && (dz == 0)) || ((dx == 0) && (Math.abs(dy) == 1) && (dz == 0)) || ((dx == 0)
                && (dy == 0) && (Math.abs(dz) == 1)));
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
    private DirectionType(final int dx, final int dy, final int dz)
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

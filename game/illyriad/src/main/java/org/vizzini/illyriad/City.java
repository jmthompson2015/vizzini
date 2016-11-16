package org.vizzini.illyriad;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

import org.apache.commons.lang3.StringUtils;

/**
 * Provides an enumeration of cities belonging to Zarek Lock.
 */
public enum City
{
    /** City. */
    LOCKSTONE("Lockstone", -522, -482),
    /** City. */
    LOCK_DOWNS("Lock Downs", -533, -111),
    /** City. */
    LOCK_HAVEN("Lock Haven", -387, -559),
    /** City. */
    LOCK_STEPPE("Lock Steppe", -347, -294),
    /** City. */
    LOCKAND_KEY("Lockand Key", -705, -364),
    /** City. */
    LOCKMOOR("Lockmoor", -19, -990),
    /** City. */
    LOCKS_HEATH("Locks Heath", -466, -549),
    /** City. */
    LOCKSLEY("Locksley", -130, -179),
    /** City. */
    LOCKSTAR("Lockstar", -520, -343);

    /**
     * @return the capital city.
     */
    public static final City getCapital()
    {
        return LOCKSTONE;
    }

    /**
     * @param displayName Display name.
     * 
     * @return the first city with the given display name.
     */
    public static final City valueOfDisplayName(final String displayName)
    {
        City answer = null;

        if (StringUtils.isNotEmpty(displayName))
        {
            for (final City city : values())
            {
                if (city.getDisplayName().equals(displayName))
                {
                    answer = city;
                    break;
                }
            }
        }

        return answer;
    }

    /** Display name. */
    private final String displayName;

    /** X coordinate. */
    private final int x;

    /** Y coordinate. */
    private final int y;

    /**
     * Construct this object.
     * 
     * @param displayName Display name.
     * @param x X coordinate.
     * @param y Y coordinate.
     */
    @SuppressWarnings("hiding")
    private City(final String displayName, final int x, final int y)
    {
        this.displayName = displayName;
        this.x = x;
        this.y = y;
    }

    /**
     * @param another Another city.
     * 
     * @return the distance between this city and another city.
     */
    public double computeDistance(final City another)
    {
        final int dSquared = ((x - another.x) * (x - another.x)) + ((y - another.y) * (y - another.y));

        return Math.sqrt(dSquared);
    }

    /**
     * @return the displayName
     */
    public String getDisplayName()
    {
        return displayName;
    }

    /**
     * @return other cities sorted by closest first.
     */
    public List<City> getOtherCitiesByDistance()
    {
        final Map<Double, City> map = new TreeMap<Double, City>();

        for (final City city : values())
        {
            if (city != this)
            {
                final double distance = computeDistance(city);
                map.put(distance, city);
            }
        }

        final List<City> answer = new ArrayList<City>(map.values());

        return answer;
    }

    //
    // private static Comparator<City> distanceComparator;
    //
    // private static Comparator<City> getDistanceComparator()
    // {
    // if(distanceComparator==null)
    // {
    // distanceComparator=new Comparator<City>()
    // {
    // @Override
    // public int compare(City o1, City o2)
    // {
    // int distance1=
    // }
    // };
    // }
    //
    // return distanceComparator;
    // }

    /**
     * @return the x
     */
    public int getX()
    {
        return x;
    }

    /**
     * @return the y
     */
    public int getY()
    {
        return y;
    }

    @Override
    public String toString()
    {
        return displayName;
    }
}

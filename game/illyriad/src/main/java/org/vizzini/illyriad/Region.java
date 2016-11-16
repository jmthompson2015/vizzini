package org.vizzini.illyriad;

import java.awt.Point;
import java.awt.Rectangle;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Provides an enumeration of regions.
 */
public enum Region
{
    /** Region. */
    THE_WASTES(1, "The Wastes", -1000, 529, -448, 1000, true),

    /** Region. */
    KAL_TIRIKAN(2, "Kal Tirikan", -691, 382, 20, 1000, true),

    /** Region. */
    WOLGAST(3, "Wolgast", -196, 437, 369, 1000, true),

    /** Region. */
    URSOR(4, "Ursor", 248, 617, 747, 1000, true),

    /** Region. */
    QAROSSLAN(5, "Qarosslan", 453, 494, 1000, 1000, true),

    /** Region. */
    WINDLOST(6, "Windlost", 179, 395, 583, 783, true),

    /** Region. */
    TAMARIN(7, "Tamarin", 546, 403, 1000, 706, true),

    /** Region. */
    FREMORN(8, "Fremorn", -1000, -10, -534, 695, true),

    /** Region. */
    NORWELD(9, "Norweld", -339, 63, 314, 661, true),

    /** Region. */
    LAOSHIN(10, "Laoshin", 761, 30, 1000, 565, true),

    /** Region. */
    RAGALLON(11, "Ragallon", 270, 105, 641, 509, true),

    /** Region. */
    TAOMIST(12, "Taomist", 498, 159, 858, 498, true),

    /** Region. */
    MEILLA(13, "Meilla", -779, -41, -111, 441, true),

    /** Region. */
    LUCERNA(14, "Lucerna", 213, -233, 459, 394, true),

    /** Region. */
    MIDDLE_KINGDOM(15, "Middle Kingdom", -233, -218, 329, 261, true),

    /** Region. */
    MAL_MOTSHA(16, "Mal Motsha", -249, -221, 941, 605, true),

    /** Region. */
    KEPPEN(17, "Keppen", -710, -201, -317, 173, true),

    /** Region. */
    TOR_CARROCK(18, "Tor Carrock", -589, -460, 118, 10, true),

    /** Region. */
    THE_WESTERN_REALMS(19, "The Western Realms", -1000, -275, -591, 72, true),

    /** Region. */
    KESHALIA(20, "Keshalia", 555, -342, 1000, 51, true),

    /** Region. */
    PERRIGOR(21, "Perrigor", -20, -368, 606, -129, true),

    /** Region. */
    KUL_TAR(22, "Kul Tar", 792, -432, 1000, -171, true),

    /** Region. */
    KUMALA(23, "Kumala", -1000, -998, -680, -187, true),

    /** Region. */
    LAN_LAROSH(24, "Lan Larosh", -907, -626, -243, -198, true),

    /** Region. */
    ARRAN(25, "Arran", -94, -679, 362, -286, true),

    /** Region. */
    TURALIA(26, "Turalia", 269, -716, 555, -302, true),

    /** Region. */
    ZANPUR(27, "Zanpur", 491, -726, 806, -309, true),

    /** Region. */
    ELIJAL(28, "Elijal", 711, -576, 1000, -329, true),

    /** Region. */
    AZURA(29, "Azura", -732, -826, 3, -387, true),

    /** Region. */
    DJEBELI(30, "Djebeli", 670, -775, 1000, -499, true),

    /** Region. */
    OCEAN(31, "OCEAN", -1000, -3300, 1000, -61, true),

    /** Region. */
    TALLIMAR(32, "Tallimar", -381, -1000, 333, -609, true),

    /** Region. */
    LARN(33, "Larn", 570, -1000, 1000, -688, true),

    /** Region. */
    KEM(34, "Kem", 532, -864, 637, -797, true),

    /** Region. */
    FARRA_ISLE(35, "Farra Isle", -571, -962, -450, -840, true),

    /** Region. */
    TROME(36, "Trome", 400, -963, 460, -907, true),

    /** Region. */
    RILL_ARCHIPELAGO(37, "Rill Archipelago", -710, -944, -626, -835, true),

    /** Region. */
    STORMSTONE_ISLAND(38, "Stormstone Island", -58, -997, -13, -972, true),

    /** Region. */
    UNKNOWN_39(39, "UNKNOWN_39", -994, -3300, 999, -1305, false),

    /** Region. */
    CALUMNEX(40, "Calumnex", 359, -3087, 736, -2793, false),

    /** Region. */
    PUCHUALLPA(41, "Puchuallpa", -23, -3300, 996, -1311, false),

    /** Region. */
    UNKNOWN_42(42, "UNKNOWN_42", -152, -2241, -17, -1400, false),

    /** Region. */
    PAMANYALLPA(43, "Pamanyallpa", -742, -1594, 789, -1302, false),

    /** Region. */
    HURONIRE(44, "Huronire", -900, -1763, -409, -1419, false),

    /** Region. */
    CLARIEN(45, "Clarien", -111, -1776, 447, -1431, false),

    /** Region. */
    PAWANALLPA(46, "Pawanallpa", 215, -1866, 975, -1452, false),

    /** Region. */
    UNKNOWN_47(47, "UNKNOWN_47", -976, -3232, 940, -1504, false),

    /** Region. */
    THE_POISONED_ISLE(48, "The Poisoned Isle", -985, -1638, -881, -1512, false),

    /** Region. */
    GLANHAD(49, "Glanhad", -383, -1959, 166, -1534, false),

    /** Region. */
    NORTHMARCH(50, "Northmarch", -720, -1951, -307, -1633, false),

    /** Region. */
    HIGH_HILLS(51, "High Hills", 134, -2180, 682, -1660, false),

    /** Region. */
    WESTMARCH(52, "Westmarch", -967, -2148, -572, -1732, false),

    /** Region. */
    UNKNOWN_53(53, "UNKNOWN_53", -752, -1741, -752, -1741, false),

    /** Region. */
    OARNAMLY(54, "Oarnamly", -401, -2330, -63, -1758, false),

    /** Region. */
    UNKNOWN_55(55, "UNKNOWN_55", -474, -3200, 988, -1774, false),

    /** Region. */
    GREMONT(56, "Gremont", 615, -2296, 885, -1849, false),

    /** Region. */
    COANHARA(57, "Coanhara", -768, -2425, -308, -1850, false),

    /** Region. */
    LAPOA_LUA(58, "Lapo'a Lua", 822, -2209, 972, -1855, false),

    /** Region. */
    NEWLANDS(59, "Newlands", -100, -2318, 373, -1856, false),

    /** Region. */
    UNKNOWN_60(60, "UNKNOWN_60", -954, -2706, 638, -1923, false),

    /** Region. */
    AINDARA(61, "Aindara", -978, -2650, -621, -2102, false),

    /** Region. */
    THE_PIRATE_ISLES(62, "The Pirate Isles", 33, -2499, 654, -2154, false),

    /** Region. */
    SILBEAUR(63, "Silbeaur", -492, -2521, -71, -2184, false),

    /** Region. */
    FELLANDIRE(64, "Fellandire", 560, -2708, 1000, -2211, false),

    /** Region. */
    UNKNOWN_65(65, "UNKNOWN_65", -507, -2241, -507, -2241, false),

    /** Region. */
    VINDOREL(66, "Vindorel", 277, -2708, 702, -2244, false),

    /** Region. */
    ALMENLY(67, "Almenly", -348, -2886, 69, -2329, false),

    /** Region. */
    KORMANDLY(68, "Kormandly", -708, -2789, -299, -2378, false),

    /** Region. */
    THE_ORKEN_COAST(69, "The Orken Coast", -55, -3087, 321, -2501, false),

    /** Region. */
    KINGSLANDS(70, "Kingslands", -893, -2958, -473, -2570, false),

    /** Region. */
    FARSHARDS(71, "Farshards", 590, -3107, 999, -2586, false),

    /** Region. */
    SHARDLANDS(72, "Shardlands", 58, -3233, 612, -2692, false),

    /** Region. */
    STRENDUR(73, "Strendur", -779, -3235, -67, -2708, false),

    /** Region. */
    CHULBRAN(74, "Chulbran", -977, -3234, -721, -2733, false),

    /** Region. */
    JURGOR(75, "Jurgor", 203, -3300, 998, -3009, false),

    /** Region. */
    THE_LONG_WHITE(76, "The Long White", -996, -3300, 278, -3088, false),

    /** Region. */
    UNKNOWN_LANDS(77, "Unknown Lands", 539, -3300, 544, -3298, false);

    /** Map of display name to value. */
    private static final Map<String, Region> displayNameToValue = new HashMap<String, Region>();

    /** Map of ID to value. */
    private static final Map<Integer, Region> idToValue = new HashMap<Integer, Region>();

    /** Values in Broken Lands. */
    private static Region[] valuesBrokenLands;

    /** Values in Elgea. */
    private static Region[] valuesElgea;

    /**
     * @param displayName Display name.
     * 
     * @return the region with the given ID.
     */
    public static Region valueOfDisplayName(final String displayName)
    {
        if (displayNameToValue.isEmpty())
        {
            for (final Region region : values())
            {
                displayNameToValue.put(region.getDisplayName(), region);
            }
        }

        return displayNameToValue.get(displayName);
    }

    /**
     * @param id ID.
     * 
     * @return the region with the given ID.
     */
    public static Region valueOfId(final int id)
    {
        if (idToValue.isEmpty())
        {
            for (final Region region : values())
            {
                idToValue.put(region.getId(), region);
            }
        }

        return idToValue.get(id);
    }

    /**
     * @return the regions in Broken Lands.
     */
    public static Region[] valuesBrokenLands()
    {
        if (valuesBrokenLands == null)
        {
            final List<Region> regions = new ArrayList<Region>();

            for (final Region region : values())
            {
                if (region.isInBrokenLands())
                {
                    regions.add(region);
                }
            }

            valuesBrokenLands = regions.toArray(new Region[regions.size()]);
        }

        return valuesBrokenLands;
    }

    /**
     * @return the regions in Elgea.
     */
    public static Region[] valuesElgea()
    {
        if (valuesElgea == null)
        {
            final List<Region> regions = new ArrayList<Region>();

            for (final Region region : values())
            {
                if (region.isInElgea())
                {
                    regions.add(region);
                }
            }

            valuesElgea = regions.toArray(new Region[regions.size()]);
        }

        return valuesElgea;
    }

    /** Bounds. */
    private final Rectangle bounds;

    /** Display name. */
    private final String displayName;

    /** ID. */
    private final int id;

    /** Flag indicating if this is in Elgea. */
    private final boolean isInElgea;

    /**
     * Construct this object.
     * 
     * @param id ID.
     * @param displayName Display name.
     * @param minX Minimum X coordinate.
     * @param minY Minimum Y coordinate.
     * @param maxX Maximum X coordinate.
     * @param maxY Maximum Y coordinate.
     * @param isInElgea Flag indicating if this is in Elgea.
     */
    @SuppressWarnings("hiding")
    private Region(final int id, final String displayName, final int minX, final int minY, final int maxX,
            final int maxY, final boolean isInElgea)
    {
        this.id = id;
        this.displayName = displayName;
        this.isInElgea = isInElgea;
        this.bounds = new Rectangle(minX, minY, ((maxX - minX) + 1), ((maxY - minY) + 1));
    }

    /**
     * @return the displayName
     */
    public String getDisplayName()
    {
        return displayName;
    }

    /**
     * @return the id
     */
    public int getId()
    {
        return id;
    }

    /**
     * @return the isInElgea
     */
    public boolean isInBrokenLands()
    {
        return (this == OCEAN) || !isInElgea;
    }

    /**
     * @return the isInElgea
     */
    public boolean isInElgea()
    {
        return isInElgea;
    }

    /**
     * @param x X coordinate.
     * @param y Y coordinate.
     * 
     * @return true if this may contain the given parameters.
     */
    public boolean maybeContains(final int x, final int y)
    {
        return bounds.contains(x, y);
    }

    /**
     * @param point Point.
     * 
     * @return true if this may contain the given parameter.
     */
    public boolean maybeContains(final Point point)
    {
        return bounds.contains(point);
    }
}

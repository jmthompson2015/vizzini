package org.vizzini.illyriad;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

/**
 * Provides an enumeration of minerals.
 */
public enum Mineral
{
    /** Mineral. */
    UNKNOWN(0, "Unknown"),

    /** Mineral. */
    ARTERIUM(193, "Arterium"),

    /** Mineral. */
    EARTHBLOOD(194, "Earthblood"),

    /** Mineral. */
    DEEPSILVER(195, "Deepsilver"),

    /** Mineral. */
    PYRESTONE(196, "Pyrestone"),

    /** Mineral. */
    TROVE(197, "Trove"),

    /** Mineral. */
    RAINBOWSTONE(198, "Rainbowstone"),

    /** Mineral. */
    CLARISTRINE(199, "Claristrine"),

    /** Mineral. */
    ELVEN_TEARS(200, "Elven Tears"),

    /** Mineral. */
    SVELAUGH_SAND(201, "Svelaugh Sand"),

    /** Mineral. */
    AEGHRIS(202, "Aeghris"),

    /** Mineral. */
    DAERA(203, "Daera"),

    /** Mineral. */
    FLEKTRINE(204, "Flektrine"),

    /** Mineral. */
    ALMHURIN(205, "Almhurin"),

    /** Mineral. */
    SILVERSOIL(206, "Silversoil"),

    /** Mineral. */
    OBSIDIAN(207, "Obsidian"),

    /** Mineral. */
    GOLDSTONE(208, "Goldstone"),

    /** Mineral. */
    NIGHT_DIAMOND(209, "Night Diamond"),

    /** Mineral. */
    ICEHEART(210, "Iceheart"),

    /** Mineral. */
    AMAR_SHARDS(211, "Amar Shards"),

    /** Mineral. */
    SILVERSTEEL(212, "Silversteel");

    /** Useful minerals. */
    public static final Set<Mineral> USEFUL_MINERALS = new HashSet<Mineral>();

    static
    {
        USEFUL_MINERALS.add(ARTERIUM);
        USEFUL_MINERALS.add(ICEHEART);
        USEFUL_MINERALS.add(OBSIDIAN);
        USEFUL_MINERALS.add(SILVERSTEEL);
    }

    /** Map of display name to value. */
    private static final Map<String, Mineral> displayNameToValue = new HashMap<String, Mineral>();

    /** Map of ID to value. */
    private static final Map<Integer, Mineral> idToValue = new HashMap<Integer, Mineral>();

    /**
     * @param displayName Display name.
     * 
     * @return the mineral with the given display name.
     */
    public static Mineral valueOfDisplayName(final String displayName)
    {
        if (displayNameToValue.isEmpty())
        {
            for (final Mineral mineral : values())
            {
                displayNameToValue.put(mineral.getDisplayName(), mineral);
            }
        }

        return displayNameToValue.get(displayName);
    }

    /**
     * @param id ID.
     * 
     * @return the mineral with the given ID.
     */
    public static Mineral valueOfId(final int id)
    {
        if (idToValue.isEmpty())
        {
            for (final Mineral mineral : values())
            {
                idToValue.put(mineral.getId(), mineral);
            }
        }

        return idToValue.get(id);
    }

    /** Display name. */
    private final String displayName;

    /** ID. */
    private final int id;

    /**
     * Construct this object.
     * 
     * @param id ID.
     * @param displayName Display name.
     */
    @SuppressWarnings("hiding")
    private Mineral(final int id, final String displayName)
    {
        this.id = id;
        this.displayName = displayName;
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

    @Override
    public String toString()
    {
        return displayName;
    }
}

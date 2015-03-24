package org.vizzini.illyriad.map;

import java.util.HashMap;
import java.util.Map;

/**
 * Provides an enumeration of terrain combats.
 */
public enum TerrainCombat
{
    /** Terrain combat. */
    LARGE_MOUNTAIN(1, "Large Mountain"),

    /** Terrain combat. */
    SMALL_MOUNTAIN(2, "Small Mountain"),

    /** Terrain combat. */
    LARGE_HILL(3, "Large Hill"),

    /** Terrain combat. */
    SMALL_HILL(4, "Small Hill"),

    /** Terrain combat. */
    IMPASSABLE(5, "Impassable"),

    /** Terrain combat. */
    SMALL_FOREST(6, "Small Forest"),

    /** Terrain combat. */
    PLAINS(7, "Plains"),

    /** Terrain combat. */
    BUILDINGS(8, "Buildings"),

    /** Terrain combat. */
    NPC_STRUCTURE(9, "NPC Structure"),

    /** Terrain combat. */
    LARGE_FOREST(10, "Large Forest"),

    /** Terrain combat. */
    FRESH_WATER(11, "Fresh Water"),

    /** Terrain combat. */
    TIDAL_WATER(12, "Tidal Water"),

    /** Terrain combat. */
    SHALLOW_SALT_WATER(13, "Shallow Salt Water"),

    /** Terrain combat. */
    OCEAN(14, "Ocean"),

    /** Terrain combat. */
    OBSIDIAN_MOUNTAINS(15, "Obsidian Mountains");

    /** Map of display name to value. */
    private static final Map<String, TerrainCombat> displayNameToValue = new HashMap<String, TerrainCombat>();

    /** Map of ID to value. */
    private static final Map<Integer, TerrainCombat> idToValue = new HashMap<Integer, TerrainCombat>();

    /**
     * @param displayName Display name.
     * 
     * @return the region with the given ID.
     */
    public static TerrainCombat valueOfDisplayName(final String displayName)
    {
        if (displayNameToValue.isEmpty())
        {
            for (final TerrainCombat terrain : values())
            {
                displayNameToValue.put(terrain.getDisplayName(), terrain);
            }
        }

        return displayNameToValue.get(displayName);
    }

    /**
     * @param id ID.
     * 
     * @return the region with the given ID.
     */
    public static TerrainCombat valueOfId(final int id)
    {
        if (idToValue.isEmpty())
        {
            for (final TerrainCombat terrain : values())
            {
                idToValue.put(terrain.getId(), terrain);
            }
        }

        return idToValue.get(id);
    }

    /** ID. */
    private final int id;

    /** Display name. */
    private final String displayName;

    /**
     * Construct this object.
     * 
     * @param id ID.
     * @param displayName Display name.
     */
    @SuppressWarnings("hiding")
    private TerrainCombat(final int id, final String displayName)
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
}

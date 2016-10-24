package org.vizzini.illyriad.map;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.TreeSet;

/**
 * Provides an enumeration of terrain specifics. From the game:
 * "You cannot move onto NPC squares, ie: Standing Stones, Barrow, Abandoned Mineshaft, Ruined Tower, Ancient Forest, Dolmen, Ice Cave, Petrified Forest."
 */
public enum TerrainSpecific
{
    /** Terrain specific. */
    ABANDONED_CAMPSITE(156, "Abandoned Campsite", false),

    /** Terrain specific. */
    ABANDONED_LAIR(208, "Abandoned Lair"),

    /** Terrain specific. */
    ABANDONED_LODGE(145, "Abandoned Lodge", false),

    /** Terrain specific. */
    ABANDONED_MINESHAFT(42, "Abandoned Mineshaft", false),

    /** Terrain specific. */
    ABUNDANT_CLAY(7, "Abundant Clay"),

    /** Terrain specific. */
    ABUNDANT_CROPS(12, "Abundant Crops"),

    /** Terrain specific. */
    ABUNDANT_QUARRY(46, "Abundant Quarry"),

    /** Terrain specific. */
    ACTIVATED_STANDING_STONES(171, "Activated Standing Stones"),

    /** Terrain specific. */
    ACTIVE_PEAK(203, "Active Peak"),

    /** Terrain specific. */
    ALLUVIAL_PLAIN(16, "Alluvial Plain"),

    /** Terrain specific. */
    ALTAR_OF_AIR(169, "Altar of Air"),

    /** Terrain specific. */
    ALTAR_OF_EARTH(170, "Altar of Earth"),

    /** Terrain specific. */
    ALTAR_OF_FIRE(168, "Altar of Fire"),

    /** Terrain specific. */
    ALTAR_OF_WATER(167, "Altar of Water"),

    /** Terrain specific. */
    ANCIENT_CLAWS(159, "Ancient Claws"),

    /** Terrain specific. */
    ANCIENT_FOREST(44, "Ancient Forest", false),

    /** Terrain specific. */
    ANCIENT_GRAVEYARD(209, "Ancient Graveyard", false),

    /** Terrain specific. */
    ANCIENT_LAIR(144, "Ancient Lair"),

    /** Terrain specific. */
    BANKSIDE(172, "Bankside", false),

    /** Terrain specific. */
    BARREN_WASTES(68, "Barren Wastes"),

    /** Terrain specific. */
    BARROW(41, "Barrow", false),

    /** Terrain specific. */
    BEACH(173, "Beach", false),

    /** Terrain specific. */
    BLEAK_MOUNTAINS(25, "Bleak Mountains"),

    /** Terrain specific. */
    BLESSED_OAK(139, "Blessed Oak"),

    /** Terrain specific. */
    BOG(91, "Bog"),

    /** Terrain specific. */
    BOUNTIFUL_LAND(13, "Bountiful Land"),

    /** Terrain specific. */
    BREWERY_OUTBUILDINGS(163, "Brewery Outbuildings"),

    /** Terrain specific. */
    BROKEN_TOWER(210, "Broken Tower"),

    /** Terrain specific. */
    CACTUS(101, "Cactus"),

    /** Terrain specific. */
    CAIRN(125, "Cairn"),

    /** Terrain specific. */
    CANYON(22, "Canyon"),

    /** Terrain specific. */
    CLAY_SEAM(Arrays.asList(new Integer[] { 9, 65 }), "Clay Seam"),

    /** Terrain specific. */
    CLEARING(31, "Clearing"),

    /** Terrain specific. */
    CLOCK_TOWER(132, "Clock Tower"),

    /** Terrain specific. */
    COAST(175, "Coast"),

    /** Terrain specific. */
    COLUMN(133, "Column"),

    /** Terrain specific. */
    CONIFEROUS_DENSE_FOREST(177, "Coniferous Dense Forest"),

    /** Terrain specific. */
    CONIFEROUS_FORESTED_HILLTOP(178, "Coniferous Forested Hilltop"),

    /** Terrain specific. */
    CONIFEROUS_LIGHT_WOODS(181, "Coniferous Light Woods"),

    /** Terrain specific. */
    CONIFEROUS_THICK_FOREST(176, "Coniferous Thick Forest"),

    /** Terrain specific. */
    CONIFEROUS_WOODED_GLADE(180, "Coniferous Wooded Glade"),

    /** Terrain specific. */
    CONIFEROUS_WOODED_LAND(179, "Coniferous Wooded Land"),

    /** Terrain specific. */
    CORRUPTED_LAND(166, "Corrupted Land"),

    /** Terrain specific. */
    CRAGGY_PEAKS(24, "Craggy Peaks"),

    /** Terrain specific. */
    CROOKED_HOUSE(152, "Crooked House", false),

    /** Terrain specific. */
    CRUMBLING_LIGHTHOUSE(218, "Crumbling Lighthouse"),

    /** Terrain specific. */
    CYLINDROCONICAL_VESSELS(164, "Cylindroconical Vessels"),

    /** Terrain specific. */
    DAMP_JUNGLE(111, "Damp Jungle"),

    /** Terrain specific. */
    DARK_FOREST(143, "Dark Forest"),

    /** Terrain specific. */
    DARK_TEMPLE(154, "Dark Temple"),

    /** Terrain specific. */
    DEAD_WATER(198, "Dead Water"),

    /** Terrain specific. */
    DEADVLEI_FOREST(196, "Deadvlei Forest"),

    /** Terrain specific. */
    DENSE_FOLIAGE(106, "Dense Foliage"),

    /** Terrain specific. */
    DENSE_FOREST(53, "Dense Forest"),

    /** Terrain specific. */
    DENSE_JUNGLE(112, "Dense Jungle"),

    /** Terrain specific. */
    DENSE_MONSOON_JUNGLE(113, "Dense Monsoon Jungle"),

    /** Terrain specific. */
    DENSE_RAINFOREST(118, "Dense Rainforest"),

    /** Terrain specific. */
    DENSE_TROPICAL_FOREST(107, "Dense Tropical Forest"),

    /** Terrain specific. */
    DESERTED_MONASTERY(153, "Deserted Monastery", false),

    /** Terrain specific. */
    DESERTED_WAYHOUSE(146, "Deserted Wayhouse", false),

    /** Terrain specific. */
    DOLMEN(45, "Dolmen", false),

    /** Terrain specific. */
    DORMANT_PORTAL(211, "Dormant Portal", false),

    /** Terrain specific. */
    DRAGON_MONUMENT(134, "Dragon Monument"),

    /** Terrain specific. */
    DRUMLIN(80, "Drumlin"),

    /** Terrain specific. */
    DRY_TUNDRA(122, "Dry tundra"),

    /** Terrain specific. */
    DWARF_MONUMENT(137, "Dwarf Monument"),

    /** Terrain specific. */
    ELF_MONUMENT(136, "Elf Monument"),

    /** Terrain specific. */
    EMERGING_MOUNTAINTOP(204, "Emerging Mountaintop"),

    /** Terrain specific. */
    EXPOSED_CLAY(8, "Exposed Clay"),

    /** Terrain specific. */
    FACTION_HUB(66, "Faction Hub"),

    /** Terrain specific. */
    FAERIE_RING(124, "Faerie Ring"),

    /** Terrain specific. */
    FALLEN_DWARFHOLD(212, "Fallen Dwarfhold"),

    /** Terrain specific. */
    FERRY_POST(221, "Ferry Post"),

    /** Terrain specific. */
    FERTILE_GROUND(17, "Fertile Ground"),

    /** Terrain specific. */
    FERTILE_ORCHARD(15, "Fertile Orchard"),

    /** Terrain specific. */
    FERTILE_PASTURE(14, "Fertile Pasture"),

    /** Terrain specific. */
    FIERY_MOUNTAIN(21, "Fiery Mountain"),

    /** Terrain specific. */
    FISHERMANS_HUT(219, "Fisherman's Hut"),

    /** Terrain specific. */
    FORBIDDEN(67, "Forbidden", false),

    /** Terrain specific. */
    FORESTED_HILLTOP(Arrays.asList(new Integer[] { 4, 54 }), "Forested Hilltop"),

    /** Terrain specific. */
    FORGOTTEN_TEMPLE(149, "Forgotten Temple"),

    /** Terrain specific. */
    FORTIFIED_HOSTEL(213, "Fortified Hostel"),

    /** Terrain specific. */
    FORTRESS_OF_SHADOWS(158, "Fortress of Shadows"),

    /** Terrain specific. */
    FORTUNE_TELLER(157, "Fortune Teller"),

    /** Terrain specific. */
    FRESH_WATER(59, "Fresh Water"),

    /** Terrain specific. */
    FROSTY_HEATH(86, "Frosty Heath"),

    /** Terrain specific. */
    FROZEN_GROUND(70, "Frozen Ground"),

    /** Terrain specific. */
    GATHERING_PLACE(160, "Gathering Place"),

    /** Terrain specific. */
    GEYSER(123, "Geyser"),

    /** Terrain specific. */
    GLACIAL_CREVASSE(74, "Glacial Crevasse"),

    /** Terrain specific. */
    GLACIER(69, "Glacier"),

    /** Terrain specific. */
    GLASSY_CRAG(200, "Glassy Crag"),

    /** Terrain specific. */
    GLASSY_MOUNTAIN(205, "Glassy Mountain"),

    /** Terrain specific. */
    GYPSY_CAMPSITE(155, "Gypsy Campsite"),

    /** Terrain specific. */
    HAMADA_STONE_PLATEAU(99, "Hamada (Stone Plateau)"),

    /** Terrain specific. */
    HEAD_STATUE(222, "Head Statue"),

    /** Terrain specific. */
    HEAVY_CLAY_SEAM(11, "Heavy Clay Seam"),

    /** Terrain specific. */
    HEROIC_HUMAN_STATUE(135, "Heroic Human Statue"),

    /** Terrain specific. */
    HIDDEN_TEMPLE(150, "Hidden Temple"),

    /** Terrain specific. */
    HOUSE_OF_THE_SPIRITS(148, "House of the Spirits", false),

    /** Terrain specific. */
    ICE_HOLES(82, "Ice Holes"),

    /** Terrain specific. */
    ICE_CAVE(75, "Ice cave", false),

    /** Terrain specific. */
    ICEFIELD(73, "Icefield"),

    /** Terrain specific. */
    ICY_MOSS(85, "Icy Moss"),

    /** Terrain specific. */
    JUNGLE(110, "Jungle"),

    /** Terrain specific. */
    JUNGLE_STANDING_STONES(223, "Jungle Standing Stones"),

    /** Terrain specific. */
    KAME(79, "Kame"),

    /** Terrain specific. */
    LAKE(18, "Lake", false),

    /** Terrain specific. */
    LANDSLIP(50, "Landslip"),

    /** Terrain specific. */
    LAVA_PEAK(202, "Lava Peak"),

    /** Terrain specific. */
    LAVA_POOL(206, "Lava Pool"),

    /** Terrain specific. */
    LAWSTONES(214, "Lawstones"),

    /** Terrain specific. */
    LICHEN(87, "Lichen"),

    /** Terrain specific. */
    LIGHT_RAINFOREST(115, "Light Rainforest"),

    /** Terrain specific. */
    LIGHT_TROPICAL_COVER(104, "Light Tropical Cover"),

    /** Terrain specific. */
    LIGHT_WOODS(Arrays.asList(new Integer[] { 57, 63 }), "Light Woods"),

    /** Terrain specific. */
    LIGHTHOUSE(126, "Lighthouse"),

    /** Terrain specific. */
    LOCH(19, "Loch", false),

    /** Terrain specific. */
    LONELY_PEAKS(26, "Lonely Peaks"),

    /** Terrain specific. */
    MAGMA_RIFT(207, "Magma Rift"),

    /** Terrain specific. */
    MARSH(90, "Marsh"),

    /** Terrain specific. */
    MAUSOLEUM(142, "Mausoleum"),

    /** Terrain specific. */
    MESA(97, "Mesa"),

    /** Terrain specific. */
    MIRE(92, "Mire"),

    /** Terrain specific. */
    MONSOON_HILLTOP(114, "Monsoon Hilltop"),

    /** Terrain specific. */
    MONSOON_JUNGLE(109, "Monsoon Jungle"),

    /** Terrain specific. */
    MOOR(34, "Moor"),

    /** Terrain specific. */
    MORAINE(78, "Moraine"),

    /** Terrain specific. */
    MOUNTAIN_CAVE(128, "Mountain Cave"),

    /** Terrain specific. */
    MOUNTAINS(29, "Mountains"),

    /** Terrain specific. */
    MYSTIC_TOMB(165, "Mystic Tomb"),

    /** Terrain specific. */
    NUNATAK(71, "Nunatak"),

    /** Terrain specific. */
    OASIS(94, "Oasis"),

    /** Terrain specific. */
    OBELISK(131, "Obelisk"),

    /** Terrain specific. */
    OBSIDIAN_MOUNTAIN(199, "Obsidian Mountain"),

    /** Terrain specific. */
    OCEAN(62, "Ocean"),

    /** Terrain specific. */
    OPEN_PLAINS(33, "Open Plains"),

    /** Terrain specific. */
    ORC_MONUMENT(138, "Orc Monument"),

    /** Terrain specific. */
    ORNAMENTAL_GARDENS(Arrays.asList(new Integer[] { 140, 141 }), "Ornamental Gardens"),

    /** Terrain specific. */
    PALM_TREES(105, "Palm Trees"),

    /** Terrain specific. */
    PARCHED_BONES(197, "Parched Bones"),

    /** Terrain specific. */
    PERMAFROST(84, "Permafrost"),

    /** Terrain specific. */
    PETRIFIED_FOREST(Arrays.asList(new Integer[] { 88, 195 }), "Petrified Forest", false),

    /** Terrain specific. */
    PLACE_OF_HIGH_SACRIFICE(151, "Place of High Sacrifice"),

    /** Terrain specific. */
    PLAINS(Arrays.asList(new Integer[] { 1, 2, 3, 5, 35, 36, 37, 38, 39, 58 }), "Plains"),

    /** Terrain specific. */
    PLAYA(95, "Playa"),

    /** Terrain specific. */
    PYRAMIDS(129, "Pyramids", false),

    /** Terrain specific. */
    RAINFOREST(117, "Rainforest"),

    /** Terrain specific. */
    RAINFOREST_CANOPY(116, "Rainforest Canopy"),

    /** Terrain specific. */
    RAINFOREST_HILLTOP(120, "Rainforest Hilltop"),

    /** Terrain specific. */
    REG_GRAVEL_PLAIN(100, "Reg (Gravel Plain)"),

    /** Terrain specific. */
    RICH_CLAY_SEAM(6, "Rich Clay Seam"),

    /** Terrain specific. */
    RICH_QUARRY(47, "Rich Quarry"),

    /** Terrain specific. */
    ROCHE_MOUTONNEE(81, "Roche Moutonnee"),

    /** Terrain specific. */
    ROCKHEWN_MONASTERY(147, "Rockhewn Monastery"),

    /** Terrain specific. */
    ROCKY_MOUNTAIN(98, "Rocky Mountain"),

    /** Terrain specific. */
    ROCKY_OUTCROP(Arrays.asList(new Integer[] { 49, 64 }), "Rocky Outcrop"),

    /** Terrain specific. */
    ROGEN_MORAINE(77, "Rogen Moraine"),

    /** Terrain specific. */
    RUINED_TOWER(43, "Ruined Tower", false),

    /** Terrain specific. */
    SACRIFICIAL_ALTAR(215, "Sacrificial Altar"),

    /** Terrain specific. */
    SAND_DUNE(93, "Sand Dune"),

    /** Terrain specific. */
    SCORCHED_FOREST(194, "Scorched Forest"),

    /** Terrain specific. */
    SCOURED_BEDROCK(72, "Scoured Bedrock"),

    /** Terrain specific. */
    SCRUBLAND(Arrays.asList(new Integer[] { 30, 83 }), "Scrubland"),

    /** Terrain specific. */
    SEAHENGE(220, "Seahenge"),

    /** Terrain specific. */
    SHALLOW_COASTLINE(174, "Shallow Coastline"),

    /** Terrain specific. */
    SHALLOW_SALT_WATER(61, "Shallow Salt Water"),

    /** Terrain specific. */
    SHARP_CRAGS(27, "Sharp Crags"),

    /** Terrain specific. */
    SHATTERED_HEAD(224, "Shattered Head"),

    /** Terrain specific. */
    SHIPWRECK(Arrays.asList(new Integer[] { 225, 226, 227, 228, 229 }), "Shipwreck"),

    /** Terrain specific. */
    SNOWY_DENSE_FOREST(183, "Snowy Dense Forest"),

    /** Terrain specific. */
    SNOWY_FORESTED_HILLTOP(184, "Snowy Forested Hilltop"),

    /** Terrain specific. */
    SNOWY_LIGHT_WOODS(187, "Snowy Light Woods"),

    /** Terrain specific. */
    SNOWY_THICK_FOREST(182, "Snowy Thick Forest"),

    /** Terrain specific. */
    SNOWY_WOODED_GLADE(186, "Snowy Wooded Glade"),

    /** Terrain specific. */
    SNOWY_WOODED_LAND(185, "Snowy Wooded Land"),

    /** Terrain specific. */
    SPHINX(130, "Sphinx"),

    /** Terrain specific. */
    STANDING_STONES(40, "Standing Stones", false),

    /** Terrain specific. */
    STEAMTASTIC_BREWERY(162, "Steamtastic Brewery"),

    /** Terrain specific. */
    STONE_CIRCLE(127, "Stone Circle"),

    /** Terrain specific. */
    STONY_GROUND(51, "Stony Ground"),

    /** Terrain specific. */
    SUCCULENTS(121, "Succulents"),

    /** Terrain specific. */
    SWAMP(89, "Swamp"),

    /** Terrain specific. */
    SWAMPLAND(23, "Swampland"),

    /** Terrain specific. */
    TARN(76, "Tarn"),

    /** Terrain specific. */
    TEMPERATE_DENSE_FOREST(189, "Temperate Dense Forest"),

    /** Terrain specific. */
    TEMPERATE_FORESTED_HILLTOP(190, "Temperate Forested Hilltop"),

    /** Terrain specific. */
    TEMPERATE_LIGHT_WOODS(193, "Temperate Light Woods"),

    /** Terrain specific. */
    TEMPERATE_THICK_FOREST(188, "Temperate Thick Forest"),

    /** Terrain specific. */
    TEMPERATE_WOODED_GLADE(192, "Temperate Wooded Glade"),

    /** Terrain specific. */
    TEMPERATE_WOODED_LAND(191, "Temperate Wooded Land"),

    /** Terrain specific. */
    TEMPLE_OF_REASON(161, "Temple of Reason"),

    /** Terrain specific. */
    THICK_FOREST(52, "Thick Forest"),

    /** Terrain specific. */
    THICK_RAINFOREST(119, "Thick Rainforest"),

    /** Terrain specific. */
    TIDAL_WATER(60, "Tidal Water"),

    /** Terrain specific. */
    TIKI_POLE(216, "Tiki Pole"),

    /** Terrain specific. */
    TREACHEROUS_MOUNTAINS(28, "Treacherous Mountains"),

    /** Terrain specific. */
    TROPICAL_FOLIAGE(103, "Tropical Foliage"),

    /** Terrain specific. */
    TROPICAL_HILLTOP(108, "Tropical Hilltop"),

    /** Terrain specific. */
    TUNDRA(32, "Tundra"),

    /** Terrain specific. */
    TURNED_CLAY(10, "Turned Clay"),

    /** Terrain specific. */
    VOLCANIC_MOUNTAIN(201, "Volcanic Mountain"),

    /** Terrain specific. */
    VOLCANIC_PEAK(20, "Volcanic Peak"),

    /** Terrain specific. */
    WADI(102, "Wadi"),

    /** Terrain specific. */
    WEEPING_WILLOW(217, "Weeping Willow"),

    /** Terrain specific. */
    WOODED_GLADE(56, "Wooded Glade"),

    /** Terrain specific. */
    WOODED_LAND(55, "Wooded Land"),

    /** Terrain specific. */
    WOODED_QUARRY(48, "Wooded Quarry"),

    /** Terrain specific. */
    YARDANG(96, "Yardang");

    /**
     * @return a new set of settleable terrain specifics.
     */
    public static Set<TerrainSpecific> settleableValues()
    {
        final Set<TerrainSpecific> answer = new TreeSet<TerrainSpecific>();

        for (final TerrainSpecific terrain : values())
        {
            if (terrain.isSettleable)
            {
                answer.add(terrain);
            }
        }

        return answer;
    }

    /**
     * @param id ID.
     * 
     * @return the region with the given ID.
     */
    public static TerrainSpecific valueOfId(final int id)
    {
        TerrainSpecific answer = null;

        for (final TerrainSpecific terrain : values())
        {
            if (terrain.ids.contains(id))
            {
                answer = terrain;
                break;
            }
        }

        return answer;
    }

    /** Display name. */
    private final String displayName;

    /** List of IDs. */
    private List<Integer> ids;

    /** Flag indicating whether this terrain can be settled. */
    private final boolean isSettleable;

    /**
     * Construct this object.
     * 
     * @param id ID.
     * @param displayName Display name.
     */
    @SuppressWarnings("hiding")
    private TerrainSpecific(final int id, final String displayName)
    {
        this(id, displayName, true);
    }

    /**
     * Construct this object.
     * 
     * @param id ID.
     * @param displayName Display name.
     * @param isSettleable Flag indicating whether this terrain can be settled.
     */
    @SuppressWarnings("hiding")
    private TerrainSpecific(final int id, final String displayName, final boolean isSettleable)
    {
        this(Collections.singletonList(id), displayName, isSettleable);
    }

    /**
     * Construct this object.
     * 
     * @param ids List of IDs.
     * @param displayName Display name.
     */
    @SuppressWarnings("hiding")
    private TerrainSpecific(final List<Integer> ids, final String displayName)
    {
        this(ids, displayName, true);
    }

    /**
     * Construct this object.
     * 
     * @param ids List of IDs.
     * @param displayName Display name.
     * @param isSettleable Flag indicating whether this terrain can be settled.
     */
    @SuppressWarnings("hiding")
    private TerrainSpecific(final List<Integer> ids, final String displayName, final boolean isSettleable)
    {
        this.ids = new ArrayList<Integer>(ids);
        this.displayName = displayName;
        this.isSettleable = isSettleable;
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
    public List<Integer> getIds()
    {
        return new ArrayList<Integer>(ids);
    }

    /**
     * @return the isSettleable
     */
    public boolean isSettleable()
    {
        return isSettleable;
    }
}

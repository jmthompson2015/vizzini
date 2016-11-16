package org.vizzini.illyriad.map;

import java.util.BitSet;

import org.vizzini.illyriad.Region;

/**
 * Defines methods required by a database of world map information.
 */
public interface WorldMapDatabase
{
    /**
     * @param index Geospatial index.
     * 
     * @return the region.
     */
    Region findRegionFor(final int index);

    /**
     * @param index Geospatial index.
     * 
     * @return the combat terrain.
     */
    TerrainCombat findTerrainCombatFor(final int index);

    /**
     * @param index Geospatial index.
     * 
     * @return the specific terrain.
     */
    TerrainSpecific findTerrainSpecificFor(final int index);

    /**
     * @return the eightFoodSquares
     */
    BitSet getEightFoodSquares();

    /**
     * @return the fiveClaySquares
     */
    BitSet getFiveClaySquares();

    /**
     * @return the fiveWoodSquares
     */
    BitSet getFiveIronSquares();

    /**
     * @return the fiveStoneSquares
     */
    BitSet getFiveStoneSquares();

    /**
     * @return the fiveWoodSquares
     */
    BitSet getFiveWoodSquares();

    /**
     * @return the highFoodSquares
     */
    BitSet getHighFoodSquares();

    /**
     * @param region Region.
     * 
     * @return the regionSquares
     */
    BitSet getRegionSquares(final Region region);

    /**
     * @return the sevenFoodSquares
     */
    BitSet getSevenFoodSquares();

    /**
     * @param terrain Terrain combat.
     * 
     * @return the terrainCombatSquares
     */
    BitSet getTerrainCombatSquares(final TerrainCombat terrain);

    /**
     * @param terrain Terrain combat.
     * 
     * @return the terrainSpecificSquares
     */
    BitSet getTerrainSpecificSquares(final TerrainSpecific terrain);

    /**
     * @return the tradeHubSquares
     */
    BitSet getTradeHubSquares();
}

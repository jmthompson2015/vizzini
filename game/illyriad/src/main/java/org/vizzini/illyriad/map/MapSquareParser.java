package org.vizzini.illyriad.map;

/**
 * Provides a parser for a map square data line. First call <code>split()</code> to obtain the parts, then call the
 * specific getter(s) as desired.
 * <p>
 * Fields are:
 * </p>
 * <ol start="0">
 * <li>GeoID</li>
 * <li>X</li>
 * <li>Y</li>
 * <li>Wood</li>
 * <li>Clay</li>
 * <li>Iron</li>
 * <li>Stone</li>
 * <li>Food</li>
 * <li>TerrainSpecificTypeID</li>
 * <li>TerrainCombatTypeID</li>
 * <li>RegionID</li>
 * </ol>
 */
public final class MapSquareParser
{
    /**
     * @param parts Split data line.
     * 
     * @return the clay amount.
     */
    public int getClay(final String[] parts)
    {
        return Integer.parseInt(parts[4]);
    }

    /**
     * @param parts Split data line.
     * 
     * @return the food amount.
     */
    public int getFood(final String[] parts)
    {
        return Integer.parseInt(parts[7]);
    }

    /**
     * @param parts Split data line.
     * 
     * @return the geoId.
     */
    public int getGeoId(final String[] parts)
    {
        return Integer.parseInt(parts[0]);
    }

    /**
     * @param parts Split data line.
     * 
     * @return the iron amount.
     */
    public int getIron(final String[] parts)
    {
        return Integer.parseInt(parts[5]);
    }

    /**
     * @param parts Split data line.
     * 
     * @return the regionId.
     */
    public int getRegionId(final String[] parts)
    {
        return Integer.parseInt(parts[10]);
    }

    /**
     * @param parts Split data line.
     * 
     * @return the stone amount.
     */
    public int getStone(final String[] parts)
    {
        return Integer.parseInt(parts[6]);
    }

    /**
     * @param parts Split data line.
     * 
     * @return the terrain combat type ID.
     */
    public int getTerrainCombatTypeId(final String[] parts)
    {
        return Integer.parseInt(parts[9]);
    }

    /**
     * @param parts Split data line.
     * 
     * @return the terrain specific type ID.
     */
    public int getTerrainSpecificTypeId(final String[] parts)
    {
        return Integer.parseInt(parts[8]);
    }

    /**
     * @param parts Split data line.
     * 
     * @return the wood amount.
     */
    public int getWood(final String[] parts)
    {
        return Integer.parseInt(parts[3]);
    }

    /**
     * @param parts Split data line.
     * 
     * @return the X coordinate.
     */
    public int getX(final String[] parts)
    {
        return Integer.parseInt(parts[1]);
    }

    /**
     * @param parts Split data line.
     * 
     * @return the Y coordinate.
     */
    public int getY(final String[] parts)
    {
        return Integer.parseInt(parts[2]);
    }

    /**
     * @param line Data line.
     * 
     * @return the split string.
     */
    public String[] split(final String line)
    {
        return line.split("[|]");
    }
}

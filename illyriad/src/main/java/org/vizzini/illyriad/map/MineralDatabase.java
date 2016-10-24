package org.vizzini.illyriad.map;

import java.util.BitSet;

import org.vizzini.illyriad.Mineral;

/**
 * Defines methods required by a database of mineral information.
 */
public interface MineralDatabase
{
    /**
     * @param index Geospatial index.
     * @param isVerbose Flag indicating whether to print output.
     * 
     * @return the mineral.
     */
    Mineral findMineralFor(final int index, boolean isVerbose);

    /**
     * @return the allMineralSquares
     */
    BitSet getAllMineralSquares();

    /**
     * @return the converter
     */
    GeoIdConverter getConverter();

    /**
     * @param index Geospatial index.
     * 
     * @return the amount of the mineral at index, or 0.
     */
    int getMineralAmount(final int index);

    /**
     * @param mineral Mineral.
     * 
     * @return the mineralSquares
     */
    BitSet getMineralSquares(final Mineral mineral);
}

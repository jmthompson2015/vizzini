package org.vizzini.illyriad.map;

import java.util.BitSet;

/**
 * Defines methods required by a database of town information.
 */
public interface TownDatabase
{
    /**
     * @return the townSquares
     */
    BitSet getTownSquares();
}

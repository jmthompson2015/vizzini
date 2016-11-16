package org.vizzini.illyriad.map;

import java.io.Writer;
import java.util.ArrayList;
import java.util.BitSet;
import java.util.Collections;
import java.util.List;

import org.vizzini.illyriad.Reporter;

/**
 * Provides a reporter for map squares.
 */
public final class SquareReporter implements Reporter
{
    /** Geospatial ID converter. */
    private final GeoIdConverter converter;

    /** Sweetspot finder. */
    final SweetspotFinder finder;

    /** Map squares. */
    private final BitSet squares;

    /**
     * Construct this object.
     * 
     * @param converter Geospatial ID converter.
     * @param squares Squares.
     * @param finder Sweetspot finder.
     */
    @SuppressWarnings("hiding")
    public SquareReporter(final GeoIdConverter converter, final BitSet squares, final SweetspotFinder finder)
    {
        this.converter = converter;
        this.squares = squares;
        this.finder = finder;
    }

    /**
     * @param writer Writer.
     */
    @Override
    public void report(final Writer writer)
    {
        if (squares.cardinality() > 0)
        {
            System.out.println("creating PrintRows");

            final List<PrintRow> printRows = new ArrayList<PrintRow>();

            for (int i = squares.nextSetBit(0); i >= 0; i = squares.nextSetBit(i + 1))
            {
                final PrintRow row = new PrintRow(finder, converter, i);

                // Restrict to useful minerals.
                // if (Mineral.USEFUL_MINERALS.contains(row.getMineral()))
                {
                    // Leave out squares not near high food.
                    if (!row.getHighFoodString().contains("n/a"))
                    {
                        // Leave out squares not near mineral.
                        if (!row.getMineralString().contains("n/a"))
                        {
                            printRows.add(row);
                        }
                    }
                }
            }

            Collections.sort(printRows);

            System.out.println("writing PrintRows");

            System.out.println(PrintRow.getHeaderString());

            for (int i = 0; i < printRows.size(); i++)
            {
                final PrintRow row = printRows.get(i);
                System.out.println(row.toString());
            }

            System.out.println("\nprintRows.size()      = " + printRows.size());
            System.out.println("\nsquares.cardinality() = " + squares.cardinality());
        }
    }
}

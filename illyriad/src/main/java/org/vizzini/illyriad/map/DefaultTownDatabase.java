package org.vizzini.illyriad.map;

import java.io.InputStreamReader;
import java.io.Reader;
import java.util.BitSet;

import org.vizzini.core.TimePrinter;
import org.vizzini.core.XMLReader;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

/**
 * Provides a default implementation of a town information database.
 */
public final class DefaultTownDatabase implements TownDatabase
{
    /** Geo ID converter. */
    private final GeoIdConverter converter;

    /** Town squares. */
    private final BitSet townSquares;

    /**
     * Construct this object.
     * 
     * @param converter Geospatial ID converter.
     */
    @SuppressWarnings("hiding")
    public DefaultTownDatabase(final GeoIdConverter converter)
    {
        this(converter, new InputStreamReader(DefaultTownDatabase.class.getClassLoader().getResourceAsStream(
                "mapData/datafile_towns.xml")));
    }

    /**
     * Construct this object.
     * 
     * @param converter Geospatial ID converter.
     * @param townsDataReader Towns data reader. (required)
     */
    @SuppressWarnings("hiding")
    public DefaultTownDatabase(final GeoIdConverter converter, final Reader townsDataReader)
    {
        if (converter == null)
        {
            throw new IllegalArgumentException("converter is null");
        }

        if (townsDataReader == null)
        {
            throw new IllegalArgumentException("townsDataReader is null");
        }

        this.converter = converter;

        townSquares = new BitSet();

        loadTownSquares(townsDataReader);
    }

    @Override
    public BitSet getTownSquares()
    {
        return townSquares;
    }

    @Override
    public String toString()
    {
        final StringBuilder sb = new StringBuilder();

        sb.append("townSquares ").append(townSquares.cardinality());

        return sb.toString();
    }

    /**
     * Load town squares.
     * 
     * @param townsDataReader Towns data reader. (required)
     */
    private void loadTownSquares(final Reader townsDataReader)
    {
        final long start = System.currentTimeMillis();

        XMLReader xmlReader = new XMLReader();
        Element doc = xmlReader.read(townsDataReader, false);

        final NodeList nodeList = doc.getElementsByTagName("town");

        doc = null;
        xmlReader = null;

        for (int i = 0; i < nodeList.getLength(); i++)
        {
            final Node node = nodeList.item(i);
            final Node location = node.getFirstChild();
            final Node mapxNode = location.getFirstChild();
            final int mapx = Integer.parseInt(mapxNode.getTextContent());
            final Node mapyNode = mapxNode.getNextSibling();
            final int mapy = Integer.parseInt(mapyNode.getTextContent());

            if (converter.isCoordsInRange(mapx, mapy))
            {
                final int index = converter.coordsToIndex(mapx, mapy);
                townSquares.set(index);
            }
        }

        final long end = System.currentTimeMillis();
        new TimePrinter().printElapsedTime(
                "DefaultTownDatabase.loadTownSquares() cardinality = " + townSquares.cardinality(), start, end);
    }
}

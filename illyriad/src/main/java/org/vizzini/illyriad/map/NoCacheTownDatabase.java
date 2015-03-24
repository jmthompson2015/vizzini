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
 * Provides an implementation of a town information database which caches nothing to ease memory requirements.
 */
public final class NoCacheTownDatabase implements TownDatabase
{
    /** Geospatial ID converter. */
    private final GeoIdConverter converter;

    /**
     * Construct this object.
     * 
     * @param converter Geospatial ID converter. (required)
     */
    @SuppressWarnings("hiding")
    public NoCacheTownDatabase(final GeoIdConverter converter)
    {
        if (converter == null)
        {
            throw new IllegalArgumentException("converter is null");
        }

        this.converter = converter;
    }

    @Override
    public BitSet getTownSquares()
    {
        final long start = System.currentTimeMillis();

        final BitSet answer = new BitSet();

        final Reader townsDataReader = new InputStreamReader(NoCacheTownDatabase.class.getClassLoader()
                .getResourceAsStream("mapData/datafile_towns.xml"));

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
                answer.set(index);
            }
        }

        final long end = System.currentTimeMillis();
        new TimePrinter().printElapsedTime(
                "NoCacheTownDatabase.getTownSquares() cardinality = " + answer.cardinality(), start, end);

        return answer;
    }

    @Override
    public String toString()
    {
        final StringBuilder sb = new StringBuilder();

        sb.append("townSquares ").append(getTownSquares().cardinality());

        return sb.toString();
    }
}

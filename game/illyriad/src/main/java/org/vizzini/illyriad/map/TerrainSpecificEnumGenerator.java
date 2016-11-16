package org.vizzini.illyriad.map;

import java.awt.Toolkit;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.io.StringWriter;
import java.io.Writer;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.TreeMap;

import org.vizzini.core.TimePrinter;
import org.vizzini.core.XMLReader;
import org.vizzini.illyriad.FileUtilities;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

/**
 * Provides an enum generator for terrain specific.
 */
public final class TerrainSpecificEnumGenerator
{
    /**
     * Application method.
     * 
     * @param args Application arguments.
     */
    public static void main(final String args[])
    {
        final long start = System.currentTimeMillis();

        final StringWriter writer = new StringWriter();

        try
        {
            final TerrainSpecificEnumGenerator generator = new TerrainSpecificEnumGenerator();
            generator.generate(writer);
        }
        finally
        {
            final FileUtilities fileUtils = new FileUtilities();
            fileUtils.close(writer);
        }

        System.out.println(writer.toString());

        final long end = System.currentTimeMillis();
        new TimePrinter().printElapsedTime("TerrainSpecificEnumGenerator", start, end);
        Toolkit.getDefaultToolkit().beep();
    }

    /** Reader. */
    private final Reader reader;

    /**
     * Construct this object.
     */
    public TerrainSpecificEnumGenerator()
    {
        this.reader = new InputStreamReader(getClass().getClassLoader().getResourceAsStream(
                "mapData/datafile_terrain.xml"));
    }

    /**
     * @param writer Writer.
     */
    public void generate(final Writer writer)
    {
        final XMLReader xmlReader = new XMLReader();
        final Element doc = xmlReader.read(reader);

        final NodeList nodeList = doc.getElementsByTagName("terrainspecifictype");

        // You cannot move onto NPC squares, ie: Standing Stones, Barrow, Abandoned Mineshaft, Ruined Tower, Ancient
        // Forest, Dolmen, Ice Cave, Petrified Forest.
        final TerrainSpecific[] unsettleableTerrain0 = { TerrainSpecific.STANDING_STONES, TerrainSpecific.BARROW,
                TerrainSpecific.ABANDONED_MINESHAFT, TerrainSpecific.RUINED_TOWER, TerrainSpecific.ANCIENT_FOREST,
                TerrainSpecific.DOLMEN, TerrainSpecific.ICE_CAVE, TerrainSpecific.PETRIFIED_FOREST,

                TerrainSpecific.ABANDONED_CAMPSITE, TerrainSpecific.ABANDONED_LODGE, TerrainSpecific.BANKSIDE,
                TerrainSpecific.BEACH, TerrainSpecific.CROOKED_HOUSE, TerrainSpecific.DESERTED_MONASTERY,
                TerrainSpecific.DESERTED_WAYHOUSE, TerrainSpecific.FORBIDDEN, TerrainSpecific.HOUSE_OF_THE_SPIRITS,
                TerrainSpecific.PYRAMIDS, };

        final List<String> unsettleableTerrain = new ArrayList<String>();

        for (final TerrainSpecific terrain : unsettleableTerrain0)
        {
            unsettleableTerrain.add(terrain.getDisplayName());
        }

        final Map<String, List<Integer>> nameToIds = new TreeMap<String, List<Integer>>();

        for (int i = 0; i < nodeList.getLength(); i++)
        {
            final Node node = nodeList.item(i);
            final String idString = node.getAttributes().getNamedItem("id").getTextContent();
            final int id = Integer.parseInt(idString);
            final String name = node.getTextContent().trim();

            List<Integer> ids = nameToIds.get(name);

            if (ids == null)
            {
                ids = new ArrayList<Integer>();
                nameToIds.put(name, ids);
            }

            ids.add(id);
        }

        // // Missing item.
        final List<Integer> list = nameToIds.get("Forested Hilltop");
        list.add(0, 4);

        final int size = nameToIds.size();
        int count = 0;

        for (final Entry<String, List<Integer>> entry : nameToIds.entrySet())
        {
            final String name = entry.getKey();
            final List<Integer> ids = entry.getValue();
            final String enumName = createEnumName(name);

            try
            {
                writer.write("\n/** Terrain specific. */\n");
                writer.write(enumName);
                writer.write("(");
                writer.write(formatList(ids));
                writer.write(", \"");
                writer.write(name);
                writer.write("\"");

                if (unsettleableTerrain.contains(name))
                {
                    writer.write(", false");
                }

                writer.write(")");

                if (count < (size - 1))
                {
                    writer.write(",");
                }
                else
                {
                    writer.write(";");
                }

                writer.write("\n");
            }
            catch (final IOException e)
            {
                throw new RuntimeException(e);
            }

            count++;
        }
    }

    /**
     * @param name Name.
     * 
     * @return a new enum name.
     */
    private String createEnumName(final String name)
    {
        String answer = name.replaceAll(" ", "_");
        answer = answer.replaceAll("[()]", "");
        answer = answer.replaceAll("[']", "");
        answer = answer.toUpperCase();

        return answer;
    }

    /**
     * @param list List.
     * 
     * @return formatted string.
     */
    private String formatList(final List<Integer> list)
    {
        String answer;

        if (list.size() == 1)
        {
            answer = String.valueOf(list.get(0));
        }
        else
        {
            final StringBuilder sb = new StringBuilder();

            sb.append("Arrays.asList(new Integer[] {");

            final int size = list.size();
            int count = 0;

            for (final Integer i : list)
            {
                sb.append(i);

                if (count < (size - 1))
                {
                    sb.append(", ");
                }

                count++;
            }

            sb.append("})");

            answer = sb.toString();
        }

        return answer;
    }
}

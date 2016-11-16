package org.vizzini.illyriad.map;

import java.awt.Toolkit;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.io.StringWriter;
import java.io.Writer;

import org.vizzini.core.TimePrinter;
import org.vizzini.core.XMLReader;
import org.vizzini.illyriad.FileUtilities;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

/**
 * Provides an enum generator for terrain combat.
 */
public final class TerrainCombatEnumGenerator
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
            final TerrainCombatEnumGenerator generator = new TerrainCombatEnumGenerator(writer);
            generator.generate();
        }
        finally
        {
            final FileUtilities fileUtils = new FileUtilities();
            fileUtils.close(writer);
        }

        System.out.println(writer.toString());

        final long end = System.currentTimeMillis();
        new TimePrinter().printElapsedTime("TerrainCombatEnumGenerator", start, end);
        Toolkit.getDefaultToolkit().beep();
    }

    /** Reader. */
    private final Reader reader;

    /** Writer. */
    private final Writer writer;

    /**
     * Construct this object.
     * 
     * @param writer Writer.
     */
    @SuppressWarnings("hiding")
    public TerrainCombatEnumGenerator(final Writer writer)
    {
        this.reader = new InputStreamReader(getClass().getClassLoader().getResourceAsStream(
                "mapData/datafile_terrain_combat.xml"));
        this.writer = writer;
    }

    /**
     * Generate enums.
     */
    public void generate()
    {
        final XMLReader xmlReader = new XMLReader();
        final Element doc = xmlReader.read(reader);

        final NodeList nodeList = doc.getElementsByTagName("terraincombattype");

        for (int i = 0; i < nodeList.getLength(); i++)
        {
            final Node node = nodeList.item(i);
            final String id = node.getAttributes().getNamedItem("id").getTextContent();
            final String name = node.getTextContent();
            final String enumName = createEnumName(name);

            try
            {
                writer.write("\n/** Terrain combat. */\n");
                writer.write(enumName);
                writer.write("(");
                writer.write(id);
                writer.write(", \"");
                writer.write(name);
                writer.write("\")");

                if (i < (nodeList.getLength() - 1))
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
        }
    }

    /**
     * @param name Name.
     * 
     * @return a new enum name.
     */
    private String createEnumName(final String name)
    {
        final String answer = name.replaceAll(" ", "_").toUpperCase();

        return answer;
    }
}

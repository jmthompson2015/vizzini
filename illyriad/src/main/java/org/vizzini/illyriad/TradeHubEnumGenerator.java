package org.vizzini.illyriad;

import java.awt.Point;
import java.awt.Toolkit;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.io.StringWriter;
import java.io.Writer;
import java.util.Map;
import java.util.Map.Entry;
import java.util.TreeMap;

import org.vizzini.core.TimePrinter;
import org.vizzini.core.XMLReader;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

/**
 * Provides an enum generator for trade hubs.
 */
public final class TradeHubEnumGenerator
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
            final TradeHubEnumGenerator generator = new TradeHubEnumGenerator(writer);
            generator.generate();
        }
        finally
        {
            final FileUtilities fileUtils = new FileUtilities();
            fileUtils.close(writer);
        }

        System.out.println(writer.toString());

        final long end = System.currentTimeMillis();
        new TimePrinter().printElapsedTime("TradeHubEnumGenerator", start, end);
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
    public TradeHubEnumGenerator(final Writer writer)
    {
        this.reader = new InputStreamReader(getClass().getClassLoader().getResourceAsStream(
                "mapData/datafile_factionhubs.xml"));
        this.writer = writer;
    }

    /**
     * Generate enums.
     */
    public void generate()
    {
        final XMLReader xmlReader = new XMLReader();
        final Element doc = xmlReader.read(reader);

        final NodeList nodeList = doc.getElementsByTagName("factionhub");
        int size = nodeList.getLength();
        final Map<String, Point> nameToPoint = new TreeMap<String, Point>();

        for (int i = 0; i < size; i++)
        {
            final Node node = nodeList.item(i);
            final Node nameNode = node.getFirstChild();
            final String name = nameNode.getTextContent().trim();

            final Node locationNode = node.getFirstChild().getNextSibling().getNextSibling();
            final String xString = locationNode.getAttributes().getNamedItem("X").getTextContent();
            final int x = Integer.parseInt(xString);
            final String yString = locationNode.getAttributes().getNamedItem("Y").getTextContent();
            final int y = Integer.parseInt(yString);

            nameToPoint.put(name, new Point(x, y));
        }

        size = nameToPoint.size();
        int count = 0;

        try
        {
            for (final Entry<String, Point> entry : nameToPoint.entrySet())
            {
                final String name = entry.getKey();
                final Point location = entry.getValue();
                final String enumName = createEnumName(name);

                writer.write("\n/** Trade hub. */\n");
                writer.write(enumName);
                writer.write("(\"");
                writer.write(name);
                writer.write("\", ");
                writer.write(String.valueOf(location.x));
                writer.write(", ");
                writer.write(String.valueOf(location.y));
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

                count++;
            }
        }
        catch (final IOException e)
        {
            throw new RuntimeException(e);
        }
        finally
        {
            final FileUtilities fileUtils = new FileUtilities();
            fileUtils.close(reader);
        }
    }

    /**
     * @param name Name.
     * 
     * @return a new enum name.
     */
    private String createEnumName(final String name)
    {
        String answer = name.replaceAll(" ", "_").toUpperCase();
        answer = answer.replaceAll("[-]", "_");
        answer = answer.replaceAll("[']", "");

        return answer;
    }
}

package org.vizzini.illyriad;

import java.awt.Toolkit;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.io.StringWriter;
import java.io.Writer;

import org.apache.commons.lang3.StringUtils;
import org.vizzini.core.TimePrinter;

/**
 * Provides an enum generator for minerals.
 */
public final class MineralEnumGenerator
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
            final MineralEnumGenerator generator = new MineralEnumGenerator(writer);
            generator.generate();
        }
        finally
        {
            final FileUtilities fileUtils = new FileUtilities();
            fileUtils.close(writer);
        }

        System.out.println(writer.toString());

        final long end = System.currentTimeMillis();
        new TimePrinter().printElapsedTime("MineralEnumGenerator", start, end);
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
    public MineralEnumGenerator(final Writer writer)
    {
        this.reader = new InputStreamReader(getClass().getClassLoader().getResourceAsStream("mapData/illy_gems_22.js"));
        this.writer = writer;
    }

    /**
     * Generate enums.
     */
    public void generate()
    {
        BufferedReader myReader = null;
        String line = "";

        try
        {
            myReader = new BufferedReader(reader);

            // Find the comment line to start.
            while ((line = myReader.readLine()) != null)
            {
                if (line.contains("update name with count column"))
                {
                    break;
                }
            }

            // Read each line until an ID cannot be found.
            boolean isFirst = true;

            while ((line = myReader.readLine()) != null)
            {
                final String id = StringUtils.substringBetween(line, "count", " +");

                if (id == null)
                {
                    writer.write(";");
                    break;
                }

                if (!isFirst)
                {
                    writer.write(",");
                    writer.write("\n");
                }

                isFirst = false;

                final String name = StringUtils.substringBetween(line, "= \"", " (\"");
                final String enumName = createEnumName(name);

                writer.write("\n/** Mineral. */\n");
                writer.write(enumName);
                writer.write("(");
                writer.write(id);
                writer.write(", \"");
                writer.write(name);
                writer.write("\")");
            }
        }
        catch (final IOException e)
        {
            throw new RuntimeException(e);
        }
        finally
        {
            final FileUtilities fileUtils = new FileUtilities();
            fileUtils.close(myReader);
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
        final String answer = name.replaceAll(" ", "_").toUpperCase();

        return answer;
    }
}

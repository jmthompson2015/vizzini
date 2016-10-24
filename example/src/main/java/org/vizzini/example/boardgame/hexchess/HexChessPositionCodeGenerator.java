package org.vizzini.example.boardgame.hexchess;

import java.io.IOException;
import java.io.StringWriter;
import java.io.Writer;

/**
 * Provides a code generator for a hex chess position class.
 */
public final class HexChessPositionCodeGenerator
{
    /**
     * Application method.
     * 
     * @param args Application arguments.
     */
    public final static void main(final String[] args)
    {
        final HexChessPositionCodeGenerator generator = new HexChessPositionCodeGenerator();

        final StringWriter writer = new StringWriter();
        generator.generate(writer);
        System.out.println(writer.toString());
    }

    /**
     * @param q Axial coordinate q.
     * @param r Axial coordinate r.
     * 
     * @return the index.
     */
    public Integer computeIndex(final int q, final int r)
    {
        Integer answer = null;

        if ((-6 < q) && (q < 6) && (-6 < r) && (r < 6))
        {
            answer = (q + 5) + ((5 - r) * 11);
        }

        return answer;
    }

    /**
     * @param q Axial coordinate q.
     * @param r Axial coordinate r.
     * 
     * @return a position name.
     */
    public String createName(final int q, final int r)
    {
        final String file;

        if (q > 3)
        {
            // There is no j.
            file = String.valueOf((char)('a' + q + 6));
        }
        else
        {
            file = String.valueOf((char)('a' + q + 5));
        }

        final String rank;

        if (q < 1)
        {
            rank = String.valueOf(6 - r);
        }
        else
        {
            rank = String.valueOf(6 - r - q);
        }

        return file + rank;
    }

    /**
     * Generate code.
     * 
     * @param writer Writer.
     */
    public void generate(final Writer writer)
    {
        generatePositions(writer);

        generateMap(writer);
    }

    /**
     * @param q Axial coordinate q.
     * @param r Axial coordinate r.
     * 
     * @return true if the hex is usable.
     */
    public boolean isUsable(final int q, final int r)
    {
        return
        // q == -5
        ((q == -5) && (r > -1))
        // q == -4
                || ((q == -4) && (r > -2))
                // q == -3
                || ((q == -3) && (r > -3))
                // q == -2
                || ((q == -2) && (r > -4))
                // q = -1
                || ((q == -1) && (r > -5))
                // q == 0
                || ((q == 0) && (r > -6))
                // q == 1
                || ((q == 1) && (r < 5))
                // q == 2
                || ((q == 2) && (r < 4))
                // q == 3
                || ((q == 3) && (r < 3))
                // q == 4
                || ((q == 4) && (r < 2))
                // q = 5
                || ((q == 5) && (r < 1));
    }

    /**
     * @param writer Writer.
     */
    private void generateMap(final Writer writer)
    {
        try
        {
            writer.write("\n");
            writer.write("/** Map of index to position. */\n");
            writer.write("private static final Map<Integer, HexChessPosition> INDEX_TO_POSITION = new TreeMap<Integer, HexChessPosition>();\n");
            writer.write("\n");
            writer.write("static\n");
            writer.write("{\n");

            for (int r = 5; r > -6; r--)
            {
                for (int q = -5; q < 6; q++)
                {
                    if (isUsable(q, r))
                    {
                        final String name = createName(q, r);
                        final Integer index = computeIndex(q, r);
                        writer.write("INDEX_TO_POSITION.put(" + index + ", " + name + ");\n");
                    }
                }
            }

            writer.write("}\n");
        }
        catch (final IOException e)
        {
            throw new RuntimeException(e);
        }
    }

    /**
     * @param writer Writer.
     */
    private void generatePositions(final Writer writer)
    {
        try
        {
            for (int r = 5; r > -6; r--)
            {
                for (int q = -5; q < 6; q++)
                {
                    if (isUsable(q, r))
                    {
                        final String name = createName(q, r);
                        writer.write("\n/** Position. */\n");
                        writer.write("public static final HexChessPosition " + name + " = new HexChessPosition(\""
                                + name + "\", " + q + ", " + r + ");\n");
                    }
                }
            }
        }
        catch (final IOException e)
        {
            throw new RuntimeException(e);
        }
    }
}

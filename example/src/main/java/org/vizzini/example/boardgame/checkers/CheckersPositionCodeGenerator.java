package org.vizzini.example.boardgame.checkers;

import java.io.IOException;
import java.io.StringWriter;
import java.io.Writer;

import org.vizzini.core.game.boardgame.DefaultPositionCodeGenerator;
import org.vizzini.core.game.boardgame.PositionCodeGenerator;

/**
 * Provides a code generator for a checkers position class.
 */
public final class CheckersPositionCodeGenerator implements PositionCodeGenerator
{
    /**
     * Application method.
     * 
     * @param args Application arguments.
     */
    public final static void main(final String[] args)
    {
        final CheckersPositionCodeGenerator generator = new CheckersPositionCodeGenerator();

        final StringWriter writer = new StringWriter();
        generator.generate(writer);
        System.out.println(writer.toString());
    }

    /** Delegate. */
    private final PositionCodeGenerator delegate;

    /**
     * Construct this object.
     */
    public CheckersPositionCodeGenerator()
    {
        final String positionClassName = "CheckersPosition";
        final int maxX = 8;
        final int maxY = 8;

        delegate = new DefaultPositionCodeGenerator(positionClassName, maxX, maxY);
    }

    @Override
    public Integer computeIndex(final int x, final int y, final int z)
    {
        Integer answer = null;

        if (isInRange(x, y, z) && isUsable(x, y))
        {
            answer = (x / 2) + (y * 4);
        }

        return answer;
    }

    /**
     * @param x X coordinate.
     * @param y Y coordinate.
     * @param z Z coordinate.
     * 
     * @return a position name.
     */
    @Override
    public String createName(final int x, final int y, final int z)
    {
        String answer = null;

        if ((0 <= x) && (x < getMaxX()) && (0 <= y) && (y < getMaxY()) && (0 <= z) && (z < getMaxZ()))
        {
            answer = "--";

            if (isUsable(x, y))
            {
                final int index = 1 + (x / 2) + (y * 4);

                final String prefix = (index < 10 ? "0" : "");

                answer = prefix + String.valueOf(index);
            }
        }

        return answer;
    }

    /**
     * Generate code.
     * 
     * @param writer Writer.
     */
    @Override
    public void generate(final Writer writer)
    {
        generatePositions(writer);

        generateMap(writer);
    }

    @Override
    public void generateMap(final Writer writer)
    {
        try
        {
            writer.write("\n");
            writer.write("/** Map of index to position. */\n");
            writer.write("private static final Map<Integer, ");
            writer.write(getPositionClassName());
            writer.write("> INDEX_TO_POSITION = new TreeMap<Integer, ");
            writer.write(getPositionClassName());
            writer.write(">();\n");
            writer.write("\n");
            writer.write("static\n");
            writer.write("{\n");

            final int z = 0;

            for (int y = 0; y < getMaxY(); y++)
            {
                for (int x = 0; x < getMaxX(); x++)
                {
                    if (isUsable(x, y))
                    {
                        final String name = createName(x, y, z);
                        final Integer index = computeIndex(x, y, z);
                        writer.write("INDEX_TO_POSITION.put(");
                        writer.write(String.valueOf(index));
                        writer.write(", P");
                        writer.write(name);
                        writer.write(");\n");
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
    @Override
    public void generatePositions(final Writer writer)
    {
        try
        {
            final int z = 0;

            for (int y = 0; y < 8; y++)
            {
                for (int x = 0; x < 8; x++)
                {
                    if (isUsable(x, y))
                    {
                        final String name = createName(x, y, z);
                        writer.write("\n/** Position. */\n");
                        writer.write("public static final CheckersPosition P" + name + " = new CheckersPosition(\""
                                + name + "\", " + x + ", " + y + ");\n");
                    }
                }
            }
        }
        catch (final IOException e)
        {
            throw new RuntimeException(e);
        }
    }

    @Override
    public int getMaxX()
    {
        return delegate.getMaxX();
    }

    @Override
    public int getMaxY()
    {
        return delegate.getMaxY();
    }

    @Override
    public int getMaxZ()
    {
        return delegate.getMaxZ();
    }

    @Override
    public String getPositionClassName()
    {
        return delegate.getPositionClassName();
    }

    /**
     * @param x X coordinate.
     * @param y Y coordinate.
     * @param z Z coordinate.
     * 
     * @return true if the given coordinates are in range.
     */
    private boolean isInRange(final int x, final int y, final int z)
    {
        return (0 <= x) && (x < getMaxX()) && (0 <= y) && (y < getMaxY()) && (0 <= z) && (z < getMaxZ());
    }

    /**
     * @param x X coordinate.
     * @param y Y coordinate.
     * 
     * @return true if the position is usable.
     */
    private boolean isUsable(final int x, final int y)
    {
        return (x % 2) != (y % 2);
    }
}

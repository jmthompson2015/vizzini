package org.vizzini.chess.tridimensional;

import java.io.IOException;
import java.io.StringWriter;
import java.io.Writer;

import org.vizzini.core.game.boardgame.DefaultPositionCodeGenerator;
import org.vizzini.core.game.boardgame.PositionCodeGenerator;

/**
 * Provides a code generator for an tridimensional chess position class.
 */
public final class TridPositionCodeGenerator implements PositionCodeGenerator
{
    /**
     * Application method.
     * 
     * @param args Application arguments.
     */
    public final static void main(final String[] args)
    {
        final TridPositionCodeGenerator generator = new TridPositionCodeGenerator();

        final StringWriter writer = new StringWriter();
        generator.generate(writer);
        System.out.println(writer.toString());
    }

    /** Delegate. */
    private final PositionCodeGenerator delegate;

    /**
     * Construct this object.
     */
    public TridPositionCodeGenerator()
    {
        final String positionClassName = "TridPosition";
        final int maxX = 6;
        final int maxY = 6;
        final int maxZ = 7;

        delegate = new DefaultPositionCodeGenerator(positionClassName, maxX, maxY, maxZ);
    }

    @Override
    public Integer computeIndex(final int x, final int y, final int z)
    {
        return delegate.computeIndex(x, y, z);
    }

    @Override
    public String createName(final int x, final int y, final int z)
    {
        return delegate.createName(x, y, z);
    }

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

            for (int z = 0; z < getMaxZ(); z++)
            {
                for (int y = 0; y < getMaxY(); y++)
                {
                    for (int x = 0; x < getMaxX(); x++)
                    {
                        if (isUsable(x, y, z))
                        {
                            final String name = createName(x, y, z);
                            final Integer index = computeIndex(x, y, z);
                            writer.write("INDEX_TO_POSITION.put(");
                            writer.write(String.valueOf(index));
                            writer.write(", ");
                            writer.write(name);
                            writer.write(");\n");
                        }
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

    @Override
    public void generatePositions(final Writer writer)
    {
        generateFixedBoardPositions(writer);

        generateAttackBoardPositions(writer);
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
     * @return true if the hex is usable.
     */
    public boolean isUsable(final int x, final int y, final int z)
    {
        boolean answer = false;

        final boolean isFixedBoard = ((z == 1) || (z == 3) || (z == 5));

        if (isFixedBoard)
        {
            answer = ((0 < x) && (x < 5) && (0 < y) && (y < 5));
        }
        else
        {
            answer = (((0 <= x) && (x <= 1) && (0 <= y) && (y <= 1)) || ((0 <= x) && (x <= 1) && (4 <= y) && (y <= 5))
                    || ((4 <= x) && (x <= 5) && (0 <= y) && (y <= 1)) || ((4 <= x) && (x <= 5) && (4 <= y) && (y <= 5)));
        }

        return answer;
    }

    /**
     * @param writer Writer.
     */
    private void generateAttackBoardPositions(final Writer writer)
    {
        try
        {
            for (int z = 0; z < 7; z += 2)
            {
                for (int y = 0; y < 2; y++)
                {
                    for (int x = 0; x < 2; x++)
                    {
                        final String name = createName(x, y, z);
                        writer.write("\n/** Attack board position. */\n");
                        writer.write("public static final TridPosition " + name + " = new TridPosition(\"" + name
                                + "\", " + x + ", " + y + ", " + z + ");\n");
                    }
                }

                for (int y = 0; y < 2; y++)
                {
                    for (int x = 4; x < 6; x++)
                    {
                        final String name = createName(x, y, z);
                        writer.write("\n/** Attack board position. */\n");
                        writer.write("public static final TridPosition " + name + " = new TridPosition(\"" + name
                                + "\", " + x + ", " + y + ", " + z + ");\n");
                    }
                }

                for (int y = 4; y < 6; y++)
                {
                    for (int x = 0; x < 2; x++)
                    {
                        final String name = createName(x, y, z);
                        writer.write("\n/** Attack board position. */\n");
                        writer.write("public static final TridPosition " + name + " = new TridPosition(\"" + name
                                + "\", " + x + ", " + y + ", " + z + ");\n");
                    }
                }

                for (int y = 4; y < 6; y++)
                {
                    for (int x = 4; x < 6; x++)
                    {
                        final String name = createName(x, y, z);
                        writer.write("\n/** Attack board position. */\n");
                        writer.write("public static final TridPosition " + name + " = new TridPosition(\"" + name
                                + "\", " + x + ", " + y + ", " + z + ");\n");
                    }
                }
            }
        }
        catch (final IOException e)
        {
            throw new RuntimeException(e);
        }
    }

    /**
     * @param writer Writer.
     */
    private void generateFixedBoardPositions(final Writer writer)
    {
        try
        {
            for (int z = 1; z < 6; z += 2)
            {
                for (int y = 1; y < 5; y++)
                {
                    for (int x = 1; x < 5; x++)
                    {
                        final String name = createName(x, y, z);
                        writer.write("\n/** Fixed board position. */\n");
                        writer.write("public static final TridPosition " + name + " = new TridPosition(\"" + name
                                + "\", " + x + ", " + y + ", " + z + ");\n");
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

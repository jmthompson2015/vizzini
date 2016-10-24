package org.vizzini.example.boardgame.reversi;

import java.io.IOException;
import java.io.StringWriter;
import java.io.Writer;

import org.vizzini.core.game.boardgame.DefaultPositionCodeGenerator;
import org.vizzini.core.game.boardgame.PositionCodeGenerator;

/**
 * Provides a code generator for a reversi position class.
 */
public final class ReversiPositionCodeGenerator implements PositionCodeGenerator
{
    /**
     * Application method.
     * 
     * @param args Application arguments.
     */
    public final static void main(final String[] args)
    {
        final ReversiPositionCodeGenerator generator = new ReversiPositionCodeGenerator();

        final StringWriter writer = new StringWriter();
        generator.generate(writer);
        System.out.println(writer.toString());
    }

    /** Delegate. */
    private final PositionCodeGenerator delegate;

    /**
     * Construct this object.
     */
    public ReversiPositionCodeGenerator()
    {
        final String positionClassName = "ReversiPosition";
        final int maxX = 8;
        final int maxY = 8;

        delegate = new DefaultPositionCodeGenerator(positionClassName, maxX, maxY);
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

        generateCenters(writer);

        generateCorners(writer);

        generateMap(writer);
    }

    @Override
    public void generateMap(final Writer writer)
    {
        delegate.generateMap(writer);
    }

    @Override
    public void generatePositions(final Writer writer)
    {
        delegate.generatePositions(writer);
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
     * @param writer Writer.
     */
    private void generateCenters(final Writer writer)
    {
        try
        {
            writer.write("\n/** Alternate position name. */\n");
            writer.write("public static final ReversiPosition CENTER0 = d4;\n");
            writer.write("\n/** Alternate position name. */\n");
            writer.write("public static final ReversiPosition CENTER1 = e4;\n");
            writer.write("\n/** Alternate position name. */\n");
            writer.write("public static final ReversiPosition CENTER2 = d5;\n");
            writer.write("\n/** Alternate position name. */\n");
            writer.write("public static final ReversiPosition CENTER3 = e5;\n");
        }
        catch (final IOException e)
        {
            throw new RuntimeException(e);
        }
    }

    /**
     * @param writer Writer.
     */
    private void generateCorners(final Writer writer)
    {
        try
        {
            writer.write("\n/** Alternate position name. */\n");
            writer.write("public static final ReversiPosition CORNER0 = a1;\n");
            writer.write("\n/** Alternate position name. */\n");
            writer.write("public static final ReversiPosition CORNER1 = h1;\n");
            writer.write("\n/** Alternate position name. */\n");
            writer.write("public static final ReversiPosition CORNER2 = a8;\n");
            writer.write("\n/** Alternate position name. */\n");
            writer.write("public static final ReversiPosition CORNER3 = h8;\n");
        }
        catch (final IOException e)
        {
            throw new RuntimeException(e);
        }
    }
}

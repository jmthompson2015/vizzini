package org.vizzini.example.puzzle.sudoku;

import java.io.StringWriter;
import java.io.Writer;

import org.vizzini.core.game.boardgame.DefaultPositionCodeGenerator;
import org.vizzini.core.game.boardgame.PositionCodeGenerator;

/**
 * Provides a code generator for a Sudoku position class.
 */
public final class SudokuPositionCodeGenerator implements PositionCodeGenerator
{
    /**
     * Application method.
     * 
     * @param args Application arguments.
     */
    public final static void main(final String[] args)
    {
        final SudokuPositionCodeGenerator generator = new SudokuPositionCodeGenerator();

        final StringWriter writer = new StringWriter();
        generator.generate(writer);
        System.out.println(writer.toString());
    }

    /** Delegate. */
    private final PositionCodeGenerator delegate;

    /**
     * Construct this object.
     */
    public SudokuPositionCodeGenerator()
    {
        final String positionClassName = "SudokuPosition";
        final int maxX = 9;
        final int maxY = 9;

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

        // generateCenter(writer);

        // generateCorners(writer);

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
    // private void generateCenter(final Writer writer)
    // {
    // try
    // {
    // writer.write("\n/** Alternate position name. */\n");
    // writer.write("public static final SudokuPosition CENTER = b2;\n");
    // }
    // catch (final IOException e)
    // {
    // throw new RuntimeException(e);
    // }
    // }

    /**
     * @param writer Writer.
     */
    // private void generateCorners(final Writer writer)
    // {
    // try
    // {
    // writer.write("\n/** Alternate position name. */\n");
    // writer.write("public static final SudokuPosition CORNER0 = a1;\n");
    // writer.write("\n/** Alternate position name. */\n");
    // writer.write("public static final SudokuPosition CORNER1 = c1;\n");
    // writer.write("\n/** Alternate position name. */\n");
    // writer.write("public static final SudokuPosition CORNER2 = a3;\n");
    // writer.write("\n/** Alternate position name. */\n");
    // writer.write("public static final SudokuPosition CORNER3 = c3;\n");
    // }
    // catch (final IOException e)
    // {
    // throw new RuntimeException(e);
    // }
    // }
}

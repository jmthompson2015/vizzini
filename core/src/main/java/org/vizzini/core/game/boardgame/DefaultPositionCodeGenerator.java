package org.vizzini.core.game.boardgame;

import java.io.IOException;
import java.io.Writer;

import org.apache.commons.lang3.StringUtils;

/**
 * Provides a default implementation of a code generator for a position class.
 */
public final class DefaultPositionCodeGenerator implements PositionCodeGenerator
{
    /** Maximum X coordinate value. */
    private final int maxX;

    /** Maximum Y coordinate value. */
    private final int maxY;

    /** Maximum Z coordinate value. */
    private final int maxZ;

    /** Position class name. */
    private final String positionClassName;

    /**
     * Construct this object.
     * 
     * @param positionClassName Position class name. (required)
     * @param max Maximum coordinate value.
     */
    @SuppressWarnings("hiding")
    public DefaultPositionCodeGenerator(final String positionClassName, final int max)
    {
        this(positionClassName, max, max, max);
    }

    /**
     * Construct this object.
     * 
     * @param positionClassName Position class name. (required)
     * @param maxX Maximum X coordinate value.
     * @param maxY Maximum Y coordinate value.
     */
    @SuppressWarnings("hiding")
    public DefaultPositionCodeGenerator(final String positionClassName, final int maxX, final int maxY)
    {
        this(positionClassName, maxX, maxY, 1);
    }

    /**
     * Construct this object.
     * 
     * @param positionClassName Position class name. (required)
     * @param maxX Maximum X coordinate value.
     * @param maxY Maximum Y coordinate value.
     * @param maxZ Maximum Z coordinate value.
     */
    @SuppressWarnings("hiding")
    public DefaultPositionCodeGenerator(final String positionClassName, final int maxX, final int maxY, final int maxZ)
    {
        if (StringUtils.isEmpty(positionClassName))
        {
            throw new IllegalArgumentException("positionClassName is null or empty");
        }

        if (maxX < 1)
        {
            throw new IllegalArgumentException("maxX is less than one");
        }

        if (maxY < 1)
        {
            throw new IllegalArgumentException("maxY is less than one");
        }

        if (maxZ < 1)
        {
            throw new IllegalArgumentException("maxZ is less than one");
        }

        this.positionClassName = positionClassName;
        this.maxX = maxX;
        this.maxY = maxY;
        this.maxZ = maxZ;
    }

    @Override
    public Integer computeIndex(final int x, final int y, final int z)
    {
        Integer answer = null;

        if (isInRange(x, y, z))
        {
            answer = x + ((y + (z * maxY)) * maxX);
        }

        return answer;
    }

    @Override
    public String createName(final int x, final int y, final int z)
    {
        String answer = null;

        if (isInRange(x, y, z))
        {
            final String file = String.valueOf((char)('a' + x));
            final String rank = String.valueOf(y + 1);

            final StringBuilder sb = new StringBuilder();

            sb.append(file);
            sb.append(rank);

            if (maxZ > 1)
            {
                final String level = String.valueOf((char)('A' + z));
                sb.append(level);
            }

            answer = sb.toString();
        }

        return answer;
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
            writer.write(positionClassName);
            writer.write("> INDEX_TO_POSITION = new TreeMap<Integer, ");
            writer.write(positionClassName);
            writer.write(">();\n");
            writer.write("\n");
            writer.write("static\n");
            writer.write("{\n");

            for (int z = 0; z < maxZ; z++)
            {
                for (int y = 0; y < maxY; y++)
                {
                    for (int x = 0; x < maxX; x++)
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
        try
        {
            for (int z = 0; z < maxZ; z++)
            {
                for (int y = 0; y < maxY; y++)
                {
                    for (int x = 0; x < maxX; x++)
                    {
                        final String name = createName(x, y, z);

                        writer.write("\n/** Position. */\n");
                        writer.write("public static final ");
                        writer.write(positionClassName);
                        writer.write(" ");
                        writer.write(name);
                        writer.write(" = new ");
                        writer.write(positionClassName);
                        writer.write("(\"");
                        writer.write(name);
                        writer.write("\", ");
                        writer.write(String.valueOf(x));
                        writer.write(", ");
                        writer.write(String.valueOf(y));

                        if (maxZ > 1)
                        {
                            writer.write(", ");
                            writer.write(String.valueOf(z));
                        }

                        writer.write(");\n");
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
        return maxX;
    }

    @Override
    public int getMaxY()
    {
        return maxY;
    }

    @Override
    public int getMaxZ()
    {
        return maxZ;
    }

    @Override
    public String getPositionClassName()
    {
        return positionClassName;
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
        return (0 <= x) && (x < maxX) && (0 <= y) && (y < maxY) && (0 <= z) && (z < maxZ);
    }
}
